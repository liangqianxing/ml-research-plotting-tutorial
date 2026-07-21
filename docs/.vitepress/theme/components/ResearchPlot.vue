<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'

type Metric = 'accuracy' | 'auc' | 'f1'

interface Series {
  label: string
  min: number
  train: number[]
  valid: number[]
  spread: number[]
}

const datasets: Record<Metric, Series> = {
  accuracy: {
    label: 'Accuracy',
    min: 0.62,
    train: [0.68, 0.76, 0.82, 0.87, 0.9, 0.92, 0.934, 0.946, 0.955, 0.961],
    valid: [0.65, 0.72, 0.78, 0.82, 0.851, 0.869, 0.881, 0.891, 0.888, 0.884],
    spread: [0.035, 0.03, 0.025, 0.023, 0.021, 0.019, 0.018, 0.017, 0.02, 0.022]
  },
  auc: {
    label: 'AUC',
    min: 0.62,
    train: [0.7, 0.79, 0.85, 0.89, 0.917, 0.937, 0.95, 0.961, 0.968, 0.972],
    valid: [0.67, 0.75, 0.81, 0.854, 0.881, 0.901, 0.912, 0.92, 0.918, 0.915],
    spread: [0.031, 0.028, 0.024, 0.021, 0.019, 0.018, 0.017, 0.016, 0.018, 0.02]
  },
  f1: {
    label: 'Macro F1',
    min: 0.5,
    train: [0.57, 0.66, 0.75, 0.81, 0.85, 0.88, 0.901, 0.918, 0.93, 0.938],
    valid: [0.54, 0.62, 0.7, 0.755, 0.796, 0.823, 0.842, 0.856, 0.853, 0.849],
    spread: [0.048, 0.043, 0.038, 0.033, 0.029, 0.027, 0.026, 0.024, 0.027, 0.03]
  }
}

const palette = {
  ink: '#202321',
  muted: '#67706a',
  grid: '#dfe3df',
  red: '#df4b36',
  teal: '#147d73'
}

const canvas = ref<HTMLCanvasElement | null>(null)
const metric = ref<Metric>('accuracy')
const showBand = ref(true)
const showGrid = ref(true)
let observer: ResizeObserver | undefined

const series = computed(() => datasets[metric.value])
const bestIndex = computed(() => {
  const best = Math.max(...series.value.valid)
  return series.value.valid.indexOf(best)
})
const finalIndex = computed(() => series.value.valid.length - 1)
const finalScore = computed(() => series.value.valid[finalIndex.value].toFixed(3))
const generalizationGap = computed(() =>
  (series.value.train[finalIndex.value] - series.value.valid[finalIndex.value]).toFixed(3)
)

function setMetric(value: string) {
  metric.value = value as Metric
}

function drawLine(
  context: CanvasRenderingContext2D,
  points: Array<{ x: number; y: number }>,
  color: string,
  dashed = false
) {
  context.save()
  context.strokeStyle = color
  context.lineWidth = 2.25
  context.lineJoin = 'round'
  context.lineCap = 'round'
  context.setLineDash(dashed ? [7, 5] : [])
  context.beginPath()
  points.forEach((point, index) => {
    if (index === 0) context.moveTo(point.x, point.y)
    else context.lineTo(point.x, point.y)
  })
  context.stroke()
  context.restore()
}

