# Spring核心原理

## 一、Spring整体架构

### 1.1 Spring核心模块关系

```
┌─────────────────────────────────────────────────────────────┐
│                      Spring Framework核心架构                │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌─────────────────────────────────────────────────────┐    │
│  │                   Spring MVC (Web层)                │    │
│  └─────────────────────────────────────────────────────┘    │
│                         │                                   │
│  ┌─────────────────────────────────────────────────────┐    │
│  │               Spring AOP (切面编程)                 │    │
│  └─────────────────────────────────────────────────────┘    │
│                         │                                   │
│  ┌─────────────────────────────────────────────────────┐    │
│  │           Spring Transaction (事务管理)             │    │
│  └─────────────────────────────────────────────────────┘    │
│                         │                                   │
│  ┌─────────────────────────────────────────────────────┐    │
│  │           Spring JDBC/ORM (数据访问)                │    │
│  └─────────────────────────────────────────────────────┘    │
│                         │                                   │
│  ┌─────────────────────────────────────────────────────┐    │
│  │              Spring Context (上下文)                │    │
│  └─────────────────────────────────────────────────────┘    │
│                         │                                   │
│  ┌─────────────────────────────────────────────────────┐    │
│  │               Spring Beans (Bean管理)              │    │
│  └─────────────────────────────────────────────────────┘    │
│                         │                                   │
│  ┌─────────────────────────────────────────────────────┐    │
│  │               Spring Core (核心模块)                │    │
│  └─────────────────────────────────────────────────────┘    │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### 1.2 核心包结构

```
org.springframework
├── core/           # 核心工具类
│   ├── annotation/ # 注解相关
│   ├── task/       # 异步任务
│   ├── convert/    # 类型转换
│   └── serialization/ # 序列化
├── beans/          # Bean管理
│   ├── factory/    # BeanFactory实现
│   │   ├── config/ # BeanDefinition配置
│   │   └── support/# 工厂支持类
│   ├── property/   # 属性访问
│   └── beanwrapper/# BeanWrapper
├── context/        # 上下文
│   ├── annotation/ # 上下文注解
│   ├── event/      # 事件机制
│   ├── application/ # 应用接口
│   └── support/    # 上下文支持
├── aop/            # AOP实现
│   ├── framework/  # AOP框架
│   ├── support/    # AOP支持
│   └── config/     # AOP配置
├── tx/             # 事务管理
│   ├── annotation/ # 事务注解
│   ├── config/     # 事务配置
│   └── support/    # 事务支持
├── web/            # Web支持
├── jdbc/           # JDBC支持
├── expression/     # 表达式语言
└── test/           # 测试支持
```

---

## 二、IoC容器核心源码

### 2.1 BeanFactory继承体系

```
BeanFactory (顶层接口)
    │
    ├── HierarchicalBeanFactory
    │   └── 支持父子容器
    │
    └── ListableBeanFactory
        └── 可以枚举所有Bean
            │
            └── ApplicationContext
                │
                ├── ConfigurableApplicationContext
                │   └── 可配置的应用上下文
                │       │
                │       └── AbstractApplicationContext
                │           ├── GenericApplicationContext
                │           │   └── AnnotationConfigApplicationContext
                │           │
                │           └── AbstractRefreshableApplicationContext
                │               ├── FileSystemXmlApplicationContext
                │               ├── ClassPathXmlApplicationContext
                │               └── XmlWebApplicationContext
                │
                └── WebApplicationContext
