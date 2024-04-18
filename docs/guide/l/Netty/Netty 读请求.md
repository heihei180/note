# Netty 读请求


真实读请求位置：
io.netty.channel.nio.AbstractNioByteChannel.NioByteUnsafe#read
这种是读取字节
io.netty.channel.nio.AbstractNioMessageChannel.NioMessageUnsafe#read
这种是读取 message： 
将 Java channel 封装一下、 然后 传递到后续的 handler链条去


前提分析：
netty 启动后： 由于 netty 是多线程写的，他会提交一个任务（一个线程） 
select.accept(); 获取到 key 后他会放入 
`io.netty.channel.nio.SelectedSelectionKeySet` 然后就不管了、

另外 还有另一个线程：
用于获取 channel 上的 读写 和连接事件：
`io.netty.channel.nio.NioEventLoop#run`

大概代码如下所示： 删除很多其他代码：

# 连接请求的处理


```java
/**
可以看到，这就是作为一个线程运行的、
并且这个线程是死循环：
*/
protected void run() {
        int selectCnt = 0;
        for (;;) { 
            // 1. 调用JDK的selector.select()，如果没有IO请求会阻塞住
            strategy = select(curDeadlineNanos);
            // 2.处理 select key
            processSelectedKeys();
        }
    }
```
通过上面可以看到

1. 调用JDK的selector.select()，如果没有IO请求会阻塞住
2. 处理所有的SelectorKeys

这里有个问题，就是 selectKey 在哪？或者说怎么来的？

其实，他是通过多线程协作，比如发送了一个请求连接Netty 服务器
**线程1**：处理accept事件，将 获取到的 key 放到 ：`io.netty.channel.nio.SelectedSelectionKeySet` 然后就不管了、
**线程2：**当selector。select（）获取到IO事件的时候。
然后就不在阻塞了，回往下执行，调用到 `processSelectedKeys`函数：

开始分析：
## processSelectedKeys

- io.netty.channel.nio.NioEventLoop#processSelectedKeys
```java
    private void processSelectedKeys() {
        if (selectedKeys != null) {
            processSelectedKeysOptimized(); // 回调用这里
        } else {
            processSelectedKeysPlain(selector.selectedKeys());
        }
    }
```

- io.netty.channel.nio.NioEventLoop#processSelectedKeysOptimized
```java
private void processSelectedKeysOptimized() {
        for (int i = 0; i < selectedKeys.size; ++i) {
            // 获取所有的selectorKeys 挨个处理
            final SelectionKey k = selectedKeys.keys[i];
            selectedKeys.keys[i] = null;
            // 获取 selectorKey 上绑定的 nettyChannel 对象
            final Object a = k.attachment();
            if (a instanceof AbstractNioChannel) {
                // 肯定是 netty channel啊，回走到这里
                processSelectedKey(k, (AbstractNioChannel) a);
            } else {
                @SuppressWarnings("unchecked")
                // 如果不是 netty channel 包装成一个 netty task、
                NioTask<SelectableChannel> task = (NioTask<SelectableChannel>) a;
                processSelectedKey(k, task);
            }
        }
    }
```

- io.netty.channel.nio.NioEventLoop#processSelectedKey(SelectionKey, AbstractNioChannel)

```java
/**
     * 处理 select key
     *
     * 当 调用 Java的select的时候，会阻塞住，当 有网络请求 
     * 如： read write accept 等等 行为发生是、 select() 函数 会被激活、
     *
     * 激活后 转到这里来处理 select key。
     *
     * select key 的说明 可以看 {@link SelectedSelectionKeySet }
     * select key 被 select 进来的时候、 会 转发到这里
     * 根据 读 或者 写 或者 连接请求的不同 执行不同的处理逻辑、
     * @param k 这个 是 Java nio 的 selectKey
     * @param ch 这个是 selectKey 上携带的附件  即 netty channel、
     */
    private void processSelectedKey(SelectionKey k, AbstractNioChannel ch) {
        // 获取 netty channel 上 进行读取的对象  unsafe
        final AbstractNioChannel.NioUnsafe unsafe = ch.unsafe();

        try {
            int readyOps = k.readyOps(); //
            //  连接事件
            if ((readyOps & SelectionKey.OP_CONNECT) != 0) { 
                // remove OP_CONNECT as otherwise Selector.select(..) will always return without blocking
                // See https://github.com/netty/netty/issues/924
                int ops = k.interestOps();
                ops &= ~SelectionKey.OP_CONNECT;
                k.interestOps(ops);

                unsafe.finishConnect();
            }

            // 写事件
            if ((readyOps & SelectionKey.OP_WRITE) != 0) {
                // Call forceFlush which will also take care of clear the OP_WRITE once there is nothing left to write
                ch.unsafe().forceFlush();
            }

            // 解决 jdk 空轮询bug、  读事件、或者连接事件
            // TODO :Also check for readOps of 0 to workaround possible JDK bug which may otherwise lead to a spin loop
            // 通过底层的 unsafe 读取字节码
            if ((readyOps & (SelectionKey.OP_READ | SelectionKey.OP_ACCEPT)) != 0 || readyOps == 0) {
                unsafe.read();
            }
        } catch (CancelledKeyException ignored) {
            unsafe.close(unsafe.voidPromise());
        }
    }
```
由于当前我们是处理 读事件、因此 一定回走到：
```java
 if ((readyOps & (SelectionKey.OP_READ | SelectionKey.OP_ACCEPT)) != 0 || readyOps == 0) {
                unsafe.read();
```

