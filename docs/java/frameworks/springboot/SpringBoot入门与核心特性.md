# SpringBoot入门与核心特性

## 一、SpringBoot概述

### 1.1 什么是SpringBoot

**SpringBoot** 是由Pivotal团队提供的全新框架，其设计目的是用来**简化新Spring应用的初始搭建以及开发过程**。

#### Spring vs SpringBoot

| 特性 | Spring | SpringBoot |
|------|--------|------------|
| 配置方式 | 大量XML配置 | 约定优于配置 |
| 依赖管理 | 手动配置依赖版本 | Starter自动管理 |
| 服务器 | 外部部署Tomcat | 内嵌Tomcat/Jetty |
| 启动方式 | 打包部署 | java -jar直接运行 |
| 生产就绪 | 需要大量配置 | Actuator开箱即用 |
| 开发效率 | 较低 | 高 |

### 1.2 SpringBoot核心特性

1. **独立运行**：内嵌Servlet容器（Tomcat、Jetty、Undertow），无需部署WAR包
2. **简化配置**：使用`application.properties`或`application.yml`
3. **自动配置**：根据依赖自动配置Spring应用
4. **起步依赖**：提供一系列starter简化依赖管理
5. **生产就绪**：内置监控、健康检查、外部化配置
6. **无代码生成**：不需要生成代码和XML配置

### 1.3 SpringBoot版本演进

| 版本 | 发布年份 | 核心特性 |
|------|---------|---------|
| 1.0.x | 2014 | 初始版本 |
| 1.x | 2015-2016 | 完善核心功能 |
| 2.0.x | 2018 | 响应式编程、WebFlux |
| 2.1.x | 2019 | 性能优化、GraalVM支持 |
| 2.2.x | 2019 | 优雅关闭、响应式负载 |
| 2.3.x | 2020 | 新的日志包结构 |
| 2.4.x | 2020 | 配置树、改进的配置加载 |
| 2.5.x | 2021 | 支持Spring Framework 5.3 |
| 2.6.x | 2021 | 支持Spring Framework 5.4 |
| 2.7.x | 2022 | 支持Spring Framework 5.3.x |
| 3.0.x | 2022 | 支持Spring Framework 6.0、Java 17+ |
| 3.1.x | 2023 | 支持Spring Framework 6.1 |
| 3.2.x | 2023 | 支持Spring Framework 6.2 |

---

## 二、快速开始

### 2.1 创建第一个SpringBoot应用

#### 方式1：使用Spring Initializr

访问 https://start.spring.io/ 生成项目

#### 方式2：手动创建Maven项目

```xml
<!-- pom.xml -->
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 
             https://maven.apache.org/xsd/maven-4.0.0.xsd">
    
    <modelVersion>4.0.0</modelVersion>
    
    <parent>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-parent</artifactId>
        <version>3.2.0</version>
        <relativePath/>
    </parent>
    
    <groupId>com.example</groupId>
    <artifactId>demo</artifactId>
    <version>0.0.1-SNAPSHOT</version>
    <name>demo</name>
    <description>SpringBoot Demo Project</description>
    
    <properties>
        <java.version>17</java.version>
    </properties>
    
    <dependencies>
        <!-- Web开发 -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>
        
        <!-- 测试依赖 -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-test</artifactId>
            <scope>test</scope>
        </dependency>
    </dependencies>
    
    <build>
        <plugins>
            <plugin>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-maven-plugin</artifactId>
            </plugin>
        </plugins>
    </build>
</project>
```

### 2.2 创建主类

```java
package com.example.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

// @SpringBootApplication 是三个注解的组合：
// @SpringBootConfiguration: 标记为配置类
// @EnableAutoConfiguration: 开启自动配置
// @ComponentScan: 扫描当前包及子包下的组件
@SpringBootApplication
public class DemoApplication {
    
    public static void main(String[] args) {
        // 启动SpringBoot应用
        SpringApplication.run(DemoApplication.class, args);
    }
}
```

### 2.3 创建第一个Controller

```java
package com.example.demo.controller;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class HelloController {
    
    @GetMapping("/hello")
    public String hello() {
        return "Hello, SpringBoot!";
    }
    
    @GetMapping("/hello/{name}")
    public String helloName(@PathVariable String name) {
        return "Hello, " + name + "!";
    }
    
    @PostMapping("/greet")
    public String greet(@RequestBody GreetingRequest request) {
        return "Hello, " + request.getName() + "! " + request.getMessage();
    }
}

@Data
class GreetingRequest {
    private String name;
    private String message;
}
```

