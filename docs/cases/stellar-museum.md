# 星槎 STELLAR：太空博物馆示范页与基线

本案例属于“示范作品”。主页面原文使用 STELLARIA／星海博物馆，基线使用星槎博物馆／STELLAR VOYAGER；主页面与基线各自保留来源文案。博物馆、馆藏、地址、未来任务、预约与订阅均作为示范内容保留。

## 生成方式与提示词

[来源 README 第 419 行](https://github.com/ConardLi/garden-skills/blob/2b9a89340b70f632d31c0f1c69fce94a7912423e/skills/web-design-engineer/README.zh-CN.md#L419) 声明这组页面使用相同提示词，在有 skill 和无 skill 条件下生成。[第 425–431 行](https://github.com/ConardLi/garden-skills/blob/2b9a89340b70f632d31c0f1c69fce94a7912423e/skills/web-design-engineer/README.zh-CN.md#L425-L431) 的表格分为无 skill 与有 skill 两列，因此 `baseline.html` 是**未使用 web-design-engineer skill 时的生成结果**。第 427 行表格路径多出 `demo2/` 一层，实际页面位置以固定提交中的文件为准。没有足够证据说明具体生成模型、生成次数、随机参数或人工编辑过程。

原始提示词见[第 423 行](https://github.com/ConardLi/garden-skills/blob/2b9a89340b70f632d31c0f1c69fce94a7912423e/skills/web-design-engineer/README.zh-CN.md#L423)。

条目的 `prompt` 照录该原文并注明出处。条目的负向约束由 Web Atlas 撰写。作者对两版品质的评价见来源 README。

## 页面结构与设计机制

主页面为自然滚动长页：固定导航与全屏首部 → 馆长寄语 → 四展厅 → 八节点编年史 → 预约说明与票券 → 联系、订阅与巨幅字标页脚。

- **版式**：来源 `.container` 最大宽度 1400px，横向间距 `clamp(24px, 5vw, 80px)`；展厅用 `80px 1fr 1.1fr` 的编号／文字／场景三列，列隙 48px。章节标题、说明、编号和细横线组织阅读节奏，960px 以下展厅转为单列。
- **字体层级**：Instrument Serif 负责展示字与斜体，Space Grotesk 负责段落和界面，JetBrains Mono 负责坐标、时间、编号与票券字段。主标题为 `clamp(60px, 11vw, 168px)`；中文沿原字体栈使用后备字形。
- **色彩**：`--ink: oklch(0.10 0.015 250)`、`--bone: oklch(0.94 0.012 80)`、`--ember: oklch(0.78 0.13 65)`、`--cosmic: oklch(0.66 0.085 220)` 分别用于背景、主要文字、强调和冷色标签。低亮度边框维持章节区分。
- **三维展示**：首部星球、月球和火星由球体几何与噪声着色器绘制；空间站由圆柱、盒体和球体组合；银河由 12000 个粒子及中心发光体组成。没有外部摄影、三维模型下载或声音依赖。所有场景使用 Three.js 0.160.0，本地完整保留其模块。
- **交互**：标题以 1.1 秒时长、0.12 秒交错延迟上移；展厅 hover 时改变留白、颜色、缩放与箭头位移。导航在 `scrollY > 60` 时改变表面，锚点滚动扣除 60px。IntersectionObserver 以 120px 外边距控制场景渲染。UTC 为浏览器时间；不是空间站或轨道接口。
- **主题与声音**：固定深色，不提供主题切换。源码没有音频、视频或声音播放流程。减少动态分支限制 CSS 动画并停止对象旋转与背景闪烁，但着色器时间、UTC 更新及平滑锚点仍保留；本地不另改设计。

这些数值来自固定提交源码，浏览器实际结果和对照证据见 [fidelity](../../demos/cases/stellar-museum/fidelity.md)。

## 与无 skill 基线逐项对照

| 维度 | 基线 `demo1.html` | 主页面 `demo1-with-skill.html` | 机制上的差别 |
| --- | --- | --- | --- |
| 结构 | 首部行动按钮与数字统计、四张网格展厅卡、左右交替时间线、预约表单、页脚 | 首部宣言、馆长寄语、四个横向展厅、单侧编年史、票券式 CTA、页脚订阅 | 主页面增加编辑式序列与馆长寄语，把展厅从卡片网格转为编号长行；基线保留可填写预约表单 |
| 字体 | Orbitron 标识与科技展示字、Noto Serif SC 中文、JetBrains Mono 元数据 | Instrument Serif 展示与斜体、Space Grotesk 界面、JetBrains Mono 元数据 | 三类字体职责更清楚地贯穿标题、段落和档案标签 |
| 色彩 | 青、紫、粉渐变与较多发光，硬编码 hex token | 深色 oklch 表面、暖白与小面积琥珀／冷蓝 | 主页面用较少的强调角色组织层级，基线以霓虹和光晕强化太空氛围 |
| 动效 | Canvas 闪烁与流星、CSS 星球轨道、滚动显现、卡片指针光斑；预约成功反馈 2400ms 后重置 | Three.js 星球／空间站／银河、标题上移、展厅 hover、导航表面、UTC 更新 | 从平面装饰和卡片反馈转向程序化场景与编辑行反馈；程序化场景使用示范数据 |
| 信息层级 | 大标题与 CTA／统计优先，四卡并置；年份左右交错 | 宣言与场景优先；编号、数据标签、年份和票券字段沿稳定对齐线阅读 | 主页面把阅读路径分为宣言、展品、编年史和访问；基线更集中于落地页行动入口 |

两版文本内容、年代、馆藏和机构设定各自独立，对照范围为同题页面机制。主页面的预约与导览按钮为 `href="#"`；基线表单成功与主页面订阅成功均只有前端状态，不与服务端连接。

## 模块与状态矩阵

下表按固定提交的主页面源码定位；浏览器对照结果见复现范围。

| 模块／状态 | 原站定位 | 起始条件与触发 | 源码定义的响应 |
| --- | --- | --- | --- |
| 首部入场 | `.hero-title .row span` | 首次加载 | 两行上移 1.1s，第二行延迟 0.12s |
| 首部三维构图 | `#hero-planet`、`reposeHero()` | 加载／容器尺寸变化 | 按五档宽高比调整位置与尺度，维持文字空间 |
| 背景星空与 UTC | `#stars`、`.hero-coords .live` | 首次加载／每帧／每秒 | 正弦闪烁、UTC 字符串更新 |
| 导航状态与锚点 | `#nav`、`a[href^="#"]` | 下滚超过 60px／返回／点击锚点 | 表面与边线变化；目标减 60px 平滑滚动 |
| 馆长寄语 | `#about .intro-grid` | 滚动到章节 | 标签／大段展示字／次级说明按网格呈现 |
| 四展厅静态与 hover | `#exhibits .exhibit` | 进入章节／指针进入与离开 | 三列行，padding 48→56px、图像 scale 1.02、箭头位移 8px；离开恢复 |
| 三维可见性 | `canvas.planet-canvas`、IntersectionObserver | 进入／离开视口外 120px 范围 | 只渲染被标记 visible 的场景 |
| 八节点编年史 | `#timeline .milestone` | 自然滚动 | 年份、轨道线、节点、标题、数据沿固定列阅读 |
| 预约票券 | `#reserve`、`.reserve-actions`、`.ticket` | 滚动到章节／点击 CTA | 票券为静态示范；按钮保留占位 href |
| 页脚与订阅 | `#archive`、`.newsletter` | 有效邮箱提交 | 阻止默认操作，按钮变为“已订阅” |
| 响应式 | 960／880／760／520px 媒体条件 | 缩小视口 | 展厅、票券、页脚逐级单列；导航链接隐藏但预约保留 |
| 减少动态 | CSS 与两个 `matchMedia` | 初始偏好为 reduce | 限制 CSS 动画；停止旋转与星空闪烁，仍更新 shader 时间和 UTC |
| 基线完整浏览与表单 | `baseline.html` 的 `.reveal`、`[data-card]`、`.booking-form` | 滚动／mousemove／填写提交 | 首次滚动显现；指针光斑；成功反馈后 2400ms 重置 |

[本地对照与差异](../../demos/cases/stellar-museum/fidelity.md)