```

### 2.2 Spring容器启动流程

#### AbstractApplicationContext.refresh()

```java
public abstract class AbstractApplicationContext 
        extends DefaultResourceLoader 
        implements ConfigurableApplicationContext {
    
    @Override
    public void refresh() throws BeansException, IllegalStateException {
        synchronized (this.startupShutdownMonitor) {
            
            // 1. 准备刷新
            prepareRefresh();
            
            // 2. 获取新的BeanFactory
            ConfigurableListableBeanFactory beanFactory = 
                obtainFreshBeanFactory();
            
            // 3. 准备BeanFactory
            prepareBeanFactory(beanFactory);
            
            try {
                // 4. BeanFactory后置处理
                postProcessBeanFactory(beanFactory);
                
                // 5. 调用BeanFactoryPostProcessor
                invokeBeanFactoryPostProcessors(beanFactory);
                
                // 6. 注册BeanPostProcessor
                registerBeanPostProcessors(beanFactory);
                
                // 7. 初始化消息源
                initMessageSource();
                
                // 8. 初始化事件广播器
                initApplicationEventMulticaster();
                
                // 9. 刷新子类容器
                onRefresh();
                
                // 10. 注册事件监听器
                registerApplicationListeners();
                
                // 11. 实例化所有非懒加载单例Bean
                finishBeanFactoryInitialization(beanFactory);
                
                // 12. 完成刷新
                finishRefresh();
            } catch (BeansException e) {
                // 异常处理
                destroyBeans();
                cancelRefresh(e);
                throw e;
            }
        }
    }
}
```

### 2.3 Bean实例化核心流程

```
refresh()
    │
    ▼
finishBeanFactoryInitialization()
    │
    ▼
preInstantiateSingletons()
    │
    ▼
遍历所有BeanDefinition
    │
    ▼
getBean(beanName)
    │
    ▼
doGetBean(beanName)
    │
    ├── 从缓存获取单例
    │   ├── singletonObjects（一级缓存）
    │   ├── earlySingletonObjects（二级缓存）
    │   └── singletonFactories（三级缓存）
    │
    ├── 创建Bean
    │   ├── createBean()
    │   │   ├── resolveBeanClass()
    │   │   ├── createBeanInstance()
    │   │   ├── populateBean()
    │   │   └── initializeBean()
    │   │
    │   └── doCreateBean()
    │       ├── 实例化Bean
    │       ├── 属性赋值
    │       └── 初始化Bean
    │
    └── 注册单例
```

### 2.4 三级缓存机制

```java
public abstract class AbstractBeanFactory 
        extends DefaultSingletonBeanRegistry {
    
    // 一级缓存：存放完整初始化的Bean
    private final Map<String, Object> singletonObjects = 
        new ConcurrentHashMap<>(256);
    
    // 二级缓存：存放已完成构造但未初始化的Bean
    private final Map<String, Object> earlySingletonObjects = 
        new HashMap<>(16);
    
    // 三级缓存：存放ObjectFactory，用于解决循环依赖
    private final Map<String, ObjectFactory<?>> singletonFactories = 
        new HashMap<>(16);
    
    @Override
    protected Object getSingleton(String beanName, 
            boolean allowEarlyReference) {
        // 1. 从一级缓存获取
        Object singletonObject = this.singletonObjects.get(beanName);
        
        if (singletonObject == null && isSingletonCurrentlyInCreation(beanName)) {
            synchronized (this.singletonObjects) {
                // 2. 从二级缓存获取
                singletonObject = this.earlySingletonObjects.get(beanName);
                
                if (singletonObject == null && allowEarlyReference) {
                    // 3. 从三级缓存获取
                    ObjectFactory<?> singletonFactory = 
                        this.singletonFactories.get(beanName);
                    
                    if (singletonFactory != null) {
                        // 通过ObjectFactory获取早期引用
                        singletonObject = singletonFactory.getObject();
                        // 放入二级缓存
                        this.earlySingletonObjects.put(beanName, singletonObject);
                        // 从三级缓存移除
                        this.singletonFactories.remove(beanName);
                    }
                }
            }
        }
        
        return singletonObject;
    }
}
```

### 2.5 循环依赖解决流程

```
A依赖B，B依赖A的循环依赖场景：

1. 创建A的BeanFactory
   │
   ├── 从缓存查找A → 不存在
   ├── 标记A正在创建
   ├── 创建A实例
   ├── 将A放入三级缓存（ObjectFactory）
   ├── 为A注入B属性
   │
   ▼
2. 创建B的BeanFactory
   │
   ├── 从缓存查找B → 不存在
   ├── 标记B正在创建
   ├── 创建B实例
   ├── 为B注入A属性
   │
   ▼
3. 查找A
   │
   ├── 一级缓存 → 不存在
   ├── 二级缓存 → 不存在
   ├── 三级缓存 → 存在！
   │   └── 获取A的早期引用（未完全初始化的A）
   │
   ▼
