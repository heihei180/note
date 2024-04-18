1. 使用 `mybatis-plus`saveBatch() 函数发现增加34条数据耗时11s....

发现需要添加 mysql 参数：
```
rewriteBatchedStatements=true
```

跟踪  mybatis 保存的代码堆栈：

1. 连接池使用的是 hakira
2. 操作MySQL的工具是 mybatis-plus

# 堆栈追踪：
## 1. 入口


```
com.baomidou.mybatisplus.extension.service.IService#saveBatch(java.util.Collection<T>)
com.baomidou.mybatisplus.extension.service.impl.ServiceImpl#saveBatch  ## 进入 mybatis-plus 下 默认提供的批量函数
com.baomidou.mybatisplus.extension.service.impl.ServiceImpl#executeBatch(java.util.Collection<E>, int, java.util.function.BiConsumer<org.apache.ibatis.session.SqlSession,E>)


```

这里会刷新 statment
```java
com.baomidou.mybatisplus.extension.toolkit.SqlHelper#executeBatch(java.lang.Class<?>, org.apache.ibatis.logging.Log, java.util.Collection<E>, int, java.util.function.BiConsumer<org.apache.ibatis.session.SqlSession,E>)
    
    
        public static <E> boolean executeBatch(Class<?> entityClass, Log log, Collection<E> list, int batchSize, BiConsumer<SqlSession, E> consumer) {
        Assert.isFalse(batchSize < 1, "batchSize must not be less than one");
        return !CollectionUtils.isEmpty(list) && executeBatch(entityClass, log, sqlSession -> {
            int size = list.size();
            int i = 1;
            for (E element : list) {
                consumer.accept(sqlSession, element);
                if ((i % batchSize == 0) || i == size) {
                    // 刷新 缓存
                    sqlSession.flushStatements();
                }
                i++;
            }
        });
    }
```

- 然后走到 mybatis的 flush statement

`org.apache.ibatis.session.defaults.DefaultSqlSession#flushStatements`

```java

  @Override
  public List<BatchResult> flushStatements() {
    try {
      return executor.flushStatements();
    } catch (Exception e) {
      throw ExceptionFactory.wrapException("Error flushing statements.  Cause: " + e, e);
    } finally {
      ErrorContext.instance().reset();
    }
  }
```
在这里  executor 实质上是 mybatis plus的 `com.baomidou.mybatisplus.core.executor.MybatisBatchExecutor@5793429b`


但是这里实际上走到了 
`org.apache.ibatis.executor.BaseExecutor#flushStatements()`
这是个模板方法，最终会走到了 mybatis plus 的 `doFlushStatements`

如下：
`com.baomidou.mybatisplus.core.executor.MybatisBatchExecutor#doFlushStatements`

```java
public List<BatchResult> doFlushStatements(boolean isRollback) throws SQLException {
        try {
            List<BatchResult> results = new ArrayList<>();
            for (int i = 0, n = statementList.size(); i < n; i++) {
                try {
                    // 在这里执行 statement、
                    batchResult.setUpdateCounts(stmt.executeBatch());
                    // Close statement to close cursor #1109
                    closeStatement(stmt);
                } catch (BatchUpdateException e) {
                    throw new BatchExecutorException(message.toString(), e, results, batchResult);
                }
                results.add(batchResult);
            }
            return results;
        } 
    }
```

执行 statement 的堆栈如下： 走到了 mysql的驱动这里：
![image.png](https://cdn.nlark.com/yuque/0/2022/png/2456646/1659598947343-99e8dff8-a422-48f5-b2ca-fb00727b6109.png#clientId=u58cf22d7-ce0e-4&from=paste&height=298&id=u87b00a5c&originHeight=373&originWidth=998&originalType=binary&ratio=1&rotation=0&showTitle=false&size=61782&status=done&style=none&taskId=uffe28c34-b12a-4201-9538-1a4b6e6e22c&title=&width=798.4)

## mysql 驱动如下：
```java
com.mysql.cj.jdbc.ClientPreparedStatement#executeBatchInternal
```

batchHasPlainStatements 参数是false
&rewriteBatchedStatements=true
当写了 哪个url 上的参数后，这里是 true “rewriteBatchedStatements
否则是false、不进入

上面哪个是 批量，下面哪个是 串行、
可以点进去开MySQL 官方写的注释

因此，我们为了调用 真正批量化的函数：executeBatchedInserts 或者 ：executePreparedBatchAsMultiStatement
需要在 jdbc url 上添加参数：&rewriteBatchedStatements=true

否则进入串行化参数：
com.mysql.cj.jdbc.ClientPreparedStatement#executeBatchSerially
![image.png](https://cdn.nlark.com/yuque/0/2022/png/2456646/1659599025424-d56804ca-9331-4d70-8b9c-61591bea0e62.png#clientId=u58cf22d7-ce0e-4&from=paste&height=349&id=u02067a85&originHeight=436&originWidth=1233&originalType=binary&ratio=1&rotation=0&showTitle=false&size=77088&status=done&style=none&taskId=u91b61293-2bd9-4370-9f5b-0e4c3542b02&title=&width=986.4)
