# Java IO 与 NIO

Java 的 IO 系统提供了丰富的输入输出功能。本文将详细讲解传统 IO、NIO（新 IO）的原理和使用方法，以及它们的区别与应用场景。

## IO 概述

### 什么是 IO

IO（Input/Output）是指数据的输入和输出操作。Java 提供了两套 IO API：

- **传统 IO（java.io）**：基于流的阻塞式 IO
- **NIO（java.nio）**：基于缓冲区和通道的非阻塞 IO

```
┌─────────────────────────────────────────────────────────┐
│                      IO 体系结构                         │
│                                                           │
│  ┌─────────────────────────────────────────────────┐   │
│  │                  java.io (传统 IO)                │   │
│  │  - 基于流（Stream）                               │   │
│  │  - 阻塞式（Blocking）                            │   │
│  │  - 面向字节和字符                                 │   │
│  └─────────────────────────────────────────────────┘   │
│                                                           │
│  ┌─────────────────────────────────────────────────┐   │
│  │              java.nio (新 IO)                     │   │
│  │  - 基于缓冲区（Buffer）和通道（Channel）          │   │
│  │  - 非阻塞式（Non-blocking）                       │   │
│  │  - 多路复用（Multiplexing）                       │   │
│  └─────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────┘
```

## 传统 IO

### 字节流

字节流以字节为单位处理数据，适用于二进制文件。

```java
import java.io.*;

public class ByteStreamExample {
    
    // 文件读取
    public static void readFile(String path) throws IOException {
        try (FileInputStream fis = new FileInputStream(path);
             BufferedInputStream bis = new BufferedInputStream(fis)) {
            
            int data;
            while ((data = bis.read()) != -1) {
                System.out.print((char) data);
            }
        }
    }
    
    // 文件写入
    public static void writeFile(String path, String content) throws IOException {
        try (FileOutputStream fos = new FileOutputStream(path);
             BufferedOutputStream bos = new BufferedOutputStream(fos)) {
            
            bos.write(content.getBytes());
        }
    }
    
    // 文件复制
    public static void copyFile(String source, String dest) throws IOException {
        try (FileInputStream fis = new FileInputStream(source);
             FileOutputStream fos = new FileOutputStream(dest)) {
            
            byte[] buffer = new byte[8192];
            int bytesRead;
            while ((bytesRead = fis.read(buffer)) != -1) {
                fos.write(buffer, 0, bytesRead);
            }
        }
    }
}
```

### 字符流

字符流以字符为单位处理数据，适用于文本文件。

```java
import java.io.*;

public class CharStreamExample {
    
    // 读取文本文件
    public static void readTextFile(String path) throws IOException {
        try (FileReader fr = new FileReader(path);
             BufferedReader br = new BufferedReader(fr)) {
            
            String line;
            while ((line = br.readLine()) != null) {
                System.out.println(line);
            }
        }
    }
    
    // 写入文本文件
    public static void writeTextFile(String path, List<String> lines) throws IOException {
        try (FileWriter fw = new FileWriter(path);
             BufferedWriter bw = new BufferedWriter(fw)) {
            
            for (String line : lines) {
                bw.write(line);
                bw.newLine();
            }
        }
    }
    
    // 使用 PrintWriter 格式化输出
    public static void writeFormatted(String path) throws IOException {
        try (PrintWriter pw = new PrintWriter(new FileWriter(path))) {
            pw.printf("姓名: %s%n", "张三");
            pw.printf("年龄: %d%n", 25);
            pw.printf("成绩: %.2f%n", 95.5);
        }
    }
}
```

### IO 流体系

```
┌─────────────────────────────────────────────────────────┐
│                 java.io 流体系                          │
│                                                           │
│  字节流:                                                  │
│  ├── InputStream (抽象类)                                 │
│  │   ├── FileInputStream     文件输入                    │
│  │   ├── ByteArrayInputStream 数组输入                  │
│  │   ├── PipedInputStream    管道输入                    │
│  │   ├── FilterInputStream   过滤输入                    │
│  │   │   ├── BufferedInputStream 缓冲输入               │
│  │   │   ├── DataInputStream 数据输入                   │
│  │   │   └── PushbackInputStream 回读输入                │
│  │   └── ObjectInputStream   对象输入                    │
│  │                                                       │
│  └── OutputStream (抽象类)                                │
│      ├── FileOutputStream     文件输出                    │
│      ├── ByteArrayOutputStream 数组输出                  │
│      ├── PipedOutputStream    管道输出                    │
│      ├── FilterOutputStream  过滤输出                    │
│      │   ├── BufferedOutputStream 缓冲输出               │
│      │   ├── DataOutputStream 数据输出                   │
│      │   └── PrintStream     打印输出                    │
│      └── ObjectOutputStream   对象输出                    │
│                                                           │
│  字符流:                                                  │
│  ├── Reader (抽象类)                                      │
│  │   ├── FileReader          文件读取                    │
│  │   ├── BufferedReader      缓冲读取                    │
│  │   ├── InputStreamReader   字节→字符转换                │
│  │   └── StringReader        字符串读取                  │
│  │                                                       │
│  └── Writer (抽象类)                                      │
│      ├── FileWriter          文件写入                    │
│      ├── BufferedWriter      缓冲写入                    │
│      ├── OutputStreamWriter  字符→字节转换                │
│      └── StringWriter        字符串写入                  │
└─────────────────────────────────────────────────────────┘
```

