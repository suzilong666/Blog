# MyBatis核心原理

## 一、整体架构

### 1.1 MyBatis架构图

```
┌─────────────────────────────────────────────────────────────┐
│                    MyBatis核心架构                            │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌─────────────────────────────────────────────────────┐    │
│  │                    应用层（User API）                │    │
│  │  SqlSession.selectOne() / insert() / update()       │    │
│  └─────────────────────────────────────────────────────┘    │
│                          │                                   │
│                          ▼                                   │
│  ┌─────────────────────────────────────────────────────┐    │
│  │                 接口层（Mapper接口）                │    │
│  │  UserMapper.selectById() / insert() / update()      │    │
│  └─────────────────────────────────────────────────────┘    │
│                          │                                   │
│                          ▼                                   │
│  ┌─────────────────────────────────────────────────────┐    │
│  │                  核心配置层（Configuration）         │    │
│  │  - MappedStatement（SQL映射信息）                   │    │
│  │  - ResultMap（结果映射规则）                         │    │
│  │  - SqlSource（SQL源代码）                           │    │
│  └─────────────────────────────────────────────────────┘    │
│                          │                                   │
│                          ▼                                   │
│  ┌─────────────────────────────────────────────────────┐    │
│  │                   执行层（Executor）                │    │
│  │  - BatchExecutor（批量执行）                         │    │
│  │  - ReuseExecutor（复用Statement）                   │    │
│  │  - SimpleExecutor（简单执行）                       │    │
│  │  - CachingExecutor（缓存执行器）                    │    │
│  └─────────────────────────────────────────────────────┘    │
│                          │                                   │
│                          ▼                                   │
│  ┌─────────────────────────────────────────────────────┐    │
│  │                  SQL构建层（Builder）               │    │
│  │  - XMLMapperBuilder（解析XML）                      │    │
│  │  - SqlBuilder（动态SQL构建）                        │    │
│  │  - DynamicSqlSource（动态SQL源）                    │    │
│  └─────────────────────────────────────────────────────┘    │
│                          │                                   │
│                          ▼                                   │
│  ┌─────────────────────────────────────────────────────┐    │
│  │                   数据源层（DataSource）             │    │
│  │  - UNPOOLED（非连接池）                             │    │
│  │  - POOLED（连接池）                                 │    │
│  │  - JNDI（JNDI数据源）                               │    │
│  └─────────────────────────────────────────────────────┘    │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### 1.2 核心类关系

```java
// 核心类关系
Configuration (全局配置)
    │
    ├── MapperRegistry (Mapper注册中心)
    │   └── MapperProxyFactory (Mapper代理工厂)
    │
    ├── MappedStatement (SQL映射信息)
    │   ├── SqlSource (SQL源代码)
    │   │   ├── RawSqlSource (原始SQL)
    │   │   ├── DynamicSqlSource (动态SQL)
    │   │   └── ProviderSqlSource (注解SQL)
    │   └── ResultMap (结果映射)
    │
    ├── Executor (执行器)
    │   ├── BaseExecutor (基础执行器)
    │   │   ├── SimpleExecutor (简单执行)
    │   │   ├── ReuseExecutor (复用执行)
    │   │   └── BatchExecutor (批量执行)
    │   └── CachingExecutor (缓存执行器)
    │
    ├── StatementHandler (Statement处理器)
    │   ├── RoutingStatementHandler (路由处理器)
    │   ├── SimpleStatementHandler (简单处理)
    │   ├── PreparedStatementHandler (预编译处理)
    │   └── CallableStatementHandler (存储过程处理)
    │
    ├── ParameterHandler (参数处理器)
    │
    └── ResultSetHandler (结果集处理器)
```

---

## 二、启动流程

### 2.1 SqlSessionFactory创建流程

```
Resources.getResourceAsStream("mybatis-config.xml")
    │
    ▼
SqlSessionFactoryBuilder.build(inputStream)
    │
    ▼
