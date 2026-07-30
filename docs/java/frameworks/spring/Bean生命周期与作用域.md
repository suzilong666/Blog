# Bean生命周期与作用域

## 一、Bean生命周期概述

### 1.1 什么是Bean生命周期

Bean生命周期指的是**从Bean被容器创建到销毁的完整过程**。Spring容器管理Bean的整个生命周期，包括：

- Bean的**实例化**
- 属性的**依赖注入**
- **初始化**方法调用
- 容器中**使用**Bean
- Bean的**销毁**

### 1.2 生命周期整体流程图

```
容器启动
    │
    ▼
┌─────────────────────────────────────────────────────────┐
│                    Bean生命周期                           │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  1. 实例化阶段                                          │
│     ├── BeanDefinition解析                             │
│     ├── InstantiationAwareBeanPostProcessor             │
│     └── 反射创建Bean实例                                │
│              │                                          │
│              ▼                                          │
│  2. 属性赋值阶段                                        │
│     ├── InstantiationAwareBeanPostProcessor.postProcess  │
│     │       PropertiesBeforeInstantiation              │
│     ├── 依赖注入（@Autowired/@Resource）                │
│     └── 处理BeanNameAware/ApplicationContextAware        │
│              │                                          │
│              ▼                                          │
│  3. 初始化阶段                                          │
│     ├── BeanPostProcessor.postProcessBeforeInitialization│
│     ├── @PostConstruct方法                              │
│     ├── InitializingBean.afterPropertiesSet()           │
│     ├── init-method指定方法                             │
│     └── BeanPostProcessor.postProcessAfterInitialization│
│              │                                          │
│              ▼                                          │
│  4. 使用阶段                                            │
│     └── 从容器中获取Bean并使用                          │
│              │                                          │
│              ▼                                          │
│  5. 销毁阶段                                            │
│     ├── @PreDestroy方法                                 │
│     ├── DisposableBean.destroy()                        │
│     └── destroy-method指定方法                          │
│                                                         │
└─────────────────────────────────────────────────────────┘
    │
    ▼
容器关闭
```

---

## 二、Bean生命周期详解

### 2.1 准备阶段

#### BeanDefinition的解析

Spring容器启动时，首先会解析配置文件（XML或注解），将每个Bean的定义信息封装成`BeanDefinition`对象：

```java
public class BeanDefinitionExample {
    
    // Bean的定义信息
    // 1. 类名：com.example.UserService
    // 2. 作用域：singleton
    // 3. 构造器参数
    // 4. 属性值
    // 5. 初始化方法：init()
    // 6. 销毁方法：destroy()
}
```

#### BeanFactoryPostProcessor处理

在Bean实例化之前，Spring会先执行`BeanFactoryPostProcessor`：

```java
@Component
public class CustomBeanFactoryPostProcessor 
    implements BeanFactoryPostProcessor {
    
    @Override
    public void postProcessBeanFactory(
            ConfigurableListableBeanFactory beanFactory) {
        // 可以修改BeanDefinition
        // 比如：修改属性值、添加新的Bean定义
        System.out.println("BeanFactoryPostProcessor执行");
    }
}
```

**常见的BeanFactoryPostProcessor**：
- `PropertySourcesPlaceholderConfigurer`：解析配置文件中的占位符
- `ConfigurationClassPostProcessor`：处理@Configuration配置类

### 2.2 实例化阶段

#### InstantiationAwareBeanPostProcessor

```java
@Component
public class CustomInstantiationAwareBeanPostProcessor 
    extends InstantiationAwareBeanPostProcessorAdapter {
    
    // Bean实例化之前调用（可以返回代理对象）
    @Override
    public Object postProcessBeforeInstantiation(
            Class<?> beanClass, String beanName) {
        // 返回非null值将替代真实的Bean实例
        return null;
    }
    
    // Bean实例化之后、属性设置之前调用
    @Override
    public boolean postProcessAfterInstantiation(
            Object bean, String beanName) {
        // 返回true表示继续属性设置
        return true;
    }
    
    // 属性值处理
    @Override
    public PropertyValues postProcessProperties(
            PropertyValues pvs, Object bean, String beanName) {
        return pvs;
    }
}
```

#### Bean实例化方式

Spring通过反射或工厂方法创建Bean实例：

```java
// 1. 构造器反射实例化
Constructor<?> constructor = beanClass.getDeclaredConstructor();
Object instance = constructor.newInstance();

// 2. 静态工厂方法实例化
Method factoryMethod = factoryClass.getMethod(methodName);
Object instance = factoryMethod.invoke(null, args);

// 3. 实例工厂方法实例化
Method factoryMethod = factoryClass.getMethod(methodName);
Object instance = factoryMethod.invoke(factoryBean, args);
```