4. B完成A的注入
   ├── B完成初始化
   ├── B放入一级缓存
   ├── 返回B实例
   │
   ▼
5. A完成B的注入
   ├── A完成初始化
   ├── A放入一级缓存
   ├── 返回A实例
   │
   └── 循环依赖解决！
```

---

## 三、依赖注入核心

### 3.1 依赖注入流程

```
populateBean()
    │
    ├── 1. 调用InstantiationAwareBeanPostProcessor
    │   └── postProcessAfterInstantiation()
    │
    ├── 2. 收集依赖注入信息
    │   ├── 解析@Autowired注解
    │   ├── 解析@Resource注解
    │   └── 解析XML配置的property
    │
    ├── 3. 调用InstantiationAwareBeanPostProcessor
    │   └── postProcessProperties()
    │
    └── 4. 执行依赖注入
        ├── resolveDependency()
        │   ├── 按类型查找Bean
        │   ├── 按名称查找Bean
        │   └── 处理限定符（@Qualifier）
        │
        └── applyPropertyValues()
            ├── 反射设置属性值
            └── 类型转换
```

### 3.2 @Autowired解析过程

```java
public class AutowiredAnnotationBeanPostProcessor 
        implements InstantiationAwareBeanPostProcessor {
    
    @Override
    public PropertyValues postProcessProperties(
            PropertyValues pvs, Object bean, String beanName) {
        
        // 查找所有需要注入的字段/方法
        InjectionMetadata metadata = 
            findAutowiringMetadata(beanName, bean.getClass(), pvs);
        
        try {
            // 执行注入
            metadata.inject(bean, beanName, pvs);
        } catch (BeanCreationException ex) {
            throw ex;
        } catch (Throwable ex) {
            throw new BeanCreationException(
                beanName, "Injection of autowired dependencies failed", ex);
        }
        
        return pvs;
    }
    
    private InjectionMetadata findAutowiringMetadata(
            String beanName, Class<?> clazz, PropertyValues pvs) {
        
        List<InjectionMetadata.InjectedElement> elements = new ArrayList<>();
        Class<?> targetClass = clazz;
        
        // 遍历类及其父类的字段和方法
        while (targetClass != null && targetClass != Object.class) {
            
            // 处理字段上的@Autowired
            for (Field field : targetClass.getDeclaredFields()) {
                if (field.isAnnotationPresent(Autowired.class)) {
                    elements.add(new AutowiredFieldElement(field, required));
                }
            }
            
            // 处理方法上的@Autowired
            for (Method method : targetClass.getDeclaredMethods()) {
                if (method.isAnnotationPresent(Autowired.class)) {
                    elements.add(new AutowiredMethodElement(method, required));
                }
            }
            
            targetClass = targetClass.getSuperclass();
        }
        
        return new InjectionMetadata(clazz, elements);
    }
}
```

### 3.3 依赖查找的三种方式

#### 按类型注入（byType）

```java
// Spring默认的注入方式
@Autowired
private UserDao userDao;  // 按类型查找UserDao的实现
```

#### 按名称注入（byName）

```java
// 使用@Qualifier指定Bean名称
@Autowired
@Qualifier("userDaoImpl")
private UserDao userDao;

// 或使用@Resource（JSR-250标准）
@Resource(name = "userDaoImpl")
private UserDao userDao;
```

#### 按注解注入（byAnnotation）

```java
// 自定义注解
@Target({ElementType.FIELD, ElementType.METHOD})
@Retention(RetentionPolicy.RUNTIME)
public @interface CustomAutowired {
}

// 使用自定义注解
@CustomAutowired
private UserDao userDao;
```

---

## 四、AOP核心源码

### 4.1 AOP代理创建流程

```
Bean实例化
    │
    ▼
AbstractAutoProxyCreator.postProcessAfterInitialization()
    │
    ├── 1. 判断是否需要创建代理
    │   ├── 判断是否是InstantiationAwareBeanPostProcessor
    │   ├── 判断是否是Advised
    │   └── 判断是否实现了TargetClassAware
    │
    ├── 2. 获取候选Advisor
    │   ├── 获取所有切面
    │   ├── 获取所有通知
    │   └── 获取所有引入
    │
    ├── 3. 判断Advisor是否匹配当前Bean
    │   ├── 检查Pointcut表达式
    │   └── 检查@Annotation
    │
    └── 4. 创建代理对象
        ├── 如果有接口 → JDK动态代理
        └── 如果无接口 → CGLIB代理
