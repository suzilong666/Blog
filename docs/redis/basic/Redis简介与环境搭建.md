# Redis 简介与环境搭建

## 一、Redis 的历史与发展

### 1.1 起源与早期发展

Redis（Remote Dictionary Server）是一款开源的、基于内存的键值对存储系统，由意大利工程师 Salvatore Sanfilippo（笔名 antirez）于 2009 年开发。Redis 的开发源于 antirez 的一个个人项目——他在为意大利创业公司 Meridio 工作时，发现现有数据库无法满足高性能、低延迟的需求，于是决定从零开始编写一个内存数据库。

Redis 的名字来源于 **R**emote **D**ictionary **S**erver（远程字典服务器），这准确地描述了它的核心功能：一个网络访问的、基于字典（键值对）的内存存储系统。

2009 年 5 月，Redis 首次发布在 GitHub 上，立刻引起了开发者社区的广泛关注。它以极简的设计哲学、出色的性能和丰富的数据类型，迅速成为 NoSQL 数据库领域的明星项目。

### 1.2 关键里程碑

| 时间 | 版本 | 关键事件 |
|------|------|----------|
| 2009 年 5 月 | Redis 0.1 | 首次发布于 GitHub |
| 2010 年 | Redis 2.0 | 发布，引入虚拟内存支持、主动过期等特性 |
| 2011 年 | Redis 2.2 | 引入 List/Set 优化、集群雏形 |
| 2013 年 | Redis 2.6 | 引入 Lua 脚本支持、Keyspace Notification |
| 2014 年 | Redis 2.8 | 引入 RDB/AOF 持久化改进、IPv6 支持 |
| 2015 年 | Redis 3.0 | 正式发布 Redis Cluster，支持分布式集群 |
| 2017 年 | Redis 4.0 | 引入模块系统、新的持久化机制（混合 RDB-AOF） |
| 2018 年 | Redis 5.0 | 引入 Streams 数据类型、主动碎片整理 |
| 2020 年 | Redis 6.0 | 引入多线程 I/O、客户端缓存、ACL |
| 2022 年 | Redis 7.0 | 引入函数（Function）增强、Sharded Pub/Sub |
| 2023 年 | Redis 7.2 | 引入更完善的 ACL、超时增强、一致性哈希优化 |
| 2024 年 | Redis 8.0（Redis 分支） | 性能大幅提升、新数据结构 |

### 1.3 Redis 与 Redis Labs 的分道扬镳

2015 年，antirez 与其他核心贡献者成立了 Redis Labs（现改名为 Redis Ltd.），推出了 Redis Enterprise 商业产品。2020 年，Redis 与 Redis Labs 在许可证上产生分歧，Redis Labs 将其部分模块改为 SSPL 许可证，引发社区争议。

此后，Redis 社区分叉出多个分支：
- **Redis 开源版**（由 antirez 主导）：保持 BSD 许可证，完全开源
- **Redis Enterprise**（Redis Ltd. 商业版）：包含企业级特性，采用商业许可证
- **Valkey**（Linux 基金会）：2024 年由 Google、Oracle、Snap 等公司联合创建的 Redis 分支

目前，Redis 仍然是全球最受欢迎的 NoSQL 数据库之一，被 Twitter、GitHub、Instagram、美团、阿里巴巴、腾讯等众多知名公司广泛使用。

---

## 二、Redis 核心特点

### 2.1 极致的高性能

Redis 的性能表现是其最突出的优势之一。官方基准测试显示，Redis 在普通硬件上可以达到：

- **读操作**：110,000+ QPS（每秒查询数）
- **写操作**：81,000+ QPS
- **延迟**：亚毫秒级（0.1ms 以内）

Redis 高性能的原因主要在于：

**纯内存操作**：Redis 将数据完全存储在内存中，避免了磁盘 I/O 瓶颈。内存访问速度约为磁盘的 100,000 倍。

```
存储介质访问速度对比：

CPU 缓存 L1:  ~1 ns    (10^-9 秒)
CPU 缓存 L2:  ~4 ns    (4 x 10^-9 秒)
内存:         ~100 ns  (10^-7 秒)
SSD 硬盘:     ~100 μs  (10^-4 秒)
HDD 机械硬盘: ~5 ms    (5 x 10^-3 秒)

Redis 操作内存，比传统数据库的磁盘操作快 4~5 个数量级
```

**高效的数据结构**：Redis 内部使用了多种针对不同场景优化的数据结构，包括：
- **简单动态字符串（SDS）**：自适应内存管理，支持二进制安全
- **跳表（Skip List）**：用于有序集合，平均 O(log n) 查询
- **压缩列表（ziplist）**：用于小集合的紧凑存储
- **快速列表（quicklist）**：Redis 3.2+ 中列表的底层实现，结合链表和压缩列表的优点
- **整数集合（intset）**：用于只包含整数的小集合
- **哈希表（hashtable）**：字典的基础，支持渐进式 rehash

**单线程模型**：Redis 核心命令执行采用单线程模型，避免了多线程的上下文切换和锁竞争开销。

### 2.2 内存数据库

Redis 是一个以内存为核心的数据存储系统：

**全内存存储**：所有数据驻留在物理内存中，提供极高的访问速度。

**内存管理**：Redis 实现了自己的内存分配器，支持：
- 内存使用监控（`INFO memory` 命令）
- 内存淘汰策略（当内存满时自动清理旧数据）
- jemalloc 内存分配器（默认）或 libc 分配器

**内存优化**：Redis 会根据数据大小自动选择最优的底层编码格式：
- 小哈希表 → 压缩列表或嵌入编码
- 小集合 → 整数集合
- 小列表 → 压缩列表
- 小有序集合 → 压缩列表

