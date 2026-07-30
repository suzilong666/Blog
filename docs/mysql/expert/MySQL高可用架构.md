# MySQL 高可用架构

> 本文档系统性地讲解 MySQL 高可用架构设计，涵盖从主从复制基础、MHA、Orchestrator、Group Replication、InnoDB Cluster、ProxySQL 到云原生 HA 方案的完整体系，并提供架构选型建议和实战指导。

---

## 一、高可用性概述

### 1.1 什么是高可用性

高可用性（High Availability，HA）是指系统在故障发生时能够**快速恢复服务**的能力。衡量高可用性的核心指标：

- **SLA（Service Level Agreement）**：服务等级协议，承诺的可用性水平
- **SLO（Service Level Objective）**：服务等级目标，实际追求的可用性目标
- **SLI（Service Level Indicator）**：服务等级指标，实际测量的可用性

```
可用性计算公式:
可用性 = 正常运行时间 / (正常运行时间 + 故障时间) × 100%

99.99% 可用性:
  年故障时间 ≈ 52.6 分钟
  月故障时间 ≈ 4.4 分钟
  日故障时间 ≈ 8.6 秒

99.999% 可用性:
  年故障时间 ≈ 5.3 分钟
```

### 1.2 高可用性的层次

```
L1: 基础设施层
  ├── 服务器冗余（多台服务器）
  ├── 网络冗余（多网卡、多路由）
  ├── 电源冗余（UPS、双路电源）
  └── 存储冗余（RAID、分布式存储）

L2: 数据层
  ├── 数据复制（主从复制、组复制）
  ├── 数据备份（逻辑备份、物理备份）
  ├── 数据校验（一致性检查）
  └── 数据恢复（PITR）

L3: 服务层
  ├── 故障检测（心跳、监控告警）
  ├── 故障转移（自动、手动）
  ├── 读写分离（负载均衡）
  └── 连接管理（连接池、路由）

L4: 应用层
  ├── 重试机制（幂等操作）
  ├── 熔断降级（Circuit Breaker）
  ├── 多活部署（跨机房部署）
  └── 流量切换（DNS、VIP）
```

### 1.3 单点故障与 HA 需求

**单点故障（Single Point of Failure，SPOF）** 是指系统中一旦发生故障就会导致整个服务中断的组件。

```
┌──────────┐     ┌──────────┐
│  应用服务 │────→│  MySQL   │  ← 单点！
│  (App)   │     │  Master  │
└──────────┘     └──────────┘
                      │
                      │ 单点故障
                      ▼
                 业务完全中断
```

**HA 的核心目标**：
1. **数据不丢失**：任何故障场景下数据都不丢失
2. **服务不中断**：故障切换过程中服务尽可能不中断
3. **快速恢复**：故障发生后快速恢复服务
4. **自动切换**：自动检测故障并完成切换

---

## 二、主从复制基础架构

### 2.1 主从复制架构

主从复制是 MySQL 高可用的基础，通过将主库的数据同步到从库，实现数据冗余和读负载均衡。

```
┌─────────────┐                    ┌─────────────┐
│  主库 (Master) │─── Binlog ────→ │  从库 (Slave) │
│  写入请求     │     (二进制日志)   │  复制请求    │
└─────────────┘                    └─────────────┘
       │                                │
       │                                │ IO Thread 拉取 Binlog
       │                                ▼
       │                           ┌─────────────┐
       │                           │  Relay Log   │
       │                           │  (中继日志)   │
       │                           └──────┬──────┘
       │                                  │ SQL Thread 执行
       │                                  ▼
       │                           ┌─────────────┐
       │                           │  执行变更    │
       │                           └─────────────┘
       │
       ▼
┌─────────────┐
│  从库 (Slave2) │  ← 可以有多个从库
└─────────────┘
```

**主从复制的三个线程**：
1. **Binlog Dump Thread**（主库）：将 Binlog 事件发送给从库
2. **IO Thread**（从库）：接收 Binlog 事件并写入 Relay Log
3. **SQL Thread**（从库）：读取 Relay Log 事件并执行

### 2.2 主从架构的局限

