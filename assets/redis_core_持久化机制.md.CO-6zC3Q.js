import{_ as a,o as n,c as i,ah as l}from"./chunks/framework.CPHJ30oF.js";const o=JSON.parse('{"title":"Redis 持久化机制：从 RDB 到 AOF 的深度剖析","description":"","frontmatter":{},"headers":[{"level":2,"title":"一、持久化概述","slug":"一、持久化概述","link":"#一、持久化概述","children":[{"level":3,"title":"1.1 为什么需要持久化","slug":"_1-1-为什么需要持久化","link":"#_1-1-为什么需要持久化","children":[]},{"level":3,"title":"1.2 Redis 持久化的设计哲学","slug":"_1-2-redis-持久化的设计哲学","link":"#_1-2-redis-持久化的设计哲学","children":[]},{"level":3,"title":"1.3 Redis 持久化方式总览","slug":"_1-3-redis-持久化方式总览","link":"#_1-3-redis-持久化方式总览","children":[]}]},{"level":2,"title":"二、RDB（Redis DataBase）","slug":"二、rdb-redis-database","link":"#二、rdb-redis-database","children":[{"level":3,"title":"2.1 RDB 概述","slug":"_2-1-rdb-概述","link":"#_2-1-rdb-概述","children":[]},{"level":3,"title":"2.2 RDB 文件结构","slug":"_2-2-rdb-文件结构","link":"#_2-2-rdb-文件结构","children":[{"level":4,"title":"RDB 文件各字段详解","slug":"rdb-文件各字段详解","link":"#rdb-文件各字段详解","children":[]},{"level":4,"title":"使用 rdb-tools 解析 RDB 文件","slug":"使用-rdb-tools-解析-rdb-文件","link":"#使用-rdb-tools-解析-rdb-文件","children":[]}]},{"level":3,"title":"2.3 触发方式","slug":"_2-3-触发方式","link":"#_2-3-触发方式","children":[{"level":4,"title":"save 命令触发","slug":"save-命令触发","link":"#save-命令触发","children":[]},{"level":4,"title":"bgsave 命令触发","slug":"bgsave-命令触发","link":"#bgsave-命令触发","children":[]},{"level":4,"title":"自动触发","slug":"自动触发","link":"#自动触发","children":[]},{"level":4,"title":"flushall / flushdb 触发","slug":"flushall-flushdb-触发","link":"#flushall-flushdb-触发","children":[]}]},{"level":3,"title":"2.4 save vs bgsave 对比","slug":"_2-4-save-vs-bgsave-对比","link":"#_2-4-save-vs-bgsave-对比","children":[]},{"level":3,"title":"2.5 自动保存配置详解","slug":"_2-5-自动保存配置详解","link":"#_2-5-自动保存配置详解","children":[{"level":4,"title":"save 规则配置","slug":"save-规则配置","link":"#save-规则配置","children":[]},{"level":4,"title":"stop-writes-on-bgsave-error 配置","slug":"stop-writes-on-bgsave-error-配置","link":"#stop-writes-on-bgsave-error-配置","children":[]}]},{"level":3,"title":"2.6 RDB 文件压缩与校验","slug":"_2-6-rdb-文件压缩与校验","link":"#_2-6-rdb-文件压缩与校验","children":[{"level":4,"title":"RDB 文件压缩","slug":"rdb-文件压缩","link":"#rdb-文件压缩","children":[]},{"level":4,"title":"RDB 文件校验","slug":"rdb-文件校验","link":"#rdb-文件校验","children":[]},{"level":4,"title":"RDB 文件命名与路径","slug":"rdb-文件命名与路径","link":"#rdb-文件命名与路径","children":[]}]},{"level":3,"title":"2.7 RDB 的优缺点","slug":"_2-7-rdb-的优缺点","link":"#_2-7-rdb-的优缺点","children":[{"level":4,"title":"RDB 的优点","slug":"rdb-的优点","link":"#rdb-的优点","children":[]},{"level":4,"title":"RDB 的缺点","slug":"rdb-的缺点","link":"#rdb-的缺点","children":[]},{"level":4,"title":"RDB 数据丢失场景分析","slug":"rdb-数据丢失场景分析","link":"#rdb-数据丢失场景分析","children":[]}]}]},{"level":2,"title":"三、AOF（Append Only File）","slug":"三、aof-append-only-file","link":"#三、aof-append-only-file","children":[{"level":3,"title":"3.1 AOF 概述","slug":"_3-1-aof-概述","link":"#_3-1-aof-概述","children":[]},{"level":3,"title":"3.2 AOF 刷写策略","slug":"_3-2-aof-刷写策略","link":"#_3-2-aof-刷写策略","children":[{"level":4,"title":"三种刷写策略","slug":"三种刷写策略","link":"#三种刷写策略","children":[]},{"level":4,"title":"三种策略的详细分析","slug":"三种策略的详细分析","link":"#三种策略的详细分析","children":[]},{"level":4,"title":"三种策略的性能对比","slug":"三种策略的性能对比","link":"#三种策略的性能对比","children":[]}]},{"level":3,"title":"3.3 AOF 文件结构","slug":"_3-3-aof-文件结构","link":"#_3-3-aof-文件结构","children":[{"level":4,"title":"RESP 协议格式","slug":"resp-协议格式","link":"#resp-协议格式","children":[]},{"level":4,"title":"AOF 文件内容示例","slug":"aof-文件内容示例","link":"#aof-文件内容示例","children":[]},{"level":4,"title":"AOF 文件结构示意图","slug":"aof-文件结构示意图","link":"#aof-文件结构示意图","children":[]}]},{"level":3,"title":"3.4 AOF 重写机制","slug":"_3-4-aof-重写机制","link":"#_3-4-aof-重写机制","children":[{"level":4,"title":"为什么需要 AOF 重写","slug":"为什么需要-aof-重写","link":"#为什么需要-aof-重写","children":[]},{"level":4,"title":"重写触发方式","slug":"重写触发方式","link":"#重写触发方式","children":[]},{"level":4,"title":"重写流程详解","slug":"重写流程详解","link":"#重写流程详解","children":[]},{"level":4,"title":"重写期间的内存开销","slug":"重写期间的内存开销","link":"#重写期间的内存开销","children":[]}]},{"level":3,"title":"3.5 AOF 重写的两个小问题","slug":"_3-5-aof-重写的两个小问题","link":"#_3-5-aof-重写的两个小问题","children":[{"level":4,"title":"重写期间阻塞问题","slug":"重写期间阻塞问题","link":"#重写期间阻塞问题","children":[]},{"level":4,"title":"重写期间的写命令积压","slug":"重写期间的写命令积压","link":"#重写期间的写命令积压","children":[]}]},{"level":3,"title":"3.6 AOF 的优缺点","slug":"_3-6-aof-的优缺点","link":"#_3-6-aof-的优缺点","children":[{"level":4,"title":"AOF 的优点","slug":"aof-的优点","link":"#aof-的优点","children":[]},{"level":4,"title":"AOF 的缺点","slug":"aof-的缺点","link":"#aof-的缺点","children":[]}]}]},{"level":2,"title":"四、混合持久化（4.0+ 引入）","slug":"四、混合持久化-4-0-引入","link":"#四、混合持久化-4-0-引入","children":[{"level":3,"title":"4.1 混合持久化概述","slug":"_4-1-混合持久化概述","link":"#_4-1-混合持久化概述","children":[]},{"level":3,"title":"4.2 混合持久化格式","slug":"_4-2-混合持久化格式","link":"#_4-2-混合持久化格式","children":[]},{"level":3,"title":"4.3 混合持久化的工作流程","slug":"_4-3-混合持久化的工作流程","link":"#_4-3-混合持久化的工作流程","children":[{"level":4,"title":"开启混合持久化","slug":"开启混合持久化","link":"#开启混合持久化","children":[]},{"level":4,"title":"工作流程","slug":"工作流程","link":"#工作流程","children":[]}]},{"level":3,"title":"4.4 混合持久化的加载流程","slug":"_4-4-混合持久化的加载流程","link":"#_4-4-混合持久化的加载流程","children":[]},{"level":3,"title":"4.5 混合持久化的优缺点","slug":"_4-5-混合持久化的优缺点","link":"#_4-5-混合持久化的优缺点","children":[{"level":4,"title":"优点","slug":"优点","link":"#优点","children":[]},{"level":4,"title":"缺点","slug":"缺点","link":"#缺点","children":[]}]},{"level":3,"title":"4.6 混合持久化最佳实践","slug":"_4-6-混合持久化最佳实践","link":"#_4-6-混合持久化最佳实践","children":[]}]},{"level":2,"title":"五、持久化选择策略","slug":"五、持久化选择策略","link":"#五、持久化选择策略","children":[{"level":3,"title":"5.1 何时使用 RDB","slug":"_5-1-何时使用-rdb","link":"#_5-1-何时使用-rdb","children":[]},{"level":3,"title":"5.2 何时使用 AOF","slug":"_5-2-何时使用-aof","link":"#_5-2-何时使用-aof","children":[]},{"level":3,"title":"5.3 混合持久化建议","slug":"_5-3-混合持久化建议","link":"#_5-3-混合持久化建议","children":[]},{"level":3,"title":"5.4 各方式对比总结","slug":"_5-4-各方式对比总结","link":"#_5-4-各方式对比总结","children":[]},{"level":3,"title":"5.5 双保险策略","slug":"_5-5-双保险策略","link":"#_5-5-双保险策略","children":[]}]},{"level":2,"title":"六、实战：持久化配置与验证","slug":"六、实战-持久化配置与验证","link":"#六、实战-持久化配置与验证","children":[{"level":3,"title":"6.1 查看当前持久化状态","slug":"_6-1-查看当前持久化状态","link":"#_6-1-查看当前持久化状态","children":[]},{"level":3,"title":"6.2 配置 RDB 持久化","slug":"_6-2-配置-rdb-持久化","link":"#_6-2-配置-rdb-持久化","children":[]},{"level":3,"title":"6.3 配置 AOF 持久化","slug":"_6-3-配置-aof-持久化","link":"#_6-3-配置-aof-持久化","children":[]},{"level":3,"title":"6.4 配置混合持久化","slug":"_6-4-配置混合持久化","link":"#_6-4-配置混合持久化","children":[]},{"level":3,"title":"6.5 数据恢复验证","slug":"_6-5-数据恢复验证","link":"#_6-5-数据恢复验证","children":[]},{"level":3,"title":"6.6 RDB 文件的导入与导出","slug":"_6-6-rdb-文件的导入与导出","link":"#_6-6-rdb-文件的导入与导出","children":[]}]},{"level":2,"title":"七、常见面试题","slug":"七、常见面试题","link":"#七、常见面试题","children":[{"level":3,"title":"7.1 RDB 相关","slug":"_7-1-rdb-相关","link":"#_7-1-rdb-相关","children":[]},{"level":3,"title":"7.2 AOF 相关","slug":"_7-2-aof-相关","link":"#_7-2-aof-相关","children":[]},{"level":3,"title":"7.3 混合持久化相关","slug":"_7-3-混合持久化相关","link":"#_7-3-混合持久化相关","children":[]},{"level":3,"title":"7.4 综合问题","slug":"_7-4-综合问题","link":"#_7-4-综合问题","children":[]}]},{"level":2,"title":"本章小结","slug":"本章小结","link":"#本章小结","children":[]},{"level":2,"title":"参考文献","slug":"参考文献","link":"#参考文献","children":[]}],"relativePath":"redis/core/持久化机制.md","filePath":"redis/core/持久化机制.md"}'),p={name:"redis/core/持久化机制.md"};function e(t,s,r,d,h,c){return n(),i("div",null,[...s[0]||(s[0]=[l(`<h1 id="redis-持久化机制-从-rdb-到-aof-的深度剖析" tabindex="-1">Redis 持久化机制：从 RDB 到 AOF 的深度剖析 <a class="header-anchor" href="#redis-持久化机制-从-rdb-到-aof-的深度剖析" aria-label="Permalink to “Redis 持久化机制：从 RDB 到 AOF 的深度剖析”">​</a></h1><h2 id="一、持久化概述" tabindex="-1">一、持久化概述 <a class="header-anchor" href="#一、持久化概述" aria-label="Permalink to “一、持久化概述”">​</a></h2><h3 id="_1-1-为什么需要持久化" tabindex="-1">1.1 为什么需要持久化 <a class="header-anchor" href="#_1-1-为什么需要持久化" aria-label="Permalink to “1.1 为什么需要持久化”">​</a></h3><p>Redis 是一款<strong>基于内存的键值对存储系统</strong>，所有数据都驻留在内存中。这意味着一旦 Redis 进程退出或服务器断电，内存中的数据将全部丢失。</p><p>然而，在实际生产环境中，Redis 往往承担着缓存、会话存储、计数器、排行榜等核心业务角色。数据丢失意味着：</p><ul><li><strong>业务中断</strong>：缓存穿透导致数据库瞬间承受巨大压力</li><li><strong>用户体验下降</strong>：会话丢失导致用户需要重新登录</li><li><strong>数据不一致</strong>：计数器、排行榜等数据需要重新计算</li></ul><p>因此，Redis 提供了将内存数据持久化到磁盘的机制，确保数据在重启后能够恢复。</p><h3 id="_1-2-redis-持久化的设计哲学" tabindex="-1">1.2 Redis 持久化的设计哲学 <a class="header-anchor" href="#_1-2-redis-持久化的设计哲学" aria-label="Permalink to “1.2 Redis 持久化的设计哲学”">​</a></h3><p>Redis 的持久化机制遵循其<strong>极简、高效、灵活</strong>的设计哲学：</p><table tabindex="0"><thead><tr><th>设计原则</th><th>说明</th></tr></thead><tbody><tr><td><strong>选择性持久化</strong></td><td>用户可以根据业务需求选择合适的持久化方式</td></tr><tr><td><strong>高性能优先</strong></td><td>在持久化过程中尽量减少对主线程的影响</td></tr><tr><td><strong>简单可靠</strong></td><td>文件格式简单，易于理解和调试</td></tr><tr><td><strong>灵活组合</strong></td><td>支持多种持久化方式的组合使用</td></tr></tbody></table><h3 id="_1-3-redis-持久化方式总览" tabindex="-1">1.3 Redis 持久化方式总览 <a class="header-anchor" href="#_1-3-redis-持久化方式总览" aria-label="Permalink to “1.3 Redis 持久化方式总览”">​</a></h3><p>Redis 提供了三种持久化方式，各有侧重：</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>┌─────────────────────────────────────────────────────────────────┐</span></span>
<span class="line"><span>│                    Redis 持久化机制                              │</span></span>
<span class="line"><span>├─────────────────────────────────────────────────────────────────┤</span></span>
<span class="line"><span>│                                                                 │</span></span>
<span class="line"><span>│  ┌─────────────────────┐  ┌─────────────────────┐              │</span></span>
<span class="line"><span>│  │   RDB (快照)         │  │   AOF (追加日志)      │              │</span></span>
<span class="line"><span>│  │                     │  │                     │              │</span></span>
<span class="line"><span>│  │ • 数据快照           │  │ • 写命令日志         │              │</span></span>
<span class="line"><span>│  │ • 紧凑二进制格式     │  │ • 可读性强           │              │</span></span>
<span class="line"><span>│  │ • 恢复速度快         │  │ • 数据安全性高       │              │</span></span>
<span class="line"><span>│  │ • 可能丢失最后数据   │  │ • 文件体积大         │              │</span></span>
<span class="line"><span>│  └─────────────────────┘  └─────────────────────┘              │</span></span>
<span class="line"><span>│                                                                 │</span></span>
<span class="line"><span>│         ┌─────────────────────────────────┐                     │</span></span>
<span class="line"><span>│         │   混合持久化 (4.0+)               │                     │</span></span>
<span class="line"><span>│         │                                 │                     │</span></span>
<span class="line"><span>│         │   RDB 前缀 + AOF 增量             │                     │</span></span>
<span class="line"><span>│         │   兼顾恢复速度与数据安全           │                     │</span></span>
<span class="line"><span>│         └─────────────────────────────────┘                     │</span></span>
<span class="line"><span>│                                                                 │</span></span>
<span class="line"><span>└─────────────────────────────────────────────────────────────────┘</span></span></code></pre></div><hr><h2 id="二、rdb-redis-database" tabindex="-1">二、RDB（Redis DataBase） <a class="header-anchor" href="#二、rdb-redis-database" aria-label="Permalink to “二、RDB（Redis DataBase）”">​</a></h2><h3 id="_2-1-rdb-概述" tabindex="-1">2.1 RDB 概述 <a class="header-anchor" href="#_2-1-rdb-概述" aria-label="Permalink to “2.1 RDB 概述”">​</a></h3><p>RDB 是 Redis 最经典的持久化方式，它会在<strong>特定的时间点</strong>将<strong>当前内存中的数据快照</strong>以<strong>二进制格式</strong>写入磁盘文件。</p><p>RDB 的核心思想可以概括为一句话：<strong>在某个时间点拍一张照片，保存下来，出问题了就从照片恢复</strong>。</p><h3 id="_2-2-rdb-文件结构" tabindex="-1">2.2 RDB 文件结构 <a class="header-anchor" href="#_2-2-rdb-文件结构" aria-label="Permalink to “2.2 RDB 文件结构”">​</a></h3><p>RDB 文件是一个二进制格式的文件，结构清晰，包含以下几个部分：</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>┌─────────────────────────────────────────────────────────────┐</span></span>
<span class="line"><span>│                      RDB 文件结构                             │</span></span>
<span class="line"><span>├─────────────────────────────────────────────────────────────┤</span></span>
<span class="line"><span>│                                                             │</span></span>
<span class="line"><span>│  ┌───────────────────────────────────────────────────────┐ │</span></span>
<span class="line"><span>│  │  开头部分 (Header)                                     │ │</span></span>
<span class="line"><span>│  │  ┌──────────┬──────────┬──────────┬────────────────┐ │ │</span></span>
<span class="line"><span>│  │  │ &quot;REDIS&quot;   │ 版本号    │ 创建时间  │ Redis 版本信息  │ │ │</span></span>
<span class="line"><span>│  │  │ (5字节)   │ (4字节)   │ (8字节)  │ (变长)          │ │ │</span></span>
<span class="line"><span>│  │  └──────────┴──────────┴──────────┴────────────────┘ │ │</span></span>
<span class="line"><span>│  └───────────────────────────────────────────────────────┘ │</span></span>
<span class="line"><span>│                                                             │</span></span>
<span class="line"><span>│  ┌───────────────────────────────────────────────────────┐ │</span></span>
<span class="line"><span>│  │  数据库内容部分 (Data Section)                          │ │</span></span>
<span class="line"><span>│  │  ┌──────────┬──────────┬──────────┬────────────────┐ │ │</span></span>
<span class="line"><span>│  │  │ 数据库编号 │ 键值对数据 │ 过期时间  │ ...            │ │ │</span></span>
<span class="line"><span>│  │  │ (1字节)  │ (变长)   │ (8字节)  │                │ │ │</span></span>
<span class="line"><span>│  │  └──────────┴──────────┴──────────┴────────────────┘ │ │</span></span>
<span class="line"><span>│  │                                                       │ │ │</span></span>
<span class="line"><span>│  │  每个键值对包括:                                       │ │ │</span></span>
<span class="line"><span>│  │  ┌──────────┬──────────┬──────────┬────────────────┐ │ │ │</span></span>
<span class="line"><span>│  │  │ 类型标识  │ 键名      │ 值数据    │ 过期时间(可选)  │ │ │ │</span></span>
<span class="line"><span>│  │  │ (1字节)  │ (变长)   │ (变长)   │ (8字节)        │ │ │ │</span></span>
<span class="line"><span>│  │  └──────────┴──────────┴──────────┴────────────────┘ │ │ │</span></span>
<span class="line"><span>│  └───────────────────────────────────────────────────────┘ │</span></span>
<span class="line"><span>│                                                             │</span></span>
<span class="line"><span>│  ┌───────────────────────────────────────────────────────┐ │</span></span>
<span class="line"><span>│  │  结束部分 (Footer)                                     │ │</span></span>
<span class="line"><span>│  │  ┌──────────┬──────────┬──────────┐                    │ │</span></span>
<span class="line"><span>│  │  │ &quot;EOF&quot;    │ 校验和    │ 长度      │                    │ │</span></span>
<span class="line"><span>│  │  │ (1字节)  │ (8字节)  │ (8字节)  │                    │ │</span></span>
<span class="line"><span>│  │  └──────────┴──────────┴──────────┘                    │ │</span></span>
<span class="line"><span>│  └───────────────────────────────────────────────────────┘ │</span></span>
<span class="line"><span>│                                                             │</span></span>
<span class="line"><span>└─────────────────────────────────────────────────────────────┘</span></span></code></pre></div><h4 id="rdb-文件各字段详解" tabindex="-1">RDB 文件各字段详解 <a class="header-anchor" href="#rdb-文件各字段详解" aria-label="Permalink to “RDB 文件各字段详解”">​</a></h4><table tabindex="0"><thead><tr><th>字段</th><th>长度</th><th>说明</th></tr></thead><tbody><tr><td><code>REDIS</code></td><td>5 字节</td><td>固定标识，标识这是一个 RDB 文件</td></tr><tr><td>版本号</td><td>4 字节</td><td>RDB 文件格式版本号，不同版本的 Redis 可能不兼容</td></tr><tr><td>创建时间</td><td>8 字节</td><td>RDB 文件的创建时间（Unix 时间戳）</td></tr><tr><td>Redis 版本</td><td>变长</td><td>生成该 RDB 文件的 Redis 版本号</td></tr><tr><td>数据库编号</td><td>1 字节</td><td>标识当前保存的是哪个数据库（0-15）</td></tr><tr><td>键值对数据</td><td>变长</td><td>实际的键值对序列化数据</td></tr><tr><td>过期时间</td><td>8 字节</td><td>键的过期时间（如果设置了的话）</td></tr><tr><td>EOF 标识</td><td>1 字节</td><td>固定值 0xFF，标识数据部分结束</td></tr><tr><td>校验和</td><td>8 字节</td><td>对整个 RDB 文件内容的 CRC64 校验和</td></tr><tr><td>长度信息</td><td>8 字节</td><td>RDB 文件的总长度</td></tr></tbody></table><h4 id="使用-rdb-tools-解析-rdb-文件" tabindex="-1">使用 rdb-tools 解析 RDB 文件 <a class="header-anchor" href="#使用-rdb-tools-解析-rdb-文件" aria-label="Permalink to “使用 rdb-tools 解析 RDB 文件”">​</a></h4><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 安装 rdb-tools（Python 实现）</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">pip</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> install</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> rdbtools</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 解析 RDB 文件</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">rdb</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> dump.rdb</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 输出:</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># database: 0</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># type: string</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># key: user:1001</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># value: &quot;张三&quot;</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># expiry: 1700000000</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># ...</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 生成 JSON 格式的统计</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">rdb</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -c</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> json</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> dump.rdb</span></span></code></pre></div><h3 id="_2-3-触发方式" tabindex="-1">2.3 触发方式 <a class="header-anchor" href="#_2-3-触发方式" aria-label="Permalink to “2.3 触发方式”">​</a></h3><p>RDB 的触发方式主要分为四类：</p><h4 id="save-命令触发" tabindex="-1">save 命令触发 <a class="header-anchor" href="#save-命令触发" aria-label="Permalink to “save 命令触发”">​</a></h4><div class="language-redis"><button title="Copy Code" class="copy"></button><span class="lang">redis</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span># 同步保存（阻塞主线程）</span></span>
<span class="line"><span>SAVE</span></span>
<span class="line"><span># Redis 会阻塞，直到 RDB 文件保存完成</span></span>
<span class="line"><span># 不推荐在生产环境使用</span></span></code></pre></div><p><code>SAVE</code> 命令会阻塞 Redis 主线程，直到 RDB 文件创建完成。在数据量较大时，可能导致 Redis 长时间无法响应请求。</p><h4 id="bgsave-命令触发" tabindex="-1">bgsave 命令触发 <a class="header-anchor" href="#bgsave-命令触发" aria-label="Permalink to “bgsave 命令触发”">​</a></h4><div class="language-redis"><button title="Copy Code" class="copy"></button><span class="lang">redis</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span># 异步保存（非阻塞，推荐使用）</span></span>
<span class="line"><span>BGSAVE</span></span>
<span class="line"><span># Redis 会 fork 一个子进程来完成 RDB 保存</span></span>
<span class="line"><span># 主线程继续处理客户端请求</span></span></code></pre></div><p><code>BGSAVE</code> 是 RDB 持久化的推荐方式。Redis 主进程通过 <code>fork()</code> 系统调用创建一个子进程，由子进程完成 RDB 文件的写入工作，主进程继续服务。</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>BGSAVE 执行流程:</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  主进程                           子进程</span></span>
<span class="line"><span>  ┌───────────┐                 ┌───────────┐</span></span>
<span class="line"><span>  │ 接收 BGSAVE │                 │           │</span></span>
<span class="line"><span>  │  命令       │                 │           │</span></span>
<span class="line"><span>  └──────┬──────┘                 │           │</span></span>
<span class="line"><span>         │                        │           │</span></span>
<span class="line"><span>         │ fork()                 │           │</span></span>
<span class="line"><span>         ├──────────────────────►│           │</span></span>
<span class="line"><span>         │                        │ 开始写入  │</span></span>
<span class="line"><span>  继续处理              复制内存数据到 RDB 文件</span></span>
<span class="line"><span>  客户端请求              │</span></span>
<span class="line"><span>  │                        │           │</span></span>
<span class="line"><span>  │                        │ 写入完成  │</span></span>
<span class="line"><span>  │◄───────────────────────┤           │</span></span>
<span class="line"><span>  │ 日志记录完成信息        │ 退出      │</span></span>
<span class="line"><span>  └───────────┘                 └───────────┘</span></span></code></pre></div><h4 id="自动触发" tabindex="-1">自动触发 <a class="header-anchor" href="#自动触发" aria-label="Permalink to “自动触发”">​</a></h4><p>通过 <code>redis.conf</code> 中的 <code>save</code> 规则配置自动触发：</p><div class="language-conf"><button title="Copy Code" class="copy"></button><span class="lang">conf</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span># save 规则格式: save &lt;seconds&gt; &lt;changes&gt;</span></span>
<span class="line"><span># 表示在 seconds 秒内，至少有 changes 次写操作，则自动触发 BGSAVE</span></span>
<span class="line"><span></span></span>
<span class="line"><span># Redis 默认配置:</span></span>
<span class="line"><span>save 3600 1      # 3600 秒（1小时）内至少 1 次写操作</span></span>
<span class="line"><span>save 300 10      # 300 秒（5分钟）内至少 10 次写操作</span></span>
<span class="line"><span>save 60 10000    # 60 秒（1分钟）内至少 10000 次写操作</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 满足任一条件即触发 BGSAVE</span></span>
<span class="line"><span># 如果同时满足多个条件，只触发一次</span></span></code></pre></div><h4 id="flushall-flushdb-触发" tabindex="-1">flushall / flushdb 触发 <a class="header-anchor" href="#flushall-flushdb-触发" aria-label="Permalink to “flushall / flushdb 触发”">​</a></h4><div class="language-redis"><button title="Copy Code" class="copy"></button><span class="lang">redis</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span># FLUSHALL 和 FLUSHDB 命令执行后</span></span>
<span class="line"><span># Redis 会自动触发一次 BGSAVE</span></span>
<span class="line"><span>FLUSHALL</span></span>
<span class="line"><span># 清空所有数据库后自动保存</span></span></code></pre></div><p>这是因为 <code>FLUSHALL</code> 会清除所有数据，Redis 会自动触发 BGSAVE 来保存一个空的 RDB 文件，防止误操作导致数据完全丢失。</p><h3 id="_2-4-save-vs-bgsave-对比" tabindex="-1">2.4 save vs bgsave 对比 <a class="header-anchor" href="#_2-4-save-vs-bgsave-对比" aria-label="Permalink to “2.4 save vs bgsave 对比”">​</a></h3><table tabindex="0"><thead><tr><th>对比维度</th><th>SAVE</th><th>BGSAVE</th></tr></thead><tbody><tr><td><strong>执行方式</strong></td><td>同步，阻塞主线程</td><td>异步，fork 子进程</td></tr><tr><td><strong>对客户端影响</strong></td><td>所有请求被阻塞</td><td>无影响，继续服务</td></tr><tr><td><strong>内存开销</strong></td><td>无额外开销</td><td>fork 产生的内存拷贝</td></tr><tr><td><strong>执行速度</strong></td><td>较快（无 fork 开销）</td><td>略慢（需要 fork）</td></tr><tr><td><strong>适用场景</strong></td><td>数据量小时可临时使用</td><td>生产环境首选</td></tr><tr><td><strong>推荐程度</strong></td><td>❌ 不推荐</td><td>✅ 推荐使用</td></tr></tbody></table><h3 id="_2-5-自动保存配置详解" tabindex="-1">2.5 自动保存配置详解 <a class="header-anchor" href="#_2-5-自动保存配置详解" aria-label="Permalink to “2.5 自动保存配置详解”">​</a></h3><h4 id="save-规则配置" tabindex="-1">save 规则配置 <a class="header-anchor" href="#save-规则配置" aria-label="Permalink to “save 规则配置”">​</a></h4><div class="language-conf"><button title="Copy Code" class="copy"></button><span class="lang">conf</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span># 查看当前 save 规则</span></span>
<span class="line"><span>redis-cli CONFIG GET save</span></span>
<span class="line"><span># 输出: &quot;3600 1 300 10 60 10000&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 动态修改 save 规则（立即生效，无需重启）</span></span>
<span class="line"><span>redis-cli CONFIG SET save &quot;60 1000&quot;</span></span>
<span class="line"><span># 表示 60 秒内至少 1000 次写操作就保存</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 取消所有 save 规则</span></span>
<span class="line"><span>redis-cli CONFIG SET save &quot;&quot;</span></span>
<span class="line"><span># 设置为空字符串表示禁用 RDB 自动保存</span></span></code></pre></div><h4 id="stop-writes-on-bgsave-error-配置" tabindex="-1">stop-writes-on-bgsave-error 配置 <a class="header-anchor" href="#stop-writes-on-bgsave-error-配置" aria-label="Permalink to “stop-writes-on-bgsave-error 配置”">​</a></h4><div class="language-conf"><button title="Copy Code" class="copy"></button><span class="lang">conf</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span># 当 BGSAVE 出错时，是否停止写入</span></span>
<span class="line"><span># 默认值: yes（推荐保持默认）</span></span>
<span class="line"><span>stop-writes-on-bgsave-error yes</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 设置为 yes 时:</span></span>
<span class="line"><span># 如果 BGSAVE 失败（如磁盘空间不足），Redis 会拒绝所有写操作</span></span>
<span class="line"><span># 这样可以防止数据丢失</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 设置为 no 时:</span></span>
<span class="line"><span># 即使 BGSAVE 失败，Redis 仍然继续接受写操作</span></span>
<span class="line"><span># 可能导致数据在内存中丢失</span></span></code></pre></div><h3 id="_2-6-rdb-文件压缩与校验" tabindex="-1">2.6 RDB 文件压缩与校验 <a class="header-anchor" href="#_2-6-rdb-文件压缩与校验" aria-label="Permalink to “2.6 RDB 文件压缩与校验”">​</a></h3><h4 id="rdb-文件压缩" tabindex="-1">RDB 文件压缩 <a class="header-anchor" href="#rdb-文件压缩" aria-label="Permalink to “RDB 文件压缩”">​</a></h4><div class="language-conf"><button title="Copy Code" class="copy"></button><span class="lang">conf</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span># 是否对 RDB 文件进行压缩</span></span>
<span class="line"><span># 默认值: yes</span></span>
<span class="line"><span>rdbcompression yes</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 使用 LZF 压缩算法</span></span>
<span class="line"><span># 压缩率通常在 50%~70% 之间</span></span>
<span class="line"><span># 压缩 CPU 开销较小，但可以节省大量磁盘空间</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 关闭压缩:</span></span>
<span class="line"><span>rdbcompression no</span></span>
<span class="line"><span># 文件更大，但节省 CPU 资源</span></span>
<span class="line"><span># 适用于磁盘空间充足且 CPU 紧张的场景</span></span></code></pre></div><h4 id="rdb-文件校验" tabindex="-1">RDB 文件校验 <a class="header-anchor" href="#rdb-文件校验" aria-label="Permalink to “RDB 文件校验”">​</a></h4><div class="language-conf"><button title="Copy Code" class="copy"></button><span class="lang">conf</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span># 是否对 RDB 文件进行校验</span></span>
<span class="line"><span># 默认值: yes</span></span>
<span class="line"><span>rdbchecksum yes</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 开启校验:</span></span>
<span class="line"><span># 在 RDB 文件末尾添加 CRC64 校验和</span></span>
<span class="line"><span># 加载时会校验文件是否损坏</span></span>
<span class="line"><span># 开销很小，推荐保持开启</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 关闭校验:</span></span>
<span class="line"><span>rdbchecksum no</span></span>
<span class="line"><span># 文件末尾不添加校验和</span></span>
<span class="line"><span># 加载时跳过校验，加载速度略快</span></span>
<span class="line"><span># 不推荐关闭，除非对加载速度有极致要求</span></span></code></pre></div><h4 id="rdb-文件命名与路径" tabindex="-1">RDB 文件命名与路径 <a class="header-anchor" href="#rdb-文件命名与路径" aria-label="Permalink to “RDB 文件命名与路径”">​</a></h4><div class="language-conf"><button title="Copy Code" class="copy"></button><span class="lang">conf</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span># RDB 文件名</span></span>
<span class="line"><span>dbfilename dump.rdb</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 可以使用动态文件名</span></span>
<span class="line"><span># dbfilename dump_\${port}.rdb</span></span>
<span class="line"><span># dbfilename dump_\${date}.rdb</span></span>
<span class="line"><span></span></span>
<span class="line"><span># RDB 文件保存目录</span></span>
<span class="line"><span>dir /var/lib/redis</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 查看当前 RDB 文件路径</span></span>
<span class="line"><span>redis-cli CONFIG GET dir</span></span>
<span class="line"><span>redis-cli CONFIG GET dbfilename</span></span></code></pre></div><h3 id="_2-7-rdb-的优缺点" tabindex="-1">2.7 RDB 的优缺点 <a class="header-anchor" href="#_2-7-rdb-的优缺点" aria-label="Permalink to “2.7 RDB 的优缺点”">​</a></h3><h4 id="rdb-的优点" tabindex="-1">RDB 的优点 <a class="header-anchor" href="#rdb-的优点" aria-label="Permalink to “RDB 的优点”">​</a></h4><table tabindex="0"><thead><tr><th>优点</th><th>说明</th></tr></thead><tbody><tr><td><strong>文件紧凑</strong></td><td>RDB 文件是压缩的二进制格式，体积小，适合备份和传输</td></tr><tr><td><strong>恢复速度快</strong></td><td>直接从二进制格式加载，恢复速度比 AOF 快数倍</td></tr><tr><td><strong>性能影响小</strong></td><td>BGSAVE 通过 fork 子进程实现，对主线程影响极小</td></tr><tr><td><strong>数据可用性高</strong></td><td>RDB 文件包含某个时间点的完整数据快照，即使 Redis 损坏也可恢复</td></tr><tr><td><strong>适合冷备份</strong></td><td>可以定时将 RDB 文件备份到远程服务器，实现冷备份</td></tr></tbody></table><h4 id="rdb-的缺点" tabindex="-1">RDB 的缺点 <a class="header-anchor" href="#rdb-的缺点" aria-label="Permalink to “RDB 的缺点”">​</a></h4><table tabindex="0"><thead><tr><th>缺点</th><th>说明</th></tr></thead><tbody><tr><td><strong>数据丢失风险</strong></td><td>两次 BGSAVE 之间的数据可能丢失，最多丢失 15 分钟的数据</td></tr><tr><td><strong>fork 开销</strong></td><td>fork 子进程需要拷贝父进程的内存空间，大数据量时开销大</td></tr><tr><td><strong>内存峰值</strong></td><td>BGSAVE 期间，子进程与父进程共享内存，写入操作会触发 Copy-On-Write，导致内存峰值约为平时的 2 倍</td></tr><tr><td><strong>只能恢复到某个时间点</strong></td><td>无法恢复到精确的某个操作点</td></tr></tbody></table><h4 id="rdb-数据丢失场景分析" tabindex="-1">RDB 数据丢失场景分析 <a class="header-anchor" href="#rdb-数据丢失场景分析" aria-label="Permalink to “RDB 数据丢失场景分析”">​</a></h4><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>时间线:</span></span>
<span class="line"><span>  T0: BGSAVE 完成，生成 RDB 文件</span></span>
<span class="line"><span>  T1: 写入 key1, key2, key3</span></span>
<span class="line"><span>  T2: 写入 key4, key5</span></span>
<span class="line"><span>  T3: Redis 崩溃！</span></span>
<span class="line"><span>  </span></span>
<span class="line"><span>结果: key1~key5 全部丢失，因为它们都在最后一次 BGSAVE 之后</span></span>
<span class="line"><span></span></span>
<span class="line"><span>最坏情况下丢失的数据量:</span></span>
<span class="line"><span>  = save 规则的最大间隔时间内的写操作</span></span>
<span class="line"><span>  = max(3600秒/1次, 300秒/10次, 60秒/10000次)</span></span>
<span class="line"><span>  = 3600 秒（1小时）</span></span></code></pre></div><hr><h2 id="三、aof-append-only-file" tabindex="-1">三、AOF（Append Only File） <a class="header-anchor" href="#三、aof-append-only-file" aria-label="Permalink to “三、AOF（Append Only File）”">​</a></h2><h3 id="_3-1-aof-概述" tabindex="-1">3.1 AOF 概述 <a class="header-anchor" href="#_3-1-aof-概述" aria-label="Permalink to “3.1 AOF 概述”">​</a></h3><p>AOF 是 Redis 的另一种持久化方式，它<strong>不保存数据本身</strong>，而是将<strong>每一个写命令</strong>以 Redis 协议的格式<strong>追加</strong>到一个日志文件中。当 Redis 重启时，会重新执行 AOF 文件中的所有命令，恢复到崩溃前的状态。</p><p>AOF 的核心思想可以概括为一句话：<strong>把所有写操作都记下来，出问题了就从头重做一遍</strong>。</p><h3 id="_3-2-aof-刷写策略" tabindex="-1">3.2 AOF 刷写策略 <a class="header-anchor" href="#_3-2-aof-刷写策略" aria-label="Permalink to “3.2 AOF 刷写策略”">​</a></h3><p>AOF 的刷写策略决定了写命令何时从缓冲区写入磁盘文件，是 AOF 性能与数据安全平衡的关键。</p><h4 id="三种刷写策略" tabindex="-1">三种刷写策略 <a class="header-anchor" href="#三种刷写策略" aria-label="Permalink to “三种刷写策略”">​</a></h4><div class="language-conf"><button title="Copy Code" class="copy"></button><span class="lang">conf</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span># AOF 刷写策略</span></span>
<span class="line"><span># 可选值: always / everysec / no</span></span>
<span class="line"><span>appendfsync everysec</span></span></code></pre></div><table tabindex="0"><thead><tr><th>策略</th><th>说明</th><th>数据安全性</th><th>性能</th></tr></thead><tbody><tr><td><code>always</code></td><td>每次写操作都同步到磁盘</td><td>最高（不丢数据）</td><td>最低（每次都 fsync）</td></tr><tr><td><code>everysec</code></td><td>每秒同步一次到磁盘</td><td>较高（最多丢 1 秒数据）</td><td>较高（每秒一次 fsync）</td></tr><tr><td><code>no</code></td><td>由操作系统决定同步时机</td><td>最低（丢数据不可控）</td><td>最高（完全异步）</td></tr></tbody></table><h4 id="三种策略的详细分析" tabindex="-1">三种策略的详细分析 <a class="header-anchor" href="#三种策略的详细分析" aria-label="Permalink to “三种策略的详细分析”">​</a></h4><p><strong>always 策略：</strong></p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>写请求流程:</span></span>
<span class="line"><span>  1. 客户端发送写命令</span></span>
<span class="line"><span>  2. Redis 执行命令，写入 AOF 缓冲区</span></span>
<span class="line"><span>  3. 立即调用 fsync() 将缓冲区数据刷入磁盘</span></span>
<span class="line"><span>  4. 返回成功给客户端</span></span>
<span class="line"><span></span></span>
<span class="line"><span>特点:</span></span>
<span class="line"><span>  - 最安全，每次写操作都持久化</span></span>
<span class="line"><span>  - 最慢，每次写操作都触发磁盘 I/O</span></span>
<span class="line"><span>  - 适用于对数据安全要求极高的场景</span></span></code></pre></div><p><strong>everysec 策略（推荐）：</strong></p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>写请求流程:</span></span>
<span class="line"><span>  1. 客户端发送写命令</span></span>
<span class="line"><span>  2. Redis 执行命令，写入 AOF 缓冲区</span></span>
<span class="line"><span>  3. 返回成功给客户端（不等 fsync 完成）</span></span>
<span class="line"><span>  4. 后台线程每秒将缓冲区数据 fsync 到磁盘</span></span>
<span class="line"><span></span></span>
<span class="line"><span>特点:</span></span>
<span class="line"><span>  - 安全性较高，最多丢失 1 秒数据</span></span>
<span class="line"><span>  - 性能较好，每秒一次 fsync</span></span>
<span class="line"><span>  - Redis 默认推荐的策略</span></span>
<span class="line"><span>  - 实际生产中使用最广泛</span></span></code></pre></div><p><strong>no 策略：</strong></p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>写请求流程:</span></span>
<span class="line"><span>  1. 客户端发送写命令</span></span>
<span class="line"><span>  2. Redis 执行命令，写入 AOF 缓冲区</span></span>
<span class="line"><span>  3. 返回成功给客户端</span></span>
<span class="line"><span>  4. 操作系统决定何时将缓冲区数据刷入磁盘</span></span>
<span class="line"><span></span></span>
<span class="line"><span>特点:</span></span>
<span class="line"><span>  - 性能最高，完全由操作系统控制</span></span>
<span class="line"><span>  - 安全性最低，丢失数据的时机不可控</span></span>
<span class="line"><span>  - 一般不推荐使用</span></span></code></pre></div><h4 id="三种策略的性能对比" tabindex="-1">三种策略的性能对比 <a class="header-anchor" href="#三种策略的性能对比" aria-label="Permalink to “三种策略的性能对比”">​</a></h4><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>性能对比（概念演示，非基准测试数据）:</span></span>
<span class="line"><span></span></span>
<span class="line"><span>always:   | 写 | fsync | 写 | fsync | 写 | fsync |</span></span>
<span class="line"><span>          └──1ms──┘└──5ms──┘└──1ms──┘└──5ms──┘</span></span>
<span class="line"><span>          每次写需要等待 fsync，性能最低</span></span>
<span class="line"><span></span></span>
<span class="line"><span>everysec: | 写 | 写 | 写 | 写 |  fsync  | 写 | 写 |</span></span>
<span class="line"><span>          └──1ms──┘└──1ms──┘└──1ms──┘└──1ms──┘└──5ms──┘</span></span>
<span class="line"><span>          写操作不等待 fsync，每秒同步一次</span></span>
<span class="line"><span></span></span>
<span class="line"><span>no:       | 写 | 写 | 写 | 写 | 写 | 写 |</span></span>
<span class="line"><span>          └──1ms──┘└──1ms──┘└──1ms──┘└──1ms──┘</span></span>
<span class="line"><span>          完全不等待 fsync，性能最高</span></span></code></pre></div><h3 id="_3-3-aof-文件结构" tabindex="-1">3.3 AOF 文件结构 <a class="header-anchor" href="#_3-3-aof-文件结构" aria-label="Permalink to “3.3 AOF 文件结构”">​</a></h3><p>AOF 文件采用 <strong>Redis 协议（RESP）</strong> 格式存储写命令，具有良好的可读性。</p><h4 id="resp-协议格式" tabindex="-1">RESP 协议格式 <a class="header-anchor" href="#resp-协议格式" aria-label="Permalink to “RESP 协议格式”">​</a></h4><p>RESP（Redis Serialization Protocol）是 Redis 的通信协议，具有简单、高效、易解析的特点。</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>RESP 数据类型:</span></span>
<span class="line"><span>  - 简单字符串: +OK\\r\\n</span></span>
<span class="line"><span>  - 错误消息: -ERR message\\r\\n</span></span>
<span class="line"><span>  - 整数: :1000\\r\\n</span></span>
<span class="line"><span>  - 批量字符串: $5\\r\\nhello\\r\\n</span></span>
<span class="line"><span>  - 数组: *2\\r\\n$4\\r\\nSET\\r\\n$7\\r\\nmykey\\r\\n</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  特殊标记:</span></span>
<span class="line"><span>  - \\r\\n 作为分隔符</span></span>
<span class="line"><span>  - 批量字符串以 $ 开头，后跟长度</span></span>
<span class="line"><span>  - 数组以 * 开头，后跟元素数量</span></span></code></pre></div><h4 id="aof-文件内容示例" tabindex="-1">AOF 文件内容示例 <a class="header-anchor" href="#aof-文件内容示例" aria-label="Permalink to “AOF 文件内容示例”">​</a></h4><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span># AOF 文件实际内容（十六进制视图）</span></span>
<span class="line"><span>*3\\r\\n$3\\r\\nSET\\r\\n$6\\r\\nmykey\\r\\n$5\\r\\nhello\\r\\n</span></span>
<span class="line"><span>*3\\r\\n$3\\r\\nSET\\r\\n$7\\r\\nmyvalue\\r\\n$5\\r\\nworld\\r\\n</span></span>
<span class="line"><span>*3\\r\\n$3\\r\\nINCR\\r\\n$7\\r\\ncounter\\r\\n</span></span>
<span class="line"><span>*3\\r\\n$3\\r\\nDEL\\r\\n$7\\r\\nmykey\\r\\n</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 解析后的等价命令:</span></span>
<span class="line"><span>SET mykey hello</span></span>
<span class="line"><span>SET myvalue world</span></span>
<span class="line"><span>INCR counter</span></span>
<span class="line"><span>DEL mykey</span></span></code></pre></div><h4 id="aof-文件结构示意图" tabindex="-1">AOF 文件结构示意图 <a class="header-anchor" href="#aof-文件结构示意图" aria-label="Permalink to “AOF 文件结构示意图”">​</a></h4><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>┌─────────────────────────────────────────────────────────────────┐</span></span>
<span class="line"><span>│                      AOF 文件结构                                 │</span></span>
<span class="line"><span>├─────────────────────────────────────────────────────────────────┤</span></span>
<span class="line"><span>│                                                                 │</span></span>
<span class="line"><span>│  ┌─────────────────────────────────────────────────────────┐   │</span></span>
<span class="line"><span>│  │  AOF 重写标记 (可选, 仅在重写时存在)                      │   │</span></span>
<span class="line"><span>│  │  ┌──────────┬──────────┬──────────┬──────────────────┐ │   │</span></span>
<span class="line"><span>│  │  │ &quot;REDIS&quot;   │ 版本号    │ AOF 前长度 │ ...              │ │   │</span></span>
<span class="line"><span>│  │  └──────────┴──────────┴──────────┴──────────────────┘ │   │</span></span>
<span class="line"><span>│  └─────────────────────────────────────────────────────────┘   │</span></span>
<span class="line"><span>│                                                                 │</span></span>
<span class="line"><span>│  ┌─────────────────────────────────────────────────────────┐   │</span></span>
<span class="line"><span>│  │  写命令序列                                               │   │</span></span>
<span class="line"><span>│  │  ┌───────────────────────────────────────────────────┐ │   │</span></span>
<span class="line"><span>│  │  │  *3\\r\\n$3\\r\\nSET\\r\\n$4\\r\\nuser\\r\\n$1\\r\\n1\\r\\n    │ │   │</span></span>
<span class="line"><span>│  │  └───────────────────────────────────────────────────┘ │   │</span></span>
<span class="line"><span>│  │  ┌───────────────────────────────────────────────────┐ │   │</span></span>
<span class="line"><span>│  │  │  *3\\r\\n$3\\r\\nHSET\\r\\n$9\\r\\nuser:1\\r\\n$4\\r\\nname  │ │   │</span></span>
<span class="line"><span>│  │  │  \\r\\n$6\\r\\nAlice\\r\\n                              │ │   │</span></span>
<span class="line"><span>│  │  └───────────────────────────────────────────────────┘ │   │</span></span>
<span class="line"><span>│  │  ┌───────────────────────────────────────────────────┐ │   │</span></span>
<span class="line"><span>│  │  │  *3\\r\\n$3\\r\\nSADD\\r\\n$4\\r\\ntags\\r\\n$7\\r\\nRedis\\r\\n│ │   │</span></span>
<span class="line"><span>│  │  └───────────────────────────────────────────────────┘ │   │</span></span>
<span class="line"><span>│  │  ...                                                   │   │</span></span>
<span class="line"><span>│  └─────────────────────────────────────────────────────────┘   │</span></span>
<span class="line"><span>│                                                                 │</span></span>
<span class="line"><span>└─────────────────────────────────────────────────────────────────┘</span></span></code></pre></div><h3 id="_3-4-aof-重写机制" tabindex="-1">3.4 AOF 重写机制 <a class="header-anchor" href="#_3-4-aof-重写机制" aria-label="Permalink to “3.4 AOF 重写机制”">​</a></h3><h4 id="为什么需要-aof-重写" tabindex="-1">为什么需要 AOF 重写 <a class="header-anchor" href="#为什么需要-aof-重写" aria-label="Permalink to “为什么需要 AOF 重写”">​</a></h4><p>AOF 通过追加写命令的方式持久化，随着时间推移，AOF 文件会变得越来越大。其中包含大量<strong>冗余的历史命令</strong>。</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>示例：一个 key 的多次操作</span></span>
<span class="line"><span></span></span>
<span class="line"><span>AOF 文件中的命令序列:</span></span>
<span class="line"><span>  SET counter 1          # 设置初始值</span></span>
<span class="line"><span>  SET counter 2          # 覆盖</span></span>
<span class="line"><span>  SET counter 3          # 覆盖</span></span>
<span class="line"><span>  INCR counter           # 4</span></span>
<span class="line"><span>  INCR counter           # 5</span></span>
<span class="line"><span>  INCR counter           # 6</span></span>
<span class="line"><span>  DECR counter           # 5</span></span>
<span class="line"><span>  SET counter 10         # 最终值</span></span>
<span class="line"><span></span></span>
<span class="line"><span>实际只需要:</span></span>
<span class="line"><span>  SET counter 10         # 一条命令即可</span></span></code></pre></div><p>AOF 重写就是将当前内存中的数据<strong>重新序列化为更精简的命令序列</strong>，用新的 AOF 文件替换旧的 AOF 文件。</p><h4 id="重写触发方式" tabindex="-1">重写触发方式 <a class="header-anchor" href="#重写触发方式" aria-label="Permalink to “重写触发方式”">​</a></h4><table tabindex="0"><thead><tr><th>触发方式</th><th>命令/配置</th><th>说明</th></tr></thead><tbody><tr><td><strong>手动触发</strong></td><td><code>BGREWRITEAOF</code></td><td>命令行主动触发</td></tr><tr><td><strong>自动触发</strong></td><td><code>auto-aof-rewrite-percentage</code></td><td>AOF 文件增长比例阈值</td></tr><tr><td><strong>自动触发</strong></td><td><code>auto-aof-rewrite-min-size</code></td><td>AOF 文件最小尺寸阈值</td></tr></tbody></table><div class="language-redis"><button title="Copy Code" class="copy"></button><span class="lang">redis</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span># 手动触发 AOF 重写</span></span>
<span class="line"><span>BGREWRITEAOF</span></span>
<span class="line"><span># 该命令会 fork 子进程来完成重写</span></span>
<span class="line"><span># 不阻塞主线程</span></span></code></pre></div><div class="language-conf"><button title="Copy Code" class="copy"></button><span class="lang">conf</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span># 自动重写配置</span></span>
<span class="line"><span>auto-aof-rewrite-percentage 100</span></span>
<span class="line"><span># 当 AOF 文件体积相比上次重写时增长了 100%，触发重写</span></span>
<span class="line"><span></span></span>
<span class="line"><span>auto-aof-rewrite-min-size 64mb</span></span>
<span class="line"><span># AOF 文件最小 64MB 时才考虑重写</span></span>
<span class="line"><span># 避免小文件频繁重写</span></span></code></pre></div><h4 id="重写流程详解" tabindex="-1">重写流程详解 <a class="header-anchor" href="#重写流程详解" aria-label="Permalink to “重写流程详解”">​</a></h4><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>AOF 重写执行流程:</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  主进程                            子进程（重写进程）</span></span>
<span class="line"><span>  ┌───────────┐                 ┌───────────┐</span></span>
<span class="line"><span>  │ 接收重写请求│                 │           │</span></span>
<span class="line"><span>  └──────┬──────┘                 │           │</span></span>
<span class="line"><span>         │                        │           │</span></span>
<span class="line"><span>         │ fork()                 │           │</span></span>
<span class="line"><span>         ├──────────────────────►│           │</span></span>
<span class="line"><span>         │                        │           │</span></span>
<span class="line"><span>         │                        │ 读取内存数据│</span></span>
<span class="line"><span>         │                        │ 生成新命令  │</span></span>
<span class="line"><span>         │                        │ 写入新 AOF │</span></span>
<span class="line"><span>         │                        │ 文件       │</span></span>
<span class="line"><span>         │                        │           │</span></span>
<span class="line"><span>  主进程继续                       │ 新 AOF 文件│</span></span>
<span class="line"><span>  处理客户端                       │ 写入完成   │</span></span>
<span class="line"><span>  请求                             │           │</span></span>
<span class="line"><span>  │                                │           │</span></span>
<span class="line"><span>  │                                │ 发送完成信号│</span></span>
<span class="line"><span>  │◄──────────────────────────────┤           │</span></span>
<span class="line"><span>  │                                │ 退出      │</span></span>
<span class="line"><span>  │ 用新 AOF 文件替换旧文件          └───────────┘</span></span>
<span class="line"><span>  │                               </span></span>
<span class="line"><span>  │ 处理在重写期间收到的写命令:    </span></span>
<span class="line"><span>  │ → 追加到新 AOF 文件中          </span></span>
<span class="line"><span>  └───────────┘</span></span></code></pre></div><p><strong>重写期间的写命令处理：</strong></p><p>在 AOF 重写期间，主进程仍然会接收到新的写命令。为了保证数据一致性，Redis 会将重写期间的写命令同时写入：</p><ol><li>旧的 AOF 文件（保证持久化）</li><li>新的 AOF 缓冲区（用于合并到新文件）</li></ol><p>重写完成后，新的 AOF 文件会包含：重写开始时的数据快照 + 重写期间的增量写命令。</p><h4 id="重写期间的内存开销" tabindex="-1">重写期间的内存开销 <a class="header-anchor" href="#重写期间的内存开销" aria-label="Permalink to “重写期间的内存开销”">​</a></h4><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>重写期间的内存状态:</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  内存数据（共享）</span></span>
<span class="line"><span>  ┌──────────────────────────────────────────┐</span></span>
<span class="line"><span>  │  key1: value1                             │</span></span>
<span class="line"><span>  │  key2: value2                             │</span></span>
<span class="line"><span>  │  key3: value3                             │</span></span>
<span class="line"><span>  └──────────────────────────────────────────┘</span></span>
<span class="line"><span>         │ fork()</span></span>
<span class="line"><span>         ▼</span></span>
<span class="line"><span>  子进程拷贝（Copy-On-Write）</span></span>
<span class="line"><span>  ┌──────────────────────────────────────────┐</span></span>
<span class="line"><span>  │  key1: value1  ← 只读，共享物理页         │</span></span>
<span class="line"><span>  │  key2: value2  ← 只读，共享物理页         │</span></span>
<span class="line"><span>  │  key3: value3  ← 只读，共享物理页         │</span></span>
<span class="line"><span>  └──────────────────────────────────────────┘</span></span>
<span class="line"><span>  </span></span>
<span class="line"><span>  如果主进程修改了 key2:</span></span>
<span class="line"><span>  → key2 的物理页被复制</span></span>
<span class="line"><span>  → 子进程看到的还是旧的 key2 值</span></span>
<span class="line"><span>  → 主进程看到的是新的 key2 值</span></span></code></pre></div><h3 id="_3-5-aof-重写的两个小问题" tabindex="-1">3.5 AOF 重写的两个小问题 <a class="header-anchor" href="#_3-5-aof-重写的两个小问题" aria-label="Permalink to “3.5 AOF 重写的两个小问题”">​</a></h3><h4 id="重写期间阻塞问题" tabindex="-1">重写期间阻塞问题 <a class="header-anchor" href="#重写期间阻塞问题" aria-label="Permalink to “重写期间阻塞问题”">​</a></h4><p>虽然 <code>BGREWRITEAOF</code> 是非阻塞的，但 <code>fork()</code> 操作本身会短暂阻塞主线程。阻塞时间与内存大小正相关。</p><div class="language-conf"><button title="Copy Code" class="copy"></button><span class="lang">conf</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span># 解决方法: 合理设置重写触发阈值</span></span>
<span class="line"><span>auto-aof-rewrite-percentage 100  # 增长 100% 时触发</span></span>
<span class="line"><span>auto-aof-rewrite-min-size 64mb   # 最小 64MB 才触发</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 避免频繁重写导致的 fork 开销</span></span></code></pre></div><h4 id="重写期间的写命令积压" tabindex="-1">重写期间的写命令积压 <a class="header-anchor" href="#重写期间的写命令积压" aria-label="Permalink to “重写期间的写命令积压”">​</a></h4><p>在 AOF 重写期间，如果写请求非常频繁，AOF 重写缓冲区可能会积压大量命令。Redis 会通过以下机制处理：</p><div class="language-conf"><button title="Copy Code" class="copy"></button><span class="lang">conf</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span># aof-rewrite-incremental-fsync 配置</span></span>
<span class="line"><span># 是否在重写期间采用增量 fsync</span></span>
<span class="line"><span># 默认值: yes</span></span>
<span class="line"><span>aof-rewrite-incremental-fsync yes</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 开启后:</span></span>
<span class="line"><span># 重写期间每写入 32MB 数据就执行一次 fsync</span></span>
<span class="line"><span># 避免重写结束时大量数据一次性 fsync 造成 I/O 尖峰</span></span></code></pre></div><h3 id="_3-6-aof-的优缺点" tabindex="-1">3.6 AOF 的优缺点 <a class="header-anchor" href="#_3-6-aof-的优缺点" aria-label="Permalink to “3.6 AOF 的优缺点”">​</a></h3><h4 id="aof-的优点" tabindex="-1">AOF 的优点 <a class="header-anchor" href="#aof-的优点" aria-label="Permalink to “AOF 的优点”">​</a></h4><table tabindex="0"><thead><tr><th>优点</th><th>说明</th></tr></thead><tbody><tr><td><strong>数据安全性高</strong></td><td>最多丢失 1 秒数据（everysec 策略），安全性远高于 RDB</td></tr><tr><td><strong>文件可读性强</strong></td><td>AOF 文件是 Redis 协议格式的文本，可以直接阅读和编辑</td></tr><tr><td><strong>支持灵活恢复</strong></td><td>可以通过修改 AOF 文件来恢复到特定状态</td></tr><tr><td><strong>对主线程影响小</strong></td><td>写命令追加到缓冲区，刷盘异步进行</td></tr><tr><td><strong>适合数据加密</strong></td><td>可以对 AOF 文件进行加密传输和存储</td></tr></tbody></table><h4 id="aof-的缺点" tabindex="-1">AOF 的缺点 <a class="header-anchor" href="#aof-的缺点" aria-label="Permalink to “AOF 的缺点”">​</a></h4><table tabindex="0"><thead><tr><th>缺点</th><th>说明</th></tr></thead><tbody><tr><td><strong>文件体积大</strong></td><td>AOF 文件比 RDB 文件大 2-3 倍</td></tr><tr><td><strong>恢复速度慢</strong></td><td>需要逐条执行命令恢复，速度比 RDB 慢</td></tr><tr><td><strong>持续 I/O 开销</strong></td><td>每次写操作都需要追加到 AOF 文件</td></tr><tr><td><strong>重写开销</strong></td><td>需要定期执行 AOF 重写，产生 fork 开销</td></tr></tbody></table><hr><h2 id="四、混合持久化-4-0-引入" tabindex="-1">四、混合持久化（4.0+ 引入） <a class="header-anchor" href="#四、混合持久化-4-0-引入" aria-label="Permalink to “四、混合持久化（4.0+ 引入）”">​</a></h2><h3 id="_4-1-混合持久化概述" tabindex="-1">4.1 混合持久化概述 <a class="header-anchor" href="#_4-1-混合持久化概述" aria-label="Permalink to “4.1 混合持久化概述”">​</a></h3><p>Redis 4.0 引入了<strong>混合持久化</strong>机制，它将 RDB 和 AOF 的优点结合起来：</p><ul><li><strong>使用 RDB 格式存储大部分数据</strong>：文件紧凑，恢复速度快</li><li><strong>使用 AOF 格式存储增量命令</strong>：数据安全性高，丢失窗口小</li></ul><p>混合持久化是目前 Redis <strong>最推荐的持久化方式</strong>，兼顾了性能和数据安全。</p><h3 id="_4-2-混合持久化格式" tabindex="-1">4.2 混合持久化格式 <a class="header-anchor" href="#_4-2-混合持久化格式" aria-label="Permalink to “4.2 混合持久化格式”">​</a></h3><p>混合持久化的 AOF 文件由两部分组成：</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>┌─────────────────────────────────────────────────────────────────┐</span></span>
<span class="line"><span>│                      混合持久化文件结构                            │</span></span>
<span class="line"><span>├─────────────────────────────────────────────────────────────────┤</span></span>
<span class="line"><span>│                                                                 │</span></span>
<span class="line"><span>│  ┌─────────────────────────────────────────────────────────┐   │</span></span>
<span class="line"><span>│  │  第一部分: RDB 格式 (二进制压缩)                         │   │</span></span>
<span class="line"><span>│  │  ┌──────────┬──────────┬──────────┬──────────────────┐ │   │</span></span>
<span class="line"><span>│  │  │ &quot;REDIS&quot;   │ 数据快照  │ 校验和    │ ...              │ │   │</span></span>
<span class="line"><span>│  │  │ (前缀)   │          │          │                  │ │   │</span></span>
<span class="line"><span>│  │  └──────────┴──────────┴──────────┴──────────────────┘ │   │</span></span>
<span class="line"><span>│  │  ↑ 这部分是完整的 RDB 格式，包含重写时的数据快照            │   │</span></span>
<span class="line"><span>│  └─────────────────────────────────────────────────────────┘   │</span></span>
<span class="line"><span>│                                                                 │</span></span>
<span class="line"><span>│  ┌─────────────────────────────────────────────────────────┐   │</span></span>
<span class="line"><span>│  │  第二部分: AOF 格式 (Redis 协议)                          │   │</span></span>
<span class="line"><span>│  │  ┌───────────────────────────────────────────────────┐ │   │</span></span>
<span class="line"><span>│  │  │  *3\\r\\n$3\\r\\nSET\\r\\n...  │ 增量写命令              │ │   │</span></span>
<span class="line"><span>│  │  │  *3\\r\\n$3\\r\\nINCR\\r\\n... │                         │ │   │</span></span>
<span class="line"><span>│  │  └───────────────────────────────────────────────────┘ │   │</span></span>
<span class="line"><span>│  │  ↑ 这部分是重写完成后的增量写命令                          │   │</span></span>
<span class="line"><span>│  └─────────────────────────────────────────────────────────┘   │</span></span>
<span class="line"><span>│                                                                 │</span></span>
<span class="line"><span>│  ┌─────────────────────────────────────────────────────────┐   │</span></span>
<span class="line"><span>│  │  文件结尾: AOF 结束标识                                   │   │</span></span>
<span class="line"><span>│  │  ┌──────────┬──────────┐                                  │   │</span></span>
<span class="line"><span>│  │  │ &quot;EOF&quot;    │ 校验和    │                                  │   │</span></span>
<span class="line"><span>│  │  └──────────┴──────────┘                                  │   │</span></span>
<span class="line"><span>│  └─────────────────────────────────────────────────────────┘   │</span></span>
<span class="line"><span>│                                                                 │</span></span>
<span class="line"><span>└─────────────────────────────────────────────────────────────────┘</span></span></code></pre></div><h3 id="_4-3-混合持久化的工作流程" tabindex="-1">4.3 混合持久化的工作流程 <a class="header-anchor" href="#_4-3-混合持久化的工作流程" aria-label="Permalink to “4.3 混合持久化的工作流程”">​</a></h3><h4 id="开启混合持久化" tabindex="-1">开启混合持久化 <a class="header-anchor" href="#开启混合持久化" aria-label="Permalink to “开启混合持久化”">​</a></h4><div class="language-conf"><button title="Copy Code" class="copy"></button><span class="lang">conf</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span># 开启 AOF 持久化</span></span>
<span class="line"><span>appendonly yes</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 开启混合持久化（Redis 4.0+）</span></span>
<span class="line"><span>aof-use-rdb-preamble yes</span></span></code></pre></div><h4 id="工作流程" tabindex="-1">工作流程 <a class="header-anchor" href="#工作流程" aria-label="Permalink to “工作流程”">​</a></h4><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>混合持久化工作流程:</span></span>
<span class="line"><span></span></span>
<span class="line"><span>1. Redis 正常运行:</span></span>
<span class="line"><span>   写操作 → 追加到 AOF 缓冲区 → 刷入 AOF 文件（AOF 格式）</span></span>
<span class="line"><span></span></span>
<span class="line"><span>2. 触发 AOF 重写:</span></span>
<span class="line"><span>   主进程 fork 子进程</span></span>
<span class="line"><span>   子进程执行:</span></span>
<span class="line"><span>     a. 将当前内存数据以 RDB 格式写入新文件（前半部分）</span></span>
<span class="line"><span>     b. 重写期间的增量写命令以 AOF 格式追加到新文件（后半部分）</span></span>
<span class="line"><span>     c. 写入完成，通知主进程</span></span>
<span class="line"><span></span></span>
<span class="line"><span>3. 重写完成后:</span></span>
<span class="line"><span>   新的 AOF 文件 = RDB 前缀 + AOF 增量</span></span>
<span class="line"><span>   用新文件替换旧文件</span></span>
<span class="line"><span></span></span>
<span class="line"><span>4. Redis 重启时:</span></span>
<span class="line"><span>   a. 检测到文件以 &quot;REDIS&quot; 开头（RDB 格式）</span></span>
<span class="line"><span>   b. 先加载 RDB 部分（快速恢复数据快照）</span></span>
<span class="line"><span>   c. 再加载 AOF 部分（重放增量命令）</span></span>
<span class="line"><span>   d. 完成恢复</span></span></code></pre></div><h3 id="_4-4-混合持久化的加载流程" tabindex="-1">4.4 混合持久化的加载流程 <a class="header-anchor" href="#_4-4-混合持久化的加载流程" aria-label="Permalink to “4.4 混合持久化的加载流程”">​</a></h3><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>Redis 启动时的文件加载逻辑:</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  ┌───────────────────────────────────────┐</span></span>
<span class="line"><span>  │         读取 AOF 文件开头              │</span></span>
<span class="line"><span>  └───────────────────┬───────────────────┘</span></span>
<span class="line"><span>                      │</span></span>
<span class="line"><span>              ┌───────▼───────┐</span></span>
<span class="line"><span>              │ 开头是 &quot;REDIS&quot;？│</span></span>
<span class="line"><span>              └───────┬───────┘</span></span>
<span class="line"><span>                 是 │          │ 否</span></span>
<span class="line"><span>                    │          │</span></span>
<span class="line"><span>     ┌───────────────▼──┐  ┌──▼──────────────────┐</span></span>
<span class="line"><span>     │ 混合持久化格式    │  │ 纯 AOF 格式          │</span></span>
<span class="line"><span>     │                  │  │                      │</span></span>
<span class="line"><span>     │ 1. 加载 RDB 部分  │  │ 直接加载 AOF 格式数据 │</span></span>
<span class="line"><span>     │    (快速二进制解析)│  │ (逐条解析 RESP 协议) │</span></span>
<span class="line"><span>     │                  │  │                      │</span></span>
<span class="line"><span>     │ 2. 加载 AOF 部分  │  │                      │</span></span>
<span class="line"><span>     │    (重放增量命令) │  │                      │</span></span>
<span class="line"><span>     │                  │  │                      │</span></span>
<span class="line"><span>     │ 3. 完成恢复       │  │                      │</span></span>
<span class="line"><span>     └──────────────────┘  └──────────────────────┘</span></span></code></pre></div><h3 id="_4-5-混合持久化的优缺点" tabindex="-1">4.5 混合持久化的优缺点 <a class="header-anchor" href="#_4-5-混合持久化的优缺点" aria-label="Permalink to “4.5 混合持久化的优缺点”">​</a></h3><h4 id="优点" tabindex="-1">优点 <a class="header-anchor" href="#优点" aria-label="Permalink to “优点”">​</a></h4><table tabindex="0"><thead><tr><th>优点</th><th>说明</th></tr></thead><tbody><tr><td><strong>恢复速度快</strong></td><td>RDB 部分快速加载，恢复速度接近纯 RDB</td></tr><tr><td><strong>数据安全性高</strong></td><td>AOF 增量保证数据安全，不丢失最近写入</td></tr><tr><td><strong>文件体积小</strong></td><td>RDB 部分压缩存储，文件体积接近 RDB</td></tr><tr><td><strong>兼容旧版本</strong></td><td>关闭 <code>aof-use-rdb-preamble</code> 后可以退回纯 AOF</td></tr></tbody></table><h4 id="缺点" tabindex="-1">缺点 <a class="header-anchor" href="#缺点" aria-label="Permalink to “缺点”">​</a></h4><table tabindex="0"><thead><tr><th>缺点</th><th>说明</th></tr></thead><tbody><tr><td><strong>实现复杂度高</strong></td><td>混合格式的读写逻辑更复杂</td></tr><tr><td><strong>调试困难</strong></td><td>RDB 部分是二进制格式，AOF 部分是文本格式</td></tr><tr><td><strong>依赖 Redis 4.0+</strong></td><td>旧版本 Redis 不支持</td></tr></tbody></table><h3 id="_4-6-混合持久化最佳实践" tabindex="-1">4.6 混合持久化最佳实践 <a class="header-anchor" href="#_4-6-混合持久化最佳实践" aria-label="Permalink to “4.6 混合持久化最佳实践”">​</a></h3><div class="language-conf"><button title="Copy Code" class="copy"></button><span class="lang">conf</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span># 推荐的混合持久化配置</span></span>
<span class="line"><span>appendonly yes</span></span>
<span class="line"><span>appendfsync everysec</span></span>
<span class="line"><span>aof-use-rdb-preamble yes</span></span>
<span class="line"><span>auto-aof-rewrite-percentage 100</span></span>
<span class="line"><span>auto-aof-rewrite-min-size 64mb</span></span></code></pre></div><hr><h2 id="五、持久化选择策略" tabindex="-1">五、持久化选择策略 <a class="header-anchor" href="#五、持久化选择策略" aria-label="Permalink to “五、持久化选择策略”">​</a></h2><h3 id="_5-1-何时使用-rdb" tabindex="-1">5.1 何时使用 RDB <a class="header-anchor" href="#_5-1-何时使用-rdb" aria-label="Permalink to “5.1 何时使用 RDB”">​</a></h3><table tabindex="0"><thead><tr><th>场景</th><th>原因</th></tr></thead><tbody><tr><td><strong>数据可以丢失</strong></td><td>如缓存数据、可以从数据源重建的数据</td></tr><tr><td><strong>优先恢复速度</strong></td><td>如频繁重启的开发测试环境</td></tr><tr><td><strong>冷备份</strong></td><td>定时备份 RDB 文件到远程</td></tr><tr><td><strong>大数据量场景</strong></td><td>RDB 文件更紧凑，传输更高效</td></tr></tbody></table><div class="language-conf"><button title="Copy Code" class="copy"></button><span class="lang">conf</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span># 典型的 RDB 配置</span></span>
<span class="line"><span>save 3600 1</span></span>
<span class="line"><span>save 300 10</span></span>
<span class="line"><span>save 60 10000</span></span>
<span class="line"><span>rdbcompression yes</span></span>
<span class="line"><span>rdbchecksum yes</span></span></code></pre></div><h3 id="_5-2-何时使用-aof" tabindex="-1">5.2 何时使用 AOF <a class="header-anchor" href="#_5-2-何时使用-aof" aria-label="Permalink to “5.2 何时使用 AOF”">​</a></h3><table tabindex="0"><thead><tr><th>场景</th><th>原因</th></tr></thead><tbody><tr><td><strong>数据不能丢失</strong></td><td>如订单数据、支付记录</td></tr><tr><td><strong>需要数据可追溯</strong></td><td>AOF 文件保留所有写命令，可审计</td></tr><tr><td><strong>频繁写入</strong></td><td>AOF 追加写比 RDB 全量写更高效</td></tr><tr><td><strong>需要手动恢复</strong></td><td>可以手动编辑 AOF 文件恢复特定数据</td></tr></tbody></table><div class="language-conf"><button title="Copy Code" class="copy"></button><span class="lang">conf</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span># 典型的 AOF 配置</span></span>
<span class="line"><span>appendonly yes</span></span>
<span class="line"><span>appendfsync everysec</span></span>
<span class="line"><span>auto-aof-rewrite-percentage 100</span></span>
<span class="line"><span>auto-aof-rewrite-min-size 64mb</span></span></code></pre></div><h3 id="_5-3-混合持久化建议" tabindex="-1">5.3 混合持久化建议 <a class="header-anchor" href="#_5-3-混合持久化建议" aria-label="Permalink to “5.3 混合持久化建议”">​</a></h3><p><strong>强烈推荐在生产环境使用混合持久化</strong>，它几乎在所有方面都是最优选择：</p><div class="language-conf"><button title="Copy Code" class="copy"></button><span class="lang">conf</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span># 生产环境推荐配置</span></span>
<span class="line"><span>appendonly yes</span></span>
<span class="line"><span>appendfsync everysec</span></span>
<span class="line"><span>aof-use-rdb-preamble yes</span></span>
<span class="line"><span>save &quot;&quot;  # 关闭 RDB 自动保存，避免双重持久化开销</span></span>
<span class="line"><span></span></span>
<span class="line"><span># AOF 重写配置</span></span>
<span class="line"><span>auto-aof-rewrite-percentage 100</span></span>
<span class="line"><span>auto-aof-rewrite-min-size 64mb</span></span>
<span class="line"><span>aof-rewrite-incremental-fsync yes</span></span></code></pre></div><h3 id="_5-4-各方式对比总结" tabindex="-1">5.4 各方式对比总结 <a class="header-anchor" href="#_5-4-各方式对比总结" aria-label="Permalink to “5.4 各方式对比总结”">​</a></h3><table tabindex="0"><thead><tr><th>对比维度</th><th>RDB</th><th>AOF</th><th>混合持久化</th></tr></thead><tbody><tr><td><strong>数据安全性</strong></td><td>最低（丢 15 分钟）</td><td>较高（丢 1 秒）</td><td>较高（丢 1 秒）</td></tr><tr><td><strong>恢复速度</strong></td><td>最快</td><td>最慢</td><td>较快</td></tr><tr><td><strong>文件体积</strong></td><td>最小</td><td>最大</td><td>较小</td></tr><tr><td><strong>对性能影响</strong></td><td>较小</td><td>较大</td><td>较小</td></tr><tr><td><strong>可读性</strong></td><td>不可读（二进制）</td><td>可读（文本）</td><td>部分可读</td></tr><tr><td><strong>实现复杂度</strong></td><td>简单</td><td>简单</td><td>较复杂</td></tr><tr><td><strong>推荐程度</strong></td><td>一般</td><td>推荐</td><td><strong>强烈推荐</strong></td></tr></tbody></table><h3 id="_5-5-双保险策略" tabindex="-1">5.5 双保险策略 <a class="header-anchor" href="#_5-5-双保险策略" aria-label="Permalink to “5.5 双保险策略”">​</a></h3><p>对于关键业务数据，可以同时开启 RDB 和 AOF 作为双保险：</p><div class="language-conf"><button title="Copy Code" class="copy"></button><span class="lang">conf</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span># 同时开启 RDB 和 AOF</span></span>
<span class="line"><span>save 3600 1</span></span>
<span class="line"><span>save 300 10</span></span>
<span class="line"><span>save 60 10000</span></span>
<span class="line"><span></span></span>
<span class="line"><span>appendonly yes</span></span>
<span class="line"><span>appendfsync everysec</span></span>
<span class="line"><span>aof-use-rdb-preamble no  # 使用纯 AOF 作为补充</span></span></code></pre></div><p>Redis 会优先使用 AOF 文件恢复（因为 AOF 数据更完整），如果 AOF 文件损坏，再尝试使用 RDB 文件恢复。</p><hr><h2 id="六、实战-持久化配置与验证" tabindex="-1">六、实战：持久化配置与验证 <a class="header-anchor" href="#六、实战-持久化配置与验证" aria-label="Permalink to “六、实战：持久化配置与验证”">​</a></h2><h3 id="_6-1-查看当前持久化状态" tabindex="-1">6.1 查看当前持久化状态 <a class="header-anchor" href="#_6-1-查看当前持久化状态" aria-label="Permalink to “6.1 查看当前持久化状态”">​</a></h3><div class="language-redis"><button title="Copy Code" class="copy"></button><span class="lang">redis</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span># 查看持久化相关信息</span></span>
<span class="line"><span>INFO persistence</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 输出示例:</span></span>
<span class="line"><span># Persistence</span></span>
<span class="line"><span># loading:0</span></span>
<span class="line"><span># loading_loaded_perc:100.00</span></span>
<span class="line"><span># loading_start_time:0</span></span>
<span class="line"><span># loading_total_bytes:0</span></span>
<span class="line"><span># rdb_last_save_time:1700000000</span></span>
<span class="line"><span># rdb_last_changes:100</span></span>
<span class="line"><span># rdb_last_bgsave_status:ok</span></span>
<span class="line"><span># rdb_last_bgsave_time_sec:5</span></span>
<span class="line"><span># rdb_current_bgsave_time_sec:-1</span></span>
<span class="line"><span># rdb_enabled:1</span></span>
<span class="line"><span># aof_enabled:1</span></span>
<span class="line"><span># aof_rewrite_in_progress:0</span></span>
<span class="line"><span># aof_rewrite_scheduled:0</span></span>
<span class="line"><span># aof_last_rewrite_time_sec:10</span></span>
<span class="line"><span># aof_current_rewrite_time_sec:-1</span></span>
<span class="line"><span># aof_last_bgrewrite_status:ok</span></span>
<span class="line"><span># aof_last_write_status:ok</span></span>
<span class="line"><span># aof_current_size:1048576</span></span>
<span class="line"><span># aof_preamble_text:REDIS011</span></span>
<span class="line"><span># aof_rewrite_perc:100</span></span>
<span class="line"><span># aof_rewrite_min_size:67108864</span></span></code></pre></div><h3 id="_6-2-配置-rdb-持久化" tabindex="-1">6.2 配置 RDB 持久化 <a class="header-anchor" href="#_6-2-配置-rdb-持久化" aria-label="Permalink to “6.2 配置 RDB 持久化”">​</a></h3><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 编辑 redis.conf</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">vim</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> /etc/redis/redis.conf</span></span></code></pre></div><div class="language-conf"><button title="Copy Code" class="copy"></button><span class="lang">conf</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span># RDB 持久化配置</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 保存规则</span></span>
<span class="line"><span>save 3600 1</span></span>
<span class="line"><span>save 300 10</span></span>
<span class="line"><span>save 60 10000</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 文件路径</span></span>
<span class="line"><span>dir /var/lib/redis</span></span>
<span class="line"><span>dbfilename dump.rdb</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 压缩和校验</span></span>
<span class="line"><span>rdbcompression yes</span></span>
<span class="line"><span>rdbchecksum yes</span></span>
<span class="line"><span></span></span>
<span class="line"><span># BGSAVE 出错时的行为</span></span>
<span class="line"><span>stop-writes-on-bgsave-error yes</span></span></code></pre></div><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 重启 Redis</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">sudo</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> systemctl</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> restart</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> redis-server</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 验证配置</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">redis-cli</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> CONFIG</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> GET</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> save</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">redis-cli</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> CONFIG</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> GET</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> dir</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">redis-cli</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> CONFIG</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> GET</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> dbfilename</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 手动触发 BGSAVE 并验证</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">redis-cli</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> BGSAVE</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 等待 BGSAVE 完成</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">redis-cli</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> LASTSAVE</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 检查文件是否生成</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">ls</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -la</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> /var/lib/redis/dump.rdb</span></span></code></pre></div><h3 id="_6-3-配置-aof-持久化" tabindex="-1">6.3 配置 AOF 持久化 <a class="header-anchor" href="#_6-3-配置-aof-持久化" aria-label="Permalink to “6.3 配置 AOF 持久化”">​</a></h3><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 编辑 redis.conf</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">vim</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> /etc/redis/redis.conf</span></span></code></pre></div><div class="language-conf"><button title="Copy Code" class="copy"></button><span class="lang">conf</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span># AOF 持久化配置</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 开启 AOF</span></span>
<span class="line"><span>appendonly yes</span></span>
<span class="line"><span></span></span>
<span class="line"><span># AOF 文件名和路径</span></span>
<span class="line"><span>appendfilename &quot;appendonly.aof&quot;</span></span>
<span class="line"><span>dir /var/lib/redis</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 刷写策略</span></span>
<span class="line"><span>appendfsync everysec</span></span>
<span class="line"><span></span></span>
<span class="line"><span># AOF 重写配置</span></span>
<span class="line"><span>auto-aof-rewrite-percentage 100</span></span>
<span class="line"><span>auto-aof-rewrite-min-size 64mb</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 重写期间的增量 fsync</span></span>
<span class="line"><span>aof-rewrite-incremental-fsync yes</span></span></code></pre></div><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 重启 Redis</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">sudo</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> systemctl</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> restart</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> redis-server</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 验证配置</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">redis-cli</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> CONFIG</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> GET</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> appendonly</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">redis-cli</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> CONFIG</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> GET</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> appendfsync</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">redis-cli</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> CONFIG</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> GET</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> appendfilename</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 查看 AOF 文件状态</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">redis-cli</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> INFO</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> persistence</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> |</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> grep</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> aof_</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 手动触发 AOF 重写</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">redis-cli</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> BGREWRITEAOF</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 检查文件是否生成</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">ls</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -la</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> /var/lib/redis/appendonly.aof</span></span></code></pre></div><h3 id="_6-4-配置混合持久化" tabindex="-1">6.4 配置混合持久化 <a class="header-anchor" href="#_6-4-配置混合持久化" aria-label="Permalink to “6.4 配置混合持久化”">​</a></h3><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 编辑 redis.conf</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">vim</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> /etc/redis/redis.conf</span></span></code></pre></div><div class="language-conf"><button title="Copy Code" class="copy"></button><span class="lang">conf</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span># 混合持久化配置</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 开启 AOF</span></span>
<span class="line"><span>appendonly yes</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 开启混合持久化</span></span>
<span class="line"><span>aof-use-rdb-preamble yes</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 刷写策略</span></span>
<span class="line"><span>appendfsync everysec</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 关闭 RDB 自动保存（可选，避免双重持久化）</span></span>
<span class="line"><span>save &quot;&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span># AOF 重写配置</span></span>
<span class="line"><span>auto-aof-rewrite-percentage 100</span></span>
<span class="line"><span>auto-aof-rewrite-min-size 64mb</span></span></code></pre></div><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 重启 Redis</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">sudo</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> systemctl</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> restart</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> redis-server</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 验证混合持久化</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">redis-cli</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> CONFIG</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> GET</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> aof-use-rdb-preamble</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 输出: &quot;yes&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 执行写入操作</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">redis-cli</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> SET</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> test:key1</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;value1&quot;</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">redis-cli</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> SET</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> test:key2</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;value2&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 触发 AOF 重写，生成混合文件</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">redis-cli</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> BGREWRITEAOF</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 检查 AOF 文件开头是否为 RDB 格式</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">head</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -c</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 50</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> /var/lib/redis/appendonly.aof</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> |</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> xxd</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 如果以 &quot;REDIS&quot; 开头，则混合持久化已生效</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 查看 AOF preamble 信息</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">redis-cli</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> INFO</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> persistence</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> |</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> grep</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> aof_preamble</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 输出: aof_preamble_text:REDIS011</span></span></code></pre></div><h3 id="_6-5-数据恢复验证" tabindex="-1">6.5 数据恢复验证 <a class="header-anchor" href="#_6-5-数据恢复验证" aria-label="Permalink to “6.5 数据恢复验证”">​</a></h3><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 1. 备份当前数据</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">cp</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> /var/lib/redis/dump.rdb</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> /var/lib/redis/dump.rdb.bak</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">cp</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> /var/lib/redis/appendonly.aof</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> /var/lib/redis/appendonly.aof.bak</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 2. 清空 Redis 数据</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">redis-cli</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> FLUSHALL</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 3. 验证数据已清空</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">redis-cli</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> KEYS</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> *</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># (empty list or set)</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 4. 停止 Redis</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">sudo</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> systemctl</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> stop</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> redis-server</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 5. 恢复持久化文件</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">cp</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> /var/lib/redis/dump.rdb.bak</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> /var/lib/redis/dump.rdb</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">cp</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> /var/lib/redis/appendonly.aof.bak</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> /var/lib/redis/appendonly.aof</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 6. 启动 Redis</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">sudo</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> systemctl</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> start</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> redis-server</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 7. 验证数据已恢复</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">redis-cli</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> KEYS</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> *</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 应该能看到之前的 key</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">redis-cli</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> GET</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> test:key1</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 输出: &quot;value1&quot;</span></span></code></pre></div><h3 id="_6-6-rdb-文件的导入与导出" tabindex="-1">6.6 RDB 文件的导入与导出 <a class="header-anchor" href="#_6-6-rdb-文件的导入与导出" aria-label="Permalink to “6.6 RDB 文件的导入与导出”">​</a></h3><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 场景：将 Redis A 的数据迁移到 Redis B</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 步骤 1: 在 Redis A 上执行 BGSAVE</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">redis-cli</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -h</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> redis-A-host</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> BGSAVE</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 步骤 2: 等待 BGSAVE 完成</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">redis-cli</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -h</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> redis-A-host</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> LASTSAVE</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 对比时间戳确认完成</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 步骤 3: 复制 RDB 文件</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">scp</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> /var/lib/redis/dump.rdb</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> user@redis-B-host:/var/lib/redis/</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 步骤 4: 在 Redis B 上停止服务</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">redis-cli</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -h</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> redis-B-host</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> SHUTDOWN</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 步骤 5: 启动 Redis B（会加载新的 RDB 文件）</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">sudo</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> systemctl</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> start</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> redis-server</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 步骤 6: 验证数据</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">redis-cli</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -h</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> redis-B-host</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> KEYS</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> *</span></span></code></pre></div><hr><h2 id="七、常见面试题" tabindex="-1">七、常见面试题 <a class="header-anchor" href="#七、常见面试题" aria-label="Permalink to “七、常见面试题”">​</a></h2><h3 id="_7-1-rdb-相关" tabindex="-1">7.1 RDB 相关 <a class="header-anchor" href="#_7-1-rdb-相关" aria-label="Permalink to “7.1 RDB 相关”">​</a></h3><p><strong>Q1: RDB 文件的保存时机是怎样的？</strong></p><p>Redis 通过 <code>save</code> 规则触发 RDB 保存。每条 <code>save</code> 规则指定了&quot;时间 + 写操作次数&quot;两个条件，当满足任一规则时就会触发 BGSAVE。例如 <code>save 60 10000</code> 表示 60 秒内至少 10000 次写操作就保存。多条规则之间是&quot;或&quot;的关系，同时满足也只触发一次。</p><p><strong>Q2: BGSAVE 时 fork 子进程，此时内存占用情况如何？</strong></p><p>fork 之后，子进程会获得父进程内存空间的<strong>拷贝</strong>。但由于操作系统的 <strong>Copy-On-Write（COW）</strong> 机制，fork 后并不会立即复制所有内存页，而是共享物理页。只有当父进程或子进程修改某个页时，才会复制该页。因此 BGSAVE 期间的内存峰值取决于修改的数据量，通常约为正常内存的 1.2~2 倍。</p><p><strong>Q3: RDB 文件中保存了过期时间吗？过期键在恢复时如何处理？</strong></p><p>RDB 文件中保存了每个键的过期时间。Redis 加载 RDB 文件时，会根据当前时间判断过期键：</p><ul><li>如果键的过期时间已过，跳过该键</li><li>如果键的过期时间未到，加载该键并设置过期时间</li></ul><p>这意味着即使是通过 RDB 恢复数据，过期机制也是有效的。</p><h3 id="_7-2-aof-相关" tabindex="-1">7.2 AOF 相关 <a class="header-anchor" href="#_7-2-aof-相关" aria-label="Permalink to “7.2 AOF 相关”">​</a></h3><p><strong>Q4: AOF 重写和 RDB 快照有什么区别？</strong></p><p>两者在结果上类似——都是将当前内存数据写入新文件。但本质不同：</p><ul><li>RDB 是将数据序列化为<strong>二进制格式</strong>，文件紧凑，恢复快</li><li>AOF 重写是将数据转换为<strong>写命令序列</strong>，文件较大，恢复慢</li><li>AOF 重写的触发频率通常比 RDB 高，因为 AOF 文件持续增长</li></ul><p><strong>Q5: AOF 重写期间新写的命令会丢失吗？</strong></p><p>不会。AOF 重写通过以下机制保证数据不丢失：</p><ol><li>主进程在重写期间继续接收写命令</li><li>写命令同时写入旧 AOF 文件（保证持久化）和新 AOF 缓冲区</li><li>重写完成后，新 AOF 文件包含：重写时的快照 + 重写期间的增量</li></ol><p><strong>Q6: AOF 的 <code>always</code>、<code>everysec</code>、<code>no</code> 三种刷写策略在性能上的差异？</strong></p><p>性能从高到低：<code>no</code> &gt; <code>everysec</code> &gt; <code>always</code></p><ul><li><code>no</code>：完全异步，性能最高，但丢数据风险不可控</li><li><code>everysec</code>：每秒一次 fsync，性能约为 <code>no</code> 的 80-90%</li><li><code>always</code>：每次写都 fsync，性能约为 <code>everysec</code> 的 50-60%</li></ul><p>实际生产中 <code>everysec</code> 是最常用的，它在性能和安全之间取得了良好的平衡。</p><h3 id="_7-3-混合持久化相关" tabindex="-1">7.3 混合持久化相关 <a class="header-anchor" href="#_7-3-混合持久化相关" aria-label="Permalink to “7.3 混合持久化相关”">​</a></h3><p><strong>Q7: 混合持久化的加载流程是怎样的？</strong></p><p>Redis 启动时加载混合持久化文件的流程：</p><ol><li>读取文件开头，检测到 &quot;REDIS&quot; 标识</li><li>按照 RDB 格式解析前半部分，快速恢复数据快照</li><li>按照 AOF 格式解析后半部分，重放增量写命令</li><li>完成数据恢复</li></ol><p>这种方式结合了 RDB 的加载速度和 AOF 的数据完整性。</p><p><strong>Q8: 混合持久化文件和纯 RDB 文件如何区分？</strong></p><ul><li>纯 RDB 文件以 <code>REDIS</code> 开头，后面全是二进制数据</li><li>纯 AOF 文件以 RESP 协议的命令开头（如 <code>*3\\r\\n$3\\r\\nSET</code>）</li><li>混合持久化文件以 <code>REDIS</code> 开头，但后面既有二进制数据又有 RESP 命令</li></ul><p>Redis 通过检测文件开头的 <code>REDIS</code> 标识来判断是否为 RDB 格式（包括混合格式）。</p><h3 id="_7-4-综合问题" tabindex="-1">7.4 综合问题 <a class="header-anchor" href="#_7-4-综合问题" aria-label="Permalink to “7.4 综合问题”">​</a></h3><p><strong>Q9: 如何选择 RDB 和 AOF？</strong></p><p>选择的核心依据是<strong>数据安全要求</strong>和<strong>性能要求</strong>的权衡：</p><ul><li>数据可丢失（缓存场景）→ RDB</li><li>数据不能丢失（订单、支付）→ AOF 或混合持久化</li><li>追求恢复速度 → RDB</li><li>追求最小数据丢失 → AOF（everysec）</li><li>生产环境推荐 → 混合持久化</li></ul><p><strong>Q10: Redis 重启后，RDB 和 AOF 文件的加载顺序是什么？</strong></p><p>Redis 重启时的加载优先级：</p><ol><li>如果开启了 AOF（<code>appendonly yes</code>），<strong>优先加载 AOF 文件</strong></li><li>如果 AOF 文件不存在，加载 RDB 文件</li><li>如果两者都不存在，Redis 以空数据库启动</li></ol><p>AOF 优先的原因是 AOF 数据比 RDB 更完整（丢失窗口更小）。</p><p><strong>Q11: 如何手动编辑 AOF 文件恢复数据？</strong></p><p>AOF 文件是 Redis 协议格式的文本，可以手动编辑：</p><ol><li>停止 Redis</li><li>备份 AOF 文件</li><li>打开 AOF 文件，删除不需要的命令或添加需要的命令</li><li>启动 Redis，会按照修改后的 AOF 文件恢复</li></ol><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 示例：手动删除某个 key 的所有操作</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 1. 找到相关命令并删除</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 2. 或直接用 AOF 重写生成干净的文件</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 重新加载 AOF 文件</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">redis-cli</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> BGREWRITEAOF</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 重写后的 AOF 文件只包含当前数据的最小命令集</span></span></code></pre></div><p><strong>Q12: 为什么生产环境不推荐使用 <code>SAVE</code> 命令？</strong></p><p><code>SAVE</code> 命令会阻塞 Redis 主线程，在 RDB 保存完成之前，Redis 无法响应任何客户端请求。数据量越大，阻塞时间越长。而 <code>BGSAVE</code> 通过 fork 子进程实现，主线程可以继续服务。因此生产环境应使用 <code>BGSAVE</code> 或自动触发机制。</p><p><strong>Q13: AOF 文件损坏了怎么办？</strong></p><p>如果 AOF 文件损坏，Redis 启动时会检测到错误并拒绝加载。可以通过以下方式恢复：</p><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 1. 备份损坏的 AOF 文件</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">cp</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> appendonly.aof</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> appendonly.aof.corrupt</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 2. 使用 redis-check-aof 工具修复</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">redis-check-aof</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --fix</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> appendonly.aof</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 该工具会跳过损坏的部分，保留有效数据</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 输出会显示修复的部分和跳过的字节数</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 3. 如果 AOF 完全损坏，尝试从 RDB 恢复</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># Redis 会自动检测到 AOF 不可用，回退到 RDB 文件</span></span></code></pre></div><p><strong>Q14: 持久化对 Redis 性能的影响有多大？</strong></p><ul><li>RDB（BGSAVE）：fork 开销 + 子进程写入，对主线程影响极小（&lt;5%）</li><li>AOF（everysec）：每次写操作追加到缓冲区，每秒一次 fsync，影响约 5-10%</li><li>AOF（always）：每次写操作都 fsync，影响约 30-50%</li></ul><p>生产环境中使用混合持久化（everysec），性能影响通常在 5% 以内。</p><hr><h2 id="本章小结" tabindex="-1">本章小结 <a class="header-anchor" href="#本章小结" aria-label="Permalink to “本章小结”">​</a></h2><p>本章我们深入探讨了 Redis 的三种持久化机制，总结如下：</p><ol><li><p><strong>RDB</strong>：通过数据快照实现持久化，文件紧凑、恢复快速，但存在数据丢失风险。适合数据可丢失、追求恢复速度的场景。</p></li><li><p><strong>AOF</strong>：通过记录写命令实现持久化，数据安全性高（everysec 策略最多丢 1 秒数据），但文件体积大、恢复慢。适合数据安全要求高的场景。</p></li><li><p><strong>混合持久化</strong>：结合 RDB 和 AOF 的优点，前半部分使用 RDB 格式存储数据快照，后半部分使用 AOF 格式存储增量命令。兼顾了恢复速度和数据安全，是目前生产环境的最佳选择。</p></li><li><p><strong>选择建议</strong>：</p><ul><li>缓存场景 → RDB</li><li>关键业务数据 → 混合持久化</li><li>对数据安全有极致要求 → AOF（always）</li><li>一般生产环境 → 混合持久化（everysec）</li></ul></li><li><p><strong>最佳实践</strong>：合理配置刷写策略和重写规则，定期验证持久化恢复流程，确保在故障发生时能够快速恢复数据。</p></li></ol><hr><h2 id="参考文献" tabindex="-1">参考文献 <a class="header-anchor" href="#参考文献" aria-label="Permalink to “参考文献”">​</a></h2><ul><li>Redis 官方文档 - Persistence: <a href="https://redis.io/docs/management/persistence/" target="_blank" rel="noreferrer">https://redis.io/docs/management/persistence/</a></li><li>《Redis 设计与实现》- 黄健宏</li><li>《Redis 开发与运维》- 付磊、张益军</li><li>Redis 源码 - rdb.c、aof.c 模块</li></ul>`,235)])])}const g=a(p,[["render",e]]);export{o as __pageData,g as default};
