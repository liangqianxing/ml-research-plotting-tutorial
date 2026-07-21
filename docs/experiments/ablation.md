# 消融实验

消融实验用于回答“哪个组件带来了性能变化”。图表需要让读者清楚看到基准配置、移除或加入的组件，以及变化是否超过实验波动。

## 设计对照关系

推荐先整理成显式配置表：

```text
variant       encoder  augmentation  calibration
full          yes      yes           yes
-encoder      no       yes           yes
-augmentation yes      no            yes
-calibration  yes      yes           no
```

组件较少时，使用以完整模型为基准的差值图。组件较多且存在组合时，可以使用矩阵标记配置，并与性能点图对齐。

## 绘制相对完整模型的变化

```python
import matplotlib.pyplot as plt

order = ["-encoder", "-augmentation", "-calibration"]
plot_data = summary.set_index("variant").loc[order].reset_index()

fig, ax = plt.subplots(figsize=(3.6, 2.4))
colors = ["#DF4B36" if value < 0 else "#147D73" for value in plot_data["delta"]]
ax.barh(plot_data["variant"], plot_data["delta"], color=colors)
ax.axvline(0, color="0.25", linewidth=0.8)
ax.set(xlabel="Change in Macro F1 vs. full model")
fig.tight_layout()
```

## 误差与统计检验

差值应该在相同随机种子或数据划分之间计算，然后汇总差值，而不是分别计算两组均值再相减。

```python
paired = runs.pivot(index="seed", columns="variant", values="macro_f1")
delta = paired.drop(columns="full").subtract(paired["full"], axis=0)
```

::: danger 避免只展示最佳消融结果
在查看结果后选择最有利的组件组合会产生选择偏差。正文或附录应提供预先定义的完整消融表。
:::

## 图注需要包含

- 完整模型包含哪些组件；
- 每个变体改变了什么；
- 差值基于多少个配对重复实验；
- 误差棒如何计算；
- 正值和负值分别代表什么。
