# ML Figure Lab

面向机器学习研究者的中文科研绘图教程。站点使用 VitePress 构建，内容以 Markdown 维护，并通过 GitHub Actions 自动部署到 GitHub Pages。

除统计图表外，教程还系统讲解如何用 PowerPoint 设计论文总览图、模型架构图和实验流程图。示意图案例只从经过核验的 NeurIPS、ICML、ICLR Oral 论文中选取；当前收录 CLIP、BYOL 和 Glow-TTS，并保留会议、Figure 编号、原始图注和来源链接。

## 在线阅读

<https://liangqianxing.github.io/ml-research-plotting-tutorial/>

## 本地开发

```bash
npm install
npm run docs:dev
```

生产构建：

```bash
npm run docs:build
npm run docs:preview
```

## 内容结构

```text
docs/
├── .vitepress/       # 站点配置、主题和交互组件
├── guide/            # 基础原则与绘图环境
├── plots/            # 常见机器学习图型
├── experiments/      # 消融实验与重复实验
├── publication/      # 论文尺寸和导出
├── diagrams/         # PPT 示意图、配色、形状与总览图
└── reference/        # 投稿检查表
```

## 许可

[MIT](./LICENSE)
