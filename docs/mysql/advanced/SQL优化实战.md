# SQL 优化实战

## 一、SQL 优化的思路与原则

### 1.1 优化的核心理念

SQL 优化是一个系统工程，其核心目标是通过最小的代价获得最优的查询性能。在进行 SQL 优化时，我们需要遵循以下原则：

- **先慢后快，先易后难**：优先分析和优化最慢的查询，解决最容易见效的问题
- **定位根因，治标治本**：不要只看表面现象，要深入分析性能瓶颈的根本原因
- **量化效果，数据说话**：通过具体的指标（如响应时间、扫描行数）衡量优化效果
- **权衡取舍，适度优化**：不存在完美的优化方案，需要在各种因素间找到平衡

### 1.2 优化的三个层次

```
┌─────────────────────────────────────────────┐
│           应用层 SQL 优化                    │  ← 编写高质量的 SQL 语句
│   ┌─────────────────────────────────────┐   │
│   │        索引与表结构优化              │   │  ← 设计合理的索引和表结构
│   │   ┌─────────────────────────────┐   │   │
│   │   │      数据库实例参数调优      │   │   │  ← 调整 MySQL 配置参数
│   │   └─────────────────────────────┘   │   │
│   └─────────────────────────────────────┘   │
│   ┌─────────────────────────────────────┐   │
│   │        操作系统与硬件优化            │   │  ← 选择合适的硬件和操作系统
│   └─────────────────────────────────────┘   │
└─────────────────────────────────────────────┘
```

### 1.3 优化的一般步骤

1. **发现问题**：通过慢查询日志监控和发现性能低下的 SQL
2. **分析问题**：使用 EXPLAIN 分析执行计划，理解 MySQL 的执行方式
3. **定位瓶颈**：判断瓶颈在索引、查询写法、表结构还是参数配置
4. **实施优化**：针对性地应用优化策略
5. **验证效果**：对比优化前后的性能指标

## 二、EXPLAIN 执行计划详解

EXPLAIN 是分析 SQL 查询性能最核心的工具，它可以显示 MySQL 如何执行 SQL 语句。

### 2.1 EXPLAIN 输出字段说明

```sql
EXPLAIN SELECT * FROM orders WHERE user_id = 100 AND status = 'paid';
```

输出结果：

| 字段 | 含义 |
|------|------|
| **id** | 查询中每个 SELECT 的标识符，ID 越大优先级越高 |
| **select_type** | 查询类型，如 SIMPLE、PRIMARY、SUBQUERY 等 |
| **table** | 当前行访问的表 |
| **partitions** | 查询涉及的分区 |
| **type** | 访问类型，性能从好到差排序 |
| **possible_keys** | 可能使用的索引 |
| **key** | 实际使用的索引 |
| **key_len** | 使用的索引长度 |
| **ref** | 与索引比较的列或常量 |
| **rows** | 预计需要扫描的行数 |
| **filtered** | 按条件过滤的百分比 |
| **Extra** | 额外的执行信息 |

### 2.2 type 字段详解（访问类型）

type 字段是衡量查询性能的关键指标，从最好到最差依次为：

| type | 含义 | 说明 |
|------|------|------|
| **system** | 系统表 | 只有一行数据，直接读取常量 |
| **const** | 常量查询 | 通过主键或唯一索引查询，最多返回一行 |
| **eq_ref** | 等值查询 | 多表连接中使用主键/唯一索引匹配 |
| **ref** | 索引查询 | 使用非唯一索引的等值查询 |
| **range** | 范围扫描 | 索引上的范围查询，如 BETWEEN、>、< |
| **index** | 全索引扫描 | 扫描整个索引树 |
| **ALL** | 全表扫描 | 最差的情况，需要扫描整张表 |

#### const 示例

```sql
EXPLAIN SELECT * FROM users WHERE id = 1;
```

由于 `id` 是主键，查询只需要找到一行。MySQL 会在查询优化阶段就将其替换为常量。

#### eq_ref 示例

```sql
EXPLAIN SELECT u.name, o.amount
FROM users u
JOIN orders o ON u.id = o.user_id;
```

