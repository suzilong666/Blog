# JVM 调优实战

JVM 调优是性能优化的重要技能。本文将从实战角度讲解 JVM 参数配置、GC 调优、内存问题诊断以及性能分析工具的使用。

## JVM 参数配置

### 堆内存配置

```bash
# 堆内存大小设置
# -Xms: 初始堆内存（建议与 -Xmx 设置相同，避免动态扩容）
# -Xmx: 最大堆内存
# -Xmn: 新生代大小

# 示例：设置 4GB 堆内存
java -Xms4g -Xmx4g -jar myapp.jar

# 推荐设置
# 1. -Xms 和 -Xmx 设置为相同值，避免 GC 时调整大小
# 2. 根据服务器内存设置，一般为物理内存的 1/2 ~ 2/3
# 3. 留足系统内存和其他进程内存

# 新生代大小设置
java -Xms4g -Xmx4g -Xmn1g -jar myapp.jar

# 新生代与老年代比例
# -XX:NewRatio=2 表示老年代:新生代=2:1
# -XX:SurvivorRatio=8 表示 Eden:Survivor=8:1
java -Xms4g -Xmx4g -XX:NewRatio=2 -XX:SurvivorRatio=8 -jar myapp.jar
```

### 元空间配置

```bash
# 元空间设置（JDK 8+）
# -XX:MetaspaceSize: 初始元空间大小
# -XX:MaxMetaspaceSize: 最大元空间大小（建议设置，防止内存泄漏）

# 示例
java -XX:MetaspaceSize=256m -XX:MaxMetaspaceSize=512m -jar myapp.jar

# 永久代设置（JDK 7 及以前）
# -XX:PermSize=256m
# -XX:MaxPermSize=512m
```

### GC 器选择

```bash
# Serial GC：单线程，适合小内存应用
java -XX:+UseSerialGC -Xmx256m -jar myapp.jar

# Parallel Scavenge GC：多线程，吞吐量优先
java -XX:+UseParallelGC -Xmx4g -jar myapp.jar

# CMS GC：低延迟，JDK 14 已废弃
java -XX:+UseConcMarkSweepGC -Xmx4g -jar myapp.jar

# G1 GC：JDK 9+ 默认，适合大堆内存
java -XX:+UseG1GC -Xmx4g -jar myapp.jar

# G1 参数调优
java -XX:+UseG1GC \
     -XX:G1HeapRegionSize=16m \          # Region 大小
     -XX:MaxGCPauseMillis=200 \          # 目标停顿时间
     -XX:InitiatingHeapOccupancyPercent=45 \  # 触发并发标记的阈值
     -Xmx4g -jar myapp.jar

# ZGC：超低延迟，JDK 11+
java -XX:+UseZGC -Xmx16g -jar myapp.jar

# Shenandoah：低延迟，OpenJDK 12+
java -XX:+UseShenandoahGC -Xmx4g -jar myapp.jar
```

## GC 日志分析

### 开启 GC 日志

```bash
# JDK 8 及以前
java -XX:+PrintGCDetails \
     -XX:+PrintGCDateStamps \
     -XX:+PrintGCTimeStamps \
     -Xloggc:/path/to/gc.log \
     -jar myapp.jar

# JDK 9+ 统一日志
java -Xlog:gc*=info:file=gc.log:time,uptime,level,tags \
     -jar myapp.jar

# 详细 GC 日志
java -Xlog:gc*=debug:file=gc-debug.log \
     -jar myapp.jar
```

### GC 日志格式

```
# G1 GC 日志示例
[2024-01-15T10:30:45.123+0800] [gc,start     ] GC(1) Pause Young (Normal) (G1 Evacuation Pause)
[2024-01-15T10:30:45.123+0800] [gc,task      ] GC(1)   1.234ms: Pause Young (Normal) (G1 Evacuation Pause)
[2024-01-15T10:30:45.124+0800] [gc,heap      ] GC(1) Heap before GC: 2.0Gi (3.0Gi)
[2024-01-15T10:30:45.125+0800] [gc,heap      ] GC(1) Heap after GC: 1.5Gi (3.0Gi)
[2024-01-15T10:30:45.125+0800] [gc,end       ] GC(1) Pause Young (Normal) (G1 Evacuation Pause) 1.234ms

# CMS GC 日志示例
2024-01-15T10:30:45.123: [GC (CMS Initial Mark) [1 CMS-initial-mark: 1024000K(2048000K)] 1024500K(4096000K), 0.001234 secs]
2024-01-15T10:30:45.125: [CMS-concurrent-mark-start]
2024-01-15T10:30:45.500: [CMS-concurrent-mark: 0.375/0.375 secs]
2024-01-15T10:30:45.500: [CMS-concurrent-preclean-start]
```

### GC 日志分析工具

1. **GCViewer**：开源工具，可视化分析 GC 日志
2. **GCeasy**：在线工具，上传日志分析
3. **Universal Java GC Log Analyser**：多 GC 器支持

## 内存问题诊断

### OutOfMemoryError 分析

