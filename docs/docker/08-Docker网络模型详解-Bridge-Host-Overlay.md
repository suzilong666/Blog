# 08-Docker网络模型详解-Bridge-Host-Overlay

## 引言

当多个容器需要协同工作时，Docker 网络模型决定了它们能否可靠通信。理解 `bridge`、`host`、`overlay` 这三种常见模式，是构建稳定容器系统的关键。

本篇文章以场景为线索，讲清不同网络模式的原理、优势、限制和实际适用方式。

## Docker 网络为什么重要

容器本身隔离了进程和文件系统，但应用之间仍需要通信。Docker 网络提供了容器间通信、端口映射、服务发现和跨主机连接的能力。

如果网络选错，可能导致：

- 容器间无法连通；
- 端口冲突；
- 性能下降；
- 安全隔离弱。

## 1. Bridge 网络（默认网络）

### 何时使用

- 单机部署；
- 本地开发；
- 多容器应用在同一宿主机上运行。

### 特点

- 具备容器隔离；
- 容器拥有私有 IP；
- 容器可以通过容器名相互访问；
- 需要端口映射对外暴露服务。

### 示例

```bash
docker network create my-net
docker run -d --name db --network my-net mysql:8
docker run -d --name app --network my-net -p 8080:80 myapp:latest
```

### 适用场景

- Web 服务与数据库同机协同；
- 本地测试；
- 开发环境模拟。

## 2. Host 网络

### 何时使用

- 需要最低网络开销；
- 网络性能敏感；
- 需要直接使用宿主机网络环境。

### 特点

- 容器共享宿主机网络栈；
- 不需要端口映射；
- 隔离性较弱；
- 与宿主机端口直接冲突。

### 示例

```bash
docker run -d --network host nginx
docker run -d --network host myapp:latest
```

### 适用场景

- 高性能网络服务；
- 需要访问宿主机本地网络资源；
- 对内网 IP 依赖较重的场景。

## 3. Overlay 网络

### 何时使用

- 多主机集群；
- Docker Swarm 或 Kubernetes 环境；
- 需要跨节点容器通信。

### 特点

- 在不同宿主机之间构建虚拟网络；
- 支持服务发现和加密通信；
- 依赖集群编排平台。

### 示例（Swarm）

```bash
docker network create -d overlay my-overlay
```

然后在服务定义中使用该网络。

### 适用场景

- 分布式微服务；
- 弹性伸缩集群；
- 跨机房服务通信。

## 4. 常见 Docker 网络命令

```bash
docker network ls
docker network inspect my-net
docker network create --driver bridge my-net
docker network rm my-net
```

这些命令是排查网络问题的基础。

## 5. 选择网络的实际建议

- 开发和单机测试：优先 `bridge`；
- 高性能或对宿主机网络依赖强：选 `host`；
- 跨主机部署：选 `overlay`；
- 对安全和隔离要求高：优先 `bridge`，并结合防火墙和网络策略。

## 6. 常见误区

- 误以为 `host` 模式更安全。实际上它降低了网络隔离；
- 误以为 `bridge` 模式不需要端口映射。外部访问仍需映射；
- 误用 `overlay` 没有集群编排支持。它必须依赖 Swarm 或 Kubernetes。

## 小结

Docker 网络模型不是一个“记忆名称”的题目，而是根据场景选择最合适的通信方式。掌握 `bridge`、`host`、`overlay`，你就能让容器之间的协作更加稳定、性能更可控。
