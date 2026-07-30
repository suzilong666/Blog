# InnoDB存储引擎深度剖析

> 本文档从源码级别深入剖析 InnoDB 存储引擎的内部实现原理，涵盖架构设计、内存管理、数据结构、索引实现、事务机制等核心模块。

---

## 一、InnoDB 总体架构

InnoDB 存储引擎采用经典的**多线程 + 共享内存**架构，其设计哲学是通过缓冲池减少磁盘I/O，通过后台线程异步处理耗时操作。理解 InnoDB 的架构分层，是掌握其内部工作机制的基础。

### 1.1 前台线程

前台线程主要处理用户请求，包括：

- **主线程（Main Thread）**：负责处理客户端连接的请求分发，在 MySQL 8.0 中采用了新的线程池架构。每个客户端连接对应一个会话对象 `JOIN`，主线程从监听队列中接受连接请求并分配工作线程。

- **工作线程（Worker Thread）**：实际执行 SQL 语句的线程。在传统 `one-thread-per-connection` 模式下，每个连接独占一个线程；在线程池模式下，多个连接共享工作线程。工作线程的核心数据结构是 `THD`（THD 代表线程描述符），它保存了当前会话的所有上下文信息，包括：
  - 当前数据库
  - 事务状态
  - 执行计划
  - 用户权限

```c
// THD 结构体简化表示
struct THD {
    Security_context security_context;  // 安全上下文
    Query_arena query_arena;            // 查询内存 arena
    Transaction_ctx transaction_ctx;    // 事务上下文
    Prepared_statement *stmt_list;      // 预处理语句列表
    CHARSET_INFO *charset;              // 字符集
    ulong thread_id;                    // 线程ID
};
```

### 1.2 后台线程组

InnoDB 的后台线程承担着脏页刷新、日志写入、事务清理等关键职责。这些线程在 `srv_start()` 函数中被创建，贯穿 MySQL 的整个生命周期。

#### Master Thread

Master Thread 是 InnoDB 的核心调度线程，由 `srv_master_thread()` 函数实现。它循环执行以下操作：

```
srv_master_thread() 循环:
├── 每1秒:
│   ├── 检查是否有需要立即刷脏的页（`buf_flush_page_try()`）
│   ├── 检查 `insert buffer` 是否可以合并
│   ├── 检查是否有需要刷新的日志
│   └── 如果是主库且无活动，检查是否可以降级刷新
│
├── 每10秒:
│   ├── 刷新脏页（`buf_flush_do_batch()`）
│   ├── 合并 insert buffer
│   ├── 刷新日志到磁盘（`log_buffer_sync()`）
│   ├── 清理被标记为删除的临时表
│   └── 将缓冲区写入数据字典
│
├── 后台循环:
│   ├── 根据 `buf_flush_get_desired_flush_rate()` 计算刷盘速率
│   └── 按计算的速率持续刷脏
│
└── 暂停循环:
    ├── 等待条件满足
    └── 或者在 shutdown 时退出
```

#### IO Thread

InnoDB 内部使用异步 I/O（`os_aio_array`），通过 `os_aio_wait_thread()` 线程池处理 I/O 完成事件。默认有 4 个 IO 线程（`innodb_read_io_threads`）和 4 个写线程（`innodb_write_io_threads`）。

```c
// IO 完成请求结构体
struct os_aio_req_t {
    ulint type;          // IO 类型（读/写）
    ulint state;         // 请求状态
    fil_node_t *fil_node; // 文件节点
    void *buf;           // 数据缓冲区
    ulint offset;        // 文件偏移
    ulint n;             // 字节数
    OS_AIO_IMPL *aio_impl; // 具体实现
};
```

#### Page Cleaner Thread

Page Cleaner 线程负责将 Buffer Pool 中的脏页刷新到磁盘。在 MySQL 5.6 之前，这个工作由 Master Thread 完成；5.6 之后，Page Cleaner 线程独立出来，避免 Master Thread 被刷盘阻塞。

核心刷新函数 `buf_page_io_complete()` 在 I/O 完成后被调用，它将页从 `LRU` 链表的脏页列表中移除，并更新页的 `oldest_modification` 字段。

#### Purge Thread

Purge 线程负责清理已提交事务的 Undo Log。当一个事务被提交后，其 Undo Log 不能立即删除——因为可能还有其他事务需要通过 MVCC 读取旧版本数据。Purge 线程的工作流程：

1. 从 `purge_sys->read_view` 获取最早的读视图
2. 找到该视图可见的 undo 记录
3. 回滚段中的 undo 段被标记为可清理
4. 物理删除 undo 页

#### Redo Log Writer Thread

负责将 Redo Log Buffer 中的日志写入 Redo Log 文件。Redo Log 写入采用**顺序写**模式，写入路径为：`log_buffer -> log file -> disk`。Redo Log Writer 线程由 `log_writer_thread()` 实现，它检查 `log_sys->write_requested` 标志，当有写入请求时执行 `log_file_write()`。

---

## 二、Buffer Pool 详解

Buffer Pool 是 InnoDB 最核心的内存结构，它缓存了从磁盘读取的数据页，通过内存操作减少磁盘 I/O。Buffer Pool 的大小由 `innodb_buffer_pool_size` 参数控制，建议设置为物理内存的 50%-70%。

### 2.1 总体结构

```
┌─────────────────────────────────────────────────────────┐
│                    Buffer Pool                           │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐   │
│  │  Free List    │  │  LRU List    │  │  Flush List  │   │
│  │ (空闲页链表)  │  │ (最近最少使用)│  │ (脏页链表)   │   │
│  └──────────────┘  └──────────────┘  └──────────────┘   │
│                                                          │
│  ┌──────────────────────────────────────────────────┐   │
│  │              Hash Table (页号→页描述符)           │   │
│  └──────────────────────────────────────────────────┘   │
│                                                          │
│  ┌──────────────────────────────────────────────────┐   │
│  │              adaptive hash index                  │   │
│  └──────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────┘
```

### 2.2 页描述符结构体

Buffer Pool 中的每个页都对应一个 `buf_page_t` 描述符：

