"use client";
import { useEffect, useState } from "react";

const API = process.env.NEXT_PUBLIC_API_URL || "";

type Device = {
  deviceId: string;
  roomId?: string;
  status?: string;
  battery?: number;
  rssi?: number;
  lastSeen?: string;
  ip?: string;
};

type Alert = {
  type: string;
  payload: any;
  ts: string;
  acknowledged?: boolean;
  notes?: string;
};

export default function EnhancedDashboard() {
  const [devices, setDevices] = useState<Device[]>([]);
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [filter, setFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedAlert, setSelectedAlert] = useState<Alert | null>(null);
  const [eventSource, setEventSource] = useState<EventSource | null>(null);

  // Initialize SSE connection for real-time updates
  useEffect(() => {
    // Try SSE, fallback to polling
    try {
      const es = new EventSource(`${API}/api/events`);
      
      es.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          if (data.type === "device_update" && data.device && data.device.deviceId) {
            setDevices((prev) => {
              const idx = prev.findIndex((d) => d && d.deviceId === data.device.deviceId);
              if (idx >= 0) {
                const updated = [...prev];
                updated[idx] = data.device;
                return updated;
              }
              return [...prev, data.device];
            });
          } else if (data.type === "alert" && data.alert) {
            setAlerts((prev) => [data.alert, ...prev].slice(0, 100));
          }
        } catch (err) {
          console.error("Error parsing SSE message", err);
        }
      };
      
      es.onerror = () => {
        console.error("SSE connection failed, falling back to polling");
        es.close();
        setEventSource(null);
      };
      
      setEventSource(es);
      
      return () => es.close();
    } catch (e) {
      console.warn("SSE not available, using polling");
    }
  }, []);

  // Polling fallback
  useEffect(() => {
    if (eventSource) return; // SSE active, skip polling
    
    const tick = async () => {
      try {
        const [devicesRes, alertsRes] = await Promise.all([
          fetch(`${API}/api/devices`),
          fetch(`${API}/api/alerts/recent?limit=100`)
        ]);
        
        if (!devicesRes.ok || !alertsRes.ok) {
          console.error("API request failed", devicesRes.status, alertsRes.status);
          return;
        }
        
        const d = await devicesRes.json();
        const a = await alertsRes.json();
        
        // Ensure d is an array and filter out any undefined/null values
        const validDevices = Array.isArray(d) ? d.filter(device => device && device.deviceId) : [];
        const validAlerts = Array.isArray(a) ? a.filter(alert => alert) : [];
        
        setDevices(validDevices);
        setAlerts(validAlerts.reverse());
      } catch (e) {
        console.error("Failed to fetch data", e);
      }
    };
    
    tick();
    const id = setInterval(tick, 3000);
    return () => clearInterval(id);
  }, [eventSource]);

  const filteredDevices = devices.filter((d) => {
    if (!d || !d.deviceId) return false; // Safety check
    if (filter !== "all" && d.status !== filter) return false;
    if (searchQuery && !d.deviceId.toLowerCase().includes(searchQuery.toLowerCase()) 
        && !d.roomId?.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  const acknowledgeAlert = async (alert: Alert) => {
    try {
      await fetch(`${API}/api/alerts/acknowledge`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          device_id: alert.payload.deviceId,
          timestamp: alert.ts,
          notes: "Acknowledged from dashboard"
        })
      });
      
      setAlerts((prev) =>
        prev.map((a) => (a === alert ? { ...a, acknowledged: true } : a))
      );
    } catch (e) {
      console.error("Failed to acknowledge alert", e);
    }
  };

  const getStatusColor = (status?: string) => {
    switch (status) {
      case "ok": return "bg-green-500";
      case "breach": return "bg-red-500 animate-pulse";
      case "missing": return "bg-yellow-500";
      default: return "bg-gray-500";
    }
  };

  const getBatteryColor = (battery?: number) => {
    if (!battery) return "text-gray-500";
    if (battery > 50) return "text-green-600";
    if (battery > 20) return "text-yellow-600";
    return "text-red-600 font-bold";
  };

  const getRssiColor = (rssi?: number) => {
    if (!rssi) return "text-gray-500";
    if (rssi > -60) return "text-green-600";
    if (rssi > -70) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Hotel Tablet Security</h1>
            <p className="text-gray-600">
              {devices.length} devices • {alerts.filter((a) => !a.acknowledged).length} unacknowledged alerts
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></span>
            <span className="text-sm text-gray-600">
              {eventSource ? "Live (SSE)" : "Polling"}
            </span>
          </div>
        </div>

        {/* Controls */}
        <div className="bg-white rounded-lg shadow p-4 flex gap-4">
          <input
            type="text"
            placeholder="Search devices or rooms..."
            className="flex-1 px-4 py-2 border rounded-lg"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <select
            className="px-4 py-2 border rounded-lg"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="all">All Devices</option>
            <option value="ok">OK</option>
            <option value="breach">Breach</option>
            <option value="missing">Missing</option>
          </select>
        </div>

        {/* Fleet Grid */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Fleet Status</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredDevices.map((d) => (
              <div
                key={d.deviceId}
                className="bg-white rounded-lg shadow-md p-5 hover:shadow-lg transition-shadow"
              >
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-bold text-lg">{d.deviceId}</h3>
                    <p className="text-sm text-gray-600">Room {d.roomId || "—"}</p>
                  </div>
                  <span className={`w-4 h-4 rounded-full ${getStatusColor(d.status)}`}></span>
                </div>
                
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Status:</span>
                    <span className="font-semibold">{d.status || "—"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Battery:</span>
                    <span className={getBatteryColor(d.battery)}>
                      {d.battery ? `${d.battery}%` : "—"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">RSSI:</span>
                    <span className={getRssiColor(d.rssi)}>
                      {d.rssi ? `${d.rssi} dBm` : "—"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">IP:</span>
                    <span className="font-mono text-xs">{d.ip || "—"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Last Seen:</span>
                    <span className="text-xs">
                      {d.lastSeen ? new Date(d.lastSeen).toLocaleString() : "—"}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {filteredDevices.length === 0 && (
            <div className="text-center text-gray-500 py-12">
              No devices found matching your criteria
            </div>
          )}
        </section>

        {/* Recent Alerts */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Recent Alerts</h2>
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="max-h-96 overflow-y-auto">
              {alerts.map((a, i) => (
                <div
                  key={i}
                  className={`border-b p-4 hover:bg-gray-50 cursor-pointer ${
                    a.acknowledged ? "opacity-50" : ""
                  }`}
                  onClick={() => setSelectedAlert(a)}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span
                          className={`px-2 py-1 rounded text-xs font-semibold ${
                            a.type === "breach"
                              ? "bg-red-100 text-red-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {a.type}
                        </span>
                        <span className="text-sm font-medium">
                          {a.payload.deviceId} • Room {a.payload.roomId}
                        </span>
                        {a.acknowledged && (
                          <span className="text-xs text-green-600">✓ Acknowledged</span>
                        )}
                      </div>
                      <pre className="mt-2 text-xs text-gray-600 overflow-auto">
                        {JSON.stringify(a.payload, null, 2)}
                      </pre>
                    </div>
                    <div className="text-right ml-4">
                      <div className="text-xs text-gray-500">
                        {new Date(a.ts).toLocaleString()}
                      </div>
                      {!a.acknowledged && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            acknowledgeAlert(a);
                          }}
                          className="mt-2 text-xs text-blue-600 hover:underline"
                        >
                          Acknowledge
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