### 2.3 属性赋值阶段

#### 依赖注入

Spring通过以下方式完成依赖注入：

```java
// 1. 字段注入
@Autowired
private UserDao userDao;

// 2. Setter注入
@Autowired
public void setUserDao(UserDao userDao) {
    this.userDao = userDao;
}

// 3. 构造器注入
public UserService(UserDao userDao) {
    this.userDao = userDao;
}
```

#### Aware接口调用

```java
@Component
public class MyBean implements 
    BeanNameAware,
    BeanFactoryAware,
    ApplicationContextAware {
    
    private String beanName;
    private BeanFactory beanFactory;
    private ApplicationContext applicationContext;
    
    // 设置Bean名称
    @Override
    public void setBeanName(String name) {
        this.beanName = name;
    }
    
    // 设置BeanFactory
    @Override
    public void setBeanFactory(BeanFactory beanFactory) 
            throws BeansException {
        this.beanFactory = beanFactory;
    }
    
    // 设置ApplicationContext
    @Override
    public void setApplicationContext(
            ApplicationContext applicationContext) 
            throws BeansException {
        this.applicationContext = applicationContext;
    }
}
```

### 2.4 初始化阶段

#### BeanPostProcessor

```java
@Component
public class CustomBeanPostProcessor implements BeanPostProcessor {
    
    // 初始化之前调用
    @Override
    public Object postProcessBeforeInitialization(
            Object bean, String beanName) 
            throws BeansException {
        System.out.println("Before init: " + beanName);
        return bean;
    }
    
    // 初始化之后调用
    @Override
    public Object postProcessAfterInitialization(
            Object bean, String beanName) 
            throws BeansException {
        System.out.println("After init: " + beanName);
        return bean;
    }
}
```

#### 初始化方法的三种方式

```java
// 方式1：@PostConstruct
@Component
public class UserService {
    
    @PostConstruct
    public void init() {
        System.out.println("@PostConstruct初始化");
    }
}

// 方式2：实现InitializingBean接口
@Component
public class UserService implements InitializingBean {
    
    @Override
    public void afterPropertiesSet() throws Exception {
        System.out.println("InitializingBean初始化");
    }
}

// 方式3：配置init-method
// 注解方式
@Component
public class UserService {
    
    @Bean(initMethod = "customInit")
    public UserService userService() {
        return new UserService();
    }
    
    public void customInit() {
        System.out.println("自定义初始化方法");
    }
}

// XML方式
// <bean id="userService" class="com.example.UserService" 
//       init-method="customInit"/>
```

#### 初始化执行顺序

```
1. BeanPostProcessor.postProcessBeforeInitialization()
2. @PostConstruct注解的方法
3. InitializingBean.afterPropertiesSet()
4. init-method指定的方法
5. BeanPostProcessor.postProcessAfterInitialization()
```

### 2.5 销毁阶段

#### 销毁方法的三种方式

```java
// 方式1：@PreDestroy
@Component
public class UserService {
    
    @PreDestroy
    public void cleanup() {
        System.out.println("@PreDestroy销毁");
    }
}

// 方式2：实现DisposableBean接口
@Component
public class UserService implements DisposableBean {
    
    @Override
    public void destroy() throws Exception {
        System.out.println("DisposableBean销毁");
    }
}

// 方式3：配置destroy-method
@Component
public class UserService {
    
    @Bean(destroyMethod = "customDestroy")
    public UserService userService() {
        return new UserService();
    }
    
    public void customDestroy() {
        System.out.println("自定义销毁方法");
    }
}
```

---

## 三、Bean作用域

### 3.1 五种标准作用域

| 作用域 | 说明 | 创建时机 | 销毁时机 |
|--------|------|---------|---------|
| `singleton` | 单例（默认） | 容器启动时 | 容器关闭时 |
| `prototype` | 多例 | 每次获取时 | 手动销毁 |
| `request` | HTTP请求 | 每次请求时 | 请求结束时 |
| `session` | HTTP会话 | 会话开始时 | 会话结束时 |
| `application` | Web应用 | 应用启动时 | 应用关闭时 |
| `websocket` | WebSocket | 会话开始时 | 会话结束时 |

### 3.2 单例 vs 多例

#### 单例作用域（singleton）

```java
@Service
@Scope("singleton") // 默认值，可以省略
public class UserService {
    // 整个容器中只有一个实例
    // 适合：无状态的服务类
}
```

#### 多例作用域（prototype）

```java
@Service
@Scope("prototype")
public class OrderService {
    // 每次getBean都会创建新实例
    // 适合：有状态的对象
}
```

#### 单例中注入多例Bean的问题