### 2.3 丰富的数据类型

Redis 支持 10+ 种数据类型，远超传统的键值存储系统：

| 类型 | 说明 | 常用场景 |
|------|------|----------|
| **String** | 字符串，可存储文本、数字、二进制 | 缓存、计数器、配置信息 |
| **Hash** | 哈希表，键值对集合 | 用户信息、对象存储 |
| **List** | 列表，有序可重复 | 消息队列、最新动态 |
| **Set** | 集合，无序不重复 | 标签、共同好友、去重 |
| **ZSet** | 有序集合，带分数排序 | 排行榜、延迟队列 |
| **HyperLogLog** | 基数估算 | UV 统计（近似去重） |
| **Bitmap** | 位图 | 布隆过滤器、在线状态 |
| **Geospatial** | 地理位置 | 附近的人、地理围栏 |
| **Stream** | 流，消息队列 | 实时消息、事件驱动 |
| **Module** | 扩展模块 | 搜索、图数据库、时序数据 |

### 2.4 单线程与事件循环

Redis 6.0 之前，核心命令执行完全是单线程的：

**单线程执行的优势**：
- 避免锁竞争，无需加锁
- 避免上下文切换开销
- 代码实现简单可靠
- 对于内存操作，单线程性能足够

**Redis 6.0 的多线程改进**：
Redis 6.0 引入了 I/O 多线程，但命令执行仍然是单线程的：

```
┌───────────────────────────────────────────────┐
│                  Redis 进程                     │
├───────────────────────────────────────────────┤
│  I/O 线程组（Redis 6.0+）                       │
│  ┌─────┐ ┌─────┐ ┌─────┐                      │
│  │IO-1 │ │IO-2 │ │IO-N │  读取请求、写入响应    │
│  └──┬──┘ └──┬──┘ └──┬──┘                      │
│     │        │        │                       │
│     └────────┼────────┘                       │
│              ▼                                │
│  ┌─────────────────────────────────────┐      │
│  │         单线程事件循环（主线程）       │      │
│  │  1. 解析命令                         │      │
│  │  2. 执行命令（读写内存）               │      │
│  │  3. 将结果返回 I/O 线程               │      │
│  └─────────────────────────────────────┘      │
└───────────────────────────────────────────────┘
```

这种设计使得 Redis 既保持了单线程的简单性，又通过多线程 I/O 提升了网络读写性能。

### 2.5 持久化机制

Redis 提供两种持久化方式，确保数据在重启后不丢失：

**RDB（Redis Database）**：
- 在指定时间间隔内，将内存中的数据快照写入磁盘
- 优点：文件紧凑，恢复速度快
- 缺点：可能丢失最后一次快照后的数据

```bash
# RDB 文件示例
dump.rdb  # 二进制格式的 Redis 数据快照
```

**AOF（Append Only File）**：
- 将每个写命令追加到日志文件
- 优点：数据安全性高，最多丢失 1 秒数据
- 缺点：文件体积较大，恢复速度较慢

```bash
# AOF 文件示例
appendonly.aof  # Redis 命令日志（协议格式）

# AOF 重写（压缩）
bgrewriteaof    # 后台压缩 AOF 文件
```

**混合持久化（Redis 4.0+）**：
- 结合 RDB 和 AOF 的优点
- 重启时先加载 RDB 部分，再增量加载 AOF 部分
- 兼顾了恢复速度和数据安全

### 2.6 高可用与分布式

**主从复制**：
- 一个主节点（Master），多个从节点（Slave）
- 主节点处理写操作，从节点处理读操作
- 实现数据冗余和读写分离

**哨兵模式（Sentinel）**：
- 自动监控主从节点状态
- 主节点故障时自动故障转移
- 提供配置发现和通知

**集群模式（Cluster）**：
- 16384 个槽（slot）分布在多个节点
- 水平扩展存储和计算能力
- 支持自动故障转移

```
Redis Cluster 架构示例：

┌──────────┐  ┌──────────┐  ┌──────────┐
│ 节点 A   │  │ 节点 B   │  │ 节点 C   │
│ 槽 0-5460│  │ 槽5461-10922│ │ 槽10923-16383│
└────┬─────┘  └────┬─────┘  └────┬─────┘
     │              │              │
     │ 复制          │ 复制          │ 复制
     ▼              ▼              ▼
┌──────────┐  ┌──────────┐  ┌──────────┐
│ 节点 A'  │  │ 节点 B'  │  │ 节点 C'  │
│ （从节点）│  │ （从节点）│  │ （从节点）│
└──────────┘  └──────────┘  └──────────┘
```

---

## 三、为什么选择 Redis

### 3.1 与 MySQL 对比

Redis 和 MySQL 并非竞争关系，而是互补关系：

| 对比维度 | Redis | MySQL |
|----------|-------|-------|
| 数据存储 | 内存为主 | 磁盘为主（内存缓存） |
| 数据结构 | 键值对、列表、集合等 | 表（关系型） |
| 查询语言 | Redis Protocol（简单命令） | SQL（完整查询语言） |
| 持久化 | RDB/AOF（可选） | 强制持久化 |
| 事务支持 | 有限（单命令原子） | 完整 ACID |
| 数据一致性 | 最终一致性为主 | 强一致性 |
| 查询能力 | O(1) 级别简单操作 | 复杂关联查询 |
| 适用场景 | 高频读写缓存、实时数据 | 持久化业务数据 |

**实际使用建议**：在大多数业务系统中，Redis 作为 MySQL 的补充，形成「MySQL + Redis」的黄金组合：
- MySQL 存储持久化的业务数据
- Redis 存储热点数据和临时数据

### 3.2 与 Memcached 对比

Memcached 是另一个经典的内存缓存系统，Redis 相对于它的优势：