在 JOIN 查询中，`users` 表的 `id`（主键）被 `orders` 表引用，每次匹配最多一行。

#### range 示例

```sql
EXPLAIN SELECT * FROM orders WHERE create_time >= '2024-01-01' AND create_time < '2024-02-01';
```

使用索引进行范围扫描，比全表扫描效率高得多。

#### ALL 示例

```sql
EXPLAIN SELECT * FROM orders WHERE total > 1000;
```

没有可用的索引，MySQL 只能全表扫描。这是最需要避免的情况。

### 2.3 key 字段详解

- **possible_keys**：MySQL 在执行查询时可能用到的索引。即使这些索引最终没有被使用，它们也会出现在 possible_keys 中。
- **key**：MySQL 实际选择使用的索引。如果为 NULL，表示没有使用索引。

#### 优化器如何选择索引？

MySQL 优化器会基于统计信息（如索引基数、表行数）估算每个索引的查询成本，选择成本最低的方案。成本估算包括：

- 读取的随机 I/O 次数
- 读取的行数
- CPU 计算开销

```sql
-- 查看索引的统计信息
SHOW INDEX FROM orders;
-- 或
SELECT * FROM information_schema.statistics WHERE table_name = 'orders';
```

### 2.4 rows 字段详解

rows 是 MySQL 根据统计信息预估需要扫描的行数。这个值越接近实际值，说明统计信息越准确。

```sql
-- 更新统计信息
ANALYZE TABLE orders;
```

### 2.5 Extra 字段详解

Extra 字段提供了关于 MySQL 执行方式的关键额外信息：

| Extra 值 | 含义 | 性能影响 |
|-----------|------|----------|
| **Using index** | 覆盖索引，无需回表 | 最优 |
| **Using where** | 在存储引擎层过滤 | 良好 |
| **Using index condition** | 索引条件下推（ICP） | 良好 |
| **Using filesort** | 需要额外排序 | 较差 |
| **Using temporary** | 使用临时表 | 很差 |
| **Using join buffer** | 关联查询使用缓冲区 | 较差 |
| **Impossible where** | WHERE 条件不可能匹配 | 无需优化 |
| **Select tables optimized away** | 聚合查询直接从索引获取 | 最优 |

#### Using index（覆盖索引）

当查询所需的所有列都在索引中时，MySQL 可以直接从索引返回数据，无需回表：

```sql
CREATE INDEX idx_user_status ON orders(user_id, status, total);

EXPLAIN SELECT user_id, status, total FROM orders WHERE user_id = 100;
-- Extra: Using index
```

#### Using filesort

当 ORDER BY 无法利用索引时，MySQL 需要在内存或磁盘上额外排序：

```sql
CREATE INDEX idx_user_id ON orders(user_id);

EXPLAIN SELECT * FROM orders WHERE user_id = 100 ORDER BY create_time;
-- Extra: Using filesort
```

**优化方案**：在 ORDER BY 字段上也建立索引，或将其包含在联合索引中。

#### Using temporary

MySQL 需要创建临时表来处理某些操作，常见于 GROUP BY 和 DISTINCT 查询：

```sql
EXPLAIN SELECT user_id, SUM(total) FROM orders GROUP BY user_id ORDER BY create_time;
-- Extra: Using temporary; Using filesort
```

**优化方案**：确保 GROUP BY 和 ORDER BY 使用相同的索引列。

## 三、慢查询日志分析

### 3.1 开启慢查询日志

```sql
-- 查看当前配置
SHOW VARIABLES LIKE 'slow_query%';
SHOW VARIABLES LIKE 'long_query_time';

-- 开启慢查询日志
SET GLOBAL slow_query_log = 'ON';
SET GLOBAL long_query_time = 1;  -- 超过1秒记录
SET GLOBAL slow_query_log_file = '/var/log/mysql/slow.log';
SET GLOBAL log_queries_not_using_indexes = 'ON';  -- 记录未使用索引的查询
```

### 3.2 慢日志参数详解

