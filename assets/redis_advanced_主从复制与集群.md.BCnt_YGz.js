import{_ as a,o as n,c as i,ah as l}from"./chunks/framework.CPHJ30oF.js";const g=JSON.parse('{"title":"Redis 主从复制、哨兵与集群模式","description":"","frontmatter":{},"headers":[{"level":2,"title":"一、高可用概述","slug":"一、高可用概述","link":"#一、高可用概述","children":[{"level":3,"title":"1.1 为什么需要高可用","slug":"_1-1-为什么需要高可用","link":"#_1-1-为什么需要高可用","children":[]},{"level":3,"title":"1.2 Redis 高可用演进路线","slug":"_1-2-redis-高可用演进路线","link":"#_1-2-redis-高可用演进路线","children":[]},{"level":3,"title":"1.3 三种架构对比一览","slug":"_1-3-三种架构对比一览","link":"#_1-3-三种架构对比一览","children":[]}]},{"level":2,"title":"二、主从复制（Replication）","slug":"二、主从复制-replication","link":"#二、主从复制-replication","children":[{"level":3,"title":"2.1 主从复制架构","slug":"_2-1-主从复制架构","link":"#_2-1-主从复制架构","children":[]},{"level":3,"title":"2.2 主从复制原理","slug":"_2-2-主从复制原理","link":"#_2-2-主从复制原理","children":[{"level":4,"title":"2.2.1 复制 ID（Replication ID）与 Offset","slug":"_2-2-1-复制-id-replication-id-与-offset","link":"#_2-2-1-复制-id-replication-id-与-offset","children":[]},{"level":4,"title":"2.2.2 全量复制流程","slug":"_2-2-2-全量复制流程","link":"#_2-2-2-全量复制流程","children":[]},{"level":4,"title":"2.2.3 增量复制流程","slug":"_2-2-3-增量复制流程","link":"#_2-2-3-增量复制流程","children":[]},{"level":4,"title":"2.2.4 PSYNC 命令与断点续传","slug":"_2-2-4-psync-命令与断点续传","link":"#_2-2-4-psync-命令与断点续传","children":[]}]},{"level":3,"title":"2.3 主从配置","slug":"_2-3-主从配置","link":"#_2-3-主从配置","children":[{"level":4,"title":"2.3.1 主节点配置","slug":"_2-3-1-主节点配置","link":"#_2-3-1-主节点配置","children":[]},{"level":4,"title":"2.3.2 从节点配置","slug":"_2-3-2-从节点配置","link":"#_2-3-2-从节点配置","children":[]},{"level":4,"title":"2.3.3 主从配置命令","slug":"_2-3-3-主从配置命令","link":"#_2-3-3-主从配置命令","children":[]}]},{"level":3,"title":"2.4 主从延迟分析","slug":"_2-4-主从延迟分析","link":"#_2-4-主从延迟分析","children":[{"level":4,"title":"2.4.1 延迟产生的原因","slug":"_2-4-1-延迟产生的原因","link":"#_2-4-1-延迟产生的原因","children":[]},{"level":4,"title":"2.4.2 监控主从延迟","slug":"_2-4-2-监控主从延迟","link":"#_2-4-2-监控主从延迟","children":[]},{"level":4,"title":"2.4.3 延迟优化策略","slug":"_2-4-3-延迟优化策略","link":"#_2-4-3-延迟优化策略","children":[]}]},{"level":3,"title":"2.5 主从复制的应用","slug":"_2-5-主从复制的应用","link":"#_2-5-主从复制的应用","children":[{"level":4,"title":"2.5.1 读写分离","slug":"_2-5-1-读写分离","link":"#_2-5-1-读写分离","children":[]},{"level":4,"title":"2.5.2 数据备份","slug":"_2-5-2-数据备份","link":"#_2-5-2-数据备份","children":[]}]}]},{"level":2,"title":"三、哨兵模式（Sentinel）","slug":"三、哨兵模式-sentinel","link":"#三、哨兵模式-sentinel","children":[{"level":3,"title":"3.1 哨兵角色","slug":"_3-1-哨兵角色","link":"#_3-1-哨兵角色","children":[{"level":4,"title":"3.1.1 监控（Monitoring）","slug":"_3-1-1-监控-monitoring","link":"#_3-1-1-监控-monitoring","children":[]},{"level":4,"title":"3.1.2 提醒（Notification）","slug":"_3-1-2-提醒-notification","link":"#_3-1-2-提醒-notification","children":[]},{"level":4,"title":"3.1.3 自动故障转移（Failover）","slug":"_3-1-3-自动故障转移-failover","link":"#_3-1-3-自动故障转移-failover","children":[]},{"level":4,"title":"3.1.4 配置提供者（Configuration Provider）","slug":"_3-1-4-配置提供者-configuration-provider","link":"#_3-1-4-配置提供者-configuration-provider","children":[]}]},{"level":3,"title":"3.2 哨兵配置","slug":"_3-2-哨兵配置","link":"#_3-2-哨兵配置","children":[{"level":4,"title":"3.2.1 哨兵配置文件（sentinel.conf）","slug":"_3-2-1-哨兵配置文件-sentinel-conf","link":"#_3-2-1-哨兵配置文件-sentinel-conf","children":[]},{"level":4,"title":"3.2.2 关键参数详解","slug":"_3-2-2-关键参数详解","link":"#_3-2-2-关键参数详解","children":[]}]},{"level":3,"title":"3.3 故障转移流程","slug":"_3-3-故障转移流程","link":"#_3-3-故障转移流程","children":[{"level":4,"title":"3.3.1 主观下线（Subjectively Down）","slug":"_3-3-1-主观下线-subjectively-down","link":"#_3-3-1-主观下线-subjectively-down","children":[]},{"level":4,"title":"3.3.2 客观下线（Objectively Down）","slug":"_3-3-2-客观下线-objectively-down","link":"#_3-3-2-客观下线-objectively-down","children":[]},{"level":4,"title":"3.3.3 选举新主节点","slug":"_3-3-3-选举新主节点","link":"#_3-3-3-选举新主节点","children":[]},{"level":4,"title":"3.3.4 通知从节点并完成故障转移","slug":"_3-3-4-通知从节点并完成故障转移","link":"#_3-3-4-通知从节点并完成故障转移","children":[]}]},{"level":3,"title":"3.4 Raft 协议与领导者选举","slug":"_3-4-raft-协议与领导者选举","link":"#_3-4-raft-协议与领导者选举","children":[{"level":4,"title":"3.4.1 Raft 协议基础","slug":"_3-4-1-raft-协议基础","link":"#_3-4-1-raft-协议基础","children":[]},{"level":4,"title":"3.4.2 哨兵中的 Raft 选举","slug":"_3-4-2-哨兵中的-raft-选举","link":"#_3-4-2-哨兵中的-raft-选举","children":[]}]},{"level":3,"title":"3.5 哨兵集群部署","slug":"_3-5-哨兵集群部署","link":"#_3-5-哨兵集群部署","children":[{"level":4,"title":"3.5.1 部署奇数个哨兵","slug":"_3-5-1-部署奇数个哨兵","link":"#_3-5-1-部署奇数个哨兵","children":[]},{"level":4,"title":"3.5.2 三哨兵架构搭建实战","slug":"_3-5-2-三哨兵架构搭建实战","link":"#_3-5-2-三哨兵架构搭建实战","children":[]}]},{"level":3,"title":"3.6 哨兵常用命令","slug":"_3-6-哨兵常用命令","link":"#_3-6-哨兵常用命令","children":[]}]},{"level":2,"title":"四、集群模式（Cluster）","slug":"四、集群模式-cluster","link":"#四、集群模式-cluster","children":[{"level":3,"title":"4.1 集群架构","slug":"_4-1-集群架构","link":"#_4-1-集群架构","children":[]},{"level":3,"title":"4.2 哈希槽（Hash Slot）原理","slug":"_4-2-哈希槽-hash-slot-原理","link":"#_4-2-哈希槽-hash-slot-原理","children":[{"level":4,"title":"4.2.1 16384 个哈希槽","slug":"_4-2-1-16384-个哈希槽","link":"#_4-2-1-16384-个哈希槽","children":[]},{"level":4,"title":"4.2.2 CRC16 算法","slug":"_4-2-2-crc16-算法","link":"#_4-2-2-crc16-算法","children":[]},{"level":4,"title":"4.2.3 哈希标签（Hash Tag）","slug":"_4-2-3-哈希标签-hash-tag","link":"#_4-2-3-哈希标签-hash-tag","children":[]}]},{"level":3,"title":"4.3 Gossip 协议（集群节点通信）","slug":"_4-3-gossip-协议-集群节点通信","link":"#_4-3-gossip-协议-集群节点通信","children":[{"level":4,"title":"4.3.1 Gossip 基本原理","slug":"_4-3-1-gossip-基本原理","link":"#_4-3-1-gossip-基本原理","children":[]},{"level":4,"title":"4.3.2 Redis Gossip 的实现","slug":"_4-3-2-redis-gossip-的实现","link":"#_4-3-2-redis-gossip-的实现","children":[]},{"level":4,"title":"4.3.3 Gossip 消息类型","slug":"_4-3-3-gossip-消息类型","link":"#_4-3-3-gossip-消息类型","children":[]}]},{"level":3,"title":"4.4 MOVED 与 ASK 重定向","slug":"_4-4-moved-与-ask-重定向","link":"#_4-4-moved-与-ask-重定向","children":[{"level":4,"title":"4.4.1 MOVED 重定向","slug":"_4-4-1-moved-重定向","link":"#_4-4-1-moved-重定向","children":[]},{"level":4,"title":"4.4.2 ASK 重定向","slug":"_4-4-2-ask-重定向","link":"#_4-4-2-ask-重定向","children":[]},{"level":4,"title":"4.4.3 客户端处理流程","slug":"_4-4-3-客户端处理流程","link":"#_4-4-3-客户端处理流程","children":[]}]},{"level":3,"title":"4.5 集群配置","slug":"_4-5-集群配置","link":"#_4-5-集群配置","children":[{"level":4,"title":"4.5.1 集群节点配置","slug":"_4-5-1-集群节点配置","link":"#_4-5-1-集群节点配置","children":[]},{"level":4,"title":"4.5.2 集群配置文件（nodes.conf）","slug":"_4-5-2-集群配置文件-nodes-conf","link":"#_4-5-2-集群配置文件-nodes-conf","children":[]}]},{"level":3,"title":"4.6 集群搭建","slug":"_4-6-集群搭建","link":"#_4-6-集群搭建","children":[{"level":4,"title":"4.6.1 创建集群","slug":"_4-6-1-创建集群","link":"#_4-6-1-创建集群","children":[]},{"level":4,"title":"4.6.2 哈希槽迁移","slug":"_4-6-2-哈希槽迁移","link":"#_4-6-2-哈希槽迁移","children":[]}]},{"level":3,"title":"4.7 集群读写规则","slug":"_4-7-集群读写规则","link":"#_4-7-集群读写规则","children":[{"level":4,"title":"4.7.1 支持的命令","slug":"_4-7-1-支持的命令","link":"#_4-7-1-支持的命令","children":[]},{"level":4,"title":"4.7.2 多键命令的限制","slug":"_4-7-2-多键命令的限制","link":"#_4-7-2-多键命令的限制","children":[]}]},{"level":3,"title":"4.8 集群 vs 哨兵对比","slug":"_4-8-集群-vs-哨兵对比","link":"#_4-8-集群-vs-哨兵对比","children":[]}]},{"level":2,"title":"五、三种模式对比与选型建议","slug":"五、三种模式对比与选型建议","link":"#五、三种模式对比与选型建议","children":[{"level":3,"title":"5.1 功能对比","slug":"_5-1-功能对比","link":"#_5-1-功能对比","children":[]},{"level":3,"title":"5.2 性能对比","slug":"_5-2-性能对比","link":"#_5-2-性能对比","children":[]},{"level":3,"title":"5.3 选型建议","slug":"_5-3-选型建议","link":"#_5-3-选型建议","children":[{"level":4,"title":"小型项目（QPS < 5000，数据 < 4GB）","slug":"小型项目-qps-5000-数据-4gb","link":"#小型项目-qps-5000-数据-4gb","children":[]},{"level":4,"title":"中型项目（QPS 5000-50000，数据 < 16GB）","slug":"中型项目-qps-5000-50000-数据-16gb","link":"#中型项目-qps-5000-50000-数据-16gb","children":[]},{"level":4,"title":"大型项目（QPS > 50000，数据 > 16GB）","slug":"大型项目-qps-50000-数据-16gb","link":"#大型项目-qps-50000-数据-16gb","children":[]},{"level":4,"title":"选型决策流程","slug":"选型决策流程","link":"#选型决策流程","children":[]}]}]},{"level":2,"title":"六、实战：从零搭建高可用架构","slug":"六、实战-从零搭建高可用架构","link":"#六、实战-从零搭建高可用架构","children":[{"level":3,"title":"6.1 哨兵模式完整搭建","slug":"_6-1-哨兵模式完整搭建","link":"#_6-1-哨兵模式完整搭建","children":[]},{"level":3,"title":"6.2 集群模式完整搭建","slug":"_6-2-集群模式完整搭建","link":"#_6-2-集群模式完整搭建","children":[]}]},{"level":2,"title":"七、常见面试题","slug":"七、常见面试题","link":"#七、常见面试题","children":[{"level":3,"title":"7.1 主从复制相关","slug":"_7-1-主从复制相关","link":"#_7-1-主从复制相关","children":[]},{"level":3,"title":"7.2 哨兵模式相关","slug":"_7-2-哨兵模式相关","link":"#_7-2-哨兵模式相关","children":[]},{"level":3,"title":"7.3 集群模式相关","slug":"_7-3-集群模式相关","link":"#_7-3-集群模式相关","children":[]},{"level":3,"title":"7.4 综合对比","slug":"_7-4-综合对比","link":"#_7-4-综合对比","children":[]}]},{"level":2,"title":"总结","slug":"总结","link":"#总结","children":[]}],"relativePath":"redis/advanced/主从复制与集群.md","filePath":"redis/advanced/主从复制与集群.md"}'),p={name:"redis/advanced/主从复制与集群.md"};function e(t,s,h,k,r,d){return n(),i("div",null,[...s[0]||(s[0]=[l(`<h1 id="redis-主从复制、哨兵与集群模式" tabindex="-1">Redis 主从复制、哨兵与集群模式 <a class="header-anchor" href="#redis-主从复制、哨兵与集群模式" aria-label="Permalink to “Redis 主从复制、哨兵与集群模式”">​</a></h1><blockquote><p>本文档系统性地讲解 Redis 高可用架构，涵盖主从复制（Replication）、哨兵模式（Sentinel）和集群模式（Cluster）三种核心架构的原理、配置、实战与选型建议，并深入剖析 PSYNC 协议、Raft 领导者选举、Gossip 通信、哈希槽分片等关键机制。</p></blockquote><hr><h2 id="一、高可用概述" tabindex="-1">一、高可用概述 <a class="header-anchor" href="#一、高可用概述" aria-label="Permalink to “一、高可用概述”">​</a></h2><h3 id="_1-1-为什么需要高可用" tabindex="-1">1.1 为什么需要高可用 <a class="header-anchor" href="#_1-1-为什么需要高可用" aria-label="Permalink to “1.1 为什么需要高可用”">​</a></h3><p>Redis 作为内存数据库，以极高的性能著称，但单点部署存在严重的安全隐患：</p><ul><li><strong>数据丢失风险</strong>：Redis 将数据存储在内存中，进程重启或服务器宕机后数据会丢失（即使开启了 AOF/RDB 持久化，也可能丢失最后一段时间的数据）</li><li><strong>服务中断</strong>：单台 Redis 服务器故障会导致整个业务系统不可用</li><li><strong>容量瓶颈</strong>：单台 Redis 的内存容量受限于物理机器，无法无限扩展</li><li><strong>性能瓶颈</strong>：单节点的 QPS 有上限，无法支撑海量并发访问</li></ul><p><strong>高可用（High Availability，HA）</strong> 旨在通过架构设计消除单点故障，确保 Redis 服务在各种异常情况下仍能稳定运行。</p><h3 id="_1-2-redis-高可用演进路线" tabindex="-1">1.2 Redis 高可用演进路线 <a class="header-anchor" href="#_1-2-redis-高可用演进路线" aria-label="Permalink to “1.2 Redis 高可用演进路线”">​</a></h3><p>Redis 的高可用方案经历了从简单到复杂的演进过程，每一步都在解决前一阶段的痛点：</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>┌─────────────────────────────────────────────────────────────────────┐</span></span>
<span class="line"><span>│                        Redis HA 演进路线                             │</span></span>
<span class="line"><span>├─────────────────────────────────────────────────────────────────────┤</span></span>
<span class="line"><span>│                                                                     │</span></span>
<span class="line"><span>│  阶段一：单机模式                                                    │</span></span>
<span class="line"><span>│  ┌──────────────────────────────────┐                               │</span></span>
<span class="line"><span>│  │     Redis 单机实例                 │ ← 单点！无冗余、无扩展        │</span></span>
<span class="line"><span>│  │     （读写、存储都在一台机器上）    │                               │</span></span>
<span class="line"><span>│  └──────────────────────────────────┘                               │</span></span>
<span class="line"><span>│         │                                                           │</span></span>
<span class="line"><span>│         │ 痛点：单点故障、无数据冗余                                 │</span></span>
<span class="line"><span>│         ▼                                                           │</span></span>
<span class="line"><span>│  阶段二：主从复制（Replication）                                     │</span></span>
<span class="line"><span>│  ┌──────────┐         ┌──────────┐                                 │</span></span>
<span class="line"><span>│  │  主节点   │────────►│  从节点   │ ← 数据冗余、读写分离            │</span></span>
<span class="line"><span>│  │  (Master) │ 复制    │  (Slave)  │   但主节点仍是单点             │</span></span>
<span class="line"><span>│  └──────────┘         └──────────┘                                 │</span></span>
<span class="line"><span>│         │                                                           │</span></span>
<span class="line"><span>│         │ 痛点：主节点故障需手动切换、无自动故障转移                 │</span></span>
<span class="line"><span>│         ▼                                                           │</span></span>
<span class="line"><span>│  阶段三：哨兵模式（Sentinel）                                        │</span></span>
<span class="line"><span>│  ┌──────────┐         ┌──────────┐                                 │</span></span>
<span class="line"><span>│  │  主节点   │────────►│  从节点   │                                 │</span></span>
<span class="line"><span>│  └──────────┘         └──────────┘                                 │</span></span>
<span class="line"><span>│         ▲                                                           │</span></span>
<span class="line"><span>│         │ 监控 &amp; 自动故障转移                                       │</span></span>
<span class="line"><span>│  ┌──────┴───────┐                                                   │</span></span>
<span class="line"><span>│  │   哨兵集群    │ ← 自动故障转移、监控告警                          │</span></span>
<span class="line"><span>│  │  (Sentinel)  │   但数据仍在单节点、无横向扩展                     │</span></span>
<span class="line"><span>│  └──────────────┘                                                   │</span></span>
<span class="line"><span>│         │                                                           │</span></span>
<span class="line"><span>│         │ 痛点：单主架构、无法横向扩容                               │</span></span>
<span class="line"><span>│         ▼                                                           │</span></span>
<span class="line"><span>│  阶段四：集群模式（Cluster）                                        │</span></span>
<span class="line"><span>│  ┌──────────┐  ┌──────────┐  ┌──────────┐                         │</span></span>
<span class="line"><span>│  │  主节点1  │  │  主节点2  │  │  主节点3  │ ← 分片存储、横向扩展     │</span></span>
<span class="line"><span>│  │ (Slot0-5k)│  │(Slot5k-10k)│ │(Slot10k-16k)│ 自动故障转移          │</span></span>
<span class="line"><span>│  └─────┬────┘  └─────┬────┘  └─────┬────┘                         │</span></span>
<span class="line"><span>│        │             │             │                                │</span></span>
<span class="line"><span>│  ┌─────▼────┐  ┌─────▼────┐  ┌─────▼────┐                         │</span></span>
<span class="line"><span>│  │  从节点1  │  │  从节点2  │  │  从节点3  │                         │</span></span>
<span class="line"><span>│  └──────────┘  └──────────┘  └──────────┘                         │</span></span>
<span class="line"><span>│                                                                     │</span></span>
<span class="line"><span>└─────────────────────────────────────────────────────────────────────┘</span></span></code></pre></div><h3 id="_1-3-三种架构对比一览" tabindex="-1">1.3 三种架构对比一览 <a class="header-anchor" href="#_1-3-三种架构对比一览" aria-label="Permalink to “1.3 三种架构对比一览”">​</a></h3><table tabindex="0"><thead><tr><th>维度</th><th>主从复制</th><th>哨兵模式</th><th>集群模式</th></tr></thead><tbody><tr><td><strong>数据分布</strong></td><td>全量复制到所有从节点</td><td>全量复制到所有从节点</td><td>分片存储（16384 slot）</td></tr><tr><td><strong>读写能力</strong></td><td>主节点写，从节点读</td><td>主节点写，从节点读</td><td>多主写入，可横向扩展</td></tr><tr><td><strong>故障转移</strong></td><td>手动</td><td>自动（Raft 选举）</td><td>自动（Gossip 协议）</td></tr><tr><td><strong>存储扩展</strong></td><td>不支持</td><td>不支持</td><td>支持（添加节点）</td></tr><tr><td><strong>典型场景</strong></td><td>读多写少、小规模</td><td>中等规模、高可用要求</td><td>大规模、海量数据</td></tr></tbody></table><hr><h2 id="二、主从复制-replication" tabindex="-1">二、主从复制（Replication） <a class="header-anchor" href="#二、主从复制-replication" aria-label="Permalink to “二、主从复制（Replication）”">​</a></h2><h3 id="_2-1-主从复制架构" tabindex="-1">2.1 主从复制架构 <a class="header-anchor" href="#_2-1-主从复制架构" aria-label="Permalink to “2.1 主从复制架构”">​</a></h3><p>Redis 主从复制是实现高可用的基础。通过主从复制，一个 Redis 实例（主节点）的数据会自动同步到其他实例（从节点），从而实现数据冗余和读写分离。</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>                    ┌─────────────────────┐</span></span>
<span class="line"><span>                    │    客户端 (Client)   │</span></span>
<span class="line"><span>                    └──────────┬──────────┘</span></span>
<span class="line"><span>                               │</span></span>
<span class="line"><span>                    ┌──────────▼──────────┐</span></span>
<span class="line"><span>                    │   主节点 (Master)    │</span></span>
<span class="line"><span>                    │  - 处理写请求        │</span></span>
<span class="line"><span>                    │  - 接收读请求       │</span></span>
<span class="line"><span>                    │  - 维护 Replication│</span></span>
<span class="line"><span>                    │    Backlog          │</span></span>
<span class="line"><span>                    └──────────┬──────────┘</span></span>
<span class="line"><span>                               │</span></span>
<span class="line"><span>              ┌────────────────┼────────────────┐</span></span>
<span class="line"><span>              │   全量/增量复制   │                │</span></span>
<span class="line"><span>              ▼                ▼                ▼</span></span>
<span class="line"><span>       ┌──────────────┐ ┌──────────────┐ ┌──────────────┐</span></span>
<span class="line"><span>       │  从节点1      │ │  从节点2      │ │  从节点3      │</span></span>
<span class="line"><span>       │  (Slave)     │ │  (Slave)     │ │  (Slave)     │</span></span>
<span class="line"><span>       │  - 只读服务  │ │  - 只读服务  │ │  - 数据备份  │</span></span>
<span class="line"><span>       │  - 重写主节点│ │  - 重写主节点│ │  - 重写主节点│</span></span>
<span class="line"><span>       │    的写命令  │ │    的写命令  │ │    的写命令  │</span></span>
<span class="line"><span>       └──────────────┘ └──────────────┘ └──────────────┘</span></span></code></pre></div><p><strong>主从复制的核心特性</strong>：</p><ul><li><strong>数据冗余</strong>：从节点是主节点的实时数据副本</li><li><strong>读写分离</strong>：写操作在主节点，读操作可以分发到从节点</li><li><strong>故障恢复</strong>：主节点故障时，可以将从节点提升为主节点</li></ul><h3 id="_2-2-主从复制原理" tabindex="-1">2.2 主从复制原理 <a class="header-anchor" href="#_2-2-主从复制原理" aria-label="Permalink to “2.2 主从复制原理”">​</a></h3><h4 id="_2-2-1-复制-id-replication-id-与-offset" tabindex="-1">2.2.1 复制 ID（Replication ID）与 Offset <a class="header-anchor" href="#_2-2-1-复制-id-replication-id-与-offset" aria-label="Permalink to “2.2.1 复制 ID（Replication ID）与 Offset”">​</a></h4><p>为了实现精确的数据同步，Redis 使用 <strong>复制 ID</strong> 和 <strong>复制偏移量（Offset）</strong> 来追踪数据同步状态：</p><ul><li><strong>replication id（replid）</strong>：每个 Redis 实例在启动时会生成一个随机的 40 位十六进制字符串作为自己的 <code>replid</code>。当一个从节点连接到主节点时，主节点会将自己的 <code>replid</code> 传递给从节点。从节点只接收这个 <code>replid</code> 对应的数据流。</li><li><strong>replication offset</strong>：一个单调递增的计数器，表示当前复制进度。主节点在向所有从节点传播写命令时，会递增这个 offset。</li></ul><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>主节点 (replid: &quot;abc123...&quot;)</span></span>
<span class="line"><span>│</span></span>
<span class="line"><span>│  写入: SET key1 value1     → offset: 100</span></span>
<span class="line"><span>│  写入: SET key2 value2     → offset: 120</span></span>
<span class="line"><span>│  写入: DEL key1            → offset: 135</span></span>
<span class="line"><span>│</span></span>
<span class="line"><span>│  复制 backlog (环形缓冲区):</span></span>
<span class="line"><span>│  ┌───┬───┬───┬───┬───┬───┬───┬───┬───┬───┐</span></span>
<span class="line"><span>│  │...│100│120│135│...│...│...│...│...│...│</span></span>
<span class="line"><span>│  └───┴───┴───┴───┴───┴───┴───┴───┴───┴───┘</span></span>
<span class="line"><span>│</span></span>
<span class="line"><span>└─────────────────────────────────────► 从节点</span></span>
<span class="line"><span>  replid: &quot;abc123...&quot;</span></span>
<span class="line"><span>  offset: 100 → 已同步到位置 100</span></span></code></pre></div><h4 id="_2-2-2-全量复制流程" tabindex="-1">2.2.2 全量复制流程 <a class="header-anchor" href="#_2-2-2-全量复制流程" aria-label="Permalink to “2.2.2 全量复制流程”">​</a></h4><p>当从节点首次连接主节点，或者从节点的复制 offset 在主节点的 replication backlog 中找不到时，会触发全量复制（Full Synchronization）。</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>从节点 (Slave)                              主节点 (Master)</span></span>
<span class="line"><span>    │                                          │</span></span>
<span class="line"><span>    │  1. PSYNC ? -1  ──────────────────────►  │</span></span>
<span class="line"><span>    │     (首次同步，replid 和 offset 未知)      │</span></span>
<span class="line"><span>    │                                          │</span></span>
<span class="line"><span>    │                              2. 执行 BGSAVE 生成 RDB</span></span>
<span class="line"><span>    │                              ┌────────────────────┐</span></span>
<span class="line"><span>    │                              │   BGSAVE (fork子进程) │</span></span>
<span class="line"><span>    │                              │   生成 RDB 快照文件  │</span></span>
<span class="line"><span>    │                              └────────────────────┘</span></span>
<span class="line"><span>    │                                          │</span></span>
<span class="line"><span>    │                     3. +FULLRESYNC replid offset ──►</span></span>
<span class="line"><span>    │                        发送 FULLRESYNC 响应</span></span>
<span class="line"><span>    │                        携带主节点的 replid 和当前 offset</span></span>
<span class="line"><span>    │                                          │</span></span>
<span class="line"><span>    │                     4. 发送 RDB 文件流 ────────────►</span></span>
<span class="line"><span>    │                        (以二进制流形式发送 RDB 内容)</span></span>
<span class="line"><span>    │                                          │</span></span>
<span class="line"><span>    │  5. 接收 RDB 并加载                       │</span></span>
<span class="line"><span>    │     - 清空旧数据                          │</span></span>
<span class="line"><span>    │     - 加载 RDB 文件到内存                 │</span></span>
<span class="line"><span>    │                                          │</span></span>
<span class="line"><span>    │                     6. 发送 RDB 之后的写命令 ───────►</span></span>
<span class="line"><span>    │                        (从 backlog 中获取)  │</span></span>
<span class="line"><span>    │                                          │</span></span>
<span class="line"><span>    │  7. 更新 replid 和 offset                 │</span></span>
<span class="line"><span>    │     复制完成，进入增量同步状态            │</span></span>
<span class="line"><span>    │                                          │</span></span></code></pre></div><p><strong>全量复制的详细步骤</strong>：</p><table tabindex="0"><thead><tr><th>步骤</th><th>发起方</th><th>说明</th></tr></thead><tbody><tr><td>1</td><td>从节点</td><td>向主节点发送 <code>PSYNC ? -1</code> 命令，表示首次同步</td></tr><tr><td>2</td><td>主节点</td><td>检测到无法进行增量同步，执行 <code>BGSAVE</code> 生成 RDB 快照</td></tr><tr><td>3</td><td>主节点</td><td>向从节点发送 <code>+FULLRESYNC &lt;replid&gt; &lt;offset&gt;</code> 响应</td></tr><tr><td>4</td><td>主节点</td><td>将 RDB 文件以二进制流方式发送给从节点</td></tr><tr><td>5</td><td>从节点</td><td>接收 RDB 文件，清空自身数据，加载 RDB 到内存</td></tr><tr><td>6</td><td>主节点</td><td>发送 RDB 文件过程中产生的增量写命令（从 backlog 获取）</td></tr><tr><td>7</td><td>从节点</td><td>更新自身的 <code>replid</code> 和 <code>offset</code>，进入增量同步模式</td></tr></tbody></table><h4 id="_2-2-3-增量复制流程" tabindex="-1">2.2.3 增量复制流程 <a class="header-anchor" href="#_2-2-3-增量复制流程" aria-label="Permalink to “2.2.3 增量复制流程”">​</a></h4><p>当从节点与主节点断开连接后重新连接，如果断连时间不长（offset 仍在 backlog 范围内），则可以使用增量复制（Partial Resynchronization），避免重新加载全量数据。</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>从节点 (Slave)                              主节点 (Master)</span></span>
<span class="line"><span>    │                                          │</span></span>
<span class="line"><span>    │  1. PSYNC replid offset ─────────────►   │</span></span>
<span class="line"><span>    │     带上自己的 replid 和 offset           │</span></span>
<span class="line"><span>    │     (上次同步到的位置)                    │</span></span>
<span class="line"><span>    │                                          │</span></span>
<span class="line"><span>    │                              2. 检查 backlog</span></span>
<span class="line"><span>    │                              offset 是否在 backlog 中？</span></span>
<span class="line"><span>    │                              ┌────────────────────┐</span></span>
<span class="line"><span>    │                              │ backlog 环形缓冲区 │</span></span>
<span class="line"><span>    │                              │ [90...100...110...] │</span></span>
<span class="line"><span>    │                              └────────────────────┘</span></span>
<span class="line"><span>    │                                          │</span></span>
<span class="line"><span>    │                              ┌───YES─────┴────NO───┐</span></span>
<span class="line"><span>    │                              ▼                      ▼</span></span>
<span class="line"><span>    │               3a. +CONTINUE             3b. +FULLRESYNC</span></span>
<span class="line"><span>    │                  (增量同步)                 (全量同步)</span></span>
<span class="line"><span>    │                              │              │</span></span>
<span class="line"><span>    │               4a. 发送缺失的写命令       4b. 走全量复制流程</span></span>
<span class="line"><span>    │                  (从 backlog 中读取)</span></span>
<span class="line"><span>    │                              │</span></span>
<span class="line"><span>    │               5a. 更新 offset             │</span></span>
<span class="line"><span>    │                  同步完成                 │</span></span>
<span class="line"><span>    │                                          │</span></span></code></pre></div><p><strong>增量复制的关键条件</strong>：</p><ul><li>从节点的 <code>replid</code> 与主节点的 <code>replid</code> 一致</li><li>从节点的 <code>offset</code> 在主节点的 <code>replication backlog</code> 范围内</li></ul><h4 id="_2-2-4-psync-命令与断点续传" tabindex="-1">2.2.4 PSYNC 命令与断点续传 <a class="header-anchor" href="#_2-2-4-psync-命令与断点续传" aria-label="Permalink to “2.2.4 PSYNC 命令与断点续传”">​</a></h4><p>PSYNC（Partial Sync）是 Redis 2.8 引入的同步命令，替代了旧版的 <code>SYNC</code> 命令。<code>PSYNC</code> 支持断点续传，是实现高效主从同步的核心。</p><div class="language-redis"><button title="Copy Code" class="copy"></button><span class="lang">redis</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span># 从节点向主节点发送同步请求</span></span>
<span class="line"><span>PSYNC &lt;replid&gt; &lt;offset&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 首次同步（不知道 replid 和 offset）</span></span>
<span class="line"><span>PSYNC ? -1</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 增量同步（已知 replid 和 offset）</span></span>
<span class="line"><span>PSYNC abc123def456... 12345</span></span></code></pre></div><p><strong>PSYNC 返回值</strong>：</p><table tabindex="0"><thead><tr><th>响应</th><th>含义</th><th>后续操作</th></tr></thead><tbody><tr><td><code>+FULLRESYNC &lt;replid&gt; &lt;offset&gt;</code></td><td>需要全量同步</td><td>接收 RDB 文件 + 增量命令</td></tr><tr><td><code>+CONTINUE</code></td><td>增量同步成功</td><td>直接接收增量写命令</td></tr><tr><td><code>-ERR</code></td><td>协议错误</td><td>从节点重新发起同步</td></tr></tbody></table><p><strong>replication backlog（复制积压缓冲区）</strong>：</p><p>replication backlog 是一个固定大小的环形缓冲区，用于缓存最近的写命令，供从节点进行增量同步。</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>┌─────────────────────────────────────────────────────────┐</span></span>
<span class="line"><span>│              Replication Backlog (环形缓冲区)            │</span></span>
<span class="line"><span>│  大小由 repl-backlog-size 参数控制（默认 1MB）           │</span></span>
<span class="line"><span>├─────────────────────────────────────────────────────────┤</span></span>
<span class="line"><span>│  ┌───┬───┬───┬───┬───┬───┬───┬───┬───┬───┬───┬───┐    │</span></span>
<span class="line"><span>│  │...│cmd│cmd│cmd│cmd│cmd│cmd│cmd│cmd│cmd│cmd│...│    │</span></span>
<span class="line"><span>│  └───┴───┴───┴───┴───┴───┴───┴───┴───┴───┴───┴───┘    │</span></span>
<span class="line"><span>│     ↑ 写入指针 (主节点写命令时移动)          ↑ 读取指针   │</span></span>
<span class="line"><span>│     (覆盖最旧的数据)                         (从节点同步) │</span></span>
<span class="line"><span>└─────────────────────────────────────────────────────────┘</span></span></code></pre></div><p><strong>backlog 大小计算建议</strong>：</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>backlog 大小 = 主从断连最大时间 × 主节点每秒写命令数</span></span>
<span class="line"><span></span></span>
<span class="line"><span>示例：</span></span>
<span class="line"><span>  主从最大断连时间：60 秒</span></span>
<span class="line"><span>  主节点每秒写命令数：1000 条</span></span>
<span class="line"><span>  每条命令平均大小：100 字节</span></span>
<span class="line"><span>  → backlog-size = 60 × 1000 × 100 = 6MB</span></span>
<span class="line"><span></span></span>
<span class="line"><span>redis.conf 配置：</span></span>
<span class="line"><span>  repl-backlog-size 67108864   # 64MB</span></span></code></pre></div><h3 id="_2-3-主从配置" tabindex="-1">2.3 主从配置 <a class="header-anchor" href="#_2-3-主从配置" aria-label="Permalink to “2.3 主从配置”">​</a></h3><h4 id="_2-3-1-主节点配置" tabindex="-1">2.3.1 主节点配置 <a class="header-anchor" href="#_2-3-1-主节点配置" aria-label="Permalink to “2.3.1 主节点配置”">​</a></h4><div class="language-redis"><button title="Copy Code" class="copy"></button><span class="lang">redis</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span># redis.conf - 主节点配置</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 绑定地址</span></span>
<span class="line"><span>bind 0.0.0.0</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 端口</span></span>
<span class="line"><span>port 6379</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 开启持久化（推荐使用 RDB + AOF 混合）</span></span>
<span class="line"><span>save 900 1</span></span>
<span class="line"><span>save 300 10</span></span>
<span class="line"><span>save 60 10000</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 主节点密码（可选，用于从节点连接认证）</span></span>
<span class="line"><span>requirepass &quot;master_password&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 主节点用于复制的密码（与 requirepass 相同或独立设置）</span></span>
<span class="line"><span>masterauth &quot;master_password&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 复制 backlog 大小</span></span>
<span class="line"><span>repl-backlog-size 67108864</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 当主节点的从节点数量少于此值时，停止接受写请求</span></span>
<span class="line"><span># 用于保证数据安全，防止主节点在无从节点时继续接受写入</span></span>
<span class="line"><span>min-replicas-to-write 1</span></span>
<span class="line"><span>min-replicas-max-lag 10</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 主从心跳间隔</span></span>
<span class="line"><span>repl-ping-replica-period 10</span></span></code></pre></div><h4 id="_2-3-2-从节点配置" tabindex="-1">2.3.2 从节点配置 <a class="header-anchor" href="#_2-3-2-从节点配置" aria-label="Permalink to “2.3.2 从节点配置”">​</a></h4><div class="language-redis"><button title="Copy Code" class="copy"></button><span class="lang">redis</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span># redis.conf - 从节点配置</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 绑定地址</span></span>
<span class="line"><span>bind 0.0.0.0</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 端口（每个节点使用不同端口）</span></span>
<span class="line"><span>port 6380</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 设置当前节点为从节点，指向主节点</span></span>
<span class="line"><span># 方式一：配置文件中设置</span></span>
<span class="line"><span>replicaof 192.168.1.100 6379</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 方式二：运行时命令（Redis 5.0+，替代 slaveof）</span></span>
<span class="line"><span># replicaof 192.168.1.100 6379</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 主节点的认证密码</span></span>
<span class="line"><span>masterauth &quot;master_password&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 从节点设置为只读模式（默认开启，防止误写）</span></span>
<span class="line"><span>replica-read-only yes</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 从节点的密码（供客户端连接从节点时使用）</span></span>
<span class="line"><span>requirepass &quot;slave_password&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 复制 backlog 大小（从节点断连重连时也需要）</span></span>
<span class="line"><span>repl-backlog-size 67108864</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 是否允许从节点在主节点宕机时继续服务</span></span>
<span class="line"><span>replica-serve-stale-data yes</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 当从节点与主节点断开时，是否让从节点保持只读</span></span>
<span class="line"><span>replica-read-only yes</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 从节点优先级（用于哨兵选举新主节点，数值越小优先级越高）</span></span>
<span class="line"><span># 哨兵选择新主节点时会优先选择较小优先级的从节点</span></span>
<span class="line"><span>replica-priority 100</span></span></code></pre></div><h4 id="_2-3-3-主从配置命令" tabindex="-1">2.3.3 主从配置命令 <a class="header-anchor" href="#_2-3-3-主从配置命令" aria-label="Permalink to “2.3.3 主从配置命令”">​</a></h4><div class="language-redis"><button title="Copy Code" class="copy"></button><span class="lang">redis</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span># 在从节点上动态设置主节点</span></span>
<span class="line"><span>replicaof 192.168.1.100 6379</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 取消复制（使从节点变为独立节点）</span></span>
<span class="line"><span>replicaof no one</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 动态修改主节点密码</span></span>
<span class="line"><span>config set masterauth &quot;new_password&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 查看复制信息</span></span>
<span class="line"><span>info replication</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 在主节点上查看从节点连接状态</span></span>
<span class="line"><span>info replication</span></span>
<span class="line"><span># 输出示例：</span></span>
<span class="line"><span># role:master</span></span>
<span class="line"><span># connected_slaves:2</span></span>
<span class="line"><span># slave0:ip=192.168.1.101,port=6379,state=online,offset=2341,lag=0</span></span>
<span class="line"><span># slave1:ip=192.168.1.102,port=6379,state=online,offset=2341,lag=1</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 在从节点上查看同步状态</span></span>
<span class="line"><span>info replication</span></span>
<span class="line"><span># 输出示例：</span></span>
<span class="line"><span># role:slave</span></span>
<span class="line"><span># master_host:192.168.1.100</span></span>
<span class="line"><span># master_port:6379</span></span>
<span class="line"><span># master_link_status:up</span></span>
<span class="line"><span># master_last_io_seconds_ago:1</span></span>
<span class="line"><span># master_sync_in_progress:0</span></span>
<span class="line"><span># master_repl_offset:2341</span></span></code></pre></div><h3 id="_2-4-主从延迟分析" tabindex="-1">2.4 主从延迟分析 <a class="header-anchor" href="#_2-4-主从延迟分析" aria-label="Permalink to “2.4 主从延迟分析”">​</a></h3><p>主从延迟是指从节点的数据与主节点之间的时间差。</p><h4 id="_2-4-1-延迟产生的原因" tabindex="-1">2.4.1 延迟产生的原因 <a class="header-anchor" href="#_2-4-1-延迟产生的原因" aria-label="Permalink to “2.4.1 延迟产生的原因”">​</a></h4><table tabindex="0"><thead><tr><th>原因</th><th>说明</th><th>解决方案</th></tr></thead><tbody><tr><td><strong>主节点写入压力大</strong></td><td>主节点有大量写入，命令产生速度超过从节点消费速度</td><td>优化写入模式、使用 Pipeline</td></tr><tr><td><strong>从节点硬件差异</strong></td><td>从节点 CPU/内存/磁盘性能较弱</td><td>使用与主节点相同等级的硬件</td></tr><tr><td><strong>从节点负载过高</strong></td><td>从节点上有大量查询或计算任务</td><td>读写分离、限制从节点负载</td></tr><tr><td><strong>网络带宽/延迟</strong></td><td>主从之间网络不稳定或带宽不足</td><td>优化网络、使用内网直连</td></tr><tr><td><strong>大命令阻塞</strong></td><td>单个命令涉及大量数据（如 <code>KEYS *</code>、大 <code>SETEX</code>）</td><td>避免大命令、使用增量操作</td></tr><tr><td><strong>RDB 保存阻塞</strong></td><td>主节点 fork 子进程保存 RDB 时阻塞</td><td>使用 <code>BGSAVE</code>、开启 AOF</td></tr></tbody></table><h4 id="_2-4-2-监控主从延迟" tabindex="-1">2.4.2 监控主从延迟 <a class="header-anchor" href="#_2-4-2-监控主从延迟" aria-label="Permalink to “2.4.2 监控主从延迟”">​</a></h4><div class="language-redis"><button title="Copy Code" class="copy"></button><span class="lang">redis</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span># 方法一：通过 INFO replication 查看</span></span>
<span class="line"><span>info replication</span></span>
<span class="line"><span># 关注字段：</span></span>
<span class="line"><span># master_link_status        连接状态（up/down）</span></span>
<span class="line"><span># master_last_io_seconds_ago  距离上次收到主节点数据的秒数</span></span>
<span class="line"><span># master_sync_in_progress  是否正在进行全量同步</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 方法二：通过 repl-monitor 命令（需要从节点开启 repl-backlog）</span></span>
<span class="line"><span># Redis 没有直接的延迟监控命令，但可以通过以下方式计算：</span></span>
<span class="line"><span># 1. 监控从节点的 master_repl_offset</span></span>
<span class="line"><span># 2. 监控主节点的 offset</span></span>
<span class="line"><span># 3. 计算差值</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 方法三：使用 redis-cli --stat 实时监控</span></span>
<span class="line"><span>redis-cli --stat -h &lt;master_ip&gt; -p 6379</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 方法四：编写监控脚本</span></span>
<span class="line"><span># 主节点获取当前 replication offset</span></span>
<span class="line"><span>redis-cli -h master_ip -p 6379 info replication | grep offset</span></span>
<span class="line"><span># 从节点获取当前同步到的 offset</span></span>
<span class="line"><span>redis-cli -h slave_ip -p 6379 info replication | grep offset</span></span></code></pre></div><h4 id="_2-4-3-延迟优化策略" tabindex="-1">2.4.3 延迟优化策略 <a class="header-anchor" href="#_2-4-3-延迟优化策略" aria-label="Permalink to “2.4.3 延迟优化策略”">​</a></h4><ol><li><strong>硬件对等</strong>：从节点硬件配置不低于主节点</li><li><strong>网络优化</strong>：主从部署在同一机房/可用区，使用低延迟网络</li><li><strong>避免大命令</strong>：将大操作拆分为小操作，使用 <code>HSCAN</code>、<code>SSCAN</code> 等迭代命令</li><li><strong>读写分离</strong>：将读请求分发到多个从节点，降低单个从节点负载</li><li><strong>关闭不必要的持久化</strong>：从节点可以关闭 RDB，使用 AOF（或关闭持久化）</li><li><strong>调整复制参数</strong>：适当增大 <code>repl-backlog-size</code>，减少全量同步频率</li></ol><h3 id="_2-5-主从复制的应用" tabindex="-1">2.5 主从复制的应用 <a class="header-anchor" href="#_2-5-主从复制的应用" aria-label="Permalink to “2.5 主从复制的应用”">​</a></h3><h4 id="_2-5-1-读写分离" tabindex="-1">2.5.1 读写分离 <a class="header-anchor" href="#_2-5-1-读写分离" aria-label="Permalink to “2.5.1 读写分离”">​</a></h4><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>         ┌──────────────┐</span></span>
<span class="line"><span>         │   客户端      │</span></span>
<span class="line"><span>         └──────┬───────┘</span></span>
<span class="line"><span>                │</span></span>
<span class="line"><span>         ┌──────▼───────┐</span></span>
<span class="line"><span>         │  读写分离    │</span></span>
<span class="line"><span>         │  中间件/SDK  │</span></span>
<span class="line"><span>         └──┬───────┬───┘</span></span>
<span class="line"><span>            │       │</span></span>
<span class="line"><span>  写请求 ←──┘       └──→ 读请求</span></span>
<span class="line"><span>            │       │</span></span>
<span class="line"><span>            ▼       ▼</span></span>
<span class="line"><span>      ┌──────────┐  ┌──────────┐</span></span>
<span class="line"><span>      │  主节点   │  │  从节点   │</span></span>
<span class="line"><span>      │ (Master) │  │ (Slave)  │</span></span>
<span class="line"><span>      └──────────┘  └──────────┘</span></span>
<span class="line"><span>                           │</span></span>
<span class="line"><span>                           ▼</span></span>
<span class="line"><span>                     ┌──────────┐</span></span>
<span class="line"><span>                     │  从节点2  │</span></span>
<span class="line"><span>                     └──────────┘</span></span></code></pre></div><p><strong>读写分离实现方式</strong>：</p><ol><li><strong>应用层实现</strong>：在代码中根据操作类型选择主节点或从节点</li><li><strong>中间件实现</strong>：使用 Twemproxy、Redis Cluster Proxy 等</li><li><strong>客户端 SDK 实现</strong>：部分 Redis 客户端支持读写分离</li></ol><h4 id="_2-5-2-数据备份" tabindex="-1">2.5.2 数据备份 <a class="header-anchor" href="#_2-5-2-数据备份" aria-label="Permalink to “2.5.2 数据备份”">​</a></h4><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 在从节点上执行 BGSAVE，避免影响主节点性能</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">redis-cli</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -h</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> slave_ip</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -p</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 6379</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> BGSAVE</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 备份 RDB 文件</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">cp</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> /var/lib/redis/dump.rdb</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> /backup/redis/dump_</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">$(</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">date</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> +%Y%m%d_%H%M%S</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">.rdb</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 从节点上也可以开启 AOF 备份</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># redis.conf: appendonly yes</span></span></code></pre></div><hr><h2 id="三、哨兵模式-sentinel" tabindex="-1">三、哨兵模式（Sentinel） <a class="header-anchor" href="#三、哨兵模式-sentinel" aria-label="Permalink to “三、哨兵模式（Sentinel）”">​</a></h2><h3 id="_3-1-哨兵角色" tabindex="-1">3.1 哨兵角色 <a class="header-anchor" href="#_3-1-哨兵角色" aria-label="Permalink to “3.1 哨兵角色”">​</a></h3><p>哨兵（Sentinel）是 Redis 的高可用管理组件，它本身也是一个特殊的 Redis 进程，专门用于监控主从集群并实现自动故障转移。</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>┌─────────────────────────────────────────────────────────────────────┐</span></span>
<span class="line"><span>│                        哨兵模式架构                                  │</span></span>
<span class="line"><span>│                                                                     │</span></span>
<span class="line"><span>│  ┌──────────┐     ┌──────────┐     ┌──────────┐                    │</span></span>
<span class="line"><span>│  │ 主节点    │────►│ 从节点    │────►│ 从节点    │                    │</span></span>
<span class="line"><span>│  │ (Master) │     │ (Slave1) │     │ (Slave2) │                    │</span></span>
<span class="line"><span>│  └────┬─────┘     └────┬─────┘     └────┬─────┘                    │</span></span>
<span class="line"><span>│       │                │                │                           │</span></span>
<span class="line"><span>│       │   监控（每10秒 PING）          监控                        │</span></span>
<span class="line"><span>│       │                │                │                           │</span></span>
<span class="line"><span>│       ▼                ▼                ▼                           │</span></span>
<span class="line"><span>│  ┌─────────────────────────────────────────────────────┐           │</span></span>
<span class="line"><span>│  │                  哨兵集群 (Sentinel)                  │           │</span></span>
<span class="line"><span>│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐          │           │</span></span>
<span class="line"><span>│  │  │  哨兵1    │  │  哨兵2    │  │  哨兵3    │          │           │</span></span>
<span class="line"><span>│  │  │(监控+投票)│  │(监控+投票)│  │(监控+投票)│          │           │</span></span>
<span class="line"><span>│  │  └──────────┘  └──────────┘  └──────────┘          │           │</span></span>
<span class="line"><span>│  │                                                     │           │</span></span>
<span class="line"><span>│  │  四大功能:                                           │           │</span></span>
<span class="line"><span>│  │  1. 监控 (Monitoring)                                │           │</span></span>
<span class="line"><span>│  │  2. 提醒 (Notification)                              │           │</span></span>
<span class="line"><span>│  │  3. 自动故障转移 (Failover)                          │           │</span></span>
<span class="line"><span>│  │  4. 配置提供者 (Configuration Provider)              │           │</span></span>
<span class="line"><span>│  └─────────────────────────────────────────────────────┘           │</span></span>
<span class="line"><span>│                                                                     │</span></span>
<span class="line"><span>└─────────────────────────────────────────────────────────────────────┘</span></span></code></pre></div><h4 id="_3-1-1-监控-monitoring" tabindex="-1">3.1.1 监控（Monitoring） <a class="header-anchor" href="#_3-1-1-监控-monitoring" aria-label="Permalink to “3.1.1 监控（Monitoring）”">​</a></h4><p>哨兵以固定频率（默认 10 秒）向所有主从节点发送 <code>PING</code> 命令，检测节点是否存活。</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>哨兵 ──PING──► 主节点    →  PONG (在线)</span></span>
<span class="line"><span>哨兵 ──PING──► 从节点1   →  PONG (在线)</span></span>
<span class="line"><span>哨兵 ──PING──► 从节点2   →  超时无响应 → 主观下线</span></span></code></pre></div><h4 id="_3-1-2-提醒-notification" tabindex="-1">3.1.2 提醒（Notification） <a class="header-anchor" href="#_3-1-2-提醒-notification" aria-label="Permalink to “3.1.2 提醒（Notification）”">​</a></h4><p>当节点出现问题时，哨兵可以通过以下方式发送通知：</p><ul><li>调用用户自定义的脚本（<code>sentinel notification-script</code>）</li><li>向管理员发送邮件、短信等</li><li>发送 Webhook 通知</li></ul><div class="language-redis"><button title="Copy Code" class="copy"></button><span class="lang">redis</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span># sentinel.conf - 配置通知脚本</span></span>
<span class="line"><span>sentinel notification-script mymaster /path/to/notify.sh</span></span></code></pre></div><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#!/bin/bash</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># /path/to/notify.sh</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 脚本参数: &lt;事件类型&gt; &lt;角色&gt; &lt;节点名&gt; &lt;节点地址&gt; &lt;节点端口&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">EVENT</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">$1</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">ROLE</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">$2</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">NAME</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">$3</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">ADDR</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">$4</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">PORT</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">$5</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 发送邮件通知</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">echo</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;Redis Sentinel Alert: </span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">$EVENT</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> $ROLE</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> $NAME</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> $ADDR</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">:</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">$PORT</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> |</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> mail</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -s</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;Redis Alert&quot;</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> admin@example.com</span></span></code></pre></div><h4 id="_3-1-3-自动故障转移-failover" tabindex="-1">3.1.3 自动故障转移（Failover） <a class="header-anchor" href="#_3-1-3-自动故障转移-failover" aria-label="Permalink to “3.1.3 自动故障转移（Failover）”">​</a></h4><p>当主节点发生故障时，哨兵自动执行故障转移流程：</p><ol><li>检测主节点故障（主观下线 → 客观下线）</li><li>在从节点中选举新的主节点</li><li>将其他从节点指向新的主节点</li><li>通知所有客户端新的主节点地址</li></ol><h4 id="_3-1-4-配置提供者-configuration-provider" tabindex="-1">3.1.4 配置提供者（Configuration Provider） <a class="header-anchor" href="#_3-1-4-配置提供者-configuration-provider" aria-label="Permalink to “3.1.4 配置提供者（Configuration Provider）”">​</a></h4><p>哨兵作为配置提供者，为客户端提供当前主节点的地址信息。客户端可以通过哨兵来发现主节点，实现透明故障转移。</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>客户端 → 查询主节点地址 → 哨兵集群</span></span>
<span class="line"><span>                           │</span></span>
<span class="line"><span>                           ▼</span></span>
<span class="line"><span>                     返回当前主节点 IP:Port</span></span>
<span class="line"><span>                           │</span></span>
<span class="line"><span>                           ▼</span></span>
<span class="line"><span>                     客户端连接新的主节点</span></span></code></pre></div><h3 id="_3-2-哨兵配置" tabindex="-1">3.2 哨兵配置 <a class="header-anchor" href="#_3-2-哨兵配置" aria-label="Permalink to “3.2 哨兵配置”">​</a></h3><h4 id="_3-2-1-哨兵配置文件-sentinel-conf" tabindex="-1">3.2.1 哨兵配置文件（sentinel.conf） <a class="header-anchor" href="#_3-2-1-哨兵配置文件-sentinel-conf" aria-label="Permalink to “3.2.1 哨兵配置文件（sentinel.conf）”">​</a></h4><div class="language-redis"><button title="Copy Code" class="copy"></button><span class="lang">redis</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span># sentinel.conf - 哨兵节点配置</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 监听端口</span></span>
<span class="line"><span>port 26379</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 绑定地址</span></span>
<span class="line"><span>bind 0.0.0.0</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 后台运行</span></span>
<span class="line"><span>daemonize yes</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 工作目录</span></span>
<span class="line"><span>dir /var/log/redis-sentinel</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 日志文件</span></span>
<span class="line"><span>logfile /var/log/redis-sentinel/sentinel.log</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 哨兵进程 ID 文件</span></span>
<span class="line"><span>pidfile /var/run/redis-sentinel.pid</span></span>
<span class="line"><span></span></span>
<span class="line"><span># ========== 核心配置 ==========</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 定义主从集群的名称（mymaster 是集群别名）</span></span>
<span class="line"><span># 参数: &lt;集群名&gt; &lt;主节点IP&gt; &lt;主节点端口&gt; &lt;法定人数&gt;</span></span>
<span class="line"><span># 法定人数: 判定主节点下线所需的最少哨兵数量</span></span>
<span class="line"><span>sentinel monitor mymaster 127.0.0.1 6379 2</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 判定主观下线的超时时间（毫秒）</span></span>
<span class="line"><span># 如果哨兵在此时间内没有收到节点的有效回复，判定为主观下线</span></span>
<span class="line"><span>sentinel down-after-milliseconds mymaster 5000</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 故障转移时，允许同时从新主节点同步的从节点数量</span></span>
<span class="line"><span># 设置为 1 可以确保只有一个从节点同步，避免主节点压力过大</span></span>
<span class="line"><span>sentinel parallel-syncs mymaster 1</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 故障转移超时时间（毫秒）</span></span>
<span class="line"><span># 从开始故障转移到完成的最大时间</span></span>
<span class="line"><span>sentinel failover-timeout mymaster 60000</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 主节点的认证密码（如果主节点配置了 requirepass）</span></span>
<span class="line"><span>sentinel auth-pass mymaster master_password</span></span>
<span class="line"><span></span></span>
<span class="line"><span># ========== 高级配置 ==========</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 哨兵之间通信的密码（集群中所有哨兵需相同）</span></span>
<span class="line"><span># requirepass &quot;sentinel_password&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 哨兵运行 ID（自动生成，无需手动配置）</span></span>
<span class="line"><span># sentinel run-id &lt;auto-generated&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 开启 TILT 模式保护</span></span>
<span class="line"><span># 当哨兵检测到自身环境异常时，进入 TILT 模式，暂停故障转移</span></span>
<span class="line"><span>sentinel deny-scripts-reconfig yes</span></span>
<span class="line"><span></span></span>
<span class="line"><span># TILT 模式触发条件：</span></span>
<span class="line"><span># 1. 系统时钟发生跳变</span></span>
<span class="line"><span># 2. 哨兵进程被长时间阻塞（超过 2 秒）</span></span></code></pre></div><h4 id="_3-2-2-关键参数详解" tabindex="-1">3.2.2 关键参数详解 <a class="header-anchor" href="#_3-2-2-关键参数详解" aria-label="Permalink to “3.2.2 关键参数详解”">​</a></h4><table tabindex="0"><thead><tr><th>参数</th><th>说明</th><th>默认值</th><th>调优建议</th></tr></thead><tbody><tr><td><code>sentinel monitor</code></td><td>监控的主从集群及法定人数</td><td>-</td><td>法定人数设为 <code>哨兵数/2 + 1</code></td></tr><tr><td><code>down-after-milliseconds</code></td><td>主观下线超时时间</td><td>30000ms</td><td>网络稳定时设 5000，不稳定时设 10000</td></tr><tr><td><code>parallel-syncs</code></td><td>故障转移时并行同步的从节点数</td><td>1</td><td>保持 1，避免新主压力过大</td></tr><tr><td><code>failover-timeout</code></td><td>故障转移最大耗时</td><td>60000ms</td><td>根据网络和节点性能调整</td></tr><tr><td><code>auth-pass</code></td><td>主节点认证密码</td><td>-</td><td>与主节点 requirepass 一致</td></tr></tbody></table><h3 id="_3-3-故障转移流程" tabindex="-1">3.3 故障转移流程 <a class="header-anchor" href="#_3-3-故障转移流程" aria-label="Permalink to “3.3 故障转移流程”">​</a></h3><h4 id="_3-3-1-主观下线-subjectively-down" tabindex="-1">3.3.1 主观下线（Subjectively Down） <a class="header-anchor" href="#_3-3-1-主观下线-subjectively-down" aria-label="Permalink to “3.3.1 主观下线（Subjectively Down）”">​</a></h4><p>当一个哨兵在 <code>down-after-milliseconds</code> 时间内无法收到节点的有效回复（PING 命令的 PONG 响应）时，该哨兵判定此节点为<strong>主观下线（SDOWN）</strong>。</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>时间线:</span></span>
<span class="line"><span>t=0s    哨兵 ──PING──► 主节点</span></span>
<span class="line"><span>t=5s    哨兵 ──PING──► 主节点     (无响应)</span></span>
<span class="line"><span>t=10s   哨兵 ──PING──► 主节点    (无响应)</span></span>
<span class="line"><span>...</span></span>
<span class="line"><span>t=Ns    哨兵判定主节点为 SDOWN（主观下线）</span></span>
<span class="line"><span>        但此时还不能触发故障转移！</span></span></code></pre></div><p><strong>主观下线的特点</strong>：</p><ul><li>是单个哨兵的本地判断</li><li>可能因为网络分区导致误判</li><li>需要其他哨兵的确认才能升级为客观下线</li></ul><h4 id="_3-3-2-客观下线-objectively-down" tabindex="-1">3.3.2 客观下线（Objectively Down） <a class="header-anchor" href="#_3-3-2-客观下线-objectively-down" aria-label="Permalink to “3.3.2 客观下线（Objectively Down）”">​</a></h4><p>当有超过 <code>quorum</code>（法定人数）个哨兵都判定主节点为 SDOWN 时，主节点被判定为<strong>客观下线（ODOWN）</strong>。</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>┌──────────┐     ┌──────────┐     ┌──────────┐</span></span>
<span class="line"><span>│  哨兵1    │     │  哨兵2    │     │  哨兵3    │</span></span>
<span class="line"><span>│ 监控主节点 │     │ 监控主节点 │     │ 监控主节点 │</span></span>
<span class="line"><span>└────┬─────┘     └────┬─────┘     └────┬─────┘</span></span>
<span class="line"><span>     │                │                │</span></span>
<span class="line"><span>     │ 判定 SDOWN     │ 判定 SDOWN     │ 正常</span></span>
<span class="line"><span>     │                │                │</span></span>
<span class="line"><span>     └────────────────┼────────────────┘</span></span>
<span class="line"><span>                      │</span></span>
<span class="line"><span>                      │ 法定人数 = 2</span></span>
<span class="line"><span>                      │ 已有 2 个哨兵判定 SDOWN</span></span>
<span class="line"><span>                      ▼</span></span>
<span class="line"><span>               ┌──────────────┐</span></span>
<span class="line"><span>               │ 主节点 ODOWN  │  ← 客观下线</span></span>
<span class="line"><span>               └──────────────┘</span></span></code></pre></div><p><strong>客观下线的特点</strong>：</p><ul><li>需要法定数量的哨兵达成共识</li><li>是全局判断，所有哨兵都知晓</li><li>可以触发故障转移流程</li></ul><h4 id="_3-3-3-选举新主节点" tabindex="-1">3.3.3 选举新主节点 <a class="header-anchor" href="#_3-3-3-选举新主节点" aria-label="Permalink to “3.3.3 选举新主节点”">​</a></h4><p>故障转移的核心是在多个从节点中选举一个最优的新主节点。这个过程涉及 Raft 协议的领导者选举机制。</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>客观下线主节点后:</span></span>
<span class="line"><span>┌──────────┐     ┌──────────┐     ┌──────────┐</span></span>
<span class="line"><span>│  哨兵1    │     │  哨兵2    │     │  哨兵3    │</span></span>
<span class="line"><span>│ (Leader) │     │  (Follower)│    │  (Follower)│</span></span>
<span class="line"><span>└────┬─────┘     └──────────┘     └──────────┘</span></span>
<span class="line"><span>     │</span></span>
<span class="line"><span>     │ 选举 Leader 哨兵</span></span>
<span class="line"><span>     │ 选择一个哨兵作为故障转移的领导者</span></span>
<span class="line"><span>     │</span></span>
<span class="line"><span>     ▼</span></span>
<span class="line"><span>┌──────────┐     ┌──────────┐     ┌──────────┐</span></span>
<span class="line"><span>│  从节点1  │     │  从节点2  │     │  从节点3  │</span></span>
<span class="line"><span>│ priority │     │ priority │     │ priority │</span></span>
<span class="line"><span>│   100    │     │   200    │     │   300    │</span></span>
<span class="line"><span>└────┬─────┘     └────┬─────┘     └────┬─────┘</span></span>
<span class="line"><span>     │                │                │</span></span>
<span class="line"><span>     │  筛选候选从节点:</span></span>
<span class="line"><span>     │  1. 排除已经下线或断线的</span></span>
<span class="line"><span>     │  2. 排除处于全量同步中的</span></span>
<span class="line"><span>     │  3. 排除优先级为 0 的（不可作为主节点）</span></span>
<span class="line"><span>     │</span></span>
<span class="line"><span>     │  排序规则:</span></span>
<span class="line"><span>     │  1. 优先级越小越优先</span></span>
<span class="line"><span>     │  2. 复制 offset 越大越优先（数据最新）</span></span>
<span class="line"><span>     │  3. run_id 越小越优先</span></span>
<span class="line"><span>     │</span></span>
<span class="line"><span>     ▼</span></span>
<span class="line"><span>┌──────────┐</span></span>
<span class="line"><span>│ 新主节点  │ ← 选举出的最优从节点</span></span>
<span class="line"><span>└──────────┘</span></span></code></pre></div><p><strong>选举算法详解</strong>：</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>排序步骤:</span></span>
<span class="line"><span>1. 过滤:</span></span>
<span class="line"><span>   - 移除已断开的从节点</span></span>
<span class="line"><span>   - 移除正在进行全量同步的从节点</span></span>
<span class="line"><span>   - 移除 replica-priority = 0 的从节点</span></span>
<span class="line"><span>   - 移除与主节点断连的从节点</span></span>
<span class="line"><span></span></span>
<span class="line"><span>2. 排序（依次比较）:</span></span>
<span class="line"><span>   a. replica-priority 越小越优先</span></span>
<span class="line"><span>   b. replication offset 越大越优先（数据最新）</span></span>
<span class="line"><span>   c. 运行 ID 越小越优先</span></span>
<span class="line"><span></span></span>
<span class="line"><span>示例:</span></span>
<span class="line"><span>   从节点A: priority=100, offset=50000</span></span>
<span class="line"><span>   从节点B: priority=100, offset=49000</span></span>
<span class="line"><span>   从节点C: priority=200, offset=50000</span></span>
<span class="line"><span></span></span>
<span class="line"><span>   排序结果: A &gt; B &gt; C</span></span>
<span class="line"><span>   (A 与 B 优先级相同，A 的 offset 更大)</span></span></code></pre></div><h4 id="_3-3-4-通知从节点并完成故障转移" tabindex="-1">3.3.4 通知从节点并完成故障转移 <a class="header-anchor" href="#_3-3-4-通知从节点并完成故障转移" aria-label="Permalink to “3.3.4 通知从节点并完成故障转移”">​</a></h4><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>Leader 哨兵完成选举后:</span></span>
<span class="line"><span>1. 将新主节点升级为 Master</span></span>
<span class="line"><span>   - 执行 SLAVEOF NO ONE（或 REPLICAOF NO ONE）</span></span>
<span class="line"><span>   - 取消只读模式</span></span>
<span class="line"><span></span></span>
<span class="line"><span>2. 将其他从节点指向新主节点</span></span>
<span class="line"><span>   - 执行 SLAVEOF &lt;new_master_ip&gt; &lt;new_master_port&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>3. 通知所有哨兵更新主节点信息</span></span>
<span class="line"><span>   - 哨兵集群更新自身的主节点记录</span></span>
<span class="line"><span></span></span>
<span class="line"><span>4. 故障转移完成</span></span></code></pre></div><h3 id="_3-4-raft-协议与领导者选举" tabindex="-1">3.4 Raft 协议与领导者选举 <a class="header-anchor" href="#_3-4-raft-协议与领导者选举" aria-label="Permalink to “3.4 Raft 协议与领导者选举”">​</a></h3><p>Redis 哨兵集群使用 Raft 协议的变种来实现领导者选举。</p><h4 id="_3-4-1-raft-协议基础" tabindex="-1">3.4.1 Raft 协议基础 <a class="header-anchor" href="#_3-4-1-raft-协议基础" aria-label="Permalink to “3.4.1 Raft 协议基础”">​</a></h4><p>Raft 是一种为了理解而设计的分布式一致性协议，它将分布式问题分解为三个子问题：</p><ol><li><strong>领导者选举（Leader Election）</strong>：集群中选出唯一的领导者</li><li><strong>日志复制（Log Replication）</strong>：领导者接收客户端请求并复制到其他节点</li><li><strong>安全性（Safety）</strong>：确保只有获得多数投票的节点才能成为领导者</li></ol><h4 id="_3-4-2-哨兵中的-raft-选举" tabindex="-1">3.4.2 哨兵中的 Raft 选举 <a class="header-anchor" href="#_3-4-2-哨兵中的-raft-选举" aria-label="Permalink to “3.4.2 哨兵中的 Raft 选举”">​</a></h4><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>哨兵集群选举 Leader 过程:</span></span>
<span class="line"><span></span></span>
<span class="line"><span>┌──────────┐  超时  ┌──────────┐</span></span>
<span class="line"><span>│  哨兵1    │───────►│  哨兵1    │</span></span>
<span class="line"><span>│ (Follower)│        │ (Candidate)│</span></span>
<span class="line"><span>└────┬─────┘        └────┬─────┘</span></span>
<span class="line"><span>     │                    │</span></span>
<span class="line"><span>     │ 发起投票请求        │ 发送 RequestVote</span></span>
<span class="line"><span>     │ 自增 term          │ 请求其他哨兵投票</span></span>
<span class="line"><span>     │                    │</span></span>
<span class="line"><span>     ▼                    ▼</span></span>
<span class="line"><span>┌──────────┐           ┌──────────┐</span></span>
<span class="line"><span>│  哨兵2    │──同意────│  哨兵2    │</span></span>
<span class="line"><span>│ (Follower)│          │ (Follower)│</span></span>
<span class="line"><span>└──────────┘           └──────────┘</span></span>
<span class="line"><span></span></span>
<span class="line"><span>     哨兵1 获得多数票 → 成为 Leader</span></span>
<span class="line"><span>     开始执行故障转移流程</span></span></code></pre></div><p><strong>关键规则</strong>：</p><ul><li>任何时刻只有一个 Leader</li><li>Leader 必须获得多数节点（<code>N/2 + 1</code>）的投票</li><li>每次选举都有超时机制，避免无限等待</li><li>网络分区时，只有包含多数节点的分区才能选出 Leader</li></ul><h3 id="_3-5-哨兵集群部署" tabindex="-1">3.5 哨兵集群部署 <a class="header-anchor" href="#_3-5-哨兵集群部署" aria-label="Permalink to “3.5 哨兵集群部署”">​</a></h3><h4 id="_3-5-1-部署奇数个哨兵" tabindex="-1">3.5.1 部署奇数个哨兵 <a class="header-anchor" href="#_3-5-1-部署奇数个哨兵" aria-label="Permalink to “3.5.1 部署奇数个哨兵”">​</a></h4><p>哨兵集群应该部署<strong>奇数个节点</strong>（3、5、7），原因：</p><ul><li><strong>脑裂防护</strong>：需要获得多数节点同意才能执行故障转移</li><li><strong>容错能力</strong>：3 节点允许 1 个节点故障，5 节点允许 2 个节点故障</li><li><strong>避免平票</strong>：偶数个节点可能出现票数相同的情况</li></ul><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>┌──────────────────────────────────────────────────────────┐</span></span>
<span class="line"><span>│  3 哨兵集群 (容忍 1 个节点故障)                            │</span></span>
<span class="line"><span>│  ┌──────────┐                                              │</span></span>
<span class="line"><span>│  │  哨兵1    │ ─┐                                          │</span></span>
<span class="line"><span>│  └──────────┘   │ 多数派 = 2                               │</span></span>
<span class="line"><span>│  ┌──────────┐   ├─► 可以执行故障转移                       │</span></span>
<span class="line"><span>│  │  哨兵2    │ ─┤                                          │</span></span>
<span class="line"><span>│  └──────────┘   │                                          │</span></span>
<span class="line"><span>│  ┌──────────┘   │                                          │</span></span>
<span class="line"><span>│  │  哨兵3    │ ─┘                                          │</span></span>
<span class="line"><span>│  └──────────┘                                              │</span></span>
<span class="line"><span>└──────────────────────────────────────────────────────────┘</span></span></code></pre></div><h4 id="_3-5-2-三哨兵架构搭建实战" tabindex="-1">3.5.2 三哨兵架构搭建实战 <a class="header-anchor" href="#_3-5-2-三哨兵架构搭建实战" aria-label="Permalink to “3.5.2 三哨兵架构搭建实战”">​</a></h4><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># ========== 环境准备 ==========</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 假设 3 台服务器:</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 192.168.1.100 - 主节点 (Master) + 哨兵1</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 192.168.1.101 - 从节点 (Slave1) + 哨兵2</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 192.168.1.102 - 从节点 (Slave2) + 哨兵3</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># ========== 步骤一：部署主从集群 ==========</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 在 192.168.1.100 上配置主节点</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">cat</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> &gt;</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> /etc/redis/redis-master.conf</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> &lt;&lt;</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;EOF&#39;</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">bind 0.0.0.0</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">port 6379</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">requirepass &quot;master_password&quot;</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">masterauth &quot;master_password&quot;</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">repl-backlog-size 67108864</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">min-replicas-to-write 1</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">min-replicas-max-lag 10</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">save 900 1</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">save 300 10</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">save 60 10000</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">dir /var/lib/redis</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">dbfilename dump-master.rdb</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">EOF</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 启动主节点</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">redis-server</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> /etc/redis/redis-master.conf</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 在 192.168.1.101 上配置从节点1</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">cat</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> &gt;</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> /etc/redis/redis-slave1.conf</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> &lt;&lt;</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;EOF&#39;</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">bind 0.0.0.0</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">port 6379</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">replicaof 192.168.1.100 6379</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">masterauth &quot;master_password&quot;</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">replica-read-only yes</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">requirepass &quot;slave_password&quot;</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">replica-priority 100</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">repl-backlog-size 67108864</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">dir /var/lib/redis</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">dbfilename dump-slave1.rdb</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">EOF</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 启动从节点1</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">redis-server</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> /etc/redis/redis-slave1.conf</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 在 192.168.1.102 上配置从节点2</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">cat</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> &gt;</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> /etc/redis/redis-slave2.conf</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> &lt;&lt;</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;EOF&#39;</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">bind 0.0.0.0</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">port 6379</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">replicaof 192.168.1.100 6379</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">masterauth &quot;master_password&quot;</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">replica-read-only yes</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">requirepass &quot;slave_password&quot;</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">replica-priority 200</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">repl-backlog-size 67108864</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">dir /var/lib/redis</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">dbfilename dump-slave2.rdb</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">EOF</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 启动从节点2</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">redis-server</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> /etc/redis/redis-slave2.conf</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># ========== 步骤二：部署哨兵集群 ==========</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 在 192.168.1.100 上配置哨兵1</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">cat</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> &gt;</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> /etc/redis/sentinel.conf</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> &lt;&lt;</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;EOF&#39;</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">port 26379</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">bind 0.0.0.0</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">daemonize yes</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">dir /var/log/redis-sentinel</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">logfile /var/log/redis-sentinel/sentinel.log</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">pidfile /var/run/redis-sentinel.pid</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">sentinel monitor mymaster 192.168.1.100 6379 2</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">sentinel down-after-milliseconds mymaster 5000</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">sentinel failover-timeout mymaster 60000</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">sentinel parallel-syncs mymaster 1</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">sentinel auth-pass mymaster master_password</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">EOF</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 启动哨兵1</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">redis-server</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> /etc/redis/sentinel.conf</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --sentinel</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 在 192.168.1.101 上配置哨兵2（配置相同）</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># ... (同上，只需放在不同服务器)</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 在 192.168.1.102 上配置哨兵3（配置相同）</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># ... (同上，只需放在不同服务器)</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># ========== 步骤三：验证集群 ==========</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 查看主从信息</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">redis-cli</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -h</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 192.168.1.100</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -p</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 6379</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -a</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> master_password</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> info</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> replication</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 查看哨兵状态</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">redis-cli</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -h</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 192.168.1.100</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -p</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 26379</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> sentinel</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> master</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> mymaster</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">redis-cli</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -h</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 192.168.1.100</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -p</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 26379</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> sentinel</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> slaves</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> mymaster</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">redis-cli</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -h</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 192.168.1.100</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -p</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 26379</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> sentinel</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> sentinels</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> mymaster</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 模拟主节点故障</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">redis-cli</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -h</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 192.168.1.100</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -p</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 6379</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -a</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> master_password</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> SHUTDOWN</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 等待故障转移完成（约 10-30 秒）</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">redis-cli</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -h</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 192.168.1.101</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -p</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 26379</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> sentinel</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> get-master-addr-by-name</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> mymaster</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 返回新主节点的 IP:Port</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># ========== 步骤四：客户端集成 ==========</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 客户端连接哨兵查询主节点地址</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">redis-cli</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -h</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 192.168.1.100</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -p</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 26379</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> sentinel</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> get-master-addr-by-name</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> mymaster</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 输出:</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 1) &quot;192.168.1.101&quot;</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 2) &quot;6379&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># Java 客户端示例 (Jedis)</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">JedisSentinelPool</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> pool</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> =</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> new</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> JedisSentinelPool</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">    &quot;mymaster&quot;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">,</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">                        //</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> 主从集群名称</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">    new</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> HashSet</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&lt;&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">Arrays.asList(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">        //</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> 哨兵地址集合</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">        &quot;192.168.1.100:26379&quot;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">,</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">        &quot;192.168.1.101:26379&quot;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">,</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">        &quot;192.168.1.102:26379&quot;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    ))</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">,</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">    new</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> JedisPoolConfig</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">()</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">,</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">    &quot;master_password&quot;</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">                   //</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> 主节点密码</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">);</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">Jedis</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> jedis</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> =</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> pool.getResource</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">();</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">jedis.set(</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">&quot;key&quot;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">,</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;value&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">);</span></span></code></pre></div><h3 id="_3-6-哨兵常用命令" tabindex="-1">3.6 哨兵常用命令 <a class="header-anchor" href="#_3-6-哨兵常用命令" aria-label="Permalink to “3.6 哨兵常用命令”">​</a></h3><div class="language-redis"><button title="Copy Code" class="copy"></button><span class="lang">redis</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span># 集群信息查询</span></span>
<span class="line"><span>sentinel master &lt;master_name&gt;         # 查看主节点信息</span></span>
<span class="line"><span>sentinel slaves &lt;master_name&gt;         # 查看所有从节点信息</span></span>
<span class="line"><span>sentinel sentinels &lt;master_name&gt;       # 查看所有哨兵信息</span></span>
<span class="line"><span>sentinel get-master-addr-by-name &lt;name&gt;  # 获取主节点地址</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 故障转移管理</span></span>
<span class="line"><span>sentinel failover &lt;master_name&gt;       # 手动触发故障转移</span></span>
<span class="line"><span>sentinel ckquorum &lt;master_name&gt;       # 检查当前哨兵集群是否可以执行故障转移</span></span>
<span class="line"><span>sentinel flushconfig                  # 强制刷新配置文件</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 动态配置</span></span>
<span class="line"><span>sentinel set &lt;master_name&gt; &lt;option&gt; &lt;value&gt;  # 动态修改哨兵配置</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 强制重新加载主节点配置</span></span>
<span class="line"><span>sentinel reset &lt;pattern&gt;              # 重置匹配的主节点</span></span></code></pre></div><hr><h2 id="四、集群模式-cluster" tabindex="-1">四、集群模式（Cluster） <a class="header-anchor" href="#四、集群模式-cluster" aria-label="Permalink to “四、集群模式（Cluster）”">​</a></h2><h3 id="_4-1-集群架构" tabindex="-1">4.1 集群架构 <a class="header-anchor" href="#_4-1-集群架构" aria-label="Permalink to “4.1 集群架构”">​</a></h3><p>Redis 集群模式是 Redis 官方提供的分布式集群方案，它通过<strong>哈希槽（Hash Slot）</strong>将数据分布到多个主节点上，实现了横向扩展和高可用。</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>┌─────────────────────────────────────────────────────────────────────┐</span></span>
<span class="line"><span>│                        Redis Cluster 架构                            │</span></span>
<span class="line"><span>├─────────────────────────────────────────────────────────────────────┤</span></span>
<span class="line"><span>│                                                                     │</span></span>
<span class="line"><span>│  ┌──────────┐  Gossip  ┌──────────┐  Gossip  ┌──────────┐          │</span></span>
<span class="line"><span>│  │  主节点1  │◄────────►│  主节点2  │◄────────►│  主节点3  │          │</span></span>
<span class="line"><span>│  │ (Master) │          │ (Master) │          │ (Master) │          │</span></span>
<span class="line"><span>│  │          │          │          │          │          │          │</span></span>
<span class="line"><span>│  │ Slot:   │          │ Slot:   │          │ Slot:   │          │</span></span>
<span class="line"><span>│  │ 0-5460  │          │ 5461-10922│         │ 10923-16383│         │</span></span>
<span class="line"><span>│  └────┬─────┘          └────┬─────┘          └────┬─────┘          │</span></span>
<span class="line"><span>│       │                     │                     │                │</span></span>
<span class="line"><span>│       │ 复制                │ 复制                │ 复制            │</span></span>
<span class="line"><span>│       ▼                     ▼                     ▼                │</span></span>
<span class="line"><span>│  ┌──────────┐          ┌──────────┐          ┌──────────┐          │</span></span>
<span class="line"><span>│  │  从节点1  │          │  从节点2  │          │  从节点3  │          │</span></span>
<span class="line"><span>│  │ (Slave)  │          │ (Slave)  │          │ (Slave)  │          │</span></span>
<span class="line"><span>│  └──────────┘          └──────────┘          └──────────┘          │</span></span>
<span class="line"><span>│                                                                     │</span></span>
<span class="line"><span>│  客户端：需连接任意节点，通过 MOVED/ASK 重定向定位正确的主节点       │</span></span>
<span class="line"><span>│                                                                     │</span></span>
<span class="line"><span>└─────────────────────────────────────────────────────────────────────┘</span></span></code></pre></div><h3 id="_4-2-哈希槽-hash-slot-原理" tabindex="-1">4.2 哈希槽（Hash Slot）原理 <a class="header-anchor" href="#_4-2-哈希槽-hash-slot-原理" aria-label="Permalink to “4.2 哈希槽（Hash Slot）原理”">​</a></h3><h4 id="_4-2-1-16384-个哈希槽" tabindex="-1">4.2.1 16384 个哈希槽 <a class="header-anchor" href="#_4-2-1-16384-个哈希槽" aria-label="Permalink to “4.2.1 16384 个哈希槽”">​</a></h4><p>Redis Cluster 将整个键空间划分为 <strong>16384 个哈希槽（Slot）</strong>，每个主节点负责一部分槽。</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>哈希槽分布:</span></span>
<span class="line"><span>┌─────────────────────────────────────────────────────────────┐</span></span>
<span class="line"><span>│  Slot 0 ───────────────────────────────────── Slot 16383    │</span></span>
<span class="line"><span>│  │                                                           │</span></span>
<span class="line"><span>│  ├─ 主节点1 (Slot 0-5460)                                    │</span></span>
<span class="line"><span>│  ├─ 主节点2 (Slot 5461-10922)                               │</span></span>
<span class="line"><span>│  └─ 主节点3 (Slot 10923-16383)                              │</span></span>
<span class="line"><span>└─────────────────────────────────────────────────────────────┘</span></span>
<span class="line"><span></span></span>
<span class="line"><span>计算键的哈希槽:</span></span>
<span class="line"><span>  slot = CRC16(key) % 16384</span></span>
<span class="line"><span></span></span>
<span class="line"><span>示例:</span></span>
<span class="line"><span>  key = &quot;user:1001&quot;</span></span>
<span class="line"><span>  CRC16(&quot;user:1001&quot;) = 12345</span></span>
<span class="line"><span>  slot = 12345 % 16384 = 12345</span></span>
<span class="line"><span>  → 该 key 属于主节点3 (Slot 10923-16383)</span></span></code></pre></div><h4 id="_4-2-2-crc16-算法" tabindex="-1">4.2.2 CRC16 算法 <a class="header-anchor" href="#_4-2-2-crc16-算法" aria-label="Permalink to “4.2.2 CRC16 算法”">​</a></h4><p>Redis 使用 CRC16 校验和算法来计算键的哈希槽。CRC16 是一种 16 位的循环冗余校验算法。</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>CRC16 多项式: x^16 + x^12 + x^5 + 1 (0x11021)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Redis CRC16 实现（C 语言）:</span></span>
<span class="line"><span>unsigned int CRC16(const unsigned char *data, int len) {</span></span>
<span class="line"><span>    unsigned int crc = 0;</span></span>
<span class="line"><span>    while (len--) {</span></span>
<span class="line"><span>        crc = (crc &lt;&lt; 8) ^ crc16tab[(crc &gt;&gt; 8) ^ *data++];</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    return crc;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 预计算的 CRC16 查找表（256 项）</span></span>
<span class="line"><span>static const unsigned int crc16tab[256] = {</span></span>
<span class="line"><span>    0x0000, 0x1021, 0x2042, 0x3063, 0x4084, 0x50a5, ...</span></span>
<span class="line"><span>};</span></span></code></pre></div><h4 id="_4-2-3-哈希标签-hash-tag" tabindex="-1">4.2.3 哈希标签（Hash Tag） <a class="header-anchor" href="#_4-2-3-哈希标签-hash-tag" aria-label="Permalink to “4.2.3 哈希标签（Hash Tag）”">​</a></h4><p>为了支持将多个键分组到同一个槽（例如实现多键事务），Redis 引入了<strong>哈希标签</strong>机制。</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>规则:</span></span>
<span class="line"><span>  如果 key 中包含 &quot;{&quot; 和 &quot;}&quot;，并且 &quot;{&quot; 后面紧跟着 &quot;}&quot;，</span></span>
<span class="line"><span>  则只计算 &quot;{&quot; 和 &quot;}&quot; 之间的部分作为哈希值</span></span>
<span class="line"><span></span></span>
<span class="line"><span>示例:</span></span>
<span class="line"><span>  {user}:1001 → 只对 &quot;user&quot; 计算 CRC16</span></span>
<span class="line"><span>  {user}:1002 → 只对 &quot;user&quot; 计算 CRC16</span></span>
<span class="line"><span>  → 两个 key 在同一个槽中！</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  user:1001    → 对整个 &quot;user:1001&quot; 计算 CRC16</span></span>
<span class="line"><span>  user:1002    → 对整个 &quot;user:1002&quot; 计算 CRC16</span></span>
<span class="line"><span>  → 两个 key 可能不在同一个槽中！</span></span></code></pre></div><p><strong>哈希标签的应用场景</strong>：</p><ul><li><strong>多键操作</strong>：<code>MGET</code>、<code>MSET</code>、<code>SUNION</code> 等多键命令要求所有键在同一槽</li><li><strong>分布式事务</strong>：<code>MULTI/EXEC</code>、<code>WATCH</code> 等事务操作要求所有键在同一槽</li><li><strong>Lua 脚本</strong>：<code>EVAL</code>、<code>EVALSHA</code> 要求所有键在同一槽</li><li><strong>Hash 结构分片</strong>：将一个大 Hash 的多个字段分布到不同槽</li></ul><h3 id="_4-3-gossip-协议-集群节点通信" tabindex="-1">4.3 Gossip 协议（集群节点通信） <a class="header-anchor" href="#_4-3-gossip-协议-集群节点通信" aria-label="Permalink to “4.3 Gossip 协议（集群节点通信）”">​</a></h3><p>Redis Cluster 节点之间通过 <strong>Gossip 协议</strong>进行通信，每个节点周期性地与其他节点交换集群状态信息。</p><h4 id="_4-3-1-gossip-基本原理" tabindex="-1">4.3.1 Gossip 基本原理 <a class="header-anchor" href="#_4-3-1-gossip-基本原理" aria-label="Permalink to “4.3.1 Gossip 基本原理”">​</a></h4><p>Gossip 协议是一种去中心化的通信协议，信息以类似&quot;谣言传播&quot;的方式在节点间扩散。</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>Gossip 传播过程:</span></span>
<span class="line"><span>时间 t=0:</span></span>
<span class="line"><span>┌──────────┐</span></span>
<span class="line"><span>│  节点A    │  知道事件 X</span></span>
<span class="line"><span>└────┬─────┘</span></span>
<span class="line"><span>     │ 随机选择节点 B 交换信息</span></span>
<span class="line"><span>     ▼</span></span>
<span class="line"><span>时间 t=1:</span></span>
<span class="line"><span>┌──────────┐     ┌──────────┐</span></span>
<span class="line"><span>│  节点A    │     │  节点B    │  也知道事件 X</span></span>
<span class="line"><span>└────┬─────┘     └────┬─────┘</span></span>
<span class="line"><span>     │                │</span></span>
<span class="line"><span>     │ 随机选择节点   │ 随机选择节点</span></span>
<span class="line"><span>     ▼                ▼</span></span>
<span class="line"><span>时间 t=2:</span></span>
<span class="line"><span>┌──────────┐  ┌──────────┐  ┌──────────┐</span></span>
<span class="line"><span>│  节点A    │  │  节点B    │  │  节点C    │  也知道事件 X</span></span>
<span class="line"><span>└──────────┘  └────┬─────┘  └──────────┘</span></span>
<span class="line"><span>                   │</span></span>
<span class="line"><span>                   │</span></span>
<span class="line"><span>                   ▼</span></span>
<span class="line"><span>时间 t=3:</span></span>
<span class="line"><span>            ┌──────────┐</span></span>
<span class="line"><span>            │  节点D    │  也知道事件 X</span></span>
<span class="line"><span>            └──────────┘</span></span>
<span class="line"><span></span></span>
<span class="line"><span>信息以 O(log N) 的速度在 N 个节点中传播</span></span></code></pre></div><h4 id="_4-3-2-redis-gossip-的实现" tabindex="-1">4.3.2 Redis Gossip 的实现 <a class="header-anchor" href="#_4-3-2-redis-gossip-的实现" aria-label="Permalink to “4.3.2 Redis Gossip 的实现”">​</a></h4><p>Redis Cluster 使用 <code>CLUSTER MEET</code> 命令和 <code>Gossip</code> 消息来构建集群。</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>1. 节点 A 通过 CLUSTER MEET 加入节点 B:</span></span>
<span class="line"><span>   节点A ──CLUSTER MEET──► 节点B</span></span>
<span class="line"><span>   节点B 添加节点A 到 peers 列表</span></span>
<span class="line"><span></span></span>
<span class="line"><span>2. Gossip 消息交换:</span></span>
<span class="line"><span>   节点A ──PING/PONG──► 节点B</span></span>
<span class="line"><span>   （包含自身的集群信息和已知的其他节点信息）</span></span>
<span class="line"><span>   节点A ──PING/PONG──► 节点C</span></span>
<span class="line"><span>   ...</span></span>
<span class="line"><span></span></span>
<span class="line"><span>3. 集群信息扩散:</span></span>
<span class="line"><span>   每个节点维护一个完整的集群状态视图</span></span>
<span class="line"><span>   通过 Gossip 逐渐同步所有节点的状态</span></span></code></pre></div><h4 id="_4-3-3-gossip-消息类型" tabindex="-1">4.3.3 Gossip 消息类型 <a class="header-anchor" href="#_4-3-3-gossip-消息类型" aria-label="Permalink to “4.3.3 Gossip 消息类型”">​</a></h4><table tabindex="0"><thead><tr><th>消息类型</th><th>说明</th></tr></thead><tbody><tr><td><code>MEET</code></td><td>邀请新节点加入集群</td></tr><tr><td><code>PING</code></td><td>检测节点是否存活（包含集群状态摘要）</td></tr><tr><td><code>PONG</code></td><td>对 PING 或 MEET 的响应</td></tr><tr><td><code>FAIL</code></td><td>广播某节点已下线</td></tr></tbody></table><h3 id="_4-4-moved-与-ask-重定向" tabindex="-1">4.4 MOVED 与 ASK 重定向 <a class="header-anchor" href="#_4-4-moved-与-ask-重定向" aria-label="Permalink to “4.4 MOVED 与 ASK 重定向”">​</a></h3><p>当客户端发送命令到错误的节点（即键的哈希槽不在该节点上）时，Redis 会返回 <code>MOVED</code> 或 <code>ASK</code> 重定向指令。</p><h4 id="_4-4-1-moved-重定向" tabindex="-1">4.4.1 MOVED 重定向 <a class="header-anchor" href="#_4-4-1-moved-重定向" aria-label="Permalink to “4.4.1 MOVED 重定向”">​</a></h4><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>客户端 ──SET key value──► 节点A (Slot 5000)</span></span>
<span class="line"><span>                         ↓</span></span>
<span class="line"><span>                    key = &quot;user:1001&quot;</span></span>
<span class="line"><span>                    slot = CRC16(&quot;user:1001&quot;) % 16384 = 12345</span></span>
<span class="line"><span>                    → 属于节点C (Slot 10923-16383)</span></span>
<span class="line"><span>                         ↓</span></span>
<span class="line"><span>                    节点A 返回:</span></span>
<span class="line"><span>                    -MOVED 12345 nodeC_ip:nodeC_port</span></span>
<span class="line"><span>                         ↓</span></span>
<span class="line"><span>                    客户端直接连接节点C，重新发送命令</span></span></code></pre></div><p><strong>MOVED 的含义</strong>：此槽已经完成迁移（或从未在此节点），客户端应该永久重定向到新节点。</p><h4 id="_4-4-2-ask-重定向" tabindex="-1">4.4.2 ASK 重定向 <a class="header-anchor" href="#_4-4-2-ask-重定向" aria-label="Permalink to “4.4.2 ASK 重定向”">​</a></h4><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>ASCK 与 MOVED 的区别:</span></span>
<span class="line"><span>┌─────────────────────────────────────────────────────────────┐</span></span>
<span class="line"><span>│  MOVED:                                                      │</span></span>
<span class="line"><span>│  此槽已经正式归属于其他节点，客户端应该永久更新路由表         │</span></span>
<span class="line"><span>│                                                             │</span></span>
<span class="line"><span>│  ASK:                                                       │</span></span>
<span class="line"><span>│  此槽正在迁移过程中，客户端应该临时转向另一个节点             │</span></span>
<span class="line"><span>│  迁移完成后会收到 MOVED 指令                                  │</span></span>
<span class="line"><span>└─────────────────────────────────────────────────────────────┘</span></span>
<span class="line"><span></span></span>
<span class="line"><span>客户端处理逻辑:</span></span>
<span class="line"><span>  收到 MOVED → 更新本地路由缓存，后续请求直接发送到新节点</span></span>
<span class="line"><span>  收到 ASK → 临时转向目标节点，但不更新路由缓存</span></span></code></pre></div><h4 id="_4-4-3-客户端处理流程" tabindex="-1">4.4.3 客户端处理流程 <a class="header-anchor" href="#_4-4-3-客户端处理流程" aria-label="Permalink to “4.4.3 客户端处理流程”">​</a></h4><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>┌──────────────┐</span></span>
<span class="line"><span>│  客户端       │</span></span>
<span class="line"><span>└──────┬───────┘</span></span>
<span class="line"><span>       │</span></span>
<span class="line"><span>       │ 1. 发送命令到已知的任意节点</span></span>
<span class="line"><span>       ▼</span></span>
<span class="line"><span>┌──────────────┐     ┌──────────────┐</span></span>
<span class="line"><span>│   节点X       │────►│   节点X       │</span></span>
<span class="line"><span>└──────┬───────┘     └──────┬───────┘</span></span>
<span class="line"><span>       │                    │</span></span>
<span class="line"><span>  键在此节点？          键不在此节点</span></span>
<span class="line"><span>       │                    │</span></span>
<span class="line"><span>       ▼                    ▼</span></span>
<span class="line"><span>  执行命令            返回 MOVED/ASK</span></span>
<span class="line"><span>       │                    │</span></span>
<span class="line"><span>       │                    │</span></span>
<span class="line"><span>       ▼                    ▼</span></span>
<span class="line"><span>  返回结果            客户端解析响应</span></span>
<span class="line"><span>                            │</span></span>
<span class="line"><span>                     ┌──────┴──────┐</span></span>
<span class="line"><span>                     │             │</span></span>
<span class="line"><span>                     ▼             ▼</span></span>
<span class="line"><span>                  MOVED          ASK</span></span>
<span class="line"><span>                     │             │</span></span>
<span class="line"><span>                     ▼             ▼</span></span>
<span class="line"><span>              更新路由缓存    临时转发</span></span>
<span class="line"><span>                     │             │</span></span>
<span class="line"><span>                     ▼             ▼</span></span>
<span class="line"><span>              重发到正确节点  重发到目标节点</span></span></code></pre></div><h3 id="_4-5-集群配置" tabindex="-1">4.5 集群配置 <a class="header-anchor" href="#_4-5-集群配置" aria-label="Permalink to “4.5 集群配置”">​</a></h3><h4 id="_4-5-1-集群节点配置" tabindex="-1">4.5.1 集群节点配置 <a class="header-anchor" href="#_4-5-1-集群节点配置" aria-label="Permalink to “4.5.1 集群节点配置”">​</a></h4><div class="language-redis"><button title="Copy Code" class="copy"></button><span class="lang">redis</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span># redis-cluster.conf - 集群节点配置</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 绑定地址</span></span>
<span class="line"><span>bind 0.0.0.0</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 端口</span></span>
<span class="line"><span>port 6379</span></span>
<span class="line"><span></span></span>
<span class="line"><span># ========== 集群相关配置 ==========</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 开启集群模式</span></span>
<span class="line"><span>cluster-enabled yes</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 集群配置文件（每个节点唯一，自动生成）</span></span>
<span class="line"><span># 记录集群状态、槽分配、节点信息等</span></span>
<span class="line"><span>cluster-config-file nodes.conf</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 节点超时时间（毫秒）</span></span>
<span class="line"><span># 超过此时间未响应则标记为 PFAIL</span></span>
<span class="line"><span>cluster-node-timeout 15000</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 集群副本因子</span></span>
<span class="line"><span># 每个主节点的从节点数量（通常设为 1）</span></span>
<span class="line"><span>cluster-replica-validity-factor 10</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 允许没有从节点的主节点继续服务（不推荐）</span></span>
<span class="line"><span>cluster-require-full-coverage yes</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 集群总线端口（节点通信端口，自动计算为 port + 10000）</span></span>
<span class="line"><span># 如果 port=6379，集群总线端口为 16379</span></span>
<span class="line"><span></span></span>
<span class="line"><span># ========== 持久化配置 ==========</span></span>
<span class="line"><span>save 900 1</span></span>
<span class="line"><span>save 300 10</span></span>
<span class="line"><span>save 60 10000</span></span>
<span class="line"><span></span></span>
<span class="line"><span># ========== 内存配置 ==========</span></span>
<span class="line"><span>maxmemory 4gb</span></span>
<span class="line"><span>maxmemory-policy allkeys-lru</span></span>
<span class="line"><span></span></span>
<span class="line"><span># ========== 安全配置 ==========</span></span>
<span class="line"><span>requirepass &quot;cluster_password&quot;</span></span>
<span class="line"><span>masterauth &quot;cluster_password&quot;</span></span></code></pre></div><h4 id="_4-5-2-集群配置文件-nodes-conf" tabindex="-1">4.5.2 集群配置文件（nodes.conf） <a class="header-anchor" href="#_4-5-2-集群配置文件-nodes-conf" aria-label="Permalink to “4.5.2 集群配置文件（nodes.conf）”">​</a></h4><p>每个集群节点会自动维护一个 <code>nodes.conf</code> 文件，记录集群的完整状态。</p><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># nodes.conf 示例</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">cat</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> /var/lib/redis-cluster/nodes-6379.conf</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 内容格式:</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># &lt;node_id&gt; &lt;ip:port:flags&gt; &lt;master_id&gt; &lt;ping_sent&gt; &lt;pong_recv&gt; &lt;config_epoch&gt; &lt;link_state&gt; &lt;slots&gt;</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 示例:</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># abc123... 192.168.1.100:6379@16379 myself,master - 0 15000 1 connected 0-5460</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># def456... 192.168.1.101:6379@16379 slave abc123... 0 15000 2 connected</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># ghi789... 192.168.1.102:6379@16379 master - 0 15000 3 connected 5461-10922</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># jkl012... 192.168.1.103:6379@16379 master - 0 15000 4 connected 10923-16383</span></span></code></pre></div><h3 id="_4-6-集群搭建" tabindex="-1">4.6 集群搭建 <a class="header-anchor" href="#_4-6-集群搭建" aria-label="Permalink to “4.6 集群搭建”">​</a></h3><h4 id="_4-6-1-创建集群" tabindex="-1">4.6.1 创建集群 <a class="header-anchor" href="#_4-6-1-创建集群" aria-label="Permalink to “4.6.1 创建集群”">​</a></h4><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># ========== 环境准备 ==========</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 6 台服务器（3 主 3 从）:</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 192.168.1.100:6379 - 主节点1</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 192.168.1.101:6379 - 主节点2</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 192.168.1.102:6379 - 主节点3</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 192.168.1.103:6379 - 从节点1 (主节点1的从)</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 192.168.1.104:6379 - 从节点2 (主节点2的从)</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 192.168.1.105:6379 - 从节点3 (主节点3的从)</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># ========== 步骤一：配置所有节点 ==========</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 在每个节点上创建配置</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">for</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> i </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">in</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> $(</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">seq</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 100</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 105</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">); </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">do</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">    cat</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> &gt;</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> /etc/redis/redis-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">\${i}</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">.conf</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> &lt;&lt;</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> EOF</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">bind 0.0.0.0</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">port 6379</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">cluster-enabled yes</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">cluster-config-file nodes-\${</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">i</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">}.conf</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">cluster-node-timeout 15000</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">cluster-require-full-coverage yes</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">save 900 1</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">save 300 10</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">save 60 10000</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">dir /var/lib/redis-cluster</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">dbfilename dump-\${</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">i</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">}.rdb</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">appendonly yes</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">appendfilename &quot;appendonly-\${</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">i</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">}.aof&quot;</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">requirepass &quot;cluster_password&quot;</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">masterauth &quot;cluster_password&quot;</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">EOF</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">done</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 启动所有节点</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">redis-server</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> /etc/redis/redis-100.conf</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">redis-server</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> /etc/redis/redis-101.conf</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">redis-server</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> /etc/redis/redis-102.conf</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">redis-server</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> /etc/redis/redis-103.conf</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">redis-server</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> /etc/redis/redis-104.conf</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">redis-server</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> /etc/redis/redis-105.conf</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># ========== 步骤二：使用 redis-cli 创建集群 ==========</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># Redis 5.0+ 推荐使用 redis-cli 创建集群</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># create 命令自动分配哈希槽和主从关系</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">redis-cli</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --cluster</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> create</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> \\</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">    192.168.1.100:6379</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> \\</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">    192.168.1.101:6379</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> \\</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">    192.168.1.102:6379</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> \\</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">    192.168.1.103:6379</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> \\</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">    192.168.1.104:6379</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> \\</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">    192.168.1.105:6379</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> \\</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    --cluster-replicas</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 1</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> \\</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    -a</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> cluster_password</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 参数说明:</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># --cluster-replicas 1  → 每个主节点分配 1 个从节点</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># -a cluster_password    → 集群密码</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 输出示例:</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># &gt;&gt;&gt; Performing hash slot alignment...</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># &gt;&gt;&gt; Adding node 192.168.1.101:6379 to cluster</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># &gt;&gt;&gt; Adding node 192.168.1.102:6379 to cluster</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># &gt;&gt;&gt; Adding replica 192.168.1.103:6379 to 192.168.1.100:6379</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># &gt;&gt;&gt; Adding replica 192.168.1.104:6379 to 192.168.1.101:6379</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># &gt;&gt;&gt; Adding replica 192.168.1.105:6379 to 192.168.1.102:6379</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># &gt;&gt;&gt; Try to check cluster nodes...</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># &gt;&gt;&gt; Performing Cluster Check...</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># ========== 步骤三：验证集群 ==========</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 查看集群节点</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">redis-cli</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -h</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 192.168.1.100</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -p</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 6379</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -a</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> cluster_password</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> cluster</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> nodes</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 查看哈希槽分配</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">redis-cli</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -h</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 192.168.1.100</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -p</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 6379</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -a</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> cluster_password</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> cluster</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> slots</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 测试数据操作</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">redis-cli</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -c</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -h</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 192.168.1.100</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -p</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 6379</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -a</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> cluster_password</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># -c 参数启用集群模式，客户端会自动处理 MOVED 重定向</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">192.168.1.100:6379</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt; </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">SET</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> user:1001</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;Alice&quot;</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">192.168.1.100:6379</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt; </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">SET</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> user:1002</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;Bob&quot;</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">192.168.1.100:6379</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt; </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">GET</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> user:1001</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">&quot;Alice&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># ========== 步骤四：添加新节点 ==========</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 添加新的主节点</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">redis-cli</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --cluster</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> add-node</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> \\</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">    192.168.1.106:6379</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> \\</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">    192.168.1.100:6379</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> \\</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    -a</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> cluster_password</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 为新节点分配哈希槽</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">redis-cli</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --cluster</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> reshard</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> \\</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">    192.168.1.100:6379</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> \\</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    --cluster-from</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> 192.168.1.100:6379</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> \\</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    --cluster-to</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> 192.168.1.106:6379</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> \\</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    --cluster-slots</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 100</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> \\</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    --cluster-yes</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> \\</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    -a</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> cluster_password</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 为新主节点添加从节点</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">redis-cli</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --cluster</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> add-node</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> \\</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">    192.168.1.107:6379</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> \\</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">    192.168.1.100:6379</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> \\</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    --cluster-slave</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> \\</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    --cluster-master-id</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> &lt;</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">new_master_i</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">d</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&gt;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> \\</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    -a</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> cluster_password</span></span></code></pre></div><h4 id="_4-6-2-哈希槽迁移" tabindex="-1">4.6.2 哈希槽迁移 <a class="header-anchor" href="#_4-6-2-哈希槽迁移" aria-label="Permalink to “4.6.2 哈希槽迁移”">​</a></h4><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>哈希槽迁移流程:</span></span>
<span class="line"><span>┌──────────┐     迁移槽     ┌──────────┐</span></span>
<span class="line"><span>│  源主节点  │──────────────►│  目标主节点 │</span></span>
<span class="line"><span>│ (Source)  │   数据同步     │  (Target) │</span></span>
<span class="line"><span>└──────────┘               └──────────┘</span></span>
<span class="line"><span></span></span>
<span class="line"><span>详细步骤:</span></span>
<span class="line"><span>1. 目标节点导入源节点:</span></span>
<span class="line"><span>   CLUSTER SET-CONFIG-EPOCH &lt;epoch&gt;</span></span>
<span class="line"><span>   CLUSTER SETSLOT &lt;slot&gt; NODE &lt;target_node_id&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>2. 源节点准备迁移:</span></span>
<span class="line"><span>   CLUSTER SETSLOT &lt;slot&gt; MIGRATING &lt;target_node_id&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>3. 目标节点准备接收:</span></span>
<span class="line"><span>   CLUSTER SETSLOT &lt;slot&gt; IMPORTING &lt;source_node_id&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>4. 迁移数据:</span></span>
<span class="line"><span>   在源节点上执行 CLUSTER GETKEYSINSLOT &lt;slot&gt; &lt;count&gt;</span></span>
<span class="line"><span>   然后使用 MIGRATE 命令迁移每个 key</span></span>
<span class="line"><span></span></span>
<span class="line"><span>5. 完成迁移:</span></span>
<span class="line"><span>   在源节点上: CLUSTER SETSLOT &lt;slot&gt; NODE &lt;target_node_id&gt;</span></span>
<span class="line"><span>   在目标节点上: CLUSTER SETSLOT &lt;slot&gt; NODE &lt;target_node_id&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>6. 所有节点更新配置:</span></span>
<span class="line"><span>   Gossip 协议传播新的槽分配信息</span></span></code></pre></div><h3 id="_4-7-集群读写规则" tabindex="-1">4.7 集群读写规则 <a class="header-anchor" href="#_4-7-集群读写规则" aria-label="Permalink to “4.7 集群读写规则”">​</a></h3><h4 id="_4-7-1-支持的命令" tabindex="-1">4.7.1 支持的命令 <a class="header-anchor" href="#_4-7-1-支持的命令" aria-label="Permalink to “4.7.1 支持的命令”">​</a></h4><p>Redis Cluster 支持大部分 Redis 命令，但有一些限制：</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>支持的命令:</span></span>
<span class="line"><span>  单键命令: SET, GET, DEL, HSET, HGET, LPUSH, RPUSH, SADD, ZADD 等</span></span>
<span class="line"><span>  多键命令（同槽）: MGET, MSET, SUNION, SDIFF, ZUNION 等</span></span>
<span class="line"><span>  事务命令（同槽）: MULTI, EXEC, WATCH 等</span></span>
<span class="line"><span>  Lua 脚本（同槽）: EVAL, EVALSHA 等</span></span>
<span class="line"><span>  数据库命令: SELECT 不支持，只能使用 0 号数据库</span></span>
<span class="line"><span></span></span>
<span class="line"><span>不支持的命令:</span></span>
<span class="line"><span>  RANDOMKEY, KEYS, SCAN (部分支持)</span></span>
<span class="line"><span>  涉及多个槽的多键命令</span></span>
<span class="line"><span>  FLUSHALL, FLUSHDB</span></span></code></pre></div><h4 id="_4-7-2-多键命令的限制" tabindex="-1">4.7.2 多键命令的限制 <a class="header-anchor" href="#_4-7-2-多键命令的限制" aria-label="Permalink to “4.7.2 多键命令的限制”">​</a></h4><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>规则: 所有多键命令的键必须在同一个哈希槽中</span></span>
<span class="line"><span></span></span>
<span class="line"><span>示例:</span></span>
<span class="line"><span>  MSET user:1001 &quot;Alice&quot; user:1002 &quot;Bob&quot;</span></span>
<span class="line"><span>  → 如果两个 key 在不同槽中，会报错:</span></span>
<span class="line"><span>    CROSSSLOT Keys in request don&#39;t hash to the same slot</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  解决方案: 使用哈希标签</span></span>
<span class="line"><span>  MSET {user}:1001 &quot;Alice&quot; {user}:1002 &quot;Bob&quot;</span></span>
<span class="line"><span>  → 两个 key 都对 &quot;user&quot; 计算哈希，在同一槽中</span></span></code></pre></div><h3 id="_4-8-集群-vs-哨兵对比" tabindex="-1">4.8 集群 vs 哨兵对比 <a class="header-anchor" href="#_4-8-集群-vs-哨兵对比" aria-label="Permalink to “4.8 集群 vs 哨兵对比”">​</a></h3><table tabindex="0"><thead><tr><th>维度</th><th>哨兵模式</th><th>集群模式</th></tr></thead><tbody><tr><td><strong>数据分布</strong></td><td>全量复制，所有节点数据相同</td><td>分片存储，16384 槽分散到多个主节点</td></tr><tr><td><strong>写入能力</strong></td><td>单个主节点写入</td><td>多个主节点并行写入</td></tr><tr><td><strong>存储扩展</strong></td><td>不支持，受单节点内存限制</td><td>支持，添加主节点扩展内存</td></tr><tr><td><strong>故障转移</strong></td><td>哨兵集群自动选举新主</td><td>各主节点通过 Gossip 自动故障转移</td></tr><tr><td><strong>客户端</strong></td><td>通过哨兵查询主节点地址</td><td>连接任意节点，通过 MOVED 重定向</td></tr><tr><td><strong>多键操作</strong></td><td>无限制</td><td>同槽限制（使用哈希标签解决）</td></tr><tr><td><strong>复杂度</strong></td><td>较低</td><td>较高</td></tr><tr><td><strong>典型场景</strong></td><td>中小规模，单主架构</td><td>大规模，需要横向扩展</td></tr></tbody></table><hr><h2 id="五、三种模式对比与选型建议" tabindex="-1">五、三种模式对比与选型建议 <a class="header-anchor" href="#五、三种模式对比与选型建议" aria-label="Permalink to “五、三种模式对比与选型建议”">​</a></h2><h3 id="_5-1-功能对比" tabindex="-1">5.1 功能对比 <a class="header-anchor" href="#_5-1-功能对比" aria-label="Permalink to “5.1 功能对比”">​</a></h3><table tabindex="0"><thead><tr><th>维度</th><th>主从复制</th><th>哨兵模式</th><th>集群模式</th></tr></thead><tbody><tr><td><strong>数据冗余</strong></td><td>✅ 从节点备份</td><td>✅ 从节点备份</td><td>✅ 每个主节点有从节点</td></tr><tr><td><strong>读写分离</strong></td><td>✅ 手动实现</td><td>✅ 哨兵提供地址</td><td>✅ 自动路由</td></tr><tr><td><strong>故障转移</strong></td><td>❌ 手动</td><td>✅ 自动（Raft）</td><td>✅ 自动（Gossip）</td></tr><tr><td><strong>横向扩展</strong></td><td>❌</td><td>❌</td><td>✅ 分片存储</td></tr><tr><td><strong>数据一致性</strong></td><td>最终一致</td><td>最终一致</td><td>最终一致</td></tr><tr><td><strong>脑裂防护</strong></td><td>❌</td><td>✅ Raft 多数派</td><td>✅ Gossip 协议</td></tr><tr><td><strong>运维复杂度</strong></td><td>低</td><td>中</td><td>高</td></tr></tbody></table><h3 id="_5-2-性能对比" tabindex="-1">5.2 性能对比 <a class="header-anchor" href="#_5-2-性能对比" aria-label="Permalink to “5.2 性能对比”">​</a></h3><table tabindex="0"><thead><tr><th>维度</th><th>主从复制</th><th>哨兵模式</th><th>集群模式</th></tr></thead><tbody><tr><td><strong>写入性能</strong></td><td>单主节点瓶颈</td><td>单主节点瓶颈</td><td>多主节点并行，线性扩展</td></tr><tr><td><strong>读取性能</strong></td><td>可通过从节点扩展</td><td>可通过从节点扩展</td><td>每个主节点的从节点都可读取</td></tr><tr><td><strong>数据容量</strong></td><td>单节点内存上限</td><td>单节点内存上限</td><td>所有主节点内存之和</td></tr><tr><td><strong>网络开销</strong></td><td>主从复制流量</td><td>哨兵通信 + 主从复制</td><td>Gossip 通信 + 主从复制 + 重定向</td></tr></tbody></table><h3 id="_5-3-选型建议" tabindex="-1">5.3 选型建议 <a class="header-anchor" href="#_5-3-选型建议" aria-label="Permalink to “5.3 选型建议”">​</a></h3><h4 id="小型项目-qps-5000-数据-4gb" tabindex="-1">小型项目（QPS &lt; 5000，数据 &lt; 4GB） <a class="header-anchor" href="#小型项目-qps-5000-数据-4gb" aria-label="Permalink to “小型项目（QPS &lt; 5000，数据 &lt; 4GB）”">​</a></h4><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>推荐方案: 主从复制</span></span>
<span class="line"><span>架构: 1 主 + 2 从</span></span>
<span class="line"><span>优点: 简单、易维护、成本低</span></span>
<span class="line"><span>缺点: 无自动故障转移</span></span></code></pre></div><h4 id="中型项目-qps-5000-50000-数据-16gb" tabindex="-1">中型项目（QPS 5000-50000，数据 &lt; 16GB） <a class="header-anchor" href="#中型项目-qps-5000-50000-数据-16gb" aria-label="Permalink to “中型项目（QPS 5000-50000，数据 &lt; 16GB）”">​</a></h4><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>推荐方案: 哨兵模式</span></span>
<span class="line"><span>架构: 1 主 + 2 从 + 3 哨兵</span></span>
<span class="line"><span>优点: 自动故障转移、读写分离</span></span>
<span class="line"><span>缺点: 单主瓶颈、无法横向扩展</span></span></code></pre></div><h4 id="大型项目-qps-50000-数据-16gb" tabindex="-1">大型项目（QPS &gt; 50000，数据 &gt; 16GB） <a class="header-anchor" href="#大型项目-qps-50000-数据-16gb" aria-label="Permalink to “大型项目（QPS &gt; 50000，数据 &gt; 16GB）”">​</a></h4><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>推荐方案: 集群模式</span></span>
<span class="line"><span>架构: N 主 + N 从 (N &gt;= 3)</span></span>
<span class="line"><span>优点: 横向扩展、高可用、自动故障转移</span></span>
<span class="line"><span>缺点: 架构复杂、需要处理跨槽问题</span></span></code></pre></div><h4 id="选型决策流程" tabindex="-1">选型决策流程 <a class="header-anchor" href="#选型决策流程" aria-label="Permalink to “选型决策流程”">​</a></h4><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>                    ┌───────────────────────┐</span></span>
<span class="line"><span>                    │ 是否需要横向扩展？      │</span></span>
<span class="line"><span>                    └──────────┬────────────┘</span></span>
<span class="line"><span>                               │</span></span>
<span class="line"><span>                    ┌────YES───┴───NO────┐</span></span>
<span class="line"><span>                    ▼                    ▼</span></span>
<span class="line"><span>             ┌──────────┐         ┌──────────┐</span></span>
<span class="line"><span>             │ 集群模式  │         │ 需要高可用? │</span></span>
<span class="line"><span>             └──────────┘         └────┬─────┘</span></span>
<span class="line"><span>                                        │</span></span>
<span class="line"><span>                              ┌────YES───┴───NO────┐</span></span>
<span class="line"><span>                              ▼                    ▼</span></span>
<span class="line"><span>                       ┌──────────┐           ┌──────────┐</span></span>
<span class="line"><span>                       │ 哨兵模式  │           │ 主从复制  │</span></span>
<span class="line"><span>                       └──────────┘           └──────────┘</span></span></code></pre></div><hr><h2 id="六、实战-从零搭建高可用架构" tabindex="-1">六、实战：从零搭建高可用架构 <a class="header-anchor" href="#六、实战-从零搭建高可用架构" aria-label="Permalink to “六、实战：从零搭建高可用架构”">​</a></h2><h3 id="_6-1-哨兵模式完整搭建" tabindex="-1">6.1 哨兵模式完整搭建 <a class="header-anchor" href="#_6-1-哨兵模式完整搭建" aria-label="Permalink to “6.1 哨兵模式完整搭建”">​</a></h3><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># ========== 服务器规划 ==========</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># Node A: 192.168.1.100 - Redis 主节点 + 哨兵</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># Node B: 192.168.1.101 - Redis 从节点 + 哨兵</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># Node C: 192.168.1.102 - Redis 从节点 + 哨兵</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># ========== Step 1: 在 Node A 上配置主节点 ==========</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">cat</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> &gt;</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> /etc/redis/redis.conf</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> &lt;&lt;</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;EOF&#39;</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">bind 192.168.1.100</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">port 6379</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">requirepass &quot;prod_redis_pass&quot;</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">masterauth &quot;prod_redis_pass&quot;</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">daemonize yes</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">dir /data/redis</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">dbfilename dump.rdb</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">appendonly yes</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">appendfilename &quot;appendonly.aof&quot;</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">save 900 1</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">save 300 10</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">save 60 10000</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">repl-backlog-size 134217728</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">min-replicas-to-write 1</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">min-replicas-max-lag 5</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">repl-ping-replica-period 5</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">logfile /var/log/redis/redis.log</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">loglevel notice</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">maxmemory 8gb</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">maxmemory-policy allkeys-lru</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">EOF</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 启动主节点</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">redis-server</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> /etc/redis/redis.conf</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># ========== Step 2: 在 Node B 上配置从节点 ==========</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">cat</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> &gt;</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> /etc/redis/redis.conf</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> &lt;&lt;</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;EOF&#39;</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">bind 192.168.1.101</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">port 6379</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">replicaof 192.168.1.100 6379</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">masterauth &quot;prod_redis_pass&quot;</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">requirepass &quot;prod_redis_pass&quot;</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">replica-read-only yes</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">replica-priority 100</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">daemonize yes</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">dir /data/redis</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">dbfilename dump.rdb</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">appendonly yes</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">appendfilename &quot;appendonly.aof&quot;</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">save 900 1</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">save 300 10</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">save 60 10000</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">repl-backlog-size 134217728</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">logfile /var/log/redis/redis.log</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">loglevel notice</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">maxmemory 8gb</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">maxmemory-policy allkeys-lru</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">EOF</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 启动从节点</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">redis-server</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> /etc/redis/redis.conf</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># ========== Step 3: 在 Node C 上配置另一个从节点 ==========</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># (同 Node B，修改 bind 地址和 replica-priority)</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># replica-priority 设为 200</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># ========== Step 4: 验证主从复制 ==========</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 在主节点上</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">redis-cli</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -h</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 192.168.1.100</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -p</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 6379</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -a</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> prod_redis_pass</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> info</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> replication</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 确保 connected_slaves: 2，两个从节点状态为 online</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 测试数据复制</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">redis-cli</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -h</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 192.168.1.100</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -p</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 6379</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -a</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> prod_redis_pass</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> SET</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> test:key</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;hello&quot;</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">redis-cli</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -h</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 192.168.1.101</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -p</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 6379</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -a</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> prod_redis_pass</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> GET</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> test:key</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 应该返回 &quot;hello&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># ========== Step 5: 在所有节点上部署哨兵 ==========</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># (Node A, B, C 上都部署哨兵，配置相同)</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">cat</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> &gt;</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> /etc/redis/sentinel.conf</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> &lt;&lt;</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;EOF&#39;</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">port 26379</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">bind 0.0.0.0</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">daemonize yes</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">dir /data/redis-sentinel</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">logfile /var/log/redis-sentinel/sentinel.log</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">pidfile /var/run/redis-sentinel.pid</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"># 监控主节点，法定人数为 2（3 个哨兵中需 2 个同意）</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">sentinel monitor prodmaster 192.168.1.100 6379 2</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"># 主观下线超时：5 秒</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">sentinel down-after-milliseconds prodmaster 5000</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"># 故障转移超时：60 秒</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">sentinel failover-timeout prodmaster 60000</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"># 并行同步数：1</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">sentinel parallel-syncs prodmaster 1</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"># 主节点密码</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">sentinel auth-pass prodmaster prod_redis_pass</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"># 安全配置</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">sentinel deny-scripts-reconfig yes</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">EOF</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 在每个节点上启动哨兵</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">redis-server</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> /etc/redis/sentinel.conf</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --sentinel</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># ========== Step 6: 验证哨兵集群 ==========</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 查看主节点状态</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">redis-cli</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -h</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 192.168.1.100</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -p</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 26379</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> sentinel</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> master</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> prodmaster</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 查看从节点列表</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">redis-cli</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -h</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 192.168.1.100</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -p</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 26379</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> sentinel</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> slaves</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> prodmaster</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 查看哨兵列表</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">redis-cli</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -h</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 192.168.1.100</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -p</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 26379</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> sentinel</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> sentinels</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> prodmaster</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 获取当前主节点地址</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">redis-cli</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -h</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 192.168.1.100</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -p</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 26379</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> sentinel</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> get-master-addr-by-name</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> prodmaster</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># ========== Step 7: 模拟故障转移 ==========</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 停止主节点</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">redis-cli</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -h</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 192.168.1.100</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -p</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 6379</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -a</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> prod_redis_pass</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> SHUTDOWN</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 等待故障转移（约 10-30 秒）</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 检查新主节点</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">redis-cli</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -h</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 192.168.1.101</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -p</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 26379</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> sentinel</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> get-master-addr-by-name</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> prodmaster</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 应该返回 192.168.1.101 或 192.168.1.102</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 恢复旧主节点（使其成为新主的从节点）</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">redis-server</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> /etc/redis/redis.conf</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">redis-cli</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -h</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 192.168.1.100</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -p</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 6379</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -a</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> prod_redis_pass</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> \\</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">    REPLICAOF</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> &lt;</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">new_master_i</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">p</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&gt;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 6379</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">redis-cli</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -h</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 192.168.1.100</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -p</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 6379</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -a</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> prod_redis_pass</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> \\</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">    CONFIG</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> SET</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> masterauth</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;prod_redis_pass&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># ========== Step 8: 客户端接入 ==========</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># Java (Jedis)</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">JedisSentinelPool</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> pool</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> =</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> new</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> JedisSentinelPool</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">    &quot;prodmaster&quot;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">,</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">    new</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> HashSet</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&lt;&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">Arrays.asList(</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">        &quot;192.168.1.100:26379&quot;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">,</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">        &quot;192.168.1.101:26379&quot;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">,</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">        &quot;192.168.1.102:26379&quot;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    ))</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">,</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">    new</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> JedisPoolConfig</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">()</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">,</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">    &quot;prod_redis_pass&quot;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">);</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">Jedis</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> jedis</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> =</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> pool.getResource</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">();</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">try</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> {</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">    jedis.set(</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">&quot;key&quot;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">,</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;value&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">);</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">    String</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> value</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> =</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> jedis.get</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">&quot;key&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">} finally {</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">    jedis.close</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">();</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><h3 id="_6-2-集群模式完整搭建" tabindex="-1">6.2 集群模式完整搭建 <a class="header-anchor" href="#_6-2-集群模式完整搭建" aria-label="Permalink to “6.2 集群模式完整搭建”">​</a></h3><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># ========== 服务器规划 ==========</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 6 台服务器：3 主 + 3 从</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># Node A: 192.168.1.100 - 主节点1</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># Node B: 192.168.1.101 - 主节点2</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># Node C: 192.168.1.102 - 主节点3</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># Node D: 192.168.1.103 - 从节点1 (主1的从)</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># Node E: 192.168.1.104 - 从节点2 (主2的从)</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># Node F: 192.168.1.105 - 从节点3 (主3的从)</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># ========== Step 1: 在所有节点上配置 ==========</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">for</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> node_ip </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">in</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> 192.168.1.100</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> 192.168.1.101</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> 192.168.1.102</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> \\</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">               192.168.1.103</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> 192.168.1.104</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> 192.168.1.105</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">; </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">do</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">    cat</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> &gt;</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> /etc/redis/redis.conf</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> &lt;&lt;</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> EOF</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">bind \${</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">node_ip</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">}</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">port 6379</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">cluster-enabled yes</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">cluster-config-file nodes.conf</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">cluster-node-timeout 15000</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">cluster-require-full-coverage yes</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">cluster-replica-validity-factor 10</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">daemonize yes</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">dir /data/redis-cluster</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">dbfilename dump.rdb</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">appendonly yes</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">appendfilename &quot;appendonly.aof&quot;</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">save 900 1</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">save 300 10</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">save 60 10000</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">requirepass &quot;cluster_pass&quot;</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">masterauth &quot;cluster_pass&quot;</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">logfile /var/log/redis-cluster/redis.log</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">maxmemory 16gb</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">maxmemory-policy allkeys-lru</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">EOF</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">done</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 启动所有节点</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">redis-server</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> /etc/redis/redis.conf</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># ========== Step 2: 使用 redis-cli 创建集群 ==========</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">redis-cli</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --cluster</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> create</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> \\</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">    192.168.1.100:6379</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> \\</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">    192.168.1.101:6379</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> \\</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">    192.168.1.102:6379</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> \\</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">    192.168.1.103:6379</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> \\</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">    192.168.1.104:6379</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> \\</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">    192.168.1.105:6379</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> \\</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    --cluster-replicas</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 1</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> \\</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    -a</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> cluster_pass</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 交互式提示:</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># Type &#39;yes&#39; to accept the node configuration</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># ========== Step 3: 验证集群 ==========</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 查看集群信息</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">redis-cli</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -h</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 192.168.1.100</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -p</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 6379</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -a</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> cluster_password</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> cluster</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> info</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">redis-cli</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -h</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 192.168.1.100</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -p</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 6379</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -a</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> cluster_password</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> cluster</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> nodes</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">redis-cli</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -h</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 192.168.1.100</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -p</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 6379</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -a</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> cluster_password</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> cluster</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> slots</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 测试数据操作</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">redis-cli</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -c</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -h</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 192.168.1.100</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -p</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 6379</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -a</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> cluster_password</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">192.168.1.100:6379</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt; </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">SET</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> user:1001</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;Alice&quot;</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">192.168.1.100:6379</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt; </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">SET</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> user:1002</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;Bob&quot;</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">192.168.1.100:6379</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt; </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">GET</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> user:1001</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">&quot;Alice&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 测试哈希标签（多键操作）</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">192.168.1.100:6379</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt; </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">MSET</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> {user}:1001</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;Alice&quot;</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> {user}:1002</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;Bob&quot;</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">192.168.1.100:6379</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt; </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">MGET</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> {user}:1001</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> {user}:1002</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">1</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;Alice&quot;</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">2</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;Bob&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 测试故障转移（停止一个主节点）</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">redis-cli</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -h</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 192.168.1.102</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -p</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 6379</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -a</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> cluster_password</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> SHUTDOWN</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 等待故障转移完成（约 15-30 秒）</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">redis-cli</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -h</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 192.168.1.100</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -p</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 6379</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -a</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> cluster_password</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> cluster</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> nodes</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 原来的从节点3 应该被提升为主节点</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># ========== Step 4: 客户端接入 ==========</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># Java (JedisCluster)</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">Set</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;HostAndPort&gt; </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">jedisClusterNodes</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> =</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> new</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> HashSet</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&lt;&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">Arrays.asList(</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">    new</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> HostAndPort</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">&quot;192.168.1.100&quot;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">,</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 6379</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">,</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">    new</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> HostAndPort</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">&quot;192.168.1.101&quot;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">,</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 6379</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">,</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">    new</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> HostAndPort</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">&quot;192.168.1.102&quot;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">,</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 6379</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">));</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">JedisCluster</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> jedisCluster</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> =</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> new</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> JedisCluster</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">    jedisClusterNodes,</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">    2000,</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">  //</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> connection</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> timeout</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">    2000,</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">  //</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> so</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> timeout</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">    3,</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">     //</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> max</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> attempts</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">    &quot;cluster_pass&quot;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">,</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">    new</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> JedisPoolConfig</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">()</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">);</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">jedisCluster.set(</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">&quot;key&quot;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">,</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;value&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">);</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">String</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> value</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> =</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> jedisCluster.get</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">&quot;key&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">);</span></span></code></pre></div><hr><h2 id="七、常见面试题" tabindex="-1">七、常见面试题 <a class="header-anchor" href="#七、常见面试题" aria-label="Permalink to “七、常见面试题”">​</a></h2><h3 id="_7-1-主从复制相关" tabindex="-1">7.1 主从复制相关 <a class="header-anchor" href="#_7-1-主从复制相关" aria-label="Permalink to “7.1 主从复制相关”">​</a></h3><p><strong>Q1: Redis 主从复制的原理是什么？</strong></p><p>Redis 主从复制基于 <code>PSYNC</code> 命令实现：</p><ol><li>从节点连接主节点，发送 <code>PSYNC &lt;replid&gt; &lt;offset&gt;</code> 请求</li><li>如果是首次同步，主节点执行 <code>BGSAVE</code> 生成 RDB，发送给从节点（全量同步）</li><li>从节点接收 RDB 并加载到内存</li><li>主节点发送 RDB 生成期间的增量写命令</li><li>如果是重连且 offset 在 backlog 中，直接发送增量命令（增量同步）</li><li>主节点持续将写命令传播给所有从节点</li></ol><p><strong>Q2: 什么是 replication backlog？它的作用是什么？</strong></p><p>replication backlog 是主节点上的一个固定大小的环形缓冲区，用于缓存最近的写命令。它的作用是：</p><ul><li>支持从节点的增量同步（断点续传）</li><li>从节点断开重连时，若 offset 仍在 backlog 范围内，可以直接同步增量命令，无需全量同步</li><li>避免频繁的全量同步对主节点性能的影响</li></ul><p><strong>Q3: Redis 主从复制如何保证数据一致性？</strong></p><p>Redis 使用以下机制保证数据一致性：</p><ol><li><strong>replication id + offset</strong>：精确追踪每个从节点的同步进度</li><li><strong>PSYNC 协议</strong>：支持断点续传，确保数据完整</li><li><strong>主从心跳</strong>：定期检测主从连接状态</li><li><strong>半同步复制</strong>（Redis 6.0+）：主节点等待从节点确认后再返回</li><li><strong>min-replicas-to-write</strong>：当从节点数量不足时暂停写入</li></ol><h3 id="_7-2-哨兵模式相关" tabindex="-1">7.2 哨兵模式相关 <a class="header-anchor" href="#_7-2-哨兵模式相关" aria-label="Permalink to “7.2 哨兵模式相关”">​</a></h3><p><strong>Q4: 哨兵如何判定主节点下线？</strong></p><p>哨兵将主节点下线分为两个阶段：</p><ol><li><strong>主观下线（SDOWN）</strong>：单个哨兵在 <code>down-after-milliseconds</code> 时间内未收到主节点的有效响应</li><li><strong>客观下线（ODOWN）</strong>：超过法定数量（quorum）的哨兵都判定主节点为 SDOWN</li></ol><p>只有达到客观下线，哨兵才能触发故障转移流程。</p><p><strong>Q5: 哨兵如何选举新的主节点？</strong></p><p>哨兵选举新主节点的规则：</p><ol><li>过滤已下线、全量同步中、优先级为 0 的从节点</li><li>按照以下规则排序： <ul><li><code>replica-priority</code> 越小越优先</li><li>replication offset 越大越优先（数据最新）</li><li>运行 ID 越小越优先</li></ul></li><li>选择排序最靠前的从节点作为新主节点</li></ol><p><strong>Q6: 哨兵如何避免脑裂？</strong></p><p>哨兵通过 Raft 协议的多数派原则避免脑裂：</p><ul><li>法定人数（quorum）= 哨兵数量 / 2 + 1</li><li>只有获得法定数量哨兵同意才能执行故障转移</li><li>网络分区时，只有包含多数派的分区才能选出新主节点</li><li>建议部署奇数个哨兵（3、5、7）</li></ul><h3 id="_7-3-集群模式相关" tabindex="-1">7.3 集群模式相关 <a class="header-anchor" href="#_7-3-集群模式相关" aria-label="Permalink to “7.3 集群模式相关”">​</a></h3><p><strong>Q7: Redis Cluster 为什么使用 16384 个哈希槽？</strong></p><p>选择 16384（2^14）个哈希槽是在以下因素之间的权衡：</p><ul><li><strong>槽数量</strong>：槽越多，数据分布越均匀，但每个槽的管理开销越大</li><li><strong>网络通信</strong>：Gossip 协议传播的信息与槽数量相关</li><li><strong>迁移效率</strong>：槽数量适中，单个槽迁移的数据量不会太大</li><li><strong>实际考量</strong>：16384 足以支撑大规模集群（数百个主节点）</li></ul><p><strong>Q8: MOVED 和 ASK 重定向有什么区别？</strong></p><table tabindex="0"><thead><tr><th>维度</th><th>MOVED</th><th>ASK</th></tr></thead><tbody><tr><td><strong>含义</strong></td><td>槽已永久迁移到其他节点</td><td>槽正在迁移过程中</td></tr><tr><td><strong>客户端行为</strong></td><td>永久更新路由缓存</td><td>临时转发，不更新缓存</td></tr><tr><td><strong>触发时机</strong></td><td>槽迁移完成后</td><td>槽迁移进行中</td></tr><tr><td><strong>后续请求</strong></td><td>直接发送到新节点</td><td>仍然发送到原节点，原节点返回 ASK</td></tr></tbody></table><p><strong>Q9: 如何解决 Redis Cluster 的跨槽问题？</strong></p><p>有以下解决方案：</p><ol><li><strong>哈希标签（Hash Tag）</strong>：使用 <code>{tag}</code> 包裹需要在同一槽的 key</li><li><strong>合理设计 key</strong>：在设计阶段就考虑 key 的分布</li><li><strong>使用 Lua 脚本</strong>：在同一个 Lua 脚本中处理多个 key（同槽）</li><li><strong>客户端路由</strong>：在客户端层面实现分库分表逻辑</li></ol><p><strong>Q10: Redis Cluster 的故障转移是如何实现的？</strong></p><p>Redis Cluster 的故障转移基于 Gossip 协议：</p><ol><li>节点通过 Gossip 消息检测其他节点的状态</li><li>当主节点失联超过 <code>cluster-node-timeout</code>，被标记为 PFAIL（可能下线）</li><li>当超过半数主节点标记某节点为 PFAIL，该节点被标记为 FAIL（确定下线）</li><li>从节点检测到主节点 FAIL 后，发起故障转移选举</li><li>从节点通过 config epoch 竞争，获得投票的从节点升级为新主节点</li><li>新主节点接管哈希槽，通知其他节点更新配置</li></ol><h3 id="_7-4-综合对比" tabindex="-1">7.4 综合对比 <a class="header-anchor" href="#_7-4-综合对比" aria-label="Permalink to “7.4 综合对比”">​</a></h3><p><strong>Q11: 哨兵和集群模式如何选择？</strong></p><ul><li><p>选择哨兵模式：</p><ul><li>数据量在单节点内存范围内</li><li>主要痛点是高可用，而非扩展性</li><li>业务对多键操作需求多（无跨槽限制）</li><li>团队规模小，希望架构简单</li></ul></li><li><p>选择集群模式：</p><ul><li>数据量超出单节点内存</li><li>需要处理高并发写入</li><li>需要横向扩展能力</li><li>能够接受架构复杂度</li></ul></li></ul><p><strong>Q12: Redis 高可用方案有哪些常见坑？</strong></p><ol><li><strong>主从复制延迟</strong>：高负载下延迟可能很大，需要监控和优化</li><li><strong>哨兵法定人数设置</strong>：过小可能导致误判，过大可能导致无法故障转移</li><li><strong>集群跨槽问题</strong>：多键命令需要合理使用哈希标签</li><li><strong>持久化配置</strong>：高可用架构中每个节点都要合理配置持久化</li><li><strong>网络分区</strong>：需要设计合理的网络架构，减少分区风险</li><li><strong>从节点数量</strong>：哨兵模式下从节点太多会影响主节点性能</li><li><strong>内存限制</strong>：每个主节点的内存要合理规划</li></ol><hr><h2 id="总结" tabindex="-1">总结 <a class="header-anchor" href="#总结" aria-label="Permalink to “总结”">​</a></h2><p>Redis 高可用架构是构建稳定可靠的 Redis 服务的核心。从主从复制到哨兵模式，再到集群模式，每一步演进都在解决前一阶段的瓶颈：</p><ol><li><strong>主从复制</strong> 解决了数据冗余问题，但主节点仍是单点</li><li><strong>哨兵模式</strong> 实现了自动故障转移，但无法横向扩展</li><li><strong>集群模式</strong> 实现了横向扩展和高可用，但架构更复杂</li></ol><p>在实际工作中，需要根据业务规模、数据量、团队能力等因素选择合适的方案。同时，需要关注以下要点：</p><ul><li><strong>监控告警</strong>：建立完善的监控体系，及时发现和处理问题</li><li><strong>定期演练</strong>：定期进行故障转移演练，确保方案在真实故障中有效</li><li><strong>容量规划</strong>：根据业务增长规划集群容量，预留扩展空间</li><li><strong>数据安全</strong>：合理配置持久化和复制策略，确保数据不丢失</li></ul><p>通过合理的架构设计和持续的运维优化，可以构建稳定、高效、可扩展的 Redis 高可用体系，为业务提供可靠的内存数据服务。</p>`,250)])])}const F=a(p,[["render",e]]);export{g as __pageData,F as default};
