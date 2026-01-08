# AndroidManifest.xml 应用清单概览


> [!info] 
> 官方文档：https://developer.android.com/guide/topics/manifest/manifest-intro?hl=zh-cn




每个应用项目都必须在项目源代码集的根目录下有一个 AndroidManifest 文件，且文件名精确无误。清单文件会向 Android 构建工具、Android 操作系统和 Google Play 描述有关应用的基本信息。

清单文件必须声明以下内容（还有许多其他内容）：

- 应用的组件，包括所有 activity、服务、广播接收器和 content provider。每个组件都必须定义一些基本属性，如该组件的 Kotlin 或 Java 类的名称。组件还会声明一些功能，如它可以处理哪些设备配置，以及描述如何启动组件的 intent 过滤器。请阅读下一部分，详细了解应用组件。


- 应用为了访问系统或其他应用的受保护部分而需要具备的权限。清单文件还会声明其他应用想要访问此应用的内容时必须具备的所有权限。请阅读下一部分，详细了解权限。

- 应用所需的硬件和软件功能，这些功能会影响哪些设备可以从 Google Play 安装该应用。请阅读下一部分，详细了解设备兼容性。


# 文件功能

## 声明组件

- Activity 应该 声明  `<activity>` 标签 
- Service 应该声明 `<service>` 标签
- BroadcastReceiver 需要 `<receiver>`
- ContentProvider 需要 `<provider>` 

> 如果您将上述任一组件加入子类而未在清单文件中声明该组件，则系统无法启动该组件。
> 即只编写代码，但不在xml中声明，是无法使用组件的。


## 声明方式
### 1 通过全限定路径名
这里使用的是全路径名

```xml
<manifest ... >
    <application ... >
        <activity android:name="com.example.myapp.MainActivity" ... >
        </activity>
    </application>
</manifest>
```

### 2. 相对路径

```xml
<manifest ... >
    <application ... >
        <activity android:name=".MainActivity" ... >
            ...
        </activity>
    </application>
</manifest>
```

当然，使用 `.MainActivity` 这种，只能读到根路径下的activity，如果再子包中的 activity，则需要带上包名。

```xml
<activity
            android:name=".pages.HelloWorldActivity"
            android:exported="false" />

```


## intent 过滤器

- 意图

activity、服务和广播接收器由 intent 激活.

> 它描述了要执行的操作，包括作为操作对象的数据、应执行操作的组件类别，以及其他说明

当应用向系统发出某个 intent 时，系统会根据每个应用的清单文件中的 intent 过滤器声明来查找可以处理该 intent 的应用组件。系统会启动符合条件的组件的实例，并将 Intent 对象传递给该组件。**如果多个应用可以处理相应的 intent，则用户可以选择要使用哪个应用**


一个应用组件可以具有任意多个 intent 过滤器（使用 <intent-filter> 元素定义），每个 intent 过滤器描述该组件的不同功能。

文档：
https://developer.android.com/guide/components/intents-filters?hl=zh-cn



## 图标和标签
许多清单元素具有 icon 和 label 属性，分别用于向用户显示相应应用组件的一个小图标和一个文本标签。


## 权限
https://developer.android.com/guide/topics/manifest/manifest-intro?hl=zh-cn#perms

Android 应用必须请求权限才能访问敏感的用户数据（如联系人和短信）或某些系统功能（如相机和互联网接入）。每种权限都由唯一的标签进行标识。例如，需要发送短信的应用必须在清单中添加以下代码行：

```xml
<manifest ... >
<!-- 申请短信的权限-->
    <uses-permission android:name="android.permission.SEND_SMS"/>
    ...
</manifest>
```

## 清单文件示例
下面的 XML 是一个简单的 AndroidManifest.xml 示例，它为应用声明了两个 activity。

```xml
<?xml version="1.0" encoding="utf-8"?>
<manifest
    xmlns:android="http://schemas.android.com/apk/res/android"
    android:versionCode="1"
    android:versionName="1.0">

    <!-- Beware that these values are overridden by the build.gradle file -->
    <uses-sdk android:minSdkVersion="15" android:targetSdkVersion="26" />

    <application
        android:allowBackup="true"
        android:icon="@mipmap/ic_launcher"
        android:roundIcon="@mipmap/ic_launcher_round"
        android:label="@string/app_name"
        android:supportsRtl="true"
        android:theme="@style/AppTheme">

        <!-- This name is resolved to com.example.myapp.MainActivity
             based on the namespace property in the build.gradle file -->
        <activity android:name=".MainActivity">
            <intent-filter>
                <action android:name="android.intent.action.MAIN" />
                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>
        </activity>

        <activity
            android:name=".DisplayMessageActivity"
            android:parentActivityName=".MainActivity" />
    </application>
</manifest>
```
