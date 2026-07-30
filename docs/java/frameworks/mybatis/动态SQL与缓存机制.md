# 动态SQL与缓存机制

## 一、动态SQL概述

### 1.1 什么是动态SQL

动态SQL是MyBatis最强大的特性之一，它允许我们根据条件**动态拼接SQL语句**，避免在Java代码中拼接SQL字符串。

### 1.2 动态SQL标签一览

| 标签 | 说明 | 使用场景 |
|------|------|---------|
| `<if>` | 条件判断 | 单个条件判断 |
| `<choose>` | 多条件分支 | 类似于switch |
| `<where>` | 智能WHERE | 自动处理WHERE和AND |
| `<set>` | 智能SET | 自动处理逗号 |
| `<foreach>` | 循环遍历 | IN查询、批量操作 |
| `<sql>` | SQL片段 | 复用SQL片段 |
| `<include>` | 引入片段 | 引入sql片段 |
| `<trim>` | 字符串修剪 | 自定义修剪规则 |

---

## 二、常用动态SQL标签

### 2.1 `<if>`条件判断

```xml
<select id="selectByCondition" resultType="User">
    SELECT * FROM user
    WHERE 1=1
    <if test="username != null and username != ''">
        AND username LIKE CONCAT('%', #{username}, '%')
    </if>
    <if test="status != null">
        AND status = #{status}
    </if>
    <if test="email != null and email != ''">
        AND email = #{email}
    </if>
</select>
```

#### 多条件组合

```xml
<select id="selectByMultipleConditions" resultType="User">
    SELECT * FROM user
    WHERE 1=1
    <if test="keyword != null and keyword != ''">
        AND (username LIKE CONCAT('%', #{keyword}, '%')
             OR email LIKE CONCAT('%', #{keyword}, '%'))
    </if>
    <if test="minCreateTime != null">
        AND create_time >= #{minCreateTime}
    </if>
    <if test="maxCreateTime != null">
        AND create_time <= #{maxCreateTime}
    </if>
    ORDER BY create_time DESC
</select>
```

### 2.2 `<choose>`多条件分支

```xml
<!-- 类似于switch-case -->
<select id="selectByOrderType" resultType="Order">
    SELECT * FROM orders
    WHERE 1=1
    <choose>
        <when test="orderType == 'pending'">
            AND status = 'PENDING'
        </when>
        <when test="orderType == 'paid'">
            AND status = 'PAID'
        </when>
        <when test="orderType == 'shipped'">
            AND status IN ('SHIPPED', 'DELIVERED')
        </when>
        <otherwise>
            AND status != 'CANCELLED'
        </otherwise>
    </choose>
</select>
```

### 2.3 `<where>`智能WHERE

```xml
<!-- 自动处理WHERE和多余的AND -->
<select id="selectByCondition" resultType="User">
    SELECT * FROM user
    <where>
        <if test="username != null">
            AND username = #{username}
        </if>
        <if test="status != null">
            AND status = #{status}
        </if>
    </where>
</select>

<!-- 生成的SQL示例 -->
<!-- 有条件时：SELECT * FROM user WHERE username = 'test' AND status = 1 -->
<!-- 无条件时：SELECT * FROM user -->
```

### 2.4 `<set>`智能SET

```xml
<!-- 自动处理SET和多余的逗号 -->
<update id="updateSelective">
    UPDATE user
    <set>
        <if test="username != null">
            username = #{username},
        </if>
        <if test="email != null">
            email = #{email},
        </if>
        <if test="status != null">
            status = #{status},
        </if>
        <if test="password != null">
            password = #{password},
        </if>
        update_time = NOW(),
    </set>
    WHERE id = #{id}
</update>

<!-- 生成的SQL示例 -->
<!-- 有条件时：UPDATE user SET username='test', email='test@test.com', update_time=NOW() WHERE id=1 -->
```

### 2.5 `<foreach>`循环遍历

#### IN查询

```xml
<!-- 批量查询 -->
<select id="selectByIds" resultType="User">
    SELECT * FROM user WHERE id IN
    <foreach collection="ids" item="id" 
             open="(" separator="," close=")">
        #{id}
    </foreach>
</select>

<!-- 生成的SQL：SELECT * FROM user WHERE id IN (1, 2, 3) -->
```

#### 批量插入