```

### 4.2 JDK动态代理实现

```java
public class JdkDynamicAopProxy implements AopProxy, InvocationHandler {
    
    private final AdvisedSupport advised;
    
    @Override
    public Object getProxy() {
        // 创建JDK动态代理
        return Proxy.newProxyInstance(
            advised.getTargetSource().getClassLoader(),
            getProxiedInterfaces(),
            this
        );
    }
    
    @Override
    public Object invoke(Object proxy, Method method, Object[] args) 
            throws Throwable {
        
        // 1. 获取目标对象
        Object target = advised.getTargetSource().getTarget();
        
        // 2. 获取拦截器链
        MethodInterceptor[] interceptors = 
            advised.getInterceptors(method, targetClass);
        
        if (interceptors == null || interceptors.length == 0) {
            // 无拦截器，直接调用目标方法
            return method.invoke(target, args);
        }
        
        // 3. 创建方法调用对象
        ReflectiveMethodInvocation invocation = 
            new ReflectiveMethodInvocation(
                target, method, args, targetClass, interceptors);
        
        // 4. 执行拦截器链
        return invocation.proceed();
    }
}
```

### 4.3 CGLIB代理实现

```java
public class CglibAopProxy implements AopProxy {
    
    private final AdvisedSupport advised;
    
    @Override
    public Object getProxy() {
        // 使用CGLIB创建代理
        Enhancer enhancer = new Enhancer();
        
        // 设置父类（目标类）
        enhancer.setSuperclass(advised.getTargetSource().getClass());
        
        // 设置回调
        enhancer.setCallback(new DynamicAdvisedInterceptor(advised));
        
        // 创建代理实例
        return enhancer.create();
    }
    
    private static class DynamicAdvisedInterceptor 
            implements MethodInterceptor {
        
        private final AdvisedSupport advised;
        
        @Override
        public Object intercept(Object proxy, Method method, 
                Object[] args, MethodProxy methodProxy) 
                throws Throwable {
            
            // 1. 获取目标对象
            Object target = advised.getTargetSource().getTarget();
            
            // 2. 获取拦截器链
            MethodInterceptor[] interceptors = 
                advised.getInterceptors(method, targetClass);
            
            // 3. 创建方法调用对象
            CglibMethodInvocation invocation = 
                new CglibMethodInvocation(
                    target, method, args, targetClass, 
                    interceptors, methodProxy);
            
            // 4. 执行拦截器链
            return invocation.proceed();
        }
    }
}
```

### 4.4 拦截器链执行流程

```java
public class ReflectiveMethodInvocation 
        implements MethodInvocation {
    
    private final Object target;
    private final Method method;
    private final Object[] arguments;
    private final Class<?> targetClass;
    private final List<MethodInterceptor> interceptors;
    private int currentInterceptorIndex = -1;
    
    @Override
    public Object proceed() throws Throwable {
        // 执行下一个拦截器或目标方法
        
        if (this.currentInterceptorIndex == 
                this.interceptors.size() - 1) {
            // 所有拦截器执行完毕，执行目标方法
            return invokeJoinpoint();
        }
        
        // 获取下一个拦截器
        this.currentInterceptorIndex++;
        MethodInterceptor interceptor = 
            this.interceptors.get(this.currentInterceptorIndex);
        
        // 执行拦截器
        return interceptor.invoke(this);
    }
    
    protected Object invokeJoinpoint() throws Throwable {
        // 反射调用目标方法
        return this.method.invoke(this.target, this.arguments);
    }
}
```

### 4.5 通知执行顺序

```
拦截器链：
[0] ExposeInvocationInterceptor
    │
    [1] MethodBeforeAdviceInterceptor (@Before通知)
    │   └── 执行before()
    │   └── 调用invocation.proceed()
    │
    [2] AfterReturningAdviceInterceptor (@AfterReturning通知)
    │   └── 调用invocation.proceed()
    │   └── 执行afterReturning()
    │
    [3] AfterThrowingAdviceInterceptor (@AfterThrowing通知)
    │   └── try { invocation.proceed() }
    │   └── catch { afterThrowing() }
    │
    [4] AspectJAfterAdvice (@After通知)
    │   └── try { invocation.proceed() }
    │   └── finally { after() }
    │
    [5] 目标方法执行
    
