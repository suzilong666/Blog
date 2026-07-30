# MySQL 事务与 ACID 特性：从 MVCC 到两阶段提交

## 一、事务的概念与必要性

### 1.1 什么是事务

事务（Transaction）是一组逻辑相关的数据库操作，这些操作要么**全部成功执行**，要么**全部失败回滚**，是数据库中最小的一致性单元。

事务的本质是将多个独立的操作包装成一个不可分割的整体，确保数据在任何情况下都能保持一致性。

### 1.2 事务的必要性：从银行转账说起

假设一个经典的银行转账场景：用户 A 向用户 B 转账 1000 元，需要执行以下操作：

```sql
-- 操作 1：A 账户扣减 1000 元
UPDATE accounts SET balance = balance - 1000 WHERE id = 'A';

-- 操作 2：B 账户增加 1000 元
UPDATE accounts SET balance = balance + 1000 WHERE id = 'B';
```

如果没有事务保护，可能出现以下问题：

```
时间线:
  T1: 操作 1 成功，A 扣减了 1000 元
  T2: 系统崩溃，操作 2 未执行
  结果: A 损失 1000 元，B 未收到，钱"消失"了
```

**事务的必要性：** 在现实业务中，许多操作需要保证原子性——要么全部成功，要么全部失败。事务就是为此而生的。

### 1.3 事务的发展历程

| 阶段 | 技术 | 特点 |
|------|------|------|
| 1970s | 提出事务概念 | Jim Gray 等人奠定理论基础 |
| 1983 | System R 实现 | IBM 实验系统首次实现完整事务 |
| 1990s | InnoDB 引擎 | MySQL 引入支持事务的存储引擎 |
| 2000s | MVCC 普及 | 多版本并发控制成为主流实现 |
| 2010s | NoSQL 挑战 | 分布式事务成为新研究方向 |

---

## 二、ACID 特性详解

ACID 是事务的四个基本特性，由 Jim Gray 于 1970 年代提出，是衡量事务系统可靠性的标准。

### 2.1 原子性（Atomicity）

**定义：** 事务中的所有操作要么全部成功，要么全部失败，不存在中间状态。

**核心问题：** 如何在系统崩溃时保证"要么全做，要么全不做"？

**实现机制：** 通过 **Undo Log（回滚日志）** 实现。

```
事务执行过程:
  BEGIN
    → 操作1: UPDATE → 记录 Undo Log（旧值）
    → 操作2: INSERT → 记录 Undo Log（用于删除）
    → 操作3: DELETE → 记录 Undo Log（用于恢复）
  COMMIT / ROLLBACK
  
如果 ROLLBACK:
  → 读取 Undo Log
  → 逆向执行所有操作，恢复到事务开始前的状态
```

**原子性示意图：**

```
        ┌───────────────┐
        │   事务开始     │
        └───────┬───────┘
                │
    ┌───────────▼───────────┐
    │  操作1  │  操作2  │  操作3  │
    │ (成功)  │ (成功)  │ (失败)  │
    └───────────┬───────────┘
                │
        ┌───────▼───────┐
        │   事务回滚     │
        │  (使用Undo Log) │
        └───────────────┘
```

### 2.2 一致性（Consistency）

**定义：** 事务执行前后，数据库必须从一个一致性状态转移到另一个一致性状态。

**核心问题：** 如何保证事务不会破坏数据的完整性约束？

**实现机制：** 原子性 + 隔离性 + 持久性共同保证一致性。

**一致性的体现：**

```sql
-- 约束示例
ALTER TABLE accounts ADD CONSTRAINT chk_balance CHECK (balance >= 0);

-- 事务中的操作
BEGIN;
UPDATE accounts SET balance = balance - 2000 WHERE id = 'A';  -- A 余额 1000，扣减后 -1000
-- 此时事务被回滚，因为违反了 CHECK 约束
-- 数据库保持在一致性状态
COMMIT;
```

**一致性是事务的最终目标：** 原子性、隔离性、持久性都是为了保证一致性而存在的。

### 2.3 隔离性（Isolation）

**定义：** 并发执行的事务之间互不干扰，一个事务的中间状态对其他事务不可见。

**核心问题：** 如何在并发场景下保证事务的独立性？

**实现机制：** 通过 **MVCC（多版本并发控制）** 和 **锁机制** 实现。

**隔离性的多级实现：**

| 隔离级别 | 实现方式 |
|---------|---------|
| 读未提交 | 几乎不加锁 |
| 读已提交 | 语句级快照 + 行锁 |
| 可重复读 | 事务级快照 + Next-Key Lock |
| 串行化 | 强制加锁，模拟串行执行 |

### 2.4 持久性（Durability）

**定义：** 一旦事务提交成功，其对数据库的修改就是永久性的，即使系统崩溃也不会丢失。

**核心问题：** 如何在系统崩溃后恢复已提交的数据？