```xml
<!-- 批量插入 -->
<insert id="batchInsert">
    INSERT INTO user (username, email, status)
    VALUES
    <foreach collection="users" item="user" separator=",">
        (#{user.username}, #{user.email}, #{user.status})
    </foreach>
</insert>

<!-- 生成的SQL -->
<!-- INSERT INTO user (username, email, status) VALUES -->
<!-- ('user1', 'email1', 1), ('user2', 'email2', 1), ... -->
```

#### 批量更新

```xml
<!-- 批量更新（使用CASE WHEN） -->
<update id="batchUpdateStatus">
    UPDATE user SET status =
    <choose>
        <when test="batchUpdateList != null and batchUpdateList.size() > 0">
            CASE id
            <foreach collection="batchUpdateList" item="item">
                WHEN #{item.id} THEN #{item.status}
            </foreach>
            END
        </when>
        <otherwise>
            #{status}
        </otherwise>
    </choose>
    WHERE id IN
    <foreach collection="batchUpdateList" item="item" 
             open="(" separator="," close=")">
        #{item.id}
    </foreach>
</update>
```

#### 遍历Map

```xml
<!-- 遍历Map -->
<select id="selectByFilters" resultType="User">
    SELECT * FROM user
    <where>
        <foreach collection="filters" index="key" 
                 item="value" separator="AND">
            ${key} = #{value}
        </foreach>
    </where>
</select>
```

### 2.6 `<sql>`与`<include>`SQL片段

```xml
<!-- 定义可复用的SQL片段 -->
<sql id="userColumns">
    id, username, password, email, status, create_time, update_time
</sql>

<sql id="userBaseWhere">
    <where>
        <if test="id != null">
            AND id = #{id}
        </if>
        <if test="username != null">
            AND username LIKE CONCAT('%', #{username}, '%')
        </if>
        <if test="status != null">
            AND status = #{status}
        </if>
    </where>
</sql>

<!-- 引入SQL片段 -->
<select id="selectById" resultType="User">
    SELECT <include refid="userColumns"/>
    FROM user
    WHERE id = #{id}
</select>

<select id="selectByCondition" resultType="User">
    SELECT <include refid="userColumns"/>
    FROM user
    <include refid="userBaseWhere"/>
    ORDER BY create_time DESC
</select>
```

### 2.7 `<trim>`自定义修剪

```xml
<!-- trim标签：自定义前缀、后缀、分隔符的修剪规则 -->
<select id="selectByCondition" resultType="User">
    SELECT * FROM user
    <trim prefix="WHERE" prefixOverrides="AND|OR">
        <if test="username != null">
            AND username = #{username}
        </if>
        <if test="email != null">
            AND email = #{email}
        </if>
    </trim>
</select>

<!-- 效果1：有条件时 -->
<!-- SELECT * FROM user WHERE username = 'test' AND email = 'test@test.com' -->

<!-- 效果2：无条件时 -->
<!-- SELECT * FROM user -->
```

---

## 三、动态SQL实战案例

### 3.1 多条件搜索查询

```xml
<select id="searchUsers" resultType="UserVO">
    SELECT 
        u.id,
        u.username,
        u.email,
        u.status,
        u.create_time,
        d.name AS department_name
    FROM user u
    LEFT JOIN department d ON u.dept_id = d.id
    <where>
        <if test="keyword != null and keyword != ''">
            <trim prefix="(" suffix=")">
                username LIKE CONCAT('%', #{keyword}, '%')
                OR email LIKE CONCAT('%', #{keyword}, '%')
            </trim>
        </if>
        <if test="statusList != null and statusList.size() > 0">
            AND status IN
            <foreach collection="statusList" item="s" 
                     open="(" separator="," close=")">
                #{s}
            </foreach>
        </if>
        <if test="deptIds != null and deptIds.size() > 0">
            AND dept_id IN
            <foreach collection="deptIds" item="did" 
                     open="(" separator="," close=")">
                #{did}
            </foreach>
        </if>
        <if test="createTimeStart != null">
            AND u.create_time >= #{createTimeStart}
        </if>
        <if test="createTimeEnd != null">
            AND u.create_time <= #{createTimeEnd}
        </if>
    </where>
    <choose>
        <when test="sortField == 'createTime'">
            ORDER BY u.create_time DESC
        </when>
        <when test="sortField == 'username'">
            ORDER BY u.username ASC
        </when>
        <otherwise>
            ORDER BY u.id DESC
        </otherwise>
    </choose>
    LIMIT #{offset}, #{limit}
</select>
```