- io.netty.channel.nio.AbstractNioMessageChannel.NioMessageUnsafe#read

这里使用的是： 
### NioMessageUnsafe  进行读写操作、

读的方式如下：

#### 第一次读
读取操作分为几步：

1. 需要你换读取内容
2. 读取的内容格式不为空，驱动Pipline 上的 链表 fireChannelRead 事件发生
3. 这个事件会 走到 codec 编解码操作等等。。
4. 最后读完还会驱动一个 读取完成 `readComplete`的事件发生：

其实读取就是进行字节码的拷贝，netty 组合了一个 内存管理器
当初次来读取的时候，会新建一个 内存管理器，将 本次请求的所有字节码都放入这个字节码内存管理器中、
然后向后执行，驱动pipline 执行解码等或者让业务handler进行消费
如果 本次操作没有把所有的字节码都使用完，那么是会放入 字节码内存管理器的。
下次又接受一个请求的话、他会把之前剩余的字节码和 下次请求携带的字节码拼接起来 作为一个新的buf
驱动 pipline的 channelRead 事件中、作为参数传递进去

利用这个特性，可以处理TCP 粘包，拆包问题、
收到请求，读取目标长度的字节码，如果没有的，就不处理或者说不读取
可以等待下次请求进来的时候再次读取，比如说两次请求可以将所有的字节码发送完毕
那么久可以完美的处理 拆包粘包问题了。
```java
@Override
        public void read() {
            // 获取 channel 中的 一些组件、
            assert eventLoop().inEventLoop();
            final ChannelConfig config = config();
            final ChannelPipeline pipeline = pipeline();
            final RecvByteBufAllocator.Handle allocHandle = unsafe().recvBufAllocHandle();
            allocHandle.reset(config);

            // 循环读 一直到读不到
            do {
                int localRead = doReadMessages(readBuf);
                // 标记读的次数
                allocHandle.incMessagesRead(localRead);
            } while (continueReading(allocHandle));

            // 读取到内容： 驱动 ChannelRead 事件
            int size = readBuf.size();
            for (int i = 0; i < size; i ++) {
                readPending = false;
                pipeline.fireChannelRead(readBuf.get(i));
            }
            readBuf.clear();
            // 读取完成、 驱动 ReadComplete 事件
            allocHandle.readComplete();
            pipeline.fireChannelReadComplete();
        }
```

当前操作的核心逻辑是
`int localRead = doReadMessages(readBuf);`
所以看一下 如何读取的。

- io.netty.channel.socket.nio.NioServerSocketChannel#doReadMessages
```java
buf.add(new NioSocketChannel(this, ch))
```
可见他是又创建了一个 NioSocketChannel

那就看下如和创建 `NioSocketChannel`
通过以下代码可以看到，这就是构建**主从多 reactor** 的架构模型
将当前连接的Java channel 注册到了新的 netty channel 上、然后返回之后，让 pipline 上的handler 去处理
```java
   public NioSocketChannel(Channel parent, SocketChannel socket) {
        super(parent, socket);
        config = new NioSocketChannelConfig(this, socket.socket());
    }

// super 
io.netty.channel.nio.AbstractNioByteChannel#AbstractNioByteChannel
// 标记只读 读 感兴趣
   protected AbstractNioByteChannel(Channel parent, SelectableChannel ch) {
        super(parent, ch, SelectionKey.OP_READ);
    }
    
// super
// io.netty.channel.nio.AbstractNioChannel#AbstractNioChannel
protected AbstractNioChannel(Channel parent, SelectableChannel ch, int readInterestOp) {
        super(parent);
        this.ch = ch; // 持有 Java Nio channel
        this.readInterestOp = readInterestOp;  // 感兴趣的行为、
        try {
            ch.configureBlocking(false); // 将 java channel 配置成非阻塞的
        } catch (IOException e) {
            throw new ChannelException("Failed to enter non-blocking mode.", e);
        }
    }

// super : 
// io.netty.channel.AbstractChannel#AbstractChannel(io.netty.channel.Channel)
    protected AbstractChannel(Channel parent) {
        this.parent = parent;
        id = newId();
        unsafe = newUnsafe();
        pipeline = newChannelPipeline();
    }

```
## 内存管理
...... 等待 补充吧
netty 这全是多线程调试起来  太难了。。。

### 事件驱动解决编解码问题
通过上面的 分析，可以看到，netty 读取到内容后，就触发了pipline上的 channel read 事件

