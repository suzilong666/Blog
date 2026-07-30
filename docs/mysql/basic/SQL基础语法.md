# SQL 基础语法

## 一、SQL 语言概述与分类

### 1.1 SQL 语言简介

SQL（Structured Query Language，结构化查询语言）是一种用于管理关系型数据库的标准语言。它由 IBM 公司在 20 世纪 70 年代初期开发，最初称为 SEQUEL（Structured English Query Language），后来演变为 SQL。

SQL 的核心设计理念是**非过程化**——用户只需描述"做什么"（What to do），而不需要描述"怎么做"（How to do）。数据库管理系统（如 MySQL）的查询优化器会自动选择最优的执行方案。

**SQL 语言的特点**：
- **统一的语言**：集数据定义、数据操作、数据控制于一体
- **非过程化**：只需描述需求，无需指定访问路径
- **面向集合**：操作的是数据的集合（表、行的集合），而非单个行
- **标准语法**：遵循 ANSI SQL 标准，各数据库厂商在此基础上扩展

### 1.2 SQL 的四大分类

SQL 语句按照功能分为四大类：

**1. DDL（Data Definition Language，数据定义语言）**

DDL 用于定义、修改和删除数据库中的结构（数据库、表、索引、视图等）。

```sql
CREATE   -- 创建对象
ALTER    -- 修改对象结构
DROP     -- 删除对象
TRUNCATE -- 清空表（保留结构）
RENAME   -- 重命名对象
```

DDL 语句的特点：
- 会隐式提交（Implicit Commit），执行后立即生效，不能通过 ROLLBACK 回滚
- 会修改数据字典（Data Dictionary）中的元数据
- 在 MySQL 中，大多数 DDL 操作会隐式提交当前事务

**2. DML（Data Manipulation Language，数据操作语言）**

DML 用于对数据进行增、删、改、查操作。

```sql
INSERT  -- 插入数据
UPDATE  -- 更新数据
DELETE  -- 删除数据
SELECT  -- 查询数据（严格来说 SELECT 属于 DQL）
```

**3. DCL（Data Control Language，数据控制语言）**

DCL 用于管理数据库的权限和安全。

```sql
GRANT   -- 授权
REVOKE  -- 撤销权限
```

**4. TCL（Transaction Control Language，事务控制语言）**

TCL 用于管理事务。

```sql
COMMIT   -- 提交事务
ROLLBACK -- 回滚事务
SAVEPOINT-- 设置保存点
```

### 1.3 补充：DQL 与 DML 的关系

有些教材会将 SELECT 单独归为 DQL（Data Query Language，数据查询语言）。在实际应用中，SELECT 是最常用的 SQL 语句，通常与 DML 合并讨论。

---

## 二、CREATE 语句详解与示例

### 2.1 创建数据库

```sql
CREATE DATABASE [IF NOT EXISTS] database_name
    [CHARACTER SET charset_name]
    [COLLATE collation_name];
```

**参数说明**：
- `IF NOT EXISTS`：如果数据库已存在，不报错，仅返回一个警告
- `CHARACTER SET`：指定数据库的默认字符集，推荐使用 `utf8mb4`
- `COLLATE`：指定数据库的默认排序规则

```sql
CREATE DATABASE shop
    CHARACTER SET utf8mb4
    COLLATE utf8mb4_unicode_ci;
```

**底层原理**：
- `CREATE DATABASE` 在磁盘上创建一个新的目录
- 目录中包含 `db.opt` 文件，记录数据库的字符集和排序规则
- InnoDB 共享表空间模式下，新表的数据存储在 `ibdata1` 中
- `file-per-table` 模式下，每张表使用独立的 `.ibd` 文件

### 2.2 创建表

```sql
CREATE TABLE [IF NOT EXISTS] table_name (
    column_name data_type [constraints],
    column_name data_type [constraints],
    ...
    [table_constraints]
) ENGINE = engine_name
  [CHARACTER SET charset_name]
  [COLLATE collation_name]
  [COMMENT 'table_comment'];
```

**约束类型**：
- `PRIMARY KEY`：主键约束
- `FOREIGN KEY`：外键约束
- `UNIQUE`：唯一性约束
- `NOT NULL`：非空约束
- `DEFAULT value`：默认值
- `AUTO_INCREMENT`：自增（MySQL 特有）
- `CHECK`：检查约束（MySQL 8.0.16+ 支持）