**实现机制：** 通过 **Redo Log（重做日志）** 实现。

```
事务提交过程:
  BEGIN
    → 执行操作（修改内存中的数据页）
    → 生成 Redo Log（记录物理修改操作）
  COMMIT
    → 将 Redo Log 写入磁盘（fsync）
    → 即使此时系统崩溃，Redo Log 已持久化
    → 重启后通过 Redo Log 恢复数据
```

---

## 三、事务的四种隔离级别

### 3.1 并发问题的产生

在并发事务环境中，可能出现以下三类问题：

#### 脏读（Dirty Read）

事务 A 读取了事务 B **尚未提交**的数据。

```
时间线:
  T1: 事务 A BEGIN
  T2: 事务 B BEGIN
  T3: 事务 B UPDATE accounts SET balance = balance + 500 WHERE id = 1;  (未提交)
  T4: 事务 A SELECT balance FROM accounts WHERE id = 1;  → 读到 B 未提交的新值
  T5: 事务 B ROLLBACK  (回滚了修改)
  T6: 事务 A 基于脏数据继续操作 → 数据不一致！
```

#### 不可重复读（Non-Repeatable Read）

同一事务内，两次读取**同一行数据**得到不同的结果（被其他事务修改并提交）。

```
时间线:
  T1: 事务 A BEGIN
  T2: 事务 A SELECT balance FROM accounts WHERE id = 1;  → 1000
  T3: 事务 B BEGIN
  T4: 事务 B UPDATE accounts SET balance = 1500 WHERE id = 1;
  T5: 事务 B COMMIT
  T6: 事务 A SELECT balance FROM accounts WHERE id = 1;  → 1500 (变了！)
```

#### 幻读（Phantom Read）

同一事务内，两次查询**满足相同条件的结果集**得到不同的行数（被其他事务新增/删除了行）。

```
时间线:
  T1: 事务 A BEGIN
  T2: 事务 A SELECT COUNT(*) FROM accounts WHERE balance > 5000;  → 3 行
  T3: 事务 B BEGIN
  T4: 事务 B INSERT INTO accounts(id, balance) VALUES(4, 6000);
  T5: 事务 B COMMIT
  T6: 事务 A SELECT COUNT(*) FROM accounts WHERE balance > 5000;  → 4 行 (变了！)
```

### 3.2 四种隔离级别详解

#### 读未提交（Read Uncommitted）

- **定义：** 一个事务可以读取另一个事务**尚未提交**的数据
- **解决问题：** 无（甚至会产生脏读）
- **实现方式：** 不加锁，直接读取最新数据
- **使用场景：** 极少使用，仅作为理论存在

```sql
SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;
```

| 并发问题 | 是否解决 |
|---------|---------|
| 脏读 | ❌ |
| 不可重复读 | ❌ |
| 幻读 | ❌ |

#### 读已提交（Read Committed）

- **定义：** 一个事务只能读取另一个事务**已提交**的数据
- **解决问题：** 脏读
- **实现方式：** 语句级快照 + 行级锁
- **特点：** 每次 SELECT 都生成新的快照，同一事务内不同时间读取的数据可能不同

```sql
SET TRANSACTION ISOLATION LEVEL READ COMMITTED;
```

| 并发问题 | 是否解决 |
|---------|---------|
| 脏读 | ✅ |
| 不可重复读 | ❌ |
| 幻读 | ❌ |

**InnoDB 在 RC 级别下的特殊行为：**
- 不使用 Gap Lock（间隙锁）
- 可以部分解决幻读（但不完全解决）
- 语句级快照，每次查询看到的数据可能不同

#### 可重复读（Repeatable Read）⭐

- **定义：** 同一事务内多次读取**同一行**数据结果一致
- **解决问题：** 脏读、不可重复读
- **实现方式：** 事务级快照 + Next-Key Lock
- **特点：** 这是 InnoDB 的**默认隔离级别**

```sql
SET TRANSACTION ISOLATION LEVEL REPEATABLE READ;
```

| 并发问题 | 是否解决 |
|---------|---------|
| 脏读 | ✅ |
| 不可重复读 | ✅ |
| 幻读 | ✅（大部分场景） |

**InnoDB 在 RR 级别下的幻读处理：**
- 通过 **Next-Key Lock（临键锁）** 解决大部分幻读问题
- 对于快照读，通过 MVCC 的 ReadView 机制保证一致性
- 对于当前读，通过加锁防止其他事务在范围内插入

#### 串行化（Serializable）

- **定义：** 强制所有事务串行执行
- **解决问题：** 全部（脏读、不可重复读、幻读）
- **实现方式：** 强制加锁 + 死锁检测
- **特点：** 性能最差，但一致性最强

```sql
SET TRANSACTION ISOLATION LEVEL SERIALIZABLE;
```

| 并发问题 | 是否解决 |
|---------|---------|
| 脏读 | ✅ |
| 不可重复读 | ✅ |
| 幻读 | ✅ |

