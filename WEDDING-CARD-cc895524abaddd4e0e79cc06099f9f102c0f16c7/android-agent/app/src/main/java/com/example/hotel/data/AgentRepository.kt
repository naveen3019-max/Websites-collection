package com.example.hotel.data

import com.squareup.moshi.Moshi
import com.squareup.moshi.kotlin.reflect.KotlinJsonAdapterFactory
import retrofit2.Retrofit
import retrofit2.converter.moshi.MoshiConverterFactory
import okhttp3.OkHttpClient
import android.content.Context

class AgentRepository(context: Context) {
    private val prefs = context.getSharedPreferences("agent", Context.MODE_PRIVATE)
    private val baseUrl = prefs.getString("backend_url", "http://10.247.23.77:8080") ?: "http://10.247.23.77:8080"
    
    companion object {
        @Volatile
        private var instance: AgentRepository? = null
        
        fun default(context: Context): AgentRepository {
            return instance ?: synchronized(this) {
                instance ?: AgentRepository(context).also { instance = it }
            }
        }
        
        private val moshi = Moshi.Builder()
            .add(KotlinJsonAdapterFactory())
            .build()
    }
    
    private val retrofitAlerts = Retrofit.Builder()
        .baseUrl(baseUrl)
        .addConverterFactory(MoshiConverterFactory.create(moshi))
        .build()

    val alerts: AlertApi = retrofitAlerts.create(AlertApi::class.java)
}
