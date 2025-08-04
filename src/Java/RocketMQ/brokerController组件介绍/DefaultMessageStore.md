# DefaultMessageStore

> 消息存储管理组件

DefaultMessageStore是[RocketMQ](https://so.csdn.net/so/search?q=RocketMQ&spm=1001.2101.3001.7020)底层存储对外层提供服务的窗口，它通过组织CommitLog、ConsumeQueue、IndexFile来完成RocketMQ存储的功能。本篇分析DefaultMessageStore提供的功能和启动过程的源码实现。



![image-20240126234820039](https://gitee.com/gq2/img_repo2/raw/master/img/image-20240126234820039.png)