1. **主库单点**：主库仍然是单点，写入压力集中
2. **复制延迟**：主从之间存在复制延迟（通常毫秒级，高负载下可能达到秒级）
3. **读写分离**：从库只能读，不能写
4. **故障转移**：需要手动切换，切换时间长
5. **从库扩展**：增加从库可以分担读压力，但主库仍是瓶颈

### 2.3 读负载均衡

通过读写分离将读请求分发到从库：

```
         ┌──────────────┐
         │   应用程序    │
         └──────┬───────┘
                │
         ┌──────┴───────┐
         │ 读写分离中间件 │
         │  (ProxySQL等) │
         └──┬───────┬───┘
            │       │
  写请求 ←──┘       └──→ 读请求
            │       │
            ▼       ▼
      ┌──────────┐  ┌──────────┐
      │  主库     │  │  从库    │
      │ (Master) │  │ (Slave)  │
      └──────────┘  └──────────┘
                           │
                           ▼
                     ┌──────────┐
                     │  从库2   │
                     └──────────┘
```

### 2.4 故障转移需求

```
┌──────────┐     ┌──────────┐     ┌──────────┐
│  主库     │────→│  从库     │────→│  从库2   │
│ (Master) │     │ (Slave1) │     │ (Slave2) │
└────┬─────┘     └──────────┘     └──────────┘
     │
     │ 主库宕机！
     ▼
  业务中断！需要：
  1. 检测主库故障
  2. 选择一个从库作为新主库
  3. 将其他从库指向新主库
  4. 更新应用连接配置
```

---

## 三、主备切换方案

### 3.1 MHA（Master High Availability）

MHA 是早期最流行的 MySQL 主从高可用方案，由日本开发者开发。

#### MHA 架构

```
┌──────────┐     ┌──────────┐     ┌──────────┐
│  主库     │────→│  从库     │────→│  从库2   │
└────┬─────┘     └────┬─────┘     └────┬─────┘
     │                │                │
     │   SSH 连接     │   SSH 连接     │   SSH 连接
     └────────────────┼────────────────┘
                      │
                      ▼
               ┌─────────────┐
               │  MHA Node    │
               │  (管理节点)  │
               └─────────────┘
                      │
                      ▼
               ┌─────────────┐
               │  MHA Manager │
               │  (管理进程)  │
               └─────────────┘
```

#### MHA 工作流程

```
1. 初始化: MHA Manager 通过 SSH 连接所有节点，检查主从状态
2. 正常运行: 定期 ping 主库，检查主从延迟、复制状态
3. 主库故障:
   a. 检测到主库不可达
   b. 选择最新的从库作为新主库
   c. 将其他从库的 Relay Log 补全到与旧主库一致
   d. 提升新主库为 Master
   e. 将其他从库指向新主库
   f. 更新应用配置
4. 故障恢复: 旧主库恢复后变为新主库的从库
```

#### MHA 配置与使用

```bash
# /etc/mha/app1.cnf
[server default]
manager_workdir=/var/log/mha/app1
manager_log=/var/log/mha/app1/manager.log
user=mha
password=mha_password
ssh_user=root
repl_user=repl
repl_password=repl_password
ping_interval=10
master_ip_failover_script=/usr/local/bin/master_ip_failover

[server1]
hostname=192.168.1.101
port=3306
candidate_master=1
check_repl_delay=0

[server2]
hostname=192.168.1.102
port=3306
candidate_master=1

[server3]
hostname=192.168.1.103
port=3306
```

```bash
# 检查配置
masterha_check_repl --conf=/etc/mha/app1.cnf
masterha_check_ssh --conf=/etc/mha/app1.cnf

# 启动 MHA Manager
masterha_manager --conf=/etc/mha/app1.cnf --remove_dead_master_conf

# 手动故障转移
masterha_master_switch --master_state=dead \
    --conf=/etc/mha/app1.cnf --dead_master_host=192.168.1.101

# 在线切换
masterha_master_switch --master_state=alive --conf=/etc/mha/app1.cnf
```

#### MHA 优缺点

**优点**：
- 成熟稳定，开源免费
- 支持自动故障转移和在线切换
- 主从切换时补全 Binlog，保证数据一致性

