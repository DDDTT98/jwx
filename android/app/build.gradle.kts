plugins {
    id("com.android.application")
    id("org.jetbrains.kotlin.android")
}

android {
    namespace = "com.jwx.mobile"
    compileSdk = 35

    defaultConfig {
        applicationId = "com.jwx.mobile"
        minSdk = 23
        targetSdk = 35
        versionCode = 1
        versionName = "0.1.0"
    }
}