function draw() {
  if (!canvas.value) return
  const element = canvas.value
  const rect = element.getBoundingClientRect()
  const ratio = Math.min(window.devicePixelRatio || 1, 2)
  const width = Math.max(rect.width, 300)
  const height = Math.max(rect.height, 280)
  element.width = Math.round(width * ratio)
  element.height = Math.round(height * ratio)

  const context = element.getContext('2d')
  if (!context) return
  context.setTransform(ratio, 0, 0, ratio, 0, 0)
  context.clearRect(0, 0, width, height)

  const current = series.value
  const plot = {
    left: width < 560 ? 52 : 66,
    right: width - 22,
    top: 28,
    bottom: height - 52
  }
  const plotWidth = plot.right - plot.left
  const plotHeight = plot.bottom - plot.top
  const xScale = (index: number) => plot.left + (index / (current.train.length - 1)) * plotWidth
  const yScale = (value: number) => plot.bottom - ((value - current.min) / (1 - current.min)) * plotHeight

  context.font = '10px ui-monospace, SFMono-Regular, Menlo, monospace'
  context.fillStyle = palette.muted
  context.lineWidth = 1
  const yValues = metric.value === 'f1' ? [0.5, 0.6, 0.7, 0.8, 0.9, 1] : [0.65, 0.7, 0.8, 0.9, 1]

  yValues.forEach((value) => {
    const y = yScale(value)
    if (showGrid.value) {
      context.strokeStyle = palette.grid
      context.beginPath()
      context.moveTo(plot.left, y)
      context.lineTo(plot.right, y)
      context.stroke()
    }
    context.textAlign = 'right'
    context.textBaseline = 'middle'
    context.fillText(value.toFixed(2), plot.left - 9, y)
  })

  ;[0, 2, 4, 6, 8, 9].forEach((index) => {
    context.textAlign = 'center'
    context.textBaseline = 'top'
    context.fillText(String((index + 1) * 10), xScale(index), plot.bottom + 9)
  })

  context.strokeStyle = palette.ink
  context.beginPath()
  context.moveTo(plot.left, plot.top)
  context.lineTo(plot.left, plot.bottom)
  context.lineTo(plot.right, plot.bottom)
  context.stroke()

  if (showBand.value) {
    context.fillStyle = 'rgba(223, 75, 54, 0.14)'
    context.beginPath()
    current.valid.forEach((value, index) => {
      const x = xScale(index)
      const y = yScale(value + current.spread[index])
      if (index === 0) context.moveTo(x, y)
      else context.lineTo(x, y)
    })
    for (let index = current.valid.length - 1; index >= 0; index -= 1) {
      context.lineTo(xScale(index), yScale(current.valid[index] - current.spread[index]))
    }
    context.closePath()
    context.fill()
  }

  const trainPoints = current.train.map((value, index) => ({ x: xScale(index), y: yScale(value) }))
  const validPoints = current.valid.map((value, index) => ({ x: xScale(index), y: yScale(value) }))
  drawLine(context, trainPoints, palette.teal, true)
  drawLine(context, validPoints, palette.red)

  context.font = '700 10px ui-monospace, SFMono-Regular, Menlo, monospace'
  context.textAlign = 'right'
  context.fillStyle = palette.teal
  context.fillText('TRAIN', plot.right - 2, trainPoints[trainPoints.length - 1].y - 10)
  context.fillStyle = palette.red
  context.fillText('VALID', plot.right - 2, validPoints[validPoints.length - 1].y + 17)
}

watch([metric, showBand, showGrid], () => nextTick(draw))

onMounted(() => {
  draw()
  if (canvas.value) {
    observer = new ResizeObserver(draw)
    observer.observe(canvas.value)
  }
})

onBeforeUnmount(() => observer?.disconnect())
</script>

<template>
  <section class="research-lab" aria-labelledby="research-lab-title">
    <header class="research-lab__header">
      <div>
        <p class="research-lab__kicker">INTERACTIVE NOTEBOOK</p>
        <h2 id="research-lab-title">学习曲线诊断</h2>
        <p>同时检查收敛速度、验证集峰值与泛化差距。</p>
      </div>
      <div class="research-lab__legend" aria-label="曲线图例">
        <span><i class="legend-swatch train"></i>Train</span>
        <span><i class="legend-swatch valid"></i>Valid</span>
      </div>
    </header>

    <div class="research-lab__toolbar">
      <div class="metric-tabs" aria-label="评价指标">
        <button
          v-for="(item, key) in datasets"
          :key="key"
          type="button"
          :aria-pressed="metric === key"
          @click="setMetric(key)"
        >
          {{ item.label }}
        </button>
      </div>
      <div class="plot-options">
        <label><input v-model="showBand" type="checkbox" />置信带</label>
        <label><input v-model="showGrid" type="checkbox" />网格</label>
      </div>
    </div>

    <div class="research-lab__plot">
      <canvas
        ref="canvas"
        class="research-lab__canvas"
        style="display: block; width: 100%; height: var(--lab-canvas-height, 360px)"
        role="img"
        :aria-label="`${series.label} 训练集与验证集学习曲线`"
      ></canvas>
    </div>

    <div class="research-lab__summary" aria-live="polite">
      <div><span>最佳验证轮次</span><strong>{{ (bestIndex + 1) * 10 }}</strong></div>
      <div><span>最终验证分数</span><strong>{{ finalScore }}</strong></div>
      <div><span>泛化差距</span><strong>{{ generalizationGap }}</strong></div>
    </div>
  </section>
