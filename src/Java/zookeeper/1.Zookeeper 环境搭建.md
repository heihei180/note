# 1.Zookeeper 环境搭建

> Zookeeper 源码环境搭建

# 2. 准备

## 2.1 启动类
根据启动脚本`zkServer.bat` 知道，启动类是`org.apache.zookeeper.server.quorum.QuorumPeerMain`.

另外需要先修改一些配置信息，

## 2.2 配置
需要将conf文件下的`zoo.sample.cfg` 复制一份，做修改，`zoo.cfg` 然后指定到idea的启动类， program param 里边 `conf/zoo.cfg` 

## 2.3 maven pom文件修改
将pom中 `<scope>provide</scope>` 的行注释掉，否则她不会加载 jar 进来，运行找不到 Java类
## 2.4 日志配置

再`zookeeper-server` 下的模块中的`pom.xml` 添加maven坐标
```xml

    <dependency>
      <groupId>ch.qos.logback</groupId>
      <artifactId>logback-classic</artifactId>
      <version>1.2.10</version>
    </dependency>

```

导入 logback 日志框架，可以不添加日志配置文件就打印日志，方便调试。

# 3.启动zk
`org.apache.zookeeper.server.quorum.QuorumPeerMain#main` 
执行主函数，启动zk
