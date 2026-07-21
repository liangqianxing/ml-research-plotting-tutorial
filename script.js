const palette = {
  ink: "#181817",
  muted: "#666660",
  grid: "#deded8",
  red: "#e34a33",
  teal: "#177f75",
  gold: "#bb7c16",
  blue: "#3569a6",
  paper: "#fafaf8",
};

function prepareCanvas(canvas) {
  const rect = canvas.getBoundingClientRect();
  const ratio = Math.min(window.devicePixelRatio || 1, 2);
  const width = Math.max(rect.width, 280);
  const height = Math.max(rect.height, 180);

  canvas.width = Math.round(width * ratio);
  canvas.height = Math.round(height * ratio);
  const context = canvas.getContext("2d");
  context.setTransform(ratio, 0, 0, ratio, 0, 0);
  context.clearRect(0, 0, width, height);
  return { context, width, height };
}

function drawAxes(context, plot, xTicks, yTicks, xLabel, yLabel, showGrid = true) {
  context.save();
  context.font = "10px ui-monospace, SFMono-Regular, Menlo, monospace";
  context.fillStyle = palette.muted;
  context.strokeStyle = palette.grid;
  context.lineWidth = 1;

  yTicks.forEach(({ value, y, label }) => {
    if (showGrid) {
      context.beginPath();
      context.moveTo(plot.left, y);
      context.lineTo(plot.right, y);
      context.stroke();
    }
    context.textAlign = "right";
    context.textBaseline = "middle";
    context.fillText(label ?? value, plot.left - 10, y);
  });

  xTicks.forEach(({ value, x, label }) => {
    context.textAlign = "center";
    context.textBaseline = "top";
    context.fillText(label ?? value, x, plot.bottom + 10);
  });

  context.strokeStyle = palette.ink;
  context.beginPath();
  context.moveTo(plot.left, plot.top);
  context.lineTo(plot.left, plot.bottom);
  context.lineTo(plot.right, plot.bottom);
  context.stroke();

  context.font = "600 10px ui-monospace, SFMono-Regular, Menlo, monospace";
  context.textAlign = "center";
  context.textBaseline = "bottom";
  context.fillText(xLabel, (plot.left + plot.right) / 2, plot.height + plot.top + 42);

  context.save();
  context.translate(14, (plot.top + plot.bottom) / 2);
  context.rotate(-Math.PI / 2);
  context.fillText(yLabel, 0, 0);
  context.restore();
  context.restore();
}

function drawOverview() {
  const canvas = document.querySelector("#overview-chart");
  if (!canvas) return;
  const { context, width, height } = prepareCanvas(canvas);
  const plot = {
    left: width < 520 ? 58 : 70,
    right: width - 26,
    top: 22,
    bottom: height - 54,
  };
  plot.width = plot.right - plot.left;
  plot.height = plot.bottom - plot.top;

  const xScale = (value) => plot.left + ((value - 0) / 45) * plot.width;
  const yScale = (value) => plot.bottom - ((value - 0.72) / 0.22) * plot.height;

  drawAxes(
    context,
    plot,
    [0, 10, 20, 30, 40].map((value) => ({ value, x: xScale(value) })),
    [0.75, 0.8, 0.85, 0.9].map((value) => ({ value, y: yScale(value), label: value.toFixed(2) })),
    "INFERENCE LATENCY (MS / SAMPLE)",
    "MACRO F1",
  );

  const models = [
    { label: "Proposed", x: 26, y: 0.902, err: 0.008, color: palette.red, marker: "circle" },
    { label: "Baseline", x: 18, y: 0.851, err: 0.013, color: palette.teal, marker: "square" },
    { label: "Compact", x: 7, y: 0.806, err: 0.009, color: palette.gold, marker: "triangle" },
  ];

  models.forEach((model) => {
    const x = xScale(model.x);
    const y = yScale(model.y);
    const yTop = yScale(model.y + model.err);
    const yBottom = yScale(model.y - model.err);
    context.strokeStyle = model.color;
    context.lineWidth = 1.5;
    context.beginPath();
    context.moveTo(x, yTop);
    context.lineTo(x, yBottom);
    context.moveTo(x - 5, yTop);
    context.lineTo(x + 5, yTop);
    context.moveTo(x - 5, yBottom);
    context.lineTo(x + 5, yBottom);
    context.stroke();

    context.fillStyle = model.color;
    context.beginPath();
    if (model.marker === "square") {
      context.rect(x - 5, y - 5, 10, 10);
    } else if (model.marker === "triangle") {
      context.moveTo(x, y - 7);
      context.lineTo(x + 6, y + 5);
      context.lineTo(x - 6, y + 5);
      context.closePath();
    } else {
      context.arc(x, y, 6, 0, Math.PI * 2);
    }
    context.fill();

    context.fillStyle = palette.ink;
    context.font = "600 11px ui-sans-serif, system-ui, sans-serif";
    context.textAlign = "left";
    context.textBaseline = "middle";
    context.fillText(model.label, x + 10, y - 2);
  });
}

