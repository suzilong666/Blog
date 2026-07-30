# SpringBoot核心原理

## 一、SpringBoot架构总览

### 1.1 整体架构

```
┌─────────────────────────────────────────────────────────────┐
│                  SpringBoot核心架构                          │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌─────────────────────────────────────────────────────┐    │
│  │              SpringApplication启动器               │    │
│  │  - 环境准备                                          │    │
│  │  - Context创建                                       │    │
│  │  - BeanFactory初始化                                 │    │
│  │  - 自动配置加载                                      │    │
│  └─────────────────────────────────────────────────────┘    │
│                          │                                   │
│                          ▼                                   │
│  ┌─────────────────────────────────────────────────────┐    │
│  │              自动配置引擎                           │    │
│  │  - AutoConfigurationImportSelector                   │    │
│  │  - @Conditional条件装配                              │    │
│  │  - spring.factories加载                             │    │
│  └─────────────────────────────────────────────────────┘    │
│                          │                                   │
│                          ▼                                   │
│  ┌─────────────────────────────────────────────────────┐    │
│  │              嵌入式容器                             │    │
│  │  - Tomcat                                           │    │
│  │  - Jetty                                            │    │
│  │  - Undertow                                         │    │
│  └─────────────────────────────────────────────────────┘    │
│                          │                                   │
│                          ▼                                   │
│  ┌─────────────────────────────────────────────────────┐    │
│  │              Actuator监控                          │    │
│  │  - 健康检查                                          │    │
│  │  - 指标收集                                          │    │
│  │  - 信息端点                                          │    │
│  └─────────────────────────────────────────────────────┘    │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### 1.2 核心模块

| 模块 | 说明 | 关键类 |
|------|------|--------|
| `spring-boot` | 核心功能 | `SpringApplication`, `SpringBootVersion` |
| `spring-boot-autoconfigure` | 自动配置 | `AutoConfigurationImportSelector`, `@Conditional*` |
| `spring-boot-starter-web` | Web支持 | `WebServer`, `ServletWebServerApplicationContext` |
| `spring-boot-starter-actuator` | 监控 | `HealthIndicator`, `MetricsExporter` |
| `spring-boot-devtools` | 开发工具 | `RestartClassLoader`, `LiveReload` |
| `spring-boot-configuration-processor` | 配置元数据 | `AdditionalMetadata` |

---

## 二、启动流程源码解析

### 2.1 SpringApplication.run()

```java
public class SpringApplication {
    
    public static ConfigurableApplicationContext run(
            Class<?> primarySource, String... args) {
        return run(new Class<?>[]{primarySource}, args);
    }
    
    public static ConfigurableApplicationContext run(
            Class<?>[] primarySources, String[] args) {
        return new SpringApplication(primarySources).run(args);
    }
    
    public ConfigurableApplicationContext run(String... args) {
        // 1. 启动计时器
        StopWatch stopWatch = new StopWatch();
        stopWatch.start();
        
        // 2. Headless模式设置
        configureHeadlessSetting();
        
        // 3. 创建应用上下文
        context = createApplicationContext();
        
        // 4. 准备上下文
        prepareContext(context, environment, listeners, applicationArguments, printedBanner);
        
        // 5. 刷新上下文
        refreshContext(context);
        
        // 6. 上下文刷新后处理
        afterRefresh(context, applicationArguments);
        
        // 7. 停止计时器
        stopWatch.stop();
        
        // 8. 打印启动信息
        if (this.logStartupInfo) {
            new StartupInfoLogger(this.mainApplicationClass)
                .logStarted(getApplicationLog(), stopWatch);
        }
        
        // 9. 发布ApplicationStartedEvent
        listeners.started(context);
        
        // 10. 执行Runner
        callRunners(context, applicationArguments);
        
        return context;
    }
}
```

### 2.2 环境准备

```java
public class SpringApplication {
    