**缺点**：
- 依赖 SSH，存在安全风险
- 故障转移可能丢失少量数据
- 切换速度较慢（30秒-2分钟）
- 官方维护较少

### 3.2 Orchestrator

Orchestrator 是由 Booking.com 开发的 MySQL 高可用管理工具，功能比 MHA 更强大。

```
┌──────────┐     ┌──────────┐     ┌──────────┐
│  主库     │────→│  从库     │────→│  从库2   │
└────┬─────┘     └────┬─────┘     └────┬─────┘
     │                │                │
     └────────────────┼────────────────┘
                      │
              Orchestrator 拓扑发现
                      │
                      ▼
               ┌──────────────────┐
               │  Orchestrator     │
               │  (raft 集群)      │
               │  ├── API Server   │
               │  ├── Core Engine  │
               │  └── Graph (拓扑) │
               └──────────────────┘
                      │
                      ▼
               ┌──────────────────┐
               │  Web UI / API     │
               └──────────────────┘
```

**Orchestrator 故障转移流程**：
1. 故障检测：持续数据库连接检测主库状态（间隔 5s，超时 30s）
2. 拓扑分析：分析主从拓扑，找出候选从库
3. 选择新主库：优先选择 Binlog 最接近旧主库的从库
4. 数据补全：补全其他从库缺失的 Relay Log
5. 角色切换：提升新主库，将其他从库指向新主库

```bash
# Orchestrator 常用命令
orchestrator topology 192.168.1.101:3306
orchestrator failover 192.168.1.101:3306
orchestrator graceful-switch 192.168.1.101:3306 192.168.1.102:3306
orchestrator register 192.168.1.101:3306
orchestrator discover 192.168.1.101:3306
```

### 3.3 Keepalived + 脚本方案

Keepalived + 自定义脚本通过 VIP（虚拟 IP）实现故障转移。

```
正常状态:
┌──────────────────┐     ┌──────────────────┐
│  MySQL Master    │     │  MySQL Slave     │
│  192.168.1.101   │     │  192.168.1.102   │
│  VIP: 192.168.1.100 (主)│  Keepalived Back-up│
└──────────────────┘     └──────────────────┘

故障状态:
┌──────────────────┐     ┌──────────────────┐
│  MySQL Master    │     │  MySQL Slave     │
│  故障！          │     │  VIP: 192.168.1.100│
└──────────────────┘     └──────────────────┘
```

```bash
# /etc/keepalived/keepalived.conf
vrrp_script chk_mysql {
    script "/etc/keepalived/check_mysql.sh"
    interval 2
    weight -20
    fall 2
    rise 1
}

vrrp_instance VI_1 {
    state MASTER
    interface eth0
    virtual_router_id 51
    priority 100
    advert_int 1
    authentication {
        auth_type PASS
        auth_pass 12345678
    }
    virtual_ipaddress { 192.168.1.100 }
    track_script { chk_mysql }
    notify_master "/etc/keepalived/master.sh"
}
```

```bash
# /etc/keepalived/check_mysql.sh
#!/bin/bash
MYSQL_OK=$(/usr/bin/mysql -uroot -p'password' -e "SELECT 1" 2>/dev/null)
if [ "$MYSQL_OK" = "1" ]; then
    exit 0
else
    exit 1
fi
```

---

## 四、MySQL Group Replication

### 4.1 组复制架构

MySQL Group Replication 是 MySQL 原生的高可用方案，基于 **Paxos 协议**实现分布式一致性。

```
┌─────────────────────────────────────────────────────┐
│              Group Replication 集群                  │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐           │
│  │ 节点 1    │  │ 节点 2    │  │ 节点 3    │           │
│  │ (Master) │  │ (Master) │  │ (Master) │           │
│  └─────┬────┘  └─────┬────┘  └─────┬────┘           │
│        └──────────────┼──────────────┘                │
│              Paxos 协议通信                           │
│  ┌────────────────────────────────────────────┐      │
│  │  Group Replication Plugin                   │      │
│  │  ├── MySQL Server (SQL执行)                │      │
│  │  ├── Group Communication (Paxos)           │      │
│  │  └── Recovery Module (状态同步)            │      │
│  └────────────────────────────────────────────┘      │
└─────────────────────────────────────────────────────┘
```

