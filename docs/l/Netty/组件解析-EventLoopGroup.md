
**EventLoopGroup **本质上其实就是一个线程池，而我们常用的就是 **NioEventLoopGroup **，因此我们再这里来阅读一下 ** NioEventLoopGroup **

#### **NioEventLoopGroup **

先看类的继承关系图：
![image.png](https://cdn.nlark.com/yuque/0/2022/png/2456646/1649656367340-47e48b35-e517-4f80-89b7-4bcb4b40ad80.png#clientId=u606126b8-8fb9-4&from=paste&height=666&id=u5eda0d38&originHeight=833&originWidth=655&originalType=binary&ratio=1&rotation=0&showTitle=false&size=53888&status=done&style=stroke&taskId=u115a0b3f-8e16-4186-aebf-4f9f2e0ec62&title=&width=524)

- 可键 NioEventLoopGroup 继承了 **MultithreadEventLoopGroup **, 
> MultithreadEventLoopGroup 理论说会实现很多通用的操作，但是再这里我们大概只看到他定义了一个默认的属性，就是线程数量，默认取CPU核心数的2倍


- MultithreadEventLoopGroup 又继承自：MultithreadEventExecutorGroup
- MultithreadEventExecutorGroup 继承自： AbstractEventExecutorGroup
- AbstractEventExecutorGroup 实现了接口： EventExecutorGroup

 

- 接口定义：
   - EventExecutorGroup 接口继承了接口：ScheduledExecutorService、Iterable
   - ScheduledExecutorService：是Java util 下的线程池的包 、 继承了ExecutorService
   - ExecutorService 继承了Executor
