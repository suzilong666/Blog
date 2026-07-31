import{_ as a,o as n,c as i,ah as p}from"./chunks/framework.CPHJ30oF.js";const o=JSON.parse('{"title":"Redis 简介与环境搭建","description":"","frontmatter":{},"headers":[{"level":2,"title":"一、Redis 的历史与发展","slug":"一、redis-的历史与发展","link":"#一、redis-的历史与发展","children":[{"level":3,"title":"1.1 起源与早期发展","slug":"_1-1-起源与早期发展","link":"#_1-1-起源与早期发展","children":[]},{"level":3,"title":"1.2 关键里程碑","slug":"_1-2-关键里程碑","link":"#_1-2-关键里程碑","children":[]},{"level":3,"title":"1.3 Redis 与 Redis Labs 的分道扬镳","slug":"_1-3-redis-与-redis-labs-的分道扬镳","link":"#_1-3-redis-与-redis-labs-的分道扬镳","children":[]}]},{"level":2,"title":"二、Redis 核心特点","slug":"二、redis-核心特点","link":"#二、redis-核心特点","children":[{"level":3,"title":"2.1 极致的高性能","slug":"_2-1-极致的高性能","link":"#_2-1-极致的高性能","children":[]},{"level":3,"title":"2.2 内存数据库","slug":"_2-2-内存数据库","link":"#_2-2-内存数据库","children":[]},{"level":3,"title":"2.3 丰富的数据类型","slug":"_2-3-丰富的数据类型","link":"#_2-3-丰富的数据类型","children":[]},{"level":3,"title":"2.4 单线程与事件循环","slug":"_2-4-单线程与事件循环","link":"#_2-4-单线程与事件循环","children":[]},{"level":3,"title":"2.5 持久化机制","slug":"_2-5-持久化机制","link":"#_2-5-持久化机制","children":[]},{"level":3,"title":"2.6 高可用与分布式","slug":"_2-6-高可用与分布式","link":"#_2-6-高可用与分布式","children":[]}]},{"level":2,"title":"三、为什么选择 Redis","slug":"三、为什么选择-redis","link":"#三、为什么选择-redis","children":[{"level":3,"title":"3.1 与 MySQL 对比","slug":"_3-1-与-mysql-对比","link":"#_3-1-与-mysql-对比","children":[]},{"level":3,"title":"3.2 与 Memcached 对比","slug":"_3-2-与-memcached-对比","link":"#_3-2-与-memcached-对比","children":[]},{"level":3,"title":"3.3 为什么选择 Redis","slug":"_3-3-为什么选择-redis","link":"#_3-3-为什么选择-redis","children":[]}]},{"level":2,"title":"四、Redis 应用场景","slug":"四、redis-应用场景","link":"#四、redis-应用场景","children":[{"level":3,"title":"4.1 缓存","slug":"_4-1-缓存","link":"#_4-1-缓存","children":[]},{"level":3,"title":"4.2 会话管理","slug":"_4-2-会话管理","link":"#_4-2-会话管理","children":[]},{"level":3,"title":"4.3 排行榜","slug":"_4-3-排行榜","link":"#_4-3-排行榜","children":[]},{"level":3,"title":"4.4 计数器","slug":"_4-4-计数器","link":"#_4-4-计数器","children":[]},{"level":3,"title":"4.5 消息队列","slug":"_4-5-消息队列","link":"#_4-5-消息队列","children":[]},{"level":3,"title":"4.6 分布式锁","slug":"_4-6-分布式锁","link":"#_4-6-分布式锁","children":[]},{"level":3,"title":"4.7 地理位置","slug":"_4-7-地理位置","link":"#_4-7-地理位置","children":[]}]},{"level":2,"title":"五、Redis 安装","slug":"五、redis-安装","link":"#五、redis-安装","children":[{"level":3,"title":"5.1 Windows 安装（WSL 方式）","slug":"_5-1-windows-安装-wsl-方式","link":"#_5-1-windows-安装-wsl-方式","children":[]},{"level":3,"title":"5.2 Windows 原生安装（第三方移植）","slug":"_5-2-windows-原生安装-第三方移植","link":"#_5-2-windows-原生安装-第三方移植","children":[]},{"level":3,"title":"5.3 Docker 方式（推荐）","slug":"_5-3-docker-方式-推荐","link":"#_5-3-docker-方式-推荐","children":[]},{"level":3,"title":"5.4 Linux 安装","slug":"_5-4-linux-安装","link":"#_5-4-linux-安装","children":[]},{"level":3,"title":"5.5 macOS 安装","slug":"_5-5-macos-安装","link":"#_5-5-macos-安装","children":[]},{"level":3,"title":"5.6 各安装方式对比","slug":"_5-6-各安装方式对比","link":"#_5-6-各安装方式对比","children":[]}]},{"level":2,"title":"六、Redis 配置文件详解","slug":"六、redis-配置文件详解","link":"#六、redis-配置文件详解","children":[{"level":3,"title":"6.1 配置文件位置","slug":"_6-1-配置文件位置","link":"#_6-1-配置文件位置","children":[]},{"level":3,"title":"6.2 基础配置","slug":"_6-2-基础配置","link":"#_6-2-基础配置","children":[]},{"level":3,"title":"6.3 内存配置","slug":"_6-3-内存配置","link":"#_6-3-内存配置","children":[]},{"level":3,"title":"6.4 持久化配置","slug":"_6-4-持久化配置","link":"#_6-4-持久化配置","children":[]},{"level":3,"title":"6.5 主从复制配置","slug":"_6-5-主从复制配置","link":"#_6-5-主从复制配置","children":[]},{"level":3,"title":"6.6 安全配置","slug":"_6-6-安全配置","link":"#_6-6-安全配置","children":[]},{"level":3,"title":"6.7 网络配置","slug":"_6-7-网络配置","link":"#_6-7-网络配置","children":[]},{"level":3,"title":"6.8 配置修改与生效","slug":"_6-8-配置修改与生效","link":"#_6-8-配置修改与生效","children":[]}]},{"level":2,"title":"七、Redis 基本使用","slug":"七、redis-基本使用","link":"#七、redis-基本使用","children":[{"level":3,"title":"7.1 redis-cli 客户端","slug":"_7-1-redis-cli-客户端","link":"#_7-1-redis-cli-客户端","children":[]},{"level":3,"title":"7.2 String 类型常用命令","slug":"_7-2-string-类型常用命令","link":"#_7-2-string-类型常用命令","children":[]},{"level":3,"title":"7.3 Hash 类型常用命令","slug":"_7-3-hash-类型常用命令","link":"#_7-3-hash-类型常用命令","children":[]},{"level":3,"title":"7.4 List 类型常用命令","slug":"_7-4-list-类型常用命令","link":"#_7-4-list-类型常用命令","children":[]},{"level":3,"title":"7.5 Set 类型常用命令","slug":"_7-5-set-类型常用命令","link":"#_7-5-set-类型常用命令","children":[]},{"level":3,"title":"7.6 ZSet 类型常用命令","slug":"_7-6-zset-类型常用命令","link":"#_7-6-zset-类型常用命令","children":[]},{"level":3,"title":"7.7 其他实用命令","slug":"_7-7-其他实用命令","link":"#_7-7-其他实用命令","children":[]},{"level":3,"title":"7.8 发布订阅","slug":"_7-8-发布订阅","link":"#_7-8-发布订阅","children":[]}]},{"level":2,"title":"八、Redis 架构概览","slug":"八、redis-架构概览","link":"#八、redis-架构概览","children":[{"level":3,"title":"8.1 整体架构","slug":"_8-1-整体架构","link":"#_8-1-整体架构","children":[]},{"level":3,"title":"8.2 事件循环","slug":"_8-2-事件循环","link":"#_8-2-事件循环","children":[]},{"level":3,"title":"8.3 内存结构","slug":"_8-3-内存结构","link":"#_8-3-内存结构","children":[]},{"level":3,"title":"8.4 数据过期","slug":"_8-4-数据过期","link":"#_8-4-数据过期","children":[]},{"level":3,"title":"8.5 单进程架构的优缺点","slug":"_8-5-单进程架构的优缺点","link":"#_8-5-单进程架构的优缺点","children":[]}]},{"level":2,"title":"本章小结","slug":"本章小结","link":"#本章小结","children":[]}],"relativePath":"redis/basic/Redis简介与环境搭建.md","filePath":"redis/basic/Redis简介与环境搭建.md"}'),l={name:"redis/basic/Redis简介与环境搭建.md"};function e(t,s,h,d,r,k){return n(),i("div",null,[...s[0]||(s[0]=[p(`<h1 id="redis-简介与环境搭建" tabindex="-1">Redis 简介与环境搭建 <a class="header-anchor" href="#redis-简介与环境搭建" aria-label="Permalink to “Redis 简介与环境搭建”">​</a></h1><h2 id="一、redis-的历史与发展" tabindex="-1">一、Redis 的历史与发展 <a class="header-anchor" href="#一、redis-的历史与发展" aria-label="Permalink to “一、Redis 的历史与发展”">​</a></h2><h3 id="_1-1-起源与早期发展" tabindex="-1">1.1 起源与早期发展 <a class="header-anchor" href="#_1-1-起源与早期发展" aria-label="Permalink to “1.1 起源与早期发展”">​</a></h3><p>Redis（Remote Dictionary Server）是一款开源的、基于内存的键值对存储系统，由意大利工程师 Salvatore Sanfilippo（笔名 antirez）于 2009 年开发。Redis 的开发源于 antirez 的一个个人项目——他在为意大利创业公司 Meridio 工作时，发现现有数据库无法满足高性能、低延迟的需求，于是决定从零开始编写一个内存数据库。</p><p>Redis 的名字来源于 <strong>R</strong>emote <strong>D</strong>ictionary <strong>S</strong>erver（远程字典服务器），这准确地描述了它的核心功能：一个网络访问的、基于字典（键值对）的内存存储系统。</p><p>2009 年 5 月，Redis 首次发布在 GitHub 上，立刻引起了开发者社区的广泛关注。它以极简的设计哲学、出色的性能和丰富的数据类型，迅速成为 NoSQL 数据库领域的明星项目。</p><h3 id="_1-2-关键里程碑" tabindex="-1">1.2 关键里程碑 <a class="header-anchor" href="#_1-2-关键里程碑" aria-label="Permalink to “1.2 关键里程碑”">​</a></h3><table tabindex="0"><thead><tr><th>时间</th><th>版本</th><th>关键事件</th></tr></thead><tbody><tr><td>2009 年 5 月</td><td>Redis 0.1</td><td>首次发布于 GitHub</td></tr><tr><td>2010 年</td><td>Redis 2.0</td><td>发布，引入虚拟内存支持、主动过期等特性</td></tr><tr><td>2011 年</td><td>Redis 2.2</td><td>引入 List/Set 优化、集群雏形</td></tr><tr><td>2013 年</td><td>Redis 2.6</td><td>引入 Lua 脚本支持、Keyspace Notification</td></tr><tr><td>2014 年</td><td>Redis 2.8</td><td>引入 RDB/AOF 持久化改进、IPv6 支持</td></tr><tr><td>2015 年</td><td>Redis 3.0</td><td>正式发布 Redis Cluster，支持分布式集群</td></tr><tr><td>2017 年</td><td>Redis 4.0</td><td>引入模块系统、新的持久化机制（混合 RDB-AOF）</td></tr><tr><td>2018 年</td><td>Redis 5.0</td><td>引入 Streams 数据类型、主动碎片整理</td></tr><tr><td>2020 年</td><td>Redis 6.0</td><td>引入多线程 I/O、客户端缓存、ACL</td></tr><tr><td>2022 年</td><td>Redis 7.0</td><td>引入函数（Function）增强、Sharded Pub/Sub</td></tr><tr><td>2023 年</td><td>Redis 7.2</td><td>引入更完善的 ACL、超时增强、一致性哈希优化</td></tr><tr><td>2024 年</td><td>Redis 8.0（Redis 分支）</td><td>性能大幅提升、新数据结构</td></tr></tbody></table><h3 id="_1-3-redis-与-redis-labs-的分道扬镳" tabindex="-1">1.3 Redis 与 Redis Labs 的分道扬镳 <a class="header-anchor" href="#_1-3-redis-与-redis-labs-的分道扬镳" aria-label="Permalink to “1.3 Redis 与 Redis Labs 的分道扬镳”">​</a></h3><p>2015 年，antirez 与其他核心贡献者成立了 Redis Labs（现改名为 Redis Ltd.），推出了 Redis Enterprise 商业产品。2020 年，Redis 与 Redis Labs 在许可证上产生分歧，Redis Labs 将其部分模块改为 SSPL 许可证，引发社区争议。</p><p>此后，Redis 社区分叉出多个分支：</p><ul><li><strong>Redis 开源版</strong>（由 antirez 主导）：保持 BSD 许可证，完全开源</li><li><strong>Redis Enterprise</strong>（Redis Ltd. 商业版）：包含企业级特性，采用商业许可证</li><li><strong>Valkey</strong>（Linux 基金会）：2024 年由 Google、Oracle、Snap 等公司联合创建的 Redis 分支</li></ul><p>目前，Redis 仍然是全球最受欢迎的 NoSQL 数据库之一，被 Twitter、GitHub、Instagram、美团、阿里巴巴、腾讯等众多知名公司广泛使用。</p><hr><h2 id="二、redis-核心特点" tabindex="-1">二、Redis 核心特点 <a class="header-anchor" href="#二、redis-核心特点" aria-label="Permalink to “二、Redis 核心特点”">​</a></h2><h3 id="_2-1-极致的高性能" tabindex="-1">2.1 极致的高性能 <a class="header-anchor" href="#_2-1-极致的高性能" aria-label="Permalink to “2.1 极致的高性能”">​</a></h3><p>Redis 的性能表现是其最突出的优势之一。官方基准测试显示，Redis 在普通硬件上可以达到：</p><ul><li><strong>读操作</strong>：110,000+ QPS（每秒查询数）</li><li><strong>写操作</strong>：81,000+ QPS</li><li><strong>延迟</strong>：亚毫秒级（0.1ms 以内）</li></ul><p>Redis 高性能的原因主要在于：</p><p><strong>纯内存操作</strong>：Redis 将数据完全存储在内存中，避免了磁盘 I/O 瓶颈。内存访问速度约为磁盘的 100,000 倍。</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>存储介质访问速度对比：</span></span>
<span class="line"><span></span></span>
<span class="line"><span>CPU 缓存 L1:  ~1 ns    (10^-9 秒)</span></span>
<span class="line"><span>CPU 缓存 L2:  ~4 ns    (4 x 10^-9 秒)</span></span>
<span class="line"><span>内存:         ~100 ns  (10^-7 秒)</span></span>
<span class="line"><span>SSD 硬盘:     ~100 μs  (10^-4 秒)</span></span>
<span class="line"><span>HDD 机械硬盘: ~5 ms    (5 x 10^-3 秒)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Redis 操作内存，比传统数据库的磁盘操作快 4~5 个数量级</span></span></code></pre></div><p><strong>高效的数据结构</strong>：Redis 内部使用了多种针对不同场景优化的数据结构，包括：</p><ul><li><strong>简单动态字符串（SDS）</strong>：自适应内存管理，支持二进制安全</li><li><strong>跳表（Skip List）</strong>：用于有序集合，平均 O(log n) 查询</li><li><strong>压缩列表（ziplist）</strong>：用于小集合的紧凑存储</li><li><strong>快速列表（quicklist）</strong>：Redis 3.2+ 中列表的底层实现，结合链表和压缩列表的优点</li><li><strong>整数集合（intset）</strong>：用于只包含整数的小集合</li><li><strong>哈希表（hashtable）</strong>：字典的基础，支持渐进式 rehash</li></ul><p><strong>单线程模型</strong>：Redis 核心命令执行采用单线程模型，避免了多线程的上下文切换和锁竞争开销。</p><h3 id="_2-2-内存数据库" tabindex="-1">2.2 内存数据库 <a class="header-anchor" href="#_2-2-内存数据库" aria-label="Permalink to “2.2 内存数据库”">​</a></h3><p>Redis 是一个以内存为核心的数据存储系统：</p><p><strong>全内存存储</strong>：所有数据驻留在物理内存中，提供极高的访问速度。</p><p><strong>内存管理</strong>：Redis 实现了自己的内存分配器，支持：</p><ul><li>内存使用监控（<code>INFO memory</code> 命令）</li><li>内存淘汰策略（当内存满时自动清理旧数据）</li><li>jemalloc 内存分配器（默认）或 libc 分配器</li></ul><p><strong>内存优化</strong>：Redis 会根据数据大小自动选择最优的底层编码格式：</p><ul><li>小哈希表 → 压缩列表或嵌入编码</li><li>小集合 → 整数集合</li><li>小列表 → 压缩列表</li><li>小有序集合 → 压缩列表</li></ul><h3 id="_2-3-丰富的数据类型" tabindex="-1">2.3 丰富的数据类型 <a class="header-anchor" href="#_2-3-丰富的数据类型" aria-label="Permalink to “2.3 丰富的数据类型”">​</a></h3><p>Redis 支持 10+ 种数据类型，远超传统的键值存储系统：</p><table tabindex="0"><thead><tr><th>类型</th><th>说明</th><th>常用场景</th></tr></thead><tbody><tr><td><strong>String</strong></td><td>字符串，可存储文本、数字、二进制</td><td>缓存、计数器、配置信息</td></tr><tr><td><strong>Hash</strong></td><td>哈希表，键值对集合</td><td>用户信息、对象存储</td></tr><tr><td><strong>List</strong></td><td>列表，有序可重复</td><td>消息队列、最新动态</td></tr><tr><td><strong>Set</strong></td><td>集合，无序不重复</td><td>标签、共同好友、去重</td></tr><tr><td><strong>ZSet</strong></td><td>有序集合，带分数排序</td><td>排行榜、延迟队列</td></tr><tr><td><strong>HyperLogLog</strong></td><td>基数估算</td><td>UV 统计（近似去重）</td></tr><tr><td><strong>Bitmap</strong></td><td>位图</td><td>布隆过滤器、在线状态</td></tr><tr><td><strong>Geospatial</strong></td><td>地理位置</td><td>附近的人、地理围栏</td></tr><tr><td><strong>Stream</strong></td><td>流，消息队列</td><td>实时消息、事件驱动</td></tr><tr><td><strong>Module</strong></td><td>扩展模块</td><td>搜索、图数据库、时序数据</td></tr></tbody></table><h3 id="_2-4-单线程与事件循环" tabindex="-1">2.4 单线程与事件循环 <a class="header-anchor" href="#_2-4-单线程与事件循环" aria-label="Permalink to “2.4 单线程与事件循环”">​</a></h3><p>Redis 6.0 之前，核心命令执行完全是单线程的：</p><p><strong>单线程执行的优势</strong>：</p><ul><li>避免锁竞争，无需加锁</li><li>避免上下文切换开销</li><li>代码实现简单可靠</li><li>对于内存操作，单线程性能足够</li></ul><p><strong>Redis 6.0 的多线程改进</strong>： Redis 6.0 引入了 I/O 多线程，但命令执行仍然是单线程的：</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>┌───────────────────────────────────────────────┐</span></span>
<span class="line"><span>│                  Redis 进程                     │</span></span>
<span class="line"><span>├───────────────────────────────────────────────┤</span></span>
<span class="line"><span>│  I/O 线程组（Redis 6.0+）                       │</span></span>
<span class="line"><span>│  ┌─────┐ ┌─────┐ ┌─────┐                      │</span></span>
<span class="line"><span>│  │IO-1 │ │IO-2 │ │IO-N │  读取请求、写入响应    │</span></span>
<span class="line"><span>│  └──┬──┘ └──┬──┘ └──┬──┘                      │</span></span>
<span class="line"><span>│     │        │        │                       │</span></span>
<span class="line"><span>│     └────────┼────────┘                       │</span></span>
<span class="line"><span>│              ▼                                │</span></span>
<span class="line"><span>│  ┌─────────────────────────────────────┐      │</span></span>
<span class="line"><span>│  │         单线程事件循环（主线程）       │      │</span></span>
<span class="line"><span>│  │  1. 解析命令                         │      │</span></span>
<span class="line"><span>│  │  2. 执行命令（读写内存）               │      │</span></span>
<span class="line"><span>│  │  3. 将结果返回 I/O 线程               │      │</span></span>
<span class="line"><span>│  └─────────────────────────────────────┘      │</span></span>
<span class="line"><span>└───────────────────────────────────────────────┘</span></span></code></pre></div><p>这种设计使得 Redis 既保持了单线程的简单性，又通过多线程 I/O 提升了网络读写性能。</p><h3 id="_2-5-持久化机制" tabindex="-1">2.5 持久化机制 <a class="header-anchor" href="#_2-5-持久化机制" aria-label="Permalink to “2.5 持久化机制”">​</a></h3><p>Redis 提供两种持久化方式，确保数据在重启后不丢失：</p><p><strong>RDB（Redis Database）</strong>：</p><ul><li>在指定时间间隔内，将内存中的数据快照写入磁盘</li><li>优点：文件紧凑，恢复速度快</li><li>缺点：可能丢失最后一次快照后的数据</li></ul><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># RDB 文件示例</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">dump.rdb</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">  # 二进制格式的 Redis 数据快照</span></span></code></pre></div><p><strong>AOF（Append Only File）</strong>：</p><ul><li>将每个写命令追加到日志文件</li><li>优点：数据安全性高，最多丢失 1 秒数据</li><li>缺点：文件体积较大，恢复速度较慢</li></ul><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># AOF 文件示例</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">appendonly.aof</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">  # Redis 命令日志（协议格式）</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># AOF 重写（压缩）</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">bgrewriteaof</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    # 后台压缩 AOF 文件</span></span></code></pre></div><p><strong>混合持久化（Redis 4.0+）</strong>：</p><ul><li>结合 RDB 和 AOF 的优点</li><li>重启时先加载 RDB 部分，再增量加载 AOF 部分</li><li>兼顾了恢复速度和数据安全</li></ul><h3 id="_2-6-高可用与分布式" tabindex="-1">2.6 高可用与分布式 <a class="header-anchor" href="#_2-6-高可用与分布式" aria-label="Permalink to “2.6 高可用与分布式”">​</a></h3><p><strong>主从复制</strong>：</p><ul><li>一个主节点（Master），多个从节点（Slave）</li><li>主节点处理写操作，从节点处理读操作</li><li>实现数据冗余和读写分离</li></ul><p><strong>哨兵模式（Sentinel）</strong>：</p><ul><li>自动监控主从节点状态</li><li>主节点故障时自动故障转移</li><li>提供配置发现和通知</li></ul><p><strong>集群模式（Cluster）</strong>：</p><ul><li>16384 个槽（slot）分布在多个节点</li><li>水平扩展存储和计算能力</li><li>支持自动故障转移</li></ul><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>Redis Cluster 架构示例：</span></span>
<span class="line"><span></span></span>
<span class="line"><span>┌──────────┐  ┌──────────┐  ┌──────────┐</span></span>
<span class="line"><span>│ 节点 A   │  │ 节点 B   │  │ 节点 C   │</span></span>
<span class="line"><span>│ 槽 0-5460│  │ 槽5461-10922│ │ 槽10923-16383│</span></span>
<span class="line"><span>└────┬─────┘  └────┬─────┘  └────┬─────┘</span></span>
<span class="line"><span>     │              │              │</span></span>
<span class="line"><span>     │ 复制          │ 复制          │ 复制</span></span>
<span class="line"><span>     ▼              ▼              ▼</span></span>
<span class="line"><span>┌──────────┐  ┌──────────┐  ┌──────────┐</span></span>
<span class="line"><span>│ 节点 A&#39;  │  │ 节点 B&#39;  │  │ 节点 C&#39;  │</span></span>
<span class="line"><span>│ （从节点）│  │ （从节点）│  │ （从节点）│</span></span>
<span class="line"><span>└──────────┘  └──────────┘  └──────────┘</span></span></code></pre></div><hr><h2 id="三、为什么选择-redis" tabindex="-1">三、为什么选择 Redis <a class="header-anchor" href="#三、为什么选择-redis" aria-label="Permalink to “三、为什么选择 Redis”">​</a></h2><h3 id="_3-1-与-mysql-对比" tabindex="-1">3.1 与 MySQL 对比 <a class="header-anchor" href="#_3-1-与-mysql-对比" aria-label="Permalink to “3.1 与 MySQL 对比”">​</a></h3><p>Redis 和 MySQL 并非竞争关系，而是互补关系：</p><table tabindex="0"><thead><tr><th>对比维度</th><th>Redis</th><th>MySQL</th></tr></thead><tbody><tr><td>数据存储</td><td>内存为主</td><td>磁盘为主（内存缓存）</td></tr><tr><td>数据结构</td><td>键值对、列表、集合等</td><td>表（关系型）</td></tr><tr><td>查询语言</td><td>Redis Protocol（简单命令）</td><td>SQL（完整查询语言）</td></tr><tr><td>持久化</td><td>RDB/AOF（可选）</td><td>强制持久化</td></tr><tr><td>事务支持</td><td>有限（单命令原子）</td><td>完整 ACID</td></tr><tr><td>数据一致性</td><td>最终一致性为主</td><td>强一致性</td></tr><tr><td>查询能力</td><td>O(1) 级别简单操作</td><td>复杂关联查询</td></tr><tr><td>适用场景</td><td>高频读写缓存、实时数据</td><td>持久化业务数据</td></tr></tbody></table><p><strong>实际使用建议</strong>：在大多数业务系统中，Redis 作为 MySQL 的补充，形成「MySQL + Redis」的黄金组合：</p><ul><li>MySQL 存储持久化的业务数据</li><li>Redis 存储热点数据和临时数据</li></ul><h3 id="_3-2-与-memcached-对比" tabindex="-1">3.2 与 Memcached 对比 <a class="header-anchor" href="#_3-2-与-memcached-对比" aria-label="Permalink to “3.2 与 Memcached 对比”">​</a></h3><p>Memcached 是另一个经典的内存缓存系统，Redis 相对于它的优势：</p><table tabindex="0"><thead><tr><th>对比维度</th><th>Redis</th><th>Memcached</th></tr></thead><tbody><tr><td>数据类型</td><td>String、Hash、List、Set、ZSet 等</td><td>仅 String</td></tr><tr><td>持久化</td><td>支持（RDB/AOF）</td><td>不支持</td></tr><tr><td>分布式</td><td>原生集群支持</td><td>需要客户端分片</td></tr><tr><td>发布订阅</td><td>原生支持</td><td>不支持</td></tr><tr><td>Lua 脚本</td><td>支持</td><td>不支持</td></tr><tr><td>地理空间</td><td>支持</td><td>不支持</td></tr><tr><td>内存效率</td><td>高（多种编码优化）</td><td>一般</td></tr><tr><td>社区活跃度</td><td>非常活跃</td><td>较低</td></tr></tbody></table><p><strong>结论</strong>：Redis 在功能丰富度和扩展性上全面超越 Memcached，已成为内存缓存的首选方案。</p><h3 id="_3-3-为什么选择-redis" tabindex="-1">3.3 为什么选择 Redis <a class="header-anchor" href="#_3-3-为什么选择-redis" aria-label="Permalink to “3.3 为什么选择 Redis”">​</a></h3><p><strong>开发体验</strong>：</p><ul><li>简单易学，命令直观</li><li>官方客户端覆盖几乎所有主流语言</li><li>详细的中文文档和活跃的社区</li></ul><p><strong>性能表现</strong>：</p><ul><li>单节点 10 万+ QPS</li><li>亚毫秒级延迟</li><li>稳定可靠，经过大规模生产验证</li></ul><p><strong>功能丰富</strong>：</p><ul><li>多种数据类型，覆盖大部分业务场景</li><li>发布订阅、Lua 脚本、事务等实用功能</li><li>模块化架构，可扩展性强</li></ul><p><strong>生态完善</strong>：</p><ul><li>与 Spring、Django、Laravel 等主流框架深度集成</li><li>丰富的运维工具和监控方案</li><li>云厂商（AWS、Azure、阿里云）全托 Redis 服务</li></ul><hr><h2 id="四、redis-应用场景" tabindex="-1">四、Redis 应用场景 <a class="header-anchor" href="#四、redis-应用场景" aria-label="Permalink to “四、Redis 应用场景”">​</a></h2><h3 id="_4-1-缓存" tabindex="-1">4.1 缓存 <a class="header-anchor" href="#_4-1-缓存" aria-label="Permalink to “4.1 缓存”">​</a></h3><p>缓存是 Redis 最经典的应用场景。将数据库中的热点数据缓存到 Redis，大幅提升读取性能。</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>缓存工作流程：</span></span>
<span class="line"><span></span></span>
<span class="line"><span>用户请求 → 应用服务 → Redis 缓存</span></span>
<span class="line"><span>                          │</span></span>
<span class="line"><span>                    ┌─────┴─────┐</span></span>
<span class="line"><span>                    │ 命中       │ 未命中</span></span>
<span class="line"><span>                    ▼           ▼</span></span>
<span class="line"><span>                返回结果    查询数据库</span></span>
<span class="line"><span>                               │</span></span>
<span class="line"><span>                               ▼</span></span>
<span class="line"><span>                           写入 Redis</span></span>
<span class="line"><span>                               │</span></span>
<span class="line"><span>                               ▼</span></span>
<span class="line"><span>                           返回结果</span></span></code></pre></div><p><strong>实战案例</strong>：</p><ul><li>电商系统中的商品信息、库存缓存</li><li>社交网络中的用户资料、关系缓存</li><li>门户网站的文章、评论缓存</li></ul><p><strong>关键配置</strong>：</p><ul><li>设置合理的过期时间（TTL）</li><li>保证缓存与数据库的一致性</li><li>处理缓存穿透、击穿、雪崩问题</li></ul><h3 id="_4-2-会话管理" tabindex="-1">4.2 会话管理 <a class="header-anchor" href="#_4-2-会话管理" aria-label="Permalink to “4.2 会话管理”">​</a></h3><p>使用 Redis 存储用户会话信息，实现分布式会话共享。</p><div class="language-redis"><button title="Copy Code" class="copy"></button><span class="lang">redis</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span># 存储会话</span></span>
<span class="line"><span>SET session:user:1001 &#39;{&quot;userId&quot;:1001,&quot;role&quot;:&quot;admin&quot;,&quot;loginTime&quot;:&quot;2024-01-01T10:00:00&quot;}&#39; EX 7200</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 获取会话</span></span>
<span class="line"><span>GET session:user:1001</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 续期会话</span></span>
<span class="line"><span>EXPIRE session:user:1001 7200</span></span></code></pre></div><p><strong>优势</strong>：</p><ul><li>多实例部署时会话共享</li><li>支持会话过期自动清理</li><li>减轻服务器内存压力</li></ul><h3 id="_4-3-排行榜" tabindex="-1">4.3 排行榜 <a class="header-anchor" href="#_4-3-排行榜" aria-label="Permalink to “4.3 排行榜”">​</a></h3><p>利用 Redis 的有序集合（ZSet），轻松实现各种排行榜功能。</p><div class="language-redis"><button title="Copy Code" class="copy"></button><span class="lang">redis</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span># 添加用户分数（用户A 得到 100 分）</span></span>
<span class="line"><span>ZADD game:ranking 100 &quot;user:A&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 添加更多用户</span></span>
<span class="line"><span>ZADD game:ranking 95 &quot;user:B&quot; 88 &quot;user:C&quot; 120 &quot;user:D&quot; 70 &quot;user:E&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 获取排行榜前 3（降序）</span></span>
<span class="line"><span>ZREVRANGE game:ranking 0 2 WITHSCORES</span></span>
<span class="line"><span># 输出: user:D (120), user:A (100), user:B (95)</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 获取用户 A 的排名</span></span>
<span class="line"><span>ZREVRANK game:ranking &quot;user:A&quot;</span></span>
<span class="line"><span># 输出: 1（第 2 名，从 0 开始）</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 获取分数在 80-100 之间的用户</span></span>
<span class="line"><span>ZRANGEBYSCORE game:ranking 80 100</span></span></code></pre></div><p><strong>应用场景</strong>：</p><ul><li>游戏积分榜、等级榜</li><li>电商销量排行</li><li>直播打赏排行</li><li>学习进度排行</li></ul><h3 id="_4-4-计数器" tabindex="-1">4.4 计数器 <a class="header-anchor" href="#_4-4-计数器" aria-label="Permalink to “4.4 计数器”">​</a></h3><p>利用 Redis 的原子操作，实现各种计数功能。</p><div class="language-redis"><button title="Copy Code" class="copy"></button><span class="lang">redis</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span># 文章浏览量计数（原子递增）</span></span>
<span class="line"><span>INCR article:view:1001</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 每次浏览增加 1</span></span>
<span class="line"><span>INCR article:view:1001</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 查看当前浏览量</span></span>
<span class="line"><span>GET article:view:1001</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 限制计数器：每分钟最多访问 100 次（滑动窗口思路）</span></span>
<span class="line"><span>INCR rate_limit:user:1001</span></span>
<span class="line"><span>EXPIRE rate_limit:user:1001 60</span></span></code></pre></div><p><strong>应用场景</strong>：</p><ul><li>页面浏览量、点赞数、评论数</li><li>接口访问频率限制</li><li>在线人数统计</li><li>投票计数</li></ul><h3 id="_4-5-消息队列" tabindex="-1">4.5 消息队列 <a class="header-anchor" href="#_4-5-消息队列" aria-label="Permalink to “4.5 消息队列”">​</a></h3><p>利用 Redis 的 List 数据类型实现简单的消息队列。</p><div class="language-redis"><button title="Copy Code" class="copy"></button><span class="lang">redis</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span># 生产者：将消息推入队列右侧</span></span>
<span class="line"><span>RPUSH task:queue &quot;send_email:user:A&quot;</span></span>
<span class="line"><span>RPUSH task:queue &quot;send_email:user:B&quot;</span></span>
<span class="line"><span>RPUSH task:queue &quot;generate_report:daily&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 消费者：从队列左侧取出消息（阻塞式）</span></span>
<span class="line"><span>BLPOP task:queue 0</span></span>
<span class="line"><span># 输出: task:queue, send_email:user:A</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 多个消费者可同时阻塞等待，实现负载均衡</span></span>
<span class="line"><span># 消费者1: BLPOP task:queue 0</span></span>
<span class="line"><span># 消费者2: BLPOP task:queue 0</span></span>
<span class="line"><span># 谁先取到消息谁处理</span></span></code></pre></div><p><strong>进阶方案</strong>：Redis Stream（5.0+）提供了更强大的消息队列功能：</p><div class="language-redis"><button title="Copy Code" class="copy"></button><span class="lang">redis</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span># 创建流并添加消息</span></span>
<span class="line"><span>XADD mystream * type:email recipient:userA subject:welcome</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 消费消息（从最新开始）</span></span>
<span class="line"><span>XREAD COUNT 10 STREAMS mystream $</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 创建消费组</span></span>
<span class="line"><span>XGROUP CREATE mystream mygroup</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 组内消费</span></span>
<span class="line"><span>XREADGROUP GROUP mygroup consumer1 COUNT 1 STREAMS mystream &gt;</span></span></code></pre></div><h3 id="_4-6-分布式锁" tabindex="-1">4.6 分布式锁 <a class="header-anchor" href="#_4-6-分布式锁" aria-label="Permalink to “4.6 分布式锁”">​</a></h3><p>利用 Redis 的原子 SET 命令实现分布式互斥锁。</p><div class="language-redis"><button title="Copy Code" class="copy"></button><span class="lang">redis</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span># 获取锁（原子操作：键不存在时设置成功）</span></span>
<span class="line"><span>SET lock:order:1001 unique_value NX PX 30000</span></span>
<span class="line"><span># NX: 仅当键不存在时设置</span></span>
<span class="line"><span># PX: 设置过期时间（毫秒）</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 释放锁（Lua 脚本保证原子性）</span></span>
<span class="line"><span>if redis.call(&quot;get&quot;, KEYS[1]) == ARGV[1] then</span></span>
<span class="line"><span>    return redis.call(&quot;del&quot;, KEYS[1])</span></span>
<span class="line"><span>else</span></span>
<span class="line"><span>    return 0</span></span>
<span class="line"><span>end</span></span></code></pre></div><p><strong>应用场景</strong>：</p><ul><li>分布式环境下的订单创建</li><li>定时任务的单点执行</li><li>资源的互斥访问控制</li></ul><h3 id="_4-7-地理位置" tabindex="-1">4.7 地理位置 <a class="header-anchor" href="#_4-7-地理位置" aria-label="Permalink to “4.7 地理位置”">​</a></h3><p>利用 Redis 的 Geospatial 数据类型实现地理位置相关功能。</p><div class="language-redis"><button title="Copy Code" class="copy"></button><span class="lang">redis</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span># 添加地理位置坐标（经度、纬度、名称）</span></span>
<span class="line"><span>GEOADD cities 116.404 39.915 &quot;北京&quot; 121.473 31.230 &quot;上海&quot; 113.264 23.129 &quot;广州&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 计算两点之间的距离</span></span>
<span class="line"><span>GEODIST cities 北京 上海 km</span></span>
<span class="line"><span># 输出: 1068.20 (公里)</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 查找某坐标附近的城市</span></span>
<span class="line"><span>GEOSEARCH cities FROMLONLAT 116.4 39.9 BYRADIUS 200 km ASC</span></span>
<span class="line"><span># 输出: 北京</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 获取坐标</span></span>
<span class="line"><span>GEOPOS cities 北京</span></span>
<span class="line"><span># 输出: 116.404, 39.915</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 将地理位置转为 ZSet（可用于范围查询和排序）</span></span>
<span class="line"><span>ZRANGE cities 0 -1 WITHSCORES</span></span></code></pre></div><p><strong>应用场景</strong>：</p><ul><li>附近的人/店铺搜索</li><li>地理围栏</li><li>物流轨迹追踪</li><li>城市范围统计</li></ul><hr><h2 id="五、redis-安装" tabindex="-1">五、Redis 安装 <a class="header-anchor" href="#五、redis-安装" aria-label="Permalink to “五、Redis 安装”">​</a></h2><h3 id="_5-1-windows-安装-wsl-方式" tabindex="-1">5.1 Windows 安装（WSL 方式） <a class="header-anchor" href="#_5-1-windows-安装-wsl-方式" aria-label="Permalink to “5.1 Windows 安装（WSL 方式）”">​</a></h3><p>由于 Redis 官方不再提供原生 Windows 版本，推荐使用 WSL（Windows Subsystem for Linux）或 Docker。</p><p><strong>步骤一：安装 WSL</strong></p><div class="language-powershell"><button title="Copy Code" class="copy"></button><span class="lang">powershell</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 以管理员身份运行 PowerShell</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">wsl </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">--</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">install</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 重启计算机</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 安装 Ubuntu 发行版</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">wsl </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">--</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">install </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">d Ubuntu</span></span></code></pre></div><p><strong>步骤二：在 WSL 中安装 Redis</strong></p><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 更新包管理器</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">sudo</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> apt</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> update</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 安装 Redis</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">sudo</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> apt</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> install</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> redis-server</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 验证安装</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">redis-server</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --version</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">redis-cli</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> ping</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 输出: PONG</span></span></code></pre></div><h3 id="_5-2-windows-原生安装-第三方移植" tabindex="-1">5.2 Windows 原生安装（第三方移植） <a class="header-anchor" href="#_5-2-windows-原生安装-第三方移植" aria-label="Permalink to “5.2 Windows 原生安装（第三方移植）”">​</a></h3><p>如果必须使用 Windows 原生版本，可以使用 Microsoft 维护的分支：</p><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 方式一：从 GitHub 下载</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 访问 https://github.com/tporadowski/redis/releases</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 下载 Redis-x64-5.0.14.1.msi 安装包</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 方式二：使用 Chocolatey</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">choco</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> install</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> redis-64</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 安装完成后</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 服务默认运行在 localhost:6379</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">redis-cli</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> ping</span></span></code></pre></div><p><strong>注意</strong>：第三方 Windows 版本为 Redis 5.0，不支持 6.0+ 的新特性（多线程 I/O、ACL 等）。</p><h3 id="_5-3-docker-方式-推荐" tabindex="-1">5.3 Docker 方式（推荐） <a class="header-anchor" href="#_5-3-docker-方式-推荐" aria-label="Permalink to “5.3 Docker 方式（推荐）”">​</a></h3><p>Docker 是最简单、最可靠的跨平台安装方式。</p><p><strong>基本使用</strong>：</p><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 拉取最新 Redis 镜像</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">docker</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> pull</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> redis:latest</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 运行 Redis 容器</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">docker</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> run</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -d</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --name</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> my-redis</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -p</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> 6379:6379</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> redis:latest</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 验证运行</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">docker</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> exec</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -it</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> my-redis</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> redis-cli</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> ping</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 输出: PONG</span></span></code></pre></div><p><strong>带配置的运行</strong>：</p><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 创建自定义配置文件</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">mkdir</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -p</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> /path/to/redis/conf</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">mkdir</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -p</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> /path/to/redis/data</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 运行时挂载配置和数据目录</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">docker</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> run</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -d</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> \\</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    --name</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> my-redis</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> \\</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    -p</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> 6379:6379</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> \\</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    -v</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> /path/to/redis/conf/redis.conf:/etc/redis/redis.conf</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> \\</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    -v</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> /path/to/redis/data:/data</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> \\</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">    redis:latest</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> redis-server</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> /etc/redis/redis.conf</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 查看日志</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">docker</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> logs</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -f</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> my-redis</span></span></code></pre></div><p><strong>使用 Docker Compose</strong>：</p><div class="language-yaml"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># docker-compose.yml</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">version</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;3.8&#39;</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">services</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">  redis</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    image</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">redis:7-alpine</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    container_name</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">my-redis</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    ports</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      - </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;6379:6379&quot;</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    volumes</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      - </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">./conf/redis.conf:/etc/redis/redis.conf</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      - </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">./data:/data</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    command</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">redis-server /etc/redis/redis.conf</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    restart</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">unless-stopped</span></span></code></pre></div><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 启动</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">docker-compose</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> up</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -d</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 停止</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">docker-compose</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> down</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 连接</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">docker</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> exec</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -it</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> my-redis</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> redis-cli</span></span></code></pre></div><h3 id="_5-4-linux-安装" tabindex="-1">5.4 Linux 安装 <a class="header-anchor" href="#_5-4-linux-安装" aria-label="Permalink to “5.4 Linux 安装”">​</a></h3><p><strong>Ubuntu/Debian（apt）</strong>：</p><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 更新包索引</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">sudo</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> apt</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> update</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 安装 Redis</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">sudo</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> apt</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> install</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> redis-server</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 查看 Redis 状态</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">sudo</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> systemctl</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> status</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> redis-server</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 启动/停止/重启</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">sudo</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> systemctl</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> start</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> redis-server</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">sudo</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> systemctl</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> stop</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> redis-server</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">sudo</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> systemctl</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> restart</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> redis-server</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 设置开机自启</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">sudo</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> systemctl</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> enable</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> redis-server</span></span></code></pre></div><p><strong>CentOS/RHEL（yum/dnf）</strong>：</p><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># CentOS 7</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">sudo</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> yum</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> install</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> epel-release</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">sudo</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> yum</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> install</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> redis</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># CentOS 8+/RHEL 8+</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">sudo</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> dnf</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> install</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> redis</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 启动服务</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">sudo</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> systemctl</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> start</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> redis</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 设置开机自启</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">sudo</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> systemctl</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> enable</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> redis</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 查看版本</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">redis-server</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --version</span></span></code></pre></div><p><strong>从源代码编译安装（进阶）</strong>：</p><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 安装编译依赖</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">sudo</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> apt</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> install</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> build-essential</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> tcl</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 下载 Redis 源码</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">cd</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> /tmp</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">wget</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> https://github.com/redis/redis/archive/refs/tags/7.2.4.tar.gz</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">tar</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -xzf</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> 7.2.4.tar.gz</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">cd</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> redis-7.2.4</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 编译（使用多核加速）</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">make</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -j$(</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">nproc</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">)</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 运行测试（可选，需要几分钟）</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">make</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> test</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 安装到指定目录</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">sudo</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> make</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> install</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> PREFIX=/usr/local/redis</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 创建配置目录</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">sudo</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> mkdir</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -p</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> /usr/local/redis/conf</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">sudo</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> cp</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> redis.conf</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> /usr/local/redis/conf/</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 启动 Redis</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">/usr/local/redis/bin/redis-server</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> /usr/local/redis/conf/redis.conf</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 验证</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">/usr/local/redis/bin/redis-cli</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> ping</span></span></code></pre></div><h3 id="_5-5-macos-安装" tabindex="-1">5.5 macOS 安装 <a class="header-anchor" href="#_5-5-macos-安装" aria-label="Permalink to “5.5 macOS 安装”">​</a></h3><p>使用 Homebrew 是 macOS 上最方便的安装方式：</p><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 安装 Homebrew（如果未安装）</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">/bin/bash</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -c</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;$(</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">curl</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -fsSL</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 安装 Redis</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">brew</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> install</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> redis</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 启动 Redis（前台运行）</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">redis-server</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 后台运行（作为服务）</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">brew</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> services</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> start</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> redis</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 查看服务状态</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">brew</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> services</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> list</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 停止服务</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">brew</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> services</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> stop</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> redis</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 验证安装</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">redis-cli</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> ping</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 输出: PONG</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 查看版本</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">redis-server</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --version</span></span></code></pre></div><h3 id="_5-6-各安装方式对比" tabindex="-1">5.6 各安装方式对比 <a class="header-anchor" href="#_5-6-各安装方式对比" aria-label="Permalink to “5.6 各安装方式对比”">​</a></h3><table tabindex="0"><thead><tr><th>方式</th><th>适用场景</th><th>优点</th><th>缺点</th></tr></thead><tbody><tr><td><strong>Docker</strong></td><td>开发、测试、生产</td><td>简单、可移植、版本可控</td><td>需要 Docker 环境</td></tr><tr><td><strong>apt/yum</strong></td><td>Linux 服务器</td><td>简单、自动管理</td><td>版本可能不是最新</td></tr><tr><td><strong>源码编译</strong></td><td>生产环境、定制化</td><td>最新版本、高度定制</td><td>编译耗时、维护复杂</td></tr><tr><td><strong>Homebrew</strong></td><td>macOS 开发</td><td>简单、与系统集成</td><td>仅适用于 macOS</td></tr><tr><td><strong>WSL</strong></td><td>Windows 开发</td><td>完整 Linux 环境</td><td>性能略低</td></tr></tbody></table><hr><h2 id="六、redis-配置文件详解" tabindex="-1">六、Redis 配置文件详解 <a class="header-anchor" href="#六、redis-配置文件详解" aria-label="Permalink to “六、Redis 配置文件详解”">​</a></h2><h3 id="_6-1-配置文件位置" tabindex="-1">6.1 配置文件位置 <a class="header-anchor" href="#_6-1-配置文件位置" aria-label="Permalink to “6.1 配置文件位置”">​</a></h3><p>Redis 配置文件的默认位置：</p><table tabindex="0"><thead><tr><th>安装方式</th><th>配置文件路径</th></tr></thead><tbody><tr><td>apt 安装</td><td><code>/etc/redis/redis.conf</code></td></tr><tr><td>源码安装</td><td><code>/usr/local/redis/conf/redis.conf</code></td></tr><tr><td>Docker</td><td>容器内 <code>/etc/redis/redis.conf</code>，通过 volume 挂载</td></tr><tr><td>brew 安装</td><td><code>/usr/local/etc/redis.conf</code> (Intel Mac) 或 <code>/opt/homebrew/etc/redis.conf</code> (Apple Silicon)</td></tr></tbody></table><h3 id="_6-2-基础配置" tabindex="-1">6.2 基础配置 <a class="header-anchor" href="#_6-2-基础配置" aria-label="Permalink to “6.2 基础配置”">​</a></h3><div class="language-conf"><button title="Copy Code" class="copy"></button><span class="lang">conf</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span># Redis 监听端口，默认 6379</span></span>
<span class="line"><span>port 6379</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 绑定地址（默认 127.0.0.1，仅允许本地连接）</span></span>
<span class="line"><span># 如需远程访问，改为 0.0.0.0（注意安全）</span></span>
<span class="line"><span>bind 127.0.0.1</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 是否开启保护模式（默认开启）</span></span>
<span class="line"><span># 开启后，未设置密码且绑定非本地地址时，拒绝外部连接</span></span>
<span class="line"><span>protected-mode yes</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 配置文件位置（通常不需要修改）</span></span>
<span class="line"><span># config /etc/redis/redis.conf</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 以守护进程方式运行（后台运行）</span></span>
<span class="line"><span>daemonize yes</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 进程 PID 文件路径（守护进程模式下）</span></span>
<span class="line"><span>pidfile /var/run/redis_6379.pid</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 日志级别：debug, verbose, notice, warning</span></span>
<span class="line"><span>loglevel notice</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 日志文件路径（空字符串表示输出到标准输出）</span></span>
<span class="line"><span>logfile &quot;&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 数据库数量（默认 16）</span></span>
<span class="line"><span>databases 16</span></span></code></pre></div><h3 id="_6-3-内存配置" tabindex="-1">6.3 内存配置 <a class="header-anchor" href="#_6-3-内存配置" aria-label="Permalink to “6.3 内存配置”">​</a></h3><div class="language-conf"><button title="Copy Code" class="copy"></button><span class="lang">conf</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span># 最大内存限制（建议根据服务器内存设置）</span></span>
<span class="line"><span># 例如设置 2GB：maxmemory 2gb</span></span>
<span class="line"><span>maxmemory 0</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 内存淘汰策略（当达到最大内存时）</span></span>
<span class="line"><span># noeviction: 不淘汰，写入时报错</span></span>
<span class="line"><span># allkeys-lru: 淘汰最近最少使用的 key（所有 key）</span></span>
<span class="line"><span># volatile-lru: 淘汰最近最少使用的 key（仅设置了过期时间的 key）</span></span>
<span class="line"><span># allkeys-lfu: 淘汰最不经常使用的 key</span></span>
<span class="line"><span># volatile-lfu: 淘汰最不经常使用的 key（仅设置了过期时间的 key）</span></span>
<span class="line"><span># allkeys-random: 随机淘汰一个 key</span></span>
<span class="line"><span># volatile-random: 随机淘汰一个设置了过期时间的 key</span></span>
<span class="line"><span># volatile-ttl: 淘汰剩余时间最短的 key</span></span>
<span class="line"><span>maxmemory-policy allkeys-lru</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 内存使用超过该比例时，开始主动碎片整理（Redis 4.0+）</span></span>
<span class="line"><span>activedefrag yes</span></span></code></pre></div><h3 id="_6-4-持久化配置" tabindex="-1">6.4 持久化配置 <a class="header-anchor" href="#_6-4-持久化配置" aria-label="Permalink to “6.4 持久化配置”">​</a></h3><p><strong>RDB 持久化</strong>：</p><div class="language-conf"><button title="Copy Code" class="copy"></button><span class="lang">conf</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span># RDB 保存规则（满足任一条件即触发保存）</span></span>
<span class="line"><span># 3600 秒内至少 1 次写操作 → 保存</span></span>
<span class="line"><span>save 3600 1</span></span>
<span class="line"><span># 300 秒内至少 10 次写操作 → 保存</span></span>
<span class="line"><span>save 300 10</span></span>
<span class="line"><span># 60 秒内至少 10000 次写操作 → 保存</span></span>
<span class="line"><span>save 60 10000</span></span>
<span class="line"><span></span></span>
<span class="line"><span># RDB 文件名</span></span>
<span class="line"><span>dbfilename dump.rdb</span></span>
<span class="line"><span></span></span>
<span class="line"><span># RDB 文件保存目录</span></span>
<span class="line"><span>dir /var/lib/redis</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 在保存 RDB 时是否压缩（使用 LZF 压缩算法）</span></span>
<span class="line"><span>rdbcompression yes</span></span>
<span class="line"><span></span></span>
<span class="line"><span># RDB 文件是否校验</span></span>
<span class="line"><span>rdbchecksum yes</span></span></code></pre></div><p><strong>AOF 持久化</strong>：</p><div class="language-conf"><button title="Copy Code" class="copy"></button><span class="lang">conf</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span># 开启 AOF 持久化</span></span>
<span class="line"><span>appendonly yes</span></span>
<span class="line"><span></span></span>
<span class="line"><span># AOF 文件名</span></span>
<span class="line"><span>appendfilename &quot;appendonly.aof&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span># AOF 同步策略</span></span>
<span class="line"><span># always: 每次写操作都同步到磁盘（最安全，最慢）</span></span>
<span class="line"><span># everysec: 每秒同步一次（推荐，平衡性能和安全）</span></span>
<span class="line"><span># no: 由操作系统决定同步时机（最快，最不安全）</span></span>
<span class="line"><span>appendfsync everysec</span></span>
<span class="line"><span></span></span>
<span class="line"><span># AOF 重写配置</span></span>
<span class="line"><span>auto-aof-rewrite-percentage 100  # AOF 文件增长 100% 时触发重写</span></span>
<span class="line"><span>auto-aof-rewrite-min-size 64mb   # AOF 文件最小时重写阈值</span></span>
<span class="line"><span></span></span>
<span class="line"><span># Redis 4.0+ 混合持久化</span></span>
<span class="line"><span>aof-use-rdb-preamble yes</span></span></code></pre></div><h3 id="_6-5-主从复制配置" tabindex="-1">6.5 主从复制配置 <a class="header-anchor" href="#_6-5-主从复制配置" aria-label="Permalink to “6.5 主从复制配置”">​</a></h3><div class="language-conf"><button title="Copy Code" class="copy"></button><span class="lang">conf</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span># 复制相关</span></span>
<span class="line"><span># 复制缓冲区大小</span></span>
<span class="line"><span>repl-backlog-size 1mb</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 复制缓冲区过期时间</span></span>
<span class="line"><span>repl-backlog-ttl 3600</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 从节点只读模式</span></span>
<span class="line"><span>replica-read-only yes</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 从节点向主节点发送 ping 的间隔</span></span>
<span class="line"><span>repl-ping-replica-period 10</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 主节点超时时间（秒）</span></span>
<span class="line"><span>repl-timeout 60</span></span></code></pre></div><p><strong>设置从节点</strong>：</p><div class="language-conf"><button title="Copy Code" class="copy"></button><span class="lang">conf</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span># 在从节点的 redis.conf 中添加</span></span>
<span class="line"><span>replicaof 192.168.1.100 6379</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 如果主节点有密码</span></span>
<span class="line"><span>masterauth &quot;your-master-password&quot;</span></span></code></pre></div><h3 id="_6-6-安全配置" tabindex="-1">6.6 安全配置 <a class="header-anchor" href="#_6-6-安全配置" aria-label="Permalink to “6.6 安全配置”">​</a></h3><div class="language-conf"><button title="Copy Code" class="copy"></button><span class="lang">conf</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span># 设置 Redis 密码（强烈建议在生产环境中设置）</span></span>
<span class="line"><span>requirepass &quot;your-secure-password&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 主节点密码（从节点连接主节点时使用）</span></span>
<span class="line"><span>masterauth &quot;your-master-password&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 重命名或禁用危险命令</span></span>
<span class="line"><span># 禁用 FLUSHALL 命令</span></span>
<span class="line"><span>rename-command FLUSHALL &quot;&quot;</span></span>
<span class="line"><span># 禁用 FLUSHDB 命令</span></span>
<span class="line"><span>rename-command FLUSHDB &quot;&quot;</span></span>
<span class="line"><span># 禁用 CONFIG 命令</span></span>
<span class="line"><span>rename-command CONFIG &quot;&quot;</span></span>
<span class="line"><span># 重命名 DEBUG 命令</span></span>
<span class="line"><span>rename-command DEBUG &quot;DEBUG_a1b2c3d4e5f6&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 绑定地址（限制网络访问）</span></span>
<span class="line"><span>bind 127.0.0.1</span></span></code></pre></div><h3 id="_6-7-网络配置" tabindex="-1">6.7 网络配置 <a class="header-anchor" href="#_6-7-网络配置" aria-label="Permalink to “6.7 网络配置”">​</a></h3><div class="language-conf"><button title="Copy Code" class="copy"></button><span class="lang">conf</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span># TCP 最大连接数</span></span>
<span class="line"><span>tcp-backlog 511</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 客户端空闲超时时间（0 表示永不超时）</span></span>
<span class="line"><span>timeout 0</span></span>
<span class="line"><span></span></span>
<span class="line"><span># TCP keepalive 间隔</span></span>
<span class="line"><span>tcp-keepalive 300</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 最大客户端连接数</span></span>
<span class="line"><span>maxclients 10000</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 客户端输出缓冲区限制</span></span>
<span class="line"><span># 普通客户端</span></span>
<span class="line"><span>client-output-buffer-limit normal 0 0 0</span></span>
<span class="line"><span># 从节点</span></span>
<span class="line"><span>client-output-buffer-limit replica 256mb 64mb 60</span></span>
<span class="line"><span># 发布订阅</span></span>
<span class="line"><span>client-output-buffer-limit pubsub 32mb 8mb 60</span></span></code></pre></div><h3 id="_6-8-配置修改与生效" tabindex="-1">6.8 配置修改与生效 <a class="header-anchor" href="#_6-8-配置修改与生效" aria-label="Permalink to “6.8 配置修改与生效”">​</a></h3><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 动态查看配置</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">redis-cli</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> CONFIG</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> GET</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> maxmemory</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 动态修改配置（运行时修改，无需重启）</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">redis-cli</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> CONFIG</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> SET</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> maxmemory</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> 1gb</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 修改配置文件后重启生效</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># Linux</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">sudo</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> systemctl</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> restart</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> redis-server</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 或</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">redis-cli</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> SHUTDOWN</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">redis-server</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> /etc/redis/redis.conf</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 验证配置</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">redis-cli</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> INFO</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> server</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">redis-cli</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> INFO</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> memory</span></span></code></pre></div><hr><h2 id="七、redis-基本使用" tabindex="-1">七、Redis 基本使用 <a class="header-anchor" href="#七、redis-基本使用" aria-label="Permalink to “七、Redis 基本使用”">​</a></h2><h3 id="_7-1-redis-cli-客户端" tabindex="-1">7.1 redis-cli 客户端 <a class="header-anchor" href="#_7-1-redis-cli-客户端" aria-label="Permalink to “7.1 redis-cli 客户端”">​</a></h3><p>redis-cli 是 Redis 自带的命令行客户端工具。</p><p><strong>连接 Redis</strong>：</p><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 连接本地 Redis（默认 localhost:6379）</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">redis-cli</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 连接远程 Redis</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">redis-cli</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -h</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 192.168.1.100</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -p</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 6379</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 带密码连接</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">redis-cli</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -h</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 192.168.1.100</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -p</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 6379</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -a</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> your_password</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 切换数据库</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">redis-cli</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -n</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 0</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">  # 默认使用数据库 0</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 进入交互模式后</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">127.0.0.1:6379</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt; </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">PING</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 输出: PONG</span></span></code></pre></div><p><strong>基本交互</strong>：</p><div class="language-redis"><button title="Copy Code" class="copy"></button><span class="lang">redis</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span># 查看服务器信息</span></span>
<span class="line"><span>INFO server</span></span>
<span class="line"><span>INFO memory</span></span>
<span class="line"><span>INFO persistence</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 查看所有 key</span></span>
<span class="line"><span>KEYS *</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 模糊匹配 key</span></span>
<span class="line"><span>KEYS user:*</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 统计 key 总数</span></span>
<span class="line"><span>DBSIZE</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 清空当前数据库</span></span>
<span class="line"><span>FLUSHDB</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 清空所有数据库</span></span>
<span class="line"><span>FLUSHALL</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 退出</span></span>
<span class="line"><span>EXIT</span></span>
<span class="line"><span>QUIT</span></span></code></pre></div><h3 id="_7-2-string-类型常用命令" tabindex="-1">7.2 String 类型常用命令 <a class="header-anchor" href="#_7-2-string-类型常用命令" aria-label="Permalink to “7.2 String 类型常用命令”">​</a></h3><p>String 是 Redis 最基础的类型，可以存储字符串、整数、浮点数甚至二进制数据。</p><div class="language-redis"><button title="Copy Code" class="copy"></button><span class="lang">redis</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span># 设置值</span></span>
<span class="line"><span>SET name &quot;Redis&quot;</span></span>
<span class="line"><span>SET counter 0</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 获取值</span></span>
<span class="line"><span>GET name</span></span>
<span class="line"><span># 输出: &quot;Redis&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 设置过期时间（秒）</span></span>
<span class="line"><span>SET token &quot;abc123&quot; EX 3600</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 仅当 key 不存在时设置（用于分布式锁）</span></span>
<span class="line"><span>SET lock:resource unique_key NX</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 仅当 key 存在时设置</span></span>
<span class="line"><span>SET name &quot;Redis New&quot; XX</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 原子递增</span></span>
<span class="line"><span>INCR counter        # counter: 1</span></span>
<span class="line"><span>INCRBY counter 10   # counter: 11</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 原子递减</span></span>
<span class="line"><span>DECR counter        # counter: 10</span></span>
<span class="line"><span>DECRBY counter 5    # counter: 5</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 追加内容</span></span>
<span class="line"><span>APPEND name &quot; is great&quot;  # name: &quot;Redis is great&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 获取字符串长度</span></span>
<span class="line"><span>STRLEN name  # 输出: 15</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 获取子串</span></span>
<span class="line"><span>GETRANGE name 0 4  # 输出: &quot;Redis&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 设置子串</span></span>
<span class="line"><span>SETRANGE name 6 &quot;awesome&quot;  # name: &quot;Redis awesome&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 同时设置多个 key</span></span>
<span class="line"><span>MSET key1 &quot;val1&quot; key2 &quot;val2&quot; key3 &quot;val3&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 同时获取多个 key</span></span>
<span class="line"><span>MGET key1 key2 key3</span></span></code></pre></div><h3 id="_7-3-hash-类型常用命令" tabindex="-1">7.3 Hash 类型常用命令 <a class="header-anchor" href="#_7-3-hash-类型常用命令" aria-label="Permalink to “7.3 Hash 类型常用命令”">​</a></h3><p>Hash 是键值对集合，适合存储对象。</p><div class="language-redis"><button title="Copy Code" class="copy"></button><span class="lang">redis</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span># 设置字段</span></span>
<span class="line"><span>HSET user:1001 name &quot;张三&quot; age 25 email &quot;zhangsan@example.com&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 获取字段</span></span>
<span class="line"><span>HGET user:1001 name  # 输出: &quot;张三&quot;</span></span>
<span class="line"><span>HGETALL user:1001    # 获取所有字段</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 仅设置不存在的字段</span></span>
<span class="line"><span>HSETNX user:1001 name &quot;张三&quot;  # 如果 name 已存在则不设置</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 同时设置多个字段</span></span>
<span class="line"><span>HMSET user:1001 address &quot;北京市&quot; phone &quot;13800138000&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 同时获取多个字段</span></span>
<span class="line"><span>HMGET user:1001 name age</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 字段递增</span></span>
<span class="line"><span>HINCRBY user:1001 age 1  # age: 26</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 获取所有字段名</span></span>
<span class="line"><span>HKEYS user:1001</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 获取所有字段值</span></span>
<span class="line"><span>HVALS user:1001</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 获取字段数量</span></span>
<span class="line"><span>HLEN user:1001</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 检查字段是否存在</span></span>
<span class="line"><span>HEXISTS user:1001 name  # 输出: 1</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 删除字段</span></span>
<span class="line"><span>HDEL user:1001 email</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 遍历哈希（大数据量）</span></span>
<span class="line"><span>HSCAN user:1001 0 COUNT 10</span></span></code></pre></div><h3 id="_7-4-list-类型常用命令" tabindex="-1">7.4 List 类型常用命令 <a class="header-anchor" href="#_7-4-list-类型常用命令" aria-label="Permalink to “7.4 List 类型常用命令”">​</a></h3><p>List 是有序可重复的字符串列表，可作为队列或栈使用。</p><div class="language-redis"><button title="Copy Code" class="copy"></button><span class="lang">redis</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span># 从右侧推入（常用作队列）</span></span>
<span class="line"><span>RPUSH queue:task &quot;任务1&quot; &quot;任务2&quot; &quot;任务3&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 从左侧推入（用作栈时）</span></span>
<span class="line"><span>LPUSH stack:task &quot;任务0&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 从左侧弹出</span></span>
<span class="line"><span>LPOP queue:task  # 输出: &quot;任务1&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 从右侧弹出</span></span>
<span class="line"><span>RPOP queue:task</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 阻塞弹出（等待队列有数据）</span></span>
<span class="line"><span>BLPOP queue:task 0  # 0 表示永久等待</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 获取列表长度</span></span>
<span class="line"><span>LLEN queue:task</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 获取指定范围的元素</span></span>
<span class="line"><span>LRANGE queue:task 0 -1  # 获取全部</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 获取指定索引的元素</span></span>
<span class="line"><span>LINDEX queue:task 0  # 第一个元素</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 插入元素</span></span>
<span class="line"><span>LINSERT queue:task BEFORE &quot;任务2&quot; &quot;任务1.5&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 移除元素</span></span>
<span class="line"><span>LREM queue:task 0 &quot;任务1&quot;  # 移除所有匹配元素</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 裁剪列表</span></span>
<span class="line"><span>LTRIM queue:task 0 4  # 只保留前 5 个元素</span></span></code></pre></div><h3 id="_7-5-set-类型常用命令" tabindex="-1">7.5 Set 类型常用命令 <a class="header-anchor" href="#_7-5-set-类型常用命令" aria-label="Permalink to “7.5 Set 类型常用命令”">​</a></h3><p>Set 是无序不重复的集合，支持集合运算。</p><div class="language-redis"><button title="Copy Code" class="copy"></button><span class="lang">redis</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span># 添加元素</span></span>
<span class="line"><span>SADD tag:article:1 &quot;技术&quot; &quot;数据库&quot; &quot;Redis&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 获取所有元素</span></span>
<span class="line"><span>SMEMBERS tag:article:1</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 随机获取元素</span></span>
<span class="line"><span>SRANDMEMBER tag:article:1 1</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 检查元素是否存在</span></span>
<span class="line"><span>SISMEMBER tag:article:1 &quot;Redis&quot;  # 输出: 1</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 获取集合大小</span></span>
<span class="line"><span>SCARD tag:article:1</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 删除元素</span></span>
<span class="line"><span>SREM tag:article:1 &quot;Redis&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 集合运算</span></span>
<span class="line"><span>SADD set1 &quot;a&quot; &quot;b&quot; &quot;c&quot;</span></span>
<span class="line"><span>SADD set2 &quot;b&quot; &quot;c&quot; &quot;d&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 交集</span></span>
<span class="line"><span>SINTER set1 set2  # 输出: &quot;b&quot;, &quot;c&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 并集</span></span>
<span class="line"><span>SUNION set1 set2  # 输出: &quot;a&quot;, &quot;b&quot;, &quot;c&quot;, &quot;d&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 差集（set1 - set2）</span></span>
<span class="line"><span>SDIFF set1 set2  # 输出: &quot;a&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 判断集合关系</span></span>
<span class="line"><span>SADD user:follows:A &quot;B&quot; &quot;C&quot; &quot;D&quot;</span></span>
<span class="line"><span>SADD user:follows:B &quot;A&quot; &quot;C&quot; &quot;D&quot;</span></span>
<span class="line"><span>SINTER user:follows:A user:follows:B  # 共同关注: &quot;C&quot;, &quot;D&quot;</span></span></code></pre></div><h3 id="_7-6-zset-类型常用命令" tabindex="-1">7.6 ZSet 类型常用命令 <a class="header-anchor" href="#_7-6-zset-类型常用命令" aria-label="Permalink to “7.6 ZSet 类型常用命令”">​</a></h3><p>ZSet 是有序集合，每个元素关联一个分数。</p><div class="language-redis"><button title="Copy Code" class="copy"></button><span class="lang">redis</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span># 添加元素（用户排行榜）</span></span>
<span class="line"><span>ZADD ranking 100 &quot;user:A&quot; 95 &quot;user:B&quot; 120 &quot;user:C&quot; 88 &quot;user:D&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 获取排名（升序，0 起始）</span></span>
<span class="line"><span>ZRANGE ranking 0 -1 WITHSCORES</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 获取排名（降序）</span></span>
<span class="line"><span>ZREVRANGE ranking 0 2 WITHSCORES</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 获取分数范围</span></span>
<span class="line"><span>ZRANGEBYSCORE ranking 90 110</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 获取元素排名</span></span>
<span class="line"><span>ZRANK ranking &quot;user:A&quot;    # 升序排名</span></span>
<span class="line"><span>ZREVRANK ranking &quot;user:C&quot;  # 降序排名</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 获取元素分数</span></span>
<span class="line"><span>ZSCORE ranking &quot;user:A&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 增加分数</span></span>
<span class="line"><span>ZINCRBY ranking 5 &quot;user:A&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 移除元素</span></span>
<span class="line"><span>ZREM ranking &quot;user:D&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 获取集合大小</span></span>
<span class="line"><span>ZCARD ranking</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 统计分数范围内的元素数量</span></span>
<span class="line"><span>ZCOUNT ranking 90 110</span></span></code></pre></div><h3 id="_7-7-其他实用命令" tabindex="-1">7.7 其他实用命令 <a class="header-anchor" href="#_7-7-其他实用命令" aria-label="Permalink to “7.7 其他实用命令”">​</a></h3><div class="language-redis"><button title="Copy Code" class="copy"></button><span class="lang">redis</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span># 设置过期时间</span></span>
<span class="line"><span>SET resource &quot;data&quot;</span></span>
<span class="line"><span>EXPIRE resource 3600  # 1 小时后过期</span></span>
<span class="line"><span>TTL resource           # 查看剩余时间（秒）</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 查看剩余生存时间</span></span>
<span class="line"><span>TTL resource    # 返回剩余秒数；-1 表示永不过期；-2 表示不存在</span></span>
<span class="line"><span>PTTL resource   # 毫秒级精度</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 取消过期（变为永久）</span></span>
<span class="line"><span>PERSIST resource</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 重命名 key</span></span>
<span class="line"><span>RENAME old_key new_key</span></span>
<span class="line"><span>RENAMENX old_key new_key  # 仅当 new_key 不存在时重命名</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 检查 key 是否存在</span></span>
<span class="line"><span>EXISTS resource  # 返回 1 存在，0 不存在</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 移动 key 到另一个数据库</span></span>
<span class="line"><span>MOVE resource 1</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 随机获取一个 key</span></span>
<span class="line"><span>RANDOMKEY</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 序列化/反序列化</span></span>
<span class="line"><span>DUMP resource   # 序列化</span></span>
<span class="line"><span>RESTORE new_key 0 &lt;serialized_value&gt;  # 反序列化</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 匹配 key（不阻塞）</span></span>
<span class="line"><span>SCAN 0 MATCH user:* COUNT 100</span></span></code></pre></div><h3 id="_7-8-发布订阅" tabindex="-1">7.8 发布订阅 <a class="header-anchor" href="#_7-8-发布订阅" aria-label="Permalink to “7.8 发布订阅”">​</a></h3><div class="language-redis"><button title="Copy Code" class="copy"></button><span class="lang">redis</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span># 订阅频道</span></span>
<span class="line"><span>SUBSCRIBE news:technology news:finance</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 订阅模式（使用通配符）</span></span>
<span class="line"><span>PSUBSCRIBE news:*</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 向频道发布消息</span></span>
<span class="line"><span>PUBLISH news:technology &quot;Redis 7.2 发布了！&quot;</span></span>
<span class="line"><span># 所有订阅该频道的客户端都会收到消息，返回接收者数量</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 取消订阅</span></span>
<span class="line"><span>UNSUBSCRIBE news:technology</span></span>
<span class="line"><span>PUNSUBSCRIBE news:*</span></span></code></pre></div><hr><h2 id="八、redis-架构概览" tabindex="-1">八、Redis 架构概览 <a class="header-anchor" href="#八、redis-架构概览" aria-label="Permalink to “八、Redis 架构概览”">​</a></h2><h3 id="_8-1-整体架构" tabindex="-1">8.1 整体架构 <a class="header-anchor" href="#_8-1-整体架构" aria-label="Permalink to “8.1 整体架构”">​</a></h3><p>Redis 的整体架构可以分为以下几个核心部分：</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>┌─────────────────────────────────────────────────────────┐</span></span>
<span class="line"><span>│                     客户端应用                            │</span></span>
<span class="line"><span>│  ┌──────────┐  ┌──────────┐  ┌──────────┐              │</span></span>
<span class="line"><span>│  │  Web App │  │ Mobile   │  │ 其他服务  │              │</span></span>
<span class="line"><span>│  └─────┬────┘  └─────┬────┘  └─────┬────┘              │</span></span>
<span class="line"><span>├────────┼─────────────┼─────────────┼────────────────────┤</span></span>
<span class="line"><span>│        ▼             ▼             ▼                    │</span></span>
<span class="line"><span>│  ┌──────────────────────────────────────────────┐      │</span></span>
<span class="line"><span>│  │           网络层 (Network Layer)               │      │</span></span>
<span class="line"><span>│  │  TCP 协议 → Redis 协议 → 连接管理              │      │</span></span>
<span class="line"><span>│  └────────────────────┬─────────────────────────┘      │</span></span>
<span class="line"><span>├────────────────────────┼────────────────────────────────┤</span></span>
<span class="line"><span>│                        ▼                                │</span></span>
<span class="line"><span>│  ┌──────────────────────────────────────────────┐      │</span></span>
<span class="line"><span>│  │         事件循环层 (Event Loop)                │      │</span></span>
<span class="line"><span>│  │  I/O 多路复用 → 文件事件 → 时间事件             │      │</span></span>
<span class="line"><span>│  └────────────────────┬─────────────────────────┘      │</span></span>
<span class="line"><span>├────────────────────────┼────────────────────────────────┤</span></span>
<span class="line"><span>│                        ▼                                │</span></span>
<span class="line"><span>│  ┌──────────────────────────────────────────────┐      │</span></span>
<span class="line"><span>│  │        命令执行层 (Command Execution)          │      │</span></span>
<span class="line"><span>│  │  命令解析 → 命令路由 → 命令执行                 │      │</span></span>
<span class="line"><span>│  └────────────────────┬─────────────────────────┘      │</span></span>
<span class="line"><span>├────────────────────────┼────────────────────────────────┤</span></span>
<span class="line"><span>│                        ▼                                │</span></span>
<span class="line"><span>│  ┌──────────────────────────────────────────────┐      │</span></span>
<span class="line"><span>│  │         数据管理层 (Data Management)           │      │</span></span>
<span class="line"><span>│  │  内存管理 → 数据结构 → 持久化 → 复制           │      │</span></span>
<span class="line"><span>│  └──────────────────────────────────────────────┘      │</span></span>
<span class="line"><span>└─────────────────────────────────────────────────────────┘</span></span></code></pre></div><h3 id="_8-2-事件循环" tabindex="-1">8.2 事件循环 <a class="header-anchor" href="#_8-2-事件循环" aria-label="Permalink to “8.2 事件循环”">​</a></h3><p>Redis 的事件循环是其高性能的核心，基于 I/O 多路复用技术实现。</p><p><strong>I/O 多路复用</strong>： Redis 使用操作系统提供的 I/O 多路复用机制（epoll on Linux, kqueue on macOS/BSD, select on others），在单线程中同时处理数千个并发连接。</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>Redis 事件循环流程：</span></span>
<span class="line"><span></span></span>
<span class="line"><span>                    ┌──────────────┐</span></span>
<span class="line"><span>                    │  等待事件     │</span></span>
<span class="line"><span>                    │ (I/O 多路复用)│</span></span>
<span class="line"><span>                    └──────┬───────┘</span></span>
<span class="line"><span>                           │</span></span>
<span class="line"><span>                    ┌──────▼───────┐</span></span>
<span class="line"><span>                    │ 处理文件事件  │◄── 客户端请求到达</span></span>
<span class="line"><span>                    │ (socket 读写) │</span></span>
<span class="line"><span>                    └──────┬───────┘</span></span>
<span class="line"><span>                           │</span></span>
<span class="line"><span>                    ┌──────▼───────┐</span></span>
<span class="line"><span>                    │ 处理时间事件  │◄── 定时任务（过期、复制等）</span></span>
<span class="line"><span>                    │ (serverCron)  │</span></span>
<span class="line"><span>                    └──────┬───────┘</span></span>
<span class="line"><span>                           │</span></span>
<span class="line"><span>                    ┌──────▼───────┐</span></span>
<span class="line"><span>                    │ 执行命令     │</span></span>
<span class="line"><span>                    │ (读写内存)    │</span></span>
<span class="line"><span>                    └──────┬───────┘</span></span>
<span class="line"><span>                           │</span></span>
<span class="line"><span>                    ┌──────▼───────┐</span></span>
<span class="line"><span>                    │ 返回结果     │</span></span>
<span class="line"><span>                    │ (协议序列化)  │</span></span>
<span class="line"><span>                    └──────────────┘</span></span></code></pre></div><p><strong>两种事件类型</strong>：</p><ul><li><strong>文件事件（File Event）</strong>：与 socket 操作相关，包括客户端的连接、数据读写等</li><li><strong>时间事件（Time Event）</strong>：定时任务，包括 key 过期检查、复制超时检测、持久化触发等</li></ul><h3 id="_8-3-内存结构" tabindex="-1">8.3 内存结构 <a class="header-anchor" href="#_8-3-内存结构" aria-label="Permalink to “8.3 内存结构”">​</a></h3><p>Redis 的内存结构分为以下几个主要部分：</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>Redis 内存布局：</span></span>
<span class="line"><span></span></span>
<span class="line"><span>┌─────────────────────────────────────────────┐</span></span>
<span class="line"><span>│                  Redis 进程内存               │</span></span>
<span class="line"><span>├─────────────────────────────────────────────┤</span></span>
<span class="line"><span>│                                             │</span></span>
<span class="line"><span>│  ┌─────────────────────────────────────┐   │</span></span>
<span class="line"><span>│  │            数据区 (Dataset)           │   │</span></span>
<span class="line"><span>│  │  ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐   │   │</span></span>
<span class="line"><span>│  │  │Key- │ │Key- │ │Key- │ │Key- │   │   │</span></span>
<span class="line"><span>│  │  │Value│ │Value│ │Value│ │Value│   │   │</span></span>
<span class="line"><span>│  │  └──┬──┘ └──┬──┘ └──┬──┘ └──┬──┘   │   │</span></span>
<span class="line"><span>│  │     │       │       │       │       │   │</span></span>
<span class="line"><span>│  │  ┌──▼──┐ ┌──▼──┐ ┌──▼──┐ ┌──▼──┐   │   │</span></span>
<span class="line"><span>│  │  │String│ │Hash │ │List │ │ Set │   │   │</span></span>
<span class="line"><span>│  │  └─────┘ └─────┘ └─────┘ └─────┘   │   │</span></span>
<span class="line"><span>│  └─────────────────────────────────────┘   │</span></span>
<span class="line"><span>│                                             │</span></span>
<span class="line"><span>│  ┌─────────────────────────────────────┐   │</span></span>
<span class="line"><span>│  │          持久化缓冲区                 │   │</span></span>
<span class="line"><span>│  │  RDB 缓冲区 │ AOF 缓冲区 │ 复制缓冲区  │   │</span></span>
<span class="line"><span>│  └─────────────────────────────────────┘   │</span></span>
<span class="line"><span>│                                             │</span></span>
<span class="line"><span>│  ┌─────────────────────────────────────┐   │</span></span>
<span class="line"><span>│  │          客户端输出缓冲区             │   │</span></span>
<span class="line"><span>│  │  client 1 │ client 2 │ ...           │   │</span></span>
<span class="line"><span>│  └─────────────────────────────────────┘   │</span></span>
<span class="line"><span>│                                             │</span></span>
<span class="line"><span>│  ┌─────────────────────────────────────┐   │</span></span>
<span class="line"><span>│  │          内存管理开销                 │   │</span></span>
<span class="line"><span>│  │  jemalloc 元数据 │ 碎片整理          │   │</span></span>
<span class="line"><span>│  └─────────────────────────────────────┘   │</span></span>
<span class="line"><span>│                                             │</span></span>
<span class="line"><span>└─────────────────────────────────────────────┘</span></span></code></pre></div><p><strong>字典结构</strong>： Redis 使用字典（Dict）作为核心数据结构，存储所有 key-value 对。</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>Redis 字典结构：</span></span>
<span class="line"><span></span></span>
<span class="line"><span>┌─────────────────────────────────────────┐</span></span>
<span class="line"><span>│              Redis Dict                  │</span></span>
<span class="line"><span>├─────────────────────────────────────────┤</span></span>
<span class="line"><span>│  ┌─────────────────────────────────┐   │</span></span>
<span class="line"><span>│  │           Hash Table 0          │   │</span></span>
<span class="line"><span>│  │  ┌───┬───┬───┬───┬───┬───┬─┐  │   │</span></span>
<span class="line"><span>│  │  │ 0 │ 1 │ 2 │ 3 │...│n-1│ │  │   │</span></span>
<span class="line"><span>│  │  └─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┴─┘  │   │</span></span>
<span class="line"><span>│  │    │   │   │   │   │   │          │   │</span></span>
<span class="line"><span>│  │    ▼   ▼   ▼   ▼   ▼   ▼          │   │</span></span>
<span class="line"><span>│  │  ┌─┐ ┌─┐ ┌─┐ ┌─┐ ┌─┐ ┌─┐        │   │</span></span>
<span class="line"><span>│  │  │K│ │K│ │K│ │K│ │K│ │K│        │   │</span></span>
<span class="line"><span>│  │  │V│ │V│ │V│ │V│ │V│ │V│        │   │</span></span>
<span class="line"><span>│  │  └─┘ └─┘ └─┘ └─┘ └─┘ └─┘        │   │</span></span>
<span class="line"><span>│  └─────────────────────────────────┘   │</span></span>
<span class="line"><span>│                                         │</span></span>
<span class="line"><span>│  ┌─────────────────────────────────┐   │</span></span>
<span class="line"><span>│  │           Hash Table 1          │   │</span></span>
<span class="line"><span>│  │  （用于渐进式 rehash）           │   │</span></span>
<span class="line"><span>│  └─────────────────────────────────┘   │</span></span>
<span class="line"><span>│                                         │</span></span>
<span class="line"><span>│  rehashidx: 0  ← 正在 rehash 的位置    │</span></span>
<span class="line"><span>│  size/mask: 哈希表大小                │</span></span>
<span class="line"><span>└─────────────────────────────────────────┘</span></span></code></pre></div><p><strong>渐进式 Rehash</strong>： Redis 采用渐进式 rehash 策略来扩展哈希表，避免一次性 rehash 造成阻塞：</p><ol><li>分配新的哈希表（容量是旧表的 2 倍）</li><li>每次 rehash 只迁移一个索引位置的所有键</li><li>rehash 期间，查询操作同时在两个表中查找</li><li>rehash 完成后，释放旧表</li></ol><h3 id="_8-4-数据过期" tabindex="-1">8.4 数据过期 <a class="header-anchor" href="#_8-4-数据过期" aria-label="Permalink to “8.4 数据过期”">​</a></h3><p>Redis 支持 key 的自动过期机制：</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>过期检查流程：</span></span>
<span class="line"><span></span></span>
<span class="line"><span>┌─────────────────────────────────────────────┐</span></span>
<span class="line"><span>│            定期检查 (serverCron)              │</span></span>
<span class="line"><span>├─────────────────────────────────────────────┤</span></span>
<span class="line"><span>│  1. 每 100ms 执行一次                        │</span></span>
<span class="line"><span>│  2. 随机抽取 20 个设置了过期时间的 key        │</span></span>
<span class="line"><span>│  3. 检查是否过期，删除已过期的 key            │</span></span>
<span class="line"><span>│  4. 如果过期比例超过 25%，重复步骤 2-3        │</span></span>
<span class="line"><span>│  5. 时间复杂度：O(N)，但 N 通常很小          │</span></span>
<span class="line"><span>└─────────────────────────────────────────────┘</span></span>
<span class="line"><span></span></span>
<span class="line"><span>┌─────────────────────────────────────────────┐</span></span>
<span class="line"><span>│            惰性删除 (Lazy Expire)            │</span></span>
<span class="line"><span>├─────────────────────────────────────────────┤</span></span>
<span class="line"><span>│  1. 客户端访问 key 时检查是否过期            │</span></span>
<span class="line"><span>│  2. 如果过期，先删除 key，再返回 nil          │</span></span>
<span class="line"><span>│  3. 优点：CPU 友好，不主动消耗 CPU           │</span></span>
<span class="line"><span>│  4. 缺点：如果 key 不再被访问，会一直占用内存 │</span></span>
<span class="line"><span>└─────────────────────────────────────────────┘</span></span></code></pre></div><h3 id="_8-5-单进程架构的优缺点" tabindex="-1">8.5 单进程架构的优缺点 <a class="header-anchor" href="#_8-5-单进程架构的优缺点" aria-label="Permalink to “8.5 单进程架构的优缺点”">​</a></h3><p><strong>优点</strong>：</p><ul><li>简单可靠：无锁竞争，无死锁问题</li><li>性能稳定：亚毫秒级延迟</li><li>易于实现：代码逻辑清晰</li></ul><p><strong>缺点</strong>：</p><ul><li>无法利用多核 CPU</li><li>单节点内存受限（32~64GB）</li><li>单点故障风险</li></ul><p><strong>解决方案</strong>：</p><ul><li>主从复制：读写分离，提升读性能</li><li>集群分片：水平扩展，提升容量和性能</li><li>Redis 6.0 I/O 多线程：网络 I/O 使用多线程</li><li>Redis 8.0（商业版）：部分操作支持多线程</li></ul><hr><h2 id="本章小结" tabindex="-1">本章小结 <a class="header-anchor" href="#本章小结" aria-label="Permalink to “本章小结”">​</a></h2><p>本章我们全面介绍了 Redis 的历史发展、核心特点、应用场景、安装配置和架构设计。重点包括：</p><ol><li><strong>Redis 核心优势</strong>：极致性能（10万+ QPS）、丰富数据类型、单线程架构</li><li><strong>应用场景</strong>：缓存、会话管理、排行榜、计数器、消息队列、分布式锁、地理位置</li><li><strong>安装部署</strong>：推荐 Docker 方式，支持 Windows（WSL）、Linux、macOS</li><li><strong>配置调优</strong>：通过 <code>redis.conf</code> 配置持久化、内存、安全等关键参数</li><li><strong>架构理解</strong>：事件循环 → 单线程执行 → 内存管理，形成 Redis 的高性能内核</li></ol><p>在接下来的章节中，我们将深入学习 Redis 的数据类型、持久化机制、主从复制、集群模式等核心内容。</p>`,235)])])}const g=a(l,[["render",e]]);export{o as __pageData,g as default};