```c
struct buf_page_t {
    buf_block_t *block;            // 对应的缓冲块
    ulint space;                   // 表空间ID
    ulint offset;                  // 页号
    ulint flags;                   // 页标志
    buf_page_t *hash_next;         // 哈希链指针
    buf_page_t *LRU_next;          // LRU链下一个
    buf_page_t *LRU_prev;          // LRU链上一个
    buf_page_t *free_next;         // 空闲链下一个
    buf_page_t *free_prev;         // 空闲链上一个
    buf_page_t *flush_next;        // 刷新链下一个
    buf_page_t *flush_prev;        // 刷新链上一个
    ulint oldest_modification;     // 最早修改的LSN
    ulint newest_modification;     // 最新修改的LSN
    bool is_dirty;                 // 是否为脏页
    bool in_LRU_list;              // 是否在LRU链表中
    bool in_free_list;             // 是否在空闲链表中
};
```

### 2.3 Free List 管理

Free List 保存所有空闲页，是一个双向链表。当需要读取新页时，从 Free List 头部获取空闲页：

```c
buf_page_t* buf_page_init_for_read(buf_pool_t *pool, ulint rw_latch,
                                    ulint space, ulint offset) {
    // 从 free_list 头部取出一个空闲页
    buf_page_t *busup = pool->free;
    if (busup) {
        // 从 free_list 中移除
        pool->free = busup->free_next;
        busup->free_prev = NULL;
        // 设置页描述符
        busup->space = space;
        busup->offset = offset;
        // 插入到 LRU 链表头部
        buf_LRU_insert_first(pool, busup);
    }
    return busup;
}
```

当页被释放时（`buf_free_block_in_pool()`），它会被重新放入 Free List。Free List 的长度通过 `pool->free_list_len` 维护，当 Free List 长度低于 `innodb_min_buffer_pool_size` 时，会触发页淘汰。

### 2.4 LRU 管理策略

InnoDB 使用的并非标准 LRU，而是**改进的 LRU 算法**——将 LRU 链表分为**年轻代（young）**和**老年代（old）**。新读取的页先进入年轻代头部，经过一定次数的访问后才会晋升到老年代。

```
LRU 链表:
┌─────────────────────────────────────────────────────┐
│  Young List (5/8 of total)  │  Old List (3/8)       │
│  ┌──────────────────────┐  │  ┌─────────────────┐  │
│  │ Head → ... → Tail    │  │  │ Head → ... → Tail│  │
│  │ (新插入的页)          │  │  │ (冷数据页)       │  │
│  └──────────────────────┘  │  └─────────────────┘  │
└─────────────────────────────────────────────────────┘
     ↑                          ↑
     |                          |
   新读取的页插入此处        老年代页被淘汰
```

**冷数据保护**：当从磁盘读取的页在 LRU 链表中被标记为 `old`（位于老年代），它被再次访问时才会被提升到年轻代。这个机制保证了真正的热点数据留在 Buffer Pool 中。

关键参数：
- `innodb_old_blocks_pct`：老年代占比，默认 37%
- `innodb_old_blocks_time`：页在老年代停留多久后才会被考虑替换，默认 1000ms

### 2.5 Flush List 与脏页刷新

当页被修改后，`buf_page_t` 的 `is_dirty` 被置为 `true`，并被添加到**脏页链表（Flush List）**中。Flush List 是双向链表，按 `oldest_modification` 排序——最早修改的页在头部。

**脏页刷新的触发时机**：

1. **检查点触发**：当 Redo Log 空间不足时，需要刷脏以推进检查点
2. **LRU 淘汰触发**：当需要淘汰脏页时，必须先刷脏
3. **后台线程定期刷脏**：Page Cleaner 线程定期检查并刷新脏页
4. **shutdown 时刷脏**：数据库关闭时需要将所有脏页落盘

```c
void buf_page_io_complete(buf_page_t *bpage, bool evict) {
    // 从 LRU 链表中保留页
    // 但如果是脏页，需要将其从 flush list 中移除
    if (bpage->is_dirty) {
        // 更新 flush list
        buf_flush_remove_from_flush_list(bpage);
        bpage->is_dirty = false;
    }
    // 标记 IO 已完成
    bpage->io_fix = 0;
}
```

### 2.6 多 Buffer Pool 实例

MySQL 支持将 Buffer Pool 划分为多个实例（由 `innodb_buffer_pool_instances` 控制）。每个实例有独立的 Free List、LRU List、Flush List 和互斥锁。

划分策略：每个实例负责特定范围的页，通过 `(space_id + page_no) % pool_instances` 确定页所属的 Buffer Pool 实例。这样做的好处是减少锁竞争，提升并发性能。

---

## 三、数据页（Page）详解

页是 InnoDB 存储数据的最小单元，默认大小为 16KB（`innodb_page_size`）。所有数据（索引、记录、系统数据）都以页为单位存储。

### 3.1 页的物理结构

```
┌───────────────────────────────────────────────┐
│                  FIL_HEADER (38 bytes)         │
│  ├── FIL_PAGE_SPACE_ID (4 bytes)              │
│  ├── FIL_PAGE_OFFSET (4 bytes)                │
│  ├── FIL_PAGE_PREV (4 bytes)                  │
│  ├── FIL_PAGE_NEXT (4 bytes)                  │
│  ├── FIL_PAGE_TYPE (2 bytes)                  │
│  ├── FIL_PAGE_FILE_FLUSH_LSN (8 bytes)        │
│  └── FIL_PAGE_ARCH_LOG_NO_OR_SPACE_UUID (8)   │
├───────────────────────────────────────────────┤
│                  Page Type Specific Header    │
├───────────────────────────────────────────────┤
│                  Infimum Record (13 bytes)    │
├───────────────────────────────────────────────┤
│                  Supremum Record (13 bytes)   │
├───────────────────────────────────────────────┤
│                  User Records                  │
│  ┌─────────┐  ┌─────────┐  ┌─────────┐      │
│  │ Record 1 │  │ Record 2 │  │ Record N │      │
│  └─────────┘  └─────────┘  └─────────┘      │
├───────────────────────────────────────────────┤
│                  Free Space                    │
├───────────────────────────────────────────────┤
│                  Page Directory                │
│  ┌─────────┐  ┌─────────┐  ┌─────────┐      │
│  │ Slot N  │  │ Slot 2  │  │ Slot 1  │      │
│  └─────────┘  └─────────┘  └─────────┘      │
├───────────────────────────────────────────────┤
│                  FIL_TRAILER (8 bytes)         │
│  ├── FIL_PAGE_LSN (4 bytes)                   │
│  └── FIL_PAGE_TYPE_CHECKSUM (4 bytes)         │
└───────────────────────────────────────────────┘
```