XMLConfigBuilder.parse()
    │
    ├── 1. 解析environments → 创建DataSource和TransactionFactory
    ├── 2. 解析typeAliases → 注册类型别名
    ├── 3. 解析settings → 配置全局参数
    ├── 4. 解析plugins → 注册插件链
    ├── 5. 解析mappers → 加载Mapper XML文件
    │   ├── XMLMapperBuilder.parse()
    │   │   ├── 解析resultMap
    │   │   ├── 解析sql片段
    │   │   └── 解析CRUD语句
    │   └── 注册MappedStatement到Configuration
    │
    └── 返回SqlSessionFactory实例
```

### 2.2 Configuration核心属性

```java
public class Configuration {
    
    // 环境配置
    private Environment environment;
    
    // 类型别名注册
    private final TypeAliasRegistry typeAliasRegistry;
    
    // 类型处理器注册
    private final TypeHandlerRegistry typeHandlerRegistry;
    
    // Mapper注册中心
    private final MapperRegistry mapperRegistry;
    
    // 所有MappedStatement
    protected final Map<String, MappedStatement> mappedStatements;
    
    // 缓存
    protected final Map<String, Cache> caches;
    
    // 插件链
    private final InterceptorChain interceptorChain;
    
    // 执行器类型
    private ExecutorType defaultExecutorType = ExecutorType.SIMPLE;
    
    // 是否自动映射驼峰
    private boolean mapUnderscoreToCamelCase = false;
    
    // 是否开启延迟加载
    private boolean lazyLoadingEnabled = false;
    
    // 日志实现
    private String logImpl;
}
```

### 2.3 Mapper代理创建流程

```java
// 当调用session.getMapper(UserMapper.class)时
public class MapperRegistry {
    
    public <T> T getMapper(Class<T> type, SqlSession sqlSession) {
        // 从缓存中获取Mapper代理工厂
        MapperProxyFactory<T> mapperProxyFactory = 
            (MapperProxyFactory<T>) knownMappers.get(type);
        
        if (mapperProxyFactory == null) {
            throw new BindingException("Type " + type + 
                " is not known to the MapperRegistry.");
        }
        
        // 创建Mapper代理实例
        return mapperProxyFactory.newInstance(sqlSession);
    }
}

// MapperProxyFactory创建代理
public class MapperProxyFactory<T> {
    
    protected T newInstance(MapperMethod<T> mapperMethod) {
        // 使用JDK动态代理创建Mapper代理
        return (T) Proxy.newProxyInstance(
            mapperInterface.getClassLoader(),
            new Class[]{mapperInterface},
            new MapperProxy<T>(mapperMethod)
        );
    }
}

// MapperProxy处理方法调用
public class MapperProxy<T> implements InvocationHandler {
    
    @Override
    public Object invoke(Object proxy, Method method, 
            Object[] args) throws Throwable {
        
        // 获取MapperMethod
        MapperMethod mapperMethod = 
            cachedMapperMethod(method);
        
        // 执行方法
        return mapperMethod.execute(sqlSession, args);
    }
}
```

---

## 三、SQL执行流程

### 3.1 查询执行流程

```
mapper.selectById(1L)
    │
    ▼
MapperProxy.invoke()
    │
    ▼
MapperMethod.execute()
    │
    ├── SELECT → executeForSelect()
    │   └── sqlSession.selectList()
    │
    ├── UPDATE/DELETE → executeForUpdate()
    │   └── sqlSession.update()
    │
    └── INSERT → executeForUpdate()
        └── sqlSession.insert()
```

### 3.2 SqlSession执行流程

```java
public class DefaultSqlSession implements SqlSession {
    
    @Override
    public <E> List<E> selectList(String statement, Object parameter) {
        // 1. 获取MappedStatement
        MappedStatement ms = configuration.getMappedStatement(statement);
        
        // 2. 调用执行器执行查询
        return executor.query(ms, parameter, RowBounds.DEFAULT, 
            ExecutorType.SIMPLE);
    }
}
```

### 3.3 Executor执行流程

```java
public abstract class BaseExecutor implements Executor {
    