```java
@Service
public class UserService {
    
    @Autowired
    private OrderService orderService; // 多例Bean
    
    public void process() {
        // orderService始终是同一个实例！
        // 因为UserService是单例，只注入一次
        orderService.doSomething();
    }
}
```

#### 解决方案：方法注入

```java
@Service
public class UserService {
    
    @Autowired
    @Lookup // Spring 4.1+
    public OrderService getOrderService() {
        // 每次调用返回新的实例
        return null; // 不需要实现，Spring会代理
    }
    
    public void process() {
        // 每次getOrderService()调用返回新实例
        getOrderService().doSomething();
    }
}
```

### 3.3 Web相关作用域

```java
// 请求作用域
@Controller
@Scope("request")
public class RequestScopedBean {
    private String requestId;
    
    // 每次HTTP请求都会创建新的实例
}

// 会话作用域
@Service
@Scope("session")
public class SessionScopedBean {
    private User currentUser;
    
    // 每个用户会话创建一个实例
}

// 应用作用域
@Service
@Scope("application")
public class ApplicationScopedBean {
    private List<String> configuration;
    
    // 整个Web应用共享一个实例
}
```

#### Web作用域的特殊配置

```xml
<!-- 需要在web.xml中配置RequestContextListener -->
<web-app>
    <listener>
        <listener-class>
            org.springframework.web.context.request.RequestContextListener
        </listener-class>
    </listener>
</web-app>
```

---

## 四、生命周期回调实战

### 4.1 完整生命周期示例

```java
@Component
public class LifeCycleDemoBean implements 
    BeanNameAware,
    BeanFactoryAware,
    ApplicationContextAware,
    InitializingBean,
    DisposableBean {
    
    private String beanName;
    
    // 构造器
    public LifeCycleDemoBean() {
        System.out.println("1. 构造器调用");
    }
    
    // 属性赋值
    @Autowired
    public void setBeanProperty(String value) {
        System.out.println("2. 属性赋值：" + value);
    }
    
    // BeanNameAware
    @Override
    public void setBeanName(String name) {
        this.beanName = name;
        System.out.println("3. setBeanName: " + name);
    }
    
    // BeanFactoryAware
    @Override
    public void setBeanFactory(BeanFactory beanFactory) {
        System.out.println("4. setBeanFactory");
    }
    
    // ApplicationContextAware
    @Override
    public void setApplicationContext(ApplicationContext applicationContext) {
        System.out.println("5. setApplicationContext");
    }
    
    // @PostConstruct
    @PostConstruct
    public void postConstruct() {
        System.out.println("6. @PostConstruct");
    }
    
    // InitializingBean
    @Override
    public void afterPropertiesSet() {
        System.out.println("7. afterPropertiesSet");
    }
    
    // 自定义初始化方法
    public void customInit() {
        System.out.println("8. 自定义初始化方法");
    }
    
    // @PreDestroy
    @PreDestroy
    public void preDestroy() {
        System.out.println("9. @PreDestroy");
    }
    
    // DisposableBean
    @Override
    public void destroy() {
        System.out.println("10. destroy()");
    }
    
    // 自定义销毁方法
    public void customDestroy() {
        System.out.println("11. 自定义销毁方法");
    }
}
```

### 4.2 执行顺序

```
1. 构造器调用
2. 属性赋值
3. setBeanName
4. setBeanFactory
5. setApplicationContext
6. @PostConstruct
7. afterPropertiesSet
8. 自定义初始化方法
   ... Bean使用 ...
9. @PreDestroy
10. destroy()
11. 自定义销毁方法
```

### 4.3 自定义BeanPostProcessor

```java
@Component
public class LoggingBeanPostProcessor implements BeanPostProcessor {
    
    private final Logger logger = LoggerFactory.getLogger(
        LoggingBeanPostProcessor.class);
    
    @Override
    public Object postProcessBeforeInitialization(
            Object bean, String beanName) {
        logger.info("Before initialization: {}", beanName);
        return bean;
    }
    
    @Override
    public Object postProcessAfterInitialization(
            Object bean, String beanName) {
        logger.info("After initialization: {}", beanName);
        return bean;
    }
}
```

---

## 五、源码级原理剖析

### 5.1 AbstractBeanFactory.doCreateBean()

```java
protected Object doCreateBean(
        String beanName, 
        RootBeanDefinition mbd, 
        Object[] args) {
    
    // 1. Bean实例化
    BeanWrapper instanceWrapper = createBeanInstance(
        beanName, mbd, args);
    
    Object exposedObject = instanceWrapper.getWrappedInstance();
    
    // 2. 属性赋值
    populateBean(beanName, mbd, instanceWrapper);
    
    // 3. 初始化
    exposedObject = initializeBean(
        beanName, exposedObject, mbd);
    
    // 4. 注册销毁回调
    registerDisposableBeanIfNecessary(
        beanName, exposedObject, mbd);
    
    return exposedObject;
}
```

