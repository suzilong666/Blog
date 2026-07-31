# 12-Docker依赖控制与Healthcheck最佳实践

## 引言

容器启动成功不等于服务可用，尤其当你的应用依赖数据库、缓存或外部服务时。Docker 的 `HEALTHCHECK` 机制可以帮助你把“已启动”和“已就绪”区分开，减少启动顺序和依赖问题。

本篇文章介绍 `HEALTHCHECK` 的使用方式、依赖控制技巧及和 Compose 的配合实践。

## 为什么需要健康检查

很多错误场景来源于服务尚未准备好就开始接受请求：

- 数据库还在初始化；
- 应用正在加载依赖；
- 缓存尚未建立连接。

这时容器本身可能已经启动，但应用还不能提供正常服务。健康检查能让系统知道：这个实例是否已经达到真正可用状态。

## Docker `HEALTHCHECK` 语法

```dockerfile
HEALTHCHECK --interval=30s --timeout=5s --retries=3 CMD curl -f http://localhost:8080/health || exit 1
```

参数意义：

- `--interval`：检查间隔；
- `--timeout`：单次检查超时时间；
- `--retries`：连续失败次数；
- `CMD`：执行的检查命令。

当命令返回非零状态时，容器会被标记为 `unhealthy`。

## 常见健康检查方式

### 1. HTTP 检查

适合 Web 服务：

```dockerfile
HEALTHCHECK --interval=15s --timeout=3s CMD curl -f http://localhost:3000/health || exit 1
```

### 2. TCP 端口检查

适用于数据库或缓存：

```dockerfile
HEALTHCHECK --interval=15s --timeout=5s CMD nc -z localhost 5432
```

### 3. 脚本检查

当你需要更复杂的就绪判断时，使用自定义脚本：

```dockerfile
COPY healthcheck.sh /usr/local/bin/healthcheck.sh
HEALTHCHECK --interval=30s CMD /usr/local/bin/healthcheck.sh
```

## 依赖控制与 Docker Compose

`depends_on` 只能保证启动顺序，不保证服务已经健康。

```yaml
services:
  db:
    image: mysql:8
  app:
    image: myapp:latest
    depends_on:
      - db
```

如果你需要真正等待数据库可用，应该结合健康检查或启动等待脚本。

## 实战建议

1. 在镜像层定义 `HEALTHCHECK`；
2. 对关键依赖使用就绪接口；
3. 在 Compose 或编排平台中把健康状态作为依赖条件；
4. 设置合理的重试和超时；
5. 让健康检查尽量简单且幂等。

## 依赖控制的典型模式

- 数据库服务启动后，等待 `mysqld` 可连接；
- Web 应用启动后，等待 `/health` 接口返回正常；
- 消息队列启动后，等待连接可用。

## 常见误区

- 认为 `docker run` 成功就说明服务可用；
- 误用 `depends_on` 作为健康检查；
- 健康检查太复杂，导致检查本身失败；
- 健康检查频率过高，造成额外负载。

## 小结

Docker 的健康检查机制是生产稳定性的基础之一。把 `HEALTHCHECK` 作为镜像构建的一部分，并结合依赖控制策略，你的容器系统会更智能、更可控、更稳健。
