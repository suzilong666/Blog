# Spring入门与IoC控制反转

## 一、Spring框架概述

### 1.1 什么是Spring

Spring是一个**开源的、轻量级的Java企业级应用开发框架**，由Rod Johnson在2002年创建。它的核心设计理念是：

- **控制反转（IoC, Inversion of Control）**：将对象的创建和依赖管理交给容器
- **面向切面编程（AOP, Aspect-Oriented Programming）**：将横切关注点（如日志、事务）与业务逻辑分离

### 1.2 Spring的发展历程

| 版本 | 发布年份 | 主要特性 |
|------|---------|---------|
| Spring 1.x | 2004 | IoC容器、AOP框架 |
| Spring 2.x | 2006 | 表达式语言、异步任务 |
| Spring 3.x | 2009 | 注解驱动、REST支持 |
| Spring 4.x | 2013 | WebSocket、响应式 |
| Spring 5.x | 2017 | 响应式编程、JUnit 5 |
| Spring 6.x | 2022 | AOT、GraalVM原生镜像 |

### 1.3 Spring的模块结构

```
Spring Framework
├── spring-core        # 核心模块：IoC、Bean生命周期
├── spring-beans       # Bean管理、依赖注入
├── spring-context     # 上下文支持、国际化
├── spring-expression  # 表达式语言（SpEL）
├── spring-aop         # AOP面向切面编程
├── spring-web         # Web基础功能
├── spring-webmvc      # Spring MVC框架
├── spring-jdbc        # JDBC支持
├── spring-tx          # 事务管理
└── spring-test        # 测试支持
```

---

## 二、IoC控制反转

### 2.1 什么是控制反转

**控制反转（Inversion of Control）** 是一种设计原则，指的是：

> 对象的**创建权**和**依赖关系的维护权**不再由代码主动创建，而是**交给容器**来管理。

#### 传统方式 vs IoC方式

```java
// ❌ 传统方式：主动创建对象，依赖由自己管理
public class UserService {
    private UserDao userDao = new UserDao(); // 硬编码依赖
    private UserRepository userRepository = new UserRepository();
    
    public void save() {
        userDao.insert(user);
        userRepository.save(user);
    }
}

// ✅ IoC方式：对象由容器创建，依赖由容器注入
public class UserService {
    private UserDao userDao;       // 容器注入
    private UserRepository userRepository; // 容器注入
    
    // 构造器注入
    public UserService(UserDao userDao, UserRepository userRepository) {
        this.userDao = userDao;
        this.userRepository = userRepository;
    }
    
    public void save() {
        userDao.insert(user);
        userRepository.save(user);
    }
}
```

### 2.2 IoC的两种实现方式

#### 依赖注入（Dependency Injection, DI）

依赖注入是IoC的**实现方式**，主要有三种：

| 注入方式 | 说明 | 优点 | 缺点 |
|---------|------|------|------|
| **构造器注入** | 通过构造方法注入依赖 | 依赖不可变、必须完整 | 参数多时构造方法臃肿 |
| **Setter注入** | 通过Setter方法注入 | 灵活、可选依赖 | 依赖可能不完整 |
| **字段注入** | 通过反射直接注入字段 | 简洁、方便 | 隐藏依赖关系、不利于测试 |

#### 依赖查找（Dependency Lookup）

依赖查找是IoC的**另一种实现**，但不常用：

```java
// 依赖查找方式（不推荐）
public class UserService {
    public void save() {
        ApplicationContext context = 
            new ClassPathXmlApplicationContext("spring-config.xml");
        UserDao userDao = context.getBean("userDao");
        // ...
    }
}
```

---

## 三、IoC容器详解

### 3.1 BeanFactory vs ApplicationContext

#### BeanFactory：基础容器

```java
// BeanFactory：懒加载，第一次getBean时才创建对象
BeanFactory factory = new XmlBeanFactory(
    new ClassPathResource("spring-config.xml")
);
UserService userService = (UserService) factory.getBean("userService");
```

#### ApplicationContext：高级容器

```java
// ApplicationContext：饿汉式加载，启动时就创建所有单例Bean
ApplicationContext context = new ClassPathXmlApplicationContext("spring-config.xml");
UserService userService = context.getBean(UserService.class);
```

#### 对比

| 特性 | BeanFactory | ApplicationContext |
|------|------------|-------------------|
| 加载方式 | 懒加载 | 饿汉式加载 |
| 国际化 | ❌ 不支持 | ✅ 支持 |
| AOP | ❌ 不支持 | ✅ 支持 |
| 事件机制 | ❌ 不支持 | ✅ 支持 |
| 自动装配 | ❌ 不支持 | ✅ 支持 |

### 3.2 ApplicationContext的实现类

