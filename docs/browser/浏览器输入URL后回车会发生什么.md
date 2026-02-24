# 浏览器输入URL后回车会发生什么

## URL 检测

当你在地址栏输入内容时，浏览器会立即做一个判断：**你输入的是 URL 还是搜索关键词？**

如果是关键字，直接通过搜索引擎搜索，如果是 URL，则进行 **URL 检测，补全，转码**等操作

## DNS

```
浏览器输入 www.example.com
    ↓
浏览器缓存？ → 有则返回
    ↓ 无
操作系统缓存/hosts？ → 有则返回
    ↓ 无
路由器缓存？ → 有则返回
    ↓ 无
ISP DNS 缓存？ → 有则返回
    ↓ 无
递归查询：
    ISP DNS → 根DNS → 返回 .com TLD 地址
            → TLD DNS → 返回 example.com 权威服务器地址
            → 权威 DNS → 返回 www.example.com 的 IP
    ↓
ISP DNS 缓存结果，并返回给浏览器
    ↓
浏览器缓存结果，开始连接
```

## TCP 三次握手

## HTTP 链接

## 服务器处理请求

## 浏览器接收响应并处理

## 渲染

[浏览器渲染原理](/browser/浏览器渲染原理.html)

## TCP 四次挥手

如果消息头 Connection: Keep-Alive 则保持链接

如果消息头 Connection: close 则 TCP 四次挥手，关闭链接