    @Override
    public <E> List<E> query(MappedStatement ms, Object parameter,
            RowBounds rowBounds, ResultHandler resultHandler) {
        
        // 1. 创建缓存Key
        CacheKey key = createCacheKey(ms, parameter, rowBounds, boundSql);
        
        // 2. 查询一级缓存
        Object list = queryFromLocalCache(ms, key);
        
        if (list == null) {
            // 3. 查询二级缓存
            list = queryFromSecondLevelCache(ms, key);
            
            if (list == null) {
                // 4. 查询数据库
                list = doQuery(ms, parameter, rowBounds, 
                    resultHandler, boundSql);
                
                // 5. 写入一级缓存
                addToLocalCache(key, list);
            }
        }
        
        return (List<E>) list;
    }
    
    protected abstract <E> List<E> doQuery(
            MappedStatement ms, Object parameter,
            RowBounds rowBounds, ResultHandler resultHandler,
            BoundSql boundSql);
}
```

### 3.4 StatementHandler执行流程

```java
public class SimpleExecutor extends BaseExecutor {
    
    @Override
    public <E> List<E> doQuery(...) {
        // 1. 获取Connection
        Connection connection = getConnection(ms.getStatementLog());
        
        // 2. 创建StatementHandler
        StatementHandler handler = configuration.newStatementHandler(
            executor, ms, parameter, rowBounds, 
            resultHandler, boundSql);
        
        // 3. 准备Statement
        Statement stmt = handler.prepare(connection, transactionTimeout);
        
        // 4. 设置参数
        handler.parameterize(stmt);
        
        // 5. 执行查询
        return handler.query(stmt, resultHandler);
    }
}

// PreparedStatementHandler执行查询
public class PreparedStatementHandler extends BaseStatementHandler {
    
    @Override
    public int update(Statement statement) {
        PreparedStatement ps = (PreparedStatement) statement;
        ps.execute();
        
        int rows = ps.getUpdateCount();
        Object parameterObject = boundSql.getParameterObject();
        
        // 处理KeyProperty
        MapperMethod.ParamMap<Object> keyProperty = 
            parameterObject instanceof MapperMethod.ParamMap ? 
                (MapperMethod.ParamMap<Object>) parameterObject : null;
        
        if (keyProperty != null && keyProperty.hasKey("")) {
            // 回填生成的主键
            keyProperty.put("", parameterObject);
        }
        
        return rows;
    }
    
    @Override
    public <E> List<E> query(Statement statement, ResultHandler resultHandler) {
        PreparedStatement ps = (PreparedStatement) statement;
        ps.execute();
        
        // 处理结果集
        return resultSetHandler.handleResultSets(ps);
    }
}
```

---

## 四、动态SQL构建

### 4.1 DynamicSqlSource解析

```java
public class DynamicSqlSource implements SqlSource {
    
    private final RootSqlNode rootSqlNode;
    
    @Override
    public BoundSql getBoundSql(Object parameterObject) {
        // 创建动态上下文
        DynamicContext context = new DynamicContext(
            configuration, parameterObject);
        
        // 应用动态SQL节点
        rootSqlNode.apply(context);
        
        // 创建SqlSource
        SqlSource sqlSource = context.getSqlSource();
        
        // 返回BoundSql
        return sqlSource.getBoundSql(parameterObject);
    }
}
```

### 4.2 SQL节点类型

```java
// SQL节点类型
public interface SqlNode {
    void apply(DynamicContext context);
}

// 文本节点（直接文本）
public class TextSqlNode implements SqlNode {
    private final String text;
    
    @Override
    public void apply(DynamicContext context) {
        context.appendSql(text);
    }
}

