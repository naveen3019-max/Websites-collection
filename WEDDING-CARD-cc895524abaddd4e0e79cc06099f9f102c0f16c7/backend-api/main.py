from fastapi import FastAPI, Depends, HTTPException, Body
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from datetime import datetime
from typing import Optional
from db import (
    db, devices_collection, alerts_collection, rooms_collection,
    StatusEnum, init_db
)
from config import settings
from notifications import NotificationService
from auth import AuthService, get_current_device
import asyncio
import logging
import json
from sse_starlette.sse import EventSourceResponse
import redis.asyncio as redis
from bson import ObjectId
import sys

# Configure logging with forced flushing for Render
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    stream=sys.stdout,
    force=True
)
logger = logging.getLogger(__name__)
logger.setLevel(logging.INFO)

# Force unbuffered output for Render
sys.stdout.reconfigure(line_buffering=True)

app = FastAPI(
    title="Hotel Tablet Security API",
    version="0.6.0",
    debug=settings.debug,
    docs_url="/docs" if settings.debug else None,
    redoc_url="/redoc" if settings.debug else None
)

# Configure CORS
cors_origins = (
    settings.cors_origins.split(",")
    if settings.cors_origins != "*"
    else ["*"]
)       
app.add_middleware(
    CORSMiddleware,
    allow_origins=cors_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    max_age=3600
)

# Redis connection for SSE
redis_client = None

# Background monitoring task
monitoring_task = None

async def monitor_device_heartbeats():
    """Background task to detect devices that stop sending heartbeats (WiFi OFF)"""
    logger.info("🔍 Heartbeat monitoring task started")
    
    while True:
        try:
            await asyncio.sleep(5)  # Check every 5 seconds
            
            current_time = datetime.utcnow()
            
            # Find devices that are "ok" but haven't sent heartbeat in 12+ seconds
            devices = await devices_collection.find({
                "status": StatusEnum.ok,
                "last_seen": {"$exists": True}
            }).to_list(length=1000)
            
            for device in devices:
                last_seen = device.get("last_seen")
                if not last_seen:
                    continue
                    
                offline_seconds = (current_time - last_seen).total_seconds()
                
                # If device hasn't been seen in 12 seconds, trigger breach
                if offline_seconds >= 12:
                    device_id = device["_id"]
                    room_id = device.get("roomId", "UNKNOWN")
                    
                    logger.warning(f"🚨 INSTANT BREACH: Device {device_id} silent for {offline_seconds:.0f}s - WiFi likely OFF")
                    
                    # Update device status to breach
                    await devices_collection.update_one(
                        {"_id": device_id},
                        {"$set": {"status": StatusEnum.breach}}
                    )
                    
                    # Create breach alert
                    await alerts_collection.insert_one({
                        "deviceId": device_id,
                        "roomId": room_id,
                        "type": "breach",
                        "severity": "critical",
                        "message": f"WiFi turned OFF - device silent for {offline_seconds:.0f}s",
                        "rssi": -127,
                        "bssid": "unknown",
                        "ts": current_time,
                        "acknowledged": False,
                        "offline_duration": offline_seconds,
                        "detection_method": "heartbeat_monitoring"
                    })
                    
                    # Broadcast to dashboard INSTANTLY
                    await broadcast_event("alert", {
                        "type": "breach",
                        "deviceId": device_id,
                        "roomId": room_id,
                        "message": f"WiFi OFF detected - silent for {offline_seconds:.0f}s",
                        "source": "instant_monitoring"
                    })
                    
                    await broadcast_event("device_update", {
                        "deviceId": device_id,
                        "status": "breach"
                    })
                    
                    logger.info(f"✅ Breach alert broadcasted to dashboard for {device_id}")
                    
                    # Queue notification
                    asyncio.create_task(
                        NotificationService.send_breach_alert(device_id, room_id, -127)
                    )
                    
        except Exception as e:
            logger.error(f"Error in heartbeat monitoring: {e}", exc_info=True)