## NIO 基础

### NIO 核心组件

```
┌─────────────────────────────────────────────────────────┐
│                     NIO 核心组件                          │
│                                                           │
│  ┌─────────────────────────────────────────────────┐   │
│  │  Buffer（缓冲区）                                │   │
│  │  - 存储数据的内存区域                             │   │
│  │  - 类型：ByteBuffer, CharBuffer, IntBuffer 等  │   │
│  │  - 状态：capacity, position, limit, mark        │   │
│  └─────────────────────────────────────────────────┘   │
│                                                           │
│  ┌─────────────────────────────────────────────────┐   │
│  │  Channel（通道）                                 │   │
│  │  - 双向的数据传输通道                             │   │
│  │  - 类型：FileChannel, SocketChannel, ServerSocketChannel │
│  │  - 可非阻塞模式                                  │   │
│  └─────────────────────────────────────────────────┘   │
│                                                           │
│  ┌─────────────────────────────────────────────────┐   │
│  │  Selector（选择器）                              │   │
│  │  - 多路复用器                                    │   │
│  │  - 监听多个 Channel 的事件                       │   │
│  │  - 单线程处理多个连接                             │   │
│  └─────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────┘
```

### Buffer 使用

```java
import java.nio.ByteBuffer;

public class BufferExample {
    
    public static void main(String[] args) {
        // 创建 Buffer
        ByteBuffer buffer = ByteBuffer.allocate(1024);
        
        // 写入数据
        buffer.put((byte) 'H');
        buffer.put((byte) 'e');
        buffer.put((byte) 'l');
        buffer.put((byte) 'l');
        buffer.put((byte) 'o');
        
        // 切换到读模式
        buffer.flip();
        
        // 读取数据
        while (buffer.hasRemaining()) {
            System.out.print((char) buffer.get());
        }
        System.out.println();
        
        // 清空缓冲区
        buffer.clear();
        
        // 常用方法
        buffer.mark();  // 标记当前位置
        buffer.reset(); // 回到标记位置
        buffer.rewind(); // 重新读取
        
        // position, limit, capacity
        ByteBuffer bb = ByteBuffer.allocate(10);
        bb.put("Hello".getBytes());
        System.out.println("Position: " + bb.position());  // 5
        System.out.println("Limit: " + bb.limit());        // 10
        System.out.println("Capacity: " + bb.capacity());  // 10
        
        bb.flip();
        System.out.println("After flip - Position: " + bb.position());  // 0
        System.out.println("After flip - Limit: " + bb.limit());        // 5
    }
}
```

### FileChannel 使用

```java
import java.io.*;
import java.nio.ByteBuffer;
import java.nio.channels.FileChannel;

public class FileChannelExample {
    
    // 使用 FileChannel 读取文件
    public static void readFile(String path) throws IOException {
        try (RandomAccessFile raf = new RandomAccessFile(path, "r");
             FileChannel channel = raf.getChannel()) {
            
            ByteBuffer buffer = ByteBuffer.allocate(1024);
            
            while (channel.read(buffer) != -1) {
                buffer.flip();
                while (buffer.hasRemaining()) {
                    System.out.print((char) buffer.get());
                }
                buffer.clear();
            }
        }
    }
    
    // 使用 FileChannel 写入文件
    public static void writeFile(String path, String content) throws IOException {
        try (RandomAccessFile raf = new RandomAccessFile(path, "rw");
             FileChannel channel = raf.getChannel()) {
            
            ByteBuffer buffer = ByteBuffer.wrap(content.getBytes());
            channel.write(buffer);
        }
    }
    
    // 使用 FileChannel 复制文件（零拷贝）
    public static void copyFile(String source, String dest) throws IOException {
        try (RandomAccessFile srcRaf = new RandomAccessFile(source, "r");
             FileChannel srcChannel = srcRaf.getChannel();
             RandomAccessFile destRaf = new RandomAccessFile(dest, "rw");
             FileChannel destChannel = destRaf.getChannel()) {
            
            // 零拷贝方式
            long size = srcChannel.size();
            srcChannel.transferTo(0, size, destChannel);
        }
    }
}
```