**示例：创建员工表**

```sql
CREATE TABLE employees (
    id INT AUTO_INCREMENT PRIMARY KEY COMMENT '员工ID',
    emp_no VARCHAR(10) NOT NULL UNIQUE COMMENT '工号，唯一',
    first_name VARCHAR(50) NOT NULL COMMENT '名',
    last_name VARCHAR(50) NOT NULL COMMENT '姓',
    email VARCHAR(100) NOT NULL COMMENT '邮箱',
    phone VARCHAR(20) COMMENT '电话',
    hire_date DATE NOT NULL COMMENT '入职日期',
    salary DECIMAL(10, 2) DEFAULT 0.00 COMMENT '薪资',
    department_id INT COMMENT '部门ID',
    manager_id INT COMMENT '直属上级ID',
    status ENUM('active', 'leave', 'resigned') DEFAULT 'active' COMMENT '状态',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    INDEX idx_last_name (last_name),
    INDEX idx_department_id (department_id),
    FOREIGN KEY (department_id) REFERENCES departments(id)
        ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB
  DEFAULT CHARSET=utf8mb4
  COLLATE=utf8mb4_unicode_ci
  COMMENT='员工表';
```

### 2.3 创建临时表

临时表是会话级别的表，当前会话结束后自动删除。

```sql
CREATE TEMPORARY TABLE temp_summary (
    category VARCHAR(50),
    total_amount DECIMAL(12, 2),
    order_count INT
);
```

**临时表的特点**：
- 仅在当前会话可见，会话断开后自动删除
- 可以与正式表同名，但实际指向临时表
- 适合存储中间计算结果

### 2.4 创建表的底层原理

当执行 `CREATE TABLE` 时，MySQL 会：

1. **解析 SQL**：解析器检查语法合法性
2. **检查权限**：当前用户是否有 CREATE 权限
3. **分配空间**：
   - 创建 `.frm` 文件：存储表结构定义
   - 如果使用 `file-per-table` 模式：创建 `.ibd` 文件存储数据
   - 如果使用共享表空间：在 `ibdata1` 中分配空间
4. **更新数据字典**：将表的元数据写入 `information_schema`

---

## 三、ALTER 语句详解与示例

### 3.1 修改表名

```sql
RENAME TABLE old_name TO new_name;
-- 或
ALTER TABLE old_name RENAME TO new_name;
```

### 3.2 添加列

```sql
ALTER TABLE table_name
    ADD COLUMN column_name data_type [constraints]
    [AFTER column_name | FIRST];
```

```sql
ALTER TABLE employees
    ADD COLUMN gender ENUM('M', 'F') DEFAULT 'M' COMMENT '性别'
    AFTER last_name;
```

### 3.3 修改列

```sql
ALTER TABLE table_name
    MODIFY COLUMN column_name new_data_type [new_constraints];
```

```sql
ALTER TABLE employees
    MODIFY COLUMN salary DECIMAL(12, 2) NOT NULL DEFAULT 0.00;
```

### 3.4 更改列名和类型

```sql
ALTER TABLE table_name
    CHANGE COLUMN old_column new_column data_type [constraints];
```

```sql
ALTER TABLE employees
    CHANGE COLUMN phone mobile VARCHAR(20) COMMENT '手机号码';
```

### 3.5 删除列

```sql
ALTER TABLE table_name DROP COLUMN column_name;
```

```sql
ALTER TABLE employees DROP COLUMN gender;
```

### 3.6 添加约束

```sql
-- 添加主键
ALTER TABLE table_name ADD PRIMARY KEY (column_name);

-- 添加唯一约束
ALTER TABLE table_name ADD UNIQUE INDEX index_name (column_name);

-- 添加外键
ALTER TABLE table_name
    ADD CONSTRAINT fk_name
    FOREIGN KEY (column_name)
    REFERENCES other_table(id);

-- 添加检查约束（MySQL 8.0.16+）
ALTER TABLE table_name ADD CHECK (condition);
```

### 3.7 删除约束

```sql
-- 删除主键
ALTER TABLE table_name DROP PRIMARY KEY;

-- 删除索引
ALTER TABLE table_name DROP INDEX index_name;

-- 删除外键
ALTER TABLE table_name DROP FOREIGN KEY constraint_name;
```

### 3.8 ALTER 操作的原理

**MySQL 的 ALTER TABLE 实现方式**：

