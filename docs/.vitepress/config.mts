import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: '/Blog/',
  title: "博客",
  description: "苏子龙博客",
  markdown: {
    headers: {
      level: [2, 3, 4] // 目录显示的标题级别
    },
  },
  themeConfig: {
    // 1. 配置大纲（右侧目录）显示到 h3
    outline: {
      level: [2, 3],  // 显示 h2 和 h3 标题
      label: '目录',   // 目录标题文字
    },
    // 导航栏
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Html', link: '/Html/html' },
      { text: 'Css', link: '/css/引入方式与优先级' },
      { text: 'JavaScript', link: '/JavaScript/闭包' },
    ],
    // 侧边栏
    sidebar: {
      "html": [
        {
          text: 'Html',
          items: [
            { text: 'Html', link: '/html/html' },
          ]
        },
      ],
      "css": [
        {
          text: 'Css',
          items: [
            { text: '引入方式与优先级', link: '/css/引入方式与优先级' },
            { text: '选择器', link: '/css/选择器' },
            { text: '伪类和伪元素', link: '/css/伪类和伪元素' },
            { text: '格式化上下文', link: '/css/格式化上下文' },
            { text: '层叠、优先级与继承', link: '/css/层叠、优先级与继承' },
            { text: '盒模型', link: '/css/盒模型' },
            { text: '布局', link: '/css/布局' },
            { text: '响应式网页设计和媒体查询', link: '/css/响应式网页设计和媒体查询' },
            { text: '溢出', link: '/css/溢出' },
            { text: '层叠上下文', link: '/css/层叠上下文' },
            { text: '重排与重绘', link: '/css/重排与重绘' },
            { text: 'GPU加速', link: '/css/GPU加速' },
          ]
        },
      ],
      "JavaScript": [
        {
          text: 'JavaScript',
          items: [
            { text: '闭包', link: '/JavaScript/闭包' },
          ]
        }
      ]
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  }
})
