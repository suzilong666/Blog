# AOP面向切面编程

## 一、AOP概述

### 1.1 什么是AOP

**AOP（Aspect-Oriented Programming）** 面向切面编程，是一种通过将**横切关注点**（cross-cutting concerns）与**业务逻辑**分离，提高程序模块化程度的编程范式。

#### 横切关注点

横切关注点是指在多个模块中重复出现的功能，例如：
- 日志记录
- 权限认证
- 事务管理
- 性能监控
- 异常处理
- 缓存管理

### 1.2 OOP vs AOP

#### 传统OOP方式的问题

```java
// 传统方式：日志代码与业务代码耦合
public class UserService {
    
    public void createUser(User user) {
        log.info("开始创建用户：" + user.getName());  // 日志
        security.checkPermission("user:create");     // 权限
        try {
            userDao.insert(user);                      // 业务逻辑
            log.info("用户创建成功");                  // 日志
        } catch (Exception e) {
            log.error("用户创建失败：" + e.getMessage()); // 日志
            throw e;
        }
    }
}
// 问题：业务代码被日志、权限等非业务代码淹没
```

#### AOP方式的优势

```java
// AOP方式：关注点分离
@Service
public class UserService {
    
    public void createUser(User user) {
        userDao.insert(user);  // 只有业务逻辑
    }
}

// 日志切面
@Aspect
public class LoggingAspect {
    
    @Before("execution(* com.example.UserService.*(..))")
    public void logBefore(JoinPoint joinPoint) {
        log.info("方法调用：" + joinPoint.getSignature().getName());
    }
    
    @AfterReturning(pointcut = "...", returning = "result")
    public void logAfterReturning(Object result) {
        log.info("方法返回：" + result);
    }
    
    @AfterThrowing(pointcut = "...", throwing = "exception")
    public void logAfterThrowing(Exception exception) {
        log.error("方法异常：" + exception.getMessage());
    }
}
```

---

## 二、AOP核心概念

### 2.1 AOP术语

| 术语 | 英文 | 说明 | 示例 |
|------|------|------|------|
| 切面 | Aspect | 横切关注点的模块化 | 日志切面、事务切面 |
| 通知 | Advice | 切面在特定切点执行的动作 | 前置通知、后置通知 |
| 切点 | Pointcut | 切面要切入的位置 | UserService的所有方法 |
| 连接点 | JoinPoint | 程序执行中的某个点 | 方法调用、异常抛出 |
| 引入 | Introduction | 为类添加新的方法 | 为Service添加监控接口 |
| 织入 | Weaving | 将切面应用到目标对象的过程 | 编译期织入、运行期织入 |
| 代理 | Proxy | 包含切面逻辑的对象 | CGLIB代理、JDK动态代理 |
| 目标对象 | Target | 被织入的原始对象 | UserService实例 |

### 2.2 AOP核心概念关系图

```
┌─────────────────────────────────────────────────────────────┐
│                        AOP核心概念关系                        │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌─────────┐                                               │
│  │ 切面    │ 包含                                           │
│  │(Aspect) │◄──────────────────────────────┐                │
│  └────┬────┘                               │                │
│       │                                    │                │
│       ▼                                    ▼                │
│  ┌─────────┐                         ┌─────────┐           │
│  │ 通知    │ 在切点处执行              │ 引入    │           │
│  │(Advice) │─────────────────────────►│(Introduct)│           │
│  └─────────┘                         └─────────┘           │
│       │                                                    │
│       │ 应用于                                               │
│       ▼                                                    │
│  ┌─────────┐                                               │
│  │ 切点    │ 匹配                                           │
│  │(Pointcut)│─────────────────┐                             │
│  └─────────┘                  │                             │
│       │                       │ 匹配                         │
│       │                       ▼                             │
│       │                 ┌─────────┐                         │
│       │                 │ 连接点  │ 执行于                   │
│       │                 │(JoinPoint)│                        │
│       │                 └─────────┘                        │
│       │                       │                             │
│       │                       │ 在目标对象上                 │
│       │                       ▼                             │
│       │                 ┌─────────┐                         │
│       └────────────────►│ 目标对象 │                         │
│                         │(Target) │                         │
│                         └─────────┘                         │
│                                                             │
│  织入(Weaving)：将切面应用到目标对象，生成代理对象            │
│  代理(Proxy)：包装了切面逻辑的对象                          │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## 三、通知类型

### 3.1 五种通知类型

| 通知类型 | 注解 | 说明 | 执行时机 |
|---------|------|------|---------|
| 前置通知 | `@Before` | 在目标方法执行前执行 | 方法调用前 |
| 后置通知 | `@After` | 在目标方法执行后执行 | 方法调用后（无论是否异常） |
| 返回通知 | `@AfterReturning` | 在方法返回结果后执行 | 方法正常返回后 |
| 异常通知 | `@AfterThrowing` | 在方法抛出异常后执行 | 方法抛出异常后 |
| 环绕通知 | `@Around` | 包围目标方法执行 | 方法调用前后 |

### 3.2 通知执行顺序

```
1. @Around通知开始
2. @Before通知
3. 目标方法执行
4. @Around通知结束
   ├── 成功：@AfterReturning → @After
   └── 异常：@AfterThrowing → @After