MySQL 的 ALTER TABLE 采用**重建表**的方式（Online DDL 在某些操作上除外）：

1. 创建临时表 `#sql-xxxx`，结构为修改后的表结构
2. 逐行从原表复制数据到临时表
3. 创建新的索引
4. 用临时表替换原表
5. 删除原表和临时表

**Online DDL**（在线 DDL）：
MySQL 5.6+ 支持部分在线 DDL 操作，允许在 DDL 执行期间并发 DML：
- 添加/删除列（部分场景）
- 添加/删除索引
- 修改 `VARCHAR` 列长度（在特定范围内）

但是，`DROP COLUMN`、`CHANGE COLUMN` 等操作仍需要重建表，会严重影响性能。

**最佳实践**：在生产环境执行 DDL 操作时，应选择低峰期，并考虑使用 `pt-online-schema-change`（Percona Toolkit）或 `gh-ost` 等工具来减少锁表时间。

---

## 四、DROP、TRUNCATE、RENAME 语句

### 4.1 DROP 语句

DROP 用于删除数据库对象。

```sql
-- 删除数据库
DROP DATABASE [IF EXISTS] database_name;

-- 删除表
DROP TABLE [IF EXISTS] table_name;

-- 删除多个表
DROP TABLE [IF EXISTS] table1, table2, table3;

-- 删除索引
DROP INDEX index_name ON table_name;
```

**DROP 的原理与影响**：
- 删除表的 `.frm` 文件和数据文件
- 释放表占用的所有存储空间
- 表上的所有触发器也会被删除
- 立即生效，不可回滚（DDL 隐式提交）

**危险操作**：`DROP TABLE` 是最危险的 SQL 语句之一，生产环境应谨慎使用。建议：
- 操作前备份数据
- 使用 `DROP TABLE IF EXISTS` 避免脚本出错
- 对重要表，使用软删除（添加 `is_deleted` 字段）代替物理删除

### 4.2 TRUNCATE 语句

TRUNCATE 用于清空表中所有数据，但保留表结构。

```sql
TRUNCATE TABLE table_name;
```

**TRUNCATE 与 DELETE 的区别**：

| 特性 | TRUNCATE | DELETE FROM |
|------|----------|-------------|
| 是否回滚 | 不可回滚（DDL） | 可回滚（DML） |
| 速度 | 极快 | 逐行删除，较慢 |
| 自增 ID | 重置为起始值 | 保留当前最大值 |
| 触发器 | 不触发 DELETE 触发器 | 触发 DELETE 触发器 |
| WHERE 条件 | 不支持 | 支持 |
| 空间释放 | 立即释放 | 逐行标记，空间可能不立即释放 |

**底层原理**：
- `TRUNCATE` 实际上是删除原表并重新创建一个空表
- InnoDB 引擎下，`TRUNCATE` 通过重置自增计数器和删除数据页实现
- 对于大表，TRUNCATE 比 `DELETE` 快几个数量级

### 4.3 RENAME 语句

RENAME 用于重命名表。

```sql
RENAME TABLE old_name TO new_name;

-- 同时交换两张表的名称
RENAME TABLE table_a TO table_b, table_b TO table_a;
```

**RENAME 的底层原理**：
- 修改 `.frm` 文件中的表名信息
- 原子操作，不会中断正在进行的查询
- 表结构、索引、数据保持不变

---

## 五、INSERT 语句详解与示例

### 5.1 基本语法

```sql
INSERT INTO table_name (column1, column2, column3)
VALUES (value1, value2, value3);
```

### 5.2 单行插入

```sql
INSERT INTO employees (emp_no, first_name, last_name, email, hire_date, salary)
VALUES ('E001', 'John', 'Doe', 'john.doe@example.com', '2023-01-15', 5000.00);
```

### 5.3 多行插入

```sql
INSERT INTO employees (emp_no, first_name, last_name, email, hire_date, salary) VALUES
('E002', 'Jane', 'Smith', 'jane.smith@example.com', '2023-02-20', 5500.00),
('E003', 'Bob', 'Johnson', 'bob.johnson@example.com', '2023-03-10', 6000.00),
('E004', 'Alice', 'Williams', 'alice.williams@example.com', '2023-04-05', 5200.00);
```

### 5.4 省略列名