执行顺序：
1. @Before通知执行
2. 目标方法执行
   ├── 成功：@AfterReturning → @After
   └── 异常：@AfterThrowing → @After
```

---

## 五、事件机制

### 5.1 Spring事件体系

```
ApplicationEvent (抽象类)
    │
    ├── ApplicationContextEvent
    │   ├── ContextRefreshedEvent   // 上下文刷新
    │   ├── ContextStartedEvent     // 上下文启动
    │   ├── ContextStoppedEvent     // 上下文停止
    │   └── ContextClosedEvent      // 上下文关闭
    │
    └── 自定义事件
        └── UserCreatedEvent        // 用户创建事件
```

### 5.2 自定义事件实战

```java
// 1. 创建事件
public class UserCreatedEvent extends ApplicationEvent {
    
    private final Long userId;
    private final String username;
    
    public UserCreatedEvent(Object source, 
            Long userId, String username) {
        super(source);
        this.userId = userId;
        this.username = username;
    }
    
    public Long getUserId() {
        return userId;
    }
    
    public String getUsername() {
        return username;
    }
}

// 2. 创建事件监听器
@Component
public class UserCreatedEventListener {
    
    // 方式1：实现ApplicationListener接口
    @EventListener
    public void onUserCreated(UserCreatedEvent event) {
        System.out.println("用户创建事件：" + 
            event.getUsername());
        
        // 异步处理
        sendWelcomeEmail(event.getUserId());
        updateUserStatistics(event.getUserId());
    }
    
    // 方式2：@EventListener注解
    @Async
    @EventListener
    public void onUserCreatedAsync(UserCreatedEvent event) {
        // 异步处理
    }
    
    // 方式3：TransactionalEventListener
    @TransactionalEventListener(phase = TransactionPhase.AFTER_COMMIT)
    public void onUserCreatedAfterCommit(UserCreatedEvent event) {
        // 事务提交后执行
    }
}

// 3. 发布事件
@Service
public class UserService {
    
    @Autowired
    private ApplicationEventPublisher eventPublisher;
    
    public void createUser(User user) {
        // 1. 保存用户
        userDao.insert(user);
        
        // 2. 发布事件
        eventPublisher.publishEvent(
            new UserCreatedEvent(this, user.getId(), user.getName()));
    }
}
```

### 5.3 事件发布机制

```java
public abstract class AbstractApplicationContext 
        extends DefaultResourceLoader {
    
    @Override
    public void publishEvent(ApplicationEvent event) {
        publishEvent(event, null);
    }
    
    protected void publishEvent(ApplicationEvent event, 
            @Nullable ResolvableType eventType) {
        
        // 1. 获取事件类型
        ResolvableType type = (eventType != null) ? eventType : 
            ResolvableType.forInstance(event);
        
        // 2. 通知所有监听器
        getApplicationEventMulticaster()
            .multicastEvent(event, type);
    }
}

