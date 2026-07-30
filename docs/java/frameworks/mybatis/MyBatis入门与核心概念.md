# MyBatis入门与核心概念

## 一、MyBatis概述

### 1.1 什么是MyBatis

**MyBatis** 是一款优秀的**持久层框架**，它支持自定义SQL、存储过程以及高级映射。MyBatis几乎避免了所有的JDBC代码和手动设置参数以及获取结果集的过程。

#### ORM框架对比

| 特性 | MyBatis | Hibernate/JPA |
|------|---------|--------------|
| SQL控制 | 完全控制SQL | 自动生成SQL |
| 学习曲线 | 较平缓 | 较陡峭 |
| 灵活性 | 高 | 中 |
| 性能 | 高 | 中 |
| 适合场景 | 复杂SQL、性能要求高 | 简单CRUD、快速开发 |

### 1.2 MyBatis核心特性

1. **SQL与Java分离**：SQL写在XML或注解中，Java代码只关心逻辑
2. **动态SQL**：支持条件拼接、循环、分支等动态SQL
3. **映射机制**：灵活的结果集映射到Java对象
4. **插件机制**：支持拦截器、分页、性能监控等插件
5. **缓存机制**：一级缓存和二级缓存支持

### 1.3 MyBatis模块结构

```
mybatis
├── mybatis-core         # 核心模块
│   ├── session/         # SqlSession相关
│   ├── executor/        # 执行器
│   ├── mapping/         # 映射相关
│   └── parsing/         # XML解析
├── mybatis-spring       # Spring集成
├── mybatis-spring-boot-starter  # Spring Boot starter
├── mybatis-generator    # 代码生成器
└── mybatis-plus         # 增强工具（非官方，但常用）
```

---

## 二、快速开始

### 2.1 引入依赖

#### Maven依赖

```xml
<dependencies>
    <!-- MyBatis -->
    <dependency>
        <groupId>org.mybatis</groupId>
        <artifactId>mybatis</artifactId>
        <version>3.5.15</version>
    </dependency>
    
    <!-- MySQL驱动 -->
    <dependency>
        <groupId>com.mysql</groupId>
        <artifactId>mysql-connector-j</artifactId>
        <version>8.0.33</version>
    </dependency>
    
    <!-- 连接池（HikariCP推荐） -->
    <dependency>
        <groupId>com.zaxxer</groupId>
        <artifactId>HikariCP</artifactId>
        <version>4.0.3</version>
    </dependency>
    
    <!-- 日志框架（SLF4J） -->
    <dependency>
        <groupId>org.slf4j</groupId>
        <artifactId>slf4j-api</artifactId>
        <version>2.0.9</version>
    </dependency>
    <dependency>
        <groupId>ch.qos.logback</groupId>
        <artifactId>logback-classic</artifactId>
        <version>1.4.14</version>
    </dependency>
</dependencies>
```

### 2.2 核心配置文件

```xml
<!-- mybatis-config.xml -->
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE configuration
    PUBLIC "-//mybatis.org//DTD Config 3.0//EN"
    "http://mybatis.org/dtd/mybatis-3-config.dtd">

<configuration>
    
    <!-- 配置 -->
    <settings>
        <!-- 开启驼峰命名自动映射 -->
        <setting name="mapUnderscoreToCamelCase" value="true"/>
        <!-- 显示SQL日志 -->
        <setting name="logImpl" value="SLF4J"/>
        <!-- 缓存配置 -->
        <setting name="cacheEnabled" value="true"/>
        <!-- 懒加载 -->
        <setting name="lazyLoadingEnabled" value="false"/>
    </settings>
    
    <!-- 别名 -->
    <typeAliases>
        <typeAlias type="com.example.entity.User" alias="User"/>
        <typeAlias type="com.example.dto.UserQueryDTO" alias="UserQuery"/>
    </typeAliases>
    
    <!-- 数据源（使用HikariCP） -->
    <environments default="development">
        <environment id="development">
            <transactionManager type="JDBC"/>
            <dataSource type="com.zaxxer.hikari.HikariDataSource">
                <property name="driverClassName" 
                    value="com.mysql.cj.jdbc.Driver"/>
                <property name="jdbcUrl" 
                    value="jdbc:mysql://localhost:3306/example?useSSL=false&serverTimezone=Asia/Shanghai"/>
                <property name="username" value="root"/>
                <property name="password" value="password"/>
                <property name="maximumPoolSize" value="20"/>
                <property name="minimumIdle" value="5"/>
                <property name="connectionTimeout" value="30000"/>
                <property name="idleTimeout" value="600000"/>
            </dataSource>
        </environment>
    </environments>
    
    <!-- 映射文件 -->
    <mappers>
        <mapper resource="mapper/UserMapper.xml"/>
        <mapper resource="mapper/OrderMapper.xml"/>
    </mappers>
</configuration>
```