// IF节点（条件判断）
public class IfSqlNode implements SqlNode {
    private final ExpressionEvaluator evaluator;
    private final String test;
    private final SqlNode contents;
    
    @Override
    public void apply(DynamicContext context) {
        // 判断条件
        if (evaluator.evaluateBoolean(test, 
                context.getBindings())) {
            // 条件满足，应用内容
            contents.apply(context);
        }
    }
}

// FOR节点（循环）
public class ForEachSqlNode implements SqlNode {
    private final String collectionExpression;
    private final String item;
    private final String open;
    private final String close;
    private final String separator;
    
    @Override
    public void apply(DynamicContext context) {
        // 获取集合
        Iterable<?> iterable = evaluator.evaluateIterable(
            collectionExpression, context.getBindings());
        
        // 拼接循环SQL
        StringBuilder sql = new StringBuilder();
        sql.append(open);
        
        int index = 0;
        for (Object item : iterable) {
            if (index > 0) {
                sql.append(separator);
            }
            sql.append("?");
            index++;
        }
        
        sql.append(close);
        context.appendSql(sql.toString());
    }
}
```

### 4.3 BoundSql构建

```java
public class BoundSql {
    
    private final String sql;
    private final List<ParameterMapping> parameterMappings;
    private final Object parameterObject;
    private final Map<String, Object> additionalParameters;
    private final MetaObject metaParameters;
    
    // 获取参数值
    public Object getAdditionalParameter(String name) {
        if (!additionalParameters.containsKey(name)) {
            // 从参数对象中获取
            Object value = metaParameters.getValue(name);
            additionalParameters.put(name, value);
        }
        return additionalParameters.get(name);
    }
}
```

---

## 五、结果集处理

### 5.1 ResultSetHandler处理流程

```java
public class DefaultResultSetHandler implements ResultSetHandler {
    
    @Override
    public List<Object> handleResultSets(Statement stmt) {
        // 获取多个结果集
        List<Object> multipleResults = new ArrayList<>();
        int resultSetCount = 0;
        
        ResultSetWrapper rsw = getFirstResultSet(stmt);
        
        // 处理第一个结果集
        List<ResultMap> resultMaps = mappedStatement.getResultMaps();
        
        int resultMapCount = resultMaps.size();
        validateResultMapsCount(rsw, resultMapCount);
        
        while (rsw != null && resultMapCount > resultSetCount) {
            ResultMap resultMap = resultMaps.get(resultSetCount);
            
            // 处理结果集
            handleResultSet(rsw, resultMap, resultHandler, null);
            
            multipleResults.add(resultHandler.getResultList());
            
            resultSetCount++;
            rsw = getNextResultSet(stmt);
        }
        
        return multipleResults;
    }
    
    private void handleResultSet(ResultSetWrapper rsw, ResultMap resultMap,
            ResultHandler resultHandler, RowBounds rowBounds) {
        
        // 创建ResultObjectFactory
        ResultObjectFactory factory = createResultObjectFactory(
            rsw, resultMap, rowBounds, null);
        
        // 遍历结果集
        while (rsw.getResultSet().next()) {
            // 创建结果对象
            Object rowValue = factory.createInstance(rsw);
            
            // 映射结果
            Object mappedValue = createRowValue(rsw, resultMap, rowValue);
            
            // 调用ResultHandler处理
            resultHandler.handleResult(mappedValue);
        }
    }
}
```

### 5.2 ResultMap映射机制

```java
public class ResultMap {
    
    private Class<?> type;  // 目标类型
    private List<ResultMapping> resultMappings;  // 映射规则
    private List<String> mappedColumns;  // 已映射的列
    private String id;  // ResultMap ID
    