| 对比维度 | Redis | Memcached |
|----------|-------|-----------|
| 数据类型 | String、Hash、List、Set、ZSet 等 | 仅 String |
| 持久化 | 支持（RDB/AOF） | 不支持 |
| 分布式 | 原生集群支持 | 需要客户端分片 |
| 发布订阅 | 原生支持 | 不支持 |
| Lua 脚本 | 支持 | 不支持 |
| 地理空间 | 支持 | 不支持 |
| 内存效率 | 高（多种编码优化） | 一般 |
| 社区活跃度 | 非常活跃 | 较低 |

**结论**：Redis 在功能丰富度和扩展性上全面超越 Memcached，已成为内存缓存的首选方案。

### 3.3 为什么选择 Redis

**开发体验**：
- 简单易学，命令直观
- 官方客户端覆盖几乎所有主流语言
- 详细的中文文档和活跃的社区

**性能表现**：
- 单节点 10 万+ QPS
- 亚毫秒级延迟
- 稳定可靠，经过大规模生产验证

**功能丰富**：
- 多种数据类型，覆盖大部分业务场景
- 发布订阅、Lua 脚本、事务等实用功能
- 模块化架构，可扩展性强

**生态完善**：
- 与 Spring、Django、Laravel 等主流框架深度集成
- 丰富的运维工具和监控方案
- 云厂商（AWS、Azure、阿里云）全托 Redis 服务

---

## 四、Redis 应用场景

### 4.1 缓存

缓存是 Redis 最经典的应用场景。将数据库中的热点数据缓存到 Redis，大幅提升读取性能。

```
缓存工作流程：

用户请求 → 应用服务 → Redis 缓存
                          │
                    ┌─────┴─────┐
                    │ 命中       │ 未命中
                    ▼           ▼
                返回结果    查询数据库
                               │
                               ▼
                           写入 Redis
                               │
                               ▼
                           返回结果
```

**实战案例**：
- 电商系统中的商品信息、库存缓存
- 社交网络中的用户资料、关系缓存
- 门户网站的文章、评论缓存

**关键配置**：
- 设置合理的过期时间（TTL）
- 保证缓存与数据库的一致性
- 处理缓存穿透、击穿、雪崩问题

### 4.2 会话管理

使用 Redis 存储用户会话信息，实现分布式会话共享。

```redis
# 存储会话
SET session:user:1001 '{"userId":1001,"role":"admin","loginTime":"2024-01-01T10:00:00"}' EX 7200

# 获取会话
GET session:user:1001

# 续期会话
EXPIRE session:user:1001 7200
```

**优势**：
- 多实例部署时会话共享
- 支持会话过期自动清理
- 减轻服务器内存压力

### 4.3 排行榜

利用 Redis 的有序集合（ZSet），轻松实现各种排行榜功能。

```redis
# 添加用户分数（用户A 得到 100 分）
ZADD game:ranking 100 "user:A"

# 添加更多用户
ZADD game:ranking 95 "user:B" 88 "user:C" 120 "user:D" 70 "user:E"

# 获取排行榜前 3（降序）
ZREVRANGE game:ranking 0 2 WITHSCORES
# 输出: user:D (120), user:A (100), user:B (95)

# 获取用户 A 的排名
ZREVRANK game:ranking "user:A"
# 输出: 1（第 2 名，从 0 开始）

# 获取分数在 80-100 之间的用户
ZRANGEBYSCORE game:ranking 80 100
```

**应用场景**：
- 游戏积分榜、等级榜
- 电商销量排行
- 直播打赏排行
- 学习进度排行

### 4.4 计数器

利用 Redis 的原子操作，实现各种计数功能。

```redis
# 文章浏览量计数（原子递增）
INCR article:view:1001

# 每次浏览增加 1
INCR article:view:1001

# 查看当前浏览量
GET article:view:1001

# 限制计数器：每分钟最多访问 100 次（滑动窗口思路）
INCR rate_limit:user:1001
EXPIRE rate_limit:user:1001 60
```

**应用场景**：
- 页面浏览量、点赞数、评论数
- 接口访问频率限制
- 在线人数统计
- 投票计数

### 4.5 消息队列

利用 Redis 的 List 数据类型实现简单的消息队列。

```redis
# 生产者：将消息推入队列右侧
RPUSH task:queue "send_email:user:A"
RPUSH task:queue "send_email:user:B"
RPUSH task:queue "generate_report:daily"

# 消费者：从队列左侧取出消息（阻塞式）
BLPOP task:queue 0
# 输出: task:queue, send_email:user:A

# 多个消费者可同时阻塞等待，实现负载均衡
# 消费者1: BLPOP task:queue 0
# 消费者2: BLPOP task:queue 0
# 谁先取到消息谁处理
```

**进阶方案**：Redis Stream（5.0+）提供了更强大的消息队列功能：

```redis
# 创建流并添加消息
XADD mystream * type:email recipient:userA subject:welcome

# 消费消息（从最新开始）
XREAD COUNT 10 STREAMS mystream $

# 创建消费组
XGROUP CREATE mystream mygroup

# 组内消费
XREADGROUP GROUP mygroup consumer1 COUNT 1 STREAMS mystream >
```

### 4.6 分布式锁

利用 Redis 的原子 SET 命令实现分布式互斥锁。

```redis
# 获取锁（原子操作：键不存在时设置成功）
SET lock:order:1001 unique_value NX PX 30000
# NX: 仅当键不存在时设置
# PX: 设置过期时间（毫秒）

# 释放锁（Lua 脚本保证原子性）
if redis.call("get", KEYS[1]) == ARGV[1] then
    return redis.call("del", KEYS[1])
else
    return 0
end
```