### 4.2 Paxos 协议

Paxos 协议是一种分布式一致性协议。Group Replication 对其优化形成 **GCS（Group Communication System）**。

```
事务提交过程:
1. 节点 A 在本地执行事务 T
2. 将事务 T 的 Binlog 广播到组内所有节点
3. 所有节点对事务 T 进行投票（检查冲突）
4. 如果多数节点同意 → 节点 A 提交，其他节点也提交
5. 如果投票失败 → 节点 A 回滚事务 T
```

### 4.3 单主模式与多主模式

#### 单主模式（Single-Primary Mode）

```
┌──────────┐     ┌──────────┐     ┌──────────┐
│ 节点 1    │     │ 节点 2    │     │ 节点 3    │
│ PRIMARY  │     │ SECONDARY│     │ SECONDARY│
│ 读+写    │     │ 只读     │     │ 只读     │
└──────────┘     └──────────┘     └──────────┘
```

```sql
-- 配置单主模式
SET GLOBAL group_replication_single_primary_mode = ON;
START GROUP_REPLICATION;

-- 查看当前 PRIMARY
SELECT * FROM performance_schema.replication_group_members;
```

#### 多主模式（Multi-Primary Mode）

```
┌──────────┐     ┌──────────┐     ┌──────────┐
│ 节点 1    │     │ 节点 2    │     │ 节点 3    │
│ PRIMARY  │     │ PRIMARY  │     │ PRIMARY  │
│ 读+写    │     │ 读+写    │     │ 读+写    │
└──────────┘     └──────────┘     └──────────┘
```

```sql
SET GLOBAL group_replication_single_primary_mode = OFF;
START GROUP_REPLICATION;
```

**多主模式冲突处理**：采用乐观并发控制，检测到冲突时后提交的事务会被回滚。

### 4.4 故障检测与恢复

```
故障检测:
  节点 A ←→ 节点 B (互相心跳)
  节点 B 无响应（超过 election_timeout）→ 触发故障检测

故障恢复:
  1. 节点 B 故障恢复：重新启动 → 自动加入组 → 同步缺失 Binlog
  2. PRIMARY 故障：触发选举 → 选择新 PRIMARY → 接管写入
  3. 脑裂防护：必须获得多数节点同意才能成为 PRIMARY
```

```sql
-- 查看组状态
SELECT MEMBER_ID, MEMBER_STATE, MEMBER_ROLE 
FROM performance_schema.replication_group_members;

-- 强制恢复
SET GLOBAL group_replication_force_members = 'node1:24901,node2:24901';
```

### 4.5 Group Replication 配置示例

```ini
# my.cnf
[mysqld]
server-id=1
gtid_mode=ON
enforce_gtid_consistency=ON
binlog_format=ROW
log_slave_updates=ON

plugin-load='group_replication.so'

group_replication_group_name=aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee
group_replication_group_seeds=node1:24901,node2:24901,node3:24901
group_replication_local_address=node1:24901
group_replication_start_on_boot=ON
group_replication_single_primary_mode=ON
group_replication_ip_whitelist='192.168.1.0/24'
group_replication_election_timeout=60
```

---

## 五、MySQL InnoDB Cluster

### 5.1 完整的高可用方案

```
┌───────────────────────────────────────────────────────────────┐
│                    MySQL InnoDB Cluster                         │
│  ┌─────────────────────────────────────────────────────┐       │
│  │  MySQL Cluster (基于 Group Replication)               │       │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐          │       │
│  │  │ 节点 1    │  │ 节点 2    │  │ 节点 3    │          │       │
│  │  │ PRIMARY  │  │ SECONDARY│  │ SECONDARY│          │       │
│  │  └──────────┘  └──────────┘  └──────────┘          │       │
│  └─────────────────────────────────────────────────────┘       │
│                          │                                     │
│                    自动故障转移                                 │
│                          ▼                                     │
│  ┌─────────────────────────────────────────────────────┐       │
│  │  MySQL Router (路由 + 负载均衡 + 故障转移)            │       │
│  └─────────────────────────────────────────────────────┘       │
│                          │                                     │
│                          ▼                                     │
│  ┌─────────────────────────────────────────────────────┐       │
│  │  MySQL Shell (管理 + 监控 + 配置)                    │       │
│  └─────────────────────────────────────────────────────┘       │
└───────────────────────────────────────────────────────────────┘
```

