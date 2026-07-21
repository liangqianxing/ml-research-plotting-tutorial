<script setup lang="ts">
import { computed } from 'vue'

type FigureKind = 'classification' | 'distribution' | 'ablation' | 'runs'

const props = defineProps<{ kind: FigureKind }>()

const metadata = computed(() => ({
  classification: {
    index: 'FIGURE 04-A',
    title: '分类器诊断不是一个分数',
    caption: 'ROC、PR 与校准曲线分别回答排序、稀有正类检索和概率可信度问题。',
    legend: [
      { label: 'Proposed', cls: 'primary' },
      { label: 'Baseline', cls: 'baseline' }
    ]
  },
  distribution: {
    index: 'FIGURE 05-A',
    title: '保留每次实验的配对关系',
    caption: '细线连接相同随机种子；菱形表示组均值。配对结构揭示提升是否稳定。',
    legend: [
      { label: 'Proposed', cls: 'primary' },
      { label: 'Baseline', cls: 'baseline' }
    ]
  },
  ablation: {
    index: 'FIGURE 06-A',
    title: '以完整模型为零点比较组件贡献',
    caption: '横轴表示相对完整模型的 Macro F1 变化，误差线来自配对重复实验。',
    legend: [
      { label: '性能下降', cls: 'negative' },
      { label: '性能提升', cls: 'positive' }
    ]
  },
  runs: {
    index: 'FIGURE 07-A',
    title: '均值之外仍要展示运行波动',
    caption: '每个点是一条独立运行记录，菱形与误差线表示均值和标准差。',
    legend: [
      { label: 'Baseline', cls: 'baseline' },
      { label: 'Compact', cls: 'mid' },
      { label: 'Proposed', cls: 'primary' }
    ]
  }
})[props.kind])
</script>

