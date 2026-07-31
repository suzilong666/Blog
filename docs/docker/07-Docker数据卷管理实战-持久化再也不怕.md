# 07-Docker数据卷管理实战-持久化再也不怕

## 引言

容器生命周期短暂，容器被删除或重建时，内部数据默认会丢失。这对数据库、日志、上传文件、配置等持久化内容来说，是一个必须面对的问题。

本篇文章讲清楚 Docker 数据卷的使用场景、卷与绑定挂载的区别、实战命令与工程化建议，帮助你从“容器+数据”变成“容器可替换，数据不丢失”。

## 为什么需要数据卷

容器是可丢弃的运行单元。如果你把数据库文件、上传内容、日志文件直接写在容器内，容器重建后这些数据会消失。

例如：

- MySQL 数据库容器重建后，数据目录被清空；
- 应用日志默认写入容器内，无法方便地由宿主机或日志系统统一收集；
- 上传文件、生成文件等状态数据伴随容器消失。

数据卷的出现，正是为了解耦“容器生命周期”和“数据生命周期”。

## Docker 卷与绑定挂载的区别

### 命名卷（Volume）

- 由 Docker 管理；
- 与容器生命周期分离；
- 更适合生产环境的数据持久化；
- 可以在多个容器之间共享。

示例：

```bash
docker volume create mydata
docker run -d --name mysql -v mydata:/var/lib/mysql mysql:8
```

### 绑定挂载（Bind Mount）

- 直接把宿主机目录挂载到容器；
- 适合本地开发和调试；
- 依赖宿主机目录结构和权限；
- 不适合生产环境中作为主要持久化方案。

示例：

```bash
docker run -d --name myapp -v C:\project\data:/app/data myapp:latest
```

### tmpfs 挂载

- 数据保存在内存中；
- 容器重启后丢失；
- 适合缓存、临时文件和敏感数据。

```bash
docker run -d --tmpfs /tmp:rw,size=100m myapp:latest
```

## 实战案例：MySQL 持久化

使用命名卷：

```bash
docker volume create mysql-data
docker run -d --name mysql -e MYSQL_ROOT_PASSWORD=secret -v mysql-data:/var/lib/mysql mysql:8
```

如果你删除容器：

```bash
docker rm -f mysql
```

数据仍然会保留在 `mysql-data` 卷中，再次启动容器即可恢复。

## Docker Compose 中的数据卷

Compose 文件中定义卷更加清晰：

```yaml
version: '3.9'
services:
  db:
    image: mysql:8
    environment:
      MYSQL_ROOT_PASSWORD: secret
    volumes:
      - mysql-data:/var/lib/mysql
volumes:
  mysql-data:
```

使用 `docker-compose up -d` 启动后，数据卷会自动创建并挂载。

## 哪些数据该持久化？

通常应持久化：

- 数据库文件；
- 用户上传内容；
- 业务日志；
- 配置文件；
- 重要缓存或状态。

通常不该持久化：

- 临时构建产物；
- 应用运行时缓存；
- 临时 session 文件；
- 可重建的缓存内容。

## 常见误区

- 误以为绑定挂载就是“持久化最佳实践”。本地开发时方便，但生产环境下容易带来权限和一致性问题。
- 误把容器内路径当成数据目录。容器重建后该路径会丢失。
- 误把所有数据都写入同一个卷。不同数据类型最好拆分卷，便于备份和迁移。

## 工程化建议

- 生产环境优先使用命名卷；
- 重要数据定期备份卷内容；
- 绑定挂载仅用于开发环境；
- 业务数据与临时数据分开；
- 使用 Compose 或编排工具统一管理卷定义。

## 小结

Docker 数据卷让你把“容器可丢弃，数据必须保留”的思想落地。理解命名卷与绑定挂载的差异，并根据场景选择最合适的方案，才能让容器化应用既灵活又稳健。