@app.on_event("startup")
async def on_startup():
    global redis_client, monitoring_task
    
    print("="*60, flush=True)
    print("🚀 BACKEND STARTUP", flush=True)
    print(f"   Environment: {settings.app_env}", flush=True)
    print(f"   Debug: {settings.debug}", flush=True)
    print(f"   MongoDB: {settings.mongodb_url}", flush=True)
    print("="*60, flush=True)
    
    # Initialize MongoDB indexes
    await init_db()
    print("✅ MongoDB indexes created successfully", flush=True)
    
    # Initialize Redis for SSE
    try:
        redis_instance = await redis.from_url(settings.redis_url)
        await redis_instance.ping()
        redis_client = redis_instance
        logger.info("Redis connected for SSE")
        print("✅ Redis connected for SSE", flush=True)
    except Exception as e:
        redis_client = None
        logger.warning(f"Redis connection failed: {e}. SSE will work without Redis.")
        print(f"⚠️ Redis connection failed: {e}", flush=True)
    
    # Start background heartbeat monitoring
    monitoring_task = asyncio.create_task(monitor_device_heartbeats())
    logger.info("🚀 Background heartbeat monitoring started")
    print("✅ Heartbeat monitoring task started", flush=True)
    print("="*60, flush=True)
    print("📡 READY TO ACCEPT CONNECTIONS", flush=True)
    print("="*60, flush=True)

@app.on_event("shutdown")
async def on_shutdown():
    if redis_client:
        await redis_client.close()
    
    # Cancel monitoring task
    if monitoring_task:
        monitoring_task.cancel()
        try:
            await monitoring_task
        except asyncio.CancelledError:
            pass
        logger.info("Heartbeat monitoring stopped")

# Request Models
class Breach(BaseModel):
    deviceId: str
    roomId: str
    rssi: int
    ts: Optional[datetime] = None

class Battery(BaseModel):
    deviceId: str
    level: int
    ts: Optional[datetime] = None

class Heartbeat(BaseModel):
    deviceId: str
    roomId: str
    wifiBssid: str
    rssi: int
    ip: Optional[str] = None
    battery: Optional[int] = None
    ts: Optional[datetime] = None

class Tamper(BaseModel):
    deviceId: str
    roomId: str
    threats: list[str]
    descriptions: list[str]
    ts: Optional[datetime] = None

class DeviceRegister(BaseModel):
    deviceId: str
    roomId: str
    hotelId: Optional[str] = None

class AlertAcknowledge(BaseModel):
    alertId: str
    acknowledgedBy: str
    notes: Optional[str] = None

# Root endpoint
@app.get("/")
def root():
    return {
        "ok": True,
        "service": "Hotel Tablet Security API",
        "version": "0.5.0",
        "environment": settings.app_env,
        "database": "MongoDB",
        "features": ["JWT Auth", "SSE", "Multi-tenancy", "Message Queue"]
    }

# Health check
@app.get("/health")
async def health_check():
    """Health check endpoint for monitoring"""
    try:
        # Check MongoDB connection
        await db.command("ping")
        return {
            "status": "healthy",
            "database": "connected",
            "redis": redis_client is not None,
            "timestamp": datetime.utcnow().isoformat()
        }
    except Exception as e:
        logger.error(f"Health check failed: {e}")
        raise HTTPException(status_code=503, detail="Service unhealthy")

# Metrics
@app.get("/metrics")
async def metrics():
    """Basic metrics endpoint"""
    total_devices = await devices_collection.count_documents({})
    total_alerts = await alerts_collection.count_documents({})
    breached = await devices_collection.count_documents({"status": "breach"})
    
    return {
        "total_devices": total_devices,
        "total_alerts": total_alerts,
        "breached_devices": breached,
        "timestamp": datetime.utcnow().isoformat()
    }

# Authentication endpoints
@app.post("/api/auth/device-token")
async def create_device_token(payload: DeviceRegister):
    """Issue JWT token for device"""
    token = AuthService.create_device_token(
        device_id=payload.deviceId,
        room_id=payload.roomId,
        hotel_id=payload.hotelId or "default"
    )
    return {"token": token, "type": "Bearer", "expires_in": settings.jwt_expiration_minutes * 60}