### 2.3 创建实体类

```java
// 用户实体
public class User {
    private Long id;
    private String username;
    private String password;
    private String email;
    private Integer status;  // 0-禁用, 1-启用
    private LocalDateTime createTime;
    private LocalDateTime updateTime;
    
    // 构造方法
    public User() {}
    
    public User(String username, String password, String email) {
        this.username = username;
        this.password = password;
        this.email = email;
        this.status = 1;
    }
    
    // getters and setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }
    // ... 其他getter/setter
}
```

### 2.4 创建Mapper接口

```java
// UserMapper接口
public interface UserMapper {
    
    // 根据ID查询用户
    User selectById(Long id);
    
    // 根据用户名查询用户
    User selectByUsername(String username);
    
    // 查询所有用户
    List<User> selectAll();
    
    // 分页查询
    List<User> selectPage(@Param("offset") int offset, 
                         @Param("limit") int limit);
    
    // 插入用户
    int insert(User user);
    
    // 更新用户
    int update(User user);
    
    // 根据ID删除用户
    int deleteById(Long id);
    
    // 批量删除
    int batchDelete(@Param("ids") List<Long> ids);
    
    // 统计总数
    int count();
}
```

### 2.5 创建Mapper XML

```xml
<!-- UserMapper.xml -->
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE mapper
    PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"
    "http://mybatis.org/dtd/mybatis-3-mapper.dtd">

<mapper namespace="com.example.mapper.UserMapper">
    
    <!-- 结果映射 -->
    <resultMap id="UserMap" type="User">
        <id property="id" column="id"/>
        <result property="username" column="username"/>
        <result property="password" column="password"/>
        <result property="email" column="email"/>
        <result property="status" column="status"/>
        <result property="createTime" column="create_time"/>
        <result property="updateTime" column="update_time"/>
    </resultMap>
    
    <!-- 查询语句 -->
    <select id="selectById" resultMap="UserMap">
        SELECT * FROM user WHERE id = #{id}
    </select>
    
    <select id="selectByUsername" resultMap="UserMap">
        SELECT * FROM user WHERE username = #{username}
    </select>
    
    <select id="selectAll" resultMap="UserMap">
        SELECT * FROM user ORDER BY create_time DESC
    </select>
    
    <select id="selectPage" resultMap="UserMap">
        SELECT * FROM user 
        ORDER BY create_time DESC
        LIMIT #{offset}, #{limit}
    </select>
    
    <select id="count" resultType="int">
        SELECT COUNT(*) FROM user
    </select>
    
    <!-- 插入语句 -->
    <insert id="insert" parameterType="User" 
            useGeneratedKeys="true" keyProperty="id">
        INSERT INTO user (username, password, email, status)
        VALUES (#{username}, #{password}, #{email}, #{status})
    </insert>
    
    <!-- 更新语句 -->
    <update id="update" parameterType="User">
        UPDATE user
        SET username = #{username},
            password = #{password},
            email = #{email},
            status = #{status},
            update_time = NOW()
        WHERE id = #{id}
    </update>
    
    <!-- 删除语句 -->
    <delete id="deleteById">
        DELETE FROM user WHERE id = #{id}
    </delete>
    
    <!-- 批量删除 -->
    <delete id="batchDelete">
        DELETE FROM user WHERE id IN
        <foreach collection="ids" item="id" open="(" 
                 separator="," close=")">
            #{id}
        </foreach>
    </delete>
</mapper>
```

