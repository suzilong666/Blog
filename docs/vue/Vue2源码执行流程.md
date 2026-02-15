# Vue2源码执行流程

我们来详细梳理一下 new Vue() 的执行过程。这是 Vue 2 源码的核心主线流程，理解了它，你就掌握了 Vue 初始化的大半精髓。

当我们写下 new Vue(options) 时，代码会按照以下顺序执行：

## 第一阶段：构造函数与原型方法挂载

在分析 new Vue 之前，要先知道 Vue 是一个构造函数，它的原型方法是在不同的文件中通过 initMixin、stateMixin 等函数挂载上去的。

```js
// src/core/instance/index.js
function Vue (options) {
  // 生产环境警告：必须使用 new 调用
  if (process.env.NODE_ENV !== 'production' && !(this instanceof Vue)) {
    warn('Vue is a constructor and should be called with the `new` keyword')
  }
  // 核心启动方法：调用 _init
  this._init(options)
}

// 下面这些 mixin 方法在不同的文件中，按顺序给 Vue.prototype 挂载方法
initMixin(Vue)       // 挂载 _init
stateMixin(Vue)      // 挂载 $data, $props, $set, $delete, $watch
eventsMixin(Vue)     // 挂载 $on, $once, $off, $emit
lifecycleMixin(Vue)  // 挂载 _update, $forceUpdate, $destroy
renderMixin(Vue)     // 挂载 _render, $nextTick
```

## 第二阶段：new Vue 执行时的主线流程

当你执行 new Vue(options) 时，主要执行的是 this._init(options) 方法。以下是详细的调用栈和执行顺序：

### 步骤 1：初始化配置合并

位置：_init 开头

```js
Vue.prototype._init = function (options) {
  const vm = this
  // 合并选项
  if (options && options._isComponent) {
    // 内部组件初始化，性能优化，使用 initInternalComponent 快速合并
    initInternalComponent(vm, options)
  } else {
    // 用户根实例初始化，将全局的 Vue.options 和传入的 options 合并
    vm.$options = mergeOptions(
      resolveConstructorOptions(vm.constructor),
      options || {},
      vm
    )
  }

  vm._self = vm
  initLifecycle(vm)
  initEvents(vm)
  initRender(vm)
  callHook(vm, 'beforeCreate')
  initInjections(vm)
  initState(vm)
  initProvide(vm)
  callHook(vm, 'created')
  
  // 挂载
  if (vm.$options.el) {
      vm.$mount(vm.$options.el)
  }
}
```

- 如果是根实例，会把 Vue.options（全局指令、过滤器、组件等）和用户传入的 options 合并。
- 合并后的结果挂载到 vm.$options 上。

### 步骤 2：初始化生命周期

**位置：**initLifecycle(vm)

```js
// src/core/instance/lifecycle.js
export function initLifecycle (vm) {
  const options = vm.$options
  // 建立父子关系，将当前实例添加到父实例的 $children 里
  let parent = options.parent
  if (parent && !options.abstract) {
    while (parent.$options.abstract && parent.$parent) {
      parent = parent.$parent
    }
    parent.$children.push(vm)
  }
  vm.$parent = parent
  // 初始化内部属性
  vm.$children = []
  vm._watcher = null
  // ... 省略其他内部属性初始化
}
```

### 步骤 3：初始化事件

**位置：**initEvents(vm)

```js
// src/core/instance/events.js
export function initEvents (vm) {
  vm._events = Object.create(null)  // 存储自定义事件 { eventName: [fn1, fn2] }
  vm._hasHookEvent = false          // 是否有 hook: 前缀的事件
  // 初始化父组件传入的监听器（在模板编译时作为 v-on 传入）
  const listeners = vm.$options._parentListeners
  if (listeners) {
    updateComponentListeners(vm, listeners)
  }
}
```

### 步骤 4：初始化渲染

**位置：**initRender(vm)

```js
// src/core/instance/render.js
export function initRender (vm) {
  // 创建用于存放子组件的占位符节点
  vm.$vnode = null
  vm._vnode = null
  // 初始化插槽和作用域插槽
  vm.$slots = {}
  vm.$scopedSlots = {}
  
  // 绑定 createElement 方法，用于生成 VNode
  vm._c = (a, b, c, d) => createElement(vm, a, b, c, d, false)  // 用于模板编译
  vm.$createElement = (a, b, c, d) => createElement(vm, a, b, c, d, true) // 用于手写 render
  
  // 定义响应式的 $attrs 和 $listeners（2.4.0+）
  defineReactive(vm, '$attrs', parentData && parentData.attrs || emptyObject)
  defineReactive(vm, '$listeners', options._parentListeners || emptyObject)
}
```

