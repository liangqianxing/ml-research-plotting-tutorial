# 02 环境与样式

将字体、尺寸、颜色和导出参数集中配置，可以避免每张图重复调整，并让整篇论文保持一致。

::: info NOTE
**本章导学**

- 建立可复用的 Matplotlib 项目级样式配置
- 使用显式 Figure 与 Axes 组织绘图代码
- 统一管理栏宽、字号、线宽与输出目录
- 为最终图片保存数据、脚本与环境元数据
:::

## 安装基础依赖

```bash
python -m pip install matplotlib seaborn pandas scikit-learn
```

记录实际环境版本：

```bash
python -m pip freeze > requirements-lock.txt
```

## 建立项目级样式

```python
from pathlib import Path
import matplotlib as mpl
import matplotlib.pyplot as plt

FIGURE_DIR = Path("figures")
FIGURE_DIR.mkdir(exist_ok=True)

mpl.rcParams.update({
    "figure.figsize": (3.35, 2.35),
    "figure.dpi": 120,
    "font.family": "sans-serif",
    "font.size": 8,
    "axes.labelsize": 8,
    "axes.titlesize": 9,
    "legend.fontsize": 7,
    "xtick.labelsize": 7,
    "ytick.labelsize": 7,
    "axes.spines.top": False,
    "axes.spines.right": False,
    "savefig.bbox": "tight",
    "savefig.pad_inches": 0.02,
})
```

`3.35 inch` 接近许多期刊的单栏宽度。应以目标期刊的作者指南为准，不要先画大图再无限缩小。

## 使用显式 Figure 和 Axes

```python
fig, ax = plt.subplots()
ax.plot(x, y, color="#147D73", linewidth=1.5)
ax.set(xlabel="Epoch", ylabel="Macro F1")
fig.tight_layout()
fig.savefig(FIGURE_DIR / "learning-curve.pdf")
plt.close(fig)
```

显式使用 `fig` 和 `ax` 可以减少状态式 API 带来的意外影响，也更容易组合多个子图。

## 保存元数据

建议为每张最终图片保留：

```text
figures/
├── learning-curve.pdf
├── learning-curve.png
├── learning-curve.csv
└── learning-curve.json
```

JSON 文件可以记录脚本版本、随机种子、生成时间和关键绘图参数。

::: tip 同时输出矢量与位图
线图和文字优先保存为 PDF；另存一份 PNG 用于快速预览、文档和协作沟通。
:::