### 3.3 隔离级别对比总结

| 隔离级别 | 脏读 | 不可重复读 | 幻读 | 性能 | InnoDB 默认 |
|---------|------|-----------|------|------|------------|
| 读未提交 | ❌ | ❌ | ❌ | 最高 | - |
| 读已提交 | ✅ | ❌ | ❌ | 较高 | - |
| **可重复读** | ✅ | ✅ | ✅* | 中等 | **✅** |
| 串行化 | ✅ | ✅ | ✅ | 最低 | - |

> *可重复读在 InnoDB 中通过 Next-Key Lock 基本解决了幻读问题。

### 3.4 隔离级别的设置

```sql
-- 查看当前隔离级别
SELECT @@global.tx_isolation;
SELECT @@session.tx_isolation;

-- 设置全局隔离级别
SET GLOBAL TRANSACTION ISOLATION LEVEL REPEATABLE READ;

-- 设置会话级隔离级别
SET SESSION TRANSACTION ISOLATION LEVEL READ COMMITTED;

-- 在启动时配置
# mysqld --transaction-isolation=REPEATABLE-READ
```

---

## 四、快照读与当前读

### 4.1 两种读取方式

InnoDB 中存在两种读取方式，它们在隔离级别中的表现完全不同：

#### 快照读（Snapshot Read / 快照读）

- **定义：** 读取的是数据的历史版本（快照），不读取最新的已提交版本
- **实现：** 通过 MVCC 的 ReadView 机制
- **适用场景：** 普通 SELECT 语句（不加锁的查询）

```sql
-- 快照读示例
SELECT * FROM accounts WHERE balance > 5000;  -- 不加锁的查询
```

#### 当前读（Current Read）

- **定义：** 读取的是数据的**最新版本**，并且对读取的数据加锁
- **实现：** 通过行锁 + 锁等待
- **适用场景：** 特殊的 SELECT 语句和写操作

```sql
-- 当前读示例
SELECT * FROM accounts WHERE id = 1 FOR UPDATE;     -- 加排他锁
SELECT * FROM accounts WHERE id = 1 LOCK IN SHARE MODE;  -- 加共享锁
UPDATE accounts SET balance = balance + 100 WHERE id = 1;  -- 写操作
DELETE FROM accounts WHERE id = 1;  -- 删除操作
INSERT INTO accounts(id, balance) VALUES(1, 1000);  -- 插入操作
```

### 4.2 不同隔离级别下的读取行为

#### 在可重复读级别：

| 操作类型 | 快照读 | 当前读 |
|---------|--------|--------|
| 普通 SELECT | 读取事务开始时的快照（版本） | - |
| SELECT ... FOR UPDATE | - | 读取最新版本并加锁 |
| UPDATE / DELETE | - | 读取最新版本并加锁 |

```
示例场景（RR 级别）:

数据初始状态: id=1, balance=1000

事务 A:
  BEGIN;                        -- 生成 ReadView
  SELECT balance FROM accounts WHERE id = 1;   → 1000  (快照读，版本1)
  
事务 B:
  BEGIN;
  UPDATE accounts SET balance = 2000 WHERE id = 1;
  COMMIT;

事务 A（继续）:
  SELECT balance FROM accounts WHERE id = 1;   → 1000  (仍然是快照，版本1)
  SELECT balance FROM accounts WHERE id = 1 FOR UPDATE;  → 2000  (当前读，最新版本)
  UPDATE accounts SET balance = balance + 100 WHERE id = 1;  → (基于最新值2000+100)
  SELECT balance FROM accounts WHERE id = 1;   → 2100  (快照已更新，因为当前读修改过数据)
  COMMIT;
```

---

## 五、MVCC 多版本并发控制原理

### 5.1 MVCC 概述

MVCC（Multi-Version Concurrency Control）是 InnoDB 实现**非锁定读**的核心技术。它的基本思想是：为每行数据保存多个版本，读操作选择合适的版本读取，写操作创建新版本，从而避免读写冲突。

### 5.2 MVCC 的三大核心组件

#### 1. 隐藏字段

InnoDB 为每行数据添加了两个隐藏字段：

```
┌────┬───────────────┬──────────────┬─────────────┬──────┐
│ id │ balance       │ trx_id       │ roll_pointer │ ...  │
├────┼───────────────┼──────────────┼─────────────┼──────┤
│ 1  │ 2000          │ 100          │ 指向Undo Log │ ...  │
└────┴───────────────┴──────────────┴─────────────┴──────┘
```

- `trx_id`：最近一次修改该行的事务 ID
- `roll_pointer`：指向 Undo Log 中该行旧版本的指针

#### 2. Undo Log 版本链

当一行数据被多次修改时，通过 `roll_pointer` 形成一个版本链：

