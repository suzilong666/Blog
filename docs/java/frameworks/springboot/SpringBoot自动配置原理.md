# SpringBoot自动配置原理

## 一、自动配置概述

### 1.1 什么是自动配置

**自动配置（Auto Configuration）** 是SpringBoot的核心特性，它能够根据**类路径中的依赖**、**配置文件**、**环境变量**等因素，**自动装配**Spring应用的Bean。

#### 手动配置 vs 自动配置

```java
// ❌ 传统方式：手动配置DataSource
@Configuration
public class DataSourceConfig {
    
    @Bean
    public DataSource dataSource() {
        HikariDataSource dataSource = new HikariDataSource();
        dataSource.setDriverClassName("com.mysql.cj.jdbc.Driver");
        dataSource.setJdbcUrl("jdbc:mysql://localhost:3306/example");
        dataSource.setUsername("root");
        dataSource.setPassword("password");
        // ... 更多配置
        return dataSource;
    }
}

// ✅ SpringBoot方式：自动配置
// 只需添加依赖和配置文件
// pom.xml: spring-boot-starter-data-jpa
// application.yml:
//   spring.datasource.url: jdbc:mysql://localhost:3306/example
//   spring.datasource.username: root
//   spring.datasource.password: password
```

### 1.2 自动配置的核心价值

1. **简化开发**：减少样板代码，让开发者专注业务逻辑
2. **最佳实践**：内置经过验证的默认配置
3. **灵活可扩展**：可以通过配置文件覆盖默认值
4. **按需加载**：只有在需要时才配置相关Bean

---

## 二、自动配置流程

### 2.1 启动流程

```
SpringApplication.run()
    │
    ▼
创建ApplicationContext
    │
    ▼
调用refreshContext()
    │
    ▼
执行BeanFactoryPostProcessor
    │
    ▼
执行ConfigurationClassPostProcessor
    │
    ├── 1. 扫描@Configuration类
    ├── 2. 解析@Bean方法
    └── 3. 处理@Import注解
        │
        ▼
加载自动配置类
    │
    ├── 1. 读取spring.factories / AutoConfiguration.imports
    ├── 2. 过滤@Conditional条件
    └── 3. 注册符合条件的Bean
```

### 2.2 @EnableAutoConfiguration注解

```java
// @EnableAutoConfiguration 注解定义
@Target(ElementType.TYPE)
@Retention(RetentionPolicy.RUNTIME)
@Documented
@Inherited
@AutoConfigurationPackage
@Import(AutoConfigurationImportSelector.class)  // 关键：导入自动配置选择器
public @interface EnableAutoConfiguration {
    
    // 排除指定的自动配置类
    Class<?>[] exclude() default {};
    
    // 排除指定名称的自动配置类
    String[] excludeName() default {};
}
```

### 2.3 AutoConfigurationImportSelector

```java
public class AutoConfigurationImportSelector 
        implements DeferredImportSelector {
    
    @Override
    public String[] selectImports(AnnotationMetadata annotationMetadata) {
        // 1. 获取自动配置类的全限定名
        List<String> configurations = getCandidateConfigurations(
            annotationMetadata, attributes);
        
        // 2. 过滤重复配置
        configurations = removeDuplicates(configurations);
        
        // 3. 获取排除的配置
        Set<String> exclusions = getExclusions(
            annotationMetadata, attributes);
        
        // 4. 过滤需要排除的配置
        configurations.removeAll(exclusions);
        
        // 5. 过滤掉没有条件的配置
        configurations = filter(configurations, autoConfigurationMetadata);
        
        return configurations.toArray(new String[0]);
    }
    
    protected List<String> getCandidateConfigurations(
            AnnotationMetadata metadata, AnnotationAttributes attributes) {
        // 从META-INF/spring.factories加载
        List<String> configurations = SpringFactoriesLoader.loadFactoryNames(
            getSpringFactoriesLoaderFactoryClass(), 
            getBeanClassLoader());
        
        Assert.notEmpty(configurations, 
            "No auto configuration classes found in META-INF/spring.factories");
        
        return configurations;
    }
    
    protected Class<?> getSpringFactoriesLoaderFactoryClass() {
        return EnableAutoConfiguration.class;
    }
}
```

### 2.4 spring.factories文件

