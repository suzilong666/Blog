import{_ as i,o as a,c as n,ah as l}from"./chunks/framework.CPHJ30oF.js";const c=JSON.parse('{"title":"JVM 调优实战","description":"","frontmatter":{},"headers":[{"level":2,"title":"JVM 参数配置","slug":"jvm-参数配置","link":"#jvm-参数配置","children":[{"level":3,"title":"堆内存配置","slug":"堆内存配置","link":"#堆内存配置","children":[]},{"level":3,"title":"元空间配置","slug":"元空间配置","link":"#元空间配置","children":[]},{"level":3,"title":"GC 器选择","slug":"gc-器选择","link":"#gc-器选择","children":[]}]},{"level":2,"title":"GC 日志分析","slug":"gc-日志分析","link":"#gc-日志分析","children":[{"level":3,"title":"开启 GC 日志","slug":"开启-gc-日志","link":"#开启-gc-日志","children":[]},{"level":3,"title":"GC 日志格式","slug":"gc-日志格式","link":"#gc-日志格式","children":[]},{"level":3,"title":"GC 日志分析工具","slug":"gc-日志分析工具","link":"#gc-日志分析工具","children":[]}]},{"level":2,"title":"内存问题诊断","slug":"内存问题诊断","link":"#内存问题诊断","children":[{"level":3,"title":"OutOfMemoryError 分析","slug":"outofmemoryerror-分析","link":"#outofmemoryerror-分析","children":[]},{"level":3,"title":"堆转储分析","slug":"堆转储分析","link":"#堆转储分析","children":[]},{"level":3,"title":"内存泄漏检测","slug":"内存泄漏检测","link":"#内存泄漏检测","children":[]}]},{"level":2,"title":"性能分析工具","slug":"性能分析工具","link":"#性能分析工具","children":[{"level":3,"title":"jstat 命令","slug":"jstat-命令","link":"#jstat-命令","children":[]},{"level":3,"title":"jmap 命令","slug":"jmap-命令","link":"#jmap-命令","children":[]},{"level":3,"title":"jstack 命令","slug":"jstack-命令","link":"#jstack-命令","children":[]},{"level":3,"title":"Arthas 工具","slug":"arthas-工具","link":"#arthas-工具","children":[]}]},{"level":2,"title":"常见调优场景","slug":"常见调优场景","link":"#常见调优场景","children":[{"level":3,"title":"场景一：频繁 Full GC","slug":"场景一-频繁-full-gc","link":"#场景一-频繁-full-gc","children":[]},{"level":3,"title":"场景二：内存泄漏","slug":"场景二-内存泄漏","link":"#场景二-内存泄漏","children":[]},{"level":3,"title":"场景三：响应延迟高","slug":"场景三-响应延迟高","link":"#场景三-响应延迟高","children":[]}]},{"level":2,"title":"调优流程","slug":"调优流程","link":"#调优流程","children":[{"level":3,"title":"系统化调优步骤","slug":"系统化调优步骤","link":"#系统化调优步骤","children":[]},{"level":3,"title":"调优检查清单","slug":"调优检查清单","link":"#调优检查清单","children":[]}]},{"level":2,"title":"总结","slug":"总结","link":"#总结","children":[]}],"relativePath":"java/expert/JVM调优.md","filePath":"java/expert/JVM调优.md"}'),p={name:"java/expert/JVM调优.md"};function h(e,s,k,t,r,d){return a(),n("div",null,[...s[0]||(s[0]=[l(`<h1 id="jvm-调优实战" tabindex="-1">JVM 调优实战 <a class="header-anchor" href="#jvm-调优实战" aria-label="Permalink to “JVM 调优实战”">​</a></h1><p>JVM 调优是性能优化的重要技能。本文将从实战角度讲解 JVM 参数配置、GC 调优、内存问题诊断以及性能分析工具的使用。</p><h2 id="jvm-参数配置" tabindex="-1">JVM 参数配置 <a class="header-anchor" href="#jvm-参数配置" aria-label="Permalink to “JVM 参数配置”">​</a></h2><h3 id="堆内存配置" tabindex="-1">堆内存配置 <a class="header-anchor" href="#堆内存配置" aria-label="Permalink to “堆内存配置”">​</a></h3><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 堆内存大小设置</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># -Xms: 初始堆内存（建议与 -Xmx 设置相同，避免动态扩容）</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># -Xmx: 最大堆内存</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># -Xmn: 新生代大小</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 示例：设置 4GB 堆内存</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">java</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -Xms4g</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -Xmx4g</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -jar</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> myapp.jar</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 推荐设置</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 1. -Xms 和 -Xmx 设置为相同值，避免 GC 时调整大小</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 2. 根据服务器内存设置，一般为物理内存的 1/2 ~ 2/3</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 3. 留足系统内存和其他进程内存</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 新生代大小设置</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">java</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -Xms4g</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -Xmx4g</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -Xmn1g</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -jar</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> myapp.jar</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 新生代与老年代比例</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># -XX:NewRatio=2 表示老年代:新生代=2:1</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># -XX:SurvivorRatio=8 表示 Eden:Survivor=8:1</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">java</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -Xms4g</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -Xmx4g</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -XX:NewRatio=2</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -XX:SurvivorRatio=8</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -jar</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> myapp.jar</span></span></code></pre></div><h3 id="元空间配置" tabindex="-1">元空间配置 <a class="header-anchor" href="#元空间配置" aria-label="Permalink to “元空间配置”">​</a></h3><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 元空间设置（JDK 8+）</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># -XX:MetaspaceSize: 初始元空间大小</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># -XX:MaxMetaspaceSize: 最大元空间大小（建议设置，防止内存泄漏）</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 示例</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">java</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -XX:MetaspaceSize=256m</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -XX:MaxMetaspaceSize=512m</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -jar</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> myapp.jar</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 永久代设置（JDK 7 及以前）</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># -XX:PermSize=256m</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># -XX:MaxPermSize=512m</span></span></code></pre></div><h3 id="gc-器选择" tabindex="-1">GC 器选择 <a class="header-anchor" href="#gc-器选择" aria-label="Permalink to “GC 器选择”">​</a></h3><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># Serial GC：单线程，适合小内存应用</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">java</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -XX:+UseSerialGC</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -Xmx256m</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -jar</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> myapp.jar</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># Parallel Scavenge GC：多线程，吞吐量优先</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">java</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -XX:+UseParallelGC</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -Xmx4g</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -jar</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> myapp.jar</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># CMS GC：低延迟，JDK 14 已废弃</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">java</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -XX:+UseConcMarkSweepGC</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -Xmx4g</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -jar</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> myapp.jar</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># G1 GC：JDK 9+ 默认，适合大堆内存</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">java</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -XX:+UseG1GC</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -Xmx4g</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -jar</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> myapp.jar</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># G1 参数调优</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">java</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -XX:+UseG1GC</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> \\</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">     -XX:G1HeapRegionSize=16m</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> \\ </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">         # Region 大小</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">     -XX:MaxGCPauseMillis</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">=200</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> \\ </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">         # 目标停顿时间</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">     -XX:InitiatingHeapOccupancyPercent</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">=45</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> \\ </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> # 触发并发标记的阈值</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">     -Xmx4g</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -jar</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> myapp.jar</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># ZGC：超低延迟，JDK 11+</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">java</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -XX:+UseZGC</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -Xmx16g</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -jar</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> myapp.jar</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># Shenandoah：低延迟，OpenJDK 12+</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">java</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -XX:+UseShenandoahGC</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -Xmx4g</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -jar</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> myapp.jar</span></span></code></pre></div><h2 id="gc-日志分析" tabindex="-1">GC 日志分析 <a class="header-anchor" href="#gc-日志分析" aria-label="Permalink to “GC 日志分析”">​</a></h2><h3 id="开启-gc-日志" tabindex="-1">开启 GC 日志 <a class="header-anchor" href="#开启-gc-日志" aria-label="Permalink to “开启 GC 日志”">​</a></h3><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># JDK 8 及以前</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">java</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -XX:+PrintGCDetails</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> \\</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">     -XX:+PrintGCDateStamps</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> \\</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">     -XX:+PrintGCTimeStamps</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> \\</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">     -Xloggc:/path/to/gc.log</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> \\</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">     -jar</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> myapp.jar</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># JDK 9+ 统一日志</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">java</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -Xlog:gc</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">*</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">=info:file=gc.log:time,uptime,level,tags</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> \\</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">     -jar</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> myapp.jar</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 详细 GC 日志</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">java</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -Xlog:gc</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">*</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">=debug:file=gc-debug.log</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> \\</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">     -jar</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> myapp.jar</span></span></code></pre></div><h3 id="gc-日志格式" tabindex="-1">GC 日志格式 <a class="header-anchor" href="#gc-日志格式" aria-label="Permalink to “GC 日志格式”">​</a></h3><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span># G1 GC 日志示例</span></span>
<span class="line"><span>[2024-01-15T10:30:45.123+0800] [gc,start     ] GC(1) Pause Young (Normal) (G1 Evacuation Pause)</span></span>
<span class="line"><span>[2024-01-15T10:30:45.123+0800] [gc,task      ] GC(1)   1.234ms: Pause Young (Normal) (G1 Evacuation Pause)</span></span>
<span class="line"><span>[2024-01-15T10:30:45.124+0800] [gc,heap      ] GC(1) Heap before GC: 2.0Gi (3.0Gi)</span></span>
<span class="line"><span>[2024-01-15T10:30:45.125+0800] [gc,heap      ] GC(1) Heap after GC: 1.5Gi (3.0Gi)</span></span>
<span class="line"><span>[2024-01-15T10:30:45.125+0800] [gc,end       ] GC(1) Pause Young (Normal) (G1 Evacuation Pause) 1.234ms</span></span>
<span class="line"><span></span></span>
<span class="line"><span># CMS GC 日志示例</span></span>
<span class="line"><span>2024-01-15T10:30:45.123: [GC (CMS Initial Mark) [1 CMS-initial-mark: 1024000K(2048000K)] 1024500K(4096000K), 0.001234 secs]</span></span>
<span class="line"><span>2024-01-15T10:30:45.125: [CMS-concurrent-mark-start]</span></span>
<span class="line"><span>2024-01-15T10:30:45.500: [CMS-concurrent-mark: 0.375/0.375 secs]</span></span>
<span class="line"><span>2024-01-15T10:30:45.500: [CMS-concurrent-preclean-start]</span></span></code></pre></div><h3 id="gc-日志分析工具" tabindex="-1">GC 日志分析工具 <a class="header-anchor" href="#gc-日志分析工具" aria-label="Permalink to “GC 日志分析工具”">​</a></h3><ol><li><strong>GCViewer</strong>：开源工具，可视化分析 GC 日志</li><li><strong>GCeasy</strong>：在线工具，上传日志分析</li><li><strong>Universal Java GC Log Analyser</strong>：多 GC 器支持</li></ol><h2 id="内存问题诊断" tabindex="-1">内存问题诊断 <a class="header-anchor" href="#内存问题诊断" aria-label="Permalink to “内存问题诊断”">​</a></h2><h3 id="outofmemoryerror-分析" tabindex="-1">OutOfMemoryError 分析 <a class="header-anchor" href="#outofmemoryerror-分析" aria-label="Permalink to “OutOfMemoryError 分析”">​</a></h3><div class="language-java"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 常见 OOM 场景</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 1. Java heap space</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 原因：堆内存不足，对象创建过多或内存泄漏</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 解决：增加 -Xmx，排查内存泄漏</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 2. Metaspace</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 原因：元空间不足，加载的类过多</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 解决：增加 -XX:MaxMetaspaceSize</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 3. GC overhead limit exceeded</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 原因：GC 耗时过长（98% 时间做 GC，回收 &lt; 2%）</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 解决：增加堆内存，优化对象生命周期</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 4. Direct buffer memory</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 原因：NIO 直接内存不足</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 解决：增加 -XX:MaxDirectMemorySize</span></span></code></pre></div><h3 id="堆转储分析" tabindex="-1">堆转储分析 <a class="header-anchor" href="#堆转储分析" aria-label="Permalink to “堆转储分析”">​</a></h3><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 生成堆转储</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 方式一：自动生成（OOM 时）</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">java</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -XX:+HeapDumpOnOutOfMemoryError</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> \\</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">     -XX:HeapDumpPath=/path/to/dump.hprof</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> \\</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">     -jar</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> myapp.jar</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 方式二：手动生成</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">jmap</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -dump:live,format=b,file=heap.hprof</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> &lt;</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">pi</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">d</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 方式三：jcmd</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">jcmd</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> &lt;</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">pi</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">d</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&gt;</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> GC.heap_dump</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> /path/to/dump.hprof</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 分析工具</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 1. Eclipse MAT（Memory Analyzer Tool）</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 2. VisualVM</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 3. YourKit Java Profiler</span></span></code></pre></div><h3 id="内存泄漏检测" tabindex="-1">内存泄漏检测 <a class="header-anchor" href="#内存泄漏检测" aria-label="Permalink to “内存泄漏检测”">​</a></h3><div class="language-java"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">public</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> class</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> MemoryLeakExample</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    </span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    // 常见内存泄漏场景</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    </span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    // 1. 集合未清理</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    private</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> static</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> final</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> List&lt;</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">Object</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt; cache </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> new</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> ArrayList&lt;&gt;();</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    </span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    public</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> void</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> addToCache</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(Object </span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">obj</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        cache.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">add</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(obj);  </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 只添加不清理</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    </span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    // 2. 静态集合持有对象</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    private</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> static</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> Map&lt;</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">String</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">Object</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt; leakMap </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> new</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> HashMap&lt;&gt;();</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    </span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    // 3. 监听器未注销</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    public</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> class</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> EventManager</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">        private</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> final</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> List&lt;</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">EventListener</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt; listeners </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> new</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> ArrayList&lt;&gt;();</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        </span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">        public</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> void</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> register</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(EventListener </span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">listener</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">            listeners.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">add</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(listener);</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">            // 缺少 unregister 方法</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    </span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    // 4. 资源未关闭</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    public</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> void</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> readFile</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">() {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        FileInputStream fis </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> null</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">        try</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">            fis </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> new</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> FileInputStream</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;file.txt&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">);</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">            // 读取文件</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        } </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">catch</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (IOException </span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">e</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) {</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">            // 异常处理</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        }</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">        // 缺少 finally 关闭 fis</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    </span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    // 5. ThreadLocal 未清理</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    private</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> static</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> final</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> ThreadLocal&lt;</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">User</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt; userHolder </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> new</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> ThreadLocal&lt;&gt;();</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    </span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    public</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> void</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> setUser</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(User </span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">user</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        userHolder.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">set</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(user);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    </span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    // 在线程池中必须清理</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    public</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> void</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> cleanup</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">() {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        userHolder.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">remove</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">();</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><h2 id="性能分析工具" tabindex="-1">性能分析工具 <a class="header-anchor" href="#性能分析工具" aria-label="Permalink to “性能分析工具”">​</a></h2><h3 id="jstat-命令" tabindex="-1">jstat 命令 <a class="header-anchor" href="#jstat-命令" aria-label="Permalink to “jstat 命令”">​</a></h3><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 监控 GC 统计</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">jstat</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -gc</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> &lt;</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">pi</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">d</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> [interval] [count]</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">jstat</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -gc</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 12345</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 1000</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 10</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 输出示例：</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># S0C    S1C    S0U    S1U      EC       EU        OC         OU       MC     MU    CCSC   CCSU   YGC     YGCT    FGC    FGCT     GCT</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 1024.0 1024.0  512.0  768.0  81920.0 65536.0  163840.0   32768.0  2560.0 1280.0  256.0  128.0   1234    12.345     5    0.123    12.468</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 列含义：</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># S0C/S1C: Survivor0/1 容量</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># S0U/S1U: Survivor0/1 使用量</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># EC/EU: Eden 容量/使用量</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># OC/OU: 老年代容量/使用量</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># MC/MU: 元空间容量/使用量</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># YGC/YGCT: Young GC 次数/时间</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># FGC/FGCT: Full GC 次数/时间</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># GCT: 总 GC 时间</span></span></code></pre></div><h3 id="jmap-命令" tabindex="-1">jmap 命令 <a class="header-anchor" href="#jmap-命令" aria-label="Permalink to “jmap 命令”">​</a></h3><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 查看堆内存使用情况</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">jmap</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -heap</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> &lt;</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">pi</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">d</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 输出示例：</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># using thread-local object allocation.</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># Parallel GC with 2 thread(s)</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># Heap Configuration:</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#    MinHeapSize       = 2147483648 (2048.0MB)</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#    MaxHeapSize       = 2147483648 (2048.0MB)</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#    NewSize           = 268435456 (256.0MB)</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#    MaxNewSize        = 268435456 (256.0MB)</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#    OldSize           = 543581184 (518.4MB)</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#    NewRatio          = 2</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#    SurvivorRatio     = 8</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#    MetaspaceSize     = 218013696 (208.0MB)</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#    MaxMetaspaceSize  = 17592186046828800 (16.0EB)</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># Heap Usage:</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># PS Young Generation</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#    Eden Space      2147483648 (2048.0MB)</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#                      From Space 268435456 (256.0MB)</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#                      To Space   268435456 (256.0MB)</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># PS Old Generation</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#    Old Space       1638400000 (1562.5MB)</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 查看对象统计</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">jmap</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -histo:live</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> &lt;</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">pi</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">d</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 输出示例：</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#  num     #instances         #bytes  class name</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># ----------------------------------------------</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#    1:         12345        12345678  java.util.HashMap$Node</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#    2:         56789         8901234  java.lang.String</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#    3:          1234         5678901  [B</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 生成堆转储</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">jmap</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -dump:live,format=b,file=heap.hprof</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> &lt;</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">pi</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">d</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&gt;</span></span></code></pre></div><h3 id="jstack-命令" tabindex="-1">jstack 命令 <a class="header-anchor" href="#jstack-命令" aria-label="Permalink to “jstack 命令”">​</a></h3><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 查看线程堆栈</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">jstack</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> &lt;</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">pi</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">d</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 查看死锁</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">jstack</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -l</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> &lt;</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">pi</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">d</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&gt;</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> |</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> grep</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -A</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 20</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;Found one Java-level deadlock&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 输出示例：</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># &quot;Thread-1&quot; #12 prio=5 os_prio=0 cpu=123.45ms elapsed=12.34s tid=0x00007f123400 nid=0x1234 waiting for monitor entry [0x00007f123000]</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#    java.lang.Thread.State: BLOCKED (on object monitor)</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#         at com.example.LockExample.method1(LockExample.java:15)</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#         - waiting to lock &lt;0x00007f000000&gt; (a java.lang.Object)</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#         - locked &lt;0x00007f000001&gt; (a java.lang.Object)</span></span></code></pre></div><h3 id="arthas-工具" tabindex="-1">Arthas 工具 <a class="header-anchor" href="#arthas-工具" aria-label="Permalink to “Arthas 工具”">​</a></h3><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 阿里巴巴开源的 Java 诊断工具</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 下载：https://arthas.aliyun.com/</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 常用命令</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 1. dashboard：实时仪表盘</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">dashboard</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 2. thread：线程分析</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">thread</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">           # 查看所有线程</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">thread</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -n</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 3</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">      # 查看最忙的 3 个线程</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">thread</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -b</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">        # 查看阻塞的线程</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 3. heapdump：堆转储</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">heapdump</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --live</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> /path/to/dump.hprof</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 4. gc：触发 GC</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">gc</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 5. monitor：方法调用监控</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">monitor</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -c</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 5</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> com.example.Service</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> method</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 6. trace：方法调用链追踪</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">trace</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> com.example.Service</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> method</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 7. watch：方法参数和返回值</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">watch</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> com.example.Service</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> method</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;{params, returnObj}&#39;</span></span></code></pre></div><h2 id="常见调优场景" tabindex="-1">常见调优场景 <a class="header-anchor" href="#常见调优场景" aria-label="Permalink to “常见调优场景”">​</a></h2><h3 id="场景一-频繁-full-gc" tabindex="-1">场景一：频繁 Full GC <a class="header-anchor" href="#场景一-频繁-full-gc" aria-label="Permalink to “场景一：频繁 Full GC”">​</a></h3><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 问题现象：</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 1. GC 日志中频繁出现 Full GC</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 2. 应用停顿时间过长</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 3. CPU 使用率高</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 排查步骤：</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 1. 查看 GC 日志，确认频率和耗时</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 2. 使用 jstat 监控堆内存变化</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 3. 使用 jmap 查看对象分布</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 4. 分析堆转储找出大对象</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 解决方案：</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 1. 增加堆内存大小</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 2. 优化对象创建，减少临时对象</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 3. 调整 GC 参数（增大新生代、调整阈值）</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 4. 修复内存泄漏</span></span></code></pre></div><h3 id="场景二-内存泄漏" tabindex="-1">场景二：内存泄漏 <a class="header-anchor" href="#场景二-内存泄漏" aria-label="Permalink to “场景二：内存泄漏”">​</a></h3><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 排查步骤：</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 1. 监控堆内存使用趋势（jstat）</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 2. 生成堆转储（jmap）</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 3. 使用 MAT 分析堆转储</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 4. 找出可疑对象（大对象、久存对象）</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 5. 定位代码位置</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 6. 修复并验证</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># MAT 分析要点：</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 1. Histogram：查看对象数量和大小</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 2. Dominator Tree：查看对象占用</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 3. Path to GC Roots：查看引用链</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 4. OQL：对象查询语言</span></span></code></pre></div><h3 id="场景三-响应延迟高" tabindex="-1">场景三：响应延迟高 <a class="header-anchor" href="#场景三-响应延迟高" aria-label="Permalink to “场景三：响应延迟高”">​</a></h3><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 排查步骤：</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 1. 分析 GC 日志，确认停顿时间</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 2. 使用 jstack 查看线程状态</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 3. 使用 Arthas trace 追踪方法耗时</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 4. 分析性能瓶颈</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 解决方案：</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 1. 切换到低延迟 GC（G1, ZGC）</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 2. 调整 GC 参数，减少停顿</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 3. 优化慢代码</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 4. 增加资源（CPU、内存）</span></span></code></pre></div><h2 id="调优流程" tabindex="-1">调优流程 <a class="header-anchor" href="#调优流程" aria-label="Permalink to “调优流程”">​</a></h2><h3 id="系统化调优步骤" tabindex="-1">系统化调优步骤 <a class="header-anchor" href="#系统化调优步骤" aria-label="Permalink to “系统化调优步骤”">​</a></h3><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>┌─────────────────────────────────────────────────────────┐</span></span>
<span class="line"><span>│                    JVM 调优流程                           │</span></span>
<span class="line"><span>│                                                           │</span></span>
<span class="line"><span>│  1. 收集基线数据                                          │</span></span>
<span class="line"><span>│     - GC 日志、监控指标、性能测试                          │</span></span>
<span class="line"><span>│     - 建立性能基线                                        │</span></span>
<span class="line"><span>│                                                           │</span></span>
<span class="line"><span>│  2. 分析瓶颈                                             │</span></span>
<span class="line"><span>│     - 识别 GC 问题（频繁 GC、长时间停顿）                   │</span></span>
<span class="line"><span>│     - 识别内存问题（泄漏、溢出）                           │</span></span>
<span class="line"><span>│     - 识别性能问题（慢方法、高 CPU）                       │</span></span>
<span class="line"><span>│                                                           │</span></span>
<span class="line"><span>│  3. 制定优化方案                                          │</span></span>
<span class="line"><span>│     - 调整 JVM 参数                                       │</span></span>
<span class="line"><span>│     - 优化代码                                            │</span></span>
<span class="line"><span>│     - 选择合适的 GC 器                                    │</span></span>
<span class="line"><span>│                                                           │</span></span>
<span class="line"><span>│  4. 实施与验证                                            │</span></span>
<span class="line"><span>│     - 测试环境验证                                        │</span></span>
<span class="line"><span>│     - 监控指标变化                                        │</span></span>
<span class="line"><span>│     - A/B 对比                                           │</span></span>
<span class="line"><span>│                                                           │</span></span>
<span class="line"><span>│  5. 持续监控                                             │</span></span>
<span class="line"><span>│     - 建立监控告警                                        │</span></span>
<span class="line"><span>│     - 定期回顾性能                                        │</span></span>
<span class="line"><span>│     - 文档化调优成果                                      │</span></span>
<span class="line"><span>└─────────────────────────────────────────────────────────┘</span></span></code></pre></div><h3 id="调优检查清单" tabindex="-1">调优检查清单 <a class="header-anchor" href="#调优检查清单" aria-label="Permalink to “调优检查清单”">​</a></h3><ol><li><strong>堆内存</strong>：-Xms 和 -Xmx 是否设置为相同值？</li><li><strong>新生代</strong>：新生代大小是否合理？是否频繁 Young GC？</li><li><strong>GC 器</strong>：是否选择了适合的 GC 器？</li><li><strong>元空间</strong>：MaxMetaspaceSize 是否设置？</li><li><strong>GC 日志</strong>：是否开启 GC 日志？</li><li><strong>监控</strong>：是否建立了 GC 监控？</li><li><strong>代码</strong>：是否存在内存泄漏风险？</li><li><strong>工具</strong>：是否掌握了 jstat、jmap、jstack 等工具？</li></ol><h2 id="总结" tabindex="-1">总结 <a class="header-anchor" href="#总结" aria-label="Permalink to “总结”">​</a></h2><p>掌握 JVM 调优后，你应该能够：</p><ul><li>✅ 配置 JVM 参数，优化内存布局</li><li>✅ 分析 GC 日志，诊断 GC 问题</li><li>✅ 排查 OOM 和内存泄漏</li><li>✅ 使用 jstat、jmap、jstack 等诊断工具</li><li>✅ 使用 Arthas 进行线上诊断</li><li>✅ 系统化地进行 JVM 性能调优</li></ul><p>接下来，你可以继续学习 <a href="/blog/java/expert/并发编程深入.html">并发编程深入</a>，进一步掌握并发编程的高级技巧！</p>`,48)])])}const y=i(p,[["render",h]]);export{c as __pageData,y as default};