```
版本链:
  v3: balance=2000, trx_id=100, roll_pointer → v2
  v2: balance=1500, trx_id=80,  roll_pointer → v1
  v1: balance=1000, trx_id=50,  roll_pointer → NULL
  
Undo Log 中保存了每个版本的旧值
```

#### 3. ReadView

ReadView 是事务开启时生成的读视图，包含以下信息：

```
ReadView 结构:
  ├── m_ids:        活跃事务 ID 列表（未提交的事务）
  ├── min_trx_id:   m_ids 中最小的事务 ID
  ├── max_trx_id:   下一个即将分配的事务 ID（m_ids 最大值 + 1）
  └── creator_trx_id: 创建 ReadView 的事务 ID
```

### 5.3 可见性判断规则

对于某行数据的版本 `(trx_id)`，判断其对当前事务是否可见：

| 条件 | 可见性 | 说明 |
|------|--------|------|
| `trx_id == creator_trx_id` | 可见 | 当前事务自己修改的 |
| `trx_id < min_trx_id` | 可见 | 在 ReadView 生成前已提交 |
| `min_trx_id <= trx_id < max_trx_id` | 不可见 | 在活跃事务列表中，可能未提交 |
| `trx_id >= max_trx_id` | 不可见 | 在 ReadView 生成后才开启的事务 |

#### 可见性判断流程

```
检查版本 v 的 trx_id:
  │
  ├── trx_id < min_trx_id ?
  │   └── 是 → ✅ 可见（版本已提交）
  │
  ├── trx_id >= max_trx_id ?
  │   └── 是 → ❌ 不可见（版本太新）
  │
  ├── trx_id in m_ids ?
  │   └── 是 → ❌ 不可见（事务还未提交）
  │
  └── 不在 m_ids 中 ?
      └── 是 → ✅ 可见（版本已提交）
```

### 5.4 不同隔离级别下的 ReadView

#### 读已提交（Read Committed）

- **每次 SELECT 都生成新的 ReadView**
- 因此同一事务内两次 SELECT 可能看到不同结果（不可重复读）

```
事务 A:
  BEGIN;
  SELECT * FROM accounts WHERE id=1;  -- 生成 ReadView1，读到 balance=1000
  
事务 B:
  UPDATE accounts SET balance=2000 WHERE id=1;
  COMMIT;
  
事务 A（继续）:
  SELECT * FROM accounts WHERE id=1;  -- 生成 ReadView2，读到 balance=2000（变了！）
```

#### 可重复读（Repeatable Read）

- **事务内第一次 SELECT 生成 ReadView，后续复用**
- 因此同一事务内多次 SELECT 看到相同结果（可重复读）

```
事务 A:
  BEGIN;
  SELECT * FROM accounts WHERE id=1;  -- 生成 ReadView，读到 balance=1000
  
事务 B:
  UPDATE accounts SET balance=2000 WHERE id=1;
  COMMIT;
  
事务 A（继续）:
  SELECT * FROM accounts WHERE id=1;  -- 复用同一个 ReadView，仍然读到 balance=1000
```

### 5.5 MVCC 读取示例

假设存在以下事务和数据：

```
初始数据: id=1, balance=1000, trx_id=50

事务 ID 分配:
  trx_id 50: 已提交（初始数据）
  trx_id 80: 已提交（将 balance 改为 1500）
  trx_id 100: 活跃中（将 balance 改为 2000）
  trx_id 120: 活跃中（新事务）

事务 120 的 ReadView:
  m_ids = [100, 120]
  min_trx_id = 100
  max_trx_id = 121
  creator_trx_id = 120
```

```
版本链:
  v3: balance=2000, trx_id=100  → trx_id 在 m_ids 中 → ❌ 不可见
  v2: balance=1500, trx_id=80   → trx_id < min_trx_id → ✅ 可见
  v1: balance=1000, trx_id=50   → （不需要再看了，v2 已可见）

结果: 事务 120 读到 balance=1500
```

---

## 六、Undo Log 与事务回滚

### 6.1 Undo Log 概述

Undo Log（回滚日志）是实现事务**原子性**的关键组件，它记录了数据修改前的旧值，用于事务回滚和 MVCC。

### 6.2 Undo Log 的分类

| 类型 | 说明 | 生命周期 |
|------|------|---------|
| insert undo log | INSERT 操作生成 | 事务提交后立即删除 |
| update undo log | UPDATE/DELETE 操作生成 | 供 MVCC 使用，在没有读事务引用时才删除 |

### 6.3 Undo Log 的生成过程

```sql
-- 初始数据
INSERT INTO accounts(id, balance) VALUES(1, 1000);
-- 生成: (insert undo log: 对应表中行的删除操作)

-- 更新数据
BEGIN;
UPDATE accounts SET balance = 2000 WHERE id = 1;
-- 生成: (update undo log: balance: 1000 → 2000，记录旧值 1000)

-- 继续更新
UPDATE accounts SET balance = 3000 WHERE id = 1;
-- 生成: (update undo log: balance: 2000 → 3000，记录旧值 2000)

ROLLBACK;
-- 读取 Undo Log，逆向执行: balance 3000 → 2000 → 1000
```

