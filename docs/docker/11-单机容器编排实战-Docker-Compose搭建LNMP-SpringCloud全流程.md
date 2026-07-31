# 11-单机容器编排实战-Docker-Compose搭建LNMP-SpringCloud全流程

## 引言

当应用由多个服务组成时，手动逐个启动容器不仅繁琐，而且难以保证环境一致性。Docker Compose 的出现就是为了解决这种多容器系统的组织和复现问题。

本篇文章以 LNMP 和 Spring Cloud 为例，讲清 Compose 的基本概念、核心配置、实战模板和工程化使用方式。

## 为什么使用 Docker Compose

Compose 的核心价值在于：

- 把多个服务写成一个可复用的配置文件；
- 一条命令启动整个应用栈；
- 明确服务依赖、网络和卷定义；
- 提高本地开发、测试和预发布环境的一致性。

## Compose 的基本结构

一个典型 `docker-compose.yml` 包含：

- `version`：Compose 文件版本；
- `services`：服务定义；
- `volumes`：数据卷定义；
- `networks`：自定义网络定义。

### 示例结构

```yaml
version: '3.9'
services:
  web:
    image: myapp:latest
    ports:
      - "8080:80"
    depends_on:
      - db
  db:
    image: mysql:8
    environment:
      MYSQL_ROOT_PASSWORD: secret
    volumes:
      - db-data:/var/lib/mysql
volumes:
  db-data:
```

## 1. LNMP 场景实战

在 LNMP 堆栈中，通常会涉及 Nginx、PHP、MySQL 等服务。

`docker-compose.yml` 示例：

```yaml
version: '3.9'
services:
  nginx:
    image: nginx:latest
    ports:
      - "8080:80"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf
    depends_on:
      - php
  php:
    image: php:8.2-fpm
    volumes:
      - ./www:/var/www/html
  mysql:
    image: mysql:8
    environment:
      MYSQL_ROOT_PASSWORD: secret
    volumes:
      - mysql-data:/var/lib/mysql
volumes:
  mysql-data:
```

这个例子让你在单机上快速搭建一个完整的 Web 应用测试环境。

## 2. Spring Cloud 场景实战

Spring Cloud 微服务通常会包含注册中心、配置中心、网关、业务服务等。

简化示例：

```yaml
version: '3.9'
services:
  nacos:
    image: nacos/nacos-server:latest
    ports:
      - "8848:8848"
  gateway:
    image: my-gateway:latest
    depends_on:
      - nacos
  service-a:
    image: my-service-a:latest
    depends_on:
      - nacos
```

Compose 可以让你把这类多服务系统一键启动，并保持依赖顺序。

## 3. Compose 的实用技巧

### 3.1 使用 `depends_on`

`depends_on` 用于声明启动顺序，但并不保证服务健康。要配合健康检查或等待脚本。

### 3.2 使用 `env_file`

把不同环境变量写到 `.env` 文件中，避免把配置硬编码到 Compose 文件。

```yaml
services:
  app:
    env_file:
      - .env
```

### 3.3 使用多个 Compose 文件

你可以用 `docker-compose.override.yml` 和额外配置文件来区分开发与生产：

```bash
docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d
```

### 3.4 持久化数据

把数据库、缓存等数据挂载到卷中，避免容器删除造成数据丢失。

## 4. 使用 Compose 的工程化建议

- 把 Compose 文件纳入版本管理；
- 不要把敏感信息写入文件；
- 使用 `.env` 或 `env_file` 管理差异配置；
- 在 CI/CD 中复用同一个 Compose 定义；
- 通过 `docker-compose config` 校验文件结构。

## 5. 常见误区

- 误认为 `depends_on` 等于健康检查。它只控制启动顺序，不保证服务可用。
- 误把 Compose 当成生产级编排平台。对于小型系统适用，但大规模场景更适合 Kubernetes 或 Swarm。
- 误以为 `docker-compose up` 会自动处理所有网络。你仍需定义网络和端口。

## 小结

Docker Compose 是把“多容器系统”写成可复用配置的工具。对于 LNMP、本地微服务调试和轻量级系统联调，它能显著简化启动流程、统一环境、提高复现能力。掌握 Compose 后，你的容器化开发会更有条理，也更易扩展。