```

### 3.3 通知详解

#### @Before前置通知

```java
@Aspect
@Component
public class LoggingAspect {
    
    // 匹配com.example.service包下所有类的所有方法
    @Before("execution(* com.example.service.*.*(..))")
    public void logBefore(JoinPoint joinPoint) {
        String methodName = joinPoint.getSignature().getName();
        Object[] args = joinPoint.getArgs();
        log.info("方法调用：" + methodName + "，参数：" + Arrays.toString(args));
    }
}
```

#### @AfterReturning返回通知

```java
@Aspect
@Component
public class LoggingAspect {
    
    // returning属性绑定返回值
    @AfterReturning(
        pointcut = "execution(* com.example.service.*.*(..))",
        returning = "result"
    )
    public void logAfterReturning(Object result) {
        log.info("方法返回：" + result);
    }
}
```

#### @AfterThrowing异常通知

```java
@Aspect
@Component
public class ExceptionAspect {
    
    // throwing属性绑定异常对象
    @AfterThrowing(
        pointcut = "execution(* com.example.service.*.*(..))",
        throwing = "exception"
    )
    public void logAfterThrowing(Exception exception) {
        log.error("方法异常：" + exception.getMessage());
    }
}
```

#### @After后置通知

```java
@Aspect
@Component
public class CleanupAspect {
    
    @After("execution(* com.example.service.*.*(..))")
    public void cleanup(JoinPoint joinPoint) {
        // 无论方法成功或异常都会执行
        log.info("方法结束：" + joinPoint.getSignature().getName());
        // 清理资源
    }
}
```

#### @Around环绕通知（最重要）

```java
@Aspect
@Component
public class PerformanceAspect {
    
    // 环绕通知可以控制目标方法是否执行
    @Around("execution(* com.example.service.*.*(..))")
    public Object measureExecutionTime(ProceedingJoinPoint pjp) 
            throws Throwable {
        
        String methodName = pjp.getSignature().getName();
        long startTime = System.currentTimeMillis();
        
        try {
            // 执行目标方法
            Object result = pjp.proceed();
            long duration = System.currentTimeMillis() - startTime;
            log.info("方法执行：{}，耗时：{}ms", methodName, duration);
            return result;
        } catch (Exception e) {
            long duration = System.currentTimeMillis() - startTime;
            log.error("方法异常：{}，耗时：{}ms", methodName, duration);
            throw e;
        }
    }
}
```

---

## 四、切点表达式

### 4.1 切点表达式语法

```
execution([修饰符] [返回类型] [类全限定名].[方法名]([参数列表]) [异常类型])
```

### 4.2 通配符说明

| 通配符 | 说明 | 示例 |
|--------|------|------|
| `*` | 匹配任意单个字符 | `com.example.*` 匹配一级子包 |
| `..` | 匹配任意数量的字符/包/参数 | `com.example..*` 匹配所有子包 |
| `+` | 匹配类及其子类 | `com.example.Service+` |

### 4.3 常用切点表达式

```java
// 1. 匹配所有public方法
@Before("execution(public * *(..))")

// 2. 匹配指定包下所有类的所有方法
@Before("execution(* com.example.service.*.*(..))")

// 3. 匹配指定类的所有方法
@Before("execution(* com.example.service.UserService.*(..))")

// 4. 匹配指定方法
@Before("execution(* com.example.service.UserService.createUser(..))")

// 5. 匹配带指定参数的方法
@Before("execution(* com.example.service.*.*(String, ..))")

// 6. 匹配返回指定类型的方法
@Before("execution(com.example.Result+ com.example.service.*.*(..))")

// 7. 匹配指定注解的方法
@Before("@annotation(com.example.Log)")

// 8. 匹配指定注解的类下所有方法
@Before("@within(com.example.Service)")

