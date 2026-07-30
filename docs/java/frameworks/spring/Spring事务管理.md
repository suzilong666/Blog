# Spring事务管理

## 一、事务概述

### 1.1 什么是事务

**事务（Transaction）** 是一组操作的集合，这些操作要么**全部成功**，要么**全部失败**，是数据一致性的基本保障。

### 1.2 事务的ACID特性

| 特性 | 说明 | 英文 |
|------|------|------|
| **原子性** | 事务中的操作不可分割，要么全部执行要么不执行 | Atomicity |
| **一致性** | 事务前后数据保持一致状态 | Consistency |
| **隔离性** | 并发事务之间互不干扰 | Isolation |
| **持久性** | 事务提交后结果永久保存 | Durability |

### 1.3 事务的问题

#### 不考虑隔离性会引发的问题

| 问题 | 说明 |
|------|------|
| **脏读** | 读取到其他事务未提交的数据 |
| **不可重复读** | 同一事务中两次读取同一行数据结果不同（update） |
| **幻读** | 同一事务中两次查询结果集合不同（insert/delete） |

#### 事务隔离级别

| 隔离级别 | 脏读 | 不可重复读 | 幻读 |
|---------|------|-----------|------|
| **读未提交** | 可能 | 可能 | 可能 |
| **读已提交** | 不会 | 可能 | 可能 |
| **可重复读** | 不会 | 不会 | 可能 |
| **串行化** | 不会 | 不会 | 不会 |

---

## 二、Spring事务管理概述

### 2.1 Spring事务的发展

| 版本 | 特性 |
|------|------|
| Spring 1.x | 编程式事务管理（TransactionTemplate） |
| Spring 2.x | 声明式事务管理（@Transactional注解） |
| Spring 3.x | 支持JTA、异步事务 |
| Spring 5.x | 响应式事务、R2DBC事务 |

### 2.2 事务管理方式

#### 编程式事务管理

```java
// 编程式事务管理（不推荐，代码侵入性强）
public void transferMoney(Long fromId, Long toId, BigDecimal amount) {
    TransactionDefinition def = new DefaultTransactionDefinition();
    TransactionStatus status = transactionManager.getTransaction(def);
    
    try {
        accountDao.decrease(fromId, amount);
        accountDao.increase(toId, amount);
        transactionManager.commit(status);
    } catch (Exception e) {
        transactionManager.rollback(status);
        throw e;
    }
}
```

#### 声明式事务管理（推荐）

```java
// 声明式事务管理（推荐，通过AOP实现）
@Service
public class AccountService {
    
    @Transactional
    public void transferMoney(Long fromId, Long toId, BigDecimal amount) {
        accountDao.decrease(fromId, amount);
        accountDao.increase(toId, amount);
    }
}
```

### 2.3 事务管理体系

```
PlatformTransactionManager (接口)
    │
    ├── DataSourceTransactionManager (JDBC/MyBatis)
    │
    ├── HibernateTransactionManager (Hibernate)
    │
    ├── JpaTransactionManager (JPA)
    │
    ├── JmsTransactionManager (消息队列)
    │
    ├── JtaTransactionManager (分布式事务)
    │
    └── WebLogicJtaTransactionManager (WebLogic)
```

---

## 三、@Transactional注解详解

### 3.1 注解属性

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `value` | String | "" | 事务管理器名称 |
| `transactionManager` | String | "" | 事务管理器名称 |
| `propagation` | Propagation | REQUIRED | 事务传播行为 |
| `isolation` | Isolation | DEFAULT | 事务隔离级别 |
| `timeout` | int | -1 | 事务超时时间（秒） |
| `readOnly` | boolean | false | 是否只读 |
| `rollbackFor` | Class[] | {} | 回滚的异常类 |
| `rollbackForClassName` | String[] | {} | 回滚的异常类名 |
| `noRollbackFor` | Class[] | {} | 不回滚的异常类 |
| `noRollbackForClassName` | String[] | {} | 不回滚的异常类名 |
| `label` | String[] | {} | 事务标签 |

### 3.2 基本用法

```java
@Service
public class UserService {
    
    // 最简单的用法：使用默认配置
    @Transactional
    public void createUser(User user) {
        userDao.insert(user);
    }
    
    // 指定事务管理器
    @Transactional("transactionManager")
    public void updateUser(User user) {
        userDao.update(user);
    }
    
    // 指定事务传播行为
    @Transactional(propagation = Propagation.REQUIRES_NEW)
    public void sendNotification(User user) {
        notificationService.send(user);
    }
    
    // 指定隔离级别
    @Transactional(isolation = Isolation.READ_COMMITTED)
    public User getUser(Long id) {
        return userDao.findById(id);
    }
    
    // 只读事务
    @Transactional(readOnly = true)
    public List<User> listUsers() {
        return userDao.findAll();
    }
    
    // 超时控制
    @Transactional(timeout = 30)
    public void batchProcess(List<Task> tasks) {
        // 处理任务
    }
}
```