#### FIL_HEADER（文件头）

每个页都有 38 字节的固定头信息：

| 字段 | 大小 | 说明 |
|------|------|------|
| FIL_PAGE_SPACE_ID | 4B | 表空间 ID |
| FIL_PAGE_OFFSET | 4B | 页号（偏移量） |
| FIL_PAGE_PREV | 4B | 上一个叶子页指针 |
| FIL_PAGE_NEXT | 4B | 下一个叶子页指针 |
| FIL_PAGE_TYPE | 2B | 页类型（INDEX=17, INODE=2, SYS=8 等） |
| FIL_PAGE_FILE_FLUSH_LSN | 8B | 刷盘 LSN |
| FIL_PAGE_ARCH_LOG_NO | 8B | 归档日志号或空间 UUID |

#### Infimum Record 和 Supremum Record

每个数据页都包含两条虚拟记录：
- **Infimum**：位于页内所有用户记录之前，代表"负无穷"
- **Supremum**：位于页内所有用户记录之后，代表"正无穷"

它们用于 B+ 树叶子层的边界条件。两者的结构与用户记录相同，但不存储实际数据。

#### Page Directory

Page Directory 是页内的"索引目录"，存储着页内记录的相对位置（偏移量）。每个槽位（Slot）对应一组记录（默认每隔 8 条记录分配一个槽位）。Page Directory 从页尾向页首增长，与 User Records 方向相反。

```c
// Page Directory 槽位
typedef byte* page_dir_slot_t;

// Page Directory 结构
#define PAGE_DIR_SLOT_SIZE          2  // 每个槽位2字节（偏移量）
#define PAGE_DIR_SLOT_DECISION      8  // 每8条记录设置一个槽位
#define PAGE_DIR_INFIMUM_SLOT       0  // Infimum的槽位
#define PAGE_DIR_SUPREMUM_SLOT      1  // Supremum的槽位
#define PAGE_DIR_NUM_SLOTS          4  // 页目录槽位数（初始）
```

通过 Page Directory，InnoDB 可以使用**二分查找**定位页内的记录，将线性扫描的复杂度从 O(n) 降到 O(log n)。

#### FIL_TRAILER（文件尾）

FIL_TRAILER 包含 8 字节：
- `FIL_PAGE_LSN`：页的 LSN，用于校验页是否完整
- `FIL_PAGE_TYPE_CHECKSUM`：页的校验和

### 3.2 记录的物理存储

InnoDB 中每条记录的物理存储格式如下：

```
┌─────────────────────────────────────────────────────┐
│                  记录头 (5+字节)                     │
│  ├── 变长字段长度列表（逆序）                          │
│  ├── NULL 标志位图                                    │
│  ├── 记录类型 (3bit)                                 │
│  ├── 下一记录偏移量 (16bit)                           │
│  └── 事务ID / 回滚指针 (仅聚簇索引)                    │
├─────────────────────────────────────────────────────┤
│                  列数据区                             │
│  ├── 列1数据                                          │
│  ├── 列2数据                                          │
│  └── ...                                             │
├─────────────────────────────────────────────────────┤
│                  可选区                               │
│  └── 事务ID (DB_TRX_ID) + 回滚指针 (DB_ROLL_PTR)      │
└─────────────────────────────────────────────────────┘
```

#### 记录头详解

```c
struct rec_t {
    byte  var_len_field_count;  // 变长字段数
    // 变长字段长度数组（逆序存储）
    // NULL 标志位图
    bit   record_type:3;       // 0=普通, 1=B+树内部, 2=Infimum, 3=Supremum, 5=删除
    uint16_t next_rec_offset;   // 下一条记录的相对偏移
    // 聚簇索引额外字段:
    uint64_t trx_id;            // 事务ID
    uint64_t roll_ptr;          // 回滚指针
};
```

**变长字段长度列表**：按列顺序的逆序存储。假设有列 `a(VARCHAR(10))`、`b(INT)`、`c(VARCHAR(5))`，且 a 长为 5 字节，c 长为 3 字节。则逆序存储 c 的长度（3），再存 a 的长度（5）。

**NULL 标志位图**：每个可空列对应一个 bit，按列顺序从高位到低位排列。如果某列允许 NULL，则需要 1 个 bit 表示。位图的字节数 = `(可空列数 + 7) / 8`。

---

## 四、B+ 树索引

### 4.1 B+ 树基础概念

B+ 树是一种多路平衡查找树，由 Rudolf Bayer 于 1972 年提出。InnoDB 使用 B+ 树作为其主要的索引结构，因为它能提供：

- 稳定的 O(log n) 查询性能
- 高效的范围查询（叶子节点链表）
- 高的磁盘利用率（扇出大）

### 4.2 聚簇索引的 B+ 树结构

聚簇索引（Clustered Index）的特点是**叶子节点存储完整的行数据**。每张 InnoDB 表有且仅有一个聚簇索引（主键或唯一索引）。

```
                    ┌─────────────┐
                    │  根页 (Page 0)│
                    └──────┬──────┘
                           │
          ┌────────────────┼────────────────┐
          ▼                ▼                ▼
    ┌──────────┐    ┌──────────┐    ┌──────────┐
    │  中间页1  │    │  中间页2  │    │  中间页3  │
    └─────┬────┘    └─────┬────┘    └─────┬────┘
          │               │               │
    ┌─────┬─────┐   ┌─────┬─────┐   ┌─────┬─────┐
    │页0  │页1  │   │页2  │页3  │   │页4  │页5  │
    ├───┬─┼──┤      ├───┬─┼──┤      ├───┬─┼──┤
    │id=1│id=2│     │id=3│id=4│     │id=5│id=6│
    │... │... │     │... │... │     │... │... │
    └──┬─┴─┬─┘      └──┬─┴─┬─┘      └──┬─┴─┬─┘
       │    │          │    │          │    │
       ▼    ▼          ▼    ▼          ▼    ▼
    数据页  数据页   数据页  数据页   数据页  数据页
    (完整行) (完整行)
```

**内部节点结构**：

