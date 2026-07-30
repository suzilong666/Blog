# Java 8+ 新特性

Java 8 是 Java 发展的里程碑版本，引入了函数式编程、Stream API、新日期时间等重要特性。本文将详细讲解这些特性及其应用。

## Lambda 表达式

### 什么是 Lambda

Lambda 表达式是匿名函数的简化表示，使得函数式编程更加简洁。

```java
// 传统匿名类
Runnable r1 = new Runnable() {
    @Override
    public void run() {
        System.out.println("Hello");
    }
};

// Lambda 表达式
Runnable r2 = () -> System.out.println("Hello");

// 有参数的 Lambda
Comparator<String> c1 = new Comparator<String>() {
    @Override
    public int compare(String s1, String s2) {
        return s1.compareTo(s2);
    }
};

Comparator<String> c2 = (s1, s2) -> s1.compareTo(s2);
```

### Lambda 语法

```java
// 语法格式：(参数列表) -> {方法体}

// 无参数，无返回值
() -> System.out.println("Hello")

// 一个参数，无返回值
name -> System.out.println(name)

// 多个参数
(a, b) -> a + b

// 有返回值（单表达式）
x -> x * 2

// 有返回值（代码块）
x -> {
    int y = x * 2;
    return y;
}
```

### 函数式接口

函数式接口是只包含一个抽象方法的接口，可用 `@FunctionalInterface` 注解标记。

```java
// 常用函数式接口
@FunctionalInterface
public interface MyFunction<T, R> {
    R apply(T t);
}

// Java 内置函数式接口
// Supplier<T>：无参，有返
Supplier<String> supplier = () -> "Hello";
String value = supplier.get();

// Consumer<T>：有参，无返
Consumer<String> consumer = s -> System.out.println(s);
consumer.accept("Hello");

// Function<T, R>：有参，有返
Function<String, Integer> function = s -> s.length();
int length = function.apply("Hello");

// Predicate<T>：有参，返回布尔值
Predicate<String> predicate = s -> s.length() > 3;
boolean result = predicate.test("Hello");

// BiFunction<T, U, R>：两个参数，有返
BiFunction<String, String, String> concat = (a, b) -> a + b;
String combined = concat.apply("Hello", " World");
```

### 方法引用

```java
// 方法引用：:: 操作符

// 静态方法引用
Function<String, Integer> strLength = String::length;
Integer len = strLength.apply("Hello");

// 实例方法引用（特定对象）
String str = "Hello";
Supplier<Integer> lengthSupplier = str::length;
Integer len2 = lengthSupplier.get();

// 实例方法引用（任意对象）
List<String> names = Arrays.asList("Alice", "Bob", "Charlie");
names.forEach(System.out::println);

// 构造器引用
Supplier<List<String>> listSupplier = ArrayList::new;
List<String> list = listSupplier.get();
```

## Stream API

### Stream 概述

Stream 是对集合的函数式操作管道，支持过滤、映射、聚合等操作。

```
┌─────────────────────────────────────────────────────────┐
│                    Stream 操作流程                       │
│                                                           │
│  数据源 → 中间操作 → 中间操作 → ... → 终端操作              │
│                                                           │
│  ┌───────┐   ┌─────────┐   ┌─────────┐   ┌─────────┐   │
│  │ 数据源 │──►│ filter  │──►│  map    │──►│ collect │   │
│  └───────┘   └─────────┘   └─────────┘   └─────────┘   │
│  (集合/数组)  (过滤)        (映射)        (收集结果)      │
│                                                           │
│  特点：                                                   │
│  1. Stream 不存储数据                                     │
│  2. 函数式操作，不修改源数据                               │
│  3. 惰性求值，终端操作时才执行                             │
└─────────────────────────────────────────────────────────┘
```

### 创建 Stream