| 实现类 | 说明 | 使用场景 |
|--------|------|---------|
| `ClassPathXmlApplicationContext` | 从类路径加载XML配置 | 非Web应用 |
| `FileSystemXmlApplicationContext` | 从文件系统加载XML配置 | 非Web应用 |
| `AnnotationConfigApplicationContext` | 基于注解的容器 | 注解配置 |
| `XmlWebApplicationContext` | Web环境下的XML配置 | Web应用 |
| `AnnotationConfigWebApplicationContext` | Web环境下的注解配置 | Web应用 |

---

## 四、XML方式配置Bean

### 4.1 最小配置示例

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="http://www.springframework.org/schema/beans
           http://www.springframework.org/schema/beans/spring-beans.xsd">
    
    <!-- 定义Bean -->
    <bean id="userService" class="com.example.UserService"/>
    
    <!-- 获取Bean -->
    <!-- UserService userService = context.getBean("userService"); -->
</beans>
```

### 4.2 Bean标签属性详解

```xml
<bean 
    id="userService"                    <!-- Bean的唯一标识符 -->
    name="userService,userSvc"         <!-- Bean的别名，可多个用逗号分隔 -->
    class="com.example.UserService"    <!-- Bean的全限定类名 -->
    scope="singleton"                   <!-- 作用域：singleton/prototype/request/session/global-session -->
    lazy-init="true"                   <!-- 是否懒加载 -->
    abstract="false"                   <!-- 是否为抽象Bean（不实例化） -->
    parent="baseBean"                  <!-- 父Bean的id -->
    factory-bean=""                    <!-- 工厂Bean引用 -->
    factory-method=""                  <!-- 工厂方法名 -->
    destroy-method="cleanup"           <!-- 销毁回调方法 -->
    init-method="initialize"           <!-- 初始化回调方法 -->
    autowire="byType"                  <!-- 自动装配方式 -->
    depends-on="bean1,bean2"          <!-- 依赖的其他Bean -->
>
    <!-- 构造器参数 -->
    <constructor-arg name="userDao" ref="userDao"/>
    <constructor-arg name="name" value="Spring"/>
    
    <!-- 属性注入 -->
    <property name="userDao" ref="userDao"/>
    <property name="name" value="Spring Framework"/>
</bean>
```

### 4.3 Bean的实例化方式

#### 构造器实例化（最常用）

```xml
<!-- 无参构造器 -->
<bean id="userService" class="com.example.UserService"/>

<!-- 有参构造器 -->
<bean id="userService" class="com.example.UserService">
    <constructor-arg type="java.lang.String" value="Spring"/>
    <constructor-arg ref="userDao"/>
</bean>
```

#### 静态工厂方法实例化

```xml
<bean id="connection" 
      class="com.example.ConnectionFactory" 
      factory-method="getConnection"/>
```

```java
public class ConnectionFactory {
    public static Connection getConnection() {
        return DriverManager.getConnection(url, user, password);
    }
}
```

#### 实例工厂方法实例化

```xml
<bean id="factory" class="com.example.ConnectionFactory"/>
<bean id="connection" 
      factory-bean="factory" 
      factory-method="getConnection"/>
```

```java
public class ConnectionFactory {
    public Connection getConnection() {
        return DriverManager.getConnection(url, user, password);
    }
}
```

---

## 五、注解方式配置Bean

### 5.1 开启注解支持

#### XML方式

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:context="http://www.springframework.org/schema/context"
       xsi:schemaLocation="
           http://www.springframework.org/schema/beans
           http://www.springframework.org/schema/beans/spring-beans.xsd
           http://www.springframework.org/schema/context
           http://www.springframework.org/schema/context/spring-context.xsd">
    
    <!-- 开启注解扫描 -->
    <context:component-scan base-package="com.example"/>
    
    <!-- 开启注解驱动 -->
    <context:annotation-config/>
</beans>
```

#### Java配置类方式（推荐）

```java
@Configuration
@ComponentScan(basePackages = "com.example")
public class AppConfig {
    // Bean定义方法
    @Bean
    public UserDao userDao() {
        return new UserDaoImpl();
    }
}
```

### 5.2 常用注解

| 注解 | 说明 | 使用位置 |
|------|------|---------|
| `@Component` | 通用组件 | 类级别 |
| `@Service` | 业务逻辑层 | 类级别 |
| `@Repository` | 数据访问层 | 类级别 |
| `@Controller` | 控制层 | 类级别 |
| `@RestController` | RESTful控制器 | 类级别 |
| `@Configuration` | 配置类 | 类级别 |
| `@ComponentScan` | 组件扫描 | 类级别 |
| `@Bean` | 方法级Bean定义 | 方法级别 |
| `@Autowired` | 自动装配 | 字段/构造器/Setter |
| `@Qualifier` | 指定Bean名称 | 配合@Autowired使用 |
| `@Resource` | JSR-250标准注入 | 字段/Setter |
| `@Value` | 注入配置值 | 字段/参数 |
| `@Scope` | 指定作用域 | 类/方法级别 |
| `@Lazy` | 懒加载 | 类/方法级别 |
| `@Primary` | 优先注入 | 类/方法级别 |

### 5.3 注解注入示例

