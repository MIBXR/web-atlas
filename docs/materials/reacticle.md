# Reacticle · 长文排版组件库

[来源、版本、许可与使用边界](../../entries/materials/reacticle.json)

Reacticle 是用于文章、报告和交互长文的 React 语义化组件库，提供 11 套有独立排版契约的主题。内容通过同一套组件表达，主题决定文字层级、网格、留白、图表与代码的视觉语言。

## 安装与取材

上游 README 指向的开始使用页提供安装命令 `npm install reacticle`，React 18.3 是 peer 依赖。本地样例使用上游 `src/` 与 `apps/site` 的报告组件和主题 CSS。先用公共入口 `ThemeProvider` 包裹文章，再组合 `Article`、`Hero`、`Section`、公式、代码、决策和媒体组件；自定义 `Raw` 内容继续使用 `--ra-*` 主题变量。

11 个独立入口位于 `demo/<样文 id>/`，复用原画廊的文章容器及原站 CSS，仅渲染对应文章。入口在模块加载前设置 `Prism.manual = true`，由原 React 组件逐行高亮，保留代码行容器与换行。样例索引按 `?demo=<id>` 选择样文后，直接打开对应静态页；每篇的 JS、CSS 与公式字体由 Vite 以相对路径构建，Google Fonts 使用 `fonts/` 中的共享本地文件。

## 11 套主题样文

| 主题 | 文章 | 风格 |
| --- | --- | --- |
| Tufte | [咖啡因与睡眠：一份关于半衰期的笔记](../../demos/materials/reacticle/index.html?demo=caffeine-half-life) | 数据墨水风格：克制衬线、充裕页边、发丝参考线与低装饰图表，让论点和证据承载视觉层级。 |
| Press | [活字之后](../../demos/materials/reacticle/index.html?demo=movable-type) | 出版书卷风格：暖纸与从容衬线，以线代框，保留数据墨水纪律，用更外放的字号和版式组织叙事。 |
| Shannon | [连接池耗尽：一次结算级联故障复盘](../../demos/materials/reacticle/index.html?demo=pool-exhaustion) | 暗色工程风格：温暖石墨底、暖白墨与琥珀信号色，围绕日志、代码、事件与决策组织可核查证据。 |
| Vignelli | [Orbit 设计系统 · 基础规范](../../demos/materials/reacticle/index.html?demo=orbit-spec) | 瑞士国际主义风格：冷中性纸面、无衬线字号层级、严密网格与一抹结构红，适合系统规范。 |
| Knuth | [以核特征映射线性化自注意力：一个复杂度视角](../../demos/materials/reacticle/index.html?demo=linear-attention) | 学术预印本风格：正式衬线、编号章节和图表、公式优先与密集引用，强调推导和可核查性。 |
| Freddie | [第一封 Newsletter：一份不端着的上手指南](../../demos/materials/reacticle/index.html?demo=first-newsletter) | 温暖人文风格：白纸黑墨与明黄荧光色块，俏皮衬线标题配干净无衬线正文，亲切且专业。 |
| Andy | [把呼吸放慢：盒式呼吸与平静的神经科学](../../demos/materials/reacticle/index.html?demo=slow-breathing) | 静谧人文风格：暖奶油纸、南瓜橙、暖灰墨与圆润字体，大圆角、柔和阴影和留白帮助放慢节奏。 |
| Bodoni | [头版的消亡](../../demos/materials/reacticle/index.html?demo=front-page) | 黑白报刊风格：纯白纸、真黑墨与发丝栏线，大字刊头、首字下沉和粗细双线建立印刷层级。 |
| Bayer | [形、色、网格：看得懂的视觉语法](../../demos/materials/reacticle/index.html?demo=geometry-of-meaning) | 包豪斯构成风格：暖纸黑墨，以红蓝黄三原色、几何无衬线、硬边与圆形数字组织清晰结构。 |
| Fuller | [限流器设计规格](../../demos/materials/reacticle/index.html?demo=rate-limiter-spec) | 工程蓝图风格：深蓝底、青白墨、制图青与淡方格网，搭配等宽标注、虚线分节和发丝拓扑。 |
| Sottsass | [撞色不翻车](../../demos/materials/reacticle/index.html?demo=color-clash) | 孟菲斯风格：奶油纸、黑墨与粉青黄蓝撞色，以硬投影、轻旋转、彩色药丸和几何彩屑制造节奏。 |

主题绑定与上游 `gallery.tsx` 完全一致。限流器文件名为 `RateLimiter.tsx`，实际组件导出为 `RateLimiterSpec`。样文保留原文、图形、公式、代码和交互；图库外壳中的官网导航、浮动返回信息和上一篇／下一篇不属于独立文章页面。

## 关联工作流

[beautiful-article](../../materials.html#material/beautiful-article) 提供来源整理、计划、写作、审阅、修复和交付流程，Reacticle 提供其中的组件与主题实现。主题写作资料见关联技能快照中的 `theme-profiles/`。

## 本地资源与可访问性

原站引入的 Newsreader、IBM Plex Sans、IBM Plex Mono、Source Serif 4、JetBrains Mono、Fraunces、Hanken Grotesk、Quicksand、Nunito、Playfair Display、Josefin Sans、Poppins 和 Space Grotesk 共 13 个字体家族、76 个 WOFF2 文件已本地化。保留原字重、样式与子集范围；中文继续使用原主题声明的系统字体回退。

文章内目录、按钮、滑块与展开内容沿用原实现。减少动态的处理沿用原站 CSS；呼吸练习保留原始开始／暂停和计时逻辑。组件、主题、11 篇报告与依赖配置归档在 [制作源码](../../demos/materials/reacticle/source/README.md)，依赖按原 lockfile 安装；对照结论与接入差异见 [fidelity.md](../../demos/materials/reacticle/fidelity.md)。

上游软件包声明保存在 `source/vendor/reacticle-package.json`，Google Fonts 原始 CSS 保存在 `source/vendor/fonts/google-fonts-original.css`。运行依赖与字体的许可原文见[许可索引](../../demos/materials/reacticle/LICENSES.md)。