```java
public class StreamCreation {
    
    public static void main(String[] args) {
        // 从集合创建
        List<String> list = Arrays.asList("A", "B", "C");
        Stream<String> stream1 = list.stream();
        Stream<String> stream2 = list.parallelStream();  // 并行流
        
        // 从数组创建
        String[] array = {"X", "Y", "Z"};
        Stream<String> stream3 = Arrays.stream(array);
        
        // 从值创建
        Stream<String> stream4 = Stream.of("Hello", "World");
        
        // 生成无限流
        Stream<Integer> infinite = Stream.iterate(0, n -> n + 1);
    }
}
```

### 中间操作

```java
public class StreamIntermediate {
    
    public static void main(String[] args) {
        List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);
        
        // filter：过滤
        numbers.stream()
               .filter(n -> n % 2 == 0)
               .forEach(System.out::println);  // 2, 4, 6, 8, 10
        
        // map：映射转换
        numbers.stream()
               .map(n -> n * n)
               .forEach(System.out::println);
        
        // flatMap：扁平化映射
        List<List<Integer>> nested = Arrays.asList(
            Arrays.asList(1, 2),
            Arrays.asList(3, 4),
            Arrays.asList(5, 6)
        );
        nested.stream()
              .flatMap(Collection::stream)
              .forEach(System.out::println);
        
        // distinct：去重
        Arrays.asList(1, 2, 2, 3, 3, 3)
              .stream()
              .distinct()
              .forEach(System.out::println);
        
        // sorted：排序
        numbers.stream().sorted().forEach(System.out::println);
        numbers.stream().sorted(Comparator.reverseOrder()).forEach(System.out::println);
        
        // limit/skip
        numbers.stream().limit(5).forEach(System.out::println);
        numbers.stream().skip(3).forEach(System.out::println);
    }
}
```

### 终端操作

```java
public class StreamTerminal {
    
    public static void main(String[] args) {
        List<Integer> numbers = Arrays.asList(3, 1, 4, 1, 5, 9, 2, 6);
        
        // collect：收集结果
        List<Integer> collected = numbers.stream()
                                          .filter(n -> n > 3)
                                          .collect(Collectors.toList());
        
        // reduce：归约
        int sum = numbers.stream().reduce(0, Integer::sum);
        
        // count：计数
        long count = numbers.stream().filter(n -> n > 3).count();
        
        // findFirst/findAny
        Optional<Integer> first = numbers.stream().filter(n -> n > 3).findFirst();
        
        // 匹配判断
        boolean any = numbers.stream().anyMatch(n -> n > 5);
        boolean all = numbers.stream().allMatch(n -> n > 0);
    }
}
```

### Collectors 工具类

```java
public class CollectorsExample {
    
    public static void main(String[] args) {
        List<Person> people = Arrays.asList(
            new Person("Alice", 25, "Engineer"),
            new Person("Bob", 30, "Designer"),
            new Person("Charlie", 25, "Engineer")
        );
        
        // 转换为 Map
        Map<String, Integer> nameAgeMap = people.stream()
                                                  .collect(Collectors.toMap(
                                                      Person::getName, Person::getAge
                                                  ));
        
        // 按分组
        Map<String, List<Person>> byJob = people.stream()
                                                  .collect(Collectors.groupingBy(Person::getJob));
        
        // 聚合统计
        DoubleSummaryStatistics stats = people.stream()
                                                .collect(Collectors.summarizingDouble(Person::getAge));
        
        // 连接字符串
        String joinedNames = people.stream()
                                    .map(Person::getName)
                                    .collect(Collectors.joining(", ", "[", "]"));
    }
    
    static class Person {
        String name; int age; String job;
        Person(String name, int age, String job) {
            this.name = name; this.age = age; this.job = job;
        }
        String getName() { return name; }
        int getAge() { return age; }
        String getJob() { return job; }
    }
}
```

## Optional 类

### Optional 概述

Optional 是一个容器类，可能包含非空值或为空，用于避免 NullPointerException。