@app.post("/api/auth/user-token")
async def create_user_token(username: str = Body(...), password: str = Body(...)):
    """Issue JWT token for user (staff/admin)"""
    if username == "admin" and password == "admin":
        token = AuthService.create_user_token(user_id=username, role="admin")
        return {"token": token, "type": "Bearer", "expires_in": settings.jwt_expiration_minutes * 60}
    raise HTTPException(status_code=401, detail="Invalid credentials")

# Device registration with JWT
@app.post("/api/devices/register")
async def register_device(payload: DeviceRegister):
    """Register device and return JWT token"""
    # Use print for immediate visibility in Render logs
    print("="*60, flush=True)
    print(f"📱 NEW DEVICE REGISTRATION", flush=True)
    print(f"   Device ID: {payload.deviceId}", flush=True)
    print(f"   Room ID: {payload.roomId}", flush=True)
    print(f"   Hotel ID: {payload.hotelId or 'default'}", flush=True)
    print("="*60, flush=True)
    
    logger.info("="*60)
    logger.info(f"📱 NEW DEVICE REGISTRATION")
    logger.info(f"   Device ID: {payload.deviceId}")
    logger.info(f"   Room ID: {payload.roomId}")
    logger.info(f"   Hotel ID: {payload.hotelId or 'default'}")
    logger.info("="*60)
    
    device_data = {
        "_id": payload.deviceId,
        "device_id": payload.deviceId,
        "room_id": payload.roomId,
        "hotel_id": payload.hotelId or "default",
        "status": StatusEnum.ok,
        "last_seen": datetime.utcnow()
    }
    
    await devices_collection.update_one(
        {"_id": payload.deviceId},
        {"$set": device_data},
        upsert=True
    )
    
    # Issue JWT token
    token = AuthService.create_device_token(
        device_id=payload.deviceId,
        room_id=payload.roomId,
        hotel_id=payload.hotelId or "default"
    )
    
    print(f"✅ Device {payload.deviceId} registered successfully", flush=True)
    print(f"🔑 JWT Token issued (length: {len(token)} chars)", flush=True)
    print("="*60, flush=True)
    
    logger.info(f"✅ Device {payload.deviceId} registered successfully")
    logger.info(f"🔑 JWT Token issued (length: {len(token)} chars)")
    logger.info("="*60)
    
    return {"ok": True, "token": token}

# Breach alert with JWT
@app.post("/api/alert/breach")
async def alert_breach(b: Breach, device=Depends(get_current_device)):
    """Record breach alert (JWT protected)"""
    b.ts = b.ts or datetime.utcnow()
    logger.warning(f"BREACH ALERT: Device {b.deviceId}, Room {b.roomId}, RSSI {b.rssi}")
    
    # Update device status
    await devices_collection.update_one(
        {"_id": b.deviceId},
        {
            "$set": {
                "status": StatusEnum.breach,
                "rssi": b.rssi,
                "last_seen": b.ts
            }
        },
        upsert=True
    )
    
    # Create alert
    alert_data = {
        "type": "breach",
        "device_id": b.deviceId,
        "room_id": b.roomId,
        "payload": {
            "deviceId": b.deviceId,
            "roomId": b.roomId,
            "rssi": b.rssi,
            "ts": b.ts.isoformat()
        },
        "ts": b.ts,
        "acknowledged": False
    }
    
    result = await alerts_collection.insert_one(alert_data)
    
    # Broadcast via Redis for SSE
    await broadcast_event("device_update", {
        "deviceId": b.deviceId,
        "status": "breach",
        "rssi": b.rssi
    })
    
    await broadcast_event("alert", {
        "type": "breach",
        "deviceId": b.deviceId,
        "roomId": b.roomId,
        "rssi": b.rssi
    })
    
    # Queue notification task
    asyncio.create_task(
        NotificationService.send_breach_alert(b.deviceId, b.roomId, b.rssi)
    )
    
    return {"ok": True}