**应用场景**：
- 分布式环境下的订单创建
- 定时任务的单点执行
- 资源的互斥访问控制

### 4.7 地理位置

利用 Redis 的 Geospatial 数据类型实现地理位置相关功能。

```redis
# 添加地理位置坐标（经度、纬度、名称）
GEOADD cities 116.404 39.915 "北京" 121.473 31.230 "上海" 113.264 23.129 "广州"

# 计算两点之间的距离
GEODIST cities 北京 上海 km
# 输出: 1068.20 (公里)

# 查找某坐标附近的城市
GEOSEARCH cities FROMLONLAT 116.4 39.9 BYRADIUS 200 km ASC
# 输出: 北京

# 获取坐标
GEOPOS cities 北京
# 输出: 116.404, 39.915

# 将地理位置转为 ZSet（可用于范围查询和排序）
ZRANGE cities 0 -1 WITHSCORES
```

**应用场景**：
- 附近的人/店铺搜索
- 地理围栏
- 物流轨迹追踪
- 城市范围统计

---

## 五、Redis 安装

### 5.1 Windows 安装（WSL 方式）

由于 Redis 官方不再提供原生 Windows 版本，推荐使用 WSL（Windows Subsystem for Linux）或 Docker。

**步骤一：安装 WSL**

```powershell
# 以管理员身份运行 PowerShell
wsl --install
# 重启计算机

# 安装 Ubuntu 发行版
wsl --install -d Ubuntu
```

**步骤二：在 WSL 中安装 Redis**

```bash
# 更新包管理器
sudo apt update

# 安装 Redis
sudo apt install redis-server

# 验证安装
redis-server --version
redis-cli ping
# 输出: PONG
```

### 5.2 Windows 原生安装（第三方移植）

如果必须使用 Windows 原生版本，可以使用 Microsoft 维护的分支：

```bash
# 方式一：从 GitHub 下载
# 访问 https://github.com/tporadowski/redis/releases
# 下载 Redis-x64-5.0.14.1.msi 安装包

# 方式二：使用 Chocolatey
choco install redis-64

# 安装完成后
# 服务默认运行在 localhost:6379
redis-cli ping
```

**注意**：第三方 Windows 版本为 Redis 5.0，不支持 6.0+ 的新特性（多线程 I/O、ACL 等）。

### 5.3 Docker 方式（推荐）

Docker 是最简单、最可靠的跨平台安装方式。

**基本使用**：

```bash
# 拉取最新 Redis 镜像
docker pull redis:latest

# 运行 Redis 容器
docker run -d --name my-redis -p 6379:6379 redis:latest

# 验证运行
docker exec -it my-redis redis-cli ping
# 输出: PONG
```

**带配置的运行**：

```bash
# 创建自定义配置文件
mkdir -p /path/to/redis/conf
mkdir -p /path/to/redis/data

# 运行时挂载配置和数据目录
docker run -d \
    --name my-redis \
    -p 6379:6379 \
    -v /path/to/redis/conf/redis.conf:/etc/redis/redis.conf \
    -v /path/to/redis/data:/data \
    redis:latest redis-server /etc/redis/redis.conf

# 查看日志
docker logs -f my-redis
```

**使用 Docker Compose**：

```yaml
# docker-compose.yml
version: '3.8'
services:
  redis:
    image: redis:7-alpine
    container_name: my-redis
    ports:
      - "6379:6379"
    volumes:
      - ./conf/redis.conf:/etc/redis/redis.conf
      - ./data:/data
    command: redis-server /etc/redis/redis.conf
    restart: unless-stopped
```

```bash
# 启动
docker-compose up -d

# 停止
docker-compose down

# 连接
docker exec -it my-redis redis-cli
```

### 5.4 Linux 安装

**Ubuntu/Debian（apt）**：

```bash
# 更新包索引
sudo apt update

# 安装 Redis
sudo apt install redis-server

# 查看 Redis 状态
sudo systemctl status redis-server

# 启动/停止/重启
sudo systemctl start redis-server
sudo systemctl stop redis-server
sudo systemctl restart redis-server

# 设置开机自启
sudo systemctl enable redis-server
```

**CentOS/RHEL（yum/dnf）**：

```bash
# CentOS 7
sudo yum install epel-release
sudo yum install redis

# CentOS 8+/RHEL 8+
sudo dnf install redis

# 启动服务
sudo systemctl start redis

# 设置开机自启
sudo systemctl enable redis

# 查看版本
redis-server --version
```

**从源代码编译安装（进阶）**：

```bash
# 安装编译依赖
sudo apt install build-essential tcl

# 下载 Redis 源码
cd /tmp
wget https://github.com/redis/redis/archive/refs/tags/7.2.4.tar.gz
tar -xzf 7.2.4.tar.gz
cd redis-7.2.4

# 编译（使用多核加速）
make -j$(nproc)

# 运行测试（可选，需要几分钟）
make test

# 安装到指定目录
sudo make install PREFIX=/usr/local/redis

# 创建配置目录
sudo mkdir -p /usr/local/redis/conf
sudo cp redis.conf /usr/local/redis/conf/

# 启动 Redis
/usr/local/redis/bin/redis-server /usr/local/redis/conf/redis.conf

# 验证
/usr/local/redis/bin/redis-cli ping
```

### 5.5 macOS 安装

使用 Homebrew 是 macOS 上最方便的安装方式：

```bash
# 安装 Homebrew（如果未安装）
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# 安装 Redis
brew install redis

# 启动 Redis（前台运行）
redis-server

# 后台运行（作为服务）
brew services start redis

# 查看服务状态
brew services list

# 停止服务
brew services stop redis

# 验证安装
redis-cli ping
# 输出: PONG

# 查看版本
redis-server --version
```