```java
public class OptionalExample {
    
    public static void main(String[] args) {
        // 创建 Optional
        Optional<String> nonEmpty = Optional.of("Hello");
        Optional<String> nullable = Optional.ofNullable(null);
        Optional<String> empty = Optional.empty();
        
        // 检查和获取值
        if (nonEmpty.isPresent()) {
            System.out.println(nonEmpty.get());
        }
        
        // 带默认值获取
        String value = nullable.orElse("Default");
        String value2 = nullable.orElseGet(() -> "Computed Default");
        
        // 链式操作
        Optional<String> result = Optional.ofNullable(getUser())
                                            .map(User::getAddress)
                                            .map(Address::getCity)
                                            .filter(city -> city.length() > 0);
    }
    
    static User getUser() {
        return new User(new Address("Beijing"));
    }
    
    static class User {
        Address address;
        User(Address address) { this.address = address; }
        Address getAddress() { return address; }
    }
    
    static class Address {
        String city;
        Address(String city) { this.city = city; }
        String getCity() { return city; }
    }
}
```

## 新日期时间 API

### LocalDate/LocalTime/LocalDateTime

```java
import java.time.*;
import java.time.format.DateTimeFormatter;

public class NewDateTimeAPI {
    
    public static void main(String[] args) {
        // LocalDate：日期
        LocalDate today = LocalDate.now();
        LocalDate specificDate = LocalDate.of(2024, 1, 15);
        
        // LocalTime：时间
        LocalTime now = LocalTime.now();
        LocalTime specificTime = LocalTime.of(14, 30, 0);
        
        // LocalDateTime：日期时间
        LocalDateTime dateTime = LocalDateTime.now();
        
        // ZonedDateTime：带时区
        ZonedDateTime tokyoTime = ZonedDateTime.now(ZoneId.of("Asia/Tokyo"));
        
        // 日期运算
        LocalDate tomorrow = today.plusDays(1);
        LocalDate lastWeek = today.minusWeeks(1);
        
        // 格式化
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        String formatted = dateTime.format(formatter);
    }
}
```

## 接口默认方法

### 默认方法

```java
public interface Vehicle {
    
    void start();
    
    // 默认方法
    default void stop() {
        System.out.println("Vehicle stopped");
    }
    
    default String getInfo() {
        return "Vehicle";
    }
    
    // 静态方法
    static Vehicle createElectric() {
        return new ElectricCar();
    }
}

public class Car implements Vehicle {
    @Override
    public void start() {
        System.out.println("Car started");
    }
    
    // 可以选择覆盖默认方法
    @Override
    public void stop() {
        System.out.println("Car stopped with brake");
    }
}
```

## CompletableFuture

### 异步编程

```java
public class CompletableFutureExample {
    
    public static void main(String[] args) throws Exception {
        // 创建异步任务
        CompletableFuture<String> future = CompletableFuture.supplyAsync(() -> {
            // 异步计算
            Thread.sleep(1000);
            return "Hello from async";
        });
        
        // 链式处理
        future.thenApply(result -> result.toUpperCase())
              .thenAccept(result -> System.out.println("Result: " + result));
        
        // 组合多个 Future
        CompletableFuture<String> future1 = CompletableFuture.supplyAsync(() -> "Hello");
        CompletableFuture<String> future2 = CompletableFuture.supplyAsync(() -> "World");
        
        future1.thenCombine(future2, (f1, f2) -> f1 + " " + f2)
               .thenAccept(System.out::println);
        
        // 异常处理
        CompletableFuture<String> safeFuture = CompletableFuture.supplyAsync(() -> {
            if (Math.random() > 0.5) {
                throw new RuntimeException("Error");
            }
            return "Success";
        }).exceptionally(ex -> "Fallback: " + ex.getMessage());
        
        // 等待所有完成
        CompletableFuture.allOf(future1, future2).join();
    }
}
```

## 总结

掌握 Java 8+ 新特性后，你应该能够：

- ✅ 使用 Lambda 表达式简化代码
- ✅ 创建和使用函数式接口
- ✅ 使用 Stream API 进行函数式数据处理
- ✅ 使用 Optional 避免空指针异常
- ✅ 使用新日期时间 API 处理时间
- ✅ 使用 CompletableFuture 进行异步编程

接下来，你可以继续学习 [IO 与 NIO](/java/advanced/IO与NIO)，掌握 Java 的 IO 系统！
