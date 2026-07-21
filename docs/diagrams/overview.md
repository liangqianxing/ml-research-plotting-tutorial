# 13 论文总览图：让读者十秒内理解工作

论文总览图不是方法章节的压缩截图。它的任务是建立一个可复述的故事：研究面对什么问题、关键想法在哪里、信息如何流动、最终带来什么变化。

::: info NOTE
**本章导学**

- 区分 teaser、方法总览、模型架构和 graphical abstract
- 根据研究论点选择流水线、对比、层级或闭环结构
- 从一句贡献声明推导阅读区、主路径和视觉焦点
- 用十秒测试和逐层展开控制信息密度
:::

::: warning 原图与来源
本章案例全部来自已核验的 NeurIPS 或 ICML Oral 论文。图片从论文 PDF 原样裁取，只移除了页眉、正文和页码，没有重绘或改色。图片用于教学评论，著作权归论文作者及出版方；自己的论文图应学习其组织方法，而不是照搬视觉内容。
:::

## 先读三张真实的 Oral 论文图

不要先背“少用颜色、多留白”这类口号。下面三张图面对的任务完全不同，但都能让读者迅速建立模型的整体结构。观察它们怎样安排阅读顺序、重复结构和视觉焦点，再回头总结规则。

### CLIP：用编号把完整故事拆成三幕

![CLIP 论文 Figure 1：对比式预训练、由标签文本创建分类器、零样本预测三个阶段](/paper-figures/clip-overview-figure-1.png)

<div class="paper-caption">
  <strong>ICML 2021 Oral · Figure 1</strong>
  <p><em>Learning Transferable Visual Models From Natural Language Supervision</em></p>
  <p><b>原文图注：</b>Summary of our approach. While standard image models jointly train an image feature extractor and a linear classifier to predict some label, CLIP jointly trains an image encoder and a text encoder to predict the correct pairings of a batch of (image, text) training examples. At test time the learned text encoder synthesizes a zero-shot linear classifier by embedding the names or descriptions of the target dataset's classes.</p>
  <p class="paper-links"><a href="https://icml.cc/virtual/2021/oral/9194">ICML Oral 页面</a><a href="https://cdn.openai.com/papers/Learning_Transferable_Visual_Models_From_Natural_Language_Supervision.pdf">论文 PDF</a></p>
</div>

这张图不是把网络层逐个列出，而是讲一个完整的“训练到使用”故事。

1. 左侧 `(1)` 先交代训练信号：图像与文本进入两个编码器，并在相似度矩阵中配对；
2. 右上 `(2)` 把类别名称变成文本特征，说明分类器从哪里来；
3. 右下 `(3)` 复用图像编码器和文本特征，完成零样本预测。

它特别值得学习的不是紫色和绿色本身，而是**颜色与模态永久绑定**：文本始终是紫色，图像始终是绿色，匹配项只用极浅的蓝色标出。真实图片和短文本样例提供了入口，矩阵负责解释核心机制，编号标题负责建立时间顺序。即使读者暂时看不懂 `I·T`，也能复述“先做图文对齐，再用类别文本形成分类器”。

### BYOL：用二维对齐同时表达阶段与分支

![BYOL 论文 Figure 2：online 与 target 两条分支按 view、representation、projection、prediction 对齐](/paper-figures/byol-architecture-figure-2.png)

<div class="paper-caption">
  <strong>NeurIPS 2020 Oral · Figure 2</strong>
  <p><em>Bootstrap Your Own Latent - A New Approach to Self-Supervised Learning</em></p>
  <p><b>原文图注：</b>BYOL's architecture. BYOL minimizes a similarity loss between qθ(zθ) and sg(z'ξ), where θ are the trained weights, ξ are an exponential moving average of θ and sg means stop-gradient. At the end of training, everything but fθ is discarded, and yθ is used as the image representation.</p>
  <p class="paper-links"><a href="https://neurips.cc/virtual/2020/public/f_orals.html">NeurIPS Oral 列表</a><a href="https://proceedings.neurips.cc/paper/2020/hash/f3ada80d5c4ee70142b17b8192b2958e-Abstract.html">论文与 PDF</a></p>
</div>

BYOL 的信息量并不少，但版式只使用两个方向：横向表示处理阶段，纵向表示 online/target 分支。读者先看到“同一输入产生两个 view”，再沿两条平行路径前进，最后在 loss 处汇合。

这张图有四个值得在 PPT 中复用的组织动作：