```
┌───────────────────────────────────────────────────────────┐
│                     索引内部页                              │
├───────────────────────────────────────────────────────────┤
│  FIL_HEADER (38B)                                          │
├───────────────────────────────────────────────────────────┤
│  PAGE_INDEX_HEADER (INDEX=17)                              │
├───────────────────────────────────────────────────────────┤
│  KEY 1: [key_len | key_data | child_page_no]              │
│  KEY 2: [key_len | key_data | child_page_no]              │
│  ...                                                      │
│  KEY N: [key_len | key_data | child_page_no]              │
├───────────────────────────────────────────────────────────┤
│  Infimum → Supremum (边界记录)                             │
├───────────────────────────────────────────────────────────┤
│  Page Directory                                           │
├───────────────────────────────────────────────────────────┤
│  FIL_TRAILER (8B)                                         │
└───────────────────────────────────────────────────────────┘
```

内部节点的每个索引项格式为：`[key_len(2B)] [key_data] [child_page_no(4B)]`。其中 `key_len` 是 key 的字节长度（不含子页号），`key_data` 是实际的键值，`child_page_no` 指向子页的页号。

### 4.3 二级索引的 B+ 树结构

二级索引（Secondary Index）的叶子节点存储的是**主键值**，而非完整行数据。当通过二级索引查询时，需要先在二级索引 B+ 树中找到主键值，再到聚簇索引 B+ 树中查找完整行数据——这个过程称为**回表（Table Lookup）**。

```
二级索引 B+ 树 (以 age 列为例):
                    ┌─────────────┐
                    │   根页       │
                    └──────┬──────┘
                           │
          ┌────────────────┼────────────────┐
          ▼                ▼                ▼
    ┌──────────┐    ┌──────────┐    ┌──────────┐
    │  中间页1  │    │  中间页2  │    │  中间页3  │
    └─────┬────┘    └─────┬────┘    └─────┬────┘
          │               │               │
    ┌─────┬─────┐   ┌─────┬─────┐   ┌─────┬─────┐
    │age=1│age=2│   │age=3│age=4│   │age=5│age=6│
    │pk=1 │pk=3 │   │pk=5 │pk=7 │   │pk=9 │pk=11│
    └──┬──┴──┬──┘   └──┬──┴──┬──┘   └──┬──┴──┬──┘
       │     │         │     │         │     │
    叶子页  叶子页   叶子页  叶子页   叶子页  叶子页
    │       │       │       │       │       │
    └──→ 回表到聚簇索引查找完整行数据 ←──┘
```

**覆盖索引优化**：如果查询所需的所有列都在二级索引中（包括主键），则不需要回表。例如 `SELECT age FROM users WHERE age > 20`，由于二级索引的叶子节点包含 age 和主键，age 直接可从索引中获取，这就是**覆盖索引（Covering Index）**。

### 4.4 B+ 树的分裂与合并

#### 分裂（Split）

当一个叶子页被写满后，需要进行页分裂。分裂过程由 `page_split()` 函数实现：

```
分裂前:
┌──────────────────────────────────────────┐
│  Page X (已满)                             │
│  [record1|record2|...|recordN]            │
└──────────────────────────────────────────┘

分裂后:
┌──────────────────────────────────┐
│  Page X (左半部分)               │
│  [record1|record2|...|recordM]  │
└──────────────────────────────────┘
┌──────────────────────────────────┐
│  Page Y (右半部分，新分配)       │
│  [recordM+1|...|recordN]        │
└──────────────────────────────────┘
         ↑
    中间键上提到父节点
```

分裂的详细步骤：
1. 分配新页 `Y`，将 `X` 中后半部分记录复制到 `Y`
2. 更新 `Y` 的 `FIL_PAGE_PREV` 和 `FIL_PAGE_NEXT`
3. 更新 `X` 的 `FIL_PAGE_NEXT` 指向 `Y`
4. 将 `Y` 的第一条记录的 key 和 `Y` 的页号插入到父节点中
5. 如果父节点也满了，递归分裂

```c
ulint page_split(ulint flags, page_t* block, page_t* new_block,
                 dict_index_t* index, ulint* n_recs_new) {
    // 1. 确定分裂点（中间位置）
    ulint split_rec = page_get_split_point(block, index);
    
    // 2. 将记录从 split_rec 开始复制到 new_block
    page_copy_records_to(block, new_block, split_rec, index);
    
    // 3. 更新链表指针
    page_update_prev_next(block, new_block);
    
    // 4. 在父节点中插入 new_block 的第一条记录的 key
    // （这个操作通常由上层 B+ 树函数完成）
    
    return DB_SUCCESS;
}
```

#### 合并（Merge）

当页中的记录数低于阈值时（通常小于页容量的 50%），会尝试与相邻页合并。合并操作触发的条件包括：

- 删除操作导致页使用率降低
- Purge 清理已删除的记录
- 范围删除操作

```c
void page_merge(page_t* left_block, page_t* right_block,
                dict_index_t* index) {
    // 1. 将 right_block 中的记录移动到 left_block
    page_move_records(left_block, right_block, index);
    
    // 2. 从父节点中删除 right_block 的索引项
    // （由 B+ 树层的 btr_pcur_remove_from_parent() 完成）
    
    // 3. 释放 right_block
    // 4. 如果父节点的子页数过少，可能触发父节点的合并
}
```

---

## 五、MVCC 实现原理

多版本并发控制（Multi-Version Concurrency Control, MVCC）是 InnoDB 实现高并发性能的核心机制。MVCC 使得普通的 SELECT 操作不会阻塞写操作，写操作也不会阻塞读操作。

### 5.1 MVCC 核心概念

MVCC 的核心思想是**为每条记录保留多个历史版本**，不同事务根据其读视图读取不同版本的数据。实现三要素：

1. **隐藏字段**：每行记录包含 `DB_TRX_ID`（最后修改的事务ID）和 `DB_ROLL_PTR`（指向 undo log 历史版本的回滚指针）
2. **版本链**：通过 `DB_ROLL_PTR` 将同一行的不同历史版本串联成一个链表
3. **ReadView**：每个事务在一致性读时生成一个读视图，用于判断哪些版本对当前事务可见

### 5.2 ReadView 的生成

ReadView 在事务执行第一次 `SELECT`（一致性读）时生成，或通过 `START TRANSACTION WITH CONSISTENT SNAPSHOT` 在事务开始时生成。

