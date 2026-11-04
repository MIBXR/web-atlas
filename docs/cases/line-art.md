# 线描：用绘制顺序解释组成

核验日期：2026-10-07。真实案例为 [Vivus 官方示范站](https://maxwellito.github.io/vivus/) 和 [Codrops 原作者 SVG Drawing Animation](https://tympanus.net/codrops/2013/12/30/svg-drawing-animation/)。它们是开发者与设计师的示范作品。

## 已核验事实

- Vivus 官方站对比 delayed、sync、oneByOne 三种绘制方式，提供 replay、rewind、时间函数与场景编排示例。[Vivus](https://maxwellito.github.io/vivus/)
- Codrops 原作者实验展示先描绘轮廓再出现图像，以及先出现网页示意框架的思路。[Codrops](https://tympanus.net/codrops/2013/12/30/svg-drawing-animation/)
- Jake Archibald 的原始说明把虚线长度和偏移关联到路径长度，构成线条逐步出现的机制。[Animated line drawing](https://jakearchibald.com/2013/animated-line-drawing-svg/)
- `stroke-dashoffset` 调整 dash array 偏移，可动画；长度可相对于 `pathLength` 解析。[MDN](https://developer.mozilla.org/en-US/docs/Web/SVG/Reference/Attribute/stroke-dashoffset)

Vivus README 的特定实现要求先转为 path；SVG 的 dash 属性适用于多种形状。本 Demo 的原创主体轮廓采用 path。

## 设计推断

线条适合呈现轮廓、分解与构造。对建筑工作室而言，稳定的线宽、工程标签和空白能表达精确；合理绘制顺序可以让观看者逐步发现组成关系。这是本库的设计推断。

本 Demo 默认显示终态，支持手动重播与任意进度回看；正文持续可读。

## Demo 映射

原创 Monoline 工作室页面使用宽标题、固定窄侧栏、通栏建筑线稿与细工具条，区别于通用营销卡片。SVG 画出院落住宅、玻璃墙、树和水面，蓝灰色只用于少量强调。

| 参考机制 | 原创迁移 |
| --- | --- |
| oneByOne / 顺序描绘 | 按基础、屋顶、立柱、窗格、环境顺序出现 |
| 可重播示范 | 3200ms 用户主动触发，默认完整线稿 |
| stroke 偏移 | 每条路径 `pathLength=100`，用归一化进度设置 dashoffset |
| 参数探索 | 滑块控制进度并中止进行中的动画 |

页面另提供三种项目类型选择，用于切换工作室的咨询说明，与线稿工具分开。

## 约束与适用边界

- 路径需以 stroke 表示，填色区域不会因为 dashoffset 自动被绘制。
- 主轮廓与辅助线使用有限层级；小屏同时保留文字说明。
- 不自动隐藏正文、不劫持滚轮、无绘制完毕后的强制弹窗。
- 原生滑块与按钮支持键盘；状态文字 `aria-live` 提供完成信息。
- `prefers-reduced-motion` 下重播显示终态，绘制动画不会使内容消失。
- 适合建筑、工业设计、工艺与结构介绍；照片信息为主时，线描适合作为局部补充。

## 复用入口

[结构化条目与完整 Prompt](../../entries/cases/line-art.json) · [独立 Demo](../../demos/cases/line-art/index.html)

改造练习：替换成机械产品的原创分解图，让描绘顺序对应支架、外壳与接口。
