# JWX Android 轻量测试版

- Kotlin 原生 Activity + Android WebView，不改动 Cloudflare Worker 或 Supabase。
- 首次启动输入已经部署的 JWX HTTPS 地址；地址仅保存在本机。
- 顶部「打开微信」通过 Android PackageManager 启动已安装的微信。
- WebView 可通过 `window.JWXNative.copyText("内容")` 调用系统剪贴板，通过 `window.JWXNative.openWechat()` 请求打开微信。
- 当前版本不会自动进入某个联系人聊天页，也不会自动粘贴；只验证 APK 原生唤醒微信能力。

## 构建
GitHub Actions 的「Build Android APK」工作流会生成 Debug APK artifact。也可在 android 目录执行：
`gradle assembleDebug`
