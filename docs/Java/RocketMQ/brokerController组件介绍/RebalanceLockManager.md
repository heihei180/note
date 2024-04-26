# RebalanceLockManager

重平衡的锁管理对象，在rocketMQ会进行锁的重平衡，内部通过`mqLockTable` 持有客户端以及messageQueue和ConsumerGroup的绑定关系

## 什么是重平衡

当一个新的消费者客户端添加进来的时候，就需要进行MessageQueue 与 consumerClient之间的绑定关系的重平衡。



![image-20240126221630296](https://gitee.com/gq2/img_repo2/raw/master/img/image-20240126221630296.png)

## 绑定关系解释

在rocketMQ中，为了提高性能，会将消息写到多个MessageQueue中，而消费者又从MessageQueue中拉取数据，每个MessageQueue最多绑定一个消费者客户端，因此，需要在内存中维护这样一份绑定关系。



1. 首先是通过消费者组来区分，因为在rocketMq中，每个消费者组是互相隔离的，意思就是他们之间的消费关系是不一样的。
2. 第二就是一个消费者组下面可以有多个消息队列messageQueue对象，
3. 第三就是一个消息队列messageQueue可以单独绑定一个消费者，这里以id作为唯一标志。

## 如何绑定

1. 首先判断给定的messageQueue是否已经绑定了消费者客户端，如果绑定了消费者，那么这个queue就不会在去绑定新的消费者客户端，**即一个queu只允许一个消费者来消费**，这也是顺序消费的保证前提之一，单个queue的顺序性。
2. 如果找到了有queue没有绑定消费者，那么就需要为这些queue绑定当前的客户端，以便于可以继续消费，下面解释如何进行绑定。
   1. 前提：对于没有绑定消费者的queue进行绑定，已经有消费者消费的queue不会在次绑定。
   2. 根据consumerGroup获取queue之间的绑定关系`ConcurrentHashMap<MessageQueue, LockEntry>`，根据数据结构看到是一对一的关系。
   3. 查找当前queue的锁对象lockEntity
   4. 为空的话，证明当前queue没有绑定消费者，需要创建锁对象，将消费者和queue之间的关系进行绑定。即构建map键值对。
   5. 为绑定关系对象`LockEntity` 设置绑定时间，为当前时间。



## 如何解除绑定关系

将上面绑定关系倒着来，

1. 先根据消费者组找到queue和客户端的绑定映射，
2. 将映射接触，即将map中的key`queue` 移除，那么他们之间的绑定关系也就被删除了。





