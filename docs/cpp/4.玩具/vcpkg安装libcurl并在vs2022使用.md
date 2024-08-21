# libcurl 下载网络文件

> 使用 vcpkg 安装 libcurl

# 安装vkpkg
## 1. download
从GitHub上下载vcpkg工具，下载地址： `git clone https://github.com/Microsoft/vcpkg.git`

下载后，进入 `vcpkg` 目录
执行 `bootstrap-vcpkg.bat`
会自动下载 vcpkg 程序
## 2. 需要的话可以配置环境变量
vcpkg 是一个c/c++库管理工具，可以方便的安装各种库，比如libcurl
# 2.安装 libcurl
https://blog.csdn.net/shhpeng/article/details/136006113

安装命令：
```shell vcpkg.exe  install curl:x64-windows```

成功截图：
![libcurl的安装位置](https://i-blog.csdnimg.cn/direct/a2595c1c36ff44648758032870cbc985.png)

# 3.vs2022 引用库
https://www.cnblogs.com/ligang0357/p/17188394.html

![在这里插入图片描述](https://i-blog.csdnimg.cn/direct/505f472496414b29a56661ff10a43ca7.png)

![在这里插入图片描述](https://i-blog.csdnimg.cn/direct/5b62d31aa0b141bf9e24f334682f1b5a.png)


# 4. 使用库

```cpp

#include <iostream>  
#include <curl/curl.h>  





// 回调函数，用于接收下载的数据  
size_t write_data(void* ptr, size_t size, size_t nmemb, FILE* stream) {
    size_t written = fwrite(ptr, size, nmemb, stream);
    return written;
}

int main(void) {
    CURL* curl;
    FILE* fp;
    CURLcode res;
  

    curl_global_init(CURL_GLOBAL_ALL);

    curl = curl_easy_init();
    if (curl) {
        // 打开文件用于写入  
        int code = fopen_s( &fp,"downloaded_file.mp4", "wb");

        std::cout << "open file result code" << code << std::endl;

        // 设置URL  
        curl_easy_setopt(curl, CURLOPT_URL, "https://v3-default.365yg.com/d4f33a9ffe99ddd16160a1f9db76e3d1/66c59602/video/tos/cn/tos-cn-ve-4/owJAVf64fgCRDqoERI1EAiBDJAdFIuW7mRdcjJ/?a=0&ch=0&cr=0&dr=0&er=0&lr=unwatermarked&net=5&cd=0%7C0%7C0%7C0&cv=1&br=3804&bt=3804&cs=0&ds=4&eid=21760&ft=E3rg311Wv_SQ94iZxG0Id.xclfP8lciC~H3VWHrKsE&mime_type=video_mp4&qs=0&rc=PGg1ODVpNmY1Z2g0NzwzZkBpamtrOnQ5cnJ0czMzNDczM0AwNC41YjQyXjUxNGAuLjIyYSNecmBrMmRrYm9gLS1kLTBzcw%3D%3D&btag=c0000e00028000&dy_q=1724221201&feature_id=df0cd2e352f757347f92c05051e140af&l=20240821142001FC23A856EC1AD1009D39");

        // 设置回调函数和文件指针  
        curl_easy_setopt(curl, CURLOPT_WRITEFUNCTION, write_data);
        curl_easy_setopt(curl, CURLOPT_WRITEDATA, fp);

        // 执行下载  
        res = curl_easy_perform(curl);

        // 检查错误  
        if (res != CURLE_OK)
            fprintf(stderr, "curl_easy_perform() failed: %s\n",
                curl_easy_strerror(res));

        // 清理  
        curl_easy_cleanup(curl);
        fclose(fp);
    }

    curl_global_cleanup();

    std::cout << "file download complete" << std::endl;

    return 0;
}
```