public class SimpleApplicationEventMulticaster 
        implements ApplicationEventMulticaster {
    
    @Override
    public void multicastEvent(ApplicationEvent event, 
            @Nullable ResolvableType eventType) {
        
        ResolvableType type = (eventType != null) ? eventType : 
            resolveDefaultEventType(event);
        
        // 获取所有匹配的监听器
        for (ApplicationListener<?> listener : 
                getApplicationListeners(event, type)) {
            
            // 执行监听器
            invokeListener(listener, event);
        }
    }
    
    protected void invokeListener(ApplicationListener listener, 
            ApplicationEvent event) {
        try {
            listener.onApplicationEvent(event);
        } catch (ClassCastException ex) {
            // 类型转换异常处理
        }
    }
}
```

---

## 六、扩展点总结

### 6.1 Bean生命周期扩展点

| 接口/注解 | 作用 | 执行时机 |
|----------|------|---------|
| `BeanFactoryPostProcessor` | 修改BeanFactory配置 | Bean实例化前 |
| `BeanDefinitionRegistryPostProcessor` | 注册新的BeanDefinition | BeanFactoryPostProcessor之前 |
| `InstantiationAwareBeanPostProcessor` | 实例化阶段扩展 | 实例化前后 |
| `BeanPostProcessor` | Bean初始化前后处理 | 初始化前后 |
| `DestructionAwareBeanPostProcessor` | Bean销毁前处理 | 销毁前 |
| `SmartInitializingSingleton` | 所有单例Bean初始化后 | 单例初始化完成后 |

### 6.2 ApplicationContext扩展点

| 接口/注解 | 作用 | 执行时机 |
|----------|------|---------|
| `ApplicationContextInitializer` | 初始化ApplicationContext | 上下文创建前 |
| `BeanFactoryPostProcessor` | 修改BeanFactory | 上下文刷新时 |
| `ApplicationListener` | 监听应用事件 | 事件触发时 |
| `ApplicationEventPublisher` | 发布事件 | 业务逻辑中 |
| `EnvironmentPostProcessor` | 修改环境变量 | 环境准备阶段 |

### 6.3 自定义扩展实战

```java
// 1. 自定义BeanPostProcessor
@Component
public class CustomBeanPostProcessor 
        implements BeanPostProcessor {
    
    @Override
    public Object postProcessBeforeInitialization(
            Object bean, String beanName) {
        
        // 为所有Bean添加日志功能
        if (bean instanceof Loggable) {
            Loggable loggable = (Loggable) bean;
            loggable.setLogger(
                LoggerFactory.getLogger(bean.getClass()));
        }
        
        return bean;
    }
    
    @Override
    public Object postProcessAfterInitialization(
            Object bean, String beanName) {
        
        // 记录Bean初始化完成
        System.out.println("Bean initialized: " + beanName);
        
        return bean;
    }
}

// 2. 自定义ApplicationContextInitializer
public class CustomApplicationContextInitializer 
        implements ApplicationContextInitializer<ConfigurableApplicationContext> {
    
    @Override
    public void initialize(ConfigurableApplicationContext context) {
        // 添加自定义配置
        context.getEnvironment().getSystemProperties()
            .put("app.version", "1.0.0");
        
        // 添加自定义BeanFactoryPostProcessor
        context.addBeanFactoryPostProcessor(
            new CustomBeanFactoryPostProcessor());
    }
}

// 3. 注册ApplicationContextInitializer
// 在META-INF/spring.factories中配置：
// org.springframework.context.ApplicationContextInitializer=\
//   com.example.CustomApplicationContextInitializer
```

---

## 七、Spring性能优化

### 7.1 启动性能优化

#### 减少Bean数量

```java
// 使用懒加载
@Lazy
@Service
public class HeavyService {
    // 重量级Bean，首次使用时才创建
}

// 使用原型作用域
@Scope("prototype")
@Service
public class StatefulService {
    // 有状态的服务
}
```

#### 优化组件扫描

```java
// 精确指定扫描包
@SpringBootApplication(
    scanBasePackages = "com.example"
)
public class AppConfig {
    // 只扫描必要的包
}

// 排除不需要的自动配置
@SpringBootApplication(exclude = {
    DataSourceAutoConfiguration.class,
    RedisAutoConfiguration.class
})
public class AppConfig {
    // 排除不使用的自动配置
}
```

#### 延迟初始化

```java
// 延迟初始化指定Bean
@Configuration
public class BeanConfig {
    
    @Bean
    @Lazy
    public ExpensiveService expensiveService() {
        return new ExpensiveService();
    }
}
```

### 7.2 运行时性能优化

#### 使用原型作用域

```java
// 对于有状态对象使用原型
@Service
@Scope("prototype")
public class RequestContext {
    private String requestId;
    private Map<String, Object> attributes;
    // 每次请求创建新实例
}
```

#### 避免不必要的AOP

```java
// 精确切点表达式
@Aspect
@Component
public class LoggingAspect {
    
    // 只拦截Controller层
    @Before("execution(* com.example.controller..*.*(..))")
    public void logController() {
        // ...
    }
    