# Tamper alert with JWT
@app.post("/api/alert/tamper")
async def alert_tamper(t: Tamper, device=Depends(get_current_device)):
    """Record tamper alert (JWT protected)"""
    t.ts = t.ts or datetime.utcnow()
    logger.warning(f"TAMPER ALERT: Device {t.deviceId}, Threats {t.threats}")
    
    # Update device status
    await devices_collection.update_one(
        {"_id": t.deviceId},
        {
            "$set": {
                "status": StatusEnum.compromised,
                "last_seen": t.ts
            }
        },
        upsert=True
    )
    
    # Create alert
    alert_data = {
        "type": "tamper",
        "device_id": t.deviceId,
        "payload": {
            "deviceId": t.deviceId,
            "roomId": t.roomId,
            "threats": t.threats,
            "descriptions": t.descriptions,
            "ts": t.ts.isoformat()
        },
        "ts": t.ts,
        "acknowledged": False
    }
    
    await alerts_collection.insert_one(alert_data)
    
    # Broadcast via Redis
    await broadcast_event("device_update", {
        "deviceId": t.deviceId,
        "status": "compromised"
    })
    
    await broadcast_event("alert", {
        "type": "tamper",
        "deviceId": t.deviceId,
        "roomId": t.roomId,
        "threats": t.threats
    })
    
    return {"ok": True}

# Battery alert with JWT
@app.post("/api/alert/battery")
async def alert_battery(b: Battery, device=Depends(get_current_device)):
    """Record battery alert (JWT protected)"""
    b.ts = b.ts or datetime.utcnow()
    logger.warning(f"BATTERY ALERT: Device {b.deviceId}, Level {b.level}%")
    
    # Update device battery
    device_doc = await devices_collection.find_one({"_id": b.deviceId})
    
    await devices_collection.update_one(
        {"_id": b.deviceId},
        {
            "$set": {
                "status": StatusEnum.ok,
                "battery": b.level,
                "last_seen": b.ts
            }
        },
        upsert=True
    )
    
    # Create alert
    alert_data = {
        "type": "battery_low",
        "device_id": b.deviceId,
        "room_id": device_doc.get("room_id") if device_doc else None,
        "payload": {
            "deviceId": b.deviceId,
            "level": b.level,
            "ts": b.ts.isoformat()
        },
        "ts": b.ts,
        "acknowledged": False
    }
    
    await alerts_collection.insert_one(alert_data)
    
    # Broadcast via Redis
    await broadcast_event("alert", {
        "type": "battery_low",
        "deviceId": b.deviceId,
        "level": b.level
    })
    
    # Queue notification
    asyncio.create_task(
        NotificationService.send_battery_alert(b.deviceId, b.level)
    )
    
    return {"ok": True}