    private ConfigurableEnvironment prepareEnvironment(
            SpringApplicationRunListeners listeners,
            ApplicationArguments applicationArguments,
            ConfigurableEnvironment environment) {
        
        // 1. 获取或创建环境
        if (environment == null) {
            environment = getOrCreateEnvironment();
        }
        
        // 2. 配置环境
        configureEnvironment(environment, applicationArguments.getSourceArgs());
        
        // 3. 附加ConfigurationPropertySources
        ConfigurationPropertySources.attach(environment);
        
        // 4. 发布EnvironmentPreparedEvent
        listeners.environmentPrepared(environment);
        
        // 5. 绑定配置
        bindToSpringApplication(environment);
        
        // 6. 转换服务
        if (!this.customizers.isEmpty()) {
            this.customizers.forEach(customizer -> 
                customizer.customize(environment));
        }
        
        return environment;
    }
}
```

### 2.3 创建ApplicationContext

```java
public class SpringApplication {
    
    protected ConfigurableApplicationContext createApplicationContext() {
        return switch (this.webApplicationType) {
            case SERVLET -> 
                new AnnotationConfigServletWebServerApplicationContext();
            case REACTIVE -> 
                new AnnotationConfigReactiveWebServerApplicationContext();
            default -> 
                new AnnotationConfigApplicationContext();
        };
    }
    
    private WebApplicationType deduceWebApplicationType() {
        // 1. 判断是否是Web应用
        if (ClassUtils.isPresent("jakarta.servlet.Servlet", 
                getClassLoader()) &&
            ClassUtils.isPresent("org.springframework.web.context.support" +
                ".AnnotationConfigWebApplicationContext", 
                getClassLoader())) {
            return WebApplicationType.SERVLET;
        }
        
        // 2. 判断是否是Reactive应用
        if (ClassUtils.isPresent("org.springframework.web.reactive" +
                ".DispatcherHandler", 
                getClassLoader()) &&
            ClassUtils.isPresent("org.springframework.web.server.WebSession", 
                getClassLoader())) {
            return WebApplicationType.REACTIVE;
        }
        
        // 3. 普通应用
        return WebApplicationType.NONE;
    }
}
```

### 2.4 自动配置加载

```java
public class SpringApplication {
    
    protected void prepareContext(
            ConfigurableApplicationContext context,
            ConfigurableEnvironment environment,
            SpringApplicationRunListeners listeners,
            ApplicationArguments applicationArguments,
            Banner printedBanner) {
        
        // 1. 设置环境到Context
        context.setEnvironment(environment);
        
        // 2. 应用上下文后置处理器
        postProcessApplicationContext(context);
        
        // 3. 调用ApplicationContextInitializer
        applyInitializers(context);
        
        // 4. 发布ApplicationContextInitializedEvent
        listeners.contextPrepared(context);
        
        // 5. 准备BeanFactory
        if (this.beanNameGenerator != null) {
            context.getBeanFactory().registerSingleton(
                "org.springframework.context.annotation.internalConfigurationBeanNameGenerator",
                this.beanNameGenerator);
        }
        
        // 6. 加载BeanDefinition
        scan(config);
        
        // 7. 注册单例Bean
        // 8. 注册ApplicationRunner
        // 9. 初始化元数据读取器
    }
    
