# JWX Android APK

- 启动后直接打开 `https://j.chxx1688.com`，无需手动填写域名。
- 顶部「打开微信」可启动已安装的微信。
- JWX 页面在 Android APK 内点击客户手机号、姓名或单位名称时，通过原生桥接复制手机号（没有手机号时复制姓名/单位），并尝试打开微信「添加朋友」入口。
- 微信添加好友仍需用户在微信中粘贴搜索并确认发送申请；微信没有提供普通 APK 可稳定使用的公开接口来自动填充并自动发送好友申请。
- 普通 Android 浏览器仍保留网页自身行为；原生添加好友机制仅在 JWX APK WebView 内启用。

## 构建
GitHub Actions 的「Build Android APK」工作流会生成 Debug APK artifact。也可在 android 目录执行：
`gradle assembleDebug`