# Heartbeat with JWT
@app.post("/api/heartbeat")
async def heartbeat(h: Heartbeat, device=Depends(get_current_device)):
    """Record device heartbeat (JWT protected)"""
    h.ts = h.ts or datetime.utcnow()
    
    # Print for immediate visibility
    print(f"💓 HEARTBEAT: {h.deviceId} | Room: {h.roomId} | RSSI: {h.rssi} dBm | Battery: {h.battery}%", flush=True)
    
    logger.info(f"💓 HEARTBEAT: {h.deviceId} | Room: {h.roomId} | RSSI: {h.rssi} dBm | BSSID: {h.wifiBssid[:17]}")
    
    # Check current status and last seen time
    current_device = await devices_collection.find_one({"_id": h.deviceId})
    existing_status = current_device.get("status", StatusEnum.ok) if current_device else StatusEnum.ok
    last_seen = current_device.get("last_seen") if current_device else None
    
    # Check if device was offline for more than 15 seconds (WiFi was OFF)
    if last_seen and existing_status == StatusEnum.ok:
        offline_duration = (h.ts - last_seen).total_seconds()
        if offline_duration > 15:
            logger.warning(f"🚨 WiFi OFF Breach Detected: Device {h.deviceId} was offline for {offline_duration:.1f} seconds")
            existing_status = StatusEnum.breach
            
            # Create breach alert for WiFi OFF period
            await alerts_collection.insert_one({
                "deviceId": h.deviceId,
                "roomId": h.roomId,
                "type": "breach",
                "severity": "critical",
                "message": f"WiFi was turned OFF - device offline for {offline_duration:.0f} seconds",
                "rssi": h.rssi,
                "bssid": h.wifiBssid,
                "ts": h.ts,
                "acknowledged": False,
                "offline_duration": offline_duration
            })
            
            # Broadcast alert immediately
            await broadcast_event("alert", {
                "type": "breach",
                "deviceId": h.deviceId,
                "roomId": h.roomId,
                "rssi": h.rssi,
                "message": f"WiFi OFF - offline for {offline_duration:.0f}s",
                "source": "wifi_off_detection"
            })
            
            # Send notification
            asyncio.create_task(
                NotificationService.send_breach_alert(h.deviceId, h.roomId, h.rssi)
            )
    
    # Proactive breach detection: Check BSSID/RSSI against room baseline
    new_status = existing_status
    
    if existing_status in [StatusEnum.ok, StatusEnum.offline]:
        room = await rooms_collection.find_one({"_id": h.roomId})
        if room:
            target_bssid = room.get("bssid")
            min_rssi = room.get("rssi_threshold", -80)
            
            # 1. BSSID Mismatch check (case-insensitive)
            if target_bssid and h.wifiBssid.lower() != target_bssid.lower():
                logger.warning(f"🚨 Proactive Breach Detected (BSSID): Device {h.deviceId} reported {h.wifiBssid}, expected {target_bssid}")
                new_status = StatusEnum.breach
                
            # 2. RSSI Breach check (if BSSID matches or target is not set)
            elif h.rssi < min_rssi:
                logger.warning(f"🚨 Proactive Breach Detected (RSSI): Device {h.deviceId} reported {h.rssi}, threshold {min_rssi}")
                new_status = StatusEnum.breach

        if new_status == StatusEnum.breach:
            # Create a breach alert record
            await alerts_collection.insert_one({
                "deviceId": h.deviceId,
                "roomId": h.roomId,
                "type": "breach",
                "severity": "high",
                "message": f"Security boundary breach detected via proactive heartbeat monitoring (BSSID: {h.wifiBssid}, RSSI: {h.rssi})",
                "rssi": h.rssi,
                "bssid": h.wifiBssid,
                "ts": h.ts,
                "acknowledged": False
            })
            
            # Broadcast alert
            await broadcast_event("alert", {
                "type": "breach",
                "deviceId": h.deviceId,
                "roomId": h.roomId,
                "rssi": h.rssi,
                "bssid": h.wifiBssid,
                "source": "proactive_heartbeat"
            })
            
            # Queue mobile notification
            asyncio.create_task(
                NotificationService.send_breach_alert(h.deviceId, h.roomId, h.rssi)
            )
        else:
            # If not a breach and was offline, mark as OK
            new_status = StatusEnum.ok

    update_data = {
        "room_id": h.roomId,
        "status": new_status,
        "rssi": h.rssi,
        "bssid": h.wifiBssid,
        "ip": h.ip,
        "last_seen": h.ts
    }
    
    if h.battery is not None:
        update_data["battery"] = h.battery
    
    await devices_collection.update_one(
        {"_id": h.deviceId},
        {"$set": update_data},
        upsert=True
    )
    
    # Broadcast device update
    await broadcast_event("device_update", {
        "deviceId": h.deviceId,
        "status": new_status,
        "rssi": h.rssi,
        "battery": h.battery
    })
    
    return {"ok": True, "status": new_status}

# Alert acknowledgment
@app.post("/api/alerts/acknowledge")
async def acknowledge_alert(payload: AlertAcknowledge):
    """Acknowledge an alert"""
    result = await alerts_collection.update_one(
        {"_id": ObjectId(payload.alertId)},
        {
            "$set": {
                "acknowledged": True,
                "acknowledged_by": payload.acknowledgedBy,
                "acknowledged_at": datetime.utcnow(),
                "notes": payload.notes
            }
        }
    )
    
    if result.modified_count == 0:
        raise HTTPException(status_code=404, detail="Alert not found")
    
    # Broadcast acknowledgment
    await broadcast_event("alert_acknowledged", {
        "alertId": payload.alertId,
        "acknowledgedBy": payload.acknowledgedBy
    })
    
    return {"ok": True}