    protected void load(ApplicationContext context, Object source) {
        // 使用BeanDefinitionLoader加载Bean
        BeanDefinitionLoader loader = createBeanDefinitionLoader(
            getBeanDefinitionRegistry(context), source);
        
        // 设置BeanNameGenerator
        if (this.beanNameGenerator != null) {
            loader.setBeanNameGenerator(this.beanNameGenerator);
        }
        
        // 设置Environment
        if (this.environment != null) {
            loader.setEnvironment(this.environment);
        }
        
        // 加载Bean定义
        loader.load();
    }
}
```

---

## 三、自动配置核心源码

### 3.1 AutoConfigurationImportSelector

```java
public class AutoConfigurationImportSelector 
        implements DeferredImportSelector, BeanClassLoaderAware,
        ResourceLoaderAware, EnvironmentAware, Ordered {
    
    private ClassLoader beanClassLoader;
    private ResourceLoader resourceLoader;
    private Environment environment;
    
    @Override
    public String[] selectImports(AnnotationMetadata annotationMetadata) {
        // 1. 检查是否启用自动配置
        if (!isEnabled(annotationMetadata)) {
            return NO_IMPORTS;
        }
        
        // 2. 加载自动配置条目
        AutoConfigurationEntry autoConfigurationEntry = 
            getAutoConfigurationEntry(annotationMetadata);
        
        // 3. 返回配置类名
        return StringUtils.toStringArray(
            autoConfigurationEntry.getConfigurations());
    }
    
    protected AutoConfigurationEntry getAutoConfigurationEntry(
            AnnotationMetadata annotationMetadata) {
        // 1. 获取配置元数据
        if (this.autoConfigurationMetadata == null) {
            this.autoConfigurationMetadata = 
                loadConfigurationMetadata();
        }
        
        // 2. 获取候选配置类
        List<String> configurations = getCandidateConfigurations(
            annotationMetadata, getAttributes(annotationMetadata));
        
        // 3. 获取排除的配置类
        Set<String> exclusions = getExclusions(
            annotationMetadata, getAttributes(annotationMetadata));
        
        // 4. 验证排除项
        checkExcludedClasses(configurations, exclusions);
        
        // 5. 移除排除的配置
        configurations.removeAll(exclusions);
        
        // 6. 过滤掉不满足条件的配置
        configurations = filter(configurations, autoConfigurationMetadata);
        
        // 7. 触发导入事件
        fireAutoConfigurationImportEvents(configurations, exclusions);
        
        return new AutoConfigurationEntry(configurations, exclusions);
    }
    
    protected List<String> getCandidateConfigurations(
            AnnotationMetadata metadata, AnnotationAttributes attributes) {
        // 从spring.factories加载
        List<String> configurations = SpringFactoriesLoader.loadFactoryNames(
            getSpringFactoriesLoaderFactoryClass(), getBeanClassLoader());
        
        Assert.notEmpty(configurations, 
            "No auto configuration classes found in META-INF/spring.factories");
        
        return configurations;
    }
    
    protected List<String> filter(List<String> configurations,
            List<String> exclusions) {
        // 根据@Conditional条件过滤
        return configurations.stream()
            .filter(configuration -> !exclusions.contains(configuration))
            .collect(Collectors.toList());
    }
}
```

### 3.2 ConditionEvaluator条件评估

```java
public class ConditionEvaluator {
    
    private final ConditionContext context;
    
    public boolean matches(
            Class<? extends Annotation> conditionType,
            AnnotatedTypeMetadata metadata) {
        
        // 获取所有条件
        List<Condition> conditions = getConditions(conditionType, metadata);
        
        for (Condition condition : conditions) {
            // 评估每个条件
            ConditionOutcome outcome = getConditionOutcome(condition, metadata);
            
            if (outcome.getMatch() == ConditionOutcome.MatchStatus.NO_MATCH) {
                return false;  // 有一个条件不满足就返回false
            }
        }
        
        return true;  // 所有条件都满足
    }
    
    private ConditionOutcome getConditionOutcome(
            Condition condition, AnnotatedTypeMetadata metadata) {
        
        // 根据条件类型评估
        if (condition instanceof SpringBootCondition) {
            return ((SpringBootCondition) condition).getMatchOutcome(
                context, metadata);
        }
        
        // 通用条件评估
        return new ConditionOutcome.MatchOutcomeBuilder(
            condition.matches(context, metadata))
            .message("")
            .build();
    }
}
```

### 3.3 常用Conditional实现

```java
// @ConditionalOnClass实现
public class OnClassCondition extends SpringBootCondition {
    
    @Override
    public ConditionOutcome getMatchOutcome(
            ConditionContext context, AnnotatedTypeMetadata metadata) {
        
        // 获取注解属性
        MultiValueAnnotation<ConditionalOnClass> annotation = 
            metadata.getAnnotationAttributes(ConditionalOnClass.class);
        
        // 检查类是否存在于类路径
        ClassLoader classLoader = context.getClassLoader();
        for (String className : annotation.getStringArray("value")) {
            if (!ClassUtils.isPresent(className, classLoader)) {
                // 类不存在，条件不满足
                return ConditionOutcome.noMatch(
                    "Required class " + className + " not found");
            }
        }
        
        // 所有类都存在，条件满足
        return ConditionOutcome.match("All required classes found");
    }
}

