import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: "/blog/",
  title: "博客",
  description: "苏子龙博客",
  markdown: {
    html: false,
    headers: {
      level: [2, 3, 4], // 目录显示的标题级别
    },
  },
  themeConfig: {
    // 1. 配置大纲（右侧目录）显示到 h3
    outline: {
      level: [2, 3], // 显示 h2 和 h3 标题
      label: "目录", // 目录标题文字
    },
    // 导航栏
    nav: [
      { text: "首页", link: "/" },
      // { text: 'Html', link: '/' },
      { text: "Css", link: "/css/引入方式与优先级" },
      { text: "JavaScript", link: "/javascript/basic/数据类型" },
      { text: "浏览器", link: "/browser/浏览器渲染原理" },
      { text: "工程化", link: "/engineering/前端工程化" },
      // { text: '网络', link: '/network/' },
      {
        text: "框架",
        items: [
          { text: "Vue", link: "/vue/Vue3新特性" },
          { text: "React", link: "/react/Fiber" },
        ],
      },
      { text: "性能", link: "/performance/vendor文件体积过大如何解决" },
      { text: "其他", link: "/other/资源" },
      { text: "Python", link: "/python/basic/环境搭建" },
      { text: "Java", link: "/java/basic/环境搭建" },
      { text: "AI", link: "/ai/basic/大模型概述" },
      { text: "MySQL", link: "/mysql/basic/MySQL简介与环境搭建" },
      { text: "Redis", link: "/redis/basic/Redis简介与环境搭建" },
    ],
    // 侧边栏
    sidebar: {
      browser: [
        {
          text: "浏览器",
          items: [
            { text: "浏览器渲染原理", link: "/browser/浏览器渲染原理" },
            {
              text: "浏览器输入URL后回车会发生什么",
              link: "/browser/浏览器输入URL后回车会发生什么",
            },
          ],
        },
      ],
      html: [
        {
          text: "Html",
          items: [{ text: "浏览器渲染原理", link: "/browser/浏览器渲染原理" }],
        },
      ],
      css: [
        {
          text: "Css",
          items: [
            { text: "引入方式与优先级", link: "/css/引入方式与优先级" },
            { text: "选择器", link: "/css/选择器" },
            { text: "伪类和伪元素", link: "/css/伪类和伪元素" },
            { text: "格式化上下文", link: "/css/格式化上下文" },
            { text: "层叠、优先级与继承", link: "/css/层叠、优先级与继承" },
            { text: "盒模型", link: "/css/盒模型" },
            { text: "布局", link: "/css/布局" },
            {
              text: "响应式网页设计和媒体查询",
              link: "/css/响应式网页设计和媒体查询",
            },
            { text: "溢出", link: "/css/溢出" },
            { text: "层叠上下文", link: "/css/层叠上下文" },
            { text: "重排与重绘", link: "/css/重排与重绘" },
            { text: "GPU加速", link: "/css/GPU加速" },
            { text: "属性计算过程", link: "/css/属性计算过程" },
            { text: "包含块", link: "/css/包含块" },
          ],
        },
      ],
      javascript: [
        {
          text: "基础知识",
          items: [
            { text: "数据类型", link: "/javascript/basic/数据类型" },
            { text: "类型转换", link: "/javascript/basic/类型转换" },
            { text: "相等性比较", link: "/javascript/basic/相等性比较" },
            { text: "严格模式", link: "/javascript/basic/严格模式" },
          ],
        },
        {
          text: "核心概念",
          items: [
            { text: "作用域", link: "/javascript/core/作用域" },
            { text: "提升", link: "/javascript/core/提升" },
            { text: "闭包", link: "/javascript/core/闭包" },
            { text: "执行上下文", link: "/javascript/core/执行上下文" },
            { text: "this", link: "/javascript/core/this" },
            { text: "原型", link: "/javascript/core/原型" },
            { text: "继承", link: "/javascript/core/继承" },
            { text: "事件循环", link: "/javascript/core/事件循环" },
          ],
        },
        {
          text: "其他",
          items: [
            {
              text: "深拷贝与浅拷贝",
              link: "/javascript/other/深拷贝与浅拷贝",
            },
            {
              text: "编辑器撤销重做功能",
              link: "/javascript/other/编辑器撤销重做功能",
            },
            {
              text: "微前端iframe架构通讯方式",
              link: "/javascript/other/微前端iframe架构通讯方式",
            },
          ],
        },
        {
          text: "高级主题",
          items: [],
        },
        // {
        //   text: 'DOM',
        //   items: [
        //     { text: '闭包', link: '/javascript/闭包' },
        //   ]
        // },
        // {
        //   text: 'BOM',
        //   items: [
        //     { text: '闭包', link: '/javascript/闭包' },
        //   ]
        // },
        // {
        //   text: '存储相关',
        //   items: [
        //     { text: '闭包', link: '/javascript/闭包' },
        //   ]
        // },
        // {
        //   text: '网络请求',
        //   items: [
        //     { text: '闭包', link: '/javascript/闭包' },
        //   ]
        // },
        // {
        //   text: '函数进阶',
        //   items: [
        //     { text: '闭包', link: '/javascript/闭包' },
        //   ]
        // },
        {
          text: "ES6",
          items: [{ text: "箭头函数", link: "/javascript/es6/箭头函数" }],
        },
        // {
        //   text: '异步编程',
        //   items: [
        //     { text: '闭包', link: '/javascript/闭包' },
        //   ]
        // },
        // {
        //   text: '性能优化',
        //   items: [
        //     { text: '闭包', link: '/javascript/闭包' },
        //   ]
        // },
        // {
        //   text: '设计模式',
        //   items: [
        //     { text: '闭包', link: '/javascript/闭包' },
        //   ]
        // },
        // {
        //   text: '安全相关',
        //   items: [
        //     { text: '闭包', link: '/javascript/闭包' },
        //   ]
        // },
      ],
      vue: [
        {
          text: "基础",
          items: [
            { text: "Vue3新特性", link: "/vue/Vue3新特性" },
            {
              text: "new Vue()和createApp()的区别",
              link: "/vue/new Vue()和createApp()的区别",
            },
            { text: "Vue2源码执行流程", link: "/vue/Vue2源码执行流程" },
            { text: "响应式原理", link: "/vue/响应式原理" },
            { text: "虚拟Dom", link: "/vue/虚拟Dom" },
            { text: "Diff算法", link: "/vue/Diff算法" },
            { text: "key的作用", link: "/vue/key的作用" },
          ],
        },
      ],
      react: [
        {
          text: "react",
          items: [
            { text: "Fiber", link: "/react/Fiber" },
            { text: "自动批处理", link: "/react/自动批处理" },
          ],
        },
      ],
      engineering: [
        {
          text: "前端工程化",
          items: [{ text: "前端工程化介绍", link: "/engineering/前端工程化" }],
        },
        {
          text: "模块化与组件化",
          items: [
            { text: "JS模块化", link: "/engineering/JS模块化" },
            { text: "CSS模块化", link: "/engineering/CSS模块化" },
          ],
        },
        {
          text: "开发效率与构建工具",
        },
        {
          text: "代码质量与规范",
          items: [
            {
              text: "代码规范：ESLint + Prettier 在前端工程化中的最佳实践",
              link: "/engineering/代码规范：ESLint + Prettier 在前端工程化中的最佳实践",
            },
            {
              text: "前端工程化必备：husky + lint-staged 实战指南",
              link: "/engineering/前端工程化必备：husky + lint-staged 实战指南",
            },
          ],
        },
        {
          text: "测试与质量保障",
        },
        {
          text: "部署与运维",
        },
        {
          text: "性能优化",
        },
      ],
      资源: [
        {
          text: "资源",
          items: [{ text: "资源", link: "/other/资源" }],
        },
      ],
      python: [
        {
          text: "基础",
          items: [
            { text: "环境搭建", link: "/python/basic/环境搭建" },
            { text: "变量与数据类型", link: "/python/basic/变量与数据类型" },
            { text: "运算符", link: "/python/basic/运算符" },
            { text: "条件语句", link: "/python/basic/条件语句" },
            { text: "循环语句", link: "/python/basic/循环语句" },
            { text: "字符串", link: "/python/basic/字符串" },
            { text: "列表与元组", link: "/python/basic/列表与元组" },
            { text: "字典与集合", link: "/python/basic/字典与集合" },
          ],
        },
        {
          text: "核心",
          items: [
            { text: "函数基础", link: "/python/core/函数基础" },
            { text: "参数传递", link: "/python/core/参数传递" },
            { text: "作用域与命名空间", link: "/python/core/作用域与命名空间" },
            { text: "模块与包", link: "/python/core/模块与包" },
            { text: "文件操作", link: "/python/core/文件操作" },
            { text: "异常处理", link: "/python/core/异常处理" },
            { text: "面向对象基础", link: "/python/core/面向对象基础" },
            { text: "类与对象", link: "/python/core/类与对象" },
            { text: "继承与多态", link: "/python/core/继承与多态" },
            { text: "魔术方法", link: "/python/core/魔术方法" },
          ],
        },
        {
          text: "进阶",
          items: [
            { text: "装饰器", link: "/python/advanced/装饰器" },
            { text: "生成器与迭代器", link: "/python/advanced/生成器与迭代器" },
            { text: "上下文管理器", link: "/python/advanced/上下文管理器" },
            { text: "闭包", link: "/python/advanced/闭包" },
            { text: "Lambda 表达式", link: "/python/advanced/Lambda 表达式" },
            { text: "推导式", link: "/python/advanced/推导式" },
            { text: "正则表达式", link: "/python/advanced/正则表达式" },
            { text: "并发编程", link: "/python/advanced/并发编程" },
            { text: "异步编程", link: "/python/advanced/异步编程" },
            { text: "元编程", link: "/python/advanced/元编程" },
          ],
        },
        {
          text: "高级",
          items: [
            { text: "内存管理", link: "/python/expert/内存管理" },
            { text: "GIL 全局解释器锁", link: "/python/expert/GIL 全局解释器锁" },
            { text: "性能优化", link: "/python/expert/性能优化" },
            { text: "设计模式", link: "/python/expert/设计模式" },
            { text: "类型提示", link: "/python/expert/类型提示" },
            { text: "测试与调试", link: "/python/expert/测试与调试" },
          ],
        },
        {
          text: "工具",
          items: [
            { text: "pip", link: "/python/tools/pip" },
            { text: "虚拟环境", link: "/python/tools/虚拟环境" },
            { text: "代码规范", link: "/python/tools/代码规范" },
          ],
        },
      ],
      java: [
        {
          text: "基础",
          items: [
            { text: "环境搭建", link: "/java/basic/环境搭建" },
            { text: "基础语法", link: "/java/basic/基础语法" },
            { text: "数组与字符串", link: "/java/basic/数组与字符串" },
          ],
        },
        {
          text: "核心",
          items: [
            { text: "面向对象编程", link: "/java/core/面向对象编程" },
            { text: "集合框架", link: "/java/core/集合框架" },
            { text: "异常处理", link: "/java/core/异常处理" },
            { text: "泛型", link: "/java/core/泛型" },
            { text: "注解与反射", link: "/java/core/注解与反射" },
          ],
        },
        {
          text: "进阶",
          items: [
            { text: "JVM内存模型与GC", link: "/java/advanced/JVM内存模型与GC" },
            { text: "并发编程", link: "/java/advanced/并发编程" },
            { text: "Java 8+新特性", link: "/java/advanced/Java8新特性" },
            { text: "IO与NIO", link: "/java/advanced/IO与NIO" },
            { text: "序列化", link: "/java/advanced/序列化" },
          ],
        },
        {
          text: "高级",
          items: [
            { text: "JVM调优", link: "/java/expert/JVM调优" },
            { text: "并发编程深入", link: "/java/expert/并发编程深入" },
            { text: "设计模式", link: "/java/expert/设计模式" },
          ],
        },
        {
          text: "Spring",
          items: [
            { text: "Spring入门与IoC控制反转", link: "/java/frameworks/spring/Spring入门与IoC控制反转" },
            { text: "Bean生命周期与作用域", link: "/java/frameworks/spring/Bean生命周期与作用域" },
            { text: "AOP面向切面编程", link: "/java/frameworks/spring/AOP面向切面编程" },
            { text: "Spring事务管理", link: "/java/frameworks/spring/Spring事务管理" },
            { text: "Spring核心原理", link: "/java/frameworks/spring/Spring核心原理" },
          ],
        },
        {
          text: "SpringMVC",
          items: [
            { text: "SpringMVC入门与请求处理流程", link: "/java/frameworks/springmvc/SpringMVC入门与请求处理流程" },
            { text: "参数绑定与数据校验", link: "/java/frameworks/springmvc/参数绑定与数据校验" },
            { text: "异常处理机制", link: "/java/frameworks/springmvc/异常处理机制" },
            { text: "拦截器与过滤器", link: "/java/frameworks/springmvc/拦截器与过滤器" },
          ],
        },
        {
          text: "MyBatis",
          items: [
            { text: "MyBatis入门与核心概念", link: "/java/frameworks/mybatis/MyBatis入门与核心概念" },
            { text: "动态SQL与缓存机制", link: "/java/frameworks/mybatis/动态SQL与缓存机制" },
            { text: "MyBatis核心原理", link: "/java/frameworks/mybatis/MyBatis核心原理" },
          ],
        },
        {
          text: "SpringBoot",
          items: [
            { text: "SpringBoot入门与核心特性", link: "/java/frameworks/springboot/SpringBoot入门与核心特性" },
            { text: "SpringBoot自动配置原理", link: "/java/frameworks/springboot/SpringBoot自动配置原理" },
            { text: "配置文件与环境管理", link: "/java/frameworks/springboot/配置文件与环境管理" },
            { text: "SpringBoot核心原理", link: "/java/frameworks/springboot/SpringBoot核心原理" },
          ],
        },
      ],
      ai: [
        {
          text: "第一阶段：基础入门",
          items: [
            { text: "大模型概述", link: "/ai/basic/大模型概述" },
            { text: "Prompt工程基础", link: "/ai/basic/Prompt工程基础" },
            { text: "环境搭建", link: "/ai/basic/环境搭建" },
          ],
        },
        {
          text: "第二阶段：核心API与框架",
          items: [
            { text: "OpenAI API详解", link: "/ai/api/OpenAI_API详解" },
            { text: "Claude API详解", link: "/ai/api/Claude_API详解" },
            { text: "LangChain入门", link: "/ai/framework/LangChain入门" },
            { text: "本地模型部署", link: "/ai/framework/本地模型部署" },
          ],
        },
        {
          text: "第三阶段：高级应用开发",
          items: [
            { text: "RAG实战", link: "/ai/advanced/RAG实战" },
            { text: "Agent开发", link: "/ai/advanced/Agent开发" },
            { text: "多模态应用", link: "/ai/advanced/多模态应用" },
            { text: "性能优化", link: "/ai/advanced/性能优化" },
          ],
        },
        {
          text: "第四阶段：实战项目",
          items: [
            { text: "智能客服系统", link: "/ai/projects/智能客服系统" },
            { text: "代码助手", link: "/ai/projects/代码助手" },
            { text: "数据分析助手", link: "/ai/projects/数据分析助手" },
          ],
        },
        {
          text: "第五阶段：进阶与部署",
          items: [
            { text: "模型微调", link: "/ai/expert/模型微调" },
            { text: "生产部署", link: "/ai/expert/生产部署" },
          ],
        },
      ],
      mysql: [
        {
          text: "入门",
          items: [
            { text: "MySQL简介与环境搭建", link: "/mysql/basic/MySQL简介与环境搭建" },
            { text: "SQL基础语法", link: "/mysql/basic/SQL基础语法" },
            { text: "数据类型与表结构", link: "/mysql/basic/数据类型与表结构" },
            { text: "数据查询与操作", link: "/mysql/basic/数据查询与操作" },
          ],
        },
        {
          text: "核心原理",
          items: [
            { text: "索引原理与应用", link: "/mysql/core/索引原理与应用" },
            { text: "事务与ACID特性", link: "/mysql/core/事务与ACID特性" },
            { text: "存储引擎详解", link: "/mysql/core/存储引擎详解" },
            { text: "锁机制与并发控制", link: "/mysql/core/锁机制与并发控制" },
          ],
        },
        {
          text: "进阶实战",
          items: [
            { text: "SQL优化实战", link: "/mysql/advanced/SQL优化实战" },
            { text: "主从复制原理", link: "/mysql/advanced/主从复制原理" },
            { text: "分库分表策略", link: "/mysql/advanced/分库分表策略" },
            { text: "性能调优实战", link: "/mysql/advanced/性能调优实战" },
          ],
        },
        {
          text: "精通与架构",
          items: [
            { text: "InnoDB存储引擎深度剖析", link: "/mysql/expert/InnoDB存储引擎深度剖析" },
            { text: "查询优化器原理", link: "/mysql/expert/查询优化器原理" },
            { text: "日志系统与恢复机制", link: "/mysql/expert/日志系统与恢复机制" },
            { text: "MySQL高可用架构", link: "/mysql/expert/MySQL高可用架构" },
          ],
        },
      ],
      redis: [
        {
          text: "入门",
          items: [
            { text: "Redis简介与环境搭建", link: "/redis/basic/Redis简介与环境搭建" },
            { text: "数据类型与基础命令", link: "/redis/basic/数据类型与基础命令" },
          ],
        },
        {
          text: "核心原理",
          items: [
            { text: "数据结构底层实现", link: "/redis/core/数据结构底层实现" },
            { text: "持久化机制", link: "/redis/core/持久化机制" },
            { text: "内存管理与淘汰策略", link: "/redis/core/内存管理与淘汰策略" },
            { text: "发布订阅与事务", link: "/redis/core/发布订阅与事务" },
          ],
        },
        {
          text: "进阶实战",
          items: [
            { text: "主从复制与集群", link: "/redis/advanced/主从复制与集群" },
            { text: "缓存问题与性能优化", link: "/redis/advanced/缓存问题与性能优化" },
          ],
        },
        {
          text: "精通与架构",
          items: [
            { text: "单线程模型与事件循环", link: "/redis/expert/单线程模型与事件循环" },
            { text: "分布式锁与高可用架构", link: "/redis/expert/分布式锁与高可用架构" },
          ],
        },
      ],
    },
    socialLinks: [
      { icon: "github", link: "https://github.com/vuejs/vitepress" },
    ],
  },
});