---

## 四、事务传播行为

### 4.1 七种传播行为

| 传播行为 | 说明 | 场景 |
|---------|------|------|
| `REQUIRED` | 有事务就加入，没有就新建 | 默认值，最常用 |
| `REQUIRES_NEW` | 总是新建事务，有则挂起 | 日志操作、独立事务 |
| `SUPPORTS` | 有事务就加入，没有就非事务 | 查询操作 |
| `MANDATORY` | 有事务就加入，没有就抛异常 | 必须在事务中调用 |
| `NOT_SUPPORTED` | 非事务执行，有则挂起 | 不需要事务的操作 |
| `NEVER` | 非事务执行，有则抛异常 | 禁止在事务中调用 |
| `NESTED` | 嵌套事务（savepoint） | 部分回滚场景 |

### 4.2 传播行为图解

```
外部方法（有事务）    内部方法传播行为      内部方法事务状态
─────────────────────────────────────────────────────────
有事务             REQUIRED          加入外部事务
有事务             REQUIRES_NEW      新建独立事务
有事务             SUPPORTS          加入外部事务
有事务             MANDATORY         加入外部事务
有事务             NOT_SUPPORTED     挂起外部事务，非事务执行
有事务             NEVER             抛异常
有事务             NESTED            嵌套事务（savepoint）

无事务             REQUIRED          新建事务
无事务             REQUIRES_NEW      新建事务
无事务             SUPPORTS          非事务执行
无事务             MANDATORY         抛异常
无事务             NOT_SUPPORTED     非事务执行
无事务             NEVER             非事务执行
无事务             NESTED            新建事务
```

### 4.3 传播行为实战

```java
@Service
public class OrderService {
    
    @Autowired
    private OrderItemService orderItemService;
    @Autowired
    private LogService logService;
    
    // 下单方法（外部事务）
    @Transactional(propagation = Propagation.REQUIRED)
    public void createOrder(Order order) {
        // 1. 保存订单（同一事务）
        orderDao.insert(order);
        
        // 2. 保存订单项（加入外部事务）
        orderItemService.saveItems(order.getItems());
        
        // 3. 记录日志（独立事务，不受外部事务影响）
        try {
            logService.recordLog(order);
        } catch (Exception e) {
            // 日志失败不影响订单创建
            log.error("日志记录失败", e);
        }
        
        // 4. 发送通知（加入外部事务，失败会导致回滚）
        notificationService.sendOrderNotification(order);
    }
}

@Service
public class OrderItemService {
    
    // REQUIRED：加入外部事务
    @Transactional(propagation = Propagation.REQUIRED)
    public void saveItems(List<OrderItem> items) {
        for (OrderItem item : items) {
            orderItemDao.insert(item);
        }
    }
}

@Service
public class LogService {
    
    // REQUIRES_NEW：独立事务，外部事务回滚不影响它
    @Transactional(propagation = Propagation.REQUIRES_NEW)
    public void recordLog(Order order) {
        Log log = new Log();
        log.setContent("创建订单：" + order.getId());
        log.setTime(new Date());
        logDao.insert(log);
    }
}
```

---

## 五、事务回滚规则

### 5.1 默认回滚行为

Spring默认在遇到以下异常时回滚：
- `RuntimeException`（非受检异常）
- `Error`

Spring默认**不**在遇到以下异常时回滚：
- `Exception`（受检异常）
- 自定义业务异常（继承Exception的）

### 5.2 配置回滚规则

```java
@Service
public class UserService {
    
    // 指定回滚的异常
    @Transactional(rollbackFor = Exception.class)
    public void createUser(User user) throws Exception {
        userDao.insert(user);
        
        if (user.getName() == null) {
            // 受检异常也会回滚
            throw new Exception("用户名不能为空");
        }
    }
    
    // 指定不回滚的异常
    @Transactional(noRollbackFor = BusinessException.class)
    public void processOrder(Order order) {
        orderDao.insert(order);
        
        if (order.getAmount() <= 0) {
            // BusinessException不回滚
            throw new BusinessException("订单金额无效");
        }
    }
    
    // 多异常配置
    @Transactional(
        rollbackFor = {Exception.class, SQLException.class},
        noRollbackFor = BusinessException.class
    )
    public void complexOperation() {
        // 复杂业务逻辑
    }
}
```