### 2.6 编写测试代码

```java
public class MyBatisTest {
    
    private SqlSessionFactory sqlSessionFactory;
    
    @BeforeEach
    void setUp() throws IOException {
        String resource = "mybatis-config.xml";
        InputStream inputStream = 
            Resources.getResourceAsStream(resource);
        sqlSessionFactory = new 
            SqlSessionFactoryBuilder().build(inputStream);
    }
    
    @Test
    void testInsert() {
        try (SqlSession session = sqlSessionFactory.openSession()) {
            UserMapper mapper = session.getMapper(UserMapper.class);
            
            User user = new User("testuser", "password123", 
                "test@example.com");
            int rows = mapper.insert(user);
            
            System.out.println("插入行数：" + rows);
            System.out.println("用户ID：" + user.getId());
            
            session.commit();
        }
    }
    
    @Test
    void testSelectById() {
        try (SqlSession session = sqlSessionFactory.openSession()) {
            UserMapper mapper = session.getMapper(UserMapper.class);
            
            User user = mapper.selectById(1L);
            System.out.println("用户：" + user.getUsername());
        }
    }
    
    @Test
    void testSelectPage() {
        try (SqlSession session = sqlSessionFactory.openSession()) {
            UserMapper mapper = session.getMapper(UserMapper.class);
            
            List<User> users = mapper.selectPage(0, 10);
            System.out.println("用户数量：" + users.size());
        }
    }
    
    @Test
    void testUpdate() {
        try (SqlSession session = sqlSessionFactory.openSession()) {
            UserMapper mapper = session.getMapper(UserMapper.class);
            
            User user = mapper.selectById(1L);
            user.setEmail("newemail@example.com");
            mapper.update(user);
            
            session.commit();
        }
    }
    
    @Test
    void testBatchDelete() {
        try (SqlSession session = sqlSessionFactory.openSession()) {
            UserMapper mapper = session.getMapper(UserMapper.class);
            
            int rows = mapper.batchDelete(
                Arrays.asList(1L, 2L, 3L));
            System.out.println("删除行数：" + rows);
            
            session.commit();
        }
    }
}
```

---

## 三、核心组件详解

### 3.1 SqlSessionFactory

`SqlSessionFactory` 是MyBatis的核心工厂，用于创建`SqlSession`实例。

```java
// 创建SqlSessionFactory
String resource = "mybatis-config.xml";
InputStream inputStream = Resources.getResourceAsStream(resource);

// 使用SqlSessionFactoryBuilder创建
SqlSessionFactory sqlSessionFactory = new SqlSessionFactoryBuilder().build(inputStream);

// 也可以使用Java配置
DataSource dataSource = new HikariDataSource(config);
SqlSessionFactory sqlSessionFactory = new SqlSessionFactoryBuilder()
    .build(new Configuration());
```

### 3.2 SqlSession

`SqlSession` 是与数据库交互的主要对象，类似于JDBC的`Connection`。

```java
// 获取SqlSession
try (SqlSession session = sqlSessionFactory.openSession()) {
    // 方式1：使用Mapper接口
    UserMapper mapper = session.getMapper(UserMapper.class);
    User user = mapper.selectById(1L);
    
    // 方式2：使用字符串映射
    User user = session.selectOne(
        "com.example.mapper.UserMapper.selectById", 1L);
    
    // 方式3：使用参数
    User user = session.selectOne(
        "com.example.mapper.UserMapper.selectById", 
        1L, 
        new BoundSql(session.getConfiguration(), ...));
    
    // 提交事务
    session.commit();
    
    // 回滚事务
    // session.rollback();
}
// try-with-resources会自动关闭session
```

### 3.3 Mapper接口与XML

