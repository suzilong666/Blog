# SpringMVC入门与请求处理流程

## 一、SpringMVC概述

### 1.1 什么是SpringMVC

SpringMVC是Spring框架提供的**Web MVC框架**，用于构建基于MVC（Model-View-Controller）架构的Web应用程序。

#### MVC模式

```
┌─────────────────────────────────────────────────────────────┐
│                         MVC模式                             │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌─────────────┐     ┌─────────────┐     ┌─────────────┐   │
│  │  Model（模型）│◄────┤Controller  │────►│  View（视图）│   │
│  │             │     │  （控制器） │     │             │   │
│  │ 业务数据    │     │ 处理请求   │     │ 展示数据    │   │
│  │ 业务逻辑    │     │ 调用Model  │     │ 用户交互    │   │
│  └─────────────┘     └─────────────┘     └─────────────┘   │
│         ▲                   │                   ▲           │
│         │                   ▼                   │           │
│         │            ┌─────────────┐            │           │
│         └────────────┤   用户请求   ├────────────┘           │
│                      └─────────────┘                        │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### 1.2 SpringMVC核心组件

| 组件 | 说明 | 作用 |
|------|------|------|
| `DispatcherServlet` | 前端控制器 | 接收所有请求，分发处理 |
| `HandlerMapping` | 处理器映射 | 根据URL找到对应的Handler |
| `HandlerAdapter` | 处理器适配器 | 执行Handler并返回ModelAndView |
| `Handler` | 处理器 | 实际的业务处理逻辑（Controller方法） |
| `ViewResolver` | 视图解析器 | 将逻辑视图名解析为实际视图 |
| `View` | 视图 | 渲染Model数据为响应 |
| `Interceptor` | 拦截器 | 在请求处理前后执行拦截逻辑 |
| `ExceptionResolver` | 异常处理器 | 处理请求过程中抛出的异常 |

### 1.3 SpringMVC vs 其他框架对比

| 特性 | SpringMVC | Struts2 | JAX-RS (Jersey) |
|------|-----------|---------|-----------------|
| 设计理念 | 基于Servlet | 基于Filter | 基于Servlet |
| 配置方式 | XML/注解/JavaConfig | XML/注解 | 注解 |
| 依赖注入 | 完整Spring支持 | 有限支持 | 有限支持 |
| 前后端分离 | 优秀支持 | 有限支持 | 原生支持 |
| 学习曲线 | 中等 | 陡峭 | 平缓 |
| 社区活跃度 | 非常活跃 | 低 | 活跃 |

---

## 二、SpringMVC快速入门

### 2.1 项目依赖

```xml
<dependencies>
    <!-- SpringMVC -->
    <dependency>
        <groupId>org.springframework</groupId>
        <artifactId>spring-webmvc</artifactId>
        <version>6.1.0</version>
    </dependency>
    
    <!-- Servlet API -->
    <dependency>
        <groupId>jakarta.servlet</groupId>
        <artifactId>jakarta.servlet-api</artifactId>
        <version>6.0.0</version>
        <scope>provided</scope>
    </dependency>
    
    <!-- Jackson JSON处理 -->
    <dependency>
        <groupId>com.fasterxml.jackson.core</groupId>
        <artifactId>jackson-databind</artifactId>
        <version>2.16.0</version>
    </dependency>
    
    <!-- JSP支持 -->
    <dependency>
        <groupId>org.apache.tomcat.embed</groupId>
        <artifactId>tomcat-embed-jasper</artifactId>
        <version>10.1.0</version>
    </dependency>
</dependencies>
```

### 2.2 配置DispatcherServlet

#### web.xml方式

```xml
<?xml version="1.0" encoding="UTF-8"?>
<web-app xmlns="https://jakarta.ee/xml/ns/jakartaee"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="https://jakarta.ee/xml/ns/jakartaee
             https://jakarta.ee/xml/ns/jakartaee/web-app_6_0.xsd"
         version="6.0">
    
    <!-- 配置DispatcherServlet -->
    <servlet>
        <servlet-name>springmvc</servlet-name>
        <servlet-class>
            org.springframework.web.servlet.DispatcherServlet
        </servlet-class>
        <init-param>
            <param-name>contextConfigLocation</param-name>
            <param-value>/WEB-INF/springmvc-servlet.xml</param-value>
        </init-param>
        <load-on-startup>1</load-on-startup>
    </servlet>
    
    <servlet-mapping>
        <servlet-name>springmvc</servlet-name>
        <url-pattern>/</url-pattern>
    </servlet-mapping>
    
    <!-- 配置ContextLoaderListener（可选） -->
    <context-param>
        <param-name>contextConfigLocation</param-name>
        <param-value>classpath:applicationContext.xml</param-value>
    </context-param>
    
    <listener>
        <listener-class>
            org.springframework.web.context.ContextLoaderListener
        </listener-class>
    </listener>