<template>
  <figure class="figure-plate" :class="`figure-plate--${kind}`">
    <header class="figure-plate__header">
      <div>
        <p>{{ metadata.index }}</p>
        <h2>{{ metadata.title }}</h2>
      </div>
      <div class="figure-plate__legend" aria-label="图例">
        <span v-for="item in metadata.legend" :key="item.label"><i :class="item.cls"></i>{{ item.label }}</span>
      </div>
    </header>

    <svg
      v-if="kind === 'classification'"
      class="figure-plate__chart"
      viewBox="0 0 760 300"
      role="img"
      aria-label="ROC、PR 与概率校准三组分类器评估曲线"
    >
      <g class="grid">
        <path d="M62 40V238H258M294 40V238H490M526 40V238H722" />
        <path d="M62 188H258M62 139H258M62 89H258M294 188H490M294 139H490M294 89H490M526 188H722M526 139H722M526 89H722" />
      </g>
      <g class="chance">
        <path d="M62 238 258 40M294 198H490M526 238 722 40" />
      </g>
      <g class="curve primary-line">
        <path d="M62 238 C80 158 105 102 142 72 S214 45 258 40" />
        <path d="M294 66 C330 73 356 88 385 111 S451 166 490 190" />
        <path d="M526 224 C566 189 603 151 635 117 S690 70 722 55" />
      </g>
      <g class="curve baseline-line">
        <path d="M62 238 C91 188 121 144 160 107 S223 62 258 40" />
        <path d="M294 89 C330 99 360 119 393 145 S455 183 490 205" />
        <path d="M526 214 C565 186 603 158 638 130 S688 89 722 70" />
      </g>
      <g class="dot-series">
        <circle cx="552" cy="200" r="4"/><circle cx="581" cy="170" r="4"/><circle cx="612" cy="142" r="4"/><circle cx="650" cy="103" r="4"/><circle cx="692" cy="69" r="4"/>
      </g>
      <g class="chart-title">
        <text x="62" y="24">ROC</text><text x="294" y="24">PRECISION / RECALL</text><text x="526" y="24">CALIBRATION</text>
      </g>
      <g class="axis-label">
        <text x="160" y="270" text-anchor="middle">False positive rate</text>
        <text x="392" y="270" text-anchor="middle">Recall</text>
        <text x="624" y="270" text-anchor="middle">Predicted probability</text>
      </g>
      <g class="metric-label">
        <text x="72" y="58">AUC 0.94</text><text x="304" y="58">AP 0.81</text><text x="536" y="58">ECE 0.03</text>
      </g>
    </svg>

    <svg
      v-else-if="kind === 'distribution'"
      class="figure-plate__chart"
      viewBox="0 0 760 300"
      role="img"
      aria-label="三个数据集上基线模型与改进模型的配对比较"
    >
      <g class="grid">
        <path d="M76 38V238H720M76 198H720M76 158H720M76 118H720M76 78H720" />
      </g>
      <g class="paired-lines">
        <path d="M142 190 214 168M142 179 214 154M142 170 214 151M142 160 214 139M142 151 214 133" />
        <path d="M344 151 416 133M344 143 416 119M344 132 416 113M344 124 416 101M344 112 416 91" />
        <path d="M546 129 618 111M546 119 618 95M546 107 618 91M546 98 618 79M546 88 618 73" />
      </g>
      <g class="baseline-dots">
        <circle cx="142" cy="190" r="4"/><circle cx="142" cy="179" r="4"/><circle cx="142" cy="170" r="4"/><circle cx="142" cy="160" r="4"/><circle cx="142" cy="151" r="4"/>
        <circle cx="344" cy="151" r="4"/><circle cx="344" cy="143" r="4"/><circle cx="344" cy="132" r="4"/><circle cx="344" cy="124" r="4"/><circle cx="344" cy="112" r="4"/>
        <circle cx="546" cy="129" r="4"/><circle cx="546" cy="119" r="4"/><circle cx="546" cy="107" r="4"/><circle cx="546" cy="98" r="4"/><circle cx="546" cy="88" r="4"/>
      </g>
      <g class="primary-dots">
        <circle cx="214" cy="168" r="4"/><circle cx="214" cy="154" r="4"/><circle cx="214" cy="151" r="4"/><circle cx="214" cy="139" r="4"/><circle cx="214" cy="133" r="4"/>
        <circle cx="416" cy="133" r="4"/><circle cx="416" cy="119" r="4"/><circle cx="416" cy="113" r="4"/><circle cx="416" cy="101" r="4"/><circle cx="416" cy="91" r="4"/>
        <circle cx="618" cy="111" r="4"/><circle cx="618" cy="95" r="4"/><circle cx="618" cy="91" r="4"/><circle cx="618" cy="79" r="4"/><circle cx="618" cy="73" r="4"/>
      </g>
      <g class="mean-markers">
        <path d="M142 158l7 7-7 7-7-7zM214 142l7 7-7 7-7-7zM344 125l7 7-7 7-7-7zM416 104l7 7-7 7-7-7zM546 100l7 7-7 7-7-7zM618 82l7 7-7 7-7-7z" />
      </g>
      <g class="chart-title" text-anchor="middle">
        <text x="178" y="266">Dataset A</text><text x="380" y="266">Dataset B</text><text x="582" y="266">Dataset C</text>
      </g>
      <g class="axis-label">
        <text x="47" y="202">0.80</text><text x="47" y="162">0.84</text><text x="47" y="122">0.88</text><text x="47" y="82">0.92</text>
      </g>
    </svg>

    <svg
      v-else-if="kind === 'ablation'"
      class="figure-plate__chart"
      viewBox="0 0 760 300"
      role="img"
      aria-label="四项组件消融相对完整模型的性能变化"
    >
      <g class="grid">
        <path d="M270 38V244M360 38V244M450 38V244M630 38V244" />
      </g>
      <path class="zero-line" d="M540 30V250" />
      <g class="bar negative">
        <rect x="320" y="49" width="220" height="24" rx="4"/>
        <rect x="383" y="99" width="157" height="24" rx="4"/>
        <rect x="441" y="149" width="99" height="24" rx="4"/>
      </g>
      <g class="bar positive"><rect x="540" y="199" width="54" height="24" rx="4"/></g>
      <g class="error-bars">
        <path d="M298 61H342M298 55V67M342 55V67M365 111H401M365 105V117M401 105V117M423 161H459M423 155V167M459 155V167M576 211H612M576 205V217M612 205V217"/>
      </g>
      <g class="chart-title" text-anchor="end">
        <text x="252" y="66">- Encoder</text><text x="252" y="116">- Augmentation</text><text x="252" y="166">- Calibration</text><text x="252" y="216">+ Distillation</text>
      </g>
      <g class="axis-label" text-anchor="middle">
        <text x="270" y="270">-0.06</text><text x="360" y="270">-0.04</text><text x="450" y="270">-0.02</text><text x="540" y="270">0</text><text x="630" y="270">+0.02</text>
      </g>
      <g class="metric-label" text-anchor="end">
        <text x="308" y="66">-0.049</text><text x="371" y="116">-0.035</text><text x="429" y="166">-0.022</text><text x="624" y="216" text-anchor="start">+0.012</text>
      </g>
    </svg>

    <svg
      v-else
      class="figure-plate__chart"
      viewBox="0 0 760 300"
      role="img"
      aria-label="三个模型在五个随机种子下的分数和均值标准差"
    >
      <g class="grid">
        <path d="M74 38V238H720M74 198H720M74 158H720M74 118H720M74 78H720" />
      </g>
      <g class="run-dots baseline-dots">
        <circle cx="170" cy="192" r="5"/><circle cx="180" cy="174" r="5"/><circle cx="158" cy="184" r="5"/><circle cx="190" cy="165" r="5"/><circle cx="168" cy="155" r="5"/>
      </g>
      <g class="run-dots mid-dots">
        <circle cx="370" cy="148" r="5"/><circle cx="382" cy="130" r="5"/><circle cx="358" cy="139" r="5"/><circle cx="392" cy="119" r="5"/><circle cx="369" cy="107" r="5"/>
      </g>
      <g class="run-dots primary-dots">
        <circle cx="570" cy="115" r="5"/><circle cx="581" cy="96" r="5"/><circle cx="558" cy="104" r="5"/><circle cx="592" cy="84" r="5"/><circle cx="569" cy="72" r="5"/>
      </g>
      <g class="summary-bars">
        <path d="M174 153V194M164 153H184M164 194H184M174 166l9 9-9 9-9-9z"/>
        <path d="M374 105V151M364 105H384M364 151H384M374 119l9 9-9 9-9-9z"/>
        <path d="M574 70V117M564 70H584M564 117H584M574 84l9 9-9 9-9-9z"/>
      </g>
      <g class="chart-title" text-anchor="middle">
        <text x="174" y="267">Baseline</text><text x="374" y="267">Compact</text><text x="574" y="267">Proposed</text>
      </g>
      <g class="axis-label">
        <text x="45" y="202">0.82</text><text x="45" y="162">0.84</text><text x="45" y="122">0.86</text><text x="45" y="82">0.88</text>
      </g>
      <g class="metric-label" text-anchor="middle">
        <text x="174" y="30">0.833 ± 0.009</text><text x="374" y="30">0.857 ± 0.010</text><text x="574" y="30">0.874 ± 0.010</text>
      </g>
    </svg>

    <figcaption>{{ metadata.caption }}</figcaption>
  </figure>