```properties
# 在META-INF/spring.factories中配置
# Spring Boot 2.x 格式：
org.springframework.boot.autoconfigure.EnableAutoConfiguration=\
  org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration,\
  org.springframework.boot.autoconfigure.jdbc.DataSourceTransactionManagerAutoConfiguration,\
  org.springframework.boot.autoconfigure.jdbc.JdbcTemplateAutoConfiguration,\
  org.springframework.boot.autoconfigure.data.redis.RedisAutoConfiguration,\
  org.springframework.boot.autoconfigure.web.servlet.WebMvcAutoConfiguration

# Spring Boot 3.x 新格式（推荐）：
# META-INF/spring/org.springframework.boot.autoconfigure.AutoConfiguration.imports
org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration
org.springframework.boot.autoconfigure.jdbc.DataSourceTransactionManagerAutoConfiguration
org.springframework.boot.autoconfigure.jdbc.JdbcTemplateAutoConfiguration
org.springframework.boot.autoconfigure.data.redis.RedisAutoConfiguration
org.springframework.boot.autoconfigure.web.servlet.WebMvcAutoConfiguration
```

### 2.5 @Conditional条件装配

SpringBoot通过`@Conditional`系列注解实现条件装配：

| 注解 | 说明 | 示例 |
|------|------|------|
| `@ConditionalOnBean` | 容器中存在指定Bean | `@ConditionalOnBean(DataSource.class)` |
| `@ConditionalOnMissingBean` | 容器中不存在指定Bean | `@ConditionalOnMissingBean(RedisTemplate.class)` |
| `@ConditionalOnClass` | 类路径中存在指定类 | `@ConditionalOnClass(RedisTemplate.class)` |
| `@ConditionalOnMissingClass` | 类路径中不存在指定类 | `@ConditionalOnMissingClass("org.junit.Test")` |
| `@ConditionalOnProperty` | 配置文件满足条件 | `@ConditionalOnProperty(name="cache.enabled", havingValue="true")` |
| `@ConditionalOnResource` | 存在指定资源文件 | `@ConditionalOnResource(resources="classpath:config.yml")` |
| `@ConditionalOnWebApplication` | 是Web应用 | `@ConditionalOnWebApplication(type = Type.SERVLET)` |
| `@ConditionalOnExpression` | SpEL表达式为true | `@ConditionalOnExpression("#{systemProperties['java.version'] > 1.8}")` |

---

## 三、常用自动配置详解

### 3.1 DataSource自动配置

```java
// DataSourceAutoConfiguration 简化版
@Configuration(proxyBeanMethods = false)
@ConditionalOnClass({ DataSource.class, EmbeddedDatabaseType.class })
@EnableConfigurationProperties(DataSourceProperties.class)
@Import({ DataSourcePoolMetadataProvidersConfiguration.class,
          DataSourceInitializationConfiguration.class })
public class DataSourceAutoConfiguration {
    
    // HikariCP连接池配置
    @Configuration(proxyBeanMethods = false)
    @ConditionalOnClass(HikariDataSource.class)
    @ConditionalOnMissingBean(DataSource.class)
    static class HikariConfiguration {
        
        @Bean
        @ConfigurationProperties(prefix = "spring.datasource.hikari")
        public HikariDataSource hikariDataSource(DataSourceProperties properties) {
            HikariDataSource dataSource = new HikariDataSource();
            // 从properties读取配置并设置
            return dataSource;
        }
    }
    
    // Tomcat JDBC连接池配置
    @Configuration(proxyBeanMethods = false)
    @ConditionalOnClass(TomcatDataSource.class)
    @ConditionalOnMissingBean(DataSource.class)
    static class TomcatConfiguration {
        // ...
    }
    
    // Commons DBCP2配置
    @Configuration(proxyBeanMethods = false)
    @ConditionalOnClass(BasicDataSource.class)
    @ConditionalOnMissingBean(DataSource.class)
    static class Dbcp2Configuration {
        // ...
    }
}
```

### 3.2 Web MVC自动配置