    // 映射单行数据
    public Object createRow(ResultSetWrapper rsw, 
            String[] columnPrefix) {
        
        // 1. 创建实例
        Object resultObject = createInstance(type);
        
        // 2. 映射每个字段
        for (ResultMapping mapping : resultMappings) {
            // 获取列值
            Object value = getColumnValue(rsw, mapping, columnPrefix);
            
            // 设置属性值
            setProperty(resultObject, mapping.getProperty(), value);
        }
        
        return resultObject;
    }
}
```

### 5.3 延迟加载机制

```java
// 延迟加载使用代理实现
public class JavassistProxyFactory implements ProxyFactory {
    
    @Override
    public Object createProxy(Object target, 
            ResultLoaderMap lazyLoader, 
            Configuration configuration, 
            ObjectFactory objectFactory, 
            List<Class<?>> constructorArgTypes, 
            List<Object> constructorArgs) {
        
        // 创建延迟加载代理
        return ProxyHelper.createProxy(
            target, lazyLoader, configuration);
    }
}

// 使用CGLIB实现
public class CglibProxyFactory implements ProxyFactory {
    
    @Override
    public Object createProxy(final Object target, 
            final ResultLoaderMap lazyLoader, 
            final Configuration configuration, 
            final ObjectFactory objectFactory, 
            List<Class<?>> constructorArgTypes, 
            List<Object> constructorArgs) {
        
        // 创建CGLIB代理
        return Enhancer.create(target.getClass(), 
            new LazyLoadInvoker(target, lazyLoader, configuration));
    }
}
```

---

## 六、插件机制

### 6.1 插件体系

```java
// 插件接口
public interface Interceptor {
    
    // 拦截方法
    Object intercept(Invocation invocation) throws Throwable;
    
    // 应用插件
    Object plugin(Object target);
    
    // 设置属性
    void setProperties(Properties properties);
}

// 插件链
public class InterceptorChain {
    
    private final List<Interceptor> interceptors = new ArrayList<>();
    
    // 创建代理
    public Object pluginAll(Object target) {
        for (Interceptor interceptor : interceptors) {
            target = interceptor.plugin(target);
        }
        return target;
    }
    
    // 添加插件
    public void addInterceptor(Interceptor interceptor) {
        interceptors.add(interceptor);
    }
}
```

### 6.2 插件执行流程

```
MyBatis核心对象
    │
    ▼
InterceptorChain.pluginAll(target)
    │
    ├── 遍历所有Interceptor
    │   ├── interceptor.plugin(target)
    │   │   └── 创建代理对象
    │   └── 返回代理
    │
    └── 返回被层层代理的对象
    
当调用代理方法时：
    │
    ▼
代理对象.invoke()
    │
    ├── 调用Interceptor.intercept()
    │   ├── 前置处理
    │   ├── 调用invocation.proceed() → 下一个代理/真实对象
    │   └── 后置处理
    │
    └── 返回结果
```

### 6.3 自定义插件示例

#### 分页插件

```java
@Intercepts({
    @Signature(
        type = Executor.class,
        method = "query",
        args = {MappedStatement.class, Object.class, 
                RowBounds.class, ResultHandler.class}
    )
})
public class PaginationPlugin implements Interceptor {
    
    @Override
    public Object intercept(Invocation invocation) 
            throws Throwable {
        
        Executor executor = (Executor) invocation.getTarget();
        Object[] args = invocation.getArgs();
        MappedStatement ms = (MappedStatement) args[0];
        Object parameterObject = args[1];
        RowBounds rowBounds = (RowBounds) args[2];
        
        // 判断是否需要分页
        if (rowBounds == RowBounds.DEFAULT) {
            return invocation.proceed();
        }
        
        // 1. 修改SQL，添加分页
        BoundSql boundSql = ms.getBoundSql(parameterObject);
        String sql = boundSql.getSql();
        
        // 获取总记录数
        int total = getTotalCount(executor, ms, parameterObject, 
                                  boundSql);
        
        // 修改SQL添加LIMIT
        String paginationSql = sql + 
            " LIMIT " + rowBounds.getOffset() + 
            ", " + rowBounds.getLimit();
        
        // 创建新的MappedStatement
        MappedStatement newMs = new MappedStatement.Builder(
            ms.getConfiguration(), ms.getId(), 
            new RawSqlSource(paginationSql, parameterObject, 
                ms.getResultMaps()), ms.getSqlCommandType())
            .resultSetType(ms.getResultSetType())
            .build();
        
        // 2. 执行修改后的SQL
        List<E> result = executor.query(newMs, parameterObject, 
            RowBounds.DEFAULT, (ResultHandler) args[3]);
        
        // 3. 返回分页结果
        PageResult<E> pageResult = new PageResult<>();
        pageResult.setTotal(total);
        pageResult.setList(result);
        pageResult.setPageSize(rowBounds.getLimit());
        pageResult.setCurrentPage(
            rowBounds.getOffset() / rowBounds.getLimit() + 1);
        
        return pageResult;
    }
    
