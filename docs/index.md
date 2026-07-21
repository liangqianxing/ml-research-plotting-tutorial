---
layout: home
---

<div class="lab-home">
  <section class="lab-home__masthead">
    <div>
      <p class="lab-home__eyebrow">ML FIGURE LAB · RESEARCH PLOTTING MANUAL</p>
      <h1>机器学习<br />科研绘图教程</h1>
      <p class="lab-home__title">A PRACTICAL GUIDE TO RESEARCH FIGURES</p>
      <div class="lab-home__intro">
        <p>从实验记录到论文图表：用清晰、可复现的视觉编码呈现模型差异与不确定性，让每一张图都经得起审稿人推敲。</p>
      </div>
      <div class="lab-home__actions">
        <a class="lab-home__primary" href="./preface.html">开始阅读</a>
        <a href="https://github.com/liangqianxing/ml-research-plotting-tutorial">GitHub 源码</a>
      </div>
    </div>
    <figure class="hero-figure">
      <div class="hero-figure__bar"><i></i><i></i><i></i><span>runs/learning_curve.pdf</span></div>
      <svg viewBox="0 0 520 352" role="img" aria-label="训练集与验证集学习曲线示例图">
        <text class="hf-label" x="54" y="20">ACCURACY vs EPOCH</text>
        <g class="hf-grid">
          <path d="M54 237H494M54 168H494M54 99H494M54 30H494" fill="none" />
        </g>
        <g class="hf-tick">
          <text x="44" y="240.5" text-anchor="end">0.7</text>
          <text x="44" y="171.5" text-anchor="end">0.8</text>
          <text x="44" y="102.5" text-anchor="end">0.9</text>
          <text x="44" y="33.5" text-anchor="end">1.0</text>
          <text x="54" y="326" text-anchor="middle">10</text>
          <text x="151.8" y="326" text-anchor="middle">30</text>
          <text x="249.6" y="326" text-anchor="middle">50</text>
          <text x="347.3" y="326" text-anchor="middle">70</text>
          <text x="445.1" y="326" text-anchor="middle">90</text>
        </g>
        <path class="hf-axis" d="M54 30V306H494" fill="none" />
        <path class="hf-band" d="M54 247.4 102.9 202.5 151.8 164.6 200.7 138.3 249.6 118.3 298.4 107.3 347.3 99.7 396.2 93.5 445.1 93.5 494 94.9 494 119.2 445.1 122.5 396.2 116.9 347.3 124.5 298.4 133.5 249.6 147.3 200.7 170.1 151.8 199.1 102.9 243.9 54 295.7Z" />
        <path class="hf-train" d="M54 250.8 102.9 195.6 151.8 154.2 200.7 119.7 249.6 99 298.4 85.2 347.3 75.5 396.2 67.3 445.1 61.1 494 56.9" />
        <path class="hf-valid" d="M54 271.5 102.9 223.2 151.8 181.8 200.7 154.2 249.6 132.8 298.4 120.4 347.3 112.1 396.2 105.2 445.1 107.3 494 110" />
        <circle class="hf-best" cx="396.2" cy="105.2" r="4.5" />
        <text class="hf-note" x="396.2" y="86" text-anchor="middle">best @ 80</text>
        <text class="hf-label" x="488" y="46" text-anchor="end">TRAIN</text>
        <text class="hf-label" x="488" y="130" text-anchor="end">VALID</text>
        <text class="hf-tick" x="494" y="344" text-anchor="end">EPOCH</text>
      </svg>
      <figcaption>训练集持续上升，验证集在第 80 轮后回落——泛化差距开始扩大。<b>FIG 01</b></figcaption>
    </figure>
    <dl class="lab-home__meta">
      <div><dt>CHAPTERS</dt><dd>10</dd></div>
      <div><dt>WORKFLOWS</dt><dd>04</dd></div>
      <div><dt>STACK</dt><dd>Python</dd></div>
      <div><dt>OUTPUT</dt><dd>PDF / SVG</dd></div>
    </dl>
  </section>

  <section class="home-lab">
    <header class="home-lab__heading">
      <div>
        <p class="section-index">LIVE FIGURE / 01</p>
        <h2>先从学习曲线读懂实验</h2>
      </div>
      <p>切换指标并观察验证集峰值、训练波动和泛化差距。图表的任务不是装饰，而是帮助研究者作出判断。</p>
    </header>

<ResearchPlot />
  </section>

  <section class="learning-path" aria-labelledby="learning-path-title">
    <header>
      <p class="section-index">CURRICULUM / 02</p>
      <h2 id="learning-path-title">从证据设计到论文交付</h2>
      <p>按研究工作流组织，而不是按绘图库 API 罗列。</p>
    </header>
    <div class="learning-path__links">
      <a href="./guide/foundations.html">
        <span>01</span>
        <div><h3>建立视觉语法</h3><p>明确比较对象、评价指标和不确定性来源。</p></div>
        <b>FOUNDATIONS</b>
      </a>
      <a href="./plots/learning-curves.html">
        <span>02</span>
        <div><h3>掌握核心图型</h3><p>学习曲线、分类评估与分布比较。</p></div>
        <b>PLOT TYPES</b>
      </a>
      <a href="./experiments/ablation.html">
        <span>03</span>
        <div><h3>组织实验比较</h3><p>消融、重复实验与配对不确定性。</p></div>
        <b>EXPERIMENTS</b>
      </a>
      <a href="./publication/export.html">
        <span>04</span>
        <div><h3>完成论文交付</h3><p>栏宽、字号、格式与最终检查。</p></div>
        <b>PUBLICATION</b>
      </a>
    </div>
  </section>
</div>
