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
            
            // ALWAYS start WiFi PIN protection first, regardless of provisioning
            startWifiPinProtection()
            
            // Then start other monitoring (requires provisioning)
            startMonitoring()
        }
        return START_STICKY
    }
    
    /**
     * Start WiFi PIN Protection - works even without provisioning
     */
    private fun startWifiPinProtection() {
        val prefs = getSharedPreferences("agent", Context.MODE_PRIVATE)
        
        // Clear any stuck flags from previous sessions
        prefs.edit()
            .putBoolean("wifi_pin_dialog_active", false)
            .putBoolean("wifi_disable_authorized", false)
            .apply()
        Log.i("KioskService", "✅ Cleared stuck WiFi protection flags")
        
        /* ---------------- WIFI PIN PROTECTION (CONTINUOUS MONITORING) ---------------- */
        // Use BroadcastReceiver as PRIMARY mechanism to revert WiFi OFF immediately
        Log.e("KioskService", "")
        Log.e("KioskService", "═══════════════════════════════════════")
        Log.e("KioskService", "🔐 WiFi PIN Protection - INITIALIZING...")
        Log.e("KioskService", "   Default PIN: 1234")
        Log.e("KioskService", "   Primary: BroadcastReceiver (instant revert)")
        Log.e("KioskService", "   Backup: Monitoring loop (100ms checks)")
        
        serviceScope.launch {
            val wifiManager = getSystemService(Context.WIFI_SERVICE) as WifiManager
            var lastWifiState = wifiManager.isWifiEnabled
            var checkCount = 0
            
            Log.i("KioskService", "🔄 WiFi monitoring loop STARTED - Initial WiFi state: ${if (lastWifiState) "ON" else "OFF"}")
            
            while (isRunning) {
                try {
                    val currentWifiState = wifiManager.isWifiEnabled
                    checkCount++
                    
                    // Log status every 300 checks (30 seconds at 100ms)
                    if (checkCount % 300 == 0) {
                        Log.i("KioskService", "💓 WiFi Monitor Alive - Checks: $checkCount, WiFi: ${if (currentWifiState) "ON" else "OFF"}")
                    }
                    
                    // Check if PIN dialog is active - if so, continuously force WiFi ON
                    val pinDialogActive = prefs.getBoolean("wifi_pin_dialog_active", false)
                    if (pinDialogActive && !currentWifiState) {
                        Log.e("KioskService", "🔐 PIN dialog active and WiFi OFF - forcing WiFi ON!")
                        try {
                            @Suppress("DEPRECATION")
                            wifiManager.isWifiEnabled = true
                            // Try multiple times to ensure it turns ON
                            delay(100)
                            @Suppress("DEPRECATION")
                            wifiManager.isWifiEnabled = true
                            delay(100)
                            @Suppress("DEPRECATION")
                            wifiManager.isWifiEnabled = true
                            Log.e("KioskService", "✅ WiFi forced back ON while dialog active (multiple attempts)")
                        } catch (e: Exception) {
                            Log.e("KioskService", "Failed to force WiFi ON: ${e.message}")
                        }
                        // Don't update lastWifiState - keep trying to turn ON
                        delay(300)
                        continue
                    }
                    
                    // Check if WiFi just turned OFF
                    if (lastWifiState && !currentWifiState) {
                        Log.e("KioskService", "🚨🚨🚨 WiFi TURNED OFF DETECTED!")
                        
                        // Check if authorized
                        val authorized = prefs.getBoolean("wifi_disable_authorized", false)
                        
                        if (!authorized) {
                            Log.e("KioskService", "❌ UNAUTHORIZED - Re-enabling WiFi IMMEDIATELY!")
                            
                            // Set flag to prevent WifiFence from triggering during PIN dialog
                            prefs.edit().putBoolean("wifi_pin_dialog_active", true).apply()
                            
                            // Turn WiFi back ON immediately - ULTRA AGGRESSIVE (5 rapid attempts)
                            for (i in 1..5) {
                                @Suppress("DEPRECATION")
                                wifiManager.isWifiEnabled = true
                            }
                            Log.e("KioskService", "✅ WiFi turned back ON (ultra-aggressive)")
                            
                            // Show PIN dialog with minimal delay
                            Handler(Looper.getMainLooper()).postDelayed({
                                try {
                                    val pinIntent = Intent(applicationContext, com.example.hotel.ui.WifiPinDialog::class.java)
                                        .addFlags(Intent.FLAG_ACTIVITY_NEW_TASK)
                                    startActivity(pinIntent)
                                    Log.e("KioskService", "📱 PIN dialog launched")
                                } catch (e: Exception) {
                                    Log.e("KioskService", "Failed to launch PIN dialog: ${e.message}")
                                }
                            }, 200)  // Reduced delay for faster response
                        } else {
                            Log.e("KioskService", "✅ WiFi disable was AUTHORIZED by PIN")
                            prefs.edit().putBoolean("wifi_disable_authorized", false).apply()
                        }
                    }
                    
                    lastWifiState = currentWifiState
                    
                } catch (e: Exception) {
                    Log.e("KioskService", "WiFi monitor error: ${e.message}")
                }
                
                // Check every 100ms for ULTRA-FAST detection
                delay(100)
            }
        }
        
        Log.e("KioskService", "✅ WiFi PIN Protection Monitor RUNNING!")
        Log.e("KioskService", "   ✓ Monitoring loop active")
        Log.e("KioskService", "   ✓ Will detect WiFi OFF in < 0.1s")
        Log.e("KioskService", "   ✓ Will show PIN dialog immediately")
        Log.e("KioskService", "═══════════════════════════════════════")
        Log.e("KioskService", "")
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
            graceSeconds = 3
        ) { currentRssiNullable: Int? ->

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

                val lockIntent =
                    Intent(this, com.example.hotel.ui.LockActivity::class.java)
                        .addFlags(Intent.FLAG_ACTIVITY_NEW_TASK)

                Log.e("KioskService", "🔒 Launching LockActivity (Orange Breach Screen)...")
                startActivity(lockIntent)
                Log.e("KioskService", "✅ LockActivity launched successfully")
            }, 2000) // Wait 2 seconds to allow WiFi reconnection
        }

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