### 5.2 MySQL Shell 管理

```bash
# 登录集群
mysqlsh root@localhost:3306 --js

# 创建集群
mysqlsh root@node1:3306 --js -e "
var cluster = dba.createCluster('myCluster', { communicationStack: 'MySQL' });
"

# 添加实例
mysqlsh root@node1:3306 --js -e "
var cluster = dba.getCluster('myCluster');
cluster.addInstance('root@node2:3306');
cluster.addInstance('root@node3:3306');
"

# 查看集群状态
mysqlsh root@node1:3306 --js -e "
var cluster = dba.getCluster('myCluster');
cluster.status();
"

# 故障转移
mysqlsh root@node1:3306 --js -e "
var cluster = dba.getCluster('myCluster');
cluster.failOver();
"
```

### 5.3 MySQL Router

MySQL Router 为应用提供透明的数据库访问：

```
┌──────────┐     ┌──────────────┐     ┌──────────┐
│  应用程序  │────→│ MySQL Router │────→│ 集群节点  │
│          │     │  (路由代理)   │     │          │
└──────────┘     └──────────────┘     └──────────┘
```

**MySQL Router 功能**：
- **读写路由**：写请求路由到 PRIMARY，读请求路由到 SECONDARY
- **故障转移**：自动检测 PRIMARY 故障并路由到新 PRIMARY
- **负载均衡**：在多个 SECONDARY 之间分发读请求
- **连接池**：复用数据库连接
- **防火墙**：隔离应用与集群内部拓扑

```bash
# 初始化 MySQL Router
mysqlrouter --bootstrap root@node1:3306 --directory=/path/to/router
```

---

## 六、ProxySQL

### 6.1 高性能代理层

ProxySQL 是 Percona 开发的高性能 MySQL 代理层。

```
┌─────────────────────────────────────────────────────────────┐
│  ProxySQL                                                    │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  Frontends (接收客户端连接)                           │   │
│  │  ├── MySQL 协议处理, 用户认证, 监听端口 6032         │   │
│  └─────────────────────────────────────────────────────┘   │
│                         │                                   │
│                         ▼                                   │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  Query Engine (查询处理)                              │   │
│  │  ├── 查询路由规则, 读写分离, 缓存, 防火墙, 改写      │   │
│  └─────────────────────────────────────────────────────┘   │
│                         │                                   │
│                         ▼                                   │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  Backends (后端 MySQL 节点)                           │   │
│  │  ├── 主库, 从库, 连接池管理                          │   │
│  └─────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

### 6.2 读写分离配置

```sql
-- 添加后端节点
INSERT INTO mysql_replication_hostnodes (
    hostgroup_id, hostname, port, comment
) VALUES 
(1, '192.168.1.101', 3306, 'Master'),
(1, '192.168.1.102', 3306, 'Slave1'),
(1, '192.168.1.103', 3306, 'Slave2');

-- 添加主从组关系
INSERT INTO mysql_replication_hostgroups (
    writer_hostgroup, reader_hostgroup, check_type, comment
) VALUES (10, 20, 'read_only', '读写分离组');

-- 配置查询路由规则
INSERT INTO mysql_query_rules (
    rule_id, active, match_digits, destination_hostgroup, apply, comment
) VALUES 
(1, 1, 0, 10, 1, '写请求路由到主库'),
(2, 1, 1, 20, 1, '读请求路由到从库');

-- 加载配置
LOAD MYSQL VARIABLES TO RUNTIME;
LOAD MYSQL SERVERS TO RUNTIME;
LOAD MYSQL QUERY RULES TO RUNTIME;
```

### 6.3 故障转移集成

```sql
-- ProxySQL 自动检查后端节点的 read_only 状态
-- read_only=OFF → 写节点, read_only=ON → 读节点