```java
// 1. 定义Bean
@Service
public class UserService {
    
    private final UserDao userDao;
    
    // 构造器注入（Spring 4.3+推荐方式）
    @Autowired
    public UserService(UserDao userDao) {
        this.userDao = userDao;
    }
    
    // Setter注入
    // @Autowired
    // public void setUserDao(UserDao userDao) {
    //     this.userDao = userDao;
    // }
    
    // 字段注入（不推荐）
    // @Autowired
    // private UserDao userDao;
    
    // 使用注入的依赖
    public void save(User user) {
        userDao.insert(user);
    }
}

// 2. 配置类
@Configuration
@ComponentScan(basePackages = "com.example")
public class AppConfig {
    
    @Bean
    public UserDao userDao() {
        return new UserDaoImpl();
    }
    
    @Bean
    @Value("${database.url}")
    public DataSource dataSource(String url) {
        // ...
    }
}
```

---

## 六、Spring容器启动流程（原理深入）

### 6.1 启动流程总览

```
ApplicationContext创建
    │
    ├── 1. 准备阶段
    │   ├── 创建BeanFactory实例
    │   ├── 设置配置路径
    │   └── 准备环境变量
    │
    ├── 2. 配置加载
    │   ├── 读取XML/注解配置
    │   ├── 解析BeanDefinition
    │   └── 注册BeanDefinition
    │
    ├── 3. 预处理阶段
    │   ├── 执行BeanFactoryPostProcessor
    │   │   ├── PropertySourcesPlaceholderConfigurer
    │   │   └── ConfigurationClassPostProcessor
    │   └── 执行BeanDefinitionRegistryPostProcessor
    │
    ├── 4. Bean实例化
    │   ├── 执行InstantiationAwareBeanPostProcessor
    │   ├── 实例化Bean（反射/工厂方法）
    │   ├── 属性填充（依赖注入）
    │   └── 初始化Bean
    │
    └── 5. 完成阶段
        ├── 发布ContextRefreshedEvent事件
        └── 容器就绪
```

### 6.2 核心接口体系

```
BeanFactory (接口)
    │
    ├── HierarchicalBeanFactory (层次化Bean工厂)
    │
    └── ListableBeanFactory (可枚举Bean工厂)
            │
            └── ApplicationContext (应用上下文)
                    │
                    ├── ConfigurableApplicationContext
                    │       │
                    │       └── AbstractApplicationContext
                    │               │
                    │               └── GenericApplicationContext
                    │                       │
                    │                       └── AnnotationConfigApplicationContext
                    │
                    └── WebApplicationContext
                            │
                            └── AbstractRefreshableWebApplicationContext
```

### 6.3 BeanDefinition的数据结构

```java
public abstract class AbstractBeanDefinition {
    // Bean的类名
    private String beanClassName;
    
    // Bean的作用域
    private String scope = SCOPE_SINGLETON;
    
    // 构造器参数
    private ConstructorArgumentValues constructorArgumentValues;
    
    // 属性值
    private MutablePropertyValues propertyValues;
    
    // 是否懒加载
    private boolean lazyInit = false;
    
    // 初始化方法
    private String initMethodName;
    
    // 销毁方法
    private String destroyMethodName;
    
    // 是否抽象
    private boolean abstractFlag = false;
}
```

---

## 七、最佳实践与总结

### 7.1 依赖注入选择建议

1. **推荐使用构造器注入**
   - 依赖不可变，保证线程安全
   - 所有依赖在创建时就完整
   - 便于单元测试

2. **Setter注入用于可选依赖**
   - 依赖可以为空
   - 便于重新配置

3. **避免字段注入**
   - 隐藏依赖关系
   - 不利于测试
   - 与Spring框架耦合

### 7.2 常见问题

#### Q: @Autowired和@Resource的区别？

| 特性 | @Autowired | @Resource |
|------|-----------|-----------|
| 来源 | Spring | JSR-250标准 |
| 注入方式 | 默认识别byType，可用@Qualifier指定byName | 先byName，找不到再byType |
| 必需性 | required=true/false | required=true/false |

#### Q: Bean的默认名称是什么？

- 注解方式：**类名首字母小写**（如UserService → userService）
- XML方式：id属性的值

#### Q: 如何解决循环依赖？

**三级缓存机制**（Spring 4.3+）：

```
singletonFactories（一级缓存）：存储已创建但未初始化的Bean
    ↓
earlySingletonObjects（二级缓存）：存储已完成构造的Bean
    ↓
singletonObjects（三级缓存）：存储完整初始化的Bean
```

---

## 八、小结

Spring IoC容器是整个框架的核心：

1. **控制反转**：将对象创建和依赖管理交给容器
2. **依赖注入**：通过构造器、Setter等方式注入依赖
3. **配置方式**：支持XML配置、注解配置、Java配置类
4. **核心接口**：BeanFactory是基础，ApplicationContext是高级实现

掌握IoC的原理，是理解Spring所有其他功能（AOP、事务、MVC等）的基础。
