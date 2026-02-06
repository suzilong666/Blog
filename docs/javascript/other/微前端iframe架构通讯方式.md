# 微前端iframe架构通讯方式

微前端中 iframe 架构的通信机制相对复杂，因为 iframe 天然的沙箱隔离特性限制了直接的数据共享。以下是几种主要的通信方案：

## 基于 postMessage 的通信（推荐）

这是最标准、最安全的跨域/跨 iframe 通信方式。

```js
// 父窗口发送消息给 iframe
const iframe = document.getElementById('micro-app');
iframe.contentWindow.postMessage({
  type: 'USER_INFO',
  payload: { userId: 123, name: '张三' }
}, '*'); // 第二个参数指定目标源，建议使用具体域名而非 '*'

// iframe 内接收消息
window.addEventListener('message', (event) => {
  // 验证消息来源（重要！安全考虑）
  if (event.origin !== 'https://parent-domain.com') return;
  
  if (event.data.type === 'USER_INFO') {
    console.log('收到父窗口数据:', event.data.payload);
  }
});

// iframe 向父窗口发送消息
window.parent.postMessage({
  type: 'APP_READY',
  payload: { status: 'loaded' }
}, 'https://parent-domain.com');
```

**最佳实践：**
- 消息类型标准化：定义统一的消息格式（如 {type: string, payload: any, timestamp: number}）
- 消息验证机制：验证 event.origin 防止恶意攻击
- 消息处理中心：建立集中的消息分发/处理中心
- 销毁监听器：组件卸载时移除事件监听

## 基于 URL 参数的通信

适用于简单参数的传递。

```js
// 父窗口通过 URL 传递参数
const iframe = document.createElement('iframe');
iframe.src = `https://child-app.com?theme=dark&token=${token}&user=${userData}`;

// 子应用从 URL 解析参数
const urlParams = new URLSearchParams(window.location.search);
const theme = urlParams.get('theme'); // 'dark'
const user = JSON.parse(urlParams.get('user'));
```

**局限性：**
- 数据量有限（URL 长度限制）
- 不适合频繁更新的数据
- 敏感数据暴露风险

## 共享存储方案

### 方案一：LocalStorage/SessionStorage + StorageEvent

```js
// 父窗口设置共享数据
localStorage.setItem('shared-config', JSON.stringify(config));

// 子 iframe 监听存储变化
window.addEventListener('storage', (event) => {
  if (event.key === 'shared-config') {
    const config = JSON.parse(event.newValue);
    // 处理配置更新
  }
});
```

**限制：**需要同源或已配置跨域访问。

### 方案二：共享全局变量（同源时）

```js
// 父窗口定义共享对象
window.sharedState = {
  user: { name: '张三' },
  config: { theme: 'dark' }
};

// 子 iframe 访问（需同源）
const user = window.parent.sharedState.user;
```

## 消息总线/事件中心模式

建立专门的通信层，统一管理所有消息。

```
    父窗口 (Host)
        ↓ 创建并管理
消息总线 (MessageBus)
    ↗           ↖
postMessage   postMessage
    ↓           ↑
子应用 A     子应用 B
(iframe)     (iframe)
```

## 基于 BroadcastChannel API（同源）

适用于同源 iframe 之间的通信。

```js
// 所有 iframe 和父窗口创建同一个频道的连接
const channel = new BroadcastChannel('microfrontend-channel');

// 发送消息
channel.postMessage({ type: 'DATA_UPDATE', data: { /* ... */ } });

// 接收消息
channel.onmessage = (event) => {
  console.log('收到消息:', event.data);
};
```

[BroadcastChannel MDN链接](https://developer.mozilla.org/zh-CN/docs/Web/API/BroadcastChannel)

## 服务化通信（高级方案）

将通信抽象为服务，支持 RPC 式调用。