    private int getTotalCount(Executor executor, MappedStatement ms,
            Object parameterObject, BoundSql boundSql) {
        
        // 构建count SQL
        String countSql = "SELECT COUNT(*) FROM (" + 
            boundSql.getSql() + ") AS temp";
        
        // 创建count MappedStatement
        MappedStatement countMs = new MappedStatement.Builder(
            ms.getConfiguration(), ms.getId() + "_count",
            new RawSqlSource(countSql, parameterObject, 
                null), SqlCommandType.SELECT)
            .build();
        
        // 执行count查询
        List<Long> countResult = executor.query(countMs, 
            parameterObject, RowBounds.DEFAULT, null);
        
        return countResult.isEmpty() ? 0 : countResult.get(0).intValue();
    }
    
    @Override
    public Object plugin(Object target) {
        return Plugin.wrap(target, this);
    }
    
    @Override
    public void setProperties(Properties properties) {
        // 初始化配置
    }
}
```

#### 性能监控插件

```java
@Intercepts({
    @Signature(
        type = Executor.class,
        method = "query",
        args = {MappedStatement.class, Object.class, 
                RowBounds.class, ResultHandler.class}
    ),
    @Signature(
        type = Executor.class,
        method = "update",
        args = {MappedStatement.class, Object.class}
    )
})
public class PerformancePlugin implements Interceptor {
    
    private static final Logger log = 
        LoggerFactory.getLogger(PerformancePlugin.class);
    
    private long slowQueryThreshold = 1000;  // 慢查询阈值（毫秒）
    
    @Override
    public Object intercept(Invocation invocation) 
            throws Throwable {
        
        MappedStatement ms = (MappedStatement) invocation.getArgs()[0];
        String sqlId = ms.getId();
        
        long startTime = System.currentTimeMillis();
        
        try {
            return invocation.proceed();
        } finally {
            long duration = System.currentTimeMillis() - startTime;
            
            if (duration > slowQueryThreshold) {
                log.warn("慢查询警告 - SQL: {}, 耗时: {}ms", 
                    sqlId, duration);
            } else {
                log.debug("SQL执行 - ID: {}, 耗时: {}ms", 
                    sqlId, duration);
            }
        }
    }
    
    @Override
    public Object plugin(Object target) {
        return Plugin.wrap(target, this);
    }
    
    @Override
    public void setProperties(Properties props) {
        String threshold = props.getProperty("slowQueryThreshold");
        if (threshold != null) {
            this.slowQueryThreshold = Long.parseLong(threshold);
        }
    }
}
```

### 6.4 注册插件

```xml
<!-- mybatis-config.xml -->
<configuration>
    <plugins>
        <!-- 注册分页插件 -->
        <plugin interceptor="com.example.plugin.PaginationPlugin">
            <property name="databaseType" value="mysql"/>
        </plugin>
        
        <!-- 注册性能监控插件 -->
        <plugin interceptor="com.example.plugin.PerformancePlugin">
            <property name="slowQueryThreshold" value="500"/>
        </plugin>
    </plugins>