### 6.4 Undo Log 的存储

```
Undo Log 的存储位置:
  ├── 系统表空间（ibdata1）
  │   └── 默认存储位置
  ├── 独立 undo 表空间（undo tablespace）
  │   └── MySQL 5.7+ 支持，可配置路径
  │
  │  undo_001: 存放回滚段（rollback segment）
  │  undo_002: 存放回滚段
  │  ...
```

```sql
-- 查看 Undo Log 配置
SHOW VARIABLES LIKE 'innodb_undo_tablespaces';
SHOW VARIABLES LIKE 'innodb_undo_directory';

-- 查看回滚段信息
SELECT * FROM information_schema.INNODB_ROLLBACK_SEGMENTS;
```

### 6.5 Purge 线程与 Undo Log 清理

Undo Log 不会在事务提交后立即删除，而是由后台 **Purge 线程** 异步清理：

```
Purge 线程工作流程:
  1. 查找没有活跃读事务引用的 Undo Log 版本
  2. 判断该版本是否可以被清理（是否在任何 ReadView 中可见）
  3. 清理可删除的 Undo Log 版本
  4. 循环执行，定期唤醒
```

```sql
-- 查看 Purge 状态
SHOW ENGINE INNODB STATUS\G
-- 关注 "History list length"（越大说明待清理的 Undo Log 越多）
```

---

## 七、Redo Log 与持久性保证

### 7.1 Redo Log 概述

Redo Log（重做日志）是实现事务**持久性**的关键组件。它记录了数据页的**物理修改操作**，用于在系统崩溃后恢复数据。

### 7.2 Redo Log 的特点

- **物理日志：** 记录的是数据页的物理修改（"在页 5 的偏移 100 处写入值 2000"）
- **循环写入：** Redo Log 是固定大小的文件，写满后从头覆盖
- **顺序写：** Redo Log 在磁盘上顺序写入，性能很高
- **WAL 协议：** Write-Ahead Logging，先写日志，再写数据页

### 7.3 Redo Log 的存储结构

```
Redo Log 文件:
  ib_logfile0: 0 ~ 512MB
  ib_logfile1: 0 ~ 512MB
  
每个文件内部:
  ┌──────────────────────────────────────────────────────┐
  │ 日志记录1 │ 日志记录2 │ ... │ 日志记录N │ 空白区域 │
  └──────────────────────────────────────────────────────┘
  
日志记录示例:
  [页号: 5] [偏移: 100] [旧值: 1000] [新值: 2000]
  → 表示在页 5 的偏移 100 处，将值从 1000 修改为 2000
```

### 7.4 Redo Log 的写入流程

```
执行 UPDATE 操作:
  UPDATE accounts SET balance = 2000 WHERE id = 1;

步骤 1: 读取数据页到 Buffer Pool（如果不在内存）
  Buffer Pool: [页5: balance=1000]

步骤 2: 修改 Buffer Pool 中的数据
  Buffer Pool: [页5: balance=2000]  ← 内存中的修改，称为"脏页"

步骤 3: 生成 Redo Log 并写入 Log Buffer
  Log Buffer: [页5, 偏移100, 旧值1000, 新值2000]

步骤 4: 事务提交时，将 Redo Log 刷入磁盘
  Redo Log File: [页5, 偏移100, 旧值1000, 新值2000]
  → 此时数据已持久化，即使系统崩溃也不会丢失

步骤 5: 异步将 Buffer Pool 中的修改刷入磁盘
  Data File: [页5: balance=2000]  ← 最终数据文件一致
```

### 7.5 Redo Log 与崩溃恢复

```
正常运行时:
  Buffer Pool → Redo Log（磁盘） → 数据文件（磁盘）
  
系统崩溃后重启:
  1. 检查 Redo Log，找到所有已提交事务的日志记录
  2. 重新执行这些日志记录（"重做"）
  3. 将数据恢复到崩溃前的一致状态
  4. 业务正常运行
```

### 7.6 Redo Log 配置

```sql
-- 查看 Redo Log 配置
SHOW VARIABLES LIKE 'innodb_log%';

-- 重要参数:
-- innodb_log_file_size: 每个 Redo Log 文件大小（默认 48MB，最大 512GB）
-- innodb_log_files_in_group: Redo Log 文件数量（默认 2）
-- innodb_flush_log_at_trx_commit: 刷盘策略
```

### 7.7 刷盘策略对比

| innodb_flush_log_at_trx_commit | 行为 | 持久性 | 性能 |
|------|------|--------|------|
| 0 | 每秒刷盘一次 | ❌ 可能丢失 1 秒数据 | 最高 |
| 1 | 每次事务提交都刷盘 | ✅ 不丢失 | 中等 |
| 2 | 每次提交写入缓存，每秒刷盘 | ⚠️ 可能丢失 1 秒数据 | 较高 |