| 参数 | 说明 |
|------|------|
| slow_query_log | 是否开启慢查询日志 |
| slow_query_log_file | 慢日志文件路径 |
| long_query_time | 慢查询阈值（秒），可以设置为微秒级精度 |
| log_queries_not_using_indexes | 是否记录未使用索引的查询 |
| min_examined_row_limit | 最小检查行数，低于此值的查询不记录 |

### 3.3 分析慢查询日志

#### 使用 mysqldumpslow 工具

```bash
# 按执行次数排序
mysqldumpslow -s c -t 10 /var/log/mysql/slow.log

# 按平均执行时间排序
mysqldumpslow -s at -t 10 /var/log/mysql/slow.log

# 按总执行时间排序
mysqldumpslow -s t -t 10 /var/log/mysql/slow.log

# 查找特定模式的查询
mysqldumpslow -g "select.*from orders" /var/log/mysql/slow.log
```

#### 直接查看日志文件

慢日志格式如下：

```
# Time: 2024-01-15T10:30:00.123456Z
# User@Host: app_user[app_user] @ 192.168.1.100 [192.168.1.100]  Id: 12345
# Query_time: 5.234567  Lock_time: 0.001234  Rows_sent: 100  Rows_examined: 50000
SET timestamp=1705312200;
SELECT * FROM orders WHERE user_id = 100 AND status = 'pending';
```

关键指标：
- **Query_time**：查询执行时间
- **Lock_time**：等待锁的时间
- **Rows_sent**：返回的行数
- **Rows_examined**：扫描的行数

**核心指标**：`Rows_examined` 与 `Rows_sent` 的比值。如果比值很大（如大于100），说明查询效率很低，需要优化。

## 四、索引优化策略

### 4.1 联合索引设计

联合索引是性能优化中最重要的技术之一。合理设计联合索引的关键在于理解**最左前缀原则**。

#### 最左前缀原则

联合索引 `(a, b, c)` 能够匹配的查询条件：

| 查询条件 | 能否使用索引 | 使用的索引列 |
|----------|-------------|-------------|
| WHERE a = 1 | ✅ | a |
| WHERE a = 1 AND b = 2 | ✅ | a, b |
| WHERE a = 1 AND b = 2 AND c = 3 | ✅ | a, b, c |
| WHERE b = 2 | ❌ | - |
| WHERE b = 2 AND c = 3 | ❌ | - |
| WHERE a = 1 AND c = 3 | ✅ (部分) | a |

```sql
-- 创建联合索引
CREATE INDEX idx_user_status_create ON orders(user_id, status, create_time);

-- 使用索引：user_id, status, create_time
EXPLAIN SELECT * FROM orders WHERE user_id = 100 AND status = 'paid' ORDER BY create_time;

-- 只使用 user_id 部分
EXPLAIN SELECT * FROM orders WHERE user_id = 100 AND create_time > '2024-01-01';
```

#### 如何设计高效的联合索引

1. **将等值查询的列放在前面**：等值查询能有效利用索引的有序性
2. **考虑 ORDER BY 和 GROUP BY**：这些操作可以利用索引避免排序
3. **区分度高的列靠前**：区分度高的列能更有效地缩小扫描范围
4. **避免过多列**：索引列越多，写入开销越大

### 4.2 覆盖索引应用

#### 什么是覆盖索引

当查询需要返回的所有列都包含在索引中时，MySQL 无需回表即可获取数据，这就是覆盖索引。

#### 覆盖索引的原理

InnoDB 引擎的索引结构是 B+ 树。在二级索引中，叶子节点存储了索引列的值和对应的主键值。如果查询所需的所有列都在索引中，MySQL 可以直接从二级索引获取数据，无需回聚簇索引查找完整行。

```sql
-- 假设有索引 (user_id, status, total)
EXPLAIN SELECT user_id, status, total FROM orders WHERE user_id = 100;
-- Extra: Using index

-- 以下查询无法使用覆盖索引，因为需要 id 列
EXPLAIN SELECT id, user_id, status, total FROM orders WHERE user_id = 100;
```

#### 覆盖索引的设计要点

