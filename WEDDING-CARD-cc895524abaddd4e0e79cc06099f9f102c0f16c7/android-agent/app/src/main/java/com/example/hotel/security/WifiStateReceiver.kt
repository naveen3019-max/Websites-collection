package com.example.hotel.security

import android.content.BroadcastReceiver
import android.content.Context
import android.content.Intent
import android.net.wifi.WifiManager
import android.os.Handler
import android.os.Looper
import android.util.Log
import com.example.hotel.ui.LockActivity
import com.example.hotel.ui.WifiPinDialog
import com.example.hotel.data.AgentRepository
import com.example.hotel.data.BreachRequest
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch

/**
 * Detects when Wi-Fi is turned OFF on the device
 * 
 * With PIN protection: When WiFi is being disabled, immediately turn it back ON
 * and show PIN dialog. Only allow WiFi OFF if correct PIN is entered.
 */
class WifiStateReceiver : BroadcastReceiver() {
    
    companion object {
        private var isProcessingWifiChange = false
        private var lastWifiChangeTime = 0L
    }

    override fun onReceive(context: Context, intent: Intent?) {
        Log.e("WifiStateReceiver", "")
        Log.e("WifiStateReceiver", "════════════════════════════════════════════════")
        Log.e("WifiStateReceiver", "🔔🔔🔔 BROADCAST RECEIVED!")
        Log.e("WifiStateReceiver", "Action: ${intent?.action}")
        Log.e("WifiStateReceiver", "Extras: ${intent?.extras?.keySet()?.joinToString()}")
        Log.e("WifiStateReceiver", "════════════════════════════════════════════════")
        
        // Handle both WiFi state actions
        val action = intent?.action
        if (action != WifiManager.WIFI_STATE_CHANGED_ACTION && 
            action != "android.net.wifi.STATE_CHANGE") {
            Log.e("WifiStateReceiver", "⚠️ Unknown action: $action, ignoring")
            return
        }

        val wifiManager = context.applicationContext.getSystemService(Context.WIFI_SERVICE) as WifiManager
        val currentWifiState = wifiManager.wifiState
        val intentWifiState = intent.getIntExtra(WifiManager.EXTRA_WIFI_STATE, WifiManager.WIFI_STATE_UNKNOWN)
        
        Log.e("WifiStateReceiver", "📶 Intent WiFi state: $intentWifiState")
        Log.e("WifiStateReceiver", "📶 Current WiFi state: $currentWifiState")
        Log.e("WifiStateReceiver", "📶 WiFi enabled: ${wifiManager.isWifiEnabled}")
        
        val wifiState = if (intentWifiState != WifiManager.WIFI_STATE_UNKNOWN) intentWifiState else currentWifiState
        
        // Check if device is provisioned
        val prefs = context.getSharedPreferences("agent", Context.MODE_PRIVATE)
        val isProvisioned = prefs.getBoolean("provisioned", false)
        
        Log.e("WifiStateReceiver", "📋 Device provisioned: $isProvisioned")
        
        // Also check if WiFi is currently being disabled (not just state code)
        if (!wifiManager.isWifiEnabled && wifiState != WifiManager.WIFI_STATE_DISABLING) {
            Log.e("WifiStateReceiver", "🚨 WiFi is ALREADY DISABLED!")
            if (isProvisioned) {
                // Check if it was authorized
                val authorized = prefs.getBoolean("wifi_disable_authorized", false)
                if (!authorized) {
                    Log.e("WifiStateReceiver", "❌ WiFi disabled without authorization - RE-ENABLING!")
                    Handler(Looper.getMainLooper()).post {
                        try {
                            @Suppress("DEPRECATION")
                            wifiManager.isWifiEnabled = true
                            Log.e("WifiStateReceiver", "✅ WiFi re-enabled")
                            
                            // Show PIN dialog
                            val pinIntent = Intent(context, WifiPinDialog::class.java)
                                .addFlags(Intent.FLAG_ACTIVITY_NEW_TASK)
                            context.startActivity(pinIntent)
                        } catch (e: Exception) {
                            Log.e("WifiStateReceiver", "Failed to re-enable WiFi: ${e.message}")
                        }
                    }
                }
                return
            }
        }
        
        when (wifiState) {
            WifiManager.WIFI_STATE_DISABLING -> {
                Log.e("WifiStateReceiver", "⚠️⚠️ WiFi DISABLING - INTERCEPTING!")
                
                if (!isProvisioned) {
                    Log.e("WifiStateReceiver", "Device not provisioned - allowing WiFi disable")
                    return
                }
                
                // Check if this disable was authorized by PIN
                val authorized = prefs.getBoolean("wifi_disable_authorized", false)
                
                if (authorized) {
                    Log.e("WifiStateReceiver", "✅ WiFi disable authorized by PIN - allowing")
                    // Reset the flag
                    prefs.edit().putBoolean("wifi_disable_authorized", false).apply()
                    return
                }
                
                // Prevent duplicate processing
                val currentTime = System.currentTimeMillis()
                if (isProcessingWifiChange && (currentTime - lastWifiChangeTime) < 3000) {
                    Log.e("WifiStateReceiver", "Already processing recent WiFi change, skipping")
                    return
                }
                isProcessingWifiChange = true
                lastWifiChangeTime = currentTime
                
                Log.e("WifiStateReceiver", "🚨 UNAUTHORIZED WiFi disable attempt - turning back ON!")
                
                // Set flag to prevent WifiFence from triggering
                prefs.edit().putBoolean("wifi_pin_dialog_active", true).apply()
                
                // Turn WiFi back ON IMMEDIATELY - ULTRA AGGRESSIVE (20 rapid attempts)
                Handler(Looper.getMainLooper()).post {
                    val handler = Handler(Looper.getMainLooper())
                    var attemptCount = 0
                    
                    // Aggressive continuous re-enable loop
                    val reEnableRunnable = object : Runnable {
                        override fun run() {
                            attemptCount++
                            try {
                                if (!wifiManager.isWifiEnabled) {
                                    for (i in 1..5) {
                                        @Suppress("DEPRECATION")
                                        wifiManager.isWifiEnabled = true
                                    }
                                    Log.e("WifiStateReceiver", "Attempt $attemptCount: Forcing WiFi ON (5x)")
                                }
                                
                                // Keep trying for 2 seconds
                                if (attemptCount < 20) {
                                    handler.postDelayed(this, 100)
                                } else {
                                    Log.e("WifiStateReceiver", "✅ WiFi enforcement complete after $attemptCount attempts")
                                }
                            } catch (e: Exception) {
                                Log.e("WifiStateReceiver", "Failed to force WiFi ON: ${e.message}")
                            }
                        }
                    }
                    handler.post(reEnableRunnable)
                    
                    // Show PIN dialog IMMEDIATELY
                    try {
                        val pinIntent = Intent(context, WifiPinDialog::class.java)
                            .addFlags(Intent.FLAG_ACTIVITY_NEW_TASK)
                        context.startActivity(pinIntent)
                        Log.e("WifiStateReceiver", "📱 PIN dialog launched")
                    } catch (e: Exception) {
                        Log.e("WifiStateReceiver", "Failed to launch PIN dialog: ${e.message}")
                        // Clear flag immediately if dialog failed to launch
                        prefs.edit().putBoolean("wifi_pin_dialog_active", false).apply()
                    }
                    
                    // Safety timeout: Clear flag after 30 seconds even if dialog doesn't close properly
                    handler.postDelayed({
                        val stillActive = prefs.getBoolean("wifi_pin_dialog_active", false)
                        if (stillActive) {
                            Log.w("WifiStateReceiver", "⚠️ WiFi PIN dialog flag stuck - auto-clearing after 30s timeout")
                            prefs.edit().putBoolean("wifi_pin_dialog_active", false).apply()
                        }
                    }, 30000)
                    
                    isProcessingWifiChange = false
                }
            }
            
            WifiManager.WIFI_STATE_DISABLED -> {
                Log.e("WifiStateReceiver", "🚨 WiFi DISABLED state detected")
                
                if (!isProvisioned) {
                    return
                }
                
                // Check if authorized
                val authorized = prefs.getBoolean("wifi_disable_authorized", false)
                if (!authorized) {
                    Log.e("WifiStateReceiver", "🚨 WiFi OFF without authorization - SECURITY BREACH!")
                    handleWifiOff(context)
                } else {
                    Log.e("WifiStateReceiver", "WiFi OFF was authorized")
                    prefs.edit().putBoolean("wifi_disable_authorized", false).apply()
                }
            }
            
            WifiManager.WIFI_STATE_ENABLED -> {
                Log.e("WifiStateReceiver", "✅ WiFi turned ON (ENABLED)")
                isProcessingWifiChange = false
            }
            
            WifiManager.WIFI_STATE_ENABLING -> {
                Log.e("WifiStateReceiver", "⏳ WiFi ENABLING...")
            }
            
            else -> {
                Log.e("WifiStateReceiver", "❓ Unknown WiFi state: $wifiState")
            }
        }
    }