### 3.2 动态更新

```xml
<update id="dynamicUpdate" parameterType="User">
    UPDATE user
    <set>
        <if test="username != null">
            username = #{username},
        </if>
        <if test="email != null">
            email = #{email},
        </if>
        <if test="status != null">
            status = #{status},
        </if>
        <if test="password != null">
            password = #{password},
        </if>
        <if test="deptId != null">
            dept_id = #{deptId},
        </if>
        update_time = NOW(),
    </set>
    WHERE id = #{id}
</update>
```

### 3.3 动态表名

```xml
<!-- 注意：表名必须使用${}，但要防止SQL注入 -->
<select id="selectByTableName" resultType="User">
    SELECT * FROM ${tableName} WHERE id = #{id}
</select>

// 使用时需要验证表名
String[] allowedTables = {"user", "admin", "manager"};
if (!Arrays.asList(allowedTables).contains(tableName)) {
    throw new IllegalArgumentException("Invalid table name");
}
```

---

## 四、MyBatis缓存机制

### 4.1 缓存体系

```
┌─────────────────────────────────────────────────────────────┐
│                    MyBatis缓存体系                            │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌─────────────────────────────────────────────────────┐    │
│  │  二级缓存（Second Level Cache）                     │    │
│  │  - 跨SqlSession共享                                 │    │
│  │  - 可配置的全局缓存                                 │    │
│  │  - 适用于读多写少的场景                             │    │
│  └─────────────────────────────────────────────────────┘    │
│                          │                                   │
│                          ▼                                   │
│  ┌─────────────────────────────────────────────────────┐    │
│  │  一级缓存（First Level Cache）                      │    │
│  │  - SqlSession级别                                   │    │
│  │  - 默认开启                                         │    │
│  │  - 同一SqlSession内有效                             │    │
│  └─────────────────────────────────────────────────────┘    │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### 4.2 一级缓存

#### 特性

- **默认开启**：无需额外配置
- **作用范围**：同一个SqlSession
- **生命周期**：SqlSession关闭时失效
- **缓存Key**：MappedStatement ID + 参数值

#### 使用示例

```java
// 同一SqlSession内，相同查询会使用缓存
try (SqlSession session = sqlSessionFactory.openSession()) {
    UserMapper mapper = session.getMapper(UserMapper.class);
    
    // 第一次查询：访问数据库
    User user1 = mapper.selectById(1L);
    System.out.println("第一次查询：" + user1.getUsername());
    
    // 第二次查询：使用缓存，不再访问数据库
    User user2 = mapper.selectById(1L);
    System.out.println("第二次查询：" + user2.getUsername());
    
    // user1 == user2（同一对象）
    System.out.println("是否同一对象：" + (user1 == user2));
}
```

#### 清空缓存

```java
try (SqlSession session = sqlSessionFactory.openSession()) {
    UserMapper mapper = session.getMapper(UserMapper.class);
    
    User user1 = mapper.selectById(1L);
    
    // 清空一级缓存
    session.clearCache();
    
    // 再次查询会访问数据库
    User user2 = mapper.selectById(1L);
    
    // user1 != user2（不同对象）
    System.out.println("是否同一对象：" + (user1 == user2));
}
```

### 4.3 二级缓存

#### 启用配置

```xml
<!-- 1. 全局配置 -->
<configuration>
    <settings>
        <!-- 开启二级缓存 -->
        <setting name="cacheEnabled" value="true"/>
    </settings>
</configuration>

<!-- 2. Mapper配置 -->
<mapper namespace="com.example.mapper.UserMapper">
    
    <!-- 启用二级缓存 -->
    <cache 
        eviction="LRU"
        flushInterval="60000"
        size="512"
        readOnly="false"/>
    
    <!-- 或者使用自定义缓存实现 -->
    <!-- <cache type="com.example.CustomCache"/> -->
    
    <select id="selectById" resultType="User" 
            useCache="true">
        SELECT * FROM user WHERE id = #{id}
    </select>