```sql
-- 必须为每列提供值，且值的顺序与表定义一致
INSERT INTO employees VALUES
(5, 'E005', 'Charlie', 'Brown', 'charlie.brown@example.com', '555-1234', '2023-05-01', 4800.00, NULL, NULL, 'active', NOW(), NOW());
```

### 5.5 从查询结果插入

```sql
-- 将已离职员工的信息归档到历史表
INSERT INTO employees_archive
SELECT * FROM employees WHERE status = 'resigned';
```

### 5.6 INSERT 的高级变体

**INSERT IGNORE**：忽略主键或唯一键冲突，跳过冲突行继续插入。

```sql
INSERT IGNORE INTO employees (id, emp_no, first_name) VALUES
(1, 'E001', 'John'),  -- id=1 已存在，跳过
(100, 'E100', 'New'); -- 正常插入
```

**ON DUPLICATE KEY UPDATE**：遇到唯一键冲突时更新已有记录。

```sql
INSERT INTO employees (id, emp_no, first_name, salary) VALUES
(1, 'E001', 'John', 6000.00)
ON DUPLICATE KEY UPDATE
    first_name = VALUES(first_name),
    salary = VALUES(salary);
```

**REPLACE INTO**：先删除旧记录，再插入新记录。

```sql
REPLACE INTO employees (id, emp_no, first_name, salary) VALUES
(1, 'E001', 'John', 6500.00);
```

### 5.7 INSERT 的底层原理

1. **解析阶段**：解析 SQL，检查表是否存在、列是否有效
2. **权限检查**：验证用户对表的 INSERT 权限
3. **约束检查**：
   - 主键/唯一键冲突检查
   - 外键约束检查
   - NOT NULL 约束检查
   - 数据类型和范围检查
4. **写入阶段**：
   - InnoDB：先写入 Buffer Pool（内存），再由后台线程刷盘
   - Redo Log：记录物理操作，保证崩溃恢复
   - Undo Log：记录反向操作，支持回滚
5. **索引更新**：维护所有相关的 B+ 树索引

---

## 六、UPDATE 语句详解与示例

### 6.1 基本语法

```sql
UPDATE table_name
SET column1 = value1, column2 = value2
[WHERE condition];
```

### 6.2 基本更新

```sql
-- 更新指定记录
UPDATE employees
SET salary = 6000.00
WHERE id = 1;

-- 更新多条记录
UPDATE employees
SET status = 'leave'
WHERE id IN (5, 6, 7);
```

### 6.3 批量更新

```sql
-- 根据条件批量更新
UPDATE employees
SET salary = salary * 1.1
WHERE department_id = 10 AND salary < 5000;
```

### 6.4 使用子查询更新

```sql
-- 将员工薪资更新为其部门平均薪资
UPDATE employees e
JOIN (
    SELECT department_id, AVG(salary) AS avg_sal
    FROM employees
    GROUP BY department_id
) d ON e.department_id = d.department_id
SET e.salary = d.avg_sal;
```

### 6.5 多表更新

```sql
-- 基于另一张表更新当前表
UPDATE orders o
JOIN products p ON o.product_id = p.id
SET o.total_price = o.quantity * p.price;
```

### 6.6 UPDATE 的底层原理

1. **查找阶段**：通过索引或全表扫描定位要更新的行
2. **加锁阶段**：对选中的行加排他锁（X Lock），防止并发冲突
3. **修改阶段**：
   - 修改 Buffer Pool 中的数据页
   - 记录 Redo Log（物理日志）
   - 记录 Undo Log（用于回滚和 MVCC）
   - 更新相关的 B+ 树索引
4. **提交阶段**：
   - 提交时刷写 Redo Log 到磁盘
   - Buffer Pool 中的数据页变为脏页，由后台线程异步刷盘

**MVCC（多版本并发控制）**：
InnoDB 通过 MVCC 实现读写不阻塞。每个事务有一个事务 ID，每行数据隐藏两个字段：
- `trx_id`：最后修改该行的事务 ID
- `roll_pointer`：指向 Undo Log 中旧版本数据的指针

读操作时，根据事务 ID 和隔离级别，通过 Undo Log 找到该行的历史版本。这样读操作不需要加锁，大大提升了并发性能。

---

## 七、DELETE 语句详解与示例

### 7.1 基本语法

```sql
DELETE FROM table_name [WHERE condition];
```

### 7.2 基本删除

```sql
-- 删除指定记录
DELETE FROM employees WHERE id = 10;

-- 删除多条记录
DELETE FROM employees WHERE status = 'resigned';
```

