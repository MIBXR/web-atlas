window.ATLAS_MATERIALS = [
  {
    "id": "shaders",
    "order": 1,
    "title": "Shaders · 可调节的 WebGPU 效果",
    "type": "component-library",
    "category": "组件与效果",
    "summary": "把渐变、玻璃折射、指针涟漪与溶解转场作为可组合的图层；在本地调节四种效果，再按真实页面任务取材。",
    "install": "npm install shaders@4.0.4",
    "demoNote": "按需启动真实组件，调参数、切换效果，观察起始与回程。",
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
      "通过 HTTP/HTTPS 访问；WebGPU 不可用时显示静态示意。",
      "减少动态、页面隐藏或主动暂停时停止持续动画；恢复运行由页面状态与用户操作决定。",
      "保留 MIT 版权和许可文本。",
      "本地参考图和四套参数是 Web Atlas 的演示选择。"
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
        "summary": "移动指针或触摸舞台，比较涟漪的半径、衰减与色散，调节局部反馈时保留内容的可读性。",
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
    "id": "98-css",
    "order": 2,
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
    "summary": "用真实的 Windows 98 风格 CSS 组合设置窗口、可筛选素材目录与可暂停的进度演示；保留复古边框，同时提高文字与触控可用性。",
    "install": "npm install 98.css@0.1.21",
    "demoNote": "原库提供 CSS，示例代码负责标签切换、筛选与进度演示。",
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
      "适配层将原库控件字号从 11px 提高为 14px，辅助信息不低于 12px；不以缩放还原旧屏幕。",
      "CSS 为 MIT；随包 MS Sans Serif 与 Bold 字体来自 lou，采用 CC BY-SA 3.0，需保留独立署名与许可。",
      "模拟进度每 240ms 增加 2%。",
      "页面隐藏或切换演示时，进度暂停，返回后需用户继续；减少动态时改为手动步进。",
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
        "summary": "切换实心或分段进度，开始、暂停、单步和重置。",
        "entrypoint": "demos/materials/98-css/index.html?demo=progress",
        "parameters": [
          {
            "name": "value",
            "value": "0–100%",
            "note": "通过宽度表现官方进度样式；数值与 ARIA 由本地代码同步。"
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
    "prompt": "使用固定版本 98.css 0.1.21，为当前任务构建一个有实际用途的复古设置窗口、素材目录或进度界面。使用原库 window、title-bar、status-bar、sunken-panel、table 和 progress-indicator 样式，行为由小量原生 JavaScript 实现。所有控件保留语义与可访问名称，标签键盘方向导航，最终文本至少 12px，扩大触控区域，窄屏自然重排，不缩小整个界面。真实任务连接真实进度；若使用教学模拟须明确标注，允许暂停、重置、手动前进，后台与减少动态时停下持续变化。保存 MIT CSS 与 CC BY-SA 3.0 字体的独立署名许可，自托管所需文件，提供静态后备。"
  },
  {
    "id": "material-web",
    "order": 3,
    "title": "Google Material Web · Material 3 官方组件",
    "type": "component-library",
    "category": "组件与效果",
    "summary": "Google Material Design 的官方 Web Components 实现；本地 Demo 用色彩角色、圆角、浮动标签和状态层演示操作层级、表单验证、偏好设置与确认对话框。",
    "install": "npm install @material/web@2.5.0；本地 Demo 已捆绑运行依赖，直接以 HTTP/HTTPS 打开。",
    "demoNote": "四种组合演示官方组件的按钮层级、表单验证、偏好设置与对话框，可调配色、明暗和按钮圆角。库处于维护模式。",
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
      "固定 @material/web 2.5.0；官方库处于维护模式，等待新维护者。",
      "提供 Material 3 Web Components，采用 Lit 运行时。",
      "本地 vendor 合并了所选官方组件、CSS-in-JS 及 Lit/tslib 依赖，保留许可和锁文件；更换版本须重新核验 API 与 Shadow DOM 适配。",
      "以 HTTP/HTTPS 提供 ES module；模块加载失败时显示静态说明。",
      "按钮圆角调节范围为 4–28px。",
      "启用系统的减少动态设置或手动选择减少动态时，关闭局部过渡和 ripple，dialog 使用 quick；滑块值标签取消缩放过渡以保持文字至少12px；无持续动画或后台计时器。"
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
      "notes": "保留 vendor 中全部 LICENSE 文件、版权声明、行内许可和来源记录。合并/压缩是本地转换。本地插图为原创 SVG。"
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
        "note": "版本、gitHead、依赖范围与官方发布包的依据。",
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
        "note": "五种按钮层级、SVG icon slot、disabled 与形状 token 的依据。",
        "evidence": "observed"
      },
      {
        "title": "文本框与验证接口",
        "url": "https://material-web.dev/components/text-field/",
        "note": "required、type=email、maxlength、checkValidity、error 与 errorText 的用法。",
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
        "note": "上游声明支持 Chrome/Edge 120+、Firefox 119+、Safari 16.4+。",
        "evidence": "source"
      }
    ],
    "demos": [
      {
        "id": "actions",
        "title": "操作层级",
        "component": "MdFilledButton / MdOutlinedButton / MdTextButton",
        "summary": "对比填充、描边与文字操作；添加后禁用主要按钮，“查看安排”保留次要层级，重置后可重复体验。",
        "entrypoint": "demos/materials/material-web/index.html?sample=actions",
        "parameters": [
          {
            "name": "--md-*-button-container-shape",
            "value": "4–28px，步长2px",
            "note": "接口见官方按钮tokens；本地调节filled、filled-tonal和outlined的container-shape，范围及默认值20px均为演示选择。"
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
        "summary": "保留浮动标签，对比空值、无效邮箱与校验通过的状态；输入仅保留在内存中，不发送或保存。",
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
        "summary": "打开确认对话框、取消/Escape返回、确认归档和恢复计划；观察局部状态、焦点与撤回路径。",
        "entrypoint": "demos/materials/material-web/index.html?sample=dialog",
        "parameters": [
          {
            "name": "type",
            "value": "alert",
            "note": "该官方类型用于需要用户响应的重要确认；本地说明操作影响可撤回。"
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
    "id": "recursive",
    "order": 4,
    "title": "Recursive · 五轴可变字体",
    "type": "font",
    "category": "字体与排版",
    "summary": "在同一原始字体中切换比例与等宽字形，调节笔触、字重、倾斜和草写；用界面标题、代码及海报三种试排理解用途。",
    "install": "本地 @font-face 加载 Recursive_VF_1.085.woff2；随字体保留 OFL 1.1 许可。",
    "demoNote": "五轴可变字体试排，支持编辑、重置和复制 CSS。中文使用系统后备，字体不可用时显示后备状态。",
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
      "需要让比例标题与等宽代码保持统一风格的产品",
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
      "MONO 会改变字宽；MONO 固定时，其他轴保持字体设计的横向度量，混排与实际换行仍需验证。",
      "字号调节范围为 16–88px。",
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
      "notes": "保留字体版权与完整 OFL；字体不可单独出售，修改和再分发遵循原许可。本地排版与代码是原创示例。"
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
        "note": "v1.085 发布于 2022-06-30。",
        "evidence": "source"
      },
      {
        "title": "Recursive 官方交互样张",
        "url": "https://www.recursive.design/",
        "note": "Mono Casual ExtraBlack Italic 预设显示 MONO 1、CASL 1、wght 1000、slnt -15、CRSV 1。",
        "evidence": "observed"
      },
      {
        "title": "完整 WOFF2 原始文件",
        "url": "https://github.com/arrowtype/recursive/blob/5f4be025122d72d4710267e959128e8986ebe435/fonts/ArrowType-Recursive-1.085/Recursive_Web/woff2_variable/Recursive_VF_1.085.woff2",
        "note": "完整五轴可变 WOFF2 字体文件。",
        "evidence": "source"
      },
      {
        "title": "v1.084 数学希腊字母范围",
        "url": "https://github.com/arrowtype/recursive/releases/tag/v1.084",
        "note": "v1.084 增加部分数学用希腊字母。",
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
            "note": "本地组合；大标题将 CASL 设为端点，遵循官方设计建议。"
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
    "id": "wired-elements",
    "order": 5,
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
    "summary": "用手绘 Web Components 组合任务清单、偏好面板与概念卡片，支持任务勾选、偏好切换和卡片层级调整。",
    "install": "npm install wired-elements@2.1.2",
    "demoNote": "三个场景演示任务勾选、偏好设置和概念卡片。",
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
      "锁定最新非预发布版本 2.1.2。",
      "需要 JavaScript、Custom Elements 和 Shadow DOM；自托管官方完整 ESM，运行时不依赖 CDN。",
      "标签、复选框、滑块和开关可通过键盘操作；为内部开关和滑块补充可访问名称。",
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
        "note": "wired-checkbox 的未选中与选中状态。",
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
        "summary": "勾选手绘复选框时，任务计数与进度条同步更新；可恢复默认状态。",
        "entrypoint": "demos/materials/wired-elements/index.html?demo=checklist",
        "parameters": [
          {
            "name": "checked",
            "value": "true / false",
            "note": "官方布尔属性；三项任务中默认完成第一项，这是本地设置。"
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
        "summary": "设置专注模式与摘要，再应用到当前预览。",
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
        "summary": "调整手绘卡片的层级与填色，比较概念信息的主次。",
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
    "prompt": "使用固定版本 wired-elements 2.1.2，在现有 HTML/CSS/JavaScript 项目里为可讨论的轻量流程选择任务清单、偏好面板或概念卡片。读取本地演示，把真实 wired-checkbox、wired-progress、wired-toggle、wired-card 和 wired-slider 接到当前页面的明确状态。使用原库 SVG 手绘边界，保持 DOM 文本、标签、键盘操作和至少 12px 的实际文字。卡片 elevation 遵循 1–5；配色与内容按任务选择。自托管官方 ESM，保留 MIT 与 BSD 许可；加载失败时显示明确静态说明，不声称组件仍已运行。无需求时不加入循环动画、声音、持久化或额外框架。"
  },
  {
    "id": "three-html-render",
    "order": 6,
    "title": "three-html-render · HTML-in-Canvas polyfill",
    "type": "component-library",
    "category": "组件与效果",
    "summary": "让 HTML-in-Canvas 标准 API 在所有浏览器中可用，配合 three.js 内置的 HTMLTexture 和 InteractionManager，把实时、可交互的 HTML 绘制为 WebGL 贴图，并保留 3D 表面上的点击交互。",
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
      "HTML-in-Canvas 是 WICG 的浏览器标准提案，原生支持处于实验阶段。HTMLTexture 与 InteractionManager 从 three r185 起由 Three.js 提供，本库补齐浏览器 API。",
      "浏览器有原生 texElementImage2D 时使用原生路径；缺少原生支持时退回 SVG foreignObject 光栅化。",
      "通过 HTTP/HTTPS 访问；WebGL 不可用或初始化失败时保留同一 MORS² HTML 页面与 CSS 静态光照。",
      "桌面 CSS 视口不小于 768px 时保留原作 1440×810 页面与参考 fit；小于 768px 时采用原作的移动端上下布局，页面宽度跟随视口。HTMLTexture 尺寸与相机随 resize 更新。"
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
        "note": "MORS² 标志；品牌、文案与美术方向署名 @kaolti。",
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
    "id": "beautiful-article",
    "order": 7,
    "title": "Beautiful Article · 长文编辑工作流",
    "type": "agent-skill",
    "category": "Agent 工作流",
    "summary": "通过材料抽取、编辑规划、主题确认、逐节生成和审阅，将已有材料制作成基于 Reacticle 的可分享网页文章。",
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
      "11 份主题资料是给 Agent 阅读的写作指导；对应运行时、组件和 11 篇样文见 Reacticle 素材。",
      "执行原文脚手架时，会安装当时最新的 reacticle 发布版；本库 Reacticle 样例使用固定提交。",
      "脚手架的默认标题、正文和封面是占位内容，需要按文章材料完成；单文件 HTML 的构建形式不自动保证外链字体已离线化。",
      "原文快照保留原语言与相对链接。"
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
      "notes": "保留 MIT 版权与许可文本。Reacticle 的运行时代码与字体各按该素材的许可记录使用。"
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
      },
      {
        "title": "作者 README 封面",
        "url": "https://github.com/ConardLi/garden-skills/blob/2b9a89340b70f632d31c0f1c69fce94a7912423e/dist/imgs/covers/beautiful-article.webp",
        "note": "素材卡使用作者发布的原图。",
        "evidence": "source"
      },
      {
        "title": "效果图",
        "url": "https://github.com/ConardLi/assets/tree/0b7a79a3d41bfe1281572e33ae25dad34e846114/imgs/article",
        "note": "画廊图片托管于 ConardLi/assets 固定提交的 imgs/article/。",
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
      "用 Reacticle 语义组件和受主题约束的自由图文层逐节完成文章，每节均以独立文件保存并单独审阅。",
      "从编辑、视觉和技术三个视角终审，在最小范围内修复问题，避免为局部问题重写整篇。",
      "请用户确认交付形式后导出单文件 HTML；仅在用户选择时另行导出 PDF，并附简短编辑说明。"
    ],
    "relatedEntries": [
      {
        "kind": "material",
        "id": "reacticle",
        "note": "skill 的 11 套主题由 Reacticle 实现，11 篇样文就在 Reacticle 的样例里；技能保存写作指导，组件库提供运行时。"
      }
    ],
    "gallery": [
      {
        "path": "previews/materials/beautiful-article/tools.webp",
        "width": 1248,
        "height": 1670,
        "caption": "Agent Tools 设计的最佳实践：Anthropic 工程团队关于 Tools 的五条原则，与一套评测驱动的方法；主题 Freddie · 长文 · 21 分钟",
        "kind": "work",
        "sourceUrl": "https://raw.githubusercontent.com/ConardLi/assets/0b7a79a3d41bfe1281572e33ae25dad34e846114/imgs/article/tools.webp",
        "license": "图片托管于 ConardLi/assets，由 garden-skills README 引用；garden-skills 仓库 MIT。"
      },
      {
        "path": "previews/materials/beautiful-article/skill.webp",
        "width": 1174,
        "height": 1556,
        "caption": "Agent Skill 是如何进化的？：把 Skill 文档当成被训练的对象，而不是被复制粘贴的 prompt；主题 Freddie · 解释文 · 8 分钟",
        "kind": "work",
        "sourceUrl": "https://raw.githubusercontent.com/ConardLi/assets/0b7a79a3d41bfe1281572e33ae25dad34e846114/imgs/article/skill.webp",
        "license": "图片托管于 ConardLi/assets，由 garden-skills README 引用；garden-skills 仓库 MIT。"
      },
      {
        "path": "previews/materials/beautiful-article/harness.webp",
        "width": 1160,
        "height": 1548,
        "caption": "Agent Harness 的解剖图：智能在模型里；让智能变得有用的，是它周围的那套系统；主题 Vignelli · 长文 · 12 分钟",
        "kind": "work",
        "sourceUrl": "https://raw.githubusercontent.com/ConardLi/assets/0b7a79a3d41bfe1281572e33ae25dad34e846114/imgs/article/harness.webp",
        "license": "图片托管于 ConardLi/assets，由 garden-skills README 引用；garden-skills 仓库 MIT。"
      },
      {
        "path": "previews/materials/beautiful-article/prompt-cache.webp",
        "width": 1206,
        "height": 1606,
        "caption": "提示词缓存对 Agent 有多重要？：缓存命中率是 Agent 的 SLO，Claude Code 团队的反直觉经验；主题 Bayer · 长文 · 15 分钟",
        "kind": "work",
        "sourceUrl": "https://raw.githubusercontent.com/ConardLi/assets/0b7a79a3d41bfe1281572e33ae25dad34e846114/imgs/article/prompt-cache.webp",
        "license": "图片托管于 ConardLi/assets，由 garden-skills README 引用；garden-skills 仓库 MIT。"
      },
      {
        "path": "previews/materials/beautiful-article/context.webp",
        "width": 1158,
        "height": 1546,
        "caption": "面向 Agent 的高效上下文工程：本文探讨如何高效地筛选与管理驱动 AI Agent 运转的上下文；主题 Tufte · 长文 · 16 分钟",
        "kind": "work",
        "sourceUrl": "https://raw.githubusercontent.com/ConardLi/assets/0b7a79a3d41bfe1281572e33ae25dad34e846114/imgs/article/context.webp",
        "license": "图片托管于 ConardLi/assets，由 garden-skills README 引用；garden-skills 仓库 MIT。"
      },
      {
        "path": "previews/materials/beautiful-article/transformer.webp",
        "width": 1162,
        "height": 1550,
        "caption": "Attention Is All You Need：一篇重塑现代 AI 的论文，逐层拆给你看；主题 Tufte · 长文 · 30 分钟",
        "kind": "work",
        "sourceUrl": "https://raw.githubusercontent.com/ConardLi/assets/0b7a79a3d41bfe1281572e33ae25dad34e846114/imgs/article/transformer.webp",
        "license": "图片托管于 ConardLi/assets，由 garden-skills README 引用；garden-skills 仓库 MIT。"
      },
      {
        "path": "previews/materials/beautiful-article/agent-eval.webp",
        "width": 1162,
        "height": 1550,
        "caption": "把 AI Agent 的评测讲清楚：让 Agent 有用的那些能力，恰恰让它难以评测 —— 来自 Anthropic 的指南；主题 Tufte · 长文 · 25 分钟",
        "kind": "work",
        "sourceUrl": "https://raw.githubusercontent.com/ConardLi/assets/0b7a79a3d41bfe1281572e33ae25dad34e846114/imgs/article/agent-eval.webp",
        "license": "图片托管于 ConardLi/assets，由 garden-skills README 引用；garden-skills 仓库 MIT。"
      },
      {
        "path": "previews/materials/beautiful-article/agent-loop-codex.webp",
        "width": 1208,
        "height": 1612,
        "caption": "Codex 的 Agent Loop 是怎么做的？：OpenAI 官方分享：在 Responses API 之上，一条对话是如何被反复\"展开\"的；主题 Sottsass · 长文 · 18 分钟",
        "kind": "work",
        "sourceUrl": "https://raw.githubusercontent.com/ConardLi/assets/0b7a79a3d41bfe1281572e33ae25dad34e846114/imgs/article/agent-loop-codex.webp",
        "license": "图片托管于 ConardLi/assets，由 garden-skills README 引用；garden-skills 仓库 MIT。"
      },
      {
        "path": "previews/materials/beautiful-article/theam-tufte.webp",
        "width": 1246,
        "height": 1660,
        "caption": "Tufte · Data-Ink：Edward Tufte 数据墨水，证据优先，发丝级图表与最朴素的版式。",
        "kind": "theme",
        "sourceUrl": "https://raw.githubusercontent.com/ConardLi/assets/0b7a79a3d41bfe1281572e33ae25dad34e846114/imgs/article/theam-tufte.webp",
        "license": "图片托管于 ConardLi/assets，由 garden-skills README 引用；garden-skills 仓库 MIT。",
        "replicaPage": "demos/materials/reacticle/index.html?demo=caffeine-half-life"
      },
      {
        "path": "previews/materials/beautiful-article/theam-press.webp",
        "width": 1246,
        "height": 1662,
        "caption": "Press · 书卷：Stripe Press 式书卷长读物：会落定的标题、氧化血红首字母、纯正文之美。",
        "kind": "theme",
        "sourceUrl": "https://raw.githubusercontent.com/ConardLi/assets/0b7a79a3d41bfe1281572e33ae25dad34e846114/imgs/article/theam-press.webp",
        "license": "图片托管于 ConardLi/assets，由 garden-skills README 引用；garden-skills 仓库 MIT。",
        "replicaPage": "demos/materials/reacticle/index.html?demo=movable-type"
      },
      {
        "path": "previews/materials/beautiful-article/theam-shannon.webp",
        "width": 1246,
        "height": 1662,
        "caption": "Shannon · 工程暗色：贝尔实验室技术论文血统，暗底黄金信号、回压依赖、夜间作战气质。",
        "kind": "theme",
        "sourceUrl": "https://raw.githubusercontent.com/ConardLi/assets/0b7a79a3d41bfe1281572e33ae25dad34e846114/imgs/article/theam-shannon.webp",
        "license": "图片托管于 ConardLi/assets，由 garden-skills README 引用；garden-skills 仓库 MIT。",
        "replicaPage": "demos/materials/reacticle/index.html?demo=pool-exhaustion"
      },
      {
        "path": "previews/materials/beautiful-article/theam-vignelli.webp",
        "width": 1246,
        "height": 1660,
        "caption": "Vignelli · 瑞士：Massimo Vignelli 网格至上、grotesque 字族、瑞士红只承载结构。",
        "kind": "theme",
        "sourceUrl": "https://raw.githubusercontent.com/ConardLi/assets/0b7a79a3d41bfe1281572e33ae25dad34e846114/imgs/article/theam-vignelli.webp",
        "license": "图片托管于 ConardLi/assets，由 garden-skills README 引用；garden-skills 仓库 MIT。",
        "replicaPage": "demos/materials/reacticle/index.html?demo=orbit-spec"
      },
      {
        "path": "previews/materials/beautiful-article/knuth.png",
        "width": 1246,
        "height": 1662,
        "caption": "Knuth · 学术：Donald Knuth / Computer Modern，编号小节、命题与证明、arXiv 草稿气质。",
        "kind": "theme",
        "sourceUrl": "https://raw.githubusercontent.com/ConardLi/assets/0b7a79a3d41bfe1281572e33ae25dad34e846114/imgs/article/knuth.png",
        "license": "图片托管于 ConardLi/assets，由 garden-skills README 引用；garden-skills 仓库 MIT。",
        "replicaPage": "demos/materials/reacticle/index.html?demo=linear-attention"
      },
      {
        "path": "previews/materials/beautiful-article/theam-freddie.webp",
        "width": 1246,
        "height": 1660,
        "caption": "Freddie · 暖黄：Mailchimp Freddie 黑字荧光，亲和插画 + 不端着的产品上手语气。",
        "kind": "theme",
        "sourceUrl": "https://raw.githubusercontent.com/ConardLi/assets/0b7a79a3d41bfe1281572e33ae25dad34e846114/imgs/article/theam-freddie.webp",
        "license": "图片托管于 ConardLi/assets，由 garden-skills README 引用；garden-skills 仓库 MIT。",
        "replicaPage": "demos/materials/reacticle/index.html?demo=first-newsletter"
      },
      {
        "path": "previews/materials/beautiful-article/theam-andy.webp",
        "width": 1248,
        "height": 1660,
        "caption": "Andy · 静谧：柔软圆润、呼吸-神经跷跷板，让人慢下来的练习气质。",
        "kind": "theme",
        "sourceUrl": "https://raw.githubusercontent.com/ConardLi/assets/0b7a79a3d41bfe1281572e33ae25dad34e846114/imgs/article/theam-andy.webp",
        "license": "图片托管于 ConardLi/assets，由 garden-skills README 引用；garden-skills 仓库 MIT。",
        "replicaPage": "demos/materials/reacticle/index.html?demo=slow-breathing"
      },
      {
        "path": "previews/materials/beautiful-article/theam-bodoni.webp",
        "width": 1246,
        "height": 1662,
        "caption": "Bodoni · 报刊：高对比 Didone 报刊气质，黑白大报、对折线之上的分量。",
        "kind": "theme",
        "sourceUrl": "https://raw.githubusercontent.com/ConardLi/assets/0b7a79a3d41bfe1281572e33ae25dad34e846114/imgs/article/theam-bodoni.webp",
        "license": "图片托管于 ConardLi/assets，由 garden-skills README 引用；garden-skills 仓库 MIT。",
        "replicaPage": "demos/materials/reacticle/index.html?demo=front-page"
      },
      {
        "path": "previews/materials/beautiful-article/theam-bayer.webp",
        "width": 1244,
        "height": 1660,
        "caption": "Bayer · 包豪斯：Herbert Bayer 包豪斯三原色几何，形有性格、色有重量。",
        "kind": "theme",
        "sourceUrl": "https://raw.githubusercontent.com/ConardLi/assets/0b7a79a3d41bfe1281572e33ae25dad34e846114/imgs/article/theam-bayer.webp",
        "license": "图片托管于 ConardLi/assets，由 garden-skills README 引用；garden-skills 仓库 MIT。",
        "replicaPage": "demos/materials/reacticle/index.html?demo=geometry-of-meaning"
      },
      {
        "path": "previews/materials/beautiful-article/theam-fuller.webp",
        "width": 1246,
        "height": 1662,
        "caption": "Fuller · 蓝图：Buckminster Fuller 工程蓝图，方格纸拓扑、令牌桶模拟，可照着实现。",
        "kind": "theme",
        "sourceUrl": "https://raw.githubusercontent.com/ConardLi/assets/0b7a79a3d41bfe1281572e33ae25dad34e846114/imgs/article/theam-fuller.webp",
        "license": "图片托管于 ConardLi/assets，由 garden-skills README 引用；garden-skills 仓库 MIT。",
        "replicaPage": "demos/materials/reacticle/index.html?demo=rate-limiter-spec"
      },
      {
        "path": "previews/materials/beautiful-article/theam-sottsass.webp",
        "width": 1248,
        "height": 1662,
        "caption": "Sottsass · 孟菲斯：Memphis 80s 撞色，黑描边、硬投影、轻微旋转的不正经语法。",
        "kind": "theme",
        "sourceUrl": "https://raw.githubusercontent.com/ConardLi/assets/0b7a79a3d41bfe1281572e33ae25dad34e846114/imgs/article/theam-sottsass.webp",
        "license": "图片托管于 ConardLi/assets，由 garden-skills README 引用；garden-skills 仓库 MIT。",
        "replicaPage": "demos/materials/reacticle/index.html?demo=color-clash"
      }
    ],
    "prompt": "先阅读 demos/materials/beautiful-article/SKILL.md，用我提供的材料制作网页文章。抽取材料并记录不确定项，提出编辑规划，逐项确认文章类型与信息保留、主题、宽度、配图和封面。先做首屏与第一节，确认后按节生成完整文章，保持文章阅读形态并使用 Reacticle 主题令牌。审阅和修复后再确认交付形式。主题选择可先打开 Reacticle 素材的 11 篇实际样文比较排版语言；未经确认不替我删减信息或导出 PDF。",
    "preview": "previews/materials/beautiful-article.webp",
    "research": "docs/materials/beautiful-article.md",
    "sourceFiles": [
      "demos/materials/beautiful-article/SKILL.md",
      "demos/materials/beautiful-article/README.md"
    ]
  },
  {
    "id": "reacticle",
    "order": 8,
    "title": "Reacticle · 长文排版组件库",
    "type": "component-library",
    "category": "组件与效果",
    "summary": "一套用于 React 长文的语义化组件，配有 11 套主题，同一份内容可切换不同的排版风格。",
    "install": "npm install reacticle",
    "demoNote": "11 篇样文各自沿用原画廊绑定的主题，保留原文、图表与全部文章交互；每个样例打开一篇独立静态页面。",
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
      "只更换颜色却忽略各主题的排版规则",
      "把画廊中的样文结论当作独立核验后的事实"
    ],
    "constraints": [
      "固定 Reacticle 0.2.6 源码提交 dcfc4baf386bbc220cd1aa6274bed3b741108465；React 18.3 是上游声明的 peer 依赖，样例使用固定 lockfile 安装结果。",
      "每篇严格采用 apps/site/src/data/gallery.tsx 中的报告与主题组合；RateLimiter.tsx 导出的组件名为 RateLimiterSpec，11 个主题对应关系与任务表一致。",
      "组件、文章与主题 CSS 不作修改；独立入口保留原画廊文章容器及原站 CSS，省略官网导航、浮动返回标签与上一篇／下一篇。入口禁用 Prism 自动全页扫描，逐行代码高亮仍由原 React 组件提供。",
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
      },
      {
        "title": "作者 README 封面",
        "url": "https://github.com/ConardLi/reacticle/blob/dcfc4baf386bbc220cd1aa6274bed3b741108465/public/img/banner.jpeg",
        "note": "素材卡使用作者发布的原图。",
        "evidence": "source"
      }
    ],
    "demos": [
      {
        "id": "caffeine-half-life",
        "title": "Tufte · 咖啡因与睡眠：一份关于半衰期的笔记",
        "component": "CaffeineHalfLife",
        "summary": "数据墨水风格：用克制的衬线字体、充裕的页边、发丝参考线与低装饰图表组织视觉层级，突出论点和证据。",
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
        "summary": "学术预印本风格：采用正式的衬线字体，为章节和图表编号，优先呈现公式并保留密集引用，强调推导和可核查性。",
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
        "summary": "工程蓝图风格：深蓝底、青白墨、制图青与淡方格网，搭配等宽标注、虚线分节和发丝线条绘制的拓扑图。",
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
        "summary": "孟菲斯风格：奶油纸与黑墨搭配粉、青、黄、蓝撞色，以硬投影、轻旋转、彩色药丸和几何彩屑制造节奏。",
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
    "demo": "demos/materials/reacticle/index.html",
    "preview": "previews/materials/reacticle.jpeg",
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
    "id": "web-design-engineer",
    "order": 9,
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
      "把源材料转成完整长文",
      "按旁白节拍制作视频演示",
      "把风格参考图当作已有的可运行网页源码"
    ],
    "constraints": [
      "本条目保存 garden-skills 固定提交中的技能原文、参考配方与宿主元数据，不直接执行技能或提供在线生成服务。",
      "原文要求先核实不稳定事实、读取参考与现有设计；设计系统和可浏览首版分别经用户确认后再继续。",
      "原文只在用户明确要求浏览器验收、响应式检查或同类实测时运行浏览器验收流程；普通开发要求不等于已授权该流程。",
      "快照包含 25 份具名风格配方；固定提交未包含 README 所引用的配方画廊页面源码。",
      "原文快照保留原语言与相对链接。"
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
      "notes": "保留 MIT 版权与许可文本。预览复用本库星槎案例的实际画面，其字体等来源许可见案例资料。"
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
      },
      {
        "title": "效果图",
        "url": "https://github.com/ConardLi/assets/tree/0b7a79a3d41bfe1281572e33ae25dad34e846114/imgs/web-design",
        "note": "画廊图片托管于 ConardLi/assets 固定提交的 imgs/web-design/。",
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
      "交付前自查代码与设计；用户明确要求实测时再运行浏览器验收，并按设计理念、层级、工艺、功能和独创性评议与修复。"
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
    "gallery": [
      {
        "path": "previews/materials/web-design-engineer/apple-hig.webp",
        "width": 3840,
        "height": 1918,
        "caption": "apple-hig：SF Pro Display、慷慨留白、柔和阴影 —— Apple Store 的语气；适合 硬件产品页、设备发布、高端消费电子",
        "kind": "style",
        "sourceUrl": "https://raw.githubusercontent.com/ConardLi/assets/0b7a79a3d41bfe1281572e33ae25dad34e846114/imgs/web-design/apple-hig.webp",
        "license": "图片托管于 ConardLi/assets，由 garden-skills README 引用；garden-skills 仓库 MIT。"
      },
      {
        "path": "previews/materials/web-design-engineer/muji-kenya-hara.webp",
        "width": 3840,
        "height": 1916,
        "caption": "muji-kenya-hara：空作为画布、灰与纸、器物悬浮在空气中拍摄；适合 器物目录、家居品牌、慢生活店铺",
        "kind": "style",
        "sourceUrl": "https://raw.githubusercontent.com/ConardLi/assets/0b7a79a3d41bfe1281572e33ae25dad34e846114/imgs/web-design/muji-kenya-hara.webp",
        "license": "图片托管于 ConardLi/assets，由 garden-skills README 引用；garden-skills 仓库 MIT。"
      },
      {
        "path": "previews/materials/web-design-engineer/aesop.webp",
        "width": 3840,
        "height": 1918,
        "caption": "aesop：暖驼黄、鼠尾草 & 琥珀，衬线正文像文学杂志；适合 药剂师产品页、美妆 & 健康、独立零售",
        "kind": "style",
        "sourceUrl": "https://raw.githubusercontent.com/ConardLi/assets/0b7a79a3d41bfe1281572e33ae25dad34e846114/imgs/web-design/aesop.webp",
        "license": "图片托管于 ConardLi/assets，由 garden-skills README 引用；garden-skills 仓库 MIT。"
      },
      {
        "path": "previews/materials/web-design-engineer/dieter-rams-braun.webp",
        "width": 3840,
        "height": 1918,
        "caption": "dieter-rams-braun：十大设计原则、灰阶网格、技术正投影 —— 功能即形式；适合 工业设计档案、硬件 spec、品牌原则页",
        "kind": "style",
        "sourceUrl": "https://raw.githubusercontent.com/ConardLi/assets/0b7a79a3d41bfe1281572e33ae25dad34e846114/imgs/web-design/dieter-rams-braun.webp",
        "license": "图片托管于 ConardLi/assets，由 garden-skills README 引用；garden-skills 仓库 MIT。"
      },
      {
        "path": "previews/materials/web-design-engineer/monocle-magazine.webp",
        "width": 3840,
        "height": 1918,
        "caption": "monocle-magazine：世界主义简报、深海蓝与珊瑚色、脚注式好奇心；适合 杂志目录、城市 / 旅行简报、生活方式期刊",
        "kind": "style",
        "sourceUrl": "https://raw.githubusercontent.com/ConardLi/assets/0b7a79a3d41bfe1281572e33ae25dad34e846114/imgs/web-design/monocle-magazine.webp",
        "license": "图片托管于 ConardLi/assets，由 garden-skills README 引用；garden-skills 仓库 MIT。"
      },
      {
        "path": "previews/materials/web-design-engineer/pentagram.webp",
        "width": 3840,
        "height": 1918,
        "caption": "pentagram：一种大字体即艺术品、网格作骨架、仅墨色与底色；适合 标识样本、字体主导的作品集、画廊公告",
        "kind": "style",
        "sourceUrl": "https://raw.githubusercontent.com/ConardLi/assets/0b7a79a3d41bfe1281572e33ae25dad34e846114/imgs/web-design/pentagram.webp",
        "license": "图片托管于 ConardLi/assets，由 garden-skills README 引用；garden-skills 仓库 MIT。"
      },
      {
        "path": "previews/materials/web-design-engineer/vignelli-swiss-helvetica.webp",
        "width": 3840,
        "height": 1918,
        "caption": "vignelli-swiss-helvetica：全字号 Helvetica、六种主色、纽约地铁信号图；适合 公共指示 & 交通、公共信息海报、品牌系统样本",
        "kind": "style",
        "sourceUrl": "https://raw.githubusercontent.com/ConardLi/assets/0b7a79a3d41bfe1281572e33ae25dad34e846114/imgs/web-design/vignelli-swiss-helvetica.webp",
        "license": "图片托管于 ConardLi/assets，由 garden-skills README 引用；garden-skills 仓库 MIT。"
      },
      {
        "path": "previews/materials/web-design-engineer/bloomberg-terminal.webp",
        "width": 3840,
        "height": 1918,
        "caption": "bloomberg-terminal：深海军蓝底上的琥珀色、全等宽、密度高于舒适；适合 交易仪表盘、运维控制台、高密度专业工具",
        "kind": "style",
        "sourceUrl": "https://raw.githubusercontent.com/ConardLi/assets/0b7a79a3d41bfe1281572e33ae25dad34e846114/imgs/web-design/bloomberg-terminal.webp",
        "license": "图片托管于 ConardLi/assets，由 garden-skills README 引用；garden-skills 仓库 MIT。"
      },
      {
        "path": "previews/materials/web-design-engineer/tufte-dataink.webp",
        "width": 3840,
        "height": 1918,
        "caption": "tufte-dataink：段落内嵌微图、小型多重图、零图表杂质；适合 数据叙事、研究报告、学术长文",
        "kind": "style",
        "sourceUrl": "https://raw.githubusercontent.com/ConardLi/assets/0b7a79a3d41bfe1281572e33ae25dad34e846114/imgs/web-design/tufte-dataink.webp",
        "license": "图片托管于 ConardLi/assets，由 garden-skills README 引用；garden-skills 仓库 MIT。"
      },
      {
        "path": "previews/materials/web-design-engineer/nyt-the-daily.webp",
        "width": 3840,
        "height": 1918,
        "caption": "nyt-the-daily：Cheltenham 衬线压在 Imperial 之上、日期线居首、宽幅报纸的重量；适合 新闻特稿、播客中枢、长篇深度报道",
        "kind": "style",
        "sourceUrl": "https://raw.githubusercontent.com/ConardLi/assets/0b7a79a3d41bfe1281572e33ae25dad34e846114/imgs/web-design/nyt-the-daily.webp",
        "license": "图片托管于 ConardLi/assets，由 garden-skills README 引用；garden-skills 仓库 MIT。"
      },
      {
        "path": "previews/materials/web-design-engineer/linear.webp",
        "width": 3840,
        "height": 1918,
        "caption": "linear：暖色调暗夜、发丝边、紫色点缀、键盘快捷键芯片；适合 开发者工具落地页、Issue / 项目 SaaS、API & 基础设施产品",
        "kind": "style",
        "sourceUrl": "https://raw.githubusercontent.com/ConardLi/assets/0b7a79a3d41bfe1281572e33ae25dad34e846114/imgs/web-design/linear.webp",
        "license": "图片托管于 ConardLi/assets，由 garden-skills README 引用；garden-skills 仓库 MIT。"
      },
      {
        "path": "previews/materials/web-design-engineer/vercel-mesh.webp",
        "width": 3840,
        "height": 1918,
        "caption": "vercel-mesh：纯黑、几何网格渐变、Geist Sans、命令行式清晰；适合 部署 / 运行时工具、框架发布、技术 hero 页",
        "kind": "style",
        "sourceUrl": "https://raw.githubusercontent.com/ConardLi/assets/0b7a79a3d41bfe1281572e33ae25dad34e846114/imgs/web-design/vercel-mesh.webp",
        "license": "图片托管于 ConardLi/assets，由 garden-skills README 引用；garden-skills 仓库 MIT。"
      },
      {
        "path": "previews/materials/web-design-engineer/raycast.webp",
        "width": 3840,
        "height": 1918,
        "caption": "raycast：红光雾里的玻璃卡片、键盘优先、紧凑列表行；适合 命令面板、launcher 应用、键盘驱动型工具",
        "kind": "style",
        "sourceUrl": "https://raw.githubusercontent.com/ConardLi/assets/0b7a79a3d41bfe1281572e33ae25dad34e846114/imgs/web-design/raycast.webp",
        "license": "图片托管于 ConardLi/assets，由 garden-skills README 引用；garden-skills 仓库 MIT。"
      },
      {
        "path": "previews/materials/web-design-engineer/notion-pre-ai.webp",
        "width": 3840,
        "height": 1918,
        "caption": "notion-pre-ai：米白页面、拖拽点、随性 emoji 标题、随处可见的提示条；适合 工作区文档、内部 Wiki、友好的生产力应用",
        "kind": "style",
        "sourceUrl": "https://raw.githubusercontent.com/ConardLi/assets/0b7a79a3d41bfe1281572e33ae25dad34e846114/imgs/web-design/notion-pre-ai.webp",
        "license": "图片托管于 ConardLi/assets，由 garden-skills README 引用；garden-skills 仓库 MIT。"
      },
      {
        "path": "previews/materials/web-design-engineer/field-io.webp",
        "width": 3840,
        "height": 1918,
        "caption": "field-io：粒子系统衬着编辑式字体、代码艺术美学、暗色工作室；适合 创意科技工作室、生成艺术案例、WebGL 作品集",
        "kind": "style",
        "sourceUrl": "https://raw.githubusercontent.com/ConardLi/assets/0b7a79a3d41bfe1281572e33ae25dad34e846114/imgs/web-design/field-io.webp",
        "license": "图片托管于 ConardLi/assets，由 garden-skills README 引用；garden-skills 仓库 MIT。"
      },
      {
        "path": "previews/materials/web-design-engineer/active-theory.webp",
        "width": 3840,
        "height": 1918,
        "caption": "active-theory：WebGL 野心、全屏字、深黑底上的糖果色；适合 电影感产品发布、战役站、冲奖型微型站点",
        "kind": "style",
        "sourceUrl": "https://raw.githubusercontent.com/ConardLi/assets/0b7a79a3d41bfe1281572e33ae25dad34e846114/imgs/web-design/active-theory.webp",
        "license": "图片托管于 ConardLi/assets，由 garden-skills README 引用；garden-skills 仓库 MIT。"
      },
      {
        "path": "previews/materials/web-design-engineer/resn-storytelling.webp",
        "width": 3840,
        "height": 1918,
        "caption": "resn-storytelling：超现实、浓郁、每帧都是布景、标题压在噪点纹理上；适合 叙事滚动、娱乐 / IP 站、工作室作品集",
        "kind": "style",
        "sourceUrl": "https://raw.githubusercontent.com/ConardLi/assets/0b7a79a3d41bfe1281572e33ae25dad34e846114/imgs/web-design/resn-storytelling.webp",
        "license": "图片托管于 ConardLi/assets，由 garden-skills README 引用；garden-skills 仓库 MIT。"
      },
      {
        "path": "previews/materials/web-design-engineer/are-na.webp",
        "width": 3840,
        "height": 1918,
        "caption": "are-na：刻意的系统字体、浏览器默认蓝色链接、诚实的网页；适合 研究型频道、独立社区、反设计内容工具",
        "kind": "style",
        "sourceUrl": "https://raw.githubusercontent.com/ConardLi/assets/0b7a79a3d41bfe1281572e33ae25dad34e846114/imgs/web-design/are-na.webp",
        "license": "图片托管于 ConardLi/assets，由 garden-skills README 引用；garden-skills 仓库 MIT。"
      },
      {
        "path": "previews/materials/web-design-engineer/bloomberg-businessweek-turley.webp",
        "width": 3840,
        "height": 1918,
        "caption": "bloomberg-businessweek-turley：警示黄 + 黑墨、字体作拼贴、手工剪切式标题；适合 编辑封面、评论文章、战役式海报",
        "kind": "style",
        "sourceUrl": "https://raw.githubusercontent.com/ConardLi/assets/0b7a79a3d41bfe1281572e33ae25dad34e846114/imgs/web-design/bloomberg-businessweek-turley.webp",
        "license": "图片托管于 ConardLi/assets，由 garden-skills README 引用；garden-skills 仓库 MIT。"
      },
      {
        "path": "previews/materials/web-design-engineer/balenciaga-post-2017.webp",
        "width": 3840,
        "height": 1918,
        "caption": "balenciaga-post-2017：全大写、破碎网格、白底冷面产品、反奢侈的奢侈；适合 时装系列、drop 公告、逆向思考的奢侈品牌",
        "kind": "style",
        "sourceUrl": "https://raw.githubusercontent.com/ConardLi/assets/0b7a79a3d41bfe1281572e33ae25dad34e846114/imgs/web-design/balenciaga-post-2017.webp",
        "license": "图片托管于 ConardLi/assets，由 garden-skills README 引用；garden-skills 仓库 MIT。"
      },
      {
        "path": "previews/materials/web-design-engineer/mailchimp-freddie.webp",
        "width": 3840,
        "height": 1918,
        "caption": "mailchimp-freddie：Cavendish 黄、手绘涂鸦、对话式文案 —— 小生意的拉拉队长；适合 引导流程、中小企业营销工具、友好的消费类应用",
        "kind": "style",
        "sourceUrl": "https://raw.githubusercontent.com/ConardLi/assets/0b7a79a3d41bfe1281572e33ae25dad34e846114/imgs/web-design/mailchimp-freddie.webp",
        "license": "图片托管于 ConardLi/assets，由 garden-skills README 引用；garden-skills 仓库 MIT。"
      },
      {
        "path": "previews/materials/web-design-engineer/stripe-press.webp",
        "width": 3840,
        "height": 1918,
        "caption": "stripe-press：奶白纸、GT Super、手工装帧式奢华、思想作器物；适合 书籍详情页、长篇散文、出版社 / 出版品牌站",
        "kind": "style",
        "sourceUrl": "https://raw.githubusercontent.com/ConardLi/assets/0b7a79a3d41bfe1281572e33ae25dad34e846114/imgs/web-design/stripe-press.webp",
        "license": "图片托管于 ConardLi/assets，由 garden-skills README 引用；garden-skills 仓库 MIT。"
      },
      {
        "path": "previews/materials/web-design-engineer/headspace-meditation.webp",
        "width": 3840,
        "height": 1918,
        "caption": "headspace-meditation：橙色太阳、圆润色团、手绘平静感、每日重置；适合 冥想 & 健康、习惯 / 情绪应用、温馨的消费类卡片",
        "kind": "style",
        "sourceUrl": "https://raw.githubusercontent.com/ConardLi/assets/0b7a79a3d41bfe1281572e33ae25dad34e846114/imgs/web-design/headspace-meditation.webp",
        "license": "图片托管于 ConardLi/assets，由 garden-skills README 引用；garden-skills 仓库 MIT。"
      },
      {
        "path": "previews/materials/web-design-engineer/y2k-retrofuturism.webp",
        "width": 3840,
        "height": 1918,
        "caption": "y2k-retrofuturism：铬合金倒角、磨砂玻璃、熔岩色块、随处可见的 MSN 蓝；适合 Y2K 怀旧、早期网络门户、Z 世代品牌大型整活",
        "kind": "style",
        "sourceUrl": "https://raw.githubusercontent.com/ConardLi/assets/0b7a79a3d41bfe1281572e33ae25dad34e846114/imgs/web-design/y2k-retrofuturism.webp",
        "license": "图片托管于 ConardLi/assets，由 garden-skills README 引用；garden-skills 仓库 MIT。"
      },
      {
        "path": "previews/materials/web-design-engineer/mid-century-modern.webp",
        "width": 3840,
        "height": 1918,
        "caption": "mid-century-modern：芥末黄、砖红、青蓝；剪纸式几何；1957 年的乐观主义；适合 海报致敬、文化活动、复古印刷品牌语调",
        "kind": "style",
        "sourceUrl": "https://raw.githubusercontent.com/ConardLi/assets/0b7a79a3d41bfe1281572e33ae25dad34e846114/imgs/web-design/mid-century-modern.webp",
        "license": "图片托管于 ConardLi/assets，由 garden-skills README 引用；garden-skills 仓库 MIT。"
      }
    ],
    "prompt": "先阅读 demos/materials/web-design-engineer/SKILL.md，依据任务选择现有界面延展、保留式重设计或完整重设计。核实事实并阅读已有代码、品牌素材和参考，明确受众与约束，给出设计判断和视觉校准，再声明设计系统并请用户确认。先展示可浏览首版，确认后完整实现并自查。需要参考结果时阅读星槎与米拉摄影案例，区分同题对照和单个有 skill 结果；不把案例品质推断为每次调用技能的保证。",
    "preview": "previews/materials/web-design-engineer.jpg",
    "research": "docs/materials/web-design-engineer.md",
    "sourceFiles": [
      "demos/materials/web-design-engineer/SKILL.md",
      "demos/materials/web-design-engineer/README.md"
    ]
  },
  {
    "id": "arc-ui",
    "order": 10,
    "title": "Arc UI · React 动效组件库（免费部分）",
    "type": "component-library",
    "category": "组件与效果",
    "summary": "归档 120 个免费 React 动效组件和 22 个免费区块；每项提供可操作预览与原始 TypeScript、CSS 代码，保留共享设计和动效 tokens。",
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
    "demoNote": "142 个免费预览按官网小分类组织为双语目录。外框保留底部目录抽屉、面包屑、快捷搜索、八色外观、四种主题转场、真实手机视口与全屏形变；代码区以等宽字体高亮显示代码，并提供行号、平滑展开与复制。",
    "install": "复制 source/upstream/ 中的组件与共享 tokens，保持 @/ 路径别名；本地样例已捆绑依赖。重建：进入 source/，运行 npm ci 与 npm run build。",
    "upstream": {
      "repository": "kuratlielia/arc-library",
      "url": "https://github.com/kuratlielia/arc-library",
      "commit": "df3a600fd9ffca85ec8607438b599a4408ab8562",
      "verifiedAt": "2026-11-01"
    },
    "license": {
      "name": "MIT（免费组件与代码）；SIL OFL 1.1（字体）",
      "url": "https://github.com/kuratlielia/arc-library/blob/df3a600fd9ffca85ec8607438b599a4408ab8562/LICENSE",
      "scope": "免费 registry、lib、类型、文档与安装条目；不包含 Arc Pro 源码。",
      "notes": "保留上游 MIT、运行依赖许可和 Inter / Geist OFL 原文；官网示例媒体的署名与权利见 demo/media/CREDITS.md。"
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
      "上游要求 React 19、TypeScript 与 Next.js 或 Vite；本地使用固定依赖锁，六类预览按需加载。",
      "source/upstream/ 的 registry、lib、types、public/r 与根使用说明保留原始结构和字节。",
      "预览覆盖固定快照全部 120 个组件与 22 个区块；每项代码区展示该 registry 条目的全部源文件。"
    ],
    "workflow": [
      "按中英文名称搜索，展开官网小分类目录，打开预览并操作，查看实际效果。",
      "切到代码，选择 TypeScript、CSS 或关联文件并复制；依赖关系见固定 registry.json 与 public/r/<名称>.json。",
      "接入 foundation.css 和 motion-tokens，设置 @/ 路径别名，保留组件内部相对结构。",
      "按真实业务替换 props、标签与数据；明暗主题、键盘和减少动态由目标页面一起管理。"
    ],
    "relatedEntries": [
      {
        "kind": "case",
        "id": "uiarc-platform",
        "note": "同一产品的官网设计收录为案例；本素材提供可取用的免费组件源码。"
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
      },
      {
        "title": "官网组件文档交互实现",
        "url": "https://uiarc.dev/_next/static/chunks/39865-dc562cb1ebef7cfb.js",
        "note": "目录抽屉、外观设置、主题控制、导航历史和预览外框的公开实现依据；本地外框独立实现。",
        "evidence": "source"
      },
      {
        "title": "官网主题转场样式",
        "url": "https://uiarc.dev/_next/static/css/dce8d597c26e3056.css",
        "note": "reveal 380ms、eclipse 430ms、split 390ms、rise 360ms 与裁切参数的公开依据。",
        "evidence": "source"
      }
    ],
    "demos": [
      {
        "id": "button",
        "title": "按钮 · Button",
        "component": "Button",
        "summary": "操作免费组件预览，并逐文件查看与复制原始源码。",
        "entrypoint": "demos/materials/arc-ui/index.html?demo=button"
      },
      {
        "id": "action-swap",
        "title": "状态切换按钮 · Action swap",
        "component": "Action swap",
        "summary": "操作免费组件预览，并逐文件查看与复制原始源码。",
        "entrypoint": "demos/materials/arc-ui/index.html?demo=action-swap"
      },
      {
        "id": "action-button",
        "title": "操作按钮 · Action button",
        "component": "Action button",
        "summary": "操作免费组件预览，并逐文件查看与复制原始源码。",
        "entrypoint": "demos/materials/arc-ui/index.html?demo=action-button"
      },
      {
        "id": "split-button",
        "title": "分体按钮 · Split button",
        "component": "Split button",
        "summary": "操作免费组件预览，并逐文件查看与复制原始源码。",
        "entrypoint": "demos/materials/arc-ui/index.html?demo=split-button"
      },
      {
        "id": "button-group",
        "title": "按钮组 · Button group",
        "component": "Button group",
        "summary": "操作免费组件预览，并逐文件查看与复制原始源码。",
        "entrypoint": "demos/materials/arc-ui/index.html?demo=button-group"
      },
      {
        "id": "floating-button-group",
        "title": "悬浮按钮组 · Floating button group",
        "component": "Floating button group",
        "summary": "操作免费组件预览，并逐文件查看与复制原始源码。",
        "entrypoint": "demos/materials/arc-ui/index.html?demo=floating-button-group"
      },
      {
        "id": "expanding-button-group",
        "title": "展开按钮组 · Expanding button group",
        "component": "Expanding button group",
        "summary": "操作免费组件预览，并逐文件查看与复制原始源码。",
        "entrypoint": "demos/materials/arc-ui/index.html?demo=expanding-button-group"
      },
      {
        "id": "dropdown-menu",
        "title": "下拉菜单 · Dropdown menu",
        "component": "Dropdown menu",
        "summary": "操作免费组件预览，并逐文件查看与复制原始源码。",
        "entrypoint": "demos/materials/arc-ui/index.html?demo=dropdown-menu"
      },
      {
        "id": "context-menu",
        "title": "上下文菜单 · Context menu",
        "component": "Context menu",
        "summary": "操作免费组件预览，并逐文件查看与复制原始源码。",
        "entrypoint": "demos/materials/arc-ui/index.html?demo=context-menu"
      },
      {
        "id": "copy-button",
        "title": "复制按钮 · Copy button",
        "component": "Copy button",
        "summary": "操作免费组件预览，并逐文件查看与复制原始源码。",
        "entrypoint": "demos/materials/arc-ui/index.html?demo=copy-button"
      },
      {
        "id": "drawer",
        "title": "抽屉 · Drawer",
        "component": "Drawer",
        "summary": "操作免费组件预览，并逐文件查看与复制原始源码。",
        "entrypoint": "demos/materials/arc-ui/index.html?demo=drawer"
      },
      {
        "id": "theme-switch",
        "title": "主题切换器 · Theme switcher",
        "component": "Theme switcher",
        "summary": "操作免费组件预览，并逐文件查看与复制原始源码。",
        "entrypoint": "demos/materials/arc-ui/index.html?demo=theme-switch"
      },
      {
        "id": "theme-switch-eclipse",
        "title": "月蚀主题切换 · Eclipse",
        "component": "Eclipse",
        "summary": "操作免费组件预览，并逐文件查看与复制原始源码。",
        "entrypoint": "demos/materials/arc-ui/index.html?demo=theme-switch-eclipse"
      },
      {
        "id": "theme-switch-split",
        "title": "分幕主题切换 · Split",
        "component": "Split",
        "summary": "操作免费组件预览，并逐文件查看与复制原始源码。",
        "entrypoint": "demos/materials/arc-ui/index.html?demo=theme-switch-split"
      },
      {
        "id": "theme-switch-rise",
        "title": "上升主题切换 · Rise",
        "component": "Rise",
        "summary": "操作免费组件预览，并逐文件查看与复制原始源码。",
        "entrypoint": "demos/materials/arc-ui/index.html?demo=theme-switch-rise"
      },
      {
        "id": "avatar",
        "title": "头像 · Avatar",
        "component": "Avatar",
        "summary": "操作免费组件预览，并逐文件查看与复制原始源码。",
        "entrypoint": "demos/materials/arc-ui/index.html?demo=avatar"
      },
      {
        "id": "avatar-group",
        "title": "头像组 · Avatar group",
        "component": "Avatar group",
        "summary": "操作免费组件预览，并逐文件查看与复制原始源码。",
        "entrypoint": "demos/materials/arc-ui/index.html?demo=avatar-group"
      },
      {
        "id": "input",
        "title": "文本输入框 · Input",
        "component": "Input",
        "summary": "操作免费组件预览，并逐文件查看与复制原始源码。",
        "entrypoint": "demos/materials/arc-ui/index.html?demo=input"
      },
      {
        "id": "textarea",
        "title": "多行文本框 · Textarea",
        "component": "Textarea",
        "summary": "操作免费组件预览，并逐文件查看与复制原始源码。",
        "entrypoint": "demos/materials/arc-ui/index.html?demo=textarea"
      },
      {
        "id": "select",
        "title": "下拉选择 · Select",
        "component": "Select",
        "summary": "操作免费组件预览，并逐文件查看与复制原始源码。",
        "entrypoint": "demos/materials/arc-ui/index.html?demo=select"
      },
      {
        "id": "combobox",
        "title": "组合选择框 · Combobox",
        "component": "Combobox",
        "summary": "操作免费组件预览，并逐文件查看与复制原始源码。",
        "entrypoint": "demos/materials/arc-ui/index.html?demo=combobox"
      },
      {
        "id": "checkbox",
        "title": "复选框 · Checkbox",
        "component": "Checkbox",
        "summary": "操作免费组件预览，并逐文件查看与复制原始源码。",
        "entrypoint": "demos/materials/arc-ui/index.html?demo=checkbox"
      },
      {
        "id": "switch",
        "title": "开关 · Switch",
        "component": "Switch",
        "summary": "操作免费组件预览，并逐文件查看与复制原始源码。",
        "entrypoint": "demos/materials/arc-ui/index.html?demo=switch"
      },
      {
        "id": "multi-select",
        "title": "多项选择 · Multi-select",
        "component": "Multi-select",
        "summary": "操作免费组件预览，并逐文件查看与复制原始源码。",
        "entrypoint": "demos/materials/arc-ui/index.html?demo=multi-select"
      },
      {
        "id": "number-field",
        "title": "数字输入 · Number field",
        "component": "Number field",
        "summary": "操作免费组件预览，并逐文件查看与复制原始源码。",
        "entrypoint": "demos/materials/arc-ui/index.html?demo=number-field"
      },
      {
        "id": "password-field",
        "title": "密码框 · Password field",
        "component": "Password field",
        "summary": "操作免费组件预览，并逐文件查看与复制原始源码。",
        "entrypoint": "demos/materials/arc-ui/index.html?demo=password-field"
      },
      {
        "id": "search-field",
        "title": "搜索框 · Search field",
        "component": "Search field",
        "summary": "操作免费组件预览，并逐文件查看与复制原始源码。",
        "entrypoint": "demos/materials/arc-ui/index.html?demo=search-field"
      },
      {
        "id": "tag-input",
        "title": "标签输入 · Tag input",
        "component": "Tag input",
        "summary": "操作免费组件预览，并逐文件查看与复制原始源码。",
        "entrypoint": "demos/materials/arc-ui/index.html?demo=tag-input"
      },
      {
        "id": "file-dropzone",
        "title": "文件拖放区 · File dropzone",
        "component": "File dropzone",
        "summary": "操作免费组件预览，并逐文件查看与复制原始源码。",
        "entrypoint": "demos/materials/arc-ui/index.html?demo=file-dropzone"
      },
      {
        "id": "radio-group",
        "title": "单选组 · Radio group",
        "component": "Radio group",
        "summary": "操作免费组件预览，并逐文件查看与复制原始源码。",
        "entrypoint": "demos/materials/arc-ui/index.html?demo=radio-group"
      },
      {
        "id": "segmented-control",
        "title": "分段控件 · Segmented control",
        "component": "Segmented control",
        "summary": "操作免费组件预览，并逐文件查看与复制原始源码。",
        "entrypoint": "demos/materials/arc-ui/index.html?demo=segmented-control"
      },
      {
        "id": "calendar",
        "title": "日历 · Calendar",
        "component": "Calendar",
        "summary": "操作免费组件预览，并逐文件查看与复制原始源码。",
        "entrypoint": "demos/materials/arc-ui/index.html?demo=calendar"
      },
      {
        "id": "date-picker",
        "title": "日期选择 · Date picker",
        "component": "Date picker",
        "summary": "操作免费组件预览，并逐文件查看与复制原始源码。",
        "entrypoint": "demos/materials/arc-ui/index.html?demo=date-picker"
      },
      {
        "id": "time-picker",
        "title": "时间选择 · Time picker",
        "component": "Time picker",
        "summary": "操作免费组件预览，并逐文件查看与复制原始源码。",
        "entrypoint": "demos/materials/arc-ui/index.html?demo=time-picker"
      },
      {
        "id": "accordion",
        "title": "折叠面板 · Accordion",
        "component": "Accordion",
        "summary": "操作免费组件预览，并逐文件查看与复制原始源码。",
        "entrypoint": "demos/materials/arc-ui/index.html?demo=accordion"
      },
      {
        "id": "dialog",
        "title": "对话框 · Dialog",
        "component": "Dialog",
        "summary": "操作免费组件预览，并逐文件查看与复制原始源码。",
        "entrypoint": "demos/materials/arc-ui/index.html?demo=dialog"
      },
      {
        "id": "popover",
        "title": "弹出层 · Popover",
        "component": "Popover",
        "summary": "操作免费组件预览，并逐文件查看与复制原始源码。",
        "entrypoint": "demos/materials/arc-ui/index.html?demo=popover"
      },
      {
        "id": "tooltip",
        "title": "提示气泡 · Tooltip",
        "component": "Tooltip",
        "summary": "操作免费组件预览，并逐文件查看与复制原始源码。",
        "entrypoint": "demos/materials/arc-ui/index.html?demo=tooltip"
      },
      {
        "id": "tabs",
        "title": "标签页 · Tabs",
        "component": "Tabs",
        "summary": "操作免费组件预览，并逐文件查看与复制原始源码。",
        "entrypoint": "demos/materials/arc-ui/index.html?demo=tabs"
      },
      {
        "id": "expandable-card",
        "title": "展开卡片 · Expandable card",
        "component": "Expandable card",
        "summary": "操作免费组件预览，并逐文件查看与复制原始源码。",
        "entrypoint": "demos/materials/arc-ui/index.html?demo=expandable-card"
      },
      {
        "id": "breadcrumb",
        "title": "面包屑 · Breadcrumb",
        "component": "Breadcrumb",
        "summary": "操作免费组件预览，并逐文件查看与复制原始源码。",
        "entrypoint": "demos/materials/arc-ui/index.html?demo=breadcrumb"
      },
      {
        "id": "alert",
        "title": "提示信息 · Alert",
        "component": "Alert",
        "summary": "操作免费组件预览，并逐文件查看与复制原始源码。",
        "entrypoint": "demos/materials/arc-ui/index.html?demo=alert"
      },
      {
        "id": "toast",
        "title": "轻提示 · Toast",
        "component": "Toast",
        "summary": "操作免费组件预览，并逐文件查看与复制原始源码。",
        "entrypoint": "demos/materials/arc-ui/index.html?demo=toast"
      },
      {
        "id": "rating",
        "title": "评分 · Rating",
        "component": "Rating",
        "summary": "操作免费组件预览，并逐文件查看与复制原始源码。",
        "entrypoint": "demos/materials/arc-ui/index.html?demo=rating"
      },
      {
        "id": "progress",
        "title": "进度条 · Progress",
        "component": "Progress",
        "summary": "操作免费组件预览，并逐文件查看与复制原始源码。",
        "entrypoint": "demos/materials/arc-ui/index.html?demo=progress"
      },
      {
        "id": "skeleton",
        "title": "骨架屏 · Skeleton",
        "component": "Skeleton",
        "summary": "操作免费组件预览，并逐文件查看与复制原始源码。",
        "entrypoint": "demos/materials/arc-ui/index.html?demo=skeleton"
      },
      {
        "id": "badge",
        "title": "徽标 · Badge",
        "component": "Badge",
        "summary": "操作免费组件预览，并逐文件查看与复制原始源码。",
        "entrypoint": "demos/materials/arc-ui/index.html?demo=badge"
      },
      {
        "id": "card",
        "title": "卡片 · Card",
        "component": "Card",
        "summary": "操作免费组件预览，并逐文件查看与复制原始源码。",
        "entrypoint": "demos/materials/arc-ui/index.html?demo=card"
      },
      {
        "id": "metric-card",
        "title": "指标卡片 · Metric card",
        "component": "Metric card",
        "summary": "操作免费组件预览，并逐文件查看与复制原始源码。",
        "entrypoint": "demos/materials/arc-ui/index.html?demo=metric-card"
      },
      {
        "id": "empty-state",
        "title": "空状态 · Empty state",
        "component": "Empty state",
        "summary": "操作免费组件预览，并逐文件查看与复制原始源码。",
        "entrypoint": "demos/materials/arc-ui/index.html?demo=empty-state"
      },
      {
        "id": "tree-view",
        "title": "树形目录 · Tree view",
        "component": "Tree view",
        "summary": "操作免费组件预览，并逐文件查看与复制原始源码。",
        "entrypoint": "demos/materials/arc-ui/index.html?demo=tree-view"
      },
      {
        "id": "pagination",
        "title": "分页 · Pagination",
        "component": "Pagination",
        "summary": "操作免费组件预览，并逐文件查看与复制原始源码。",
        "entrypoint": "demos/materials/arc-ui/index.html?demo=pagination"
      },
      {
        "id": "filter-toolbar",
        "title": "筛选工具栏 · Filter toolbar",
        "component": "Filter toolbar",
        "summary": "操作免费组件预览，并逐文件查看与复制原始源码。",
        "entrypoint": "demos/materials/arc-ui/index.html?demo=filter-toolbar"
      },
      {
        "id": "sortable-data-table",
        "title": "可排序数据表 · Sortable data table",
        "component": "Sortable data table",
        "summary": "操作免费组件预览，并逐文件查看与复制原始源码。",
        "entrypoint": "demos/materials/arc-ui/index.html?demo=sortable-data-table"
      },
      {
        "id": "sparkline",
        "title": "迷你趋势图 · Sparkline",
        "component": "Sparkline",
        "summary": "操作免费组件预览，并逐文件查看与复制原始源码。",
        "entrypoint": "demos/materials/arc-ui/index.html?demo=sparkline"
      },
      {
        "id": "gauge",
        "title": "仪表盘 · Gauge",
        "component": "Gauge",
        "summary": "操作免费组件预览，并逐文件查看与复制原始源码。",
        "entrypoint": "demos/materials/arc-ui/index.html?demo=gauge"
      },
      {
        "id": "animated-counter",
        "title": "动态计数 · Animated counter",
        "component": "Animated counter",
        "summary": "操作免费组件预览，并逐文件查看与复制原始源码。",
        "entrypoint": "demos/materials/arc-ui/index.html?demo=animated-counter"
      },
      {
        "id": "code-block",
        "title": "代码块 · Code block",
        "component": "Code block",
        "summary": "操作免费组件预览，并逐文件查看与复制原始源码。",
        "entrypoint": "demos/materials/arc-ui/index.html?demo=code-block"
      },
      {
        "id": "reorderable-list",
        "title": "可重排列表 · Reorderable list",
        "component": "Reorderable list",
        "summary": "操作免费组件预览，并逐文件查看与复制原始源码。",
        "entrypoint": "demos/materials/arc-ui/index.html?demo=reorderable-list"
      },
      {
        "id": "text-reveal",
        "title": "文本揭示 · Text reveal",
        "component": "Text reveal",
        "summary": "操作免费组件预览，并逐文件查看与复制原始源码。",
        "entrypoint": "demos/materials/arc-ui/index.html?demo=text-reveal"
      },
      {
        "id": "in-view-title",
        "title": "入屏标题 · In-view title",
        "component": "In-view title",
        "summary": "操作免费组件预览，并逐文件查看与复制原始源码。",
        "entrypoint": "demos/materials/arc-ui/index.html?demo=in-view-title"
      },
      {
        "id": "text-morph",
        "title": "文本形变 · Text morph",
        "component": "Text morph",
        "summary": "操作免费组件预览，并逐文件查看与复制原始源码。",
        "entrypoint": "demos/materials/arc-ui/index.html?demo=text-morph"
      },
      {
        "id": "text-shimmer",
        "title": "流光文字 · Text shimmer",
        "component": "Text shimmer",
        "summary": "操作免费组件预览，并逐文件查看与复制原始源码。",
        "entrypoint": "demos/materials/arc-ui/index.html?demo=text-shimmer"
      },
      {
        "id": "hold-to-confirm",
        "title": "长按确认 · Hold to confirm",
        "component": "Hold to confirm",
        "summary": "操作免费组件预览，并逐文件查看与复制原始源码。",
        "entrypoint": "demos/materials/arc-ui/index.html?demo=hold-to-confirm"
      },
      {
        "id": "swipe-actions",
        "title": "滑动操作 · Swipe actions",
        "component": "Swipe actions",
        "summary": "操作免费组件预览，并逐文件查看与复制原始源码。",
        "entrypoint": "demos/materials/arc-ui/index.html?demo=swipe-actions"
      },
      {
        "id": "reactions",
        "title": "表态反馈 · Reactions",
        "component": "Reactions",
        "summary": "操作免费组件预览，并逐文件查看与复制原始源码。",
        "entrypoint": "demos/materials/arc-ui/index.html?demo=reactions"
      },
      {
        "id": "slider",
        "title": "滑块 · Slider",
        "component": "Slider",
        "summary": "操作免费组件预览，并逐文件查看与复制原始源码。",
        "entrypoint": "demos/materials/arc-ui/index.html?demo=slider"
      },
      {
        "id": "elastic-slider",
        "title": "弹性滑块 · Elastic slider",
        "component": "Elastic slider",
        "summary": "操作免费组件预览，并逐文件查看与复制原始源码。",
        "entrypoint": "demos/materials/arc-ui/index.html?demo=elastic-slider"
      },
      {
        "id": "range-histogram-slider",
        "title": "区间直方图滑块 · Range histogram slider",
        "component": "Range histogram slider",
        "summary": "操作免费组件预览，并逐文件查看与复制原始源码。",
        "entrypoint": "demos/materials/arc-ui/index.html?demo=range-histogram-slider"
      },
      {
        "id": "ruler-slider",
        "title": "刻度滑块 · Ruler slider",
        "component": "Ruler slider",
        "summary": "操作免费组件预览，并逐文件查看与复制原始源码。",
        "entrypoint": "demos/materials/arc-ui/index.html?demo=ruler-slider"
      },
      {
        "id": "inline-edit",
        "title": "行内编辑 · Inline edit",
        "component": "Inline edit",
        "summary": "操作免费组件预览，并逐文件查看与复制原始源码。",
        "entrypoint": "demos/materials/arc-ui/index.html?demo=inline-edit"
      },
      {
        "id": "expanding-search",
        "title": "展开搜索 · Expanding search",
        "component": "Expanding search",
        "summary": "操作免费组件预览，并逐文件查看与复制原始源码。",
        "entrypoint": "demos/materials/arc-ui/index.html?demo=expanding-search"
      },
      {
        "id": "chip-group",
        "title": "标签选项组 · Chip group",
        "component": "Chip group",
        "summary": "操作免费组件预览，并逐文件查看与复制原始源码。",
        "entrypoint": "demos/materials/arc-ui/index.html?demo=chip-group"
      },
      {
        "id": "password-strength",
        "title": "密码强度 · Password strength",
        "component": "Password strength",
        "summary": "操作免费组件预览，并逐文件查看与复制原始源码。",
        "entrypoint": "demos/materials/arc-ui/index.html?demo=password-strength"
      },
      {
        "id": "bottom-sheet",
        "title": "底部面板 · Bottom sheet",
        "component": "Bottom sheet",
        "summary": "操作免费组件预览，并逐文件查看与复制原始源码。",
        "entrypoint": "demos/materials/arc-ui/index.html?demo=bottom-sheet"
      },
      {
        "id": "hover-card",
        "title": "悬停卡片 · Hover card",
        "component": "Hover card",
        "summary": "操作免费组件预览，并逐文件查看与复制原始源码。",
        "entrypoint": "demos/materials/arc-ui/index.html?demo=hover-card"
      },
      {
        "id": "resizable-panels",
        "title": "可调面板 · Resizable panels",
        "component": "Resizable panels",
        "summary": "操作免费组件预览，并逐文件查看与复制原始源码。",
        "entrypoint": "demos/materials/arc-ui/index.html?demo=resizable-panels"
      },
      {
        "id": "toast-stack",
        "title": "堆叠通知 · Toast stack",
        "component": "Toast stack",
        "summary": "操作免费组件预览，并逐文件查看与复制原始源码。",
        "entrypoint": "demos/materials/arc-ui/index.html?demo=toast-stack"
      },
      {
        "id": "usage-meter",
        "title": "用量计量 · Usage meter",
        "component": "Usage meter",
        "summary": "操作免费组件预览，并逐文件查看与复制原始源码。",
        "entrypoint": "demos/materials/arc-ui/index.html?demo=usage-meter"
      },
      {
        "id": "onboarding-checklist",
        "title": "入门清单 · Onboarding checklist",
        "component": "Onboarding checklist",
        "summary": "操作免费组件预览，并逐文件查看与复制原始源码。",
        "entrypoint": "demos/materials/arc-ui/index.html?demo=onboarding-checklist"
      },
      {
        "id": "image-compare",
        "title": "图像对比 · Image compare",
        "component": "Image compare",
        "summary": "操作免费组件预览，并逐文件查看与复制原始源码。",
        "entrypoint": "demos/materials/arc-ui/index.html?demo=image-compare"
      },
      {
        "id": "carousel",
        "title": "轮播 · Carousel",
        "component": "Carousel",
        "summary": "操作免费组件预览，并逐文件查看与复制原始源码。",
        "entrypoint": "demos/materials/arc-ui/index.html?demo=carousel"
      },
      {
        "id": "card-stack",
        "title": "卡片堆 · Card stack",
        "component": "Card stack",
        "summary": "操作免费组件预览，并逐文件查看与复制原始源码。",
        "entrypoint": "demos/materials/arc-ui/index.html?demo=card-stack"
      },
      {
        "id": "bar-chart",
        "title": "柱状图 · Bar chart",
        "component": "Bar chart",
        "summary": "操作免费组件预览，并逐文件查看与复制原始源码。",
        "entrypoint": "demos/materials/arc-ui/index.html?demo=bar-chart"
      },
      {
        "id": "activity-heatmap",
        "title": "活动热力图 · Activity heatmap",
        "component": "Activity heatmap",
        "summary": "操作免费组件预览，并逐文件查看与复制原始源码。",
        "entrypoint": "demos/materials/arc-ui/index.html?demo=activity-heatmap"
      },
      {
        "id": "timeline",
        "title": "时间线 · Timeline",
        "component": "Timeline",
        "summary": "操作免费组件预览，并逐文件查看与复制原始源码。",
        "entrypoint": "demos/materials/arc-ui/index.html?demo=timeline"
      },
      {
        "id": "user-menu",
        "title": "用户菜单 · User menu",
        "component": "User menu",
        "summary": "操作免费组件预览，并逐文件查看与复制原始源码。",
        "entrypoint": "demos/materials/arc-ui/index.html?demo=user-menu"
      },
      {
        "id": "stepper",
        "title": "步骤条 · Stepper",
        "component": "Stepper",
        "summary": "操作免费组件预览，并逐文件查看与复制原始源码。",
        "entrypoint": "demos/materials/arc-ui/index.html?demo=stepper"
      },
      {
        "id": "signature-pad",
        "title": "签名板 · Signature pad",
        "component": "Signature pad",
        "summary": "操作免费组件预览，并逐文件查看与复制原始源码。",
        "entrypoint": "demos/materials/arc-ui/index.html?demo=signature-pad"
      },
      {
        "id": "icon-morph",
        "title": "图标形变 · Icon morph",
        "component": "Icon morph",
        "summary": "操作免费组件预览，并逐文件查看与复制原始源码。",
        "entrypoint": "demos/materials/arc-ui/index.html?demo=icon-morph"
      },
      {
        "id": "date-range-picker",
        "title": "日期区间选择 · Date range picker",
        "component": "Date range picker",
        "summary": "操作免费组件预览，并逐文件查看与复制原始源码。",
        "entrypoint": "demos/materials/arc-ui/index.html?demo=date-range-picker"
      },
      {
        "id": "color-picker",
        "title": "颜色选择 · Color picker",
        "component": "Color picker",
        "summary": "操作免费组件预览，并逐文件查看与复制原始源码。",
        "entrypoint": "demos/materials/arc-ui/index.html?demo=color-picker"
      },
      {
        "id": "morph-select",
        "title": "形变选择器 · Morph select",
        "component": "Morph select",
        "summary": "操作免费组件预览，并逐文件查看与复制原始源码。",
        "entrypoint": "demos/materials/arc-ui/index.html?demo=morph-select"
      },
      {
        "id": "line-chart",
        "title": "折线图 · Line chart",
        "component": "Line chart",
        "summary": "操作免费组件预览，并逐文件查看与复制原始源码。",
        "entrypoint": "demos/materials/arc-ui/index.html?demo=line-chart"
      },
      {
        "id": "donut-chart",
        "title": "环形图 · Donut chart",
        "component": "Donut chart",
        "summary": "操作免费组件预览，并逐文件查看与复制原始源码。",
        "entrypoint": "demos/materials/arc-ui/index.html?demo=donut-chart"
      },
      {
        "id": "streamgraph",
        "title": "流图 · Streamgraph",
        "component": "Streamgraph",
        "summary": "操作免费组件预览，并逐文件查看与复制原始源码。",
        "entrypoint": "demos/materials/arc-ui/index.html?demo=streamgraph"
      },
      {
        "id": "brush-chart",
        "title": "刷选图表 · Brush chart",
        "component": "Brush chart",
        "summary": "操作免费组件预览，并逐文件查看与复制原始源码。",
        "entrypoint": "demos/materials/arc-ui/index.html?demo=brush-chart"
      },
      {
        "id": "ridgeline",
        "title": "山脊图 · Ridgeline",
        "component": "Ridgeline",
        "summary": "操作免费组件预览，并逐文件查看与复制原始源码。",
        "entrypoint": "demos/materials/arc-ui/index.html?demo=ridgeline"
      },
      {
        "id": "treemap",
        "title": "矩形树图 · Treemap",
        "component": "Treemap",
        "summary": "操作免费组件预览，并逐文件查看与复制原始源码。",
        "entrypoint": "demos/materials/arc-ui/index.html?demo=treemap"
      },
      {
        "id": "waffle-chart",
        "title": "华夫图 · Waffle chart",
        "component": "Waffle chart",
        "summary": "操作免费组件预览，并逐文件查看与复制原始源码。",
        "entrypoint": "demos/materials/arc-ui/index.html?demo=waffle-chart"
      },
      {
        "id": "slope-chart",
        "title": "坡度图 · Slope chart",
        "component": "Slope chart",
        "summary": "操作免费组件预览，并逐文件查看与复制原始源码。",
        "entrypoint": "demos/materials/arc-ui/index.html?demo=slope-chart"
      },
      {
        "id": "countdown",
        "title": "倒计时 · Countdown",
        "component": "Countdown",
        "summary": "操作免费组件预览，并逐文件查看与复制原始源码。",
        "entrypoint": "demos/materials/arc-ui/index.html?demo=countdown"
      },
      {
        "id": "cookie-consent",
        "title": "Cookie 同意面板 · Cookie consent",
        "component": "Cookie consent",
        "summary": "操作免费组件预览，并逐文件查看与复制原始源码。",
        "entrypoint": "demos/materials/arc-ui/index.html?demo=cookie-consent"
      },
      {
        "id": "announcement-bar",
        "title": "公告栏 · Announcement bar",
        "component": "Announcement bar",
        "summary": "操作免费组件预览，并逐文件查看与复制原始源码。",
        "entrypoint": "demos/materials/arc-ui/index.html?demo=announcement-bar"
      },
      {
        "id": "json-viewer",
        "title": "JSON 查看器 · JSON viewer",
        "component": "JSON viewer",
        "summary": "操作免费组件预览，并逐文件查看与复制原始源码。",
        "entrypoint": "demos/materials/arc-ui/index.html?demo=json-viewer"
      },
      {
        "id": "scrub-input",
        "title": "拖动数值输入 · Scrub input",
        "component": "Scrub input",
        "summary": "操作免费组件预览，并逐文件查看与复制原始源码。",
        "entrypoint": "demos/materials/arc-ui/index.html?demo=scrub-input"
      },
      {
        "id": "tree-table",
        "title": "树状表格 · Tree table",
        "component": "Tree table",
        "summary": "操作免费组件预览，并逐文件查看与复制原始源码。",
        "entrypoint": "demos/materials/arc-ui/index.html?demo=tree-table"
      },
      {
        "id": "phone-input",
        "title": "电话输入 · Phone input",
        "component": "Phone input",
        "summary": "操作免费组件预览，并逐文件查看与复制原始源码。",
        "entrypoint": "demos/materials/arc-ui/index.html?demo=phone-input"
      },
      {
        "id": "money-input",
        "title": "金额输入 · Money input",
        "component": "Money input",
        "summary": "操作免费组件预览，并逐文件查看与复制原始源码。",
        "entrypoint": "demos/materials/arc-ui/index.html?demo=money-input"
      },
      {
        "id": "shortcut-recorder",
        "title": "快捷键录入 · Shortcut recorder",
        "component": "Shortcut recorder",
        "summary": "操作免费组件预览，并逐文件查看与复制原始源码。",
        "entrypoint": "demos/materials/arc-ui/index.html?demo=shortcut-recorder"
      },
      {
        "id": "confirm-morph",
        "title": "确认形变 · Confirm morph",
        "component": "Confirm morph",
        "summary": "操作免费组件预览，并逐文件查看与复制原始源码。",
        "entrypoint": "demos/materials/arc-ui/index.html?demo=confirm-morph"
      },
      {
        "id": "mention-input",
        "title": "提及输入 · Mention input",
        "component": "Mention input",
        "summary": "操作免费组件预览，并逐文件查看与复制原始源码。",
        "entrypoint": "demos/materials/arc-ui/index.html?demo=mention-input"
      },
      {
        "id": "chat-thread",
        "title": "聊天串 · Chat thread",
        "component": "Chat thread",
        "summary": "操作免费组件预览，并逐文件查看与复制原始源码。",
        "entrypoint": "demos/materials/arc-ui/index.html?demo=chat-thread"
      },
      {
        "id": "rich-text-editor",
        "title": "富文本编辑器 · Rich text editor",
        "component": "Rich text editor",
        "summary": "操作免费组件预览，并逐文件查看与复制原始源码。",
        "entrypoint": "demos/materials/arc-ui/index.html?demo=rich-text-editor"
      },
      {
        "id": "billing-toggle",
        "title": "计费周期切换 · Billing toggle",
        "component": "Billing toggle",
        "summary": "操作免费组件预览，并逐文件查看与复制原始源码。",
        "entrypoint": "demos/materials/arc-ui/index.html?demo=billing-toggle"
      },
      {
        "id": "scroll-area",
        "title": "滚动区域 · Scroll area",
        "component": "Scroll area",
        "summary": "操作免费组件预览，并逐文件查看与复制原始源码。",
        "entrypoint": "demos/materials/arc-ui/index.html?demo=scroll-area"
      },
      {
        "id": "radio-cards",
        "title": "单选卡片 · Radio cards",
        "component": "Radio cards",
        "summary": "操作免费组件预览，并逐文件查看与复制原始源码。",
        "entrypoint": "demos/materials/arc-ui/index.html?demo=radio-cards"
      },
      {
        "id": "comment-thread",
        "title": "评论串 · Comment thread",
        "component": "Comment thread",
        "summary": "操作免费组件预览，并逐文件查看与复制原始源码。",
        "entrypoint": "demos/materials/arc-ui/index.html?demo=comment-thread"
      },
      {
        "id": "slot-text",
        "title": "滚轮文字 · Slot text",
        "component": "Slot text",
        "summary": "操作免费组件预览，并逐文件查看与复制原始源码。",
        "entrypoint": "demos/materials/arc-ui/index.html?demo=slot-text"
      },
      {
        "id": "expandable-text",
        "title": "展开文本 · Expandable text",
        "component": "Expandable text",
        "summary": "操作免费组件预览，并逐文件查看与复制原始源码。",
        "entrypoint": "demos/materials/arc-ui/index.html?demo=expandable-text"
      },
      {
        "id": "signup-form",
        "title": "注册表单 · Sign up form",
        "component": "Sign up form",
        "summary": "操作免费区块预览，并逐文件查看与复制原始源码。",
        "entrypoint": "demos/materials/arc-ui/index.html?demo=signup-form"
      },
      {
        "id": "logo-marquee",
        "title": "标识走马灯 · Logo marquee",
        "component": "Logo marquee",
        "summary": "操作免费区块预览，并逐文件查看与复制原始源码。",
        "entrypoint": "demos/materials/arc-ui/index.html?demo=logo-marquee"
      },
      {
        "id": "plan-comparison",
        "title": "套餐对比 · Plan comparison",
        "component": "Plan comparison",
        "summary": "操作免费区块预览，并逐文件查看与复制原始源码。",
        "entrypoint": "demos/materials/arc-ui/index.html?demo=plan-comparison"
      },
      {
        "id": "command-palette",
        "title": "命令面板 · Command palette",
        "component": "Command palette",
        "summary": "操作免费区块预览，并逐文件查看与复制原始源码。",
        "entrypoint": "demos/materials/arc-ui/index.html?demo=command-palette"
      },
      {
        "id": "notification-center",
        "title": "通知中心 · Notification center",
        "component": "Notification center",
        "summary": "操作免费区块预览，并逐文件查看与复制原始源码。",
        "entrypoint": "demos/materials/arc-ui/index.html?demo=notification-center"
      },
      {
        "id": "file-upload",
        "title": "文件上传 · File upload",
        "component": "File upload",
        "summary": "操作免费区块预览，并逐文件查看与复制原始源码。",
        "entrypoint": "demos/materials/arc-ui/index.html?demo=file-upload"
      },
      {
        "id": "otp-input",
        "title": "验证码输入 · OTP input",
        "component": "OTP input",
        "summary": "操作免费区块预览，并逐文件查看与复制原始源码。",
        "entrypoint": "demos/materials/arc-ui/index.html?demo=otp-input"
      },
      {
        "id": "changelog-feed",
        "title": "更新日志流 · Changelog feed",
        "component": "Changelog feed",
        "summary": "操作免费区块预览，并逐文件查看与复制原始源码。",
        "entrypoint": "demos/materials/arc-ui/index.html?demo=changelog-feed"
      },
      {
        "id": "sign-in",
        "title": "登录表单 · Sign in",
        "component": "Sign in",
        "summary": "操作免费区块预览，并逐文件查看与复制原始源码。",
        "entrypoint": "demos/materials/arc-ui/index.html?demo=sign-in"
      },
      {
        "id": "page-header",
        "title": "页面首部 · Page header",
        "component": "Page header",
        "summary": "操作免费区块预览，并逐文件查看与复制原始源码。",
        "entrypoint": "demos/materials/arc-ui/index.html?demo=page-header"
      },
      {
        "id": "empty-states",
        "title": "空状态集合 · Empty states",
        "component": "Empty states",
        "summary": "操作免费区块预览，并逐文件查看与复制原始源码。",
        "entrypoint": "demos/materials/arc-ui/index.html?demo=empty-states"
      },
      {
        "id": "login-centered",
        "title": "居中登录 · Centered login",
        "component": "Centered login",
        "summary": "操作免费区块预览，并逐文件查看与复制原始源码。",
        "entrypoint": "demos/materials/arc-ui/index.html?demo=login-centered"
      },
      {
        "id": "site-header",
        "title": "站点导航 · Site header",
        "component": "Site header",
        "summary": "操作免费区块预览，并逐文件查看与复制原始源码。",
        "entrypoint": "demos/materials/arc-ui/index.html?demo=site-header"
      },
      {
        "id": "site-footer",
        "title": "站点页脚 · Site footer",
        "component": "Site footer",
        "summary": "操作免费区块预览，并逐文件查看与复制原始源码。",
        "entrypoint": "demos/materials/arc-ui/index.html?demo=site-footer"
      },
      {
        "id": "hero-section",
        "title": "首屏区块 · Hero section",
        "component": "Hero section",
        "summary": "操作免费区块预览，并逐文件查看与复制原始源码。",
        "entrypoint": "demos/materials/arc-ui/index.html?demo=hero-section"
      },
      {
        "id": "faq-section",
        "title": "常见问题 · FAQ section",
        "component": "FAQ section",
        "summary": "操作免费区块预览，并逐文件查看与复制原始源码。",
        "entrypoint": "demos/materials/arc-ui/index.html?demo=faq-section"
      },
      {
        "id": "contact-section",
        "title": "联系区块 · Contact section",
        "component": "Contact section",
        "summary": "操作免费区块预览，并逐文件查看与复制原始源码。",
        "entrypoint": "demos/materials/arc-ui/index.html?demo=contact-section"
      },
      {
        "id": "blog-grid",
        "title": "博客网格 · Blog grid",
        "component": "Blog grid",
        "summary": "操作免费区块预览，并逐文件查看与复制原始源码。",
        "entrypoint": "demos/materials/arc-ui/index.html?demo=blog-grid"
      },
      {
        "id": "comparison-table",
        "title": "对比表格 · Comparison table",
        "component": "Comparison table",
        "summary": "操作免费区块预览，并逐文件查看与复制原始源码。",
        "entrypoint": "demos/materials/arc-ui/index.html?demo=comparison-table"
      },
      {
        "id": "stats-band",
        "title": "统计指标带 · Stats band",
        "component": "Stats band",
        "summary": "操作免费区块预览，并逐文件查看与复制原始源码。",
        "entrypoint": "demos/materials/arc-ui/index.html?demo=stats-band"
      },
      {
        "id": "cta-section",
        "title": "行动号召区块 · CTA section",
        "component": "CTA section",
        "summary": "操作免费区块预览，并逐文件查看与复制原始源码。",
        "entrypoint": "demos/materials/arc-ui/index.html?demo=cta-section"
      },
      {
        "id": "newsletter-signup",
        "title": "邮件订阅 · Newsletter signup",
        "component": "Newsletter signup",
        "summary": "操作免费区块预览，并逐文件查看与复制原始源码。",
        "entrypoint": "demos/materials/arc-ui/index.html?demo=newsletter-signup"
      }
    ],
    "sourceFiles": [
      "demos/materials/arc-ui/source/main.tsx",
      "demos/materials/arc-ui/source/build.mjs",
      "demos/materials/arc-ui/source/navigation.json",
      "demos/materials/arc-ui/source/fetch-media.mjs",
      "demos/materials/arc-ui/source/media.json",
      "demos/materials/arc-ui/source/media.tsx",
      "demos/materials/arc-ui/source/next-link.tsx",
      "demos/materials/arc-ui/source/package.json",
      "demos/materials/arc-ui/source/package-lock.json",
      "demos/materials/arc-ui/source/previews/actions.tsx",
      "demos/materials/arc-ui/source/previews/inputs.tsx",
      "demos/materials/arc-ui/source/previews/content.tsx",
      "demos/materials/arc-ui/source/previews/charts.tsx",
      "demos/materials/arc-ui/source/previews/text.tsx",
      "demos/materials/arc-ui/source/previews/blocks.tsx",
      "demos/materials/arc-ui/source/upstream/registry.json",
      "demos/materials/arc-ui/source/upstream/registry/foundation.css",
      "demos/materials/arc-ui/source/upstream/lib/motion-tokens.ts",
      "demos/materials/arc-ui/fidelity.md",
      "demos/materials/arc-ui/source/appearance.tsx",
      "demos/materials/arc-ui/source/catalog-panel.tsx",
      "demos/materials/arc-ui/source/library-overlays.tsx",
      "demos/materials/arc-ui/source/preview-stage.tsx",
      "demos/materials/arc-ui/source/render-preview.tsx",
      "demos/materials/arc-ui/source/frame.tsx"
    ],
    "prompt": "在 React 页面中取用 Arc UI 的免费组件或区块。先从完整目录操作预览，再到代码区读取对应的 TypeScript、CSS 和关联文件，按固定 registry 的依赖关系复制。保留上游组件结构、语义 tokens、动效参数、键盘模型与减少动态分支，只按真实任务调整 props、数据与组合。使用 source/upstream/ 的固定快照和当前项目明确固定的依赖版本，保留代码、运行依赖、字体与媒体的许可署名。官网首页布局从独立案例取得。"
  },
  {
    "id": "hallmark-skill",
    "order": 11,
    "title": "Hallmark · 反 AI 套路的网页设计 skill",
    "type": "agent-skill",
    "category": "Agent 工作流",
    "summary": "用不可破例的底线、可记录破例的惯性检查和 50 套材料主题规范 Agent 的网页设计流程：先发主题，按页面用途确定结构，再完成真实浏览器检查和无上下文审查；用户点名后，也能重新设计或审计已有页面。",
    "install": "npx skills add nutlope/hallmark -g 全局安装；或把 demos/materials/hallmark-skill/ 复制到 .claude/skills/hallmark/ 或 .agents/skills/hallmark/。在 Claude Code 用 /hallmark <提示词> 调用，在 Codex CLI 用 $hallmark <提示词>。",
    "tags": [
      "网页设计",
      "反 AI 套路",
      "主题库",
      "页面审查",
      "重新设计",
      "开放授权摄影",
      "浏览器检查"
    ],
    "useCases": [
      "从零制作落地页与产品页",
      "用开放授权照片和真实材料搭建品牌页面",
      "用户点名后重新设计已有站点，保留内容与接线",
      "审计现有页面里的生成痕迹"
    ],
    "avoid": [
      "未点名时改动已有设计",
      "编造指标、证言或客户标识",
      "按时间线播放的视频与展示台"
    ],
    "constraints": [
      "本条目保存上游固定提交的技能原文、脚本与评测工具。",
      "浏览器检查需要 puppeteer-core 与 Chrome；缺少时只运行静态检查。",
      "图片生成只在设置 TOGETHER_API_KEY 且用户要求时使用，默认用 scripts/photos.json 登记的 755 张 Wikimedia Commons 开放授权照片，页面逐张署名。",
      "redesign 和 audit 只在用户点名时运行；audit 只出报告。"
    ],
    "upstream": {
      "repository": "Nutlope/hallmark",
      "url": "https://github.com/Nutlope/hallmark/tree/4f6a46c6dc325d40ab268c93e25c7b96676ebccd",
      "commit": "4f6a46c6dc325d40ab268c93e25c7b96676ebccd",
      "version": "2.0.0",
      "verifiedAt": "2026-11-01"
    },
    "license": {
      "name": "MIT",
      "url": "https://github.com/Nutlope/hallmark/blob/4f6a46c6dc325d40ab268c93e25c7b96676ebccd/skills/hallmark/LICENSE",
      "scope": "Hallmark 技能文本、参考文件与脚本。",
      "notes": "photos.json 登记照片地址与署名，照片分别采用 CC0、公有领域、CC BY 或 CC BY-SA 许可。"
    },
    "sources": [
      {
        "title": "Hallmark 技能原文",
        "url": "https://github.com/Nutlope/hallmark/blob/4f6a46c6dc325d40ab268c93e25c7b96676ebccd/skills/hallmark/SKILL.md",
        "note": "Floor、主题、首屏先行、浏览器检查与新上下文审查的直接流程。",
        "evidence": "source"
      },
      {
        "title": "宿主与流程分支",
        "url": "https://github.com/Nutlope/hallmark/blob/4f6a46c6dc325d40ab268c93e25c7b96676ebccd/skills/hallmark/references/flow.md",
        "note": "锁定 design.md、custom、组件／应用范围及 Codex CLI 审查方式。",
        "evidence": "source"
      },
      {
        "title": "重新设计与审计",
        "url": "https://github.com/Nutlope/hallmark/blob/4f6a46c6dc325d40ab268c93e25c7b96676ebccd/skills/hallmark/references/redesign.md",
        "note": "full、restyle、polish 深度、--before／--kept 和 audit 报告边界。",
        "evidence": "source"
      },
      {
        "title": "效果图",
        "url": "https://github.com/Nutlope/hallmark/tree/4f6a46c6dc325d40ab268c93e25c7b96676ebccd/site/assets/desk",
        "note": "画廊图片托管于 Nutlope/hallmark 固定提交的 site/assets/desk/。",
        "evidence": "source"
      }
    ],
    "snapshotPath": "demos/materials/hallmark-skill/",
    "snapshotEntry": "SKILL.md",
    "workflow": [
      "预检时读取项目的字体、配色、框架和锁定的 design.md，一次性向用户索取照片、截图和真实数字，不编造内容。",
      "先按材料与页面用途设计结构。没有锁定 design.md 且未指定主题时，用 theme.mjs deal 发出三个主题，看图选定后用 draw 抽取结构；custom 按提示词设计专属方向。已有锁定系统时跳过主题发牌。",
      "用 scaffold 写入 tokens.css 和 base.css，先单独完成首屏，运行 --render --stage hero，再在新上下文审查首屏；Codex CLI 在当前线程完成审查，并说明这一点。",
      "完成其余页面，把行动入口放在该品类应有的位置，并以该入口结束页面。",
      "用 sloplint --render 在真实浏览器中按多种宽度测量折叠线、对比度、焦点和节奏；修复全部 FAIL，逐条修复 REFLEX 或记录破例。",
      "在新上下文审查成品；支持子 Agent 的宿主使用子 Agent，Codex CLI 在当前线程完成审查并说明这一点。CSS 首行保留决策戳；重新设计时，额外用 --before 记录，用 --kept 比对全部链接、字段、处理器和标题。"
    ],
    "relatedEntries": [
      {
        "kind": "case",
        "id": "hallmark",
        "note": "官网、50 个主题示范页和 21 个成品页。"
      }
    ],
    "preview": "previews/materials/hallmark-skill.jpg",
    "research": "docs/materials/hallmark-skill.md",
    "sourceFiles": [
      "demos/materials/hallmark-skill/SKILL.md",
      "demos/materials/hallmark-skill/README.md",
      "demos/materials/hallmark-skill/references/gates.md",
      "demos/materials/hallmark-skill/scripts/sloplint.mjs",
      "demos/materials/hallmark-skill/scripts/theme.mjs"
    ],
    "prompt": "先阅读 demos/materials/hallmark-skill/SKILL.md，按宿主阅读 references/flow.md，明确页面材料、受众、用途和语气。已有 design.md 时遵守锁定系统；否则按指名主题、custom 或 deal 的优先顺序选方向，以材料与页面用途确定结构。scaffold 后先完成首屏并运行相应审查，再完成页面，用 sloplint --render 修掉 Floor FAIL，修复或逐条记录 Reflex 破例，完成新上下文审查并保留 CSS 决策戳。需要重新设计或审计时先阅读 references/redesign.md；用 --before 记录、--kept 保留内容与接线，audit 输出报告。参考结果阅读 hallmark 案例的真实页面与 fidelity.md。",
    "gallery": [
      {
        "path": "demos/cases/hallmark/assets/desk/refract.webp",
        "width": 960,
        "height": 600,
        "caption": "Refract：阳光照在白色灰泥上，水光在表面流动；示范品牌 Bellwater Lido",
        "kind": "theme",
        "sourceUrl": "https://raw.githubusercontent.com/Nutlope/hallmark/4f6a46c6dc325d40ab268c93e25c7b96676ebccd/site/assets/desk/refract.webp",
        "license": "Hallmark 仓库 MIT；示范页照片各自授权，见案例 LICENSES.md。",
        "replicaPage": "demos/cases/hallmark/themes/refract/index.html"
      },
      {
        "path": "demos/cases/hallmark/assets/desk/cobalt.webp",
        "width": 960,
        "height": 600,
        "caption": "Cobalt：干净的开发者工具，以一抹电光蓝点睛；示范品牌 Relay",
        "kind": "theme",
        "sourceUrl": "https://raw.githubusercontent.com/Nutlope/hallmark/4f6a46c6dc325d40ab268c93e25c7b96676ebccd/site/assets/desk/cobalt.webp",
        "license": "Hallmark 仓库 MIT；示范页照片各自授权，见案例 LICENSES.md。",
        "replicaPage": "demos/cases/hallmark/themes/cobalt/index.html"
      },
      {
        "path": "demos/cases/hallmark/assets/desk/dusk.webp",
        "width": 960,
        "height": 600,
        "caption": "Dusk：暮色薄雾与石板底色，产品置于烟色玻璃中；示范品牌 Closewise",
        "kind": "theme",
        "sourceUrl": "https://raw.githubusercontent.com/Nutlope/hallmark/4f6a46c6dc325d40ab268c93e25c7b96676ebccd/site/assets/desk/dusk.webp",
        "license": "Hallmark 仓库 MIT；示范页照片各自授权，见案例 LICENSES.md。",
        "replicaPage": "demos/cases/hallmark/themes/dusk/index.html"
      },
      {
        "path": "demos/cases/hallmark/assets/desk/vantage.webp",
        "width": 960,
        "height": 600,
        "caption": "Vantage：夜间扫描，每个点都经过测量与扫掠；示范品牌 Swath",
        "kind": "theme",
        "sourceUrl": "https://raw.githubusercontent.com/Nutlope/hallmark/4f6a46c6dc325d40ab268c93e25c7b96676ebccd/site/assets/desk/vantage.webp",
        "license": "Hallmark 仓库 MIT；示范页照片各自授权，见案例 LICENSES.md。",
        "replicaPage": "demos/cases/hallmark/themes/vantage/index.html"
      },
      {
        "path": "demos/cases/hallmark/assets/desk/furrow.webp",
        "width": 960,
        "height": 600,
        "caption": "Furrow：暖纸上的实用农场办公室，以一抹橘色点睛；示范品牌 Fieldbook",
        "kind": "theme",
        "sourceUrl": "https://raw.githubusercontent.com/Nutlope/hallmark/4f6a46c6dc325d40ab268c93e25c7b96676ebccd/site/assets/desk/furrow.webp",
        "license": "Hallmark 仓库 MIT；示范页照片各自授权，见案例 LICENSES.md。",
        "replicaPage": "demos/cases/hallmark/themes/furrow/index.html"
      },
      {
        "path": "demos/cases/hallmark/assets/desk/studio.webp",
        "width": 960,
        "height": 600,
        "caption": "Studio：设计工作室的白墙，作品保留真实色彩；示范品牌 Field Office",
        "kind": "theme",
        "sourceUrl": "https://raw.githubusercontent.com/Nutlope/hallmark/4f6a46c6dc325d40ab268c93e25c7b96676ebccd/site/assets/desk/studio.webp",
        "license": "Hallmark 仓库 MIT；示范页照片各自授权，见案例 LICENSES.md。",
        "replicaPage": "demos/cases/hallmark/themes/studio/index.html"
      },
      {
        "path": "demos/cases/hallmark/assets/desk/atelier.webp",
        "width": 960,
        "height": 600,
        "caption": "Atelier：温暖日光中的安静工作室，石灰墙与赭褐色；示范品牌 Maison Orla",
        "kind": "theme",
        "sourceUrl": "https://raw.githubusercontent.com/Nutlope/hallmark/4f6a46c6dc325d40ab268c93e25c7b96676ebccd/site/assets/desk/atelier.webp",
        "license": "Hallmark 仓库 MIT；示范页照片各自授权，见案例 LICENSES.md。",
        "replicaPage": "demos/cases/hallmark/themes/atelier/index.html"
      },
      {
        "path": "demos/cases/hallmark/assets/desk/ribbon.webp",
        "width": 960,
        "height": 600,
        "caption": "Ribbon：安静夜色、机加工推子与一颗亮着的胶囊按钮；示范品牌 Lull",
        "kind": "theme",
        "sourceUrl": "https://raw.githubusercontent.com/Nutlope/hallmark/4f6a46c6dc325d40ab268c93e25c7b96676ebccd/site/assets/desk/ribbon.webp",
        "license": "Hallmark 仓库 MIT；示范页照片各自授权，见案例 LICENSES.md。",
        "replicaPage": "demos/cases/hallmark/themes/ribbon/index.html"
      },
      {
        "path": "demos/cases/hallmark/assets/desk/dose.webp",
        "width": 960,
        "height": 600,
        "caption": "Dose：诊室般洁净的应用，带淡绿色调；示范品牌 Tandem",
        "kind": "theme",
        "sourceUrl": "https://raw.githubusercontent.com/Nutlope/hallmark/4f6a46c6dc325d40ab268c93e25c7b96676ebccd/site/assets/desk/dose.webp",
        "license": "Hallmark 仓库 MIT；示范页照片各自授权，见案例 LICENSES.md。",
        "replicaPage": "demos/cases/hallmark/themes/dose/index.html"
      },
      {
        "path": "demos/cases/hallmark/assets/desk/coral.webp",
        "width": 960,
        "height": 600,
        "caption": "Coral：暖灰色的平静应用，以一抹珊瑚色传递信号；示范品牌 Tilly",
        "kind": "theme",
        "sourceUrl": "https://raw.githubusercontent.com/Nutlope/hallmark/4f6a46c6dc325d40ab268c93e25c7b96676ebccd/site/assets/desk/coral.webp",
        "license": "Hallmark 仓库 MIT；示范页照片各自授权，见案例 LICENSES.md。",
        "replicaPage": "demos/cases/hallmark/themes/coral/index.html"
      },
      {
        "path": "demos/cases/hallmark/assets/desk/almanac.webp",
        "width": 960,
        "height": 600,
        "caption": "Almanac：石板色纸上的参考书，精确到小数位；示范品牌 Tidetable 2027",
        "kind": "theme",
        "sourceUrl": "https://raw.githubusercontent.com/Nutlope/hallmark/4f6a46c6dc325d40ab268c93e25c7b96676ebccd/site/assets/desk/almanac.webp",
        "license": "Hallmark 仓库 MIT；示范页照片各自授权，见案例 LICENSES.md。",
        "replicaPage": "demos/cases/hallmark/themes/almanac/index.html"
      },
      {
        "path": "demos/cases/hallmark/assets/desk/arcade.webp",
        "width": 960,
        "height": 600,
        "caption": "Arcade：夜间街机机柜，喧闹而明亮；示范品牌 Pixel Picnic",
        "kind": "theme",
        "sourceUrl": "https://raw.githubusercontent.com/Nutlope/hallmark/4f6a46c6dc325d40ab268c93e25c7b96676ebccd/site/assets/desk/arcade.webp",
        "license": "Hallmark 仓库 MIT；示范页照片各自授权，见案例 LICENSES.md。",
        "replicaPage": "demos/cases/hallmark/themes/arcade/index.html"
      },
      {
        "path": "demos/cases/hallmark/assets/desk/bloom.webp",
        "width": 960,
        "height": 600,
        "caption": "Bloom：两团陶土色微光温暖柔软纸面；示范品牌 Driftsong",
        "kind": "theme",
        "sourceUrl": "https://raw.githubusercontent.com/Nutlope/hallmark/4f6a46c6dc325d40ab268c93e25c7b96676ebccd/site/assets/desk/bloom.webp",
        "license": "Hallmark 仓库 MIT；示范页照片各自授权，见案例 LICENSES.md。",
        "replicaPage": "demos/cases/hallmark/themes/bloom/index.html"
      },
      {
        "path": "demos/cases/hallmark/assets/desk/blueprint.webp",
        "width": 960,
        "height": 600,
        "caption": "Blueprint：普鲁士蓝绘图纸与白色线条；示范品牌 Halden and Roe",
        "kind": "theme",
        "sourceUrl": "https://raw.githubusercontent.com/Nutlope/hallmark/4f6a46c6dc325d40ab268c93e25c7b96676ebccd/site/assets/desk/blueprint.webp",
        "license": "Hallmark 仓库 MIT；示范页照片各自授权，见案例 LICENSES.md。",
        "replicaPage": "demos/cases/hallmark/themes/blueprint/index.html"
      },
      {
        "path": "demos/cases/hallmark/assets/desk/broadside.webp",
        "width": 960,
        "height": 600,
        "caption": "Broadside：在浅黄纸上压印的木活字海报；示范品牌 Wickford Autumn Machinery Sale",
        "kind": "theme",
        "sourceUrl": "https://raw.githubusercontent.com/Nutlope/hallmark/4f6a46c6dc325d40ab268c93e25c7b96676ebccd/site/assets/desk/broadside.webp",
        "license": "Hallmark 仓库 MIT；示范页照片各自授权，见案例 LICENSES.md。",
        "replicaPage": "demos/cases/hallmark/themes/broadside/index.html"
      },
      {
        "path": "demos/cases/hallmark/assets/desk/brutal.webp",
        "width": 960,
        "height": 600,
        "caption": "Brutal：黑色线框、硬边色块与一抹酸黄；示范品牌 Unit Nine",
        "kind": "theme",
        "sourceUrl": "https://raw.githubusercontent.com/Nutlope/hallmark/4f6a46c6dc325d40ab268c93e25c7b96676ebccd/site/assets/desk/brutal.webp",
        "license": "Hallmark 仓库 MIT；示范页照片各自授权，见案例 LICENSES.md。",
        "replicaPage": "demos/cases/hallmark/themes/brutal/index.html"
      },
      {
        "path": "demos/cases/hallmark/assets/desk/carnival.webp",
        "width": 960,
        "height": 600,
        "caption": "Carnival：两种颜色争夺版面的游乐场招贴；示范品牌 Cold Comfort",
        "kind": "theme",
        "sourceUrl": "https://raw.githubusercontent.com/Nutlope/hallmark/4f6a46c6dc325d40ab268c93e25c7b96676ebccd/site/assets/desk/carnival.webp",
        "license": "Hallmark 仓库 MIT；示范页照片各自授权，见案例 LICENSES.md。",
        "replicaPage": "demos/cases/hallmark/themes/carnival/index.html"
      },
      {
        "path": "demos/cases/hallmark/assets/desk/console.webp",
        "width": 960,
        "height": 600,
        "caption": "Console：供全天运行软件使用的石墨色面板；示范品牌 Benchmark",
        "kind": "theme",
        "sourceUrl": "https://raw.githubusercontent.com/Nutlope/hallmark/4f6a46c6dc325d40ab268c93e25c7b96676ebccd/site/assets/desk/console.webp",
        "license": "Hallmark 仓库 MIT；示范页照片各自授权，见案例 LICENSES.md。",
        "replicaPage": "demos/cases/hallmark/themes/console/index.html"
      },
      {
        "path": "demos/cases/hallmark/assets/desk/darkroom.webp",
        "width": 960,
        "height": 600,
        "caption": "Darkroom：近黑色墙面上的黑白照片；示范品牌 Low Water",
        "kind": "theme",
        "sourceUrl": "https://raw.githubusercontent.com/Nutlope/hallmark/4f6a46c6dc325d40ab268c93e25c7b96676ebccd/site/assets/desk/darkroom.webp",
        "license": "Hallmark 仓库 MIT；示范页照片各自授权，见案例 LICENSES.md。",
        "replicaPage": "demos/cases/hallmark/themes/darkroom/index.html"
      },
      {
        "path": "demos/cases/hallmark/assets/desk/editorial.webp",
        "width": 960,
        "height": 600,
        "caption": "Editorial：非涂布纸上的黑墨杂志跨页；示范品牌 Margin Notes",
        "kind": "theme",
        "sourceUrl": "https://raw.githubusercontent.com/Nutlope/hallmark/4f6a46c6dc325d40ab268c93e25c7b96676ebccd/site/assets/desk/editorial.webp",
        "license": "Hallmark 仓库 MIT；示范页照片各自授权，见案例 LICENSES.md。",
        "replicaPage": "demos/cases/hallmark/themes/editorial/index.html"
      },
      {
        "path": "demos/cases/hallmark/assets/desk/formwork.webp",
        "width": 960,
        "height": 600,
        "caption": "Formwork：浇筑混凝土、硬阴影与黑白摄影；示范品牌 Ashgrove Concrete",
        "kind": "theme",
        "sourceUrl": "https://raw.githubusercontent.com/Nutlope/hallmark/4f6a46c6dc325d40ab268c93e25c7b96676ebccd/site/assets/desk/formwork.webp",
        "license": "Hallmark 仓库 MIT；示范页照片各自授权，见案例 LICENSES.md。",
        "replicaPage": "demos/cases/hallmark/themes/formwork/index.html"
      },
      {
        "path": "demos/cases/hallmark/assets/desk/garden.webp",
        "width": 960,
        "height": 600,
        "caption": "Garden：燕麦色纸、深绿墨与日光；示范品牌 Hollins Orchard",
        "kind": "theme",
        "sourceUrl": "https://raw.githubusercontent.com/Nutlope/hallmark/4f6a46c6dc325d40ab268c93e25c7b96676ebccd/site/assets/desk/garden.webp",
        "license": "Hallmark 仓库 MIT；示范页照片各自授权，见案例 LICENSES.md。",
        "replicaPage": "demos/cases/hallmark/themes/garden/index.html"
      },
      {
        "path": "demos/cases/hallmark/assets/desk/grid.webp",
        "width": 960,
        "height": 600,
        "caption": "Grid：瑞士式栏网、群青色块与一处红色标记；示范品牌 Kessler Archive",
        "kind": "theme",
        "sourceUrl": "https://raw.githubusercontent.com/Nutlope/hallmark/4f6a46c6dc325d40ab268c93e25c7b96676ebccd/site/assets/desk/grid.webp",
        "license": "Hallmark 仓库 MIT；示范页照片各自授权，见案例 LICENSES.md。",
        "replicaPage": "demos/cases/hallmark/themes/grid/index.html"
      },
      {
        "path": "demos/cases/hallmark/assets/desk/halftone.webp",
        "width": 960,
        "height": 600,
        "caption": "Halftone：奶油黄纸上经过网点印刷的漫画；示范品牌 Pop Fizz",
        "kind": "theme",
        "sourceUrl": "https://raw.githubusercontent.com/Nutlope/hallmark/4f6a46c6dc325d40ab268c93e25c7b96676ebccd/site/assets/desk/halftone.webp",
        "license": "Hallmark 仓库 MIT；示范页照片各自授权，见案例 LICENSES.md。",
        "replicaPage": "demos/cases/hallmark/themes/halftone/index.html"
      },
      {
        "path": "demos/cases/hallmark/assets/desk/hedgerow.webp",
        "width": 960,
        "height": 600,
        "caption": "Hedgerow：深篱绿、奶油色文字与一抹亮绿新芽；示范品牌 Five Mile Gin",
        "kind": "theme",
        "sourceUrl": "https://raw.githubusercontent.com/Nutlope/hallmark/4f6a46c6dc325d40ab268c93e25c7b96676ebccd/site/assets/desk/hedgerow.webp",
        "license": "Hallmark 仓库 MIT；示范页照片各自授权，见案例 LICENSES.md。",
        "replicaPage": "demos/cases/hallmark/themes/hedgerow/index.html"
      },
      {
        "path": "demos/cases/hallmark/assets/desk/hum.webp",
        "width": 960,
        "height": 600,
        "caption": "Hum：欢快而有触感，按钮像键盘按键般按下；示范品牌 Sprout",
        "kind": "theme",
        "sourceUrl": "https://raw.githubusercontent.com/Nutlope/hallmark/4f6a46c6dc325d40ab268c93e25c7b96676ebccd/site/assets/desk/hum.webp",
        "license": "Hallmark 仓库 MIT；示范页照片各自授权，见案例 LICENSES.md。",
        "replicaPage": "demos/cases/hallmark/themes/hum/index.html"
      },
      {
        "path": "demos/cases/hallmark/assets/desk/ink.webp",
        "width": 960,
        "height": 600,
        "caption": "Ink：白纸、纯黑与一抹蓝绿；示范品牌 Barton Road Library of Things",
        "kind": "theme",
        "sourceUrl": "https://raw.githubusercontent.com/Nutlope/hallmark/4f6a46c6dc325d40ab268c93e25c7b96676ebccd/site/assets/desk/ink.webp",
        "license": "Hallmark 仓库 MIT；示范页照片各自授权，见案例 LICENSES.md。",
        "replicaPage": "demos/cases/hallmark/themes/ink/index.html"
      },
      {
        "path": "demos/cases/hallmark/assets/desk/kiln.webp",
        "width": 960,
        "height": 600,
        "caption": "Kiln：暗色工坊里只有炽热物体发光；示范品牌 Cone Six",
        "kind": "theme",
        "sourceUrl": "https://raw.githubusercontent.com/Nutlope/hallmark/4f6a46c6dc325d40ab268c93e25c7b96676ebccd/site/assets/desk/kiln.webp",
        "license": "Hallmark 仓库 MIT；示范页照片各自授权，见案例 LICENSES.md。",
        "replicaPage": "demos/cases/hallmark/themes/kiln/index.html"
      },
      {
        "path": "demos/cases/hallmark/assets/desk/loom.webp",
        "width": 960,
        "height": 600,
        "caption": "Loom：窗光下近看的本色织物；示范品牌 Wren Weaving",
        "kind": "theme",
        "sourceUrl": "https://raw.githubusercontent.com/Nutlope/hallmark/4f6a46c6dc325d40ab268c93e25c7b96676ebccd/site/assets/desk/loom.webp",
        "license": "Hallmark 仓库 MIT；示范页照片各自授权，见案例 LICENSES.md。",
        "replicaPage": "demos/cases/hallmark/themes/loom/index.html"
      },
      {
        "path": "demos/cases/hallmark/assets/desk/lumen.webp",
        "width": 960,
        "height": 600,
        "caption": "Lumen：紫罗兰夜色与熔融黄铜细节；示范品牌 quarry",
        "kind": "theme",
        "sourceUrl": "https://raw.githubusercontent.com/Nutlope/hallmark/4f6a46c6dc325d40ab268c93e25c7b96676ebccd/site/assets/desk/lumen.webp",
        "license": "Hallmark 仓库 MIT；示范页照片各自授权，见案例 LICENSES.md。",
        "replicaPage": "demos/cases/hallmark/themes/lumen/index.html"
      },
      {
        "path": "demos/cases/hallmark/assets/desk/manifesto.webp",
        "width": 960,
        "height": 600,
        "caption": "Manifesto：暖黑底上的紧排大写字与一抹战斗红；示范品牌 Right to Repair Coalition",
        "kind": "theme",
        "sourceUrl": "https://raw.githubusercontent.com/Nutlope/hallmark/4f6a46c6dc325d40ab268c93e25c7b96676ebccd/site/assets/desk/manifesto.webp",
        "license": "Hallmark 仓库 MIT；示范页照片各自授权，见案例 LICENSES.md。",
        "replicaPage": "demos/cases/hallmark/themes/manifesto/index.html"
      },
      {
        "path": "demos/cases/hallmark/assets/desk/midnight.webp",
        "width": 960,
        "height": 600,
        "caption": "Midnight：铺满边缘的午夜蓝，冷静而有电影感；示范品牌 Afterimage",
        "kind": "theme",
        "sourceUrl": "https://raw.githubusercontent.com/Nutlope/hallmark/4f6a46c6dc325d40ab268c93e25c7b96676ebccd/site/assets/desk/midnight.webp",
        "license": "Hallmark 仓库 MIT；示范页照片各自授权，见案例 LICENSES.md。",
        "replicaPage": "demos/cases/hallmark/themes/midnight/index.html"
      },
      {
        "path": "demos/cases/hallmark/assets/desk/newsprint.webp",
        "width": 960,
        "height": 600,
        "caption": "Newsprint：地方报纸头版、粗衬线标题与分栏线；示范品牌 The Lantern",
        "kind": "theme",
        "sourceUrl": "https://raw.githubusercontent.com/Nutlope/hallmark/4f6a46c6dc325d40ab268c93e25c7b96676ebccd/site/assets/desk/newsprint.webp",
        "license": "Hallmark 仓库 MIT；示范页照片各自授权，见案例 LICENSES.md。",
        "replicaPage": "demos/cases/hallmark/themes/newsprint/index.html"
      },
      {
        "path": "demos/cases/hallmark/assets/desk/overprint.webp",
        "width": 960,
        "height": 600,
        "caption": "Overprint：新闻纸上的两色油墨，交叠处印出苔绿色；示范品牌 The Boiler Room",
        "kind": "theme",
        "sourceUrl": "https://raw.githubusercontent.com/Nutlope/hallmark/4f6a46c6dc325d40ab268c93e25c7b96676ebccd/site/assets/desk/overprint.webp",
        "license": "Hallmark 仓库 MIT；示范页照片各自授权，见案例 LICENSES.md。",
        "replicaPage": "demos/cases/hallmark/themes/overprint/index.html"
      },
      {
        "path": "demos/cases/hallmark/assets/desk/pasteup.webp",
        "width": 960,
        "height": 600,
        "caption": "Paste-up：牛皮纸板上拼贴的小志；示范品牌 Small Hours Zine Fair",
        "kind": "theme",
        "sourceUrl": "https://raw.githubusercontent.com/Nutlope/hallmark/4f6a46c6dc325d40ab268c93e25c7b96676ebccd/site/assets/desk/pasteup.webp",
        "license": "Hallmark 仓库 MIT；示范页照片各自授权，见案例 LICENSES.md。",
        "replicaPage": "demos/cases/hallmark/themes/pasteup/index.html"
      },
      {
        "path": "demos/cases/hallmark/assets/desk/piste.webp",
        "width": 960,
        "height": 600,
        "caption": "Piste：雪白、冷色油墨与一抹钴蓝；示范品牌 Col Blanc",
        "kind": "theme",
        "sourceUrl": "https://raw.githubusercontent.com/Nutlope/hallmark/4f6a46c6dc325d40ab268c93e25c7b96676ebccd/site/assets/desk/piste.webp",
        "license": "Hallmark 仓库 MIT；示范页照片各自授权，见案例 LICENSES.md。",
        "replicaPage": "demos/cases/hallmark/themes/piste/index.html"
      },
      {
        "path": "demos/cases/hallmark/assets/desk/rim.webp",
        "width": 960,
        "height": 600,
        "caption": "Rim：暖黑底与测量标记，俯瞰地球；示范品牌 Northstar",
        "kind": "theme",
        "sourceUrl": "https://raw.githubusercontent.com/Nutlope/hallmark/4f6a46c6dc325d40ab268c93e25c7b96676ebccd/site/assets/desk/rim.webp",
        "license": "Hallmark 仓库 MIT；示范页照片各自授权，见案例 LICENSES.md。",
        "replicaPage": "demos/cases/hallmark/themes/rim/index.html"
      },
      {
        "path": "demos/cases/hallmark/assets/desk/riso.webp",
        "width": 960,
        "height": 600,
        "caption": "Riso：蓝色与荧光粉双色滚筒孔版印刷；示范品牌 Off Register",
        "kind": "theme",
        "sourceUrl": "https://raw.githubusercontent.com/Nutlope/hallmark/4f6a46c6dc325d40ab268c93e25c7b96676ebccd/site/assets/desk/riso.webp",
        "license": "Hallmark 仓库 MIT；示范页照片各自授权，见案例 LICENSES.md。",
        "replicaPage": "demos/cases/hallmark/themes/riso/index.html"
      },
      {
        "path": "demos/cases/hallmark/assets/desk/solstice.webp",
        "width": 960,
        "height": 600,
        "caption": "Solstice：低垂晚光中的奶油色与金色；示范品牌 Long Meadow",
        "kind": "theme",
        "sourceUrl": "https://raw.githubusercontent.com/Nutlope/hallmark/4f6a46c6dc325d40ab268c93e25c7b96676ebccd/site/assets/desk/solstice.webp",
        "license": "Hallmark 仓库 MIT；示范页照片各自授权，见案例 LICENSES.md。",
        "replicaPage": "demos/cases/hallmark/themes/solstice/index.html"
      },
      {
        "path": "demos/cases/hallmark/assets/desk/specimen.webp",
        "width": 960,
        "height": 600,
        "caption": "Specimen：采用纤细 Bodoni 字体的字样册；示范品牌 Halyard",
        "kind": "theme",
        "sourceUrl": "https://raw.githubusercontent.com/Nutlope/hallmark/4f6a46c6dc325d40ab268c93e25c7b96676ebccd/site/assets/desk/specimen.webp",
        "license": "Hallmark 仓库 MIT；示范页照片各自授权，见案例 LICENSES.md。",
        "replicaPage": "demos/cases/hallmark/themes/specimen/index.html"
      },
      {
        "path": "demos/cases/hallmark/assets/desk/spore.webp",
        "width": 960,
        "height": 600,
        "caption": "Spore：灯光与烛光照亮咖啡黑底色；示范品牌 Night Cellar",
        "kind": "theme",
        "sourceUrl": "https://raw.githubusercontent.com/Nutlope/hallmark/4f6a46c6dc325d40ab268c93e25c7b96676ebccd/site/assets/desk/spore.webp",
        "license": "Hallmark 仓库 MIT；示范页照片各自授权，见案例 LICENSES.md。",
        "replicaPage": "demos/cases/hallmark/themes/spore/index.html"
      },
      {
        "path": "demos/cases/hallmark/assets/desk/sport.webp",
        "width": 960,
        "height": 600,
        "caption": "Sport：混凝土底上的赛事大写字与一抹电光黄；示范品牌 Calder Valley Half Marathon",
        "kind": "theme",
        "sourceUrl": "https://raw.githubusercontent.com/Nutlope/hallmark/4f6a46c6dc325d40ab268c93e25c7b96676ebccd/site/assets/desk/sport.webp",
        "license": "Hallmark 仓库 MIT；示范页照片各自授权，见案例 LICENSES.md。",
        "replicaPage": "demos/cases/hallmark/themes/sport/index.html"
      },
      {
        "path": "demos/cases/hallmark/assets/desk/squeeze.webp",
        "width": 960,
        "height": 600,
        "caption": "Squeeze：森林绿与明亮近摄的水果；示范品牌 Peachy",
        "kind": "theme",
        "sourceUrl": "https://raw.githubusercontent.com/Nutlope/hallmark/4f6a46c6dc325d40ab268c93e25c7b96676ebccd/site/assets/desk/squeeze.webp",
        "license": "Hallmark 仓库 MIT；示范页照片各自授权，见案例 LICENSES.md。",
        "replicaPage": "demos/cases/hallmark/themes/squeeze/index.html"
      },
      {
        "path": "demos/cases/hallmark/assets/desk/sticker.webp",
        "width": 960,
        "height": 600,
        "caption": "Sticker：亮粉与青柠色模切贴纸；示范品牌 Pip and Pocket",
        "kind": "theme",
        "sourceUrl": "https://raw.githubusercontent.com/Nutlope/hallmark/4f6a46c6dc325d40ab268c93e25c7b96676ebccd/site/assets/desk/sticker.webp",
        "license": "Hallmark 仓库 MIT；示范页照片各自授权，见案例 LICENSES.md。",
        "replicaPage": "demos/cases/hallmark/themes/sticker/index.html"
      },
      {
        "path": "demos/cases/hallmark/assets/desk/terminal.webp",
        "width": 960,
        "height": 600,
        "caption": "Terminal：页面就是终端，图像由字符印出；示范品牌 burrow",
        "kind": "theme",
        "sourceUrl": "https://raw.githubusercontent.com/Nutlope/hallmark/4f6a46c6dc325d40ab268c93e25c7b96676ebccd/site/assets/desk/terminal.webp",
        "license": "Hallmark 仓库 MIT；示范页照片各自授权，见案例 LICENSES.md。",
        "replicaPage": "demos/cases/hallmark/themes/terminal/index.html"
      },
      {
        "path": "demos/cases/hallmark/assets/desk/terrazzo.webp",
        "width": 960,
        "height": 600,
        "caption": "Terrazzo：米白底上的白卡片、宽标题与铁锈色；示范品牌 Sample Room",
        "kind": "theme",
        "sourceUrl": "https://raw.githubusercontent.com/Nutlope/hallmark/4f6a46c6dc325d40ab268c93e25c7b96676ebccd/site/assets/desk/terrazzo.webp",
        "license": "Hallmark 仓库 MIT；示范页照片各自授权，见案例 LICENSES.md。",
        "replicaPage": "demos/cases/hallmark/themes/terrazzo/index.html"
      },
      {
        "path": "demos/cases/hallmark/assets/desk/ultraviolet.webp",
        "width": 960,
        "height": 600,
        "caption": "Ultraviolet：淡紫纸面汇聚成一抹饱和紫罗兰色；示范品牌 stemcell",
        "kind": "theme",
        "sourceUrl": "https://raw.githubusercontent.com/Nutlope/hallmark/4f6a46c6dc325d40ab268c93e25c7b96676ebccd/site/assets/desk/ultraviolet.webp",
        "license": "Hallmark 仓库 MIT；示范页照片各自授权，见案例 LICENSES.md。",
        "replicaPage": "demos/cases/hallmark/themes/ultraviolet/index.html"
      },
      {
        "path": "demos/cases/hallmark/assets/desk/vellum.webp",
        "width": 960,
        "height": 600,
        "caption": "Vellum：老印刷所里的羊皮纸、哥特体与群青；示范品牌 Fenwick and Daughters",
        "kind": "theme",
        "sourceUrl": "https://raw.githubusercontent.com/Nutlope/hallmark/4f6a46c6dc325d40ab268c93e25c7b96676ebccd/site/assets/desk/vellum.webp",
        "license": "Hallmark 仓库 MIT；示范页照片各自授权，见案例 LICENSES.md。",
        "replicaPage": "demos/cases/hallmark/themes/vellum/index.html"
      },
      {
        "path": "demos/cases/hallmark/assets/desk/wayfind.webp",
        "width": 960,
        "height": 600,
        "caption": "Wayfind：等宽字导视，以钴蓝标明实时状态；示范品牌 Platform",
        "kind": "theme",
        "sourceUrl": "https://raw.githubusercontent.com/Nutlope/hallmark/4f6a46c6dc325d40ab268c93e25c7b96676ebccd/site/assets/desk/wayfind.webp",
        "license": "Hallmark 仓库 MIT；示范页照片各自授权，见案例 LICENSES.md。",
        "replicaPage": "demos/cases/hallmark/themes/wayfind/index.html"
      },
      {
        "path": "demos/cases/hallmark/assets/desk/werkstatt.webp",
        "width": 960,
        "height": 600,
        "caption": "Werkstatt：由三原色构成的工作坊；示范品牌 Summer School of Making",
        "kind": "theme",
        "sourceUrl": "https://raw.githubusercontent.com/Nutlope/hallmark/4f6a46c6dc325d40ab268c93e25c7b96676ebccd/site/assets/desk/werkstatt.webp",
        "license": "Hallmark 仓库 MIT；示范页照片各自授权，见案例 LICENSES.md。",
        "replicaPage": "demos/cases/hallmark/themes/werkstatt/index.html"
      }
    ]
  },
  {
    "id": "animejs",
    "order": 12,
    "title": "Anime.js · JavaScript 动画引擎",
    "type": "component-library",
    "category": "组件与效果",
    "summary": "归档 Anime.js 4.5.0 的完整发行库、源码与 36 个上游样例，涵盖 DOM、SVG、Canvas、三维变换、布局、滚动、拖拽与文本。",
    "tags": [
      "JavaScript",
      "Anime.js",
      "动画",
      "SVG",
      "Canvas",
      "Three.js",
      "滚动",
      "拖拽",
      "文本",
      "布局"
    ],
    "demo": "demos/materials/animejs/index.html",
    "preview": "previews/materials/animejs.png",
    "research": "docs/materials/animejs.md",
    "demoNote": "Anime.js 4.5.0",
    "install": "import { animate, stagger, createTimeline, onScroll, createDraggable, svg } from './vendor/animejs@4.5.0/dist/modules/index.js';",
    "upstream": {
      "repository": "juliangarnier/anime",
      "url": "https://github.com/juliangarnier/anime",
      "version": "4.5.0",
      "commit": "2c9cf8ea00329f6768c7d7902252ed977d75ce42",
      "verifiedAt": "2026-11-02"
    },
    "license": {
      "name": "MIT（代码）；SIL OFL 1.1（字体）",
      "url": "https://github.com/juliangarnier/anime/blob/2c9cf8ea00329f6768c7d7902252ed977d75ce42/LICENSE.md",
      "scope": "Anime.js 发行库、源码与样例代码；Three.js 和 tweaks 的 MIT 原文随包提供，共享 IoskeleyMono 字体保留 OFL 1.1 元数据。",
      "notes": "保留 Julian Garnier 与各依赖作者署名；Google Fonts 和 picsum.photos 来源见样例索引。"
    },
    "useCases": [
      "网页中的独立变换与微交互",
      "随滚动推进的页面叙事",
      "SVG 描线与形变",
      "可拖动、可响应媒体查询的界面",
      "文本拆分与布局切换"
    ],
    "avoid": [
      "以固定时间轴导出影片为主要交付物的工作"
    ],
    "constraints": [
      "Anime.js 固定 v4.5.0 与完整提交，样例保留原始目录层级。",
      "36 个样例共用完整 dist/，Three.js 固定 0.184.0，tweaks 固定 0.3.4。",
      "远程字体、随机图片和两处源码适配见样例索引。"
    ],
    "relatedEntries": [
      {
        "kind": "case",
        "id": "animejs-site",
        "note": "官网首页用 Anime.js 实现"
      }
    ],
    "sources": [
      {
        "title": "Anime.js 固定提交",
        "url": "https://github.com/juliangarnier/anime/tree/2c9cf8ea00329f6768c7d7902252ed977d75ce42",
        "note": "v4.5.0 的 examples、dist 和 src。",
        "evidence": "source"
      },
      {
        "title": "Anime.js 官方文档",
        "url": "https://animejs.com/documentation",
        "note": "动画、时间线、滚动、拖拽和 SVG API。",
        "evidence": "source"
      },
      {
        "title": "官方仓库的样例源码",
        "url": "https://github.com/juliangarnier/anime/tree/2c9cf8ea00329f6768c7d7902252ed977d75ce42/examples",
        "note": "收录含 index.html 的 36 个样例，包括嵌套目录。",
        "evidence": "source"
      },
      {
        "title": "官网 Examples · 作者的 CodePen 合集",
        "url": "https://codepen.io/collection/Poerqa",
        "note": "官网导航的 Examples 入口。",
        "evidence": "source"
      },
      {
        "title": "作者官网分享图",
        "url": "https://animejs.com/media/pages/home/066c76f87b-1787698629/generated-og-image.en.png",
        "note": "素材封面使用官网首页标注的品牌与模块分解原图。",
        "evidence": "source"
      }
    ],
    "sourceFiles": [
      "demos/materials/animejs/index.html",
      "demos/materials/animejs/demo/demo.js",
      "site/shared/theme.js",
      "demos/materials/animejs/vendor/animejs@4.5.0/dist/modules/index.js",
      "demos/materials/animejs/source/package.json",
      "docs/materials/animejs.md"
    ],
    "demos": [
      {
        "id": "additive-creature",
        "title": "指针引导的游动生物",
        "component": "animate、createTimeline、stagger",
        "summary": "以混合变换叠加出跟随指针的生物。",
        "entrypoint": "demos/materials/animejs/index.html?demo=additive-creature",
        "group": "图形与运动"
      },
      {
        "id": "additive-fireflies",
        "title": "萤火虫轨迹叠加",
        "component": "animate、createTimer",
        "summary": "点状元素的叠加运动与指针跟随。",
        "entrypoint": "demos/materials/animejs/index.html?demo=additive-fireflies",
        "group": "图形与运动"
      },
      {
        "id": "advanced-grid-staggering",
        "title": "从中心扩散的点阵",
        "component": "createTimeline、stagger",
        "summary": "以二维网格、中心距离和交错延迟组织点阵。",
        "entrypoint": "demos/materials/animejs/index.html?demo=advanced-grid-staggering",
        "group": "图形与运动"
      },
      {
        "id": "animatable-follow-cursor",
        "title": "平滑追随指针",
        "component": "createAnimatable",
        "summary": "通过可更新的动画属性，让目标平滑跟随指针。",
        "entrypoint": "demos/materials/animejs/index.html?demo=animatable-follow-cursor",
        "group": "图形与运动"
      },
      {
        "id": "animejs-v4-logo-animation",
        "title": "标志描线",
        "component": "createTimeline、svg、stagger",
        "summary": "沿真实 SVG 路径错峰描绘 Anime.js 标志。",
        "entrypoint": "demos/materials/animejs/index.html?demo=animejs-v4-logo-animation",
        "group": "文字与矢量"
      },
      {
        "id": "auto-layout-accordion",
        "title": "手风琴折叠",
        "component": "createLayout",
        "summary": "折叠面板在真实布局变化间过渡。",
        "entrypoint": "demos/materials/animejs/index.html?demo=auto-layout/accordion",
        "group": "自动布局"
      },
      {
        "id": "auto-layout-cards",
        "title": "可展开卡片",
        "component": "createLayout",
        "summary": "卡片在展开、排列与随机图片间保持布局连续。",
        "entrypoint": "demos/materials/animejs/index.html?demo=auto-layout/cards",
        "group": "自动布局"
      },
      {
        "id": "auto-layout-code",
        "title": "代码块换行",
        "component": "createLayout",
        "summary": "代码容器在内容变化时过渡到新布局。",
        "entrypoint": "demos/materials/animejs/index.html?demo=auto-layout/code",
        "group": "自动布局"
      },
      {
        "id": "auto-layout-grid-columns",
        "title": "网格列切换",
        "component": "createLayout",
        "summary": "网格列数改变时逐项衔接位置与尺寸。",
        "entrypoint": "demos/materials/animejs/index.html?demo=auto-layout/grid-columns",
        "group": "自动布局"
      },
      {
        "id": "auto-layout-nav",
        "title": "导航选中态",
        "component": "createLayout",
        "summary": "导航的选中项和排列随操作变换。",
        "entrypoint": "demos/materials/animejs/index.html?demo=auto-layout/nav",
        "group": "自动布局"
      },
      {
        "id": "auto-layout-onscroll",
        "title": "滚动重排",
        "component": "createLayout、onScroll",
        "summary": "滚动触发布局变化。",
        "entrypoint": "demos/materials/animejs/index.html?demo=auto-layout/onscroll",
        "group": "自动布局"
      },
      {
        "id": "auto-layout-periodic-table",
        "title": "元素周期表",
        "component": "createLayout",
        "summary": "元素周期表在不同排列间转换。",
        "entrypoint": "demos/materials/animejs/index.html?demo=auto-layout/periodic-table",
        "group": "自动布局"
      },
      {
        "id": "auto-layout-planets",
        "title": "行星卡片",
        "component": "createLayout",
        "summary": "行星卡片在多种布局间转换。",
        "entrypoint": "demos/materials/animejs/index.html?demo=auto-layout/planets",
        "group": "自动布局"
      },
      {
        "id": "auto-layout-todo-list",
        "title": "待办清单",
        "component": "createLayout",
        "summary": "待办项目增删与重排形成连续过渡。",
        "entrypoint": "demos/materials/animejs/index.html?demo=auto-layout/todo-list",
        "group": "自动布局"
      },
      {
        "id": "canvas-2d",
        "title": "画布粒子",
        "component": "animate、createTimer",
        "summary": "将动画对象属性绘制为二维 Canvas 粒子。",
        "entrypoint": "demos/materials/animejs/index.html?demo=canvas-2d",
        "group": "图形与运动"
      },
      {
        "id": "clock-playback-controls",
        "title": "播放时钟",
        "component": "animate、createTimeline",
        "summary": "用时钟演示播放、暂停与播放进度控制。",
        "entrypoint": "demos/materials/animejs/index.html?demo=clock-playback-controls",
        "group": "时钟与时间线"
      },
      {
        "id": "draggable-infinite-auto-carousel",
        "title": "无限轮播",
        "component": "createDraggable、createTimeline",
        "summary": "轮播的控制权在自动播放与拖拽之间连续交接。",
        "entrypoint": "demos/materials/animejs/index.html?demo=draggable-infinite-auto-carousel",
        "group": "拖拽与滚动"
      },
      {
        "id": "draggable-mouse-scroll-snap-carousel",
        "title": "滚动吸附轮播",
        "component": "createDraggable",
        "summary": "轮播结合鼠标、滚动与吸附。",
        "entrypoint": "demos/materials/animejs/index.html?demo=draggable-mouse-scroll-snap-carousel",
        "group": "拖拽与滚动"
      },
      {
        "id": "draggable-playground",
        "title": "拖拽实验台",
        "component": "createDraggable、createSpring",
        "summary": "直接操作容器约束、吸附、弹簧与拖动目标。",
        "entrypoint": "demos/materials/animejs/index.html?demo=draggable-playground",
        "group": "拖拽与滚动"
      },
      {
        "id": "irregular-playback-typewriter",
        "title": "不等速打字",
        "component": "createTimeline、irregular",
        "summary": "用不规则播放节奏模拟打字。",
        "entrypoint": "demos/materials/animejs/index.html?demo=irregular-playback-typewriter",
        "group": "时钟与时间线"
      },
      {
        "id": "layered-css-transforms",
        "title": "多层变换",
        "component": "createTimeline、createSpring",
        "summary": "独立的 CSS 变换分层组合。",
        "entrypoint": "demos/materials/animejs/index.html?demo=layered-css-transforms",
        "group": "图形与运动"
      },
      {
        "id": "onscroll-responsive-scope",
        "title": "响应式滚动区域",
        "component": "createScope、onScroll",
        "summary": "将媒体查询作用域与滚动动画联动。",
        "entrypoint": "demos/materials/animejs/index.html?demo=onscroll-responsive-scope",
        "group": "拖拽与滚动"
      },
      {
        "id": "onscroll-sticky",
        "title": "粘性滚动",
        "component": "onScroll、createTimeline",
        "summary": "粘性舞台随滚动进度播放时间线。",
        "entrypoint": "demos/materials/animejs/index.html?demo=onscroll-sticky",
        "group": "拖拽与滚动"
      },
      {
        "id": "stagger",
        "title": "交错延迟",
        "component": "stagger、createTimeline",
        "summary": "比较交错函数的时间、位置和距离分布。",
        "entrypoint": "demos/materials/animejs/index.html?demo=stagger",
        "group": "图形与运动"
      },
      {
        "id": "svg-graph",
        "title": "动态图表",
        "component": "svg、animate",
        "summary": "SVG 图表的几何与路径变化。",
        "entrypoint": "demos/materials/animejs/index.html?demo=svg-graph",
        "group": "文字与矢量"
      },
      {
        "id": "svg-line-drawing",
        "title": "路径描线",
        "component": "svg.createDrawable、createTimeline",
        "summary": "错峰描线展示 SVG 路径进度。",
        "entrypoint": "demos/materials/animejs/index.html?demo=svg-line-drawing",
        "group": "文字与矢量"
      },
      {
        "id": "text-hover-effects",
        "title": "文字悬停",
        "component": "splitText、animate",
        "summary": "悬停文字时按字符或词形成反馈。",
        "entrypoint": "demos/materials/animejs/index.html?demo=text/hover-effects",
        "group": "文字与矢量"
      },
      {
        "id": "text-scramble",
        "title": "字符扰乱",
        "component": "scrambleText",
        "summary": "通过可操作参数观察文本扰乱与揭示。",
        "entrypoint": "demos/materials/animejs/index.html?demo=text/scramble",
        "group": "文字与矢量"
      },
      {
        "id": "text-scramble-tl",
        "title": "文字扰乱时间线",
        "component": "scrambleText、createTimeline",
        "summary": "将多屏文字的扰乱、缩放与颜色变化串成时间线。",
        "entrypoint": "demos/materials/animejs/index.html?demo=text/scramble-tl",
        "group": "文字与矢量"
      },
      {
        "id": "text-split-effects",
        "title": "逐字拆分",
        "component": "splitText、createTimeline",
        "summary": "按行、词与字符拆分并组合文字动效。",
        "entrypoint": "demos/materials/animejs/index.html?demo=text/split-effects",
        "group": "文字与矢量"
      },
      {
        "id": "text-split-playground",
        "title": "拆字实验台",
        "component": "splitText",
        "summary": "直接调整文字拆分与呈现参数。",
        "entrypoint": "demos/materials/animejs/index.html?demo=text/split-playground",
        "group": "文字与矢量"
      },
      {
        "id": "threejs-transforms",
        "title": "三维对象变换",
        "component": "animate、threeAdapter",
        "summary": "对三维对象、材质与相机执行独立属性动画。",
        "entrypoint": "demos/materials/animejs/index.html?demo=threejs/transforms",
        "group": "图形与运动"
      },
      {
        "id": "timeline-50K-stars",
        "title": "五万颗星",
        "component": "createTimeline、animate",
        "summary": "用时间线调度五万颗星的分布与运动。",
        "entrypoint": "demos/materials/animejs/index.html?demo=timeline-50K-stars",
        "group": "时钟与时间线"
      },
      {
        "id": "timeline-refresh-starlings",
        "title": "椋鸟群",
        "component": "createTimeline",
        "summary": "刷新目标值形成椋鸟群的连续运动。",
        "entrypoint": "demos/materials/animejs/index.html?demo=timeline-refresh-starlings",
        "group": "时钟与时间线"
      },
      {
        "id": "timeline-seamless-loop",
        "title": "无缝循环",
        "component": "createTimeline、stagger",
        "summary": "将交错动画接成无缝循环。",
        "entrypoint": "demos/materials/animejs/index.html?demo=timeline-seamless-loop",
        "group": "时钟与时间线"
      },
      {
        "id": "timeline-stress-test",
        "title": "时间线压力演示",
        "component": "createTimeline",
        "entrypoint": "demos/materials/animejs/index.html?demo=timeline-stress-test",
        "group": "时钟与时间线",
        "summary": "通过大量目标观察时间线调度。"
      }
    ],
    "prompt": "读取 animejs 素材的中文说明与相关上游样例，以 Anime.js 4.5.0 实现目标网页动效。按元素与属性选择 animate，用 stagger 组织分布，用 createTimeline 协调先后，用 onScroll 连接滚动，用 createDraggable 处理拖拽，用 svg 工具处理描线与路径。保持独立变换、作用域和销毁关系与所取样例一致。"
  },
  {
    "id": "guizang-ppt-skill",
    "order": 13,
    "title": "歸藏 PPT Skill · 杂志风与瑞士风网页演示",
    "type": "agent-skill",
    "category": "Agent 工作流",
    "summary": "歸藏的网页 PPT 工作流：选择电子杂志或瑞士国际主义风格，澄清需求、复制模板，按版式填入文案并添加演讲备注，交付可横向翻页的单文件 HTML；模板内置背景、索引、低功耗和演讲者运行时。",
    "install": "运行 npx skills add https://github.com/op7418/guizang-ppt-skill --skill guizang-ppt-skill；或把 demos/materials/guizang-ppt-skill/ 完整复制到 .claude/skills/guizang-ppt-skill/。",
    "tags": [
      "Agent Skill",
      "网页演示",
      "电子杂志",
      "瑞士国际主义",
      "单文件 HTML",
      "演讲者模式",
      "版式库"
    ],
    "useCases": [
      "线下分享、行业内部讲话与私享会",
      "AI 产品发布与 demo day",
      "将文章或 Markdown 整理为网页演讲稿",
      "用同一套主题制作配图、封面与截图画布"
    ],
    "avoid": [
      "大段表格数据和高信息密度培训课件",
      "多人同时协作编辑演示文稿"
    ],
    "constraints": [
      "配图流程依赖 GPT-Image 2.0 / GPT-M 2.0 的宿主能力。",
      "两套风格使用各自的模板、主题与版式类；同一份演示文稿采用一套风格。"
    ],
    "upstream": {
      "repository": "op7418/guizang-ppt-skill",
      "url": "https://github.com/op7418/guizang-ppt-skill/tree/93d21bf4a73a851907a6eb00acbf30618236667a",
      "commit": "93d21bf4a73a851907a6eb00acbf30618236667a",
      "verifiedAt": "2026-11-04"
    },
    "capturedAt": "2026-11-04",
    "license": {
      "name": "AGPL-3.0",
      "url": "https://github.com/op7418/guizang-ppt-skill/blob/93d21bf4a73a851907a6eb00acbf30618236667a/LICENSE",
      "scope": "仓库 skill、模板、参考、脚本与作者附图。",
      "notes": "完整仓库快照保留原文与许可。"
    },
    "sources": [
      {
        "title": "上游 README",
        "url": "https://github.com/op7418/guizang-ppt-skill/blob/93d21bf4a73a851907a6eb00acbf30618236667a/README.md",
        "note": "两套风格、安装命令、十步使用流程、主题画廊与演讲者模式。",
        "evidence": "source"
      },
      {
        "title": "Skill 主文件",
        "url": "https://github.com/op7418/guizang-ppt-skill/blob/93d21bf4a73a851907a6eb00acbf30618236667a/SKILL.md",
        "note": "七问、模板复制、主题和版式选择、配图及检查流程。",
        "evidence": "source"
      },
      {
        "title": "演讲备注契约",
        "url": "https://github.com/op7418/guizang-ppt-skill/blob/93d21bf4a73a851907a6eb00acbf30618236667a/references/presenter-mode.md",
        "note": "稳定页面 ID、必填备注、计划时长与双窗口同步。",
        "evidence": "source"
      },
      {
        "title": "效果图",
        "url": "https://github.com/op7418/guizang-ppt-skill/tree/93d21bf4a73a851907a6eb00acbf30618236667a",
        "note": "画廊图片托管于上游 README 引用的 GitHub 附件及仓库 assets/ppt-skill-showcase.png。",
        "evidence": "source"
      }
    ],
    "snapshotPath": "demos/materials/guizang-ppt-skill/",
    "snapshotEntry": "SKILL.md",
    "workflow": [
      "选择 Style A 电子杂志风或 Style B 瑞士国际主义。",
      "按七问明确风格、受众、时长、素材、图片或截图需求、主题色与硬约束。",
      "复制对应的 assets/template.html 或 assets/template-swiss.html。",
      "先确定每页明暗节奏，再从对应 layouts 文件选版式并填入文案。",
      "需要配图且用户确认时，在 Codex 中使用 GPT-Image 2.0 / GPT-M 2.0 生成，再按页面比例插入。",
      "从大纲整理每页目的、讲述要点、转场和计划时长，省略未提供的现场信息。",
      "按 references/checklist.md 自检，并分别运行瑞士风与演讲者模式校验器。",
      "在浏览器打开 HTML 预览。",
      "点击右下角 P 进入演讲者模式，检查观众屏同步并记录排练时长。",
      "根据排练结果调整内容、字号、高度和间距。"
    ],
    "relatedEntries": [],
    "preview": "previews/materials/guizang-ppt-skill.jpg",
    "research": "docs/materials/guizang-ppt-skill.md",
    "sourceFiles": [
      "demos/materials/guizang-ppt-skill/SKILL.md",
      "demos/materials/guizang-ppt-skill/README.md",
      "demos/materials/guizang-ppt-skill/assets/template.html",
      "demos/materials/guizang-ppt-skill/assets/template-swiss.html",
      "demos/materials/guizang-ppt-skill/references/layouts.md",
      "demos/materials/guizang-ppt-skill/references/layouts-swiss.md",
      "demos/materials/guizang-ppt-skill/references/presenter-mode.md",
      "demos/materials/guizang-ppt-skill/scripts/validate-presenter-mode.mjs",
      "demos/materials/guizang-ppt-skill/scripts/validate-swiss-deck.mjs"
    ],
    "prompt": "阅读 guizang-ppt-skill 原文，按七问确定受众、时长、内容、图片、主题与约束。选择一套风格，复制对应模板，先规划明暗节奏，再从对应版式库填入页面。每页保留稳定 data-slide-id，按 presenter-mode.md 生成目的、讲述要点、转场和用户提供的计划时长。配图按宿主能力与用户要求生成，比例与槽位对应。按 checklist.md 和两个校验器检查，在浏览器逐页预览并排练演讲者与观众屏同步。",
    "gallery": [
      {
        "path": "previews/materials/guizang-ppt-skill/style-a-editorial.png",
        "caption": "Style A 四页拼图，静态图",
        "kind": "style",
        "license": "AGPL-3.0 仓库附图",
        "sourceUrl": "https://github.com/user-attachments/assets/5dc316a2-401c-4e37-9123-ea081b6ae470"
      },
      {
        "path": "previews/materials/guizang-ppt-skill/style-b-swiss.png",
        "caption": "Style B 六页拼图，静态图",
        "kind": "style",
        "license": "AGPL-3.0 仓库附图",
        "sourceUrl": "https://github.com/user-attachments/assets/8960e78c-69bb-4b7e-aa95-6fad64b70314"
      },
      {
        "path": "previews/materials/guizang-ppt-skill/theme-a-1.png",
        "caption": "墨水经典，静态图",
        "kind": "theme",
        "license": "AGPL-3.0 仓库附图",
        "sourceUrl": "https://github.com/user-attachments/assets/df21dbcb-5fe4-4852-a91a-a9cf00aceeb4"
      },
      {
        "path": "previews/materials/guizang-ppt-skill/theme-a-2.png",
        "caption": "靛蓝瓷，静态图",
        "kind": "theme",
        "license": "AGPL-3.0 仓库附图",
        "sourceUrl": "https://github.com/user-attachments/assets/99ce0fd2-72a6-4368-a75a-a8e21657a537"
      },
      {
        "path": "previews/materials/guizang-ppt-skill/theme-a-3.png",
        "caption": "森林墨，静态图",
        "kind": "theme",
        "license": "AGPL-3.0 仓库附图",
        "sourceUrl": "https://github.com/user-attachments/assets/bcc1cc4c-5e8e-4467-ae8d-f5801ae73657"
      },
      {
        "path": "previews/materials/guizang-ppt-skill/theme-a-4.png",
        "caption": "牛皮纸，静态图",
        "kind": "theme",
        "license": "AGPL-3.0 仓库附图",
        "sourceUrl": "https://github.com/user-attachments/assets/dfea080e-e916-417e-93cd-0a3628de84ca"
      },
      {
        "path": "previews/materials/guizang-ppt-skill/theme-a-5.png",
        "caption": "沙丘，静态图",
        "kind": "theme",
        "license": "AGPL-3.0 仓库附图",
        "sourceUrl": "https://github.com/user-attachments/assets/f3705592-9a72-4dbc-9818-df3aea61bc75"
      },
      {
        "path": "previews/materials/guizang-ppt-skill/theme-b-1.png",
        "caption": "克莱因蓝 IKB，静态图",
        "kind": "theme",
        "license": "AGPL-3.0 仓库附图",
        "sourceUrl": "https://github.com/user-attachments/assets/c02d02f7-ce6f-4e16-b8a6-778c96851f94"
      },
      {
        "path": "previews/materials/guizang-ppt-skill/theme-b-2.png",
        "caption": "柠檬黄，静态图",
        "kind": "theme",
        "license": "AGPL-3.0 仓库附图",
        "sourceUrl": "https://github.com/user-attachments/assets/c310a8c4-5d28-450e-b49a-6ac5b6ba4785"
      },
      {
        "path": "previews/materials/guizang-ppt-skill/theme-b-3.png",
        "caption": "柠檬绿，静态图",
        "kind": "theme",
        "license": "AGPL-3.0 仓库附图",
        "sourceUrl": "https://github.com/user-attachments/assets/65f7b3f9-3358-419e-b513-f7f2cc24ec76"
      },
      {
        "path": "previews/materials/guizang-ppt-skill/theme-b-4.png",
        "caption": "安全橙，静态图",
        "kind": "theme",
        "license": "AGPL-3.0 仓库附图",
        "sourceUrl": "https://github.com/user-attachments/assets/9c3319c9-a134-4657-9a56-211c23411f7f"
      },
      {
        "path": "previews/materials/guizang-ppt-skill/showcase.png",
        "caption": "卡片与海报作品拼贴，静态图",
        "kind": "work",
        "license": "AGPL-3.0 仓库附图",
        "sourceUrl": "https://raw.githubusercontent.com/op7418/guizang-ppt-skill/93d21bf4a73a851907a6eb00acbf30618236667a/assets/ppt-skill-showcase.png"
      }
    ],
    "galleryRatio": "16/9"
  },
  {
    "id": "0010-vigil",
    "order": 14,
    "title": "Vigil · 24 件点彩生成作品",
    "type": "image",
    "category": "组件与效果",
    "summary": "作者长期创作的生成艺术系列 Vigil 中的 24 件近期 demo：同心带、波层、折带、阶地、鳞带和漩涡，以及星球与日食；站内画廊提供原作与按原件分辨率绘制的 WebGL 复刻对照。",
    "install": "取 demos/materials/0010-vigil/demo/renderer.js 与 demo/pieces.js，导入 renderPiece、releaseRenderer 和 pieces。选定 piece 后设置 canvas.width = piece.originalWidth、canvas.height = piece.originalHeight，调用 renderPiece(canvas, piece, t)，CSS 控制显示尺寸。t 以秒为单位，单件周期 10 秒，四件与六件家族分别为 12.8 秒与 14.4 秒，静帧使用 t=0；结束时调用 releaseRenderer(canvas)。原作在 demos/materials/0010-vigil/demo/media/<id>.mp4 或 .jpg。",
    "tags": [
      "生成艺术",
      "平面设计",
      "点彩",
      "同心带",
      "星球",
      "抽象几何",
      "竖幅视频",
      "0010",
      "日食",
      "行星",
      "WebGL"
    ],
    "useCases": [
      "作为海报或作品集封面的视觉参考",
      "网页主视觉或章节背景的整体构图参考",
      "讨论点彩质感、低饱和配色和单点落点时的样张"
    ],
    "avoid": [
      "把视频当作本库作品或开放授权素材对外发布",
      "拆成单独的颗粒或圆环效果使用，这组画面的价值在整体构成"
    ],
    "constraints": [
      "Vigil 源码未公开，渲染器由本库按视频与静帧实现。",
      "作者未声明开放许可，本库保存这些作品供个人学习参考。"
    ],
    "upstream": {
      "url": "https://x.com/0010_888/status/2117473772710015352",
      "verifiedAt": "2026-11-04"
    },
    "license": {
      "name": "未声明开放许可",
      "scope": "24 件原作媒体及其画面设计和音轨版权归 0010；复刻渲染器与参数由本库实现。"
    },
    "sources": [
      {
        "title": "Vigil · 2026-11-04",
        "url": "https://x.com/0010_888/status/2117822031890932068",
        "note": "2026-11-04；eclipse-slate、dunes-crimson、black-sun-teal、dunes-ember",
        "evidence": "source"
      },
      {
        "title": "Vigil · 2026-11-03",
        "url": "https://x.com/0010_888/status/2117473772710015352",
        "note": "2026-11-03；rings-pale、arcs-rust、arcs-sand、arcs-night",
        "evidence": "source"
      },
      {
        "title": "Vigil · 2026-11-01",
        "url": "https://x.com/0010_888/status/2116920914122100944",
        "note": "2026-11-01；family-six",
        "evidence": "source"
      },
      {
        "title": "Vigil · 2026-11-01",
        "url": "https://x.com/0010_888/status/2116748686206419050",
        "note": "2026-11-01；family-four",
        "evidence": "source"
      },
      {
        "title": "Vigil · 2026-11-01",
        "url": "https://x.com/0010_888/status/2116710716820328682",
        "note": "2026-11-01；dunes-sand",
        "evidence": "source"
      },
      {
        "title": "Vigil · 2026-10-14",
        "url": "https://x.com/0010_888/status/2110387973661540392",
        "note": "2026-10-14；steps-blush",
        "evidence": "source"
      },
      {
        "title": "Vigil · 2026-10-13",
        "url": "https://x.com/0010_888/status/2110011467798036667",
        "note": "2026-10-13；rings-green-eclipse",
        "evidence": "source"
      },
      {
        "title": "Vigil · 2026-10-12",
        "url": "https://x.com/0010_888/status/2109780990310990231",
        "note": "2026-10-12；scallops-teal",
        "evidence": "source"
      },
      {
        "title": "Vigil · 2026-10-12",
        "url": "https://x.com/0010_888/status/2109647202222055908",
        "note": "2026-10-12；terrace-ice",
        "evidence": "source"
      },
      {
        "title": "Vigil · 2026-10-10",
        "url": "https://x.com/0010_888/status/2108918762996937076",
        "note": "2026-10-10；rings-olive-void",
        "evidence": "source"
      },
      {
        "title": "Vigil · 2026-10-09",
        "url": "https://x.com/0010_888/status/2108568658687705210",
        "note": "2026-10-09；steps-rose",
        "evidence": "source"
      },
      {
        "title": "Vigil · 2026-10-09",
        "url": "https://x.com/0010_888/status/2108365500560679371",
        "note": "2026-10-09；swirl-night",
        "evidence": "source"
      },
      {
        "title": "Vigil · 2026-10-08",
        "url": "https://x.com/0010_888/status/2108291042994983004",
        "note": "2026-10-08；steps-rust-teal",
        "evidence": "source"
      },
      {
        "title": "Vigil · 2026-10-08",
        "url": "https://x.com/0010_888/status/2108261200387854759",
        "note": "2026-10-08；dunes-navy-sun",
        "evidence": "source"
      },
      {
        "title": "Vigil · 2026-09-27",
        "url": "https://x.com/0010_888/status/2104341457301844418",
        "note": "2026-09-27；terrace-brown、arcs-grey-planets、dunes-violet-planets、terrace-indigo",
        "evidence": "source"
      },
      {
        "title": "0010 的 X 主页",
        "url": "https://x.com/0010_888",
        "note": "作者主页。",
        "evidence": "source"
      },
      {
        "title": "艺术家网站",
        "url": "https://0010.art/",
        "note": "作者身份与作品集入口。",
        "evidence": "source"
      }
    ],
    "prompt": "以 Vigil 的完整构成为参考：在有细纹的外框内放圆角画纸，以 rings 同心带、dunes 波层、steps 折带、terraces 阶地、scallops 鳞带或 swirl 漩涡的二维 field 映射出标量 u；按 u 的 bands 分段配置底色、点密度、点半径、点色占比和细线。保留每件的大形位置、低饱和底色与局部红色强调；在 spheres 中放平涂、球面明暗或暗色半透明球，日食用黑圆和径向光晕。细线按距离解析抗锯齿，颗粒沿带场切向微移；单件周期 10 秒，四件与六件家族分别为 12.8 秒与 14.4 秒，静帧固定 t=0。家族在横向画纸上缩小排列作品，用细线连接，messenger 沿完整路径移动。漩涡以连续位移形成贯穿全幅的 S 形卷绕，波状阶地与重复阶梯按片内相位连续改变点密度、颜色和细线。站内画廊展示原作首帧，弹窗复刻固定按原件分辨率绘制，由 CSS 缩放后与原作并排显示。24 件具体参数见 demos/materials/0010-vigil/demo/pieces.js。",
    "preview": "previews/materials/0010-vigil.jpg",
    "research": "docs/materials/0010-vigil.md",
    "sourceFiles": [
      "demos/materials/0010-vigil/demo/renderer.js",
      "demos/materials/0010-vigil/demo/pieces.js",
      "demos/materials/0010-vigil/fidelity.md",
      "demos/materials/0010-vigil/LICENSES.md",
      "demos/materials/0010-vigil/source/README.md"
    ],
    "fidelity": "demos/materials/0010-vigil/fidelity.md",
    "snapshotPath": "demos/materials/0010-vigil/",
    "snapshotEntry": "source/README.md",
    "galleryRatio": "4/5",
    "galleryFit": "contain",
    "gallery": [
      {
        "path": "previews/materials/0010-vigil/eclipse-slate.jpg",
        "caption": "石板日食",
        "kind": "work",
        "sourceUrl": "https://x.com/0010_888/status/2117822031890932068",
        "license": "原作媒体及音轨版权归 0010；作者未声明开放许可。",
        "compare": {
          "piece": "eclipse-slate",
          "original": "demos/materials/0010-vigil/demo/media/eclipse-slate.mp4"
        }
      },
      {
        "path": "previews/materials/0010-vigil/dunes-crimson.jpg",
        "caption": "红霞波层",
        "kind": "work",
        "sourceUrl": "https://x.com/0010_888/status/2117822031890932068",
        "license": "原作媒体及音轨版权归 0010；作者未声明开放许可。",
        "compare": {
          "piece": "dunes-crimson",
          "original": "demos/materials/0010-vigil/demo/media/dunes-crimson.mp4"
        }
      },
      {
        "path": "previews/materials/0010-vigil/black-sun-teal.jpg",
        "caption": "青带黑日",
        "kind": "work",
        "sourceUrl": "https://x.com/0010_888/status/2117822031890932068",
        "license": "原作媒体及音轨版权归 0010；作者未声明开放许可。",
        "compare": {
          "piece": "black-sun-teal",
          "original": "demos/materials/0010-vigil/demo/media/black-sun-teal.mp4"
        }
      },
      {
        "path": "previews/materials/0010-vigil/dunes-ember.jpg",
        "caption": "余烬波层",
        "kind": "work",
        "sourceUrl": "https://x.com/0010_888/status/2117822031890932068",
        "license": "原作媒体及音轨版权归 0010；作者未声明开放许可。",
        "compare": {
          "piece": "dunes-ember",
          "original": "demos/materials/0010-vigil/demo/media/dunes-ember.mp4"
        }
      },
      {
        "path": "previews/materials/0010-vigil/rings-pale.jpg",
        "caption": "灰蓝同心",
        "kind": "work",
        "sourceUrl": "https://x.com/0010_888/status/2117473772710015352",
        "license": "原作媒体及音轨版权归 0010；作者未声明开放许可。",
        "compare": {
          "piece": "rings-pale",
          "original": "demos/materials/0010-vigil/demo/media/rings-pale.mp4"
        }
      },
      {
        "path": "previews/materials/0010-vigil/arcs-rust.jpg",
        "caption": "红棕弧带",
        "kind": "work",
        "sourceUrl": "https://x.com/0010_888/status/2117473772710015352",
        "license": "原作媒体及音轨版权归 0010；作者未声明开放许可。",
        "compare": {
          "piece": "arcs-rust",
          "original": "demos/materials/0010-vigil/demo/media/arcs-rust.mp4"
        }
      },
      {
        "path": "previews/materials/0010-vigil/arcs-sand.jpg",
        "caption": "米红弧带",
        "kind": "work",
        "sourceUrl": "https://x.com/0010_888/status/2117473772710015352",
        "license": "原作媒体及音轨版权归 0010；作者未声明开放许可。",
        "compare": {
          "piece": "arcs-sand",
          "original": "demos/materials/0010-vigil/demo/media/arcs-sand.mp4"
        }
      },
      {
        "path": "previews/materials/0010-vigil/arcs-night.jpg",
        "caption": "夜色弧带",
        "kind": "work",
        "sourceUrl": "https://x.com/0010_888/status/2117473772710015352",
        "license": "原作媒体及音轨版权归 0010；作者未声明开放许可。",
        "compare": {
          "piece": "arcs-night",
          "original": "demos/materials/0010-vigil/demo/media/arcs-night.mp4"
        }
      },
      {
        "path": "previews/materials/0010-vigil/dunes-sand.jpg",
        "caption": "沙丘黑日",
        "kind": "work",
        "sourceUrl": "https://x.com/0010_888/status/2116710716820328682",
        "license": "原作媒体及音轨版权归 0010；作者未声明开放许可。",
        "compare": {
          "piece": "dunes-sand",
          "original": "demos/materials/0010-vigil/demo/media/dunes-sand.mp4"
        }
      },
      {
        "path": "previews/materials/0010-vigil/steps-blush.jpg",
        "caption": "粉岩折带",
        "kind": "work",
        "sourceUrl": "https://x.com/0010_888/status/2110387973661540392",
        "license": "原作媒体及音轨版权归 0010；作者未声明开放许可。",
        "compare": {
          "piece": "steps-blush",
          "original": "demos/materials/0010-vigil/demo/media/steps-blush.mp4",
          "sound": true
        }
      },
      {
        "path": "previews/materials/0010-vigil/rings-green-eclipse.jpg",
        "caption": "青绿日食",
        "kind": "work",
        "sourceUrl": "https://x.com/0010_888/status/2110011467798036667",
        "license": "原作媒体及音轨版权归 0010；作者未声明开放许可。",
        "compare": {
          "piece": "rings-green-eclipse",
          "original": "demos/materials/0010-vigil/demo/media/rings-green-eclipse.mp4",
          "sound": true
        }
      },
      {
        "path": "previews/materials/0010-vigil/scallops-teal.jpg",
        "caption": "青色鳞带",
        "kind": "work",
        "sourceUrl": "https://x.com/0010_888/status/2109780990310990231",
        "license": "原作媒体及音轨版权归 0010；作者未声明开放许可。",
        "compare": {
          "piece": "scallops-teal",
          "original": "demos/materials/0010-vigil/demo/media/scallops-teal.mp4",
          "sound": true
        }
      },
      {
        "path": "previews/materials/0010-vigil/terrace-ice.jpg",
        "caption": "冰面阶地",
        "kind": "work",
        "sourceUrl": "https://x.com/0010_888/status/2109647202222055908",
        "license": "原作媒体及音轨版权归 0010；作者未声明开放许可。",
        "compare": {
          "piece": "terrace-ice",
          "original": "demos/materials/0010-vigil/demo/media/terrace-ice.mp4",
          "sound": true
        }
      },
      {
        "path": "previews/materials/0010-vigil/rings-olive-void.jpg",
        "caption": "橄榄深井",
        "kind": "work",
        "sourceUrl": "https://x.com/0010_888/status/2108918762996937076",
        "license": "原作媒体及音轨版权归 0010；作者未声明开放许可。",
        "compare": {
          "piece": "rings-olive-void",
          "original": "demos/materials/0010-vigil/demo/media/rings-olive-void.mp4",
          "sound": true
        }
      },
      {
        "path": "previews/materials/0010-vigil/steps-rose.jpg",
        "caption": "玫瑰折带",
        "kind": "work",
        "sourceUrl": "https://x.com/0010_888/status/2108568658687705210",
        "license": "原作媒体及音轨版权归 0010；作者未声明开放许可。",
        "compare": {
          "piece": "steps-rose",
          "original": "demos/materials/0010-vigil/demo/media/steps-rose.mp4",
          "sound": true
        }
      },
      {
        "path": "previews/materials/0010-vigil/swirl-night.jpg",
        "caption": "夜色漩涡",
        "kind": "work",
        "sourceUrl": "https://x.com/0010_888/status/2108365500560679371",
        "license": "原作媒体及音轨版权归 0010；作者未声明开放许可。",
        "compare": {
          "piece": "swirl-night",
          "original": "demos/materials/0010-vigil/demo/media/swirl-night.mp4",
          "sound": true
        }
      },
      {
        "path": "previews/materials/0010-vigil/steps-rust-teal.jpg",
        "caption": "锈青折带",
        "kind": "work",
        "sourceUrl": "https://x.com/0010_888/status/2108291042994983004",
        "license": "原作媒体及音轨版权归 0010；作者未声明开放许可。",
        "compare": {
          "piece": "steps-rust-teal",
          "original": "demos/materials/0010-vigil/demo/media/steps-rust-teal.mp4",
          "sound": true
        }
      },
      {
        "path": "previews/materials/0010-vigil/dunes-navy-sun.jpg",
        "caption": "藏青红日",
        "kind": "work",
        "sourceUrl": "https://x.com/0010_888/status/2108261200387854759",
        "license": "原作媒体及音轨版权归 0010；作者未声明开放许可。",
        "compare": {
          "piece": "dunes-navy-sun",
          "original": "demos/materials/0010-vigil/demo/media/dunes-navy-sun.mp4",
          "sound": true
        }
      },
      {
        "path": "previews/materials/0010-vigil/terrace-brown.jpg",
        "caption": "棕色阶地（静帧）",
        "kind": "work",
        "sourceUrl": "https://x.com/0010_888/status/2104341457301844418",
        "license": "原作媒体及音轨版权归 0010；作者未声明开放许可。",
        "compare": {
          "piece": "terrace-brown",
          "original": "demos/materials/0010-vigil/demo/media/terrace-brown.jpg"
        }
      },
      {
        "path": "previews/materials/0010-vigil/arcs-grey-planets.jpg",
        "caption": "灰带行星（静帧）",
        "kind": "work",
        "sourceUrl": "https://x.com/0010_888/status/2104341457301844418",
        "license": "原作媒体及音轨版权归 0010；作者未声明开放许可。",
        "compare": {
          "piece": "arcs-grey-planets",
          "original": "demos/materials/0010-vigil/demo/media/arcs-grey-planets.jpg"
        }
      },
      {
        "path": "previews/materials/0010-vigil/dunes-violet-planets.jpg",
        "caption": "紫夜行星（静帧）",
        "kind": "work",
        "sourceUrl": "https://x.com/0010_888/status/2104341457301844418",
        "license": "原作媒体及音轨版权归 0010；作者未声明开放许可。",
        "compare": {
          "piece": "dunes-violet-planets",
          "original": "demos/materials/0010-vigil/demo/media/dunes-violet-planets.jpg"
        }
      },
      {
        "path": "previews/materials/0010-vigil/terrace-indigo.jpg",
        "caption": "靛蓝阶地（静帧）",
        "kind": "work",
        "sourceUrl": "https://x.com/0010_888/status/2104341457301844418",
        "license": "原作媒体及音轨版权归 0010；作者未声明开放许可。",
        "compare": {
          "piece": "terrace-indigo",
          "original": "demos/materials/0010-vigil/demo/media/terrace-indigo.jpg"
        }
      },
      {
        "path": "previews/materials/0010-vigil/family-four.jpg",
        "caption": "四件家族",
        "kind": "work",
        "sourceUrl": "https://x.com/0010_888/status/2116748686206419050",
        "license": "原作媒体及音轨版权归 0010；作者未声明开放许可。",
        "compare": {
          "piece": "family-four",
          "original": "demos/materials/0010-vigil/demo/media/family-four.mp4"
        }
      },
      {
        "path": "previews/materials/0010-vigil/family-six.jpg",
        "caption": "六件家族",
        "kind": "work",
        "sourceUrl": "https://x.com/0010_888/status/2116920914122100944",
        "license": "原作媒体及音轨版权归 0010；作者未声明开放许可。",
        "compare": {
          "piece": "family-six",
          "original": "demos/materials/0010-vigil/demo/media/family-six.mp4"
        }
      }
    ]
  }
];