</configuration>
```

---

## 七、核心执行流程总结

### 7.1 完整查询流程

```
用户调用 mapper.selectById(1L)
    │
    ▼
MapperProxy.invoke() [JDK动态代理]
    │
    ▼
MapperMethod.execute()
    │
    ▼
DefaultSqlSession.selectList()
    │
    ├── 1. 获取MappedStatement
    │   └── configuration.getMappedStatement(statementId)
    │
    └── 2. 调用Executor.query()
        │
        ▼
      CachingExecutor.query() [二级缓存]
        │
        ├── 查询二级缓存
        │
        └── 缓存未命中 ↓
            │
            ▼
          BaseExecutor.query()
            │
            ├── 3. 创建CacheKey
            │   └── id + offset + limit + sql + parameter
            │
            ├── 4. 查询一级缓存
            │
            └── 5. 缓存未命中 ↓
                │
                ▼
              BaseExecutor.doQuery()
                │
                ├── 6. 获取Connection
                │   └── dataSource.getConnection()
                │
                └── 7. 创建StatementHandler
                    │
                    ▼
                  PreparedStatementHandler.prepare()
                    │
                    ├── 8. 预编译SQL
                    │   └── connection.prepareStatement(sql)
                    │
                    └── 9. 设置超时等参数
                        │
                        ▼
                      PreparedStatementHandler.parameterize()
                        │
                        └── 10. 参数处理
                            └── ParameterHandler.setParameters()
                                │
                                ▼
                              PreparedStatementHandler.query()
                                │
                                ├── 11. 执行SQL
                                │   └── preparedStatement.executeQuery()
                                │
                                └── 12. 处理结果集
                                    └── ResultSetHandler.handleResultSets()
                                        │
                                        ├── 13. 创建实体对象
                                        │   └── DefaultResultObjectFactory.create()
                                        │
                                        └── 14. 属性映射
                                            └── MetaObject.setValue()
                                                │
                                                ▼
                                              返回结果
```

### 7.2 核心扩展点

| 扩展点 | 接口 | 作用 |
|--------|------|------|
| 数据源 | `DataSource` | 自定义数据源实现 |
| 类型转换 | `TypeHandler` | 自定义类型处理器 |
| 结果映射 | `ObjectFactory` | 自定义对象工厂 |
| 缓存实现 | `Cache` | 自定义缓存实现 |
| SQL解析 | `LanguageDriver` | 自定义SQL语言驱动 |
| 插件拦截 | `Interceptor` | 拦截执行过程 |

### 7.3 性能优化建议

1. **合理使用缓存**：
   - 一级缓存默认开启
   - 二级缓存适合读多写少场景
   - 使用Redis等外部缓存

2. **批量操作**：
   - 使用`BatchExecutor`执行批量操作
   - 配置合理的`defaultExecutorType`

3. **SQL优化**：
   - 避免使用`SELECT *`
   - 使用索引优化查询
   - 合理分页，避免深分页

4. **插件使用**：
   - 谨慎使用插件，避免影响性能
   - 分页插件尽量早执行

---

## 八、小结

MyBatis核心原理可以总结为以下几点：

1. **架构分层**：应用层 → 接口层 → 配置层 → 执行层 → SQL构建层 → 数据源层

2. **核心组件**：
   - `SqlSession`：与数据库交互的入口
   - `Executor`：SQL执行器
   - `StatementHandler`：Statement处理器
   - `ResultSetHandler`：结果集处理器

3. **动态SQL**：通过`<if>`、`<foreach>`等标签实现SQL动态拼接

4. **缓存机制**：一级缓存（SqlSession级）+ 二级缓存（Mapper级）

5. **插件机制**：基于JDK动态代理的拦截器链，可扩展执行过程

6. **扩展点**：支持自定义数据源、类型处理器、缓存、插件等

深入理解MyBatis核心原理，能够帮助我们：
- 更好地使用MyBatis进行开发
- 解决复杂的性能问题
- 进行框架级别的定制开发