### 2.4 运行应用

#### 方式1：使用Maven命令

```bash
# 编译并运行
mvn spring-boot:run

# 打包
mvn clean package

# 运行打包后的Jar
java -jar target/demo-0.0.1-SNAPSHOT.jar
```

#### 方式2：使用IDE

直接运行`DemoApplication`的`main`方法

#### 方式3：使用Gradle

```bash
# 使用Gradle
./gradlew bootRun

# 打包
./gradlew build

# 运行
java -jar build/libs/demo-0.0.1-SNAPSHOT.jar
```

### 2.5 访问应用

启动成功后，访问 http://localhost:8080/api/hello 即可看到结果。

---

## 三、核心注解详解

### 3.1 @SpringBootApplication

```java
// @SpringBootApplication = @Configuration + @EnableAutoConfiguration + @ComponentScan
@SpringBootApplication(
    scanBasePackages = "com.example",  // 指定扫描包
    exclude = {DataSourceAutoConfiguration.class}  // 排除自动配置
)
public class DemoApplication {
    public static void main(String[] args) {
        SpringApplication.run(DemoApplication.class, args);
    }
}
```

### 3.2 @Configuration

```java
// 标记类为配置类，用于定义Bean
@Configuration
public class AppConfig {
    
    // 使用@Bean定义Bean
    @Bean
    public RestTemplate restTemplate() {
        return new RestTemplate();
    }
    
    @Bean
    public ObjectMapper objectMapper() {
        ObjectMapper mapper = new ObjectMapper();
        mapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
        mapper.setDateFormat(new SimpleDateFormat("yyyy-MM-dd HH:mm:ss"));
        return mapper;
    }
}
```

### 3.3 @EnableAutoConfiguration

```java
// 开启自动配置（通常由@SpringBootApplication包含）
// 可以单独使用
@EnableAutoConfiguration
public class MyApplication {
    // ...
}

// 排除特定的自动配置
@EnableAutoConfiguration(exclude = {
    DataSourceAutoConfiguration.class,
    RedisAutoConfiguration.class
})
public class MyApplication {
    // ...
}

// 排除多个自动配置
@SpringBootApplication(excludeName = {
    "org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration",
    "org.springframework.boot.autoconfigure.data.redis.RedisAutoConfiguration"
})
public class MyApplication {
    // ...
}
```

### 3.4 @ComponentScan

```java
// 指定扫描包
@Configuration
@ComponentScan(basePackages = "com.example")
public class AppConfig {
    // ...
}

// 指定扫描多个包
@Configuration
@ComponentScan(basePackages = {"com.example.controller", "com.example.service"})
public class AppConfig {
    // ...
}

// 排除特定类型
@Configuration
@ComponentScan(
    basePackages = "com.example",
    excludeFilters = @ComponentScan.Filter(
        type = FilterType.ANNOTATION,
        classes = {RestController.class}
    )
)
public class AppConfig {
    // ...
}
```

### 3.5 @ConfigurationProperties

```java
// 将配置文件属性绑定到Java对象
@Data
@Component
@ConfigurationProperties(prefix = "app")
public class AppProperties {
    
    private String name = "MyApplication";
    private String version = "1.0.0";
    private String description = "A SpringBoot Application";
    private String author = "Developer";
    private List<String> keywords = new ArrayList<>();
    private Map<String, String> extra = new HashMap<>();
    private Security security = new Security();
    
    @Data
    public static class Security {
        private boolean enabled = true;
        private String secretKey = "default-key";
        private List<String> allowedOrigins = new ArrayList<>();
    }
}

// 配置文件 application.yml
app:
  name: MyApplication
  version: 1.0.0
  description: A SpringBoot Application
  author: Developer
  keywords:
    - spring
    - boot
    - java
  extra:
    environment: production
    region: cn
  security:
    enabled: true
    secret-key: my-secret-key-123
    allowed-origins:
      - http://localhost:3000
      - https://example.com
```

### 3.6 条件装配注解