- 将 SELECT 中需要的列尽量包含在索引中
- 对于频繁查询，可以考虑设计专门的覆盖索引
- 权衡索引大小和查询性能

### 4.3 索引下推

#### 什么是索引下推

索引下推（Index Pushdown）是指将 WHERE 条件的过滤操作下推到索引层面完成，而不是先获取所有匹配的行再过滤。

#### 索引下推的原理

在 MySQL 5.6 之前，存储引擎层只能根据索引定位数据，然后将所有匹配的行返回到 Server 层进行 WHERE 条件过滤。索引下推功能将部分过滤逻辑下推到存储引擎层，显著减少了回表次数和数据传输量。

```sql
-- 假设索引为 (zip_code, last_name)
EXPLAIN SELECT * FROM people
WHERE zipcode LIKE '735%' AND last_name LIKE 'Gallo%';
-- Extra: Using index condition
```

这个例子中，MySQL 使用索引 `(zipcode, last_name)` 进行索引下推。在遍历索引时，对于每个 zipcode 的范围，同时检查 last_name 是否匹配，只对匹配的记录进行回表。

#### 索引下推的使用场景

- LIKE 前缀匹配（如 `LIKE 'abc%'`）
- 范围查询后的额外条件过滤
- 多列联合索引的部分条件过滤

### 4.4 索引条件下推（ICP）

索引条件下推（Index Condition Pushdown）是 MySQL 5.6 引入的优化特性，是索引下推的进一步优化。

#### ICP 与普通索引下推的区别

普通索引下推：将 WHERE 条件中能使用索引的部分下推
ICP：将 **所有** WHERE 条件（包括无法使用索引的部分）都下推到存储引擎层过滤

```sql
-- 没有 ICP 时的执行流程：
-- 1. 存储引擎根据索引定位所有匹配的主键
-- 2. 回表获取完整行
-- 3. Server 层过滤剩余条件

-- 有 ICP 时的执行流程：
-- 1. 存储引擎根据索引定位
-- 2. 在存储引擎层直接过滤所有条件
-- 3. 只对匹配的记录回表
```

#### ICP 的工作原理

以 InnoDB 为例，ICP 的工作流程如下：

1. MySQL 优化器识别可以下推的 WHERE 条件
2. 将这些条件传递给存储引擎
3. 存储引擎在遍历索引时，对每条记录先应用下推条件
4. 只有满足所有条件的记录才进行回表

```sql
-- 示例：索引为 (zipcode)，但查询还有 last_name 条件
EXPLAIN SELECT * FROM people
WHERE zipcode LIKE '735%' AND last_name LIKE 'Gallo%';
-- Extra: Using index condition

-- 没有 ICP 时：先回表所有 zipcode 匹配的记录，再过滤 last_name
-- 有 ICP 时：在索引层就过滤 last_name，只回表匹配的记录
```

#### 关闭 ICP

```sql
SET SESSION optimizer_switch = 'index_condition_pushdown=off';
```

在某些场景下（如覆盖索引查询），关闭 ICP 可能更有利。

## 五、查询写法优化

### 5.1 避免 SELECT *

#### 问题分析

`SELECT *` 会返回所有列，带来以下问题：
1. 无法利用覆盖索引
2. 增加网络传输量
3. 增加内存消耗
4. 表结构变更时可能影响应用

#### 优化方案

```sql
-- 不好
SELECT * FROM orders WHERE user_id = 100;

-- 好
SELECT id, user_id, status, total, create_time
FROM orders WHERE user_id = 100;
```

### 5.2 使用 LIMIT 1 查询单条

当确定查询结果只有一条时，使用 `LIMIT 1` 可以告诉 MySQL 找到一条就停止。

```sql
-- 不好：如果 email 没有唯一索引，会扫描所有匹配
SELECT * FROM users WHERE email = 'user@example.com';

-- 好
SELECT * FROM users WHERE email = 'user@example.com' LIMIT 1;
```

### 5.3 使用 WHERE 过滤而非 HAVING

HAVING 子句在聚合之后进行过滤，而 WHERE 在聚合之前。尽量使用 WHERE 过滤。

