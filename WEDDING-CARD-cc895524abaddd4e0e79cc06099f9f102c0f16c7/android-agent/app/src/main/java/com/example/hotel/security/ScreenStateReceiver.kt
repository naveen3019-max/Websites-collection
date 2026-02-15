package com.example.hotel.security

import android.content.BroadcastReceiver
import android.content.Context
import android.content.Intent
import android.os.PowerManager
import android.util.Log

/**
 * Detects screen lock/unlock events
 * 
 * IMPORTANT: When screen is locked, WiFi may disconnect due to power-saving.
 * This is NORMAL behavior, NOT a security breach!
 * 
 * Android 10+ Compatible: Uses PowerManager.isInteractive (API 20+)
 */
class ScreenStateReceiver : BroadcastReceiver() {
    
    companion object {
        @Volatile
        var isScreenOn: Boolean = true
            private set
        
        @Volatile
        private var screenOffTime: Long = 0
        
        @Volatile
        private var screenOnTime: Long = 0
        
        // Grace period AFTER screen turns ON (not while OFF)
        // WiFi needs time to reconnect after screen wakes up
        // Screen OFF = NEVER show breach (indefinite)
        // Screen ON = 3-minute grace for WiFi reconnect, then monitor
        private const val SCREEN_ON_GRACE_PERIOD_MS = 180_000L // 180 seconds (3 minutes)
        
        fun getIsScreenLocked(): Boolean = !isScreenOn
        
        /**
         * Check if WiFi breach should be ignored
         * 
         * FINAL LOGIC: Prevent false breaches from Android's automatic WiFi disconnect
         * 
         * When screen turns OFF:
         * - Android disconnects WiFi after 1-2 minutes (power-saving)
         * - This is NOT a security breach - just normal power management
         * - Grace period: Ignore WiFi disconnects for 5 minutes after screen OFF
         * 
         * When screen turns ON:
         * - No grace period needed
         * - WiFi should be connected
         * - Immediate breach detection if WiFi is off
         * 
         * This prevents false alarms during screen timeout while still detecting real theft.
         */
        fun shouldIgnoreWiFiBreach(): Boolean {
            // Only apply grace period when screen is OFF
            if (!isScreenOn && screenOffTime > 0) {
                val timeSinceScreenOff = System.currentTimeMillis() - screenOffTime
                // Grace period: 5 minutes (300 seconds) to cover Android's delayed WiFi disconnect
                val SCREEN_OFF_GRACE_MS = 300_000L
                
                if (timeSinceScreenOff < SCREEN_OFF_GRACE_MS) {
                    val secsLeft = (SCREEN_OFF_GRACE_MS - timeSinceScreenOff) / 1000
                    Log.d("ScreenState", "⏳ Screen OFF grace: $secsLeft secs remaining (ignoring Android WiFi disconnect)")
                    return true
                } else {
                    Log.d("ScreenState", "⚠️ Screen OFF for ${timeSinceScreenOff/1000}s - WiFi monitoring active")
                }
            } else {
                Log.d("ScreenState", "✅ Screen ON - WiFi monitoring active (no grace period)")
            }
            
            return false
        }
        
        /**
         * Initialize screen state from PowerManager (Android 10+ compatible)
         * Call this when service starts to detect current screen state
         */
        fun initializeScreenState(context: Context) {
            val powerManager = context.getSystemService(Context.POWER_SERVICE) as PowerManager
            isScreenOn = powerManager.isInteractive
            if (!isScreenOn) {
                screenOffTime = System.currentTimeMillis()
            } else {
                screenOnTime = System.currentTimeMillis()
            }
            val state = if (isScreenOn) "ON" else "OFF"
            Log.i("ScreenState", "🔍 Init: Screen $state")
        }
    }
    
    override fun onReceive(context: Context?, intent: Intent?) {
        when (intent?.action) {
            Intent.ACTION_SCREEN_OFF -> {
                isScreenOn = false
                screenOffTime = System.currentTimeMillis()
                screenOnTime = 0 // Clear screen-on timestamp
                Log.i("ScreenState", "")
                Log.i("ScreenState", "═══════════════════════════════════════")
                Log.i("ScreenState", "🌙 SCREEN OFF DETECTED")
                Log.i("ScreenState", "   Cause: Manual lock OR Auto-timeout")
                Log.i("ScreenState", "   ✅ WiFi breaches IGNORED (INDEFINITELY)")
                Log.i("ScreenState", "   No time limit - screen OFF = NO breach")
                Log.i("ScreenState", "═══════════════════════════════════════")
            }
            Intent.ACTION_SCREEN_ON -> {
                isScreenOn = true
                screenOnTime = System.currentTimeMillis() // Start grace period NOW
                val elapsed = if (screenOffTime > 0) (System.currentTimeMillis() - screenOffTime) / 1000 else 0
                Log.i("ScreenState", "")
                Log.i("ScreenState", "═══════════════════════════════════════")
                Log.i("ScreenState", "☀️ SCREEN ON DETECTED")
                Log.i("ScreenState", "   Was off for: ${elapsed}s")
                Log.i("ScreenState", "   ⏳ 3-minute grace period STARTED (WiFi reconnecting)")
                Log.i("ScreenState", "   Breach detection resumes after grace")
                Log.i("ScreenState", "═══════════════════════════════════════")
            }
            Intent.ACTION_USER_PRESENT -> {
                // User unlocked the device (passed lock screen)
                // This happens AFTER ACTION_SCREEN_ON, so screenOnTime already set
                isScreenOn = true
                val elapsed = if (screenOffTime > 0) (System.currentTimeMillis() - screenOffTime) / 1000 else 0
                Log.i("ScreenState", "🔓 USER UNLOCKED (screen was off ${elapsed}s) - Grace period in progress")
            }
        }
    }
}
