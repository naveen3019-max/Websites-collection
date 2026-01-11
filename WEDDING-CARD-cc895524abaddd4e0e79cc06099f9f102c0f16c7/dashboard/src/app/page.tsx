"use client";
import { useEffect, useState, useCallback } from "react";

const API = process.env.NEXT_PUBLIC_API || "http://localhost:8080";

type Device = { deviceId: string; roomId?: string; status?: string; battery?: number; rssi?: number; lastSeen?: string; hotelId?: string; };
type Alert = { type: string; payload: any; ts: string; };

export default function Home() {
  const [devices, setDevices] = useState<Device[]>([]);
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newDeviceId, setNewDeviceId] = useState("");
  const [newRoomId, setNewRoomId] = useState("");
  const [newHotelId, setNewHotelId] = useState("default");
  const [loading, setLoading] = useState(false);

  const fetchData = useCallback(async () => {
    if (loading) return;
    setLoading(true);
    try {
      const [d, a] = await Promise.all([
        fetch(`${API}/api/devices`).then(r => r.json()),
        fetch(`${API}/api/alerts/recent?limit=50`).then(r => r.json())
      ]);
      setDevices(d);
      setAlerts(a.reverse());
    } catch (e) {
      console.error("Failed to fetch data", e);
    } finally {
      setLoading(false);
    }
  }, [loading]);

  useEffect(() => {
    fetchData();
    const id = setInterval(fetchData, 5000); // Reduced frequency to 5s
    return () => clearInterval(id);
  }, [fetchData]);

  const handleDeleteDevice = async (deviceId: string) => {
    if (!confirm(`Are you sure you want to delete device ${deviceId}? This will also delete all associated alerts.`)) {
      return;
    }

    try {
      const res = await fetch(`${API}/api/devices/${deviceId}`, {
        method: 'DELETE'
      });
      
      if (res.ok) {
        alert(`Device ${deviceId} deleted successfully!`);
        fetchData(); // Refresh list
      } else {
        const error = await res.json();
        alert(`Failed to delete device: ${error.detail || 'Unknown error'}`);
      }
    } catch (e) {
      alert(`Error deleting device: ${e}`);
    }
  };

  const handleAddDevice = async () => {
    if (!newDeviceId || !newRoomId) {
      alert("Please enter Device ID and Room ID");
      return;
    }

    try {
      const res = await fetch(`${API}/api/devices/quick-add`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          deviceId: newDeviceId,
          roomId: newRoomId,
          hotelId: newHotelId
        })
      });

      if (res.ok) {
        const data = await res.json();
        alert(`Device ${newDeviceId} added successfully!\n\nJWT Token (save this):\n${data.token}\n\nConfigure this token in the tablet app.`);
        setShowAddModal(false);
        setNewDeviceId("");
        setNewRoomId("");
        setNewHotelId("default");
        fetchData(); // Refresh list
      } else {
        const error = await res.json();
        alert(`Failed to add device: ${error.detail || 'Unknown error'}`);
      }
    } catch (e) {
      alert(`Error adding device: ${e}`);
    }
  };

  return (
    <main className="p-6 max-w-6xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Hotel Tablets - Owner Dashboard</h1>
        <button 
          onClick={() => setShowAddModal(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium"
        >
          + Add Tablet
        </button>
      </div>

      {/* Add Device Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4 shadow-2xl">
            <h2 className="text-xl font-semibold mb-4">Add New Tablet</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Device ID *</label>
                <input
                  type="text"
                  value={newDeviceId}
                  onChange={(e) => setNewDeviceId(e.target.value)}
                  placeholder="TAB-101"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                />
                <p className="text-xs text-gray-500 mt-1">Unique identifier for the tablet</p>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Room ID *</label>
                <input
                  type="text"
                  value={newRoomId}
                  onChange={(e) => setNewRoomId(e.target.value)}
                  placeholder="101"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                />
                <p className="text-xs text-gray-500 mt-1">Room number where tablet is installed</p>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Hotel ID</label>
                <input
                  type="text"
                  value={newHotelId}
                  onChange={(e) => setNewHotelId(e.target.value)}
                  placeholder="default"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                />
                <p className="text-xs text-gray-500 mt-1">Hotel identifier (for multi-hotel setup)</p>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => {
                  setShowAddModal(false);
                  setNewDeviceId("");
                  setNewRoomId("");
                  setNewHotelId("default");
                }}
                className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-lg font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleAddDevice}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium"
              >
                Add Tablet
              </button>
            </div>
          </div>
        </div>
      )}

      <section>
        <h2 className="text-lg font-medium mb-2">Tablet Fleet ({devices.length})</h2>
        <div className="grid md:grid-cols-2 gap-3">
          {devices.map(d => (
            <div key={d.deviceId} className={`border rounded-xl p-4 relative transition-colors ${
                d.status === 'ok' ? 'bg-green-50 border-green-200' :
                d.status === 'compromised' ? 'bg-red-50 border-red-500 ring-2 ring-red-500' :
                d.status === 'breach' ? 'bg-orange-50 border-orange-200' :
                'bg-gray-50 border-gray-200'
            }`}>
              <button
                onClick={() => handleDeleteDevice(d.deviceId)}
                className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg text-sm font-medium"
              >
                Delete
              </button>
              
              <div className="flex justify-between pr-20">
                <div>
                  <div className="font-medium">{d.deviceId} — Room {d.roomId ?? "-"}</div>
                  <div className="text-sm text-gray-500">Last seen: {d.lastSeen ? new Date(d.lastSeen).toLocaleString() : "—"}</div>
                </div>
                <div className="text-right">
                  <div>Status: <span className="font-semibold">{d.status ?? "—"}</span></div>
                  <div>Battery: <span className="font-semibold">{d.battery ?? "—"}%</span></div>
                  <div>RSSI: <span className="font-semibold">{d.rssi ?? "—"} dBm</span></div>
                </div>
              </div>
            </div>
          ))}
        </div>
        {devices.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            <p className="text-lg">No tablets added yet</p>
            <p className="text-sm mt-2">Click "Add Tablet" to register your first device</p>
          </div>
        )}
      </section>

      <section>
        <h2 className="text-lg font-medium mb-2">Recent Alerts</h2>
        <div className="space-y-2">
          {alerts.map((a, i) => (
            <div key={i} className="border rounded-lg p-3 text-sm">
              <div className="flex justify-between">
                <div className="font-medium">{a.type}</div>
                <div className="text-gray-500">{new Date(a.ts).toLocaleString()}</div>
              </div>
              <pre className="mt-1 text-xs overflow-auto">{JSON.stringify(a.payload, null, 2)}</pre>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
