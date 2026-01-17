package com.example.hotel.service

import android.app.Service
import android.app.NotificationChannel
import android.app.NotificationManager
import android.content.Context
import android.content.Intent
import android.content.IntentFilter
import android.net.wifi.WifiManager
import android.os.Build
import android.os.Handler
import android.os.IBinder
import android.os.Looper
import android.util.Log
import androidx.core.app.NotificationCompat
import com.example.hotel.security.BatteryWatcher
import com.example.hotel.security.WifiFence
import com.example.hotel.security.WifiStateReceiver
import com.example.hotel.data.AgentRepository
import com.example.hotel.data.HeartbeatRequest
import com.example.hotel.data.BreachRequest
import com.example.hotel.data.BatteryRequest
import com.example.hotel.service.OfflineQueueManager
import kotlinx.coroutines.*

/**
 * Foreground Service to keep WiFi and Battery monitoring alive
 */
class KioskService : Service() {

    private lateinit var wifiFence: WifiFence
    private lateinit var batteryWatcher: BatteryWatcher
    private var wifiStateReceiver: WifiStateReceiver? = null

    private val serviceScope = CoroutineScope(SupervisorJob() + Dispatchers.IO)
    private var isRunning = false

    companion object {
        const val CHANNEL_ID = "HotelKioskService"
        const val NOTIFICATION_ID = 1
    }

    override fun onCreate() {
        super.onCreate()
        createNotificationChannel()

        val notification = NotificationCompat.Builder(this, CHANNEL_ID)
            .setContentTitle("Hotel Security Active")
            .setContentText("Device monitoring in progress")
            .setSmallIcon(android.R.drawable.ic_lock_idle_lock)
            .setPriority(NotificationCompat.PRIORITY_LOW)
            .build()

        startForeground(NOTIFICATION_ID, notification)
        Log.d("KioskService", "Foreground service started")
    }

    override fun onStartCommand(intent: Intent?, flags: Int, startId: Int): Int {
        Log.e("KioskService", "")
        Log.e("KioskService", "═══════════════════════════════════════════════")
        Log.e("KioskService", "🚀 KIOSK SERVICE STARTING - v2.5.0")
        Log.e("KioskService", "═══════════════════════════════════════════════")
        Log.e("KioskService", "")
        
        if (!isRunning) {
            isRunning = true
            
            // WiFi PIN protection disabled
            // startWifiPinProtection()
            
            // Start monitoring (requires provisioning)
            startMonitoring()
        }
        return START_STICKY
    }
    
    /**
     * WiFi PIN Protection - DISABLED
     */
    private fun startWifiPinProtection() {
        // WiFi PIN protection has been disabled
        Log.i("KioskService", "ℹ️ WiFi PIN Protection is DISABLED")
    }

