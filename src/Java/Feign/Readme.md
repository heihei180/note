---
home: false
portfolio: false
title: Open Feign
icon: house
avatar: https://theme-hope-assets.vuejs.press/hero/conan.png

titles:
  - open feign
  - feign
footer: false
---


# OpenFeign

> 生产问题解决笔记

因项目中不同服务互相调用，有时候遇见 spring 无法转换对象的问题，如果要查看原始的文本，还需要 将返回值设置成 Reponse

这里直接再转换的地方打个断点，直接看原始返回报文。

- 发送请求的组件： `SynchronousMethodHandler` 


逻辑 

入口：feign.SynchronousMethodHandler#invoke
发送请求： 执行发送请求和编码转换： feign.SynchronousMethodHandler#executeAndDecode


所以，直接给这里打断点就可以


```java
Object executeAndDecode(RequestTemplate template, Options options) throws Throwable {
	// 1. 获取request对象
    Request request = targetRequest(template);

    Response response;
    long start = System.nanoTime();
    try {
	  // 执行http 请求
	  
      response = client.execute(request, options);
	  
	  // 再这里执行逻辑就行，可以查看返回值：StreamUtils.copyToString(response.body().asInputStream(), Charset.defaultCharset())
      response = response.toBuilder()
          .request(request)
          .requestTemplate(template)
          .build();
    } catch (IOException e) {
      throw errorExecuting(request, e);
    }
    long elapsedTime = TimeUnit.NANOSECONDS.toMillis(System.nanoTime() - start);


	// 解码
    if (decoder != null)
      return decoder.decode(response, metadata.returnType());
  }

```