</mapper>
```

#### 缓存属性说明

| 属性 | 说明 | 默认值 |
|------|------|--------|
| `eviction` | 回收策略：LRU/FIFO/SOFT/WEAK | LRU |
| `flushInterval` | 刷新间隔（毫秒） | 无 |
| `size` | 缓存大小 | 1024 |
| `readOnly` | 是否只读 | false |
| `type` | 自定义缓存实现 | 默认实现 |

#### 使用示例

```java
// 不同SqlSession之间可以共享二级缓存
// Session 1
SqlSession session1 = sqlSessionFactory.openSession();
UserMapper mapper1 = session1.getMapper(UserMapper.class);
User user1 = mapper1.selectById(1L);
session1.close();

// Session 2
SqlSession session2 = sqlSessionFactory.openSession();
UserMapper mapper2 = session2.getMapper(UserMapper.class);

// 命中二级缓存，不再访问数据库
User user2 = mapper2.selectById(1L);
System.out.println("是否同一对象：" + (user1 == user2));
session2.close();
```

#### 自定义缓存实现

```java
// 使用Redis作为二级缓存
public class RedisCache implements Cache {
    
    private final String id;
    private final RedisTemplate<String, Object> redisTemplate;
    
    public RedisCache(String id) {
        this.id = id;
        this.redisTemplate = ApplicationContextHolder
            .getBean(RedisTemplate.class);
    }
    
    @Override
    public String getId() {
        return id;
    }
    
    @Override
    public void putObject(Object key, Object value) {
        String cacheKey = id + ":" + key.hashCode();
        redisTemplate.opsForValue()
            .set(cacheKey, value, 30, TimeUnit.MINUTES);
    }
    
    @Override
    public Object getObject(Object key) {
        String cacheKey = id + ":" + key.hashCode();
        return redisTemplate.opsForValue().get(cacheKey);
    }
    
    @Override
    public Object removeObject(Object key) {
        String cacheKey = id + ":" + key.hashCode();
        Object value = redisTemplate.opsForValue().get(cacheKey);
        redisTemplate.delete(cacheKey);
        return value;
    }
    
    @Override
    public void clear() {
        // 清除当前namespace的所有缓存
        String pattern = id + ":*";
        Set<String> keys = redisTemplate.keys(pattern);
        if (keys != null && !keys.isEmpty()) {
            redisTemplate.delete(keys);
        }
    }
    
    @Override
    public int getSize() {
        String pattern = id + ":*";
        Set<String> keys = redisTemplate.keys(pattern);
        return keys != null ? keys.size() : 0;
    }
}

// 在Mapper中使用
<cache type="com.example.cache.RedisCache"/>
```

### 4.4 缓存执行流程

```
查询请求到达
    │
    ▼
检查二级缓存（如果开启）
    │
    ├── 命中 → 返回结果
    │
    └── 未命中 ↓
        │
        ▼
    检查一级缓存
        │
        ├── 命中 → 返回结果（同时设置二级缓存）
        │
        └── 未命中 ↓
            │
            ▼
        查询数据库
            │
            ├── 设置一级缓存
            ├── 设置二级缓存
            └── 返回结果
```

### 4.5 缓存注意事项

1. **缓存一致性**：
   - 一级缓存：在SqlSession关闭时失效
   - 二级缓存：在数据更新时自动清除

2. **序列化要求**：
   - 二级缓存需要实体类实现Serializable接口
   - 因为缓存可能跨Session传输

3. **缓存策略**：
   - 读多写少的场景适合使用缓存
   - 频繁更新的数据不适合使用缓存

4. **避免陷阱**：
   - 不同SqlSession读到的对象可能不是同一实例
   - 不要依赖缓存对象的引用相等性

---

## 五、小结

MyBatis的动态SQL和缓存机制是其两大核心特性：

### 动态SQL
1. **`<if>`**：条件判断，灵活拼接SQL
2. **`<choose>`**：多条件分支，类似switch
3. **`<where>`**：智能WHERE，自动处理AND
4. **`<set>`**：智能SET，自动处理逗号
5. **`<foreach>`**：循环遍历，支持IN查询和批量操作
6. **`<sql>/<include>`**：SQL片段复用，减少重复

### 缓存机制
1. **一级缓存**：SqlSession级别，默认开启，同一Session有效
2. **二级缓存**：Mapper级别，需要配置，跨Session共享
3. **自定义缓存**：支持Redis、Memcached等外部缓存
4. **缓存策略**：LRU、FIFO等多种回收策略

掌握这些特性，能够帮助我们：
- 编写灵活、高效的SQL语句
- 合理使用缓存提升性能
- 构建可维护的持久层代码
