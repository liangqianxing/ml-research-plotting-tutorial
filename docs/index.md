---
layout: home

hero:
  name: "ML Figure Lab"
  text: "机器学习科研绘图教程"
  tagline: "从实验记录到论文图表：用清晰、可复现的视觉编码呈现模型差异与不确定性。"
  actions:
    - theme: brand
      text: 开始学习
      link: /preface
    - theme: alt
      text: 查看源码
      link: https://github.com/liangqianxing/ml-research-plotting-tutorial

features:
  - title: 研究问题优先
    details: 先定义需要比较的变量与证据，再选择位置、颜色、线型和图型。
  - title: 不确定性可见
    details: 同时报告均值、分布、重复实验和置信区间，避免只展示单次最好结果。
  - title: 投稿规格内建
    details: 从第一张草图开始约束栏宽、字号、色觉可读性和矢量导出。
---

<div class="home-lab">
  <div class="home-lab__heading">
    <p class="section-index">LIVE / 01</p>
    <h2>先从学习曲线读懂实验</h2>
    <p>切换指标并观察验证集峰值、训练波动和泛化差距。图表的任务不是装饰，而是帮助研究者作出判断。</p>
  </div>

  <ResearchPlot />
</div>

<div class="learning-path">
  <a href="./guide/foundations.html">
    <span>PHASE 01</span>
    <h3>建立视觉语法</h3>
    <p>明确比较对象、评价指标和不确定性来源，建立统一的论文绘图规范。</p>
  </a>
  <a href="./plots/learning-curves.html">
    <span>PHASE 02</span>
    <h3>掌握核心图型</h3>
    <p>覆盖学习曲线、分类器评估、分布比较与常见误读。</p>
  </a>
  <a href="./publication/export.html">
    <span>PHASE 03</span>
    <h3>完成论文交付</h3>
    <p>按照最终栏宽组织字号、线宽、图例和 PDF、SVG 导出流程。</p>
  </a>
</div>