# Get recent alerts
@app.get("/api/alerts/recent")
async def recent_alerts(limit: int = 100, hotel_id: Optional[str] = None):
    """Get recent alerts with optional hotel filter"""
    query = {}
    if hotel_id:
        query["hotel_id"] = hotel_id
    
    # Optimized query with projection to reduce data transfer
    cursor = alerts_collection.find(
        query,
        projection={"payload": 1, "type": 1, "device_id": 1, "room_id": 1, "ts": 1, "acknowledged": 1, "acknowledged_by": 1, "acknowledged_at": 1}
    ).sort("ts", -1).limit(limit)
    alerts = await cursor.to_list(length=limit)
    
    # Convert ObjectId to string efficiently
    for alert in alerts:
        alert["id"] = str(alert.pop("_id"))
        if alert.get("ts"):
            alert["ts"] = alert["ts"].isoformat()
        if alert.get("acknowledged_at"):
            alert["acknowledged_at"] = alert["acknowledged_at"].isoformat()
    
    return alerts

# List devices
@app.get("/api/devices")
async def list_devices(hotel_id: Optional[str] = None):
    """List all devices with optional hotel filter"""
    query = {}
    if hotel_id:
        query["hotel_id"] = hotel_id
    
    # Optimized with projection
    cursor = devices_collection.find(
        query,
        projection={"room_id": 1, "hotel_id": 1, "status": 1, "battery": 1, "rssi": 1, "ip": 1, "last_seen": 1}
    )
    devices = await cursor.to_list(length=1000)
    
    # List comprehension for better performance
    return [{
        "id": d["_id"],
        "deviceId": d["_id"],
        "roomId": d.get("room_id"),
        "hotelId": d.get("hotel_id"),
        "status": d.get("status"),
        "battery": d.get("battery"),
        "batteryLevel": d.get("battery"),
        "rssi": d.get("rssi"),
        "ip": d.get("ip"),
        "lastSeen": d["last_seen"].isoformat() if d.get("last_seen") else None
    } for d in devices]

