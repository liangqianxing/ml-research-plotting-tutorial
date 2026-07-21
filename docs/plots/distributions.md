# 05 分布与比较

当研究问题涉及多个模型、数据集或随机种子时，图表需要同时保留中心趋势与离散程度。

::: info NOTE
**本章导学**

- 在重复次数较少时保留每一个原始观测值
- 识别并呈现相同随机种子之间的配对关系
- 选择适合跨数据集比较的绝对值、排名或相对提升
- 避免多层汇总改变数据集的实际权重
:::

<FigurePlate kind="distribution" />

## 少量重复实验

只有 3 到 10 个随机种子时，直接画出每个观测值通常比箱线图更有信息。

```python
import seaborn as sns
import matplotlib.pyplot as plt

fig, ax = plt.subplots(figsize=(4.8, 2.8))
sns.stripplot(
    data=results,
    x="model",
    y="macro_f1",
    hue="dataset",
    dodge=True,
    jitter=0.12,
    alpha=0.72,
    ax=ax,
)
sns.pointplot(
    data=results,
    x="model",
    y="macro_f1",
    hue="dataset",
    dodge=0.45,
    errorbar="sd",
    linestyle="none",
    marker="D",
    ax=ax,
)
```

同一组数据叠加两层图例时，应删除重复图例项或直接标注组别。

## 成对比较

如果两个模型在相同数据划分或随机种子上运行，数据是成对的。连接相同实验单元比两个独立箱线图更能揭示一致性。

```python
wide = results.pivot(index="seed", columns="model", values="macro_f1")

for _, row in wide.iterrows():
    ax.plot([0, 1], [row["Baseline"], row["Proposed"]], color="0.75", linewidth=0.8)
```

## 多个数据集

跨数据集比较时，原始指标尺度可能不同。可以展示每个数据集上的排名、相对提升，或对每个数据集独立标准化，但必须在图注中说明转换方式。

| 目标 | 推荐图型 |
| --- | --- |
| 比较绝对性能 | 分组点图、小多图 |
| 比较排名 | 排名点图、临界差异图 |
| 比较相对提升 | 以零为基准的发散点图 |
| 查看完整分布 | ECDF、小提琴图、原始点 |

::: warning 小心双重汇总
先对每个数据集取均值，再对数据集均值取均值，会让不同规模的数据集获得相同权重。确认这是否符合研究问题。
:::