```
┌─────────────────────────────────────────────────────────────┐
│                  Mapper接口与XML映射关系                      │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  UserMapper.java              UserMapper.xml                │
│  ┌───────────────┐           ┌───────────────┐             │
│  │ interface     │  namespace│  <mapper      │             │
│  │ UserMapper {  │──────────►│  namespace=   │             │
│  │               │           │  "com.example │             │
│  │ User selectById│          │  .mapper.     │             │
│  │  (Long id);   │   id匹配  │  UserMapper"  │             │
│  │               │──────────►│               │             │
│  │ int insert(   │           │  <insert     │             │
│  │  User user);  │           │   id="insert"│             │
│  │               │           │  .../>        │             │
│  │ List<User>    │           │  <select     │             │
│  │  selectAll(); │           │   id=        │             │
│  │               │           │   "selectAll" │             │
│  │ }             │           │  .../>        │             │
│  └───────────────┘           └───────────────┘             │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## 四、参数传递机制

### 4.1 参数传递方式

#### 单个参数

```xml
<!-- 使用#{param}占位符 -->
<select id="selectById" resultType="User">
    SELECT * FROM user WHERE id = #{id}
</select>
```

```java
User user = mapper.selectById(1L);
// MyBatis将1L作为参数传入#{id}
```

#### 多个参数

```java
// 使用@Param注解指定参数名
List<User> selectPage(@Param("offset") int offset, 
                     @Param("limit") int limit);
```

```xml
<select id="selectPage" resultType="User">
    SELECT * FROM user 
    LIMIT #{offset}, #{limit}