```java
// 条件装配：根据条件决定是否创建Bean
@Configuration
public class ConditionalConfig {
    
    // 只有在存在DataSource时才配置数据源相关Bean
    @Configuration
    @ConditionalOnBean(DataSource.class)
    public static class DataSourceConfig {
        @Bean
        public JdbcTemplate jdbcTemplate(DataSource dataSource) {
            return new JdbcTemplate(dataSource);
        }
    }
    
    // 只有在classpath下存在特定类时才创建
    @Configuration
    @ConditionalOnClass(RedisTemplate.class)
    public static class RedisConfig {
        @Bean
        public RedisTemplate<String, Object> redisTemplate() {
            // 配置Redis
        }
    }
    
    // 只有在配置了特定属性时才创建
    @Configuration
    @ConditionalOnProperty(name = "app.cache.enabled", havingValue = "true")
    public static class CacheConfig {
        @Bean
        public CacheManager cacheManager() {
            // 配置缓存
        }
    }
    
    // 只有在特定资源存在时才创建
    @Configuration
    @ConditionalOnResource(resources = "classpath:config.properties")
    public static class ResourceConfig {
        // ...
    }
    
    // 只有在指定环境下才创建
    @Configuration
    @Profile("dev")
    public static class DevConfig {
        @Bean
        public DataSource devDataSource() {
            // 开发环境数据源
        }
    }
    
    @Configuration
    @Profile("prod")
    public static class ProdConfig {
        @Bean
        public DataSource prodDataSource() {
            // 生产环境数据源
        }
    }
}
```

---

## 四、起步依赖（Starter）

### 4.1 常用Starter列表

| Starter | 说明 | 主要依赖 |
|---------|------|---------|
| `spring-boot-starter-web` | Web应用开发 | Spring MVC, Tomcat, Jackson |
| `spring-boot-starter-data-jpa` | JPA数据访问 | Spring Data JPA, Hibernate |
| `spring-boot-starter-data-mybatis` | MyBatis数据访问 | MyBatis, MyBatis-Spring |
| `spring-boot-starter-data-redis` | Redis缓存 | Spring Data Redis, Lettuce |
| `spring-boot-starter-data-mongodb` | MongoDB | Spring Data MongoDB |
| `spring-boot-starter-security` | 安全认证 | Spring Security |
| `spring-boot-starter-validation` | 参数校验 | Hibernate Validator |
| `spring-boot-starter-aop` | AOP编程 | Spring AOP, AspectJ |
| `spring-boot-starter-mail` | 邮件发送 | Spring Mail, Jakarta Mail |
| `spring-boot-starter-websocket` | WebSocket | Spring WebSocket |
| `spring-boot-starter-thymeleaf` | 模板引擎 | Thymeleaf |
| `spring-boot-starter-freemarker` | 模板引擎 | FreeMarker |
| `spring-boot-starter-test` | 测试支持 | JUnit, Mockito, Spring Test |
| `spring-boot-starter-actuator` | 生产监控 | Spring Boot Actuator |
| `spring-boot-starter-logging` | 日志支持 | SLF4J, Logback |
| `spring-boot-starter-json` | JSON处理 | Jackson, Gson |

### 4.2 使用Starter示例

```xml
<dependencies>
    <!-- Web开发 -->
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-web</artifactId>
    </dependency>
    
    <!-- MyBatis-Plus -->
    <dependency>
        <groupId>com.baomidou</groupId>
        <artifactId>mybatis-plus-spring-boot3-starter</artifactId>
        <version>3.5.5</version>
    </dependency>
    
    <!-- MySQL驱动 -->
    <dependency>
        <groupId>com.mysql</groupId>
        <artifactId>mysql-connector-j</artifactId>
        <scope>runtime</scope>
    </dependency>
    
    <!-- Redis -->
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-data-redis</artifactId>
    </dependency>
    
    <!-- 安全认证 -->
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-security</artifactId>
    </dependency>
    
    <!-- 参数校验 -->
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-validation</artifactId>
    </dependency>
    
    <!-- 生产监控 -->
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-actuator</artifactId>
    </dependency>
</dependencies>
```

### 4.3 自定义Starter

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

#### 创建自动配置类