const learningData = {
  accuracy: {
    min: 0.62,
    max: 1,
    train: [0.68, 0.76, 0.82, 0.87, 0.9, 0.92, 0.934, 0.946, 0.955, 0.961],
    valid: [0.65, 0.72, 0.78, 0.82, 0.851, 0.869, 0.881, 0.891, 0.888, 0.884],
    spread: [0.035, 0.03, 0.025, 0.023, 0.021, 0.019, 0.018, 0.017, 0.02, 0.022],
  },
  auc: {
    min: 0.62,
    max: 1,
    train: [0.7, 0.79, 0.85, 0.89, 0.917, 0.937, 0.95, 0.961, 0.968, 0.972],
    valid: [0.67, 0.75, 0.81, 0.854, 0.881, 0.901, 0.912, 0.92, 0.918, 0.915],
    spread: [0.031, 0.028, 0.024, 0.021, 0.019, 0.018, 0.017, 0.016, 0.018, 0.02],
  },
  f1: {
    min: 0.5,
    max: 1,
    train: [0.57, 0.66, 0.75, 0.81, 0.85, 0.88, 0.901, 0.918, 0.93, 0.938],
    valid: [0.54, 0.62, 0.7, 0.755, 0.796, 0.823, 0.842, 0.856, 0.853, 0.849],
    spread: [0.048, 0.043, 0.038, 0.033, 0.029, 0.027, 0.026, 0.024, 0.027, 0.03],
  },
};

let activeMetric = "accuracy";
let learningGeometry = null;

function drawLine(context, points, color, dashed = false) {
  context.save();
  context.strokeStyle = color;
  context.lineWidth = 2.2;
  context.lineJoin = "round";
  context.lineCap = "round";
  context.setLineDash(dashed ? [7, 5] : []);
  context.beginPath();
  points.forEach((point, index) => {
    if (index === 0) context.moveTo(point.x, point.y);
    else context.lineTo(point.x, point.y);
  });
  context.stroke();
  context.restore();
}

function drawLearningChart() {
  const canvas = document.querySelector("#learning-chart");
  if (!canvas) return;
  const { context, width, height } = prepareCanvas(canvas);
  const data = learningData[activeMetric];
  const showBand = document.querySelector("#show-band").checked;
  const showGrid = document.querySelector("#show-grid").checked;
  const plot = {
    left: width < 520 ? 52 : 66,
    right: width - 20,
    top: 30,
    bottom: height - 54,
  };
  plot.width = plot.right - plot.left;
  plot.height = plot.bottom - plot.top;
  const xScale = (index) => plot.left + (index / (data.train.length - 1)) * plot.width;
  const yScale = (value) => plot.bottom - ((value - data.min) / (data.max - data.min)) * plot.height;
  const xTicks = [0, 2, 4, 6, 8, 9].map((index) => ({
    value: (index + 1) * 10,
    x: xScale(index),
  }));
  const yValues = activeMetric === "f1" ? [0.5, 0.6, 0.7, 0.8, 0.9, 1] : [0.65, 0.7, 0.8, 0.9, 1];
  const yTicks = yValues.map((value) => ({ value, y: yScale(value), label: value.toFixed(2) }));

  drawAxes(context, plot, xTicks, yTicks, "EPOCH", activeMetric.toUpperCase(), showGrid);

  if (showBand) {
    context.fillStyle = "rgba(227, 74, 51, 0.13)";
    context.beginPath();
    data.valid.forEach((value, index) => {
      const point = { x: xScale(index), y: yScale(value + data.spread[index]) };
      if (index === 0) context.moveTo(point.x, point.y);
      else context.lineTo(point.x, point.y);
    });
    for (let index = data.valid.length - 1; index >= 0; index -= 1) {
      context.lineTo(xScale(index), yScale(data.valid[index] - data.spread[index]));
    }
    context.closePath();
    context.fill();
  }

  const trainPoints = data.train.map((value, index) => ({ x: xScale(index), y: yScale(value) }));
  const validPoints = data.valid.map((value, index) => ({ x: xScale(index), y: yScale(value) }));
  drawLine(context, trainPoints, palette.teal, true);
  drawLine(context, validPoints, palette.red);

  context.font = "600 10px ui-monospace, SFMono-Regular, Menlo, monospace";
  context.textAlign = "right";
  context.fillStyle = palette.teal;
  context.fillText("TRAIN", plot.right - 2, trainPoints.at(-1).y - 9);
  context.fillStyle = palette.red;
  context.fillText("VALID", plot.right - 2, validPoints.at(-1).y + 18);

  const bestIndex = data.valid.indexOf(Math.max(...data.valid));
  const lastIndex = data.valid.length - 1;
  document.querySelector("#best-epoch").textContent = String((bestIndex + 1) * 10);
  document.querySelector("#final-score").textContent = data.valid[lastIndex].toFixed(3);
  document.querySelector("#generalization-gap").textContent = (
    data.train[lastIndex] - data.valid[lastIndex]
  ).toFixed(3);

  learningGeometry = { plot, data, xScale, yScale };
}