### 5.6 各安装方式对比

| 方式 | 适用场景 | 优点 | 缺点 |
|------|----------|------|------|
| **Docker** | 开发、测试、生产 | 简单、可移植、版本可控 | 需要 Docker 环境 |
| **apt/yum** | Linux 服务器 | 简单、自动管理 | 版本可能不是最新 |
| **源码编译** | 生产环境、定制化 | 最新版本、高度定制 | 编译耗时、维护复杂 |
| **Homebrew** | macOS 开发 | 简单、与系统集成 | 仅适用于 macOS |
| **WSL** | Windows 开发 | 完整 Linux 环境 | 性能略低 |

---

## 六、Redis 配置文件详解

### 6.1 配置文件位置

Redis 配置文件的默认位置：

| 安装方式 | 配置文件路径 |
|----------|-------------|
| apt 安装 | `/etc/redis/redis.conf` |
| 源码安装 | `/usr/local/redis/conf/redis.conf` |
| Docker | 容器内 `/etc/redis/redis.conf`，通过 volume 挂载 |
| brew 安装 | `/usr/local/etc/redis.conf` (Intel Mac) 或 `/opt/homebrew/etc/redis.conf` (Apple Silicon) |

### 6.2 基础配置

```conf
# Redis 监听端口，默认 6379
port 6379

# 绑定地址（默认 127.0.0.1，仅允许本地连接）
# 如需远程访问，改为 0.0.0.0（注意安全）
bind 127.0.0.1

# 是否开启保护模式（默认开启）
# 开启后，未设置密码且绑定非本地地址时，拒绝外部连接
protected-mode yes

# 配置文件位置（通常不需要修改）
# config /etc/redis/redis.conf

# 以守护进程方式运行（后台运行）
daemonize yes

# 进程 PID 文件路径（守护进程模式下）
pidfile /var/run/redis_6379.pid

# 日志级别：debug, verbose, notice, warning
loglevel notice

# 日志文件路径（空字符串表示输出到标准输出）
logfile ""

# 数据库数量（默认 16）
databases 16
```

### 6.3 内存配置

```conf
# 最大内存限制（建议根据服务器内存设置）
# 例如设置 2GB：maxmemory 2gb
maxmemory 0

# 内存淘汰策略（当达到最大内存时）
# noeviction: 不淘汰，写入时报错
# allkeys-lru: 淘汰最近最少使用的 key（所有 key）
# volatile-lru: 淘汰最近最少使用的 key（仅设置了过期时间的 key）
# allkeys-lfu: 淘汰最不经常使用的 key
# volatile-lfu: 淘汰最不经常使用的 key（仅设置了过期时间的 key）
# allkeys-random: 随机淘汰一个 key
# volatile-random: 随机淘汰一个设置了过期时间的 key
# volatile-ttl: 淘汰剩余时间最短的 key
maxmemory-policy allkeys-lru

# 内存使用超过该比例时，开始主动碎片整理（Redis 4.0+）
activedefrag yes
```

### 6.4 持久化配置

**RDB 持久化**：

```conf
# RDB 保存规则（满足任一条件即触发保存）
# 3600 秒内至少 1 次写操作 → 保存
save 3600 1
# 300 秒内至少 10 次写操作 → 保存
save 300 10
# 60 秒内至少 10000 次写操作 → 保存
save 60 10000

# RDB 文件名
dbfilename dump.rdb

# RDB 文件保存目录
dir /var/lib/redis

# 在保存 RDB 时是否压缩（使用 LZF 压缩算法）
rdbcompression yes

# RDB 文件是否校验
rdbchecksum yes
```

**AOF 持久化**：

```conf
# 开启 AOF 持久化
appendonly yes

# AOF 文件名
appendfilename "appendonly.aof"

# AOF 同步策略
# always: 每次写操作都同步到磁盘（最安全，最慢）
# everysec: 每秒同步一次（推荐，平衡性能和安全）
# no: 由操作系统决定同步时机（最快，最不安全）
appendfsync everysec

# AOF 重写配置
auto-aof-rewrite-percentage 100  # AOF 文件增长 100% 时触发重写
auto-aof-rewrite-min-size 64mb   # AOF 文件最小时重写阈值

# Redis 4.0+ 混合持久化
aof-use-rdb-preamble yes
```

### 6.5 主从复制配置

```conf
# 复制相关
# 复制缓冲区大小
repl-backlog-size 1mb

# 复制缓冲区过期时间
repl-backlog-ttl 3600

# 从节点只读模式
replica-read-only yes

# 从节点向主节点发送 ping 的间隔
repl-ping-replica-period 10

# 主节点超时时间（秒）
repl-timeout 60
```

**设置从节点**：

```conf
# 在从节点的 redis.conf 中添加
replicaof 192.168.1.100 6379

# 如果主节点有密码
masterauth "your-master-password"
```

### 6.6 安全配置

```conf
# 设置 Redis 密码（强烈建议在生产环境中设置）
requirepass "your-secure-password"

# 主节点密码（从节点连接主节点时使用）
masterauth "your-master-password"

# 重命名或禁用危险命令
# 禁用 FLUSHALL 命令
rename-command FLUSHALL ""
# 禁用 FLUSHDB 命令
rename-command FLUSHDB ""
# 禁用 CONFIG 命令
rename-command CONFIG ""
# 重命名 DEBUG 命令
rename-command DEBUG "DEBUG_a1b2c3d4e5f6"

# 绑定地址（限制网络访问）
bind 127.0.0.1
```

### 6.7 网络配置