</template>

<style scoped>
.figure-plate {
  margin: 32px 0 40px;
  border: 1px solid var(--vp-c-border);
  border-radius: 14px;
  background: var(--vp-c-bg-elv);
  overflow: hidden;
  box-shadow: var(--lab-shadow);
}

.figure-plate__header {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 24px;
  padding: 20px 22px 18px;
  border-bottom: 1px solid var(--vp-c-divider);
}

.figure-plate__header p {
  margin: 0 0 6px;
  color: var(--vp-c-brand-1);
  font: 700 11px/1.2 var(--vp-font-family-mono);
  letter-spacing: 0.1em;
}

.figure-plate__header h2 {
  margin: 0;
  border: 0;
  font-size: 17px;
  font-weight: 700;
  line-height: 1.4;
}

.figure-plate__legend {
  display: flex;
  flex: 0 0 auto;
  gap: 16px;
  color: var(--vp-c-text-2);
  font-size: 11.5px;
}

.figure-plate__legend span {
  display: inline-flex;
  align-items: center;
  gap: 7px;
}

.figure-plate__legend i {
  width: 16px;
  height: 3px;
  border-radius: 2px;
}

.figure-plate__legend .primary { background: var(--lab-blue); }
.figure-plate__legend .baseline { background: var(--lab-slate); }
.figure-plate__legend .mid { background: var(--lab-mid); }
.figure-plate__legend .negative { background: var(--lab-coral); }
.figure-plate__legend .positive { background: var(--lab-teal); }

