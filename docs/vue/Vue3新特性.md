# Vue3新特性

## Composition API

[Composition API](https://cn.vuejs.org/guide/extras/composition-api-faq.html)

## 响应式系统重构

基于 Proxy：Vue 3 使用 ES6 的 Proxy 重写了响应式系统，解决了 Vue 2 中的一些局限：

- 能够检测到对象属性的添加和删除。
- 能够直接通过下标修改数组并触发更新。
- 更好的性能和更少的内存占用。

响应式 API：提供 reactive、ref 等函数来创建响应式数据。


## 性能提升

更小的打包体积：支持 Tree-shaking，未使用的模块不会被打包。

更快的渲染：优化虚拟 DOM 的 diff 算法（静态树提升、静态属性提升），减少重渲染开销。

编译时优化：标记静态节点，避免不必要的比较。

## 新内置组件

- Teleport（传送门）：可以将组件内容渲染到 DOM 树的任意位置（如模态框、提示框），而无需受父组件样式或布局限制。
- Fragments：组件支持多个根节点，不再需要单一的根元素包裹。
- Suspense：用于协调异步依赖（如异步组件），可以显示加载状态、错误状态等，让异步渲染更流畅。

## 更好的 TypeScript 支持

- Vue 3 的源码完全使用 TypeScript 重写，提供了完善的类型定义。
- Composition API 天然对类型友好，IDE 提示更准确。
- 支持使用 defineComponent 定义组件，获得完整的类型推导。

## 自定义渲染器 API

提供了 createRenderer API，允许开发者创建自定义渲染器，将 Vue 渲染到非 DOM 环境（如 Canvas、WebGL、终端等）。这为跨平台开发（如 NativeScript、Weex）提供了更标准的基础。

## Vite 官方推荐

Vue 3 团队推出了 Vite（下一代前端构建工具），利用原生 ES 模块实现极速的冷启动和热更新，开发体验大幅提升。

当然，Vue 3 也兼容 Vue CLI（基于 Webpack），但 Vite 成为官方推荐。

## 其他改进

- 生命周期调整：beforeDestroy / destroyed 更名为 beforeUnmount / unmounted，更符合语义。
- 全局 API 改为实例方法：如 Vue.component 变为 app.component，便于多实例管理和避免全局污染。
- 更好的响应式侦测：watch 和 watchEffect 支持侦测多个数据源，并可以控制侦听时机。
- v-model 增强：支持多个 v-model 绑定，自定义修饰符更方便。
- 异步组件：通过 defineAsyncComponent 定义，支持加载和错误状态。