### 7.3 全部删除

```sql
-- 删除所有数据（逐行删除，不可回滚）
DELETE FROM employees;

-- 更快的方式（DDL，不可回滚）
TRUNCATE TABLE employees;
```

### 7.4 使用子查询删除

```sql
-- 删除没有订单的客户
DELETE FROM customers
WHERE id NOT IN (SELECT DISTINCT customer_id FROM orders);
```

### 7.5 多表删除

```sql
-- 基于另一张表删除
DELETE e FROM employees e
JOIN departments d ON e.department_id = d.id
WHERE d.name = ' discontinued';
```

### 7.6 删除的底层原理

1. **查找阶段**：定位要删除的行
2. **加锁阶段**：对选中的行加排他锁
3. **删除阶段**：
   - InnoDB：标记删除（在数据页中设置删除标志），空间不会立即释放
   - 记录 Redo Log 和 Undo Log
   - 更新 B+ 树索引（从索引中移除对应条目）
4. **提交后**：
   - Purge 线程异步清理被标记删除的行，释放空间
   - 清理 Undo Log 中不再需要的历史版本

**为什么 DELETE 后空间不立即释放？**

InnoDB 的删除采用**延迟删除**机制：
- 数据页中被删除的记录仅被标记为"已删除"，空间仍被该页占用
- Purge 线程负责真正清理这些记录，回收空间
- 清理的空间会留在表的表空间中，供后续插入使用，而不是立即归还操作系统
- 如果想立即归还空间给操作系统，需要执行 `OPTIMIZE TABLE`

---

## 八、SELECT 语句详解与示例

### 8.1 基本语法

```sql
SELECT [DISTINCT] select_list
FROM table_name
[WHERE condition]
[GROUP BY group_columns]
[HAVING condition]
[ORDER BY order_columns [ASC | DESC]]
[LIMIT offset, count];
```

### 8.2 查询所有列

```sql
SELECT * FROM employees;
```

**注意**：生产环境应避免使用 `SELECT *`，而是明确指定所需列，原因：
- 减少网络传输量
- 降低内存消耗
- 避免表结构变更导致的应用层错误
- 明确表达查询意图

### 8.3 查询指定列

```sql
SELECT id, emp_no, first_name, last_name, salary
FROM employees;
```

### 8.4 使用列别名

```sql
SELECT
    first_name AS '名',
    last_name AS '姓',
    CONCAT(first_name, ' ', last_name) AS '全名',
    salary * 12 AS '年薪'
FROM employees;
```

### 8.5 使用 DISTINCT 去重

```sql
-- 查询所有不同的部门 ID
SELECT DISTINCT department_id FROM employees;

-- 查询不重复的部门和状态组合
SELECT DISTINCT department_id, status FROM employees;
```

**DISTINCT 的原理**：
- 对结果集进行排序并去重
- 大数据量下性能较差，因为需要排序操作
- 如果已知某列本身唯一，不应使用 DISTINCT

### 8.6 WHERE 子句与条件查询

WHERE 子句用于过滤行，在数据返回给客户端之前进行过滤。

```sql
SELECT * FROM employees
WHERE salary > 5000
  AND status = 'active'
  AND hire_date >= '2023-01-01';
```

**WHERE 子句的执行顺序**：
MySQL 的 WHERE 子句从左到右评估条件。为了利用索引，应将高选择性的条件（能过滤更多行的条件）放在前面。

```sql
-- 推荐：先用索引列过滤
SELECT * FROM orders WHERE customer_id = 100 AND order_date > '2024-01-01';

-- 如果 order_date 有索引但 customer_id 没有，则调整顺序
SELECT * FROM orders WHERE order_date > '2024-01-01' AND customer_id = 100;
```

### 8.7 ORDER BY 排序

```sql
-- 升序（默认）
SELECT * FROM employees ORDER BY salary ASC;

-- 降序
SELECT * FROM employees ORDER BY salary DESC;

-- 多列排序
SELECT * FROM employees ORDER BY department_id ASC, salary DESC;

-- 使用列别名排序
SELECT first_name, last_name, salary * 12 AS annual_salary
FROM employees
ORDER BY annual_salary DESC;

-- 使用列序号排序（不推荐）
SELECT * FROM employees ORDER BY 3;
```

