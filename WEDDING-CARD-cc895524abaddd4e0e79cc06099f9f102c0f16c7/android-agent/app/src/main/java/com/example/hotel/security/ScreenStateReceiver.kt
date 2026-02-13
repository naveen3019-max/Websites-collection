package com.example.hotel.security

import android.content.BroadcastReceiver
import android.content.Context
import android.content.Intent
import android.util.Log

/**
 * Detects screen lock/unlock events
 * 
 * IMPORTANT: When screen is locked, WiFi may disconnect due to power-saving.
 * This is NORMAL behavior, NOT a security breach!
 */
class ScreenStateReceiver : BroadcastReceiver() {
    
    companion object {
        @Volatile
        var isScreenOn: Boolean = true
            private set
        
        fun getIsScreenLocked(): Boolean = !isScreenOn
    }
    
    override fun onReceive(context: Context?, intent: Intent?) {
        when (intent?.action) {
            Intent.ACTION_SCREEN_OFF -> {
                isScreenOn = false
                Log.i("ScreenState", "🌙 Screen LOCKED/OFF - WiFi changes are NORMAL (power-saving)")
            }
            Intent.ACTION_SCREEN_ON -> {
                isScreenOn = true
                Log.i("ScreenState", "☀️ Screen UNLOCKED/ON - WiFi monitoring ACTIVE")
            }
            Intent.ACTION_USER_PRESENT -> {
                // User unlocked the device (passed lock screen)
                isScreenOn = true
                Log.i("ScreenState", "🔓 User unlocked device - WiFi monitoring ACTIVE")
            }
        }
    }
}