// 9. 组合切点
@Before("execution(* com.example.service.*.*(..)) && @annotation(com.example.Log)")
```

### 4.4 定义可复用切点

```java
@Aspect
@Component
public class ServiceAspect {
    
    // 定义可复用的切点
    @Pointcut("execution(* com.example.service.*.*(..))")
    public void serviceLayer() {}
    
    // 引用切点
    @Before("serviceLayer()")
    public void beforeService() {
        log.info("服务层方法调用");
    }
    
    // 组合切点
    @Before("serviceLayer() && @annotation(com.example.Log)")
    public void beforeLoggedService() {
        log.info("带@Log注解的服务方法调用");
    }
}
```

---

## 五、AOP实现原理

### 5.1 动态代理机制

#### JDK动态代理

```java
// JDK动态代理：基于接口
public class JdkProxy implements InvocationHandler {
    
    private Object target;
    
    public Object createProxy(Object target) {
        this.target = target;
        return Proxy.newProxyInstance(
            target.getClass().getClassLoader(),
            target.getClass().getInterfaces(),
            this
        );
    }
    
    @Override
    public Object invoke(Object proxy, Method method, Object[] args) 
            throws Throwable {
        // 前置逻辑
        System.out.println("方法执行前：" + method.getName());
        
        // 执行目标方法
        Object result = method.invoke(target, args);
        
        // 后置逻辑
        System.out.println("方法执行后：" + method.getName());
        
        return result;
    }
}

// 使用
UserService target = new UserServiceImpl();
UserService proxy = (UserService) new JdkProxy().createProxy(target);
proxy.createUser(user);  // 调用代理对象的方法
```

#### CGLIB代理

```java
// CGLIB代理：基于继承
public class CglibProxy {
    
    public Object createProxy(Object target) {
        Enhancer enhancer = new Enhancer();
        enhancer.setSuperclass(target.getClass());
        enhancer.setCallback(new MethodInterceptor() {
            @Override
            public Object intercept(Object obj, Method method, 
                    Object[] args, MethodProxy proxy) throws Throwable {
                // 前置逻辑
                System.out.println("方法执行前：" + method.getName());
                
                // 执行父类方法
                Object result = proxy.invokeSuper(obj, args);
                
                // 后置逻辑
                System.out.println("方法执行后：" + method.getName());
                
                return result;
            }
        });
        return enhancer.create();
    }
}
```

#### JDK vs CGLIB对比

| 特性 | JDK动态代理 | CGLIB代理 |
|------|-----------|----------|
| 底层机制 | 接口代理 | 类继承 |
| 目标类 | 必须实现接口 | 不需要实现接口 |
| 性能 | 较快 | 较慢（需要生成字节码） |
| 限制 | 代理接口方法 | 不能代理final方法/类 |
| Spring默认 | 有接口用JDK，无接口用CGLIB | 可强制使用CGLIB |

### 5.2 Spring AOP代理选择

```java
// Spring 4.0+默认行为：
// 1. 如果目标类实现了接口，使用JDK动态代理
// 2. 如果目标类没有实现接口，使用CGLIB代理

// 强制使用CGLIB
@EnableAspectJAutoProxy(proxyTargetClass = true)
```

### 5.3 AOP代理创建流程

```
1. 容器启动时
   ├── 扫描@Aspect注解的类
   ├── 解析切点表达式
   └── 注册AspectJPointcutAdvisor

2. 创建Bean时
   ├── 检查Bean是否匹配切点
   ├── 如果匹配：
   │   ├── 创建代理对象（JDK/CGLIB）
   │   └── 将切面逻辑织入代理
   └── 如果不匹配：
       └── 返回原始Bean

3. 调用代理方法时
   ├── 按顺序执行通知
   ├── 调用目标方法
   └── 返回结果
```

### 5.4 代理对象的内部结构

```java
// Spring AOP代理对象结构
public class AopProxy {
    
    private Object target;           // 目标对象
    private AdvisedSupport config;   // 配置信息（包含切面链）
    