    private fun startMonitoring() {
        try {
            Log.d("KioskService", "Initializing monitoring components...")
            val prefs = getSharedPreferences("agent", Context.MODE_PRIVATE)

            val deviceId = prefs.getString("device_id", "TAB-UNKNOWN")!!
            val roomId = prefs.getString("room_id", "UNKNOWN")!!
            val bssid = prefs.getString("bssid", "AA:BB:CC:DD:EE:FF")!!
            val ssid = prefs.getString("ssid", null)
            val minRssi = prefs.getInt("minRssi", -70)
            
            val auth = prefs.getString("jwt_token", null)?.let { "Bearer $it" }

            if (auth == null) {
                Log.e("KioskService", "No JWT token found, stopping service")
                stopSelf()
                return
            }

            Log.d(
                "KioskService",
                "Configuration: deviceId=$deviceId, roomId=$roomId, targetSSID=$ssid, " +
                "targetBssid=$bssid, minRssi=$minRssi"
            )
            
            /* ---------------- WIFI FENCE WITH MULTI-SIGNAL DETECTION -------- */

        wifiFence = WifiFence(
            context = this,
            targetBssid = bssid,
            targetSsid = ssid,
            minRssi = minRssi,
            graceSeconds = 3,
            onBreach = { currentRssiNullable: Int? ->

            val currentRssi = currentRssiNullable ?: -127
            
            Log.e("KioskService", "")
            Log.e("KioskService", "🚨🚨🚨 WiFi FENCE BREACH DETECTED!")
            Log.e("KioskService", "   RSSI: $currentRssi dBm")
            Log.e("KioskService", "   Min RSSI: $minRssi dBm")
            
            // Check if WiFi PIN dialog is currently active
            val prefs = getSharedPreferences("agent", Context.MODE_PRIVATE)
            val pinDialogActive = prefs.getBoolean("wifi_pin_dialog_active", false)
            
            if (pinDialogActive) {
                Log.w("KioskService", "🔐 WiFi PIN dialog is active - ignoring breach (will recheck in 2s)")
                return@WifiFence
            }
            
            Log.i("KioskService", "⏱️ Waiting 2 seconds to confirm breach...")
            // Wait 2 seconds to give WiFi time to reconnect
            Handler(Looper.getMainLooper()).postDelayed({
                // Check flag again
                val stillActive = prefs.getBoolean("wifi_pin_dialog_active", false)
                if (stillActive) {
                    Log.w("KioskService", "🔐 WiFi PIN dialog now active - aborting breach trigger")
                    return@postDelayed
                }
                
                val wifiManager = getSystemService(Context.WIFI_SERVICE) as WifiManager
                @Suppress("DEPRECATION")
                val connectionInfo = wifiManager.connectionInfo
                val currentRssiNow = connectionInfo?.rssi ?: -127
                val isWifiOn = wifiManager.isWifiEnabled
                val isConnected = isWifiOn && connectionInfo != null && connectionInfo.networkId != -1
                
                Log.i("KioskService", "📊 Breach recheck: WiFi ON=$isWifiOn, Connected=$isConnected, RSSI=$currentRssiNow dBm")
                
                // Check if WiFi is ON and signal is now strong
                if (isConnected && currentRssiNow >= minRssi) {
                    Log.i("KioskService", "✅ WiFi recovered (RSSI: $currentRssiNow >= $minRssi) - canceling breach")
                    return@postDelayed
                }
                
                // If WiFi is OFF or signal still weak, trigger breach
                if (!isWifiOn) {
                    Log.e("KioskService", "🚨 WiFi is OFF - TRIGGERING BREACH!")
                } else if (!isConnected) {
                    Log.e("KioskService", "🚨 WiFi disconnected - TRIGGERING BREACH!")
                } else {
                    Log.e("KioskService", "🚨 WiFi signal still weak ($currentRssiNow < $minRssi) - TRIGGERING BREACH!")
                }


                serviceScope.launch {
                    try {
                        AgentRepository.default(applicationContext).alerts.breach(
                            auth,
                            BreachRequest(deviceId, roomId, currentRssi)
                        )
                        Log.i("KioskService", "✅ Breach alert sent successfully")
                    } catch (e: Exception) {
                        Log.e("KioskService", "Breach alert failed, queuing offline: ${e.message}")
                        try {
                            OfflineQueueManager.getInstance(applicationContext).queueAlert(
                                type = "breach",
                                deviceId = deviceId,
                                roomId = roomId,
                                payload = mapOf("rssi" to currentRssi)
                            )
                        } catch (queueEx: Exception) {
                            Log.e("KioskService", "Failed to queue breach alert", queueEx)
                        }
                    }
                }

                // Orange breach screen disabled - only send backend alert
                Log.i("KioskService", "ℹ️ Breach alert sent to backend (orange screen disabled)")
            }, 2000) // Wait 2 seconds to allow WiFi reconnection
            },
            onRecovery = {
                // WiFi recovered - close the breach screen if it's open
                Log.i("KioskService", "🎉 WiFi RECOVERED - closing breach screen")
                
                // Broadcast to close LockActivity
                val intent = Intent("com.example.hotel.WIFI_RECOVERED")
                sendBroadcast(intent)
                
                // Show toast notification
                Handler(Looper.getMainLooper()).post {
                    android.widget.Toast.makeText(
                        applicationContext,
                        "✅ WiFi Connection Restored - Back Online",
                        android.widget.Toast.LENGTH_LONG
                    ).show()
                }
            }
        )

        wifiFence.start()

        /* ---------------- WIFI STATE RECEIVER (BACKUP) ---------------- */
        // Keep receiver as backup
        wifiStateReceiver = WifiStateReceiver()
        val wifiFilter = IntentFilter(WifiManager.WIFI_STATE_CHANGED_ACTION)
        registerReceiver(wifiStateReceiver, wifiFilter)

        /* ---------------- BATTERY WATCHER ---------------- */

        batteryWatcher = BatteryWatcher(this) { level ->
            Log.e("KioskService", "🚨🔋 LOW BATTERY ALERT: $level% - Sending to backend...")

            serviceScope.launch {
                try {
                    val response = AgentRepository.default(applicationContext).alerts.battery(
                        auth,
                        BatteryRequest(deviceId, level)
                    )
                    Log.i("KioskService", "✅ Battery alert sent successfully: $level%")
                } catch (e: Exception) {
                    Log.e("KioskService", "❌ Battery alert failed: ${e.message}", e)
                    try {
                        OfflineQueueManager.getInstance(applicationContext).queueAlert(
                            type = "battery",
                            deviceId = deviceId,
                            roomId = roomId,
                            payload = mapOf("level" to level)
                        )
                        Log.w("KioskService", "📦 Battery alert queued for retry")
                    } catch (queueEx: Exception) {
                        Log.e("KioskService", "Failed to queue battery alert", queueEx)
                    }
                }
            }
        }

        batteryWatcher.start(threshold = 20)
        Log.i("KioskService", "🔋 Battery monitoring initialized (threshold: 20%)")

        /* ---------------- HEARTBEAT ---------------- */

        serviceScope.launch {
            Log.d("KioskService", "Heartbeat coroutine started")
            val repo = AgentRepository.default(applicationContext).alerts

            while (isRunning) {
                try {
                    Log.v("KioskService", "Heartbeat loop tick starting...")
                    
                    val rssi = wifiFence.getCurrentRssi() ?: -127
                    Log.v("KioskService", "Fetched RSSI: $rssi")
                    
                    val bssidActual = wifiFence.getCurrentBssid() ?: "02:00:00:00:00:00"
                    Log.v("KioskService", "Fetched BSSID: $bssidActual")
                    
                    val battery = batteryWatcher.getCurrentLevel()
                    Log.v("KioskService", "Fetched Battery: $battery%")

                    Log.d("KioskService", "Sending heartbeat: deviceId=$deviceId, bssid=$bssidActual, rssi=$rssi, battery=$battery")
                    val response = repo.heartbeat(
                        auth,
                        HeartbeatRequest(deviceId, roomId, bssidActual, rssi, battery)
                    )

                    val status = response["status"] as? String
                    Log.i("KioskService", "Heartbeat successful. Server status: $status")
 
                    // Sync offline queue if heartbeat succeeded
                    serviceScope.launch {
                        try {
                            Log.v("KioskService", "Checking offline queue for sync...")
                            val offlineQueue = OfflineQueueManager.getInstance(applicationContext)
                            val syncResult = offlineQueue.syncQueuedAlerts()
                            if (syncResult.synced > 0) {
                                Log.i("KioskService", "Successfully synced ${syncResult.synced} offline alerts")
                            }
                        } catch (e: Exception) {
                            Log.e("KioskService", "Offline sync sub-task failed", e)
                        }
                    }
 
                    val isBadStatus = status?.equals("LOCKED", ignoreCase = true) == true ||
                                     status?.equals("COMPROMISED", ignoreCase = true) == true ||
                                     status?.equals("BREACH", ignoreCase = true) == true

                    if (isBadStatus) {
                         Log.w("KioskService", "🚨 Backend requested LOCK (status=$status)")
                         val lockIntent = Intent(applicationContext, com.example.hotel.ui.LockActivity::class.java)
                             .addFlags(Intent.FLAG_ACTIVITY_NEW_TASK or Intent.FLAG_ACTIVITY_CLEAR_TOP)
                         startActivity(lockIntent)
                    }
                } catch (e: Exception) {
                    Log.e("KioskService", "Heartbeat failed in loop: ${e.message}", e)
                }

                Log.v("KioskService", "Waiting 4s for next heartbeat...")
                delay(4_000)
            }
            Log.d("KioskService", "Heartbeat loop exited (isRunning=false)")
        }
    } catch (e: Exception) {
        Log.e("KioskService", "Fatal error starting monitoring", e)
    }
}

    private fun createNotificationChannel() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            val channel = NotificationChannel(
                CHANNEL_ID,
                "Hotel Kiosk Service",
                NotificationManager.IMPORTANCE_LOW
            ).apply {
                description = "Keeps device monitoring active"
            }

            val manager =
                getSystemService(Context.NOTIFICATION_SERVICE) as NotificationManager
            manager.createNotificationChannel(channel)
        }
    }

    override fun onDestroy() {
        super.onDestroy()
        isRunning = false
        serviceScope.cancel()
        wifiFence.stop()
        batteryWatcher.stop()
        
        // Unregister WiFi state receiver
        wifiStateReceiver?.let {
            try {
                unregisterReceiver(it)
                Log.i("KioskService", "WiFi state receiver unregistered")
            } catch (e: Exception) {
                Log.e("KioskService", "Failed to unregister WiFi receiver: ${e.message}")
            }
        }
        
        Log.d("KioskService", "Service stopped")
    }

    override fun onBind(intent: Intent?): IBinder? = null
}