```java
// WebMvcAutoConfiguration 简化版
@Configuration(proxyBeanMethods = false)
@ConditionalOnWebApplication(type = Type.SERVLET)
@ConditionalOnClass({ Servlet.class, DispatcherServlet.class, WebMvcConfigurer.class })
@ConditionalOnMissingBean(WebMvcConfigurationSupport.class)
@AutoConfigureOrder(Ordered.HIGHEST_PRECEDENCE)
public class WebMvcAutoConfiguration {
    
    // 基础配置
    @Configuration(proxyBeanMethods = false)
    @ConditionalOnDefaultWebSecurity
    static class WebMvcConfiguration {
        
        @Bean
        public HiddenHttpMethodFilter hiddenHttpMethodFilter() {
            return new HiddenHttpMethodFilter();
        }
        
        @Bean
        public FormContentFilter formContentFilter() {
            return new FormContentFilter();
        }
        
        @Bean
        public RequestContextFilter requestContextFilter() {
            return new RequestContextFilter();
        }
        
        @Bean
        public WebMvcConfigurer webMvcConfigurer() {
            // 提供默认的MVC配置
            return new WebMvcConfigurer() {
                @Override
                public void configureMessageConverters(List<HttpMessageConverter<?>> converters) {
                    // 添加默认的消息转换器
                }
                
                @Override
                public void configureViewResolvers(ViewResolverRegistry registry) {
                    // 添加默认的视图解析器
                }
            };
        }
    }
    
    // 视图解析器配置
    @Configuration(proxyBeanMethods = false)
    @ConditionalOnClass(InternalResourceView.class)
    static class InternalResourceViewResolverConfiguration {
        
        @Bean
        @ConditionalOnMissingBean(InternalResourceViewResolver.class)
        public InternalResourceViewResolver defaultViewResolver() {
            InternalResourceViewResolver resolver = new InternalResourceViewResolver();
            resolver.setPrefix("/WEB-INF/");
            resolver.setSuffix(".jsp");
            return resolver;
        }
    }
    
    // Jackson JSON配置
    @Configuration(proxyBeanMethods = false)
    @ConditionalOnClass(ObjectMapper.class)
    static class Jackson2ObjectMapperBuilderConfiguration {
        
        @Bean
        @ConditionalOnMissingBean
        public Jackson2ObjectMapperBuilderCustomizer jsonCustomizer() {
            return jacksonObjectMapperBuilder -> {
                jacksonObjectMapperBuilder.serializationInclusion(JsonInclude.Include.NON_NULL);
                jacksonObjectMapperBuilder.dateFormat(new SimpleDateFormat("yyyy-MM-dd HH:mm:ss"));
            };
        }
    }
}
```

### 3.3 Redis自动配置

```java
// RedisAutoConfiguration 简化版
@Configuration(proxyBeanMethods = false)
@ConditionalOnClass(RedisOperations.class)
@EnableConfigurationProperties(RedisProperties.class)
@Import({ LettuceConnectionConfiguration.class, JedisConnectionConfiguration.class })
public class RedisAutoConfiguration {
    
    @Bean
    @ConditionalOnMissingBean(name = "redisTemplate")
    public RedisTemplate<Object, Object> redisTemplate(
            RedisConnectionFactory redisConnectionFactory) {
        RedisTemplate<Object, Object> template = new RedisTemplate<>();
        template.setConnectionFactory(redisConnectionFactory);
        return template;
    }
    
    @Bean
    @ConditionalOnMissingBean
    public StringRedisTemplate stringRedisTemplate(
            RedisConnectionFactory redisConnectionFactory) {
        StringRedisTemplate template = new StringRedisTemplate();
        template.setConnectionFactory(redisConnectionFactory);
        return template;
    }
}
```

### 3.4 Jackson自动配置

```java
// JacksonAutoConfiguration 简化版
@Configuration(proxyBeanMethods = false)
@ConditionalOnClass(ObjectMapper.class)
@AutoConfigureBefore(WebMvcAutoConfiguration.class)
@EnableConfigurationProperties(JacksonProperties.class)
public class JacksonAutoConfiguration {
    
    @Bean
    @ConditionalOnMissingBean
    public ObjectMapper objectMapper(Jackson2ObjectMapperBuilder builder) {
        return builder.createXmlMapper(false).build();
    }
    
    @Bean
    @ConditionalOnMissingBean
    public JsonMapper jsonMapper(Jackson2ObjectMapperBuilder builder) {
        return builder.build();
    }
    
    @Bean
    @ConditionalOnMissingBean
    public Jackson2ObjectMapperBuilderCustomizer jsonCustomizer() {
        return builder -> {
            builder.serializationInclusion(JsonInclude.Include.NON_NULL);
            builder.deserializationFeature(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
        };
    }
}
```

---

## 四、自定义自动配置

### 4.1 创建自定义Starter

#### 项目结构

