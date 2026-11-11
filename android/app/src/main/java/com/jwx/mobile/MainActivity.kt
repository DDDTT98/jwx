package com.jwx.mobile

import android.app.Activity
import android.app.AlertDialog
import android.content.ClipData
import android.content.ClipboardManager
import android.content.Context
import android.content.Intent
import android.graphics.Color
import android.net.Uri
import android.os.Bundle
import android.view.Gravity
import android.view.View
import android.webkit.JavascriptInterface
import android.webkit.WebChromeClient
import android.webkit.WebResourceRequest
import android.webkit.WebView
import android.webkit.WebViewClient
import android.widget.Button
import android.widget.EditText
import android.widget.LinearLayout
import android.widget.TextView
import android.widget.Toast

class MainActivity : Activity() {
    private lateinit var webView: WebView
    private val prefs by lazy { getSharedPreferences("jwx", Context.MODE_PRIVATE) }
    private val homeUrl get() = prefs.getString("url", "") ?: ""

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        buildUi()
        if (homeUrl.isBlank()) showUrlDialog() else loadHome()
    }

    private fun buildUi() {
        val root = LinearLayout(this).apply {
            orientation = LinearLayout.VERTICAL
            setBackgroundColor(Color.WHITE)
        }
        val bar = LinearLayout(this).apply {
            orientation = LinearLayout.HORIZONTAL
            gravity = Gravity.CENTER_VERTICAL
            setPadding(8, 6, 8, 6)
            setBackgroundColor(Color.rgb(247, 247, 247))
        }
        val title = TextView(this).apply {
            text = "JWX"
            textSize = 16f
            setTextColor(Color.DKGRAY)
            setPadding(8, 0, 8, 0)
        }
        val openWechat = Button(this).apply {
            text = "打开微信"
            setOnClickListener { launchWechat() }
        }
        val settings = Button(this).apply {
            text = "设置网址"
            setOnClickListener { showUrlDialog() }
        }
        bar.addView(title, LinearLayout.LayoutParams(0, -2, 1f))
        bar.addView(openWechat)
        bar.addView(settings)

        webView = WebView(this).apply {
            settings.javaScriptEnabled = true
            settings.domStorageEnabled = true
            settings.javaScriptCanOpenWindowsAutomatically = false
            settings.setSupportMultipleWindows(false)
            addJavascriptInterface(NativeBridge(), "JWXNative")
            webChromeClient = WebChromeClient()
            webViewClient = object : WebViewClient() {
                override fun shouldOverrideUrlLoading(view: WebView, request: WebResourceRequest): Boolean {
                    val uri = request.url
                    if (uri.scheme == "https" && uri.host == Uri.parse(homeUrl).host) return false
                    if (uri.scheme == "weixin") {
                        launchWechat()
                        return true
                    }
                    if (uri.scheme == "tel") {
                        return try {
                            startActivity(Intent(Intent.ACTION_DIAL, uri)); true
                        } catch (_: Exception) { true }
                    }
                    return true
                }
            }
        }
        root.addView(bar, LinearLayout.LayoutParams(-1, -2))
        root.addView(webView, LinearLayout.LayoutParams(-1, 0, 1f))
        setContentView(root)
    }

    private fun loadHome() {
        val url = homeUrl.trim()
        if (!url.startsWith("https://")) {
            Toast.makeText(this, "请使用 HTTPS 网站地址", Toast.LENGTH_LONG).show()
            showUrlDialog()
            return
        }
        webView.loadUrl(url)
    }

    private fun showUrlDialog() {
        val input = EditText(this).apply {
            hint = "https://你的 JWX 网站地址"
            setSingleLine(true)
            setText(homeUrl)
            inputType = android.text.InputType.TYPE_TEXT_VARIATION_URI
        }
        AlertDialog.Builder(this)
            .setTitle("设置 JWX 网站")
            .setMessage("输入当前已部署的 JWX HTTPS 地址。地址只保存在本机。")
            .setView(input)
            .setPositiveButton("保存并打开") { _, _ ->
                val value = input.text.toString().trim().trimEnd('/')
                if (value.startsWith("https://")) {
                    prefs.edit().putString("url", value).apply()
                    loadHome()
                } else {
                    Toast.makeText(this, "请输入有效的 HTTPS 地址", Toast.LENGTH_LONG).show()
                }
            }
            .setNegativeButton("取消", null)
            .show()
    }

    private fun launchWechat() {
        val intent = packageManager.getLaunchIntentForPackage("com.tencent.mm")
        if (intent == null) {
            Toast.makeText(this, "未检测到微信，请先安装微信", Toast.LENGTH_LONG).show()
            return
        }
        try {
            intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK)
            startActivity(intent)
        } catch (_: Exception) {
            Toast.makeText(this, "无法打开微信，请检查系统应用启动限制", Toast.LENGTH_LONG).show()
        }
    }

    inner class NativeBridge {
        @JavascriptInterface
        fun copyText(value: String) {
            runOnUiThread {
                val clipboard = getSystemService(CLIPBOARD_SERVICE) as ClipboardManager
                clipboard.setPrimaryClip(ClipData.newPlainText("JWX", value))
                Toast.makeText(this@MainActivity, "复制成功", Toast.LENGTH_SHORT).show()
            }
        }

        @JavascriptInterface
        fun openWechat() {
            runOnUiThread { launchWechat() }
        }
    }

    override fun onBackPressed() {
        if (::webView.isInitialized && webView.canGoBack()) webView.goBack() else super.onBackPressed()
    }

    override fun onDestroy() {
        if (::webView.isInitialized) webView.destroy()
        super.onDestroy()
    }
}
