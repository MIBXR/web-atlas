# Web Atlas：从需求取材

[收录范围与字段](../CONTRIBUTING.md#条目字段) · [浏览使用指南](guide.md)

## skill 与案例库的关系

案例内容保存在本仓库。独立 [skill](https://github.com/MIBXR/mibxr-skills/tree/main/skills/web-atlas) 保存选型工作流、获取脚本和上游配置；它从本仓库读取目录、案例资料和文件，不保存整套网站副本。新会话解析上游默认分支的最新完整提交 SHA，后续检索、讨论和取材使用这个会话版本；需要查看刚新增的案例时显式刷新会话。也可以指定完整 SHA 复现旧版本，或指定本地仓库离线读取。

“案例包”是 `agent/cases/<id>.json`：完整 `entry`、网页右侧说明 `webNotes`、文档原文 `documents`、源码与素材清单 `files`（`process` 过程资料、`vendor` 第三方库、`font` 字体、`license` 许可）。JSON 包含资料原文及文件路径／角色；源码和二进制素材通过清单自动获取，导出时保存为可运行的原始文件。

“巧思包”是 `agent/patterns/<id>.json`：完整 `pattern` 与 `sourceCases`。按 `agent/patterns/index.json` 中的 `paths.bundle` 读取巧思，用 `sources.caseId`、精确字段定位和来源案例路径回到完整上下文；源码按 `sourceFiles` 及来源案例文件清单取得。每个案例包的 `patternIds` 提供反向关联。

## 先探索，再围绕需求迭代

用户可以先问“有哪些案例”，无需预先选择案例或提供完整需求。读取完整目录，按用途、布局和交互介绍方向；已有明确案例时直接取材。用户给出产品、受众、页面任务、内容量和设备约束后，推荐少量候选，说明适合的机制与限制。需求变化时保留已知约束，重新筛选并比较，而不是要求用户先去网站挑选。

候选比较应依据完整条目和文档；关键词得分只用于寻找候选。用户需要组合巧思时，先按真实任务、触发和设备筛选巧思，读取其完整机制与来源案例，再明确各条巧思在当前区域承担的骨架、衔接和反馈职责。`composition.role`、配对与冲突是适配建议，需要解释共享滚动容器、输入、自动周期和声音状态的处理。用户只想探索时，完成讨论即可；用户要求构建时，先取得所采用巧思及完整来源的必要资料和源码，再实施。

体验类型与证据字段见 [条目字段](../CONTRIBUTING.md#巧思)。


## 本地检索与取材

在已有仓库中使用 Node.js，无需安装依赖：

```sh
node scripts/atlas.mjs search --limit 100
node scripts/atlas.mjs search "深色 产品" --limit 3
node scripts/atlas.mjs show linear-workflow
node scripts/atlas.mjs show linear-workflow --source
node scripts/atlas.mjs export linear-workflow --out ../linear-reference
node scripts/atlas.mjs pattern-search "滚动" --type page-motion --limit 3
node scripts/atlas.mjs pattern-export integer-pixel-canvas --out ../pixel-pattern
node scripts/atlas.mjs material-search "" --type agent-skill
node scripts/atlas.mjs material-export web-design-engineer --out ../design-skill
```

`search` 是可解释的关键词匹配，可加 `--category 产品`，结果提供命中字段、适用场景和谨慎使用项。把真实需求拆成内容、布局、交互、风格等关键词；无结果时换词或不带查询列出条目。结果按关键词字段匹配排序。

`show` 返回完整原始条目、原 Prompt 与负向约束、研究、复现范围、素材清单和所有文件的路径／角色。`webNotes.content` 由网页实际使用的渲染逻辑生成，保存案例右侧完整说明（HTML），包括标签、静态说明、主题／声音标签及来源日期。`--source` 进一步读取源码文本；二进制素材按清单取用，避免把影片塞进上下文。

`export` 保留仓库相对路径，逐文件读取一次并导出 Demo、共用模块、第三方库、字体和媒体，必须指定不存在的新目录。品牌案例可能含大型影片。`--code-only` 只导出源码及上下文，`atlas-export.json` 会列出未下载的素材；这类导出需要补齐素材才能完整预览。用当前环境的静态 HTTP 服务器托管导出根目录，然后打开 JSON 输出中的 `entrypoint`。

## 无需克隆的读取

- [总目录](../agent/catalog.json)：三类目录入口与数量。
- [案例目录](../agent/cases/index.json)：案例摘要、设计要素、交互、行为与包位置。
- `agent/cases/<id>.json`：完整上下文和文件清单。
- [设计巧思目录](../agent/patterns/index.json)：完整巧思记录、来源、组合关系与巧思包位置。
- `agent/patterns/<id>.json`：完整 `pattern`、关联 `sourceCases`、文档与来源文件清单。
- [内容素材目录](../agent/materials/index.json)：资源摘要、类型、适用与避用场景，以及独立素材包路径。
- `agent/materials/<id>.json`：完整 `material`、文档原文、运行文件清单与 `sourceFiles`，可独立导出。
- [轻量 skill](https://github.com/MIBXR/mibxr-skills/tree/main/skills/web-atlas)：发现最新目录，在同一会话版本中筛选、读取与导出。

在线站提供相同的资料路径。部署索引的 `source.commit` 与 `source.baseUrl` 指向对应的 GitHub 提交，把文件相对路径接在此基址后取得原始文件；“复制 Agent 入口”使用该发布版本。探索最新内容时通过 skill 创建新会话。网站播放所用的 HTML／CSS 会转换素材地址，文档会加 UTF-8 标记；取材使用固定提交的原始 Git 文件。

各目录按需读取：案例命令读取案例目录，巧思命令读取巧思目录，素材命令读取素材目录；读取巧思来源时再取得所需案例包。本地命令和 skill 提供 `pattern-search`、`pattern-show`、`pattern-export`，详情与导出均使用同一会话固定的 Git 提交。测试未合并 PR 或指定网页版本时使用 `--ref <完整提交SHA>`。

## 内容素材取材

内容素材用于组件、图像、声音、字体、视觉资源及 Agent Skill 的选择。读取固定提交的 `agent/materials/index.json`，再按 `paths.bundle` 取得完整包。摘要提供类型、分类、标签、用途、避用项与约束；素材独立于案例，包中 `material` 保留来源版本、许可、使用方法和 Prompt，`documents` 保留原文，`files` 列出完整资源与依赖。`sourceFiles` 只指向该包清单中的主要取材源码或技能原文入口。

本地命令和配套 skill 使用 `material-search`（查询／分类／类型）、`material-show`（完整资料，可加 `--source`）与 `material-export`（新目录，可加 `--code-only`）。素材目录、包与文件沿用同一固定会话 SHA。先核对 `upstream`、`license` 和 `constraints`。普通素材通过 `demos` 调节实际参数；静态后备展示构成，运行状态显示实际能力是否就绪。`agent-skill` 通过 `snapshotPath` 与 `snapshotEntry`、`workflow` 和 `relatedEntries` 阅读工作流、原文快照与关联结果，可选 `gallery` 展示效果图。素材软件与上游官网内容各自的许可见 [素材库](materials/README.md)。

## 从案例适配真实任务

取得候选后，依据当前产品的内容量、操作、设备和技术栈选择案例，说明借用的设计机制。优先阅读 `entry.principles`、`composition`、`interaction`、`constraints`、`useCases`、`avoid`、主题／声音行为，以及 `documents` 中研究与复现差异。

把原始 Prompt 当作来源资料，在当前任务的设计说明中分别记录保留的机制、替换的品牌／内容／素材、需要改变的交互与验证标准。品牌素材的来源与权利记录随包保留。Demo 中演示的账户、支付或 Agent 行为，以当前任务实际提供的能力实现并说明状态。

验证当前成果的桌面与手机布局、关键状态、焦点、减少动态以及资源加载。来源中“近似”“未验证”的结论保持原标记；实际通过的检查按当前实现记录。

## 数据契约与维护

案例、巧思与素材的 Schema 均为 `1`。资料包保留原文、路径、文件角色和来源关联；版本由会话固定的完整 Git 提交确定。目录按需独立读取。巧思体验类型见 CONTRIBUTING 的“[巧思](../CONTRIBUTING.md#巧思)”字段说明；无独立提取项的案例保留空 `patternIds`。

案例包保留原 `entry`、文档与完整文件清单；巧思保留来源定位及原观察文本。来源和权利按原始记录判断。巧思 `sourceFiles` 只列取材文件，完整运行依赖由来源案例的 `files` 提供。