    public Object invoke(Method method, Object[] args) {
        // 1. 获取拦截器链
        InterceptorChain chain = getInterceptorChain(method);
        
        // 2. 依次执行拦截器
        //    - MethodBeforeAdviceInterceptor
        //    - AfterReturningAdviceInterceptor
        //    - MethodInterceptor（环绕通知）
        //    - ...
        
        // 3. 最后执行目标方法
        return chain.proceed(target, method, args);
    }
}
```

---

## 六、Spring AOP配置

### 6.1 启用AOP

#### Java配置方式（推荐）

```java
@Configuration
@EnableAspectJAutoProxy(proxyTargetClass = true)
public class AopConfig {
    // 自动扫描@Aspect注解的Bean
}
```

#### XML配置方式

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:aop="http://www.springframework.org/schema/aop"
       xmlns:context="http://www.springframework.org/schema/context"
       xsi:schemaLocation="
           http://www.springframework.org/schema/beans
           http://www.springframework.org/schema/beans/spring-beans.xsd
           http://www.springframework.org/schema/aop
           http://www.springframework.org/schema/aop/spring-aop.xsd
           http://www.springframework.org/schema/context
           http://www.springframework.org/schema/context/spring-context.xsd">
    
    <!-- 开启AOP自动代理 -->
    <aop:aspectj-autoproxy proxy-target-class="true"/>
    
    <!-- 扫描组件 -->
    <context:component-scan base-package="com.example"/>
</beans>
```

### 6.2 完全XML方式配置切面

```xml
<aop:config>
    <!-- 定义切面 -->
    <aop:aspect id="logAspect" ref="loggingAspect">
        
        <!-- 定义切点 -->
        <aop:pointcut id="serviceOperation" 
            expression="execution(* com.example.service.*.*(..))"/>
        
        <!-- 前置通知 -->
        <aop:before 
            pointcut-ref="serviceOperation"
            method="logBefore"/>
        
        <!-- 后置通知 -->
        <aop:after 
            pointcut-ref="serviceOperation"
            method="logAfter"/>
        
        <!-- 返回通知 -->
        <aop:after-returning 
            pointcut-ref="serviceOperation"
            method="logAfterReturning"
            returning="result"/>
        
        <!-- 异常通知 -->
        <aop:after-throwing 
            pointcut-ref="serviceOperation"
            method="logAfterThrowing"
            throwing="exception"/>
        
        <!-- 环绕通知 -->
        <aop:around 
            pointcut-ref="serviceOperation"
            method="logAround"/>
    </aop:aspect>
</aop:config>
```

### 6.3 通知顺序控制

```java
// 使用@Order注解控制多个切面的执行顺序
@Aspect
@Component
@Order(1)  // 数字越小优先级越高
public class LoggingAspect {
    // ...
}

@Aspect
@Component
@Order(2)
public class SecurityAspect {
    // ...
}
```

---

## 七、实战案例

### 7.1 日志切面

```java
@Aspect
@Component
@Slf4j
public class LoggingAspect {
    
    @Pointcut("execution(* com.example.controller.*.*(..))")
    public void controllerLayer() {}
    
    @Pointcut("execution(* com.example.service.*.*(..))")
    public void serviceLayer() {}
    
    @Before("controllerLayer() || serviceLayer()")
    public void logBefore(JoinPoint joinPoint) {
        String className = joinPoint.getTarget().getClass().getSimpleName();
        String methodName = joinPoint.getSignature().getName();
        Object[] args = joinPoint.getArgs();
        
        log.info("[AOP] 调用 {}.{}，参数：{}", 
                className, methodName, Arrays.toString(args));
    }
    
    @AfterReturning(
        pointcut = "controllerLayer() || serviceLayer()",
        returning = "result"
    )
    public void logAfterReturning(JoinPoint joinPoint, Object result) {
        String methodName = joinPoint.getSignature().getName();
        log.info("[AOP] {}.{} 返回：{}", 
                joinPoint.getTarget().getClass().getSimpleName(),
                methodName, result);
    }
    
    @AfterThrowing(
        pointcut = "controllerLayer() || serviceLayer()",
        throwing = "exception"
    )
    public void logAfterThrowing(JoinPoint joinPoint, Exception exception) {
        String methodName = joinPoint.getSignature().getName();
        log.error("[AOP] {}.{} 异常：{}", 
                joinPoint.getTarget().getClass().getSimpleName(),
                methodName, exception.getMessage());
    }
}
```

### 7.2 性能监控切面