// @ConditionalOnProperty实现
public class OnPropertyCondition extends SpringBootCondition {
    
    @Override
    public ConditionOutcome getMatchOutcome(
            ConditionContext context, AnnotatedTypeMetadata metadata) {
        
        // 获取注解属性
        AnnotationAttributes annotation = metadata.getAnnotationAttributes(
            ConditionalOnProperty.class);
        
        String name = annotation.getString("name");
        String havingValue = annotation.getString("havingValue");
        boolean matchIfMissing = annotation.getBoolean("matchIfMissing");
        
        // 获取配置值
        RelaxedPropertyResolver resolver = new RelaxedPropertyResolver(
            context.getEnvironment());
        String value = resolver.getProperty(name);
        
        if (value == null) {
            // 配置不存在
            if (matchIfMissing) {
                return ConditionOutcome.match(
                    "Property " + name + " not found (matchIfMissing=true)");
            }
            return ConditionOutcome.noMatch(
                "Property " + name + " not found");
        }
        
        if (havingValue != null && !havingValue.equalsIgnoreCase(value)) {
            // 值不匹配
            return ConditionOutcome.noMatch(
                "Property " + name + " has value " + value + 
                " (expected " + havingValue + ")");
        }
        
        return ConditionOutcome.match(
            "Property " + name + " matches (value=" + value + ")");
    }
}
```

---

## 四、嵌入式容器原理

### 4.1 WebServer初始化

```java
public class ServletWebServerApplicationContext 
        extends GenericWebApplicationContext {
    
    private WebServer webServer;
    private volatile boolean webServerInitialized;
    
    @Override
    protected void onRefresh() {
        super.onRefresh();
        try {
            // 创建WebServer
            createWebServer();
        } catch (Throwable ex) {
            // 处理异常
        }
    }
    
    private void createWebServer() {
        WebServer webServer = this.webServer;
        ServletContext servletContext = getServletContext();
        
        if (webServer == null && servletContext == null) {
            // 通过ServletWebServerFactory创建WebServer
            ServletWebServerFactory factory = getWebServerFactory();
            this.webServer = factory.getWebServer(getSelfInitializer());
        } else if (servletContext != null) {
            // 使用已有的ServletContext
        }
    }
    
    private ServletWebServerFactory getWebServerFactory() {
        // 从BeanFactory获取ServletWebServerFactory
        String[] beanNames = getBeanFactory()
            .getBeanNamesForType(ServletWebServerFactory.class);
        
        if (beanNames.length == 0) {
            throw new NoSuchBeanDefinitionException(
                "ServletWebServerFactory not configured");
        }
        
        if (beanNames.length > 1) {
            throw new NoUniqueBeanDefinitionException(
                ServletWebServerFactory.class, beanNames.length);
        }
        
        return getBeanFactory().getBean(
            beanNames[0], ServletWebServerFactory.class);
    }
}
```

### 4.2 TomcatWebServer实现

```java
public class TomcatWebServer implements WebServer {
    
    private final Tomcat tomcat;
    private final boolean autoStart;
    
    @Override
    public void start() throws WebServerException {
        synchronized (this) {
            if (this.started) {
                return;
            }
            
            try {
                // 初始化Tomcat
                initializeTomcat();
                
                // 启动Tomcat
                this.tomcat.start();
                
                // 注册关闭钩子
                registerShutdownHook();
                
            } catch (Exception ex) {
                // 异常处理
            }
            
            this.started = true;
        }
    }
    
    private void initializeTomcat() throws WebServerException {
        // 初始化Tomcat组件
        Server server = this.tomcat.getServer();
        
        // 设置端口
        Connector connector = new Connector("org.apache.coyote.http11.Http11NioProtocol");
        connector.setPort(this.port);
        
        // 设置上下文路径
        Context context = new StandardContext();
        context.setPath(this.contextPath);
        
        // 添加Servlet容器
        Host host = new StandardHost();
        host.addChild(context);
        
        Engine engine = new StandardEngine();
        engine.addChild(host);
        
        server.addService(service);
        service.addConnector(connector);
        service.setContainer(engine);
    }
}
```

### 4.3 切换Web容器

```xml
<!-- 切换到Jetty -->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-web</artifactId>
    <exclusions>
        <exclusion>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-tomcat</artifactId>
        </exclusion>
    </exclusions>