## NIO 非阻塞编程

### 非阻塞 IO 概念

```
┌─────────────────────────────────────────────────────────┐
│              阻塞 vs 非阻塞                              │
│                                                           │
│  阻塞 IO：                                                │
│  ┌──────┐  ┌──────┐  ┌──────┐                           │
│  │线程1 │  │线程2 │  │线程3 │  ← 每个连接一个线程         │
│  │等待  │  │等待  │  │等待  │     大量线程，资源浪费       │
│  └──────┘  └──────┘  └──────┘                           │
│                                                           │
│  非阻塞 IO（多路复用）：                                   │
│  ┌─────────────────────────────────────────────────┐   │
│  │                   主循环线程                      │   │
│  │  ┌─────────────────────────────────────────┐    │   │
│  │  │  Selector (选择器)                       │    │   │
│  │  │  - 监听多个 Channel                      │    │   │
│  │  │  - 有事件时才处理                         │    │   │
│  │  └─────────────────────────────────────────┘    │   │
│  │                                                  │   │
│  │  Channel1  Channel2  Channel3  ...              │   │
│  └─────────────────────────────────────────────────┘   │
│                                                           │
│  优点：                                                   │
│  1. 少量线程处理大量连接                                  │
│  2. 资源利用率高                                          │
│  3. 响应速度快                                            │
└─────────────────────────────────────────────────────────┘
```

### SocketChannel 非阻塞示例

```java
import java.io.IOException;
import java.net.InetSocketAddress;
import java.nio.ByteBuffer;
import java.nio.channels.SelectionKey;
import java.nio.channels.Selector;
import java.nio.channels.ServerSocketChannel;
import java.nio.channels.SocketChannel;
import java.util.Iterator;

public class NIOServer {
    
    public static void main(String[] args) throws IOException {
        // 创建 Selector
        Selector selector = Selector.open();
        
        // 创建 ServerSocketChannel
        ServerSocketChannel serverChannel = ServerSocketChannel.open();
        serverChannel.configureBlocking(false);  // 非阻塞模式
        serverChannel.bind(new InetSocketAddress(8080));
        
        // 注册到 Selector
        serverChannel.register(selector, SelectionKey.OP_ACCEPT);
        
        System.out.println("NIO Server started on port 8080");
        
        // 事件循环
        while (true) {
            // 等待事件
            int readyCount = selector.select();
            if (readyCount == 0) continue;
            
            // 获取事件
            Iterator<SelectionKey> keyIterator = selector.selectedKeys().iterator();
            
            while (keyIterator.hasNext()) {
                SelectionKey key = keyIterator.next();
                keyIterator.remove();
                
                if (key.isAcceptable()) {
                    // 接受连接
                    ServerSocketChannel server = (ServerSocketChannel) key.channel();
                    SocketChannel client = server.accept();
                    client.configureBlocking(false);
                    client.register(selector, SelectionKey.OP_READ);
                    System.out.println("Client connected: " + client.getRemoteAddress());
                } else if (key.isReadable()) {
                    // 读取数据
                    SocketChannel client = (SocketChannel) key.channel();
                    ByteBuffer buffer = ByteBuffer.allocate(1024);
                    int bytesRead = client.read(buffer);
                    
                    if (bytesRead == -1) {
                        // 客户端断开
                        client.close();
                        key.cancel();
                        System.out.println("Client disconnected");
                    } else {
                        buffer.flip();
                        String message = new String(buffer.array(), 0, bytesRead);
                        System.out.println("Received: " + message);
                        
                        // 回显
                        buffer.clear();
                        buffer.put(("Echo: " + message).getBytes());
                        buffer.flip();
                        client.write(buffer);
                    }
                }
            }
        }
    }
}
```

## Path 和 Files

### Path 使用

```java
import java.nio.file.Path;
import java.nio.file.Paths;

public class PathExample {
    
    public static void main(String[] args) {
        // 创建 Path
        Path path1 = Paths.get("C:/Users/example/file.txt");
        Path path2 = Paths.get("C:", "Users", "example", "file.txt");
        Path path3 = Path.of("C:/Users/example/file.txt");  // Java 11+
        
        // Path 操作
        System.out.println("文件名: " + path1.getFileName());       // file.txt
        System.out.println("父路径: " + path1.getParent());         // C:\Users\example
        System.out.println("根路径: " + path1.getRoot());           // C:\
        System.out.println("绝对路径: " + path1.isAbsolute());      // true
        System.out.println("规范化: " + path1.normalize());
        
        // 路径拼接
        Path base = Paths.get("C:/Users");
        Path child = base.resolve("documents");
        System.out.println(child);  // C:\Users\documents
        
        // 相对路径
        Path relative = base.relativize(child);
        System.out.println(relative);  // documents
    }
}
```

