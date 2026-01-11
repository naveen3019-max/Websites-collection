package com.example.hotel.security

import android.content.Context
import android.content.Intent
import android.content.IntentFilter
import android.net.ConnectivityManager
import android.net.Network
import android.net.NetworkCapabilities
import android.net.NetworkRequest
import android.net.wifi.WifiManager
import android.os.Handler
import android.os.Looper
import android.util.Log
import androidx.localbroadcastmanager.content.LocalBroadcastManager

data class WifiFingerprint(
    val ssid: String?,
    val bssid: String?,
    val rssi: Int,
    val ip: String?
)

class WifiFence(
    context: Context,
    private val targetBssid: String,
    private val targetSsid: String?,
    private val minRssi: Int,
    private val graceSeconds: Int,
    private val onBreach: (Int?) -> Unit
) {

    private val context = context.applicationContext
    private val wifiManager =
        context.getSystemService(Context.WIFI_SERVICE) as WifiManager

    private val connectivityManager =
        context.getSystemService(Context.CONNECTIVITY_SERVICE) as ConnectivityManager

    private val handler = Handler(Looper.getMainLooper())
    private val scanIntervalMs = 2000L // 2 seconds
    private val networkLossTimeoutMs = 15000L // 15 seconds until network loss = breach

    private var breachCounter = 0
    private var isRunning = false
    private var isInBreachState = false  // Flag to prevent repeated breach triggers
    private var lastKnownRssi: Int? = null
    private var lastKnownBssid: String? = null
    private var lastKnownSsid: String? = null
    private var wifiDisconnectTime: Long = 0
    private var lastNetworkCheckTime: Long = 0

    private val networkCallback = object : ConnectivityManager.NetworkCallback() {
        override fun onAvailable(network: Network) {
            Log.d("WifiFence", "Network available: $network")
            wifiDisconnectTime = 0
        }

        override fun onLost(network: Network) {
            Log.e("WifiFence", "🚨 Network lost: $network")
            if (isRunning) {
                wifiDisconnectTime = System.currentTimeMillis()
                // Will be checked in scan loop
            }
        }

        override fun onCapabilitiesChanged(network: Network, caps: NetworkCapabilities) {
            val hasWifi = caps.hasTransport(NetworkCapabilities.TRANSPORT_WIFI)
            val hasInternet = caps.hasCapability(NetworkCapabilities.NET_CAPABILITY_INTERNET)
            Log.v("WifiFence", "Network caps changed: wifi=$hasWifi, internet=$hasInternet")
            
            if (isRunning && !hasWifi) {
                Log.w("WifiFence", "🚨 WiFi transport lost")
                wifiDisconnectTime = System.currentTimeMillis()
            }
        }
    }

    private val scanRunnable = object : Runnable {
        override fun run() {
            if (!isRunning) return

            try {
                lastNetworkCheckTime = System.currentTimeMillis()
                val info = wifiManager.connectionInfo
                val currentBssid = info?.bssid
                val currentSsid = info?.ssid?.trim('"')
                val currentRssi = if (info?.rssi != -127) info?.rssi else null

                Log.i(
                    "WifiFence",
                    "📡 Scan: SSID=$currentSsid, BSSID=$currentBssid, RSSI=$currentRssi dBm " +
                    "(Min: $minRssi dBm, Grace: $graceSeconds s)"
                )

                // Track current state
                lastKnownRssi = currentRssi
                lastKnownBssid = currentBssid
                lastKnownSsid = currentSsid

                // ===== SIMPLE BREACH DETECTION - ANY WIFI =====
                // Only check if WiFi is ON and connected to ANY network
                when {
                    // 1️⃣ CRITICAL: WiFi completely OFF
                    !wifiManager.isWifiEnabled -> {
                        Log.e("WifiFence", "🚨 WiFi is DISABLED (turned OFF)")
                        breachCounter += 3  // Immediate breach
                    }

                    // 2️⃣ CRITICAL: Network loss > 15 seconds
                    wifiDisconnectTime > 0 && 
                    (System.currentTimeMillis() - wifiDisconnectTime) > networkLossTimeoutMs -> {
                        Log.e("WifiFence", "🚨 Network disconnected for > 15 seconds")
                        breachCounter += 3  // Immediate breach
                        wifiDisconnectTime = 0
                    }

                    // 3️⃣ Connection info is null (disconnected or location disabled)
                    currentBssid == null -> {
                        Log.w("WifiFence", "⚠ Not connected to any WiFi network")
                        breachCounter += 2
                    }

                    // ✅ Connected to ANY WiFi network with good signal
                    currentRssi != null && currentRssi >= minRssi -> {
                        if (breachCounter > 0) {
                            Log.i(
                                "WifiFence",
                                "✅ Connected to WiFi (SSID=$currentSsid, RSSI=$currentRssi >= $minRssi dBm). Resetting breach counter (was $breachCounter)"
                            )
                        }
                        breachCounter = 0
                        isInBreachState = false  // Clear breach state when connection is restored
                    }

                    // ⚠️ Connected but signal is weak
                    currentRssi != null && currentRssi < minRssi -> {
                        Log.w("WifiFence", "⚠️ WiFi signal weak: $currentRssi < $minRssi dBm (SSID=$currentSsid)")
                        breachCounter += 1  // Gradual breach - allow some time to reconnect
                    }

                    // Unknown state
                    else -> {
                        Log.w("WifiFence", "⚠ Unknown WiFi state - treating as potential breach")
                        breachCounter++
                    }
                }

                val elapsedSeconds = breachCounter * (scanIntervalMs / 1000)

                if (elapsedSeconds >= graceSeconds) {
                    if (!isInBreachState) {
                        Log.e(
                            "WifiFence",
                            "🚨🚨🚨 WIFI FENCE BREACH! Elapsed: $elapsedSeconds s, Grace: $graceSeconds s"
                        )
                        isInBreachState = true  // Set flag to prevent repeated breach triggers
                        onBreach(lastKnownRssi)
                        breachCounter = 0
                    } else {
                        Log.w("WifiFence", "⚠ Already in breach state, not triggering again")
                    }
                } else if (breachCounter > 0) {
                    Log.w(
                        "WifiFence",
                        "⚠ Breach counter: $breachCounter (~$elapsedSeconds/$graceSeconds s)"
                    )
                }

            } catch (e: Exception) {
                Log.e("WifiFence", "Wi-Fi check failed", e)
            }

            handler.postDelayed(this, scanIntervalMs)
        }
    }

    /** Start monitoring Wi-Fi boundary */
    fun start() {
        if (isRunning) {
            Log.w("WifiFence", "⚠️ Already running, ignoring start() call")
            return
        }
        isRunning = true
        breachCounter = 0
        Log.e("WifiFence", "🚀 WifiFence STARTED - Monitoring every ${scanIntervalMs}ms, Min RSSI: $minRssi dBm, Grace: $graceSeconds s")
        isInBreachState = false  // Reset breach state on start
        wifiDisconnectTime = 0
        
        // Register for network updates
        val request = NetworkRequest.Builder()
            .addTransportType(NetworkCapabilities.TRANSPORT_WIFI)
            .build()
        connectivityManager.registerNetworkCallback(request, networkCallback)
        
        handler.post(scanRunnable)
        Log.i("WifiFence", "✅ WiFi Fence started: SSID=$targetSsid, BSSID=$targetBssid, minRSSI=$minRssi")
    }

    /** Stop monitoring */
    fun stop() {
        isRunning = false
        handler.removeCallbacks(scanRunnable)
        try {
            connectivityManager.unregisterNetworkCallback(networkCallback)
        } catch (e: Exception) {
            Log.e("WifiFence", "Failed to unregister callback", e)
        }
        Log.d("WifiFence", "Fence stopped")
    }

    /** Latest known RSSI (safe for heartbeat use) */
    fun getCurrentRssi(): Int? {
        return lastKnownRssi
    }

    /** Latest known BSSID (safe for heartbeat use) */
    fun getCurrentBssid(): String? {
        return lastKnownBssid
    }

    /** Latest known SSID (safe for heartbeat use) */
    fun getCurrentSsid(): String? {
        return lastKnownSsid
    }

    /** Get current Wi-Fi fingerprint for diagnostics */
    fun getCurrentFingerprint(): WifiFingerprint {
        val info = wifiManager.connectionInfo
        return WifiFingerprint(
            ssid = info?.ssid?.trim('"'),
            bssid = info?.bssid,
            rssi = info?.rssi ?: -100,
            ip = info?.ipAddress?.let { formatIpAddress(it) }
        )
    }

    /** Utility to format IP address from int */
    private fun formatIpAddress(ip: Int): String {
        return "${ip and 0xFF}.${(ip shr 8) and 0xFF}.${(ip shr 16) and 0xFF}.${(ip shr 24) and 0xFF}"
    }
}