```java
// 常见 OOM 场景

// 1. Java heap space
// 原因：堆内存不足，对象创建过多或内存泄漏
// 解决：增加 -Xmx，排查内存泄漏

// 2. Metaspace
// 原因：元空间不足，加载的类过多
// 解决：增加 -XX:MaxMetaspaceSize

// 3. GC overhead limit exceeded
// 原因：GC 耗时过长（98% 时间做 GC，回收 < 2%）
// 解决：增加堆内存，优化对象生命周期

// 4. Direct buffer memory
// 原因：NIO 直接内存不足
// 解决：增加 -XX:MaxDirectMemorySize
```

### 堆转储分析

```bash
# 生成堆转储
# 方式一：自动生成（OOM 时）
java -XX:+HeapDumpOnOutOfMemoryError \
     -XX:HeapDumpPath=/path/to/dump.hprof \
     -jar myapp.jar

# 方式二：手动生成
jmap -dump:live,format=b,file=heap.hprof <pid>

# 方式三：jcmd
jcmd <pid> GC.heap_dump /path/to/dump.hprof

# 分析工具
# 1. Eclipse MAT（Memory Analyzer Tool）
# 2. VisualVM
# 3. YourKit Java Profiler
```

### 内存泄漏检测

```java
public class MemoryLeakExample {
    
    // 常见内存泄漏场景
    
    // 1. 集合未清理
    private static final List<Object> cache = new ArrayList<>();
    
    public void addToCache(Object obj) {
        cache.add(obj);  // 只添加不清理
    }
    
    // 2. 静态集合持有对象
    private static Map<String, Object> leakMap = new HashMap<>();
    
    // 3. 监听器未注销
    public class EventManager {
        private final List<EventListener> listeners = new ArrayList<>();
        
        public void register(EventListener listener) {
            listeners.add(listener);
            // 缺少 unregister 方法
        }
    }
    
    // 4. 资源未关闭
    public void readFile() {
        FileInputStream fis = null;
        try {
            fis = new FileInputStream("file.txt");
            // 读取文件
        } catch (IOException e) {
            // 异常处理
        }
        // 缺少 finally 关闭 fis
    }
    
    // 5. ThreadLocal 未清理
    private static final ThreadLocal<User> userHolder = new ThreadLocal<>();
    
    public void setUser(User user) {
        userHolder.set(user);
    }
    
    // 在线程池中必须清理
    public void cleanup() {
        userHolder.remove();
    }
}
```

## 性能分析工具

### jstat 命令

```bash
# 监控 GC 统计
jstat -gc <pid> [interval] [count]
jstat -gc 12345 1000 10

# 输出示例：
# S0C    S1C    S0U    S1U      EC       EU        OC         OU       MC     MU    CCSC   CCSU   YGC     YGCT    FGC    FGCT     GCT
# 1024.0 1024.0  512.0  768.0  81920.0 65536.0  163840.0   32768.0  2560.0 1280.0  256.0  128.0   1234    12.345     5    0.123    12.468

# 列含义：
# S0C/S1C: Survivor0/1 容量
# S0U/S1U: Survivor0/1 使用量
# EC/EU: Eden 容量/使用量
# OC/OU: 老年代容量/使用量
# MC/MU: 元空间容量/使用量
# YGC/YGCT: Young GC 次数/时间
# FGC/FGCT: Full GC 次数/时间
# GCT: 总 GC 时间
```

### jmap 命令

```bash
# 查看堆内存使用情况
jmap -heap <pid>

# 输出示例：
# using thread-local object allocation.
# Parallel GC with 2 thread(s)
# Heap Configuration:
#    MinHeapSize       = 2147483648 (2048.0MB)
#    MaxHeapSize       = 2147483648 (2048.0MB)
#    NewSize           = 268435456 (256.0MB)
#    MaxNewSize        = 268435456 (256.0MB)
#    OldSize           = 543581184 (518.4MB)
#    NewRatio          = 2
#    SurvivorRatio     = 8
#    MetaspaceSize     = 218013696 (208.0MB)
#    MaxMetaspaceSize  = 17592186046828800 (16.0EB)
#
# Heap Usage:
# PS Young Generation
#    Eden Space      2147483648 (2048.0MB)
#                      From Space 268435456 (256.0MB)
#                      To Space   268435456 (256.0MB)
# PS Old Generation
#    Old Space       1638400000 (1562.5MB)

# 查看对象统计
jmap -histo:live <pid>

# 输出示例：
#  num     #instances         #bytes  class name
# ----------------------------------------------
#    1:         12345        12345678  java.util.HashMap$Node
#    2:         56789         8901234  java.lang.String
#    3:          1234         5678901  [B

# 生成堆转储
jmap -dump:live,format=b,file=heap.hprof <pid>
```

### jstack 命令