```sql
-- 不好：先聚合所有数据，再过滤
SELECT user_id, SUM(total) as amount
FROM orders
GROUP BY user_id
HAVING user_id = 100;

-- 好：先过滤再聚合
SELECT user_id, SUM(total) as amount
FROM orders
WHERE user_id = 100
GROUP BY user_id;
```

### 5.4 合理使用 JOIN

#### JOIN 类型的选择

- **INNER JOIN**：只返回两表匹配的行
- **LEFT JOIN**：返回左表所有行和右表匹配的行
- **RIGHT JOIN**：返回右表所有行和左表匹配的行
- **CROSS JOIN**：笛卡尔积，通常应避免

#### JOIN 优化原则

1. **小表驱动大表**：在 MySQL 中，JOIN 是嵌套循环，小表作为驱动表性能更好
2. **确保 ON 条件有索引**：JOIN 条件上必须有索引
3. **避免子查询改为 JOIN**：MySQL 对子查询的优化有限，改写为 JOIN 通常更高效

```sql
-- 不好：子查询
SELECT * FROM orders
WHERE user_id IN (SELECT id FROM users WHERE status = 'active');

-- 好：使用 JOIN
SELECT o.* FROM orders o
INNER JOIN users u ON o.user_id = u.id
WHERE u.status = 'active';
```

### 5.5 子查询优化

#### MySQL 对子查询的处理

MySQL 会将 `IN (子查询)` 优化为 `EXISTS`，但在某些版本中效果不理想。

```sql
-- 可能性能差
SELECT * FROM orders
WHERE user_id IN (SELECT id FROM users WHERE status = 'active');

-- 改写为 JOIN
SELECT o.* FROM orders o
JOIN users u ON o.user_id = u.id AND u.status = 'active';
```

#### 相关子查询优化

相关子查询（Correlated Subquery）的执行依赖外部查询的值，通常性能较差。

```sql
-- 相关子查询：对每行都执行子查询
SELECT u.*, (SELECT COUNT(*) FROM orders o WHERE o.user_id = u.id) AS order_count
FROM users u;

-- 改写为 JOIN
SELECT u.*, COUNT(o.id) AS order_count
FROM users u LEFT JOIN orders o ON u.id = o.user_id
GROUP BY u.id;
```

### 5.6 OR 条件优化

#### OR 的性能问题

当 `OR` 条件涉及不同列时，MySQL 可能无法使用索引。

```sql
-- 如果 email 和 phone 上分别有索引，但 MySQL 可能无法使用
SELECT * FROM users WHERE email = 'a@b.com' OR phone = '13800138000';
```

#### 优化方案

**方案一：使用 UNION ALL**

```sql
(SELECT * FROM users WHERE email = 'a@b.com')
UNION ALL
(SELECT * FROM users WHERE phone = '13800138000')
WHERE email != 'a@b.com';
```

**方案二：建立联合索引**

```sql
CREATE INDEX idx_email_phone ON users(email, phone);
```

**方案三：改写为 IN 条件**

```sql
-- 如果两个条件有相同的列
SELECT * FROM orders WHERE status IN ('paid', 'pending');
```

### 5.7 LIKE 模糊查询优化

#### 前缀通配符

`LIKE 'abc%'` 可以使用索引，因为它匹配字符串的开头。

```sql
-- 可以使用索引
SELECT * FROM products WHERE name LIKE 'iPhone%';

-- 无法使用索引
SELECT * FROM products WHERE name LIKE '%Phone';

-- 无法使用索引
SELECT * FROM products WHERE name LIKE '%iPh%';
```

#### 全文索引

MySQL 提供全文索引（FULLTEXT Index）进行全文搜索：

```sql
-- 创建全文索引
ALTER TABLE articles ADD FULLTEXT INDEX ft_content(content);

-- 使用全文搜索
SELECT * FROM articles WHERE MATCH(content) AGAINST ('MySQL 优化');

-- 使用布尔模式
SELECT * FROM articles WHERE MATCH(content) AGAINST ('+MySQL -Oracle' IN BOOLEAN MODE);
```

