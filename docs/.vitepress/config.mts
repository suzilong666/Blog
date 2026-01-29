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
    // 导航栏
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Html', link: '/Html/html' },
      { text: 'Css', link: '/Css/引入方式与优先级' },
      { text: 'JavaScript', link: '/JavaScript/闭包' },
    ],
    // 侧边栏
    sidebar: {
      "Html": [
        {
          text: 'Html',
          items: [
            { text: 'Html', link: '/Html/Html' },
          ]
        },
      ],
      "Css": [
        {
          text: 'Css',
          items: [
            { text: '引入方式与优先级', link: '/Css/引入方式与优先级' },
            { text: '选择器', link: '/Css/选择器' },
            { text: '盒模型', link: '/Css/盒模型' },
            { text: '布局', link: '/Css/布局' },
            { text: '响应式', link: '/Css/响应式' },
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
