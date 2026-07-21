# 04 分类器评估

分类器评估不应只依赖一个 Accuracy。类别分布、错误成本和概率质量决定了应该报告哪些图表。

::: info NOTE
**本章导学**

- 根据类别分布与错误成本选择 ROC 或 PR 曲线
- 使用混淆矩阵定位具体类别的错误模式
- 用可靠性曲线检查预测概率是否可信
- 在相同测试样本上比较模型并报告不确定性
:::

<FigurePlate kind="classification" />

## ROC 与 PR 曲线

ROC 曲线展示真阳性率与假阳性率之间的权衡。正类很稀少时，PR 曲线通常更直接地反映模型找到正样本的能力。

```python
import matplotlib.pyplot as plt
from sklearn.metrics import PrecisionRecallDisplay, RocCurveDisplay

fig, axes = plt.subplots(1, 2, figsize=(7.0, 3.0))

RocCurveDisplay.from_predictions(y_true, y_score, ax=axes[0])
PrecisionRecallDisplay.from_predictions(y_true, y_score, ax=axes[1])

axes[0].plot([0, 1], [0, 1], "--", color="0.6", label="Chance")
axes[0].set_aspect("equal")
fig.tight_layout()
fig.savefig("figures/classifier-curves.pdf")
```

曲线比较必须基于相同测试样本。报告 AUC 时，同时说明置信区间或重复实验波动。

## 混淆矩阵

```python
from sklearn.metrics import ConfusionMatrixDisplay

ConfusionMatrixDisplay.from_predictions(
    y_true,
    y_pred,
    normalize="true",
    values_format=".2f",
    cmap="Blues",
    colorbar=False,
)
```

按真实类别归一化适合观察各类别召回率；原始计数则保留实际错误规模。类别不平衡时，建议在图注中同时报告每类样本数。

## 概率校准

一个分类器可能排序能力很好，但概率并不可信。可靠性曲线将预测概率分箱，与实际正例比例比较。

```python
from sklearn.calibration import CalibrationDisplay

CalibrationDisplay.from_predictions(
    y_true,
    y_score,
    n_bins=10,
    strategy="quantile",
)
```

::: tip 把评价问题分成三类
- 排序能力：ROC AUC、Average Precision；
- 决策结果：Precision、Recall、F1、混淆矩阵；
- 概率质量：校准曲线、Brier score、ECE。
:::
