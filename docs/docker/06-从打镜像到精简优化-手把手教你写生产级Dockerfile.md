# 06-从打镜像到精简优化-手把手教你写生产级Dockerfile

## 引言

Dockerfile 是镜像构建的说明书。它决定了镜像来自哪里、依赖如何安装、代码如何复制、以及最终如何启动。在生产环境中，一个设计良好的 Dockerfile，能显著提高构建稳定性、缓存命中率和镜像可维护性。

## Dockerfile 的核心组成

最常见的关键指令有：

- `FROM`：指定基础镜像；
- `WORKDIR`：设置工作目录；
- `COPY` / `ADD`：复制文件到镜像；
- `RUN`：执行构建命令；
- `EXPOSE`：声明端口；
- `CMD` / `ENTRYPOINT`：指定容器启动命令；
- `ENV`：定义环境变量；
- `VOLUME`：声明挂载卷。

掌握这些指令之后，Dockerfile 就不是黑盒，而是一个可读的构建流程。

## 一个基本示例

```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --production
COPY . .
EXPOSE 3000
CMD ["node", "index.js"]
```

这个示例体现了生产级镜像的基本思路：先复制依赖清单，安装依赖，再复制代码，最后启动应用。

## 生产级 Dockerfile 的优化策略

### 1. 利用构建缓存

Docker 会缓存每一层命令结果。常见优化是把变化频率低的步骤放在前面，比如：

```dockerfile
COPY package*.json ./
RUN npm install --production
COPY . .
```

当你只修改源码而不改依赖时，`npm install` 可以复用缓存，构建速度大幅提升。

### 2. 使用多阶段构建

多阶段构建可以把构建依赖与运行依赖分离，最终镜像只包含运行时所需内容。

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

这样既能保持构建阶段的灵活性，又能让最终镜像更小。

### 3. 选择合适的基础镜像

基础镜像越轻量，最终镜像越小。但不要为了最小体积牺牲稳定性。常见选择：

- `alpine`：极致轻量，适合稳定的运行时；
- `slim`：兼顾兼容性和体积；
- 官方镜像：通常支持更好。

### 4. 避免不必要的文件

使用 `.dockerignore` 排除本地开发环境中的临时文件、日志、`node_modules`、构建缓存等，避免它们进入构建上下文。

### 5. 只安装运行时依赖

如果有构建工具和开发依赖，尽量只在构建阶段安装它们，最终镜像中只保留生产依赖。

## 常见误区

- 把整个项目目录直接 `COPY . .`，导致构建上下文变大；
- 把构建工具和临时文件留在最终镜像中；
- 忽略了构建缓存机制；
- 在 Dockerfile 中硬编码环境配置。

## 何时使用 `CMD` 与 `ENTRYPOINT`

- `CMD` 更适合默认命令，可被 `docker run` 覆盖；
- `ENTRYPOINT` 更适合固定命令，适合把容器当作可执行程序。

例如：

```dockerfile
ENTRYPOINT ["node", "dist/index.js"]
CMD ["--port", "3000"]
```

这样既能固定运行程序，又能通过 `docker run` 传参。

## 最佳实践总结

1. 明确基础镜像；
2. 先复制依赖文件，后复制源码；
3. 使用多阶段构建；
4. 拒绝无关文件进入镜像；
5. 保持 Dockerfile 简洁、可读；
6. 把配置和敏感信息从镜像中剥离出来。

## 结语

生产级 Dockerfile 的目标不是“写了就行”，而是“写得可维护、构建稳定、运行高效”。把镜像构建当成工程化流程，而不是一次性手工操作，你就能让 Docker 的价值真正落地。
