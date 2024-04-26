# ConsumerOffsetManager.md

> 消费者便宜管理器，

![image-20240126225650769](https://gitee.com/gq2/img_repo2/raw/master/img/image-20240126225650769.png)



继承了基础的配置管理对象，可知，这个对象里边的配置是会被持久化的，也即会被保存到本地磁盘上，因为`configManager` 就是做文件保存与读取的。。

## 父类继承下来的特性

保存的位置：.config/consumerOffset.json

编码：

解码：

## 核心参数

核心参数就一个：偏移映射表

```java
private ConcurrentMap<String/* topic@group */, ConcurrentMap<Integer, Long>> offsetTable =
    new ConcurrentHashMap<String, ConcurrentMap<Integer, Long>>(512);
```

注意这个映射表的key 是topic和group拼接而成，因此相同的topic下，不同的ConsumerGroup之间的消费者偏移是不会冲突的，互不干扰。



## 核心函数

### 1. 提交偏移 commitOffset

org.apache.rocketmq.broker.offset.ConsumerOffsetManager#commitOffset(java.lang.String, java.lang.String, java.lang.String, int, long)

1. 先通过topic@group组成key来获取偏移关系
2. 如果偏移关系不存在，那么直接将当前的queue和偏移绑定映射关系，结束
3. 如果偏移存在，则更新当前queue上的消费偏移


### 2. 查询偏移 queryOffset

直接看代码以及注释

```java
/**
 * 查询偏移，查询 某个topic下的某个特消费者组在某个 queue下的消费位置
 *
 * @param group   消费者组
 * @param topic   topic
 * @param queueId 队列id
 * @return
 */
public long queryOffset(final String group, final String topic, final int queueId) {
    // topic@group
    String key = topic + TOPIC_GROUP_SEPARATOR + group;
    
    // queue 的消费位置映射表
    ConcurrentMap<Integer, Long> map = this.offsetTable.get(key);
    if (null != map) {
        // 获取当前queue下的消费偏移
        Long offset = map.get(queueId);
        if (offset != null)
            return offset;
    }

    // 查不到就返回-1
    return -1;
}
```