### 5.2 createBeanInstance()实例化Bean

```java
protected BeanWrapper createBeanInstance(
        String beanName, 
        RootBeanDefinition mbd, 
        Object[] args) {
    
    // 1. 通过工厂方法实例化
    if (mbd.getFactoryMethodName() != null) {
        return instantiateUsingFactoryMethod(
            beanName, mbd, args);
    }
    
    // 2. 使用构造器实例化
    Constructor<?>[] constructors = 
        mbd.getPreparedConstructor();
    if (constructors != null) {
        return instantiateBean(beanName, constructors);
    }
    
    // 3. 使用默认无参构造器
    return instantiateBean(beanName, mbd);
}
```

### 5.3 populateBean()属性赋值

```java
protected void populateBean(
        String beanName, 
        AbstractBeanDefinition mbd, 
        BeanWrapper bw) {
    
    // 1. 应用InstantiationAwareBeanPostProcessor
    PropertyValues pvs = null;
    if (hasInstantiationAwareBeanPostProcessors()) {
        pvs = applyInstantiationAwareBeanPostProcessors(
            beanName, mbd, bw, null);
    }
    
    // 2. 依赖注入
    if (pvs != null) {
        // 处理注解注入@Autowired等
        // 处理XML配置的property
        applyPropertyValues(beanName, mbd, bw, pvs);
    }
}
```

### 5.4 initializeBean()初始化Bean

```java
protected Object initializeBean(
        String beanName, 
        Object bean, 
        RootBeanDefinition mbd) {
    
    // 1. 调用Aware接口
    invokeAwareMethods(beanName, bean);
    
    // 2. 调用BeanPostProcessor.postProcessBeforeInitialization
    Object wrappedBean = applyBeanPostProcessorsBeforeInitialization(
        bean, beanName);
    
    // 3. 调用初始化方法
    invokeInitMethods(beanName, wrappedBean, mbd);
    
    // 4. 调用BeanPostProcessor.postProcessAfterInitialization
    wrappedBean = applyBeanPostProcessorsAfterInitialization(
        wrappedBean, beanName);
    
    return wrappedBean;
}
```

---

## 六、最佳实践

### 6.1 作用域选择建议

| 场景 | 推荐作用域 | 原因 |
|------|-----------|------|
| 无状态服务类 | singleton | 节省资源、线程安全 |
| 有状态对象 | prototype | 避免状态共享问题 |
| 用户相关数据 | session | 每个用户独立的数据 |
| 单次请求数据 | request | 生命周期短、自动清理 |
| 全局配置 | application | 整个应用共享 |

### 6.2 生命周期使用建议

1. **避免在构造器中做复杂操作**
   - 构造器只做参数校验和简单初始化
   - 复杂逻辑放在`@PostConstruct`或`InitializingBean`中

2. **合理使用销毁回调**
   - 释放数据库连接
   - 关闭文件流
   - 清理缓存

3. **BeanPostProcessor谨慎使用**
   - 全局影响所有Bean
   - 性能敏感场景慎用

### 6.3 常见问题

#### Q: 多例Bean的销毁回调会执行吗？

**不会**。多例Bean的销毁方法需要手动调用，Spring容器不会自动管理多例Bean的销毁。

#### Q: 循环依赖如何解决？

Spring通过**三级缓存**解决单例循环依赖：

```java
// 构造器循环依赖：无法解决，会抛出BeanCurrentlyInCreationException
// Setter循环依赖：可以解决，通过提前暴露引用
```

#### Q: @PostConstruct和InitializingBean的执行顺序？

```
1. BeanPostProcessor.postProcessBeforeInitialization()
2. @PostConstruct方法
3. InitializingBean.afterPropertiesSet()
4. init-method指定的方法
5. BeanPostProcessor.postProcessAfterInitialization()
```

---

## 七、小结

Bean生命周期是Spring框架的核心机制：

1. **五个阶段**：实例化 → 属性赋值 → 初始化 → 使用 → 销毁
2. **三种初始化方式**：`@PostConstruct`、`InitializingBean`、`init-method`
3. **三种销毁方式**：`@PreDestroy`、`DisposableBean`、`destroy-method`
4. **六种作用域**：singleton、prototype、request、session、application、websocket
5. **扩展点**：BeanPostProcessor、BeanFactoryPostProcessor可以介入生命周期

理解Bean生命周期的原理，能够帮助我们：
- 正确设计Bean的初始化和销毁逻辑
- 合理选择Bean的作用域
- 解决循环依赖等常见问题
