# 16-Docker容器资源隔离-Cgroups-Namespace底层原理深剖

## 引言

Docker 能做到“轻量隔离”，并不是因为它有特殊魔法，而是因为 Linux 内核提供了 Namespace 和 Cgroups。理解这两类机制，才能真正看懂 Docker 为什么既轻量又可控。

本篇文章从隔离与资源控制两大核心层面，拆解 Docker 的底层原理，并给出常见配置和实践建议。

## 1. Namespace：让容器有自己的世界

Namespace 是 Linux 提供的隔离机制，它把进程视图、网络视图、文件系统视图等分离开来。Docker 使用多种 Namespace 组合，构建容器的运行空间。

常见 Namespace 类型：

- PID Namespace：进程号隔离；
- NET Namespace：网络隔离；
- MNT Namespace：挂载点隔离；
- IPC Namespace：进程间通信隔离；
- UTS Namespace：主机名隔离；
- USER Namespace：用户和组隔离。

这些 Namespace 共同作用，使容器内看起来像一个独立系统，而不是直接暴露宿主机环境。

## 2. Cgroups：控制容器资源使用

Cgroups（Control Groups）提供资源限制和会计能力。它可以限制容器对 CPU、内存、IO、网络等资源的使用，防止单个容器把宿主机拖垮。

常见 Cgroups 资源类型：

- CPU：`--cpus`、`--cpu-shares`；
- 内存：`--memory`、`--memory-swap`；
- 块设备 I/O：`--device-read-bps`、`--device-write-bps`；
- PIDs：`--pids-limit`。

示例：

```bash
docker run -d --name app --cpus=1.0 --memory=512m myapp:latest
```

这条命令让容器最多使用 1 个 CPU 和 512MB 内存。

## 3. Docker 的轻量不是“没有隔离”

与虚拟机相比，Docker 不虚拟硬件，而是共享内核。它通过 Namespace 实现视图隔离，通过 Cgroups 实现资源控制。这意味着：

- 容器启动快；
- 资源开销小；
- 隔离度低于虚拟机，但通常足够应用级别场景。

## 4. 常见 Docker 运行参数与底层对应关系

- `--network`：对应 NET Namespace；
- `--pid`：对应 PID Namespace；
- `--user`：对应 USER Namespace；
- `--cpus`、`--memory`：对应 Cgroups 资源限制；
- `--pids-limit`：对应 Cgroups PID 限制。

## 5. 何时需要手动配置资源限制

当你在单机上运行多个容器，或服务可能出现异常暴涨时，建议显式配置资源限制：

- CPU 和内存限制防止资源争抢；
- PID 限制防止 fork 炸弹；
- I/O 限制防止磁盘占用过高。

如果不设置，容器会默认享有宿主机大部分资源，可能导致“单个容器拖垮整机”。

## 6. 常见误区

- 误认为 Docker 与宿主机完全隔离。实际上容器共享宿主机内核；
- 误以为资源限制越严格越好。过严会导致应用性能问题；
- 误以为只需 Namespace 就够。资源控制同样重要。

## 小结

Docker 的底层核心就是“Namespace + Cgroups”。Namespace 负责隔离运行视图，Cgroups 负责资源控制。这两者结合，才是 Docker 轻量容器模型的根基。理解它们，能让你更好地设计容器运行策略，而不是盲目把容器当成“轻量虚拟机”。