#### 其他方案

- 使用搜索引擎（Elasticsearch）处理复杂全文搜索
- 使用倒排索引
- 使用前缀索引（`LEFT(column, n)`）

## 六、数据库结构优化

### 6.1 反范式化

#### 范式与反范式

**第三范式（3NF）**：消除数据冗余，每个字段只依赖于主键。

**反范式化**：通过增加冗余数据来提高查询性能。

#### 反范式化的应用场景

```sql
-- 原始表结构（3NF）
CREATE TABLE orders (
    id BIGINT PRIMARY KEY,
    user_id BIGINT,
    product_id BIGINT,
    quantity INT,
    total DECIMAL(10,2)
);

CREATE TABLE users (
    id BIGINT PRIMARY KEY,
    name VARCHAR(50),
    email VARCHAR(100)
);

CREATE TABLE products (
    id BIGINT PRIMARY KEY,
    name VARCHAR(200),
    price DECIMAL(10,2)
);

-- 查询订单详情需要 JOIN 三张表
SELECT o.*, u.name, p.name AS product_name
FROM orders o
JOIN users u ON o.user_id = u.id
JOIN products p ON o.product_id = p.id;

-- 反范式化：在订单表中冗余存储用户名和产品名
ALTER TABLE orders ADD user_name VARCHAR(50);
ALTER TABLE orders ADD product_name VARCHAR(200);

-- 查询只需单表
SELECT * FROM orders WHERE id = 100;
```

#### 反范式化的代价

- 数据冗余，需要维护一致性
- 更新操作更复杂
- 存储空间增加

### 6.2 适当冗余

#### 冗余的基本原则

1. **高频查询、低频更新**的字段适合冗余
2. 冗余字段应不经常变化
3. 通过触发器或应用层保证数据一致性

```sql
-- 场景：统计每个用户的订单总数
-- 方案：在用户表中冗余订单总数
ALTER TABLE users ADD order_count INT DEFAULT 0;

-- 使用触发器维护
DELIMITER //
CREATE TRIGGER after_order_insert
AFTER INSERT ON orders
FOR EACH ROW
BEGIN
    UPDATE users SET order_count = order_count + 1 WHERE id = NEW.user_id;
END //

CREATE TRIGGER after_order_delete
AFTER DELETE ON orders
FOR EACH ROW
BEGIN
    UPDATE users SET order_count = order_count - 1 WHERE id = OLD.user_id;
END //
DELIMITER ;
```

### 6.3 避免过度范式化

过度范式化会导致：
- 过多的 JOIN 操作
- 查询复杂，难以维护
- 性能下降

**建议**：在实际项目中，通常采用 2NF 或 3NF + 适度反范式化的策略。

## 七、统计信息与优化器

### 7.1 统计信息的作用

MySQL 优化器依赖表和索引的统计信息来选择最优的执行计划。统计信息包括：

- 表的行数估算
- 索引的基数（cardinality）
- 列值的分布情况

### 7.2 查看统计信息

```sql
-- 查看表状态
SHOW TABLE STATUS LIKE 'orders';

-- 查看索引统计
SHOW INDEX FROM orders;

-- 查看 InnoDB 统计信息
SELECT * FROM mysql.innodb_index_stats WHERE table_name = 'orders';
SELECT * FROM mysql.innodb_table_stats WHERE table_name = 'orders';
```

### 7.3 更新统计信息

```sql
-- 手动更新统计信息
ANALYZE TABLE orders;

-- 配置自动更新
SET GLOBAL innodb_stats_auto_recalc = ON;
SET GLOBAL innodb_stats_persistent = ON;
```

### 7.4 统计信息不准确的影响

统计信息不准确会导致优化器选择错误的执行计划：

```sql
-- 假设 orders 表实际有 100 万行，但统计信息显示只有 1 万行
-- 优化器可能会选择全表扫描而不是使用索引
```

## 八、重写 SQL 的常见技巧

### 8.1 将子查询改写为 JOIN