### 5.3 自定义异常回滚策略

```java
// 自定义注解
@Target(ElementType.METHOD)
@Retention(RetentionPolicy.RUNTIME)
public @interface CustomTransactional {
    Class<? extends Throwable>[] rollbackFor() default {};
}

// 自定义切面
@Aspect
@Component
public class TransactionAspect {
    
    @Around("@annotation(customTransactional)")
    public Object aroundTransaction(
            ProceedingJoinPoint pjp, 
            CustomTransactional customTransactional) 
            throws Throwable {
        
        TransactionDefinition def = new DefaultTransactionDefinition();
        TransactionStatus status = 
            transactionManager.getTransaction(def);
        
        try {
            Object result = pjp.proceed();
            transactionManager.commit(status);
            return result;
        } catch (Throwable t) {
            // 检查是否需要回滚
            Class<? extends Throwable>[] rollbackExceptions = 
                customTransactional.rollbackFor();
            
            boolean shouldRollback = true;
            if (rollbackExceptions.length > 0) {
                shouldRollback = false;
                for (Class<? extends Throwable> ex : rollbackExceptions) {
                    if (ex.isInstance(t)) {
                        shouldRollback = true;
                        break;
                    }
                }
            }
            
            if (shouldRollback) {
                transactionManager.rollback(status);
            } else {
                transactionManager.commit(status);
            }
            throw t;
        }
    }
}
```

---

## 六、事务隔离级别

### 6.1 配置隔离级别

```java
@Service
public class ProductService {
    
    // 使用READ_COMMITTED隔离级别
    @Transactional(isolation = Isolation.READ_COMMITTED)
    public Product getProduct(Long id) {
        return productDao.findById(id);
    }
    
    // 使用REPEATABLE_READ隔离级别（MySQL默认）
    @Transactional(isolation = Isolation.REPEATABLE_READ)
    public List<Product> listProducts() {
        return productDao.findAll();
    }
    
    // 使用SERIALIZABLE隔离级别（性能差，不推荐）
    @Transactional(isolation = Isolation.SERIALIZABLE)
    public BigDecimal getTotalPrice() {
        return productDao.sumPrice();
    }
}
```

### 6.2 数据库默认隔离级别

| 数据库 | 默认隔离级别 |
|--------|-------------|
| MySQL | REPEATABLE_READ |
| Oracle | READ_COMMITTED |
| PostgreSQL | READ COMMITTED |
| SQL Server | READ COMMITTED |

### 6.3 隔离级别选择建议

| 场景 | 推荐隔离级别 | 原因 |
|------|-------------|------|
| 普通查询 | READ_COMMITTED | 避免脏读，性能好 |
| 财务系统 | REPEATABLE_READ | 避免不可重复读 |
| 特殊场景 | SERIALIZABLE | 数据一致性要求极高 |

---

## 七、事务配置

### 7.1 数据源配置

```java
@Configuration
@EnableTransactionManagement
public class TransactionConfig {
    
    @Bean
    public DataSource dataSource() {
        // 配置数据源（HikariCP推荐）
        HikariConfig config = new HikariConfig();
        config.setJdbcUrl("jdbc:mysql://localhost:3306/example");
        config.setUsername("root");
        config.setPassword("password");
        config.setDriverClassName("com.mysql.cj.jdbc.Driver");
        return new HikariDataSource(config);
    }
    
    @Bean
    public PlatformTransactionManager transactionManager(
            DataSource dataSource) {
        // JDBC/MyBatis使用DataSourceTransactionManager
        return new DataSourceTransactionManager(dataSource);
    }
}
```

### 7.2 XML配置方式

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:tx="http://www.springframework.org/schema/tx"
       xmlns:context="http://www.springframework.org/schema/context"
       xsi:schemaLocation="
           http://www.springframework.org/schema/beans
           http://www.springframework.org/schema/beans/spring-beans.xsd
           http://www.springframework.org/schema/tx
           http://www.springframework.org/schema/tx/spring-tx.xsd
           http://www.springframework.org/schema/context
           http://www.springframework.org/schema/context/spring-context.xsd">
    
    <!-- 数据源配置 -->
    <bean id="dataSource" class="com.zaxxer.hikari.HikariDataSource">
        <constructor-arg>
            <bean class="com.zaxxer.hikari.HikariConfig">
                <property name="jdbcUrl" 
                    value="jdbc:mysql://localhost:3306/example"/>
                <property name="username" value="root"/>
                <property name="password" value="password"/>
                <property name="driverClassName" 
                    value="com.mysql.cj.jdbc.Driver"/>
            </bean>
        </constructor-arg>
    </bean>
    
    <!-- 事务管理器 -->
    <bean id="transactionManager" 
          class="org.springframework.jdbc.datasource.DataSourceTransactionManager">
        <property name="dataSource" ref="dataSource"/>
    </bean>
    
    <!-- 开启事务注解驱动 -->
    <tx:annotation-driven transaction-manager="transactionManager"/>
