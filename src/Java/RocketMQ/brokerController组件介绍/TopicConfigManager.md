# TopicConfigManager

> 管理rmq集群中的所有topic，包括用户自定义的topic以及系统内部的系统级toic

![image-20240126232259734](https://gitee.com/gq2/img_repo2/raw/master/img/image-20240126232259734.png)

上图证明他也是会被存储到本地磁盘的，存储路径是：./config/topics.json

反序列化对象是：TopicConfigSerializeWrapper

```java
public class TopicConfigSerializeWrapper extends RemotingSerializable {
    private ConcurrentMap<String, TopicConfig> topicConfigTable =
        new ConcurrentHashMap<String, TopicConfig>();
    private DataVersion dataVersion = new DataVersion();

    // setter\ getter
}
```

## 核心参数

```java
/**
 * topic 配置表，持有所有topic的配置对象的映射表
 */
private final ConcurrentMap<String, TopicConfig> topicConfigTable =
    new ConcurrentHashMap<String, TopicConfig>(1024);
```

topic 配置映射表，即所有的topic的配置对象，都在这里边放着。

## 核心行为

### 构造器

创建的时候，这个对象会创建几个默认的topic，注意是系统级别的topic。

1. .SELF_TEST_TOPIC  
2. .TBW102
3. .BenchmarkTest 用于基准测试
4. .this.brokerController.getBrokerConfig().getBrokerClusterName() 不知道用集群名字可以干嘛
5. .this.brokerController.getBrokerConfig().getBrokerName() 当前brokername 不知道用来干嘛
6. .TopicValidator.RMQ_SYS_OFFSET_MOVED_EVENT ： 这个好像是移动事件，但是也不确认
7. .TopicValidator.RMQ_SYS_SCHEDULE_TOPIC 这个用于处理延迟消息的topic
8. .this.brokerController.getBrokerConfig().getMsgTraceTopicName() 也不知道 trace的干嘛
9. .this.brokerController.getBrokerConfig().getBrokerClusterName() + "_" + MixAll.REPLY_TOPIC_POSTFIX 这个好像是用于消息重试的topic

## 添加queue

其实很简单，但是我看不懂，就是根据给定的数据，创建一个topicConfig对象，然后放入到map中即可。