window.ATLAS_MATERIALS = [
  {
    "id": "98-css",
    "title": "98.css · 复古桌面组件",
    "type": "component-library",
    "category": "组件与效果",
    "demo": "demos/materials/98-css/index.html",
    "preview": "previews/materials/98-css.png",
    "research": "docs/materials/98-css.md",
    "sourceFiles": [
      "demos/materials/98-css/index.html",
      "demos/materials/98-css/demo/demo.css",
      "demos/materials/98-css/demo/demo.js"
    ],
    "summary": "以真实 Windows 98 风格 CSS 组合设置窗口、可筛选素材目录与可暂停进度；保留复古边框，同时提高文字与触控可用性。",
    "install": "npm install 98.css@0.1.21",
    "demoNote": "原库提供 CSS，本地代码提供标签切换、筛选与模拟进度；不会修改系统或执行下载。",
    "tags": [
      "98.css",
      "Windows 98",
      "复古",
      "CSS",
      "桌面隐喻",
      "窗口",
      "表单",
      "目录",
      "进度条"
    ],
    "useCases": [
      "怀旧主题作品与小型展品",
      "私人档案或游戏道具目录",
      "带桌面隐喻的工具与教程"
    ],
    "avoid": [
      "以复古为理由使用过小文字和触控区域",
      "将 CSS 库当作完整操作系统或业务框架",
      "用模拟进度证明真实下载或安装完成"
    ],
    "constraints": [
      "固定 98.css 0.1.21；原库仅有 CSS，本地 JavaScript 实现行为。",
      "原库控件 11px 已在适配层提高为 14px，辅助信息不低于 12px；不以缩放还原旧屏幕。",
      "CSS 为 MIT；随包 MS Sans Serif 与 Bold 字体来自 lou，采用 CC BY-SA 3.0，需保留独立署名与许可。",
      "模拟进度每 240ms 增加 2% 为本地参数，不产生文件；真实任务必须接真实进度。",
      "页面隐藏或切换演示暂停，返回需用户继续；减少动态时手动步进。",
      "静态后备保留样式和说明；没有 JavaScript 时应用、筛选和演示计时不执行。"
    ],
    "upstream": {
      "repository": "jdan/98.css",
      "url": "https://github.com/jdan/98.css/tree/517d174b30392d39e068ef4eca457da66a189f8f",
      "commit": "517d174b30392d39e068ef4eca457da66a189f8f",
      "version": "0.1.21",
      "verifiedAt": "2026-10-16"
    },
    "license": {
      "name": "MIT（CSS） / CC BY-SA 3.0（字体）",
      "url": "https://github.com/jdan/98.css/blob/517d174b30392d39e068ef4eca457da66a189f8f/LICENSE",
      "scope": "Jordan Scales 的 CSS 为 MIT；lou 的 MS Sans Serif 与 Bold 字体为 CC BY-SA 3.0。",
      "notes": "CSS、字体保持原始字节，并分别保存原始许可及来源。字体不归入 MIT；再分发或修改字体按其独立条款处理。"
    },
    "sources": [
      {
        "title": "98.css 固定版本源码",
        "url": "https://github.com/jdan/98.css/tree/517d174b30392d39e068ef4eca457da66a189f8f",
        "note": "确认 CSS-only 架构、字体文件和许可边界。",
        "evidence": "source"
      },
      {
        "title": "98.css 官方组件文档",
        "url": "https://jdan.github.io/98.css/",
        "note": "浏览器确认原生复选框可选中；文档提供窗口、表格、状态栏、进度与语义要求。",
        "evidence": "observed"
      },
      {
        "title": "98.css 0.1.21 npm 元数据",
        "url": "https://registry.npmjs.org/98.css/0.1.21",
        "note": "确认稳定分发版本与完整 gitHead。",
        "evidence": "source"
      },
      {
        "title": "固定版本 CSS 参数",
        "url": "https://github.com/jdan/98.css/blob/517d174b30392d39e068ef4eca457da66a189f8f/style.css",
        "note": "默认 11px 控件、窗口与面板类名、分段进度；提高字号为本地适配。",
        "evidence": "source"
      },
      {
        "title": "MS Sans Serif 字体许可",
        "url": "https://github.com/jdan/98.css/blob/517d174b30392d39e068ef4eca457da66a189f8f/fonts/src/ms-sans-serif/license.txt",
        "note": "lou / FontStruct，CC BY-SA 3.0；独立于 CSS MIT。",
        "evidence": "source"
      },
      {
        "title": "MS Sans Serif Bold 字体许可",
        "url": "https://github.com/jdan/98.css/blob/517d174b30392d39e068ef4eca457da66a189f8f/fonts/src/ms-sans-serif-bold/license.txt",
        "note": "粗体的独立原始署名与许可。",
        "evidence": "source"
      }
    ],
    "demos": [
      {
        "id": "settings",
        "title": "设置窗口",
        "component": "window / title-bar / form / tabs",
        "summary": "在外观与选项间切换，应用桌面配色与留白并重置。",
        "entrypoint": "demos/materials/98-css/index.html?demo=settings",
        "parameters": [
          {
            "name": "桌面配色",
            "value": "青绿 / 蓝灰 / 紫红",
            "note": "三种色值为本地场景选择，不是上游主题 API。"
          },
          {
            "name": "显示说明 / 紧凑留白",
            "value": "原生 checkbox",
            "note": "使用原库表单样式，具体开关行为为本地组合。"
          }
        ]
      },
      {
        "id": "catalog",
        "title": "素材目录",
        "component": "sunken-panel / table / highlighted",
        "summary": "输入名称筛选三项示例，选中后查看用途并测试空结果。",
        "entrypoint": "demos/materials/98-css/index.html?demo=catalog",
        "parameters": [
          {
            "name": "filter",
            "value": "名称关键词",
            "note": "筛选为本地 JavaScript；官方仅提供输入与列表样式。"
          },
          {
            "name": "highlighted",
            "value": "选中行",
            "note": "官方表格选中样式，键盘条目按钮由本地提供。"
          }
        ]
      },
      {
        "id": "progress",
        "title": "传输进度",
        "component": "progress-indicator / segmented",
        "summary": "切换实心或分段进度，开始、暂停、单步、重置；不执行真实下载。",
        "entrypoint": "demos/materials/98-css/index.html?demo=progress",
        "parameters": [
          {
            "name": "value",
            "value": "0–100%",
            "note": "通过宽度表现官方进度样式；数值与 ARIA 同步为本地代码。"
          },
          {
            "name": "tick",
            "value": "240ms / +2%",
            "note": "本地演示计时，手动每步 10%；不是性能测量。"
          },
          {
            "name": "segmented",
            "value": "开启 / 关闭",
            "note": "原库分段进度类名。"
          }
        ]
      }
    ],
    "prompt": "使用固定版本 98.css 0.1.21，为当前任务构建一个有实际用途的复古设置窗口、素材目录或进度界面。使用原库 window、title-bar、status-bar、sunken-panel、table 和 progress-indicator 样式，行为由小量原生 JavaScript 实现。所有控件保留语义与可访问名称，标签键盘方向导航，最终文本至少 12px，扩大触控区域，窄屏自然重排，不缩小整个界面。真实任务连接真实进度；若使用教学模拟须明确标注，允许暂停、重置、手动前进，后台与减少动态时停下持续变化。保存 MIT CSS 与 CC BY-SA 3.0 字体的独立署名许可，自托管所需文件，提供静态后备。",
    "accessibility": {
      "keyboard": "原生按钮、输入、下拉与复选框；设置标签支持左右、Home、End；目录每行可用 Tab / Enter 选择。",
      "reducedMotion": "减少动态时进度改为手动步进；正常模式仅主动开始计时，隐藏页面或切换示例暂停，返回不会自动继续。"
    }
  },
  {
    "id": "arc-ui",
    "title": "Arc UI · React 动效组件库（免费部分）",
    "type": "component-library",
    "category": "组件与效果",
    "summary": "以可复制的 React / TypeScript 和 CSS Modules 提供日常控件、图表与完整区块。归档 120 个免费组件、22 个免费区块及共享设计与动效 tokens，八组中文样例运行真实上游代码。",
    "tags": [
      "React",
      "TypeScript",
      "Motion",
      "CSS Modules",
      "Radix UI",
      "shadcn",
      "MCP",
      "组件库",
      "形变",
      "图表"
    ],
    "demo": "demos/materials/arc-ui/index.html",
    "preview": "previews/materials/arc-ui.jpg",
    "research": "docs/materials/arc-ui.md",
    "demoNote": "组件逻辑和 CSS 保留原样；样例界面、中文文案、价格和图表数据为本库编写。只包含公开免费部分。",
    "install": "复制 source/upstream/ 中的组件与共享 tokens，保持 @/ 路径别名；本地样例已捆绑依赖。重建：进入 source/，运行 npm ci 与 npm run build。",
    "upstream": {
      "repository": "kuratlielia/arc-library",
      "url": "https://github.com/kuratlielia/arc-library",
      "commit": "df3a600fd9ffca85ec8607438b599a4408ab8562",
      "version": "提交 df3a600（package.json 为 0.0.0）",
      "verifiedAt": "2026-11-01"
    },
    "license": {
      "name": "MIT（免费组件与代码）；SIL OFL 1.1（字体）",
      "url": "https://github.com/kuratlielia/arc-library/blob/df3a600fd9ffca85ec8607438b599a4408ab8562/LICENSE",
      "scope": "免费 registry、lib、类型、文档与安装条目；不包含 Arc Pro 源码。",
      "notes": "保留上游 MIT、运行依赖许可和 Inter / Geist OFL 原文；网站品牌与 Pro 商业许可不随软件许可转移。"
    },
    "useCases": [
      "React 产品中的状态控件和微交互",
      "需要源码所有权与本地修改的界面",
      "以 CSS 语义 tokens 统一主题的组件组合",
      "通过 registry、CLI 或 Agent 取用组件的流程"
    ],
    "avoid": [
      "将其当作可直接引入的同名 npm 运行包",
      "在非 React 项目中只复制 CSS 来冒充组件行为",
      "把官网 Pro 目录或展示录像视为已归档的免费源码"
    ],
    "constraints": [
      "固定归档 df3a600 的 144 个 registry 条目：120 个 registry:ui、22 个 registry:block 和 2 个共享基础条目。",
      "上游要求 React 19、TypeScript 与 Next.js 或 Vite；本地以 React 19.3.0、Motion 13.4.0 和固定锁文件捆绑八组样例。",
      "source/upstream/ 的 registry、lib、types、public/r 与根使用说明保留原始结构和字节，未引入上游的维护检查脚本。",
      "样例数据、状态与操作仅作用于当前页面，不接入账户、支付或持久化服务。",
      "浏览器实测覆盖本地 Chromium 桌面和手机模拟宽度；上游其余组件可直接从完整源码取材。"
    ],
    "workflow": [
      "先从八组样例观察控件状态与动效，确定当前页面所需能力。",
      "在固定快照 registry.json 与 public/r/<名称>.json 中查看文件和依赖，再复制对应源码。",
      "接入 foundation.css 和 motion-tokens，设置 @/ 路径别名，保留组件内部相对结构。",
      "按真实业务替换 props、标签与数据；明暗主题、键盘和减少动态由目标页面一起管理。"
    ],
    "relatedEntries": [
      {
        "kind": "case",
        "id": "uiarc-platform",
        "note": "同一产品的官网设计作为案例；本素材提供可取用的免费组件源码。"
      }
    ],
    "sources": [
      {
        "title": "固定提交免费源码与 MIT 许可",
        "url": "https://github.com/kuratlielia/arc-library/tree/df3a600fd9ffca85ec8607438b599a4408ab8562",
        "note": "registry.json 中 120 个 UI 组件、22 个区块和 2 个基础条目；源码和安装条目均随本体保存。",
        "evidence": "source"
      },
      {
        "title": "官网组件目录",
        "url": "https://uiarc.dev/components/button",
        "note": "官网同时展示免费与 Pro，免费快照的范围以固定 registry 为准。",
        "evidence": "observed"
      },
      {
        "title": "Arc 许可说明",
        "url": "https://uiarc.dev/license",
        "note": "免费部分为 MIT；Pro 采用独立许可。",
        "evidence": "source"
      },
      {
        "title": "官网原始字体",
        "url": "https://uiarc.dev/",
        "note": "Inter：_next/static/media/6c596dfcddeca1e9-s.p.woff2；Geist：9ff55a8a9670220d-s.p.woff2。字体原件与 OFL 原文保存在 fonts/。",
        "evidence": "source"
      }
    ],
    "demos": [
      {
        "id": "buttons",
        "title": "按钮反馈",
        "component": "Button",
        "summary": "切换收藏与重置，比较主次与禁用状态。",
        "entrypoint": "demos/materials/arc-ui/index.html?demo=buttons",
        "parameters": [
          {
            "name": "variant",
            "value": "primary / secondary / ghost",
            "note": "上游按钮层级；对应收藏、重置和禁用示例。"
          }
        ]
      },
      {
        "id": "morph-select",
        "title": "形变选择器",
        "component": "MorphSelect",
        "summary": "选择四种工作方向，观察触发器和列表的形变。",
        "entrypoint": "demos/materials/arc-ui/index.html?demo=morph-select",
        "parameters": [
          {
            "name": "items / value",
            "value": "4 个选项；初始 design",
            "note": "工作方向为本地演示数据，选择后同步 value。"
          },
          {
            "name": "panelWidth",
            "value": "272px",
            "note": "沿用上游默认展开宽度。"
          }
        ]
      },
      {
        "id": "elastic-slider",
        "title": "弹性滑块",
        "component": "ElasticSlider",
        "summary": "拖动与键盘调节 0–100%，步长 5。",
        "entrypoint": "demos/materials/arc-ui/index.html?demo=elastic-slider",
        "parameters": [
          {
            "name": "min / max / step",
            "value": "0 / 100 / 5",
            "note": "本地样例范围；上游处理拖动、吸附与键盘。"
          },
          {
            "name": "marks",
            "value": "0、25、50、75、100",
            "note": "本地提供的离散刻度。"
          }
        ]
      },
      {
        "id": "tabs",
        "title": "标签切换",
        "component": "Tabs",
        "summary": "切换布局、动效与源码三个内容面板。",
        "entrypoint": "demos/materials/arc-ui/index.html?demo=tabs",
        "parameters": [
          {
            "name": "defaultValue",
            "value": "layout",
            "note": "初始布局面板；其余为 motion、source。"
          }
        ]
      },
      {
        "id": "billing",
        "title": "计费周期",
        "component": "BillingToggle / AnimatedCounter",
        "summary": "按月／按年更新示例价格与优惠。",
        "entrypoint": "demos/materials/arc-ui/index.html?demo=billing",
        "parameters": [
          {
            "name": "value",
            "value": "monthly / yearly",
            "note": "本地受控周期；示例月价分别为 ¥20 与 ¥16。"
          }
        ]
      },
      {
        "id": "chart",
        "title": "折线图",
        "component": "LineChart",
        "summary": "切换 7／14 天并控制两条系列显隐。",
        "entrypoint": "demos/materials/arc-ui/index.html?demo=chart",
        "parameters": [
          {
            "name": "data",
            "value": "7 / 14 天",
            "note": "本地固定示例序列，不读取外部数据。"
          },
          {
            "name": "series",
            "value": "本期 / 上期",
            "note": "复用稳定 key，图例控制系列显隐。"
          },
          {
            "name": "height",
            "value": "220px",
            "note": "本地绘图区高度，宽度跟随容器。"
          }
        ]
      },
      {
        "id": "dialog",
        "title": "对话框",
        "component": "Dialog",
        "summary": "打开、取消、确认与重置当前页面的归档状态。",
        "entrypoint": "demos/materials/arc-ui/index.html?demo=dialog",
        "parameters": [
          {
            "name": "title / description",
            "value": "归档确认与影响说明",
            "note": "中文内容由本地提供，焦点和 Escape 由上游处理。"
          }
        ]
      },
      {
        "id": "toast",
        "title": "通知堆叠",
        "component": "ToastStack",
        "summary": "添加、展开、撤回与清空短通知。",
        "entrypoint": "demos/materials/arc-ui/index.html?demo=toast",
        "parameters": [
          {
            "name": "contained / position",
            "value": "true / bottom-center",
            "note": "将原始通知堆叠限制在样例舞台内。"
          },
          {
            "name": "action",
            "value": "撤回",
            "note": "通过上游 update 原位改写通知为已撤回。"
          }
        ]
      }
    ],
    "sourceFiles": [
      "demos/materials/arc-ui/source/main.tsx",
      "demos/materials/arc-ui/source/build.mjs",
      "demos/materials/arc-ui/source/package.json",
      "demos/materials/arc-ui/source/package-lock.json",
      "demos/materials/arc-ui/source/upstream/registry.json",
      "demos/materials/arc-ui/source/upstream/registry/foundation.css",
      "demos/materials/arc-ui/source/upstream/lib/motion-tokens.ts"
    ],
    "accessibility": {
      "keyboard": "使用上游按钮、listbox、Radix 标签和对话框键盘模型；样例提供中文可见标签，滑块支持方向键/Home/End，通知支持聚焦与关闭。",
      "reducedMotion": "上游 useReducedMotion 遵循系统设置；样例的手动开关通过 MotionConfig 关闭位移，并关闭本地 CSS 过渡。"
    },
    "prompt": "在已有 React 页面中使用 Arc UI 免费组件。先读取固定源码、registry 安装条目、中文说明与运行样例，按任务选择 Button、MorphSelect、ElasticSlider、Tabs、BillingToggle、LineChart、Dialog 或 ToastStack。保留上游 TypeScript、CSS Modules、motion tokens 和键盘模型，接入 foundation.css，以语义变量切换明暗与强调色；只修改业务 props、数据和页面组合。保持按钮、输入和标签的可访问名称，尊重系统减少动态。源文件从 source/upstream/ 复制，依赖使用当前项目明确固定的版本，保留 MIT 与各运行依赖、字体许可。官网首页的布局应从独立案例取得，不把官网媒体当作组件实现。"
  },
  {
    "id": "beautiful-article",
    "title": "Beautiful Article · 长文编辑工作流",
    "type": "agent-skill",
    "category": "Agent 工作流",
    "summary": "把已有材料经抽取、编辑规划、主题确认、逐节生成和审阅，制作成基于 Reacticle 的可分享网页文章。",
    "install": "将 demos/materials/beautiful-article/ 复制到项目的技能目录并按所用 Agent 的发现方式启用；创作文章时按原文调用 scripts/scaffold.sh 创建 React、TypeScript 与 Vite 工作区。",
    "tags": [
      "长文排版",
      "编辑工作流",
      "Reacticle",
      "主题",
      "单文件 HTML",
      "信息保留"
    ],
    "useCases": [
      "把 URL、PDF、DOCX 或 Markdown 编辑成网页文章",
      "保留材料信息的长文归档",
      "制作解释文、教程、研究报告或审阅复盘",
      "需要主题一致的图文与交互式讲解"
    ],
    "avoid": [
      "没有材料或大纲却要求凭空生成完整内容",
      "后台、表单、拖拽工作台和完整仪表盘",
      "产品原型与通用网页应用",
      "未经用户确认就删减材料或选择交付形式"
    ],
    "constraints": [
      "本条目保存 garden-skills 固定提交中的技能原文、主题写作资料和脚手架，不直接运行技能或提供在线文章生成。",
      "技能默认保留完整信息；文章类型、信息保留比例、主题、宽度、配图与封面按原文的确认节点决定。",
      "11 份主题资料是给 Agent 阅读的写作指导，不是主题 CSS；对应运行时、组件和 11 篇样文见 Reacticle 素材。",
      "原文脚手架安装执行时的最新 reacticle 发布版；本库 Reacticle 样例另行固定提交，不能把二者当作同一次构建。",
      "脚手架的默认标题、正文和封面是占位内容，需要按文章材料完成；单文件 HTML 的构建形式不自动保证外链字体已离线化。",
      "原文快照保留原语言与相对链接；本条目不下载 README 中作者长文的外部效果图，也不声称复刻这些成品长文。"
    ],
    "upstream": {
      "repository": "ConardLi/garden-skills",
      "url": "https://github.com/ConardLi/garden-skills/tree/2b9a89340b70f632d31c0f1c69fce94a7912423e/skills/beautiful-article",
      "commit": "2b9a89340b70f632d31c0f1c69fce94a7912423e",
      "version": "0.1.0",
      "verifiedAt": "2026-10-27"
    },
    "license": {
      "name": "MIT",
      "url": "https://github.com/ConardLi/garden-skills/blob/2b9a89340b70f632d31c0f1c69fce94a7912423e/LICENSE",
      "scope": "garden-skills 仓库内的技能文本、主题写作资料、脚本与工程模板；根 LICENSE 原样附在快照目录。",
      "notes": "保留 MIT 版权与许可文本。Reacticle 的运行时代码与字体各按该素材的许可记录使用；README 链接的外部文章、配图与字体不因技能的 MIT 许可而获得再分发许可。"
    },
    "sources": [
      {
        "title": "Beautiful Article 技能原文",
        "url": "https://github.com/ConardLi/garden-skills/blob/2b9a89340b70f632d31c0f1c69fce94a7912423e/skills/beautiful-article/SKILL.md",
        "note": "材料抽取、编辑规划、三次确认、首屏与逐节生成、终审和交付的直接依据。",
        "evidence": "source"
      },
      {
        "title": "技能说明与 Reacticle 分层",
        "url": "https://github.com/ConardLi/garden-skills/blob/2b9a89340b70f632d31c0f1c69fce94a7912423e/skills/beautiful-article/README.md",
        "note": "区分技能的编辑方法与 Reacticle 的组件、主题及运行时；作者展示的成品长文与本库主题样文分别记录。",
        "evidence": "source"
      },
      {
        "title": "主题写作资料索引",
        "url": "https://github.com/ConardLi/garden-skills/blob/2b9a89340b70f632d31c0f1c69fce94a7912423e/skills/beautiful-article/theme-profiles/index.json",
        "note": "11 份主题写作资料与运行时主题标识的对应依据。",
        "evidence": "source"
      },
      {
        "title": "技能版本声明",
        "url": "https://github.com/ConardLi/garden-skills/blob/2b9a89340b70f632d31c0f1c69fce94a7912423e/skills/beautiful-article/manifest.json",
        "note": "固定提交声明版本为 0.1.0；技能兼容声明不作为逐宿主运行实测。",
        "evidence": "source"
      }
    ],
    "snapshotPath": "demos/materials/beautiful-article/",
    "snapshotEntry": "SKILL.md",
    "workflow": [
      "确认目标是文章，收集源材料、目标语言和初步文章类型；将材料抽取成 Markdown，记录不确定项并检查抽取完整性。",
      "规划简报、大纲、主题与素材；按文章类型确定信息保留比例，默认保留完整信息。",
      "逐项请用户确认文章类型、主题、版式宽度、配图模式和封面。",
      "创建文章工程，制作封面、首屏、第一节和代表性视觉块，独立审阅后请用户确认首版与后续开发模式。",
      "用 Reacticle 语义组件和主题约束的自由图文层逐节完成文章，每节独立文件并审阅。",
      "从编辑、视觉和技术三个视角终审，按最小范围修复，避免为局部问题重写整篇。",
      "请用户确认交付形式后导出单文件 HTML；仅在用户选择时另行导出 PDF，并附简短编辑说明。"
    ],
    "relatedEntries": [
      {
        "kind": "material",
        "id": "reacticle",
        "note": "skill 的 11 套主题由 Reacticle 实现，11 篇样文就在 Reacticle 的样例里；技能保存写作指导，组件库提供运行时。"
      }
    ],
    "prompt": "先阅读 demos/materials/beautiful-article/SKILL.md，用我提供的材料制作网页文章。抽取材料并记录不确定项，提出编辑规划，逐项确认文章类型与信息保留、主题、宽度、配图和封面。先做首屏与第一节，确认后按节生成完整文章，保持文章阅读形态并使用 Reacticle 主题令牌。审阅和修复后再确认交付形式。主题选择可先打开 Reacticle 素材的 11 篇实际样文比较排版语言；未经确认不替我删减信息或导出 PDF。",
    "accessibility": {
      "keyboard": "技能条目通过真实链接进入原文与 Reacticle 样例；创作文章时保留语义结构、可读目录，以及控件的键盘与焦点操作。",
      "reducedMotion": "本资源为工作流与文本快照，没有自动播放的演示；文章内自由图文层若带动效，需要在技术终审中检查移动端与可访问性。"
    },
    "preview": "previews/materials/beautiful-article.png",
    "research": "docs/materials/beautiful-article.md",
    "sourceFiles": [
      "demos/materials/beautiful-article/SKILL.md",
      "demos/materials/beautiful-article/README.md"
    ]
  },
  {
    "id": "material-web",
    "title": "Google Material Web · Material 3 官方组件",
    "type": "component-library",
    "category": "组件与效果",
    "summary": "Google Material Design 的官方 Web Components 实现：用色彩角色、圆角、浮动标签和状态层，体验操作层级、表单验证、偏好设置与确认对话框。",
    "install": "npm install @material/web@2.5.0；本地 Demo 已捆绑运行依赖，直接以 HTTP/HTTPS 打开。",
    "demoNote": "四套原创业务组合使用真实官方组件，可调配色、明暗与按钮圆角。库处于维护模式，不代表完整 Material 3 Expressive；输入和状态仅留在当前页面。",
    "tags": [
      "Google",
      "Google Material Design",
      "Material Design",
      "Material 3",
      "Material Web",
      "Web Components",
      "Lit",
      "设计系统",
      "浮动标签",
      "色彩角色",
      "表单",
      "对话框"
    ],
    "useCases": [
      "有明确主次操作的产品工具",
      "需要持续显示字段含义的表单",
      "有即时结果预览的偏好面板",
      "需要确认与撤回路径的任务流程",
      "希望以 CSS tokens 统一色彩与形状的原生 Web 页面"
    ],
    "avoid": [
      "把本版本当作完整 Material 3 Expressive 实现",
      "依赖持续新增组件或官方快速响应的长期路线",
      "仅为套用外观而丢弃现有网站的信息结构",
      "需要旧浏览器而不准备原生 DOM 后备的关键流程"
    ],
    "constraints": [
      "固定 @material/web 2.5.0；官方 README 在核验时仍标注维护模式、等待新维护者。",
      "官方是 Web Components/Lit 实现，不等同于 Angular Material 或 MUI；本条目不覆盖整个 Material Design 规范。",
      "本地 vendor 合并了所选官方组件、CSS-in-JS 及 Lit/tslib 依赖，保留许可和锁文件；更换版本须重新核验 API 与 Shadow DOM 适配。",
      "以 HTTP/HTTPS 提供 ES module；模块失败时仅显示明确标注的静态说明，不声称真实组件已运行。",
      "配色、4–28px 圆角范围、中文内容与四种业务组合为本地原创演示，未接入服务端、持久化或真实账户。",
      "系统减少动态或手动选择时关闭局部过渡和 ripple，dialog 使用 quick；滑块值标签取消缩放过渡以保持文字至少12px；无持续动画或后台计时器。",
      "实际浏览器验证限定于 Chromium 桌面及390px窄屏；Safari、Firefox、真实触屏与屏幕阅读器仍需目标项目验证。"
    ],
    "upstream": {
      "repository": "material-components/material-web",
      "url": "https://github.com/material-components/material-web",
      "commit": "b4de401eb665ec63474f39319a4ba8f2145974cc",
      "version": "2.5.0",
      "verifiedAt": "2026-10-16"
    },
    "license": {
      "name": "Apache-2.0（Material Web）；BSD-3-Clause / 0BSD（运行依赖）",
      "url": "https://github.com/material-components/material-web/blob/b4de401eb665ec63474f39319a4ba8f2145974cc/LICENSE",
      "scope": "@material/web 软件代码及所选官方组件；Lit 系列和 tslib 的许可随运行包分别保留。",
      "notes": "保留 vendor 中全部 LICENSE 文件、版权声明、行内许可和来源记录。合并/压缩是本地转换；品牌标志、官网内容及 Google 商标不因软件许可自动成为可自由使用资产。本地插图为原创 SVG。"
    },
    "sources": [
      {
        "title": "Google Material Web 固定版本仓库",
        "url": "https://github.com/material-components/material-web/tree/b4de401eb665ec63474f39319a4ba8f2145974cc",
        "note": "官方 Web Components 实现、Material 3 定位与源码；不将其和同名设计案例或第三方 MUI 混同。",
        "evidence": "source"
      },
      {
        "title": "@material/web 2.5.0 npm 元数据",
        "url": "https://registry.npmjs.org/@material/web/2.5.0",
        "note": "版本、gitHead、依赖范围、官方 tarball 与 integrity。核验时 latest 为2.5.0。",
        "evidence": "source"
      },
      {
        "title": "官方维护模式公告",
        "url": "https://github.com/material-components/material-web/discussions/5642",
        "note": "官方 README 当前仍指向此公告；选型时需独立评估维护能力，不推断未来支持计划。",
        "evidence": "source"
      },
      {
        "title": "按钮文档与实际交互样例",
        "url": "https://material-web.dev/components/button/",
        "note": "读取五种按钮层级、SVG icon slot、disabled及形状token；浏览器打开官方stories并点击真实按钮。本地计划卡不是官网样例复刻。",
        "evidence": "observed"
      },
      {
        "title": "文本框与验证接口",
        "url": "https://material-web.dev/components/text-field/",
        "note": "required、type=email、maxlength、checkValidity、error和errorText；本地校验流程与中文错误文案为原创组合。",
        "evidence": "source"
      },
      {
        "title": "开关接口",
        "url": "https://material-web.dev/components/switch/",
        "note": "selected、icons、change及aria-label用法；本地完成标记用途为演示选择。",
        "evidence": "source"
      },
      {
        "title": "滑块接口",
        "url": "https://material-web.dev/components/slider/",
        "note": "min、max、step、value、ticks和labeled；1–8范围与每日目标用途为本地选择。",
        "evidence": "source"
      },
      {
        "title": "对话框接口与可访问性",
        "url": "https://material-web.dev/components/dialog/",
        "note": "show、close、returnValue、closed及quick；按归档/取消区分结果，关闭后等待Lit更新再恢复焦点。",
        "evidence": "source"
      },
      {
        "title": "官方 Material Theming",
        "url": "https://material-web.dev/theming/material-theming/",
        "note": "系统颜色与组件形状token的层级；官方未支持通用md-sys-motion token，本地减少动态另外处理。",
        "evidence": "source"
      },
      {
        "title": "固定版本浏览器支持声明",
        "url": "https://github.com/material-components/material-web/blob/b4de401eb665ec63474f39319a4ba8f2145974cc/docs/support.md",
        "note": "上游支持目标为Chrome/Edge120+、Firefox119+、Safari16.4+；这是官方声明，不等于本次跨浏览器实测。",
        "evidence": "source"
      }
    ],
    "demos": [
      {
        "id": "actions",
        "title": "操作层级",
        "component": "MdFilledButton / MdOutlinedButton / MdTextButton",
        "summary": "对比填充、描边与文字操作；添加后禁用主要按钮，查看安排保留次要层级，重置可重复体验。",
        "entrypoint": "demos/materials/material-web/index.html?sample=actions",
        "parameters": [
          {
            "name": "--md-*-button-container-shape",
            "value": "4–28px，步长2px",
            "note": "接口见官方按钮tokens；本地调节filled、filled-tonal和outlined的container-shape，范围/默认20px为演示选择。"
          },
          {
            "name": "--md-sys-color-*",
            "value": "鸢尾紫 / 深海绿 × 浅色 / 深色",
            "note": "使用官方颜色角色；演示配色与主题控件为本地选择，并可跟随Atlas主题。"
          },
          {
            "name": "disabled",
            "value": "加入计划后true；重置后false",
            "note": "官方布尔属性；本地用于防止重复添加。"
          }
        ]
      },
      {
        "id": "form",
        "title": "表单验证",
        "component": "MdOutlinedTextField",
        "summary": "保留浮动标签，比较空值、无效邮箱与校验通过；输入只在内存中，不发送或保存。",
        "entrypoint": "demos/materials/material-web/index.html?sample=form",
        "parameters": [
          {
            "name": "required / type / maxlength",
            "value": "名称必填且最多24字符；邮箱必填且type=email",
            "note": "接口来自官方文本框文档；24字符业务限制为本地演示值。"
          },
          {
            "name": "checkValidity / error / errorText",
            "value": "检查资料后显示错误或成功状态",
            "note": "使用上游校验接口，手动错误消息由当前业务流程提供。"
          }
        ]
      },
      {
        "id": "preferences",
        "title": "偏好设置",
        "component": "MdSwitch / MdSlider",
        "summary": "开关控制预览中的完成标记，离散滑块控制目标数量；支持键盘方向键、Home/End和触摸。",
        "entrypoint": "demos/materials/material-web/index.html?sample=preferences",
        "parameters": [
          {
            "name": "selected",
            "value": "true / false",
            "note": "官方switch状态，change后读取；本地对应完成标记显隐。"
          },
          {
            "name": "min / max / step / value",
            "value": "1 / 8 / 1 / 4",
            "note": "官方slider接口；所有数值为每日目标示例的本地选择。"
          },
          {
            "name": "labeled / ticks",
            "value": "true",
            "note": "官方离散刻度与值标签；本地取消标签缩放过渡，固定12px显示。"
          }
        ]
      },
      {
        "id": "dialog",
        "title": "确认对话框",
        "component": "MdDialog / MdFilledTonalButton",
        "summary": "打开确认、取消/Escape返回、确认归档和恢复计划；关注局部状态、焦点与撤回路径。",
        "entrypoint": "demos/materials/material-web/index.html?sample=dialog",
        "parameters": [
          {
            "name": "type",
            "value": "alert",
            "note": "官方针对需要用户响应的重要确认的类型；本地说明可撤回影响。"
          },
          {
            "name": "returnValue",
            "value": "archive / cancel / 空值",
            "note": "通过官方close(value)区分本地结果，Escape作为取消处理。"
          },
          {
            "name": "quick",
            "value": "减少动态或页面隐藏时true",
            "note": "官方跳过打开/关闭动画的布尔属性。"
          }
        ]
      }
    ],
    "prompt": "在已有HTML/CSS/JavaScript页面中使用Google官方@material/web 2.5.0，先读取Material Web素材包的来源、维护模式边界、许可、四种样例与依赖锁定记录。依据页面任务选择操作层级、带验证的文本框、switch/slider偏好面板或确认对话框，不复制示例业务文案。沿用当前页面导航与布局，用官方CSS系统颜色角色和组件形状token统一主题。提供真实标签、SVG功能图标、错误纠正、取消/Escape与关闭后焦点返回；所有文本包括Shadow DOM浮动标签及slider值标签在实际渲染中至少12px，取消会缩小文字的过渡。模块失败显示标注的静态后备；系统减少动态或手动减少时关闭局部过渡/ripple，dialog使用quick，页面隐藏时停止当前短动画。保持输入本地或明确接入当前项目的真实提交逻辑，不宣称示例已联网保存。保留Apache-2.0、Lit BSD-3-Clause、tslib 0BSD及转换说明；通过HTTP运行并检查桌面、窄屏、键盘、触摸和资源加载。",
    "accessibility": {
      "keyboard": "原生按钮切换样例，真实官方组件处理Tab、Enter/Space、滑块方向键/Home/End与Escape。所有输入和开关有标签，错误状态同步可见消息；对话框关闭后等待触发按钮渲染完成再恢复焦点。",
      "reducedMotion": "遵循prefers-reduced-motion，并提供手动减少动效。以本地Shadow DOM样式关闭过渡、禁用ripple、dialog.quick跳过开关动画；slider值标签不使用缩放过渡。无自动循环、音频或计时器，隐藏页面结束当前短动画。"
    },
    "demo": "demos/materials/material-web/index.html",
    "preview": "previews/materials/material-web.png",
    "research": "docs/materials/material-web.md",
    "sourceFiles": [
      "demos/materials/material-web/index.html",
      "demos/materials/material-web/demo/demo.css",
      "demos/materials/material-web/demo/demo.js",
      "demos/materials/material-web/source/vendor/components.mjs"
    ]
  },
  {
    "id": "reacticle",
    "title": "Reacticle · 长文排版组件库",
    "type": "component-library",
    "category": "组件与效果",
    "summary": "一套用于 React 长文的语义化组件，配有 11 套主题，让同一份内容切换为不同的排版语言。",
    "install": "npm install reacticle",
    "demoNote": "11 篇样文分别绑定原画廊主题，保留原文、图表与全部文章交互；每项打开一篇独立静态页面。",
    "tags": [
      "React",
      "长文排版",
      "主题",
      "文章",
      "报告",
      "交互图表",
      "语义化组件",
      "beautiful-article"
    ],
    "useCases": [
      "数据笔记与分析报告",
      "技术解释、故障复盘与系统设计",
      "出版随笔、媒介特稿与产品上手指南",
      "带交互图形的长文与教学文章"
    ],
    "avoid": [
      "用文章组件搭建复杂后台或完整应用",
      "只更换颜色却忽略各主题的排版契约",
      "把画廊中的样文结论当作独立核验后的事实"
    ],
    "constraints": [
      "固定 Reacticle 0.2.6 源码提交 dcfc4baf386bbc220cd1aa6274bed3b741108465；React 18.3 是上游声明的 peer 依赖，样例使用固定 lockfile 安装结果。",
      "每篇严格采用 apps/site/src/data/gallery.tsx 中的报告与主题组合；RateLimiter.tsx 导出的组件名为 RateLimiterSpec，11 个主题对应关系与任务表一致。",
      "组件、文章与主题 CSS 不作修改；独立入口保留原画廊文章容器及原站 CSS，省略官网导航、浮动返回标签与上一篇／下一篇。入口禁用 Prism 自动全页扫描，由原 React 组件保留逐行代码高亮。",
      "原站 13 个 Google Fonts 家族的 76 个 WOFF2 文件已本地化并附 OFL；中文沿用原主题的系统字体回退，不增加官网没有的中文网络字体。",
      "通过 HTTP/HTTPS 打开样例目录，JS、CSS、公式字体与本地化字体均使用相对路径；文章外链保留原作指向。",
      "原始 package.json 声明 MIT，但该固定提交的仓库内没有 LICENSE 文件；许可声明与实际缺失情况同时记录，不虚构上游许可文本。",
      "样文原文保持原样；主题风格说明为中文概括，依据 garden-skills 固定提交的 theme-profiles。",
      "样文中的交互、阅读辅助与动态行为沿用上游实现；source/ 归档公共组件、主题、11 篇报告、最小入口及原依赖配置，依赖按上游 lockfile 安装；逐篇对照结论见 fidelity.md。"
    ],
    "upstream": {
      "repository": "ConardLi/reacticle",
      "url": "https://github.com/ConardLi/reacticle",
      "commit": "dcfc4baf386bbc220cd1aa6274bed3b741108465",
      "version": "0.2.6",
      "verifiedAt": "2026-10-27"
    },
    "license": {
      "name": "MIT（package.json 声明）；字体 OFL 1.1",
      "url": "https://github.com/ConardLi/reacticle/blob/dcfc4baf386bbc220cd1aa6274bed3b741108465/package.json",
      "scope": "Reacticle 软件与文章实现按作者 package.json 的 MIT 声明记录；React 等运行依赖保留各自 MIT 许可，Google Fonts 与 KaTeX 公式字体保留 OFL 1.1。",
      "notes": "该固定提交的仓库内没有 LICENSE 文件；vendor 保存原始 package.json、许可声明记录、运行依赖 MIT 及逐家族字体 OFL。本库用于个人非商业学习，原文与署名保留。"
    },
    "sources": [
      {
        "title": "Reacticle 固定提交与安装说明",
        "url": "https://github.com/ConardLi/reacticle/tree/dcfc4baf386bbc220cd1aa6274bed3b741108465",
        "note": "读取 README、package.json、库组件、主题 CSS 与 lockfile，按原源码构建。",
        "evidence": "source"
      },
      {
        "title": "11 篇画廊文章与主题绑定",
        "url": "https://github.com/ConardLi/reacticle/blob/dcfc4baf386bbc220cd1aa6274bed3b741108465/apps/site/src/data/gallery.tsx",
        "note": "逐篇核对 slug、标题、主题与实际报告导出名，入口复用 GalleryReader 的文章容器。",
        "evidence": "source"
      },
      {
        "title": "Reacticle 在线画廊",
        "url": "https://rearticle.mmh1.top/#/gallery",
        "note": "作者公开画廊；本条目展示固定源码中的 11 篇主题样文。",
        "evidence": "source"
      },
      {
        "title": "beautiful-article 主题定位",
        "url": "https://github.com/ConardLi/garden-skills/tree/2b9a89340b70f632d31c0f1c69fce94a7912423e/skills/beautiful-article/theme-profiles",
        "note": "中文风格说明概括各主题 profile 的定位，固定 garden-skills 提交。",
        "evidence": "source"
      },
      {
        "title": "原站字体声明",
        "url": "https://github.com/ConardLi/reacticle/blob/dcfc4baf386bbc220cd1aa6274bed3b741108465/apps/site/index.html",
        "note": "本地化相同 Google Fonts 请求中的全部字体资源；字体声明、字重及子集保持一致。",
        "evidence": "source"
      }
    ],
    "demos": [
      {
        "id": "caffeine-half-life",
        "title": "Tufte · 咖啡因与睡眠：一份关于半衰期的笔记",
        "component": "CaffeineHalfLife",
        "summary": "数据墨水风格：克制衬线、充裕页边、发丝参考线与低装饰图表，让论点和证据承载视觉层级。",
        "entrypoint": "demos/materials/reacticle/index.html?demo=caffeine-half-life",
        "parameters": [
          {
            "name": "主题",
            "value": "tufte",
            "note": "固定为原画廊对此文章的绑定；样文内部交互沿用原报告。"
          }
        ]
      },
      {
        "id": "movable-type",
        "title": "Press · 活字之后",
        "component": "MovableType",
        "summary": "出版书卷风格：暖纸与从容衬线，以线代框，保留数据墨水纪律，用更外放的字号和版式组织叙事。",
        "entrypoint": "demos/materials/reacticle/index.html?demo=movable-type",
        "parameters": [
          {
            "name": "主题",
            "value": "press",
            "note": "固定为原画廊对此文章的绑定；样文内部交互沿用原报告。"
          }
        ]
      },
      {
        "id": "pool-exhaustion",
        "title": "Shannon · 连接池耗尽：一次结算级联故障复盘",
        "component": "PoolExhaustion",
        "summary": "暗色工程风格：温暖石墨底、暖白墨与琥珀信号色，围绕日志、代码、事件与决策组织可核查证据。",
        "entrypoint": "demos/materials/reacticle/index.html?demo=pool-exhaustion",
        "parameters": [
          {
            "name": "主题",
            "value": "shannon",
            "note": "固定为原画廊对此文章的绑定；样文内部交互沿用原报告。"
          }
        ]
      },
      {
        "id": "orbit-spec",
        "title": "Vignelli · Orbit 设计系统 · 基础规范",
        "component": "OrbitSpec",
        "summary": "瑞士国际主义风格：冷中性纸面、无衬线字号层级、严密网格与一抹结构红，适合系统规范。",
        "entrypoint": "demos/materials/reacticle/index.html?demo=orbit-spec",
        "parameters": [
          {
            "name": "主题",
            "value": "vignelli",
            "note": "固定为原画廊对此文章的绑定；样文内部交互沿用原报告。"
          }
        ]
      },
      {
        "id": "linear-attention",
        "title": "Knuth · 以核特征映射线性化自注意力：一个复杂度视角",
        "component": "LinearAttention",
        "summary": "学术预印本风格：正式衬线、编号章节和图表、公式优先与密集引用，强调推导和可核查性。",
        "entrypoint": "demos/materials/reacticle/index.html?demo=linear-attention",
        "parameters": [
          {
            "name": "主题",
            "value": "knuth",
            "note": "固定为原画廊对此文章的绑定；样文内部交互沿用原报告。"
          }
        ]
      },
      {
        "id": "first-newsletter",
        "title": "Freddie · 第一封 Newsletter：一份不端着的上手指南",
        "component": "FirstNewsletter",
        "summary": "温暖人文风格：白纸黑墨与明黄荧光色块，俏皮衬线标题配干净无衬线正文，亲切且专业。",
        "entrypoint": "demos/materials/reacticle/index.html?demo=first-newsletter",
        "parameters": [
          {
            "name": "主题",
            "value": "freddie",
            "note": "固定为原画廊对此文章的绑定；样文内部交互沿用原报告。"
          }
        ]
      },
      {
        "id": "slow-breathing",
        "title": "Andy · 把呼吸放慢：盒式呼吸与平静的神经科学",
        "component": "SlowBreathing",
        "summary": "静谧人文风格：暖奶油纸、南瓜橙、暖灰墨与圆润字体，大圆角、柔和阴影和留白帮助放慢节奏。",
        "entrypoint": "demos/materials/reacticle/index.html?demo=slow-breathing",
        "parameters": [
          {
            "name": "主题",
            "value": "andy",
            "note": "固定为原画廊对此文章的绑定；样文内部交互沿用原报告。"
          }
        ]
      },
      {
        "id": "front-page",
        "title": "Bodoni · 头版的消亡",
        "component": "FrontPage",
        "summary": "黑白报刊风格：纯白纸、真黑墨与发丝栏线，大字刊头、首字下沉和粗细双线建立印刷层级。",
        "entrypoint": "demos/materials/reacticle/index.html?demo=front-page",
        "parameters": [
          {
            "name": "主题",
            "value": "bodoni",
            "note": "固定为原画廊对此文章的绑定；样文内部交互沿用原报告。"
          }
        ]
      },
      {
        "id": "geometry-of-meaning",
        "title": "Bayer · 形、色、网格：看得懂的视觉语法",
        "component": "GeometryOfMeaning",
        "summary": "包豪斯构成风格：暖纸黑墨，以红蓝黄三原色、几何无衬线、硬边与圆形数字组织清晰结构。",
        "entrypoint": "demos/materials/reacticle/index.html?demo=geometry-of-meaning",
        "parameters": [
          {
            "name": "主题",
            "value": "bayer",
            "note": "固定为原画廊对此文章的绑定；样文内部交互沿用原报告。"
          }
        ]
      },
      {
        "id": "rate-limiter-spec",
        "title": "Fuller · 限流器设计规格",
        "component": "RateLimiterSpec",
        "summary": "工程蓝图风格：深蓝底、青白墨、制图青与淡方格网，搭配等宽标注、虚线分节和发丝拓扑。",
        "entrypoint": "demos/materials/reacticle/index.html?demo=rate-limiter-spec",
        "parameters": [
          {
            "name": "主题",
            "value": "fuller",
            "note": "固定为原画廊对此文章的绑定；样文内部交互沿用原报告。"
          }
        ]
      },
      {
        "id": "color-clash",
        "title": "Sottsass · 撞色不翻车",
        "component": "ColorClash",
        "summary": "孟菲斯风格：奶油纸、黑墨与粉青黄蓝撞色，以硬投影、轻旋转、彩色药丸和几何彩屑制造节奏。",
        "entrypoint": "demos/materials/reacticle/index.html?demo=color-clash",
        "parameters": [
          {
            "name": "主题",
            "value": "sottsass",
            "note": "固定为原画廊对此文章的绑定；样文内部交互沿用原报告。"
          }
        ]
      }
    ],
    "prompt": "使用 Reacticle 0.2.6 的语义化 React 长文组件。先读 beautiful-article 对应主题的 profile，再从这 11 篇原作样文选择与文章目标一致的排版语言。通过公共入口导入 ThemeProvider、Article 与所需组件，沿用主题 token 与结构纪律；自绘 Raw 图形继续使用 --ra-* 变量。保持原始来源、论点与数据出处，图表只在帮助当前段落时加入，交互使用可访问的真实控件。参考样例时保留其完整组件与主题 CSS，不将主题简化为配色；需要离线分发时本地化字体并保留 MIT 声明和 OFL。",
    "accessibility": {
      "keyboard": "保留原报告的语义化正文、目录、真实按钮、滑块、展开控件及图表标签；键盘操作和读屏器表现需按所选文章实测，源码复用不等于全部辅助技术验收。",
      "reducedMotion": "沿用原站与主题中的 prefers-reduced-motion CSS；呼吸练习计时仍由原始开始／暂停控件控制，不增加额外动态行为。"
    },
    "demo": "demos/materials/reacticle/index.html",
    "preview": "previews/materials/reacticle.png",
    "research": "docs/materials/reacticle.md",
    "sourceFiles": [
      "demos/materials/reacticle/index.html",
      "demos/materials/reacticle/demo/demo.js",
      "demos/materials/reacticle/demo/caffeine-half-life/index.html",
      "demos/materials/reacticle/demo/caffeine-half-life/assets/index-DMYwhlbL.js",
      "demos/materials/reacticle/demo/caffeine-half-life/assets/index-WxgjeHG6.css",
      "demos/materials/reacticle/demo/movable-type/index.html",
      "demos/materials/reacticle/demo/movable-type/assets/index-B-dGzE72.js",
      "demos/materials/reacticle/demo/movable-type/assets/index-CDnsII-G.css",
      "demos/materials/reacticle/demo/pool-exhaustion/index.html",
      "demos/materials/reacticle/demo/pool-exhaustion/assets/index-BtWtZy11.js",
      "demos/materials/reacticle/demo/pool-exhaustion/assets/index-CxoMmBeN.css",
      "demos/materials/reacticle/demo/orbit-spec/index.html",
      "demos/materials/reacticle/demo/orbit-spec/assets/index-BeERXI3Z.js",
      "demos/materials/reacticle/demo/orbit-spec/assets/index-BguD11Q8.css",
      "demos/materials/reacticle/demo/linear-attention/index.html",
      "demos/materials/reacticle/demo/linear-attention/assets/index-lyo_MfEB.js",
      "demos/materials/reacticle/demo/linear-attention/assets/index-WxgjeHG6.css",
      "demos/materials/reacticle/demo/first-newsletter/index.html",
      "demos/materials/reacticle/demo/first-newsletter/assets/index-DlB2uEmW.css",
      "demos/materials/reacticle/demo/first-newsletter/assets/index-DoixGDe2.js",
      "demos/materials/reacticle/demo/slow-breathing/index.html",
      "demos/materials/reacticle/demo/slow-breathing/assets/index-8wSZpDKQ.js",
      "demos/materials/reacticle/demo/slow-breathing/assets/index-DlB2uEmW.css",
      "demos/materials/reacticle/demo/front-page/index.html",
      "demos/materials/reacticle/demo/front-page/assets/index-CZI22ZoU.js",
      "demos/materials/reacticle/demo/front-page/assets/index-DlB2uEmW.css",
      "demos/materials/reacticle/demo/geometry-of-meaning/index.html",
      "demos/materials/reacticle/demo/geometry-of-meaning/assets/index-DlB2uEmW.css",
      "demos/materials/reacticle/demo/geometry-of-meaning/assets/index-zpQvA_KQ.js",
      "demos/materials/reacticle/demo/rate-limiter-spec/index.html",
      "demos/materials/reacticle/demo/rate-limiter-spec/assets/index-BguD11Q8.css",
      "demos/materials/reacticle/demo/rate-limiter-spec/assets/index-BQymDvVh.js",
      "demos/materials/reacticle/demo/color-clash/index.html",
      "demos/materials/reacticle/demo/color-clash/assets/index-Dd_VDUiD.js",
      "demos/materials/reacticle/demo/color-clash/assets/index-DlB2uEmW.css",
      "demos/materials/reacticle/fonts/fonts.css"
    ]
  },
  {
    "id": "recursive",
    "title": "Recursive · 五轴可变字体",
    "type": "font",
    "category": "字体与排版",
    "summary": "在同一原始字体中切换比例与等宽字形，调节笔触、字重、倾斜和草写；用界面标题、代码及海报三种试排理解用途。",
    "install": "本地 @font-face 加载 Recursive_VF_1.085.woff2；随字体保留 OFL 1.1 许可。",
    "demoNote": "真实原始字体与五轴调节；三种原创排版可编辑、重置及复制 CSS。中文使用系统后备，字体不可用时明确显示后备状态。",
    "tags": [
      "字体",
      "可变字体",
      "Recursive",
      "ArrowType",
      "等宽",
      "代码",
      "招牌",
      "海报",
      "Typography",
      "WOFF2",
      "OFL"
    ],
    "useCases": [
      "需要比例标题与等宽代码共享气质的产品",
      "数据界面、技术文档与终端片段",
      "有手写招牌个性的拉丁短标题",
      "试验字体轴对层级、字形与换行的影响"
    ],
    "avoid": [
      "把它当作中文或全语言覆盖字体",
      "在小字号正文使用极重字重与强草写",
      "将等宽字体试排误称功能完整的代码编辑器",
      "只下载源码而遗漏字体及 OFL 许可"
    ],
    "constraints": [
      "固定使用 v1.085 的完整 WOFF2，718,680 字节；未修改、子集化或转码。",
      "自定义轴需要可变字体支持；加载失败时采用明确标注的系统字体后备。",
      "主要支持拉丁文字及相关符号；中文由系统字体回退，不响应 Recursive 的 MONO、CASL、CRSV 等轴。",
      "MONO 会改变字宽；固定 MONO 下其他轴保持字体设计的横向度量，混排与实际换行仍需验证。",
      "三套参数、文案和版式为本地原创组合；字号范围 16–88px 也是本地选择，不表示原作者推荐所有组合。",
      "本示例无自动动画和声音，不产生持续后台绘制；所有试排修改由用户输入触发。",
      "再分发保留版权和 OFL 1.1 完整文本，不单独出售字体；更换版本或生成字体子集时重新核对许可与字形范围。"
    ],
    "upstream": {
      "repository": "arrowtype/recursive",
      "url": "https://github.com/arrowtype/recursive",
      "commit": "5f4be025122d72d4710267e959128e8986ebe435",
      "version": "1.085",
      "verifiedAt": "2026-10-16"
    },
    "license": {
      "name": "SIL OFL 1.1",
      "url": "https://github.com/arrowtype/recursive/blob/5f4be025122d72d4710267e959128e8986ebe435/OFL.txt",
      "scope": "Recursive 字体软件及本地保留的原始 WOFF2。",
      "notes": "保留字体版权与完整 OFL；字体不可单独出售，修改和再分发遵循原许可。本地排版与代码是原创示例，不代表原作者背书。"
    },
    "sources": [
      {
        "title": "Recursive 固定版本 README",
        "url": "https://github.com/arrowtype/recursive/blob/5f4be025122d72d4710267e959128e8986ebe435/README.md",
        "note": "五轴范围、CRSV 三态、字体接入、语言列表与大字号端点建议的依据。",
        "evidence": "source"
      },
      {
        "title": "官方 v1.085 发布",
        "url": "https://github.com/arrowtype/recursive/releases/tag/v1.085",
        "note": "2022-06-30 发布，固定版本源头；核验时 GitHub latest release 返回这一版本。",
        "evidence": "source"
      },
      {
        "title": "Recursive 官方交互样张",
        "url": "https://www.recursive.design/",
        "note": "真实浏览器选择 Mono Casual ExtraBlack Italic 后，页面显示 MONO 1、CASL 1、wght 1000、slnt -15、CRSV 1；此观察仅涵盖该预设与页面状态。",
        "evidence": "observed"
      },
      {
        "title": "完整 WOFF2 原始文件",
        "url": "https://github.com/arrowtype/recursive/blob/5f4be025122d72d4710267e959128e8986ebe435/fonts/ArrowType-Recursive-1.085/Recursive_Web/woff2_variable/Recursive_VF_1.085.woff2",
        "note": "本地字体保持原字节，718,680 字节，SHA256 与来源说明一同保存。",
        "evidence": "source"
      },
      {
        "title": "v1.084 数学希腊字母范围",
        "url": "https://github.com/arrowtype/recursive/releases/tag/v1.084",
        "note": "上游明确增加部分数学用希腊字母，不能据此声称完整希腊文字覆盖。",
        "evidence": "source"
      }
    ],
    "demos": [
      {
        "id": "interface",
        "title": "界面标题",
        "component": "Recursive Sans Linear",
        "summary": "以比例字宽、直立字形与中粗字重建立产品标题层级；可替换文字并查看混排后备。",
        "entrypoint": "demos/materials/recursive/index.html?preset=interface",
        "parameters": [
          {
            "name": "MONO / CASL",
            "value": "0–1 / 0–1",
            "note": "来自官方五轴表；本地默认均为 0，滑块步长 0.01。"
          },
          {
            "name": "wght",
            "value": "300–1000",
            "note": "来自官方五轴表；本地标题默认 650，步长 10。"
          },
          {
            "name": "slnt / CRSV",
            "value": "-15–0 / 0、0.5、1",
            "note": "来自官方五轴表；本地默认 0 / 0.5，slnt 步长 0.5。"
          },
          {
            "name": "font-size",
            "value": "16–88px",
            "note": "本地试排范围，默认 48px；不使用容器缩放。"
          }
        ]
      },
      {
        "id": "code",
        "title": "等宽代码",
        "component": "Recursive Mono Linear",
        "summary": "用数字、标点和多行代码观察等宽字形；明确区分字体试排与编辑器能力。",
        "entrypoint": "demos/materials/recursive/index.html?preset=code",
        "parameters": [
          {
            "name": "MONO",
            "value": "1",
            "note": "官方轴值 1 表示等宽；0–1 可调，离开 1 后不再保证等宽。"
          },
          {
            "name": "CASL / wght / slnt / CRSV",
            "value": "0 / 450 / 0 / 0",
            "note": "本地代码组合；范围沿用官方五轴表，可与标题采用不同字形。"
          },
          {
            "name": "font-size / line-height",
            "value": "19px / 1.6",
            "note": "本地预设；字号可在 16–88px 调节，长行折行以保留窄屏阅读。"
          }
        ]
      },
      {
        "id": "poster",
        "title": "个性海报",
        "component": "Recursive Sans Casual Italic",
        "summary": "以 Casual 端点、重字重和草写短标题形成招牌气质；比较倾斜与草写的独立作用。",
        "entrypoint": "demos/materials/recursive/index.html?preset=poster",
        "parameters": [
          {
            "name": "MONO / CASL",
            "value": "0 / 1",
            "note": "本地组合；CASL 大标题采用端点遵循官方设计建议。"
          },
          {
            "name": "wght / slnt / CRSV",
            "value": "900 / -15 / 1",
            "note": "本地海报默认值；使用官方允许范围，倾斜和草写可独立比较。"
          },
          {
            "name": "font-size",
            "value": "72px",
            "note": "本地默认，16–88px 可调；重字重在较大字号下更适合阅读。"
          }
        ]
      }
    ],
    "prompt": "为现有页面选择 Recursive v1.085 的一种具体排版用途：拉丁界面标题、等宽代码或个性海报。先读取字体试排源码与原始 OFL，保留完整 WOFF2 并通过本地 @font-face 声明 300–1000 字重范围。根据内容设置 MONO、CASL、wght、slnt 和 CRSV；CRSV 使用 0、0.5、1，展示标题优先 CASL/slnt 端点。以真实 DOM 文字排版，保留中文系统后备并检查混排行高、字重和换行，不将系统字体伪装成 Recursive。字体下载失败时继续阅读，固定字符宽度只在 MONO 1 的覆盖字形上判断。所有界面文字至少 12px，不通过缩放压小。尊重用户减少动态偏好，无需为静态试排制造自动动画。标明原创版式与上游字体的边界，完整导出时携带字体、许可和来源信息。",
    "accessibility": {
      "keyboard": "试排标签支持方向键和 Home/End，轴滑块、CRSV 下拉、文字输入、重置和复制均使用原生控件；焦点清晰，触摸使用原生输入。",
      "reducedMotion": "没有自动动画、音频或持续绘制；减少动态和后台时保留静态试排，轴值仅随用户输入更新。"
    },
    "demo": "demos/materials/recursive/index.html",
    "preview": "previews/materials/recursive.png",
    "research": "docs/materials/recursive.md",
    "sourceFiles": [
      "demos/materials/recursive/index.html",
      "demos/materials/recursive/demo/demo.css",
      "demos/materials/recursive/demo/demo.js"
    ]
  },
  {
    "id": "shaders",
    "title": "Shaders · 可调节的 WebGPU 效果",
    "type": "component-library",
    "category": "组件与效果",
    "summary": "把渐变、玻璃折射、指针涟漪与溶解转场作为可组合的图层；在本地调节四种效果，再按真实页面任务取材。",
    "install": "npm install shaders@4.0.4",
    "demoNote": "按需启动真实组件，调参数、切换效果，观察起始与回程。WebGPU 不可用时显示标注的静态参考。",
    "tags": [
      "WebGPU",
      "JavaScript",
      "渐变",
      "玻璃",
      "指针反馈",
      "转场",
      "MeshGradient",
      "FlutedGlass",
      "CursorRipples",
      "NoiseDissolve"
    ],
    "useCases": [
      "产品首部的动态渐变背景",
      "展示卡片的玻璃与折射质感",
      "局部画布的指针反馈",
      "图片或内容切换的溶解遮罩"
    ],
    "avoid": [
      "把整页文字和关键操作只绘制在 GPU 画布里",
      "没有静态后备的核心阅读流程",
      "同时运行大量装饰画布",
      "直接搬用官网的付费预设或完整页面区块"
    ],
    "constraints": [
      "本地 Demo 使用固定的 shaders 4.0.4 JavaScript 运行时，需要浏览器提供 WebGPU。",
      "通过 HTTP/HTTPS 访问；WebGPU 不可用时显示明确的静态示意与状态，不把它当作真实着色器运行结果。",
      "减少动态、页面隐藏或主动暂停时停止持续动画；恢复运行由页面状态与用户操作决定。",
      "保留 MIT 版权和许可文本；官网编辑器、预设与区块的使用条款与开源软件分开核验。",
      "本地参考图和四套参数是 Web Atlas 的演示选择，不代表官网预设或作者推荐。"
    ],
    "upstream": {
      "repository": "shader-effects-inc/shaders",
      "url": "https://github.com/shader-effects-inc/shaders",
      "commit": "81fd4ece5d493ca6c424a2af41f0e2c361ec8258",
      "version": "4.0.4",
      "verifiedAt": "2026-10-13"
    },
    "license": {
      "name": "MIT",
      "url": "https://github.com/shader-effects-inc/shaders/blob/81fd4ece5d493ca6c424a2af41f0e2c361ec8258/LICENSE",
      "scope": "仓库与 shaders npm 包中的引擎、组件、框架绑定及随包 JavaScript 运行时。",
      "notes": "随本地运行时保留原许可与第三方声明；shaders.com 的编辑器、预设、页面区块及平台功能采用独立条款，本条目不分发这些内容。"
    },
    "sources": [
      {
        "title": "Shaders 官方仓库与 JavaScript 接口",
        "url": "https://github.com/shader-effects-inc/shaders/tree/81fd4ece5d493ca6c424a2af41f0e2c361ec8258",
        "note": "核对组件分层、createShader JavaScript 入口、框架绑定与软件许可范围。",
        "evidence": "source"
      },
      {
        "title": "shaders 4.0.4 npm 元数据",
        "url": "https://registry.npmjs.org/shaders/4.0.4",
        "note": "版本与 gitHead 对应固定的上游完整提交；本地运行时来自该版本的官方分发。",
        "evidence": "source"
      },
      {
        "title": "MeshGradient 组件定义",
        "url": "https://github.com/shader-effects-inc/shaders/blob/81fd4ece5d493ca6c424a2af41f0e2c361ec8258/packages/core/src/shaders/MeshGradient/index.ts",
        "note": "核对 speed、count、swirl、smoothness 和色彩参数；本地配色及默认参数为演示选择。",
        "evidence": "source"
      },
      {
        "title": "FlutedGlass 组件定义",
        "url": "https://github.com/shader-effects-inc/shaders/blob/81fd4ece5d493ca6c424a2af41f0e2c361ec8258/packages/core/src/shaders/FlutedGlass/index.ts",
        "note": "核对 frequency、refraction、angle 与 highlight；参考图是本地原创 SVG。",
        "evidence": "source"
      },
      {
        "title": "CursorRipples 组件定义",
        "url": "https://github.com/shader-effects-inc/shaders/blob/81fd4ece5d493ca6c424a2af41f0e2c361ec8258/packages/core/src/shaders/CursorRipples/index.ts",
        "note": "核对 intensity、decay、radius 与 chromaticSplit；本地仅用于独立预览舞台。",
        "evidence": "source"
      },
      {
        "title": "NoiseDissolve 组件定义",
        "url": "https://github.com/shader-effects-inc/shaders/blob/81fd4ece5d493ca6c424a2af41f0e2c361ec8258/packages/core/src/shaders/NoiseDissolve/index.ts",
        "note": "核对 progress、scale 与 softness；本地转场触发与演示按钮为原创交互。",
        "evidence": "source"
      },
      {
        "title": "官网软件与平台内容许可",
        "url": "https://shaders.com/license",
        "note": "官方许可第 2／3 节区分 MIT 软件与预设、合集、区块等平台内容；本库分发开源软件及原创组合。",
        "evidence": "source"
      }
    ],
    "demos": [
      {
        "id": "mesh-gradient",
        "title": "流动渐变",
        "component": "MeshGradient",
        "summary": "改变色块数量、旋转与平滑度，观察首部背景如何保持氛围，同时为文字留出稳定对比。",
        "entrypoint": "demos/materials/shaders/index.html?effect=mesh-gradient",
        "parameters": [
          {
            "name": "speed",
            "value": "0–2",
            "note": "本地演示范围；源码 UI 建议为 0–10。0 可作为静态配色参考。"
          },
          {
            "name": "count",
            "value": "2–8",
            "note": "源码 UI 建议范围；改变混合色块数量。"
          },
          {
            "name": "swirl",
            "value": "-1–1",
            "note": "源码 UI 建议范围；改变旋转方向与强度。"
          },
          {
            "name": "smoothness",
            "value": "0–5",
            "note": "源码 UI 建议范围；改变色块过渡。"
          }
        ]
      },
      {
        "id": "fluted-glass",
        "title": "条纹玻璃",
        "component": "FlutedGlass",
        "summary": "用同一张本地参考图观察条纹密度、角度和折射强度，学习玻璃效果对底图辨识度的影响。",
        "entrypoint": "demos/materials/shaders/index.html?effect=fluted-glass",
        "parameters": [
          {
            "name": "frequency",
            "value": "1–20",
            "note": "源码 UI 建议范围；改变条纹密度。"
          },
          {
            "name": "refraction",
            "value": "0–4",
            "note": "源码 UI 建议范围；改变折射程度。"
          },
          {
            "name": "angle",
            "value": "0–180",
            "note": "本地演示范围；源码 UI 建议为 0–360，以度设置条纹方向。"
          },
          {
            "name": "highlight",
            "value": "0–2",
            "note": "源码 UI 建议范围；改变高光强度。"
          }
        ]
      },
      {
        "id": "cursor-ripples",
        "title": "指针涟漪",
        "component": "CursorRipples",
        "summary": "移动指针或触摸舞台，比较涟漪的半径、衰减与色散，把局部反馈限制在内容可读的范围。",
        "entrypoint": "demos/materials/shaders/index.html?effect=cursor-ripples",
        "parameters": [
          {
            "name": "intensity",
            "value": "0–20",
            "note": "源码 UI 建议范围；改变反馈强度。"
          },
          {
            "name": "decay",
            "value": "0–20",
            "note": "源码 UI 建议范围；改变衰减速度。"
          },
          {
            "name": "radius",
            "value": "0.1–1",
            "note": "源码 UI 建议范围；改变反馈范围。"
          },
          {
            "name": "chromaticSplit",
            "value": "0–3",
            "note": "源码 UI 建议范围；改变色散程度。"
          }
        ]
      },
      {
        "id": "noise-dissolve",
        "title": "噪声溶解",
        "component": "NoiseDissolve",
        "summary": "拖动进度观察正向与反向转场，比较颗粒尺度和边缘软度；在真实页面中同步 DOM 内容与操作状态。",
        "entrypoint": "demos/materials/shaders/index.html?effect=noise-dissolve",
        "parameters": [
          {
            "name": "progress",
            "value": "0–1",
            "note": "源码 UI 建议范围；0 为可见，1 为消失。"
          },
          {
            "name": "scale",
            "value": "0.5–20",
            "note": "源码 UI 建议范围；改变噪声尺度。"
          },
          {
            "name": "softness",
            "value": "0–1",
            "note": "源码 UI 建议范围；改变溶解边缘软度。"
          }
        ]
      }
    ],
    "prompt": "在现有 HTML/CSS/JavaScript 页面中使用固定版本 shaders 4.0.4 的 createShader 接口，为一个有明确任务的区域选择 MeshGradient、FlutedGlass、CursorRipples 或 NoiseDissolve。先读取本地四种演示的参数与源码，在保留真实 DOM 文本和操作的情况下调整配色、强度与图层。保持同一舞台只运行当前选中的效果，支持参数重置和暂停；页面隐藏或减少动态时停止持续动画。WebGPU 不可用时显示能继续阅读和操作的静态后备。保留原软件许可与第三方声明，不复制官网平台预设。桌面与窄屏都检查文字至少 12px、焦点、触摸及资源加载。",
    "accessibility": {
      "keyboard": "使用真实按钮与带标签的参数控件切换、调节、重置和暂停；指针反馈作为可选视觉装饰，信息和操作由 DOM 提供。",
      "reducedMotion": "遵循 prefers-reduced-motion 停止自动运行，以静态状态保留配色和参数学习；主动演示需有可用的停止控制。"
    },
    "demo": "demos/materials/shaders/index.html",
    "preview": "previews/materials/shaders.png",
    "research": "docs/materials/shaders.md",
    "sourceFiles": [
      "demos/materials/shaders/index.html",
      "demos/materials/shaders/demo/demo.css",
      "demos/materials/shaders/demo/demo.js",
      "demos/materials/shaders/demo/reference.svg"
    ]
  },
  {
    "id": "three-html-render",
    "title": "three-html-render · HTML-in-Canvas polyfill",
    "type": "component-library",
    "category": "组件与效果",
    "summary": "让 HTML-in-Canvas 标准 API 在所有浏览器可用，配合 three.js 内置的 HTMLTexture 和 InteractionManager，把实时、可交互的 HTML 画进 WebGL 贴图，并能在 3D 表面上继续点击。",
    "install": "npm install three@0.185.1 three-html-render@0.1.2",
    "demoNote": "将 HTML-Light-Demo 的 MORS² 页面与吊灯机制移植为原生 HTML/CSS/JavaScript；两个样例共用该页面，以 Three.js HTMLTexture、InteractionManager 和浏览器 API polyfill 运行。",
    "tags": [
      "HTML-in-Canvas",
      "polyfill",
      "Three.js",
      "WebGL",
      "HTMLTexture",
      "InteractionManager",
      "灯光",
      "3D 交互"
    ],
    "useCases": [
      "氛围型首屏",
      "作品集",
      "发布页",
      "3D 展台中的可交互面板"
    ],
    "avoid": [
      "信息密集页",
      "长阅读页",
      "对性能或电量敏感的移动端主流程"
    ],
    "constraints": [
      "HTML-in-Canvas 是 WICG 的浏览器标准提案，原生支持处于实验阶段；本条目收录 three-html-render 库，不是标准本身。HTMLTexture 与 InteractionManager 从 three r185 起由 Three.js 提供，本库补齐浏览器 API。",
      "浏览器有原生 texElementImage2D 时使用原生路径；缺少原生支持时退回 SVG foreignObject 光栅化。本地 HTTP 下，无头 Edge 155.0.4283.62 已实测运行真实 WebGL，实际使用 SVG foreignObject polyfill 路径；原生路径未验证。",
      "固定 three 0.185.1 与 three-html-render 0.1.2；0.1.x 存在版本风险，本组合需要 texElementImage2D 兼容垫片。npm 0.1.2 未提供 README 所述的 html-texture／interaction-manager 子路径，需使用 Three.js 自带接口。",
      "通过 HTTP/HTTPS 访问；WebGL 不可用或初始化失败时保留同一 MORS² HTML 页面与 CSS 静态光照。禁用 WebGL 的独立 Edge 进程已验证 390px 后备说明、清除 polyfill host、源页面回到 scene，以及原面板开关点击。",
      "桌面 CSS 视口不小于 768px 时保留原作 1440×810 页面与参考 fit；小于 768px 时采用原 mobile 上下排列、页面宽度跟随视口，height: auto 与 min-height: 1180px 容纳完整内容。390px 实测源页面 390×1240；后备可用宽度 375px，无横向溢出。HTMLTexture 尺寸与相机随 resize 更新。",
      "1440px 同条件对照中，初始页面投影、标题样式与面板边界相同，观察未见明显构图、黑位、材质或光照差异；摆动画面的光斑边缘有轻微偏移，取帧时间差为可能原因，未经独立验证。",
      "正常模式已实测摆动后绘制计数保持 10150，等待 1.2 秒仍为 10150，确认停止渲染。减少动态时灯固定，绘制计数间隔 1 秒保持 10；plane 指针移动前后矩阵相同，正常模式矩阵会改变。面板仍即时生效。",
      "本地 Edge 已验证五个概念真实点击、键盘调参、右键换色与调角度，以及 CDP 单触点拖灯和色板选择；原生路径、读屏器、真实触屏设备、其他浏览器、长期性能与电量表现未验证。",
      "软件与参考实现代码保留独立 MIT 许可；MORS² 品牌、文案、标志与美术方向出自 @kaolti 原作，页面实现与光照代码改写自 jinruozai 的 HTML-Light-Demo，本仓库用于个人非商业参考。"
    ],
    "upstream": {
      "repository": "repalash/three-html-render",
      "url": "https://github.com/repalash/three-html-render/tree/63f085e3fe7be11f0679c0ac17edc2e18e743add",
      "commit": "63f085e3fe7be11f0679c0ac17edc2e18e743add",
      "version": "0.1.2",
      "threeVersion": "0.185.1",
      "verifiedAt": "2026-10-27"
    },
    "license": {
      "name": "MIT（软件与参考实现代码）",
      "url": "https://github.com/repalash/three-html-render/blob/63f085e3fe7be11f0679c0ac17edc2e18e743add/LICENSE",
      "scope": "three-html-render 为 repalash 的 MIT 软件；Three.js 核心与 InteractionManager addon 为 MIT；页面实现、样式与光照代码改写自 jinruozai 的 MIT 项目 HTML-Light-Demo。",
      "notes": "vendor 保留各包原始字节、许可与 NOTICE；mors-logo.svg 保留参考仓库原始字节。MORS² 品牌、文案、标志与美术方向出自 @kaolti（https://x.com/kaolti）原作；本仓库用于个人非商业参考，软件 MIT 说明与原作署名分别保留。"
    },
    "sources": [
      {
        "title": "three-html-render 固定版本源码",
        "url": "https://github.com/repalash/three-html-render/tree/63f085e3fe7be11f0679c0ac17edc2e18e743add",
        "note": "核对 HTML-in-Canvas polyfill、原生能力探测、SVG foreignObject 光栅化和软件许可。",
        "evidence": "source"
      },
      {
        "title": "three-html-render 0.1.2 npm 元数据",
        "url": "https://registry.npmjs.org/three-html-render/0.1.2",
        "note": "固定 npm 版本与 gitHead；分发包 exports 不包含 html-texture／interaction-manager 子路径。",
        "evidence": "source"
      },
      {
        "title": "three 0.185.1 npm 分发",
        "url": "https://registry.npmjs.org/three/0.185.1",
        "note": "本地固定的 Three.js 核心、HTMLTexture 和 InteractionManager addon 来自此版本，均保留 MIT 许可。",
        "evidence": "source"
      },
      {
        "title": "Three.js HTMLTexture 固定版本源码",
        "url": "https://github.com/mrdoob/three.js/blob/2431a09f46f34c560bc8e44b33be0e567723d5b9/src/textures/HTMLTexture.js",
        "note": "HTMLTexture 属于 Three.js 核心；本样例以其连接真实 HTML 与 WebGL 贴图。",
        "evidence": "source"
      },
      {
        "title": "Three.js InteractionManager 固定版本源码",
        "url": "https://github.com/mrdoob/three.js/blob/2431a09f46f34c560bc8e44b33be0e567723d5b9/examples/jsm/interaction/InteractionManager.js",
        "note": "平面交互使用此 Three.js addon，采用 Three.js 的 MIT 许可。",
        "evidence": "source"
      },
      {
        "title": "WICG HTML-in-Canvas 提案",
        "url": "https://github.com/WICG/html-in-canvas",
        "note": "浏览器标准提案与实验支持状态；本库的 polyfill 及本地样例不等同于标准或浏览器原生实现。",
        "evidence": "source"
      },
      {
        "title": "HTML-Light-Demo 页面、样式与吊灯机制",
        "url": "https://github.com/jinruozai/HTML-Light-Demo/tree/0a0bd3ba53194fff68db78654fc6857ab3faee29",
        "note": "MorsPageSurface.tsx、globals.css、MorsLightCanvas.tsx、config.ts 与兼容垫片的原生移植依据；参考实现代码为 MIT，作者 jinruozai。",
        "evidence": "source"
      },
      {
        "title": "MORS² 标志固定来源",
        "url": "https://github.com/jinruozai/HTML-Light-Demo/blob/0a0bd3ba53194fff68db78654fc6857ab3faee29/public/mors-logo.svg",
        "note": "本地 mors-logo.svg 保持该文件原始字节；品牌、文案、标志与美术方向署名 @kaolti。",
        "evidence": "source"
      },
      {
        "title": "创意与美术方向署名",
        "url": "https://x.com/kaolti",
        "note": "MORS² 品牌、文案、标志与美术方向出自 @kaolti 原作；本仓库为个人非商业参考用途。",
        "evidence": "source"
      }
    ],
    "demos": [
      {
        "id": "lamp",
        "title": "吊灯照亮网页",
        "component": "HTMLTexture / SpotLight / Verlet",
        "summary": "拖动吊灯照亮 MORS² 原作页面，松手观察摆动；用原面板调整光束、亮度、预设与自定义颜色。",
        "entrypoint": "demos/materials/three-html-render/index.html?demo=lamp",
        "parameters": [
          {
            "name": "angle",
            "value": "34°",
            "note": "参考 config.ts 的初始光束角度；滑杆可调。"
          },
          {
            "name": "brightness",
            "value": "1450",
            "note": "参考 config.ts 的初始亮度；滑杆可调。"
          },
          {
            "name": "color",
            "value": "#ffb36b",
            "note": "初始暖色；色板为 #ffb36b、#ffd9a3、#8fdcff、#c79cff、#ff5f7f。"
          },
          {
            "name": "输入",
            "value": "左键／单指拖拽、右键、双击、DOM 面板",
            "note": "右键拖动调角度，右键单击切颜色，双击复位；触屏及键盘通过面板访问对应功能。"
          }
        ]
      },
      {
        "id": "plane",
        "title": "基础平面",
        "component": "HTMLTexture / InteractionManager",
        "summary": "将同一 MORS² 页面贴在轻微倾斜的 3D 平面上，切换五个概念并操作灯光面板。",
        "entrypoint": "demos/materials/three-html-render/index.html?demo=plane",
        "parameters": [
          {
            "name": "倾斜",
            "value": "最大 8°",
            "note": "指针移动带动平面；减少动态时保持静止。"
          },
          {
            "name": "概念",
            "value": "Space / Meta / Field / Rule / Latent",
            "note": "保留 MorsPageSurface 的五个真实 HTML 按钮与对应说明；本地 Edge 已验证五项点击与真实 DOM 键盘焦点，平面交互使用 Three.js InteractionManager。"
          }
        ]
      }
    ],
    "prompt": "使用固定版本 three 0.185.1 与 three-html-render 0.1.2，以原生 HTML/CSS/JavaScript 和本地 importmap 移植固定提交 HTML-Light-Demo 的完整 MorsPageSurface、globals.css 与 MorsLightCanvas。保留 MORS² 标志、原英文文案、五个概念、原面板、页面配色、字号与光照数值；桌面 CSS 视口不小于 768px 时沿用 1440×810 页面与参考 fit，小于 768px 时采用原 mobile 上下排列、页面宽度跟随视口，并以 height: auto 和 min-height: 1180px 容纳内容。由 Three.js HTMLTexture 与 InteractionManager 连接同一页面和 3D 表面，three-html-render 补齐浏览器 API，保留 texElementImage2D 兼容垫片。仅在 polyfill 的 SVG 快照 pageStyles 中使 html/body overflow: visible，保留高于视口的窄版面板，不修改 vendor。吊灯保留摆锤、Verlet 约束、瞄准、拉拽、松手、右键及双击复位，原面板提供光束角度、亮度、五色预设、自定义颜色、开关与复位；初始值为 34°、1450、#ffb36b。plane 复用同一页面并保持最大 8° 指针倾斜。减少动态时固定灯与平面且即时调参，静止后停止持续渲染；不支持时显示同一页面的静态光照并明确说明。分别实测视觉、实际路径、键盘、DOM、触摸、减少动态与后备，未验证项如实标注。保留各软件 MIT 许可；MORS² 品牌文案标志与美术方向署名 @kaolti，页面实现与光照代码署名 jinruozai，本仓库为个人非商业参考用途。",
    "accessibility": {
      "keyboard": "本地无头 Edge 实测 Tab 依次聚焦 Space、Meta、Field、Rule、Latent、power、beam，focus-visible 落在文档内真实 DOM 控件；ArrowRight 将光束角度 34 调至 35。五个概念点击均成功，读屏器未验证。",
      "reducedMotion": "本地无头 Edge 的 reduce 模拟中灯固定，间隔 1 秒绘制计数保持 10；plane 在指针移动前后的矩阵相同，正常模式会改变。面板即时生效，真实设备与其他浏览器未验证。"
    },
    "demo": "demos/materials/three-html-render/index.html",
    "preview": "previews/materials/three-html-render.png",
    "research": "docs/materials/three-html-render.md",
    "sourceFiles": [
      "demos/materials/three-html-render/index.html",
      "demos/materials/three-html-render/demo/demo.css",
      "demos/materials/three-html-render/demo/demo.js",
      "demos/materials/three-html-render/demo/mors-logo.svg"
    ]
  },
  {
    "id": "web-design-engineer",
    "title": "Web Design Engineer · 网页设计工作流",
    "type": "agent-skill",
    "category": "Agent 工作流",
    "summary": "让 Agent 从需求、参考与设计系统出发，经方向确认、首版反馈和完整实现，制作有明确视觉语言的网页作品。",
    "install": "将 demos/materials/web-design-engineer/ 复制到项目的 .agents/skills/web-design-engineer/ 或 .claude/skills/web-design-engineer/；按所用 Agent 的技能发现方式启用。",
    "tags": [
      "网页设计",
      "设计系统",
      "视觉校准",
      "前端实现",
      "设计评议",
      "风格配方"
    ],
    "useCases": [
      "根据参考制作网页与交互原型",
      "延展既有产品界面",
      "保留业务与交互的视觉重设计",
      "探索设计方向并评议网页作品"
    ],
    "avoid": [
      "后端接口、命令行工具和纯逻辑开发",
      "把源材料转成完整长文文章",
      "按旁白节拍制作视频演示",
      "把风格参考图当作已有的可运行网页源码"
    ],
    "constraints": [
      "本条目保存 garden-skills 固定提交中的技能原文、参考配方与宿主元数据，不直接执行技能或提供在线生成服务。",
      "原文要求先核实不稳定事实、读取参考与现有设计；设计系统和可浏览首版分别经用户确认后再继续。",
      "原文只在用户明确要求浏览器验收、响应式检查或同类实测时运行浏览器验收流程；普通开发要求不等于已授权该流程。",
      "快照包含 25 份具名风格配方；README 中引用的配方画廊页面源码未包含在固定提交中，外部效果图不作为本条目复刻页面。",
      "原文快照保留原语言与相对链接；指向仓库根目录、画廊或外部资源的链接仍须结合上游仓库阅读。"
    ],
    "upstream": {
      "repository": "ConardLi/garden-skills",
      "url": "https://github.com/ConardLi/garden-skills/tree/2b9a89340b70f632d31c0f1c69fce94a7912423e/skills/web-design-engineer",
      "commit": "2b9a89340b70f632d31c0f1c69fce94a7912423e",
      "version": "1.3.0",
      "verifiedAt": "2026-10-27"
    },
    "license": {
      "name": "MIT",
      "url": "https://github.com/ConardLi/garden-skills/blob/2b9a89340b70f632d31c0f1c69fce94a7912423e/LICENSE",
      "scope": "garden-skills 仓库内的技能文本、参考文件与代码；根 LICENSE 原样附在快照目录。",
      "notes": "保留 MIT 版权与许可文本。README 链接的第三方品牌、字体和外部效果图不因技能的 MIT 许可而获得再分发许可；本条目没有下载这些效果图。预览复用本库星槎案例的实际画面，其字体等来源许可见案例资料。"
    },
    "sources": [
      {
        "title": "Web Design Engineer 技能原文",
        "url": "https://github.com/ConardLi/garden-skills/blob/2b9a89340b70f632d31c0f1c69fce94a7912423e/skills/web-design-engineer/SKILL.md",
        "note": "需求与设计上下文、五项视觉校准、设计系统确认、首版确认、完整实现和验收边界的直接依据。",
        "evidence": "source"
      },
      {
        "title": "技能说明与同题示范对照",
        "url": "https://github.com/ConardLi/garden-skills/blob/2b9a89340b70f632d31c0f1c69fce94a7912423e/skills/web-design-engineer/README.zh-CN.md",
        "note": "安装方式、25 份风格配方，以及太空博物馆和摄影主页有／无 skill 对照的作者说明。",
        "evidence": "source"
      },
      {
        "title": "技能版本与兼容声明",
        "url": "https://github.com/ConardLi/garden-skills/blob/2b9a89340b70f632d31c0f1c69fce94a7912423e/skills/web-design-engineer/manifest.json",
        "note": "固定提交声明版本为 1.3.0；兼容列表是作者声明，不作为本库逐宿主运行验证。",
        "evidence": "source"
      }
    ],
    "snapshotPath": "demos/materials/web-design-engineer/",
    "snapshotEntry": "SKILL.md",
    "workflow": [
      "核实产品、品牌与技术事实，明确受众、作品类型、约束及已有界面的保留范围。",
      "优先阅读用户提供的代码、素材和参考，提取设计系统；按需读取一份具名风格配方。",
      "梳理设计判断，校准视觉变化、动效强度、信息密度、素材依赖和品牌忠实度，并确定叙事角色、观看距离、视觉温度及内容容量。",
      "声明配色、字体、间距、圆角、阴影和运动规则，等待用户确认设计系统。",
      "制作可浏览的首版结构与关键模块，让用户确认方向，再完成组件、状态和动效。",
      "执行交付前的代码与设计自查；用户明确要求实测时再运行浏览器验收，并按设计理念、层级、工艺、功能和独创性评议与修复。"
    ],
    "relatedEntries": [
      {
        "kind": "case",
        "id": "stellar-museum",
        "note": "同一提示词下有 skill 和无 skill 的对照；案例保留主页面及无 skill 基线。"
      },
      {
        "kind": "case",
        "id": "mira-host-photography",
        "note": "有 skill 的摄影主页结果；案例按固定提交归档作者公开的页面。"
      }
    ],
    "prompt": "先阅读 demos/materials/web-design-engineer/SKILL.md，依据任务选择现有界面延展、保留式重设计或完整重设计。核实事实并阅读已有代码、品牌素材和参考，明确受众与约束，给出设计判断和视觉校准，再声明设计系统并请用户确认。先展示可浏览首版，确认后完整实现并自查。需要参考结果时阅读星槎与米拉摄影案例，区分同题对照和单个有 skill 结果；不把案例品质推断为每次调用技能的保证。",
    "accessibility": {
      "keyboard": "技能条目通过真实链接进入原文与关联案例；应用技能制作网页时，按原文交付清单检查语义标签、替代文本和键盘导航。",
      "reducedMotion": "本资源为工作流与文本快照，没有自动播放的演示；应用技能时根据动效强度与用户环境处理减少动态。"
    },
    "preview": "previews/materials/web-design-engineer.jpg",
    "research": "docs/materials/web-design-engineer.md",
    "sourceFiles": [
      "demos/materials/web-design-engineer/SKILL.md",
      "demos/materials/web-design-engineer/README.md"
    ]
  },
  {
    "id": "wired-elements",
    "title": "Wired Elements · 可操作的手绘草稿",
    "type": "component-library",
    "category": "组件与效果",
    "demo": "demos/materials/wired-elements/index.html",
    "preview": "previews/materials/wired-elements.png",
    "research": "docs/materials/wired-elements.md",
    "sourceFiles": [
      "demos/materials/wired-elements/index.html",
      "demos/materials/wired-elements/demo/demo.css",
      "demos/materials/wired-elements/demo/demo.js"
    ],
    "summary": "用真实手绘 Web Components 组合任务清单、偏好面板与概念卡片；让草图在保留讨论感的同时具备可验证的状态。",
    "install": "npm install wired-elements@2.1.2",
    "demoNote": "三个本地原创场景直接运行官方组件。无自动动画；模块不可用时显示标注的静态说明。",
    "tags": [
      "Wired Elements",
      "Web Components",
      "手绘",
      "草图",
      "原型",
      "SVG",
      "任务清单",
      "偏好设置",
      "卡片",
      "Rough"
    ],
    "useCases": [
      "工作坊中的可勾选行动清单",
      "用户访谈中的设置流程原型",
      "学习工具和概念卡片"
    ],
    "avoid": [
      "把草图当作完整生产设计系统",
      "未验证就依赖自定义组件的表单提交与校验",
      "要求每次重绘像素一致的展示"
    ],
    "constraints": [
      "锁定最新非预发布版本 2.1.2；核验时 npm latest 指向 3.0.0-rc.6，不据此宣称 3.x 已验证。",
      "需要 JavaScript、Custom Elements 和 Shadow DOM；自托管官方完整 ESM，运行无 CDN。",
      "随机手绘线条来自原库；页面场景、文案、配色与联动为本地原创组合。",
      "标签、复选框、滑块和开关保留键盘路径；内部开关和滑块补充可访问名称。",
      "无循环动画与声音；静态后备只解释用法，不代表组件运行。",
      "保留 Wired / RoughJS MIT 与 bundle 内 Lit / lit-html BSD 3-Clause 许可。"
    ],
    "upstream": {
      "repository": "rough-stuff/wired-elements",
      "url": "https://github.com/rough-stuff/wired-elements/tree/04756df72181e08b4255f8b6dfefea130398e24b",
      "commit": "04756df72181e08b4255f8b6dfefea130398e24b",
      "version": "2.1.2",
      "verifiedAt": "2026-10-16"
    },
    "license": {
      "name": "MIT + BSD-3-Clause",
      "url": "https://github.com/rough-stuff/wired-elements/blob/04756df72181e08b4255f8b6dfefea130398e24b/LICENSE",
      "scope": "Wired Elements 与内含 RoughJS 渲染代码采用 MIT；完整 bundle 内 Lit Element 2.3.1 / lit-html 1.2.1 采用 BSD 3-Clause。",
      "notes": "vendor 保留官方 bundle 原字节及四份许可；复制整个 Demo 时一并保留。RoughJS 上游声明 ^4.3.1，精确构建解析版本未暴露。场景组合与参数默认值为本地实现。"
    },
    "sources": [
      {
        "title": "Wired Elements 固定版本源码",
        "url": "https://github.com/rough-stuff/wired-elements/tree/04756df72181e08b4255f8b6dfefea130398e24b",
        "note": "核对组件包、完整 ESM 接入与 MIT 许可。",
        "evidence": "source"
      },
      {
        "title": "wired-elements 2.1.2 npm 元数据",
        "url": "https://registry.npmjs.org/wired-elements/2.1.2",
        "note": "官方分发及 gitHead；本地 ESM 来自该 tarball。",
        "evidence": "source"
      },
      {
        "title": "Wired Elements 官方组件演示",
        "url": "https://wiredjs.com/showcase",
        "note": "浏览器实际操作 wired-checkbox，从未选中到选中；不能据此宣称整套组件均已验证。",
        "evidence": "observed"
      },
      {
        "title": "卡片参数依据",
        "url": "https://github.com/rough-stuff/wired-elements/blob/04756df72181e08b4255f8b6dfefea130398e24b/packages/wired-card/README.md",
        "note": "elevation 1–5、fill 和动态尺寸重绘。",
        "evidence": "source"
      },
      {
        "title": "滑块参数依据",
        "url": "https://github.com/rough-stuff/wired-elements/blob/04756df72181e08b4255f8b6dfefea130398e24b/packages/wired-slider/README.md",
        "note": "value、min、max 与 change；本地把范围设置为卡片层级 1–5。",
        "evidence": "source"
      },
      {
        "title": "复选状态与事件",
        "url": "https://github.com/rough-stuff/wired-elements/blob/04756df72181e08b4255f8b6dfefea130398e24b/packages/wired-checkbox/README.md",
        "note": "checked、disabled 与 change。",
        "evidence": "source"
      },
      {
        "title": "开关状态",
        "url": "https://github.com/rough-stuff/wired-elements/blob/04756df72181e08b4255f8b6dfefea130398e24b/packages/wired-toggle/README.md",
        "note": "checked 与 change；与预览的联动是本地行为。",
        "evidence": "source"
      },
      {
        "title": "进度条参数",
        "url": "https://github.com/rough-stuff/wired-elements/blob/04756df72181e08b4255f8b6dfefea130398e24b/packages/wired-progress/README.md",
        "note": "value / max；三项任务计数为本地示例。",
        "evidence": "source"
      }
    ],
    "demos": [
      {
        "id": "checklist",
        "title": "任务清单",
        "component": "wired-checkbox / wired-progress / wired-button",
        "summary": "勾选真实手绘复选框，计数同步进度条；可恢复默认。",
        "entrypoint": "demos/materials/wired-elements/index.html?demo=checklist",
        "parameters": [
          {
            "name": "checked",
            "value": "true / false",
            "note": "官方布尔属性；三项任务默认完成第一项为本地选择。"
          },
          {
            "name": "value / max",
            "value": "0–3 / 3",
            "note": "官方进度属性；任务数与联动为本地组合。"
          }
        ]
      },
      {
        "id": "preferences",
        "title": "偏好面板",
        "component": "wired-toggle / wired-checkbox",
        "summary": "设置专注模式与摘要，再应用到当前示例；不修改系统或保存偏好。",
        "entrypoint": "demos/materials/wired-elements/index.html?demo=preferences",
        "parameters": [
          {
            "name": "checked",
            "value": "true / false",
            "note": "官方开关与复选属性；摘要显示与应用动作由本地代码处理。"
          }
        ]
      },
      {
        "id": "card",
        "title": "概念卡片",
        "component": "wired-card / wired-slider",
        "summary": "调整真实手绘卡片的层级与填色，比较概念信息的主次。",
        "entrypoint": "demos/materials/wired-elements/index.html?demo=card",
        "parameters": [
          {
            "name": "elevation",
            "value": "1–5",
            "note": "官方文档范围；本地默认 3。"
          },
          {
            "name": "fill",
            "value": "#f8e9a1 / 自选颜色",
            "note": "官方颜色属性；默认纸面色为本地选择。"
          }
        ]
      }
    ],
    "prompt": "使用固定版本 wired-elements 2.1.2，在现有 HTML/CSS/JavaScript 项目里为可讨论的轻量流程选择任务清单、偏好面板或概念卡片。读取本地演示，把真实 wired-checkbox、wired-progress、wired-toggle、wired-card 和 wired-slider 接到当前页面的明确状态。使用原库 SVG 手绘边界，保持 DOM 文本、标签、键盘操作和至少 12px 的实际文字。卡片 elevation 遵循 1–5；配色与内容按任务选择。自托管官方 ESM，保留 MIT 与 BSD 许可；加载失败时显示明确静态说明，不声称组件仍已运行。无需求时不加入循环动画、声音、持久化或额外框架。",
    "accessibility": {
      "keyboard": "标签支持左右、Home、End；真实组件内部原生复选框、滑块和按钮可键盘操作，开关与滑块补上内部名称。",
      "reducedMotion": "没有自动动画或持续帧循环，参数和状态变化保留。随机线条重绘由实际内容与尺寸变化触发。"
    }
  }
];