**推荐配置：** `innodb_flush_log_at_trx_commit = 1`（默认值，保证持久性）

---

## 八、Double Write 机制

### 8.1 什么是 Double Write

Double Write（双写）是 InnoDB 为解决**部分写失效**问题而引入的保护机制。

### 8.2 部分写失效问题

当 InnoDB 刷一个数据页（16KB）到磁盘时，如果只写了一半就发生崩溃，会导致页损坏。例如：

```
一个页包含: [页头 | 数据 | 页尾]
如果刷盘过程中崩溃，可能变成: [页头 | 损坏数据 | 页尾]
→ 不完整的页，无法使用
```

### 8.3 Double Write 工作原理

```
步骤 1: 数据页写入共享表空间的 Double Write Buffer
  ibdata1:
    ┌──────────────────────────────────┐
    │ Double Write Buffer (128页)       │
    │  [页1] [页2] ... [页128]          │
    └──────────────────────────────────┘

步骤 2: 数据页刷入独立表空间
  *.ibd:
    ┌──────────────────────────────────┐
    │ 数据页 [页1] [页2] ...            │
    └──────────────────────────────────┘

步骤 3: 如果步骤 2 成功，清除 Double Write Buffer 中的副本
  → 数据安全落盘

如果步骤 2 中发生崩溃:
  1. 独立表空间中的页是损坏的
  2. 从 Double Write Buffer 读取完整的原始页
  3. 用原始页覆盖损坏的页
  4. 数据恢复成功
```

### 8.4 Double Write 的性能影响

Double Write 会带来额外的磁盘写入开销：
- 理论上增加 **2 倍** 数据写入量
- 实际上因为连续写入，性能影响约 **5%~10%**

```sql
-- 查看 Double Write 状态
SHOW VARIABLES LIKE 'innodb_doublewrite';  -- 默认 ON

-- 可以在 SSD 上考虑关闭（因为 SSD 的写原子性更好）
SET GLOBAL innodb_doublewrite = OFF;
```

---

## 九、两阶段提交（2PC）

### 9.1 为什么需要两阶段提交

在分布式系统中，一个事务可能涉及多个数据库节点，需要保证所有节点要么全部提交，要么全部回滚。两阶段提交（Two-Phase Commit, 2PC）就是为此设计的协议。

### 9.2 两阶段提交流程

```
参与者 A                    协调者                    参与者 B
  │                          │                          │
  │◄─────── PREPARE ───────────────────────── PREPARE ──│
  │  (可以提交吗？)           │                          │
  │                          │                          │
  │─────── VOTE-YES ────────►│◄──── VOTE-NO/YES ───────│
  │  (可以提交)               │  (参与者 B 也可以)        │
  │                          │                          │
  │◄─────── COMMIT ──────────────────────────── COMMIT ─│
  │                          │                          │
  │─────── ACK ─────────────►│◄──────────── ACK ──────│
  │                          │                          │
  │  (提交完成)               │  (全部完成)              │
```

### 9.3 阶段一：准备阶段（Prepare Phase）

协调者向所有参与者发送 `PREPARE` 请求：
- 参与者执行事务到**预提交**状态
- 资源已锁定，修改已写入日志
- 参与者响应 `VOTE-YES`（可以提交）或 `VOTE-NO`（不能提交）
- 如果超时未响应，视为 `VOTE-NO`

### 9.4 阶段二：提交阶段（Commit Phase）

协调者根据所有参与者的投票结果：
- **全部 YES**：向所有参与者发送 `COMMIT` 命令
- **任一 NO**：向所有参与者发送 `ROLLBACK` 命令
- 参与者执行相应操作并回复 `ACK`

### 9.5 两阶段提交的问题

| 问题 | 说明 |
|------|------|
| **同步阻塞** | 协调者和参与者都需要等待，性能较低 |
| **单点故障** | 协调者故障会导致整个事务阻塞 |
| **数据不一致** | 极端情况下（协调者在 COMMIT 后、ACK 前崩溃）可能导致不一致 |
| **性能开销** | 至少 3 次网络往返 |

### 9.6 MySQL 中的两阶段提交

在 MySQL 主从复制中，为保证主从数据一致性，使用了两阶段提交：

```
Master:
  1. 执行事务，写 Redo Log
  2. 写 Binlog（阶段一：prepare）
  3. 提交事务（阶段二：commit）
     ↓
  Binlog 发送给 Slave
     ↓
Slave:
  1. 接收 Binlog
  2. 写入 Relay Log
  3. 执行并重放 Binlog
```

---

## 十、事务边界与控制语句

### 10.1 事务控制语句

