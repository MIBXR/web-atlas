# 星槎 STELLAR · 太空探索博物馆 · 复用 Prompt

由 [结构化案例](../../entries/cases/stellar-museum.json) 自动生成。参考观察与具体边界见 [调研](../../docs/cases/stellar-museum.md)。

## 正向 Prompt

帮我做一个'太空探索博物馆'的线上展览首页——全屏 Hero、4 个核心展览介绍、一个至少 6 个节点的时间线、参观预约 CTA、页脚。整体风格要沉浸感强、有宇宙的深邃感。

出处：来源仓库固定提交 2b9a89340b70f632d31c0f1c69fce94a7912423e 的 skills/web-design-engineer/README.zh-CN.md 第 423 行，原始生成提示词照录。

## 负向约束

复现本归档时，不改来源页面的设计、文案、结构、交互或占位业务；只把外链资源换为本地路径。虚构机构、馆藏、地址和未来事件不得作为现实事实。此处为 Web Atlas 的复现约束，非来源原始负向提示词。

## 制作约束

- 归档对象是 ConardLi/garden-skills 的固定提交 2b9a89340b70f632d31c0f1c69fce94a7912423e，不是真实博物馆官网。主页面原文自称 STELLARIA／星海博物馆，基线自称星槎博物馆；归档标题按任务命名，不修改页内文案。
- 主页面与基线均从固定提交 Git blob 复制，仅将 Google Fonts、preconnect 与 Three.js 外链替换为本地路径；逐项对应见 fidelity。HTML 内 CSS、JavaScript、占位链接及业务边界均保留来源。
- 主页面需要支持 importmap、ESM 与 WebGL 的静态 HTTP 环境；Three.js 0.160.0、字体及各自许可随包保留。没有外部图片、音频或视频素材。
- 来源的减少动态分支限制 CSS 动画、停止对象旋转与背景星空闪烁，着色器时间、UTC 和平滑锚点滚动仍保留。
- README 第 427 行文件路径多出 demo2/ 一层；归档依据实际存在的 demo/web-design-demo/demo1.html 与 demo1-with-skill.html。生成模型、运行次数及生成参数没有对应证据，不作补充推断。

## 检查方法

在同一视口下打开主页面与 baseline.html，逐项观察结构、字体职责、色彩、局部动效与信息层级；区分作者对照说明、源码数值和实际浏览器结果。

[查看 Demo](../../demos/cases/stellar-museum/index.html) · [返回案例库](../../cases.html#style/stellar-museum)