### 步骤 5：生命周期钩子：beforeCreate

**位置：**_init 中

```js
callHook(vm, 'beforeCreate')
```

- 此时数据代理、响应式数据还未初始化，所以 beforeCreate 中无法通过 this 访问到 data、methods 等。
- 常用于插件开发（如 Vuex、VueRouter 在此注入东西）。

### 步骤 6：初始化注入（inject）

**位置：**initInjections(vm)

```js
// src/core/instance/inject.js
export function initInjections (vm) {
  const result = resolveInject(vm.$options.inject, vm)
  if (result) {
    // 将 inject 的数据转为响应式（浅层，且不可修改）
    Object.keys(result).forEach(key => {
      defineReactive(vm, key, result[key])
    })
  }
}
```

### 步骤 7：初始化状态（props/methods/data/computed/watch）

**位置：**initState(vm)（核心步骤）

```js
// src/core/instance/state.js
export function initState (vm) {
  vm._watchers = []
  const opts = vm.$options
  if (opts.props) initProps(vm, opts.props)
  if (opts.methods) initMethods(vm, opts.methods)
  if (opts.data) {
    initData(vm)  // 这里面会做 数据代理（this.xxx 代理 this._data.xxx）和 响应式处理（defineReactive）
  } else {
    observe(vm._data = {}, true /* asRootData */)
  }
  if (opts.computed) initComputed(vm, opts.computed)
  if (opts.watch) initWatch(vm, opts.watch)
}
```

- initData：遍历 data 的 key，通过 proxy(vm, '_data', key) 实现代理；最后调用 observe(data, true) 将 data 转为响应式。
- initComputed：为每个 computed 创建 Watcher（lazy: true），并定义 getter。
- initWatch：遍历 watch，调用 vm.$watch 创建用户 watcher。

### 步骤 8：初始化 provide

**位置：**initProvide(vm)

```js
// src/core/instance/inject.js
export function initProvide (vm) {
  const provide = vm.$options.provide
  if (provide) {
    vm._provided = typeof provide === 'function' ? provide.call(vm) : provide
  }
}
```

### 步骤 9：生命周期钩子：created

**位置：**_init 最后

```js
callHook(vm, 'created')
```

- 此时数据已经初始化完毕，可以访问 data、computed、methods 等。
- 但还没有开始渲染 DOM，$el 还不可用。

### 步骤 10：开始挂载

**位置：**_init 末尾

```js
if (vm.$options.el) {
  vm.$mount(vm.$options.el)  // 挂载实例
}
```

- 如果传入了 el 选项，自动调用 $mount。
- $mount 的核心是调用 mountComponent，它会：
  1. 判断是否有 render 函数，如果没有且传了 template，则进行编译（Compiler 版本）。
  2. 触发 beforeMount 钩子。
  3. 定义 updateComponent：内部执行 vm._update(vm._render(), hydrating)。
  4. 创建一个渲染 Watcher，在 Watcher 的 getter 中执行 updateComponent。
  5. 渲染 Watcher 首次执行，完成首次渲染。
  6. 触发 mounted 钩子（注意：如果是子组件，mounted 顺序是先子后父）。

## 总结：完整的生命周期流程图（简化版）

```js
new Vue()
  |
  ├── 合并配置 (mergeOptions)
  ├── initLifecycle (建立父子关系)
  ├── initEvents (初始化事件监听)
  ├── initRender (初始化插槽、$createElement)
  ├── callHook(beforeCreate)   ★ 第一个生命周期钩子
  ├── initInjections (解析 inject)
  ├── initState (核心：数据响应式、props、methods、computed、watch)
  ├── initProvide (解析 provide)
  ├── callHook(created)        ★ 第二个生命周期钩子
  |
  └── 如果有 el 选项，则执行 vm.$mount
        |
        ├── 如果有 template 且没有 render，则编译成 render 函数
        ├── callHook(beforeMount)  ★ 第三个生命周期钩子
        ├── 创建渲染 Watcher
        |     |
        |     └── 首次执行 updateComponent
        |           ├── vm._render()  → 生成 VNode
        |           └── vm._update()  → 将 VNode 渲染成真实 DOM
        |
        └── callHook(mounted)     ★ 第四个生命周期钩子 (注意：子组件先于父组件触发)
```