```java
@Configuration
@ConditionalOnClass(MyService.class)
@EnableConfigurationProperties(MyProperties.class)
public class MyAutoConfiguration {
    
    @Bean
    @ConditionalOnMissingBean
    public MyService myService(MyProperties properties) {
        return new MyService(properties.getName(), properties.getVersion());
    }
}
```

#### 创建属性类

```java
@Data
@ConfigurationProperties(prefix = "my.service")
public class MyProperties {
    private String name = "default-service";
    private String version = "1.0.0";
    private boolean enabled = true;
}
```

#### 注册自动配置

```
# resources/META-INF/spring/org.springframework.boot.autoconfigure.AutoConfiguration.imports
com.example.mystarter.MyAutoConfiguration
```

---

## 五、核心功能示例

### 5.1 RESTful API开发

```java
// 用户管理RESTful API
@RestController
@RequestMapping("/api/users")
public class UserController {
    
    @Autowired
    private UserService userService;
    
    // GET /api/users - 列表查询
    @GetMapping
    public PageResponse<User> listUsers(
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(required = false) String keyword) {
        return userService.listUsers(page, size, keyword);
    }
    
    // GET /api/users/{id} - 详情查询
    @GetMapping("/{id}")
    public User getUser(@PathVariable Long id) {
        return userService.getUser(id);
    }
    
    // POST /api/users - 创建
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public User createUser(@Valid @RequestBody UserCreateRequest request) {
        return userService.createUser(request);
    }
    
    // PUT /api/users/{id} - 更新
    @PutMapping("/{id}")
    public User updateUser(@PathVariable Long id, 
                          @Valid @RequestBody UserUpdateRequest request) {
        return userService.updateUser(id, request);
    }
    
    // DELETE /api/users/{id} - 删除
    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
    }
    
    // PATCH /api/users/{id} - 部分更新
    @PatchMapping("/{id}")
    public User partialUpdate(@PathVariable Long id,
                             @RequestBody Map<String, Object> updates) {
        return userService.partialUpdate(id, updates);
    }
}
```

### 5.2 全局异常处理

```java
@RestControllerAdvice
public class GlobalExceptionHandler {
    
    @ExceptionHandler(ResourceNotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public ErrorResponse handleNotFound(ResourceNotFoundException ex) {
        return ErrorResponse.of(404, ex.getMessage());
    }
    
    @ExceptionHandler(BusinessException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ErrorResponse handleBusiness(BusinessException ex) {
        return ErrorResponse.of(ex.getCode(), ex.getMessage());
    }
    
    @ExceptionHandler(MethodArgumentNotValidException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ErrorResponse handleValidation(MethodArgumentNotValidException ex) {
        Map<String, String> errors = new HashMap<>();
        ex.getBindingResult().getFieldErrors().forEach(error -> 
            errors.put(error.getField(), error.getDefaultMessage()));
        return ErrorResponse.of(400, "参数校验失败", errors);
    }
    
    @ExceptionHandler(Exception.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    public ErrorResponse handleException(Exception ex) {
        return ErrorResponse.of(500, "服务器内部错误");
    }
}

@Data
@Builder
public class ErrorResponse {
    private int code;
    private String message;
    private Map<String, String> errors;
    private LocalDateTime timestamp;
    
    public static ErrorResponse of(int code, String message) {
        return ErrorResponse.builder()
            .code(code)
            .message(message)
            .timestamp(LocalDateTime.now())
            .build();
    }
    
    public static ErrorResponse of(int code, String message, 
                                   Map<String, String> errors) {
        return ErrorResponse.builder()
            .code(code)
            .message(message)
            .errors(errors)
            .timestamp(LocalDateTime.now())
            .build();
    }
}
```

### 5.3 数据访问（MyBatis-Plus）