**ORDER BY 的原理**：
- 如果排序条件使用索引列，MySQL 可能利用索引的有序性，避免额外排序
- 如果没有可用索引，MySQL 使用 filesort 算法：
  - 内存排序：数据量小于 `sort_buffer_size` 时，在内存中快速排序
  - 磁盘排序：数据量超过 `sort_buffer_size` 时，使用临时文件归并排序
- 生产环境应尽量避免磁盘排序，可通过 `EXPLAIN` 查看执行计划中的 `Using filesort` 提示

### 8.8 LIMIT 限制结果集

```sql
-- 获取前 N 条记录
SELECT * FROM employees LIMIT 10;

-- 从第 offset 条开始，获取 count 条记录
SELECT * FROM employees LIMIT 5, 10;

-- MySQL 8.0 标准语法
SELECT * FROM employees LIMIT 10 OFFSET 5;
```

**分页查询的性能问题**：

```sql
-- 较差：深分页时性能差
SELECT * FROM orders LIMIT 1000000, 10;

-- 优化方案 1：使用子查询先获取主键
SELECT * FROM orders
WHERE id IN (
    SELECT id FROM orders ORDER BY id LIMIT 1000000, 10
);

-- 优化方案 2：使用游标分页
SELECT * FROM orders WHERE id > last_id ORDER BY id LIMIT 10;
```

### 8.9 运算符与表达式

**算术运算符**：

```sql
SELECT
    salary,
    salary + 500 AS '加薪',
    salary - 200 AS '扣款',
    salary * 12 AS '年薪',
    salary / 12 AS '月薪',
    salary DIV 100 AS '百元部分',
    salary MOD 100 AS '余数'
FROM employees;
```

**比较运算符**：

```sql
SELECT * FROM employees
WHERE
    salary = 5000       -- 等于
    OR salary != 5000   -- 不等于（也可写作 <>）
    OR salary > 5000    -- 大于
    OR salary < 5000    -- 小于
    OR salary >= 5000   -- 大于等于
    OR salary <= 5000;  -- 小于等于
```

**逻辑运算符**：

```sql
SELECT * FROM employees
WHERE salary > 5000
  AND status = 'active'
  OR (department_id = 10 AND salary > 4000);
```

**特殊运算符**：

```sql
-- LIKE：模糊匹配
SELECT * FROM employees WHERE first_name LIKE 'J%';

-- IN：匹配列表中的值
SELECT * FROM employees WHERE department_id IN (10, 20, 30);

-- BETWEEN：范围匹配
SELECT * FROM employees WHERE salary BETWEEN 4000 AND 6000;

-- IS NULL / IS NOT NULL：空值判断
SELECT * FROM employees WHERE phone IS NULL;

-- REGEXP：正则匹配
SELECT * FROM employees WHERE email REGEXP '^[a-z]+@example\\.com$';
```

### 8.10 LIKE 模糊查询

LIKE 用于基于模式的字符串匹配。

**通配符**：
- `%`：匹配任意长度的字符串（包括零长度）
- `_`：匹配单个字符

```sql
-- 以 J 开头
SELECT * FROM employees WHERE first_name LIKE 'J%';

-- 以 son 结尾
SELECT * FROM employees WHERE last_name LIKE '%son';

-- 包含 smith
SELECT * FROM employees WHERE last_name LIKE '%smith%';

-- 第二个字符为 a
SELECT * FROM employees WHERE first_name LIKE '_a%';
```

**LIKE 的索引使用**：
- `LIKE 'J%'`：前缀匹配，可以使用索引
- `LIKE '%son'`：后缀匹配，无法使用索引（全表扫描）
- `LIKE '%smith%'`：中间匹配，无法使用索引

如果需要高性能的模糊搜索，应考虑使用全文索引（Fulltext Index）或搜索引擎（如 Elasticsearch）。

### 8.11 IN 条件

```sql
-- 等价于多个 OR 条件
SELECT * FROM employees
WHERE department_id IN (10, 20, 30);

-- 等价写法
SELECT * FROM employees
WHERE department_id = 10 OR department_id = 20 OR department_id = 30;
```

**IN 的优化**：
- IN 列表中的值数量有限制，过多可能影响性能
- IN 中的值如果全部来自同一个索引列，MySQL 可以使用索引
- MySQL 对 IN 列表进行排序后使用二分查找

### 8.12 BETWEEN 条件