# Delete device (Owner only)
@app.delete("/api/devices/{device_id}")
async def delete_device(device_id: str):
    """Delete a device - Owner dashboard feature"""
    # Delete device
    result = await devices_collection.delete_one({"_id": device_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Device not found")
    
    # Delete associated alerts asynchronously
    asyncio.create_task(alerts_collection.delete_many({"device_id": device_id}))
    
    logger.info(f"Device {device_id} deleted")
    
    # Broadcast device removal
    await broadcast_event("device_deleted", {"deviceId": device_id})
    
    return {"ok": True, "message": f"Device {device_id} deleted successfully"}

# Quick add device (Owner dashboard)
@app.post("/api/devices/quick-add")
async def quick_add_device(
    deviceId: str = Body(...),
    roomId: str = Body(...),
    hotelId: str = Body(default="default")
):
    """Quick add device from owner dashboard"""
    # Check if device already exists
    existing = await devices_collection.find_one({"_id": deviceId})
    if existing:
        raise HTTPException(status_code=400, detail="Device ID already exists")
    
    # Create device
    device_data = {
        "_id": deviceId,
        "device_id": deviceId,
        "room_id": roomId,
        "hotel_id": hotelId,
        "status": StatusEnum.ok,
        "last_seen": datetime.utcnow(),
        "battery": None,
        "rssi": None
    }
    
    await devices_collection.insert_one(device_data)
    
    # Generate JWT token for the device
    token = AuthService.create_device_token(
        device_id=deviceId,
        room_id=roomId,
        hotel_id=hotelId
    )
    
    logger.info(f"Device {deviceId} added by owner for room {roomId}")
    
    # Broadcast new device
    await broadcast_event("device_added", {
        "deviceId": deviceId,
        "roomId": roomId,
        "hotelId": hotelId
    })
    
    return {
        "ok": True,
        "message": f"Device {deviceId} added successfully",
        "token": token,
        "device": {
            "deviceId": deviceId,
            "roomId": roomId,
            "hotelId": hotelId,
            "status": "ok"
        }
    }

# Room configuration
@app.post("/api/rooms/upsert")
async def upsert_room(room: dict = Body(...), device=Depends(get_current_device)):
    """Upsert room configuration (JWT protected)"""
    room_data = {
        "_id": room["roomId"],
        "room_id": room["roomId"],
        "name": room.get("name"),
        "ssid": room.get("ssid"),
        "bssid": room.get("bssid"),
        "rssi_threshold": room.get("rssiThreshold", room.get("minRssi", -70))
    }
    
    await rooms_collection.update_one(
        {"_id": room["roomId"]},
        {"$set": room_data},
        upsert=True
    )
    
    return {"ok": True}

# Get device config
@app.get("/api/config/{device_id}")
async def get_config(device_id: str, device=Depends(get_current_device)):
    """Get configuration for a device (JWT protected)"""
    device_doc = await devices_collection.find_one({"_id": device_id})
    
    if device_doc and device_doc.get("room_id"):
        room_doc = await rooms_collection.find_one({"_id": device_doc["room_id"]})
        if room_doc:
            return {
                "room": {
                    "bssid": room_doc.get("bssid"),
                    "ssid": room_doc.get("ssid"),
                    "minRssi": room_doc.get("rssi_threshold", -70)
                },
                "pin": "832504",
                "thresholds": {
                    "batteryLow": 20,
                    "breachGraceSec": 10
                }
            }
    
    # Default fallback
    return {
        "room": {
            "bssid": "AA:BB:CC:DD:EE:FF",
            "minRssi": -70
        },
        "pin": "832504",
        "thresholds": {
            "batteryLow": 20,
            "breachGraceSec": 10
        }
    }

# In-memory event queue for SSE clients (fallback when Redis is not available)
sse_clients: list = []

# Server-Sent Events endpoint
@app.get("/api/events")
async def sse_endpoint():
    """Server-Sent Events endpoint for real-time updates"""
    async def event_generator():
        # Create a queue for this client
        client_queue = asyncio.Queue()
        sse_clients.append(client_queue)
        
        try:
            # Send initial connection message
            yield {
                "event": "connected",
                "data": json.dumps({"message": "Connected to SSE stream"})
            }
            
            if redis_client:
                # Subscribe to Redis pub/sub for multi-worker support
                pubsub = redis_client.pubsub()
                await pubsub.subscribe("sse_events")
                
                try:
                    async for message in pubsub.listen():
                        if message["type"] == "message":
                            data = message["data"].decode("utf-8") if isinstance(message["data"], bytes) else message["data"]
                            yield {
                                "event": "message",
                                "data": data
                            }
                except asyncio.CancelledError:
                    await pubsub.unsubscribe("sse_events")
                    await pubsub.close()
                    raise
            else:
                # Fallback: Use in-memory queue for this client
                logger.info(f"SSE client connected via in-memory queue (total clients: {len(sse_clients)})")
                while True:
                    try:
                        # Wait for events with timeout for periodic pings
                        message = await asyncio.wait_for(client_queue.get(), timeout=30.0)
                        yield {
                            "event": "message",
                            "data": message
                        }
                    except asyncio.TimeoutError:
                        # Send ping to keep connection alive
                        yield {
                            "event": "ping",
                            "data": json.dumps({"timestamp": datetime.utcnow().isoformat()})
                        }
        finally:
            # Clean up this client's queue when connection closes
            if client_queue in sse_clients:
                sse_clients.remove(client_queue)
                logger.info(f"SSE client disconnected (remaining clients: {len(sse_clients)})")
    
    return EventSourceResponse(event_generator())

# Helper function to broadcast events via Redis or in-memory queue
async def broadcast_event(event_type: str, data: dict):
    """Broadcast event to all SSE clients via Redis or in-memory queue"""
    message = json.dumps({
        "type": event_type,
        "data": data,
        "timestamp": datetime.utcnow().isoformat()
    })
    
    if redis_client:
        try:
            # Use Redis for multi-worker support
            await redis_client.publish("sse_events", message)
        except Exception as e:
            # Downgrade to warning to reduce noise if Redis isn't running
            logger.warning(f"Could not broadcast via Redis (likely down): {e}")
    else:
        # Fallback: Use in-memory queue for all connected clients
        if sse_clients:
            logger.info(f"📢 Broadcasting {event_type} to {len(sse_clients)} SSE clients via in-memory queue")
            for client_queue in sse_clients:
                try:
                    # Non-blocking put to avoid slowing down the application
                    client_queue.put_nowait(message)
                except asyncio.QueueFull:
                    logger.warning("SSE client queue full, dropping message")
        else:
            logger.debug(f"No SSE clients connected, skip broadcast: {event_type}")