</dependency>
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-jetty</artifactId>
</dependency>

<!-- 切换到Undertow -->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-web</artifactId>
    <exclusions>
        <exclusion>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-tomcat</artifactId>
        </exclusion>
    </exclusions>
</dependency>
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-undertow</artifactId>
</dependency>
```

---

## 五、SpringApplication扩展点

### 5.1 自定义SpringApplication

```java
@SpringBootApplication
public class MyApplication {
    
    public static void main(String[] args) {
        SpringApplication application = new SpringApplication(MyApplication.class);
        
        // 自定义配置
        application.setAdditionalProfiles("dev");
        application.setWebApplicationType(WebApplicationType.SERVLET);
        application.setBannerMode(Banner.Mode.CONSOLE);
        application.setLogStartupInfo(true);
        
        // 添加自定义监听器
        application.addListeners(new ApplicationStartingListener());
        application.addListeners(new ApplicationReadyListener());
        
        // 添加自定义Initializer
        application.addInitializers(new MyContextInitializer());
        
        application.run(args);
    }
}
```

### 5.2 自定义Banner

```java
public class CustomBanner implements Banner {
    
    @Override
    public void printBanner(Environment environment, 
            Class<?> sourceClass, PrintStream out) {
        
        out.println();
        out.println("  ____                    _   _     _    ");
        out.println(" / ___| _ __   __ _  ___| | (_)___| | __ ");
        out.println(" \\___ \\| '_ \\ / _` |/ _ \\ | | / __| |/ /");
        out.println("  ___) | |_) | (_| |  __/ |_| \\__ \\   < ");
        out.println(" |____/| .__/ \\__,_|\\___|___|_|___/_|\\_\\");
        out.println("       |_|                              ");
        out.println();
        out.println("  :: My Application ::  (v" + 
            environment.getProperty("app.version") + ")");
        out.println();
    }
}

// 使用自定义Banner
SpringApplication application = new SpringApplication(MyApplication.class);
application.setBanner(new CustomBanner());
application.run(args);
```

### 5.3 ApplicationRunner/CommandLineRunner

```java
// ApplicationRunner：带参数的运行器
@Component
public class MyApplicationRunner implements ApplicationRunner {
    
    @Override
    public void run(ApplicationArguments args) 
            throws Exception {
        List<String> nonOptionArgs = args.getNonOptionArgs();
        Set<String> optionNames = args.getOptionNames();
        
        // 应用启动后执行的逻辑
        log.info("应用启动完成");
        log.info("非选项参数：{}", nonOptionArgs);
        log.info("选项参数：{}", optionNames);
        
        // 执行初始化操作
        initData();
        startBackgroundTasks();
    }
    
    private void initData() {
        // 初始化数据
    }
    
    private void startBackgroundTasks() {
        // 启动后台任务
    }
}

// CommandLineRunner：简单的命令行运行器
@Component
public class MyCommandLineRunner implements CommandLineRunner {
    
    @Override
    public void run(String... args) throws Exception {
        // 应用启动后执行的逻辑
        for (String arg : args) {
            log.info("命令行参数：{}", arg);
        }
    }
}

// 控制执行顺序
@Component
@Order(1)  // 数字越小越先执行
public class FirstRunner implements ApplicationRunner {
    // ...
}

@Component
@Order(2)
public class SecondRunner implements ApplicationRunner {
    // ...
}
```

### 5.4 SpringApplicationRunListener

```java
// 自定义运行监听器
public class MyRunListener implements SpringApplicationRunListener {
    
    @Override
    public void starting(ConfigurableBootstrapContext bootstrapContext) {
        // 应用启动时
        System.out.println("应用启动中...");
    }
    
    @Override
    public void environmentPrepared(ConfigurableBootstrapContext bootstrapContext,
            ConfigurableEnvironment environment) {
        // 环境准备完成
        System.out.println("环境准备完成");
    }
    