</web-app>
```

#### 基于Java配置类（推荐）

```java
// 1. 创建Web应用初始化器
public class WebAppInitializer 
        implements WebApplicationInitializer {
    
    @Override
    public void onStartup(ServletContext servletContext) 
            throws ServletException {
        
        // 创建根容器
        AnnotationConfigWebApplicationContext rootContext = 
            new AnnotationConfigWebApplicationContext();
        rootContext.register(RootConfig.class);
        
        // 注册ContextLoaderListener
        servletContext.addListener(
            new ContextLoaderListener(rootContext));
        
        // 创建Servlet容器
        AnnotationConfigWebApplicationContext servletContext = 
            new AnnotationConfigWebApplicationContext();
        servletContext.register(WebConfig.class);
        
        // 注册DispatcherServlet
        DispatcherServlet dispatcherServlet = 
            new DispatcherServlet(servletContext);
        ServletRegistration.Dynamic registration = 
            servletContext.addServlet("dispatcher", dispatcherServlet);
        registration.setLoadOnStartup(1);
        registration.addMapping("/");
    }
}

// 2. 根配置类（Service层）
@Configuration
@ComponentScan(basePackages = "com.example.service")
public class RootConfig {
    // Service、Repository等配置
}

// 3. Web配置类（Controller层）
@Configuration
@EnableWebMvc
@ComponentScan(basePackages = "com.example.controller")
public class WebConfig implements WebMvcConfigurer {
    
    // 配置视图解析器
    @Override
    public void configureViewResolvers(ViewResolverRegistry registry) {
        InternalResourceViewResolver resolver = 
            new InternalResourceViewResolver();
        resolver.setPrefix("/WEB-INF/views/");
        resolver.setSuffix(".jsp");
        resolver.setViewClass(JstlView.class);
        registry.viewResolver(resolver);
    }
    