function drawMiniChart(canvas) {
  const type = canvas.dataset.miniChart;
  const { context, width, height } = prepareCanvas(canvas);
  const left = 28;
  const right = width - 18;
  const top = 18;
  const bottom = height - 24;
  const w = right - left;
  const h = bottom - top;

  context.strokeStyle = palette.grid;
  context.lineWidth = 1;
  context.strokeRect(left, top, w, h);

  if (type === "roc") {
    context.strokeStyle = palette.grid;
    context.setLineDash([4, 4]);
    context.beginPath();
    context.moveTo(left, bottom);
    context.lineTo(right, top);
    context.stroke();
    context.setLineDash([]);
    const points = [
      [0, 0],
      [0.07, 0.42],
      [0.16, 0.66],
      [0.3, 0.82],
      [0.55, 0.94],
      [1, 1],
    ].map(([x, y]) => ({ x: left + x * w, y: bottom - y * h }));
    drawLine(context, points, palette.red);
    context.fillStyle = palette.ink;
    context.font = "700 10px ui-monospace, monospace";
    context.fillText("AUC 0.87", left + 12, top + 18);
  }

  if (type === "calibration") {
    context.strokeStyle = palette.grid;
    context.setLineDash([4, 4]);
    context.beginPath();
    context.moveTo(left, bottom);
    context.lineTo(right, top);
    context.stroke();
    context.setLineDash([]);
    const points = [
      [0.05, 0.08],
      [0.2, 0.24],
      [0.4, 0.36],
      [0.6, 0.58],
      [0.8, 0.74],
      [0.95, 0.9],
    ].map(([x, y]) => ({ x: left + x * w, y: bottom - y * h }));
    drawLine(context, points, palette.teal);
    points.forEach(({ x, y }) => {
      context.fillStyle = palette.teal;
      context.beginPath();
      context.arc(x, y, 3, 0, Math.PI * 2);
      context.fill();
    });
  }

  if (type === "confusion") {
    const values = [0.84, 0.1, 0.06, 0.12, 0.76, 0.12, 0.05, 0.15, 0.8];
    const size = Math.min(w, h) / 3;
    const offsetX = left + (w - size * 3) / 2;
    const offsetY = top + (h - size * 3) / 2;
    values.forEach((value, index) => {
      const row = Math.floor(index / 3);
      const column = index % 3;
      context.fillStyle = `rgba(53, 105, 166, ${0.12 + value * 0.85})`;
      context.fillRect(offsetX + column * size, offsetY + row * size, size - 2, size - 2);
      context.fillStyle = value > 0.5 ? "#ffffff" : palette.ink;
      context.font = "600 10px ui-monospace, monospace";
      context.textAlign = "center";
      context.textBaseline = "middle";
      context.fillText(
        value.toFixed(2),
        offsetX + column * size + size / 2,
        offsetY + row * size + size / 2,
      );
    });
  }

  if (type === "importance") {
    const values = [0.88, 0.67, 0.52, 0.31];
    const labels = ["X3", "X1", "X7", "X4"];
    const rowHeight = h / values.length;
    values.forEach((value, index) => {
      const y = top + index * rowHeight + rowHeight * 0.22;
      context.fillStyle = index === 0 ? palette.gold : "#d4d4cc";
      context.fillRect(left + 26, y, value * (w - 38), rowHeight * 0.48);
      context.fillStyle = palette.muted;
      context.font = "600 9px ui-monospace, monospace";
      context.textAlign = "left";
      context.textBaseline = "middle";
      context.fillText(labels[index], left + 2, y + rowHeight * 0.24);
    });
  }
}

