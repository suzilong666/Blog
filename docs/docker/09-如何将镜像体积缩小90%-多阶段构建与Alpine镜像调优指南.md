# 09-如何将镜像体积缩小90%-多阶段构建与Alpine镜像调优指南

## 引言

镜像体积直接影响构建速度、拉取时间、部署效率与运行成本。一个过大的镜像会让 CI 变慢、部署变慢、容器启动变慢。

本篇文章聚焦两条最实用的优化路径：多阶段构建与 Alpine 轻量镜像，同时兼顾可维护性和稳定性。

## 为什么要关注镜像体积

镜像体积过大带来的问题：

- 网络传输慢；
- CI 构建与缓存效率低；
- 容器启动和部署延迟增加；
- 存储成本上升；
- 安全扫描范围扩大。

优化镜像不是为了“炫耀数字”，而是为了提升整个交付链路的效率。

## 1. 多阶段构建：把构建环境和运行环境分离

多阶段构建允许你在一个 Dockerfile 中使用多个阶段。前一个阶段负责构建、安装开发依赖，最终阶段只保留运行时所需文件。

示例：

```dockerfile
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM node:20-alpine
WORKDIR /app
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
CMD ["node", "dist/index.js"]
```

这样最终镜像中不会出现构建工具、源码编译缓存和临时文件。

## 2. 使用轻量基础镜像（Alpine）

`alpine` 镜像非常小，适合对体积敏感的场景。但它也可能带来兼容性问题，例如某些二进制依赖需要 `glibc` 或额外包。

示例：

```dockerfile
FROM python:3.12-alpine
RUN apk add --no-cache build-base libffi-dev
```

当你选择 Alpine 时，务必要测试运行时行为，尤其是依赖编译、动态链接库和 shell 命令。

## 3. 其他常见瘦身策略

### 3.1 减少镜像层数

每个 `RUN`、`COPY`、`ADD` 指令都会产生一层。合理合并命令能减少层数，但不要牺牲可读性。

### 3.2 清理临时文件

安装依赖时，避免留下缓存：

```dockerfile
RUN apk add --no-cache ... && rm -rf /var/cache/apk/*
```

### 3.3 使用 `.dockerignore`

把不需要的文件从上下文中排除，例如 `node_modules`、日志、IDE 配置文件。

### 3.4 只复制必要文件

不要 `COPY . .`，而应先复制依赖清单，再复制源代码，这样能提高缓存命中率。

## 4. 体积优化与稳定性之间的平衡

- 不是每个镜像都必须用 Alpine。对于复杂依赖，`slim` 或官方基础镜像可能更稳定。
- 不是所有步骤都要压缩成一行。保持 Dockerfile 可读性，便于长期维护。
- 先保证镜像可运行，再做瘦身优化。

## 5. 实战建议

1. 先使用多阶段构建；
2. 再评估是否适合 Alpine；
3. 用 `docker history` 和 `docker images --format` 分析镜像层；
4. 使用 `dive`、`docker-slim` 等工具检查体积来源；
5. 在 CI 中持续监控镜像体积变化。

## 6. 常见误区

- 误认为镜像体积越小越好。可维护性与稳定性同样重要。
- 误把 `alpine` 作为默认选择。选择应基于依赖兼容性。
- 误以为删除文件即可减小体积。只删可写层文件足够，但镜像层仍然保留历史。

## 小结

镜像优化是一个“先结构化、后细化”的过程：先用多阶段构建分离构建与运行阶段，再用合适基础镜像和上下文控制压缩体积。这样你才能把“体积小”变成“交付快、部署稳、运维好”的真实收益。