```sql
-- 闭区间 [value1, value2]
SELECT * FROM employees
WHERE salary BETWEEN 4000 AND 6000;

-- 等价写法
SELECT * FROM employees
WHERE salary >= 4000 AND salary <= 6000;
```

**BETWEEN 的注意事项**：
- `BETWEEN value1 AND value2` 是闭区间，包含两端值
- 日期类型使用 BETWEEN 时，注意时间部分
- `WHERE date BETWEEN '2024-01-01' AND '2024-01-31'` 实际等价于 `WHERE date >= '2024-01-01' AND date <= '2024-01-31'`，包括了 1月31日 当天的所有时间点

### 8.13 IS NULL 条件

```sql
-- 查询电话为空的员工
SELECT * FROM employees WHERE phone IS NULL;

-- 查询电话不为空的员工
SELECT * FROM employees WHERE phone IS NOT NULL;
```

**NULL 的特殊性**：
- NULL 不等于任何值，包括 NULL 本身
- 不能使用 `=` 或 `!=` 比较 NULL
- `SELECT NULL = NULL` 结果为 NULL（不是 TRUE 或 FALSE）
- 必须使用 `IS NULL` 或 `IS NOT NULL` 来判断

**COALESCE 函数**：返回第一个非 NULL 的值。

```sql
SELECT COALESCE(phone, '未填写') AS phone_display FROM employees;
```

---

## 九、SQL 执行流程与原理

### 9.1 客户端执行流程

```
客户端 → 解析器 → 优化器 → 执行器 → 存储引擎
```

**详细步骤**：

1. **客户端发送 SQL**：通过 TCP 连接发送 SQL 文本到服务端
2. **解析器解析**：
   - 词法分析：将 SQL 文本拆分为 token
   - 语法分析：构建语法树
   - 语义分析：检查列、表是否存在，权限是否满足
3. **优化器生成执行计划**：
   - 确定访问顺序
   - 选择索引
   - 选择连接算法
   - 生成成本最低的执行计划
4. **执行器执行**：
   - 按照执行计划调用存储引擎 API
   - 获取数据行
5. **返回结果**：将结果集返回给客户端

### 9.2 慢查询分析

```sql
-- 开启慢查询日志
SET GLOBAL slow_query_log = 'ON';
SET GLOBAL long_query_time = 1;
SET GLOBAL slow_query_log_file = '/var/log/mysql/slow.log';

-- 查看执行计划
EXPLAIN SELECT * FROM employees WHERE department_id = 10;

-- 详细执行计划（MySQL 8.0+）
EXPLAIN ANALYZE SELECT * FROM employees WHERE department_id = 10;
```

**EXPLAIN 输出关键字段**：
- `type`：访问类型，性能从优到差：`system > const > eq_ref > ref > range > index > ALL`
- `key`：实际使用的索引
- `rows`：预估需要扫描的行数
- `Extra`：额外信息，重点关注：
  - `Using index`：覆盖索引，性能优秀
  - `Using where`：在存储引擎层过滤
  - `Using filesort`：额外排序，需要优化
  - `Using temporary`：使用临时表，需要优化

### 9.3 SQL 编写最佳实践

1. **使用参数化查询**：防止 SQL 注入
2. **避免 `SELECT *`**：明确指定所需列
3. **使用 LIMIT 限制结果集**：避免返回过多数据
4. **合理使用索引**：WHERE、JOIN、ORDER BY 中的列应使用索引
5. **避免在索引列上使用函数**：导致索引失效
6. **合理使用范围查询**：避免在一个查询中使用过多的范围条件
7. **大数据量操作分批执行**：避免长事务和锁等待

---

## 本章小结

本章系统学习了 SQL 基础语法，涵盖了 SQL 的四大分类（DDL、DML、DCL、TCL），以及核心的增删改查操作。关键要点：

1. **DDL 语句**：CREATE、ALTER、DROP、TRUNCATE、RENAME，理解其重建表的实现原理
2. **DML 语句**：INSERT、UPDATE、DELETE、SELECT，掌握 MVCC 和事务日志的底层机制
3. **查询条件**：WHERE、ORDER BY、LIMIT、LIKE、IN、BETWEEN、IS NULL 的使用场景和性能影响
4. **执行流程**：理解 SQL 从解析到执行的完整流程，使用 EXPLAIN 分析性能

在接下来的章节中，我们将深入学习 MySQL 的数据类型与表结构设计。