```
my-spring-boot-starter/
├── src/
│   ├── main/
│   │   ├── java/
│   │   │   └── com/example/mystarter/
│   │   │       ├── MyService.java
│   │   │       ├── MyProperties.java
│   │   │       └── MyAutoConfiguration.java
│   │   └── resources/
│   │       ├── META-INF/
│   │       │   └── spring/
│   │       │       └── org.springframework.boot.autoconfigure.AutoConfiguration.imports
│   │       └── my-defaults.properties
│   └── test/
└── pom.xml
```

#### 编写自动配置类

```java
@Configuration(proxyBeanMethods = false)
@ConditionalOnClass(MyService.class)  // 类路径中有MyService才生效
@EnableConfigurationProperties(MyProperties.class)  // 启用配置属性
public class MyAutoConfiguration {
    
    @Bean
    @ConditionalOnMissingBean  // 容器中没有MyService时才创建
    public MyService myService(MyProperties properties) {
        return new MyService(properties.getName(), properties.getVersion());
    }
    
    @Bean
    @ConditionalOnProperty(name = "my.service.enabled", havingValue = "true")
    @ConditionalOnMissingBean
    public MyServiceEnhanced myServiceEnhanced(MyService myService) {
        return new MyServiceEnhanced(myService);
    }
    
    @ConfigurationProperties(prefix = "my.service")
    @Data
    public static class MyProperties {
        private String name = "default-service";
        private String version = "1.0.0";
        private boolean enabled = true;
        private List<String> features = new ArrayList<>();
    }
}
```

#### 注册自动配置

```
# resources/META-INF/spring/org.springframework.boot.autoconfigure.AutoConfiguration.imports
com.example.mystarter.MyAutoConfiguration
```

#### 创建默认配置

```properties
# resources/my-defaults.properties
my.service.name=MyService
my.service.version=1.0.0
my.service.enabled=true
```

### 4.2 使用自定义Starter

```xml
<!-- pom.xml -->
<dependency>
    <groupId>com.example</groupId>
    <artifactId>my-spring-boot-starter</artifactId>
    <version>1.0.0</version>
</dependency>
```

```java
// 直接使用，无需额外配置
@RestController
public class MyController {
    
    @Autowired
    private MyService myService;  // 自动注入
    
    @GetMapping("/api/service")
    public String getServiceInfo() {
        return myService.getInfo();
    }
}
```

```yaml
# application.yml 覆盖默认配置
my:
  service:
    name: MyCustomService
    version: 2.0.0
    enabled: false
    features:
      - logging
      - caching
```

---

## 五、自动配置排查

### 5.1 查看自动配置报告

```bash
# 启动时显示自动配置报告
# 在application.properties中添加：
debug=true

# 或者在启动时添加参数
java -jar app.jar --debug

# 输出会显示：
# Positive matches: 匹配成功的自动配置
# Negative matches: 匹配失败的自动配置（及原因）
# Conditional on classes: 类路径条件
# Conditional on properties: 属性条件
```

### 5.2 Actuator查看

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-actuator</artifactId>
</dependency>
```

```bash
# 访问Actuator端点
# GET /actuator/beans - 查看所有Bean
# GET /actuator/conditions - 查看条件装配结果
# GET /actuator/configprops - 查看配置属性
# GET /actuator/env - 查看环境变量
```

### 5.3 常见问题排查

| 问题 | 排查方法 |
|------|---------|
| Bean未创建 | 检查@Conditional条件是否满足 |
| 配置未生效 | 检查配置文件格式和位置 |
| 依赖未加载 | 检查pom.xml依赖配置 |
| 自动配置冲突 | 使用exclude排除冲突配置 |
| 启动失败 | 查看启动日志和debug信息 |

---

## 六、小结

SpringBoot自动配置是其核心设计理念：

1. **核心机制**：`@EnableAutoConfiguration` + `AutoConfigurationImportSelector`
2. **条件装配**：`@ConditionalOn*`系列注解实现按需加载
3. **配置来源**：`spring.factories` / `AutoConfiguration.imports`
4. **可扩展性**：支持通过`@EnableConfigurationProperties`注入配置
5. **排查工具**：debug模式 + Actuator端点

理解自动配置原理，能够帮助我们：
- 正确使用SpringBoot的自动配置
- 开发自定义Starter
- 快速排查配置问题
- 深入理解SpringBoot的设计思想
