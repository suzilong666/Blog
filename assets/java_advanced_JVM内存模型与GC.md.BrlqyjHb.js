import{_ as a,o as n,c as i,ah as l}from"./chunks/framework.CPHJ30oF.js";const g=JSON.parse('{"title":"JVM 内存模型与垃圾回收","description":"","frontmatter":{},"headers":[{"level":2,"title":"JVM 内存结构","slug":"jvm-内存结构","link":"#jvm-内存结构","children":[{"level":3,"title":"运行时数据区","slug":"运行时数据区","link":"#运行时数据区","children":[]},{"level":3,"title":"各区域详解","slug":"各区域详解","link":"#各区域详解","children":[]}]},{"level":2,"title":"对象的创建与访问","slug":"对象的创建与访问","link":"#对象的创建与访问","children":[{"level":3,"title":"对象创建过程","slug":"对象创建过程","link":"#对象创建过程","children":[]},{"level":3,"title":"对象内存布局","slug":"对象内存布局","link":"#对象内存布局","children":[]},{"level":3,"title":"访问对象的两种方式","slug":"访问对象的两种方式","link":"#访问对象的两种方式","children":[]}]},{"level":2,"title":"垃圾回收概述","slug":"垃圾回收概述","link":"#垃圾回收概述","children":[{"level":3,"title":"什么是垃圾","slug":"什么是垃圾","link":"#什么是垃圾","children":[]},{"level":3,"title":"判断对象是否为垃圾","slug":"判断对象是否为垃圾","link":"#判断对象是否为垃圾","children":[{"level":4,"title":"引用计数法（已淘汰）","slug":"引用计数法-已淘汰","link":"#引用计数法-已淘汰","children":[]},{"level":4,"title":"可达性分析算法（当前使用）","slug":"可达性分析算法-当前使用","link":"#可达性分析算法-当前使用","children":[]}]}]},{"level":2,"title":"垃圾回收算法","slug":"垃圾回收算法","link":"#垃圾回收算法","children":[{"level":3,"title":"标记-清除算法（Mark-Sweep）","slug":"标记-清除算法-mark-sweep","link":"#标记-清除算法-mark-sweep","children":[]},{"level":3,"title":"复制算法（Copying）","slug":"复制算法-copying","link":"#复制算法-copying","children":[]},{"level":3,"title":"标记-整理算法（Mark-Compact）","slug":"标记-整理算法-mark-compact","link":"#标记-整理算法-mark-compact","children":[]},{"level":3,"title":"分代收集算法（Generational）","slug":"分代收集算法-generational","link":"#分代收集算法-generational","children":[]}]},{"level":2,"title":"垃圾回收器","slug":"垃圾回收器","link":"#垃圾回收器","children":[{"level":3,"title":"垃圾回收器分类","slug":"垃圾回收器分类","link":"#垃圾回收器分类","children":[]},{"level":3,"title":"常见 GC 器","slug":"常见-gc-器","link":"#常见-gc-器","children":[]},{"level":3,"title":"G1 收集器详解","slug":"g1-收集器详解","link":"#g1-收集器详解","children":[]},{"level":3,"title":"常用 JVM 参数","slug":"常用-jvm-参数","link":"#常用-jvm-参数","children":[]}]},{"level":2,"title":"对象的生命周期","slug":"对象的生命周期","link":"#对象的生命周期","children":[{"level":3,"title":"对象的死亡","slug":"对象的死亡","link":"#对象的死亡","children":[]},{"level":3,"title":"finalize 方法","slug":"finalize-方法","link":"#finalize-方法","children":[]}]},{"level":2,"title":"监控与诊断工具","slug":"监控与诊断工具","link":"#监控与诊断工具","children":[{"level":3,"title":"命令行工具","slug":"命令行工具","link":"#命令行工具","children":[]},{"level":3,"title":"GUI 工具","slug":"gui-工具","link":"#gui-工具","children":[]}]},{"level":2,"title":"总结","slug":"总结","link":"#总结","children":[]}],"relativePath":"java/advanced/JVM内存模型与GC.md","filePath":"java/advanced/JVM内存模型与GC.md"}'),p={name:"java/advanced/JVM内存模型与GC.md"};function e(h,s,t,k,r,d){return n(),i("div",null,[...s[0]||(s[0]=[l(`<h1 id="jvm-内存模型与垃圾回收" tabindex="-1">JVM 内存模型与垃圾回收 <a class="header-anchor" href="#jvm-内存模型与垃圾回收" aria-label="Permalink to “JVM 内存模型与垃圾回收”">​</a></h1><p>JVM 内存模型和垃圾回收机制是 Java 性能优化的核心知识。本文将深入讲解 JVM 的内存结构、对象创建过程、GC 算法以及常用的垃圾回收器。</p><h2 id="jvm-内存结构" tabindex="-1">JVM 内存结构 <a class="header-anchor" href="#jvm-内存结构" aria-label="Permalink to “JVM 内存结构”">​</a></h2><h3 id="运行时数据区" tabindex="-1">运行时数据区 <a class="header-anchor" href="#运行时数据区" aria-label="Permalink to “运行时数据区”">​</a></h3><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>┌─────────────────────────────────────────────────────────────────┐</span></span>
<span class="line"><span>│                         JVM 运行时数据区                          │</span></span>
<span class="line"><span>│                                                                   │</span></span>
<span class="line"><span>│  ┌─────────────────────────────────────────────────────────┐    │</span></span>
<span class="line"><span>│  │                      线程共享区域                         │    │</span></span>
<span class="line"><span>│  │                                                           │    │</span></span>
<span class="line"><span>│  │  ┌─────────────────────────────────────────────────┐   │    │</span></span>
<span class="line"><span>│  │  │                  堆 (Heap)                       │   │    │</span></span>
<span class="line"><span>│  │  │  ┌─────────────────────────────────────────┐   │   │    │</span></span>
<span class="line"><span>│  │  │  │              新生代 (Young)               │   │   │    │</span></span>
<span class="line"><span>│  │  │  │  ┌─────────┐  ┌─────────┐  ┌─────────┐ │   │   │    │</span></span>
<span class="line"><span>│  │  │  │  │   Eden  │  │ Survivor0│  │ Survivor1│ │   │   │    │</span></span>
<span class="line"><span>│  │  │  │  └─────────┘  └─────────┘  └─────────┘ │   │   │    │</span></span>
<span class="line"><span>│  │  │  └─────────────────────────────────────────┘   │   │    │</span></span>
<span class="line"><span>│  │  │  ┌─────────────────────────────────────────┐   │   │    │</span></span>
<span class="line"><span>│  │  │  │              老年代 (Old)                  │   │   │    │</span></span>
<span class="line"><span>│  │  │  │  ┌─────────────────────────────────────┐ │   │   │    │</span></span>
<span class="line"><span>│  │  │  │  │          长期存活对象                  │ │   │   │    │</span></span>
<span class="line"><span>│  │  │  │  └─────────────────────────────────────┘ │   │   │    │</span></span>
<span class="line"><span>│  │  │  └─────────────────────────────────────────┘   │   │    │</span></span>
<span class="line"><span>│  │  └─────────────────────────────────────────────────┘   │    │</span></span>
<span class="line"><span>│  │                                                           │    │</span></span>
<span class="line"><span>│  │  ┌─────────────────────────────────────────────────┐   │    │</span></span>
<span class="line"><span>│  │  │            方法区 / 元空间 (Metaspace)            │   │    │</span></span>
<span class="line"><span>│  │  │  - 类信息、常量、静态变量、JIT 编译后的代码       │   │    │</span></span>
<span class="line"><span>│  │  └─────────────────────────────────────────────────┘   │    │</span></span>
<span class="line"><span>│  └─────────────────────────────────────────────────────────┘    │</span></span>
<span class="line"><span>│                                                                   │</span></span>
<span class="line"><span>│  ┌─────────────────────────────────────────────────────────┐    │</span></span>
<span class="line"><span>│  │                      线程私有区域                         │    │</span></span>
<span class="line"><span>│  │                                                           │    │</span></span>
<span class="line"><span>│  │  ┌─────────────────────────────────────────────────┐   │    │</span></span>
<span class="line"><span>│  │  │  虚拟机栈 (VM Stack)                              │   │    │</span></span>
<span class="line"><span>│  │  │  ┌─────────────────────────────────────────┐   │   │    │</span></span>
<span class="line"><span>│  │  │  │  栈帧: 局部变量表、操作数栈、动态链接、返回地址 │   │   │    │</span></span>
<span class="line"><span>│  │  │  └─────────────────────────────────────────┘   │   │    │</span></span>
<span class="line"><span>│  │  └─────────────────────────────────────────────────┘   │    │</span></span>
<span class="line"><span>│  │                                                           │    │</span></span>
<span class="line"><span>│  │  ┌─────────────────────────────────────────────────┐   │    │</span></span>
<span class="line"><span>│  │  │  本地方法栈 (Native Method Stack)                  │   │    │</span></span>
<span class="line"><span>│  │  │  - 为 Native 方法服务                              │   │    │</span></span>
<span class="line"><span>│  │  └─────────────────────────────────────────────────┘   │    │</span></span>
<span class="line"><span>│  │                                                           │    │</span></span>
<span class="line"><span>│  │  ┌─────────────────────────────────────────────────┐   │    │</span></span>
<span class="line"><span>│  │  │  程序计数器 (Program Counter)                      │   │    │</span></span>
<span class="line"><span>│  │  │  - 记录当前线程执行的字节码行号                      │   │    │</span></span>
<span class="line"><span>│  │  └─────────────────────────────────────────────────┘   │    │</span></span>
<span class="line"><span>│  └─────────────────────────────────────────────────────────┘    │</span></span>
<span class="line"><span>└─────────────────────────────────────────────────────────────────┘</span></span></code></pre></div><h3 id="各区域详解" tabindex="-1">各区域详解 <a class="header-anchor" href="#各区域详解" aria-label="Permalink to “各区域详解”">​</a></h3><table tabindex="0"><thead><tr><th>区域</th><th>类型</th><th>说明</th><th>异常</th></tr></thead><tbody><tr><td>堆 (Heap)</td><td>共享</td><td>存储对象实例和数组</td><td>OutOfMemoryError</td></tr><tr><td>方法区</td><td>共享</td><td>存储类信息、常量、静态变量</td><td>OutOfMemoryError</td></tr><tr><td>元空间 (JDK8+)</td><td>共享</td><td>替代永久代，使用本地内存</td><td>OutOfMemoryError</td></tr><tr><td>虚拟机栈</td><td>私有</td><td>存储栈帧（局部变量、操作数栈）</td><td>StackOverflowError</td></tr><tr><td>本地方法栈</td><td>私有</td><td>为 Native 方法服务</td><td>StackOverflowError</td></tr><tr><td>程序计数器</td><td>私有</td><td>记录字节码执行位置</td><td>无</td></tr></tbody></table><h2 id="对象的创建与访问" tabindex="-1">对象的创建与访问 <a class="header-anchor" href="#对象的创建与访问" aria-label="Permalink to “对象的创建与访问”">​</a></h2><h3 id="对象创建过程" tabindex="-1">对象创建过程 <a class="header-anchor" href="#对象创建过程" aria-label="Permalink to “对象创建过程”">​</a></h3><div class="language-java"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// new Object() 过程</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 1. 类加载检查</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">//    - 检查类是否已加载、解析和初始化</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 2. 分配内存</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">//    - 指针碰撞：堆内存规整时，在指针后直接分配</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">//    - 空闲列表：堆内存不规整时，从空闲列表找一块足够大的空间</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 3. 初始化零值</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">//    - 将分配的内存空间都初始化为零值</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 4. 设置对象头</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">//    - Mark Word：存储对象哈希码、GC 年龄、锁状态等</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">//    - Klass 指针：指向方法区中的类元数据</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 5. 执行 &lt;init&gt; 方法</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">//    - 程序员定义的初始化操作</span></span></code></pre></div><h3 id="对象内存布局" tabindex="-1">对象内存布局 <a class="header-anchor" href="#对象内存布局" aria-label="Permalink to “对象内存布局”">​</a></h3><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>┌─────────────────────────────────────────────────────────┐</span></span>
<span class="line"><span>│                       对象内存布局                        │</span></span>
<span class="line"><span>│                                                           │</span></span>
<span class="line"><span>│  ┌─────────────────────────────────────────────────────┐│</span></span>
<span class="line"><span>│  │                   对象头 (Header)                      ││</span></span>
<span class="line"><span>│  │  ┌─────────────────────────────────────────────┐    ││</span></span>
<span class="line"><span>│  │  │  Mark Word (非固定长度)                       │    ││</span></span>
<span class="line"><span>│  │  │  ┌──────────┬──────────┬──────────┬───────┐ │    ││</span></span>
<span class="line"><span>│  │  │  │ 哈希码   │GC 年龄    │ 锁状态    │ 状态  │ │    ││</span></span>
<span class="line"><span>│  │  │  │(25 bit)  │(4 bit)   │(2 bit)   │(1bit) │ │    ││</span></span>
<span class="line"><span>│  │  │  └──────────┴──────────┴──────────┴───────┘ │    ││</span></span>
<span class="line"><span>│  │  └─────────────────────────────────────────────┘    ││</span></span>
<span class="line"><span>│  │  ┌─────────────────────────────────────────────┐    ││</span></span>
<span class="line"><span>│  │  │  Klass 指针 (压缩后 4 字节)                   │    ││</span></span>
<span class="line"><span>│  │  │  - 指向方法区中的类元数据                      │    ││</span></span>
<span class="line"><span>│  │  └─────────────────────────────────────────────┘    ││</span></span>
<span class="line"><span>│  └─────────────────────────────────────────────────────┘│</span></span>
<span class="line"><span>│                                                           │</span></span>
<span class="line"><span>│  ┌─────────────────────────────────────────────────────┐│</span></span>
<span class="line"><span>│  │                实例数据 (Instance Data)               ││</span></span>
<span class="line"><span>│  │  - 各字段的实际数据                                   ││</span></span>
<span class="line"><span>│  │  - 对齐填充 (8 字节对齐)                              ││</span></span>
<span class="line"><span>│  └─────────────────────────────────────────────────────┘│</span></span>
<span class="line"><span>│                                                           │</span></span>
<span class="line"><span>└─────────────────────────────────────────────────────────┘</span></span></code></pre></div><h3 id="访问对象的两种方式" tabindex="-1">访问对象的两种方式 <a class="header-anchor" href="#访问对象的两种方式" aria-label="Permalink to “访问对象的两种方式”">​</a></h3><div class="language-java"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 1. 句柄访问（已淘汰）</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">//    引用 → 句柄 → 对象</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">//    优点：句柄稳定，便于对象移动</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 2. 直接指针访问（HotSpot 使用）</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">//    引用 → 对象</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">//    优点：节省一次指针定位，速度快</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">public</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> class</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> ObjectAccess</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    public</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> static</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> void</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> main</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">String</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">[] </span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">args</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        Object obj </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> new</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> Object</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">();</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">        // obj 引用直接指向堆中的对象</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">        // 对象头中有 Klass 指针指向类元数据</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><h2 id="垃圾回收概述" tabindex="-1">垃圾回收概述 <a class="header-anchor" href="#垃圾回收概述" aria-label="Permalink to “垃圾回收概述”">​</a></h2><h3 id="什么是垃圾" tabindex="-1">什么是垃圾 <a class="header-anchor" href="#什么是垃圾" aria-label="Permalink to “什么是垃圾”">​</a></h3><p>不再被任何引用指向的对象就是垃圾，需要被回收释放内存。</p><div class="language-java"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">public</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> class</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> GarbageExample</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    </span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    public</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> void</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> createGarbage</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">() {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        Object obj1 </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> new</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> Object</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">();</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        </span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">        // 情况一：引用置空</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        obj1 </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> null</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;  </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// obj1 成为垃圾</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        </span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">        // 情况二：引用超过作用域</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">        if</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">true</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">            Object obj2 </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> new</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> Object</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">();</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        }  </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// obj2 成为垃圾</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        </span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">        // 情况三：相互引用但外部无引用</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        A a </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> new</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> A</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">();</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        B b </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> new</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> B</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">();</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        a.b </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> b;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        b.a </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> a;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        a </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> null</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        b </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> null</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">        // a 和 b 互相引用，但外部已无引用，都是垃圾</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    </span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    class</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> A</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> { B b; }</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    class</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> B</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> { A a; }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><h3 id="判断对象是否为垃圾" tabindex="-1">判断对象是否为垃圾 <a class="header-anchor" href="#判断对象是否为垃圾" aria-label="Permalink to “判断对象是否为垃圾”">​</a></h3><h4 id="引用计数法-已淘汰" tabindex="-1">引用计数法（已淘汰） <a class="header-anchor" href="#引用计数法-已淘汰" aria-label="Permalink to “引用计数法（已淘汰）”">​</a></h4><div class="language-java"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 每个对象维护一个引用计数器</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 被引用时 +1，引用失效时 -1</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 计数器为 0 时即为垃圾</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 缺点：无法解决循环引用</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// a → b, b → a，外部无引用，但计数都不为 0</span></span></code></pre></div><h4 id="可达性分析算法-当前使用" tabindex="-1">可达性分析算法（当前使用） <a class="header-anchor" href="#可达性分析算法-当前使用" aria-label="Permalink to “可达性分析算法（当前使用）”">​</a></h4><div class="language-java"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 从 GC Roots 出发，遍历所有引用链</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 能到达的对象都是存活的，不可达的是垃圾</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">GC Roots 包括：</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">1.</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 虚拟机栈中引用的对象（局部变量）</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">2.</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 方法区中类静态属性引用的对象</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">3.</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 方法区中常量引用的对象</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">4.</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 本地方法栈中 JNI 引用的对象</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">5.</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 被同步锁持有的对象</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">6.</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> JVM 内部引用</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">可达性分析过程：</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">┌─────────────────────────────────────────────┐</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">│               GC Roots                      │</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">│  ┌───────┐  ┌───────┐  ┌───────┐           │</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">│  │ Root1 │  │ Root2 │  │ Root3 │           │</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">│  └───┬───┘  └───┬───┘  └───┬───┘           │</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">│      │          │          │                │</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">│      ▼          ▼          ▼                │</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">│  ┌───────┐  ┌───────┐  ┌───────┐           │</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">│  │ Obj A │  │ Obj B │  │ Obj C │           │</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">│  └───┬───┘  └───┬───┘  └───┬───┘           │</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">│      │          │          │                │</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">│      ▼          ▼          ▼                │</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">│  ┌───────┐  ┌───────┐  ┌───────┐           │</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">│  │ Obj D │  │ Obj E │  │ Obj F │ ← 垃圾    │</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">│  └───────┘  └───────┘  └───────┘           │</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">│      │          │                           │</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">│      ▼          ▼                           │</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">│  ┌───────┐  ┌───────┐                       │</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">│  │ Obj G │  │ Obj H │ ← 垃圾               │</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">│  └───────┘  └───────┘                       │</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">└─────────────────────────────────────────────┘</span></span></code></pre></div><h2 id="垃圾回收算法" tabindex="-1">垃圾回收算法 <a class="header-anchor" href="#垃圾回收算法" aria-label="Permalink to “垃圾回收算法”">​</a></h2><h3 id="标记-清除算法-mark-sweep" tabindex="-1">标记-清除算法（Mark-Sweep） <a class="header-anchor" href="#标记-清除算法-mark-sweep" aria-label="Permalink to “标记-清除算法（Mark-Sweep）”">​</a></h3><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>阶段一：标记</span></span>
<span class="line"><span>  - 从 GC Roots 出发，标记所有存活对象</span></span>
<span class="line"><span>  </span></span>
<span class="line"><span>阶段二：清除</span></span>
<span class="line"><span>  - 遍历整个堆，清除未标记的对象</span></span>
<span class="line"><span></span></span>
<span class="line"><span>┌─────────────────────────────────────────────────┐</span></span>
<span class="line"><span>│              标记前                               │</span></span>
<span class="line"><span>│  ┌─────┬─────┬─────┬─────┬─────┬─────┐         │</span></span>
<span class="line"><span>│  │ A   │ B   │ C   │ D   │ E   │ F   │         │</span></span>
<span class="line"><span>│  └─────┴─────┴─────┴─────┴─────┴─────┘         │</span></span>
<span class="line"><span>│  全部都是未标记状态                                │</span></span>
<span class="line"><span>└─────────────────────────────────────────────────┘</span></span>
<span class="line"><span></span></span>
<span class="line"><span>┌─────────────────────────────────────────────────┐</span></span>
<span class="line"><span>│              标记后                               │</span></span>
<span class="line"><span>│  ┌─────┬─────┬─────┬─────┬─────┬─────┐         │</span></span>
<span class="line"><span>│  │ A ✓ │ B ✓ │ C ✗ │ D ✓ │ E ✗ │ F ✓ │         │</span></span>
<span class="line"><span>│  └─────┴─────┴─────┴─────┴─────┴─────┘         │</span></span>
<span class="line"><span>│  C 和 E 不可达，标记为垃圾                         │</span></span>
<span class="line"><span>└─────────────────────────────────────────────────┘</span></span>
<span class="line"><span></span></span>
<span class="line"><span>┌─────────────────────────────────────────────────┐</span></span>
<span class="line"><span>│              清除后                               │</span></span>
<span class="line"><span>│  ┌─────┬─────┬─────┬─────┬─────┬─────┐         │</span></span>
<span class="line"><span>│  │ A   │ B   │ ███ │ D   │ ███ │ F   │         │</span></span>
<span class="line"><span>│  └─────┴─────┴─────┴─────┴─────┴─────┘         │</span></span>
<span class="line"><span>│  C 和 E 被清除，产生内存碎片                       │</span></span>
<span class="line"><span>└─────────────────────────────────────────────────┘</span></span>
<span class="line"><span></span></span>
<span class="line"><span>优点：实现简单</span></span>
<span class="line"><span>缺点：产生内存碎片</span></span></code></pre></div><h3 id="复制算法-copying" tabindex="-1">复制算法（Copying） <a class="header-anchor" href="#复制算法-copying" aria-label="Permalink to “复制算法（Copying）”">​</a></h3><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>将堆内存分为两块：From 空间和 To 空间</span></span>
<span class="line"><span></span></span>
<span class="line"><span>GC 过程：</span></span>
<span class="line"><span>1. 从 From 空间出发，标记存活对象</span></span>
<span class="line"><span>2. 将存活对象复制到 To 空间</span></span>
<span class="line"><span>3. 交换 From 和 To 的角色</span></span>
<span class="line"><span>4. 清空原 From 空间</span></span>
<span class="line"><span></span></span>
<span class="line"><span>┌─────────────────────┐</span></span>
<span class="line"><span>│       堆内存          │</span></span>
<span class="line"><span>│  ┌─────────┬───────┐│</span></span>
<span class="line"><span>│  │ From    │  To   ││</span></span>
<span class="line"><span>│  │ 空间    │ 空间   ││</span></span>
<span class="line"><span>│  └─────────┴───────┘│</span></span>
<span class="line"><span>└─────────────────────┘</span></span>
<span class="line"><span></span></span>
<span class="line"><span>GC 前:</span></span>
<span class="line"><span>┌─────────────────────┬─────────────────────┐</span></span>
<span class="line"><span>│      From 空间       │       To 空间        │</span></span>
<span class="line"><span>│  ┌─────┬─────┬─────┐│  ┌─────────────────┐│</span></span>
<span class="line"><span>│  │ A   │ B   │ C   ││  │                 ││</span></span>
<span class="line"><span>│  └─────┴─────┴─────┘│  └─────────────────┘│</span></span>
<span class="line"><span>└─────────────────────┴─────────────────────┘</span></span>
<span class="line"><span></span></span>
<span class="line"><span>GC 后:</span></span>
<span class="line"><span>┌─────────────────────┬─────────────────────┐</span></span>
<span class="line"><span>│      From 空间       │       To 空间        │</span></span>
<span class="line"><span>│  ┌─────────────────┐│  ┌─────┬─────┬─────┐│</span></span>
<span class="line"><span>│  │                 ││  │ A   │ C   │ ... ││</span></span>
<span class="line"><span>│  └─────────────────┘│  └─────┴─────┴─────┘│</span></span>
<span class="line"><span>└─────────────────────┴─────────────────────┘</span></span>
<span class="line"><span>(已交换角色，From 被清空，To 变为新的 From)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>优点：无内存碎片，效率高</span></span>
<span class="line"><span>缺点：可用内存减半</span></span>
<span class="line"><span>应用：新生代（Eden + Survivor0 + Survivor1）</span></span></code></pre></div><h3 id="标记-整理算法-mark-compact" tabindex="-1">标记-整理算法（Mark-Compact） <a class="header-anchor" href="#标记-整理算法-mark-compact" aria-label="Permalink to “标记-整理算法（Mark-Compact）”">​</a></h3><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>阶段一：标记</span></span>
<span class="line"><span>  - 从 GC Roots 出发，标记所有存活对象</span></span>
<span class="line"><span></span></span>
<span class="line"><span>阶段二：整理</span></span>
<span class="line"><span>  - 将存活对象向一端移动</span></span>
<span class="line"><span>  - 更新对象引用指针</span></span>
<span class="line"><span>  - 清除边界外的内存</span></span>
<span class="line"><span></span></span>
<span class="line"><span>┌─────────────────────────────────────────────────┐</span></span>
<span class="line"><span>│              整理前                               │</span></span>
<span class="line"><span>│  ┌─────┬─────┬─────┬─────┬─────┬─────┐         │</span></span>
<span class="line"><span>│  │ A   │ ███ │ B   │ ███ │ C   │ ███ │         │</span></span>
<span class="line"><span>│  └─────┴─────┴─────┴─────┴─────┴─────┘         │</span></span>
<span class="line"><span>│  A、B、C 存活，其他为垃圾                          │</span></span>
<span class="line"><span>└─────────────────────────────────────────────────┘</span></span>
<span class="line"><span></span></span>
<span class="line"><span>┌─────────────────────────────────────────────────┐</span></span>
<span class="line"><span>│              整理后                               │</span></span>
<span class="line"><span>│  ┌─────┬─────┬─────┬─────────────────────────┐   │</span></span>
<span class="line"><span>│  │ A   │ B   │ C   │                         │   │</span></span>
<span class="line"><span>│  └─────┴─────┴─────┴─────────────────────────┘   │</span></span>
<span class="line"><span>│  存活对象向一端移动，无碎片                          │</span></span>
<span class="line"><span>└─────────────────────────────────────────────────┘</span></span>
<span class="line"><span></span></span>
<span class="line"><span>优点：无内存碎片</span></span>
<span class="line"><span>缺点：移动对象开销大</span></span>
<span class="line"><span>应用：老年代</span></span></code></pre></div><h3 id="分代收集算法-generational" tabindex="-1">分代收集算法（Generational） <a class="header-anchor" href="#分代收集算法-generational" aria-label="Permalink to “分代收集算法（Generational）”">​</a></h3><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>根据对象存活周期将内存分为不同代，各代采用不同回收算法</span></span>
<span class="line"><span></span></span>
<span class="line"><span>新生代：对象朝生夕灭，存活率低</span></span>
<span class="line"><span>  - 使用复制算法</span></span>
<span class="line"><span>  - Eden (8) : Survivor0 (1) : Survivor1 (1)</span></span>
<span class="line"><span>  </span></span>
<span class="line"><span>老年代：对象存活率高</span></span>
<span class="line"><span>  - 使用标记-清除或标记-整理算法</span></span>
<span class="line"><span>  </span></span>
<span class="line"><span>对象晋升：</span></span>
<span class="line"><span>  - 对象在新生代每经历一次 GC 存活，年龄 +1</span></span>
<span class="line"><span>  - 年龄达到阈值（默认 15）晋升到老年代</span></span>
<span class="line"><span>  - 大对象直接进入老年代</span></span>
<span class="line"><span>  - 空间分配担保：Survivor 空间不足时，部分对象直接晋升</span></span></code></pre></div><h2 id="垃圾回收器" tabindex="-1">垃圾回收器 <a class="header-anchor" href="#垃圾回收器" aria-label="Permalink to “垃圾回收器”">​</a></h2><h3 id="垃圾回收器分类" tabindex="-1">垃圾回收器分类 <a class="header-anchor" href="#垃圾回收器分类" aria-label="Permalink to “垃圾回收器分类”">​</a></h3><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>┌─────────────────────────────────────────────────────────┐</span></span>
<span class="line"><span>│                    GC 算法 vs GC 器                       │</span></span>
<span class="line"><span>│                                                           │</span></span>
<span class="line"><span>│  GC 算法：如何回收（方法论）                               │</span></span>
<span class="line"><span>│  - 标记-清除、复制、标记-整理、分代收集                     │</span></span>
<span class="line"><span>│                                                           │</span></span>
<span class="line"><span>│  GC 器：具体实现（工程实现）                               │</span></span>
<span class="line"><span>│  - Serial、ParNew、Parallel Scavenge                      │</span></span>
<span class="line"><span>│  - CMS、G1、Shenandoah、ZGC                              │</span></span>
<span class="line"><span>└─────────────────────────────────────────────────────────┘</span></span></code></pre></div><h3 id="常见-gc-器" tabindex="-1">常见 GC 器 <a class="header-anchor" href="#常见-gc-器" aria-label="Permalink to “常见 GC 器”">​</a></h3><table tabindex="0"><thead><tr><th>GC 器</th><th>类型</th><th>算法</th><th>适用场景</th></tr></thead><tbody><tr><td>Serial</td><td>单线程</td><td>复制/标记-整理</td><td>客户端/小内存</td></tr><tr><td>ParNew</td><td>多线程</td><td>复制</td><td>配合 CMS</td></tr><tr><td>Parallel Scavenge</td><td>多线程</td><td>复制</td><td>吞吐量优先</td></tr><tr><td>CMS</td><td>并发</td><td>标记-清除</td><td>低延迟</td></tr><tr><td>G1</td><td>并发</td><td>分区收集</td><td>JDK 9+ 默认</td></tr><tr><td>Shenandoah</td><td>并发</td><td>Brooks Pointer</td><td>低延迟</td></tr><tr><td>ZGC</td><td>并发</td><td>着色指针</td><td>超低延迟(JDK 11+)</td></tr></tbody></table><h3 id="g1-收集器详解" tabindex="-1">G1 收集器详解 <a class="header-anchor" href="#g1-收集器详解" aria-label="Permalink to “G1 收集器详解”">​</a></h3><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>G1 (Garbage-First) 将堆分为多个 Region</span></span>
<span class="line"><span></span></span>
<span class="line"><span>┌─────────────────────────────────────────────────────────┐</span></span>
<span class="line"><span>│                      G1 内存布局                         │</span></span>
<span class="line"><span>│                                                           │</span></span>
<span class="line"><span>│  ┌─────────────────────────────────────────────────────┐ │</span></span>
<span class="line"><span>│  │                        堆内存                        │ │</span></span>
<span class="line"><span>│  │  ┌────┬────┬────┬────┬────┬────┬────┬────┬────┐    │ │</span></span>
<span class="line"><span>│  │  │R0  │R1  │R2  │R3  │R4  │R5  │R6  │R7  │R8  │    │ │</span></span>
<span class="line"><span>│  │  └────┴────┴────┴────┴────┴────┴────┴────┴────┘    │ │</span></span>
<span class="line"><span>│  │  每个 Region 大小相等（1-32MB）                      │ │</span></span>
<span class="line"><span>│  │                                                     │ │</span></span>
<span class="line"><span>│  │  Region 类型:                                       │ │</span></span>
<span class="line"><span>│  │  ├── Free: 空闲 Region                              │ │</span></span>
<span class="line"><span>│  │  ├── Eden: 新生代 Eden                              │ │</span></span>
<span class="line"><span>│  │  ├── Survivor: 新生代 Survivor                      │ │</span></span>
<span class="line"><span>│  │  ├── Old: 老年代                                    │ │</span></span>
<span class="line"><span>│  │  └── Humongous: 巨型对象 Region                     │ │</span></span>
<span class="line"><span>│  └─────────────────────────────────────────────────────┘ │</span></span>
<span class="line"><span>└─────────────────────────────────────────────────────────┘</span></span>
<span class="line"><span></span></span>
<span class="line"><span>G1 GC 过程：</span></span>
<span class="line"><span>1. 初始标记（STW）</span></span>
<span class="line"><span>   - 标记 GC Roots 直接引用的对象</span></span>
<span class="line"><span>   </span></span>
<span class="line"><span>2. 并发标记</span></span>
<span class="line"><span>   - 并发遍历整个堆，标记存活对象</span></span>
<span class="line"><span>   - 可被中断</span></span>
<span class="line"><span>   </span></span>
<span class="line"><span>3. 最终标记（STW）</span></span>
<span class="line"><span>   - 处理 SATB 记录的引用变化</span></span>
<span class="line"><span>   </span></span>
<span class="line"><span>4. 筛选回收</span></span>
<span class="line"><span>   - 按 Region 回收价值排序</span></span>
<span class="line"><span>   - 优先回收垃圾多的 Region</span></span>
<span class="line"><span>   - 复制存活对象到新 Region</span></span></code></pre></div><h3 id="常用-jvm-参数" tabindex="-1">常用 JVM 参数 <a class="header-anchor" href="#常用-jvm-参数" aria-label="Permalink to “常用 JVM 参数”">​</a></h3><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 堆内存设置</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">-Xms512m</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">          # 初始堆内存</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">-Xmx2048m</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">         # 最大堆内存</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">-Xmn256m</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">          # 新生代大小</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">-XX:NewRatio</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">=2</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    # 老年代与新生代比例</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">-XX:SurvivorRatio</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">=8</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">  # Eden 与 Survivor 比例</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># GC 器选择</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">-XX:+UseG1GC</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">      # 使用 G1 收集器</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">-XX:+UseZGC</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">       # 使用 ZGC 收集器</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">-XX:+UseShenandoahGC</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">  # 使用 Shenandoah</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># GC 日志</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">-XX:+PrintGCDetails</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">-XX:+PrintGCDateStamps</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">-Xlog:gc*</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">=info:file=gc.log</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">  # JDK 9+ 统一日志</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 元空间</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">-XX:MetaspaceSize</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">=256m</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    # 初始元空间大小</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">-XX:MaxMetaspaceSize</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">=512m</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">  # 最大元空间大小</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 诊断工具</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">-XX:+HeapDumpOnOutOfMemoryError</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">  # OOM 时生成堆转储</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">-XX:HeapDumpPath</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">=/path/to/dump.hprof</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">  # 转储文件路径</span></span></code></pre></div><h2 id="对象的生命周期" tabindex="-1">对象的生命周期 <a class="header-anchor" href="#对象的生命周期" aria-label="Permalink to “对象的生命周期”">​</a></h2><h3 id="对象的死亡" tabindex="-1">对象的死亡 <a class="header-anchor" href="#对象的死亡" aria-label="Permalink to “对象的死亡”">​</a></h3><div class="language-java"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 对象从出生到死亡的过程</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">public</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> class</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> ObjectLifecycle</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    </span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    // 阶段 1: 对象创建</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    // - 类加载检查</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    // - 分配内存</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    // - 初始化</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    // - 构造方法执行</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    </span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    public</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> void</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> createObject</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">() {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        Object obj </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> new</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> Object</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">();</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">        // 对象出生</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    </span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    // 阶段 2: 对象存活</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    // - 被引用时存活</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    // - 可以被访问和使用</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    </span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    public</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> void</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> useObject</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(Object </span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">obj</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        System.out.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">println</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(obj.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">toString</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">());</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    </span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    // 阶段 3: 成为垃圾</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    // - 引用消失</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    // - 不可达</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    </span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    public</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> void</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> becomeGarbage</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">() {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        Object obj </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> new</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> Object</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">();</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        obj </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> null</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;  </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 成为垃圾</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    </span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    // 阶段 4: 对象死亡</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    // - GC 回收</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    // - finalize() 被调用（如果覆盖了）</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    // - 内存被释放</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    </span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    public</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> class</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> MyObject</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        @</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">Override</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">        protected</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> void</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> finalize</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">() </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">throws</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> Throwable {</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">            // 不推荐使用，可能导致内存泄漏</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">            super</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">finalize</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">();</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><h3 id="finalize-方法" tabindex="-1">finalize 方法 <a class="header-anchor" href="#finalize-方法" aria-label="Permalink to “finalize 方法”">​</a></h3><div class="language-java"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">public</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> class</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> FinalizeExample</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    </span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    // finalize() 已在 JDK 9 中被标记为过时</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    // 不推荐使用</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    </span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    public</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> class</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> Resource</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">        private</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> boolean</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> closed </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> false</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        </span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">        // 推荐方式：try-with-resources + AutoCloseable</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">        public</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> void</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> useResource</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">() {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">            try</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (Resource res </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> new</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> Resource</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">()) {</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">                // 使用资源</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">            } </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">catch</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (Exception </span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">e</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) {</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">                // 处理异常</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">            }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        </span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">        // 不推荐方式：finalize()</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        @</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">Override</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">        protected</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> void</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> finalize</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">() </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">throws</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> Throwable {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">            if</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">!</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">closed) {</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">                // 可能导致：</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">                // 1. GC 延迟</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">                // 2. 对象复活</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">                // 3. 资源泄漏</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">                System.err.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">println</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;资源未正确关闭&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">            }</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">            super</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">finalize</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">();</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    </span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    // 推荐使用 Cleaner（JDK 9+）</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    public</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> class</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> CleanableResource</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> implements</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> AutoCloseable</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">        private</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> static</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> final</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> Cleaner cleaner </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> Cleaner.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">create</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">();</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        </span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">        private</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> final</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> Cleaner.Cleanable cleanable;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        </span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">        public</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> CleanableResource</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">() {</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">            // 注册清理动作</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">            this</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.cleanable </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> cleaner.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">register</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">this</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, () </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">-&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">                // 清理逻辑</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">            });</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        </span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        @</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">Override</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">        public</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> void</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> close</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">() {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">            cleanable.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">clean</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">();</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><h2 id="监控与诊断工具" tabindex="-1">监控与诊断工具 <a class="header-anchor" href="#监控与诊断工具" aria-label="Permalink to “监控与诊断工具”">​</a></h2><h3 id="命令行工具" tabindex="-1">命令行工具 <a class="header-anchor" href="#命令行工具" aria-label="Permalink to “命令行工具”">​</a></h3><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># jps - 查看 Java 进程</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">jps</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -l</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 输出: 12345 com.example.MyApp</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># jstat - 监控 GC 统计</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">jstat</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -gc</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 12345</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 1000</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 10</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 每 1 秒输出一次 GC 信息，共 10 次</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># jmap - 内存映射</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">jmap</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -heap</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 12345</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">jmap</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -dump:live,format=b,file=heap.hprof</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 12345</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># jstack - 线程堆栈</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">jstack</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 12345</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">jstack</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -l</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 12345</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">  # 包含锁信息</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># jinfo - 查看/修改 JVM 参数</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">jinfo</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -flags</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 12345</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">jinfo</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -flag</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> UseG1GC</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 12345</span></span></code></pre></div><h3 id="gui-工具" tabindex="-1">GUI 工具 <a class="header-anchor" href="#gui-工具" aria-label="Permalink to “GUI 工具”">​</a></h3><ol><li><strong>JConsole</strong>：JDK 自带的监控工具</li><li><strong>VisualVM</strong>：功能强大的多合一工具</li><li><strong>Arthas</strong>：阿里巴巴开源的 Java 诊断工具</li><li><strong>MAT</strong>：Eclipse 内存分析工具</li></ol><h2 id="总结" tabindex="-1">总结 <a class="header-anchor" href="#总结" aria-label="Permalink to “总结”">​</a></h2><p>掌握 JVM 内存模型与 GC 后，你应该能够：</p><ul><li>✅ 理解 JVM 运行时数据区的各个组成</li><li>✅ 描述对象在内存中的布局和创建过程</li><li>✅ 解释可达性分析算法判断垃圾的原理</li><li>✅ 对比不同 GC 算法的优缺点</li><li>✅ 了解 G1、ZGC 等现代 GC 器的特点</li><li>✅ 使用常用 JVM 参数和诊断工具</li></ul><p>接下来，你可以继续学习 <a href="/blog/java/advanced/并发编程.html">并发编程</a>，探索 Java 的多线程世界！</p>`,55)])])}const E=a(p,[["render",e]]);export{g as __pageData,E as default};