```java
// 实体类
@Data
@TableName("user")
public class User {
    @TableId(type = IdType.AUTO)
    private Long id;
    private String username;
    private String password;
    private String email;
    private Integer status;
    @TableField(fill = FieldFill.INSERT)
    private LocalDateTime createTime;
    @TableField(fill = FieldFill.INSERT_UPDATE)
    private LocalDateTime updateTime;
}

// Mapper接口
public interface UserMapper extends BaseMapper<User> {
    
    // 自定义查询方法
    List<User> selectByCondition(@Param("query") UserQueryDTO query);
    
    IPage<User> selectPageByCondition(
            Page<User> page, 
            @Param("query") UserQueryDTO query);
}

// Service接口
public interface UserService extends IService<User> {
    PageResponse<User> listUsers(int page, int size, String keyword);
    User getUser(Long id);
    User createUser(UserCreateRequest request);
    User updateUser(Long id, UserUpdateRequest request);
    void deleteUser(Long id);
}

// Service实现
@Service
public class UserServiceImpl extends ServiceImpl<UserMapper, User> 
        implements UserService {
    
    @Override
    public PageResponse<User> listUsers(int page, int size, String keyword) {
        Page<User> pageParam = new Page<>(page, size);
        
        LambdaQueryWrapper<User> wrapper = new LambdaQueryWrapper<>();
        if (keyword != null && !keyword.isEmpty()) {
            wrapper.like(User::getUsername, keyword)
                   .or()
                   .like(User::getEmail, keyword);
        }
        wrapper.orderByDesc(User::getCreateTime);
        
        Page<User> result = page(pageParam, wrapper);
        
        return PageResponse.builder()
            .total(result.getTotal())
            .list(result.getRecords())
            .page(page)
            .size(size)
            .build();
    }
    
    @Override
    public User createUser(UserCreateRequest request) {
        User user = new User();
        BeanUtils.copyProperties(request, user);
        user.setStatus(1);
        save(user);
        return user;
    }
}
```

### 5.4 配置文件

```yaml
# application.yml
server:
  port: 8080
  servlet:
    context-path: /api

spring:
  application:
    name: demo-service
  
  # 数据源配置
  datasource:
    driver-class-name: com.mysql.cj.jdbc.Driver
    url: jdbc:mysql://localhost:3306/example?useSSL=false&serverTimezone=Asia/Shanghai&allowPublicKeyRetrieval=true
    username: root
    password: password
    type: com.zaxxer.hikari.HikariDataSource
    hikari:
      maximum-pool-size: 20
      minimum-idle: 5
      connection-timeout: 30000
      idle-timeout: 600000
  
  # Redis配置
  data:
    redis:
      host: localhost
      port: 6379
      password: 
      database: 0
      timeout: 3000ms
      lettuce:
        pool:
          max-active: 8
          max-idle: 8
          min-idle: 0
  
  # Jackson配置
  jackson:
    date-format: yyyy-MM-dd HH:mm:ss
    time-zone: Asia/Shanghai
    default-property-inclusion: non_null

# MyBatis-Plus配置
mybatis-plus:
  mapper-locations: classpath*:mapper/**/*.xml
  type-aliases-package: com.example.entity
  configuration:
    map-underscore-to-camel-case: true
    log-impl: org.apache.ibatis.logging.slf4j.Slf4jImpl
  global-config:
    db-config:
      id-type: auto
      logic-delete-field: deleted
      logic-delete-value: 1
      logic-not-delete-value: 0

# 日志配置
logging:
  level:
    com.example.demo: DEBUG
    org.springframework.web: INFO
  pattern:
    console: "%d{HH:mm:ss.SSS} [%thread] %-5level %logger{36} - %msg%n"
    file: "%d{yyyy-MM-dd HH:mm:ss} [%thread] %-5level %logger{36} - %msg%n"
  file:
    name: logs/app.log

# Actuator配置
management:
  endpoints:
    web:
      exposure:
        include: health,info,metrics,prometheus
  endpoint:
    health:
      show-details: when_authorized
  metrics:
    tags:
      application: ${spring.application.name}

# 自定义配置
app:
  name: Demo Application
  version: 1.0.0
  description: A demo SpringBoot application
  features:
    - user-management
    - order-management
    - payment-integration
```

---

## 六、小结

SpringBoot通过**约定优于配置**的理念，极大地简化了Spring应用的开发：

1. **核心特性**：独立运行、简化配置、自动配置、起步依赖、生产就绪
2. **核心注解**：@SpringBootApplication、@Configuration、@ConfigurationProperties
3. **Starter机制**：提供丰富的起步依赖，简化依赖管理
4. **自动配置**：根据类路径和配置自动装配Spring应用
5. **开发效率**：显著提升开发效率，降低项目复杂度

掌握SpringBoot核心特性，能够帮助我们：
- 快速构建企业级应用
- 合理使用自动配置和扩展点
- 遵循最佳实践进行项目开发
