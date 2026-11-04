# 几何形状变化：让单元保持连续

核验日期：2026-10-07。将用户的“集合形状变化”解释为几何单元的组成和变形。依据为 [Bryan James 原作者制作文章](https://www.smashingmagazine.com/2015/06/the-making-of-in-pieces/) 与 [CSSconf EU 原作者访谈](https://blog.cssconf.eu/2015/09/24/introducing-bryan-james/)；原作 [In Pieces](https://species-in-pieces.com/) 的当日视觉与实时交互未验证。

## 已核验事实

作者 2015-06-02 的制作文章说明：以 30 个三角片形成 30 种物种；“pieces”与濒危物种主题有关，不只是多边形美术。文章详述类名切换、多边形坐标、颜色、浏览方向和错峰过渡。[原作者文章](https://www.smashingmagazine.com/2015/06/the-making-of-in-pieces/)

CSSconf 访谈再次解释从 CSS 多边形实验到核心概念的形成。[原作者访谈](https://blog.cssconf.eu/2015/09/24/introducing-bryan-james/)

本条为依据2015年原作者制作文章完成的经典风格练习，图形与素材为本地原创。

## 理论和设计推断

多边形由有序顶点定义。[MDN polygon()](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/basic-shape/polygon)。让同一几何片保持顶点数量与顺序，才有明确的连续插值关系。

本条推断：形态变化应跟随语义变化；多个状态使用相同单元，可以保持身份连续。变形若只为炫技且持续自动播放，可能掩盖主体信息。

## Demo 映射

原创 Form / Shift 将保持身份连续的思路用于设计工作室：24 个三角片分别形成 Connect 的环状、Expand 的星形、Focus 的菱形；各状态同步解释品牌的连接、开放与聚焦。

与原项目不同，本 Demo 使用 SVG 顶点插值而非 CSS clip-path，并且不使用物种造型。`requestAnimationFrame` 和 smoothstep 只在用户选择形态时运行；切换新状态时，从当前坐标继续插值。

| 控制 | 行为 | 内容关系 |
| --- | --- | --- |
| 三状态按钮 | 重排同一组 24 片 | 更换表达，而非更换身份 |
| 单元间距 | 按各片角度向外偏移 | 观察连续面与离散碎片的区别 |
| 变形时长 | 调整下一次变化 | 感受节奏如何影响表达 |
| 暂停 / 恢复 | 保留插值位置并校正计时 | 允许主动检查中间态 |
| 重置 | 初始参数与 Connect | 便于回看比较 |

## 约束与适用边界

- 保持片数和拓扑关系，避免随机重建产生闪回。
- 参数说明要明确：时长影响下一次状态变换；间距直接重绘当前形态。
- 几何图形与主标题分开，正文位置不随形态移动。
- 不默认自动循环。暂停控制与状态按钮同处首屏，避免操作时错过动画。
- 键盘可操作所有按钮和滑块；`prefers-reduced-motion` 下即时完成换态。
- 适合动态品牌、展览、文化活动和概念演示；不适合让关键按钮、文本或事务状态持续变形。

## 复用入口

[结构化条目与完整 Prompt](../../entries/cases/shape-morph.json) · [独立 Demo](../../demos/cases/shape-morph/index.html)

改造练习：将三状态分别对应产品的收集、处理和输出阶段，在形态变化时同步解释任务。