```conf
# TCP 最大连接数
tcp-backlog 511

# 客户端空闲超时时间（0 表示永不超时）
timeout 0

# TCP keepalive 间隔
tcp-keepalive 300

# 最大客户端连接数
maxclients 10000

# 客户端输出缓冲区限制
# 普通客户端
client-output-buffer-limit normal 0 0 0
# 从节点
client-output-buffer-limit replica 256mb 64mb 60
# 发布订阅
client-output-buffer-limit pubsub 32mb 8mb 60
```

### 6.8 配置修改与生效

```bash
# 动态查看配置
redis-cli CONFIG GET maxmemory

# 动态修改配置（运行时修改，无需重启）
redis-cli CONFIG SET maxmemory 1gb

# 修改配置文件后重启生效
# Linux
sudo systemctl restart redis-server
# 或
redis-cli SHUTDOWN
redis-server /etc/redis/redis.conf

# 验证配置
redis-cli INFO server
redis-cli INFO memory
```

---

## 七、Redis 基本使用

### 7.1 redis-cli 客户端

redis-cli 是 Redis 自带的命令行客户端工具。

**连接 Redis**：

```bash
# 连接本地 Redis（默认 localhost:6379）
redis-cli

# 连接远程 Redis
redis-cli -h 192.168.1.100 -p 6379

# 带密码连接
redis-cli -h 192.168.1.100 -p 6379 -a your_password

# 切换数据库
redis-cli -n 0  # 默认使用数据库 0

# 进入交互模式后
127.0.0.1:6379> PING
# 输出: PONG
```

**基本交互**：

```redis
# 查看服务器信息
INFO server
INFO memory
INFO persistence

# 查看所有 key
KEYS *

# 模糊匹配 key
KEYS user:*

# 统计 key 总数
DBSIZE

# 清空当前数据库
FLUSHDB

# 清空所有数据库
FLUSHALL

# 退出
EXIT
QUIT
```

### 7.2 String 类型常用命令

String 是 Redis 最基础的类型，可以存储字符串、整数、浮点数甚至二进制数据。

```redis
# 设置值
SET name "Redis"
SET counter 0

# 获取值
GET name
# 输出: "Redis"

# 设置过期时间（秒）
SET token "abc123" EX 3600

# 仅当 key 不存在时设置（用于分布式锁）
SET lock:resource unique_key NX

# 仅当 key 存在时设置
SET name "Redis New" XX

# 原子递增
INCR counter        # counter: 1
INCRBY counter 10   # counter: 11

# 原子递减
DECR counter        # counter: 10
DECRBY counter 5    # counter: 5

# 追加内容
APPEND name " is great"  # name: "Redis is great"

# 获取字符串长度
STRLEN name  # 输出: 15

# 获取子串
GETRANGE name 0 4  # 输出: "Redis"

# 设置子串
SETRANGE name 6 "awesome"  # name: "Redis awesome"

# 同时设置多个 key
MSET key1 "val1" key2 "val2" key3 "val3"

# 同时获取多个 key
MGET key1 key2 key3
```

### 7.3 Hash 类型常用命令

Hash 是键值对集合，适合存储对象。

```redis
# 设置字段
HSET user:1001 name "张三" age 25 email "zhangsan@example.com"

# 获取字段
HGET user:1001 name  # 输出: "张三"
HGETALL user:1001    # 获取所有字段

# 仅设置不存在的字段
HSETNX user:1001 name "张三"  # 如果 name 已存在则不设置

# 同时设置多个字段
HMSET user:1001 address "北京市" phone "13800138000"

# 同时获取多个字段
HMGET user:1001 name age

# 字段递增
HINCRBY user:1001 age 1  # age: 26

# 获取所有字段名
HKEYS user:1001

# 获取所有字段值
HVALS user:1001

# 获取字段数量
HLEN user:1001

# 检查字段是否存在
HEXISTS user:1001 name  # 输出: 1

# 删除字段
HDEL user:1001 email

# 遍历哈希（大数据量）
HSCAN user:1001 0 COUNT 10
```

### 7.4 List 类型常用命令

List 是有序可重复的字符串列表，可作为队列或栈使用。

```redis
# 从右侧推入（常用作队列）
RPUSH queue:task "任务1" "任务2" "任务3"

# 从左侧推入（用作栈时）
LPUSH stack:task "任务0"

# 从左侧弹出
LPOP queue:task  # 输出: "任务1"

# 从右侧弹出
RPOP queue:task

# 阻塞弹出（等待队列有数据）
BLPOP queue:task 0  # 0 表示永久等待

# 获取列表长度
LLEN queue:task

# 获取指定范围的元素
LRANGE queue:task 0 -1  # 获取全部

# 获取指定索引的元素
LINDEX queue:task 0  # 第一个元素

# 插入元素
LINSERT queue:task BEFORE "任务2" "任务1.5"

# 移除元素
LREM queue:task 0 "任务1"  # 移除所有匹配元素

# 裁剪列表
LTRIM queue:task 0 4  # 只保留前 5 个元素
```

### 7.5 Set 类型常用命令

Set 是无序不重复的集合，支持集合运算。

```redis
# 添加元素
SADD tag:article:1 "技术" "数据库" "Redis"

# 获取所有元素
SMEMBERS tag:article:1

# 随机获取元素
SRANDMEMBER tag:article:1 1

# 检查元素是否存在
SISMEMBER tag:article:1 "Redis"  # 输出: 1

# 获取集合大小
SCARD tag:article:1

# 删除元素
SREM tag:article:1 "Redis"

# 集合运算
SADD set1 "a" "b" "c"
SADD set2 "b" "c" "d"

# 交集
SINTER set1 set2  # 输出: "b", "c"

# 并集
SUNION set1 set2  # 输出: "a", "b", "c", "d"

# 差集（set1 - set2）
SDIFF set1 set2  # 输出: "a"

# 判断集合关系
SADD user:follows:A "B" "C" "D"
SADD user:follows:B "A" "C" "D"
SINTER user:follows:A user:follows:B  # 共同关注: "C", "D"
```

