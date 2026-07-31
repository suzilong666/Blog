# 10-Docker环境变量与Config文件注入全攻略

## 引言

应用运行时配置不应该写死在代码里。Docker 提供了环境变量和配置文件挂载两种常见方式，帮助你把配置与镜像解耦。

本篇文章讲清楚这两种方式的适用场景、实践写法、组合使用和安全建议。

## 为什么要把配置从镜像中拆出来

把配置写进镜像会带来几个问题：

- 镜像不够通用；
- 不同环境难以切换；
- 敏感信息可能被意外暴露；
- 版本管理复杂。

正确的做法是：镜像只是程序和运行环境，配置由运行时注入。

## 1. 环境变量：简单且灵活

环境变量适合以下类型配置：

- 运行模式：`NODE_ENV=production`; 
- 服务端口：`PORT=3000`; 
- 数据库连接、API Key 等；
- 简单开关：`DEBUG=true`。

示例：

```bash
docker run -d --name myapp -e NODE_ENV=production -e PORT=3000 myapp:latest
```

在应用中读取：

```js
const port = process.env.PORT || 3000;
```

### 优点

- 运行时动态注入；
- 不依赖文件系统；
- 易于与 CI/CD 或云平台集成。

### 缺点

- 不适合复杂结构化配置；
- 环境变量在某些场景下不易管理。

## 2. 配置文件挂载：适合复杂配置

当配置结构复杂或需要长期维护时，推荐使用配置文件挂载。

示例：

```bash
docker run -d --name nginx -v /host/nginx.conf:/etc/nginx/nginx.conf nginx
```

这种方式适合：

- Nginx/Apache 配置；
- YAML/JSON 应用配置；
- 密钥、SSL 证书；
- 外部配置管理。

### 优点

- 配置文件更易读；
- 可以保留配置版本；
- 适合复杂格式。

### 缺点

- 依赖宿主机文件路径；
- 可能带来权限和一致性问题。

## 3. Docker Compose 下的配置注入

Compose 提供 `environment`、`env_file`、`volumes` 等方式：

```yaml
services:
  app:
    image: myapp:latest
    environment:
      - NODE_ENV=production
    env_file:
      - .env
    volumes:
      - ./config/app.yaml:/app/config/app.yaml
```

这让配置管理更结构化，也更适合本地开发和测试。

## 4. 环境变量与配置文件的组合策略

推荐策略：

- 简单参数、敏感信息用环境变量；
- 复杂结构化配置用挂载文件；
- 公共配置通过 `configmap` 或配置中心管理；
- 运行时差异通过 `.env`、`docker-compose.override.yml` 实现。

示例组合：

```bash
docker run -d \
  -e NODE_ENV=production \
  -e DB_HOST=db.example.com \
  -v ./app-config.yaml:/app/config.yaml \
  myapp:latest
```

## 5. 安全与最佳实践

- 不要把敏感配置写进 Dockerfile；
- 不要把 `.env` 或密钥提交到版本库；
- 使用 `docker secret`/配置中心处理生产敏感信息；
- 对配置文件使用权限最小化；
- 容器启动时读取配置，而不是构建时写入。

## 6. 常见误区

- 误把所有配置都写成环境变量；
- 误认为绑定挂载配置文件就一定安全；
- 误以为 `docker run -e` 就能解决所有配置问题。

## 小结

Docker 配置管理的关键是“让镜像通用，让配置可变”。环境变量适合简单参数和敏感数据，配置文件适合复杂、结构化内容。把这两者结合起来，才能让容器在不同环境中更灵活、更安全、更易维护。