UPDATE mysql_replication_hostgroups 
SET check_type = 'read_only' 
WHERE writer_hostgroup = 10;

SELECT * FROM mysql_server_read_only_status;
```

### 6.4 查询路由与缓存

```sql
INSERT INTO mysql_query_rules (
    rule_id, active, match_pattern, destination_hostgroup,
    cache_ttl, apply, comment
) VALUES 
(1, 1, '^SELECT.*', 20, 0, 1, 'SELECT路由到从库'),
(2, 1, '^INSERT.*', 10, 0, 1, 'INSERT路由到主库'),
(3, 1, '^UPDATE.*', 10, 0, 1, 'UPDATE路由到主库'),
(4, 1, '^DELETE.*', 10, 0, 1, 'DELETE路由到主库'),
(5, 1, '^SELECT.*FOR UPDATE', 10, 0, 1, 'FOR UPDATE路由到主库'),
(6, 1, '^SELECT.*FROM orders', 20, 60, 1, '订单查询缓存60秒');

LOAD MYSQL QUERY RULES TO RUNTIME;
```

---

## 七、ShardingSphere + 主从

### 7.1 读写分离

```yaml
# shardingsphere.yaml
dataSources:
  master:
    url: jdbc:mysql://192.168.1.101:3306/db
    username: root
    password: password
  slave0:
    url: jdbc:mysql://192.168.1.102:3306/db
    username: root
    password: password

rules:
  - !READWRITE_SPLITTING
    dataSources:
      pr_ds:
        writeDataSourceName: master
        readDataSourceNames: [slave0]
        loadBalancerName: roundRobin
```

### 7.2 分布式事务

```yaml
transaction:
  type: XA  # 可选: LOCAL, XA, BASE
```

事务模式：LOCAL（本地）、XA（两阶段提交，强一致）、BASE（柔性事务，最终一致）

---

## 八、云原生高可用

### 8.1 RDS MySQL

```
┌───────────────────┐  ┌───────────────────┐
│  Primary Instance  │  │  Standby Instance  │
│  (可用区 A)        │  │  (可用区 B)        │
│  读写服务          │  │  只读服务          │
└────────┬──────────┘  └────────┬──────────┘
         │ 异步复制              │
         └──────────────────────┘

┌───────────────────┐  ┌───────────────────┐
│  Read Replica 1   │  │  Read Replica 2   │
│  (可用区 C)        │  │  (可用区 D)        │
└───────────────────┘  └───────────────────┘

Multi-AZ 自动故障转移: RTO < 60秒
```

**RDS 高可用特性**：
- Multi-AZ 部署、读副本、自动备份、PITR、自动补丁升级

### 8.2 Aurora

```
┌──────────┐  ┌──────────┐  ┌──────────┐
│  Writer   │  │  Reader  │  │  Reader  │
│  Node     │  │  Node 1  │  │  Node 2  │
└─────┬─────┘  └─────┬─────┘  └─────┬─────┘
      └──────────────┼──────────────┘
                     │
                     ▼
      Aurora Storage Layer (6副本)
      Writer 节点单点 → 自动故障转移: RTO < 30秒
```

**Aurora 核心创新**：存储计算分离、6 副本存储、共享存储、快速故障转移、5× 性能、Serverless

### 8.3 云厂商 HA 方案对比

| 特性 | AWS RDS | AWS Aurora | Azure MySQL | GCP Cloud SQL |
|------|---------|------------|-------------|---------------|
| RTO | < 60s | < 30s | < 60s | < 60s |
| 多AZ | 支持 | 支持 | 支持 | 支持 |
| Serverless | 部分 | 支持 | 不支持 | 支持 |
| MySQL 兼容 | 完全 | 大部分 | 完全 | 完全 |
| 性能 | 基准 | 5×基准 | 基准 | 基准 |

---

## 九、高可用设计考量

### 9.1 切换速度

```
方案对比:
  MHA: 30s-2min / RPO < 1s
  Orchestrator: 30-60s / RPO < 1s
  Group Replication: < 30s / RPO 0
  InnoDB Cluster: < 30s / RPO 0
  RDS Multi-AZ: < 60s / RPO < 1s
  Aurora: < 30s / RPO 0
