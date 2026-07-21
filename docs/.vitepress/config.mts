import { defineConfig } from 'vitepress'

export default defineConfig({
  lang: 'zh-CN',
  title: '机器学习科研绘图教程',
  titleTemplate: ':title | ML Figure Lab',
  description: '面向机器学习研究者的科研绘图教程',
  base: '/ml-research-plotting-tutorial/',
  cleanUrls: false,
  lastUpdated: true,

  head: [
    ['meta', { name: 'theme-color', media: '(prefers-color-scheme: light)', content: '#f2f4f8' }],
    ['meta', { name: 'theme-color', media: '(prefers-color-scheme: dark)', content: '#0d131d' }],
    ['meta', { name: 'author', content: 'GU' }],
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/ml-research-plotting-tutorial/logo.svg' }]
  ],

  markdown: {
    lineNumbers: false
  },

  themeConfig: {
    siteTitle: 'ML Figure Lab',
    logo: '/logo.svg',
    nav: [
      { text: '基础', link: '/guide/foundations.html' },
      { text: '图型', link: '/plots/learning-curves.html' },
      { text: '实验', link: '/experiments/ablation.html' },
      { text: '投稿', link: '/publication/export.html' }
    ],

    search: {
      provider: 'local',
      options: {
        translations: {
          button: {
            buttonText: '搜索教程',
            buttonAriaLabel: '搜索教程'
          },
          modal: {
            noResultsText: '没有找到相关内容',
            resetButtonTitle: '清除搜索',
            footer: {
              selectText: '选择',
              navigateText: '切换',
              closeText: '关闭'
            }
          }
        }
      }
    },

    sidebar: [
      {
        text: '第一部分 · 视觉基础',
        items: [
          { text: '00 前言', link: '/preface.html' },
          { text: '01 绘图原则', link: '/guide/foundations.html' },
          { text: '02 环境与样式', link: '/guide/environment.html' }
        ]
      },
      {
        text: '第二部分 · 核心图型',
        items: [
          { text: '03 学习曲线', link: '/plots/learning-curves.html' },
          { text: '04 分类器评估', link: '/plots/classification.html' },
          { text: '05 分布与比较', link: '/plots/distributions.html' }
        ]
      },
      {
        text: '第三部分 · 实验设计',
        items: [
          { text: '06 消融实验', link: '/experiments/ablation.html' },
          { text: '07 多随机种子', link: '/experiments/repeated-runs.html' }
        ]
      },
      {
        text: '第四部分 · 论文交付',
        items: [
          { text: '08 尺寸与导出', link: '/publication/export.html' },
          { text: '09 投稿检查表', link: '/reference/checklist.html' }
        ]
      }
    ],

    outline: {
      level: [2, 3],
      label: '本页目录'
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/liangqianxing/ml-research-plotting-tutorial' }
    ],

    editLink: {
      pattern: 'https://github.com/liangqianxing/ml-research-plotting-tutorial/edit/main/docs/:path',
      text: '在 GitHub 上编辑此页'
    },

    lastUpdated: {
      text: '最后更新',
      formatOptions: {
        dateStyle: 'medium',
        timeStyle: 'short'
      }
    },

    docFooter: {
      prev: '上一篇',
      next: '下一篇'
    },

    footer: {
      message: '面向可复现机器学习研究',
      copyright: 'Released under the MIT License'
    }
  }
})