</select>
```

#### 对象参数

```java
// 使用DTO作为参数
List<User> selectByCondition(UserQueryDTO query);
```

```xml
<select id="selectByCondition" resultType="User">
    SELECT * FROM user
    WHERE username LIKE CONCAT('%', #{username}, '%')
      AND status = #{status}
      LIMIT #{offset}, #{limit}
</select>
```

#### Map参数

```java
// 使用Map作为参数
List<User> selectByMap(Map<String, Object> params);
```

```xml
<select id="selectByMap" resultType="User">
    SELECT * FROM user
    WHERE username LIKE CONCAT('%', #{username}, '%')
      AND status = #{status}
</select>
```

### 4.2 #{} vs ${}

| 特性 | #{} | ${} |
|------|-----|-----|
| 说明 | 预编译参数（推荐） | 直接拼接字符串 |
| 安全性 | 防止SQL注入 | 存在SQL注入风险 |
| 使用场景 | 数据值 | 表名、列名 |
| 示例 | `WHERE id = #{id}` | `ORDER BY ${column}` |

```xml
<!-- #{}：安全的参数绑定 -->
<select id="selectById" resultType="User">
    SELECT * FROM user WHERE id = #{id}
</select>

<!-- ${}：直接拼接（危险） -->
<select id="selectByColumn" resultType="User">
    SELECT * FROM user ORDER BY ${column}
</select>
```

### 4.3 复杂参数传递

```java
// 枚举参数
enum UserStatus {
    DISABLED(0),
    ENABLED(1);
    
    private final int code;
    UserStatus(int code) { this.code = code; }
    public int getCode() { return code; }
}

// 方法定义
List<User> selectByStatus(UserStatus status);

// XML映射
<select id="selectByStatus" resultType="User">
    SELECT * FROM user WHERE status = #{status}
</select>
```

---

## 五、结果映射

### 5.1 resultType vs resultMap

| 特性 | resultType | resultMap |
|------|-----------|-----------|
| 说明 | 简单映射（自动） | 复杂映射（手动） |
| 使用场景 | 列名与属性名一致 | 列名与属性名不一致 |
| 示例 | `resultType="User"` | `resultMap="UserMap"` |

#### resultType简单映射

```xml
<!-- 列名与属性名一致时使用 -->
<select id="selectById" resultType="User">
    SELECT id, username, email FROM user WHERE id = #{id}
</select>

<!-- 如果开启mapUnderscoreToCamelCase，会自动转换 -->
<!-- id → id, user_name → userName, create_time → createTime -->
```

#### resultMap复杂映射

```xml
<!-- 列名与属性名不一致时使用 -->
<resultMap id="UserMap" type="User">
    <id property="id" column="user_id"/>
    <result property="username" column="user_name"/>
    <result property="email" column="user_email"/>
    <result property="createTime" column="create_time"/>
</resultMap>

<select id="selectById" resultMap="UserMap">
    SELECT user_id, user_name, user_email, create_time 
    FROM user WHERE user_id = #{id}
</select>
```

### 5.2 一对一映射

```java
// 用户与部门一对一
public class User {
    private Long id;
    private String username;
    private Department department;  // 关联的部门
}

public class Department {
    private Long id;
    private String name;
}
```

```xml
<resultMap id="UserWithDeptMap" type="User">
    <id property="id" column="u_id"/>
    <result property="username" column="u_username"/>
    
    <!-- 一对一关联：使用association -->
    <association property="department" javaType="Department">
        <id property="id" column="d_id"/>
        <result property="name" column="d_name"/>
    </association>
</resultMap>

<select id="selectByIdWithDept" resultMap="UserWithDeptMap">
    SELECT u.id AS u_id, 
           u.username AS u_username,
           d.id AS d_id,
           d.name AS d_name
    FROM user u
    LEFT JOIN department d ON u.dept_id = d.id
    WHERE u.id = #{id}
</select>
```

### 5.3 一对多映射

```java
// 一个部门有多个用户
public class Department {
    private Long id;
    private String name;
    private List<User> users;  // 部门下的用户列表
}
```

```xml
<resultMap id="DeptWithUsersMap" type="Department">
    <id property="id" column="d_id"/>
    <result property="name" column="d_name"/>
    
    <!-- 一对多关联：使用collection -->
    <collection property="users" ofType="User">
        <id property="id" column="u_id"/>
        <result property="username" column="u_username"/>
    </collection>
</resultMap>

<select id="selectByIdWithUsers" resultMap="DeptWithUsersMap">
    SELECT d.id AS d_id, 
           d.name AS d_name,
           u.id AS u_id,
           u.username AS u_username
    FROM department d
    LEFT JOIN user u ON d.id = u.dept_id
    WHERE d.id = #{id}
</select>
```

### 5.4 嵌套结果查询

```xml
<!-- 方式：嵌套查询（使用select属性） -->
<resultMap id="UserWithDeptNestedMap" type="User">
    <id property="id" column="id"/>
    <result property="username" column="username"/>
    
    <!-- 使用嵌套查询 -->
    <association property="department" 
                 column="dept_id" 
                 select="selectDeptById"/>
</resultMap>

<select id="selectByIdWithDeptNested" 
        resultMap="UserWithDeptNestedMap">
    SELECT * FROM user WHERE id = #{id}
</select>

<select id="selectDeptById" resultType="Department">
    SELECT * FROM department WHERE id = #{id}
</select>
```

---

## 六、注解方式使用

### 6.1 基础注解

```java
public interface UserMapper {
    
    // 查询
    @Select("SELECT * FROM user WHERE id = #{id}")
    User selectById(Long id);
    
    @Select("SELECT * FROM user WHERE username = #{username}")
    User selectByUsername(String username);
    
    @Select("SELECT * FROM user ORDER BY create_time DESC")
    List<User> selectAll();
    
    @Select("SELECT * FROM user LIMIT #{offset}, #{limit}")
    List<User> selectPage(@Param("offset") int offset, 
                         @Param("limit") int limit);
    
    @Select("SELECT COUNT(*) FROM user")
    int count();
    
    // 插入
    @Insert("INSERT INTO user (username, password, email, status) " +
            "VALUES (#{username}, #{password}, #{email}, #{status})")
    @Options(useGeneratedKeys = true, keyProperty = "id")
    int insert(User user);
    
    // 更新
    @Update("UPDATE user SET username = #{username}, " +
            "email = #{email}, status = #{status} " +
            "WHERE id = #{id}")
    int update(User user);
    
    // 删除
    @Delete("DELETE FROM user WHERE id = #{id}")
    int deleteById(Long id);
}
```

### 6.2 复杂注解（推荐XML）

```java
public interface UserMapper {
    
    // 简单SQL使用注解
    @Select("SELECT * FROM user WHERE id = #{id}")
    User selectById(Long id);
    
    // 复杂SQL推荐使用XML
    // @Select("复杂SQL...") 会导致代码可读性差
    
    // 复杂查询用XML
    List<User> selectByCondition(UserQueryDTO query);
    
    // 动态SQL用XML
    int batchInsert(@Param("users") List<User> users);
}
```

---

## 七、最佳实践

### 7.1 命名规范

| 对象 | 规范 | 示例 |
|------|------|------|
| 实体类 | 名词，与表名对应 | User, Order |
| DTO | XxxDTO | UserCreateDTO, UserQueryDTO |
| VO | XxxVO | UserDetailVO, UserListVO |
| Mapper | XxxMapper | UserMapper, OrderMapper |
| 配置文件 | xxxMapper.xml | UserMapper.xml |

### 7.2 SQL编写规范

1. **关键字大写**：SELECT, FROM, WHERE
2. **使用占位符**：#{}防止SQL注入
3. **指定字段**：不要使用SELECT *
4. **分页处理**：使用LIMIT分页
5. **批量操作**：使用foreach标签

```xml
<!-- 推荐写法 -->
<select id="selectPage" resultType="User">
    SELECT id, username, email, status, create_time
    FROM user
    WHERE status = #{status}
    ORDER BY create_time DESC
    LIMIT #{offset}, #{limit}
</select>

<!-- 不推荐写法 -->
<select id="selectPage" resultType="User">
    SELECT * FROM user WHERE status = #{status}
    ORDER BY create_time DESC
    LIMIT #{offset}, #{limit}
</select>
```

### 7.3 常见问题

#### Q: 如何解决字段名与属性名不一致？

**方案1：开启驼峰映射**
```xml
<settings>
    <setting name="mapUnderscoreToCamelCase" value="true"/>
</settings>
```

**方案2：使用resultMap**
```xml
<resultMap id="UserMap" type="User">
    <result property="userName" column="user_name"/>
    <result property="createTime" column="create_time"/>
</resultMap>
```

**方案3：SQL起别名**
```sql
SELECT user_name AS userName, create_time AS createTime FROM user
```

#### Q: 如何获取自增主键？

```xml
<!-- MySQL方式 -->
<insert id="insert" parameterType="User" 
        useGeneratedKeys="true" keyProperty="id">
    INSERT INTO user (username, password)
    VALUES (#{username}, #{password})
</insert>

<!-- Oracle方式 -->
<insert id="insert" parameterType="User">
    <selectKey keyProperty="id" order="BEFORE" 
               resultType="long">
        SELECT USER_SEQ.NEXTVAL FROM DUAL
    </selectKey>
    INSERT INTO user (id, username, password)
    VALUES (#{id}, #{username}, #{password})
</insert>
```

#### Q: 如何处理NULL值？

```xml
<!-- 使用jdbcType指定类型 -->
<insert id="insert">
    INSERT INTO user (username, email)
    VALUES (#{username}, #{email, jdbcType=VARCHAR})
</insert>
```

---

## 八、小结

MyBatis是灵活高效的持久层框架：

1. **核心组件**：SqlSessionFactory、SqlSession、Mapper
2. **配置方式**：XML配置 + 注解配置
3. **参数传递**：支持多种参数类型，#{}安全，${}谨慎使用
4. **结果映射**：resultType简单映射，resultMap复杂映射
5. **一对一/一对多**：association和collection标签实现关联映射
6. **最佳实践**：规范命名、合理使用XML和注解

掌握MyBatis核心概念，能够帮助我们：
- 编写高效、安全的SQL语句
- 正确处理复杂的映射关系
- 设计清晰的持久层架构