### 7.6 ZSet 类型常用命令

ZSet 是有序集合，每个元素关联一个分数。

```redis
# 添加元素（用户排行榜）
ZADD ranking 100 "user:A" 95 "user:B" 120 "user:C" 88 "user:D"

# 获取排名（升序，0 起始）
ZRANGE ranking 0 -1 WITHSCORES

# 获取排名（降序）
ZREVRANGE ranking 0 2 WITHSCORES

# 获取分数范围
ZRANGEBYSCORE ranking 90 110

# 获取元素排名
ZRANK ranking "user:A"    # 升序排名
ZREVRANK ranking "user:C"  # 降序排名

# 获取元素分数
ZSCORE ranking "user:A"

# 增加分数
ZINCRBY ranking 5 "user:A"

# 移除元素
ZREM ranking "user:D"

# 获取集合大小
ZCARD ranking

# 统计分数范围内的元素数量
ZCOUNT ranking 90 110
```

### 7.7 其他实用命令

```redis
# 设置过期时间
SET resource "data"
EXPIRE resource 3600  # 1 小时后过期
TTL resource           # 查看剩余时间（秒）

# 查看剩余生存时间
TTL resource    # 返回剩余秒数；-1 表示永不过期；-2 表示不存在
PTTL resource   # 毫秒级精度

# 取消过期（变为永久）
PERSIST resource

# 重命名 key
RENAME old_key new_key
RENAMENX old_key new_key  # 仅当 new_key 不存在时重命名

# 检查 key 是否存在
EXISTS resource  # 返回 1 存在，0 不存在

# 移动 key 到另一个数据库
MOVE resource 1

# 随机获取一个 key
RANDOMKEY

# 序列化/反序列化
DUMP resource   # 序列化
RESTORE new_key 0 <serialized_value>  # 反序列化

# 匹配 key（不阻塞）
SCAN 0 MATCH user:* COUNT 100
```

### 7.8 发布订阅

```redis
# 订阅频道
SUBSCRIBE news:technology news:finance

# 订阅模式（使用通配符）
PSUBSCRIBE news:*

# 向频道发布消息
PUBLISH news:technology "Redis 7.2 发布了！"
# 所有订阅该频道的客户端都会收到消息，返回接收者数量

# 取消订阅
UNSUBSCRIBE news:technology
PUNSUBSCRIBE news:*
```

---

## 八、Redis 架构概览

### 8.1 整体架构

Redis 的整体架构可以分为以下几个核心部分：

```
┌─────────────────────────────────────────────────────────┐
│                     客户端应用                            │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐              │
│  │  Web App │  │ Mobile   │  │ 其他服务  │              │
│  └─────┬────┘  └─────┬────┘  └─────┬────┘              │
├────────┼─────────────┼─────────────┼────────────────────┤
│        ▼             ▼             ▼                    │
│  ┌──────────────────────────────────────────────┐      │
│  │           网络层 (Network Layer)               │      │
│  │  TCP 协议 → Redis 协议 → 连接管理              │      │
│  └────────────────────┬─────────────────────────┘      │
├────────────────────────┼────────────────────────────────┤
│                        ▼                                │
│  ┌──────────────────────────────────────────────┐      │
│  │         事件循环层 (Event Loop)                │      │
│  │  I/O 多路复用 → 文件事件 → 时间事件             │      │
│  └────────────────────┬─────────────────────────┘      │
├────────────────────────┼────────────────────────────────┤
│                        ▼                                │
│  ┌──────────────────────────────────────────────┐      │
│  │        命令执行层 (Command Execution)          │      │
│  │  命令解析 → 命令路由 → 命令执行                 │      │
│  └────────────────────┬─────────────────────────┘      │
├────────────────────────┼────────────────────────────────┤
│                        ▼                                │
│  ┌──────────────────────────────────────────────┐      │
│  │         数据管理层 (Data Management)           │      │
│  │  内存管理 → 数据结构 → 持久化 → 复制           │      │
│  └──────────────────────────────────────────────┘      │
└─────────────────────────────────────────────────────────┘
```

### 8.2 事件循环

Redis 的事件循环是其高性能的核心，基于 I/O 多路复用技术实现。

**I/O 多路复用**：
Redis 使用操作系统提供的 I/O 多路复用机制（epoll on Linux, kqueue on macOS/BSD, select on others），在单线程中同时处理数千个并发连接。

```
Redis 事件循环流程：

                    ┌──────────────┐
                    │  等待事件     │
                    │ (I/O 多路复用)│
                    └──────┬───────┘
                           │
                    ┌──────▼───────┐
                    │ 处理文件事件  │◄── 客户端请求到达
                    │ (socket 读写) │
                    └──────┬───────┘
                           │
                    ┌──────▼───────┐
                    │ 处理时间事件  │◄── 定时任务（过期、复制等）
                    │ (serverCron)  │
                    └──────┬───────┘
                           │
                    ┌──────▼───────┐
                    │ 执行命令     │
                    │ (读写内存)    │
                    └──────┬───────┘
                           │
                    ┌──────▼───────┐
                    │ 返回结果     │
                    │ (协议序列化)  │
                    └──────────────┘
```

**两种事件类型**：
- **文件事件（File Event）**：与 socket 操作相关，包括客户端的连接、数据读写等
- **时间事件（Time Event）**：定时任务，包括 key 过期检查、复制超时检测、持久化触发等

### 8.3 内存结构

Redis 的内存结构分为以下几个主要部分：