### Files 工具类

```java
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.*;
import java.util.List;
import java.util.stream.Stream;

public class FilesExample {
    
    public static void main(String[] args) throws IOException {
        // 创建文件/目录
        Path dir = Files.createDirectory(Paths.get("newDir"));
        Path file = Files.createFile(Paths.get("newDir/newFile.txt"));
        Path tempDir = Files.createTempDirectory("temp");
        
        // 写入文件
        String content = "Hello, Files API!";
        Files.writeString(file, content);
        Files.write(file, content.getBytes(StandardCharsets.UTF_8));
        Files.write(file, content.getBytes(), StandardOpenOption.APPEND);
        
        // 读取文件
        String readContent = Files.readString(file);
        List<String> lines = Files.readAllLines(file);
        byte[] bytes = Files.readAllBytes(file);
        
        // 遍历目录
        try (Stream<Path> stream = Files.list(Paths.get("."))) {
            stream.forEach(System.out::println);
        }
        
        // 递归遍历
        try (Stream<Path> stream = Files.walk(Paths.get("."))) {
            stream.filter(Files::isRegularFile)
                  .forEach(System.out::println);
        }
        
        // 文件操作
        Files.copy(file, Paths.get("copy.txt"));
        Files.move(file, Paths.get("moved.txt"));
        Files.deleteIfExists(Paths.get("copy.txt"));
        
        // 文件属性
        System.out.println("存在: " + Files.exists(file));
        System.out.println("大小: " + Files.size(file));
        System.out.println("是否目录: " + Files.isDirectory(file));
        System.out.println("是否可读: " + Files.isReadable(file));
    }
}
```

## IO 性能优化

### 缓冲区使用

```java
public class BufferOptimization {
    
    // 无缓冲（慢）
    public void readWithoutBuffer(String path) throws IOException {
        try (FileInputStream fis = new FileInputStream(path)) {
            int data;
            while ((data = fis.read()) != -1) {
                // 每次读取一个字节
            }
        }
    }
    
    // 使用缓冲（快）
    public void readWithBuffer(String path) throws IOException {
        try (BufferedInputStream bis = new BufferedInputStream(
                new FileInputStream(path))) {
            int data;
            while ((data = bis.read()) != -1) {
                // 内部缓冲，减少 IO 次数
            }
        }
    }
    
    // 自定义缓冲区大小
    public void readWithCustomBuffer(String path) throws IOException {
        try (FileInputStream fis = new FileInputStream(path);
             BufferedInputStream bis = new BufferedInputStream(fis, 65536)) {
            // 64KB 缓冲区
            byte[] buffer = new byte[8192];
            int bytesRead;
            while ((bytesRead = bis.read(buffer)) != -1) {
                // 批量读取
            }
        }
    }
}
```

### 零拷贝技术

```java
public class ZeroCopyExample {
    
    // 传统方式：多次数据拷贝
    public void traditionalCopy(String source, String dest) throws IOException {
        try (FileInputStream fis = new FileInputStream(source);
             FileOutputStream fos = new FileOutputStream(dest)) {
            
            byte[] buffer = new byte[8192];
            int bytesRead;
            while ((bytesRead = fis.read(buffer)) != -1) {
                fos.write(buffer, 0, bytesRead);
            }
            // 数据拷贝路径：
            // 磁盘 → 内核缓冲区 → 用户缓冲区 → 内核缓冲区 → 磁盘
            // 共 4 次拷贝
        }
    }
    
    // 零拷贝方式：减少数据拷贝
    public void zeroCopy(String source, String dest) throws IOException {
        try (RandomAccessFile srcRaf = new RandomAccessFile(source, "r");
             FileChannel srcChannel = srcRaf.getChannel();
             RandomAccessFile destRaf = new RandomAccessFile(dest, "rw");
             FileChannel destChannel = destRaf.getChannel()) {
            
            // transferTo 使用零拷贝
            srcChannel.transferTo(0, srcChannel.size(), destChannel);
            // 数据拷贝路径：
            // 磁盘 → 内核缓冲区 → 磁盘
            // 仅 2 次拷贝（通过 DMA）
        }
    }
}
```

## 总结

掌握 IO 与 NIO 后，你应该能够：

- ✅ 使用传统 IO 进行文件读写
- ✅ 理解 NIO 的 Buffer、Channel、Selector 核心概念
- ✅ 使用 NIO 实现非阻塞网络编程
- ✅ 使用 Path 和 Files API 操作文件系统
- ✅ 应用性能优化技术，包括缓冲区和零拷贝

接下来，你可以继续学习 [序列化](/java/advanced/序列化)，掌握对象持久化的方法！
