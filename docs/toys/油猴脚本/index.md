# Youtube 视频喜欢

将一些我自己喜欢的好看的youtube视频地址，发送到我自己的服务器上去，由我自己的视频分类整理。
获取图片URL，以及标签分类


# 未来规划

如何进行打标签，或者说选择分类的操作。

# 脚本内容
## 前端脚本

需要注意的是，需要再这里配置服务器的地址，如果后期通过域名访问，大概率就不需要这么做了。

```js
// ==UserScript==
// @name         YouTube 好视频 (发送URL到服务器，添加按钮边距)
// @namespace    http://tampermonkey.net/
// @version      1.9
// @description  在YouTube播放页面添加一个按钮，点击时获取当前页面的URL，并发送到本地服务器，按钮带有左右边距。
// @author       You
// @match        https://www.youtube.com/watch?v=*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    let attempts = 0;
    const maxAttempts = 10;  // 设置最大检测次数

    // 定时器检测函数
    const checkOwnerElement = setInterval(function() {
        attempts++;  // 增加尝试次数

        // 查找ID为actions的元素
        const ownerElement = document.getElementById('actions');
        if (ownerElement) {
            // 如果找到owner元素，创建按钮并停止定时器
            const button = document.createElement('button');
            button.innerText = '喜欢该视频';
            button.style.padding = '11px';
            button.style.backgroundColor = '#ff0000';
            button.style.color = '#ffffff';
            button.style.border = 'none';
            button.style.cursor = 'pointer';
            button.style.marginLeft = '10px'; // 设置左边距
            button.style.marginRight = '10px'; // 设置右边距

            // 按钮点击事件
            button.addEventListener('click', function() {
                const currentURL = window.location.href; // 获取当前页面的URL
                console.log('当前URL:', currentURL);

                // 构造要发送的URL
                const targetURL = `http://localhost:7766/youtube?url=${encodeURIComponent(currentURL)}`;

                // 发送GET请求到本地服务器
                fetch(targetURL)
                    .then(response => {
                        if (response.ok) {
                            console.log('URL成功发送到服务器:', targetURL);
                            showMessage('URL已成功发送到服务器！');
                        } else {
                            console.log('发送请求时出错:', response.statusText);
                            showMessage('发送请求时出错: ' + response.statusText);
                        }
                    })
                    .catch(error => {
                        console.log('发送请求失败:', error);
                        showMessage('发送请求失败: ' + error.message);
                    });
            });

            // 将按钮添加到ID为actions的元素的第一个子元素之前
            const firstChild = ownerElement.firstChild;
            ownerElement.insertBefore(button, firstChild); // 在第一个子元素之前插入按钮

            // 停止定时器
            clearInterval(checkOwnerElement);
            console.log('按钮已成功添加到ID为 actions 的第一个子元素之前。');
        } else {
            console.log('正在等待ID为 actions 的元素渲染...');

            // 如果达到最大尝试次数，停止定时器
            if (attempts >= maxAttempts) {
                clearInterval(checkOwnerElement);
                console.log('未找到ID为 actions 的元素，停止检测。');
            }
        }
    }, 1000); // 每隔1秒检查一次

    // 显示消息框的函数
    function showMessage(message) {
        const messageBox = document.createElement('div');
        messageBox.innerText = message;
        messageBox.style.position = 'fixed';
        messageBox.style.top = '10px';
        messageBox.style.right = '10px';
        messageBox.style.backgroundColor = '#000';
        messageBox.style.color = '#fff';
        messageBox.style.padding = '10px';
        messageBox.style.borderRadius = '5px';
        messageBox.style.zIndex = '9999';
        messageBox.style.fontSize = '18px'; // 增大字体
        document.body.appendChild(messageBox);

        // 两秒后隐藏消息框
        setTimeout(() => {
            messageBox.style.opacity = '0'; // 先淡出
            setTimeout(() => {
                document.body.removeChild(messageBox); // 再从DOM中移除
            }, 300); // 设置淡出效果的持续时间
        }, 2000); // 两秒后隐藏
    }
})();


```

## 后端脚本

```kotlin
package kt.demo.youtube

import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.CrossOrigin
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController


@RestController
class YoutubeController {


    @CrossOrigin("*")
    @GetMapping("/youtube")
    fun youtube(
        @RequestParam("url") url: String): ResponseEntity<String> {
        println("url: $url")
        return ResponseEntity.ok("Hello Youtube")
    }

}

```