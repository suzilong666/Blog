# 05-程序员高效神器-Docker常用命令实战速查（附记忆口诀）

## 引言

Docker 命令行看起来繁杂，但日常使用中真正用到的只是几类命令。掌握这些命令，不只是记住语法，更是建立排查问题和运维容器的思路。

本篇文章按场景分组，讲清楚最实用的 Docker 命令，并给出一套便于记忆的实战口诀。

## 常用命令分类

### 1. 镜像管理

- `docker pull <image>`：拉取镜像；
- `docker images`：查看本地镜像；
- `docker rmi <image>`：删除镜像；
- `docker build -t <name>:<tag> .`：构建镜像。

这些命令帮助你管理 Docker 运行的基础素材。

### 2. 容器管理

- `docker run`：启动容器；
- `docker ps`：查看运行中容器；
- `docker ps -a`：查看所有容器；
- `docker stop <name>`：停止容器；
- `docker rm <name>`：删除容器；
- `docker restart <name>`：重启容器。

实例：

```bash
docker run -d --name app -p 8080:80 nginx
```

这条命令是最典型的“启动容器并映射端口”的操作。

### 3. 日志与调试

- `docker logs <name>`：查看容器日志；
- `docker exec -it <name> /bin/sh`：进入容器交互式终端；
- `docker inspect <name>`：查看容器或镜像元信息；
- `docker stats`：实时监控容器资源使用。

排查思路：

1. 容器是否存在？`docker ps -a`；
2. 是否启动失败？`docker logs`；
3. 是否配置错误？`docker inspect`；
4. 是否资源问题？`docker stats`。

### 4. 网络管理

- `docker network ls`：列出网络；
- `docker network inspect <network>`：查看网络详情；
- `docker network create <name>`：创建网络；
- `docker network connect <network> <container>`：把容器加入网络。

在多个容器协同工作时，网络命令是排查通信问题的关键。

### 5. 数据卷与持久化

- `docker volume ls`：列出卷；
- `docker volume create <name>`：创建卷；
- `docker volume inspect <name>`：查看卷详情；
- `docker run -v <volume>:/data`：挂载卷；
- `docker run -v /host/path:/container/path`：绑定宿主机目录。

数据卷的正确使用，是持久化和数据隔离的基础。

## 记忆口诀

将常用命令串成一句话：

“看镜像用 `images`，拉镜像用 `pull`；看容器用 `ps`，启容器用 `run`；看日志用 `logs`，进容器用 `exec`。”

这句话不是死记语法，而是把“场景 → 命令”的关联变得清晰。

## 实战建议

1. 先确认镜像是否正确；
2. 再看容器是否启动；
3. 如果异常，先看日志；
4. 必要时进入容器查看环境。

这套流程适用于大多数 Docker 问题。

## 常见陷阱

- `docker run` 启动后忘记加 `-d`，容器会挂在前台；
- `docker stop` 停止容器后不删除，造成 `docker ps -a` 列表膨胀；
- 直接删除镜像前忘记先删除相关容器；
- 进入容器后使用错误的 shell，例如 Alpine 容器需要 `/bin/sh`。

## 小结

把 Docker 命令按“镜像、容器、日志、网络、数据卷”这五类划分，能让你在实际使用中更快定位问题。熟悉这套核心命令之后，Docker 不再是一堆陌生选项，而是一个稳定可控的工具集。
