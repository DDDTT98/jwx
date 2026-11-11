package com.jwx.mobile

import android.app.Activity
import android.app.AlertDialog
import android.content.ClipData
import android.content.ClipboardManager
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
import android.widget.LinearLayout
import android.widget.TextView
import android.widget.Toast

class MainActivity : Activity() {
    private lateinit var webView: WebView
    private val homeUrl = "https://j.chxx1688.com"

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        buildUi()
        loadHome()
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
        bar.addView(title, LinearLayout.LayoutParams(0, -2, 1f))
        bar.addView(openWechat)

        webView = WebView(this).apply {
            this.settings.apply {
                javaScriptEnabled = true
                domStorageEnabled = true
                javaScriptCanOpenWindowsAutomatically = false
                setSupportMultipleWindows(false)
            }
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
        webView.loadUrl(homeUrl)
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

        @JavascriptInterface
        fun openWechatAddFriend(phone: String, name: String, company: String) {
            runOnUiThread {
                val searchValue = phone.trim().ifBlank { name.trim().ifBlank { company.trim() } }
                if (searchValue.isNotBlank()) {
                    val clipboard = getSystemService(CLIPBOARD_SERVICE) as ClipboardManager
                    clipboard.setPrimaryClip(ClipData.newPlainText("JWX好友搜索", searchValue))
                }

                Toast.makeText(
                    this@MainActivity,
                    if (phone.isNotBlank()) "手机号已复制，正在打开微信添加朋友" else "客户信息已复制，正在打开微信添加朋友",
                    Toast.LENGTH_SHORT
                ).show()

                try {
                    val addFriend = Intent(Intent.ACTION_VIEW, Uri.parse("weixin://dl/add")).apply {
                        setPackage("com.tencent.mm")
                        addFlags(Intent.FLAG_ACTIVITY_NEW_TASK)
                    }
                    startActivity(addFriend)
                } catch (_: Exception) {
                    // 部分微信版本/ROM 不接受此内部入口时，至少打开微信首页。
                    launchWechat()
                    Toast.makeText(this@MainActivity, "已打开微信，请进入添加朋友并粘贴搜索", Toast.LENGTH_LONG).show()
                }
            }
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