- 每一列使用同尺寸容器，列标题直接写阶段名称；
- 两条分支分别放在极浅的蓝色和粉色带中，不给每个节点重新配色；
- 普通计算使用实线，stop-gradient 使用断开符号，loss 使用唯一的虚线弧；
- online 分支多出的 predictor 通过“多一列”表达，而不是在图注里埋一句话。

因此，复杂性来自结构差异，而不是装饰。转成灰度后，上下位置、阶段标题、实线/虚线仍能保留主要语义。

### Glow-TTS：用镜像面板突出训练与推理差异

![Glow-TTS 论文 Figure 1：训练与推理流程并排对照](/paper-figures/glow-tts-training-inference-figure-1.png)

<div class="paper-caption">
  <strong>NeurIPS 2020 Oral · Figure 1</strong>
  <p><em>Glow-TTS: A Generative Flow for Text-to-Speech via Monotonic Alignment Search</em></p>
  <p><b>原文图注：</b>Training and inference procedures of Glow-TTS.</p>
  <p class="paper-links"><a href="https://neurips.cc/virtual/2020/public/f_orals.html">NeurIPS Oral 列表</a><a href="https://proceedings.neurips.cc/paper/2020/hash/5c3b99e8f92532e5ad1556e53ceea00c-Abstract.html">论文与 PDF</a></p>
</div>

Glow-TTS 先搭好两套几乎相同的骨架，再只改变训练和推理真正不同的部分。Encoder、Project、Duration Predictor 和 Decoder 在左右面板中保持相同位置与颜色，读者不必重新学习布局；注意力自然落在中间的大容器以及方向发生变化的箭头上。

这类“共享骨架 + 局部差异”的对比图，比把训练和推理画成两条完全不同的流程更容易比较。它也说明了一个重要原则：**颜色应该帮助读者确认相同模块，位置应该帮助读者发现不同机制。**

## 三张图的设计决策对照

| 论文图 | 核心任务 | 主结构 | 颜色承担的角色 | 最强视觉入口 |
| --- | --- | --- | --- | --- |
| CLIP Figure 1 | 讲清预训练到零样本使用 | 三阶段叙事 | 区分文本、图像与匹配 | 编号标题 + 真实样例 |
| BYOL Figure 2 | 讲清双分支不对称 | 阶段列 × 分支行 | 区分 online 与 target | 两条平行色带 |
| Glow-TTS Figure 1 | 比较训练与推理 | 左右镜像面板 | 固定模块身份 | 相同骨架中的局部变化 |

选择版式时，不要问“哪张图更好看”，而要问“我的论文最需要读者比较什么”。如果重点是先后阶段，用 CLIP 式编号；如果重点是并行分支，用 BYOL 式二维对齐；如果重点是两种模式的差异，用 Glow-TTS 式镜像面板。

## 先确定总览图的类型

不同位置的图承担不同任务，不应使用同一套信息密度。

| 类型 | 读者要回答的问题 | 应保留什么 |
| --- | --- | --- |
| Teaser | “这篇论文有何不同？” | 问题、核心直觉、最有说服力的结果 |
| Figure 1 方法总览 | “方法从输入到输出如何工作？” | 主要阶段、创新模块、关键关系 |
| 模型架构图 | “各模块如何连接与变换张量？” | 模块接口、重复结构、必要尺寸 |
| 实验流程图 | “数据如何划分、训练和评价？” | 数据边界、阶段、泄漏风险、输出 |
| Graphical abstract | “能否独立理解整项工作？” | 背景、方法、结论，更少技术细节 |

如果一张图同时承担以上所有任务，它通常会变得拥挤。可以用 `(a)` 总览、`(b)` 核心模块展开，将两个阅读尺度放在同一 Figure 中。

## 四种常见叙事结构

### 流水线：输入 → 方法 → 输出

适合大多数模型与系统。主路径只保留 3–5 个阶段，创新模块放在路径中间并形成唯一视觉焦点。

### 对比：现有方法 vs 我们的方法

适合贡献来自机制差异，而不只是增加一个模块的工作。上下或左右两条路径必须使用相同起点、终点和尺度，否则比较会失去公平性。

### 层级：系统 → 子系统 → 核心单元

适合多尺度模型或大型系统。用嵌套面板或局部放大逐层进入，不要在一个平面同时展示全部层级。

### 闭环：观测 → 决策 → 反馈

适合强化学习、主动学习、控制与迭代优化。循环方向必须明确，并把初始输入与最终停止条件放在环外。

## 从贡献声明推导版式

假设论文的贡献声明是：

> 我们根据样本置信度对跨模态对齐进行加权，从而减弱噪声配对对分类的影响。