</beans>
```

### 7.3 多数据源事务配置

```java
@Configuration
public class MultiDataSourceConfig {
    
    @Bean("primaryDataSource")
    public DataSource primaryDataSource() {
        // 主数据源
    }
    
    @Bean("secondaryDataSource")
    public DataSource secondaryDataSource() {
        // 从数据源
    }
    
    @Bean("primaryTransactionManager")
    public PlatformTransactionManager primaryTransactionManager(
            @Qualifier("primaryDataSource") DataSource dataSource) {
        return new DataSourceTransactionManager(dataSource);
    }
    
    @Bean("secondaryTransactionManager")
    public PlatformTransactionManager secondaryTransactionManager(
            @Qualifier("secondaryDataSource") DataSource dataSource) {
        return new DataSourceTransactionManager(dataSource);
    }
}

// 使用时指定事务管理器
@Transactional("primaryTransactionManager")
public void primaryOperation() {
    // 使用主数据源
}

@Transactional("secondaryTransactionManager")
public void secondaryOperation() {
    // 使用从数据源
}
```

---

## 八、Spring事务原理

### 8.1 事务AOP代理

```
用户调用Service方法
    │
    ▼
Spring AOP代理对象
    │
    ├── 1. 获取TransactionManager
    ├── 2. 获取TransactionStatus
    │   ├── 获取当前事务
    │   ├── 决定是否创建新事务
    │   └── 配置隔离级别、超时等
    │
    ├── 3. 执行目标方法
    │   ├── 成功：TransactionManager.commit()
    │   └── 异常：TransactionManager.rollback()
    │
    └── 4. 返回结果
```

### 8.2 TransactionInfo的数据结构

```java
public class TransactionInfo {
    private final PlatformTransactionManager transactionManager;
    private final String transactionAttributeName;
    private final TransactionAttribute transactionAttribute;
    private final String joinpointIdentification;
    private TransactionStatus transactionStatus;
    private TransactionInfo oldTransactionInfo;  // 上一个事务信息（用于嵌套）
}
```

### 8.3 TransactionStatus的核心方法

```java
public interface TransactionStatus extends SavepointManager, Flushable {
    
    boolean isNewTransaction();         // 是否是新事务
    boolean hasSavepoint();              // 是否有保存点
    boolean isRollbackOnly();            // 是否只能回滚
    boolean isActive();                  // 事务是否活跃
    void setRollbackOnly();              // 标记为只能回滚
    void flush();                        // 刷新持久化数据
    Object getSavepoint();               // 获取保存点
    void rollbackToSavepoint(Object savepoint);  // 回滚到保存点
    void releaseSavepoint(Object savepoint);     // 释放保存点
}
```

### 8.4 事务挂起与恢复

```java
public class DataSourceTransactionManager {
    
    @Override
    protected void doBegin(Object transaction, 
            TransactionDefinition definition) {
        
        DataSourceTransactionObject txObject = 
            (DataSourceTransactionObject) transaction;
        
        // 1. 获取连接
        Connection con = DataSourceUtils.getConnection(
            obtainDataSource());
        
        // 2. 关闭自动提交
        txObject.setConnectionHolder(
            new ConnectionHolder(con), true);
        con.setAutoCommit(false);
        
        // 3. 设置隔离级别
        if (definition.getIsolationLevel() != 
                TransactionDefinition.ISOLATION_DEFAULT) {
            con.setTransactionIsolation(
                definition.getIsolationLevel());
        }
        
        // 4. 设置只读
        if (definition.isReadOnly()) {
            con.setReadOnly(true);
        }
        
        // 5. 设置超时
        if (definition.getTimeout() != 
                TransactionDefinition.TIMEOUT_DEFAULT) {
            txObject.setTimeoutInMillis(
                definition.getTimeout() * 1000);
        }
    }
    
    @Override
    protected void doCommit(DefaultTransactionStatus status) {
        DataSourceTransactionObject txObject = 
            (DataSourceTransactionObject) status.getTransaction();
        
        Connection con = txObject.getConnectionHolder()
            .getConnection();
        
        try {
            con.commit();  // 提交事务
        } catch (SQLException e) {
            throw new TransactionSystemException(
                "Could not commit JDBC transaction", e);
        }
    }
    