const codeSamples = {
  matplotlib: `import matplotlib.pyplot as plt
import numpy as np

epochs = np.arange(1, 101)
mean = scores.mean(axis=0)
std = scores.std(axis=0)

fig, ax = plt.subplots(figsize=(3.35, 2.35))
ax.plot(epochs, mean, color="#E34A33", lw=1.6)
ax.fill_between(epochs, mean - std, mean + std,
                color="#E34A33", alpha=0.16, linewidth=0)
ax.set(xlabel="Epoch", ylabel="Macro F1")
ax.spines[["top", "right"]].set_visible(False)
fig.tight_layout()
fig.savefig("learning_curve.pdf", bbox_inches="tight")`,
  seaborn: `import seaborn as sns
import matplotlib.pyplot as plt

sns.set_theme(context="paper", style="ticks", font_scale=0.9)

ax = sns.pointplot(
    data=results,
    x="model",
    y="macro_f1",
    hue="dataset",
    errorbar="sd",
    markers=["o", "s"],
    linestyles=["-", "--"],
    palette=["#E34A33", "#177F75"],
)
sns.despine()
ax.figure.savefig("benchmark.pdf", bbox_inches="tight")`,
  sklearn: `import matplotlib.pyplot as plt
from sklearn.metrics import RocCurveDisplay

fig, ax = plt.subplots(figsize=(3.35, 3.0))

for name, estimator in models.items():
    RocCurveDisplay.from_estimator(
        estimator,
        X_test,
        y_test,
        name=name,
        ax=ax,
    )

ax.plot([0, 1], [0, 1], "--", color="0.55", label="Chance")
ax.set_aspect("equal")
ax.legend(frameon=False)
fig.tight_layout()
fig.savefig("roc.pdf", bbox_inches="tight")`,
};

function setCodeSample(name) {
  document.querySelector("#code-sample").textContent = codeSamples[name];
  document.querySelectorAll("[data-code]").forEach((button) => {
    button.setAttribute("aria-selected", String(button.dataset.code === name));
  });
}

async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.setAttribute("readonly", "");
    textarea.style.position = "fixed";
    textarea.style.opacity = "0";
    document.body.append(textarea);
    textarea.select();
    const copied = document.execCommand("copy");
    textarea.remove();
    return copied;
  }
}

function bindInteractions() {
  document.querySelectorAll("[data-metric]").forEach((button) => {
    button.addEventListener("click", () => {
      activeMetric = button.dataset.metric;
      document.querySelectorAll("[data-metric]").forEach((item) => {
        item.setAttribute("aria-pressed", String(item === button));
      });
      drawLearningChart();
    });
  });

  document.querySelector("#show-band").addEventListener("change", drawLearningChart);
  document.querySelector("#show-grid").addEventListener("change", drawLearningChart);

  document.querySelectorAll("[data-code]").forEach((button) => {
    button.addEventListener("click", () => setCodeSample(button.dataset.code));
  });

  document.querySelector("#copy-code").addEventListener("click", async (event) => {
    const button = event.currentTarget;
    const copied = await copyText(document.querySelector("#code-sample").textContent);
    button.textContent = copied ? "已复制" : "复制失败";
    window.setTimeout(() => {
      button.textContent = "复制";
    }, 1400);
  });

  const canvas = document.querySelector("#learning-chart");
  const tooltip = document.querySelector("#chart-tooltip");
  canvas.addEventListener("mousemove", (event) => {
    if (!learningGeometry) return;
    const rect = canvas.getBoundingClientRect();
    const localX = event.clientX - rect.left;
    const { plot, data, xScale } = learningGeometry;
    const normalized = Math.max(0, Math.min(1, (localX - plot.left) / plot.width));
    const index = Math.round(normalized * (data.train.length - 1));
    tooltip.hidden = false;
    tooltip.innerHTML = `Epoch ${(index + 1) * 10}<br>Train ${data.train[index].toFixed(3)}<br>Valid ${data.valid[index].toFixed(3)}`;
    tooltip.style.left = `${Math.min(rect.width - 148, Math.max(8, xScale(index) - 48))}px`;
    tooltip.style.top = "42px";
  });
  canvas.addEventListener("mouseleave", () => {
    tooltip.hidden = true;
  });

  const sections = [...document.querySelectorAll("main section[id]")];
  const navLinks = [...document.querySelectorAll(".side-nav a")];
  const observer = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (!visible) return;
      navLinks.forEach((link) => {
        link.classList.toggle("active", link.getAttribute("href") === `#${visible.target.id}`);
      });
    },
    { rootMargin: "-20% 0px -65%", threshold: [0, 0.2, 0.6] },
  );
  sections.forEach((section) => observer.observe(section));
}

function drawAll() {
  drawOverview();
  drawLearningChart();
  document.querySelectorAll("[data-mini-chart]").forEach(drawMiniChart);
}

let resizeTimer;
window.addEventListener("resize", () => {
  window.clearTimeout(resizeTimer);
  resizeTimer = window.setTimeout(drawAll, 120);
});

setCodeSample("matplotlib");
bindInteractions();
drawAll();