```bash
# 查看线程堆栈
jstack <pid>

# 查看死锁
jstack -l <pid> | grep -A 20 "Found one Java-level deadlock"

# 输出示例：
# "Thread-1" #12 prio=5 os_prio=0 cpu=123.45ms elapsed=12.34s tid=0x00007f123400 nid=0x1234 waiting for monitor entry [0x00007f123000]
#    java.lang.Thread.State: BLOCKED (on object monitor)
#         at com.example.LockExample.method1(LockExample.java:15)
#         - waiting to lock <0x00007f000000> (a java.lang.Object)
#         - locked <0x00007f000001> (a java.lang.Object)
```

### Arthas 工具

```bash
# 阿里巴巴开源的 Java 诊断工具
# 下载：https://arthas.aliyun.com/

# 常用命令
# 1. dashboard：实时仪表盘
dashboard

# 2. thread：线程分析
thread           # 查看所有线程
thread -n 3      # 查看最忙的 3 个线程
thread -b        # 查看阻塞的线程

# 3. heapdump：堆转储
heapdump --live /path/to/dump.hprof

# 4. gc：触发 GC
gc

# 5. monitor：方法调用监控
monitor -c 5 com.example.Service method

# 6. trace：方法调用链追踪
trace com.example.Service method

# 7. watch：方法参数和返回值
watch com.example.Service method '{params, returnObj}'
```

## 常见调优场景

### 场景一：频繁 Full GC

```bash
# 问题现象：
# 1. GC 日志中频繁出现 Full GC
# 2. 应用停顿时间过长
# 3. CPU 使用率高

# 排查步骤：
# 1. 查看 GC 日志，确认频率和耗时
# 2. 使用 jstat 监控堆内存变化
# 3. 使用 jmap 查看对象分布
# 4. 分析堆转储找出大对象

# 解决方案：
# 1. 增加堆内存大小
# 2. 优化对象创建，减少临时对象
# 3. 调整 GC 参数（增大新生代、调整阈值）
# 4. 修复内存泄漏
```

### 场景二：内存泄漏

```bash
# 排查步骤：
# 1. 监控堆内存使用趋势（jstat）
# 2. 生成堆转储（jmap）
# 3. 使用 MAT 分析堆转储
# 4. 找出可疑对象（大对象、久存对象）
# 5. 定位代码位置
# 6. 修复并验证

# MAT 分析要点：
# 1. Histogram：查看对象数量和大小
# 2. Dominator Tree：查看对象占用
# 3. Path to GC Roots：查看引用链
# 4. OQL：对象查询语言
```

### 场景三：响应延迟高

```bash
# 排查步骤：
# 1. 分析 GC 日志，确认停顿时间
# 2. 使用 jstack 查看线程状态
# 3. 使用 Arthas trace 追踪方法耗时
# 4. 分析性能瓶颈

# 解决方案：
# 1. 切换到低延迟 GC（G1, ZGC）
# 2. 调整 GC 参数，减少停顿
# 3. 优化慢代码
# 4. 增加资源（CPU、内存）
```

## 调优流程

### 系统化调优步骤

```
┌─────────────────────────────────────────────────────────┐
│                    JVM 调优流程                           │
│                                                           │
│  1. 收集基线数据                                          │
│     - GC 日志、监控指标、性能测试                          │
│     - 建立性能基线                                        │
│                                                           │
│  2. 分析瓶颈                                             │
│     - 识别 GC 问题（频繁 GC、长时间停顿）                   │
│     - 识别内存问题（泄漏、溢出）                           │
│     - 识别性能问题（慢方法、高 CPU）                       │
│                                                           │
│  3. 制定优化方案                                          │
│     - 调整 JVM 参数                                       │
│     - 优化代码                                            │
│     - 选择合适的 GC 器                                    │
│                                                           │
│  4. 实施与验证                                            │
│     - 测试环境验证                                        │
│     - 监控指标变化                                        │
│     - A/B 对比                                           │
│                                                           │
│  5. 持续监控                                             │
│     - 建立监控告警                                        │
│     - 定期回顾性能                                        │
│     - 文档化调优成果                                      │
└─────────────────────────────────────────────────────────┘
```

### 调优检查清单

1. **堆内存**：-Xms 和 -Xmx 是否设置为相同值？
2. **新生代**：新生代大小是否合理？是否频繁 Young GC？
3. **GC 器**：是否选择了适合的 GC 器？
4. **元空间**：MaxMetaspaceSize 是否设置？
5. **GC 日志**：是否开启 GC 日志？
6. **监控**：是否建立了 GC 监控？
7. **代码**：是否存在内存泄漏风险？
8. **工具**：是否掌握了 jstat、jmap、jstack 等工具？

## 总结

掌握 JVM 调优后，你应该能够：

- ✅ 配置 JVM 参数，优化内存布局
- ✅ 分析 GC 日志，诊断 GC 问题
- ✅ 排查 OOM 和内存泄漏
- ✅ 使用 jstat、jmap、jstack 等诊断工具
- ✅ 使用 Arthas 进行线上诊断
- ✅ 系统化地进行 JVM 性能调优

接下来，你可以继续学习 [并发编程深入](/java/expert/并发编程深入)，进一步掌握并发编程的高级技巧！
