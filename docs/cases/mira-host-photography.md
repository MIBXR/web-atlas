# Mira Høst：北欧摄影作品集示范页

## 来源与生成方式

原始提示词见 [来源 README 第 436 行](https://github.com/ConardLi/garden-skills/blob/2b9a89340b70f632d31c0f1c69fce94a7912423e/skills/web-design-engineer/README.zh-CN.md#L436)。

[第 438–446 行](https://github.com/ConardLi/garden-skills/blob/2b9a89340b70f632d31c0f1c69fce94a7912423e/skills/web-design-engineer/README.zh-CN.md#L438-L446) 将其列为“有 Skill”示范，第 441 行明确 Mira Høst 为虚构北欧摄影师。页面中的工作年限、杂志发表、收藏、展览、地址与联系信息均为示范内容。生成模型、完整对话和迭代次数未记录。

归档主页面为固定提交中的 `demo/web-design-demo/demo2-with-skill.html`。来源的 [`demo/web-design-demo/demo2/index.html`](https://github.com/ConardLi/garden-skills/blob/2b9a89340b70f632d31c0f1c69fce94a7912423e/demo/web-design-demo/demo2/index.html) 是“林月”摄影作品集，内容不同，其生成条件未记录；本案例按单个示范页分析。

## 页面结构

正文自然纵向滚动，顶栏和两侧竖排标记保持固定。首屏为全幅摄影、五词主标题、作者介绍和拍摄元数据。后续依次是重点系列四图版面、六组作品目录、作者介绍与占位肖像、三种合作方式、三篇随笔、联系区与页脚。页面没有独立详情页、作品筛选、后台表单、音乐或主题切换。

专题、目录、作者、合作、随笔与联系均有编号眉题和细横线。来源把专题说明放在左侧粘性区域，右侧四幅图按六列网格分配 `4+2`、`2+4` 的宽度；作品目录把编号、标题、地点年份、图版数和箭头放在稳定列线上。

## 设计机制

以下参数来自固定提交源码。

| 维度 | 来源实现与作用 |
| --- | --- |
| 版式 | 首屏 `100dvh`；章节左右 `48px`，内部最大 `1320px`；专题和人物介绍用 `5fr 7fr`。大面积摄影与细元数据共处，后续章节用重复列线维持阅读秩序。 |
| 字体层级 | Instrument Serif 正体与斜体用于主张、章节题目和引用；Space Grotesk 的 300、400、500 字重用于正文与界面。首屏标题 `clamp(54px, 9.2vw, 156px)`，章节标题 `clamp(40px, 6vw, 86px)`；小字大字距承担编号和拍摄信息。 |
| 色彩 | 暖纸色 `#f2efe8`、浅纸色 `#e8e4d9`、墨色 `#161513`，以灰褐色 `#8a857d` 降低元数据对比。联系区和页脚反转为墨底纸白字。 |
| 摄影层 | 首图以 `object-fit: cover` 满幅裁切，局部渐变服务文字；内联 SVG 噪点叠加胶片纹理。14 个不同 URL 对应 10 张 Unsplash 源照片，同图不同尺寸分别使用。人物肖像是 CSS 渐变与斜线占位纹理。 |
| 固定标记 | 顶栏和两侧竖排标记采用 `mix-blend-mode: difference`，随经过的摄影、纸色与墨色背景改变显示关系；不是手动切换主题。 |
| 主体动效 | 首图加载后在 `1.6s` 内显现，以 `24s` 交替从 `scale(1.04)` 推进到 `scale(1.12)` 并轻移。标题逐词延迟上移，章节显现只触发一次。 |
| 局部交互 | 悬停目录行使标题右移 `8px`、箭头右移 `6px`，缩略图从透明与 `scale(.94)` 过渡至可见；专题和随笔封面以 `1.4s` 放大至 `1.04`。 |
| 窄屏 | `1100px` 以下隐藏目录缩略图和图版数；`900px` 以下章节改单列、左右 `22px`、取消粘性、隐藏目录地点与侧边标记；`540px` 以下顶栏仅保留作品和联系入口，首屏标题改为 `clamp(46px, 13vw, 80px)`。 |

[来源技能第 175–182 行](https://github.com/ConardLi/garden-skills/blob/2b9a89340b70f632d31c0f1c69fce94a7912423e/skills/web-design-engineer/SKILL.md#L175-L182) 提出视觉层级、对齐、色彩和字体控制等制作原则，可作为理解其设计取向的依据。

## 模块／状态矩阵

定位均相对来源 `demo2-with-skill.html`；主文件为 [本地 Demo](../../demos/cases/mira-host-photography/index.html)。源码说明与浏览器实测分开记录；实测条件和证据见复现范围。

| 模块／状态 | 来源定位 | 起始条件与触发 | 来源响应与先后 |
| --- | --- | --- | --- |
| 首屏加载与开场 | `.hero__img`、`.hero__title .word`，源码第 137–161、224–251、1252–1255 行 | 首次访问，首图完成加载 | 图片加 `loaded` 并显现；眉题、五词标题、作者和底部元数据按延迟进入；首图循环慢推镜 |
| 顶栏与竖排标记 | `.masthead`、`.rail`、章节锚点 | 页面滚动穿越深浅背景；点击导航 | 固定元素差值混合；有效章节链接平滑滚动 |
| 重点系列 | `#featured`、`.spread__copy`、`.spread__plates`、`.plate` | 进入视口；滚动；悬停图版／离开 | 标题与图组显现；桌面左侧粘性说明；图像放大后恢复；窄屏取消粘性并重排 |
| 六组作品目录 | `#works`、`.toc__row`、`.toc__thumb` | 进入视口；悬停某行／离开；激活链接 | 逐行显现；标题、箭头位移与缩略图进退；1100px 以下隐藏预览；链接为 `#` 占位 |
| 作者介绍 | `#studio`、`.studio__portrait`、`.studio__cv` | 滚动进入 | 左侧占位肖像、右侧引用／简介／履历，窄屏顺序重排 |
| 三种合作方式 | `#practice`、`.practice__col` | 滚动进入 | 三列正文和元数据错开显现；窄屏单列 |
| 三篇随笔 | `#journal`、`.journal__entry` | 进入视口；悬停封面／离开；激活链接 | 三列显现、封面放大后恢复；窄屏单列；链接为 `#` 占位 |
| 联系与页脚 | `#contact`、`.colophon` | 滚动进入；激活章节链接 | 墨底浅字联系区、邮箱链接、占位社交链接和页脚目录 |
| 一次性滚动显现 | `.reveal`、`.reveal-stagger`、脚本末段 | 元素进入视口 12%，下缘提前量为负 8% | 添加 `in` 后解除观察，不在返回时重复播放；组内子项依次错开 |
| 减少动态 | `@media (prefers-reduced-motion: reduce)`、`reduceMotion` | 以系统减少动态偏好加载 | 首图与提示线停循环，显现元素直接添加 `in`，过渡／动画缩短；平滑滚动逻辑仍保留 |

[本地对照与差异](../../demos/cases/mira-host-photography/fidelity.md)