.figure-plate__chart {
  display: block;
  width: 100%;
  height: auto;
  padding: 20px 14px 10px;
  background: var(--vp-c-bg-elv);
}

.grid path {
  fill: none;
  stroke: var(--vp-c-divider);
  stroke-width: 1;
}

.chance path {
  fill: none;
  stroke: var(--vp-c-text-3);
  stroke-dasharray: 5 5;
  stroke-width: 1.2;
}

.curve path,
.paired-lines path,
.error-bars path,
.summary-bars path {
  fill: none;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.curve path { stroke-width: 3; }
.primary-line path { stroke: var(--lab-blue); }
.baseline-line path { stroke: var(--lab-slate); stroke-dasharray: 7 5; }
.dot-series circle,
.primary-dots circle { fill: var(--lab-blue); }
.baseline-dots circle { fill: var(--lab-slate); }
.mid-dots circle { fill: var(--lab-mid); }
.paired-lines path { stroke: var(--lab-slate); stroke-width: 1.3; opacity: 0.55; }
.mean-markers path { fill: var(--vp-c-text-1); }
.bar.negative rect { fill: var(--lab-coral); }
.bar.positive rect { fill: var(--lab-teal); }
.zero-line { stroke: var(--vp-c-text-1); stroke-width: 1.5; }
.error-bars path { stroke: var(--vp-c-text-1); stroke-width: 1.5; }
.summary-bars path { stroke: var(--vp-c-text-1); stroke-width: 1.7; fill: var(--vp-c-bg-elv); }

.chart-title,
.axis-label,
.metric-label {
  fill: var(--vp-c-text-2);
  font-family: var(--vp-font-family-base);
}

.chart-title { fill: var(--vp-c-text-1); font-size: 13px; font-weight: 700; }
.axis-label { font-size: 12px; }
.metric-label { fill: var(--lab-blue); font-family: var(--vp-font-family-mono); font-size: 11.5px; font-weight: 700; }

figcaption {
  padding: 14px 22px 16px;
  border-top: 1px solid var(--vp-c-divider);
  color: var(--vp-c-text-2);
  background: var(--vp-c-bg-soft);
  font-size: 12.5px;
  line-height: 1.7;
}

@media (max-width: 640px) {
  .figure-plate__header {
    align-items: flex-start;
    flex-direction: column;
    gap: 12px;
  }

  .figure-plate__chart {
    min-width: 620px;
  }

  .figure-plate {
    overflow-x: auto;
  }

  .figure-plate__header,
  figcaption {
    position: sticky;
    left: 0;
    z-index: 1;
    min-width: 100%;
    width: 100%;
  }
}
</style>
