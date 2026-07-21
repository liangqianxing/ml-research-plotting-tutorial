# 学习曲线

学习曲线将训练过程压缩成可诊断的证据。常见横轴是 Epoch、优化步数或训练样本量，纵轴是损失或评价指标。

## 应该同时画什么

至少同时展示训练集与验证集，并确保两条曲线使用相同坐标轴。

| 现象 | 可能原因 | 下一步 |
| --- | --- | --- |
| 训练与验证都较差 | 欠拟合、特征不足、优化失败 | 增加容量或检查优化设置 |
| 训练继续改善，验证变差 | 过拟合 | 早停、正则化或增加数据 |
| 验证曲线剧烈波动 | 验证集过小或训练不稳定 | 多随机种子、扩大验证集 |
| 两条曲线均未稳定 | 训练尚未收敛 | 增加 Epoch 或调整学习率 |

## 汇总多个随机种子

```python
import matplotlib.pyplot as plt
import numpy as np

epochs = np.arange(1, validation_scores.shape[1] + 1)
mean = validation_scores.mean(axis=0)
std = validation_scores.std(axis=0, ddof=1)

fig, ax = plt.subplots(figsize=(3.35, 2.35))
ax.plot(epochs, mean, color="#DF4B36", label="Validation")
ax.fill_between(
    epochs,
    mean - std,
    mean + std,
    color="#DF4B36",
    alpha=0.16,
    linewidth=0,
)
ax.set(xlabel="Epoch", ylabel="Macro F1")
ax.legend(frameon=False)
fig.savefig("figures/validation-curve.pdf")
```

## 标记最佳轮次

最佳轮次应由预先定义的选择规则决定，而不是在测试集上挑选。

```python
best_index = np.argmax(mean)
ax.scatter(
    epochs[best_index],
    mean[best_index],
    color="#DF4B36",
    edgecolor="white",
    linewidth=0.8,
    zorder=3,
)
```

::: warning 不要平滑掉真实波动
移动平均可以辅助观察趋势，但应保留原始曲线或明确标注平滑窗口。过度平滑会掩盖训练不稳定。
:::

## 图注示例

> 五个随机种子下训练集与验证集 Macro F1 的均值；阴影表示一个标准差。模型选择仅依据验证集，测试集未参与早停。