```sql
-- 开启事务
BEGIN;
START TRANSACTION;

-- 提交事务
COMMIT;

-- 回滚事务
ROLLBACK;

-- 设置保存点
SAVEPOINT sp1;
-- 回滚到保存点
ROLLBACK TO SAVEPOINT sp1;
-- 删除保存点
RELEASE SAVEPOINT sp1;
```

### 10.2 实战示例

```sql
-- 银行转账事务
BEGIN;

UPDATE accounts SET balance = balance - 1000 WHERE id = 'A';

SAVEPOINT after_withdraw;  -- 设置保存点

UPDATE accounts SET balance = balance + 1000 WHERE id = 'B';

-- 检查 B 是否存在
SELECT COUNT(*) INTO @cnt FROM accounts WHERE id = 'B';

IF @cnt = 0 THEN
    ROLLBACK TO SAVEPOINT after_withdraw;  -- 回滚到保存点
    -- B 不存在，A 的扣减也需要回滚
    UPDATE accounts SET balance = balance + 1000 WHERE id = 'A';
END IF;

COMMIT;
```

### 10.3 隐式提交

以下操作会触发**隐式提交**，即使当前有未提交的事务：

```sql
BEGIN;
UPDATE accounts SET balance = 2000 WHERE id = 1;

-- 以下语句会隐式提交上面的事务：
DDL 语句: ALTER TABLE, CREATE TABLE, DROP TABLE, RENAME
管理语句: FLUSH, RELOAD, SET PASSWORD, GRANT, REVOKE
数据定义: CREATE DATABASE, DROP DATABASE

-- 示例
ALTER TABLE accounts ADD COLUMN age INT;  -- 隐式提交！
ROLLBACK;  -- 此时已无事务可回滚
```

### 10.4 隐式回滚

某些严重错误会导致**隐式回滚**：

```sql
BEGIN;
UPDATE accounts SET balance = 2000 WHERE id = 1;

-- 以下情况会隐式回滚:
死锁: DeadLock found
执行超时: Lock wait timeout exceeded
连接断开: Connection lost

-- 错误的 SQL 语句（语法错误）不会导致隐式回滚
-- 但运行时错误可能导致隐式回滚
```

### 10.5 自动提交模式

```sql
-- 查看 autocommit 状态
SELECT @@autocommit;  -- 默认 1（开启自动提交）

-- 开启自动提交
SET autocommit = 1;
-- 每条语句都是一个独立的事务

-- 关闭自动提交
SET autocommit = 0;
-- 所有操作都需要显式 COMMIT/ROLLBACK
-- 未提交的事务在连接关闭时会自动回滚
```

---

## 十一、事务设计最佳实践

### 11.1 短事务原则

```sql
-- ❌ 反例：长事务
BEGIN;
SELECT * FROM large_table;  -- 查询大量数据
-- 业务逻辑处理（耗时很长）
UPDATE ...  -- 最终才执行写操作
COMMIT;

-- ✅ 正例：短事务
-- 先完成所有业务逻辑
result = do_business_logic();  -- 在事务外处理

-- 然后开启短事务进行持久化
BEGIN;
UPDATE ...;
COMMIT;
```

### 11.2 合理选择隔离级别

| 场景 | 推荐隔离级别 | 理由 |
|------|-------------|------|
| 订单系统 | 读已提交 | 避免脏读，同时性能更好 |
| 支付系统 | 可重复读 | 保证数据一致性 |
| 报表统计 | 读已提交 | 允许读取最新数据 |
| 核心金融 | 可重复读 | 最高数据一致性 |

### 11.3 使用合适的锁粒度

```sql
-- ❌ 反例：锁定过多行
BEGIN;
SELECT * FROM orders WHERE status = 0 FOR UPDATE;  -- 锁定所有未完成订单
-- 处理业务逻辑
COMMIT;

-- ✅ 正例：精确锁定
BEGIN;
SELECT * FROM orders WHERE id = 12345 FOR UPDATE;  -- 只锁定需要的行
-- 处理业务逻辑
COMMIT;
```

### 11.4 避免死锁的技巧

```sql
-- 1. 固定加锁顺序
-- 事务 A 和 B 都先锁定 id 小的行
-- 避免循环等待

-- 2. 使用唯一索引查询
-- 确保每次只锁定一行

-- 3. 尽快提交
-- 缩短事务持有锁的时间
```

### 11.5 监控与排查

```sql
-- 查看当前事务
SELECT * FROM information_schema.INNODB_TRX;

-- 查看锁等待
SELECT * FROM information_schema.INNODB_LOCK_WAITS;

-- 查看死锁信息
SHOW ENGINE INNODB STATUS\G
-- 搜索 "LATEST DETECTED DEADLOCK"
```

---

## 十二、长事务的危害与优化

### 12.1 什么是长事务

长事务是指持续时间过长的事务（通常超过数秒），常见于：
- 事务中包含大量业务逻辑
- 事务中包含不必要的用户交互
- 事务中查询大量数据
- 没有及时提交或回滚