    // 配置静态资源
    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/static/**")
                .addResourceLocations("/static/");
    }
}
```

### 2.3 创建Controller

```java
@Controller
public class UserController {
    
    @Autowired
    private UserService userService;
    
    // 返回JSP视图
    @GetMapping("/users")
    public String listUsers(Model model) {
        List<User> users = userService.findAll();
        model.addAttribute("users", users);
        return "user/list";  // 视图名
    }
    
    // 返回JSON数据（RESTful）
    @GetMapping("/api/users/{id}")
    @ResponseBody
    public User getUser(@PathVariable Long id) {
        return userService.findById(id);
    }
    
    // 接收请求参数
    @PostMapping("/users")
    public String createUser(@RequestParam String name, 
                            @RequestParam String email) {
        User user = new User();
        user.setName(name);
        user.setEmail(email);
        userService.save(user);
        return "redirect:/users";
    }
    
    // 接收请求体（JSON）
    @PostMapping("/api/users")
    @ResponseBody
    public User createUser(@RequestBody User user) {
        return userService.save(user);
    }
}
```

### 2.4 创建视图

```jsp
<!-- /WEB-INF/views/user/list.jsp -->
<%@ page language="java" contentType="text/html; charset=UTF-8" 
         pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>用户列表</title>
</head>
<body>
    <h1>用户列表</h1>
    <table>
        <thead>
            <tr>
                <th>ID</th>
                <th>姓名</th>
                <th>邮箱</th>
            </tr>
        </thead>
        <tbody>
            <c:forEach items="${users}" var="user">
                <tr>
                    <td>${user.id}</td>
                    <td>${user.name}</td>
                    <td>${user.email}</td>
                </tr>
            </c:forEach>
        </tbody>
    </table>
</body>
</html>
```

---

## 三、请求处理流程

### 3.1 完整请求处理流程

```
┌─────────────────────────────────────────────────────────────┐
│                  SpringMVC请求处理流程                       │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  1. 用户发送HTTP请求                                        │
│     │                                                       │
│     ▼                                                       │
│  2. DispatcherServlet接收请求                               │
│     │                                                       │
│     ▼                                                       │
│  3. 调用HandlerMapping查找Handler                           │
│     │                                                       │
│     ▼                                                       │
│  4. 调用HandlerAdapter执行Handler                           │
│     │   ├── 数据绑定                                        │
│     │   ├── 参数转换                                        │
│     │   └── 调用Controller方法                              │
│     │                                                       │
│     ▼                                                       │
│  5. Controller处理业务逻辑                                  │
│     │                                                       │
│     ▼                                                       │
│  6. 返回ModelAndView或ResponseEntity                       │
│     │                                                       │
│     ▼                                                       │
│  7. DispatcherServlet调用ViewResolver解析视图               │
│     │                                                       │
│     ▼                                                       │
│  8. View渲染数据                                            │
│     │                                                       │
│     ▼                                                       │
│  9. 返回HTTP响应给用户                                      │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### 3.2 DispatcherServlet核心流程

```java
public class DispatcherServlet extends FrameworkServlet {
    
    @Override
    protected void doDispatch(HttpServletRequest request, 
            HttpServletResponse response) throws Exception {
        
        // 1. 获取处理链
        HandlerExecutionChain mappedHandler = 
            getHandler(request);
        
        // 2. 获取Handler适配器
        HandlerAdapter ha = 
            getHandlerAdapter(mappedHandler.getHandler());
        
        // 3. 执行拦截器前置方法
        if (!mappedHandler.applyPreHandle(request, response)) {
            return;
        }
        
        // 4. 执行Handler（Controller方法）
        ModelAndView mv = ha.handle(
            request, response, mappedHandler.getHandler());
        
        // 5. 设置FlashMap
        applyDefaultViewName(request, mv);
        mappedHandler.applyPostHandle(request, response, mv);
        
        // 6. 分发结果（渲染视图）
        processDispatchResult(request, response, 
            mappedHandler, mv, dispatchException);
    }
    
    private HandlerExecutionChain getHandler(
            HttpServletRequest request) throws Exception {
        
        // 遍历所有HandlerMapping查找匹配的Handler
        for (HandlerMapping hm : this.handlerMappings) {
            HandlerExecutionChain handler = hm.getHandler(request);
            if (handler != null) {
                return handler;
            }
        }
        return null;
    }
    
    private void processDispatchResult(
            HttpServletRequest request,
            HttpServletResponse response,
            HandlerExecutionChain mappedHandler,
            ModelAndView mv,
            Exception exception) throws Exception {
        
        // 处理异常
        if (exception != null) {
            // 查找异常处理器
            mv = processHandlerException(
                request, response, mappedHandler.getHandler(), exception);
        }
        
        if (mv != null && !mv.wasCleared()) {
            // 渲染视图
            render(mv, request, response);
        }
        
        // 执行拦截器后置方法
        mappedHandler.applyAfterCompletion(
            request, response, mappedHandler.getHandler(), exception);
    }
}
```

### 3.3 HandlerMapping映射机制

```java
public class RequestMappingHandlerMapping 
        extends AbstractHandlerMapping {
    
    @Override
    protected HandlerExecutionChain getHandler(
            HttpServletRequest request) throws Exception {
        
        // 1. 获取最佳匹配的Handler方法
        Map<RequestMappingInfo, HandlerMethod> handlerMethods = 
            getHandlerMethods();
        
        // 2. 查找匹配的RequestMappingInfo
        RequestMappingInfo bestMatch = 
            getMatchingMapping(request, handlerMethods.keySet());
        
        // 3. 获取对应的HandlerMethod
        HandlerMethod handlerMethod = handlerMethods.get(bestMatch);
        
        // 4. 创建处理链
        return getHandlerExecutionChain(handlerMethod, request);
    }
}
```

### 3.4 HandlerAdapter执行机制

```java
public class RequestMappingHandlerAdapter 
        extends AbstractHandlerMethodAdapter {
    
    @Override
    protected ModelAndView handleInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            HandlerMethod handlerMethod) throws Exception {
        
        // 1. 创建Web请求对象
        WebRequest webRequest = new ServletWebRequest(request, response);
        
        // 2. 准备命令对象（用于数据绑定）
        Object command = null;
        if (handlerMethod.getMethod().getParameterCount() > 0) {
            // 创建命令对象实例
            command = handlerMethod.getBeanType()
                .getDeclaredConstructor().newInstance();
        }
        
        // 3. 执行参数绑定
        ModelAndView mav = new ModelAndView();
        
        // 获取参数值
        Object[] args = getMethodArgumentValues(
            request, response, handlerMethod, webRequest, mav);
        
        // 4. 调用Controller方法
        Object returnValue = handlerMethod.getMethod()
            .invoke(handlerMethod.getBean(), args);
        
        // 5. 处理返回值
        return getModelAndView(
            returnValue, handlerMethod, mav, webRequest);
    }
}
```

---

## 四、常用注解

### 4.1 映射注解

| 注解 | 说明 | 示例 |
|------|------|------|
| `@Controller` | 标记控制器类 | `@Controller` |
| `@RestController` | RESTful控制器（@Controller+@ResponseBody） | `@RestController` |
| `@RequestMapping` | 通用请求映射 | `@RequestMapping("/api/users")` |
| `@GetMapping` | GET请求映射 | `@GetMapping("/{id}")` |
| `@PostMapping` | POST请求映射 | `@PostMapping` |
| `@PutMapping` | PUT请求映射 | `@PutMapping("/{id}")` |
| `@DeleteMapping` | DELETE请求映射 | `@DeleteMapping("/{id}")` |
| `@PatchMapping` | PATCH请求映射 | `@PatchMapping("/{id}")` |

### 4.2 参数注解

| 注解 | 说明 | 来源 | 示例 |
|------|------|------|------|
| `@RequestParam` | 请求参数 | query/form | `@RequestParam("name")` |
| `@PathVariable` | 路径参数 | URL路径 | `@PathVariable("id")` |
| `@RequestBody` | 请求体 | JSON/XML | `@RequestBody User user` |
| `@RequestHeader` | 请求头 | HTTP Header | `@RequestHeader("Authorization")` |
| `@CookieValue` | Cookie值 | Cookie | `@CookieValue("sessionId")` |
| `@SessionAttribute` | Session属性 | HttpSession | `@SessionAttribute("user")` |
| `@ModelAttribute` | 模型属性 | 多种来源 | `@ModelAttribute("form")` |
| `@Valid` | 触发校验 | Bean Validation | `@Valid User user` |

### 4.3 响应注解

| 注解 | 说明 | 示例 |
|------|------|------|
| `@ResponseBody` | 将返回值序列化为响应体 | `@ResponseBody` |
| `@ResponseStatus` | 设置响应状态码 | `@ResponseStatus(HttpStatus.CREATED)` |
| `@Produces` | 设置响应媒体类型 | `@Produces("application/json")` |
| `@Consumes` | 设置请求媒体类型 | `@Consumes("application/json")` |

### 4.4 综合使用示例

```java
@RestController
@RequestMapping("/api/users")
public class UserController {
    
    @Autowired
    private UserService userService;
    
    // GET /api/users
    @GetMapping
    public List<User> listUsers(
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "10") int size) {
        Page<User> users = userService.findAll(page, size);
        return users.getContent();
    }
    
    // GET /api/users/{id}
    @GetMapping("/{id}")
    public User getUser(@PathVariable Long id) {
        return userService.findById(id);
    }
    
    // POST /api/users
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public User createUser(@Valid @RequestBody UserCreateDTO dto) {
        return userService.create(dto);
    }
    
    // PUT /api/users/{id}
    @PutMapping("/{id}")
    public User updateUser(@PathVariable Long id, 
                          @RequestBody UserUpdateDTO dto) {
        return userService.update(id, dto);
    }
    
    // PATCH /api/users/{id}
    @PatchMapping("/{id}")
    public User partialUpdateUser(@PathVariable Long id, 
                                 @RequestBody Map<String, Object> updates) {
        return userService.partialUpdate(id, updates);
    }
    
    // DELETE /api/users/{id}
    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteUser(@PathVariable Long id) {
        userService.delete(id);
    }
    
    // GET /api/users/search
    @GetMapping("/search")
    public List<User> searchUsers(
            @RequestParam String keyword,
            @RequestHeader("Authorization") String token) {
        return userService.search(keyword);
    }
}
```

---

## 五、前后端数据交互

### 5.1 接收不同类型参数

#### 查询参数

```java
@GetMapping("/users")
public PageResult<User> getUsers(
        @RequestParam(required = false) String keyword,
        @RequestParam(defaultValue = "1") Integer page,
        @RequestParam(defaultValue = "10") Integer size,
        @RequestParam(required = false) List<String> tags) {
    // keyword: ?keyword=xxx
    // page, size: 分页参数
    // tags: ?tags=tag1&tags=tag2
    return userService.search(keyword, page, size, tags);
}
```

#### 路径参数

```java
@GetMapping("/users/{userId}/orders/{orderId}")
public Order getUserOrder(
        @PathVariable("userId") Long userId,
        @PathVariable("orderId") Long orderId) {
    return orderService.findByUserAndOrder(userId, orderId);
}
```

#### 请求体（JSON）

```java
@PostMapping("/users")
public User createUser(@RequestBody UserCreateRequest request) {
    // 请求体：{"name": "张三", "email": "zhangsan@example.com"}
    return userService.create(request);
}

// 支持多种格式
@PostMapping(value = "/upload", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
public UploadResult uploadFile(
        @RequestPart("file") MultipartFile file,
        @RequestParam("description") String description) {
    return fileService.upload(file, description);
}
```

#### 表单参数

```java
@PostMapping("/users/form")
public String createUserByForm(
        @ModelAttribute UserCreateForm form) {
    // 表单字段自动绑定到form对象
    userService.saveForm(form);
    return "redirect:/users";
}

// 支持文件上传
@PostMapping("/users/avatar")
public String uploadAvatar(
        @RequestParam("userId") Long userId,
        @RequestParam("avatar") MultipartFile avatar) {
    userService.updateAvatar(userId, avatar);
    return "redirect:/users/" + userId;
}
```

### 5.2 返回不同类型数据

#### 返回JSON（RESTful API）

```java
@RestController
@RequestMapping("/api/products")
public class ProductController {
    
    // 返回单个对象
    @GetMapping("/{id}")
    public Product getProduct(@PathVariable Long id) {
        return productService.findById(id);
    }
    
    // 返回列表
    @GetMapping
    public List<Product> listProducts() {
        return productService.findAll();
    }
    
    // 返回分页结果
    @GetMapping("/page")
    public PageResponse<Product> pageProducts(
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "10") int size) {
        Page<Product> products = productService.findAll(
            PageRequest.of(page - 1, size));
        return PageResponse.of(products);
    }
    
    // 返回统一响应结构
    @PostMapping
    public ApiResponse<Product> createProduct(
            @RequestBody ProductCreateDTO dto) {
        Product product = productService.create(dto);
        return ApiResponse.success(product);
    }
}

// 统一响应结构
@Data
public class ApiResponse<T> {
    private Integer code;
    private String message;
    private T data;
    private Long timestamp;
    
    public static <T> ApiResponse<T> success(T data) {
        ApiResponse<T> response = new ApiResponse<>();
        response.setCode(200);
        response.setMessage("success");
        response.setData(data);
        response.setTimestamp(System.currentTimeMillis());
        return response;
    }
    
    public static <T> ApiResponse<T> error(
            Integer code, String message) {
        ApiResponse<T> response = new ApiResponse<>();
        response.setCode(code);
        response.setMessage(message);
        response.setTimestamp(System.currentTimeMillis());
        return response;
    }
}
```

#### 返回视图（服务端渲染）

```java
@Controller
@RequestMapping("/pages")
public class PageController {
    
    // 返回JSP视图
    @GetMapping("/home")
    public String home(Model model) {
        model.addAttribute("title", "首页");
        model.addAttribute("content", "欢迎访问！");
        return "home";  // /WEB-INF/views/home.jsp
    }
    
    // 返回Thymeleaf模板
    @GetMapping("/users/{id}")
    public String userDetail(@PathVariable Long id, Model model) {
        User user = userService.findById(id);
        model.addAttribute("user", user);
        return "user/detail";  // templates/user/detail.html
    }
    
    // 返回重定向
    @GetMapping("/old-url")
    public String redirect() {
        return "redirect:/new-url";
    }
    
    // 返回转发
    @GetMapping("/forward")
    public String forward() {
        return "forward:/api/data";
    }
}
```

#### 返回文件下载

```java
@GetMapping("/download")
public ResponseEntity<Resource> downloadFile(
        @RequestParam String filename) {
    
    Path filePath = Path.of("/uploads/" + filename);
    Resource resource = new UrlResource(filePath.toUri());
    
    if (!resource.exists()) {
        throw new RuntimeException("文件不存在");
    }
    
    return ResponseEntity.ok()
            .header(HttpHeaders.CONTENT_DISPOSITION, 
                "attachment; filename=\"" + filename + "\"")
            .contentType(MediaType.APPLICATION_OCTET_STREAM)
            .body(resource);
}

// 返回Excel文件
@GetMapping("/export/excel")
public void exportExcel(HttpServletResponse response) 
        throws IOException {
    
    response.setContentType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
    response.setHeader("Content-Disposition", 
        "attachment; filename=users.xlsx");
    
    List<User> users = userService.findAll();
    
    try (Workbook workbook = new XSSFWorkbook()) {
        Sheet sheet = workbook.createSheet("Users");
        
        // 创建表头
        Row headerRow = sheet.createRow(0);
        headerRow.createCell(0).setCellValue("ID");
        headerRow.createCell(1).setCellValue("姓名");
        headerRow.createCell(2).setCellValue("邮箱");
        
        // 填充数据
        for (int i = 0; i < users.size(); i++) {
            User user = users.get(i);
            Row row = sheet.createRow(i + 1);
            row.createCell(0).setCellValue(user.getId());
            row.createCell(1).setCellValue(user.getName());
            row.createCell(2).setCellValue(user.getEmail());
        }
        
        workbook.write(response.getOutputStream());
    }
}
```

---

## 六、路径匹配规则

### 6.1 路径匹配示例

```java
@RestController
@RequestMapping("/api")
public class ApiController {
    
    // 精确匹配
    @GetMapping("/users")
    public String exactMatch() {
        // 匹配: GET /api/users
        return "exact";
    }
    
    // 路径变量
    @GetMapping("/users/{id}")
    public String pathVariable(@PathVariable Long id) {
        // 匹配: GET /api/users/1, /api/users/2
        return "path: " + id;
    }
    
    // 正则表达式
    @GetMapping("/users/{id:\\d+}")
    public String regexPathVariable(@PathVariable Long id) {
        // 只匹配数字ID
        return "regex: " + id;
    }
    
    // 矩阵变量
    @GetMapping("/users/{id}")
    public String matrixVariable(
            @PathVariable Long id,
            @MatrixVariable(defaultValue = "1") int page) {
        // 匹配: GET /api/users/1;page=2
        return "matrix: id=" + id + ", page=" + page;
    }
    
    // 通配符
    @GetMapping("/files/**")
    public String wildcard() {
        // 匹配: GET /api/files/any/path
        return "wildcard";
    }
    
    // 后缀模式
    @GetMapping("/users/{id}")
    public String suffixPattern(
            @PathVariable Long id,
            @RequestHeader("Accept") String accept) {
        // 根据Accept头返回不同格式
        return "suffix: " + id;
    }
}
```

### 6.2 路径匹配优先级

1. **精确路径**：`/api/users` 优先于 `/api/users/{id}`
2. **更长路径**：`/api/users/{id}/orders` 优先于 `/api/users/{id}`
3. **路径变量**：`/api/users/{id}` 优先于 `/api/users/**`
4. **通配符**：`/api/**` 优先级最低

---

## 七、小结

SpringMVC是构建Java Web应用的核心框架：

1. **核心组件**：DispatcherServlet、HandlerMapping、HandlerAdapter、ViewResolver
2. **请求流程**：请求 → DispatcherServlet → HandlerMapping → HandlerAdapter → Controller → ViewResolver → 响应
3. **注解体系**：@Controller、@RequestMapping、@RequestParam、@PathVariable、@RequestBody等
4. **数据交互**：支持JSON、表单、路径参数、文件上传等多种方式
5. **RESTful支持**：@RestController让API开发更简洁

掌握SpringMVC的请求处理流程和核心组件，能够帮助我们：
- 正确设计API接口
- 高效处理各种请求参数
- 构建规范的前后端分离应用