```sql
-- 原始
SELECT * FROM orders
WHERE user_id IN (SELECT id FROM users WHERE status = 'active');

-- 改写
SELECT o.* FROM orders o
INNER JOIN users u ON o.user_id = u.id
WHERE u.status = 'active';
```

### 8.2 将 OR 改写为 UNION

```sql
-- 原始
SELECT * FROM users WHERE name = 'Alice' OR email = 'a@b.com';

-- 改写
(SELECT * FROM users WHERE name = 'Alice')
UNION ALL
(SELECT * FROM users WHERE email = 'a@b.com' AND name != 'Alice');
```

### 8.3 将 COUNT(DISTINCT) 改写

```sql
-- 原始
SELECT COUNT(DISTINCT user_id) FROM orders;

-- 在某些场景下可以改写
SELECT COUNT(*) FROM (SELECT DISTINCT user_id FROM orders) AS t;
```

### 8.4 拆分大查询

```sql
-- 一次查询多个条件
SELECT * FROM orders
WHERE user_id IN (1, 2, 3, ..., 1000) AND status = 'paid';

-- 分批查询
SELECT * FROM orders WHERE user_id IN (1, 2, ..., 100) AND status = 'paid';
SELECT * FROM orders WHERE user_id IN (101, 102, ..., 200) AND status = 'paid';
-- ...
```

### 8.5 使用 CASE WHEN 代替多次查询

```sql
-- 多次查询
SELECT COUNT(*) FROM orders WHERE status = 'paid';
SELECT COUNT(*) FROM orders WHERE status = 'pending';
SELECT COUNT(*) FROM orders WHERE status = 'cancelled';

-- 一次查询
SELECT
    SUM(CASE WHEN status = 'paid' THEN 1 ELSE 0 END) AS paid_count,
    SUM(CASE WHEN status = 'pending' THEN 1 ELSE 0 END) AS pending_count,
    SUM(CASE WHEN status = 'cancelled' THEN 1 ELSE 0 END) AS cancelled_count
FROM orders;
```

## 九、优化器提示（HINT）的使用

### 9.1 常用 HINT

MySQL 提供了多种 HINT 来影响优化器的决策：

```sql
-- 强制使用某个索引
SELECT * FROM orders FORCE INDEX (idx_user_id) WHERE user_id = 100;

-- 建议使用某个索引
SELECT * FROM orders USE INDEX (idx_user_id) WHERE user_id = 100;

-- 忽略某个索引
SELECT * FROM orders IGNORE INDEX (idx_user_id) WHERE user_id = 100;

-- 控制 JOIN 顺序
SELECT /*+ LEADING(u) */ * FROM users u JOIN orders o ON u.id = o.user_id;

-- 控制 JOIN 算法
SELECT /*+ MERGE(o) */ * FROM users u JOIN orders o ON u.id = o.user_id;

-- 阻止转换为子查询
SELECT /*+ NO_SUBQUERY */ * FROM orders WHERE user_id IN (SELECT id FROM users);

-- 固定执行计划
SELECT * FROM orders WHERE user_id = 100;
-- 使用 CREATE OUTLINE 创建固定计划
```

### 9.2 HINT 的使用原则

1. **谨慎使用**：HINT 是"最后手段"，不应作为常规优化方法
2. **充分测试**：使用 HINT 前后必须验证性能
3. **版本兼容**：不同版本的 HINT 行为可能不同
4. **文档记录**：记录使用 HINT 的原因和背景

### 9.3 HINT 的风险

- MySQL 版本升级后，原有的 HINT 可能不再适用
- 数据分布变化后，HINT 可能导致性能下降
- 增加代码复杂度和维护成本

## 十、实战案例分析

### 案例一：电商订单查询优化

#### 问题描述

电商系统的订单列表查询缓慢，用户翻页时经常超时。

#### 原始 SQL

```sql
SELECT * FROM orders
WHERE user_id = 100
ORDER BY create_time DESC
LIMIT 20 OFFSET 0;
```

EXPLAIN 结果：type=ALL，全表扫描。

#### 优化步骤

1. **创建联合索引**：

```sql
CREATE INDEX idx_user_create ON orders(user_id, create_time DESC);
```