```

提升措施：快速心跳（1s）、预分配 VIP、ProxySQL 透明切换、连接池复用、优化 DNS TTL。

### 9.2 数据一致性

```
强一致性: 所有节点同时刻数据一致 → Paxos/Raft
线性一致性: 全局顺序执行 → 单主模式
最终一致性: 经过时间后一致 → 异步复制
弱一致性: 可能长时间不一致 → 多主异步
```

保证措施：Group Replication、同步复制、监控延迟、GTID、`pt-table-checksum` 校验。

### 9.3 脑裂防护

脑裂（Split-Brain）是 HA 中最危险的场景——两个节点都认为自己是主库。

```
脑裂场景:
┌──────────┐     网络分区     ┌──────────┐
│ 节点 A    │─────×───────────│ 节点 B    │
│ 认为自己  │                  │ 认为自己  │
│ 是主库    │                  │ 是主库    │
│ 接受写入  │                  │ 接受写入  │
└──────────┘                  └──────────┘
```

防护机制：
1. **Quorum**：获得多数节点同意才能成为主库（奇数节点：3、5、7）
2. **Fencing**：降级时隔离网络（IPMI、iDRAC、防火墙）
3. **Watchdog**：硬件看门狗自动重启
4. **心跳检测**：连续 N 次失败触发转移

### 9.4 容量规划

```
容量规划维度:
  ├── 读写容量: QPS/TPS/峰值/增长
  ├── 存储容量: 数据量/增长率/备份/日志
  ├── 网络带宽: 复制带宽/访问带宽/峰值
  ├── 计算资源: CPU/内存/IOPS/网络
  └── 高可用冗余: 故障转移后能否承担全部流量
```

---

## 十、监控与告警

### 10.1 核心监控指标

```
基础资源: CPU < 70%, 内存 < 80%, 磁盘 < 80%, IO等待 < 20%
MySQL 性能: QPS/TPS, 连接数, 慢查询, Buffer Pool 命中率 > 99%
复制状态: IO/SQL 线程状态, 复制延迟 < 1s, GTID 进度
高可用: 集群节点状态, 主从角色, 故障转移历史
```

### 10.2 Prometheus + Grafana

```
┌──────────────────┐     ┌──────────────┐     ┌──────────────┐
│ MySQL Exporter   │────→│  Prometheus  │────→│  Grafana     │
│ (node1:9104)     │     │  (时序数据库) │     │  (可视化)    │
└──────────────────┘     └──────┬───────┘     └──────────────┘
                                 │ Alertmanager
                                 ▼
                          ┌──────────────┐
                          │  告警通知     │
                          │ (邮件/短信)   │
                          └──────────────┘
```

### 10.3 告警规则示例

```yaml
rules:
  - alert: MySQLReplicationLag
    expr: mysql_slave_status_seconds_behind_master > 60
    for: 5m
    labels:
      severity: warning
    annotations:
      summary: 复制延迟超过 60 秒

  - alert: MySQLMasterDown
    expr: mysql_slave_status_master_up == 0
    for: 1m
    labels:
      severity: critical
    annotations:
      summary: 主库宕机

  - alert: MySQLConnectionsHigh
    expr: mysql_connections_used / mysql_connections_max > 0.8
    for: 10m
    labels:
      severity: warning