    @Override
    public void contextPrepared(ConfigurableApplicationContext context) {
        // 上下文准备完成
        System.out.println("上下文准备完成");
    }
    
    @Override
    public void contextLoaded(ConfigurableApplicationContext context) {
        // 上下文加载完成
        System.out.println("上下文加载完成");
    }
    
    @Override
    public void started(ConfigurableApplicationContext context) {
        // 应用启动完成
        System.out.println("应用启动完成");
    }
    
    @Override
    public void ready(ConfigurableApplicationContext context) {
        // 应用就绪
        System.out.println("应用就绪，可以接受请求");
    }
    
    @Override
    public void failed(ConfigurableApplicationContext context, 
            Throwable exception) {
        // 应用启动失败
        System.err.println("应用启动失败：" + exception.getMessage());
    }
}

// 注册监听器
# META-INF/spring.factories
org.springframework.boot.SpringApplicationRunListener=\
  com.example.MyRunListener
```

---

## 六、Actuator监控

### 6.1 Actuator端点

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-actuator</artifactId>
</dependency>
```

```yaml
# application.yml
management:
  endpoints:
    web:
      exposure:
        include: health,info,metrics,prometheus,beans,conditions
  endpoint:
    health:
      show-details: always
    beans:
      show-details: always
  metrics:
    tags:
      application: ${spring.application.name}
```

### 6.2 常用端点

| 端点 | 说明 |
|------|------|
| `/actuator/health` | 健康检查 |
| `/actuator/info` | 应用信息 |
| `/actuator/metrics` | 指标数据 |
| `/actuator/prometheus` | Prometheus格式指标 |
| `/actuator/beans` | 所有Bean |
| `/actuator/conditions` | 条件装配结果 |
| `/actuator/configprops` | 配置属性 |
| `/actuator/env` | 环境变量 |
| `/actuator/loggers` | 日志配置 |
| `/actuator/mappings` | 请求映射 |
| `/actuator/scheduledtasks` | 定时任务 |
| `/actuator/thread-dump` | 线程转储 |
| `/actuator/heapdump` | 堆转储 |

### 6.3 自定义健康指示器

```java
@Component
public class DatabaseHealthIndicator extends AbstractHealthIndicator {
    
    @Autowired
    private DataSource dataSource;
    
    @Override
    protected void doHealthCheck(Health.Builder builder) 
            throws Exception {
        
        try {
            // 检查数据库连接
            Connection connection = dataSource.getConnection();
            
            // 执行简单查询
            PreparedStatement statement = connection.prepareStatement("SELECT 1");
            statement.execute();
            statement.close();
            connection.close();
            
            builder.up()
                .withDetail("database", "MySQL")
                .withDetail("status", "connected");
                
        } catch (Exception e) {
            builder.down(e)
                .withDetail("database", "MySQL")
                .withDetail("error", e.getMessage());
        }
    }
}
```

### 6.4 自定义Info指示器

```java
@Component
public class AppInfoContributor implements InfoContributor {
    
    @Override
    public void contribute(Info.Builder builder) {
        Map<String, Object> appInfo = new HashMap<>();
        appInfo.put("name", "Demo Application");
        appInfo.put("version", "1.0.0");
        appInfo.put("environment", 
            System.getProperty("spring.profiles.active"));
        
        // 构建信息
        Properties properties = new Properties();
        properties.put("java.version", System.getProperty("java.version"));
        properties.put("spring.version", 
            SpringVersion.getVersion());
        
        builder.withDetail("app", appInfo);
        builder.withDetail("build", properties);
    }
}
```

---

## 七、开发工具DevTools

### 7.1 DevTools功能

Spring Boot DevTools提供以下功能：

- **自动重启**：类路径变化时自动重启应用
- **LiveReload**：静态资源修改自动刷新
- **远程调试**：支持远程应用的调试
- **属性覆盖**：本地开发时覆盖属性

### 7.2 引入依赖

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-devtools</artifactId>
    <scope>runtime</scope>
    <optional>true</optional>