```c
struct ReadView {
    trx_id_t creator_trx_id;      // 创建该视图的事务ID
    trx_id_t min_trx_id;          // 视图中最小的事务ID
    trx_id_t max_trx_id;          // 视图中最大的事务ID
    bool  max_trx_id_in_set;      // max_trx_id 是否在活跃集合中
    trx_id_t* m_ids;              // 活跃事务ID集合
    ulint m_ids_size;             // 活跃事务数量
    view_type_t type;             // 视图类型
};
```

**ReadView 生成逻辑**：

```
创建 ReadView 时:
1. min_trx_id = 最小的活跃事务ID
2. max_trx_id = 最大的事务ID + 1（下一个将分配的事务ID）
3. 将所有活跃事务ID记录在 m_ids 集合中
4. creator_trx_id = 当前事务ID
5. max_trx_id_in_set = (max_trx_id 是否在活跃集合中)
```

### 5.3 可见性判断

对于某条记录的版本（由 `DB_TRX_ID` 标识），可见性判断规则如下：

```
如果 trx_id < min_trx_id:
    → 该版本在 ReadView 创建前已提交，可见 ✓

如果 trx_id == creator_trx_id:
    → 该版本由当前事务创建，可见 ✓

如果 trx_id > max_trx_id:
    → 该版本在 ReadView 创建后才生成，不可见 ✗

如果 min_trx_id <= trx_id < max_trx_id:
    → 如果 trx_id 在 m_ids 集合中:
        → 该版本由活跃事务创建，不可见 ✗
    → 否则:
        → 该版本已提交，可见 ✓
```

```c
bool read_view_sees_trx_id(const ReadView* view, trx_id_t trx_id) {
    if (trx_id < view->min_trx_id) {
        return true;  // 事务在视图创建前已提交
    }
    if (trx_id == view->creator_trx_id) {
        return true;  // 自己修改的记录
    }
    if (trx_id >= view->max_trx_id) {
        return false; // 视图创建后才产生的版本
    }
    // 在 [min_trx_id, max_trx_id) 范围内
    // 二分查找 m_ids
    if (view->m_ids) {
        for (ulint i = 0; i < view->m_ids_size; i++) {
            if (view->m_ids[i] == trx_id) {
                return false;  // 活跃事务，不可见
            }
        }
    }
    return true;  // 已提交，可见
}
```

### 5.4 版本链查找

当读取一条记录时，如果当前版本对事务不可见，InnoDB 会沿着 `DB_ROLL_PTR` 进入 Undo Log 查找上一个历史版本：

```c
rec_t* row_vers_build_for_read(recv_t* rec, dict_index_t* index,
                                ReadView* view, mem_root_t* mem_root) {
    // 当前记录版本
    rec_t* v = rec;
    
    while (v) {
        // 获取该版本的 trx_id
        trx_id_t trx_id = rec_get_trx_id(v, index);
        
        if (read_view_sees_trx_id(view, trx_id)) {
            // 可见，返回该版本
            return v;
        }
        
        // 不可见，获取回滚指针
        roll_ptr_t roll_ptr = rec_get_roll_ptr(v);
        
        // 从 Undo Log 中获取上一个版本
        v = trx_undo_prev_version_for_read(roll_ptr, index, mem_root);
    }
    
    // 没有可见的版本，返回 NULL
    return NULL;
}
```

**版本链结构**：

```
当前记录 (在聚簇索引叶子页中)
│
│  DB_ROLL_PTR →
▼
┌─────────────────────┐     ┌─────────────────────┐
│  Undo Log Segment    │     │  Undo Log Segment    │
│  (最近的历史版本)    │────→│  (更早的历史版本)    │
│  trx_id=105          │     │  trx_id=102          │
└─────────────────────┘     └─────────────────────┘
                                      │
                                      │ DB_ROLL_PTR →
                                      ▼
                               ┌─────────────────────┐
                               │  Undo Log Segment    │
                               │  (最初的版本)        │
                               │  trx_id=98           │
                               └─────────────────────┘
```

### 5.5 当前读与快照读

- **快照读（Snapshot Read）**：普通 `SELECT` 不加锁，通过 MVCC 读取历史版本。使用 `ReadView` 判断可见性。
- **当前读（Current Read）**：`SELECT ... FOR UPDATE`、`SELECT ... LOCK IN SHARE MODE`、`UPDATE`、`DELETE` 等操作读取最新版本，并对记录加锁。

---

## 六、Undo Log 详解

### 6.1 Undo Log 概述

Undo Log 是 InnoDB 实现事务回滚和 MVCC 的基础。它存储了数据的历史版本信息，使得：
- 事务可以通过 Undo Log 回滚到之前的状态
- 其他事务可以通过 Undo Log 读取历史版本（MVCC）

**Undo Log 的物理存储位置**：
- 系统表空间（`ibdata1`）的回滚段中
- 独立的 Undo 表空间（`innodb_undo_directory`，MySQL 5.7+）

### 6.2 Insert Undo Log 与 Update Undo Log

#### Insert Undo Log

`INSERT` 操作产生的 Undo Log。由于 INSERT 操作的记录对其他事务不可见（遵循事务隔离级别），当事务回滚时，只需将记录标记为删除即可。

```c
// Insert Undo Log 记录格式
struct trx_undo_ins_rec {
    ulint type;             // TRX_UNDO_INSERT_REC
    ulint index_id;         // 索引ID
    ulint table_id;         // 表ID
    byte* info;             // 记录的完整信息（用于删除）
};
```

Insert Undo Log 在事务提交后可以立即清除（无需等待 purge），因为其他事务不会读取到未提交的 INSERT 记录。

#### Update Undo Log

`UPDATE` 和 `DELETE` 操作产生的 Undo Log。Update Undo Log 包含修改前的完整信息，用于回滚和 MVCC。

```c
// Update Undo Log 记录格式
struct trx_undo_upd_rec {
    ulint type;             // TRX_UNDO_UPD_EXIST_REC 或 TRX_UNDO_DEL_MARK_REC
    ulint index_id;         // 索引ID
    ulint table_id;         // 表ID
    byte* old_rec;          // 修改前的记录（用于回滚）
    byte* new_rec;          // 修改后的记录（用于重建版本链）
    roll_ptr_t roll_ptr;    // 指向更早版本的回滚指针
};
```

### 6.3 Undo Log 的生命周期