```

告警分级：P0（紧急，电话15分钟响应）→ P1（警告，短信2小时响应）→ P2（提示，邮件工作时间处理）→ P3（低优先级，日报汇总）

---

## 十一、灾备与异地复制

### 11.1 同城灾备

```
┌──────────────────┐     ┌──────────────────┐
│  主数据中心       │     │  同城灾备中心     │
│  (城市A-区域1)    │     │  (城市A-区域2)    │
│  MySQL 集群 (主)  │────→│  MySQL 集群 (备)  │
│                  │同步 │                  │
│  RTO: 分钟级     │复制 │ 数据延迟: 毫秒级  │
│  RPO: 秒级       │     │                  │
└──────────────────┘     └──────────────────┘
```

### 11.2 异地灾备

```
┌──────────────────┐         ┌──────────────────┐
│  主数据中心(北京) │         │  异地灾备(上海)   │
│  MySQL 集群 (主)  │──异步──→│  MySQL 集群 (备)  │
│                  │复制   │                  │
│  RTO: 小时级     │         │ 数据延迟: 秒-分钟│
│  RPO: 分钟级     │         │                  │
└──────────────────┘         └──────────────────┘
```

灾备复制方式：MySQL 异步复制、半同步复制、Binlog 异地备份、存储级复制。

### 11.3 灾备切换演练

```
1. 制定演练计划（时间、范围、角色、回滚方案）
2. 灾备就绪检查（数据同步、网络、性能、可用性）
3. 执行切换（停止写入→等待同步→提升灾备→更新配置→验证）
4. 切换后验证（数据完整性、功能正常、RTO/RPO测量、性能测试）
5. 切换回主库
6. 总结改进（记录问题、评估达标、更新预案）
```

---

## 十二、高可用架构选型

### 12.1 不同规模的 HA 方案

#### 小型团队（< 10 人，QPS < 1000）

```
推荐: 主从复制 + Keepalived
优点: 架构简单、成本低
缺点: 半自动故障转移、脑裂风险
```

#### 中型团队（10-50 人，QPS 1000-10000）

```
推荐: MHA + ProxySQL
优点: 自动故障转移、读写分离
缺点: MHA 活跃开发较少、切换30s+
```

#### 大型团队（50+ 人，QPS > 10000）

```
推荐: Group Replication + ProxySQL
优点: 强一致性、秒级切换、原生多主
缺点: 架构复杂、网络要求高
```

#### 云原生

```
推荐: RDS Multi-AZ / Aurora
优点: 零运维、内置高可用、自动备份
缺点: 成本较高、供应商锁定
```

### 12.2 成本与复杂度权衡

```
决策因素:
  1. 故障切换时间: < 30s → Group Replication/Aurora; 30-60s → MHA; 无要求 → Keepalived
  2. 数据一致性: 强一致 → Group Replication; 最终一致 → 主从复制
  3. 团队能力: 有运维能力 → 自建方案; 无运维能力 → 云服务
  4. 业务规模: 小规模 → 简单方案; 大规模 → 复杂方案
  5. 预算: 低 → Keepalived; 中 → MHA; 高 → Group Replication/云
  6. 跨机房: 是 → 异地灾备; 否 → 同城双活
```

### 12.3 实战选型建议

```
推荐方案矩阵:
┌────────────┬─────────────────────────┬──────────────────────┐
│ 场景        │ 推荐方案                │ 核心理由              │
├────────────┼─────────────────────────┼──────────────────────┤
│ 初创公司    │ 主从 + Keepalived       │ 简单可靠、成本低      │
│ 中型电商    │ MHA + ProxySQL          │ 自动故障、读写分离    │
│ 大型互联网  │ Group Replication + ProxySQL │ 强一致、高性能 │
│ 金融核心    │ InnoDB Cluster + 异地灾备 │ 最强一致性、合规     │
│ 云服务商    │ RDS Multi-AZ / Aurora  │ 零运维、弹性扩展      │
└────────────┴─────────────────────────┴──────────────────────┘
```

---

## 总结

MySQL 高可用架构是一个系统工程，需要从硬件、网络、数据、服务、应用多个层面综合考虑。通过对主从复制、MHA、Orchestrator、Group Replication、InnoDB Cluster、ProxySQL、云原生方案的全面剖析，我们可以看到：

1. **没有银弹**：每种方案都有其适用场景和 trade-off
2. **分层设计**：从基础设施到应用层，每层都需要考虑高可用
3. **数据优先**：数据一致性是 HA 的第一要务
4. **自动化**：从半自动到全自动，减少人为干预
5. **定期演练**：只有经过实战检验的 HA 方案才是可靠的

在实际工作中，需要根据业务规模、团队能力、预算约束、一致性要求等因素，选择最适合的 HA 方案。同时，定期进行故障演练和灾备切换演练，确保 HA 方案在真正的故障场景下能够有效工作。