</dependency>
```

### 7.3 配置说明

```yaml
# application.yml
spring:
  devtools:
    restart:
      enabled: true
      # 触发重启的文件
      include: 
        - "**/*.jar"
        - "**/*.class"
      exclude:
        - "**/public/**"
        - "**/static/**"
        - "**/templates/**"
    livereload:
      enabled: true
      port: 35729
    remote:
      secret: ${DEVTOOLS_SECRET}
```

### 7.4 重启机制

```
文件修改
    │
    ▼
Devtools监听文件系统事件
    │
    ▼
判断是否需要重启
    │
    ├── 静态资源（CSS/JS/HTML）
    │   └── LiveReload自动刷新浏览器
    │
    ├── Java类
    │   └── 重新编译 + 自动重启
    │
    └── 配置文件
        └── 重新加载配置 + 自动重启
```

---

## 八、最佳实践与总结

### 8.1 项目结构建议

```
demo-app/
├── src/
│   ├── main/
│   │   ├── java/com/example/demo/
│   │   │   ├── controller/      # 控制层
│   │   │   ├── service/         # 业务层
│   │   │   ├── mapper/          # 数据访问层
│   │   │   ├── entity/          # 实体类
│   │   │   ├── dto/             # 数据传输对象
│   │   │   ├── vo/              # 视图对象
│   │   │   ├── config/          # 配置类
│   │   │   ├── aspect/          # 切面
│   │   │   ├── exception/       # 异常处理
│   │   │   ├── util/            # 工具类
│   │   │   └── DemoApplication.java
│   │   └── resources/
│   │       ├── mapper/          # MyBatis映射文件
│   │       ├── templates/       # 模板文件
│   │       ├── static/         # 静态资源
│   │       ├── application.yml
│   │       ├── application-dev.yml
│   │       ├── application-prod.yml
│   │       └── logback-spring.xml
│   └── test/
└── pom.xml
```

### 8.2 配置管理建议

1. **合理划分Profile**：dev/test/staging/prod
2. **敏感信息加密**：使用Jasypt或环境变量
3. **外部化配置**：生产环境使用配置中心
4. **类型安全绑定**：使用@ConfigurationProperties
5. **属性校验**：使用@ConfigurationPropertiesValidation

### 8.3 性能优化建议

1. **合理使用缓存**：Redis + Spring Cache
2. **异步处理**：使用@Async和CompletableFuture
3. **连接池优化**：HikariCP参数调优
4. **数据库优化**：索引、SQL优化、读写分离
5. **监控告警**：Actuator + Prometheus + Grafana

### 8.4 常见问题

#### Q: SpringBoot和Spring的关系？

SpringBoot是基于Spring框架构建的**快速开发框架**，它通过自动配置和起步依赖简化了Spring应用的搭建和开发过程，但不替代Spring本身。

#### Q: SpringBoot是否支持传统XML配置？

支持。可以通过@ImportResource注解加载XML配置文件：
```java
@ImportResource("classpath:spring-config.xml")
```

#### Q: 如何禁用自动配置？

```java
// 方式1：排除特定自动配置
@SpringBootApplication(exclude = {DataSourceAutoConfiguration.class})
public class MyApplication { ... }

// 方式2：配置文件
spring.autoconfigure.exclude=\
  org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration

// 方式3：排除多个
spring.autoconfigure.exclude[0]=...
spring.autoconfigure.exclude[1]=...
```

---

## 九、小结

SpringBoot通过**自动配置、起步依赖、内嵌容器**三大核心特性，极大地简化了企业级应用的开发：

1. **启动流程**：SpringApplication.run() → 环境准备 → Context创建 → 自动配置 → 容器启动
2. **自动配置**：@EnableAutoConfiguration + AutoConfigurationImportSelector + @Conditional
3. **嵌入式容器**：Tomcat/Jetty/Undertow，无需外部部署
4. **监控体系**：Actuator提供健康检查、指标收集等生产级功能
5. **开发体验**：Devtools实现热重启，提升开发效率

深入理解SpringBoot核心原理，能够帮助我们：
- 正确使用和扩展SpringBoot
- 快速排查配置问题
- 定制开发符合业务需求的框架
- 构建高性能、可维护的企业级应用
