package com.example.hotel.ui

import android.content.Intent
import android.os.Bundle
import android.view.Gravity
import android.view.View
import android.widget.Button
import android.widget.LinearLayout
import android.widget.TextView
import androidx.appcompat.app.AppCompatActivity
import com.example.hotel.admin.AdminActivity

class LockActivity : AppCompatActivity() {

    private var clickCount = 0
    private var lastClickTime = 0L

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        // Full-screen, immersive lock
        window.decorView.systemUiVisibility =
            View.SYSTEM_UI_FLAG_IMMERSIVE_STICKY or
            View.SYSTEM_UI_FLAG_FULLSCREEN or
            View.SYSTEM_UI_FLAG_HIDE_NAVIGATION

        val layout = LinearLayout(this).apply {
            orientation = LinearLayout.VERTICAL
            gravity = Gravity.CENTER
            setBackgroundColor(android.graphics.Color.parseColor("#FF5722"))
        }

        val warningText = TextView(this).apply {
            text = "⚠️ DEVICE MOVED OUT OF ROOM\n\nStaff has been notified.\n\nPlease return device to room."
            textSize = 22f
            gravity = Gravity.CENTER
            setTextColor(android.graphics.Color.WHITE)
            setPadding(32, 32, 32, 32)
        }
        layout.addView(warningText)

        // Hidden admin access button (tap 5 times quickly)
        val hiddenButton = Button(this).apply {
            text = "."
            alpha = 0.01f // Nearly invisible
            setOnClickListener {
                val currentTime = System.currentTimeMillis()
                if (currentTime - lastClickTime < 500) {
                    clickCount++
                } else {
                    clickCount = 1
                }
                lastClickTime = currentTime

                if (clickCount >= 5) {
                    // Open admin activity
                    val intent = Intent(this@LockActivity, AdminActivity::class.java)
                    startActivity(intent)
                    clickCount = 0
                }
            }
        }
        layout.addView(hiddenButton)

        setContentView(layout)
    }

    override fun onResume() {
        super.onResume()
        // Enforce Kiosk Mode (Lock Task)
        try {
             // Check if we are device owner or have permission
             val dpm = getSystemService(android.content.Context.DEVICE_POLICY_SERVICE) as android.app.admin.DevicePolicyManager
             if (dpm.isLockTaskPermitted(packageName)) {
                 startLockTask()
             } else {
                 // Try anyway, might catch exception if not allowed
                 startLockTask()
             }
        } catch (e: Exception) {
             android.util.Log.e("LockActivity", "Failed to start lock task", e)
        }
    }

    override fun onBackPressed() {
        // Block back button
    }

    override fun onPause() {
        super.onPause()
        // Check if kiosk is temporarily disabled
        val prefs = getSharedPreferences("admin", MODE_PRIVATE)
        val disabledUntil = prefs.getLong("kiosk_disabled_until", 0)
        if (System.currentTimeMillis() < disabledUntil) {
            // Kiosk disabled, allow exit
            return
        }
        // Bring lock screen back if user tries to escape
        startActivity(intent)
    }
}