```
┌──────────┐    ┌──────────┐    ┌──────────┐    ┌──────────┐
│ 事务开始  │───→│ 生成Undo  │───→│ 事务提交  │───→│ Purge清理 │
│          │    │  Log      │    │          │    │          │
└──────────┘    └──────────┘    └──────────┘    └──────────┘
     │               │               │               │
     ▼               ▼               ▼               ▼
 分配回滚段     记录修改前的数据   标记为删除       物理删除Undo页
```

1. **分配阶段**：事务开始时，从回滚段（Rollback Segment）分配一个 Undo Segment
2. **写入阶段**：每次修改数据时，生成 Undo Log 记录写入 Undo Segment
3. **提交阶段**：事务提交后，Undo Segment 被标记为"待清除"（仅对 insert undo）
4. **Purge 阶段**：Purge 线程检查 Undo Segment，如果没有其他事务需要其历史版本，则物理删除

```c
// 回滚段结构
struct trx_rseg_t {
    ulint id;                    // 回滚段ID
    mutex_t mutex;               // 互斥锁
    trx_undo_group_t* undo_groups; // Undo组链表
    ulint curr_size;             // 当前大小
    ulint max_size;              // 最大大小
    page_t* pages;               // 页链表
};

// Undo 段结构
struct trx_undo_segment_t {
    ulint id;                    // Undo段ID
    ulint state;                 // 状态: ACTIVE, PREPARED, COMMITTED, PURGED
    trx_rseg_t* rseg;            // 所属回滚段
    page_t* pages;               // Undo页链表
    ulint top_page_no;           // 顶层页号
    ulint last_record_offset;    // 最后一条记录偏移
    bool skip_multi_logs;        // 是否跳过多日志
};
```

### 6.4 Undo Tablespace

MySQL 5.7 之后支持将 Undo Log 存储在独立的表空间中，由 `innodb_undo_directory` 配置。这样做的好处：
- 可以独立控制 Undo 表空间的大小（`innodb_undo_tablespaces`）
- 可以将 Undo 表空间放到更快的存储设备上
- 可以实现 Undo 表空间的在线截断

---

## 七、Redo Log 详解

### 7.1 Redo Log 概述

Redo Log 是 InnoDB 的**物理日志**，它以页为单位记录物理修改操作（"redo" 是 "re-do" 的意思，表示重做）。Redo Log 的核心作用是保证事务的**持久性（Durability）**——即使数据库崩溃，已提交的事务数据也能通过 Redo Log 恢复。

Redo Log 采用**循环写**模式，由固定大小的文件组成（默认 2 个 `ib_logfile0` 和 `ib_logfile1`）。

### 7.2 Redo Log 的格式

#### Redo Log Block

Redo Log 以 Block 为单位组织，每个 Block 大小为 512 字节。

```
┌────────────────────────────────────────────────────────┐
│                  Redo Log Block (512 bytes)              │
├────────────────────────────────────────────────────────┤
│  ┌──────────────────────────────────────────────────┐  │
│  │  LOG_BLOCK_HEADER (12 bytes)                      │  │
│  │  ├── LOG_BLOCK_SPACE_ID (4B)                      │  │
│  │  ├── LOG_BLOCK_OFFSET (4B)                        │  │
│  │  └── LOG_BLOCK_TYPE (4B)  [0=log, 1=checkpoint]  │  │
│  └──────────────────────────────────────────────────┘  │
│  ┌──────────────────────────────────────────────────┐  │
│  │  Redo Records (变长)                               │  │
│  │  ├── Record 1: [type|space|page_no|data...]      │  │
│  │  ├── Record 2: [type|space|page_no|data...]      │  │
│  │  └── ...                                          │  │
│  └──────────────────────────────────────────────────┘  │
│  ┌──────────────────────────────────────────────────┐  │
│  │  LOG_BLOCK_TAIL (4 bytes)                         │  │
│  │  └── LOG_BLOCK_CHECKSUM (4B)                      │  │
│  └──────────────────────────────────────────────────┘  │
└────────────────────────────────────────────────────────┘
```

#### Redo Record 格式

```
┌─────────────────────────────────────────────────────┐
│  type (1 byte): 日志类型                             │
│    - MLOG_WRITE_STRING = 30: 写入字符串              │
│    - MLOG_SET_BIT = 31: 设置位                       │
│    - MLOG_COMP_REC_INSERT = 32: 压缩插入记录         │
│    - MLOG_COMP_REC_DELETE = 33: 压缩删除记录         │
│    - MLOG_COMP_PAGE_CREATE = 34: 创建页              │
│    - MLOG_COMP_PAGE_FREE = 35: 释放页               │
│    - MLOG_NEXT_PAGE = 36: 下一页                     │
├─────────────────────────────────────────────────────┤
│  space_id (4 bytes): 表空间ID                        │
├─────────────────────────────────────────────────────┤
│  page_no (4 bytes): 页号                             │
├─────────────────────────────────────────────────────┤
│  undo_no (4 bytes): Undo 号                          │
├─────────────────────────────────────────────────────┤
│  type_specific_data: 类型相关数据                     │
└─────────────────────────────────────────────────────┘
```

### 7.3 Redo Log 的写入与 Checkpoint

#### 写入流程

```
                    Redo Log Buffer (内存)
                    ┌──────────────────┐
                    │  log_sys->log_buffer│
                    └─────────┬────────┘
                              │ log_write()
                              ▼
                    Redo Log Files (磁盘)
                    ┌──────────────────┐
                    │  ib_logfile0      │  ← 循环写
                    │  ib_logfile1      │
                    └──────────────────┘
                              │ log_buffer_sync()
                              ▼
                         物理磁盘
```

写入步骤：
1. 事务在修改数据前，先将物理操作写入 `log_sys->log_buffer`
2. `log_write()` 将 Buffer 中的日志写入 Redo Log 文件
3. `log_buffer_sync()` 将 Redo Log 文件同步到磁盘

```c
// Redo Log 系统结构
struct log_sys_t {
    mutex_t mutex;              // 互斥锁
    byte*   log_buffer;         // 日志缓冲区
    ulint   log_buffer_size;    // 缓冲区大小
    ulint   log_buffer_pos;     // 当前写入位置
    ulint   log_file_capacity;  // 日志文件容量
    ulint   log_files;          // 日志文件数
    // 检查点信息
    lsn_t   last_checkpoint_lsn; // 上次检查点的LSN
    lsn_t   next_checkpoint_lsn; // 下次检查点的LSN
    // 写入同步
    volatile bool write_requested;
    volatile bool flush_requested;
};
```