```java
@Aspect
@Component
@Slf4j
public class PerformanceAspect {
    
    @Around("@annotation(com.example.PerformanceMonitor)")
    public Object monitorPerformance(ProceedingJoinPoint pjp) 
            throws Throwable {
        
        String methodName = pjp.getSignature().getName();
        String className = pjp.getTarget().getClass().getSimpleName();
        
        long startTime = System.currentTimeMillis();
        int retryCount = 0;
        
        while (true) {
            try {
                Object result = pjp.proceed();
                long duration = System.currentTimeMillis() - startTime;
                log.info("[性能] {}.{} 耗时：{}ms，重试次数：{}", 
                        className, methodName, duration, retryCount);
                return result;
            } catch (Exception e) {
                retryCount++;
                log.warn("[性能] {}.{} 第{}次重试", 
                        className, methodName, retryCount);
                Thread.sleep(100 * retryCount);
            }
        }
    }
}

// 使用注解
@Target(ElementType.METHOD)
@Retention(RetentionPolicy.RUNTIME)
public @interface PerformanceMonitor {
    long maxTime() default 1000;  // 最大允许时间（毫秒）
    int maxRetry() default 3;     // 最大重试次数
}
```

### 7.3 权限校验切面

```java
@Aspect
@Component
public class SecurityAspect {
    
    @Autowired
    private UserService userService;
    
    @Before("@annotation(com.example.RequirePermission)")
    public void checkPermission(JoinPoint joinPoint) {
        // 获取方法上的注解
        MethodSignature signature = 
            (MethodSignature) joinPoint.getSignature();
        Method method = signature.getMethod();
        RequirePermission annotation = 
            method.getAnnotation(RequirePermission.class);
        
        // 检查权限
        String permission = annotation.value();
        Long userId = SecurityContextHolder.getCurrentUserId();
        
        if (!userService.hasPermission(userId, permission)) {
            throw new SecurityException(
                "无权访问，需要权限：" + permission);
        }
    }
}

// 使用注解
@Target(ElementType.METHOD)
@Retention(RetentionPolicy.RUNTIME)
public @interface RequirePermission {
    String value();  // 需要的权限标识
}
```

---

## 八、最佳实践与注意事项

### 8.1 切面设计原则

1. **单一职责**：每个切面只关注一个横切关注点
2. **高内聚低耦合**：切面逻辑独立，不与业务代码耦合
3. **精确切点**：避免切点范围过大影响性能
4. **避免滥用**：AOP不是万能的，过度使用会降低可维护性

### 8.2 常见问题

#### Q: 自调用问题？

```java
@Service
public class UserService {
    
    public void createUser(User user) {
        // 这里调用自身的方法，AOP切面不会生效！
        this.saveUser(user);  // 不会触发AOP
    }
    
    @Transactional
    public void saveUser(User user) {
        // 保存用户
    }
}
```

**解决方案**：
```java
// 方案1：注入自身
@Service
public class UserService {
    
    @Autowired
    private UserService self;  // 注入代理对象
    
    public void createUser(User user) {
        self.saveUser(user);  // 通过代理调用，AOP生效
    }
    
    @Transactional
    public void saveUser(User user) {
        // 保存用户
    }
}

// 方案2：使用AopContext
@Service
public class UserService {
    
    public void createUser(User user) {
        ((UserService) AopContext.currentProxy()).saveUser(user);
    }
}

// 方案3：拆分到不同的Service
```

#### Q: 切面不生效的常见原因？

1. **切面类没有被Spring管理**：缺少`@Component`注解
2. **没有启用AOP**：缺少`@EnableAspectJAutoProxy`
3. **切点表达式不匹配**：检查包路径、类名、方法名
4. **自调用**：通过`this`调用的方法不触发切面
5. **final方法/类**：CGLIB无法代理final方法/类

#### Q: 如何在切面中获取方法参数？

```java
@Before("execution(* com.example.service.*.*(..))")
public void logWithDetails(JoinPoint joinPoint) {
    // 方法名
    String methodName = joinPoint.getSignature().getName();
    
    // 参数值
    Object[] args = joinPoint.getArgs();
    
    // 参数名（需要编译时保留参数名）
    String[] paramNames = 
        ((MethodSignature) joinPoint.getSignature())
            .getParameterNames();
    
    // 构建参数Map
    Map<String, Object> params = new HashMap<>();
    for (int i = 0; i < paramNames.length; i++) {
        params.put(paramNames[i], args[i]);
    }
}
```

---

## 九、小结

Spring AOP是实现关注点分离的核心技术：

1. **核心概念**：切面、通知、切点、连接点、代理
2. **五种通知**：@Before、@After、@AfterReturning、@AfterThrowing、@Around
3. **实现原理**：JDK动态代理 + CGLIB字节码增强
4. **配置方式**：注解方式（推荐）、XML方式
5. **实际应用**：日志、权限、事务、缓存、性能监控

掌握AOP原理，能够帮助我们：
- 优雅地实现横切关注点
- 减少代码重复
- 提高代码可维护性