    // 避免使用..*匹配过大范围
    // ❌ execution(* com.example..*.*(..))
    // ✅ execution(* com.example.service.*.*(..))
}
```

#### 缓存Bean

```java
// 使用Spring Cache
@Service
public class ProductService {
    
    @Cacheable(value = "products", key = "#id")
    public Product getProduct(Long id) {
        // 结果会被缓存
        return productDao.findById(id);
    }
    
    @CacheEvict(value = "products", key = "#id")
    public void updateProduct(Long id, Product product) {
        // 更新后清除缓存
        productDao.update(id, product);
    }
}
```

---

## 八、Spring 6新特性

### 8.1 AOT与GraalVM原生镜像

```java
// Spring Boot 3.x + Spring 6.x 支持AOT
// 编译为原生镜像，启动速度提升10倍，内存减少50%

// pom.xml配置
<build>
    <plugins>
        <plugin>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-maven-plugin</artifactId>
            <configuration>
                <image>
                    <builder>
                        ghcr.io/graalvm/graalvm-ce-buildpacks:latest
                    </builder>
                </image>
            </configuration>
        </plugin>
    </plugins>
</build>

// 编译命令
// mvn spring-boot:build-image
```

### 8.2 响应式编程增强

```java
// Spring 6基于Reactor 3.5+增强响应式支持

@Service
public class ReactiveUserService {
    
    // 响应式查询
    public Mono<User> getUser(Long id) {
        return userRepository.findById(id);
    }
    
    // 响应式保存
    public Mono<User> createUser(User user) {
        return userRepository.save(user);
    }
    
    // 响应式流式查询
    public Flux<User> listUsers() {
        return userRepository.findAll();
    }
}
```

### 8.3 HTTP接口优化

```java
// @HttpExchange注解声明HTTP接口
@HttpExchange(url = "/users")
public interface UserClient {
    
    @GetExchange("/{id}")
    User getUser(@PathVariable("id") Long id);
    
    @PostExchange
    User createUser(@RequestBody User user);
    
    @PutExchange("/{id}")
    User updateUser(@PathVariable("id") Long id, 
                    @RequestBody User user);
    
    @DeleteExchange("/{id}")
    void deleteUser(@PathVariable("id") Long id);
}

// 使用HttpServiceProxyFactory创建客户端
UserClient client = HttpServiceProxyFactory
    .builder(WebClientAdapter.forClient(webClient))
    .createClient(UserClient.class);
```

### 8.4 函数式Bean注册

```java
// Spring 6支持函数式注册Bean
public class FunctionalBeanRegistration {
    
    public static void main(String[] args) {
        // 使用ContextRegistry创建上下文
        ApplicationContext context = new 
            StaticApplicationContext();
        
        // 函数式注册Bean
        ((StaticApplicationContext) context).registerBean(
            "userService",
            UserService.class,
            () -> new UserServiceImpl()
        );
        
        // 获取Bean
        UserService userService = context.getBean(UserService.class);
    }
}
```

---

## 九、小结

Spring核心原理可以总结为以下几点：

### 9.1 核心设计思想

1. **控制反转（IoC）**：将对象创建和依赖管理交给容器
2. **面向切面（AOP）**：将横切关注点与业务逻辑分离
3. **依赖注入（DI）**：通过构造器、Setter等方式注入依赖
4. **配置驱动**：支持XML、注解、Java配置类

### 9.2 核心实现机制

1. **BeanFactory**：Bean管理的核心接口
2. **三级缓存**：解决循环依赖问题
3. **动态代理**：JDK代理 + CGLIB代理
4. **拦截器链**：AOP通知的执行机制
5. **事件机制**：发布-订阅模式的实现

### 9.3 扩展与定制

1. **BeanPostProcessor**：Bean生命周期扩展
2. **BeanFactoryPostProcessor**：BeanFactory配置扩展
3. **ApplicationListener**：应用事件监听
4. **ApplicationContextInitializer**：上下文初始化

掌握Spring核心原理，能够帮助我们：
- 更好地使用Spring框架
- 解决复杂的实际问题
- 进行框架级别的定制开发
- 优化应用性能