#### Checkpoint 机制

Checkpoint 的核心目的是**推进 Redo Log 的循环写入位置**。当检查点发生时，InnoDB 会将 Buffer Pool 中小于 `last_checkpoint_lsn` 的脏页刷到磁盘。

```
Redo Log 循环写:
    ┌──────────────────────────────────────────────┐
    │  ib_logfile0                                  │
    │  [已刷盘] [待刷盘] [空闲空间]                 │
    │   ↑                                        ↑
    │   last_checkpoint_lsn    log_write_position  │
    └──────────────────────────────────────────────┘
    
    当 log_write_position 追上 last_checkpoint_lsn 时:
    → 必须推进检查点，刷脏释放空间
```

**Checkpoint 触发条件**：
1. **Redo Log 空间不足**：当可用空间低于阈值时，强制推进检查点
2. **Buffer Pool 空间不足**：淘汰脏页前需要先刷脏
3. **Master Thread 定期检查**：定期执行模糊检查点
4. **数据库关闭**：执行尖锐检查点

**模糊检查点（Fuzzy Checkpoint）**：
- 只刷一部分脏页（按 LRU 顺序），不阻塞前台事务
- 由 Page Cleaner 线程后台执行
- 保证 Redo Log 有足够的循环空间

**尖锐检查点（Sharp Checkpoint）**：
- 将所有脏页刷到磁盘
- 通常在数据库关闭时执行
- 确保 Redo Log 的 checkpoint 位置在最后一个 Redo 记录之后

---

## 八、Double Write 机制

### 8.1 为什么需要 Double Write

InnoDB 的数据页大小为 16KB，而操作系统的默认页大小为 4KB。当 InnoDB 将一个 16KB 的数据页写入磁盘时，操作系统可能将其分为 4 次 4KB 的写入。如果在写入过程中发生崩溃，数据页可能处于**部分写入（Torn Write）**状态——前 8KB 是旧数据，后 8KB 是新数据。

Redo Log 本身也无法完全解决这个问题，因为 Redo Log 记录的是页的物理修改操作，但如果数据页已经被部分写坏，即使有 Redo Log 也无法恢复。

### 8.2 Double Write 的工作流程

Double Write 机制为数据页提供了额外的保护：

```
写入流程:
┌─────────────┐     ┌──────────────┐     ┌──────────────┐
│  Buffer Pool │────→│  DoubleWrite  │────→│  数据文件     │
│  (16KB 页)   │     │  Buffer Pool │     │  (ibdata)    │
└─────────────┘     └──────┬───────┘     └──────────────┘
                            │
                            ▼
                     ┌──────────────┐
                     │  DoubleWrite  │
                     │  区域(共享表空间)│
                     └──────────────┘
```

详细步骤：

1. **第一步（写 DoubleWrite Buffer）**：当 Buffer Pool 中的脏页需要刷盘时，先将页复制到 `DoubleWrite Buffer Pool`（内存中的一个缓冲区）
2. **第二步（写 DoubleWrite 区域）**：将 `DoubleWrite Buffer Pool` 中的数据写到共享表空间的 `DoubleWrite` 区域（物理上连续的一段空间）
3. **第三步（写数据文件）**：确认 `DoubleWrite` 区域写入成功后，再将数据写到实际的数据文件位置

```c
bool buf_dblwr_write_page(buf_dblwr_t* dblwr, buf_page_t* bpage) {
    // 1. 计算 DoubleWrite 区域的偏移
    ulint dblwr_offset = buf_dblwr_calc_page_offset(dblwr, bpage);
    
    // 2. 先写入 DoubleWrite Buffer
    // （这一步在内存中完成）
    
    // 3. 将 DoubleWrite Buffer 写到 DoubleWrite 区域
    // 使用 OS_FILE_WRITE_AT_POS 确保原子写入
    
    // 4. 确认 DoubleWrite 区域写入完成
    
    // 5. 再将数据写到实际数据文件
    // 如果第5步失败，从 DoubleWrite 区域恢复
}
```

### 8.3 崩溃恢复时的 Double Write

在崩溃恢复阶段，InnoDB 会检查每个数据页的页尾 `FIL_PAGE_LSN` 和 `FIL_PAGE_TYPE_CHECKSUM`：

```
恢复流程:
1. 读取数据页的 FIL_TRAILER
2. 计算 FIL_PAGE_LSN 和 FIL_PAGE_TYPE_CHECKSUM
3. 如果校验失败 → 从 DoubleWrite 区域恢复该页
4. 如果 DoubleWrite 区域也损坏 → 从 Redo Log 重新构建
```

### 8.4 如何关闭 Double Write

在某些场景下可以考虑关闭 Double Write（不推荐，但了解其原理有助于理解）：

```sql
-- 关闭 Double Write
SET GLOBAL innodb_flush_log_at_trx_commit = 0;
SET GLOBAL sync_binlog = 0;

-- 设置为关闭（MySQL 8.0.20+ 不再支持关闭）
-- innodb_doublewrite = 0;  -- 已废弃
```

**MySQL 8.0.20 之后**，`innodb_doublewrite` 参数被设为只读，无法关闭。因为 Oracle 认为 Double Write 是数据一致性的基础保障。

---

## 九、Insert Buffer 与 Change Buffer

### 9.1 Insert Buffer 概述

当通过**非聚簇索引**插入一条记录时，索引的插入位置通常是随机的（不像聚簇索引按主键递增），这会导致大量的随机 I/O。Insert Buffer（MySQL 5.5 之后改名为 Change Buffer）将这些对二级索引的插入操作先缓存在内存中，当页被再次访问时再合并回 B+ 树。

```
Insert Buffer 工作流程:
┌──────────┐     ┌───────────────┐     ┌──────────┐
│  INSERT    │────→│  Change Buffer │────→│  B+ 树   │
│  操作     │     │  (内存)        │     │  (磁盘)  │
└──────────┘     └───────────────┘     └──────────┘
                        │
                    合并触发:
                    1. 页被再次访问
                    2. Master Thread 定期合并
                    3. 缓冲池空间不足
```

### 9.2 Change Buffer 的内部结构