```
Redis 内存布局：

┌─────────────────────────────────────────────┐
│                  Redis 进程内存               │
├─────────────────────────────────────────────┤
│                                             │
│  ┌─────────────────────────────────────┐   │
│  │            数据区 (Dataset)           │   │
│  │  ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐   │   │
│  │  │Key- │ │Key- │ │Key- │ │Key- │   │   │
│  │  │Value│ │Value│ │Value│ │Value│   │   │
│  │  └──┬──┘ └──┬──┘ └──┬──┘ └──┬──┘   │   │
│  │     │       │       │       │       │   │
│  │  ┌──▼──┐ ┌──▼──┐ ┌──▼──┐ ┌──▼──┐   │   │
│  │  │String│ │Hash │ │List │ │ Set │   │   │
│  │  └─────┘ └─────┘ └─────┘ └─────┘   │   │
│  └─────────────────────────────────────┘   │
│                                             │
│  ┌─────────────────────────────────────┐   │
│  │          持久化缓冲区                 │   │
│  │  RDB 缓冲区 │ AOF 缓冲区 │ 复制缓冲区  │   │
│  └─────────────────────────────────────┘   │
│                                             │
│  ┌─────────────────────────────────────┐   │
│  │          客户端输出缓冲区             │   │
│  │  client 1 │ client 2 │ ...           │   │
│  └─────────────────────────────────────┘   │
│                                             │
│  ┌─────────────────────────────────────┐   │
│  │          内存管理开销                 │   │
│  │  jemalloc 元数据 │ 碎片整理          │   │
│  └─────────────────────────────────────┘   │
│                                             │
└─────────────────────────────────────────────┘
```

**字典结构**：
Redis 使用字典（Dict）作为核心数据结构，存储所有 key-value 对。

```
Redis 字典结构：

┌─────────────────────────────────────────┐
│              Redis Dict                  │
├─────────────────────────────────────────┤
│  ┌─────────────────────────────────┐   │
│  │           Hash Table 0          │   │
│  │  ┌───┬───┬───┬───┬───┬───┬─┐  │   │
│  │  │ 0 │ 1 │ 2 │ 3 │...│n-1│ │  │   │
│  │  └─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┴─┘  │   │
│  │    │   │   │   │   │   │          │   │
│  │    ▼   ▼   ▼   ▼   ▼   ▼          │   │
│  │  ┌─┐ ┌─┐ ┌─┐ ┌─┐ ┌─┐ ┌─┐        │   │
│  │  │K│ │K│ │K│ │K│ │K│ │K│        │   │
│  │  │V│ │V│ │V│ │V│ │V│ │V│        │   │
│  │  └─┘ └─┘ └─┘ └─┘ └─┘ └─┘        │   │
│  └─────────────────────────────────┘   │
│                                         │
│  ┌─────────────────────────────────┐   │
│  │           Hash Table 1          │   │
│  │  （用于渐进式 rehash）           │   │
│  └─────────────────────────────────┘   │
│                                         │
│  rehashidx: 0  ← 正在 rehash 的位置    │
│  size/mask: 哈希表大小                │
└─────────────────────────────────────────┘
```

**渐进式 Rehash**：
Redis 采用渐进式 rehash 策略来扩展哈希表，避免一次性 rehash 造成阻塞：

1. 分配新的哈希表（容量是旧表的 2 倍）
2. 每次 rehash 只迁移一个索引位置的所有键
3. rehash 期间，查询操作同时在两个表中查找
4. rehash 完成后，释放旧表

### 8.4 数据过期

Redis 支持 key 的自动过期机制：

```
过期检查流程：

┌─────────────────────────────────────────────┐
│            定期检查 (serverCron)              │
├─────────────────────────────────────────────┤
│  1. 每 100ms 执行一次                        │
│  2. 随机抽取 20 个设置了过期时间的 key        │
│  3. 检查是否过期，删除已过期的 key            │
│  4. 如果过期比例超过 25%，重复步骤 2-3        │
│  5. 时间复杂度：O(N)，但 N 通常很小          │
└─────────────────────────────────────────────┘

┌─────────────────────────────────────────────┐
│            惰性删除 (Lazy Expire)            │
├─────────────────────────────────────────────┤
│  1. 客户端访问 key 时检查是否过期            │
│  2. 如果过期，先删除 key，再返回 nil          │
│  3. 优点：CPU 友好，不主动消耗 CPU           │
│  4. 缺点：如果 key 不再被访问，会一直占用内存 │
└─────────────────────────────────────────────┘
```

### 8.5 单进程架构的优缺点

**优点**：
- 简单可靠：无锁竞争，无死锁问题
- 性能稳定：亚毫秒级延迟
- 易于实现：代码逻辑清晰

**缺点**：
- 无法利用多核 CPU
- 单节点内存受限（32~64GB）
- 单点故障风险

**解决方案**：
- 主从复制：读写分离，提升读性能
- 集群分片：水平扩展，提升容量和性能
- Redis 6.0 I/O 多线程：网络 I/O 使用多线程
- Redis 8.0（商业版）：部分操作支持多线程

---

## 本章小结

本章我们全面介绍了 Redis 的历史发展、核心特点、应用场景、安装配置和架构设计。重点包括：

1. **Redis 核心优势**：极致性能（10万+ QPS）、丰富数据类型、单线程架构
2. **应用场景**：缓存、会话管理、排行榜、计数器、消息队列、分布式锁、地理位置
3. **安装部署**：推荐 Docker 方式，支持 Windows（WSL）、Linux、macOS
4. **配置调优**：通过 `redis.conf` 配置持久化、内存、安全等关键参数
5. **架构理解**：事件循环 → 单线程执行 → 内存管理，形成 Redis 的高性能内核

在接下来的章节中，我们将深入学习 Redis 的数据类型、持久化机制、主从复制、集群模式等核心内容。