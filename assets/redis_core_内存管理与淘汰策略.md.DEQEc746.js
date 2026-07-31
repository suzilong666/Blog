import{_ as a,o as n,c as l,ah as i}from"./chunks/framework.CPHJ30oF.js";const k=JSON.parse('{"title":"Redis 内存管理与淘汰策略：从 jemalloc 到 LFU 算法的深度剖析","description":"","frontmatter":{},"headers":[{"level":2,"title":"一、Redis 内存模型概述","slug":"一、redis-内存模型概述","link":"#一、redis-内存模型概述","children":[{"level":3,"title":"1.1 Redis 为什么关注内存管理","slug":"_1-1-redis-为什么关注内存管理","link":"#_1-1-redis-为什么关注内存管理","children":[]},{"level":3,"title":"1.2 Redis 内存使用划分","slug":"_1-2-redis-内存使用划分","link":"#_1-2-redis-内存使用划分","children":[]},{"level":3,"title":"1.3 内存使用统计指标","slug":"_1-3-内存使用统计指标","link":"#_1-3-内存使用统计指标","children":[]}]},{"level":2,"title":"二、内存分配器","slug":"二、内存分配器","link":"#二、内存分配器","children":[{"level":3,"title":"2.1 内存分配器的选择","slug":"_2-1-内存分配器的选择","link":"#_2-1-内存分配器的选择","children":[]},{"level":3,"title":"2.2 jemalloc 分配原理","slug":"_2-2-jemalloc-分配原理","link":"#_2-2-jemalloc-分配原理","children":[{"level":4,"title":"jemalloc 架构","slug":"jemalloc-架构","link":"#jemalloc-架构","children":[]},{"level":4,"title":"jemalloc 内存分配流程","slug":"jemalloc-内存分配流程","link":"#jemalloc-内存分配流程","children":[]},{"level":4,"title":"Size Class（大小分级）","slug":"size-class-大小分级","link":"#size-class-大小分级","children":[]},{"level":4,"title":"多 Arena 技术","slug":"多-arena-技术","link":"#多-arena-技术","children":[]}]},{"level":3,"title":"2.3 glibc malloc 分配原理","slug":"_2-3-glibc-malloc-分配原理","link":"#_2-3-glibc-malloc-分配原理","children":[{"level":4,"title":"ptmalloc2 结构","slug":"ptmalloc2-结构","link":"#ptmalloc2-结构","children":[]},{"level":4,"title":"glibc malloc 的问题","slug":"glibc-malloc-的问题","link":"#glibc-malloc-的问题","children":[]}]},{"level":3,"title":"2.4 Redis 的内存分配优化","slug":"_2-4-redis-的内存分配优化","link":"#_2-4-redis-的内存分配优化","children":[{"level":4,"title":"jemalloc 配置","slug":"jemalloc-配置","link":"#jemalloc-配置","children":[]},{"level":4,"title":"内存分配器对 Redis 性能的影响","slug":"内存分配器对-redis-性能的影响","link":"#内存分配器对-redis-性能的影响","children":[]}]}]},{"level":2,"title":"三、内存过期机制","slug":"三、内存过期机制","link":"#三、内存过期机制","children":[{"level":3,"title":"3.1 过期键删除策略概述","slug":"_3-1-过期键删除策略概述","link":"#_3-1-过期键删除策略概述","children":[]},{"level":3,"title":"3.2 Redis 采用的策略：惰性删除 + 定期删除混合","slug":"_3-2-redis-采用的策略-惰性删除-定期删除混合","link":"#_3-2-redis-采用的策略-惰性删除-定期删除混合","children":[]},{"level":3,"title":"3.3 过期字典结构","slug":"_3-3-过期字典结构","link":"#_3-3-过期字典结构","children":[{"level":4,"title":"数据库中的字典结构","slug":"数据库中的字典结构","link":"#数据库中的字典结构","children":[]},{"level":4,"title":"字典结构示意图","slug":"字典结构示意图","link":"#字典结构示意图","children":[]}]},{"level":3,"title":"3.4 过期命令详解","slug":"_3-4-过期命令详解","link":"#_3-4-过期命令详解","children":[{"level":4,"title":"EXPIRE 系列命令","slug":"expire-系列命令","link":"#expire-系列命令","children":[]},{"level":4,"title":"TTL / PTTL：查询剩余时间","slug":"ttl-pttl-查询剩余时间","link":"#ttl-pttl-查询剩余时间","children":[]},{"level":4,"title":"PERSIST：移除过期时间","slug":"persist-移除过期时间","link":"#persist-移除过期时间","children":[]},{"level":4,"title":"SET 命令的过期选项","slug":"set-命令的过期选项","link":"#set-命令的过期选项","children":[]},{"level":4,"title":"过期命令对比表","slug":"过期命令对比表","link":"#过期命令对比表","children":[]}]},{"level":3,"title":"3.5 过期键的内部处理","slug":"_3-5-过期键的内部处理","link":"#_3-5-过期键的内部处理","children":[{"level":4,"title":"惰性删除流程","slug":"惰性删除流程","link":"#惰性删除流程","children":[]},{"level":4,"title":"定期删除流程","slug":"定期删除流程","link":"#定期删除流程","children":[]},{"level":4,"title":"过期键删除的源码逻辑（简化）","slug":"过期键删除的源码逻辑-简化","link":"#过期键删除的源码逻辑-简化","children":[]}]}]},{"level":2,"title":"四、内存淘汰策略","slug":"四、内存淘汰策略","link":"#四、内存淘汰策略","children":[{"level":3,"title":"4.1 八种淘汰策略总览","slug":"_4-1-八种淘汰策略总览","link":"#_4-1-八种淘汰策略总览","children":[]},{"level":3,"title":"4.2 LRU 算法原理","slug":"_4-2-lru-算法原理","link":"#_4-2-lru-算法原理","children":[{"level":4,"title":"经典 LRU 算法","slug":"经典-lru-算法","link":"#经典-lru-算法","children":[]},{"level":4,"title":"经典 LRU 实现","slug":"经典-lru-实现","link":"#经典-lru-实现","children":[]},{"level":4,"title":"Redis 的近似 LRU 实现","slug":"redis-的近似-lru-实现","link":"#redis-的近似-lru-实现","children":[]},{"level":4,"title":"Redis 对象的 LRU 字段","slug":"redis-对象的-lru-字段","link":"#redis-对象的-lru-字段","children":[]},{"level":4,"title":"近似 LRU 淘汰流程","slug":"近似-lru-淘汰流程","link":"#近似-lru-淘汰流程","children":[]},{"level":4,"title":"近似 LRU 的局限性","slug":"近似-lru-的局限性","link":"#近似-lru-的局限性","children":[]}]},{"level":3,"title":"4.3 LFU 算法原理","slug":"_4-3-lfu-算法原理","link":"#_4-3-lfu-算法原理","children":[{"level":4,"title":"LFU（Least Frequently Used）概述","slug":"lfu-least-frequently-used-概述","link":"#lfu-least-frequently-used-概述","children":[]},{"level":4,"title":"Redis 的 LFU 实现","slug":"redis-的-lfu-实现","link":"#redis-的-lfu-实现","children":[]},{"level":4,"title":"频率计数器的工作原理","slug":"频率计数器的工作原理","link":"#频率计数器的工作原理","children":[]},{"level":4,"title":"频率衰减机制","slug":"频率衰减机制","link":"#频率衰减机制","children":[]},{"level":4,"title":"LFU 淘汰流程","slug":"lfu-淘汰流程","link":"#lfu-淘汰流程","children":[]},{"level":4,"title":"LFU 与 LRU 对比","slug":"lfu-与-lru-对比","link":"#lfu-与-lru-对比","children":[]},{"level":4,"title":"LFU 的优势场景","slug":"lfu-的优势场景","link":"#lfu-的优势场景","children":[]}]},{"level":3,"title":"4.4 淘汰策略对比与选择","slug":"_4-4-淘汰策略对比与选择","link":"#_4-4-淘汰策略对比与选择","children":[{"level":4,"title":"各策略适用场景","slug":"各策略适用场景","link":"#各策略适用场景","children":[]},{"level":4,"title":"推荐策略","slug":"推荐策略","link":"#推荐策略","children":[]},{"level":4,"title":"配置淘汰策略","slug":"配置淘汰策略","link":"#配置淘汰策略","children":[]}]}]},{"level":2,"title":"五、内存监控与优化","slug":"五、内存监控与优化","link":"#五、内存监控与优化","children":[{"level":3,"title":"5.1 INFO memory 命令详解","slug":"_5-1-info-memory-命令详解","link":"#_5-1-info-memory-命令详解","children":[{"level":4,"title":"完整输出字段解析","slug":"完整输出字段解析","link":"#完整输出字段解析","children":[]},{"level":4,"title":"内存使用分析","slug":"内存使用分析","link":"#内存使用分析","children":[]}]},{"level":3,"title":"5.2 内存使用分析工具","slug":"_5-2-内存使用分析工具","link":"#_5-2-内存使用分析工具","children":[{"level":4,"title":"MEMORY DOCTOR 命令","slug":"memory-doctor-命令","link":"#memory-doctor-命令","children":[]},{"level":4,"title":"MEMORY USAGE 命令","slug":"memory-usage-命令","link":"#memory-usage-命令","children":[]},{"level":4,"title":"MEMORY STATS 命令","slug":"memory-stats-命令","link":"#memory-stats-命令","children":[]}]},{"level":3,"title":"5.3 常见内存问题与排查","slug":"_5-3-常见内存问题与排查","link":"#_5-3-常见内存问题与排查","children":[{"level":4,"title":"问题一：内存泄漏","slug":"问题一-内存泄漏","link":"#问题一-内存泄漏","children":[]},{"level":4,"title":"问题二：内存碎片过高","slug":"问题二-内存碎片过高","link":"#问题二-内存碎片过高","children":[]},{"level":4,"title":"问题三：内存突然飙升","slug":"问题三-内存突然飙升","link":"#问题三-内存突然飙升","children":[]},{"level":4,"title":"问题四：淘汰策略不生效","slug":"问题四-淘汰策略不生效","link":"#问题四-淘汰策略不生效","children":[]}]},{"level":3,"title":"5.4 内存优化最佳实践","slug":"_5-4-内存优化最佳实践","link":"#_5-4-内存优化最佳实践","children":[{"level":4,"title":"配置层面优化","slug":"配置层面优化","link":"#配置层面优化","children":[]},{"level":4,"title":"数据层面优化","slug":"数据层面优化","link":"#数据层面优化","children":[]}]}]},{"level":2,"title":"六、大 Key 问题与优化","slug":"六、大-key-问题与优化","link":"#六、大-key-问题与优化","children":[{"level":3,"title":"6.1 什么是大 Key","slug":"_6-1-什么是大-key","link":"#_6-1-什么是大-key","children":[]},{"level":3,"title":"6.2 大 Key 的危害","slug":"_6-2-大-key-的危害","link":"#_6-2-大-key-的危害","children":[]},{"level":3,"title":"6.3 大 Key 检测方法","slug":"_6-3-大-key-检测方法","link":"#_6-3-大-key-检测方法","children":[{"level":4,"title":"使用 redis-cli --bigkeys","slug":"使用-redis-cli-bigkeys","link":"#使用-redis-cli-bigkeys","children":[]},{"level":4,"title":"使用 MEMORY USAGE 命令","slug":"使用-memory-usage-命令","link":"#使用-memory-usage-命令","children":[]},{"level":4,"title":"使用 DBA 工具","slug":"使用-dba-工具","link":"#使用-dba-工具","children":[]}]},{"level":3,"title":"6.4 大 Key 优化方案","slug":"_6-4-大-key-优化方案","link":"#_6-4-大-key-优化方案","children":[{"level":4,"title":"拆分大 Key","slug":"拆分大-key","link":"#拆分大-key","children":[]},{"level":4,"title":"渐进式删除","slug":"渐进式删除","link":"#渐进式删除","children":[]},{"level":4,"title":"分段存储","slug":"分段存储","link":"#分段存储","children":[]},{"level":4,"title":"使用更高效的数据结构","slug":"使用更高效的数据结构","link":"#使用更高效的数据结构","children":[]}]},{"level":3,"title":"6.5 大 Key 删除实战","slug":"_6-5-大-key-删除实战","link":"#_6-5-大-key-删除实战","children":[]}]},{"level":2,"title":"七、常见面试题","slug":"七、常见面试题","link":"#七、常见面试题","children":[{"level":3,"title":"7.1 基础概念类","slug":"_7-1-基础概念类","link":"#_7-1-基础概念类","children":[]},{"level":3,"title":"7.2 原理深入类","slug":"_7-2-原理深入类","link":"#_7-2-原理深入类","children":[]},{"level":3,"title":"7.3 实际应用类","slug":"_7-3-实际应用类","link":"#_7-3-实际应用类","children":[]},{"level":3,"title":"7.4 综合实战类","slug":"_7-4-综合实战类","link":"#_7-4-综合实战类","children":[]}]},{"level":2,"title":"本章小结","slug":"本章小结","link":"#本章小结","children":[{"level":3,"title":"核心知识点回顾","slug":"核心知识点回顾","link":"#核心知识点回顾","children":[]},{"level":3,"title":"关键命令速查","slug":"关键命令速查","link":"#关键命令速查","children":[]},{"level":3,"title":"写在最后","slug":"写在最后","link":"#写在最后","children":[]}]}],"relativePath":"redis/core/内存管理与淘汰策略.md","filePath":"redis/core/内存管理与淘汰策略.md"}'),e={name:"redis/core/内存管理与淘汰策略.md"};function p(t,s,d,r,h,c){return n(),l("div",null,[...s[0]||(s[0]=[i(`<h1 id="redis-内存管理与淘汰策略-从-jemalloc-到-lfu-算法的深度剖析" tabindex="-1">Redis 内存管理与淘汰策略：从 jemalloc 到 LFU 算法的深度剖析 <a class="header-anchor" href="#redis-内存管理与淘汰策略-从-jemalloc-到-lfu-算法的深度剖析" aria-label="Permalink to “Redis 内存管理与淘汰策略：从 jemalloc 到 LFU 算法的深度剖析”">​</a></h1><h2 id="一、redis-内存模型概述" tabindex="-1">一、Redis 内存模型概述 <a class="header-anchor" href="#一、redis-内存模型概述" aria-label="Permalink to “一、Redis 内存模型概述”">​</a></h2><h3 id="_1-1-redis-为什么关注内存管理" tabindex="-1">1.1 Redis 为什么关注内存管理 <a class="header-anchor" href="#_1-1-redis-为什么关注内存管理" aria-label="Permalink to “1.1 Redis 为什么关注内存管理”">​</a></h3><p>Redis 是一款<strong>纯内存数据库</strong>，所有数据都存储在内存中。与传统磁盘数据库（如 MySQL、PostgreSQL）不同，Redis 的性能高度依赖于高效的内存使用。当 Redis 实例运行一段时间后，内存往往会成为最紧缺的资源。</p><p>因此，Redis 的内存管理需要解决以下核心问题：</p><table tabindex="0"><thead><tr><th>问题</th><th>说明</th></tr></thead><tbody><tr><td><strong>高效分配</strong></td><td>如何快速地分配和释放内存，避免碎片</td></tr><tr><td><strong>过期删除</strong></td><td>如何自动删除过期的键，释放内存</td></tr><tr><td><strong>内存淘汰</strong></td><td>当内存不足时，应该淘汰哪些键</td></tr><tr><td><strong>内存监控</strong></td><td>如何实时了解内存使用状况</td></tr><tr><td><strong>碎片回收</strong></td><td>如何处理内存碎片，提高使用效率</td></tr></tbody></table><h3 id="_1-2-redis-内存使用划分" tabindex="-1">1.2 Redis 内存使用划分 <a class="header-anchor" href="#_1-2-redis-内存使用划分" aria-label="Permalink to “1.2 Redis 内存使用划分”">​</a></h3><p>Redis 的内存使用主要分为三个部分：</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>┌─────────────────────────────────────────────────────────────────┐</span></span>
<span class="line"><span>│                      Redis 内存占用                              │</span></span>
<span class="line"><span>├─────────────────────────────────────────────────────────────────┤</span></span>
<span class="line"><span>│                                                                 │</span></span>
<span class="line"><span>│  ┌─────────────────────────────────────────────────────────┐   │</span></span>
<span class="line"><span>│  │                    数据区 (Data Region)                   │   │</span></span>
<span class="line"><span>│  │                                                         │   │</span></span>
<span class="line"><span>│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐              │   │</span></span>
<span class="line"><span>│  │  │  String  │  │   Hash   │  │   List   │  ...          │   │</span></span>
<span class="line"><span>│  │  │  Objects │  │  Objects │  │  Objects │              │   │</span></span>
<span class="line"><span>│  │  └──────────┘  └──────────┘  └──────────┘              │   │</span></span>
<span class="line"><span>│  │                                                         │   │</span></span>
<span class="line"><span>│  │  存储用户数据的核心区域，包括所有键值对对象               │   │</span></span>
<span class="line"><span>│  └─────────────────────────────────────────────────────────┘   │</span></span>
<span class="line"><span>│                                                                 │</span></span>
<span class="line"><span>│  ┌─────────────────────────────────────────────────────────┐   │</span></span>
<span class="line"><span>│  │                   缓冲区 (Buffer Region)                  │   │</span></span>
<span class="line"><span>│  │                                                         │   │</span></span>
<span class="line"><span>│  │  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐ │   │</span></span>
<span class="line"><span>│  │  │  客户端缓冲区 │  │  复制缓冲区   │  │  AOF 重写缓冲 │ │   │</span></span>
<span class="line"><span>│  │  └──────────────┘  └──────────────┘  └──────────────┘ │   │</span></span>
<span class="line"><span>│  │                                                         │   │</span></span>
<span class="line"><span>│  │  用于数据传输、持久化等操作的临时内存区域                 │   │</span></span>
<span class="line"><span>│  └─────────────────────────────────────────────────────────┘   │</span></span>
<span class="line"><span>│                                                                 │</span></span>
<span class="line"><span>│  ┌─────────────────────────────────────────────────────────┐   │</span></span>
<span class="line"><span>│  │                   内存碎片 (Fragmentation)                 │   │</span></span>
<span class="line"><span>│  │                                                         │   │</span></span>
<span class="line"><span>│  │  ┌──┐  ┌──┐                                              │   │</span></span>
<span class="line"><span>│  │  │1 │  │2 │  间隙无法使用                               │   │</span></span>
<span class="line"><span>│  │  └──┘  └──┘                                              │   │</span></span>
<span class="line"><span>│  │                                                         │   │</span></span>
<span class="line"><span>│  │  已分配但无法有效使用的内存空间                           │   │</span></span>
<span class="line"><span>│  └─────────────────────────────────────────────────────────┘   │</span></span>
<span class="line"><span>│                                                                 │</span></span>
<span class="line"><span>└─────────────────────────────────────────────────────────────────┘</span></span></code></pre></div><h3 id="_1-3-内存使用统计指标" tabindex="-1">1.3 内存使用统计指标 <a class="header-anchor" href="#_1-3-内存使用统计指标" aria-label="Permalink to “1.3 内存使用统计指标”">​</a></h3><p>通过 <code>INFO memory</code> 命令可以查看 Redis 的内存使用情况：</p><div class="language-redis"><button title="Copy Code" class="copy"></button><span class="lang">redis</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>INFO memory</span></span></code></pre></div><p>输出关键字段说明：</p><table tabindex="0"><thead><tr><th>字段</th><th>说明</th></tr></thead><tbody><tr><td><code>used_memory</code></td><td>Redis 实际使用的内存总量（字节）</td></tr><tr><td><code>used_memory_human</code></td><td>人类可读的内存使用量</td></tr><tr><td><code>used_memory_rss</code></td><td>操作系统分配的物理内存（RSS）</td></tr><tr><td><code>used_memory_peak</code></td><td>历史内存使用峰值</td></tr><tr><td><code>mem_fragmentation_ratio</code></td><td>内存碎片率（RSS / used_memory）</td></tr><tr><td><code>maxmemory</code></td><td>最大内存限制（0 表示无限制）</td></tr><tr><td><code>maxmemory_policy</code></td><td>内存淘汰策略</td></tr></tbody></table><p><strong>碎片率解读：</strong></p><ul><li><code>mem_fragmentation_ratio &gt; 1</code>：存在内存碎片，RSS 大于实际使用</li><li><code>mem_fragmentation_ratio ≈ 1</code>：内存使用高效</li><li><code>mem_fragmentation_ratio &lt; 1</code>：使用了虚拟内存（swap），性能会下降</li></ul><hr><h2 id="二、内存分配器" tabindex="-1">二、内存分配器 <a class="header-anchor" href="#二、内存分配器" aria-label="Permalink to “二、内存分配器”">​</a></h2><h3 id="_2-1-内存分配器的选择" tabindex="-1">2.1 内存分配器的选择 <a class="header-anchor" href="#_2-1-内存分配器的选择" aria-label="Permalink to “2.1 内存分配器的选择”">​</a></h3><p>Redis 作为内存数据库，内存分配器的性能直接影响其吞吐量。Redis 支持多种内存分配器，可以在编译时选择：</p><table tabindex="0"><thead><tr><th>分配器</th><th>适用平台</th><th>特点</th></tr></thead><tbody><tr><td><strong>jemalloc</strong></td><td>Linux、macOS（默认）</td><td>低碎片、高并发性能</td></tr><tr><td><strong>glibc malloc</strong></td><td>所有平台</td><td>兼容性好，但碎片率较高</td></tr><tr><td><strong>tcmalloc</strong></td><td>可选</td><td>Google 开发，高并发性能</td></tr><tr><td><strong>libc malloc</strong></td><td>所有平台</td><td>标准库分配器</td></tr></tbody></table><p><strong>Redis 选择 jemalloc 作为默认分配器的原因：</strong></p><ol><li><strong>低内存碎片率</strong>：jemalloc 使用多 Arena 技术，显著降低碎片</li><li><strong>高并发性能</strong>：为多线程环境优化，减少锁竞争</li><li><strong>可观测性</strong>：内置内存统计和分析功能</li><li><strong>稳定性</strong>：在大规模生产环境中验证</li></ol><h3 id="_2-2-jemalloc-分配原理" tabindex="-1">2.2 jemalloc 分配原理 <a class="header-anchor" href="#_2-2-jemalloc-分配原理" aria-label="Permalink to “2.2 jemalloc 分配原理”">​</a></h3><h4 id="jemalloc-架构" tabindex="-1">jemalloc 架构 <a class="header-anchor" href="#jemalloc-架构" aria-label="Permalink to “jemalloc 架构”">​</a></h4><p>jemalloc 的内存管理采用 <strong>三层架构</strong>：</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>┌─────────────────────────────────────────────────────────────────┐</span></span>
<span class="line"><span>│                          jemalloc 架构                           │</span></span>
<span class="line"><span>├─────────────────────────────────────────────────────────────────┤</span></span>
<span class="line"><span>│                                                                 │</span></span>
<span class="line"><span>│  第一层：Arena（竞技场）                                        │</span></span>
<span class="line"><span>│  ┌─────────────────────────────────────────────────────────┐   │</span></span>
<span class="line"><span>│  │  Arena 0  │  Arena 1  │  Arena 2  │  ...  │  Arena N    │   │</span></span>
<span class="line"><span>│  │  (线程1)   │  (线程2)   │  (线程3)   │       │  (线程N)    │   │</span></span>
<span class="line"><span>│  └─────────────────────────────────────────────────────────┘   │</span></span>
<span class="line"><span>│  每个线程独立的内存区域，减少锁竞争                              │</span></span>
<span class="line"><span>│                                                                 │</span></span>
<span class="line"><span>│  第二层：Chunk（块）                                           │</span></span>
<span class="line"><span>│  ┌─────────────────────────────────────────────────────────┐   │</span></span>
<span class="line"><span>│  │  Chunk 0 (256KB)  │  Chunk 1 (256KB)  │  ...             │   │</span></span>
<span class="line"><span>│  │  ┌────┬────┬────┐ │  ┌────┬────┬────┐ │                 │   │</span></span>
<span class="line"><span>│  │  │Slot│Slot│Slot│ │  │Slot│Slot│Slot│ │                 │   │</span></span>
<span class="line"><span>│  │  └────┴────┴────┘ │  └────┴────┴────┘ │                 │   │</span></span>
<span class="line"><span>│  └─────────────────────────────────────────────────────────┘   │</span></span>
<span class="line"><span>│  每个 Arena 由多个 Chunk 组成，每个 Chunk 大小为 256KB         │</span></span>
<span class="line"><span>│                                                                 │</span></span>
<span class="line"><span>│  第三层：Page（页）                                             │</span></span>
<span class="line"><span>│  ┌─────────────────────────────────────────────────────────┐   │</span></span>
<span class="line"><span>│  │  Page 0 │ Page 1 │ Page 2 │ ... │ Page N                │   │</span></span>
<span class="line"><span>│  │  (4KB)   │ (4KB)   │ (4KB)   │     │ (4KB)                │   │</span></span>
<span class="line"><span>│  └─────────────────────────────────────────────────────────┘   │</span></span>
<span class="line"><span>│  每个 Chunk 由多个 Page 组成，每个 Page 大小为 4KB              │</span></span>
<span class="line"><span>│                                                                 │</span></span>
<span class="line"><span>└─────────────────────────────────────────────────────────────────┘</span></span></code></pre></div><h4 id="jemalloc-内存分配流程" tabindex="-1">jemalloc 内存分配流程 <a class="header-anchor" href="#jemalloc-内存分配流程" aria-label="Permalink to “jemalloc 内存分配流程”">​</a></h4><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>应用程序请求: malloc(size)</span></span>
<span class="line"><span>       │</span></span>
<span class="line"><span>       ▼</span></span>
<span class="line"><span>┌──────────────────┐</span></span>
<span class="line"><span>│  选择 Arena       │  根据线程 ID 选择对应的 Arena</span></span>
<span class="line"><span>└────────┬─────────┘</span></span>
<span class="line"><span>         │</span></span>
<span class="line"><span>         ▼</span></span>
<span class="line"><span>┌──────────────────┐</span></span>
<span class="line"><span>│  计算 Size Class  │  将请求大小映射到最近的 Size Class</span></span>
<span class="line"><span>└────────┬─────────┘</span></span>
<span class="line"><span>         │</span></span>
<span class="line"><span>         ▼</span></span>
<span class="line"><span>┌──────────────────┐</span></span>
<span class="line"><span>│  查找可用 Slot    │  在 Chunk 的空闲链表中查找匹配的 Slot</span></span>
<span class="line"><span>└────────┬─────────┘</span></span>
<span class="line"><span>         │</span></span>
<span class="line"><span>         ▼</span></span>
<span class="line"><span>    ┌─────────┐</span></span>
<span class="line"><span>    │ 找到？   │</span></span>
<span class="line"><span>    └──┬──┬───┘</span></span>
<span class="line"><span>      │  │</span></span>
<span class="line"><span>   是 │  │ 否</span></span>
<span class="line"><span>      ▼  ▼</span></span>
<span class="line"><span>┌─────────┐  ┌──────────────────┐</span></span>
<span class="line"><span>│ 返回内存 │  │ 申请新 Chunk     │</span></span>
<span class="line"><span>└─────────┘  │ 从操作系统申请    │</span></span>
<span class="line"><span>             │ 划分为 Slot       │</span></span>
<span class="line"><span>             │ 返回一个 Slot    │</span></span>
<span class="line"><span>             └────────┬─────────┘</span></span>
<span class="line"><span>                      │</span></span>
<span class="line"><span>                      ▼</span></span>
<span class="line"><span>                 ┌─────────┐</span></span>
<span class="line"><span>                 │ 返回内存 │</span></span>
<span class="line"><span>                 └─────────┘</span></span></code></pre></div><h4 id="size-class-大小分级" tabindex="-1">Size Class（大小分级） <a class="header-anchor" href="#size-class-大小分级" aria-label="Permalink to “Size Class（大小分级）”">​</a></h4><p>jemalloc 将内存分配请求划分为不同的大小等级：</p><table tabindex="0"><thead><tr><th>Size Class 范围</th><th>说明</th></tr></thead><tbody><tr><td>1 ~ 8 字节</td><td>小对象，使用微调粒度</td></tr><tr><td>16 ~ 64 字节</td><td>中等对象</td></tr><tr><td>128 ~ 4096 字节</td><td>较大对象，步进逐渐增大</td></tr><tr><td>4096 字节以上</td><td>大对象，直接使用页分配</td></tr></tbody></table><p><strong>jemalloc 的优势：</strong></p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>glibc malloc:</span></span>
<span class="line"><span>  ┌──────┐                             </span></span>
<span class="line"><span>  │ 8字节 │ → 实际占用 16 字节（内部碎片 50%）</span></span>
<span class="line"><span>  └──────┘                             </span></span>
<span class="line"><span>  </span></span>
<span class="line"><span>jemalloc:</span></span>
<span class="line"><span>  ┌──────┐                             </span></span>
<span class="line"><span>  │ 8字节 │ → 实际占用 8 字节（内部碎片 0%）</span></span>
<span class="line"><span>  └──────┘</span></span></code></pre></div><h4 id="多-arena-技术" tabindex="-1">多 Arena 技术 <a class="header-anchor" href="#多-arena-技术" aria-label="Permalink to “多 Arena 技术”">​</a></h4><p>jemalloc 为每个线程分配独立的 Arena，避免多线程竞争：</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>glibc malloc（单全局锁）:</span></span>
<span class="line"><span>  线程1 ──┐</span></span>
<span class="line"><span>  线程2 ──┼──► [全局锁] ──► 内存操作</span></span>
<span class="line"><span>  线程3 ──┘</span></span>
<span class="line"><span>  </span></span>
<span class="line"><span>jemalloc（多 Arena）:</span></span>
<span class="line"><span>  线程1 ──► [Arena 1] ──► 内存操作（无锁）</span></span>
<span class="line"><span>  线程2 ──► [Arena 2] ──► 内存操作（无锁）</span></span>
<span class="line"><span>  线程3 ──► [Arena 3] ──► 内存操作（无锁）</span></span></code></pre></div><h3 id="_2-3-glibc-malloc-分配原理" tabindex="-1">2.3 glibc malloc 分配原理 <a class="header-anchor" href="#_2-3-glibc-malloc-分配原理" aria-label="Permalink to “2.3 glibc malloc 分配原理”">​</a></h3><p>glibc 的 malloc 基于 <strong>ptmalloc2</strong> 实现，其架构较为传统：</p><h4 id="ptmalloc2-结构" tabindex="-1">ptmalloc2 结构 <a class="header-anchor" href="#ptmalloc2-结构" aria-label="Permalink to “ptmalloc2 结构”">​</a></h4><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>┌─────────────────────────────────────────────────────────────────┐</span></span>
<span class="line"><span>│                      ptmalloc2 架构                              │</span></span>
<span class="line"><span>├─────────────────────────────────────────────────────────────────┤</span></span>
<span class="line"><span>│                                                                 │</span></span>
<span class="line"><span>│  主线程 Arena (arena[0])                                        │</span></span>
<span class="line"><span>│  ┌─────────────────────────────────────────────────────────┐   │</span></span>
<span class="line"><span>│  │  top chunk │ small bins │ large bins │ unsorted bin     │   │</span></span>
<span class="line"><span>│  └─────────────────────────────────────────────────────────┘   │</span></span>
<span class="line"><span>│                                                                 │</span></span>
<span class="line"><span>│  线程1 Arena (arena[1])                                        │</span></span>
<span class="line"><span>│  ┌─────────────────────────────────────────────────────────┐   │</span></span>
<span class="line"><span>│  │  top chunk │ small bins │ large bins │ unsorted bin     │   │</span></span>
<span class="line"><span>│  └─────────────────────────────────────────────────────────┘   │</span></span>
<span class="line"><span>│                                                                 │</span></span>
<span class="line"><span>│  线程2 Arena (arena[2])                                        │</span></span>
<span class="line"><span>│  ┌─────────────────────────────────────────────────────────┐   │</span></span>
<span class="line"><span>│  │  top chunk │ small bins │ large bins │ unsorted bin     │   │</span></span>
<span class="line"><span>│  └─────────────────────────────────────────────────────────┘   │</span></span>
<span class="line"><span>│                                                                 │</span></span>
<span class="line"><span>│  ...                                                           │</span></span>
<span class="line"><span>│                                                                 │</span></span>
<span class="line"><span>│  超过 8 个 Arena 后，所有线程共享已有的 Arena（锁竞争）         │</span></span>
<span class="line"><span>│                                                                 │</span></span>
<span class="line"><span>└─────────────────────────────────────────────────────────────────┘</span></span></code></pre></div><h4 id="glibc-malloc-的问题" tabindex="-1">glibc malloc 的问题 <a class="header-anchor" href="#glibc-malloc-的问题" aria-label="Permalink to “glibc malloc 的问题”">​</a></h4><table tabindex="0"><thead><tr><th>问题</th><th>说明</th></tr></thead><tbody><tr><td><strong>内存碎片</strong></td><td>频繁分配释放后，外部碎片严重</td></tr><tr><td><strong>锁竞争</strong></td><td>多个线程共享 Arena 时需要加锁</td></tr><tr><td><strong>内存膨胀</strong></td><td>已释放的内存不一定归还给操作系统</td></tr><tr><td><strong>缓存不友好</strong></td><td>内存布局不连续，缓存命中率低</td></tr></tbody></table><h3 id="_2-4-redis-的内存分配优化" tabindex="-1">2.4 Redis 的内存分配优化 <a class="header-anchor" href="#_2-4-redis-的内存分配优化" aria-label="Permalink to “2.4 Redis 的内存分配优化”">​</a></h3><p>Redis 在 jemalloc 之上还做了额外的优化：</p><h4 id="jemalloc-配置" tabindex="-1">jemalloc 配置 <a class="header-anchor" href="#jemalloc-配置" aria-label="Permalink to “jemalloc 配置”">​</a></h4><div class="language-redis"><button title="Copy Code" class="copy"></button><span class="lang">redis</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span># 查看 jemalloc 统计信息</span></span>
<span class="line"><span>MEMORY STATS</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 主动触发内存回收（将空闲内存归还给操作系统）</span></span>
<span class="line"><span>MEMORY PURGE</span></span></code></pre></div><h4 id="内存分配器对-redis-性能的影响" tabindex="-1">内存分配器对 Redis 性能的影响 <a class="header-anchor" href="#内存分配器对-redis-性能的影响" aria-label="Permalink to “内存分配器对 Redis 性能的影响”">​</a></h4><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>性能对比（每秒操作数）:</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  1000000 ┤                          ╭──────── jemalloc</span></span>
<span class="line"><span>          │                     ╭────╯</span></span>
<span class="line"><span>   800000 ┤                ╭────╯</span></span>
<span class="line"><span>          │           ╭────╯</span></span>
<span class="line"><span>   600000 ┤      ╭────╯</span></span>
<span class="line"><span>          │  ╭──╯</span></span>
<span class="line"><span>   400000 ┤──╯                ╭──── glibc malloc</span></span>
<span class="line"><span>          │             ╭────╯</span></span>
<span class="line"><span>   200000 ┤        ╭────╯</span></span>
<span class="line"><span>          │   ╭────╯</span></span>
<span class="line"><span>        0 ┤──╯</span></span>
<span class="line"><span>          └──────────────────────────────</span></span>
<span class="line"><span>          1    2    3    4    5    6    7</span></span>
<span class="line"><span>                     线程数</span></span></code></pre></div><hr><h2 id="三、内存过期机制" tabindex="-1">三、内存过期机制 <a class="header-anchor" href="#三、内存过期机制" aria-label="Permalink to “三、内存过期机制”">​</a></h2><h3 id="_3-1-过期键删除策略概述" tabindex="-1">3.1 过期键删除策略概述 <a class="header-anchor" href="#_3-1-过期键删除策略概述" aria-label="Permalink to “3.1 过期键删除策略概述”">​</a></h3><p>内存过期删除策略决定了 Redis 如何处理设置了过期时间的键。常见的过期删除策略有三种：</p><table tabindex="0"><thead><tr><th>策略</th><th>说明</th><th>优点</th><th>缺点</th></tr></thead><tbody><tr><td><strong>定时删除</strong></td><td>为每个过期键创建定时器，到期自动删除</td><td>实时性好，到期立即删除</td><td>内存开销大，维护大量定时器</td></tr><tr><td><strong>惰性删除</strong></td><td>访问键时检查是否过期，过期则删除</td><td>节省 CPU，按需执行删除</td><td>过期键可能长期不被访问，浪费内存</td></tr><tr><td><strong>定期删除</strong></td><td>周期性随机抽查部分过期键，删除过期的</td><td>平衡了 CPU 和内存开销</td><td>非实时，可能有大量过期键未及时删除</td></tr></tbody></table><h3 id="_3-2-redis-采用的策略-惰性删除-定期删除混合" tabindex="-1">3.2 Redis 采用的策略：惰性删除 + 定期删除混合 <a class="header-anchor" href="#_3-2-redis-采用的策略-惰性删除-定期删除混合" aria-label="Permalink to “3.2 Redis 采用的策略：惰性删除 + 定期删除混合”">​</a></h3><p>Redis 没有采用单一的过期删除策略，而是结合了<strong>惰性删除</strong>和<strong>定期删除</strong>两种策略，取长补短。</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>┌─────────────────────────────────────────────────────────────────┐</span></span>
<span class="line"><span>│                 Redis 过期删除策略                               │</span></span>
<span class="line"><span>├─────────────────────────────────────────────────────────────────┤</span></span>
<span class="line"><span>│                                                                 │</span></span>
<span class="line"><span>│  惰性删除（按需）                                               │</span></span>
<span class="line"><span>│  ┌─────────────────────────────────────────────────────────┐   │</span></span>
<span class="line"><span>│  │  当客户端访问键时（如 GET、HGET、ZRANGE 等）              │   │</span></span>
<span class="line"><span>│  │  Redis 先检查键是否过期                                  │   │</span></span>
<span class="line"><span>│  │  → 如果已过期，删除键并返回 nil                          │   │</span></span>
<span class="line"><span>│  │  → 如果未过期，返回正常结果                              │   │</span></span>
<span class="line"><span>│  └─────────────────────────────────────────────────────────┘   │</span></span>
<span class="line"><span>│                                                                 │</span></span>
<span class="line"><span>│  定期删除（周期）                                               │</span></span>
<span class="line"><span>│  ┌─────────────────────────────────────────────────────────┐   │</span></span>
<span class="line"><span>│  │  Redis 周期性地（每 100ms 一次）执行以下操作：            │   │</span></span>
<span class="line"><span>│  │  1. 从设置了过期时间的键中随机抽取 20 个键               │   │</span></span>
<span class="line"><span>│  │  2. 检查并删除其中已过期的键                              │   │</span></span>
<span class="line"><span>│  │  3. 如果过期比例超过 25%，重复步骤 1-2                    │   │</span></span>
<span class="line"><span>│  │  4. 最多执行 100ms，避免阻塞主线程                       │   │</span></span>
<span class="line"><span>│  └─────────────────────────────────────────────────────────┘   │</span></span>
<span class="line"><span>│                                                                 │</span></span>
<span class="line"><span>│  两者配合：                                                     │</span></span>
<span class="line"><span>│  ┌─────────────────────────────────────────────────────────┐   │</span></span>
<span class="line"><span>│  │  惰性删除保证了访问时不会返回过期数据                    │   │</span></span>
<span class="line"><span>│  │  定期删除保证了过期键不会长期占用内存                    │   │</span></span>
<span class="line"><span>│  │  两者结合，在数据一致性和性能之间取得平衡                │   │</span></span>
<span class="line"><span>│  └─────────────────────────────────────────────────────────┘   │</span></span>
<span class="line"><span>│                                                                 │</span></span>
<span class="line"><span>└─────────────────────────────────────────────────────────────────┘</span></span></code></pre></div><h3 id="_3-3-过期字典结构" tabindex="-1">3.3 过期字典结构 <a class="header-anchor" href="#_3-3-过期字典结构" aria-label="Permalink to “3.3 过期字典结构”">​</a></h3><p>Redis 使用 <strong>过期字典（Expires Dict）</strong> 来存储所有设置了过期时间的键。</p><h4 id="数据库中的字典结构" tabindex="-1">数据库中的字典结构 <a class="header-anchor" href="#数据库中的字典结构" aria-label="Permalink to “数据库中的字典结构”">​</a></h4><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>typedef struct redisDb {</span></span>
<span class="line"><span>    dict *dict;         // 键空间字典（存储所有键值对）</span></span>
<span class="line"><span>    dict *expires;      // 过期字典（存储过期时间）</span></span>
<span class="line"><span>    dict *blocking_keys;  // 阻塞键字典</span></span>
<span class="line"><span>    dict *ready_keys;     // 就绪键字典</span></span>
<span class="line"><span>    dict *watched_keys;   // 被监听的键</span></span>
<span class="line"><span>    int id;               // 数据库 ID</span></span>
<span class="line"><span>} redisDb;</span></span></code></pre></div><h4 id="字典结构示意图" tabindex="-1">字典结构示意图 <a class="header-anchor" href="#字典结构示意图" aria-label="Permalink to “字典结构示意图”">​</a></h4><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>redisDb 结构:</span></span>
<span class="line"><span>  ┌─────────────────────────────────────────────────────────┐</span></span>
<span class="line"><span>  │  dict (键空间)            │  expires (过期字典)           │</span></span>
<span class="line"><span>  ├─────────────────────────────────────────────────────────┤</span></span>
<span class="line"><span>  │  ┌──────────────────┐    │  ┌──────────────────┐         │</span></span>
<span class="line"><span>  │  │  key1 → value1   │    │  │  key1 → 1700000000│         │</span></span>
<span class="line"><span>  │  │  key2 → value2   │    │  │  key2 → 1700003600│         │</span></span>
<span class="line"><span>  │  │  key3 → value3   │    │  │  key5 → 1700007200│         │</span></span>
<span class="line"><span>  │  │  key4 → value4   │    │  │                  │         │</span></span>
<span class="line"><span>  │  │  key5 → value5   │    │  │  key3, key4      │         │</span></span>
<span class="line"><span>  │  │  ...             │    │  │  无过期时间       │         │</span></span>
<span class="line"><span>  │  └──────────────────┘    │  └──────────────────┘         │</span></span>
<span class="line"><span>  │                           │                              │</span></span>
<span class="line"><span>  │  存储所有键值对            │  存储有过期时间的键            │</span></span>
<span class="line"><span>  │                           │  值为过期时间戳               │</span></span>
<span class="line"><span>  └─────────────────────────────────────────────────────────┘</span></span></code></pre></div><p><strong>注意：</strong> 过期字典只存储键的引用和过期时间，实际数据仍在 <code>dict</code> 中。当键过期时，需要同时从两个字典中删除。</p><h3 id="_3-4-过期命令详解" tabindex="-1">3.4 过期命令详解 <a class="header-anchor" href="#_3-4-过期命令详解" aria-label="Permalink to “3.4 过期命令详解”">​</a></h3><h4 id="expire-系列命令" tabindex="-1">EXPIRE 系列命令 <a class="header-anchor" href="#expire-系列命令" aria-label="Permalink to “EXPIRE 系列命令”">​</a></h4><div class="language-redis"><button title="Copy Code" class="copy"></button><span class="lang">redis</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>// 为键设置过期时间（秒）</span></span>
<span class="line"><span>EXPIRE user:token 3600</span></span>
<span class="line"><span>// 设置 1 小时后过期</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 为键设置过期时间（毫秒）</span></span>
<span class="line"><span>PEXPIRE user:token 3600000</span></span>
<span class="line"><span>// 设置 1 小时后过期</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 在指定时间点过期（Unix 时间戳，秒）</span></span>
<span class="line"><span>EXPIREAT user:token 1700003600</span></span>
<span class="line"><span>// 在 2023-11-14 08:00:00 过期</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 在指定时间点过期（Unix 时间戳，毫秒）</span></span>
<span class="line"><span>PEXPIREAT user:token 1700003600000</span></span></code></pre></div><h4 id="ttl-pttl-查询剩余时间" tabindex="-1">TTL / PTTL：查询剩余时间 <a class="header-anchor" href="#ttl-pttl-查询剩余时间" aria-label="Permalink to “TTL / PTTL：查询剩余时间”">​</a></h4><div class="language-redis"><button title="Copy Code" class="copy"></button><span class="lang">redis</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>// 查询过期剩余时间（秒）</span></span>
<span class="line"><span>TTL user:token    // 返回剩余秒数</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 查询过期剩余时间（毫秒）</span></span>
<span class="line"><span>PTTL user:token   // 返回剩余毫秒数</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 返回值含义：</span></span>
<span class="line"><span>// 正数：剩余存活时间</span></span>
<span class="line"><span>// -1：键存在但永不过期</span></span>
<span class="line"><span>// -2：键不存在</span></span></code></pre></div><h4 id="persist-移除过期时间" tabindex="-1">PERSIST：移除过期时间 <a class="header-anchor" href="#persist-移除过期时间" aria-label="Permalink to “PERSIST：移除过期时间”">​</a></h4><div class="language-redis"><button title="Copy Code" class="copy"></button><span class="lang">redis</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>// 移除键的过期时间，使其永久存活</span></span>
<span class="line"><span>PERSIST user:token</span></span>
<span class="line"><span>// 返回 1 表示成功，0 表示键不存在或已过期</span></span></code></pre></div><h4 id="set-命令的过期选项" tabindex="-1">SET 命令的过期选项 <a class="header-anchor" href="#set-命令的过期选项" aria-label="Permalink to “SET 命令的过期选项”">​</a></h4><div class="language-redis"><button title="Copy Code" class="copy"></button><span class="lang">redis</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>// SET 命令支持直接设置过期时间</span></span>
<span class="line"><span>SET user:token &quot;abc123&quot; EX 3600        // 秒级</span></span>
<span class="line"><span>SET user:token &quot;abc123&quot; PX 3600000     // 毫秒级</span></span>
<span class="line"><span>SET user:token &quot;abc123&quot; EXAT 1700003600  // 时间戳</span></span>
<span class="line"><span>SET user:token &quot;abc123&quot; PXAT 1700003600000 // 毫秒时间戳</span></span></code></pre></div><h4 id="过期命令对比表" tabindex="-1">过期命令对比表 <a class="header-anchor" href="#过期命令对比表" aria-label="Permalink to “过期命令对比表”">​</a></h4><table tabindex="0"><thead><tr><th>命令</th><th>说明</th><th>时间复杂度</th></tr></thead><tbody><tr><td><code>EXPIRE key seconds</code></td><td>设置过期时间（秒）</td><td>O(1)</td></tr><tr><td><code>PEXPIRE key milliseconds</code></td><td>设置过期时间（毫秒）</td><td>O(1)</td></tr><tr><td><code>EXPIREAT key timestamp</code></td><td>指定时间戳过期</td><td>O(1)</td></tr><tr><td><code>PEXPIREAT key milliseconds-timestamp</code></td><td>指定毫秒时间戳过期</td><td>O(1)</td></tr><tr><td><code>TTL key</code></td><td>查询剩余时间（秒）</td><td>O(1)</td></tr><tr><td><code>PTTL key</code></td><td>查询剩余时间（毫秒）</td><td>O(1)</td></tr><tr><td><code>PERSIST key</code></td><td>移除过期时间</td><td>O(1)</td></tr></tbody></table><h3 id="_3-5-过期键的内部处理" tabindex="-1">3.5 过期键的内部处理 <a class="header-anchor" href="#_3-5-过期键的内部处理" aria-label="Permalink to “3.5 过期键的内部处理”">​</a></h3><h4 id="惰性删除流程" tabindex="-1">惰性删除流程 <a class="header-anchor" href="#惰性删除流程" aria-label="Permalink to “惰性删除流程”">​</a></h4><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>客户端请求: GET key</span></span>
<span class="line"><span>       │</span></span>
<span class="line"><span>       ▼</span></span>
<span class="line"><span>┌──────────────────────────────┐</span></span>
<span class="line"><span>│  1. 查找 key 对应的对象      │</span></span>
<span class="line"><span>│     从键空间 dict 中查找     │</span></span>
<span class="line"><span>└──────────────┬───────────────┘</span></span>
<span class="line"><span>               │</span></span>
<span class="line"><span>               ▼</span></span>
<span class="line"><span>┌──────────────────────────────┐</span></span>
<span class="line"><span>│  2. 检查是否有过期时间       │</span></span>
<span class="line"><span>│     从过期字典 expires 查找  │</span></span>
<span class="line"><span>└──────────────┬───────────────┘</span></span>
<span class="line"><span>               │</span></span>
<span class="line"><span>               ▼</span></span>
<span class="line"><span>┌──────────────────────────────┐</span></span>
<span class="line"><span>│  3. 检查是否过期             │</span></span>
<span class="line"><span>│     比较当前时间与过期时间戳  │</span></span>
<span class="line"><span>└──────────────┬───────────────┘</span></span>
<span class="line"><span>               │</span></span>
<span class="line"><span>        ┌──────┴──────┐</span></span>
<span class="line"><span>        │             │</span></span>
<span class="line"><span>     过期 │             │ 未过期</span></span>
<span class="line"><span>        ▼             ▼</span></span>
<span class="line"><span>┌─────────────┐  ┌──────────────┐</span></span>
<span class="line"><span>│ 4a. 删除键  │  │ 4b. 返回值    │</span></span>
<span class="line"><span>│ 从 dict 删除 │  │ 返回键对应值 │</span></span>
<span class="line"><span>│ 从 expires  │  │              │</span></span>
<span class="line"><span>│   删除       │  │              │</span></span>
<span class="line"><span>│ 触发过期通知 │  │              │</span></span>
<span class="line"><span>└─────────────┘  └──────────────┘</span></span></code></pre></div><h4 id="定期删除流程" tabindex="-1">定期删除流程 <a class="header-anchor" href="#定期删除流程" aria-label="Permalink to “定期删除流程”">​</a></h4><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>Redis 服务器定时任务（每 100ms）:</span></span>
<span class="line"><span>       │</span></span>
<span class="line"><span>       ▼</span></span>
<span class="line"><span>┌──────────────────────────────────────────┐</span></span>
<span class="line"><span>│  1. 遍历每个数据库（0 ~ 15）             │</span></span>
<span class="line"><span>└──────────────────┬───────────────────────┘</span></span>
<span class="line"><span>                   │</span></span>
<span class="line"><span>                   ▼</span></span>
<span class="line"><span>┌──────────────────────────────────────────┐</span></span>
<span class="line"><span>│  2. 检查过期字典是否为空                 │</span></span>
<span class="line"><span>│     空则跳过下一个数据库                  │</span></span>
<span class="line"><span>└──────────────────┬───────────────────────┘</span></span>
<span class="line"><span>                   │ 非空</span></span>
<span class="line"><span>                   ▼</span></span>
<span class="line"><span>┌──────────────────────────────────────────┐</span></span>
<span class="line"><span>│  3. 随机抽取 20 个设置了过期的键         │</span></span>
<span class="line"><span>└──────────────────┬───────────────────────┘</span></span>
<span class="line"><span>                   │</span></span>
<span class="line"><span>                   ▼</span></span>
<span class="line"><span>┌──────────────────────────────────────────┐</span></span>
<span class="line"><span>│  4. 检查每个键是否过期                    │</span></span>
<span class="line"><span>│     过期则从两个字典中删除                │</span></span>
<span class="line"><span>└──────────────────┬───────────────────────┘</span></span>
<span class="line"><span>                   │</span></span>
<span class="line"><span>                   ▼</span></span>
<span class="line"><span>┌──────────────────────────────────────────┐</span></span>
<span class="line"><span>│  5. 统计过期比例                         │</span></span>
<span class="line"><span>│     如果 &gt; 25%，重复步骤 3-4             │</span></span>
<span class="line"><span>└──────────────────┬───────────────────────┘</span></span>
<span class="line"><span>                   │</span></span>
<span class="line"><span>                   ▼</span></span>
<span class="line"><span>┌──────────────────────────────────────────┐</span></span>
<span class="line"><span>│  6. 检查执行时间是否超过 100ms            │</span></span>
<span class="line"><span>│     超过则退出，下次继续                 │</span></span>
<span class="line"><span>└──────────────────────────────────────────┘</span></span></code></pre></div><h4 id="过期键删除的源码逻辑-简化" tabindex="-1">过期键删除的源码逻辑（简化） <a class="header-anchor" href="#过期键删除的源码逻辑-简化" aria-label="Permalink to “过期键删除的源码逻辑（简化）”">​</a></h4><div class="language-c"><button title="Copy Code" class="copy"></button><span class="lang">c</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 定期删除的核心逻辑（server.c）</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">void</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> activeExpireCycle</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">int</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;"> type</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) {</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    // 遍历所有数据库</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    for</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (j </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">; j </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&lt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> server.dbnum; j</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">++</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        redisDb </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">*</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">db </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> server.db </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">+</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> j;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        </span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">        // 跳过空的过期字典</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">        if</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">dictSize</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(db-&gt;expires) </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">==</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">continue</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        </span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">        // 随机抽取键进行检查</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">        do</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">            // 随机获取一个键</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">            key </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> dictGetRandomKey</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(db-&gt;expires);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">            </span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">            // 检查是否过期</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">            if</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">keyIsExpired</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(db, key)) {</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">                // 从字典中删除键</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">                dictDelete</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(db-&gt;dict, key);</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">                dictDelete</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(db-&gt;expires, key);</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">                // 触发过期通知</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">                signalKeyExpired</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(db, key);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">            }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">            </span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">            // 增加已检查计数器</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">            checked</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">++</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        } </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">while</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (checked </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&lt;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 20</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> &amp;&amp;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> timelimit_reached </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">==</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        </span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">        // 如果过期比例过高，继续检查</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">        if</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (checked </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&gt;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 0</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> &amp;&amp;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> expired </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">*</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 4</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> &gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> checked) {</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">            // 继续处理当前数据库</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><hr><h2 id="四、内存淘汰策略" tabindex="-1">四、内存淘汰策略 <a class="header-anchor" href="#四、内存淘汰策略" aria-label="Permalink to “四、内存淘汰策略”">​</a></h2><h3 id="_4-1-八种淘汰策略总览" tabindex="-1">4.1 八种淘汰策略总览 <a class="header-anchor" href="#_4-1-八种淘汰策略总览" aria-label="Permalink to “4.1 八种淘汰策略总览”">​</a></h3><p>当 Redis 内存使用达到 <code>maxmemory</code> 限制时，Redis 会根据配置的淘汰策略自动删除数据，以保证服务正常运行。Redis 提供了 <strong>八种淘汰策略</strong>：</p><table tabindex="0"><thead><tr><th>策略</th><th>说明</th><th>适用范围</th></tr></thead><tbody><tr><td><strong>noeviction</strong></td><td>不淘汰任何数据，内存满后写入报错</td><td>所有键</td></tr><tr><td><strong>allkeys-lru</strong></td><td>淘汰最近最少使用的键</td><td>所有键</td></tr><tr><td><strong>volatile-lru</strong></td><td>淘汰最近最少使用的设置了过期时间的键</td><td>仅过期键</td></tr><tr><td><strong>allkeys-lfu</strong></td><td>淘汰最不经常使用的键（4.0+）</td><td>所有键</td></tr><tr><td><strong>volatile-lfu</strong></td><td>淘汰最不经常使用的设置了过期时间的键（4.0+）</td><td>仅过期键</td></tr><tr><td><strong>allkeys-random</strong></td><td>随机淘汰键</td><td>所有键</td></tr><tr><td><strong>volatile-random</strong></td><td>随机淘汰设置了过期时间的键</td><td>仅过期键</td></tr><tr><td><strong>volatile-ttl</strong></td><td>淘汰剩余存活时间最短的键</td><td>仅过期键</td></tr></tbody></table><p><strong>分类示意图：</strong></p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>┌─────────────────────────────────────────────────────────────────┐</span></span>
<span class="line"><span>│                    Redis 内存淘汰策略                            │</span></span>
<span class="line"><span>├─────────────────────────────────────────────────────────────────┤</span></span>
<span class="line"><span>│                                                                 │</span></span>
<span class="line"><span>│  ┌─────────────────────────────────────────────────────────┐   │</span></span>
<span class="line"><span>│  │                  不淘汰策略                              │   │</span></span>
<span class="line"><span>│  │                                                         │   │</span></span>
<span class="line"><span>│  │  noeviction: 不淘汰任何数据，写入命令返回错误           │   │</span></span>
<span class="line"><span>│  └─────────────────────────────────────────────────────────┘   │</span></span>
<span class="line"><span>│                                                                 │</span></span>
<span class="line"><span>│  ┌─────────────────────────────────────────────────────────┐   │</span></span>
<span class="line"><span>│  │                  基于访问频率的策略                      │   │</span></span>
<span class="line"><span>│  │                                                         │   │</span></span>
<span class="line"><span>│  │  ┌─────────────┐  ┌─────────────┐                     │   │</span></span>
<span class="line"><span>│  │  │  LRU 策略    │  │  LFU 策略    │                     │   │</span></span>
<span class="line"><span>│  │  ├─────────────┤  ├─────────────┤                     │   │</span></span>
<span class="line"><span>│  │  │allkeys-lru  │  │allkeys-lfu  │  所有键              │   │</span></span>
<span class="line"><span>│  │  │volatile-lru │  │volatile-lfu │  仅过期键            │   │</span></span>
<span class="line"><span>│  │  └─────────────┘  └─────────────┘                     │   │</span></span>
<span class="line"><span>│  └─────────────────────────────────────────────────────────┘   │</span></span>
<span class="line"><span>│                                                                 │</span></span>
<span class="line"><span>│  ┌─────────────────────────────────────────────────────────┐   │</span></span>
<span class="line"><span>│  │                  基于其他规则的策略                      │   │</span></span>
<span class="line"><span>│  │                                                         │   │</span></span>
<span class="line"><span>│  │  ┌─────────────┐  ┌─────────────┐                     │   │</span></span>
<span class="line"><span>│  │  │  随机淘汰    │  │  TTL 淘汰    │                     │   │</span></span>
<span class="line"><span>│  │  ├─────────────┤  ├─────────────┤                     │   │</span></span>
<span class="line"><span>│  │  │allkeys-     │  │volatile-    │                     │   │</span></span>
<span class="line"><span>│  │  │random       │  │ttl          │                     │   │</span></span>
<span class="line"><span>│  │  │volatile-    │  │             │                     │   │</span></span>
<span class="line"><span>│  │  │random       │  │             │                     │   │</span></span>
<span class="line"><span>│  │  └─────────────┘  └─────────────┘                     │   │</span></span>
<span class="line"><span>│  └─────────────────────────────────────────────────────────┘   │</span></span>
<span class="line"><span>│                                                                 │</span></span>
<span class="line"><span>└─────────────────────────────────────────────────────────────────┘</span></span></code></pre></div><h3 id="_4-2-lru-算法原理" tabindex="-1">4.2 LRU 算法原理 <a class="header-anchor" href="#_4-2-lru-算法原理" aria-label="Permalink to “4.2 LRU 算法原理”">​</a></h3><h4 id="经典-lru-算法" tabindex="-1">经典 LRU 算法 <a class="header-anchor" href="#经典-lru-算法" aria-label="Permalink to “经典 LRU 算法”">​</a></h4><p>LRU（Least Recently Used，最近最少使用）算法的核心思想是：<strong>如果一个数据最近没有被访问过，那么它在未来被访问的概率也较低</strong>。</p><h4 id="经典-lru-实现" tabindex="-1">经典 LRU 实现 <a class="header-anchor" href="#经典-lru-实现" aria-label="Permalink to “经典 LRU 实现”">​</a></h4><p>经典 LRU 使用 <strong>哈希表 + 双向链表</strong> 实现：</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>                        最近使用                          最久使用</span></span>
<span class="line"><span>                          │                                  │</span></span>
<span class="line"><span>                          ▼                                  ▼</span></span>
<span class="line"><span>  ┌────────┐  ┌────────┐  ┌────────┐  ┌────────┐  ┌────────┐</span></span>
<span class="line"><span>  │  key:A │  │  key:B │  │  key:C │  │  key:D │  │  key:E │</span></span>
<span class="line"><span>  │  value:│  │  value:│  │  value:│  │  value:│  │  value:│</span></span>
<span class="line"><span>  │   1    │  │   2    │  │   3    │  │   4    │  │   5    │</span></span>
<span class="line"><span>  └────────┘  └────────┘  └────────┘  └────────┘  └────────┘</span></span>
<span class="line"><span>       ▲          ▲          ▲          ▲          ▲</span></span>
<span class="line"><span>       │          │          │          │          │</span></span>
<span class="line"><span>    ┌──┴──────────┴──────────┴──────────┴──────────┴──┐</span></span>
<span class="line"><span>    │              双向链表（按访问时间排序）              │</span></span>
<span class="line"><span>    └───────────────────────────────────────────────────┘</span></span>
<span class="line"><span>       │</span></span>
<span class="line"><span>    ┌──┴──┐</span></span>
<span class="line"><span>    │哈希表│  key → 节点指针（O(1) 查找）</span></span>
<span class="line"><span>    └─────┘</span></span>
<span class="line"><span></span></span>
<span class="line"><span>操作示例:</span></span>
<span class="line"><span>  1. 访问 key:C → 将 C 移到链表头部</span></span>
<span class="line"><span>  2. 访问 key:A → 将 A 移到链表头部</span></span>
<span class="line"><span>  3. 插入 key:F → 添加到链表头部</span></span>
<span class="line"><span>  4. 淘汰 → 删除链表尾部的节点（key:E）</span></span></code></pre></div><h4 id="redis-的近似-lru-实现" tabindex="-1">Redis 的近似 LRU 实现 <a class="header-anchor" href="#redis-的近似-lru-实现" aria-label="Permalink to “Redis 的近似 LRU 实现”">​</a></h4><p>Redis 没有实现严格的 LRU（因为双向链表维护成本高），而是采用了 <strong>近似 LRU（Approximate LRU）</strong> 算法，基于 <strong>随机采样</strong> 来选择淘汰对象。</p><h4 id="redis-对象的-lru-字段" tabindex="-1">Redis 对象的 LRU 字段 <a class="header-anchor" href="#redis-对象的-lru-字段" aria-label="Permalink to “Redis 对象的 LRU 字段”">​</a></h4><div class="language-c"><button title="Copy Code" class="copy"></button><span class="lang">c</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">typedef</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> struct</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> redisObject {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    unsigned</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> int</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> type:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">4</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">        // 对象类型</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    unsigned</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> int</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> encoding:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">4</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    // 编码方式</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    unsigned</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> int</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> lru:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">24</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">       // LRU 信息（24 位）</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    int</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> refcount;</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">              // 引用计数</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    void</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> *</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">ptr;</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">                 // 数据指针</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">} robj;</span></span></code></pre></div><p><strong>lru 字段的两种用途：</strong></p><table tabindex="0"><thead><tr><th>Redis 版本</th><th>lru 字段含义</th><th>说明</th></tr></thead><tbody><tr><td>4.0 之前</td><td>存储访问时间戳</td><td>用于近似 LRU</td></tr><tr><td>4.0+</td><td>存储访问频率计数器</td><td>用于 LFU 算法</td></tr></tbody></table><h4 id="近似-lru-淘汰流程" tabindex="-1">近似 LRU 淘汰流程 <a class="header-anchor" href="#近似-lru-淘汰流程" aria-label="Permalink to “近似 LRU 淘汰流程”">​</a></h4><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>当需要淘汰键时:</span></span>
<span class="line"><span>       │</span></span>
<span class="line"><span>       ▼</span></span>
<span class="line"><span>┌──────────────────────────────────────────┐</span></span>
<span class="line"><span>│  1. 创建一个淘汰候选集合（样本池）       │</span></span>
<span class="line"><span>│     随机采样 N 个键（默认 N=5）           │</span></span>
<span class="line"><span>└──────────────────┬───────────────────────┘</span></span>
<span class="line"><span>                   │</span></span>
<span class="line"><span>                   ▼</span></span>
<span class="line"><span>┌──────────────────────────────────────────┐</span></span>
<span class="line"><span>│  2. 如果有过期键优先考虑                  │</span></span>
<span class="line"><span>│     volatile-lru: 只从有过期时间的键中采样│</span></span>
<span class="line"><span>│     allkeys-lru: 从所有键中采样          │</span></span>
<span class="line"><span>└──────────────────┬───────────────────────┘</span></span>
<span class="line"><span>                   │</span></span>
<span class="line"><span>                   ▼</span></span>
<span class="line"><span>┌──────────────────────────────────────────┐</span></span>
<span class="line"><span>│  3. 比较候选集合中所有键的 lru 字段       │</span></span>
<span class="line"><span>│     选择 lru 值最小的键（最久未访问）     │</span></span>
<span class="line"><span>└──────────────────┬───────────────────────┘</span></span>
<span class="line"><span>                   │</span></span>
<span class="line"><span>                   ▼</span></span>
<span class="line"><span>┌──────────────────────────────────────────┐</span></span>
<span class="line"><span>│  4. 淘汰选中的键                         │</span></span>
<span class="line"><span>│     从键空间和过期字典中删除              │</span></span>
<span class="line"><span>│     释放内存                              │</span></span>
<span class="line"><span>└──────────────────────────────────────────┘</span></span></code></pre></div><h4 id="近似-lru-的局限性" tabindex="-1">近似 LRU 的局限性 <a class="header-anchor" href="#近似-lru-的局限性" aria-label="Permalink to “近似 LRU 的局限性”">​</a></h4><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>真实 LRU 场景:</span></span>
<span class="line"><span>  访问序列: A B C D E A</span></span>
<span class="line"><span>  </span></span>
<span class="line"><span>  真实 LRU 顺序（从新到旧）:</span></span>
<span class="line"><span>  ┌───┬───┬───┬───┬───┐</span></span>
<span class="line"><span>  │ A │ E │ D │ C │ B │   ← 精确顺序</span></span>
<span class="line"><span>  └───┴───┴───┴───┴───┘</span></span>
<span class="line"><span>  </span></span>
<span class="line"><span>  近似 LRU（随机采样 N=3）可能得到:</span></span>
<span class="line"><span>  ┌───┬───┬───┐</span></span>
<span class="line"><span>  │ A │ C │ B │   ← 采样结果</span></span>
<span class="line"><span>  └───┴───┴───┘</span></span>
<span class="line"><span>  淘汰 B（但实际上 B 不是最久未使用的）</span></span>
<span class="line"><span></span></span>
<span class="line"><span>近似 LRU 无法保证选择绝对最久未使用的键</span></span>
<span class="line"><span>但在实际场景中已经足够好</span></span></code></pre></div><h3 id="_4-3-lfu-算法原理" tabindex="-1">4.3 LFU 算法原理 <a class="header-anchor" href="#_4-3-lfu-算法原理" aria-label="Permalink to “4.3 LFU 算法原理”">​</a></h3><h4 id="lfu-least-frequently-used-概述" tabindex="-1">LFU（Least Frequently Used）概述 <a class="header-anchor" href="#lfu-least-frequently-used-概述" aria-label="Permalink to “LFU（Least Frequently Used）概述”">​</a></h4><p>LFU（最不经常使用）算法根据键的<strong>访问频率</strong>决定淘汰顺序，频率越低越先被淘汰。Redis 4.0+ 引入了 LFU 策略，提供比 LRU 更精确的热点识别能力。</p><h4 id="redis-的-lfu-实现" tabindex="-1">Redis 的 LFU 实现 <a class="header-anchor" href="#redis-的-lfu-实现" aria-label="Permalink to “Redis 的 LFU 实现”">​</a></h4><p>Redis 的 LFU 实现比较特殊，它将 24 位的 <code>lru</code> 字段重新利用：</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>lru 字段（24 位）在 LFU 模式下的划分:</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  0                   1                   2                   3</span></span>
<span class="line"><span>  0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3</span></span>
<span class="line"><span>  ├─────────────────┼──────────────────────────────────┤</span></span>
<span class="line"><span>  │  频率计数器     │         访问时间戳               │</span></span>
<span class="line"><span>  │  (8 位)         │         (16 位)                 │</span></span>
<span class="line"><span>  └─────────────────┴──────────────────────────────────┘</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  lower 8 bits:  访问频率计数器（0-255）</span></span>
<span class="line"><span>  upper 16 bits: 最近一次访问的时间戳（分钟级）</span></span></code></pre></div><h4 id="频率计数器的工作原理" tabindex="-1">频率计数器的工作原理 <a class="header-anchor" href="#频率计数器的工作原理" aria-label="Permalink to “频率计数器的工作原理”">​</a></h4><p><strong>频率增长规则：</strong></p><div class="language-c"><button title="Copy Code" class="copy"></button><span class="lang">c</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// LFU 频率增长逻辑</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">void</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> updateLFU</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(robj </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">*</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">val</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) {</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    // 频率计数器上限为 255</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    if</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (val-&gt;lfu.freq </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&lt;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 255</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) {</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">        // 使用对数增长，频率越高增长越慢</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        val-&gt;lfu.freq</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">++</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    }</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    // 更新访问时间戳</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    val-&gt;lfu.lru </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> now_minutes;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><p><strong>对数增长示例：</strong></p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>访问次数与频率计数器的关系:</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  255 ┤                          ╭────────── 饱和</span></span>
<span class="line"><span>      │                         ╱</span></span>
<span class="line"><span>  200 ┤                       ╱</span></span>
<span class="line"><span>      │                     ╱</span></span>
<span class="line"><span>  150 ┤                   ╱</span></span>
<span class="line"><span>      │                ╱</span></span>
<span class="line"><span>  100 ┤             ╱</span></span>
<span class="line"><span>      │           ╱</span></span>
<span class="line"><span>   50 ┤        ╱</span></span>
<span class="line"><span>      │      ╱</span></span>
<span class="line"><span>   10 ┤   ╱</span></span>
<span class="line"><span>      │ ╱</span></span>
<span class="line"><span>    1 ┤╱</span></span>
<span class="line"><span>      └──────────────────────────────</span></span>
<span class="line"><span>      1    10   100  1000  10000  100000</span></span>
<span class="line"><span>                    实际访问次数</span></span>
<span class="line"><span></span></span>
<span class="line"><span>对数增长的好处:</span></span>
<span class="line"><span>  - 避免热点键的频率值快速达到上限</span></span>
<span class="line"><span>  - 让不同频率的键保持可区分度</span></span>
<span class="line"><span>  - 8 位计数器可以表示 2^255 次访问</span></span></code></pre></div><h4 id="频率衰减机制" tabindex="-1">频率衰减机制 <a class="header-anchor" href="#频率衰减机制" aria-label="Permalink to “频率衰减机制”">​</a></h4><p>LFU 的频率计数器有一个重要特性：<strong>频率会随时间衰减</strong>。如果一个键长时间未被访问，其频率值会降低，从而更可能被淘汰。</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>频率衰减过程:</span></span>
<span class="line"><span></span></span>
<span class="line"><span>时间轴（分钟）:</span></span>
<span class="line"><span>  0    10   20   30   40   50   60</span></span>
<span class="line"><span>  │    │    │    │    │    │    │</span></span>
<span class="line"><span>  ▼    ▼    ▼    ▼    ▼    ▼    ▼</span></span>
<span class="line"><span></span></span>
<span class="line"><span>键 A 的频率变化:</span></span>
<span class="line"><span>  freq=100</span></span>
<span class="line"><span>       ╲</span></span>
<span class="line"><span>        ╲  衰减</span></span>
<span class="line"><span>         ╲    ╲</span></span>
<span class="line"><span>          ╲      ╲  衰减</span></span>
<span class="line"><span>           ╲        ╲</span></span>
<span class="line"><span>            ╲          ╲</span></span>
<span class="line"><span>             ╲            ╲</span></span>
<span class="line"><span>              ▼              ▼</span></span>
<span class="line"><span>           freq=50        freq=25</span></span>
<span class="line"><span>           </span></span>
<span class="line"><span>  每次衰减频率减半（近似）</span></span>
<span class="line"><span>  衰减后该键更可能被淘汰</span></span></code></pre></div><p><strong>衰减的源码逻辑（简化）：</strong></p><div class="language-c"><button title="Copy Code" class="copy"></button><span class="lang">c</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 计算衰减后的频率</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">unsigned</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> long</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> LFUDecrAndReturn</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(robj </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">*</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">o</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">unsigned</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> long</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;"> ldt</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) {</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    // ldt: 当前时间（分钟）</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    // o-&gt;lfu.lru: 上次访问时间（分钟）</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    </span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    unsigned</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> long</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> elapsed </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> ldt </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> o-&gt;lfu.lru;</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">  // 经过的时间</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    </span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    // 衰减公式: 频率 / (时间差 / 衰减周期)</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    // 默认衰减周期为 1 分钟</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    unsigned</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> long</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> decay </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> elapsed </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">/</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 1</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    </span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    // 频率衰减</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    unsigned</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> long</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> freq </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> o-&gt;lfu.freq;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    freq </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> freq </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&gt;&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> decay;</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">  // 右移实现快速衰减</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    </span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    return</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> freq;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><h4 id="lfu-淘汰流程" tabindex="-1">LFU 淘汰流程 <a class="header-anchor" href="#lfu-淘汰流程" aria-label="Permalink to “LFU 淘汰流程”">​</a></h4><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>当需要淘汰键时:</span></span>
<span class="line"><span>       │</span></span>
<span class="line"><span>       ▼</span></span>
<span class="line"><span>┌──────────────────────────────────────────────┐</span></span>
<span class="line"><span>│  1. 随机采样 N 个键（默认 N=5）              │</span></span>
<span class="line"><span>│     从候选集合中随机选取                      │</span></span>
<span class="line"><span>└──────────────────┬───────────────────────────┘</span></span>
<span class="line"><span>                   │</span></span>
<span class="line"><span>                   ▼</span></span>
<span class="line"><span>┌──────────────────────────────────────────────┐</span></span>
<span class="line"><span>│  2. 计算每个键的有效频率                      │</span></span>
<span class="line"><span>│     考虑时间衰减后的频率值                    │</span></span>
<span class="line"><span>│     effective_freq = freq - decay             │</span></span>
<span class="line"><span>└──────────────────┬───────────────────────────┘</span></span>
<span class="line"><span>                   │</span></span>
<span class="line"><span>                   ▼</span></span>
<span class="line"><span>┌──────────────────────────────────────────────┐</span></span>
<span class="line"><span>│  3. 选择有效频率最低的键                      │</span></span>
<span class="line"><span>│     effective_freq 最小的键被淘汰             │</span></span>
<span class="line"><span>└──────────────────┬───────────────────────────┘</span></span>
<span class="line"><span>                   │</span></span>
<span class="line"><span>                   ▼</span></span>
<span class="line"><span>┌──────────────────────────────────────────────┐</span></span>
<span class="line"><span>│  4. 如果频率相同，使用随机数打破平局          │</span></span>
<span class="line"><span>│     保证公平性                                │</span></span>
<span class="line"><span>└──────────────────────────────────────────────┘</span></span></code></pre></div><h4 id="lfu-与-lru-对比" tabindex="-1">LFU 与 LRU 对比 <a class="header-anchor" href="#lfu-与-lru-对比" aria-label="Permalink to “LFU 与 LRU 对比”">​</a></h4><table tabindex="0"><thead><tr><th>对比项</th><th>LRU</th><th>LFU</th></tr></thead><tbody><tr><td><strong>核心思想</strong></td><td>最近最少使用</td><td>最不经常使用</td></tr><tr><td><strong>关注点</strong></td><td>单次访问的新近性</td><td>长期访问的频率</td></tr><tr><td><strong>适合场景</strong></td><td>时效性强的缓存（如会话）</td><td>热点稳定的缓存（如排行榜）</td></tr><tr><td><strong>抗抖动能力</strong></td><td>弱（偶发访问会提升优先级）</td><td>强（需要持续高频才能保持）</td></tr><tr><td><strong>实现复杂度</strong></td><td>较低</td><td>较高（需要衰减机制）</td></tr><tr><td><strong>内存开销</strong></td><td>较低</td><td>略高（存储频率信息）</td></tr></tbody></table><h4 id="lfu-的优势场景" tabindex="-1">LFU 的优势场景 <a class="header-anchor" href="#lfu-的优势场景" aria-label="Permalink to “LFU 的优势场景”">​</a></h4><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>场景对比:</span></span>
<span class="line"><span></span></span>
<span class="line"><span>场景 1：热点稳定的缓存</span></span>
<span class="line"><span>  - key:hot 被访问 10000 次</span></span>
<span class="line"><span>  - key:warm 被访问 1000 次</span></span>
<span class="line"><span>  - key:cold 被访问 1 次</span></span>
<span class="line"><span>  </span></span>
<span class="line"><span>  LRU: 如果 key:cold 最后被访问，它可能不会被淘汰</span></span>
<span class="line"><span>  LFU: key:cold 频率最低，优先被淘汰 ✓</span></span>
<span class="line"><span></span></span>
<span class="line"><span>场景 2：时效性缓存</span></span>
<span class="line"><span>  - key:session:A 每秒访问一次（长期稳定）</span></span>
<span class="line"><span>  - key:flash 每小时访问一次（偶发热点）</span></span>
<span class="line"><span>  </span></span>
<span class="line"><span>  LRU: key:flash 最后访问，优先级更高</span></span>
<span class="line"><span>  LFU: key:session:A 频率更高，更难淘汰 ✓</span></span>
<span class="line"><span></span></span>
<span class="line"><span>实际选择:</span></span>
<span class="line"><span>  - 大多数场景: LFU 更优</span></span>
<span class="line"><span>  - 需要时效性: LRU 更优</span></span></code></pre></div><h3 id="_4-4-淘汰策略对比与选择" tabindex="-1">4.4 淘汰策略对比与选择 <a class="header-anchor" href="#_4-4-淘汰策略对比与选择" aria-label="Permalink to “4.4 淘汰策略对比与选择”">​</a></h3><h4 id="各策略适用场景" tabindex="-1">各策略适用场景 <a class="header-anchor" href="#各策略适用场景" aria-label="Permalink to “各策略适用场景”">​</a></h4><table tabindex="0"><thead><tr><th>策略</th><th>推荐场景</th><th>注意事项</th></tr></thead><tbody><tr><td><strong>noeviction</strong></td><td>数据不能丢失的场景</td><td>需要监控内存，避免写失败</td></tr><tr><td><strong>allkeys-lru</strong></td><td>通用缓存场景（推荐）</td><td>需要预留足够内存</td></tr><tr><td><strong>volatile-lru</strong></td><td>混合持久化和过期数据</td><td>不能保证非过期数据不被淘汰</td></tr><tr><td><strong>allkeys-lfu</strong></td><td>热点稳定的缓存（推荐）</td><td>Redis 4.0+ 支持</td></tr><tr><td><strong>volatile-lfu</strong></td><td>热点稳定且有过期时间</td><td>Redis 4.0+ 支持</td></tr><tr><td><strong>allkeys-random</strong></td><td>数据重要性相同的场景</td><td>淘汰不可预测</td></tr><tr><td><strong>volatile-random</strong></td><td>非关键缓存</td><td>不推荐生产使用</td></tr><tr><td><strong>volatile-ttl</strong></td><td>有明确过期优先级的场景</td><td>需要合理设置 TTL</td></tr></tbody></table><h4 id="推荐策略" tabindex="-1">推荐策略 <a class="header-anchor" href="#推荐策略" aria-label="Permalink to “推荐策略”">​</a></h4><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>┌─────────────────────────────────────────────────────────────────┐</span></span>
<span class="line"><span>│                      策略选择决策树                              │</span></span>
<span class="line"><span>├─────────────────────────────────────────────────────────────────┤</span></span>
<span class="line"><span>│                                                                 │</span></span>
<span class="line"><span>│  开始                                                           │</span></span>
<span class="line"><span>│    │                                                            │</span></span>
<span class="line"><span>│    ▼                                                            │</span></span>
<span class="line"><span>│  数据能丢失吗？ ──否──► noeviction                              │</span></span>
<span class="line"><span>│    │ 是                                                         │</span></span>
<span class="line"><span>│    ▼                                                            │</span></span>
<span class="line"><span>│  只淘汰有过期时间的键？                                         │</span></span>
<span class="line"><span>│    │ 是              │ 否                                       │</span></span>
<span class="line"><span>│    ▼                 ▼                                          │</span></span>
<span class="line"><span>│  需要热点识别？   需要热点识别？                                 │</span></span>
<span class="line"><span>│    │ 是    否        │ 是    否                                 │</span></span>
<span class="line"><span>│    ▼       ▼         ▼       ▼                                  │</span></span>
<span class="line"><span>│  volatile  volatile  allkeys  allkeys                           │</span></span>
<span class="line"><span>│  -lfu     -lru     -lfu     -lru                               │</span></span>
<span class="line"><span>│                                                                 │</span></span>
<span class="line"><span>│  补充说明:                                                      │</span></span>
<span class="line"><span>│  - Redis 4.0+ 优先选择 LFU 策略                                 │</span></span>
<span class="line"><span>│  - 通用缓存推荐 allkeys-lfu                                     │</span></span>
<span class="line"><span>│  - 需要时效性推荐 allkeys-lru                                   │</span></span>
<span class="line"><span>│  - 只设置了过期时间的键推荐 volatile-lfu                         │</span></span>
<span class="line"><span>│                                                                 │</span></span>
<span class="line"><span>└─────────────────────────────────────────────────────────────────┘</span></span></code></pre></div><h4 id="配置淘汰策略" tabindex="-1">配置淘汰策略 <a class="header-anchor" href="#配置淘汰策略" aria-label="Permalink to “配置淘汰策略”">​</a></h4><div class="language-redis"><button title="Copy Code" class="copy"></button><span class="lang">redis</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span># 查看当前淘汰策略</span></span>
<span class="line"><span>CONFIG GET maxmemory-policy</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 设置淘汰策略</span></span>
<span class="line"><span>CONFIG SET maxmemory-policy allkeys-lfu</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 设置最大内存限制</span></span>
<span class="line"><span>CONFIG SET maxmemory 4gb</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 查看最大内存配置</span></span>
<span class="line"><span>CONFIG GET maxmemory</span></span></code></pre></div><hr><h2 id="五、内存监控与优化" tabindex="-1">五、内存监控与优化 <a class="header-anchor" href="#五、内存监控与优化" aria-label="Permalink to “五、内存监控与优化”">​</a></h2><h3 id="_5-1-info-memory-命令详解" tabindex="-1">5.1 INFO memory 命令详解 <a class="header-anchor" href="#_5-1-info-memory-命令详解" aria-label="Permalink to “5.1 INFO memory 命令详解”">​</a></h3><div class="language-redis"><button title="Copy Code" class="copy"></button><span class="lang">redis</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>INFO memory</span></span></code></pre></div><h4 id="完整输出字段解析" tabindex="-1">完整输出字段解析 <a class="header-anchor" href="#完整输出字段解析" aria-label="Permalink to “完整输出字段解析”">​</a></h4><table tabindex="0"><thead><tr><th>字段</th><th>示例值</th><th>说明</th></tr></thead><tbody><tr><td><code>used_memory</code></td><td><code>1048576</code></td><td>Redis 实际使用的内存（字节）</td></tr><tr><td><code>used_memory_human</code></td><td><code>1.00M</code></td><td>人类可读格式</td></tr><tr><td><code>used_memory_rss</code></td><td><code>2097152</code></td><td>操作系统看到的内存（RSS）</td></tr><tr><td><code>used_memory_peak</code></td><td><code>2097152</code></td><td>历史内存峰值</td></tr><tr><td><code>used_memory_peak_human</code></td><td><code>2.00M</code></td><td>峰值可读格式</td></tr><tr><td><code>used_memory_lua</code></td><td><code>35840</code></td><td>Lua 脚本引擎使用的内存</td></tr><tr><td><code>mem_fragmentation_ratio</code></td><td><code>2.00</code></td><td>碎片率（RSS/used）</td></tr><tr><td><code>mem_allocator</code></td><td><code>jemalloc</code></td><td>使用的内存分配器</td></tr><tr><td><code>maxmemory</code></td><td><code>4294967296</code></td><td>最大内存限制</td></tr><tr><td><code>maxmemory_human</code></td><td><code>4.00G</code></td><td>最大限制可读格式</td></tr><tr><td><code>maxmemory_policy</code></td><td><code>allkeys-lfu</code></td><td>淘汰策略</td></tr><tr><td><code>mem_stat_enabled</code></td><td><code>yes</code></td><td>是否开启 jemalloc 统计</td></tr></tbody></table><h4 id="内存使用分析" tabindex="-1">内存使用分析 <a class="header-anchor" href="#内存使用分析" aria-label="Permalink to “内存使用分析”">​</a></h4><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>正常状态:</span></span>
<span class="line"><span>  used_memory = 1GB</span></span>
<span class="line"><span>  used_memory_rss = 1.05GB</span></span>
<span class="line"><span>  mem_fragmentation_ratio = 1.05  ← 健康</span></span>
<span class="line"><span></span></span>
<span class="line"><span>需要关注:</span></span>
<span class="line"><span>  used_memory = 1GB</span></span>
<span class="line"><span>  used_memory_rss = 2GB</span></span>
<span class="line"><span>  mem_fragmentation_ratio = 2.00  ← 碎片严重</span></span>
<span class="line"><span></span></span>
<span class="line"><span>危险状态:</span></span>
<span class="line"><span>  used_memory = 1GB</span></span>
<span class="line"><span>  used_memory_rss = 4GB</span></span>
<span class="line"><span>  mem_fragmentation_ratio = 4.00  ← 极度碎片</span></span></code></pre></div><h3 id="_5-2-内存使用分析工具" tabindex="-1">5.2 内存使用分析工具 <a class="header-anchor" href="#_5-2-内存使用分析工具" aria-label="Permalink to “5.2 内存使用分析工具”">​</a></h3><h4 id="memory-doctor-命令" tabindex="-1">MEMORY DOCTOR 命令 <a class="header-anchor" href="#memory-doctor-命令" aria-label="Permalink to “MEMORY DOCTOR 命令”">​</a></h4><div class="language-redis"><button title="Copy Code" class="copy"></button><span class="lang">redis</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>MEMORY DOCTOR</span></span></code></pre></div><p>输出 Redis 内存健康状况诊断报告：</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span># Server process memory as reported by the OS:</span></span>
<span class="line"><span># RSS (resident set size):  236.43 M</span></span>
<span class="line"><span># Allocated by Redis:       140.82 M</span></span>
<span class="line"><span># Fragmentation ratio:      1.68</span></span>
<span class="line"><span></span></span>
<span class="line"><span># WARNINGs:</span></span>
<span class="line"><span># - Memory fragmentation ratio is high (&gt;1.5).</span></span>
<span class="line"><span>#   Some data may have been fragmented.</span></span>
<span class="line"><span>#   Consider using MEMORY PURGE to return memory to OS.</span></span></code></pre></div><h4 id="memory-usage-命令" tabindex="-1">MEMORY USAGE 命令 <a class="header-anchor" href="#memory-usage-命令" aria-label="Permalink to “MEMORY USAGE 命令”">​</a></h4><div class="language-redis"><button title="Copy Code" class="copy"></button><span class="lang">redis</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span># 查看指定键的内存占用</span></span>
<span class="line"><span>MEMORY USAGE user:1001:profile</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 深度统计（包含嵌套结构）</span></span>
<span class="line"><span>MEMORY USAGE user:1001:profile SAMPLES 5</span></span></code></pre></div><h4 id="memory-stats-命令" tabindex="-1">MEMORY STATS 命令 <a class="header-anchor" href="#memory-stats-命令" aria-label="Permalink to “MEMORY STATS 命令”">​</a></h4><div class="language-redis"><button title="Copy Code" class="copy"></button><span class="lang">redis</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span># 获取 jemalloc 详细内存统计</span></span>
<span class="line"><span>MEMORY STATS</span></span></code></pre></div><h3 id="_5-3-常见内存问题与排查" tabindex="-1">5.3 常见内存问题与排查 <a class="header-anchor" href="#_5-3-常见内存问题与排查" aria-label="Permalink to “5.3 常见内存问题与排查”">​</a></h3><h4 id="问题一-内存泄漏" tabindex="-1">问题一：内存泄漏 <a class="header-anchor" href="#问题一-内存泄漏" aria-label="Permalink to “问题一：内存泄漏”">​</a></h4><p><strong>症状：</strong> 内存持续增长，即使删除数据后也不释放。</p><p><strong>排查步骤：</strong></p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>1. 定期检查 used_memory 和 used_memory_peak</span></span>
<span class="line"><span>   → 如果 used_memory 持续增长，可能存在泄漏</span></span>
<span class="line"><span></span></span>
<span class="line"><span>2. 使用 MEMORY USAGE 分析大键</span></span>
<span class="line"><span>   → 找出占用内存最多的键</span></span>
<span class="line"><span></span></span>
<span class="line"><span>3. 检查持久化配置</span></span>
<span class="line"><span>   → RDB/AOF 是否正常</span></span>
<span class="line"><span></span></span>
<span class="line"><span>4. 检查客户端连接</span></span>
<span class="line"><span>   → 是否有客户端缓冲区未释放</span></span>
<span class="line"><span></span></span>
<span class="line"><span>5. 检查 Lua 脚本</span></span>
<span class="line"><span>   → 是否有全局变量未清理</span></span></code></pre></div><h4 id="问题二-内存碎片过高" tabindex="-1">问题二：内存碎片过高 <a class="header-anchor" href="#问题二-内存碎片过高" aria-label="Permalink to “问题二：内存碎片过高”">​</a></h4><p><strong>症状：</strong> <code>mem_fragmentation_ratio &gt; 1.5</code>。</p><p><strong>解决方案：</strong></p><div class="language-redis"><button title="Copy Code" class="copy"></button><span class="lang">redis</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span># 方案一：启用主动碎片整理（Redis 4.0+）</span></span>
<span class="line"><span>CONFIG SET activedefrag yes</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 方案二：手动触发内存回收</span></span>
<span class="line"><span>MEMORY PURGE</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 方案三：重启 Redis（最彻底）</span></span>
<span class="line"><span># 在维护窗口执行重启操作</span></span></code></pre></div><h4 id="问题三-内存突然飙升" tabindex="-1">问题三：内存突然飙升 <a class="header-anchor" href="#问题三-内存突然飙升" aria-label="Permalink to “问题三：内存突然飙升”">​</a></h4><p><strong>症状：</strong> 短时间内内存使用率急剧上升。</p><p><strong>排查步骤：</strong></p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>1. 检查是否有大批量写入操作</span></span>
<span class="line"><span>   → 分析业务流量</span></span>
<span class="line"><span></span></span>
<span class="line"><span>2. 检查是否有大 Key 产生</span></span>
<span class="line"><span>   → 使用 MEMORY USAGE 分析</span></span>
<span class="line"><span></span></span>
<span class="line"><span>3. 检查是否有持久化操作</span></span>
<span class="line"><span>   → BGSAVE/BGREWRITEAOF 会消耗内存</span></span>
<span class="line"><span></span></span>
<span class="line"><span>4. 检查主从同步状态</span></span>
<span class="line"><span>   → 复制缓冲区可能占用大量内存</span></span></code></pre></div><h4 id="问题四-淘汰策略不生效" tabindex="-1">问题四：淘汰策略不生效 <a class="header-anchor" href="#问题四-淘汰策略不生效" aria-label="Permalink to “问题四：淘汰策略不生效”">​</a></h4><p><strong>症状：</strong> 内存已满但数据未被淘汰。</p><p><strong>排查清单：</strong></p><table tabindex="0"><thead><tr><th>检查项</th><th>说明</th></tr></thead><tbody><tr><td><code>maxmemory</code> 是否设置</td><td>为 0 表示无内存限制</td></tr><tr><td><code>maxmemory-policy</code> 配置</td><td>是否为 <code>noeviction</code></td></tr><tr><td>键是否设置了过期时间</td><td><code>volatile-*</code> 策略只淘汰有过期时间的键</td></tr><tr><td>淘汰是否触发</td><td>检查 <code>evicted_keys</code> 统计</td></tr></tbody></table><h3 id="_5-4-内存优化最佳实践" tabindex="-1">5.4 内存优化最佳实践 <a class="header-anchor" href="#_5-4-内存优化最佳实践" aria-label="Permalink to “5.4 内存优化最佳实践”">​</a></h3><h4 id="配置层面优化" tabindex="-1">配置层面优化 <a class="header-anchor" href="#配置层面优化" aria-label="Permalink to “配置层面优化”">​</a></h4><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>redis.conf 关键配置:</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 内存限制（建议为物理内存的 50%-70%）</span></span>
<span class="line"><span>maxmemory 4gb</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 淘汰策略（推荐 allkeys-lfu）</span></span>
<span class="line"><span>maxmemory-policy allkeys-lfu</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 开启主动碎片整理</span></span>
<span class="line"><span>activedefrag yes</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 碎片整理参数</span></span>
<span class="line"><span>active-defrag-ignored-bytes 5%</span></span>
<span class="line"><span>active-defrag-cycle 25</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 关闭不必要的持久化</span></span>
<span class="line"><span># RDB:</span></span>
<span class="line"><span>save &quot;&quot;</span></span>
<span class="line"><span># 或调整 RDB 策略</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 缩短过期键的过期时间</span></span>
<span class="line"><span># 让过期机制更有效地回收内存</span></span></code></pre></div><h4 id="数据层面优化" tabindex="-1">数据层面优化 <a class="header-anchor" href="#数据层面优化" aria-label="Permalink to “数据层面优化”">​</a></h4><table tabindex="0"><thead><tr><th>优化点</th><th>说明</th><th>示例</th></tr></thead><tbody><tr><td><strong>使用 Hash 代替多 String</strong></td><td>减少键数量，节省元数据开销</td><td><code>HSET user:1 name &quot;张三&quot;</code> 代替 <code>SET user:1:name &quot;张三&quot;</code></td></tr><tr><td><strong>控制 Key 长度</strong></td><td>短 Key 减少内存占用</td><td><code>u:1:n</code> 代替 <code>user:1:name</code></td></tr><tr><td><strong>合理设置过期时间</strong></td><td>过期时间过短导致频繁淘汰</td><td>根据业务设置合理的 TTL</td></tr><tr><td><strong>避免 Big Key</strong></td><td>单个过大的 Key 影响性能</td><td>将大 Hash 拆分为多个小 Hash</td></tr><tr><td><strong>使用更紧凑的数据类型</strong></td><td>Hash/LPUSH 比 String 更省内存</td><td><code>LPUSH list &quot;item&quot;</code> 代替多个 <code>SET</code></td></tr></tbody></table><hr><h2 id="六、大-key-问题与优化" tabindex="-1">六、大 Key 问题与优化 <a class="header-anchor" href="#六、大-key-问题与优化" aria-label="Permalink to “六、大 Key 问题与优化”">​</a></h2><h3 id="_6-1-什么是大-key" tabindex="-1">6.1 什么是大 Key <a class="header-anchor" href="#_6-1-什么是大-key" aria-label="Permalink to “6.1 什么是大 Key”">​</a></h3><p><strong>大 Key（Big Key）</strong> 是指占用内存较大的键，通常表现为：</p><table tabindex="0"><thead><tr><th>数据类型</th><th>大 Key 的判断标准</th></tr></thead><tbody><tr><td>String</td><td>字符串长度超过 10KB</td></tr><tr><td>Hash</td><td>字段数量超过 500 个</td></tr><tr><td>List</td><td>元素数量超过 2000 个</td></tr><tr><td>Set</td><td>元素数量超过 2000 个</td></tr><tr><td>ZSet</td><td>元素数量超过 2000 个</td></tr></tbody></table><h3 id="_6-2-大-key-的危害" tabindex="-1">6.2 大 Key 的危害 <a class="header-anchor" href="#_6-2-大-key-的危害" aria-label="Permalink to “6.2 大 Key 的危害”">​</a></h3><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>┌─────────────────────────────────────────────────────────────────┐</span></span>
<span class="line"><span>│                      大 Key 的危害                               │</span></span>
<span class="line"><span>├─────────────────────────────────────────────────────────────────┤</span></span>
<span class="line"><span>│                                                                 │</span></span>
<span class="line"><span>│  1. 内存空间浪费                                                │</span></span>
<span class="line"><span>│     ┌─────────────────────────────────────────────────────┐   │</span></span>
<span class="line"><span>│     │  一个大 Key 可能占用数 MB 甚至数 GB 的内存          │   │</span></span>
<span class="line"><span>│     │  占用宝贵的内存资源                                  │   │</span></span>
<span class="line"><span>│     └─────────────────────────────────────────────────────┘   │</span></span>
<span class="line"><span>│                                                                 │</span></span>
<span class="line"><span>│  2. 阻塞 Redis 主线程                                          │</span></span>
<span class="line"><span>│     ┌─────────────────────────────────────────────────────┐   │</span></span>
<span class="line"><span>│     │  删除大 Key 时会阻塞主线程（O(N) 操作）              │   │</span></span>
<span class="line"><span>│     │  可能导致 Redis 短暂不可用                          │   │</span></span>
<span class="line"><span>│     └─────────────────────────────────────────────────────┘   │</span></span>
<span class="line"><span>│                                                                 │</span></span>
<span class="line"><span>│  3. 网络带宽占用                                               │</span></span>
<span class="line"><span>│     ┌─────────────────────────────────────────────────────┐   │</span></span>
<span class="line"><span>│     │  读取大 Key 时需要传输大量数据                      │   │</span></span>
<span class="line"><span>│     │  可能导致网络拥塞                                    │   │</span></span>
<span class="line"><span>│     └─────────────────────────────────────────────────────┘   │</span></span>
<span class="line"><span>│                                                                 │</span></span>
<span class="line"><span>│  4. 集群数据倾斜                                               │</span></span>
<span class="line"><span>│     ┌─────────────────────────────────────────────────────┐   │</span></span>
<span class="line"><span>│     │  Redis Cluster 中，大 Key 集中在某个节点            │   │</span></span>
<span class="line"><span>│     │  导致该节点负载过高，影响整体性能                   │   │</span></span>
<span class="line"><span>│     └─────────────────────────────────────────────────────┘   │</span></span>
<span class="line"><span>│                                                                 │</span></span>
<span class="line"><span>│  5. 持久化性能影响                                             │</span></span>
<span class="line"><span>│     ┌─────────────────────────────────────────────────────┐   │</span></span>
<span class="line"><span>│     │ RDB/AOF 持久化时需要处理大 Key                      │   │</span></span>
<span class="line"><span>│     │ 延长持久化时间，增加 I/O 压力                       │   │</span></span>
<span class="line"><span>│     └─────────────────────────────────────────────────────┘   │</span></span>
<span class="line"><span>│                                                                 │</span></span>
<span class="line"><span>└─────────────────────────────────────────────────────────────────┘</span></span></code></pre></div><h3 id="_6-3-大-key-检测方法" tabindex="-1">6.3 大 Key 检测方法 <a class="header-anchor" href="#_6-3-大-key-检测方法" aria-label="Permalink to “6.3 大 Key 检测方法”">​</a></h3><h4 id="使用-redis-cli-bigkeys" tabindex="-1">使用 redis-cli --bigkeys <a class="header-anchor" href="#使用-redis-cli-bigkeys" aria-label="Permalink to “使用 redis-cli --bigkeys”">​</a></h4><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 扫描大 Key（生产环境慎用）</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">redis-cli</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --bigkeys</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 指定扫描间隔</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">redis-cli</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --bigkeys</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -i</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 0.1</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 每 100ms 暂停 0.1 秒</span></span></code></pre></div><h4 id="使用-memory-usage-命令" tabindex="-1">使用 MEMORY USAGE 命令 <a class="header-anchor" href="#使用-memory-usage-命令" aria-label="Permalink to “使用 MEMORY USAGE 命令”">​</a></h4><div class="language-redis"><button title="Copy Code" class="copy"></button><span class="lang">redis</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span># 分析指定 Key 的内存占用</span></span>
<span class="line"><span>MEMORY USAGE user:1001:profile</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 抽样分析嵌套结构</span></span>
<span class="line"><span>MEMORY USAGE product:2001:comments SAMPLES 10</span></span></code></pre></div><h4 id="使用-dba-工具" tabindex="-1">使用 DBA 工具 <a class="header-anchor" href="#使用-dba-工具" aria-label="Permalink to “使用 DBA 工具”">​</a></h4><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span># 定期扫描大 Key 的脚本思路:</span></span>
<span class="line"><span>1. 使用 SCAN 命令遍历所有键</span></span>
<span class="line"><span>2. 对每个键使用 MEMORY USAGE 检查</span></span>
<span class="line"><span>3. 记录超过阈值的键</span></span>
<span class="line"><span>4. 生成大 Key 报告</span></span></code></pre></div><h3 id="_6-4-大-key-优化方案" tabindex="-1">6.4 大 Key 优化方案 <a class="header-anchor" href="#_6-4-大-key-优化方案" aria-label="Permalink to “6.4 大 Key 优化方案”">​</a></h3><h4 id="拆分大-key" tabindex="-1">拆分大 Key <a class="header-anchor" href="#拆分大-key" aria-label="Permalink to “拆分大 Key”">​</a></h4><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>优化前:</span></span>
<span class="line"><span>  user:1001:profile → {10000 个字段}</span></span>
<span class="line"><span>  </span></span>
<span class="line"><span>优化后:</span></span>
<span class="line"><span>  user:1001:profile:basic → {基础字段}</span></span>
<span class="line"><span>  user:1001:profile:detail → {详细字段}</span></span>
<span class="line"><span>  user:1001:profile:stats → {统计字段}</span></span></code></pre></div><h4 id="渐进式删除" tabindex="-1">渐进式删除 <a class="header-anchor" href="#渐进式删除" aria-label="Permalink to “渐进式删除”">​</a></h4><div class="language-redis"><button title="Copy Code" class="copy"></button><span class="lang">redis</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>// 使用 UNLINK 异步删除大 Key（Redis 4.0+）</span></span>
<span class="line"><span>UNLINK big_key</span></span>
<span class="line"><span>// 立即返回，后台异步释放内存</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 对比 DEL 命令</span></span>
<span class="line"><span>DEL big_key</span></span>
<span class="line"><span>// 阻塞主线程，直到内存完全释放</span></span></code></pre></div><h4 id="分段存储" tabindex="-1">分段存储 <a class="header-anchor" href="#分段存储" aria-label="Permalink to “分段存储”">​</a></h4><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>优化前:</span></span>
<span class="line"><span>  order:3001:items → {10000 个商品}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>优化后（按页存储）:</span></span>
<span class="line"><span>  order:3001:items:page:1 → {0-99 商品}</span></span>
<span class="line"><span>  order:3001:items:page:2 → {100-199 商品}</span></span>
<span class="line"><span>  ...</span></span>
<span class="line"><span>  order:3001:items:page:100 → {9900-9999 商品}</span></span></code></pre></div><h4 id="使用更高效的数据结构" tabindex="-1">使用更高效的数据结构 <a class="header-anchor" href="#使用更高效的数据结构" aria-label="Permalink to “使用更高效的数据结构”">​</a></h4><table tabindex="0"><thead><tr><th>场景</th><th>原方案</th><th>优化方案</th><th>节省</th></tr></thead><tbody><tr><td>大量计数器</td><td>String（每个计数器一个 Key）</td><td>Hash（所有计数器在一个 Key）</td><td>80%+</td></tr><tr><td>大量标签</td><td>Set（每个标签集合一个 Key）</td><td>Hash（标签为字段，值为权重）</td><td>60%+</td></tr><tr><td>用户会话</td><td>JSON 存入 String</td><td>Hash 分字段存储</td><td>40%+</td></tr></tbody></table><h3 id="_6-5-大-key-删除实战" tabindex="-1">6.5 大 Key 删除实战 <a class="header-anchor" href="#_6-5-大-key-删除实战" aria-label="Permalink to “6.5 大 Key 删除实战”">​</a></h3><div class="language-redis"><button title="Copy Code" class="copy"></button><span class="lang">redis</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>// 危险操作：直接删除大 Key</span></span>
<span class="line"><span>DEL huge_key</span></span>
<span class="line"><span>// 可能阻塞 Redis 数秒甚至数十秒</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 安全操作：异步删除</span></span>
<span class="line"><span>UNLINK huge_key</span></span>
<span class="line"><span>// 立即返回，后台执行</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 渐进式删除 Hash 大 Key</span></span>
<span class="line"><span>// 使用 HSCAN 遍历删除</span></span>
<span class="line"><span>HSCAN big_hash 0 COUNT 100</span></span>
<span class="line"><span>// 每次删除 100 个字段</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 渐进式删除 List 大 Key</span></span>
<span class="line"><span>LTRIM big_list 0 -1000</span></span>
<span class="line"><span>// 每次修剪 1000 个元素</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 渐进式删除 Set 大 Key</span></span>
<span class="line"><span>SSCAN big_set 0 COUNT 100</span></span>
<span class="line"><span>// 配合 SREM 批量删除</span></span></code></pre></div><hr><h2 id="七、常见面试题" tabindex="-1">七、常见面试题 <a class="header-anchor" href="#七、常见面试题" aria-label="Permalink to “七、常见面试题”">​</a></h2><h3 id="_7-1-基础概念类" tabindex="-1">7.1 基础概念类 <a class="header-anchor" href="#_7-1-基础概念类" aria-label="Permalink to “7.1 基础概念类”">​</a></h3><p><strong>Q1: Redis 为什么使用 jemalloc 作为默认内存分配器？</strong></p><blockquote><p>Redis 选择 jemalloc 主要基于以下原因：</p><ol><li><strong>低碎片率</strong>：jemalloc 的多 Arena 技术和精细的 Size Class 划分有效降低了内存碎片</li><li><strong>高并发性能</strong>：每个线程使用独立的 Arena，减少了锁竞争</li><li><strong>成熟稳定</strong>：jemalloc 在 Firefox、FreeBSD 等大型项目中广泛使用，经过生产验证</li><li><strong>可观测性</strong>：内置 <code>MEMORY STATS</code> 等统计工具，方便调试和监控</li></ol></blockquote><p><strong>Q2: Redis 的过期键删除策略是什么？为什么不使用定时删除？</strong></p><blockquote><p>Redis 采用<strong>惰性删除 + 定期删除</strong>的混合策略：</p><ul><li><strong>惰性删除</strong>：访问键时检查是否过期，按需删除</li><li><strong>定期删除</strong>：每 100ms 随机抽查部分键，删除过期的</li></ul><p>不使用定时删除的原因：</p><ol><li><strong>内存开销大</strong>：每个过期键需要独立的定时器，维护成本高</li><li><strong>CPU 压力大</strong>：大量定时器触发时会消耗 CPU 资源</li><li><strong>实现复杂</strong>：需要维护时间堆，实现较为复杂</li><li><strong>性能不可控</strong>：大量键同时过期时可能导致性能抖动</li></ol></blockquote><h3 id="_7-2-原理深入类" tabindex="-1">7.2 原理深入类 <a class="header-anchor" href="#_7-2-原理深入类" aria-label="Permalink to “7.2 原理深入类”">​</a></h3><p><strong>Q3: Redis 的 LRU 是如何实现的？与经典 LRU 有什么区别？</strong></p><blockquote><p>Redis 使用<strong>近似 LRU</strong>，而非经典 LRU：</p><p><strong>经典 LRU</strong>：使用哈希表 + 双向链表，精确维护访问顺序，每次访问都需要更新链表（O(1)）</p><p><strong>近似 LRU</strong>：</p><ol><li>随机采样 N 个键（默认 5 个）</li><li>比较采样键的 <code>lru</code> 字段（存储访问时间戳）</li><li>淘汰 lru 值最小的键</li></ol><p><strong>区别</strong>：</p><ul><li>经典 LRU 精确但维护成本高</li><li>近似 LRU 不精确但实现简单、性能好</li><li>在实际场景中，近似 LRU 的效果已经足够好</li></ul></blockquote><p><strong>Q4: Redis 的 LFU 算法是如何统计访问频率的？频率衰减机制是怎样的？</strong></p><blockquote><p>Redis 的 LFU 使用 24 位的 <code>lru</code> 字段存储频率信息：</p><ul><li><strong>低 8 位</strong>：频率计数器（0-255），采用对数增长</li><li><strong>高 16 位</strong>：最近访问时间戳（分钟级）</li></ul><p><strong>频率统计</strong>：每次访问键时，频率计数器递增（对数增长，频率越高增长越慢）</p><p><strong>衰减机制</strong>：频率会随时间衰减</p><ul><li>衰减周期为 1 分钟</li><li>每次衰减频率右移一位（减半）</li><li>长时间未访问的键频率会快速降低</li><li>保证了 LFU 对&quot;新鲜热点&quot;的敏感度</li></ul></blockquote><p><strong>Q5: 什么是内存碎片率？如何降低内存碎片？</strong></p><blockquote><p><strong>内存碎片率</strong> = <code>used_memory_rss / used_memory</code></p><ul><li><code>used_memory</code>：Redis 实际使用的内存</li><li><code>used_memory_rss</code>：操作系统分配给 Redis 的内存</li></ul><p><strong>碎片率过高的影响</strong>：</p><ul><li>内存浪费，可用内存减少</li><li>可能触发不必要的内存淘汰</li></ul><p><strong>降低碎片的方法</strong>：</p><ol><li>使用 jemalloc 分配器（默认）</li><li>启用主动碎片整理（<code>activedefrag yes</code>）</li><li>手动触发 <code>MEMORY PURGE</code></li><li>合理规划键的大小，避免频繁分配释放</li><li>定期重启 Redis（最彻底但影响服务）</li></ol></blockquote><h3 id="_7-3-实际应用类" tabindex="-1">7.3 实际应用类 <a class="header-anchor" href="#_7-3-实际应用类" aria-label="Permalink to “7.3 实际应用类”">​</a></h3><p><strong>Q6: Redis 内存满了怎么办？如何选择淘汰策略？</strong></p><blockquote><p><strong>第一步：确认配置</strong></p><div class="language-redis"><button title="Copy Code" class="copy"></button><span class="lang">redis</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>CONFIG GET maxmemory</span></span>
<span class="line"><span>CONFIG GET maxmemory-policy</span></span></code></pre></div><p><strong>第二步：根据场景选择策略</strong></p><table tabindex="0"><thead><tr><th>场景</th><th>推荐策略</th></tr></thead><tbody><tr><td>通用缓存</td><td><code>allkeys-lfu</code>（推荐）</td></tr><tr><td>需要保留重要数据</td><td><code>volatile-lfu</code> + 设置过期时间</td></tr><tr><td>数据不能丢失</td><td><code>noeviction</code> + 扩容</td></tr></tbody></table><p><strong>第三步：监控与调优</strong></p><ul><li>设置合理的 <code>maxmemory</code>（物理内存的 50%-70%）</li><li>监控 <code>mem_fragmentation_ratio</code></li><li>定期检查大 Key</li></ul></blockquote><p><strong>Q7: 如何处理 Redis 中的大 Key 问题？</strong></p><blockquote><p><strong>检测大 Key</strong>：</p><div class="language-redis"><button title="Copy Code" class="copy"></button><span class="lang">redis</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>MEMORY USAGE key  // 查看单个 Key 内存占用</span></span></code></pre></div><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">redis-cli</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --bigkeys</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">  //</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> 批量扫描（慎用）</span></span></code></pre></div><p><strong>优化方案</strong>：</p><ol><li><strong>拆分大 Key</strong>：将大 Hash/Set 拆分为多个小 Key</li><li><strong>异步删除</strong>：使用 <code>UNLINK</code> 代替 <code>DEL</code></li><li><strong>分页存储</strong>：将大数据按页/分片存储</li><li><strong>数据结构优化</strong>：使用更紧凑的编码方式</li></ol><p><strong>预防措施</strong>：</p><ul><li>建立 Key 命名规范，限制 Key 大小</li><li>定期巡检，发现潜在大 Key</li><li>使用 Redis Cluster 分散大 Key</li></ul></blockquote><p><strong>Q8: Redis 的内存淘汰策略中，LRU 和 LFU 有什么区别？如何选择？</strong></p><blockquote><p><strong>核心区别</strong>：</p><table tabindex="0"><thead><tr><th>对比项</th><th>LRU</th><th>LFU</th></tr></thead><tbody><tr><td>思想</td><td>最近最少使用</td><td>最不经常使用</td></tr><tr><td>衡量标准</td><td>单次访问的新近性</td><td>长期访问的频率</td></tr><tr><td>抗抖动</td><td>弱（偶发访问影响大）</td><td>强（需要持续高频）</td></tr><tr><td>适合场景</td><td>时效性强的缓存</td><td>热点稳定的缓存</td></tr></tbody></table><p><strong>选择建议</strong>：</p><ul><li><strong>Redis 4.0+ 优先选择 LFU</strong>：更准确的热点识别</li><li>需要时效性（如会话缓存）：选择 LRU</li><li>热点稳定（如排行榜、热门商品）：选择 LFU</li><li><strong>不确定时选 LFU</strong>：综合表现更好</li></ul></blockquote><h3 id="_7-4-综合实战类" tabindex="-1">7.4 综合实战类 <a class="header-anchor" href="#_7-4-综合实战类" aria-label="Permalink to “7.4 综合实战类”">​</a></h3><p><strong>Q9: 如果让你设计一个高并发系统的 Redis 缓存方案，你会如何规划内存？</strong></p><blockquote><p><strong>第一步：容量规划</strong></p><ol><li>估算总数据量（考虑增长）</li><li>规划 Redis 内存（物理内存的 50%-70%）</li><li>预留安全余量（20%-30%）</li></ol><p><strong>第二步：策略配置</strong></p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>maxmemory 8gb</span></span>
<span class="line"><span>maxmemory-policy allkeys-lfu</span></span>
<span class="line"><span>activedefrag yes</span></span></code></pre></div><p><strong>第三步：数据分层</strong></p><table tabindex="0"><thead><tr><th>层级</th><th>数据类型</th><th>TTL</th><th>策略</th></tr></thead><tbody><tr><td>热数据</td><td>高频访问</td><td>短 TTL（1-5 分钟）</td><td>LFU 保留</td></tr><tr><td>温数据</td><td>中频访问</td><td>中 TTL（10-60 分钟）</td><td>LFU 保留</td></tr><tr><td>冷数据</td><td>低频访问</td><td>长 TTL（1-24 小时）</td><td>过期删除</td></tr></tbody></table><p><strong>第四步：监控告警</strong></p><ul><li>监控 <code>used_memory</code>、<code>mem_fragmentation_ratio</code></li><li>监控键数量和淘汰次数</li><li>设置内存告警阈值</li></ul><p><strong>第五步：定期优化</strong></p><ul><li>清理大 Key</li><li>调整 TTL 策略</li><li>检查碎片率</li></ul></blockquote><p><strong>Q10: Redis 集群中，如何避免热 Key 和大 Key 问题？</strong></p><blockquote><p><strong>热 Key 解决方案</strong>：</p><ol><li><strong>本地缓存</strong>：在应用层使用 Caffeine/Guava Cache 做二级缓存</li><li><strong>Key 散列</strong>：对热 Key 添加随机后缀分散到多个节点</li><li><strong>读多写少</strong>：使用只读副本分担读压力</li><li><strong>热点预热</strong>：在预期热点访问前预热数据</li></ol><p><strong>大 Key 解决方案</strong>：</p><ol><li><strong>数据分片</strong>：将大 Key 拆分为多个分片 Key</li><li><strong>Cluster Slot 分散</strong>：使用 Hash Tag 将相关 Key 分散到不同 Slot</li><li><strong>异步删除</strong>：使用 UNLINK 避免阻塞</li><li><strong>定期巡检</strong>：建立大 Key 检测和治理机制</li></ol><p><strong>组合策略</strong>：</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>原始方案:</span></span>
<span class="line"><span>  hot_user:1001:profile → 1MB（大 Key + 热 Key）</span></span>
<span class="line"><span></span></span>
<span class="line"><span>优化方案:</span></span>
<span class="line"><span>  1. 本地缓存 + Redis 二级缓存</span></span>
<span class="line"><span>  2. 拆分为: hot_user:{1001}:basic, hot_user:{1001}:detail</span></span>
<span class="line"><span>  3. 使用 Hash Tag 分散: {user}:1001:basic, {user}:1001:detail</span></span></code></pre></div></blockquote><hr><h2 id="本章小结" tabindex="-1">本章小结 <a class="header-anchor" href="#本章小结" aria-label="Permalink to “本章小结”">​</a></h2><p>本章全面深入地讲解了 Redis 内存管理与淘汰策略的核心知识：</p><h3 id="核心知识点回顾" tabindex="-1">核心知识点回顾 <a class="header-anchor" href="#核心知识点回顾" aria-label="Permalink to “核心知识点回顾”">​</a></h3><table tabindex="0"><thead><tr><th>章节</th><th>核心内容</th></tr></thead><tbody><tr><td><strong>内存模型</strong></td><td>数据区、缓冲区、碎片三大内存划分，<code>INFO memory</code> 关键字段解读</td></tr><tr><td><strong>内存分配器</strong></td><td>jemalloc 的三层架构（Arena→Chunk→Page）、Size Class 机制、多 Arena 技术</td></tr><tr><td><strong>过期机制</strong></td><td>惰性+定期混合策略、过期字典结构、EXPIRE/PEXPIRE/TTL/PERSIST 命令详解</td></tr><tr><td><strong>淘汰策略</strong></td><td>八种淘汰策略分类、近似 LRU 实现原理、LFU 频率统计与衰减机制</td></tr><tr><td><strong>监控优化</strong></td><td><code>MEMORY DOCTOR</code>/<code>MEMORY USAGE</code> 等诊断工具、内存碎片排查、大 Key 治理</td></tr><tr><td><strong>大 Key 问题</strong></td><td>大 Key 识别标准、危害分析、检测方法、拆分与渐进式删除方案</td></tr><tr><td><strong>面试题</strong></td><td>10 道精选面试题，覆盖基础概念、原理深入、实际应用、综合实战</td></tr></tbody></table><h3 id="关键命令速查" tabindex="-1">关键命令速查 <a class="header-anchor" href="#关键命令速查" aria-label="Permalink to “关键命令速查”">​</a></h3><table tabindex="0"><thead><tr><th>命令</th><th>说明</th></tr></thead><tbody><tr><td><code>INFO memory</code></td><td>查看内存使用详情</td></tr><tr><td><code>MEMORY DOCTOR</code></td><td>内存健康诊断</td></tr><tr><td><code>MEMORY USAGE key</code></td><td>查看键的内存占用</td></tr><tr><td><code>MEMORY PURGE</code></td><td>触发内存回收</td></tr><tr><td><code>MEMORY STATS</code></td><td>jemalloc 详细统计</td></tr><tr><td><code>CONFIG SET maxmemory</code></td><td>设置内存上限</td></tr><tr><td><code>CONFIG SET maxmemory-policy</code></td><td>设置淘汰策略</td></tr><tr><td><code>EXPIRE key seconds</code></td><td>设置过期时间</td></tr><tr><td><code>TTL key</code></td><td>查询剩余存活时间</td></tr><tr><td><code>UNLINK key</code></td><td>异步删除大 Key</td></tr></tbody></table><h3 id="写在最后" tabindex="-1">写在最后 <a class="header-anchor" href="#写在最后" aria-label="Permalink to “写在最后”">​</a></h3><p>Redis 的内存管理是其高性能的核心保障。理解 jemalloc 的分配原理、过期机制的混合策略、八种淘汰策略的适用场景，对于设计高可用的 Redis 架构至关重要。</p><p>在实际工作中，建议开发者：</p><ol><li><strong>建立内存监控习惯</strong>：定期检查 <code>INFO memory</code> 输出，关注碎片率和内存峰值</li><li><strong>选择合适的淘汰策略</strong>：大多数场景下 <code>allkeys-lfu</code> 是最佳选择</li><li><strong>预防大 Key 产生</strong>：在设计阶段就考虑数据分片和拆分方案</li><li><strong>持续学习和实践</strong>：Redis 4.0+ 的 LFU、主动碎片整理等特性值得深入研究</li></ol><blockquote><p><strong>Redis 内存管理的核心哲学：在有限的内存空间中，最大化数据价值，最小化性能损耗。</strong></p></blockquote>`,236)])])}const g=a(e,[["render",p]]);export{k as __pageData,g as default};