```c
struct ibuf_t {
    mutex_t mutex;
    ulint   size_limit;          // 大小限制
    ulint   free_list_len;       // 空闲链表长度
    ibuf_page_t* free_list;      // 空闲页链表
    ibuf_page_t* used_list;      // 已使用页链表
    // Change Buffer 的 B+ 树
    dict_index_t* ibuf_index;    // 内部索引
    ulint   n_merges;            // 已完成的合并数
    ulint   n_merges_next;       // 下一个合并目标
};

// Change Buffer 的记录格式
struct ibuf_rec_t {
    ulint type;                  // IBUF_OP_INSERT, IBUF_OP_DELETE, IBUF_OP_DELETE_INSERT
    ulint space;                 // 表空间ID
    ulint page_no;               // 页号
    ulint index_id;              // 索引ID
    byte* key;                   // 索引键
    ulint key_len;               // 键长度
    byte* value;                 // 记录数据
};
```

### 9.3 Merge 操作触发时机

Merge 操作将 Change Buffer 中的记录合并回 B+ 树的索引页中。触发时机：

1. **页被再次访问**（最常见）：当需要访问二级索引页时，检查 Change Buffer 中是否有该页的缓存记录，如果有，将其合并到页中
2. **Master Thread 定期触发**：Master Thread 每秒检查是否可以合并 Change Buffer 中的记录
3. **缓冲池不足**：当 Buffer Pool 空间不足时，先合并 Change Buffer 释放空间
4. **数据库关闭**：关闭前将 Change Buffer 中的所有记录合并

```c
void ibuf_merge_page(ibuf_t* ibuf, buf_page_t* bpage) {
    // 1. 从 Change Buffer 的 B+ 树中查找属于该页的记录
    ibuf_page_t* list = ibuf_search(ibuf, bpage->space, bpage->offset);
    
    // 2. 逐条应用到 B+ 树中
    while (list) {
        ibuf_rec_t* rec = list->rec;
        switch (rec->type) {
            case IBUF_OP_INSERT:
                // 等价于 INSERT 操作
                btr_cur_insert(...);
                break;
            case IBUF_OP_DELETE:
                // 等价于 DELETE 操作
                btr_cur_delete(...);
                break;
            case IBUF_OP_DELETE_INSERT:
                // 先 DELETE 再 INSERT
                btr_cur_delete(...);
                btr_cur_insert(...);
                break;
        }
        list = list->next;
    }
    
    // 3. 从 Change Buffer 中清除已合并的记录
    ibuf_delete(ibuf, bpage->space, bpage->offset);
}
```

### 9.4 Change Buffer 的限制

- 只能用于**二级索引**（非唯一、非主键的索引）
- 不能应用于**空间索引**和**全文索引**
- Change Buffer 本身也是一个 B+ 树，存储在共享表空间中
- 当 Change Buffer 中缓存的记录很多时，合并操作可能非常耗时

---

## 十、自适应哈希索引（Adaptive Hash Index）

### 10.1 自适应哈希索引概述

自适应哈希索引（AHI）是 InnoDB 的一项自动优化功能。它会检测 B+ 树上的索引访问模式，如果发现某些索引列被频繁使用，就会自动为这些列在 Buffer Pool 中构建哈希索引。

```
自适应哈希索引结构:
┌─────────────────────────────────────────────────────┐
│  Buffer Pool                                          │
│  ┌──────────────────┐  ┌────────────────────────┐   │
│  │  B+ 树 (age,id)  │  │  Adaptive Hash Index   │   │
│  │  (age, id, name) │  │  (基于 age 列)         │   │
│  └──────────────────┘  └────────────────────────┘   │
└─────────────────────────────────────────────────────┘
         │                           │
         │  常规查找                  │  哈希查找
         │  O(log n)                 │  O(1)
         ▼                           ▼
    B+ 树搜索                    Hash 直接定位
```

### 10.2 监控自适应哈希索引

```sql
-- 查看 AHI 状态
SHOW ENGINE INNODB STATUS\G

-- 关键指标:
-- hash searches/s: 哈希查找次数
-- non-hash searches/s: 非哈希（B+树）查找次数

-- 通过 information_schema 查看
SELECT * FROM INNODB_METRICS WHERE name LIKE '%adaptive%';
```

### 10.3 自适应哈希索引的注意事项

1. **AHI 可能导致锁竞争**：AHI 需要额外的哈希表锁，在高并发场景下可能成为瓶颈
2. **不适用所有场景**：对于某些工作负载（如频繁的范围查询），AHI 没有帮助
3. **可以关闭 AHI**：从 MySQL 5.7 开始，AHI 默认为关闭状态
   ```sql
   SET GLOBAL innodb_adaptive_hash_index = OFF;
   ```

### 10.4 自适应哈希索引的工作原理

AHI 使用**哈希自适应算法**：它会追踪每次索引查找的列前缀，如果某个前缀被频繁使用，就会在该前缀上建立哈希索引。哈希索引存储在 `adaptive_hash_index` 内存区域中。

```c
struct adaptive_hash_index_t {
    hash_table_t* hash_table;    // 哈希表
    ulint         n_searches;    // 总查找次数
    ulint         n_hash_searches; // 哈希查找命中次数
    ulint         n_non_hash_searches; // 非哈希查找次数
    mutex_t       mutex;         // 互斥锁
    // 自适应控制
    ulint         n_builds;      // 已建立的哈希索引数
    ulint         n_removes;     // 已删除的哈希索引数
};
```

AHI 的建立由 `srv_adaptive_hash_index_upd()` 函数定期执行，它检查 B+ 树索引的访问模式，如果发现 `hash_search_ratio > 1/8`（哈希命中次数超过总次数的 1/8），就会尝试建立哈希索引。

---

## 总结

InnoDB 存储引擎是 MySQL 性能和可靠性的核心保障。通过对其架构、Buffer Pool、数据页结构、B+ 树索引、MVCC、Undo Log、Redo Log、Double Write、Change Buffer 和自适应哈希索引等模块的深入剖析，我们可以：

1. **理解 MySQL 的性能来源**：从内存管理到磁盘 I/O 的每一个优化细节
2. **掌握故障恢复的原理**：通过 Redo Log 和 Double Write 保证数据安全
3. **优化数据库设计**：基于聚簇索引和二级索引的特性设计合理的表结构
4. **诊断性能问题**：通过理解 MVCC 和锁机制分析并发性能瓶颈

在实际工作中，结合 `SHOW ENGINE INNODB STATUS` 和 `performance_schema` 等工具，可以更精确地监控 InnoDB 的内部状态，实现从"知其然"到"知其所以然"的进阶。