</template>

<style scoped>
.research-lab {
  --lab-canvas-height: 360px;
  margin: 28px auto 0;
  border: 1px solid var(--vp-c-border);
  border-radius: 6px;
  background: var(--vp-c-bg-elv);
  box-shadow: var(--lab-shadow);
  overflow: hidden;
}

.research-lab__header,
.research-lab__toolbar,
.research-lab__summary {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
}

.research-lab__header {
  padding: 22px 24px;
  border-bottom: 1px solid var(--vp-c-divider);
}

.research-lab__kicker {
  margin: 0 0 5px;
  color: var(--lab-red);
  font: 700 10px/1.3 ui-monospace, SFMono-Regular, Menlo, monospace;
}

.research-lab__header h2 {
  margin: 0;
  border: 0;
  font-size: 20px;
  line-height: 1.35;
}

.research-lab__header p:last-child {
  margin: 5px 0 0;
  color: var(--vp-c-text-2);
  font-size: 13px;
}

.research-lab__legend {
  display: flex;
  gap: 14px;
  color: var(--vp-c-text-2);
  font-size: 11px;
}

.research-lab__legend span {
  display: inline-flex;
  align-items: center;
  gap: 6px;
}

.legend-swatch {
  width: 16px;
  height: 2px;
  background: var(--lab-red);
}

.legend-swatch.train {
  height: 0;
  border-top: 2px dashed var(--lab-teal);
  background: transparent;
}

.research-lab__toolbar {
  padding: 12px 18px;
  border-bottom: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
}

.metric-tabs {
  display: inline-flex;
  border: 1px solid var(--vp-c-border);
  border-radius: 5px;
  background: var(--vp-c-bg);
  overflow: hidden;
}

.metric-tabs button {
  min-height: 34px;
  padding: 5px 13px;
  border: 0;
  border-right: 1px solid var(--vp-c-border);
  color: var(--vp-c-text-2);
  background: transparent;
  cursor: pointer;
  font-size: 11px;
  font-weight: 650;
}

.metric-tabs button:last-child {
  border-right: 0;
}

.metric-tabs button[aria-pressed='true'] {
  color: #fff;
  background: var(--vp-c-text-1);
}

.metric-tabs button:focus-visible,
.plot-options input:focus-visible {
  outline: 2px solid var(--vp-c-brand-1);
  outline-offset: 2px;
}

.plot-options {
  display: flex;
  gap: 14px;
  color: var(--vp-c-text-2);
  font-size: 11px;
}

.plot-options label {
  display: inline-flex;
  align-items: center;
  gap: 6px;
}

.plot-options input {
  width: 14px;
  height: 14px;
  accent-color: var(--lab-teal);
}

.research-lab__plot {
  padding: 18px;
  overflow: hidden;
}

.research-lab__canvas {
  margin: 0;
}

.research-lab__summary {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  border-top: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
}

.research-lab__summary div {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 12px;
  padding: 14px 18px;
  border-right: 1px solid var(--vp-c-divider);
}

.research-lab__summary div:last-child {
  border-right: 0;
}

.research-lab__summary span {
  color: var(--vp-c-text-2);
  font-size: 11px;
}

.research-lab__summary strong {
  font: 700 16px/1 ui-monospace, SFMono-Regular, Menlo, monospace;
}

@media (max-width: 640px) {
  .research-lab {
    --lab-canvas-height: 310px;
  }

  .research-lab__header,
  .research-lab__toolbar {
    align-items: flex-start;
    flex-direction: column;
  }

  .metric-tabs {
    width: 100%;
  }

  .metric-tabs button {
    flex: 1;
    padding-inline: 7px;
  }

  .research-lab__plot {
    padding: 12px 8px;
  }

  .research-lab__summary {
    grid-template-columns: 1fr;
  }

  .research-lab__summary div {
    border-right: 0;
    border-bottom: 1px solid var(--vp-c-divider);
  }

  .research-lab__summary div:last-child {
    border-bottom: 0;
  }
}
</style>