    private fun handleWifiOff(context: Context) {
        Log.e("WifiStateReceiver", "")
        Log.e("WifiStateReceiver", "═══════════════════════════════════════")
        Log.e("WifiStateReceiver", "🚨 handleWifiOff() EXECUTING")
        Log.e("WifiStateReceiver", "═══════════════════════════════════════")
        
        // Check if device is provisioned
        val prefs = context.getSharedPreferences("agent", Context.MODE_PRIVATE)
        val isProvisioned = prefs.getBoolean("provisioned", false)
        val deviceId = prefs.getString("device_id", "UNKNOWN") ?: "UNKNOWN"
        val roomId = prefs.getString("room_id", "UNKNOWN") ?: "UNKNOWN"
        
        Log.e("WifiStateReceiver", "📋 Device ID: $deviceId")
        Log.e("WifiStateReceiver", "📋 Room ID: $roomId")
        Log.e("WifiStateReceiver", "📋 Provisioned: $isProvisioned")
        
        if (!isProvisioned) {
            Log.e("WifiStateReceiver", "⚠️⚠️ Device NOT provisioned - skipping enforcement")
            Log.e("WifiStateReceiver", "═══════════════════════════════════════")
            return
        }
        
        // ALWAYS trigger lock screen when WiFi is OFF (critical security)
        Log.e("WifiStateReceiver", "🔒 Launching LockActivity...")
        try {
            val lockIntent = Intent(context, LockActivity::class.java)
                .addFlags(Intent.FLAG_ACTIVITY_NEW_TASK or Intent.FLAG_ACTIVITY_CLEAR_TOP)
            context.startActivity(lockIntent)
            Log.e("WifiStateReceiver", "✅ LockActivity launched successfully")
        } catch (e: Exception) {
            Log.e("WifiStateReceiver", "❌ FAILED to launch LockActivity: ${e.message}", e)
        }

        // Send alert to backend asynchronously
        val jwtToken = prefs.getString("jwt_token", null)
        Log.e("WifiStateReceiver", "🔑 JWT Token present: ${jwtToken != null}")

        if (jwtToken != null) {
            val scope = CoroutineScope(Dispatchers.IO)
            scope.launch {
                try {
                    val authHeader = "Bearer $jwtToken"
                    Log.e("WifiStateReceiver", "📡 Sending WiFi-OFF breach alert to backend...")
                    AgentRepository.default(context.applicationContext).alerts.breach(
                        authHeader,
                        BreachRequest(deviceId, roomId, -100) // -100 signals WiFi OFF
                    )
                    Log.e("WifiStateReceiver", "✅✅ WiFi-OFF alert sent successfully!")
                } catch (e: Exception) {
                    Log.e("WifiStateReceiver", "❌ Failed to send WiFi-OFF alert: ${e.message}", e)
                }
            }
        } else {
            Log.e("WifiStateReceiver", "⚠️ No JWT token - cannot send backend alert")
        }
        
        Log.e("WifiStateReceiver", "═══════════════════════════════════════")
    }
}
