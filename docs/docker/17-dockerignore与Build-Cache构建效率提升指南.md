# 17-dockerignore与Build-Cache构建效率提升指南

## 引言

频繁构建 Docker 镜像时，构建速度和缓存命中率直接影响开发效率。`.dockerignore` 和 Build Cache 是两个最有效的优化点。

本篇文章从构建上下文、缓存命中和 Dockerfile 组织三个层面，讲清如何让 Docker 构建更快、更稳定。

## 1. 为什么构建效率重要

构建慢会带来：

- 开发反馈周期拉长；
- CI 流水线变慢；
- 测试和部署成本升高；
- 迭代体验下降。

优化构建并不是“折腾技巧”，而是提升整个交付链路效率。

## 2. `.dockerignore`：控制构建上下文

Docker 构建时会把当前目录上下文发送给守护进程。如果上下文包含大量无关文件，构建会变慢。

常见 `.dockerignore` 内容：

```
node_modules
.git
logs
*.log
dist
.idea
.vscode
.DS_Store
```

### 为什么要忽略这些文件

- `node_modules`：依赖应在镜像内部安装；
- `.git`：版本控制元数据不需要；
- 日志与临时文件：与镜像运行无关；
- 产物目录：如果你构建时会重新生成。

## 3. Build Cache：让镜像构建更“增量”

Docker 会缓存每个镜像层的构建结果。只要某层之前的输入没有改变，Docker 就会复用缓存。

### 关键原则

- 把变化少的步骤放到前面；
- 把变化频繁的步骤放到后面；
- 合理拆分 `COPY` 和 `RUN`。

示例：

```dockerfile
COPY package*.json ./
RUN npm install
COPY . .
```

只要依赖文件没变，`npm install` 就能复用缓存。

## 4. Dockerfile 写法优化

### 推荐写法

```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --production
COPY . .
CMD ["node", "index.js"]
```

### 避免写法

```dockerfile
COPY . .
RUN npm install
```

这种写法会导致每次源码改动都重新执行依赖安装。

## 5. 实用命令与工具

- `docker build --progress=plain .`：查看详细构建日志；
- `docker build --no-cache .`：禁用缓存；
- `docker build --target builder .`：只构建指定阶段；
- `dive <image>`：分析镜像层和体积；
- `docker buildx`：构建跨平台镜像并优化缓存。

## 6. 常见误区

- 误以为 `.dockerignore` 只能影响镜像大小。它同样影响构建速度；
- 误以为缓存总是自动命中。构建上下文变化会导致失效；
- 误以为层数越少越好。合理的层划分更重要。

## 7. 进阶技巧

- 使用多阶段构建把临时文件隔离到构建阶段；
- 对大文件和生成目录单独处理；
- 复用构建缓存到共享环境（如 CI 缓存）；
- 用 `docker buildx create --use` 提前构建增强缓存效果。

## 小结

`.dockerignore` 和 Build Cache 是 Docker 构建优化的两大基础。控制构建上下文、优化 Dockerfile 顺序、理解缓存原理，才能让镜像构建从“每次重做”变成“增量复用”。这对快速迭代和高效 CI 都至关重要。
