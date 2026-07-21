# 07 多随机种子实验

重复实验的价值不只是得到一个更稳定的均值，还在于判断结论是否对随机性敏感。

::: info NOTE
**本章导学**

- 用长格式数据保存每一次独立运行结果
- 区分标准差、标准误与 Bootstrap 置信区间
- 说明随机种子、数据划分和重采样单位
- 通过配对实验降低与模型改动无关的波动
:::

<FigurePlate kind="runs" />

## 保存长格式结果

```python
records.append({
    "seed": seed,
    "model": model_name,
    "dataset": dataset_name,
    "metric": "macro_f1",
    "value": score,
})
```

不要只保存最终均值。长格式结果可以重新计算标准差、置信区间、成对差值以及不同汇总策略。

## 选择不确定性表达

| 表达方式 | 适用场景 | 注意事项 |
| --- | --- | --- |
| 原始点 | 重复次数较少 | 避免点完全重叠 |
| 标准差 | 描述运行波动 | 不表示均值估计精度 |
| 标准误 | 描述均值精度 | 容易被误读为数据分布 |
| Bootstrap 区间 | 分布未知或统计量复杂 | 说明重采样单位和次数 |

## Bootstrap 置信区间

```python
import numpy as np

def bootstrap_mean_ci(values, repeats=10_000, level=0.95, seed=42):
    rng = np.random.default_rng(seed)
    values = np.asarray(values)
    samples = rng.choice(values, size=(repeats, len(values)), replace=True)
    means = samples.mean(axis=1)
    alpha = (1 - level) / 2
    return np.quantile(means, [alpha, 1 - alpha])
```

随机种子并不总是独立重复实验。如果多个种子共享同一个数据划分，图注需要明确区分“模型初始化重复”和“数据划分重复”。

## 报告建议

```text
Macro F1 = 0.891 ± 0.017（均值 ± 标准差，5 个随机种子）
```

::: tip 优先配对
比较两个模型时，让它们使用相同的数据划分和随机种子，并展示配对差值，通常能降低无关波动。
:::
