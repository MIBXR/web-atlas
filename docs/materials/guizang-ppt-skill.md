# 歸藏 PPT Skill：阅读与使用资料

[结构化条目](../../entries/materials/guizang-ppt-skill.json) 提供固定版本、十步工作流、适用范围和作者效果图。

## 这是什么

歸藏的网页 PPT skill 提供两套风格：Style A「电子杂志 × 电子墨水」使用衬线标题和 WebGL 流体背景；Style B「瑞士国际主义」使用无衬线、网格、直角色块和单一强调色。两套模板都生成横向翻页的单文件 HTML，背景、导航、索引、动效与演讲者运行时内嵌在模板中。字体和图标在原模板中通过 CDN 加载，Motion 采用本地优先、CDN 后备。

## 怎么用

运行上游安装命令：

```sh
npx skills add https://github.com/op7418/guizang-ppt-skill --skill guizang-ppt-skill
```

也可把本库的 [完整快照](../../demos/materials/guizang-ppt-skill/README.md) 复制到 `.claude/skills/guizang-ppt-skill/`。触发语包括「帮我做一份杂志风 PPT」「帮我做一份瑞士风 PPT」和「生成一个 horizontal swipe deck」。

通过七个问题依次确定风格、受众与分享场景、时长、原始素材、图片或截图及处理方式、主题色、硬约束。已有完整大纲与图片处理要求时，SKILL.md 允许跳过澄清。Style A 复制 `assets/template.html`，Style B 复制 `assets/template-swiss.html`；从对应 `references/layouts*.md` 选择版式，填入 `SLIDES` 区，设置标题、稳定页面 ID 与演讲备注。

按 [checklist.md](../../demos/materials/guizang-ppt-skill/references/checklist.md) 自检，再从快照根目录运行：

```sh
node scripts/validate-presenter-mode.mjs path/to/index.html
node scripts/validate-swiss-deck.mjs path/to/index.html
```

第二条用于瑞士风；提供目标演讲时长时，第一条可加 `--target-minutes 30`。上游说明，瑞士风校验器在可解析 Playwright 时还会测量渲染边界、底部空白和标题间距。

## 两套风格怎么选

| 风格 | README 的适用内容 | 资料 |
| --- | --- | --- |
| Style A 电子杂志 × 电子墨水 | 叙事、观点、分享、个人风格表达；产品分析文档也可按叙事节奏组织 | [10 种版式](../../demos/materials/guizang-ppt-skill/references/layouts.md) · [5 套主题](../../demos/materials/guizang-ppt-skill/references/themes.md) |
| Style B 瑞士国际主义 | 事实、产品、分析、方法论；以锁定版式和网格组织信息 | [22 种登记版式](../../demos/materials/guizang-ppt-skill/references/layouts-swiss.md) · [4 套主题](../../demos/materials/guizang-ppt-skill/references/themes-swiss.md) |

主题规定字体与颜色，页面结构按对应版式确定。图片按素材角色和模板槽位确定比例；上游还提供截图画布背景、配图提示词与多平台封面流程。配图能力见结构化条目的 constraints。

## 演讲者模式

点击右下角 `P` 后，当前窗口进入演讲者视图，并打开独立观众窗口。演讲者能查看当前页、下一页、备注、计时与连接状态，打开内嵌宫格选页。页面 ID 与备注按 [presenter-mode.md](../../demos/materials/guizang-ppt-skill/references/presenter-mode.md) 对应；必填项为标题、目的、讲述要点和转场，`minutes` 记录计划时长，自动翻页另用 `autoAdvanceSeconds`。

`L` 激光笔、`C` 圈选、`B／W` 黑白屏、`F` 冻结观众屏。运行时通过窗口消息、BroadcastChannel 与 storage 同步页码和工具状态，显示连接状态并提供重新打开观众屏的入口。计时由用户开始；排练记录存储在本地浏览器，自动翻页默认关闭。

## 翻页与低功耗

两套模板都用 `←`／`→`、滚轮、触屏滑动和底部圆点横向翻页，`ESC` 打开缩略总览，`?slide=N` 直达指定页。页面入场动画由 `data-animate` 命名的 recipe 和 `data-anim` 元素角色决定，在翻页中段触发。

`B` 键把 WebGL 与 canvas 动画切为静态；系统减少动态时默认静态。帧率持续低于 25fps 时，背景先降分辨率，降到最低后冻结为静帧。

## 作者效果图

画廊保存上游 README 的效果图和 `assets/ppt-skill-showcase.png`。Style A、Style B 的拼图和九张主题图是静态截图。
