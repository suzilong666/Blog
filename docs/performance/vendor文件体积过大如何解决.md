# vendor文件体积过大如何解决

在前端工程化构建中，vendor 文件通常是指由第三方依赖库（如 React、Vue 等）打包生成的 chunk。体积过大会影响首屏加载速度，降低用户体验。

## 分析定位问题

先使用工具分析打包文件，找到体积瓶颈。

- Webpack：webpack-bundle-analyzer
- Vite：rollup-plugin-visualizer
- 通用：source-map-explorer

## 优化依赖管理

- 剔除未使用的库：检查 package.json，移除未引用的依赖。
- 升级依赖：较新版本可能包含体积优化（如 React 17+ 比 16 更小）。
- 使用轻量替代库：例如用 date-fns 替代 moment，用 zustand 替代 redux。

## Tree Shaking

- 确保构建工具生产模式开启 sideEffects 优化（Webpack 5+ 默认支持）。
- 在 package.json 中声明 "sideEffects": false（谨慎使用，避免移除 CSS 等副作用代码）。
- 优先使用 ES Module 版本的依赖（如 lodash-es 代替 lodash）。

## 代码拆分（Code Splitting）

- 异步组件和路由懒加载
- 按需加载第三方库：仅在特定组件加载时引入（如 import('echarts')）。
- 拆分 vendor 为多个 chunk：
  - 将体积大的库单独拆包（如 react, react-dom 打成一个 react.js）。
  - Webpack 配置 optimization.splitChunks 自定义拆分策略（如 chunks: 'all'，并根据 minSize、cacheGroups 细分）。
  - Vite 使用 build.rollupOptions.output.manualChunks 自定义。