不要立即打开 PPT。先拆出四个阅读区：

| 阅读区 | 必须回答的问题 | 画面内容 |
| --- | --- | --- |
| Problem | 为什么旧方法会失败？ | 带噪声的图像—文本配对 |
| Representation | 两个模态怎样进入共享空间？ | 两个编码器与共享表征 |
| Contribution | 论文具体改变了什么？ | 置信度加权的对齐模块 |
| Evidence | 改变带来什么？ | 更稳健的预测与关键提升 |

然后设置视觉权重：Problem 和 Evidence 各占约 20%，Representation 占 25%，Contribution 占 35%。Contribution 使用主色描边与更大留白，其他区域保持中性。先在灰色线框中验证这组比例，再决定最终配色。

## 主路径只保留一个

读者第一次看图时应该能沿一条连续路径完成阅读。辅助损失、训练细节和可选模块可以用更细的虚线路径接入，但不能与主路径同等醒目。

主路径设计规则：

1. 从左到右或从上到下，只选一个方向；
2. 阶段数量控制在 3–5 个；
3. 主箭头粗细一致，不绕过其他模块；
4. 输入和输出的视觉重量小于核心方法；
5. 只有论文贡献使用最高对比。

::: tip 先画一条看不见的中轴线
主路径上的关键模块围绕同一中轴排列。上下分支可以离开中轴，但最终回到明确的汇合点。这样复杂图也会保持稳定。
:::

## 逐层展开，而不是一次讲完

同一张图可以包含三个信息层级：

- **第一层，25% 缩放可见**：输入、论文贡献、输出；
- **第二层，正常阅读可见**：阶段名称、主要分支、训练与推理边界；
- **第三层，放大后可见**：维度、损失函数符号、少量实现参数。

如果第三层信息影响主路径理解，就为它增加独立子面板；如果不影响，就移到图注、方法正文或附录。

## 标签怎样写得短而准确

模块名使用名词，箭头标签使用动词，分组标题使用阶段名。

| 不推荐 | 更好的写法 | 原因 |
| --- | --- | --- |
| `We first extract visual features` | `Visual encoder` | 模块内不写句子 |
| `feature processing module` | `Temporal mixer` | 使用能说明作用的具体名称 |
| `goes to` | `align` | 箭头说明发生了什么变换 |
| `our novel proposed module` | `Confidence weighting` | 新颖性由视觉层级和图注表达 |
| `results` | `Class probability` | 输出名称应可验证 |

缩写第一次出现时在图注或图中定义。整篇论文保持相同大小写、连字符和复数形式。

## 如何让图“引人入目”

吸引注意力依赖清晰的反差，而不是装饰堆叠。总览图可以选择一个主要手段、一个辅助手段：

- **位置**：把核心贡献放在主路径中心或视觉中心；
- **尺度**：核心模块比普通模块大 10%–25%；
- **描边**：核心模块使用更粗的主色边框；
- **留白**：核心模块周围减少邻近元素；
- **颜色**：只给核心模块浅色填充；
- **局部放大**：用一个小面板解释核心机制。

不要同时使用大面积渐变、立体透视、阴影、发光和五种高饱和色。读者会先注意视觉效果，却不一定知道论文贡献是什么。

## 定性样例要真实

计算机视觉、医学影像和多模态论文常在总览图中放输入或输出样例。样例不是背景装饰，应当：

- 展示真实可辨认的输入，而不是模糊占位图；
- 所有方法使用同一裁剪区域和显示范围；
- 局部放大框使用一致颜色与线宽；
- 预测正确与否由文字、符号或形状共同说明；
- 不挑选只对本方法有利、却缺乏代表性的样例。

## 图注补齐图中没有说完的内容

一条总览图图注至少回答：

1. 图的阅读方向；
2. 每个阶段做什么；
3. 颜色、虚线和符号代表什么；
4. 哪一部分是论文提出的内容；
5. 训练与推理阶段是否不同。

不要让图注逐字重复框内文字。图负责结构，图注负责定义和上下文。

## 十秒测试

把图给没有参与项目的同学看十秒，然后收起并询问：

- 研究输入和输出是什么？
- 哪一个模块是作者提出的？
- 信息大致如何流动？
- 这项改进解决什么问题？

如果对方只能记住“颜色很多”或“网络很复杂”，就需要重新分配层级。如果能够复述主故事，即使说不出每个公式，Figure 1 已经完成任务。

下一步进入[视觉层级与精修](./polish.md)，系统处理留白、字体、对齐与最后一轮删减。