    @Override
    protected void doRollback(DefaultTransactionStatus status) {
        DataSourceTransactionObject txObject = 
            (DataSourceTransactionObject) status.getTransaction();
        
        Connection con = txObject.getConnectionHolder()
            .getConnection();
        
        try {
            con.rollback();  // 回滚事务
        } catch (SQLException e) {
            throw new TransactionSystemException(
                "Could not rollback JDBC transaction", e);
        }
    }
}
```

---

## 九、常见问题与最佳实践

### 9.1 事务失效场景

#### Q: 为什么@Transactional不起作用？

1. **方法非public**：Spring AOP只能代理public方法
2. **自调用**：通过`this`调用的方法不触发AOP
3. **异常被捕获**：内部捕获异常不抛出，Spring无法感知
4. **数据库引擎不支持**：MyISAM不支持事务
5. **没有配置事务管理器**

#### 解决示例

```java
@Service
public class OrderService {
    
    // ❌ 错误：方法非public
    @Transactional
    private void createOrder() { }
    
    // ❌ 错误：自调用
    public void submitOrder() {
        this.createOrder();  // 不会触发事务
    }
    
    // ❌ 错误：异常被吞掉
    @Transactional
    public void createOrder() {
        try {
            orderDao.insert(order);
        } catch (Exception e) {
            log.error(e);  // 异常被吞掉，事务不回滚
        }
    }
    
    // ✅ 正确：public方法、正确抛出异常
    @Transactional
    public void createOrder() {
        orderDao.insert(order);
        // 异常自动抛出
    }
}
```

### 9.2 事务常见陷阱

#### 陷阱1：同类自调用

```java
// 错误示例
@Service
public class PaymentService {
    
    public void processPayment(Payment payment) {
        this.doPay(payment);  // 自调用，事务不生效
    }
    
    @Transactional
    public void doPay(Payment payment) {
        // 不会创建事务！
    }
}

// 正确示例1：注入自身
@Service
public class PaymentService {
    
    @Autowired
    private PaymentService self;
    
    public void processPayment(Payment payment) {
        self.doPay(payment);  // 通过代理调用，事务生效
    }
    
    @Transactional
    public void doPay(Payment payment) {
        // 事务正常工作
    }
}

// 正确示例2：拆分类
@Service
public class PaymentService {
    
    @Autowired
    private PaymentCoreService paymentCoreService;
    
    public void processPayment(Payment payment) {
        paymentCoreService.doPay(payment);  // 跨类调用
    }
}

@Service
public class PaymentCoreService {
    
    @Transactional
    public void doPay(Payment payment) {
        // 事务正常工作
    }
}
```

#### 陷阱2：异常捕获

```java
// 错误示例
@Transactional
public void transferMoney(Long from, Long to, BigDecimal amount) {
    try {
        accountDao.decrease(from, amount);
        accountDao.increase(to, amount);
    } catch (Exception e) {
        // 异常被捕获，事务不会回滚
        log.error("转账失败", e);
    }
}

// 正确示例1：重新抛出
@Transactional
public void transferMoney(Long from, Long to, BigDecimal amount) {
    try {
        accountDao.decrease(from, amount);
        accountDao.increase(to, amount);
    } catch (Exception e) {
        log.error("转账失败", e);
        throw e;  // 重新抛出
    }
}

// 正确示例2：不捕获
@Transactional
public void transferMoney(Long from, Long to, BigDecimal amount) {
    accountDao.decrease(from, amount);
    accountDao.increase(to, amount);
    // 异常自动抛出，Spring自动回滚
}
```

### 9.3 事务最佳实践

1. **方法必须是public**
2. **不要捕获异常后吞掉**
3. **避免同类自调用**
4. **合理设置超时**：避免长事务
5. **指定rollbackFor**：明确回滚规则
6. **只读方法加readOnly**：提高性能
7. **合理使用传播行为**：REQUIRED_REQUIRES_NEW用于独立事务

---

## 十、小结

Spring事务管理是企业级应用开发的核心：

1. **核心机制**：AOP代理 + 事务管理器
2. **注解配置**：@Transactional是最常用的方式
3. **传播行为**：7种传播行为满足不同场景
4. **隔离级别**：根据业务需求选择合适的隔离级别
5. **回滚规则**：默认回滚RuntimeException，可自定义
6. **常见陷阱**：自调用、异常捕获、方法访问修饰符

掌握Spring事务管理，能够帮助我们：
- 保证数据一致性
- 正确处理并发问题
- 避免常见的事务陷阱