### 12.2 长事务的危害

| 危害 | 原因 |
|------|------|
| **锁持有时间过长** | 导致其他事务长时间等待，增加死锁概率 |
| **Undo Log 无法清理** | 长事务的 ReadView 阻止 Purge 线程清理 Undo Log，导致 Undo Log 膨胀 |
| **数据页历史版本过多** | Undo Log 堆积使 MVCC 查找历史版本变慢 |
| **回滚代价高** | 长事务包含的操作多，回滚时间长 |
| **主从延迟** | 从库需要重放长事务，导致主从不一致 |
| **连接占满** | 长事务占用数据库连接，导致其他请求无法获取连接 |

### 12.3 长事务的检测

```sql
-- 查找长事务
SELECT 
    trx_id,
    trx_started,
    TIMESTAMPDIFF(SECOND, trx_started, NOW()) AS duration_sec,
    trx_query,
    trx_state
FROM information_schema.INNODB_TRX
WHERE TIMESTAMPDIFF(SECOND, trx_started, NOW()) > 60;  -- 超过60秒的事务

-- 查找长事务的 Undo Log 占用
SELECT 
    trx_id,
    trx_rows_locked,
    trx_rows_modified,
    UNIX_TIMESTAMP(NOW()) - UNIX_TIMESTAMP(trx_started) AS age_seconds
FROM information_schema.INNODB_TRX
ORDER BY trx_started ASC;
```

### 12.4 长事务的优化方案

#### 方案 1：拆分长事务

```sql
-- ❌ 原来：一个长事务处理所有订单
BEGIN;
UPDATE orders SET status = 1 WHERE user_id = 1;
UPDATE order_items SET processed = 1 WHERE user_id = 1;
UPDATE inventory SET stock = stock - 1 WHERE user_id = 1;
COMMIT;

-- ✅ 优化：按订单ID分批处理
DECLARE done INT DEFAULT FALSE;
DECLARE v_order_id BIGINT;
DECLARE cur CURSOR FOR SELECT id FROM orders WHERE user_id = 1;

OPEN cur;
read_loop: LOOP
    FETCH cur INTO v_order_id;
    IF done THEN
        LEAVE read_loop;
    END IF;
    
    -- 每个订单一个短事务
    BEGIN;
    UPDATE orders SET status = 1 WHERE id = v_order_id;
    UPDATE order_items SET processed = 1 WHERE order_id = v_order_id;
    COMMIT;
END LOOP;
CLOSE cur;
```

#### 方案 2：引入中间状态

```sql
-- ❌ 原来：处理过程中直接修改最终状态
BEGIN;
UPDATE orders SET status = 'completed' WHERE ...;  -- 立即变更为最终状态
-- 后续步骤可能失败
COMMIT;

-- ✅ 优化：使用中间状态
BEGIN;
UPDATE orders SET status = 'processing' WHERE ...;  -- 中间状态
COMMIT;

-- 后续步骤（如果失败，可以重试）
BEGIN;
UPDATE orders SET status = 'completed' WHERE ...;  -- 最终状态
COMMIT;
```

#### 方案 3：异步处理

```sql
-- ❌ 同步处理
BEGIN;
UPDATE orders SET status = 'paid' WHERE ...;
CALL third_party_payment();  -- 调用第三方接口（耗时）
COMMIT;

-- ✅ 异步处理
BEGIN;
UPDATE orders SET status = 'paid' WHERE ...;
INSERT INTO payment_queue(order_id, status) VALUES(..., 'pending');
COMMIT;

-- 后台服务异步处理
BEGIN;
UPDATE payment_queue SET status = 'done' WHERE order_id = ?;
UPDATE orders SET status = 'completed' WHERE id = ?;
COMMIT;
```

### 12.5 监控长事务

```sql
-- 创建长事务告警的存储过程
DELIMITER //

CREATE PROCEDURE check_long_transactions(IN threshold_sec INT)
BEGIN
    DECLARE v_count INT DEFAULT 0;
    
    SELECT COUNT(*) INTO v_count
    FROM information_schema.INNODB_TRX
    WHERE TIMESTAMPDIFF(SECOND, trx_started, NOW()) > threshold_sec;
    
    IF v_count > 0 THEN
        -- 可以发送告警
        SELECT * FROM information_schema.INNODB_TRX
        WHERE TIMESTAMPDIFF(SECOND, trx_started, NOW()) > threshold_sec;
    END IF;
END //

DELIMITER ;

-- 每分钟检查一次长事务
-- 可以配合事件调度器或外部监控系统
```

---

## 参考文献

- MySQL 8.0 Reference Manual - Transaction and Locking Statements
- 《MySQL 技术内幕：InnoDB 存储引擎》第 2 版
- 《高性能 MySQL》第三版 - 第 7 章
- Jim Gray - "The Transaction Concept" (1981)
- 数据库系统概念 - 第 16 章 事务管理