2. **使用覆盖索引优化**：

```sql
-- 如果只需要部分字段
SELECT id, status, total, create_time
FROM orders
WHERE user_id = 100
ORDER BY create_time DESC
LIMIT 20;
```

3. **深分页优化**：

```sql
-- 不好：深分页性能差
SELECT * FROM orders WHERE user_id = 100 ORDER BY create_time DESC LIMIT 100000, 20;

-- 方案一：使用游标分页（记住上次最后一条记录的位置）
SELECT * FROM orders
WHERE user_id = 100 AND create_time < '2024-01-01T00:00:00'
ORDER BY create_time DESC
LIMIT 20;

-- 方案二：子查询优化
SELECT o.* FROM orders o
INNER JOIN (
    SELECT id FROM orders
    WHERE user_id = 100
    ORDER BY create_time DESC
    LIMIT 100000, 20
) AS t ON o.id = t.id;
```

#### 优化效果

- 响应时间从 5 秒降到 50ms
- 扫描行数从 100 万行降到 100 行

### 案例二：报表统计查询优化

#### 问题描述

报表统计查询涉及多表 JOIN 和聚合运算，查询超时。

#### 原始 SQL

```sql
SELECT
    p.name AS product_name,
    SUM(o.quantity) AS total_quantity,
    SUM(o.total) AS total_amount
FROM orders o
JOIN order_items oi ON o.id = oi.order_id
JOIN products p ON oi.product_id = p.id
WHERE o.create_time >= '2024-01-01' AND o.create_time < '2024-02-01'
GROUP BY p.name
ORDER BY total_amount DESC;
```

#### 优化步骤

1. **确保所有 JOIN 条件有索引**：

```sql
CREATE INDEX idx_orders_create_time ON orders(create_time);
CREATE INDEX idx_items_order_id ON order_items(order_id);
CREATE INDEX idx_items_product_id ON order_items(product_id);
```

2. **使用反范式化**：在 order_items 中冗余 product_name：

```sql
ALTER TABLE order_items ADD product_name VARCHAR(200);

-- 简化查询
SELECT
    product_name,
    SUM(quantity) AS total_quantity,
    SUM(total) AS total_amount
FROM order_items oi
JOIN orders o ON oi.order_id = o.id
WHERE o.create_time >= '2024-01-01' AND o.create_time < '2024-02-01'
GROUP BY product_name
ORDER BY total_amount DESC;
```

3. **建立复合索引**：

```sql
CREATE INDEX idx_orders_time_status ON orders(create_time, status);
```

#### 优化效果

- 响应时间从 30 秒降到 2 秒
- 简化了 SQL 逻辑

### 案例三：慢查询定位与优化

#### 问题描述

监控发现某接口 P99 响应时间超过 5 秒。

#### 排查步骤

1. **查看慢查询日志**：发现以下 SQL

```sql
SELECT COUNT(*) FROM orders WHERE status = 'pending' AND user_id = 100;
```

2. **EXPLAIN 分析**：type=ALL，全表扫描

3. **检查索引**：`SHOW INDEX FROM orders;` 发现没有 `(user_id, status)` 索引

4. **创建索引**：

```sql
CREATE INDEX idx_user_status ON orders(user_id, status);
```

5. **验证优化**：响应时间从 5 秒降到 5ms

#### 预防措施

- 建立慢查询监控告警
- 代码评审时检查 SQL 写法
- 定期审查索引使用情况

## 十一、总结

SQL 优化是一门艺术，需要深入理解 MySQL 的内部机制。核心要点包括：

1. **理解索引原理**：B+ 树结构、最左前缀原则、覆盖索引
2. **掌握 EXPLAIN 分析**：准确解读执行计划的每个字段
3. **善用慢查询日志**：持续发现和解决性能问题
4. **优化 SQL 写法**：避免常见陷阱，选择高效写法
5. **合理设计表结构**：在范式化和反范式化之间找到平衡
6. **建立监控体系**：持续监控和优化

通过系统地应用这些优化策略，可以显著提升数据库查询性能，支撑业务的快速发展。
