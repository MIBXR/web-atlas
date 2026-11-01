window.ATLAS_CASES = [
  {
    "id": "apple-product",
    "order": 1,
    "title": "Apple · 滚动产品舞台",
    "subtitle": "iPhone 18 Pro / official page study",
    "category": "产品",
    "tags": [
      "Apple",
      "极简",
      "工业设计",
      "产品叙事",
      "配置器"
    ],
    "summary": "以官方摄影和影片建立硬件主角，保留细节卡的展开/收起、图库进度、景深比较及滚动媒体/文字交接。",
    "accent": "#0071e3",
    "background": "#000000",
    "principles": [
      "全宽产品影像建立硬件辨识度，超大章节标题组织浏览节奏。",
      "深黑舞台与深灰亮点章节交替，蓝色仅用于可行动入口。",
      "真实摄影承担产品证据，轮廓、镜头和材质不自行重绘。",
      "悬浮局部导航保持章节与行动入口可达。"
    ],
    "productFocus": "登场动画先呈现产品轮廓，亮点摄影提炼收益，细节选择器让同一舞台解释机身、镜头、尺寸与控件。",
    "interaction": [
      "进入 → 官方产品 MP4 在黑色全宽舞台登场；重播只重放这段，不代替影片。",
      "Highlights 进入视口 → 圆角摄影和进度控件带入，五项图库自动推进；手动选择/暂停/最后重播 → 按相机、续航、颜色、性能、Siri 依次建立产品重点。",
      "Design 点击七项胶囊 → 同一舞台内展开左侧说明卡，当前胶囊被卡替换、其他胶囊下移、右侧摄影变化；卡内前后与关闭可逆；Colors 的四个色点联动真实摄影。",
      "镜头长段向下/向上滚动 → 暂停的官方相机 WebM 按进度 seek，标题让出画面；后续性能和续航用官方静帧保持 sticky 媒体和前后文交接。",
      "景深四选项 → 官方 f/1.48、1.8、2.8、4.0 摄影交叉变化；旧机型 select 更新比较对象；横向摄影架子保留原生滑动。",
      "Watch the film → 黑色全屏影片层与原片有声控件；Explore 导航、亮点暂停与手机重排支持正常滚动/键盘。"
    ],
    "theme": "产品摄影章节固定黑/深灰；比较、购物和环境等后段切成浅色。没有全局深浅切换。",
    "constraints": [
      "保留当前来源的触发→响应→目的，不用通用淡入代替定义性交互。源浏览器落在 no-enhanced 布局，增强滚动分支未完成源站实机验证；本地镜头滚动依据公开 VideoScrub 数据实现并实测。",
      "七项摄影以官方静帧替代实时 3D 旋转；说明卡 500/600ms、图库每项 5s、相机 seek/标题阈值、性能与续航静帧的缩放和交接为本地拟合。比较只显示所选对象并链接真实参数。原影片依赖 Apple 播放列表网络；出错提示原站入口。未复制交易、所有参数/图库或全部共享功能。",
      "品牌与官方素材仅用于此个人参考库；归档来源与权利。",
      "减少动态保留可读内容、键盘焦点和手动选择。"
    ],
    "useCases": [
      "消费电子",
      "高端硬件",
      "单一旗舰产品",
      "家具与工业设计"
    ],
    "avoid": [
      "大量无关卡片",
      "营销数据代替产品证明",
      "自动轮播占用阅读时间"
    ],
    "tokens": {
      "palette": [
        "#000000",
        "#1d1d1f",
        "#f5f5f7",
        "#0071e3"
      ],
      "type": "系统无衬线；亮点标题56px，设计章节最大96px；紧凑字距。",
      "layout": "44px全局导航、52px信息带、780px全宽登场；约1100px亮点摄影、满幅细节舞台。",
      "motion": "官方登场MP4；五项亮点进度、暂停与末尾重播；4.984秒镜头WebM按220vh舞台滚动进度换帧，标题同步淡出。"
    },
    "sources": [
      {
        "title": "Apple iPhone 18 Pro 当前公开页面",
        "url": "https://www.apple.com/iphone-18-pro/",
        "note": "采集日期 2026-10-07；美国英文产品页",
        "type": "实例"
      },
      {
        "title": "Apple HIG — Motion",
        "url": "https://developer.apple.com/design/human-interface-guidelines/motion",
        "type": "规范",
        "note": "动效目的和减少动态支持；应用规范向网页的迁移。"
      }
    ],
    "prompt": "以 https://www.apple.com/iphone-18-pro/ 在【采集日期】的 美国英文产品页 为单一依据，先观察初始入场、所有章节至页尾再返回、真实指针与手机操作。官方图片、字标与视频不重画，保持黑色产品舞台和后段浅色购物章节。首屏原始 MP4、Highlights 进度轮播、7 项 viewer inline 说明展开/胶囊折叠下移/图像变化/关闭/前后/配色、景深比较和机型选择均保留。用双向 sticky 段串联媒体先出现、标题淡出、说明接入；静帧替代视频也不能删除这种交接机制。横向摄影架子用原生滚动。Watch the film 必须是独立全屏官方影片，不用首屏重播冒充；声音只在用户触发后出现，关闭暂停。减少动态时给静态摄影和完整文案。用于【目标产品】时重新观察其真实操作与资产，不把本案例的拟合数值当作其他产品通用公式。",
    "negativePrompt": "不要凭空重画品牌摄影；不要给全部页面套同一种淡入、圆角或整屏切幕；不要捏造原站音乐、全局主题、账户和远程执行；不要把未验证状态写成通过。",
    "exercise": "保持黑色产品舞台，使用另一款真实产品摄影练习镜头与文案的滚动交接；先记录原站进度再调整曲线。",
    "demo": "demos/cases/apple-product/index.html",
    "preview": "previews/cases/apple-product.jpg",
    "research": "docs/cases/apple-product.md",
    "composition": {
      "color": "黑底展示材质，深灰划分章节；蓝色只指向行动。",
      "typography": "系统无衬线；亮点标题56px，设计章节最大96px；紧凑字距。",
      "layout": "44px全局导航、52px信息带、780px全宽登场；约1100px亮点摄影、满幅细节舞台。",
      "imagery": "官方真实产品摄影、Apple标识和登场MP4，逐项来源可查。",
      "shape": "摄影大圆角38px、导航玻璃圆角20px、功能胶囊与蓝色购买胶囊。",
      "hierarchy": "产品登场 → 核心亮点 → 可探索细节 → 镜头叙事。",
      "motion": "官方登场MP4；五项亮点进度、暂停与末尾重播；4.984秒镜头WebM按220vh舞台滚动进度换帧，标题同步淡出。",
      "coherence": "同一硬件在不同尺度和状态中持续出现，黑底、巨字、胶囊和蓝色入口共同建立精确的产品叙事。",
      "scroll": "首屏 → Highlights → Design viewer → 相机滚动段 → 景深比较 → 摄影横向架子 → 性能 → 续航 → 机型比较 → 浅色共享功能/购物/材料架子 → 说明与页尾。较原页缩短内容量，保留主要交互类型和后段明暗交接。"
    },
    "country": "美国",
    "referenceUrl": "https://www.apple.com/iphone-18-pro/",
    "implementation": "reference-study",
    "fidelity": "demos/cases/apple-product/fidelity.md",
    "assetManifest": "demos/cases/apple-product/assets-manifest.json",
    "referencePreview": "previews/cases/apple-product-reference.jpg",
    "capturedAt": "2026-10-07",
    "themeBehavior": {
      "mode": "fixed",
      "default": "dark",
      "control": "产品摄影章节固定黑/深灰；比较、购物和环境等后段切成浅色。没有全局深浅切换。",
      "designReason": "以官方摄影和影片建立硬件主角，保留细节卡的展开/收起、图库进度、景深比较及滚动媒体/文字交接。"
    },
    "soundBehavior": {
      "kind": "video",
      "control": "首屏和滚动视频静音；Watch the film 点击打开官方 HLS 影片，172.38 秒，用户触发播放后有声音，可静音、调音量和全屏；关闭即暂停。",
      "interactionRole": "静音摄影先建立材质与镜头重点，点击影片后才加入音乐和讲解，避免读页时自动发声。"
    }
  },
  {
    "id": "stripe-platform",
    "order": 2,
    "title": "Stripe — 彩带与金融产品矩阵",
    "subtitle": "Financial infrastructure, made visible",
    "category": "产品",
    "country": "美国",
    "tags": [
      "Stripe",
      "真实品牌",
      "金融科技",
      "彩带",
      "产品矩阵",
      "下拉导航"
    ],
    "summary": "官方 WebGL 折叠波浪配合连贯段落式主张，产品矩阵、统计和客户故事使用各自的交互机制。",
    "accent": "#635bff",
    "background": "#ffffff",
    "principles": [
      "一段连续的大字号叙述同时给出平台定位与交易规模。",
      "彩带提供品牌识别，细框线与产品界面维持金融工具的秩序。",
      "用产品而非抽象图形展示收款、订阅、卡片与平台能力。",
      "同一套主色用于核心行动，低饱和背景区分不同金融产品。"
    ],
    "productFocus": "首屏从营收增长引向支付与金融能力，产品矩阵按业务模型组织；真实终端素材和界面局部让复杂基础设施可见。",
    "interaction": [
      "进入 → 隔离的官方 SingleWave 网格/shader/调色渲染；提供暂停，菜单/弹窗/后台/离屏暂停，GPU 失败使用官方静帧。",
      "Payments 进入视口 → 终端文本在 mask 内纵向轮换，checkout 同步商户和金额；客户标识连续横移，悬停可停。",
      "Bento 点击 → 产品详情对话框；真实官网是产品说明/界面扩展，本地内容压缩，业务模型反馈为明确的示范。",
      "Global 四统计选择 → 当前数字强调、底部细线进度和基础设施说明对应变化；自动推进与指针停留暂停。",
      "Hertz/URBN/Instacart/Le Monde → 当前故事行展开高度、其他行收起，真实官方摄影及说明同步替换；来源照片中的平行四边形呼应 Stripe 品牌。",
      "后半段原生横向架子、四平台选择、深色开发者章节、活动架子、结束行动和页尾；上下滚动保持普通文档，不加入无来源的整屏切幕。",
      "手机汉堡菜单 → 全屏顶层 Products/Solutions/Developers/Resources；选择分类后二级页以源 CSS 500ms 侧向进入、250ms 透明度衔接，Back 返回顶层。Start now/Contact sales 固定底部；关闭/Escape 恢复滚动和焦点，让长目录保持方向与核心行动。",
      "桌面指针进入/点击分类 → popup 高度/位移/透明度 300ms、clip/max-height 200ms，均采用源 cubic-bezier(.45,.05,.55,.95)；分类按自然高度衔接。快速反转取消旧动画，离开/外部点击/Escape 后 hidden/inert/aria 一致；减少动态直接完成，维持目录的空间关系。"
    ],
    "theme": "首屏固定浅色及官方波浪；Global/Developers 等章节使用品牌海军蓝，属于章节配色，没有全局主题切换。",
    "constraints": [
      "保留当前来源的触发→响应→目的，不用通用淡入代替定义性交互。",
      "终端 5s/.75s、客户条带 35s、统计 6s 周期、折叠/图片 400–450ms 是拟合；Global 基础设施使用简化的品牌线框，不是原站完整 3D 地球；客户正文、数字、后续卡片数量、平台证言均压缩成学习说明，未复制金融产品服务与真实认证。",
      "品牌与官方素材仅用于此个人参考库；归档来源与权利。",
      "减少动态保留可读内容、键盘焦点和手动选择。"
    ],
    "useCases": [
      "复杂平台产品官网",
      "金融工具能力介绍",
      "多产品业务入口"
    ],
    "avoid": [
      "用一个渐变blob代替实际平台功能",
      "把所有产品塞进同样的白卡",
      "复制支付表单并连接真实交易"
    ],
    "tokens": {
      "palette": [
        "#0a2540",
        "#635bff",
        "#f6f9fc",
        "#ff9151"
      ],
      "type": "官网 Söhne 本地字体；主标题48px、连续段落、紧凑行高。",
      "layout": "1266px内容框；48px段落式首屏；产品矩阵首行Payments跨两列、Billing一列同高，随后不同产品区；4列指标与左右案例。",
      "motion": "官方SingleWave：speed 0.00004、timeOffset 17500、introTimeRamp每render +.016；付款UI每5秒/.75秒、客户横移35秒为本地近似；桌面popup高度/transform/opacity 300ms与clip/max-height 200ms采用源cubic-bezier(.45,.05,.55,.95)，入口位移12px为拟合；手机二级transform 500ms/opacity 250ms采用源CSS曲线，入口位移距离为拟合。"
    },
    "composition": {
      "color": "白底、海军蓝文字、紫色行动按钮与橙粉紫官网彩带；按钮小圆角，产品卡适度圆角。",
      "typography": "官网 Söhne 本地字体；主标题48px、连续段落、紧凑行高。",
      "layout": "1266px内容框；48px段落式首屏；产品矩阵首行Payments跨两列、Billing一列同高，随后不同产品区；4列指标与左右案例。",
      "imagery": "官方SingleWave原始shader与folded mesh，light palette；Söhne本地字体；真实终端素材与本地支付界面结构。",
      "shape": "按钮4px、产品8px、对话框12px；官网彩带原比例。",
      "hierarchy": "首屏从营收增长引向支付与金融能力，产品矩阵按业务模型组织；真实终端素材和界面局部让复杂基础设施可见。",
      "motion": "官方SingleWave：speed 0.00004、timeOffset 17500、introTimeRamp每render +.016；付款UI每5秒/.75秒、客户横移35秒为本地近似；桌面popup高度/transform/opacity 300ms与clip/max-height 200ms采用源cubic-bezier(.45,.05,.55,.95)，入口位移12px为拟合；手机二级transform 500ms/opacity 250ms采用源CSS曲线，入口位移距离为拟合。",
      "coherence": "橙粉紫波带与紫色行动建立品牌识别，细框线、海军蓝文字和真实支付终端让复杂能力可读；部分界面为本地DOM，容器裁切和标题混色为局部还原。",
      "scroll": "波浪首屏 → 6 产品 Bento → Global 4 统计 → 4 客户折叠 → Startup 横向架子 → 平台选择 → 海军蓝开发者内容 → 活动架子 → 结束行动 → 页尾。"
    },
    "sources": [
      {
        "title": "Stripe 当前公开页面",
        "url": "https://stripe.com/",
        "note": "采集日期 2026-10-07；英文全球首页",
        "type": "实例"
      },
      {
        "title": "Connect frontend design",
        "url": "https://stripe.com/blog/connect-front-end-experience",
        "type": "理论",
        "note": "2017第一方文章解释复杂平台功能的轻盈呈现与就地产品展示；属于历史设计理论。"
      },
      {
        "title": "WAI Tabs Pattern",
        "url": "https://www.w3.org/WAI/ARIA/apg/patterns/tabs/",
        "type": "规范",
        "note": "客户案例与产品选择的键盘、选择状态参考。"
      }
    ],
    "prompt": "以 https://stripe.com/ 在【采集日期】的 英文全球首页 为单一依据，先观察初始入场、所有章节至页尾再返回、真实指针与手机操作。保留官方 SingleWave 的几何、shader、home 相机和 light palette，不能换任意 CSS 渐变。保持连续段落式主张、小圆角按钮、1266px 内容框与浅色产品 Bento；终端纵向 mask 和 checkout 同步；四统计选择/进度；四客户的高度折叠和官方摄影切换。Startup、平台、开发者和活动顺序保留，架子原生横滑，后段海军蓝是章节主题不是全局深色开关。桌面菜单保留指针进入/离开及键盘路径，popup高度/位移/透明度300ms、裁切200ms采用源曲线，分类自然高度衔接；手机使用全屏顶层分类、500ms侧向二级、Back返回与固定底部行动，所有弹窗可关闭；此页没有配乐。用于【目标产品】时重新观察其真实操作与资产，不把本案例的拟合数值当作其他产品通用公式。",
    "negativePrompt": "不要凭空重画品牌摄影；不要给全部页面套同一种淡入、圆角或整屏切幕；不要捏造原站音乐、全局主题、账户和远程执行；不要把未验证状态写成通过。",
    "demo": "demos/cases/stripe-platform/index.html",
    "preview": "previews/cases/stripe-platform.jpg",
    "research": "docs/cases/stripe-platform.md",
    "exercise": "以同一来源截图为基准，改变一个局部信息层级并记录对比：标题/图片比例、主按钮或状态反馈。保持品牌素材比例和移动端可读性。",
    "referenceUrl": "https://stripe.com/",
    "implementation": "reference-study",
    "fidelity": "demos/cases/stripe-platform/fidelity.md",
    "assetManifest": "demos/cases/stripe-platform/assets-manifest.json",
    "referencePreview": "previews/cases/stripe-platform-reference.png",
    "capturedAt": "2026-10-07",
    "themeBehavior": {
      "mode": "fixed",
      "default": "light",
      "control": "首屏固定浅色及官方波浪；Global/Developers 等章节使用品牌海军蓝，属于章节配色，没有全局主题切换。",
      "designReason": "官方 WebGL 折叠波浪配合连贯段落式主张，产品矩阵、统计和客户故事使用各自的交互机制。"
    },
    "soundBehavior": {
      "kind": "none",
      "control": "当前首页没有背景音乐或有声视频。",
      "interactionRole": "波浪、产品 UI 和数据选择提供动感，保持金融信息阅读的安静环境。"
    }
  },
  {
    "id": "linear-workflow",
    "order": 3,
    "title": "Linear — 深色产品开发系统",
    "subtitle": "The product development system for teams and agents",
    "category": "产品",
    "country": "美国",
    "tags": [
      "Linear",
      "真实品牌",
      "深色",
      "产品界面",
      "工作流",
      "低对比边框"
    ],
    "summary": "固定暗色的工作系统通过首屏面板、Intake 消息到任务板、AI 代理状态和可编辑代码说明产品价值。",
    "accent": "#a79ad6",
    "background": "#08090a",
    "principles": [
      "固定暗色的工作系统通过首屏面板、Intake 消息到任务板、AI 代理状态和可编辑代码说明产品价值。",
      "配色、文字密度、边框与选中状态共同表达本页面的产品语气。",
      "动作有明确触发与状态关系，采用同一源 URL 的当前页面，近似和未验证状态分别说明。",
      "第一方素材保持比例；手机保留原站实际变体。"
    ],
    "productFocus": "通过真实官网issue结构展示团队与智能体协作：侧栏、任务正文、活动评论、属性及状态，随后把收件和规划纳入同一流程。",
    "interaction": [
      "进入 → 首屏产品 UI 延迟 1.3s 后 1.5s 带入，背景扫光/mask 配合；下滚让首屏遮罩交给后续章节。",
      "Favorites → 独立 issue、看板、统计项目表和项目 overview；内部任务状态、收藏与 Run agent 是本地工作示例。",
      "Intake Send “create issues” → 2s 后 Linear 回复、再 1s 后 2 张卡插入 Todo；下一次 Send → 1.4s 回复、800ms 后卡从 Todo 移到 In progress；Replay 恢复初态 → 把自然语言请求变成可见工作。",
      "AI 章节进入视口 → 三列代理思考/回答以 5s 与后续交错时间演示，离开/后台停止；暂停按钮与减少动态分支可保持结果。",
      "Build → 编辑代码内容、六种 syntax 主题选择更新局部代码颜色和行数反馈；不改变官网的固定全局暗色。",
      "手机保留完整应用缩放裁切、Intake 消息线程；按原站隐藏 Planning/AI/Build 的复杂图示并保留标题正文。"
    ],
    "theme": "营销页固定近黑。Build 中的六种代码主题是局部语法预览控件，不改变全页主题。",
    "constraints": [
      "保留当前来源的触发→响应→目的，不用通用淡入代替定义性交互。",
      "消息文本和任务数量缩短；后续板的布局/卡高 spring 用 CSS 拟合，原源码中的全部 spring 物理参数未逐一移植。AI 为固定演示，代码不会执行；Run agent 与 Favorites 并非可登录的完整 Linear。未复制 Changelog 和后段用户故事卡与完整产品后端。",
      "品牌与官方素材仅用于此个人参考库；归档来源与权利。",
      "减少动态保留可读内容、键盘焦点和手动选择。"
    ],
    "useCases": [
      "开发者工具官网",
      "复杂协作产品",
      "工作流程展示"
    ],
    "avoid": [
      "泛用霓虹SaaS模板",
      "把营销页变成满屏仪表盘",
      "滚轮接管与大段不可读的小字"
    ],
    "tokens": {
      "palette": [
        "#08090a",
        "#191a1c",
        "#f7f8f8",
        "#929298",
        "#a79ad6"
      ],
      "type": "官方 Inter variable 本地字体；桌面64px主标题、紧行高、任务22px、UI12–14px。",
      "layout": "1280px最大宽度；左标题+横向说明；235px侧栏/任务/210px属性；收件与规划两节。",
      "motion": "Favorites直接切换issue、任务看板、insights和project；Working文字局部2秒linear扫光；导航指针进入展开，160ms入场为本地近似。"
    },
    "composition": {
      "color": "营销页固定近黑。Build 中的六种代码主题是局部语法预览控件，不改变全页主题。",
      "typography": "官方 Inter variable 本地字体；桌面64px主标题、紧行高、任务22px、UI12–14px。",
      "layout": "首屏 UI → 客户标识与三个价值点 → Intake → Planning → AI → Build → 结束行动 → 页尾；本地压缩后段数量。手机保持源站的内容/复杂图示区别。",
      "imagery": "固定暗色的工作系统通过首屏面板、Intake 消息到任务板、AI 代理状态和可编辑代码说明产品价值。",
      "shape": "细边框、10–15px窗口、5px行项与小圆胶囊。",
      "hierarchy": "固定暗色的工作系统通过首屏面板、Intake 消息到任务板、AI 代理状态和可编辑代码说明产品价值。",
      "motion": "进入 → 首屏产品 UI 延迟 1.3s 后 1.5s 带入，背景扫光/mask 配合；下滚让首屏遮罩交给后续章节。；Favorites → 独立 issue、看板、统计项目表和项目 overview；内部任务状态、收藏与 Run agent 是本地工作示例。；Intake Send “create issues” → 2s 后 Linear 回复、再 1s 后 2 张卡插入 Todo；下一次 Send → 1.4s 回复、800ms 后卡从 Todo 移到 In progress；Replay 恢复初态 → 把自然语言请求变成可见工作。；AI 章节进入视口 → 三列代理思考/回答以 5s 与后续交错时间演示，离开/后台停止；暂停按钮与减少动态分支可保持结果。",
      "coherence": "消息文本和任务数量缩短；后续板的布局/卡高 spring 用 CSS 拟合，原源码中的全部 spring 物理参数未逐一移植。AI 为固定演示，代码不会执行；Run agent 与 Favorites 并非可登录的完整 Linear。未复制 Changelog 和后段用户故事卡与完整产品后端。",
      "scroll": "首屏 UI → 客户标识与三个价值点 → Intake → Planning → AI → Build → 结束行动 → 页尾；本地压缩后段数量。手机保持源站的内容/复杂图示区别。"
    },
    "sources": [
      {
        "title": "Linear 当前公开页面",
        "url": "https://linear.app/",
        "note": "采集日期 2026-10-07；英文首页",
        "type": "实例"
      },
      {
        "title": "Linear 2026 design refresh",
        "url": "https://linear.app/now/behind-the-latest-design-refresh",
        "type": "理论",
        "note": "2026-03-12应用UI设计：导航退后、低饱和、内容优先；用于层级分析。"
      },
      {
        "title": "Linear UI redesign",
        "url": "https://linear.app/now/how-we-redesigned-the-linear-ui",
        "type": "理论",
        "note": "2024应用界面改版文章，辅助解释信息层级。"
      },
      {
        "title": "WAI Tabs Pattern",
        "url": "https://www.w3.org/WAI/ARIA/apg/patterns/tabs/",
        "type": "规范",
        "note": "任务与分类选择的键盘和选择状态参考。"
      }
    ],
    "prompt": "以 https://linear.app/ 在【采集日期】的 英文首页 为单一依据，先观察初始入场、所有章节至页尾再返回、真实指针与手机操作。使用原字体、字标、近黑背景和三栏 issue/board 信息密度。必须保留延迟的首屏 UI 入场与滚动 mask；Favorites 的四种独立结构；Intake 消息→回复→两卡 Todo 插入→第二请求→两卡移动，按 2000/1000/1400/800ms 节点串联并可重播。AI 进入视口启动、离屏停止，三列代理时间有交错；Build 可编辑与六种局部代码主题。手机应用缩放裁切、Intake 只留消息线程，隐藏复杂图示而保留文案。原营销页固定暗色、没有配乐；不用全页切幕或泛化淡入替代消息和任务板机制。用于【目标产品】时重新观察其真实操作与资产，不把本案例的拟合数值当作其他产品通用公式。",
    "negativePrompt": "不要凭空重画品牌摄影；不要给全部页面套同一种淡入、圆角或整屏切幕；不要捏造原站音乐、全局主题、账户和远程执行；不要把未验证状态写成通过。",
    "demo": "demos/cases/linear-workflow/index.html",
    "preview": "previews/cases/linear-workflow.jpg",
    "research": "docs/cases/linear-workflow.md",
    "exercise": "以同一来源截图为基准，改变一个局部信息层级并记录对比：标题/图片比例、主按钮或状态反馈。保持品牌素材比例和移动端可读性。",
    "referenceUrl": "https://linear.app/",
    "implementation": "reference-study",
    "fidelity": "demos/cases/linear-workflow/fidelity.md",
    "assetManifest": "demos/cases/linear-workflow/assets-manifest.json",
    "referencePreview": "previews/cases/linear-workflow-reference.png",
    "capturedAt": "2026-10-07",
    "themeBehavior": {
      "mode": "fixed",
      "default": "dark",
      "control": "营销页固定近黑。Build 中的六种代码主题是局部语法预览控件，不改变全页主题。",
      "designReason": "固定暗色的工作系统通过首屏面板、Intake 消息到任务板、AI 代理状态和可编辑代码说明产品价值。"
    },
    "soundBehavior": {
      "kind": "none",
      "control": "当前首页没有配乐、音效和音视频播放器。",
      "interactionRole": "消息、任务板和代码状态承担产品叙事，不靠声音强调任务。"
    }
  },
  {
    "id": "notion-editorial",
    "order": 4,
    "title": "Notion — 插画与真实工作空间",
    "subtitle": "Where teams and agents think together",
    "category": "产品",
    "country": "美国",
    "tags": [
      "Notion",
      "真实品牌",
      "手绘插画",
      "巨字",
      "文档",
      "产品视频"
    ],
    "summary": "白底居中标题用变宽动作胶囊、人格化官方头像和分能力 Bento 建立友好的工具定位。",
    "accent": "#0075e6",
    "background": "#ffffff",
    "principles": [
      "白底居中标题用变宽动作胶囊、人格化官方头像和分能力 Bento 建立友好的工具定位。",
      "配色、文字密度、边框与选中状态共同表达本页面的产品语气。",
      "动作有明确触发与状态关系，采用同一源 URL 的当前页面，近似和未验证状态分别说明。",
      "第一方素材保持比例；手机保留原站实际变体。"
    ],
    "productFocus": "Ramp HQ产品视频具体展示团队与agents；Capture/Find并列呈现上下文与答案，整行Automate强调任务执行。",
    "interaction": [
      "2500ms 自动 Think/Ship/Create/Build/Jam/Scale → 词直接替换，测量 scrollWidth 后宽度以 300ms cubic-bezier(.86,0,.07,1) 变化，底色/圆点对应变化；这是源机制，没有给文字加不存在的飞入飞出。",
      "桌面官方产品视频静音循环，可暂停；手机保留上方七个头像 pile，当前页面隐藏 hero 媒体区而不是塞入桌面视频。",
      "客户标识原生连续横移，指针停留暂停；手机保持条带，不把标识排成多行墙。",
      "桌面 Product/Resources 指针进入与点击 → 首次 opacity/translateY(-16px) 250ms ease-out，退出 150ms ease-in、延迟 50ms；已打开分类按源 instantSwitch 直接切换，快速反转取消旧退出，减少动态直接完成；手机打开全屏菜单 → Product/AI/Resources 原地单开，切换收起前组，再点同组收起；其他分类变灰，底部 Download app/Log in 固定。源 CSS 子展开 300ms、入口 350ms，内容/底部延迟 200/250ms；关闭/Escape 恢复滚动和焦点，维持层级与行动位置。",
      "Capture/Find 两列和 Automate 通栏保持不同层次；下方五用途横向入口、团队故事、结束行动、页尾按源顺序。页面演示账户按钮先本地说明，手机菜单链接使用已观察的原站公开入口。"
    ],
    "theme": "营销首页固定白底、浅色 Bento 和蓝色 CTA；没有全局主题切换。产品编辑器内的主题不等于这个首页主题。",
    "constraints": [
      "保留当前来源的触发→响应→目的，不用通用淡入代替定义性交互。",
      "七头像为官方原素材，组合间距、标识 24s 周期和菜单指针离开等待 150ms 是拟合；Bento 使用官方完整静帧而非全部独立浮层，三故事数量与正文缩短。详情对话框内的勾选/问答/agent 反馈是本地示范，并不声称是原站首页机制或真实模型执行。",
      "品牌与官方素材仅用于此个人参考库；归档来源与权利。",
      "减少动态保留可读内容、键盘焦点和手动选择。"
    ],
    "useCases": [
      "知识协作产品",
      "模块化文档工具",
      "人文感AI产品"
    ],
    "avoid": [
      "仿旧泛黄纸张代表所有Notion版本",
      "只有插画没有产品内容",
      "所有功能复用相同卡片模板"
    ],
    "tokens": {
      "palette": [
        "#101010",
        "#ffffff",
        "#0075e6",
        "#e6f3ff",
        "#fff5e5"
      ],
      "type": "本地 NotionInter regular/bold；首屏94px、动词72px、正文20px；手机45px。",
      "layout": "居中94px标题、1120px工作空间视频；Capture/Find双列bento、整行Automate；手机单列与官方移动图。",
      "motion": "Think/Ship/Create/Build/Jam/Scale每2500ms轮换；内容测宽与300ms cubic-bezier(.86,0,.07,1)；10.967秒官方视频静音循环，滚出视口继续播放。 桌面dropdown首入250ms ease-out/-16px、退出150ms ease-in+50ms delay、分类instantSwitch来自源CSS/JS。"
    },
    "composition": {
      "color": "营销首页固定白底、浅色 Bento 和蓝色 CTA；没有全局主题切换。产品编辑器内的主题不等于这个首页主题。",
      "typography": "本地 NotionInter regular/bold；首屏94px、动词72px、正文20px；手机45px。",
      "layout": "语言提示/导航 → 动作胶囊/头像/桌面产品视频 → 标识条带 → 两列+通栏 Bento → 五用途 → 团队故事 → 结束行动 → 页尾。",
      "imagery": "白底居中标题用变宽动作胶囊、人格化官方头像和分能力 Bento 建立友好的工具定位。",
      "shape": "大圆胶囊动词、8px按钮、20px功能区；插画自然外轮廓。",
      "hierarchy": "白底居中标题用变宽动作胶囊、人格化官方头像和分能力 Bento 建立友好的工具定位。",
      "motion": "2500ms 自动 Think/Ship/Create/Build/Jam/Scale → 词直接替换，测量 scrollWidth 后宽度以 300ms cubic-bezier(.86,0,.07,1) 变化，底色/圆点对应变化；这是源机制，没有给文字加不存在的飞入飞出。；桌面官方产品视频静音循环，可暂停；手机保留上方七个头像 pile，当前页面隐藏 hero 媒体区而不是塞入桌面视频。；客户标识原生连续横移，指针停留暂停；手机保持条带，不把标识排成多行墙。；桌面 Product/Resources 指针进入与点击 → 首次 opacity/translateY(-16px) 250ms ease-out，退出 150ms ease-in、延迟 50ms；已打开分类按源 instantSwitch 直接切换，快速反转取消旧退出，减少动态直接完成；手机打开全屏菜单 → Product/AI/Resources 原地单开，切换收起前组，再点同组收起；其他分类变灰，底部 Download app/Log in 固定。源 CSS 子展开 300ms、入口 350ms，内容/底部延迟 200/250ms；关闭/Escape 恢复滚动和焦点，维持层级与行动位置。",
      "coherence": "七头像为官方原素材，组合间距、标识 24s 周期和菜单指针离开等待 150ms 是拟合；Bento 使用官方完整静帧而非全部独立浮层，三故事数量与正文缩短。详情对话框内的勾选/问答/agent 反馈是本地示范，并不声称是原站首页机制或真实模型执行。",
      "scroll": "语言提示/导航 → 动作胶囊/头像/桌面产品视频 → 标识条带 → 两列+通栏 Bento → 五用途 → 团队故事 → 结束行动 → 页尾。"
    },
    "sources": [
      {
        "title": "Notion 当前公开页面",
        "url": "https://www.notion.com/",
        "note": "采集日期 2026-10-07；英文首页与简体中文语言提示",
        "type": "实例"
      },
      {
        "title": "Notion brand campaign",
        "url": "https://www.notion.com/blog/the-thinking-behind-our-latest-brand-campaign",
        "type": "理论",
        "note": "2024品牌活动文章解释插画的手势和叙事情境。"
      },
      {
        "title": "Notion page design update",
        "url": "https://www.notion.com/blog/updating-the-design-of-notion-pages",
        "type": "理论",
        "note": "2026-03-18应用页面的阅读间距与列表分组；用于本地文档示例。"
      }
    ],
    "prompt": "以 https://www.notion.com/ 在【采集日期】的 英文首页与简体中文语言提示 为单一依据，先观察初始入场、所有章节至页尾再返回、真实指针与手机操作。保留官方 Notion 字体、字标与七头像、白底居中巨字、蓝色小圆角 CTA，动作胶囊按源 2500ms 直接替词，仅 300ms 测量宽度缓动与对应颜色，不添加飞字。桌面产品视频静音循环；手机头像居标题上方、hero 媒体隐藏，客户条带持续横移。Capture/Find 并列、Automate 通栏，再接五用途、故事、行动和页尾；正常滚动，不增加整屏遮罩。桌面菜单保留指针/键盘路径、250ms首入/-16px、150ms退出加50ms延迟和分类instantSwitch，手机 Product/AI/Resources 原地单开，300ms 展开、其他分类变灰，底部 Download app/Log in 固定，关闭恢复阅读。页面固定浅色，无背景音乐，减少动态保留静态字与手动视频。用于【目标产品】时重新观察其真实操作与资产，不把本案例的拟合数值当作其他产品通用公式。",
    "negativePrompt": "不要凭空重画品牌摄影；不要给全部页面套同一种淡入、圆角或整屏切幕；不要捏造原站音乐、全局主题、账户和远程执行；不要把未验证状态写成通过。",
    "demo": "demos/cases/notion-editorial/index.html",
    "preview": "previews/cases/notion-editorial.jpg",
    "research": "docs/cases/notion-editorial.md",
    "exercise": "以同一来源截图为基准，改变一个局部信息层级并记录对比：标题/图片比例、主按钮或状态反馈。保持品牌素材比例和移动端可读性。",
    "referenceUrl": "https://www.notion.com/",
    "implementation": "reference-study",
    "fidelity": "demos/cases/notion-editorial/fidelity.md",
    "assetManifest": "demos/cases/notion-editorial/assets-manifest.json",
    "referencePreview": "previews/cases/notion-editorial-reference.png",
    "capturedAt": "2026-10-07",
    "themeBehavior": {
      "mode": "fixed",
      "default": "light",
      "control": "营销首页固定白底、浅色 Bento 和蓝色 CTA；没有全局主题切换。产品编辑器内的主题不等于这个首页主题。",
      "designReason": "白底居中标题用变宽动作胶囊、人格化官方头像和分能力 Bento 建立友好的工具定位。"
    },
    "soundBehavior": {
      "kind": "video",
      "control": "桌面官方 hero 产品演示默认静音循环，有本地暂停/播放；手机当前源页隐藏这一媒体区域。没有背景音乐。",
      "interactionRole": "演示内部 UI 展示团队和 agent 的工作，静音让主标题与插画保留阅读主导。"
    }
  },
  {
    "id": "zelda-world",
    "order": 5,
    "title": "塞尔达 · 全景世界舞台",
    "subtitle": "ZELDA / CINEMATIC WORLD",
    "category": "游戏/IP",
    "country": "日本",
    "tags": [
      "塞尔达",
      "Nintendo",
      "官方视频",
      "世界章节",
      "BGM",
      "沉浸"
    ],
    "summary": "先选声音，再由古代纹章扩散进入世界；同屏三章以模糊和亮度交接，主题化削角缩略框联动。",
    "accent": "#1f9a6d",
    "background": "#0a1714",
    "principles": [
      "声音选择先于世界，纹章扩散将古代文明意象变成真正的入口。",
      "影片、标题分层错时进入；3秒闲置隐去界面，让景色承担产品证明。",
      "三个缩略项复用原始古代边框，悬停和当前态削角白线与标题字标一致。"
    ],
    "productFocus": "使用 Nintendo 世界页真实 HLS 场景片段、标题和缩略图；天空、创造、未知世界成为三段连续叙事。",
    "interaction": [
      "首次 ON/OFF → 原始纹章出现；2秒后向外发光扩散，3.6秒移交影片舞台。ON触发原开场 SE，随后原BGM接续。",
      "点击章节 → 300ms输入锁；前片1秒模糊退场，后片1.6秒、延迟0.6秒进入；标题1.6秒、延迟1秒进入。快速选择保留最后请求。",
      "影片片尾前1秒推进下一章；暂停画面和减少动态分支关闭自动推进。",
      "鼠标移动或触摸唤醒界面，3秒闲置后0.8秒模糊淡出；键盘焦点保留控件为本地补充。",
      "桌面滚轮不翻章；手机水平触摸以10px阈值切换并停在两端，竖向浏览到目录和页脚。"
    ],
    "theme": "天空蓝、古代青绿、象牙色标题；自然、神秘与开放探索。",
    "constraints": [
      "本次仅归档2026-10-07所见日文WORLD，官网后续变化不维护。",
      "影片仍为每章前6段短片，保留同样片尾推进规则但循环更短；手机未取得竖版HLS，裁切同一短片。",
      "仅本页三章与声音入口；其它栏目以官网外链打开，未复制业务服务。",
      "键盘、画面持续暂停、焦点时不隐藏为本地无障碍补充；源站桌面滚轮没有翻章。",
      "资源权利归Nintendo，个人学习使用不等于商业授权。"
    ],
    "useCases": [
      "开放世界游戏",
      "世界观宣传",
      "沉浸式产品故事"
    ],
    "avoid": [
      "密集参数后台",
      "高频数据操作"
    ],
    "tokens": {
      "palette": [
        "#0a1714",
        "#1f9a6d",
        "#d5edff",
        "#f6f0d7"
      ],
      "type": "官方日文标题图片 + 小字号衬线副文；控件用系统无衬线",
      "layout": "同一满屏舞台内叠放三章视频；右侧主题，左下Logo，底缘缩略目录",
      "motion": "300ms输入锁；影片退场1s模糊、入场1.6s延迟0.6s；标题入场1.6s延迟1s；片尾前1s推进；闲置3s后0.8s隐藏。"
    },
    "sources": [
      {
        "title": "Nintendo · Tears of the Kingdom WORLD",
        "url": "https://www.nintendo.com/jp/zelda/totk/world/index.html",
        "type": "实例",
        "note": "2026-10-07：同屏游戏影像、三个玩法主题、底缘目录与声音入口。"
      },
      {
        "title": "W3C · Pause, Stop, Hide",
        "url": "https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide.html",
        "type": "规范",
        "note": "持续自动动态应提供暂停；本地视频可持续停止，减少动态下初始停止。"
      },
      {
        "title": "官方公开交互脚本 · 2026-10-07",
        "url": "https://www.nintendo.com/jp/zelda/totk/assets/js/main.js",
        "type": "实例",
        "note": "2026-10-07：章节切换、300ms锁定、片尾推进和3秒闲置隐藏有脚本依据；桌面wheel翻章代码被注释。本地时长、亮度曲线及视频长度另有差异。"
      }
    ],
    "prompt": "以 https://www.nintendo.com/jp/zelda/totk/world/index.html 在2026-10-07的单一快照为依据制作私人学习页。先观察声音门→古代纹章→稳定舞台。原始ON/OFF图、背景纹样、发光纹章、标题、缩略角框都复用官方素材，禁止自行重绘替代。ON启动原开场SE，3.4秒接BGM；OFF全程静音。2秒后纹章扩散，3.6秒交接影片。三章同屏，300ms切换锁：旧片1秒模糊退，下一片1.6秒延迟0.6秒进入，标题延迟1秒；影片结束前1秒推进。3秒闲置后0.8秒模糊隐去控件，鼠标/触摸唤醒。底部使用原始古代边框和削角白线 hover/current 态；不要普通矩形框。桌面滚轮不翻章，手机水平10px触摸有边界，竖向可至页脚。保留画面暂停、减少动态和键盘补充；说明短片及手机视频的近似。输出源码、完整素材manifest、当前fidelity及预览。",
    "negativePrompt": "不要编造原站世界或曲名；不要以原创浮岛替代官方真实场景；不要自动播放声音；不要嵌入原站整页、追踪脚本或声称像素级完整复刻。",
    "demo": "demos/cases/zelda-world/index.html",
    "preview": "previews/cases/zelda-world.jpg",
    "research": "docs/cases/zelda-world.md",
    "exercise": "将三个真实场景换成另一部已授权游戏的世界章节，保持视频、标题、目录的层级并记录保真差异。",
    "composition": {
      "color": "天空蓝、古代青绿、象牙色标题；自然、神秘与开放探索。",
      "typography": "官方日文标题图片 + 小字号衬线副文；控件用系统无衬线",
      "layout": "同一满屏舞台内叠放三章视频；右侧主题，左下Logo，底缘缩略目录",
      "imagery": "官方 HLS 每章前6段、本地转封装 MP4、官方字标与缩略图。",
      "shape": "原始 frame_thumbnail 古代角纹 + 8点削角白线；当前与 hover 加内框，避免普通矩形卡片。",
      "hierarchy": "场景 → 三个玩法动词 → 章节选择 → 真实官方入口。",
      "motion": "300ms输入锁；影片退场1s模糊、入场1.6s延迟0.6s；标题入场1.6s延迟1s；片尾前1s推进；闲置3s后0.8s隐藏。",
      "coherence": "游戏实景、动作主题、细线目录与原站配乐共同让体验围绕探索，而不是抽象功能卡。"
    },
    "referenceUrl": "https://www.nintendo.com/jp/zelda/totk/world/index.html",
    "implementation": "reference-study",
    "fidelity": "demos/cases/zelda-world/fidelity.md",
    "assetManifest": "demos/cases/zelda-world/assets-manifest.json",
    "referencePreview": "previews/cases/zelda-world-reference.jpg",
    "capturedAt": "2026-10-07",
    "themeBehavior": {
      "mode": "fixed",
      "default": "dark",
      "control": "原站未见明暗切换；保留古代青绿、象牙字标和暗色影片舞台。",
      "designReason": "青绿纹章、削角框与自然场景构成单一世界观，翻转为白底会破坏光与暗的叙事。"
    },
    "soundBehavior": {
      "kind": "background",
      "control": "入口 ON/OFF 与顶栏 SOUND；默认静音，选择 ON 后播放原始 se.mp3 与 bgm.mp3。",
      "interactionRole": "开场 SE 对应纹章发亮扩散，BGM在入口移交世界时接续；三段影片切换时音乐不断开，维持探索节奏。"
    }
  },
  {
    "id": "persona-kinetic",
    "order": 6,
    "title": "Persona 5 Royal · 黑金角色拼贴",
    "subtitle": "P5R / GOLD CUTOUT & RED HALFTONE",
    "category": "游戏/IP",
    "country": "日本",
    "tags": [
      "Persona",
      "ATLUS",
      "真实角色",
      "黑金",
      "红色网点",
      "服装切换"
    ],
    "summary": "金、红、黑的剪纸海报与真实星光贴图；角色有界横移，学校生活与怪盗行动各有独立中心轮播。",
    "accent": "#d5b360",
    "background": "#11100e",
    "principles": [
      "真实群像、字标与剪纸箭头构成海报语汇，不能用抽象红黑卡片代替。",
      "六种官方星光贴图以SCREEN叠加、3秒正弦往复明暗；15颗背景星随页面滚动以不同速度位移。",
      "白天与夜晚分别用露出相邻画面的中心轮播表达双重生活，避免压成两个静态小卡。"
    ],
    "productFocus": "官方 Royal 群像、真实主人公/龙司/杏及各自制服、怪盗服、对应Persona；昼夜两种生活以官方游戏截图连接。",
    "interaction": [
      "原站 desktop kv-canvas 只有5颗固定位置星光；本地使用相同六种图像和3秒明暗周期，用Canvas2D重建，未运行PIXI业务包。",
      "背景15颗星光 → 原生滚动差值 / 1–3随机系数位移，超出边界重置；没有查到原站鼠标视差，本地不补造。",
      "三位角色横移500ms并在两端停止；学校/怪盗服装300ms换装入场。本地角色内容缩减为三位。",
      "学校生活与怪盗行动分别采用无限中心轮播：箭头、左右键或横向触摸 → 500ms整条轨道滑动，相邻图露出；到末尾无缝接第一项。",
      "官方PV在用户点击后前往YouTube，音轨属于影片；原站未见独立BGM/声音门。"
    ],
    "theme": "黑金首屏表达 Royal；红黑网点、金框与大号切片标题表达都市怪盗风格。",
    "constraints": [
      "2026-10-07英文官网单一快照；官网后续变化不维护。",
      "本地Canvas2D依据公开PIXI星光算法重写；随机抽样与光混合不能声称逐帧一致。",
      "角色、日常与怪盗行动内容缩减；角色入场细节、字体尺寸与全部购买/规格栏目未逐像素复制。",
      "没有独立BGM，不用通用音乐冒充原曲；PV声音只在用户打开时播放。",
      "所有官方图片与商标权利归ATLUS/SEGA，仅个人学习；不运行追踪或账号服务。"
    ],
    "useCases": [
      "角色游戏",
      "青年文化IP",
      "音乐宣传"
    ],
    "avoid": [
      "长篇规范文档",
      "密集企业后台"
    ],
    "tokens": {
      "palette": [
        "#11100e",
        "#98142b",
        "#e0c483",
        "#f7e9be"
      ],
      "type": "官方剪贴标题图 + 大号无衬线身份文字；中文正文水平",
      "layout": "中心大型群像+左右独立标题；全幅红色角色舞台；倾斜昼夜画面",
      "motion": "六种官方星图，SCREEN叠加，3秒正弦明暗、0–5秒随机延迟；背景15颗随滚动差分移动；角色500ms有界，生活轮播500ms无限中心轨道。"
    },
    "sources": [
      {
        "title": "ATLUS · Persona 5 Royal 官方英文页",
        "url": "https://persona.atlus.com/p5r/?lang=en#",
        "type": "实例",
        "note": "2026-10-07：黑金开场、PV/发行信息、红色网点角色舞台与双服装。"
      },
      {
        "title": "MoMA · Collage",
        "url": "https://www.moma.org/collection/terms/collage",
        "type": "理论",
        "note": "拼贴术语与作品资料帮助分析切片、群像、层叠；不是ATLUS作者意图声明。"
      },
      {
        "title": "W3C · Tabs Pattern",
        "url": "https://www.w3.org/WAI/ARIA/apg/patterns/tabs/",
        "type": "规范",
        "note": "内容切换的键盘与选择状态参考；本地采用button/aria-pressed，不宣称是完整APG Tabs实现。"
      },
      {
        "title": "官方公开交互脚本 · 2026-10-07",
        "url": "https://persona.atlus.com/p5r/resources/js/top.d7194e2d6bcaddee6e3c.js",
        "type": "实例",
        "note": "2026-10-07：非循环Slick默认500ms、角色切换及chara-box服装状态。金色闪光可见，完整Canvas登场轨迹未确认；本地7秒光点为近似。"
      }
    ],
    "prompt": "参考 https://persona.atlus.com/p5r/?lang=en# 在2026-10-07的英文官网单一快照，先走首屏、介绍、角色、学校生活、怪盗生活、规格、购买与footer，再反向浏览。使用官方群像、字标、立绘、六种star纹理和剪纸箭头，禁止通用粒子或红黑卡片替代。桌面KV固定5颗星，背景15颗星，以SCREEN混合、3000ms正弦往复透明度和0–5000ms随机延迟；背景滚动按旧scrollY−新scrollY除1–3系数移动，越界重置。未观察到鼠标视差不要发明。角色500ms有界横移与服装切换；学校和怪盗两个独立无限中心轮播，露出相邻画面，500ms轨道位移、横触与箭头都可操作。原站只有点击PV音轨，不加虚构BGM。固定金红黑主题，提供本地暂停和减少动态补充。可缩减人物/章节但保留机制，明确Canvas2D对PIXI的近似以及未实现购买服务。输出manifest、fidelity、Prompt和预览。",
    "negativePrompt": "不要把当前黑金首页替换为通用红色两栏；不要同一角色换色冒充三人；不要编造原曲或角色技能；不要复制整页SDK、订阅或追踪服务。",
    "demo": "demos/cases/persona-kinetic/index.html",
    "preview": "previews/cases/persona-kinetic.jpg",
    "research": "docs/cases/persona-kinetic.md",
    "exercise": "在虚构剧场主题中迁移当前剪纸轮廓、双生活中心轮播与星光滚动层级，换原创内容，仍记录触发、时长和边界；不追随官网未来版本。",
    "composition": {
      "color": "黑金首屏表达 Royal；红黑网点、金框与大号切片标题表达都市怪盗风格。",
      "typography": "官方剪贴标题图 + 大号无衬线身份文字；中文正文水平",
      "layout": "中心大型群像+左右独立标题；全幅红色角色舞台；倾斜昼夜画面",
      "imagery": "官方首屏群像、三位角色双服装、三张Persona立绘和真实游戏截图。",
      "shape": "斜切拼贴、金色边框、网点与剪贴字保持同一张海报的秩序。",
      "hierarchy": "Royal群像与发行信息 → 角色身份与形态 → 昼夜生活 → 官方平台入口。",
      "motion": "六种官方星图，SCREEN叠加，3秒正弦明暗、0–5秒随机延迟；背景15颗随滚动差分移动；角色500ms有界，生活轮播500ms无限中心轨道。",
      "coherence": "真实角色形态和Persona让视觉表达产品身份；金黑与红金按叙事阶段转换，水平正文约束强烈动势。"
    },
    "referenceUrl": "https://persona.atlus.com/p5r/?lang=en#",
    "implementation": "reference-study",
    "fidelity": "demos/cases/persona-kinetic/fidelity.md",
    "assetManifest": "demos/cases/persona-kinetic/assets-manifest.json",
    "referencePreview": "previews/cases/persona-kinetic-reference.jpg",
    "capturedAt": "2026-10-07",
    "themeBehavior": {
      "mode": "fixed",
      "default": "dark",
      "control": "原站未见明暗切换；保留金、红、黑海报主题。",
      "designReason": "角色、美术剪纸、金色纹样与红黑文字构成同一怪盗视觉身份，不能通过整页反色切主题。"
    },
    "soundBehavior": {
      "kind": "external",
      "control": "WATCH THE OFFICIAL TRAILER 点击打开原始YouTube宣传片。",
      "interactionRole": "音乐跟随PV镜头和字幕剪辑叙事；普通滚动和角色选择不添加原站未发现的BGM或点击声。"
    }
  },
  {
    "id": "hand-drawn",
    "order": 7,
    "title": "手绘：把不完美变成亲近感",
    "subtitle": "Excalidraw / Field Notes",
    "category": "经典风格",
    "tags": [
      "手绘",
      "纸张",
      "草稿",
      "协作",
      "贴纸",
      "SVG"
    ],
    "summary": "以 Excalidraw 的手绘产品表达和 Rough.js 的线条机制为依据，学习受控的不规则轮廓、纸面层次与低压力参与感；迁移为原创手帐俱乐部。",
    "accent": "#b17451",
    "background": "#f4f0e4",
    "principles": [
      "不规则轮廓只承载情绪，信息层级保持稳定",
      "手绘图要解释真实产品活动，而非四处点缀",
      "纸张、胶带、批注组成可辨识的实体隐喻",
      "少量色块强调一个值得开始的动作"
    ],
    "productFocus": "让用户理解记录生活的低门槛：先看到一本已经开始的笔记，再亲手勾选三个小步骤。",
    "interaction": [
      "三项原生复选框更新收集进度",
      "贴纸按钮切换装饰并同步 aria-pressed",
      "开始按钮自然滚动到仪式清单",
      "重置清单便于反复体验"
    ],
    "theme": "奶油纸张、深橄榄墨色、陶土铅笔与低饱和植物绿；温和、好奇、允许草稿的日常创作气质。",
    "constraints": [
      "正文使用清晰字体，手写感仅用于批注和图内短句",
      "倾斜角度限制在小范围，不能影响阅读和触达",
      "线宽与排线密度要保持统一",
      "SVG 不规则线条固定生成，避免每帧抖动",
      "复选框与按钮使用原生语义和键盘焦点",
      "小屏纸页完整缩放，不让贴纸挡住核心文案"
    ],
    "useCases": [
      "创作工具",
      "教育与社区",
      "手帐文具",
      "轻量规划产品"
    ],
    "avoid": [
      "高精度交易数据主界面",
      "需要严肃医疗可信度的关键信息",
      "长篇正文全部使用手写字体",
      "无限制的纸纹和装饰叠加"
    ],
    "tokens": {
      "palette": [
        "#f4f0e4",
        "#343e2f",
        "#b17451",
        "#a6af83",
        "#e5e8cf"
      ],
      "type": "标题 Georgia 44–72px；正文 Georgia 15–18px；元信息 Arial 9–12px",
      "layout": "双栏纸页首屏 + 非对称仪式清单 + 三种记录页；大面积留白，小角度旋转",
      "motion": "由点击触发的状态变化；无持续装饰动画；reduced motion 关闭平滑滚动"
    },
    "sources": [
      {
        "title": "Excalidraw Plus 官方网站",
        "url": "https://plus.excalidraw.com/",
        "type": "实例",
        "note": "2026-10-07 核验：官网以简单白板、协作与快速草稿组织产品信息；手绘产品表达的局部参考，不宣称官网采用本 demo 的整套纸张拼贴。"
      },
      {
        "title": "Rough.js 官方说明与绘图示例",
        "url": "https://roughjs.com/",
        "type": "理论",
        "note": "官方展示线条粗糙度、弯曲度、排线等可调机制；demo 以原创 SVG 固定曲线迁移该表达思想，不依赖库。"
      }
    ],
    "prompt": "可替换内容：产品/品牌【名称】；受众【用户】；核心价值【卖点与证据】；主行动【希望用户完成的动作】。以下为风格示范任务，可替换具体品牌与内容，保留设计约束。\n\n为虚构手帐俱乐部 Field Notes 制作可离线运行的英文网页。参考 Excalidraw 的手绘产品表达和 Rough.js 的受控轮廓/排线机制，但使用原创名称、文案和 SVG 插画。信息顺序：生活记录价值主张→已经写过的植物与咖啡笔记→三个低门槛开始步骤→不同记录场景。首屏用深橄榄色衬线大标题和奶油纸张；右侧原创笔记本带细横线、胶带、铅笔、小角度旋转和一张可切换贴纸。手绘不是全页面凌乱：正文正常排版，线宽统一，主 CTA 明显。三项清单必须可以勾选并更新可读进度，提供清单重置；贴纸按钮需 aria-pressed。至少三节完整内容，移动端将两栏重排成单栏；保留键盘焦点与 reduced motion；全部素材本地，不使用 CDN 或他人插画。\n\n要素协调要求：纸色、植物线稿、宽松排版和手工贴纸都服务于“慢下来记录”；正文使用清楚字形，避免过度装饰。",
    "negativePrompt": "不要复制 Excalidraw 商标或官网素材；不要把全部正文写成手写字；不要随机抖动、过密纹理、过多旋转、悬空链接或只有换色的通用卡片。",
    "demo": "demos/cases/hand-drawn/index.html",
    "preview": "previews/cases/hand-drawn.jpg",
    "theoryVerifiedAt": "2026-10-07",
    "research": "docs/cases/hand-drawn.md",
    "exercise": "将手帐俱乐部改造成团队复盘工具：保留低压力草稿感，把植物笔记换为原创流程图，并让清单对应一次复盘的三个阶段。",
    "composition": {
      "color": "奶油纸色和低饱和植物绿保持柔和，黑色线稿提供可读性。",
      "typography": "标题 Georgia 44–72px；正文 Georgia 15–18px；元信息 Arial 9–12px",
      "layout": "双栏纸页首屏 + 非对称仪式清单 + 三种记录页；大面积留白，小角度旋转",
      "imagery": "自绘植物、笔记页与贴纸解释记录生活的场景。",
      "shape": "适度不规则笔触与纸页质感模拟手工；按钮仍有稳定边界。",
      "hierarchy": "生活主张 → 手帐示范 → 清单练习 → 记录入口。",
      "motion": "由点击触发的状态变化；无持续装饰动画；reduced motion 关闭平滑滚动",
      "coherence": "纸色、植物线稿、宽松排版和手工贴纸都服务于“慢下来记录”；正文使用清楚字形，避免过度装饰。"
    },
    "themeBehavior": {
      "mode": "fixed",
      "default": "light",
      "control": "此构成练习保留指定风格配色；实验室可另行比较系统／手动深浅主题。",
      "designReason": "风格不是一组可直接反转的颜色；改变主题时需重新配对文字、表面、强调与边框，保留图像原色。"
    },
    "soundBehavior": {
      "kind": "none",
      "control": "本练习无背景音乐。",
      "interactionRole": "不按风格标签臆造音乐；若引入声音，应有真实来源、主动启用、停止控制与明确的交互作用。"
    }
  },
  {
    "id": "isometric-3d",
    "order": 8,
    "title": "等轴 3D：让空间讲述系统",
    "subtitle": "Monument Valley / Little Terraces",
    "category": "经典风格",
    "tags": [
      "等轴",
      "3D",
      "空间叙事",
      "游戏",
      "建筑",
      "层级"
    ],
    "summary": "从 Monument Valley 官方呈现的极简建筑世界出发，以 Adobe 的等轴制图说明落实 30° 平行投影；迁移为可展开层次的原创浮岛。",
    "accent": "#a26958",
    "background": "#e8eee8",
    "principles": [
      "统一平行投影，让每个物体属于同一个空间",
      "三面明度建立体积，克制材质细节",
      "路径、水面和植物提供比例与浏览方向",
      "画面先传达世界气质，再由章节解释体验",
      "拆分图层把复杂系统变成可理解的组成关系"
    ],
    "productFocus": "让访客先感受安静、探索与建造，再通过图层切换理解花园、建筑和基础平台的关系。",
    "interaction": [
      "整岛、花园、建筑三种焦点切换",
      "展开按钮将基础、建筑、植物分层",
      "焦点状态伴随文字说明与 aria-pressed",
      "章节锚点保留正常浏览节奏"
    ],
    "theme": "鼠尾草背景、陶土平台、奶油塔楼与薄荷温室；极简、宁静、微缩世界的空间感。",
    "constraints": [
      "真正等轴投影使用平行轴和统一比例，不随意混入透视消失点",
      "左右平面约 30°，同一组坐标生成全部物体",
      "光源与三面明度方向一致",
      "场景图层必须有文字控件，不能只依赖小物体热点",
      "移动端先呈现价值主张，再呈现场景和控件",
      "reduced motion 时立即切换图层位置"
    ],
    "useCases": [
      "游戏世界宣传",
      "复杂系统介绍",
      "园区与空间项目",
      "供应链或基础设施产品"
    ],
    "avoid": [
      "需要真实透视的建筑验收图",
      "用大量重材质遮蔽系统关系",
      "场景上堆叠无法触达的小热点",
      "把固定二维 SVG 称为可旋转 3D 引擎"
    ],
    "tokens": {
      "palette": [
        "#e8eee8",
        "#234647",
        "#a26958",
        "#d9b7a6",
        "#9cb29a",
        "#f3ead6"
      ],
      "type": "Georgia 49–73px 叙事标题；Arial 12–15px 正文与 8–10px 空间标签",
      "layout": "窄叙事栏 + 大场景图；横向图层控制；章节编号列表；独立居中结尾",
      "motion": "点击后 650ms 图层偏移/透明度变化；无滚轮劫持；reduced motion 即时完成"
    },
    "sources": [
      {
        "title": "Monument Valley 系列官方网站",
        "url": "https://www.monumentvalleygame.com/",
        "type": "实例",
        "note": "2026-10-07 核验：官网系列入口存在；网页文本提取有限。参考是游戏世界的建筑视觉，不宣称官网提供本 demo 的图层交互。"
      },
      {
        "title": "ustwo games — Monument Valley 3",
        "url": "https://ustwogames.co.uk/our-games/monument-valley-3/",
        "type": "实例",
        "note": "开发商说明世界设计来自建筑和实验艺术，并强调极简、不可能几何和旋转建筑探索；用于核验视觉及体验意图。"
      },
      {
        "title": "Adobe — Isometric art",
        "url": "https://www.adobe.com/products/photoshop/isometric-art.html",
        "type": "理论",
        "note": "解释二维表现三维、30° 侧向轴与侧面明暗。demo 使用严格平行坐标生成 SVG，是风格迁移而非原游戏复刻。"
      }
    ],
    "prompt": "可替换内容：产品/品牌【名称】；受众【用户】；核心价值【卖点与证据】；主行动【希望用户完成的动作】。以下为风格示范任务，可替换具体品牌与内容，保留设计约束。\n\n为虚构宁静世界 Little Terraces 制作本地网页，借鉴 Monument Valley 的极简建筑世界呈现，并依据 Adobe 等轴制图说明使用严格 30° 平行投影。不要复制其关卡、角色和标志。信息顺序：宁静探索的价值主张→一个原创浮岛的完整世界→三个旅程章节→回到场景的邀请。画面包含陶土基础台、奶油塔楼、薄荷温室、水池、树木和连续路径；全部用同一 x/y/z 投影函数与统一三面明度生成 SVG。左侧窄文案右侧大场景，避免通用卡片首屏。提供整岛/花园/建筑焦点按钮，和将平台、建筑、植物分层的展开按钮；状态说明和 aria-pressed 同步。至少三节内容，小屏重排，SVG 适配视口，键盘可操作，reduced motion 即时切换；无CDN、外部素材或WebGL依赖。\n\n要素协调要求：柔和调色、衬线标题和稳定投影共享安静情绪；结构展开解释层次，不能随意更换投影角度。",
    "negativePrompt": "不要混合透视消失点与等轴投影；不要复制原游戏地图；不要自动旋转、强制视差或密集热点；不要声称 SVG 是真正可旋转的实时 3D。",
    "demo": "demos/cases/isometric-3d/index.html",
    "preview": "previews/cases/isometric-3d.jpg",
    "theoryVerifiedAt": "2026-10-07",
    "research": "docs/cases/isometric-3d.md",
    "exercise": "把浮岛替换成数据平台的等轴系统图，让三种焦点分别对应计算、存储、网络，保留统一坐标与分层解释。",
    "composition": {
      "color": "柔和绿和暖土色构成同一空间，每个立方体以三面明度表达体积。",
      "typography": "Georgia 49–73px 叙事标题；Arial 12–15px 正文与 8–10px 空间标签",
      "layout": "窄叙事栏 + 大场景图；横向图层控制；章节编号列表；独立居中结尾",
      "imagery": "统一投影的原创浮岛、建筑和植被是叙事主角。",
      "shape": "平行边、统一30°方向和几何积木建立一致空间规则。",
      "hierarchy": "平衡主张 → 场景 → 图层聚焦 → 漫游理念。",
      "motion": "点击后 650ms 图层偏移/透明度变化；无滚轮劫持；reduced motion 即时完成",
      "coherence": "柔和调色、衬线标题和稳定投影共享安静情绪；结构展开解释层次，不能随意更换投影角度。"
    },
    "themeBehavior": {
      "mode": "fixed",
      "default": "light",
      "control": "此构成练习保留指定风格配色；实验室可另行比较系统／手动深浅主题。",
      "designReason": "风格不是一组可直接反转的颜色；改变主题时需重新配对文字、表面、强调与边框，保留图像原色。"
    },
    "soundBehavior": {
      "kind": "none",
      "control": "本练习无背景音乐。",
      "interactionRole": "不按风格标签臆造音乐；若引入声音，应有真实来源、主动启用、停止控制与明确的交互作用。"
    }
  },
  {
    "id": "line-art",
    "order": 9,
    "title": "线条：沿绘制顺序解释结构",
    "subtitle": "Vivus / Codrops / Monoline",
    "category": "经典风格",
    "tags": [
      "线条",
      "线描",
      "SVG",
      "建筑",
      "路径动画",
      "极简"
    ],
    "summary": "由 Vivus 官方示范和 Codrops 原作者实验核验线描交互，再依据 SVG stroke 机制制作原创建筑工作室页面。案例是开发者优秀示范，区别于商业品牌官网。",
    "accent": "#607ca4",
    "background": "#f7f7f2",
    "principles": [
      "把轮廓与结构作为视觉主体，填色保持克制",
      "线宽、空白和标签共同建立工程式清晰度",
      "绘制顺序体现组成逻辑，不让内容等待动画",
      "正文与装饰线分开，主信息始终可读"
    ],
    "productFocus": "用一幅完整建筑线稿直接表达工作室对比例、构造和精简的重视；方法说明解释这种态度如何成为服务。",
    "interaction": [
      "重播按钮由基础到细节绘制线稿",
      "进度滑块允许主动描绘或回看",
      "绘制过程中可拖动滑块中止动画",
      "项目类型按钮更新对应的咨询说明"
    ],
    "theme": "近白纸面、石墨线、单一蓝灰强调；理性、精确、安静的建筑草图语言。",
    "constraints": [
      "主轮廓和辅助线以有限线宽建立层级",
      "绘制路径必须是 stroke，填色块不应装作线条被描出",
      "默认状态显示完整内容，动画由用户主动启动",
      "用 pathLength 归一化长度，进度不能依赖偶然像素尺寸",
      "reduced motion 显示终态，避免内容缺失",
      "小屏保留比例和可触达控制，不能让细线承担全部信息"
    ],
    "useCases": [
      "建筑与工业设计",
      "结构化产品介绍",
      "工艺品牌",
      "开发者交互演示"
    ],
    "avoid": [
      "复杂线稿缩小成无法辨识的图标",
      "强制等待绘制结束才能看文字",
      "线宽层级超过必要范围",
      "用过度细线作为唯一可用性线索"
    ],
    "tokens": {
      "palette": [
        "#f7f7f2",
        "#252a35",
        "#607ca4",
        "#edf0ef"
      ],
      "type": "Arial 55–84px 标题与 Georgia 斜体强调；正文 12–15px；工程标签 8–9px",
      "layout": "固定窄侧栏 + 宽标题 + 通栏建筑线稿 + 横向绘制工具栏 + 双栏方法说明",
      "motion": "3200ms 用户触发顺序描绘；滑块可中断；reduced motion 显示完成状态"
    },
    "sources": [
      {
        "title": "Vivus 官方示范站",
        "url": "https://maxwellito.github.io/vivus/",
        "type": "实例",
        "note": "2026-10-07 核验：示范 delayed、sync、oneByOne 三种绘制类型，以及 replay/rewind 与参数；是开发者示范而非大厂营销页。"
      },
      {
        "title": "Codrops — SVG Drawing Animation",
        "url": "https://tympanus.net/codrops/2013/12/30/svg-drawing-animation/",
        "type": "实例",
        "note": "原作者实验比较轮廓绘制后图像出现、页面框架出现等手法；demo 只迁移绘制机制。"
      },
      {
        "title": "Jake Archibald — Animated line drawing in SVG",
        "url": "https://jakearchibald.com/2013/animated-line-drawing-svg/",
        "type": "理论",
        "note": "作者说明 dasharray/dashoffset 与路径长度驱动绘制的机制。"
      },
      {
        "title": "MDN — stroke-dashoffset",
        "url": "https://developer.mozilla.org/en-US/docs/Web/SVG/Reference/Attribute/stroke-dashoffset",
        "type": "规范",
        "note": "核验 stroke-dashoffset 的偏移、可动画性和 pathLength 归一化；注意旧 Vivus README 的限制属于旧库实现，不代表当前 SVG 仅 path 支持。"
      }
    ],
    "prompt": "可替换内容：产品/品牌【名称】；受众【用户】；核心价值【卖点与证据】；主行动【希望用户完成的动作】。以下为风格示范任务，可替换具体品牌与内容，保留设计约束。\n\n为虚构建筑工作室 Monoline 制作英文静态网站。依据 Vivus 官方线描示范、Codrops SVG Drawing Animation 原作者实验和 SVG stroke-dasharray/stroke-dashoffset 机制。素材为原创院落住宅、树、玻璃幕墙和水池线稿，不复制案例的设备插图。信息顺序：精简空间的观点→通栏建筑概念线稿→三步设计方法→可选择项目类型的咨询说明。近白背景、石墨线条、蓝灰强调，有限线宽和细工程标签；标题使用无衬线和单一衬线斜体强调，设窄侧边栏。默认展示完整线稿，重播按钮才开始从基础到细节绘制；用 pathLength 归一化每条路径，进度滑块可中断并控制图形；文本不等待动画。至少三节内容，移动端缩放和重排，键盘焦点、可读状态及 reduced motion 终态齐全；全部本地，无CDN。\n\n要素协调要求：线宽、清淡色彩、大留白和简短标题共同表达“减少噪声”；描绘动效与建筑构成顺序相呼应。",
    "negativePrompt": "不要把细线作为唯一信息；不要启动时隐藏全页等待动画；不要把填色块错误称为线描；不要复制原示范插图；不要依赖过时库限制或让动画阻塞键盘。",
    "demo": "demos/cases/line-art/index.html",
    "preview": "previews/cases/line-art.jpg",
    "theoryVerifiedAt": "2026-10-07",
    "research": "docs/cases/line-art.md",
    "exercise": "将建筑线稿改为原创机械产品分解图，让绘制顺序对应支架、外壳、接口，并保持全文始终可读。",
    "composition": {
      "color": "接近白纸的底色和灰蓝线条保持克制，强调色只用于进度。",
      "typography": "Arial 55–84px 标题与 Georgia 斜体强调；正文 12–15px；工程标签 8–9px",
      "layout": "固定窄侧栏 + 宽标题 + 通栏建筑线稿 + 横向绘制工具栏 + 双栏方法说明",
      "imagery": "建筑线稿随绘制顺序解释基础、结构与细节。",
      "shape": "统一细线和留白制造精度，不以粗阴影替代结构。",
      "hierarchy": "空间主张 → 建筑描绘 → 工作方法 → 项目类型。",
      "motion": "3200ms 用户触发顺序描绘；滑块可中断；reduced motion 显示完成状态",
      "coherence": "线宽、清淡色彩、大留白和简短标题共同表达“减少噪声”；描绘动效与建筑构成顺序相呼应。"
    },
    "themeBehavior": {
      "mode": "fixed",
      "default": "light",
      "control": "此构成练习保留指定风格配色；实验室可另行比较系统／手动深浅主题。",
      "designReason": "风格不是一组可直接反转的颜色；改变主题时需重新配对文字、表面、强调与边框，保留图像原色。"
    },
    "soundBehavior": {
      "kind": "none",
      "control": "本练习无背景音乐。",
      "interactionRole": "不按风格标签臆造音乐；若引入声音，应有真实来源、主动启用、停止控制与明确的交互作用。"
    }
  },
  {
    "id": "shape-morph",
    "order": 10,
    "title": "动态形状：同一单元，多种表达",
    "subtitle": "In Pieces / Form Shift",
    "category": "经典风格",
    "tags": [
      "几何",
      "形状变化",
      "碎片",
      "动态品牌",
      "SVG",
      "变形"
    ],
    "summary": "以 Bryan James 的 In Pieces 及其原作者制作文章为制作依据，研究保留几何单元的形态切换；迁移为原创设计工作室的 24 片动态身份。",
    "accent": "#e3ef85",
    "background": "#b7a2df",
    "principles": [
      "几何单元保持身份连续，变化不是无目的装饰",
      "形态切换要与内容或品牌语义同步",
      "相同顶点拓扑让变形可预测和可中断",
      "给用户状态选择与动画控制，不持续夺取注意"
    ],
    "productFocus": "用连接、扩张、聚焦三个可识别状态解释动态品牌系统：同一套部件可以服务不同表达，而非每次从头重做。",
    "interaction": [
      "三种形态按钮切换 24 个三角片的位置",
      "间距滑块将单元从连续图案分离为碎片",
      "时长滑块调整下一次变形速度",
      "变形可暂停与恢复，重置恢复初始参数",
      "状态说明随形态变化，reduced motion 即时切换"
    ],
    "theme": "紫色画布、酸黄几何、石墨底部参数区；大胆、实验、具有明确系统感的动态品牌。",
    "constraints": [
      "各状态保留同一数量三角片和同一顶点顺序",
      "动画参数变化需要明确说明何时生效",
      "每次触发从当前中间状态继续，避免突然闪回",
      "选择、暂停、参数都必须支持键盘",
      "动态视觉不能遮住标题或改变正文布局",
      "不把原作者文章中的示范称为本次官网实访，明确来源状态"
    ],
    "useCases": [
      "创意工作室",
      "展览与文化项目",
      "动态品牌系统",
      "需要演示变化的产品概念"
    ],
    "avoid": [
      "与内容无关的持续形变",
      "关键操作按钮也不断移动",
      "随机顶点造成难以辨识的闪烁",
      "只有单个 blob 而没有单元和语义关系"
    ],
    "tokens": {
      "palette": [
        "#b7a2df",
        "#242026",
        "#e3ef85",
        "#efece5",
        "#d4df71"
      ],
      "type": "Arial 75–126px 巨型主标题；Georgia 斜体强调；正文 12–14px；状态标签 8–10px",
      "layout": "整幅紫色海报首屏 + 中央偏右碎片标志 + 底部横向状态导航 + 浅色方法区 + 深色参数台",
      "motion": "300–2400ms smoothstep 顶点插值；默认 1200ms；当前状态可中断、暂停和恢复；reduced motion 即时完成"
    },
    "sources": [
      {
        "title": "In Pieces 项目官网",
        "url": "https://species-in-pieces.com/",
        "type": "实例",
        "note": "2026-10-07 web 读取失败；不声称完成当日官网视觉核验。案例内容由下方原作者制作文章核实，本条为基于作者文章的经典风格练习。"
      },
      {
        "title": "Bryan James — The Making Of In Pieces",
        "url": "https://www.smashingmagazine.com/2015/06/the-making-of-in-pieces/",
        "type": "理论",
        "note": "2015-06-02 作者自述：30 个三角片重组 30 种动物，将碎片与保育主题关联，并用方向、延迟与颜色切换组织动画。此处读取核验。"
      },
      {
        "title": "CSSconf EU 对 Bryan James 的访谈",
        "url": "https://blog.cssconf.eu/2015/09/24/introducing-bryan-james/",
        "type": "实例",
        "note": "原作者访谈再次说明原项目的技术实验如何与 pieces 的核心概念结合，作为原作品制作依据。"
      },
      {
        "title": "MDN — polygon()",
        "url": "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/basic-shape/polygon",
        "type": "规范",
        "note": "核验多边形由有序顶点描述；本 demo 为方便暂停和参数变化使用 SVG 顶点插值，不复制原项目的 CSS clip-path 实现。"
      }
    ],
    "prompt": "可替换内容：产品/品牌【名称】；受众【用户】；核心价值【卖点与证据】；主行动【希望用户完成的动作】。以下为风格示范任务，可替换具体品牌与内容，保留设计约束。\n\n为虚构设计工作室 Form / Shift 制作本地可运行的动态几何网站。以 In Pieces 的原作者制作文章为制作依据，提取‘保留几何单元、用变化承载主题’这一机制，不复制动物造型。将用户提到的集合形状变化具体化为 24 个相同身份三角片，在 Connect、Expand、Focus 三状态间重排为环状、星形、菱形。紫色整幅海报首屏配巨大标题和酸黄标志，底部状态按钮；随后浅色方法区和深色参数区，至少三节。信息顺序：品牌必须能变化的观点→手动切换的身份示范→系统制作步骤→间距和时长实验。SVG 每片保留三个顶点，使用 smoothstep 插值，从当前中间态继续；提供暂停/恢复、间距调整、下一次动画时长调整和重置。状态说明同步，控制使用原生按钮/滑块，键盘可操作，移动端重排；reduced motion 即时换态。全部素材原创本地，无CDN、无自动循环、无强制滚动。\n\n要素协调要求：变化发生在共同单元上；颜色、字体和网格保持稳定，因此读者能理解同一身份的不同表达。",
    "negativePrompt": "不要复制 In Pieces 动物或将其作品称为本 demo；不要随机闪烁、自动无限变形、移动文字或变化点击目标；不要在顶点拓扑不匹配时硬插值；不要把未能访问的项目官网当成当日视觉事实。",
    "demo": "demos/cases/shape-morph/index.html",
    "preview": "previews/cases/shape-morph.jpg",
    "theoryVerifiedAt": "2026-10-07",
    "research": "docs/cases/shape-morph.md",
    "exercise": "将三种形态映射为一个产品的收集、处理、输出阶段，让每次变形同步切换解释文本，并保留相同三角片。",
    "composition": {
      "color": "紫色舞台与黄绿碎片形成集中对比，正文保持黑色清晰。",
      "typography": "Arial 75–126px 巨型主标题；Georgia 斜体强调；正文 12–14px；状态标签 8–10px",
      "layout": "整幅紫色海报首屏 + 中央偏右碎片标志 + 底部横向状态导航 + 浅色方法区 + 深色参数台",
      "imagery": "同拓扑24个三角片组合出三种状态，图形本身承担变化。",
      "shape": "保留几何单元，通过位置与间距变化建立多个表情。",
      "hierarchy": "变化主张 → 三个形态 → 设计方法 → 参数操作。",
      "motion": "300–2400ms smoothstep 顶点插值；默认 1200ms；当前状态可中断、暂停和恢复；reduced motion 即时完成",
      "coherence": "变化发生在共同单元上；颜色、字体和网格保持稳定，因此读者能理解同一身份的不同表达。"
    },
    "themeBehavior": {
      "mode": "fixed",
      "default": "light",
      "control": "此构成练习保留指定风格配色；实验室可另行比较系统／手动深浅主题。",
      "designReason": "风格不是一组可直接反转的颜色；改变主题时需重新配对文字、表面、强调与边框，保留图像原色。"
    },
    "soundBehavior": {
      "kind": "none",
      "control": "本练习无背景音乐。",
      "interactionRole": "不按风格标签臆造音乐；若引入声音，应有真实来源、主动启用、停止控制与明确的交互作用。"
    }
  },
  {
    "id": "swiss-grid",
    "order": 11,
    "title": "瑞士设计：编辑网格",
    "subtitle": "Swissted / Müller-Brockmann → 信息优先的展览日程",
    "category": "经典风格",
    "tags": [
      "瑞士",
      "国际主义",
      "网格",
      "排版",
      "展览",
      "编辑设计"
    ],
    "summary": "用对齐、字号差和非对称留白构建清晰的信息秩序。不是一张红黑海报套在所有网页上，而是让名称、日期、类别和行动共享网格。",
    "accent": "#e3402e",
    "background": "#f2efe6",
    "principles": [
      "从内容层级建立网格，再决定视觉形状。",
      "名称、日期、编号共享对齐线；非对称仍有稳定秩序。",
      "少量无衬线字重和尺度差承担层级，不依靠组件阴影。",
      "抽象图形表达主题节奏，同时为信息保留阅读空间。"
    ],
    "productFocus": "将展览主题置于最大字级，日程成为可筛选的编辑式列表；日期、类型和收藏状态无需进入详情即可理解。",
    "interaction": [
      "分类按钮筛选日程并宣布结果数。",
      "收藏按钮将展览编号存到当前浏览器，状态可再次取消。",
      "页内导航沿常规文档滚动；无滚动劫持。",
      "键盘焦点采用高对比轮廓，筛选按钮有 aria-pressed。"
    ],
    "theme": "纸白、炭黑、信号红；严格基线、粗线分隔、左对齐标题，主题是现代城市中的字与信息。",
    "constraints": [
      "Swissted 官网明确使用 Berthold Akzidenz-Grotesk medium，并非 Helvetica；本 demo 用系统 Arial 近似结构，不声称字体等同。",
      "桌面 12 栏，移动端折为单列；文字不能为了维持海报形状被裁切。",
      "红色用于主视觉和状态，正文以黑字/纸白保持对比。",
      "字号差必须伴随语义标题层级，不能以超大字替代内容组织。",
      "几何图形只是局部节奏；不要把 Swiss 和包豪斯的形色课程混为一个流派。"
    ],
    "useCases": [
      "展览与文化机构",
      "课程日程",
      "排版作品集",
      "设计节"
    ],
    "avoid": [
      "无序的散落大字",
      "每节都是同规格圆角卡片",
      "为海报构图牺牲手机阅读"
    ],
    "tokens": {
      "palette": [
        "#f2efe6",
        "#171717",
        "#e3402e"
      ],
      "type": "Arial / Microsoft YaHei；标题 48–128px，正文 16–18px，元数据 12–14px",
      "layout": "12 栏、32px 基础间距、横向日程列表；手机为单列",
      "motion": "按钮 160ms 颜色变化；prefers-reduced-motion 禁用平滑滚动"
    },
    "sources": [
      {
        "title": "Swissted — 官方海报商店",
        "url": "https://www.swissted.com/",
        "type": "实例",
        "note": "2026-10-07 阅读：海报作品是商品主角；本例迁移其字体优先思路，不复制电商页面。"
      },
      {
        "title": "About Swissted — Mike Joyce",
        "url": "https://www.swissted.com/pages/about-us",
        "type": "理论",
        "note": "作者说明将真实演出传单改为 International Typographic Style，并明确 Akzidenz-Grotesk 不是 Helvetica。"
      },
      {
        "title": "Josef Müller-Brockmann — MoMA",
        "url": "https://www.moma.org/artists/4154-josef-muller-brockmann",
        "type": "实例",
        "note": "馆藏确认 1953–1958 音乐会海报；不是整个网页动效的证据。"
      },
      {
        "title": "IBM Carbon — 2x Grid",
        "url": "https://www.carbondesignsystem.com/building-blocks/foundations/2x-grid/overview",
        "type": "规范",
        "note": "阅读于 2026-10-07：对齐线、间距尺度和响应式网格指导网页迁移，非历史 Swiss 唯一规范。"
      }
    ],
    "prompt": "可替换内容：产品/品牌【名称】；受众【用户】；核心价值【卖点与证据】；主行动【希望用户完成的动作】。以下为风格示范任务，可替换具体品牌与内容，保留设计约束。\n\n为虚构文化机构 [品牌] 制作瑞士国际主义启发的 [展览/课程] 页面。先建立标题、日期、地点、分类和行动层级，再用桌面12栏、32px间距、手机单列落地。纸白背景、炭黑正文、单一信号红；采用本地系统无衬线字体，最多两个字重。首屏是非对称的大标题和一幅原创抽象节奏图；后续用横向编号日程而非圆角卡片。提供有aria-pressed的分类筛选、结果计数和可取消的本地收藏。至少三个内容章节。保留常规滚动、可见键盘焦点、中文可读正文与reduced-motion降级。参考Swissted与Müller-Brockmann的排版逻辑，不复制商标、海报或宣称字体与原作相同。\n\n要素协调要求：标题尺度、对齐线、间距和日期位置重复形成秩序；红色只是集中强调，不能代替信息层级。",
    "negativePrompt": "不要玻璃拟态、渐变霓虹、满屏圆角卡片、横向滚动劫持、裁切中文标题；不要将Helvetica当作Swiss的唯一字体或混用包豪斯形色定律。",
    "demo": "demos/cases/swiss-grid/index.html",
    "preview": "previews/cases/swiss-grid.jpg",
    "theoryVerifiedAt": "2026-10-07",
    "research": "docs/cases/swiss-grid.md",
    "exercise": "将日程从 4 项扩展为 12 项，增加地点筛选，同时保持标题、日期和行动的对齐线。",
    "composition": {
      "color": "暖白纸面、黑色信息与少量红色海报形成清晰层级。",
      "typography": "Arial / Microsoft YaHei；标题 48–128px，正文 16–18px，元数据 12–14px",
      "layout": "12 栏、32px 基础间距、横向日程列表；手机为单列",
      "imagery": "海报图形提供节奏，日程文字与日期才是主要内容。",
      "shape": "直线、圆环和非对称版面服从信息网格；不用装饰性圆角。",
      "hierarchy": "展览主题 → 日期地点 → 分类日程 → 理念。",
      "motion": "按钮 160ms 颜色变化；prefers-reduced-motion 禁用平滑滚动",
      "coherence": "标题尺度、对齐线、间距和日期位置重复形成秩序；红色只是集中强调，不能代替信息层级。"
    },
    "themeBehavior": {
      "mode": "fixed",
      "default": "light",
      "control": "此构成练习保留指定风格配色；实验室可另行比较系统／手动深浅主题。",
      "designReason": "风格不是一组可直接反转的颜色；改变主题时需重新配对文字、表面、强调与边框，保留图像原色。"
    },
    "soundBehavior": {
      "kind": "none",
      "control": "本练习无背景音乐。",
      "interactionRole": "不按风格标签臆造音乐；若引入声音，应有真实来源、主动启用、停止控制与明确的交互作用。"
    }
  },
  {
    "id": "bauhaus-geometry",
    "order": 12,
    "title": "包豪斯：几何与实验",
    "subtitle": "Bauhaus Dessau / Kandinsky 课程 → 可操作的构成工坊",
    "category": "经典风格",
    "tags": [
      "包豪斯",
      "几何",
      "原色",
      "构成",
      "工坊",
      "材料"
    ],
    "summary": "以圆、三角、矩形、色彩关系和材料实验组织一个可操作的设计工坊。几何形状有构成任务，包豪斯并不等于随意贴满红黄蓝。",
    "accent": "#d93929",
    "background": "#eee8d8",
    "principles": [
      "把基础形态作为观察比例、平衡和张力的工具。",
      "视觉实验与实际操作相连：形状既是展示物，也是用户可调整的对象。",
      "有限的原色和黑色建立关系；留白承担构成的呼吸。",
      "保持艺术、材料、制作之间的联系，不将历史课程简化为固定装饰模板。"
    ],
    "productFocus": "虚构 Form/03 工坊直接让用户切换构成、调整旋转并导出自己的SVG，再介绍纸、木、金属的工作坊课程。",
    "interaction": [
      "三个构成预设改变圆、三角和矩形之间的真实位置关系。",
      "原生范围控件可用键盘旋转三角形并即时显示角度。",
      "导出按钮下载当前原创构成的SVG文件。",
      "材料课程使用原生details展开具体学习内容。"
    ],
    "theme": "温暖纸底、红黄蓝黑的平面构成；大字与巨大几何互相制衡，强调制作的过程。",
    "constraints": [
      "红方、黄三角、蓝圆是Kandinsky课程的一种历史性对应，不是科学验证的通用用户心理规则。",
      "包豪斯存在不同教师和阶段；本例聚焦基础形色课程，不宣称代表整个运动。",
      "所有几何形均为原创SVG，不复制馆藏练习。",
      "圆/三角/矩形承担平衡和张力，不能阻挡可读文字或操作区。",
      "手机将构成和控制纵向排列；范围输入、按钮和details都可键盘使用。"
    ],
    "useCases": [
      "设计教育",
      "工作坊",
      "创意工具",
      "艺术展览",
      "材料实验室"
    ],
    "avoid": [
      "把包豪斯等同瑞士编辑网格",
      "无功能的随机原色装饰",
      "将形色对应描述为普遍心理定律"
    ],
    "tokens": {
      "palette": [
        "#eee8d8",
        "#151515",
        "#d93929",
        "#e4ba2b",
        "#2458a5"
      ],
      "type": "Arial / Microsoft YaHei；紧凑大字64–120px，功能文字15–18px",
      "layout": "非对称二分构成、跨栏文字与图形；后续为材料长条",
      "motion": "构成预设220ms过渡；reduced-motion关闭过渡"
    },
    "sources": [
      {
        "title": "Bauhaus Dessau — 官方首页",
        "url": "https://bauhaus-dessau.de/en/welcome/",
        "type": "实例",
        "note": "2026-10-07阅读：展览信息结合图形、日期、场所、票务与无障碍入口；不冒称本demo复刻官网。"
      },
      {
        "title": "Bauhaus Kooperation — Kandinsky 的基础课程",
        "url": "https://bauhauskooperation.de/wissen/das-bauhaus/lehre/unterricht/unterricht-wassily-kandinsky",
        "type": "理论",
        "note": "档案说明颜色与形状课程、分析性绘画和形色对应的争议；用于基础构成的理论边界。"
      },
      {
        "title": "IBM Carbon — 2x Grid",
        "url": "https://www.carbondesignsystem.com/building-blocks/foundations/2x-grid/overview",
        "type": "规范",
        "note": "用关键对齐线与响应式重排保证页面可读；这一当代实现方法不是包豪斯的历史专属规则。"
      }
    ],
    "prompt": "可替换内容：产品/品牌【名称】；受众【用户】；核心价值【卖点与证据】；主行动【希望用户完成的动作】。以下为风格示范任务，可替换具体品牌与内容，保留设计约束。\n\n为虚构品牌 [品牌] 的设计工坊制作包豪斯基础形色课程启发的网页。聚焦几何关系和实际制作，背景温暖纸色，以红、黄、蓝、炭黑为有限色板。首屏采用非对称文字/构成两区，大标题保持正常可读；右侧原创SVG包含圆、三角、矩形、线条。提供三组明确的构成预设、原生range旋转控件、实时角度文字以及下载当前SVG的导出动作。后续至少两节分别介绍材料课程与制作方法，以横向条目/details组织，避免圆角卡片堆砌。手机图文纵向重排，键盘可操作，尊重reduced-motion。明确这是Bauhaus形色课程的局部现代迁移，不能把Kandinsky的形色对应宣称为科学定律，也不要复制任何馆藏练习。\n\n要素协调要求：形色实验与排版共享比例关系；每个色块承担构成任务，不能把原色和几何物随机铺满。",
    "negativePrompt": "不要把红黄蓝随机撒满画面，不要声称包豪斯只包含圆三角方形，不要给文字加3D阴影或霓虹，不要让几何覆盖按钮；不要只换颜色却不改变构成。",
    "demo": "demos/cases/bauhaus-geometry/index.html",
    "preview": "previews/cases/bauhaus-geometry.jpg",
    "theoryVerifiedAt": "2026-10-07",
    "research": "docs/cases/bauhaus-geometry.md",
    "exercise": "加入第二组不使用原色的材料色板，检验相同几何关系是否仍能表达平衡与张力。",
    "composition": {
      "color": "红、蓝、黄色块以面积与位置建立张力，黑色文字保持稳定。",
      "typography": "Arial / Microsoft YaHei；紧凑大字64–120px，功能文字15–18px",
      "layout": "非对称二分构成、跨栏文字与图形；后续为材料长条",
      "imagery": "可操作几何画布让“构成实验”成为具体内容。",
      "shape": "圆环、方块和三角通过位置、比例及旋转表达不同构成。",
      "hierarchy": "形与功能主张 → 可操作构成 → 材料课程 → 制作理念。",
      "motion": "构成预设220ms过渡；reduced-motion关闭过渡",
      "coherence": "形色实验与排版共享比例关系；每个色块承担构成任务，不能把原色和几何物随机铺满。"
    },
    "themeBehavior": {
      "mode": "fixed",
      "default": "light",
      "control": "此构成练习保留指定风格配色；实验室可另行比较系统／手动深浅主题。",
      "designReason": "风格不是一组可直接反转的颜色；改变主题时需重新配对文字、表面、强调与边框，保留图像原色。"
    },
    "soundBehavior": {
      "kind": "none",
      "control": "本练习无背景音乐。",
      "interactionRole": "不按风格标签臆造音乐；若引入声音，应有真实来源、主动启用、停止控制与明确的交互作用。"
    }
  },
  {
    "id": "retro-80s",
    "order": 13,
    "title": "80年代：合成器面板",
    "subtitle": "Arturia Jup-8 V / Jupiter-8 → 手感与信号流程",
    "category": "经典风格",
    "tags": [
      "80年代",
      "复古",
      "合成器",
      "拟物",
      "音频",
      "设备面板"
    ],
    "summary": "限定为1980年代模拟合成器设备的现代复古方向：哑光深色机身、功能分区、彩色标识、读数屏和直接操作。不是对整个80年代视觉文化的概括。",
    "accent": "#f18a4b",
    "background": "#182329",
    "principles": [
      "先组织信号流程与演奏任务，再设计面板质感。",
      "物理控件的空间邻近关系解释功能，参数分区保持可见。",
      "有限橙/青/米白作功能编码，复古感来自设备逻辑而非满屏霓虹。",
      "预设降低初次使用成本，具体参数允许进一步探索。"
    ],
    "productFocus": "虚构 Nightshift 合成器以可演奏的单振荡器 Web Audio demo证明交互价值：选预设、调整滤波/包络/音量、用屏幕琴键或键盘演奏。",
    "interaction": [
      "只有主动开启声音后才初始化Web Audio；可随时关闭。",
      "三种预设确实改变波形、滤波与包络参数。",
      "原生范围输入即时改变Cutoff、Attack、Output并更新读数。",
      "屏幕琴键为可聚焦按钮；A S D F G H J K 可演奏白键，切出页面时停止声音。"
    ],
    "theme": "炭灰/海军灰哑光面板、暖白标签、橙色分区线、低亮度青色波形显示；虚构夜间音乐工作室。",
    "constraints": [
      "仅聚焦1981 Jupiter-8启发的合成器面板，不将其代表整个80年代。",
      "官方2014手册描述的是旧版Arturia界面；用于历史面板结构证据，不冒称当前软件全部细节。",
      "demo 是单振荡器简化合成器，不能宣称精确模拟Jupiter-8音色或8复音。",
      "读数、滑块、预设都有文本标签，不只用颜色表达状态。",
      "声音默认关闭；无自动播放、原歌曲或外部音频素材。",
      "窄屏分区纵向重排；控件点击区至少44px，动态波形尊重reduced-motion。"
    ],
    "useCases": [
      "音频工具",
      "乐器宣传",
      "可试玩产品",
      "音乐工作室",
      "复古设备展示"
    ],
    "avoid": [
      "用霓虹地平线解释所有80年代",
      "不可操作的假旋钮",
      "过亮扫描线遮盖文字",
      "未经操作自动播放声音"
    ],
    "tokens": {
      "palette": [
        "#182329",
        "#303c42",
        "#ede7d3",
        "#f18a4b",
        "#78bca8"
      ],
      "type": "Arial标题、Courier New参数读数；标题72–100px，标签12–14px",
      "layout": "硬件面板横向分区、预设/显示/参数/琴键；手机纵向排列",
      "motion": "按键激活与读数同步；低动态偏好保持静态波形，声音仍由用户控制"
    },
    "sources": [
      {
        "title": "Arturia — Jup-8 V 官方产品页",
        "url": "https://www.arturia.com/products/software-instruments/jup-8-v/overview",
        "type": "实例",
        "note": "2026-10-07阅读：以乐器声音、原始设备传承、直接控件和现代预设突出产品；页面说明原乐器1981年推出。"
      },
      {
        "title": "Arturia Jupiter-8V 官方手册（2014年版）",
        "url": "https://downloads.arturia.com/products/jupiter8-v/manual/Jupiter-8V_Manual_2_6_0_EN.pdf",
        "type": "规范",
        "note": "第59–60页（PDF索引58–59）说明原始界面/预设/扩展/效果分区及振荡器；本例据此组织简化信号流程。"
      },
      {
        "title": "MDN — Web Audio API",
        "url": "https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API",
        "type": "规范",
        "note": "浏览器音频节点图与参数实现依据； demo 通过用户操作初始化AudioContext。"
      }
    ],
    "prompt": "可替换内容：产品/品牌【名称】；受众【用户】；核心价值【卖点与证据】；主行动【希望用户完成的动作】。以下为风格示范任务，可替换具体品牌与内容，保留设计约束。\n\n为虚构音频品牌 [品牌] 制作1980年代模拟合成器设备启发的可试玩宣传页。参考Arturia Jup-8 V的实体面板逻辑，采用哑光海军灰/炭灰、暖白标字、橙色分区、青色低亮读数。首屏让真实可操作面板成为主角：预设列表、波形显示、带数值标签的Cutoff/Attack/Output原生滑块、可聚焦琴键。实现原创单振荡器Web Audio，三个预设改变波形和参数；默认静音，主动开启后才演奏，可关闭。提供A–K白键键盘演奏，失焦停止声音。后续至少两节说明信号流程与预设用途，采用设备手册式排版。手机面板分区纵向重排、每控件至少44px、避免只有颜色的状态、尊重reduced-motion。不复制商标、音色或音乐，不声称模拟Jupiter-8全部电路，也不以霓虹网格代表所有80年代。\n\n要素协调要求：等宽标签、功能分区、彩色标识和直接反馈构成同一种设备语言；装饰必须对应可操作控制。",
    "negativePrompt": "不要假旋钮、无效播放按钮、自动音频、版权曲目、巨量霓虹、反复闪烁扫描线；不要宣称8复音或精确模拟不存在的功能。",
    "demo": "demos/cases/retro-80s/index.html",
    "preview": "previews/cases/retro-80s.jpg",
    "theoryVerifiedAt": "2026-10-07",
    "research": "docs/cases/retro-80s.md",
    "exercise": "增加一个真正可编辑的8步音序器；让步骤、速率与播放状态在视觉和声音上同步。",
    "composition": {
      "color": "暗青灰模拟设备面板，橙色标记预设与分区，绿色模拟读数屏。",
      "typography": "Arial标题、Courier New参数读数；标题72–100px，标签12–14px",
      "layout": "硬件面板横向分区、预设/显示/参数/琴键；手机纵向排列",
      "imagery": "原创合成器面板、波形屏与琴键解释真实信号流程。",
      "shape": "矩形功能模块、设备边缘与机械刻度形成硬件触感。",
      "hierarchy": "声音目标 → 面板操作 → 信号流程 → 预设解释。",
      "motion": "按键激活与读数同步；低动态偏好保持静态波形，声音仍由用户控制",
      "coherence": "等宽标签、功能分区、彩色标识和直接反馈构成同一种设备语言；装饰必须对应可操作控制。"
    },
    "themeBehavior": {
      "mode": "fixed",
      "default": "dark",
      "control": "此构成练习保留指定风格配色；实验室可另行比较系统／手动深浅主题。",
      "designReason": "风格不是一组可直接反转的颜色；改变主题时需重新配对文字、表面、强调与边框，保留图像原色。"
    },
    "soundBehavior": {
      "kind": "interactive",
      "control": "声音默认关闭；用户开启后可点击或键盘演奏，调节音量、滤波与包络，关闭会停止全部音符。",
      "interactionRole": "原创Web Audio短音符把合成器控件和波形变成可听的反馈；不是原设备的声学复刻，也不是背景音乐。"
    }
  },
  {
    "id": "pixel-world",
    "order": 14,
    "title": "像素：微型世界",
    "subtitle": "Celeste / PICO-8 / Saint11 → 地图驱动的探索页面",
    "category": "经典风格",
    "tags": [
      "像素",
      "游戏",
      "PICO-8",
      "地图",
      "探索",
      "有限色板"
    ],
    "summary": "以低分辨率、有限色板、清晰轮廓和可探索的场景建立主题。像素是有意识的图形结构，不是把照片缩小模糊后再放大。",
    "accent": "#ffccaa",
    "background": "#1d2b53",
    "principles": [
      "先定义像素尺度与色板，再绘制地形、物件和角色。",
      "轮廓、明暗与空间关系在小画布内必须可辨认。",
      "世界场景承担导航，常规文字承担说明，控制复杂度。",
      "探索操作、角色位置和地点信息保持一致，避免只有装饰的地图。"
    ],
    "productFocus": "虚构 Tiny Tides 岛屿用原创128×128地图介绍四个地点；点击地点或移动角色时更新场景信息，发现进度和旅行手账可保存。",
    "interaction": [
      "地点按钮移动角色并更新当前地点介绍。",
      "地图聚焦后用方向键/WASD移动；手机可用方向按钮。",
      "靠近地点会记录发现进度，按钮状态不只通过颜色表达。",
      "手账仅保存当前浏览器，支持清除并重新探索。"
    ],
    "theme": "深蓝海面、温暖沙滩、块状树林、小灯塔；像素图形与清晰中文旅行记录结合的轻探索体验。",
    "constraints": [
      "PICO-8的128×128/16色是这个实例的明确创作约束，不是所有像素艺术的定义。",
      "本地图使用16色原生PICO-8色板和整数像素绘制；桌面用整数倍率，窄屏优先完整显示。",
      "Canvas放大使用image-rendering:pixelated；禁止图片模糊插值。",
      "关键地点有可聚焦DOM按钮与文本说明，不只隐藏在Canvas里。",
      "长文使用可读系统字体，不能把业务信息全部压成像素小字。",
      "无角色原作素材、复杂游戏引擎或音频自动播放；降低动态偏好时取消非必要动画。"
    ],
    "useCases": [
      "独立游戏宣传",
      "互动作品集",
      "小型IP世界介绍",
      "趣味导航",
      "探索式知识页面"
    ],
    "avoid": [
      "模糊或混合不一致像素尺度",
      "只有Canvas且无键盘/文本入口",
      "把PICO-8限制推广为所有像素艺术的规则"
    ],
    "tokens": {
      "palette": [
        "#1d2b53",
        "#29adff",
        "#008751",
        "#00e436",
        "#ffccaa",
        "#fff1e8",
        "#ffa300",
        "#5f574f"
      ],
      "type": "Courier New用于英文界面；中文Microsoft YaHei，正文15–17px",
      "layout": "地图主区域 + 旅行记录侧栏；手机地图上、记录下；后续地点索引与玩法说明",
      "motion": "移动以tile步进、静态地图；reduced-motion保留即时状态更新"
    },
    "sources": [
      {
        "title": "Celeste 官方网站",
        "url": "https://www.celestegame.com/",
        "type": "实例",
        "note": "2026-10-07阅读：围绕登山旅程、游戏预告和平台入口建立明确世界与产品行动；不复制其角色或场景。"
      },
      {
        "title": "PICO-8 Fantasy Console — Lexaloffle",
        "url": "https://www.lexaloffle.com/pico-8.php",
        "type": "实例",
        "note": "官网规定128×128显示、16色、8×8精灵等约束，并说明有限设计的表达价值。"
      },
      {
        "title": "PICO-8 官方手册",
        "url": "https://www.lexaloffle.com/dl/docs/pico-8_manual.html",
        "type": "规范",
        "note": "使用其明确的整数像素/16色色板/8×8 tile模型作为本demo局部创作约束。"
      },
      {
        "title": "Saint11 — Pixel Art Tutorials",
        "url": "https://saint11.art/blog/pixel-art-tutorials/",
        "type": "理论",
        "note": "Celeste官网列出的像素美术师Pedro Medeiros的公开教程，为轮廓、有限色彩和逐像素思考提供实践参考。"
      },
      {
        "title": "MDN — image-rendering",
        "url": "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/image-rendering",
        "type": "规范",
        "note": "说明pixelated/crisp-edges的缩放行为；本例Canvas使用pixelated保留边缘。"
      }
    ],
    "prompt": "可替换内容：产品/品牌【名称】；受众【用户】；核心价值【卖点与证据】；主行动【希望用户完成的动作】。以下为风格示范任务，可替换具体品牌与内容，保留设计约束。\n\n为虚构小型IP [品牌] 制作地图驱动的像素风介绍页。参考PICO-8的128×128、16色、8×8tile创作约束，自绘一个可辨认轮廓的岛屿世界；禁止复制Celeste或其他游戏角色/背景。使用Canvas整数像素绘制并用image-rendering:pixelated放大，桌面尽量整数倍率，手机完整显示地图。首屏地图为主，旅行手账为辅：四个可聚焦DOM地点按钮、实时地点说明、角色位置与发现计数，方向键/WASD仅在地图聚焦时生效，手机提供四向按钮。探索记录可存当前浏览器并可清除。后续至少两節为地点索引与玩法说明；中文正文使用正常可读系统字体，英文元数据可用等宽字。没有自动音频、闪烁扫描线或滚动劫持，尊重reduced-motion。注明这是PICO-8约束的局部迁移，而不是所有像素艺术的定义。\n\n要素协调要求：低分辨率地景、有限调色与清楚状态共同形成游戏感；中文说明保留正常可读字体，不强行像素化。",
    "negativePrompt": "不要平滑缩放像素图、随机混合像素尺度、把照片马赛克当作像素美术、隐藏于Canvas的唯一导航、不可读中文小字或自动播放音效。",
    "demo": "demos/cases/pixel-world/index.html",
    "preview": "previews/cases/pixel-world.jpg",
    "theoryVerifiedAt": "2026-10-07",
    "research": "docs/cases/pixel-world.md",
    "exercise": "为岛屿添加一个夜间色板，在不增加第17种颜色的前提下保持地标与路径可辨认。",
    "composition": {
      "color": "有限16色调色板，以土色、草绿和水蓝区分离散地图区域。",
      "typography": "Courier New用于英文界面；中文Microsoft YaHei，正文15–17px",
      "layout": "地图主区域 + 旅行记录侧栏；手机地图上、记录下；后续地点索引与玩法说明",
      "imagery": "128×128原生Canvas与原创像素地点构成可探索世界。",
      "shape": "离散方格、阶梯边缘与像素按钮保持同一尺度体系。",
      "hierarchy": "世界地图 → 地点索引 → 步进操作 → 探索手账。",
      "motion": "移动以tile步进、静态地图；reduced-motion保留即时状态更新",
      "coherence": "低分辨率地景、有限调色与清楚状态共同形成游戏感；中文说明保留正常可读字体，不强行像素化。"
    },
    "themeBehavior": {
      "mode": "fixed",
      "default": "dark",
      "control": "此构成练习保留指定风格配色；实验室可另行比较系统／手动深浅主题。",
      "designReason": "风格不是一组可直接反转的颜色；改变主题时需重新配对文字、表面、强调与边框，保留图像原色。"
    },
    "soundBehavior": {
      "kind": "none",
      "control": "本练习无背景音乐。",
      "interactionRole": "不按风格标签臆造音乐；若引入声音，应有真实来源、主动启用、停止控制与明确的交互作用。"
    }
  },
  {
    "id": "chatgpt-platform",
    "order": 15,
    "title": "ChatGPT — 巨字、飞入拼贴与滚动交接",
    "subtitle": "Chat, work and code in one place",
    "category": "产品",
    "country": "美国",
    "tags": [
      "ChatGPT",
      "OpenAI",
      "真实品牌",
      "中文巨字",
      "悬停切换",
      "独立图层",
      "滚动交接"
    ],
    "summary": "可操作的中文标题、分模式周边拼贴，以及同一产品窗口从居中舞台移向右侧、让出左侧说明的联动。",
    "accent": "#00a6d3",
    "background": "#ffffff",
    "principles": [
      "可操作的中文标题、分模式周边拼贴，以及同一产品窗口从居中舞台移向右侧、让出左侧说明的联动。",
      "配色、文字密度、边框与选中状态共同表达本页面的产品语气。",
      "动作有明确触发与状态关系，采用同一源 URL 的当前页面，近似和未验证状态分别说明。",
      "第一方素材保持比例；手机保留原站实际变体。"
    ],
    "productFocus": "围绕Chat、Work、Codex三合一展开：日常对话、可交付工作成果、代码改动评审。",
    "interaction": [
      "首屏悬停/聚焦/点击“聊天、工作、编程” → 当前中文逐字换强调色，中央图垂直退出/进入，20 个官方周边素材按模式替换 → 用动作表达三种用途；在首屏标题体验。",
      "选择工作 → 工作的独立素材从四周进入，原模式素材离开；快速切换清理旧离场层 → 保持一套可读场景；移到“工作”再快速移到“编程”。",
      "向下/向上滚动 → 周边素材随滚动带入/收束，随后淡出；同一窗口保持 sticky，越过交接阈值再向右下移动 → 从吸引注意过渡到解释产品；在首屏下面往返滚动。",
      "桌面左侧 rail 出现后，滚动三段哨兵或点击/方向键 → 说明高度、标题缩放、窗口模式及进度对应更新；顶部标题模式和下段模式彼此独立。",
      "手机使用三卡原生横向滚动，标题选择定位相应卡片；桌面 sticky rail 不出现在手机。导航保持桌面即时开关和手机全屏分层列表。",
      "用途架子保留原生横滑及左右按钮；后续价格、安全、结束行动与页尾为普通滚动。"
    ],
    "theme": "跟随 prefers-color-scheme；页面没有全局手动主题按钮，桌面产品界面随系统换深浅，手机保持原站的浅色界面图。",
    "constraints": [
      "保留当前来源的触发→响应→目的，不用通用淡入代替定义性交互。",
      "720ms 主窗口过渡、340px 交接阈值、周边层的轨迹/交错及 6500ms 自动周期为本地拟合；中央产品图是官方截图，不是可登录、对话、编辑的完整产品。没有复制账户、付费和下载服务，原站三个静态故事卡未移植。暂停控制停止自动轮换和周边运动，正常滚动仍可阅读。",
      "品牌与官方素材仅用于此个人参考库；归档来源与权利。",
      "减少动态保留可读内容、键盘焦点和手动选择。"
    ],
    "useCases": [
      "多能力AI产品介绍",
      "功能转向的品牌叙事",
      "中文字体与超大排版研究"
    ],
    "avoid": [
      "把ChatGPT首页想象为一张聊天输入框",
      "随意改造OpenAI结标",
      "所有功能只用渐变blob表现",
      "只点按钮换图而忽略周围元素飞入飞出",
      "给所有网站套同一种滚动淡入动画"
    ],
    "tokens": {
      "palette": [
        "#070707",
        "#ffffff",
        "#f5f5f5",
        "#c4a4f2",
        "#00a6d3"
      ],
      "type": "官方 OpenAI Sans SC 4个Unicode分片及英文字体；中文主标题89px、5行、紧行距。",
      "layout": "64px导航；居中5行巨字；全宽多层拼贴；2000px+100svh滚动段内中央窗口交接至左说明/右界面；七用途横向卡片架。",
      "motion": "公开图层720ms cubic-bezier(.22,1,.36,1)，36/42/48px视差与500/1000/1500分段参考。本地退出500ms、交叉淡化500ms及连续滚动插值；不劫持滚轮。"
    },
    "composition": {
      "color": "跟随 prefers-color-scheme；页面没有全局手动主题按钮，桌面产品界面随系统换深浅，手机保持原站的浅色界面图。",
      "typography": "官方 OpenAI Sans SC 4个Unicode分片及英文字体；中文主标题89px、5行、紧行距。",
      "layout": "首屏标题和拼贴 → 约 2000px+视口的居中/交接/说明长段 → 用途横向架子 → 价格 → 安全 → 结束行动 → 页尾；上下方向可逆。手机改为原生三模式横向卡片，再顺序浏览相同后续内容。",
      "imagery": "可操作的中文标题、分模式周边拼贴，以及同一产品窗口从居中舞台移向右侧、让出左侧说明的联动。",
      "shape": "圆胶囊按钮、黑色环与直线渐变下划线、圆角界面图。",
      "hierarchy": "可操作的中文标题、分模式周边拼贴，以及同一产品窗口从居中舞台移向右侧、让出左侧说明的联动。",
      "motion": "首屏悬停/聚焦/点击“聊天、工作、编程” → 当前中文逐字换强调色，中央图垂直退出/进入，20 个官方周边素材按模式替换 → 用动作表达三种用途；在首屏标题体验。；选择工作 → 工作的独立素材从四周进入，原模式素材离开；快速切换清理旧离场层 → 保持一套可读场景；移到“工作”再快速移到“编程”。；向下/向上滚动 → 周边素材随滚动带入/收束，随后淡出；同一窗口保持 sticky，越过交接阈值再向右下移动 → 从吸引注意过渡到解释产品；在首屏下面往返滚动。；桌面左侧 rail 出现后，滚动三段哨兵或点击/方向键 → 说明高度、标题缩放、窗口模式及进度对应更新；顶部标题模式和下段模式彼此独立。",
      "coherence": "720ms 主窗口过渡、340px 交接阈值、周边层的轨迹/交错及 6500ms 自动周期为本地拟合；中央产品图是官方截图，不是可登录、对话、编辑的完整产品。没有复制账户、付费和下载服务，原站三个静态故事卡未移植。暂停控制停止自动轮换和周边运动，正常滚动仍可阅读。",
      "scroll": "首屏标题和拼贴 → 约 2000px+视口的居中/交接/说明长段 → 用途横向架子 → 价格 → 安全 → 结束行动 → 页尾；上下方向可逆。手机改为原生三模式横向卡片，再顺序浏览相同后续内容。"
    },
    "sources": [
      {
        "title": "ChatGPT 当前公开页面",
        "url": "https://chatgpt.com/zh-Hans-CN/overview/",
        "note": "采集日期 2026-10-07；简体中文公开介绍页",
        "type": "实例"
      },
      {
        "title": "OpenAI Design Guidelines",
        "url": "https://openai.com/brand/",
        "type": "规范",
        "note": "字标比例、留白和OpenAI Sans的几何与人文品牌语气。"
      },
      {
        "title": "WAI Accordion Pattern",
        "url": "https://www.w3.org/WAI/ARIA/apg/patterns/accordion/",
        "type": "规范",
        "note": "左侧说明的展开状态和原生button语义；方向键及Home/End为本地增强。"
      }
    ],
    "prompt": "以 https://chatgpt.com/zh-Hans-CN/overview/ 在【采集日期】的 简体中文公开介绍页 为单一依据，先观察初始入场、所有章节至页尾再返回、真实指针与手机操作。保留 64px 导航、五行中文标题、每个中文字符各自的当前模式强调色与原始字标/字体。20 个官方独立素材按模式使用不同坐标、比例、层级和手机几何；进场与离场分开，快速选择不堆积离场层。主窗口以垂直卡片切换；悬停选择释放后保留模式。长段必须连续保留首屏拼贴、滚动带入、拼贴收束、同一 sticky 窗口阈值触发向右下移动、左侧 rail 出现，以及三段说明/图像/进度同步；顶层模式与 rail 状态独立。手机使用原生横向三卡，不强塞桌面长段。按系统主题切换桌面真实界面图片；原站没有配乐。减少动态时停止自动运动并保留所有内容。用于【目标产品】时重新观察其真实操作与资产，不把本案例的拟合数值当作其他产品通用公式。",
    "negativePrompt": "不要凭空重画品牌摄影；不要给全部页面套同一种淡入、圆角或整屏切幕；不要捏造原站音乐、全局主题、账户和远程执行；不要把未验证状态写成通过。",
    "demo": "demos/cases/chatgpt-platform/index.html",
    "preview": "previews/cases/chatgpt-platform.jpg",
    "research": "docs/cases/chatgpt-platform.md",
    "exercise": "以同一来源截图为基准，改变一个局部信息层级并记录对比：标题/图片比例、主按钮或状态反馈。保持品牌素材比例和移动端可读性。",
    "referenceUrl": "https://chatgpt.com/zh-Hans-CN/overview/",
    "implementation": "reference-study",
    "fidelity": "demos/cases/chatgpt-platform/fidelity.md",
    "assetManifest": "demos/cases/chatgpt-platform/assets-manifest.json",
    "referencePreview": "previews/cases/chatgpt-platform-reference.jpg",
    "capturedAt": "2026-10-07",
    "themeBehavior": {
      "mode": "system",
      "default": "system",
      "control": "跟随 prefers-color-scheme；页面没有全局手动主题按钮，桌面产品界面随系统换深浅，手机保持原站的浅色界面图。",
      "designReason": "可操作的中文标题、分模式周边拼贴，以及同一产品窗口从居中舞台移向右侧、让出左侧说明的联动。"
    },
    "soundBehavior": {
      "kind": "none",
      "control": "此介绍页没有背景音乐、音频或影片。",
      "interactionRole": "利用运动和空间关系串联能力，声音不是此页叙事的一部分。"
    }
  },
  {
    "id": "claude-platform",
    "order": 16,
    "title": "Claude — 衬线语气与 Cowork 演示",
    "subtitle": "Think fast, build faster",
    "category": "产品",
    "country": "美国",
    "tags": [
      "Claude",
      "Anthropic",
      "真实品牌",
      "衬线",
      "视频",
      "套餐切换"
    ],
    "summary": "以衬线主张、圆角入口和安静的工作视频表达效率；菜单、标题、FAQ 使用公共源可核对的具体机制。",
    "accent": "#d97757",
    "background": "#f5f5ef",
    "principles": [
      "以衬线主张、圆角入口和安静的工作视频表达效率；菜单、标题、FAQ 使用公共源可核对的具体机制。",
      "配色、文字密度、边框与选中状态共同表达本页面的产品语气。",
      "动作有明确触发与状态关系，采用同一源 URL 的当前页面，近似和未验证状态分别说明。",
      "第一方素材保持比例；手机布局依据公共模块实现，并在本地实测。"
    ],
    "productFocus": "首屏把chat思考与Cowork执行并列，右栏完整真实产品视频直接显示功能；下方套餐按个体和组织区分。",
    "interaction": [
      "标题按单词 1s opacity 过渡，总交错跨度 .2s；内容组 750ms、10px、100ms 交错，在视口底部 −20% 触发 → 以较小运动保留阅读节奏。",
      "桌面菜单 pointer enter 展开，pointer leave 150ms 延迟关闭，其他导航降低强调；手机菜单 800ms 顶到下 clip 进入、400ms 退出，项目 320ms 起每项80ms交错。",
      "Individual/Team and Enterprise → 移动选中底板，替换三/两张套餐卡；没有添加原页面没有的年/月账期控件。",
      "FAQ → 只开一项，grid 0fr→1fr 与 opacity 400ms，图标同步；连续选项关闭前项，避免文本突然跳变。",
      "Continue with email → 对应原站邮箱登录 URL，不捏造首页内的邮箱注册表单；本地入口需离开演示到原站。视频和减少动态使用真实暂停状态。"
    ],
    "theme": "公共 CSS root 根据 prefers-color-scheme 使用奶油浅色/近黑深色；首页没有核实到手动全局按钮。官方 Cowork 视频自身保持素材配色。",
    "constraints": [
      "保留当前来源的触发→响应→目的，不用通用淡入代替定义性交互。",
      "源菜单与滚动机制属于公共源码依据的实现，本地桌面/390 手机实测；并未完成源浏览器的逐节操作。菜单条目和 FAQ/套餐内容压缩，局部曲线/布局拟合。没有认证、订阅、SSO 与下载后端，未核实全局手动主题按钮；不要添加无来源的标题飞入或缩放。",
      "品牌与官方素材仅用于此个人参考库；归档来源与权利。",
      "减少动态保留可读内容、键盘焦点和手动选择。"
    ],
    "useCases": [
      "思考与执行并重的AI产品",
      "人文语气软件营销",
      "首屏转化与真实演示组合"
    ],
    "avoid": [
      "衬线标题配泛用霓虹blob",
      "把第三方传闻当官网设计理论",
      "模拟Google认证或真实支付"
    ],
    "tokens": {
      "palette": [
        "#f5f5ef",
        "#141413",
        "#d97757",
        "#faf9f5",
        "#8c8c80"
      ],
      "type": "本地官网Anthropic Serif/Sans；72px主标题、24px副文、15–17px操作。",
      "layout": "1440px上限；左思考/注册卡 + 右大型Cowork视频；3列套餐；左右FAQ。",
      "motion": "25.567秒官方Cowork视频静音循环；play/pause/ended事件同步按钮；减少动态默认暂停并允许手动播放。"
    },
    "composition": {
      "color": "公共 CSS root 根据 prefers-color-scheme 使用奶油浅色/近黑深色；首页没有核实到手动全局按钮。官方 Cowork 视频自身保持素材配色。",
      "typography": "本地官网Anthropic Serif/Sans；72px主标题、24px副文、15–17px操作。",
      "layout": "Think fast 主张/入口+Cowork 视频 → 套餐切换 → FAQ → 页尾；完整结构来自匿名 HTTP HTML 与当前公开模块。",
      "imagery": "以衬线主张、圆角入口和安静的工作视频表达效率；菜单、标题、FAQ 使用公共源可核对的具体机制。",
      "shape": "30px注册框、17px视频、圆胶囊tabs、18px计划卡。",
      "hierarchy": "以衬线主张、圆角入口和安静的工作视频表达效率；菜单、标题、FAQ 使用公共源可核对的具体机制。",
      "motion": "标题按单词 1s opacity 过渡，总交错跨度 .2s；内容组 750ms、10px、100ms 交错，在视口底部 −20% 触发 → 以较小运动保留阅读节奏。；桌面菜单 pointer enter 展开，pointer leave 150ms 延迟关闭，其他导航降低强调；手机菜单 800ms 顶到下 clip 进入、400ms 退出，项目 320ms 起每项80ms交错。；Individual/Team and Enterprise → 移动选中底板，替换三/两张套餐卡；没有添加原页面没有的年/月账期控件。；FAQ → 只开一项，grid 0fr→1fr 与 opacity 400ms，图标同步；连续选项关闭前项，避免文本突然跳变。",
      "coherence": "源菜单与滚动机制属于公共源码依据的实现，本地桌面/390 手机实测；并未完成源浏览器的逐节操作。菜单条目和 FAQ/套餐内容压缩，局部曲线/布局拟合。没有认证、订阅、SSO 与下载后端，未核实全局手动主题按钮；不要添加无来源的标题飞入或缩放。",
      "scroll": "Think fast 主张/入口+Cowork 视频 → 套餐切换 → FAQ → 页尾；完整结构来自匿名 HTTP HTML 与当前公开模块。"
    },
    "sources": [
      {
        "title": "Claude 当前公开页面",
        "url": "https://claude.com/",
        "note": "采集日期 2026-10-07；匿名英文营销页 HTTP/公共模块快照",
        "type": "实例"
      },
      {
        "title": "WAI Tabs Pattern",
        "url": "https://www.w3.org/WAI/ARIA/apg/patterns/tabs/",
        "type": "规范",
        "note": "套餐受众切换的选择态和方向键参考。"
      },
      {
        "title": "WAI Accordion Pattern",
        "url": "https://www.w3.org/WAI/ARIA/apg/patterns/accordion/",
        "type": "规范",
        "note": "FAQ展开、键盘和状态表达；本地采用原生details。"
      }
    ],
    "prompt": "以 https://claude.com/ 在【采集日期】的 匿名英文营销页 HTTP/公共模块快照 为单一依据，先观察初始入场、所有章节至页尾再返回、真实指针与手机操作。以当前 claude.com 匿名 HTML/公共 CSS/JS 快照为结构依据，源浏览器若重定向账户明确记未验证。保留 Serif 主张、Sans 控件、奶油/系统深色及官方静音 Cowork 视频。具体机制：单词 1s 透明度、总 .2s 交错；组 750ms/10px/100ms 在 −20% 视口边界带入；桌面 pointer 菜单+150ms 离开；手机 clip 800ms 进入/400ms 离开与320+80i交错；套餐选中底板；FAQ 单开与400ms网格高度/透明度。邮箱动作跳到源 URL，不造首页表单或账期切换。减少动态取消动画保留内容。用于【目标产品】时重新观察其真实操作与资产，不把本案例的拟合数值当作其他产品通用公式。",
    "negativePrompt": "不要凭空重画品牌摄影；不要给全部页面套同一种淡入、圆角或整屏切幕；不要捏造原站音乐、全局主题、账户和远程执行；不要把未验证状态写成通过。",
    "demo": "demos/cases/claude-platform/index.html",
    "preview": "previews/cases/claude-platform.jpg",
    "research": "docs/cases/claude-platform.md",
    "exercise": "以同一来源截图为基准，改变一个局部信息层级并记录对比：标题/图片比例、主按钮或状态反馈。保持品牌素材比例和移动端可读性。",
    "referenceUrl": "https://claude.com/",
    "implementation": "reference-study",
    "fidelity": "demos/cases/claude-platform/fidelity.md",
    "assetManifest": "demos/cases/claude-platform/assets-manifest.json",
    "referencePreview": "previews/cases/claude-platform-reference.jpg",
    "capturedAt": "2026-10-07",
    "themeBehavior": {
      "mode": "system",
      "default": "system",
      "control": "公共 CSS root 根据 prefers-color-scheme 使用奶油浅色/近黑深色；首页没有核实到手动全局按钮。官方 Cowork 视频自身保持素材配色。",
      "designReason": "以衬线主张、圆角入口和安静的工作视频表达效率；菜单、标题、FAQ 使用公共源可核对的具体机制。"
    },
    "soundBehavior": {
      "kind": "video",
      "control": "官方 Cowork 演示静音循环，暂停/播放依据媒体真实事件；未发现首页背景音乐。",
      "interactionRole": "静音工作场景与低幅文字动画维持克制、可阅读的产品语气。"
    }
  },
  {
    "id": "qoder-platform",
    "order": 17,
    "title": "Qoder — 绿色工作台与多形态平台",
    "subtitle": "An agentic platform for everyone",
    "category": "产品",
    "country": "中国",
    "tags": [
      "Qoder",
      "真实品牌",
      "绿色",
      "智能体",
      "桌面工作台",
      "多平台"
    ],
    "summary": "全新 Qoder 双行标题与大幅智能体工作台，五平台轮播和集成/Wake/企业章节串联从工具到交付的逻辑。",
    "accent": "#2c8061",
    "background": "#ffffff",
    "principles": [
      "全新 Qoder 双行标题与大幅智能体工作台，五平台轮播和集成/Wake/企业章节串联从工具到交付的逻辑。",
      "配色、文字密度、边框与选中状态共同表达本页面的产品语气。",
      "动作有明确触发与状态关系，采用同一源 URL 的当前页面，近似和未验证状态分别说明。",
      "第一方素材保持比例；手机保留原站实际变体。"
    ],
    "productFocus": "先展示桌面工作台的任务、项目和上下文，再让用户选择五种使用形态，突出从想法到可交付成果的完整工作循环。",
    "interaction": [
      "工作台使用公开固定任务示例，点击本地“新任务”可返回输入；本地输入/Enter/发送进入固定会话而非调用模型，九个阶段按 180/480/760/1000/1200/1400/1600/1900/2250ms 展开；交付文件开关显示旁栏。",
      "活跃热图 pointer enter/focus 120ms 显示日期/对话提示，leave/blur 80ms 关闭 → 很小的元素也有可读状态。",
      "五平台 tab/点控/触摸 → 400ms 水平进退，20s 自动，悬停/手动暂停、后台停止；快速选择只保留一个场景。",
      "后续 SDK 代码和 Cloud 任务列表 → Wake 场景选择/指针强调 → 企业 → 两侧连续证言条带 → 单开 FAQ → 页尾；所有章节使用正常滚动。",
      "手机保留工作台整体缩放裁切与五平台原生横向选项，不删除首屏示例的侧栏结构。菜单、下载说明、Escape/方向键保持可操作。"
    ],
    "theme": "当前首页固定灰绿/白色及绿色工作台场景，未发现全局系统或手动主题切换。工作台局部代码颜色不改页面主题。",
    "constraints": [
      "保留当前来源的触发→响应→目的，不用通用淡入代替定义性交互。",
      "工作台内容、图标、热图日期分布与空间几何为缩短的本地结构，并非完整原工作台；九阶段来源时间保留，其他曲线/几何是拟合。SDK/Cloud 文本示例不执行；Wake/企业/证言内容缩短，不称真实评价逐字复制。发送仅本地状态，原网页发送未验证；没有模型、账户、文件系统与远程交付服务。",
      "品牌与官方素材仅用于此个人参考库；归档来源与权利。",
      "减少动态保留可读内容、键盘焦点和手动选择。"
    ],
    "useCases": [
      "多形态开发平台",
      "智能体工作台",
      "IDE与CLI联合宣传"
    ],
    "avoid": [
      "把所有AI工具都做成深蓝霓虹页",
      "平台tabs只改颜色不换内容",
      "把本地演示装成在线模型执行"
    ],
    "tokens": {
      "palette": [
        "#ffffff",
        "#141414",
        "#2c8061",
        "#80c777",
        "#f3f6ed"
      ],
      "type": "原站Instrument Sans观察，当前本地使用Arial/Microsoft YaHei回退；中文标题36px、说明16px。",
      "layout": "66px导航；双行主张与绿色固定任务工作台、活跃热图；五平台之后接SDK/Cloud、Wake、企业、证言条带和FAQ。",
      "motion": "固定会话九节点按180–2250ms展开；热图提示120ms进入/80ms退出；五平台400ms水平切换、20秒自动推进与手动暂停。"
    },
    "composition": {
      "color": "当前首页固定灰绿/白色及绿色工作台场景，未发现全局系统或手动主题切换。工作台局部代码颜色不改页面主题。",
      "typography": "原站Instrument Sans观察，当前本地使用Arial/Microsoft YaHei回退；中文标题36px、说明16px。",
      "layout": "双行主张 → 公共固定工作台 → 五平台 → SDK/Cloud → Wake → 企业 → 证言条带 → FAQ → 页尾。以该网址在采集日期的页面为单一归档。",
      "imagery": "全新 Qoder 双行标题与大幅智能体工作台，五平台轮播和集成/Wake/企业章节串联从工具到交付的逻辑。",
      "shape": "25px下载胶囊、8px大面/窗口、细边框工作台。",
      "hierarchy": "全新 Qoder 双行标题与大幅智能体工作台，五平台轮播和集成/Wake/企业章节串联从工具到交付的逻辑。",
      "motion": "工作台使用公开固定任务示例，点击本地“新任务”可返回输入；本地输入/Enter/发送进入固定会话而非调用模型，九个阶段按 180/480/760/1000/1200/1400/1600/1900/2250ms 展开；交付文件开关显示旁栏。；活跃热图 pointer enter/focus 120ms 显示日期/对话提示，leave/blur 80ms 关闭 → 很小的元素也有可读状态。；五平台 tab/点控/触摸 → 400ms 水平进退，20s 自动，悬停/手动暂停、后台停止；快速选择只保留一个场景。；后续 SDK 代码和 Cloud 任务列表 → Wake 场景选择/指针强调 → 企业 → 两侧连续证言条带 → 单开 FAQ → 页尾；所有章节使用正常滚动。",
      "coherence": "工作台内容、图标、热图日期分布与空间几何为缩短的本地结构，并非完整原工作台；九阶段来源时间保留，其他曲线/几何是拟合。SDK/Cloud 文本示例不执行；Wake/企业/证言内容缩短，不称真实评价逐字复制。发送仅本地状态，原网页发送未验证；没有模型、账户、文件系统与远程交付服务。",
      "scroll": "双行主张 → 公共固定工作台 → 五平台 → SDK/Cloud → Wake → 企业 → 证言条带 → FAQ → 页尾。以该网址在采集日期的页面为单一归档。"
    },
    "sources": [
      {
        "title": "Qoder CN 当前公开页面",
        "url": "https://qoder.cn/",
        "note": "采集日期 2026-10-07；中国大陆简体中文首页",
        "type": "实例"
      },
      {
        "title": "Qoder 产品族官方定义",
        "url": "https://docs.qoder.com/product-series/what-is-qoder",
        "type": "理论",
        "note": "第一方文档定义理解、计划、执行、验证与迭代的产品循环及多形态职责。"
      },
      {
        "title": "WAI Tabs Pattern",
        "url": "https://www.w3.org/WAI/ARIA/apg/patterns/tabs/",
        "type": "规范",
        "note": "模式与平台选择的语义、选中状态和方向键参考。"
      }
    ],
    "prompt": "以 https://qoder.cn/ 在【采集日期】的 中国大陆简体中文首页 为单一依据，先观察初始入场、所有章节至页尾再返回、真实指针与手机操作。只用当前 qoder.cn 在采集日的公开首页，保留官方黑色字标、双行主张、绿色工作台与五平台。公共固定会话的九节点时间要保留；本地新任务/Enter/发送和文件旁栏作为明确固定示范，不能假称源端发送已验证。热图120ms进入/80ms离开，焦点与指针同等可读；五平台400ms水平、20s自动、悬停/手动/后台暂停。按 SDK/Cloud→Wake→企业→条带→FAQ顺序，用自然滚动，手机保留完整工作台缩放。固定浅色，无BGM；章节以采集页面为依据。用于【目标产品】时重新观察其真实操作与资产，不把本案例的拟合数值当作其他产品通用公式。",
    "negativePrompt": "不要凭空重画品牌摄影；不要给全部页面套同一种淡入、圆角或整屏切幕；不要捏造原站音乐、全局主题、账户和远程执行；不要把未验证状态写成通过。",
    "demo": "demos/cases/qoder-platform/index.html",
    "preview": "previews/cases/qoder-platform.jpg",
    "research": "docs/cases/qoder-platform.md",
    "exercise": "以同一来源截图为基准，改变一个局部信息层级并记录对比：标题/图片比例、主按钮或状态反馈。保持品牌素材比例和移动端可读性。",
    "referenceUrl": "https://qoder.cn/",
    "implementation": "reference-study",
    "fidelity": "demos/cases/qoder-platform/fidelity.md",
    "assetManifest": "demos/cases/qoder-platform/assets-manifest.json",
    "edition": "2026-10-07中国站公开主页；后续能力区域为局部机制研究",
    "referencePreview": "previews/cases/qoder-platform-reference.jpg",
    "capturedAt": "2026-10-07",
    "themeBehavior": {
      "mode": "fixed",
      "default": "light",
      "control": "当前首页固定灰绿/白色及绿色工作台场景，未发现全局系统或手动主题切换。工作台局部代码颜色不改页面主题。",
      "designReason": "全新 Qoder 双行标题与大幅智能体工作台，五平台轮播和集成/Wake/企业章节串联从工具到交付的逻辑。"
    },
    "soundBehavior": {
      "kind": "none",
      "control": "当前公开首页没有 audio/video 或配乐播放器。工作台的语音图标不等于主页实际播放音乐。",
      "interactionRole": "代码、会话、平台轮播和热图状态提供反馈，保持工具介绍静音。"
    }
  },
  {
    "id": "genshin-world",
    "order": 18,
    "title": "原神 · 版本群像与角色舞台",
    "subtitle": "GENSHIN / VERSION CAMPAIGN",
    "category": "游戏/IP",
    "country": "中国",
    "tags": [
      "原神",
      "米哈游",
      "HoYoverse",
      "版本宣传",
      "群像",
      "角色立绘"
    ],
    "summary": "2026-10-07 英文官网快照：深红版本群像以整屏位移进入角色舞台，角色选择同步切换完整背景、立绘、文字与原始语音。",
    "accent": "#b71936",
    "background": "#2a1027",
    "principles": [
      "深红群像和巨大主题图先建立版本剧情；下载保持清晰的第二层级。",
      "整屏垂直位移让每个章节成为独立舞台，角色舞台的完整换色承担叙事交接。",
      "角色选择同时改变立绘、姓名、简介、圆形肖像与背景，让人物拥有自己的视觉空间。",
      "麦克风播放该角色的官方台词；声音解释角色身份，不给静音主视觉虚构背景音乐。"
    ],
    "productFocus": "单一归档的 7.1 A Rekviem for the Underworld 版本；本地保留首屏、Vesna/Vodyanitsa 两角色、日历与末尾信息。",
    "interaction": [
      "滚轮或竖向手势推进整屏舞台，反向返回；末尾以有限位移露出 footer，避免把正常长页当作源站 Swiper。",
      "选择 Vesna/Vodyanitsa，100ms 交叉淡入立绘，并同步切换青绿/蓝色完整背景、姓名、简介、肖像状态与麦克风图。",
      "点击麦克风随机播放对应角色 3 条官方语音之一，再点暂停；换角色、离开角色章节与后台时停止，防止声线叠加。",
      "首屏 3 秒无声视频可暂停；离屏停止。详情与日历以可关闭的本地 dialog 展示，后者提供原图放大。",
      "键盘章节导航、角色左右键、最新请求队列及减少动态分支为本地补充。"
    ],
    "theme": "深红暗紫群像与青绿、浅金角色舞台；衬线与星芒、圆环、尖角纹样呈现幻想冒险。",
    "constraints": [
      "只归档 https://genshin.hoyoverse.com/en/ 在 2026-10-07 的单一快照，不跟随后续版本。",
      "源页 6 个章节缩为本地 3 个核心章节加 footer；领取、Xbox、登录、完整武器与 Wiki 不在本地范围。",
      "源垂直 Swiper 与角色 100ms 时序已确认；整屏的精确时长未核验，本地 600ms ease / 650ms 输入锁为明确近似。",
      "3 秒首屏本地短片没有音轨；6 条台词是官方角色语音，不能称作原站 BGM。",
      "详情是摘要 dialog，手机人物排布及可触摸控件属于本地适配，并非逐像素移动版。",
      "官方品牌、美术、视频与语音权利归相应权利方，资产 manifest 记录直接来源；不复制账户或追踪服务。"
    ],
    "useCases": [
      "大型游戏版本专题",
      "角色更新",
      "IP活动"
    ],
    "avoid": [
      "后台系统",
      "纯文字教程"
    ],
    "tokens": {
      "palette": [
        "#2a1027",
        "#b71936",
        "#229a91",
        "#21558c",
        "#efd779"
      ],
      "type": "官方巨幅主题图；本地角色名用 Georgia，说明用系统无衬线",
      "layout": "群像整屏 → 独立角色舞台 → 日历整屏 → 部分露出的 footer",
      "motion": "垂直 translate3d 舞台正反交接（本地 600ms ease 近似）；角色 100ms 交叉淡化与整背景同步；末尾位移有限，减少动态即时切换。"
    },
    "sources": [
      {
        "title": "Genshin Impact · 当前国际官网根入口",
        "url": "https://genshin.hoyoverse.com/en/",
        "type": "实例",
        "note": "2026-10-07：国际根入口为7.1专题，深红群像、青绿角色舞台与活动日历。"
      },
      {
        "title": "W3C · Pause, Stop, Hide",
        "url": "https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide.html",
        "type": "规范",
        "note": "持续自动动态应有暂停；本地背景视频可持续停止，减少动态初始停止。"
      },
      {
        "title": "W3C · Modal Dialog Pattern",
        "url": "https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/",
        "type": "规范",
        "note": "本地原生dialog的键盘、关闭与焦点语义参考，不代表原站完整遵循此模式。"
      },
      {
        "title": "官方公开交互脚本 · 2026-10-07",
        "url": "https://act.hoyoverse.com/puzzle/hk4e/pz_5yRXZTt_wZ/setups.d850a780.js",
        "type": "实例",
        "note": "2026-10-07 单次归档：垂直 Swiper 且 document.scrollY=0；角色 opacity 为100ms。人物背景/肖像/麦克风同步，随机3条语音与播放中暂停见公开配置。整屏本地600ms为近似。"
      }
    ],
    "prompt": "归档【目标游戏版本页】一个确定 URL 和采集日期。参考原神此快照：真实群像铺满首屏，深红暗紫底、巨幅官方主题字、下载与版本号保持清楚层级。滚轮以垂直 translate3d 切换独立舞台，必须能反向回到首屏；末尾仅移动剩余距离露出 footer。人物章节以完整背景承担换色，不只替换一张立绘；选择两角色时同步姓名、简介、原始肖像、立绘及麦克风图，立绘用来源确认的 100ms 交叉淡化。麦克风只在用户操作时随机播放该角色 3 条真实台词，再点暂停，换角色或离屏即停；首屏无声短片另有暂停，不添加未证实 BGM。未核验的整屏时长需在 fidelity 中明说，本地使用 600ms ease 和 650ms 输入锁并收敛最新操作。用原生 dialog 展示局部详情与可放大官方日历，支持 Escape、焦点与键盘章节/角色操作。手机保留独立舞台与可触摸控件，减少动态取消位移且背景初始暂停。明确删减章节、手机适配与本地无障碍补充，输出 HTML/CSS/JS、完整素材 manifest、风格与复现边界以及真实两尺寸预览。",
    "negativePrompt": "不要用蓝色通用SaaS hero替代深红角色群像；不要编造当前角色名、版本或曲目；不要冒充完整官网、领奖、登录或购买流程；不要复制追踪脚本。",
    "demo": "demos/cases/genshin-world/index.html",
    "preview": "previews/cases/genshin-world.jpg",
    "research": "docs/cases/genshin-world.md",
    "exercise": "依据这次归档的舞台规则，设计一个虚构双角色专题：保持整屏交接、角色连背景换色、声音归属与下载层级，比较不同美术是否仍有清楚的章节识别。",
    "composition": {
      "color": "深红暗紫群像与青绿、浅金角色舞台；衬线与星芒、圆环、尖角纹样呈现幻想冒险。",
      "typography": "官方大幅衬线主题图，角色名用Georgia；说明用系统无衬线",
      "layout": "群像整屏 → 独立角色舞台 → 日历整屏 → 部分露出的 footer",
      "imagery": "当前官网3秒静音主视觉视频、官方标题/Logo、两张角色立绘、官方日历。",
      "shape": "红色播放圆环、金色菱角按钮、青绿圆轨与装饰分隔组成幻想语汇。",
      "hierarchy": "版本剧情群像 → 下载与版本号 → 角色展示 → 活动日历。",
      "motion": "垂直 translate3d 舞台正反交接（本地 600ms ease 近似）；角色 100ms 交叉淡化与整背景同步；末尾位移有限，减少动态即时切换。",
      "coherence": "色调随版本/角色章节转换，人物图与幻想纹样统一；信息和操作保留清晰的固定层级。"
    },
    "referenceUrl": "https://genshin.hoyoverse.com/en/",
    "implementation": "reference-study",
    "fidelity": "demos/cases/genshin-world/fidelity.md",
    "assetManifest": "demos/cases/genshin-world/assets-manifest.json",
    "referencePreview": "previews/cases/genshin-world-reference.jpg",
    "themeBehavior": {
      "mode": "fixed",
      "default": "dark",
      "control": "无深浅主题切换；角色选择会改变舞台背景。",
      "designReason": "深红版本叙事与青绿/蓝色人物舞台来自同一 IP 美术，强行换成通用浅色会破坏人物与背景关系。"
    },
    "soundBehavior": {
      "kind": "external",
      "control": "本地麦克风手动播放/暂停 6 条官方角色语音；首屏无声，完整 PV/Wiki 使用官方外链。",
      "interactionRole": "人物选择更新声线；点击麦克风让角色自我介绍，换人和转场停止旧语音以保持人物归属，未发现独立 BGM。"
    },
    "capturedAt": "2026-10-07"
  },
  {
    "id": "arknights-world",
    "order": 19,
    "title": "明日方舟 · 全屏档案与交互点阵",
    "subtitle": "ARKNIGHTS / RHODES ISLAND INTERACTIVE ARCHIVE",
    "category": "游戏/IP",
    "country": "中国",
    "tags": [
      "明日方舟",
      "鹰角网络",
      "全屏章切",
      "滚动编号",
      "WebGL点阵",
      "原站BGM",
      "工业风",
      "黑白灰",
      "罗德岛",
      "战术档案"
    ],
    "summary": "全屏资源载入、侧向章切与滚动编号，将六章组织成工业系统；WORLD用真实WebGL点阵响应指针，把标识、设定和输入连成同一舞台。",
    "accent": "#00c4df",
    "background": "#080a0d",
    "principles": [
      "真实资源进入前：暗灰全屏品牌与青色进度条 → 资源就绪后淡出 → 建立系统启动感并遮住未就绪场景。",
      "滚轮、键盘或导航选择章节 → 场景按方向从侧面裁切覆盖、右侧数字/计数/章节名滚出再滚入 → 让空间方向与当前位置共同可读。",
      "WORLD指针进入点阵 → 原始排斥公式推开附近点、移走后回聚 → 让静态工业标识可被触摸；选择术语会把点阵重组成对应原站形状。",
      "BGM单独启用后持续跨章，600ms进入、300ms退出 → 用连续声音连接不同档案；人物语音由配音按钮主动触发。"
    ],
    "productFocus": "同一来源的2026-10-07中文官网快照：INDEX、INFORMATION、OPERATOR、WORLD、MEDIA、MORE与末端页脚；官方PV、BGM、三人双阶段立绘/日语语音、七组点阵与原始字体。",
    "interaction": [
      "首次/缓存重载均先显示全屏LOADING；本地按五份实际图片完成数显示进度，再开放初始hash所指章节。",
      "场景横向遮罩裁切：桌面1000ms、竖屏600ms；同方向重复轮输入锁定，快速反向和导航使用最后目标队列，单次仅一组出/入场景。",
      "右索引数字、计数和章节名分组滚出/换值/滚入，与换章方向联动；Home/End、PageUp/PageDown及上下方向键可走完六章与页脚。",
      "桌面WORLD先显示六术语目录与罗德岛点阵；悬停术语的原图预览跟随指针并使用同源形变/RGB偏移shader。点击进入详情，箭头/六段索引换模型，返回恢复目录。",
      "WORLD使用官网Three导出、七组原始点位、粒子贴图和排斥公式；10,000粒子池中当前模型使用1785–5652点。竖屏直接打开源石详情，粒子在上/文字在下。",
      "真实BGM默认关闭，单独开关并使用官网600/300ms音量渐变；三人日语语音独立按需播放，换人物或离开干员章暂停旧语音。",
      "暂停动态独立控制PV/粒子；减少动态提供即时章切和静止同源点阵，保留手动音频选择。"
    ],
    "theme": "暗灰网格、青色状态与灰度背景承接罗德岛工业系统；彩色立绘、白色点阵与档案文字保持焦点和可读性。",
    "constraints": [
      "本次快照归档于2026-10-07；后续官网变动不自动维护。官方美术/音乐版权归鹰角网络，限授权私人设计学习。",
      "六章及页脚交接保留；情报只保留当前三条与单幅官方Banner，轮播及深层新闻页由官网外链承接。",
      "干员保留3名/每人E1与E2，原站6名且阿米娅含E0；灰度背景为本地同人物图层，未移植完整背景版/6人滚动肖像轨道。",
      "WORLD原始模型、Three导出、粒子shader和指针排斥方程迁移；独立场景控制器及帧调度是本地实现，未迁移原站额外20枚firefly层。",
      "媒体对象取原站图片并改为四入口格；完整办公桌构图、图库/动态干员/内嵌视频目录未迁移，点击返回官网相应入口。",
      "末章四张官方图与响应式素材保留，分类内部弹层不复制；页脚260px位移为本地收束。",
      "加载图片集与保底1300ms是本地适配；原站加载五背景图、每次进度用1000ms插值，完成后300ms再退出1000ms。",
      "查询参数motion=reduce是可审阅分支；不声称模拟了操作系统偏好。"
    ],
    "useCases": [
      "工业科幻游戏",
      "战术角色档案",
      "世界设定库"
    ],
    "avoid": [
      "轻松生活方式品牌",
      "高密度交易表单"
    ],
    "tokens": {
      "palette": [
        "#080a0d",
        "#24282d",
        "#00c4df",
        "#eceeef"
      ],
      "type": "原站Bender、Oswald与Novecentosanswide字体；中文沿系统中文粗体档案。",
      "layout": "六个固定满屏场景；侧向裁切覆盖交接；右侧同步索引；WORLD桌面目录/左右详情，竖屏图上文下。",
      "motion": "章节按方向横向wipe：桌面1000ms/竖屏600ms；数字及标签300ms离开/300ms进入并100ms分组错列；同源WebGL点阵回聚与指针排斥，声音600/300ms渐变。"
    },
    "sources": [
      {
        "title": "Hypergryph · 明日方舟中文官方网站",
        "url": "https://ak.hypergryph.com/",
        "type": "实例",
        "note": "2026-10-07当前快照；新鲜入场、缓存重载、六章正反路径、WORLD指针/详情与390px竖屏实访，公开模块/CSS提供原始模型、shader、章切和声音参数。"
      },
      {
        "title": "W3C · Pause, Stop, Hide",
        "url": "https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide.html",
        "type": "规范",
        "note": "持续自动动态应有暂停；本地PV可停止，减少动态初始停止。"
      },
      {
        "title": "W3C · Tabs Pattern",
        "url": "https://www.w3.org/WAI/ARIA/apg/patterns/tabs/",
        "type": "规范",
        "note": "键盘与选择状态的规范参考；本地以原生按钮/aria-pressed实现角色和阶段选择。"
      }
    ],
    "prompt": "复现【明日方舟中文官网2026-10-07快照】的工业档案舞台，保留同一来源的真实品牌、字体、PV、美术、点阵与BGM。必须先显示全屏暗灰载入页：居中品牌、细边界线、实际图片资源进度、青色进度条，资源就绪后开放指定初始章节。六章INDEX/INFORMATION/OPERATOR/WORLD/MEDIA/MORE使用固定满屏舞台，不用普通长页面滚动；滚轮、章节导航和键盘按方向触发侧向裁切覆盖，桌面1000ms、竖屏600ms，右侧编号/计数/章节名在遮罩中滚出、换值、滚入。单一状态控制器处理快速反向和最后导航请求，稳定时只有一章可交互。WORLD必须用原站七套点位、粒子贴图、WebGL point shader与指针排斥方程，保留桌面目录+原图随指针形变预览、详情模型重组、左右箭头/六段索引/返回；390px竖屏直接打开第一项详情，图上文下。官方BGM与干员日语语音分开按需播放，BGM默认静音、600ms渐入/300ms渐出、跨章保持连续，离开前台停止音频；动态暂停和减少动态独立于用户声音选择，减少动态使用即时章节切换和静止真实点阵。原站固定暗色，不增设虚构浅色主题。保留三名干员E1/E2及明确子集边界；情报、媒体与更多章节可缩短内容，但真实入口、全章交接与末端页脚须连续且可反向返回。仅存最终资源与单一终态说明，证据和脚本留在仓库外。",
    "negativePrompt": "不要用普通Observer淡入冒充全屏侧向章切；不要用静态CSS晶体或虚构粒子形状；不要漏掉首次载入/反向方向/同步滚号；不要自动出声、臆造操作音/曲名/主题切换；不要把子集、外链及本地调度说成完整官网移植。",
    "demo": "demos/cases/arknights-world/index.html",
    "preview": "previews/cases/arknights-world.jpg",
    "research": "docs/cases/arknights-world.md",
    "exercise": "在已授权角色素材不变时，加入一个可查询的干员职业目录，保持工业档案的网格与状态语汇。",
    "composition": {
      "color": "暗灰网格、青色状态与灰度背景承接罗德岛工业系统；彩色立绘、白色点阵与档案文字保持焦点和可读性。",
      "typography": "原站Bender、Oswald与Novecentosanswide字体；中文沿系统中文粗体档案。",
      "layout": "六个固定满屏场景；侧向裁切覆盖交接；右侧同步索引；WORLD桌面目录/左右详情，竖屏图上文下。",
      "imagery": "官方PV、三名干员双阶段立绘/肖像、世界术语六幅图、七套点阵几何、媒体对象与末章四组桌面/竖屏素材。",
      "shape": "工业横竖与斜线网格、裁切大字、方框肖像、青色位置条、原始罗德岛/源石等白色粒子点阵；无CSS晶体替代。",
      "hierarchy": "全屏载入 → 首页/情报 → 干员 → 世界目录/详情 → 媒体入口 → 更多内容 → 页脚。",
      "motion": "章节按方向横向wipe：桌面1000ms/竖屏600ms；数字及标签300ms离开/300ms进入并100ms分组错列；同源WebGL点阵回聚与指针排斥，声音600/300ms渐变。",
      "coherence": "资源载入、编号、网格、点阵和媒体状态都属于同一罗德岛系统；指针、章切方向和声音给出互补反馈。"
    },
    "referenceUrl": "https://ak.hypergryph.com/",
    "implementation": "reference-study",
    "fidelity": "demos/cases/arknights-world/fidelity.md",
    "assetManifest": "demos/cases/arknights-world/assets-manifest.json",
    "referencePreview": "previews/cases/arknights-world-reference.jpg",
    "capturedAt": "2026-10-07",
    "themeBehavior": {
      "mode": "fixed",
      "default": "dark",
      "control": "本次中文官网未提供深浅色切换。",
      "designReason": "暗灰网格、青色状态与灰度背景承接罗德岛工业系统；彩色立绘、白色点阵与档案文字保持焦点和可读性。"
    },
    "soundBehavior": {
      "kind": "background",
      "control": "真实原站BGM独立开关，默认静音；600ms渐入/300ms渐出。三人官方日语配音由干员按钮单独播放；页面进入后台暂停音频。",
      "interactionRole": "BGM作为连续环境声音跨越横向章节交接，营造系统进入和世界档案氛围；人物配音提供角色身份反馈。未核验到独立章节/鼠标操作音，未添加臆造音效。"
    }
  },
  {
    "id": "uma-musume",
    "order": 20,
    "title": "赛马娘：群像赛道与斜切叙事",
    "subtitle": "Umamusume 国际英文官网 · 真实局部还原",
    "category": "游戏/IP",
    "tags": [
      "日本",
      "海外手游",
      "Cygames",
      "真实还原",
      "群像",
      "斜切",
      "角色立绘",
      "玩法轮播"
    ],
    "summary": "学习赛马娘国际官网如何用大幅赛道群像建立热闹、前进的运动感，再用荧绿斜切条带、角色立绘和竖屏玩法画面连接下载与游戏体验。",
    "accent": "#a7ce36",
    "background": "#f5faed",
    "principles": [
      "角色群像以纵深和奔跑方向承载主视觉，首屏不额外叠一套营销卡片。",
      "草地绿与荧绿斜切条带重复出现，静态信息也带有向前的运动感。",
      "玩法画面与对应角色共同切换，产品能力由真实游戏截图证明。",
      "下载徽章保持平台的熟悉形状，在复杂插画上形成容易识别的操作区域。"
    ],
    "productFocus": "真实游戏 Umamusume: Pretty Derby 的跑马养成、学园交流与比赛；本地页复现国际官网主视觉、新闻条目、预告入口、三态玩法轮播。",
    "interaction": [
      "正常纵向浏览连接群像、新闻、About、Gameplay 和 footer，斜切条带延续赛道方向。",
      "滚过画布宽度 7% 后 Logo 从 2.8 倍缩回导航，反向回首恢复；300ms cubic-bezier(.19,1,.22,1)。手机 1.72 倍与菜单切换，Play Now 打开下载层。",
      "三组 Gameplay 完整面板以 400ms cubic-bezier(.25,1,.5,1) 横移；按钮、编号、左右键与手势同步，首尾禁用而不循环。",
      "点击 About 原缩略图，站内 dialog 播放原始 top_about.mp4；该文件只有视频轨道，没有音轨，关闭/后台暂停。",
      "本地手机菜单、键盘控制、减少动态与学习说明为补充，未添加独立 BGM。"
    ],
    "theme": "明亮赛道、彩色二次元群像、奔跑纵深和反复出现的斜切几何共同构成青春竞技主题。",
    "constraints": [
      "只归档 https://umamusume.com/ 在 2026-10-07 的国际英文页，不混入日本门户布局或追随后续改版。",
      "群像、新闻、About 和 Gameplay 使用官方本地素材；新闻数量和后半部角色/媒体内容有缩减。",
      "About 原始 top_about.mp4 无音轨，播放器未静音不代表有原声；官网其他 PV 外链的声音未在本地核实，未发现独立 BGM，不给滚动章节配通用音乐。",
      "Gameplay 不自动推进、不循环；400ms cubic-bezier(.25,1,.5,1) 与首尾边界有源样式依据。",
      "手机使用原站竖版 KV；菜单、触摸阈值与字体排布有本地适配，减少动态取消非必要过渡。",
      "官方品牌、群像、美术和 PV 权利归相应权利方，manifest 留存 URL/尺寸/哈希；不复制运营服务。"
    ],
    "useCases": [
      "角色阵容丰富的竞技游戏",
      "二次元养成手游宣传",
      "已有高质量群像插画的产品页"
    ],
    "avoid": [
      "用通用双栏产品卡片替代官方群像构图",
      "让下载按钮遮挡角色表情",
      "声称未获取的音频是官网 BGM"
    ],
    "tokens": {
      "palette": [
        "#a7ce36",
        "#c0e640",
        "#6fb52a",
        "#ffffff",
        "#253336"
      ],
      "type": "粗重斜体无衬线标题；小号日期与普通正文分工；官方图像内文字保留原素材",
      "layout": "满宽赛道群像 → 斜切新闻 → 居中倾斜预告 → 立绘与竖屏画面轮播",
      "motion": "三组完整玩法面板400ms cubic-bezier(.25,1,.5,1)水平移动，原站时序与边界被保留；首尾停止、无自动推进，减少动态即时切换。"
    },
    "sources": [
      {
        "title": "Umamusume: Pretty Derby 国际官方网站",
        "url": "https://umamusume.com/",
        "type": "实例",
        "note": "2026-10-07：国际英文版赛道群像、手机竖版KV、新闻、About和Gameplay；素材来自公开官方资源。"
      },
      {
        "title": "官方国际版 App Store 页面",
        "url": "https://apps.apple.com/us/app/umamusume-pretty-derby/id6480433538",
        "type": "实例",
        "note": "官方国际版商店页确认产品与官网入口，区分国际宣传页和日本门户。"
      },
      {
        "title": "W3C WAI：Carousels Tutorial",
        "url": "https://www.w3.org/WAI/tutorials/carousels/",
        "type": "规范",
        "note": "轮播应有用户控制、键盘、当前状态和变更反馈；本地Gameplay手动且非循环。"
      },
      {
        "title": "W3C：Animation from Interactions",
        "url": "https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions.html",
        "type": "规范",
        "note": "交互动效降级规范，条款为Level AAA；不据此声称整页无障碍认证。"
      },
      {
        "title": "官方公共导航组件样式/脚本",
        "url": "https://parts.umamusume.com/assets/js/inject-components.js",
        "type": "实例",
        "note": "本次同页注入的公共导航：7% 宽度阈值、2.8/1.72 Logo 缩放，.3s(.19,1,.22,1)，Play Now 站内下载层。"
      }
    ],
    "prompt": "以一个明确 URL 和采集日期归档【竞技/养成游戏】。参考 Umamusume 国际页：官方赛道群像满宽铺开，独立竖版 KV 用于手机；下载徽章避开人物脸部。正常长页依次接入新闻条目、居中轻微倾斜的 About 缩略图和 Gameplay，不改成通用整屏 Swiper。草地绿、荧绿斜切标题带、粗重斜体标题与白底新闻形成运动方向和阅读节奏。点击 About 在站内原生 dialog 播放官方 top_about.mp4，文件无音轨，保留播放/暂停/进度与关闭或后台暂停；用比赛画面和剪辑建立节奏，不把未静音属性称为原声。官网 PV 外链的声音未在本地核实，不额外添加未核验 BGM。三组 Gameplay 必须将人物立绘、两张竖屏游戏图与文案板整块移动，400ms cubic-bezier(.25,1,.5,1)，首尾箭头禁用，不自动、不循环；按钮、编号、左右键与手势更新同一状态。保留来源证实的造型，不把所有图加统一圆角或玻璃卡片。明确内容缩减、手机适配与本地键盘/菜单补充，提供减少动态、可见焦点、原图 manifest 和真实桌面/390px 预览。 导航须保留真实 Logo 与蓝色纹理，滚过 min(viewportWidth,2000) 的7%阈值时2.8倍Logo缩回基准，300ms cubic-bezier(.19,1,.22,1)，反向恢复；手机1.72倍、马蹄图标菜单，Play Now打开原图下载层。",
    "negativePrompt": "不要生成泛用SaaS双栏hero、玻璃卡片墙或虚构官网音乐；不要复制运营接口、跟踪脚本、登录与付费流程；不要将新闻快照伪装成实时数据。",
    "demo": "demos/cases/uma-musume/index.html",
    "preview": "previews/cases/uma-musume.jpg",
    "research": "docs/cases/uma-musume.md",
    "exercise": "保留群像不动，把玩法轮播改成四种玩法：检查每次切换的标题、截图、立绘与状态是否一致，并记录增加信息密度后斜切背景是否影响阅读。",
    "composition": {
      "color": "草地绿来自官方赛道KV；#c0e640斜切标题带与绿色操作入口重复，白底新闻让复杂图像后出现阅读休息。",
      "typography": "官方图内标识保留；本地段落使用粗重斜体无衬线标题、普通正文和小号日期，避免所有内容同等抢眼。",
      "layout": "满宽赛道群像 → 斜切新闻 → 居中倾斜预告 → 立绘与竖屏画面轮播",
      "imagery": "原站公开KV、三名角色立绘、六张游戏截图与预告缩略图本地保存；每项有manifest来源。",
      "shape": "向前倾斜的标题带、说明板与箭头复用斜切语言，平台下载徽章保持自己的标准轮廓。",
      "hierarchy": "赛道群像先建立游戏辨识；下载次之；新闻较安静；Gameplay每态只突出一个玩法及相关人物。",
      "motion": "三组完整玩法面板400ms cubic-bezier(.25,1,.5,1)水平移动，原站时序与边界被保留；首尾停止、无自动推进，减少动态即时切换。",
      "coherence": "斜切条带延续赛道纵深与角色奔跑方向；游戏截图提供玩法证据，群像负责情绪，二者各有职责。"
    },
    "country": "日本",
    "edition": "国际英文版",
    "implementation": "reference-study",
    "referenceUrl": "https://umamusume.com/",
    "referencePreview": "previews/cases/uma-musume-reference.jpg",
    "fidelity": "demos/cases/uma-musume/fidelity.md",
    "assetManifest": "demos/cases/uma-musume/assets-manifest.json",
    "themeBehavior": {
      "mode": "fixed",
      "default": "light",
      "control": "本次页面未见深浅模式开关，保持白底、草地绿与荧绿。",
      "designReason": "明亮赛道、青春群像和斜切运动条带构成统一主题，切成通用暗色会改变比赛的情绪。"
    },
    "soundBehavior": {
      "kind": "none",
      "control": "About 原始 top_about.mp4 只有视频轨道，没有音轨；播放/暂停、进度与关闭暂停可操作。官网其他 PV 外链声音未在本地核实，未发现独立 BGM。",
      "interactionRole": "奔跑与比赛画面的剪辑建立观看节奏，无声影片保持普通阅读安静；站外播放器的声音不冒称本地已播放。"
    },
    "capturedAt": "2026-10-07"
  },
  {
    "id": "blue-archive",
    "order": 21,
    "title": "碧蓝档案：学园都市的天空与光",
    "subtitle": "Blue Archive 日本官方首页 · 城市映像与竖排标语",
    "category": "游戏/IP",
    "country": "韩国",
    "edition": "日本版",
    "implementation": "reference-study",
    "referenceUrl": "https://bluearchive.jp/",
    "referencePreview": "previews/cases/blue-archive-reference.jpg",
    "fidelity": "demos/cases/blue-archive/fidelity.md",
    "assetManifest": "demos/cases/blue-archive/assets-manifest.json",
    "tags": [
      "韩国",
      "日本版",
      "海外手游",
      "Yostar",
      "真实还原",
      "蓝白",
      "城市动画",
      "竖排"
    ],
    "summary": "归档日本官网蓝白学园都市映像、竖排标语与角落入口，并学习独立角色页四学生的完整资料轨道和官方声线。",
    "accent": "#00c9e5",
    "background": "#edf8fc",
    "principles": [
      "背景世界先建立氛围，居中品牌标识与右侧竖排标语保持不同角色。",
      "深蓝半透明横向导航与蓝白城市映像共享色系，同时稳定承载白色导航文字。",
      "下载在左下，漫画/帮助图像入口在右下，主视觉中心留给世界观。",
      "官方插画入口有各自的表现力，外围控件使用简洁线条维持轻量界面。"
    ],
    "productFocus": "真实游戏 Blue Archive 日本版；官方首页展示城市/教室背景、品牌与日常叙事，并把下载、漫画和帮助入口分配到画面角落。",
    "interaction": [
      "真实首页构图为城市影像与 Logo、竖排标语、边缘下载/漫画入口，向下到 footer；本地加入背景暂停。",
      "阿比多斯四学生资料卡与完整立绘以 1000ms 整块水平移动；选择按钮、左右键及手势同步当前人物。",
      "角色 VOICE 麦克风播放该学生对应官方 WAV，再点暂停；换人或后台停止，声线归属明确。",
      "首页导航 CHARACTER 打开本地独立 character.html；HOME 返回首页，首页仅 KV→footer，保留源站页面职责分离。"
    ],
    "theme": "学园都市的蓝天、反光玻璃与日常场景；青白标识、日文竖排文字和可爱的漫画按钮共同表达青春与轻盈感。",
    "constraints": [
      "归档 https://bluearchive.jp/ 在 2026-10-07 的单一快照；其可见 CHARACTER 导航进入 /character，作为同次采集的关联子页。",
      "原首页只含 KV→footer，独立 character.html 仅复现 /character 的阿比多斯；本地使用文档导航，源为 Vue router.push，未添加无证据的入场淡化。",
      "4 位学生姓名、CV、学年、生日、身高、立绘和 WAV 已核验；其他学院、全部人物和运营页面用官方入口。",
      "角色整轨 1000ms 有来源依据；缓动、键盘、触摸阈值、声线暂停与减少动态为本地补充或近似。",
      "城市视频保持静音；角色台词不是 BGM，完整 PV 使用官方外链，未添加通用音乐。",
      "手机改为可读排布而非逐像素原页；保持透明资料卡、完整人物和蓝白色，不加强制暗色主题。",
      "韩国为开发来源、日本为本次发行版；官方素材和商标权利归相应权利方，manifest 记录 URL/哈希。"
    ],
    "useCases": [
      "有成熟世界观的校园手游",
      "柔和科幻IP宣传",
      "背景氛围与轻量导航共存的官网"
    ],
    "avoid": [
      "把青白学园主题写成泛用科技仪表盘",
      "所有信息都覆盖在动画最复杂的位置",
      "未核验的角色页与假BGM状态"
    ],
    "tokens": {
      "palette": [
        "#00c9e5",
        "#14273b",
        "#ffffff",
        "#a8d8ed",
        "#edf8fc"
      ],
      "type": "小号大字距拉丁导航；官方日文竖排标语；资料卡姓名/CV/短字段分工",
      "layout": "首页城市 KV→footer；CHARACTER 导航进入独立学院/资料/人物舞台→footer",
      "motion": "静音城市视频可暂停；4 学生资料/立绘以 1000ms 整轨平移，缓动近似；角色声线主动播放，减少动态停止背景并即时换人。"
    },
    "sources": [
      {
        "title": "Blue Archive 日本官方网站",
        "url": "https://bluearchive.jp/",
        "type": "实例",
        "note": "2026-10-07：日本发行版首页蓝白影像、Logo、竖排标语与下载/漫画入口；开发来源和地区版本分开记录。"
      },
      {
        "title": "Blue Archive 日本官方角色页",
        "url": "https://bluearchive.jp/character",
        "type": "实例",
        "note": "2026-10-07：学院、资料卡与立绘分层，四位阿比多斯学生的姓名/CV/学年/生日/身高以及1000ms水平轨道。"
      },
      {
        "title": "Blue Archive 日本官方创作指南",
        "url": "https://bluearchive.jp/fankit/guidelines",
        "type": "规范",
        "note": "官方IP创作指南入口；本地学习不因此获得全部品牌与资产的再发布许可。"
      },
      {
        "title": "W3C WAI：Carousels Tutorial",
        "url": "https://www.w3.org/WAI/tutorials/carousels/",
        "type": "规范",
        "note": "用户控制、键盘与当前态的规范参考；本地学生为手动切换。"
      },
      {
        "title": "W3C：Animation from Interactions",
        "url": "https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions.html",
        "type": "规范",
        "note": "非必要交互动效支持减少动态偏好，不据此声称完整合规。"
      },
      {
        "title": "官方公开角色样式 · 2026-10-07",
        "url": "https://webusstatic.yo-star.com/bluearchive_jp_web/css/view-character-vue.b3742afb.css",
        "type": "实例",
        "note": "2026-10-07：官方角色页整块Swiper过渡1000ms，Hoshino资料/CV与立绘对应；本地只含阿比多斯四人，曲线及手机重排有差异。"
      },
      {
        "title": "官方公开 app 路由组件",
        "url": "https://webusstatic.yo-star.com/bluearchive_jp_web/js/app.421ac700.js",
        "type": "实例",
        "note": "同次采集：导航 methods.change 调用 $router.push，/character 独立路径，外壳直接 router-view+footer，没有 route transition 包装。"
      }
    ],
    "prompt": "以一个 URL 和采集日期归档【学园/轻科幻 IP】。参考 Blue Archive 日本首页：原始蓝白城市视频做满幅世界，透明青白 Logo 居中，右侧窄竖排标语，上方深蓝半透明导航，下载在左下、官方漫画图像在右下；中心不堆营销卡片。源首页为 KV→footer，CHARACTER 导航必须打开独立人物页，HOME 返回首页，不能同页串接；源公开 router-view 没有转场包装，不添加无证据的跨页 fade。人物舞台保留左学院标记、中透明资料卡、右完整立绘，四个真实阿比多斯学生的姓名、CV、生日、学年、身高一一对应；点击人物用 1000ms 整轨水平平移，缓动未核验就明说，不用只淡换小头像替代。VOICE 按钮使用原图和对应官方 WAV，用户点击播放、再点暂停、换人停止，声线作为人物身份而不是 BGM。城市背景静音并可暂停，未证实的音乐不添加。手机保持完整人物并重新安排资料和可触摸选择，明确适配范围；减少动态停止背景、即时切换，键盘与焦点可用。NEWS/SYSTEM/其他学院等未实现页面链接官网，不生成冒牌内容。保留固定蓝白主题及原始商店/漫画入口轮廓，输出代码、来源与字节哈希 manifest、复现边界和真实两尺寸预览。",
    "negativePrompt": "不要通用双栏hero、紫色霓虹仪表盘、虚构人物页、假背景音乐或自动有声播放；不要复制原站跟踪、运营接口、登录与支付逻辑。",
    "demo": "demos/cases/blue-archive/index.html",
    "preview": "previews/cases/blue-archive.jpg",
    "research": "docs/cases/blue-archive.md",
    "exercise": "改变背景映像的一个静态画面，保持Logo和下载位置，观察天空、建筑和高光是否遮挡标语，再记录允许控件落点的安全区域。",
    "composition": {
      "color": "青色强调、白色Logo与天空高光、深蓝透明导航在同一蓝白体系中分工；漫画插画的彩色集中在角落。",
      "typography": "小号大字距的拉丁导航与官方日文竖排标语方向不同，中心Logo承担主辨识，正文不仿造装饰字。",
      "layout": "首页城市 KV→footer；CHARACTER 导航进入独立学院/资料/人物舞台→footer",
      "imagery": "官方静音城市MP4、Logo、竖排标语、漫画入口，四位阿比多斯学生完整立绘/资料卡及各自WAV，全部本地保存。",
      "shape": "深蓝透明长导航、细线、熟悉商店徽章及原始插画入口；人物页保留透明资料卡和学院标記，不额外加六边形装饰。",
      "hierarchy": "背景建立世界、Logo确认产品、竖排标语补充主题；下载与漫画入口形成左右分工。",
      "motion": "静音城市视频可暂停；4 学生资料/立绘以 1000ms 整轨平移，缓动近似；角色声线主动播放，减少动态停止背景并即时换人。",
      "coherence": "同一青白品牌色将天空、Logo、导航指示和控件连起来，漫画的自由彩色保留在角色叙事入口，避免互相争抢。"
    },
    "themeBehavior": {
      "mode": "fixed",
      "default": "light",
      "control": "未见深浅切换；保持天空、青白 Logo 与深蓝透明导航。",
      "designReason": "学园都市的天空和玻璃高光承担世界观，资料卡与立绘沿用浅色学院体系；统一暗化会破坏原插画与标语的协调。"
    },
    "soundBehavior": {
      "kind": "external",
      "control": "本地 4 名阿比多斯学生各有官方 WAV，VOICE 手动播放/暂停；PV 为官网外链，城市视频无声。",
      "interactionRole": "每位声优的原始台词把静态档案变成有身份的人物；换人停止旧声线，音效不承担整站 BGM 或自动开场。"
    },
    "capturedAt": "2026-10-07"
  },
  {
    "id": "monument-valley-game",
    "order": 22,
    "title": "纪念碑谷：电影首入、奖项进入与中心画廊",
    "subtitle": "Monument Valley 一代官方网站 · 真实预告、奖项与画廊",
    "category": "游戏/IP",
    "country": "英国",
    "edition": "国际英文版",
    "implementation": "reference-study",
    "referenceUrl": "https://www.monumentvalleygame.com/mv1",
    "referencePreview": "previews/cases/monument-valley-game-reference.jpg",
    "fidelity": "demos/cases/monument-valley-game/fidelity.md",
    "assetManifest": "demos/cases/monument-valley-game/assets-manifest.json",
    "tags": [
      "英国",
      "海外手游",
      "ustwo games",
      "真实还原",
      "几何字标",
      "全屏视频",
      "渐变",
      "画廊"
    ],
    "summary": "依据2026-10-07国际英文 /mv1 页面：一秒白色加载遮罩、真实静音电影背景、中心触发的奖项淡入上移、十四张居中游戏画廊，以及手机四项奖项的展开。固定色带将体验、下载、信任与细节依次展开。",
    "accent": "#e76399",
    "background": "#627db3",
    "principles": [
      "真实字标与游戏影像先建立世界，Humanist521 BT 字体、小六边形索引和整幅色带维持安静秩序。",
      "奖项仅在视口中心进入该节时，以350ms从20px下方出现；离开后复位，反向浏览仍有同一节奏。",
      "画廊将当前图置于中央，左右图降低至0.5透明度，强调探索顺序并预告下一幅作品。",
      "手机保留作品纵向比例，画廊一张居中并露出20%侧图；奖项先呈现四条，让Show All逐步展开其余六条。"
    ],
    "productFocus": "真实 Monument Valley 一代：安静公主Ida、不可思议建筑和视觉解谜；官网通过预告与截图呈现作品，而本地复现其宣传页的区域顺序。",
    "interaction": [
      "首次进入：白色LOADING遮罩1000ms后直接移除，真实背景视频静音循环；可持续暂停。",
      "桌面左侧章节索引：点击以450ms swing将章节中心对齐视口中心；悬停或键盘进入索引时，标签350ms出现、内容降至0.2透明度。",
      "奖项：视口中心进入/离开时，350ms opacity 0↔1、translateY 20px↔0，双向有效；手机Show All/Hide通过350ms高度变化展开/收回六项。",
      "十四图画廊：500ms整条水平轨道、3秒自动推进、无限首尾衔接；桌面三张、手机一张加20%侧图，箭头/14个索引/方向键与点击侧图有效。悬停、焦点、离屏和后台暂停。",
      "前景预告：主动Play播放同一67.988秒官方MP4及原声轨；原生进度/暂停和实际声音开关有效，播放时暂停背景。",
      "手机圆形菜单：350ms全屏白色面板进入/退出，Escape可关闭；本地明确增加暂停、键盘、后台节流和减少动态分支。"
    ],
    "theme": "固定品牌场景：白导航、深色影像/下载/画廊、粉蓝奖项、奶油媒体、粉社区和紫页尾。几何字标与原始幻境建筑是主视觉，不以换肤替代作品世界。",
    "constraints": [
      "唯一页面基线为2026-10-07国际英文 https://www.monumentvalleygame.com/mv1；不混入MV2的字标描边或MV3区域。",
      "当次原站MV1 hero实际随普通滚动离屏，未观察到滚动缩放/视差；公开函数存在不等于效果发生，因此本地不添加无依据视差。",
      "当前原站桌面前景播放操作触发React #185，未验证其实际声音播放；公开播放器与MP4声轨提供机制依据，本地主动播放已验证。",
      "官方十四张图片、字标、月亮/月桂、Humanist字体和预告本地保存，来源/尺寸/hash见资产清单；权利仍归ustwo games及相应权利人。",
      "保留十项奖项和交互机制；媒体区以明确标注的学习观察替代评论长文，商店保留两个徽章，社交图标以文本入口近似。",
      "手机/桌面版式、媒体裁切和细小控件几何为可复用实现近似，非逐像素复制；原站没有独立BGM，也未发现全局深浅主题按钮。"
    ],
    "useCases": [
      "有高质量游戏影像的独立游戏",
      "建筑与视觉解谜作品宣传",
      "适合安静观看的数字艺术作品"
    ],
    "avoid": [
      "以自行绘制浮岛替代真实官网证据",
      "在全屏画面中堆满CTA和卡片",
      "把官网视频的声轨声称为下载BGM"
    ],
    "tokens": {
      "palette": [
        "#fefefe",
        "#221f20",
        "#e76399",
        "#627db3",
        "#fcf2d2",
        "#e28ec0",
        "#48418c"
      ],
      "type": "官方几何字标SVG与本地保存的Humanist521 BT Roman/Bold；导航13px，奖项主标题28px/32px。",
      "layout": "影像 → 下载 → 预告 → 十项奖项 → 社交 → 媒体 → 十四图画廊 → 社区 → 页尾；桌面左侧中心章节索引，手机圆形导航。",
      "motion": "加载1000ms；章节450ms swing；奖项与手机展开350ms ease-in-out；画廊500ms ease/3000ms自动，暂停及减少动态明确可控。"
    },
    "sources": [
      {
        "title": "Monument Valley 一代官方宣传页",
        "url": "https://www.monumentvalleygame.com/mv1",
        "type": "实例",
        "note": "2026-10-07：一代宣传页的白导航、影像、粉蓝奖项、奶油媒体区、画廊及社区。"
      },
      {
        "title": "ustwo games：Monument Valley作品页",
        "url": "https://ustwogames.co.uk/our-games/monument-valley/",
        "type": "实例",
        "note": "开发者介绍Ida、不可思议建筑和视觉幻象，支撑产品重点；本地使用实际游戏画面。"
      },
      {
        "title": "ustwo games：联系信息",
        "url": "https://ustwogames.co.uk/contact-us/",
        "type": "实例",
        "note": "官方伦敦工作室地址是国家分类的依据，不代表英国页面有固定风格。"
      },
      {
        "title": "W3C WAI：Carousels Tutorial",
        "url": "https://www.w3.org/WAI/tutorials/carousels/",
        "type": "规范",
        "note": "画廊用户控制、键盘和当前状态的规范参考。"
      },
      {
        "title": "W3C：Animation from Interactions",
        "url": "https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions.html",
        "type": "规范",
        "note": "本地减少动态分支约束：停止自动推进与背景，取消非必要位移；不声称原站合规。"
      },
      {
        "title": "MV1 官方公开交互脚本",
        "url": "https://www.monumentvalleygame.com/js/main.js",
        "type": "实例",
        "note": "同一页面1000ms loader、450ms章节定位、中心活动区、手机奖项分组、Slick14图及媒体播放器机制。"
      },
      {
        "title": "MV1 官方公开样式",
        "url": "https://www.monumentvalleygame.com/style.css",
        "type": "实例",
        "note": "同一归档页Humanist字体、350ms奖项/高度/标签过渡及画廊0.5侧图透明度；MV2专属动画不作为MV1证据。"
      }
    ],
    "prompt": "为[有真实作品影像的独立游戏/数字艺术作品]建立基于2026-10-07 Monument Valley一代国际英文 https://www.monumentvalleygame.com/mv1 的可复用交互研究。先用白色LOADING遮罩等待1000ms并直接移除，真实67.988秒官方MP4静音循环，真实几何字标居中scale1.125；只在主动Play前景预告后启用原声轨，提供实际声音/原生进度和暂停，背景保持静音且可持续暂停，不冒称独立BGM。采用官方Humanist521 BT Roman/Bold和真实字标、月桂、月亮、十四张原游戏图；本地保存来源/尺寸/字节/hash。桌面白色固定系列导航，左侧小六边形章节索引；点击450ms swing使章节中心对齐视口中心，悬停/焦点350ms进入标签并将正文透明度降至0.2。按影像、下载、预告、粉蓝奖项、社交、奶油媒体、黑色画廊、粉色社区、紫页尾展开。奖项以视口中心位于章节内为触发，350ms ease-in-out opacity0↔1且translateY20px↔0，离开复位、反向重新进入；十项事实与月桂保持成对，手机先四项，Show All/Hide用350ms高度展开其余六项并旋转箭头180度。画廊保留十四张原始竖屏图与十四索引，桌面center3张、手机center1张并露出20%侧图，当前opacity1/侧图0.5，500ms ease整体横轨、无限首尾衔接、3000ms自动推进；悬停/键盘焦点/离屏/后台暂停，快速反转仍只有一个当前索引，箭头、方向键、Home/End、侧图选择、手机水平手势可用。手机圆形菜单350ms白色全屏面板进出，关闭态不可聚焦。固定作品配色，不强加全局换肤。本地暂停/减少动态/键盘分支注明易用性扩展。不得添加当次MV1未观察到的hero视差或MV2描边动画；原站前景播放React #185未通过实测，清楚区分公开播放器依据、本地已播放与未验证来源状态；媒体评价长文可缩减为标注的学习观察但保留原章节衔接。",
    "negativePrompt": "不要泛用营销卡片、重画浮岛、虚构奖项、自动有声播放、虚构独立BGM、无来源hero视差或混入MV2描边；不要用所有区域统一淡入替代原站中心触发和轨道机制。",
    "demo": "demos/cases/monument-valley-game/index.html",
    "preview": "previews/cases/monument-valley-game.jpg",
    "research": "docs/cases/monument-valley-game.md",
    "exercise": "比较桌面中心三图与手机一图加20%侧图；切至第十四张再下一张，快速反向选择并暂停自动播放，检查当前索引、轨道和可聚焦元素始终一致。再上下穿越奖项中心，观察350ms双向进入与手机Show All高度变化。",
    "composition": {
      "color": "固定白导航、#221f20影像/下载/画廊、粉蓝奖项、奶油媒体、粉社区与紫页尾，以整幅色带改变观看节奏。",
      "typography": "官方细线几何字标与真实Humanist521 BT Roman/Bold，小号导航和28px奖项标题保持作品秩序。",
      "layout": "真实影像先行，内容按下载/预告/奖项/社交/媒体/十四图画廊/社区/页尾展开，左侧索引按视口中心更新。",
      "imagery": "官方MP4、字标SVG、月亮/月桂、十四张游戏截图和社区图均本地保存，不以自行绘制替代作品。",
      "shape": "微小六边形索引、成对月桂与直边色带；手机圆形菜单和保留游戏原纵横比的画廊。",
      "hierarchy": "影像建立体验，商店徽章提供行动，十项奖项建立信任，中心画廊展示细节并预告侧图。",
      "motion": "加载1000ms；章节450ms swing；奖项与手机展开350ms ease-in-out；画廊500ms ease/3000ms自动，暂停及减少动态明确可控。",
      "coherence": "建筑与字标共享几何秩序，克制的控件与固定色带形成放映节奏；进入、展开与轨道分别服务内容职责。"
    },
    "capturedAt": "2026-10-07",
    "themeBehavior": {
      "mode": "fixed",
      "default": "light",
      "control": "当前MV1页面没有全局主题选择；固定白导航、深色影像/画廊及各章节品牌色，不随系统深浅切换。",
      "designReason": "页面是作品世界的固定放映顺序，完整色带与原始媒体建立统一氛围。"
    },
    "soundBehavior": {
      "kind": "video",
      "control": "背景MP4静音循环；主动Play前景影片才有真实原声，原生媒体控件及Sound on/off控制实际muted。原站本次播放触发React #185，声音现场未通过；本地播放通过。",
      "interactionRole": "影片声轨与空间/解谜画面共同营造作品气氛；没有独立BGM，用户开始观看才进入有声体验。"
    }
  },
  {
    "id": "design-sight",
    "order": 23,
    "title": "21_21 DESIGN SIGHT：海报与四列档案",
    "subtitle": "日本设计文化机构 · 当前官方海报局部还原",
    "category": "艺术/文化",
    "country": "日本",
    "edition": "日本版 / 2026-10-07主页快照",
    "implementation": "reference-study",
    "referenceUrl": "https://www.2121designsight.jp/",
    "referencePreview": "previews/cases/design-sight-reference.jpg",
    "fidelity": "demos/cases/design-sight/fidelity.md",
    "assetManifest": "demos/cases/design-sight/assets-manifest.json",
    "tags": [
      "日本",
      "艺术",
      "设计展览",
      "真实还原",
      "海报",
      "四列档案",
      "蓝色标识"
    ],
    "summary": "让展览海报主导首屏，蓝色机构标识与四个档案栏目管理不同展览的视觉差异；兼具作品展示与访问信息。",
    "accent": "#0090df",
    "background": "#f3f3f3",
    "principles": [
      "展览自己的海报保持完整，机构不再用营销大标题重复解释。",
      "固定白色机构导航与蓝色标识，提供稳定的回看和语言切换入口。",
      "四列分别承载机构、Gallery 1&2、Gallery 3和Documents；栏目之间对齐，栏目内部图像按原比例展开。",
      "浅灰地面与白色内容块分离层次，蓝色标题和橙色NEW承担导航与更新提示。"
    ],
    "productFocus": "设计文化机构的展览、研究档案、建筑与访问信息；首屏展览先呈现，后续分类帮助查询与回看。",
    "interaction": [
      "首次加载完成：全屏白色与蓝色50px旋转标记，300ms退场。 在海报加载期间保持机构识别。",
      "海报自动切换：6000ms间隔与1000ms淡化，指针经过不暂停。 保留展览视觉的完整阅读时间。",
      "手机打开菜单／关闭：64px栏下的白色导航立即显示，hamburger350ms形变；固定页面并恢复原浏览位置。 小屏将机构入口与长档案分开，关闭后继续阅读。",
      "手机展开栏目／页面回顶：四列分别先显示1／2／1／1项，“更多”即时展开；回顶按钮超过100px以200ms出现。 缩短首屏密度，档案仍可按需读全。",
      "悬停档案与分类：标志／工具链接50ms反馈，分类300ms蓝白切换，文章300ms阴影。 用蓝色与微小深度提示选择，不覆盖海报。"
    ],
    "theme": "机构蓝标识、白色导览、全幅展览海报、浅灰四列档案；图像风格随展览改变，网站的组织规则持续统一。",
    "constraints": [
      "明确记录2026-10-07当前日本官网，展期及休馆是快照，不作为实时访问信息。",
      "首屏不裁成通用两列hero：使用官方1280×720海报，以16:9完整铺开。",
      "档案图片包含竖海报与横照片，保留各自比例，不强行统一卡片高度。",
      "官方Logo与展览图像只用于个人本地学习，品牌与作品权利保留。",
      "四列在760px以下变单列；菜单和轮播提供键盘、焦点与reduced-motion。",
      "本地保留海报轮播与加载完成后的遮罩退场；不运行原CMS、统计或购票后端。",
      "原站桌面全程与菜单已验证。原站手机DevTools视口调用重试后仍被保存权限拦截，手机行为由公开响应式脚本/CSS确认并在本地实测，不宣称原站手机操作已经通过。"
    ],
    "useCases": [
      "设计展览/建筑机构",
      "海报主导的文化活动",
      "长期内容档案"
    ],
    "avoid": [
      "以统一圆角SaaS卡片覆盖展览海报",
      "强制裁齐所有档案缩略图",
      "把临时展期做成永久事实"
    ],
    "tokens": {
      "palette": [
        "#0090df",
        "#ffffff",
        "#f3f3f3",
        "#ff9900",
        "#444444"
      ],
      "type": "机构导航与栏目采用克制无衬线；展览海报原有字体作为作品图像保留",
      "layout": "固定129px白header → 16:9全幅海报 → 1195px四列档案 → 双栏访问信息",
      "motion": "两张海报6000ms间隔、1000ms淡化对应官方Slick时序；ease及箭头/暂停为本地适配。聚焦、离屏、后台停轮换，减少动态仅手动；栏目吸顶。"
    },
    "sources": [
      {
        "title": "21_21 DESIGN SIGHT 官方首页",
        "url": "https://www.2121designsight.jp/",
        "type": "实例",
        "note": "2026-10-07：日本首页完整16:9展览海报、蓝色机构标识、四列档案与访问区域。"
      },
      {
        "title": "21_21 官方：名称与产品Logo设计说明",
        "url": "https://www.2121designsight.jp/designsight/",
        "type": "理论",
        "note": "第一方说明product logo借用日常地址牌形象，连接设计场所与日常视点。"
      },
      {
        "title": "IBM Design Language：Layout overview",
        "url": "https://www.ibm.com/design/language/layout/overview/",
        "type": "理论",
        "note": "比例、尺度、对齐与重复可解释档案构成；不把IBM品牌规范当作机构采用的标准。"
      },
      {
        "title": "W3C WAI：Carousels Tutorial",
        "url": "https://www.w3.org/WAI/tutorials/carousels/",
        "type": "规范",
        "note": "自动轮播应有暂停、手动控制、键盘与当前状态反馈；本地保留6秒自动模式并提供停止。"
      },
      {
        "title": "官方公开交互脚本 · 2026-10-07",
        "url": "https://www.2121designsight.jp/assets2017/common/js/common.js",
        "type": "实例",
        "note": "2026-10-07：固定栏目及50ms链接/Logo反馈有脚本声明；6000ms/1000ms fade来自首页内联Slick配置。未确认完整hover与Vimeo联动。"
      }
    ],
    "prompt": "为[项目]制作基于21_21 DESIGN SIGHT：海报与四列档案的局部交互学习页面。参考https://www.2121designsight.jp/，观察2026-10-07，固定这一次采集的语言/年度页面，完成后作为单一归档快照留存；后续原站变化不改变此案例。不能只借用品牌色后套通用营销模板。配色：蓝色固定机构标识和链接，浅灰承托白色档案，橙色NEW形成更新角色；展览海报拥有自己的配色。 字体：导航/分类标题稳定无衬线；海报中中英文字体作为官方原图保留，避免重排破坏作品。 版式：129px header、全幅16:9海报、4个等宽但内容不等高的竖列；手机单列。 图像：真实方丈记与TYPE-XVII海报、建筑照片、访问地图、研究照片本地化，保留原比例。 形状：机构Logo圆角牌，栏目细蓝边，橙NEW圆；内容块主要矩形。 层级：海报先建立当前展览认知，分类其次，标题/日期/说明依次降低；不是每段都有大标题。 协调：展览视觉彼此不同，以恒定蓝标识、留白、列宽、标题与内容关系统一成机构档案。 关键流程：首次加载完成：全屏白色与蓝色50px旋转标记，300ms退场。 在海报加载期间保持机构识别。 海报自动切换：6000ms间隔与1000ms淡化，指针经过不暂停。 保留展览视觉的完整阅读时间。 手机打开菜单／关闭：64px栏下的白色导航立即显示，hamburger350ms形变；固定页面并恢复原浏览位置。 小屏将机构入口与长档案分开，关闭后继续阅读。 手机展开栏目／页面回顶：四列分别先显示1／2／1／1项，“更多”即时展开；回顶按钮超过100px以200ms出现。 缩短首屏密度，档案仍可按需读全。 悬停档案与分类：标志／工具链接50ms反馈，分类300ms蓝白切换，文章300ms阴影。 用蓝色与微小深度提示选择，不覆盖海报。 主题：原站白底、黑字与蓝色档案导航固定，无系统或手动主题开关。 海报保持原色，白色档案底和小尺度日期服务可读性。 声音：当前首页海报为静图，无音频或独立BGM控制。 通过海报轮换与档案层级形成节奏，不加入没有来源的音乐。 使用真实本地素材与正确比例，记录URL、作者、尺寸、hash和处理方式；无追踪。保留原站的章节交接、出入方向和指针反馈；桌面与390px手机分别实测。减少动态使用即时状态并保留全部内容；键盘与焦点可操作。完整数据库、账号与交易用真实官方外链。所有近似和未验证项在fidelity.md明确，不能用静态截图宣称全流程已还原。",
    "negativePrompt": "不使用共同SaaS双栏hero模板，不嵌入整站iframe，不伪造官网功能或实时展期，不复制统计/交易脚本，不使用CDN和远程图像运行时依赖。",
    "demo": "demos/cases/design-sight/index.html",
    "preview": "previews/cases/design-sight.jpg",
    "research": "docs/cases/design-sight.md",
    "exercise": "保持海报不变，将四列间距从50px改为25px，观察栏目密度；再把所有缩略图强制裁成同尺寸，记录丢失的展览信息。",
    "composition": {
      "color": "蓝色固定机构标识和链接，浅灰承托白色档案，橙色NEW形成更新角色；展览海报拥有自己的配色。",
      "typography": "导航/分类标题稳定无衬线；海报中中英文字体作为官方原图保留，避免重排破坏作品。",
      "layout": "129px header、全幅16:9海报、4个等宽但内容不等高的竖列；手机单列。",
      "imagery": "真实方丈记与TYPE-XVII海报、建筑照片、访问地图、研究照片本地化，保留原比例。",
      "shape": "机构Logo圆角牌，栏目细蓝边，橙NEW圆；内容块主要矩形。",
      "hierarchy": "海报先建立当前展览认知，分类其次，标题/日期/说明依次降低；不是每段都有大标题。",
      "motion": "首次加载完成时全屏白色与蓝色50px旋转标记，300ms退场。；海报自动切换时6000ms间隔与1000ms淡化，指针经过不暂停。；手机打开菜单／关闭时64px栏下的白色导航立即显示，hamburger350ms形变；固定页面并恢复原浏览位置。；手机展开栏目／页面回顶时四列分别先显示1／2／1／1项，“更多”即时展开；回顶按钮超过100px以200ms出现。；悬停档案与分类时标志／工具链接50ms反馈，分类300ms蓝白切换，文章300ms阴影。",
      "coherence": "展览视觉彼此不同，以恒定蓝标识、留白、列宽、标题与内容关系统一成机构档案。"
    },
    "themeBehavior": {
      "mode": "fixed",
      "default": "light",
      "control": "原站白底、黑字与蓝色档案导航固定，无系统或手动主题开关。",
      "designReason": "海报保持原色，白色档案底和小尺度日期服务可读性。"
    },
    "soundBehavior": {
      "kind": "none",
      "control": "当前首页海报为静图，无音频或独立BGM控制。",
      "interactionRole": "通过海报轮换与档案层级形成节奏，不加入没有来源的音乐。"
    },
    "capturedAt": "2026-10-07"
  },
  {
    "id": "mori-art-museum",
    "order": 24,
    "title": "森美术馆：红色机构锚点与艺术海报",
    "subtitle": "MORI ART MUSEUM 日本官网 · 2026年10月快照",
    "category": "艺术/文化",
    "country": "日本",
    "edition": "日本版 / 2026-10-07主页快照",
    "implementation": "reference-study",
    "referenceUrl": "https://www.mori.art.museum/jp/",
    "referencePreview": "previews/cases/mori-art-museum-reference.jpg",
    "fidelity": "demos/cases/mori-art-museum/fidelity.md",
    "assetManifest": "demos/cases/mori-art-museum/assets-manifest.json",
    "tags": [
      "日本",
      "艺术",
      "美术馆",
      "真实还原",
      "红色馆标",
      "展览海报",
      "信息层级"
    ],
    "summary": "红色方形馆标叠在宽展览海报上，红色展期带连接图像与访问信息；后续展览、推荐与新闻以稳定网格组织。",
    "accent": "#bf0d3e",
    "background": "#ffffff",
    "principles": [
      "机构Logo作为不随作品变化的视觉锚点，明确这是谁的展览。",
      "艺术海报可以充满自己的色彩与字体，外围网页保持白底和红色识别。",
      "红色展期带紧贴主视觉，观众从作品直接获得名称、日期与访问入口。",
      "新闻与展览采用相同图文对齐关系；日期、类型、标题用位置与尺度形成阅读顺序。"
    ],
    "productFocus": "当前/后续展览与实际来馆信息。2026-10-07官网处于换展闭馆期，主推即将开始的森万里子：燦燦，而非过期的Ron Mueck展。",
    "interaction": [
      "进入首页：展览海报直接出现，无虚构加载百分比。 先看展览而非额外欢迎层。",
      "滚动超过大字标+130px／返回：50px红色紧凑导航120ms从上方进入，回到顶部80ms退出恢复大字标。 长页仍能访问机构入口；进入展览时品牌不被小导航抢占。",
      "手机打开／反向关闭菜单：导航330ms cubic-bezier(.47,0,.745,.715)横向进出。 侧向层级分离展览内容与机构菜单。",
      "滚动到页面深处／页尾：回顶150ms显隐，接近页尾从fixed转为footer内定位。 回程入口可找且不挡页尾信息。"
    ],
    "theme": "白色机构页面、深红方形Logo与展期带、粉色临时公告；不断更换的当代艺术海报在稳定信息框架中展示。",
    "constraints": [
      "以 /jp/ 当前快照为准：森万里子：燦燦 2026.10.31–2027.3.28；顶栏闭馆信息有时效性。",
      "大屏主图1600×640，小屏使用450×450官方专用图，不直接裁剪桌面海报。",
      "真实红方馆标：桌面240×240px、手机160×160px，在海报上方约30px开始叠置；中屏200px为本地可用性适配。",
      "Logo/艺术家作品版权归原权利人，仅作个人本地学习。",
      "使用系统字体近似导航；官网Mori专属字体没有下载，不能声称像素级一致。",
      "本地只还原首页几个区域并加教学新闻筛选；不复制多馆门户、购票账户与追踪脚本。",
      "完整预约与馆藏数据库不复制；新闻分类与本地反馈属于练习补充，不能冒称官网所有服务。"
    ],
    "useCases": [
      "艺术馆与多展览机构",
      "作品风格持续变化的主页",
      "需要明确来馆信息的文化服务"
    ],
    "avoid": [
      "把艺术品当通用背景装饰",
      "过期展览冒充当前主视觉",
      "以新品牌圆角卡片取代机构红色方标"
    ],
    "tokens": {
      "palette": [
        "#bf0d3e",
        "#ffffff",
        "#f8d6da",
        "#252525",
        "#d9d9d9"
      ],
      "type": "官方展览海报的中英字形保留；网页使用无衬线导航和粗体英文栏目，系统字体近似专属Mori字体",
      "layout": "临时公告/多馆辅助条 → 机构导航/叠加Logo → 2.5:1展览海报与红展期带 → 四列展览/新闻",
      "motion": "导航浏览后吸顶换小字标；五语言菜单滚动收起；返回顶部200ms反馈为本地近似。主海报单幅静态，不自动轮播。"
    },
    "sources": [
      {
        "title": "森美术馆 官方首页",
        "url": "https://www.mori.art.museum/jp/",
        "type": "实例",
        "note": "2026-10-07：森万里子单幅海报、红色方标、展期带、换展闭馆公告及展览/新闻结构。"
      },
      {
        "title": "森美术馆官方：机构介绍",
        "url": "https://www.mori.art.museum/jp/about/",
        "type": "实例",
        "note": "第一方介绍六本木森塔馆址与现当代艺术使命；具体视觉作用另作本地分析。"
      },
      {
        "title": "IBM Design Language：Layout overview",
        "url": "https://www.ibm.com/design/language/layout/overview/",
        "type": "理论",
        "note": "元素关系、层级、比例和对齐用于解释机构页面，不表示森美术馆采用IBM规范。"
      },
      {
        "title": "W3C WAI：Carousels Tutorial",
        "url": "https://www.w3.org/WAI/tutorials/carousels/",
        "type": "规范",
        "note": "用户控制与键盘的参考；当前主海报未观察到自动轮播，本地保持静态。"
      },
      {
        "title": "官方公开交互脚本 · 2026-10-07",
        "url": "https://www.mori.art.museum/jp/common/js/common.js?20261007092134",
        "type": "实例",
        "note": "2026-10-07：滚动固定导航与五语言入口；语言菜单滚动关闭。返回顶部200ms为本地选择，完整多馆门户未覆盖。"
      }
    ],
    "prompt": "为[项目]制作基于森美术馆：红色机构锚点与艺术海报的局部交互学习页面。参考https://www.mori.art.museum/jp/，观察2026-10-07，固定这一次采集的语言/年度页面，完成后作为单一归档快照留存；后续原站变化不改变此案例。不能只借用品牌色后套通用营销模板。配色：#bf0d3e机构红贯穿Logo、展期、栏目、标签；粉色公告、白色底和艺术海报虹彩承担不同角色。 字体：海报原字形与网页系统字分工；粗英文栏目+小日文副标题，信息由字号和对齐建立顺序。 版式：桌面左叠加240px方形馆标（x30/y130），宽2.5:1海报自y160开始；手机160px馆标与官方方图，后续四列展览、三列推荐、四列新闻。 图像：官方森万里子桌面/手机专图、其他展览海报、购票/新闻缩略图本地归档。 形状：方形馆标、矩形海报、细边类型标签与新闻红色小方块；避免泛化大圆角。 层级：闭馆先告知行动限制，主视觉提供展览认知，展期带给日期/来馆，后续推荐新闻服务不同意图。 协调：统一机构红、图像比例、标题/日期关系使不同作品属于同一艺术馆，艺术图片保留表达自由。 关键流程：进入首页：展览海报直接出现，无虚构加载百分比。 先看展览而非额外欢迎层。 滚动超过大字标+130px／返回：50px红色紧凑导航120ms从上方进入，回到顶部80ms退出恢复大字标。 长页仍能访问机构入口；进入展览时品牌不被小导航抢占。 手机打开／反向关闭菜单：导航330ms cubic-bezier(.47,0,.745,.715)横向进出。 侧向层级分离展览内容与机构菜单。 滚动到页面深处／页尾：回顶150ms显隐，接近页尾从fixed转为footer内定位。 回程入口可找且不挡页尾信息。 主题：原站白底、红色机构识别与原色艺术海报固定，无主题开关。 红色持续标识导览，艺术品由自己的色彩表达。 声音：当前展览首页无独立BGM或有声开场。 依赖艺术海报与新闻节奏，不添加与展览无关的音轨。 使用真实本地素材与正确比例，记录URL、作者、尺寸、hash和处理方式；无追踪。保留原站的章节交接、出入方向和指针反馈；桌面与390px手机分别实测。减少动态使用即时状态并保留全部内容；键盘与焦点可操作。完整数据库、账号与交易用真实官方外链。所有近似和未验证项在fidelity.md明确，不能用静态截图宣称全流程已还原。",
    "negativePrompt": "不使用共同SaaS双栏hero模板，不嵌入整站iframe，不伪造官网功能或实时展期，不复制统计/交易脚本，不使用CDN和远程图像运行时依赖。",
    "demo": "demos/cases/mori-art-museum/index.html",
    "preview": "previews/cases/mori-art-museum.jpg",
    "research": "docs/cases/mori-art-museum.md",
    "exercise": "保持艺术海报不变，只移除红色方形馆标与展期带，观察观众还是否能迅速知道机构、展名和日期；恢复后比较信息路径。",
    "composition": {
      "color": "#bf0d3e机构红贯穿Logo、展期、栏目、标签；粉色公告、白色底和艺术海报虹彩承担不同角色。",
      "typography": "海报原字形与网页系统字分工；粗英文栏目+小日文副标题，信息由字号和对齐建立顺序。",
      "layout": "桌面左叠加240px方形馆标（x30/y130），宽2.5:1海报自y160开始；手机160px馆标与官方方图，后续四列展览、三列推荐、四列新闻。",
      "imagery": "官方森万里子桌面/手机专图、其他展览海报、购票/新闻缩略图本地归档。",
      "shape": "方形馆标、矩形海报、细边类型标签与新闻红色小方块；避免泛化大圆角。",
      "hierarchy": "闭馆先告知行动限制，主视觉提供展览认知，展期带给日期/来馆，后续推荐新闻服务不同意图。",
      "motion": "进入首页时展览海报直接出现，无虚构加载百分比。；滚动超过大字标+130px／返回时50px红色紧凑导航120ms从上方进入，回到顶部80ms退出恢复大字标。；手机打开／反向关闭菜单时导航330ms cubic-bezier(.47,0,.745,.715)横向进出。；滚动到页面深处／页尾时回顶150ms显隐，接近页尾从fixed转为footer内定位。",
      "coherence": "统一机构红、图像比例、标题/日期关系使不同作品属于同一艺术馆，艺术图片保留表达自由。"
    },
    "themeBehavior": {
      "mode": "fixed",
      "default": "light",
      "control": "原站白底、红色机构识别与原色艺术海报固定，无主题开关。",
      "designReason": "红色持续标识导览，艺术品由自己的色彩表达。"
    },
    "soundBehavior": {
      "kind": "none",
      "control": "当前展览首页无独立BGM或有声开场。",
      "interactionRole": "依赖艺术海报与新闻节奏，不添加与展览无关的音轨。"
    },
    "capturedAt": "2026-10-07"
  },
  {
    "id": "fuji-rock",
    "order": 25,
    "title": "Fuji Rock：现场照片与节日导览",
    "subtitle": "日本音乐节官网 · 2026版已结束活动快照",
    "category": "艺术/文化",
    "country": "日本",
    "edition": "日本版 / 2026活动快照",
    "implementation": "reference-study",
    "referenceUrl": "https://www.fujirockfestival.com/",
    "referencePreview": "previews/cases/fuji-rock-reference.jpg",
    "fidelity": "demos/cases/fuji-rock/fidelity.md",
    "assetManifest": "demos/cases/fuji-rock/assets-manifest.json",
    "tags": [
      "日本",
      "艺术",
      "音乐节",
      "真实还原",
      "2026快照",
      "照片轮播",
      "山形标识",
      "大菜单"
    ],
    "summary": "橙色固定栏与白色窄字标把现场照片串成同一音乐节；山形菜单、蓝色票据、圆角图标导览让情绪与实用信息并行。",
    "accent": "#e64219",
    "background": "#f2efeb",
    "principles": [
      "现场入口、人群与演出照片直接传达真实节日环境，不用虚构插画替代。",
      "窄高白字Logo与短日期在68px橙色顶栏形成紧凑的常驻识别。",
      "右上山形菜单和右侧蓝色竖票据占据稳定位置，照片更换也能找到导航。",
      "浅灰圆角实用导航与米色大菜单重复图标/链接关系，把复杂的现场资讯分层。"
    ],
    "productFocus": "真实苗场音乐节现场感、演出/时间表、地点/饮食/FAQ以及新闻归档。2026年活动已在7月24–26日结束，本地明确标为2026版快照。",
    "interaction": [
      "素材载入完成：32px橙色旋转标记退出，遮层与主图1200ms线性淡化。 让真实现场图准备完毕后平稳进入。",
      "打开／关闭山形菜单：菜单400ms scale(.88)+rotate3d(.5,0,0,1rad)进出，页面背景1秒淡到.25。 放大导览层级，同时保留现场的空间背景。",
      "照片或Featured自动／手动切换：照片3600ms间隔、800ms淡化；Featured600ms中心循环，3600ms自动，手机露出两侧邻项。 照片传递现场氛围，中心轨道突出活动主题且提示还有内容。",
      "超过Pickup后向上／向下滚动：导览条固定后按方向显隐；语言菜单400ms展开并在离开时收起。 长页浏览随时找回实用入口，同时减少遮挡。"
    ],
    "theme": "热烈橙色标识、蓝色操作色、山形图标、真实户外照片、米色圆角面板与清晰信息模块共同形成户外音乐节语言。",
    "constraints": [
      "明确2026版快照学习，7月24–26日活动已结束；保留购票入口只是官网参考，不能当可购买当前活动。",
      "使用真实Logo/山形标识/现场照片，品牌商标与摄影权利归SMASH等原权利人。",
      "手机使用官方1200×1200图片，不单纯裁切1400×700桌面照片。",
      "原站20张照片/6条特集，本地3张/4条；照片保持自动淡化且可暂停，Featured为手动横滚。",
      "没有取得独立官网BGM；本地不自动加载视频/音频，官方回顾需明确用户动作。",
      "本地不复制原站交易、广告追踪、自动加载遮罩和完整演出数据库。",
      "20张照片和6条Featured未全部复制，系统字体近似Poppins/日文原字体；交易与演出数据库使用官方外链。"
    ],
    "useCases": [
      "音乐节与户外活动",
      "照片主导的文化节",
      "需要大菜单管理多类现场资讯的活动"
    ],
    "avoid": [
      "用全宽营销文案盖住真实现场",
      "未标日期的过期售票CTA",
      "自画近似山Logo冒充官方标识"
    ],
    "tokens": {
      "palette": [
        "#e64219",
        "#0075ba",
        "#f2efeb",
        "#e3dbd4",
        "#011a38"
      ],
      "type": "官方窄高字标作为图片；网页用粗无衬线英文栏目与小日文说明，系统字体近似原站Poppins/日文字体",
      "layout": "固定68px橙header → 视口现场照片/右票据 → 圆角实用导航 → Featured横滚 → 米色News列表 → Content",
      "motion": "32px加载标记与1200ms退场；照片3600/800ms淡化；菜单400ms三维缩放与背景1秒.25；Featured600ms中心无缝循环、3600ms自动；Pickup按方向回显。"
    },
    "sources": [
      {
        "title": "Fuji Rock 官方首页",
        "url": "https://www.fujirockfestival.com/",
        "type": "实例",
        "note": "2026-10-07：2026首页橙色栏、山菜单、现场照片、蓝色Featured和米色新闻。"
      },
      {
        "title": "Fuji Rock 2026 官方结束报告",
        "url": "https://www.fujirockfestival.com/news/detail/fb6a67473bc9938",
        "type": "实例",
        "note": "2026.07.28官方结束报告；7月24–26日活动已结束，页面是年份快照。"
      },
      {
        "title": "IBM Design Language：Layout overview",
        "url": "https://www.ibm.com/design/language/layout/overview/",
        "type": "理论",
        "note": "关系、比例、重复和层级解释照片与导览的职责，不表示主办方采用IBM规范。"
      },
      {
        "title": "W3C WAI：Carousels Tutorial",
        "url": "https://www.w3.org/WAI/tutorials/carousels/",
        "type": "规范",
        "note": "自动轮播应有暂停、手动、键盘和当前状态；本地保留3.6秒轮换并提供停止。"
      },
      {
        "title": "官方公开交互脚本 · 2026-10-07",
        "url": "https://www.fujirockfestival.com/2026/assets/js/top-2026.js",
        "type": "实例",
        "note": "主图3600ms/800ms；Featured600ms中心循环/3600ms自动；common.js与CSS提供加载1200ms、菜单400ms三维变换及背景1秒.25。"
      }
    ],
    "prompt": "为[项目]制作基于Fuji Rock：现场照片与节日导览的局部交互学习页面。参考https://www.fujirockfestival.com/，观察2026-10-07，固定这一次采集的语言/年度页面，完成后作为单一归档快照留存；后续原站变化不改变此案例。不能只借用品牌色后套通用营销模板。配色：#e64219橙贯穿header/日期，#0075ba蓝用于导览/Featured/票据，#f2efeb与#e3dbd4使菜单层级清晰。 字体：真实窄高Logo、短粗日期、大英文栏目、较小日文链接；不引入原站未提供的花体字。 版式：68px固定顶栏、右上100px山菜单、满视口照片、右竖票据；后续横向Featured与新闻列表避免同构。 图像：真实官方现场照片的desktop/mobile版本、Featured宣传图、Logo和导航图标全部本地化。 形状：山Logo、右下圆角菜单、蓝竖票据、圆点、圆角导航/大菜单重复形成可识别操作语法。 层级：日期地点保持常驻，照片先传递场景，实用入口其次，Featured与按日期排列新闻承担浏览与回看。 协调：官方现场的蓝橙布置与网站橙蓝识别呼应，灰米面板降密度；不同照片共享导航与控件位置。 关键流程：素材载入完成：32px橙色旋转标记退出，遮层与主图1200ms线性淡化。 让真实现场图准备完毕后平稳进入。 打开／关闭山形菜单：菜单400ms scale(.88)+rotate3d(.5,0,0,1rad)进出，页面背景1秒淡到.25。 放大导览层级，同时保留现场的空间背景。 照片或Featured自动／手动切换：照片3600ms间隔、800ms淡化；Featured600ms中心循环，3600ms自动，手机露出两侧邻项。 照片传递现场氛围，中心轨道突出活动主题且提示还有内容。 超过Pickup后向上／向下滚动：导览条固定后按方向显隐；语言菜单400ms展开并在离开时收起。 长页浏览随时找回实用入口，同时减少遮挡。 主题：原站无深浅色开关；橙蓝导航、米色内容和原色现场照片保持固定。 导览色贯穿照片更换与新闻，强行反色会改变节日身份。 声音：Aftermovie链接到官方YouTube；没有独立BGM开关。 音乐现场由影像承载，用户主动进入影片听声音；首页照片浏览保持安静。 使用真实本地素材与正确比例，记录URL、作者、尺寸、hash和处理方式；无追踪。保留原站的章节交接、出入方向和指针反馈；桌面与390px手机分别实测。减少动态使用即时状态并保留全部内容；键盘与焦点可操作。完整数据库、账号与交易用真实官方外链。所有近似和未验证项在fidelity.md明确，不能用静态截图宣称全流程已还原。",
    "negativePrompt": "不使用共同SaaS双栏hero模板，不嵌入整站iframe，不伪造官网功能或实时展期，不复制统计/交易脚本，不使用CDN和远程图像运行时依赖。",
    "demo": "demos/cases/fuji-rock/index.html",
    "preview": "previews/cases/fuji-rock.jpg",
    "research": "docs/cases/fuji-rock.md",
    "exercise": "把现场照片切换为不同地点，观察橙色header/蓝票据是否仍保持识别；再打开大菜单检验每层链接是否能被键盘找到。",
    "composition": {
      "color": "#e64219橙贯穿header/日期，#0075ba蓝用于导览/Featured/票据，#f2efeb与#e3dbd4使菜单层级清晰。",
      "typography": "真实窄高Logo、短粗日期、大英文栏目、较小日文链接；不引入原站未提供的花体字。",
      "layout": "68px固定顶栏、右上100px山菜单、满视口照片、右竖票据；后续横向Featured与新闻列表避免同构。",
      "imagery": "真实官方现场照片的desktop/mobile版本、Featured宣传图、Logo和导航图标全部本地化。",
      "shape": "山Logo、右下圆角菜单、蓝竖票据、圆点、圆角导航/大菜单重复形成可识别操作语法。",
      "hierarchy": "日期地点保持常驻，照片先传递场景，实用入口其次，Featured与按日期排列新闻承担浏览与回看。",
      "motion": "素材载入完成时32px橙色旋转标记退出，遮层与主图1200ms线性淡化。；打开／关闭山形菜单时菜单400ms scale(.88)+rotate3d(.5,0,0,1rad)进出，页面背景1秒淡到.25。；照片或Featured自动／手动切换时照片3600ms间隔、800ms淡化；Featured600ms中心循环，3600ms自动，手机露出两侧邻项。；超过Pickup后向上／向下滚动时导览条固定后按方向显隐；语言菜单400ms展开并在离开时收起。",
      "coherence": "官方现场的蓝橙布置与网站橙蓝识别呼应，灰米面板降密度；不同照片共享导航与控件位置。"
    },
    "themeBehavior": {
      "mode": "fixed",
      "default": "light",
      "control": "原站无深浅色开关；橙蓝导航、米色内容和原色现场照片保持固定。",
      "designReason": "导览色贯穿照片更换与新闻，强行反色会改变节日身份。"
    },
    "soundBehavior": {
      "kind": "external",
      "control": "Aftermovie链接到官方YouTube；没有独立BGM开关。",
      "interactionRole": "音乐现场由影像承载，用户主动进入影片听声音；首页照片浏览保持安静。"
    },
    "capturedAt": "2026-10-07"
  },
  {
    "id": "rijksmuseum-art",
    "order": 26,
    "title": "Rijksmuseum · 全幅摄影与巨大字标",
    "subtitle": "Dutch masterpieces, immersive museum visit",
    "category": "艺术/文化",
    "country": "荷兰",
    "tags": [
      "荷兰",
      "艺术馆",
      "全幅摄影",
      "超大字标",
      "橙色票务",
      "Rijksmuseum"
    ],
    "summary": "实访英语官方首页，复现夜巡观展全屏摄影、巨幅RIJKS MUSEUM白色字标、底缘小标题以及连续摄影专题。",
    "accent": "#db5526",
    "background": "#242424",
    "principles": [
      "以作品和观众的真实关系主导首屏，主标题留在底缘。",
      "品牌SVG跨越几乎整幅宽度；图像仍是内容主体。",
      "橙色矩形票务按钮在摄影上有明确优先级。",
      "家庭月全屏摄影后接两栏展览预告，图文密度随内容改变。"
    ],
    "productFocus": "参观体验、馆藏名作与购票入口。摄影提供作品尺度和到访情境，底缘文字补充时间/活动条件。",
    "interaction": [
      "进入与连续上下浏览：巨大的官方字标覆盖全幅照片，浏览采用原生连续滚动。 图像先传递艺术馆的世界，后续展览逐渐替换观看内容。",
      "打开／关闭菜单：全屏菜单500ms线性淡入淡出，图像与分列链接同时建立目的地。 给导航独立的视觉场景，保持品牌和空间关系。",
      "悬停票务／展览与语言：橙色动作颜色反馈、链接下划线与语言列表。 行动在原色摄影上依然清晰。"
    ],
    "theme": "深色摄影、白色窄体品牌字体、巨大字标与橙色矩形CTA。",
    "constraints": [
      "每个摄影专题保持约100vh，手机使用100svh避免地址栏引起布局跳动。",
      "不要把摄影裁成圆角卡片，也不要给首屏添加摘要卡片。",
      "字标使用完整官方SVG，标题与正文使用两字重Rijksmuseum字体。",
      "照片底部加局部黑色渐变支撑文字对比；不对整张照片做滤镜风格化。",
      "减弱动态模式仍能看到全部内容，滚动保持浏览器原生行为。",
      "保留私人学习署名与真实票务跳转，不模拟付款或假装门票已预订。",
      "展览局部介绍与搜索dialog为本地练习补充；完整藏品检索、预约与会员不复制。"
    ],
    "useCases": [
      "艺术馆参观入口",
      "摄影主导的场所展示",
      "大型艺术节入口"
    ],
    "avoid": [
      "摄影不足的抽象装饰页面",
      "信息必须首屏密集呈现的后台"
    ],
    "tokens": {
      "palette": [
        "#242424",
        "#ffffff",
        "#db5526"
      ],
      "type": "官方Rijksmuseum Normal/Bold；桌面正文17px、短标题约23px。",
      "layout": "100vh全幅摄影 → 100vh家庭月 → 两列整屏摄影 → 深色实用信息。",
      "motion": "自然滚动满屏摄影；全屏菜单打开500ms linear淡入，关闭直接隐藏；搜索/预览为本地补充。减少动态取消过渡，主视觉无自动循环。"
    },
    "sources": [
      {
        "title": "Rijksmuseum official English homepage",
        "url": "https://www.rijksmuseum.nl/en",
        "type": "实例",
        "note": "2026-10-07：英语首页《夜巡》观众摄影、巨幅字标、家庭月、两列专题与全屏菜单。"
      },
      {
        "title": "Rijksmuseum Accessibility Statement",
        "url": "https://www.rijksmuseum.nl/en/visit/accessibility/accessibility-statement",
        "type": "规范",
        "note": "网站服务参观/票务和在线收藏；官方以WCAG2.2 AA为目标并列举未达项，不能称全面合规。"
      },
      {
        "title": "W3C WAI Disclosure Pattern",
        "url": "https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/",
        "type": "规范",
        "note": "展开内容与aria-expanded的实现参考；本地菜单及dialog有独立语义，不证明原站采用此规范。"
      }
    ],
    "prompt": "为[项目]制作基于Rijksmuseum · 全幅摄影与巨大字标的局部交互学习页面。参考https://www.rijksmuseum.nl/en，观察2026-10-07，固定这一次采集的语言/年度页面，完成后作为单一归档快照留存；后续原站变化不改变此案例。不能只借用品牌色后套通用营销模板。配色：照片本身提供丰富色彩，白色文字和橙色票务是UI的少数稳定颜色。 字体：巨大完整SVG字标与小尺度大写短标题形成尺度差，品牌正文保持窄体节奏。 版式：导航上覆摄影；首屏100vh，底缘左文右合作方；手机隐藏次要导航与合作方。 图像：夜巡观众、家庭月、工作室与纺织照片均来自官方首页公开URL。 形状：矩形票务、方角专题、细小白底状态标记；不泛化为通用圆角卡片。 层级：品牌字标建立识别，作品摄影建立情境，购票按钮和底缘标题引导下一步。 协调：统一摄影铺满、底缘文字与品牌字形；两栏预告改变内容节奏而非重复组件。 关键流程：进入与连续上下浏览：巨大的官方字标覆盖全幅照片，浏览采用原生连续滚动。 图像先传递艺术馆的世界，后续展览逐渐替换观看内容。 打开／关闭菜单：全屏菜单500ms线性淡入淡出，图像与分列链接同时建立目的地。 给导航独立的视觉场景，保持品牌和空间关系。 悬停票务／展览与语言：橙色动作颜色反馈、链接下划线与语言列表。 行动在原色摄影上依然清晰。 主题：全幅照片上白色字标、深色页尾为固定摄影主题，没有独立深浅模式。 保持照片亮度与白字对比；橙色票务在不同图像上持续突出。 声音：当前入口没有独立BGM或音频按钮。 大字标、连续摄影和菜单覆盖形成沉浸感，声音并非这版首页的机制。 使用真实本地素材与正确比例，记录URL、作者、尺寸、hash和处理方式；无追踪。保留原站的章节交接、出入方向和指针反馈；桌面与390px手机分别实测。减少动态使用即时状态并保留全部内容；键盘与焦点可操作。完整数据库、账号与交易用真实官方外链。所有近似和未验证项在fidelity.md明确，不能用静态截图宣称全流程已还原。",
    "negativePrompt": "不要虚构品牌，不用抽象blob代替夜巡摄影，不把每一节包装成圆角卡片，不用通用SaaS居中巨字模板。",
    "demo": "demos/cases/rijksmuseum-art/index.html",
    "preview": "previews/cases/rijksmuseum-art.jpg",
    "referencePreview": "previews/cases/rijksmuseum-art-reference.jpg",
    "research": "docs/cases/rijksmuseum-art.md",
    "exercise": "替换一组经过授权的场所摄影，保留文字与图像的职责分工；检查手机裁切是否保住人物与作品。",
    "composition": {
      "color": "照片本身提供丰富色彩，白色文字和橙色票务是UI的少数稳定颜色。",
      "typography": "巨大完整SVG字标与小尺度大写短标题形成尺度差，品牌正文保持窄体节奏。",
      "layout": "导航上覆摄影；首屏100vh，底缘左文右合作方；手机隐藏次要导航与合作方。",
      "imagery": "夜巡观众、家庭月、工作室与纺织照片均来自官方首页公开URL。",
      "shape": "矩形票务、方角专题、细小白底状态标记；不泛化为通用圆角卡片。",
      "hierarchy": "品牌字标建立识别，作品摄影建立情境，购票按钮和底缘标题引导下一步。",
      "motion": "进入与连续上下浏览时巨大的官方字标覆盖全幅照片，浏览采用原生连续滚动。；打开／关闭菜单时全屏菜单500ms线性淡入淡出，图像与分列链接同时建立目的地。；悬停票务／展览与语言时橙色动作颜色反馈、链接下划线与语言列表。",
      "coherence": "统一摄影铺满、底缘文字与品牌字形；两栏预告改变内容节奏而非重复组件。"
    },
    "referenceUrl": "https://www.rijksmuseum.nl/en",
    "implementation": "reference-study",
    "fidelity": "demos/cases/rijksmuseum-art/fidelity.md",
    "assetManifest": "demos/cases/rijksmuseum-art/assets-manifest.json",
    "edition": "2026-10-07；英语公开官网局部",
    "themeBehavior": {
      "mode": "fixed",
      "default": "dark",
      "control": "全幅照片上白色字标、深色页尾为固定摄影主题，没有独立深浅模式。",
      "designReason": "保持照片亮度与白字对比；橙色票务在不同图像上持续突出。"
    },
    "soundBehavior": {
      "kind": "none",
      "control": "当前入口没有独立BGM或音频按钮。",
      "interactionRole": "大字标、连续摄影和菜单覆盖形成沉浸感，声音并非这版首页的机制。"
    },
    "capturedAt": "2026-10-07"
  },
  {
    "id": "met-museum",
    "order": 27,
    "title": "The Met · 编辑式展览与馆藏陈列",
    "subtitle": "A museum homepage as an editorial exhibition shelf",
    "category": "艺术/文化",
    "country": "美国",
    "tags": [
      "美国",
      "艺术馆",
      "衬线字体",
      "编辑排版",
      "展览海报",
      "The Met"
    ],
    "summary": "官方建筑摄影开场，Austin衬线欢迎区与四列参观信息接续；展览海报和馆藏以原生横架展开。",
    "accent": "#e4002b",
    "background": "#ffffff",
    "principles": [
      "官方建筑摄影先给实体空间与到访氛围，再在独立白底区域提供欢迎语与行动。",
      "Austin衬线大标题承载文化语气，Inter无衬线负责操作和实用信息。",
      "参观成本、交通、导览和开放状态并列而不盖在照片上。",
      "海报本身已含展览视觉，外围保持简洁、方角、图下标签。"
    ],
    "productFocus": "到访纽约实体馆、正在展览与代表馆藏。先解决实用参观问题，再让展览海报和作品自然展开选择。",
    "interaction": [
      "进入页面：官方建筑静图与Met标志直接出现，无额外欢迎遮层或背景音乐。",
      "上下浏览：欢迎与到访信息、展览横轨、馆藏和会员按原生阅读节奏组织；不新增全屏转场。",
      "横向浏览展览：原生水平溢出，scroll-snap:none，前后按钮与触摸可操作。",
      "打开导航：Visit等目的地立即展开；键盘焦点可操作，局部搜索与作品dialog为本地练习补充。"
    ],
    "theme": "白底、Met红与黑灰编辑排版；官方建筑摄影、Austin衬线标题和方角展览海报形成文化机构语气。",
    "constraints": [
      "标题用官方Austin Medium，操作文用官方Inter字体；不可用夸张科技字体替代。",
      "四列实用信息在手机堆叠；展览依靠横向overflow，不让整个页面溢出。",
      "展览海报保留原视觉，不在图片上重复绘制标题或大渐变遮罩。",
      "日期和闭馆信息标注观察日，不由当前机器日期制造未核验开放状态。",
      "官方开放许可只覆盖带OA条件的藏品资源，不涵盖全部品牌、字体与主页摄影。",
      "以2026-10-07采集的https://www.metmuseum.org/en首页为单一归档对象；完整版馆藏、预约、会员与捐赠服务不复制。"
    ],
    "useCases": [
      "大型博物馆门户",
      "展览信息目录",
      "出版与编辑型机构首页"
    ],
    "avoid": [
      "缺少真实作品的纯视觉着陆页",
      "需要自动滚动制造戏剧效果的产品页"
    ],
    "tokens": {
      "palette": [
        "#ffffff",
        "#292929",
        "#606060",
        "#e4002b"
      ],
      "type": "官方Austin Medium用于欢迎标题；官方Inter Latin用于正文与按钮。",
      "layout": "建筑摄影 → 白底大标题双CTA → 四列参观信息 → 原生展览/馆藏横架 → 会员区",
      "motion": "原生连续阅读与水平展览轨道，导航即时展开；本地详情／搜索dialog有明确范围。无背景音乐或强制章节转场。"
    },
    "sources": [
      {
        "title": "The Met official English homepage",
        "url": "https://www.metmuseum.org/en",
        "type": "实例",
        "note": "2026-10-07采集英语首页：建筑静图、白底欢迎区、参观信息与原生展览横架。"
      },
      {
        "title": "The Met Image and Data Resources",
        "url": "https://www.metmuseum.org/policies/image-resources",
        "type": "规范",
        "note": "Open Access区分公众领域与受限制作品；本地OA藏品资源不扩大为海报、字体、品牌及首页影像的CC0许可。"
      },
      {
        "title": "W3C WAI Disclosure Pattern",
        "url": "https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/",
        "type": "规范",
        "note": "内容显隐按钮与状态语义的实现参考，不表示机构采用该理论或已全面合规。"
      }
    ],
    "prompt": "为[博物馆]制作以2026-10-07采集的https://www.metmuseum.org/en为唯一参考的局部交互demo。使用官方Met红色标志、建筑静图、Austin大标题、白色正文与Inter导航，构成欢迎/到访信息、展览横轨、馆藏和会员顺序。保留真实作品图片比例和署名；原生水平轨道scroll-snap:none，导航立即展开，按钮与键盘有可读反馈。不新增原站没有的加载、全屏转场、视频或音乐。手机重排、触摸横滚，减少动态保留全部内容。浅色固定主题与作品原色一致；本地搜索和作品dialog明确为练习补充。交易/预约回官方链接。素材本地化并记录来源、尺寸、hash、处理与归属。归档这次采集，不维护官网后来变化。",
    "negativePrompt": "不要深色科技SaaS模板，不用统一圆角卡片阵列，不虚构藏品或展期，不自动轮播，不把Open Access许可扩大到品牌资产。",
    "demo": "demos/cases/met-museum/index.html",
    "preview": "previews/cases/met-museum.jpg",
    "referencePreview": "previews/cases/met-museum-reference.jpg",
    "research": "docs/cases/met-museum.md",
    "exercise": "用另一组真实授权展览替换四张海报，仍让每张海报保有自身视觉；检测信息区在手机是否易读。",
    "composition": {
      "color": "白底黑灰字和红色操作层，图像保持展览自己的颜色。",
      "typography": "Austin衬线大标题与Inter目录型小文本产生编辑层级。",
      "layout": "宽幅建筑摄影约725px高；欢迎区左右分工，横架保持白底、图下题注。",
      "imagery": "官方建筑摄影、Sanity CDN展览海报与符合条件的Met API藏品图，本地保留比例、署名与原色。",
      "shape": "方角海报与细边CTA，会员区域仅一个轻边框圆角区域。",
      "hierarchy": "建筑图像呈现实体空间，欢迎区提供行动，四列信息减轻到访决策，展览海报与馆藏引导浏览。",
      "motion": "原生连续阅读与水平展览轨道，导航即时展开；本地详情／搜索dialog有明确范围。无背景音乐或强制章节转场。",
      "coherence": "字形分工、Met红操作与白底图下文字一致，馆藏照片与海报使用不同图像比例。"
    },
    "referenceUrl": "https://www.metmuseum.org/en",
    "implementation": "reference-study",
    "fidelity": "demos/cases/met-museum/fidelity.md",
    "assetManifest": "demos/cases/met-museum/assets-manifest.json",
    "edition": "2026-10-07；英语公开官网局部",
    "themeBehavior": {
      "mode": "fixed",
      "default": "light",
      "control": "原站浅色正文、红色机构标志与大图固定，没有首页深浅开关。",
      "designReason": "保留艺术作品原色、编辑字体与Met红标识的对比。"
    },
    "soundBehavior": {
      "kind": "none",
      "control": "采集页面无音频播放器或独立BGM开关。",
      "interactionRole": "建筑与艺术图像建立机构氛围，信息展开服务到访任务，不增加无来源的声音。"
    },
    "capturedAt": "2026-10-07"
  },
  {
    "id": "philharmonie-music",
    "order": 28,
    "title": "巴黎爱乐厅 · 音乐展与音乐会详情",
    "subtitle": "Video Games & Music + Carte blanche à George Benjamin",
    "category": "艺术/文化",
    "country": "法国",
    "tags": [
      "法国",
      "音乐厅",
      "音乐展",
      "音乐会",
      "活动详情",
      "侧栏票务"
    ],
    "summary": "法语活动详情以蓝色主视觉、中轴品牌和上浮票务侧栏呈现音乐展；顺序现场摄影与George Benjamin音乐会人物滑轨承担不同内容。",
    "accent": "#be244f",
    "background": "#f0f0f0",
    "principles": [
      "活动主视觉与日期先建立情境，票务侧栏与介绍承担不同任务。",
      "中心下垂品牌标识贯穿两层导航，区别于左角产品Logo。",
      "蓝色图像渐变保持白色标题可读，粉红/酒红胶囊承担预约操作。",
      "展览以现场摄影证明体验，音乐会以人物、阵容和节目单提供不同内容。"
    ],
    "productFocus": "音乐展的互动体验和访问时间，以及音乐会的日期、演出阵容与节目。右侧票务区域支持快速查阅时间/价格，正文保留观展体验和真实图片。",
    "interaction": [
      "浏览展览／音乐会详情：原生长页与桌面sticky票务，小屏票务回文档流。 活动内容与来访决定并行，小屏避免固定面板遮挡正文。",
      "打开主菜单和类别：浅灰全宽导航立即出现，类别切换为目的地列表；小屏菜单在页面流中展开。 机构多种活动保留层级，交互保持直接。",
      "切换音乐会摄影：三幅署名摄影500ms横向轨道，克隆边界无缝循环；前后与暂停／触摸可操作。 用演出者肖像讲述阵容，邻接图像的运动维持观看连续。",
      "展开Horaires／Tarifs／Programme：信息即时展开，声乐／乐器阵容以文字分段。 不离开当前详情即可完成到访和节目判断。",
      "打开Playlist：转到官方fanlink，选择个人音乐平台。 音乐是展览主题的延伸与回看媒介。"
    ],
    "theme": "海军蓝、白色内容面板、酒红票务胶囊和官方Philharmonique字形，活动主视觉提供游戏色彩。",
    "constraints": [
      "使用官方Video Games & Music主图、展览摄影、George Benjamin摄影与sprite品牌标识。",
      "桌面主图625px高，左正文约2/3，右侧白色16px圆角票务面板跨越主图和内容边界。",
      "手机导航精简，票务面板进入正常流优先显示，不粘在窄屏覆盖正文。",
      "音乐会为2026.10.23 20h00的George Benjamin场次，日期/阵容/节目按2026-10-07官方快照。",
      "原站视频受第三方cookie控制，本地不嵌入YouTube或追踪脚本。",
      "自然滚动；展览摄影静态顺序阅读，音乐会滑轨可暂停，减少动态仅手动即时切换。",
      "展览与音乐会合并为局部学习区域，原独立详情长度不同；第三方视频、账号与售票后端不复制。Ayano Kamei仍是官网图轨素材，但当前节目单钢琴为Chisato Taniguchi，两者不可混为当前阵容。"
    ],
    "useCases": [
      "文化活动详情",
      "音乐会/音乐展门户",
      "有丰富节目单的票务介绍"
    ],
    "avoid": [
      "需要仿造售票结果的演示",
      "把展览和音乐会内容抽象成同样卡片的页面"
    ],
    "tokens": {
      "palette": [
        "#001b3b",
        "#ffffff",
        "#f0f0f0",
        "#be244f",
        "#fdafe3"
      ],
      "type": "大写标题使用官方 Philharmonique Regular/Bold；正文使用 Arial，原站 Source Sans Pro 未下载。Philharmonique 缺小写字形，不用于正文。",
      "layout": "双层导航中轴字标 → 蓝色横幅 → 2:1介绍/上浮sticky票务 → 当前音乐会 → 交通信息。",
      "motion": "展览摄影为顺序静图；音乐会三人摄影500ms横轨对应观察时长，ease/6秒周期为本地近似。侧栏native details、自然滚动，减少动态仅手动即时切换。"
    },
    "sources": [
      {
        "title": "Video Games & Music exhibition — official detail",
        "url": "https://philharmoniedeparis.fr/fr/activite/exposition/28822-video-games-music",
        "type": "实例",
        "note": "2026-10-07：展览日期2026.04.02–11.01、蓝色主图、顺序现场照片、票务时间/价格折叠。"
      },
      {
        "title": "Philharmonie saison 26/27",
        "url": "https://philharmoniedeparis.fr/fr/programmation/saison-26-27",
        "type": "实例",
        "note": "2026-10-07官方26/27季节目，用于定位具体音乐会，不将所有场次视为未结束事件。"
      },
      {
        "title": "Carte blanche à George Benjamin — official detail",
        "url": "https://philharmoniedeparis.fr/fr/activite/concert/29485-carte-blanche-george-benjamin",
        "type": "实例",
        "note": "2026-10-07：George Benjamin场次2026.10.23 20h00，四部节目、阵容与三名人物摄影；500ms横轨可观察，自动周期未取得。"
      },
      {
        "title": "W3C WAI Disclosure Pattern",
        "url": "https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/",
        "type": "规范",
        "note": "原生details与展开状态的实现参考，不证明场馆遵循整个APG或已全面合规。"
      }
    ],
    "prompt": "为[项目]制作基于巴黎爱乐厅 · 音乐展与音乐会详情的局部交互学习页面。参考https://philharmoniedeparis.fr/fr/activite/exposition/28822-video-games-music，观察2026-10-07，固定这一次采集的语言/年度页面，完成后作为单一归档快照留存；后续原站变化不改变此案例。不能只借用品牌色后套通用营销模板。配色：官方CSS核验海军蓝#001b3b、白色面板、#be244f票务和#fdafe3支持入口。 字体：官方Philharmonique标题大写，正文保持分段；原站部分正文Source Sans Pro，本地该部分有字体差异。 版式：主视觉左下活动名，右侧票务面板上浮；长正文与侧栏分工，手机票务回到文档流。 图像：官方游戏手柄字母CG、Joachim Bertrand两张展览现场图，以及Matthew Lloyd、Capucine DeChocqueuse、Franck Ferville署名的三位音乐会艺术家摄影。 形状：品牌标识下垂矩形、16px圆角内容/票务块、长胶囊按钮；非所有内容统一卡片。 层级：大活动名和日期识别主题，预约按钮和折叠时间/价格解决到访问题，照片和节目单提供内容深度。 协调：统一中轴品牌与蓝色基础，展览用互动现场图、音乐会用阵容/节目单，跨内容类型保持不同表达。 关键流程：浏览展览／音乐会详情：原生长页与桌面sticky票务，小屏票务回文档流。 活动内容与来访决定并行，小屏避免固定面板遮挡正文。 打开主菜单和类别：浅灰全宽导航立即出现，类别切换为目的地列表；小屏菜单在页面流中展开。 机构多种活动保留层级，交互保持直接。 切换音乐会摄影：三幅署名摄影500ms横向轨道，克隆边界无缝循环；前后与暂停／触摸可操作。 用演出者肖像讲述阵容，邻接图像的运动维持观看连续。 展开Horaires／Tarifs／Programme：信息即时展开，声乐／乐器阵容以文字分段。 不离开当前详情即可完成到访和节目判断。 打开Playlist：转到官方fanlink，选择个人音乐平台。 音乐是展览主题的延伸与回看媒介。 主题：深蓝文字、浅灰正文和白色票务面板固定，无深浅模式开关。 音乐厅品牌、票务酒红和展览图像协调，反色可能削弱实际CG视觉。 声音：Playlist按钮链接真实官方音乐平台合集，用户主动聆听；首页没有独立BGM。 曲目把展览中的游戏音乐延续到网站外的听觉体验；不将图片轮播说成音频播放。 使用真实本地素材与正确比例，记录URL、作者、尺寸、hash和处理方式；无追踪。保留原站的章节交接、出入方向和指针反馈；桌面与390px手机分别实测。减少动态使用即时状态并保留全部内容；键盘与焦点可操作。完整数据库、账号与交易用真实官方外链。所有近似和未验证项在fidelity.md明确，不能用静态截图宣称全流程已还原。",
    "negativePrompt": "不要把音乐展做成像素游戏伪官网，不捏造日期或购票成功，不套相同软件产品卡片，不把展览顺序摄影改成轮播。",
    "demo": "demos/cases/philharmonie-music/index.html",
    "preview": "previews/cases/philharmonie-music.jpg",
    "referencePreview": "previews/cases/philharmonie-music-reference.jpg",
    "research": "docs/cases/philharmonie-music.md",
    "exercise": "再选择一场经过官方核验的音乐会，对照节目/阵容结构，保留展览与音乐会信息表达差异。",
    "composition": {
      "color": "官方CSS核验海军蓝#001b3b、白色面板、#be244f票务和#fdafe3支持入口。",
      "typography": "官方Philharmonique标题大写，正文保持分段；原站部分正文Source Sans Pro，本地该部分有字体差异。",
      "layout": "主视觉左下活动名，右侧票务面板上浮；长正文与侧栏分工，手机票务回到文档流。",
      "imagery": "官方游戏手柄字母CG、Joachim Bertrand两张展览现场图，以及Matthew Lloyd、Capucine DeChocqueuse、Franck Ferville署名的三位音乐会艺术家摄影。",
      "shape": "品牌标识下垂矩形、16px圆角内容/票务块、长胶囊按钮；非所有内容统一卡片。",
      "hierarchy": "大活动名和日期识别主题，预约按钮和折叠时间/价格解决到访问题，照片和节目单提供内容深度。",
      "motion": "浏览展览／音乐会详情时原生长页与桌面sticky票务，小屏票务回文档流。；打开主菜单和类别时浅灰全宽导航立即出现，类别切换为目的地列表；小屏菜单在页面流中展开。；切换音乐会摄影时三幅署名摄影500ms横向轨道，克隆边界无缝循环；前后与暂停／触摸可操作。；展开Horaires／Tarifs／Programme时信息即时展开，声乐／乐器阵容以文字分段。；打开Playlist时转到官方fanlink，选择个人音乐平台。",
      "coherence": "统一中轴品牌与蓝色基础，展览用互动现场图、音乐会用阵容/节目单，跨内容类型保持不同表达。"
    },
    "referenceUrl": "https://philharmoniedeparis.fr/fr/activite/exposition/28822-video-games-music",
    "implementation": "reference-study",
    "fidelity": "demos/cases/philharmonie-music/fidelity.md",
    "assetManifest": "demos/cases/philharmonie-music/assets-manifest.json",
    "edition": "2026-10-07；法语展览与音乐会详情",
    "referencePreviewNote": "参考截图的显示配色不作为品牌依据；本地海军蓝、白色面板、票务酒红等依据官方CSS。",
    "themeBehavior": {
      "mode": "fixed",
      "default": "light",
      "control": "深蓝文字、浅灰正文和白色票务面板固定，无深浅模式开关。",
      "designReason": "音乐厅品牌、票务酒红和展览图像协调，反色可能削弱实际CG视觉。"
    },
    "soundBehavior": {
      "kind": "external",
      "control": "Playlist按钮链接真实官方音乐平台合集，用户主动聆听；首页没有独立BGM。",
      "interactionRole": "曲目把展览中的游戏音乐延续到网站外的听觉体验；不将图片轮播说成音频播放。"
    },
    "capturedAt": "2026-10-07"
  },
  {
    "id": "google-material",
    "order": 29,
    "title": "Google Material：表现力与组件秩序",
    "subtitle": "Material Design 3 真实首页 · 2026 I/O 与 M3 Expressive",
    "category": "产品",
    "country": "美国",
    "edition": "国际英文版 · 2026-10-07快照",
    "implementation": "reference-study",
    "referenceUrl": "https://m3.material.io/",
    "referencePreview": "previews/cases/google-material-reference.jpg",
    "fidelity": "demos/cases/google-material/fidelity.md",
    "assetManifest": "demos/cases/google-material/assets-manifest.json",
    "tags": [
      "Google",
      "美国",
      "平台设计系统",
      "Material 3",
      "M3 Expressive",
      "真实还原",
      "字体",
      "角色配色",
      "圆角变形",
      "视频"
    ],
    "summary": "学习当前 Material Design 3 官方首页：固定图标侧栏、相邻大圆角首屏、真实组件视频和有不同分组的资源目录。配色、字体、容器与交互状态共享规则，让表现力与可读性同时成立。",
    "accent": "#6442d6",
    "background": "#fefbff",
    "principles": [
      "中性首屏面板与大尺度标题建立身份；紫色主按钮强调行动，真实组件图像承载丰富色彩。",
      "同一页面使用8px局部间隙和较大节距，分别表达相关内容与主题转换。",
      "圆角、状态层与角色配色在导航、按钮和资源卡中一致，但不同状态有不同形状。",
      "实时视频、主题切换与按压反馈提供可观察的产品行为；全局暂停保留控制权。"
    ],
    "productFocus": "Google Material 3 设计系统与当前 M3 Expressive 资源，突出颜色、动效、形状、排版与组件的协作；本例复现真实文档首页而非任意Google风格应用。",
    "interaction": [
      "进入首页：静音9秒组件视频开始循环，独立按钮可暂停；全局暂停影响视频、状态过渡和涟漪。 用真实组件变化说明设计系统，用户保有观看控制。",
      "点击或键盘激活按钮／卡片：CTA圆角48→16px，资源卡24→48px；200/300ms cubic-bezier(.2,0,0,1)。 形状与状态层共同表达当前动作，界面表现力来自一致的反馈。",
      "进入目录或二级主题：300ms侧向抽屉；二级内容200ms延后再200ms淡入。 导航容器保持连续，内容层级在同一位置变化。",
      "切换主题／系统主题变化：深浅语义角色切换；手动值保存，OS变化清除保存值。 让可读性适应环境，同时保持品牌图像与层级。"
    ],
    "theme": "温暖中性底色与表面、紫色主动作及状态角色配对、Google Sans尺度层级、宽松大圆角、清晰资源图像；兼具友好表现力和文档导航秩序。",
    "constraints": [
      "2026-10-07英文首页及I/O 2026区域为实例，设计规范另作理论来源。",
      "Google Sans、Symbols、20张配图、poster和MP4本地归档，权利归原作者。",
      "配色以官网原始CSS角色变量和干净源截图为准。",
      "目录采用本地dialog与官方外链；营销正文改写，完整Angular路由未复制。",
      "首页CTA和卡片为时间/贝塞尔曲线；M3物理规范不能替代具体页面实现证据。",
      "减少动态初始停播并取消非必要运动，保留焦点、颜色状态和全部内容。",
      "正文改写，完整文档路由与外链页面不在本地。首页CTA并非物理弹簧；M3物理系统只作理论来源。"
    ],
    "useCases": [
      "设计系统或开发平台主页",
      "拥有真实组件图像和演示视频的产品资源页",
      "需要在表现力与文档秩序之间取得平衡的学习入口"
    ],
    "avoid": [
      "只用Google四色和通用营销双栏就称为Material官网",
      "把品牌网站的紫色和字体当所有Material产品的硬性规范",
      "任意加视差或把CSS圆角过渡冒称物理弹簧",
      "静态图片假装实时视频或复制统计脚本"
    ],
    "tokens": {
      "palette": [
        "#fefbff",
        "#1c1b1d",
        "#f8f1f6",
        "#f2ecee",
        "#6442d6",
        "#9f86ff",
        "#1e0060",
        "#dcdaf5",
        "#141314",
        "#4b21bd",
        "#e7deff"
      ],
      "type": "官网Google Sans 475标题，桌面H1 96/96px、手机45/52px、H2桌面57/64px与手机36/44px；Google Sans Text正文和官方Symbols图标。",
      "layout": "88px固定侧栏／64px手机顶栏；8px首屏间隔与24px面板圆角；≥1295px两列544px hero，≤1294px上下排列；正文1200px上限，资源按1、2、3项分组。",
      "motion": "官方9秒循环MP4；CTA圆角.2s、卡片.3s cubic-bezier(.2,0,0,1)，本地涟漪300ms近似；视频独立暂停／全局暂停／reduced-motion。"
    },
    "sources": [
      {
        "title": "Material Design 3 当前官方首页",
        "url": "https://m3.material.io/",
        "type": "实例",
        "note": "2026-10-07英文首页：88px侧栏/64px手机顶栏、主题与暂停、真实视频、CTA与卡片圆角状态、1294px首屏断点。"
      },
      {
        "title": "Material：Motion physics system",
        "url": "https://m3.material.io/styles/motion/overview/how-it-works",
        "type": "规范",
        "note": "May2025物理系统：expressive/standard、spatial/effects和速度层级，与首页时间曲线区分。"
      },
      {
        "title": "Google Design：Expressive研究",
        "url": "https://design.google/library/expressive-material-design-google-research",
        "type": "理论",
        "note": "颜色、形状、大小、动效与容器共同引导注意和分组，并保留情境与基础可用性。"
      },
      {
        "title": "Google Design：品牌与Material",
        "url": "https://design.google/library/staying-true-to-your-identity-material-branding",
        "type": "理论",
        "note": "历史品牌指南的字体、图像和颜色一致性；旧色阶例子不是当前M3通用token。"
      },
      {
        "title": "W3C：Animation from Interactions",
        "url": "https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions.html",
        "type": "规范",
        "note": "非必要用户触发动效可关闭，自动媒体提供独立暂停。"
      }
    ],
    "prompt": "为[项目]制作基于Google Material：表现力与组件秩序的局部交互学习页面。参考https://m3.material.io/，观察2026-10-07，固定这一次采集的语言/年度页面，完成后作为单一归档快照留存；后续原站变化不改变此案例。不能只借用品牌色后套通用营销模板。配色：原始组件样式的#f8f1f6中性hero与#1c1b1d文字承托紫色#6442d6主动作；深色切换surface/on-surface角色，丰富色彩留给真实组件图像。 字体：本地官方Google Sans 475提供96px/45px主标题与57px/36px节标题，Google Sans Text正文和Symbols图标形成清晰尺度层级。 版式：固定窄导航与宽内容分离；首屏两块8px相邻大面板，正文按真实1/2/3资源组及大节距组织，手机改顶栏和单列。 图像：真实官方9秒4000×2000MP4、元数据poster和20张官方组件／资源配图，保持原始文件并按官网区域映射。 形状：24px面板圆角、48px胶囊主动作、圆形视频及设置按钮；按压／聚焦时有有意义的圆角变化。 层级：中性品牌面板和最大标题先定位产品，紫色主按钮强调行动，单个横向I/O资源先强调更新，随后组件和入门资料逐层引导。 协调：配色角色、字体族、容器圆角和状态层贯穿导航、hero、资源和页尾；鲜活组件图像由稳定网格与中性正文容器协调。 关键流程：进入首页：静音9秒组件视频开始循环，独立按钮可暂停；全局暂停影响视频、状态过渡和涟漪。 用真实组件变化说明设计系统，用户保有观看控制。 点击或键盘激活按钮／卡片：CTA圆角48→16px，资源卡24→48px；200/300ms cubic-bezier(.2,0,0,1)。 形状与状态层共同表达当前动作，界面表现力来自一致的反馈。 进入目录或二级主题：300ms侧向抽屉；二级内容200ms延后再200ms淡入。 导航容器保持连续，内容层级在同一位置变化。 切换主题／系统主题变化：深浅语义角色切换；手动值保存，OS变化清除保存值。 让可读性适应环境，同时保持品牌图像与层级。 主题：初始读取保存的选择或系统偏好，手动开关持久保存；系统偏好改变时清除手动值并重新跟随系统。 改变 surface/on-surface、primary/on-primary 等语义角色，保留媒体原色与按钮层级。 声音：官方组件视频静音，独立播放和全局动效暂停均可操作。 动态组件展示承担行为说明；首页没有独立背景音乐，不将视频运动误作声音反馈。 使用真实本地素材与正确比例，记录URL、作者、尺寸、hash和处理方式；无追踪。保留原站的章节交接、出入方向和指针反馈；桌面与390px手机分别实测。减少动态使用即时状态并保留全部内容；键盘与焦点可操作。完整数据库、账号与交易用真实官方外链。所有近似和未验证项在fidelity.md明确，不能用静态截图宣称全流程已还原。",
    "negativePrompt": "不要任意Google风格仪表盘、彩色圆球hero、所有区域同一套卡片、伪视频、自动有声、无作用暂停、强行弹簧、长段复制营销文字或原站统计代码；不要把浏览器改色当官方配色。",
    "demo": "demos/cases/google-material/index.html",
    "preview": "previews/cases/google-material.jpg",
    "research": "docs/cases/google-material.md",
    "exercise": "先用主题开关比较角色配对，再暂停全局动效并用键盘聚焦资源卡，观察没有运动时状态是否仍清楚；若换品牌色，只改一组primary／container会怎样影响正文与按钮的协调？",
    "composition": {
      "color": "原始组件样式的#f8f1f6中性hero与#1c1b1d文字承托紫色#6442d6主动作；深色切换surface/on-surface角色，丰富色彩留给真实组件图像。",
      "typography": "本地官方Google Sans 475提供96px/45px主标题与57px/36px节标题，Google Sans Text正文和Symbols图标形成清晰尺度层级。",
      "layout": "固定窄导航与宽内容分离；首屏两块8px相邻大面板，正文按真实1/2/3资源组及大节距组织，手机改顶栏和单列。",
      "imagery": "真实官方9秒4000×2000MP4、元数据poster和20张官方组件／资源配图，保持原始文件并按官网区域映射。",
      "shape": "24px面板圆角、48px胶囊主动作、圆形视频及设置按钮；按压／聚焦时有有意义的圆角变化。",
      "hierarchy": "中性品牌面板和最大标题先定位产品，紫色主按钮强调行动，单个横向I/O资源先强调更新，随后组件和入门资料逐层引导。",
      "motion": "进入首页时静音9秒组件视频开始循环，独立按钮可暂停；全局暂停影响视频、状态过渡和涟漪。；点击或键盘激活按钮／卡片时CTA圆角48→16px，资源卡24→48px；200/300ms cubic-bezier(.2,0,0,1)。；进入目录或二级主题时300ms侧向抽屉；二级内容200ms延后再200ms淡入。；切换主题／系统主题变化时深浅语义角色切换；手动值保存，OS变化清除保存值。",
      "coherence": "配色角色、字体族、容器圆角和状态层贯穿导航、hero、资源和页尾；鲜活组件图像由稳定网格与中性正文容器协调。"
    },
    "themeBehavior": {
      "mode": "system-and-manual",
      "default": "system",
      "control": "初始读取保存的选择或系统偏好，手动开关持久保存；系统偏好改变时清除手动值并重新跟随系统。",
      "designReason": "改变 surface/on-surface、primary/on-primary 等语义角色，保留媒体原色与按钮层级。"
    },
    "soundBehavior": {
      "kind": "none",
      "control": "官方组件视频静音，独立播放和全局动效暂停均可操作。",
      "interactionRole": "动态组件展示承担行为说明；首页没有独立背景音乐，不将视频运动误作声音反馈。"
    },
    "capturedAt": "2026-10-07"
  },
  {
    "category": "艺术/文化",
    "country": "中国",
    "implementation": "reference-study",
    "capturedAt": "2026-10-09",
    "themeBehavior": {
      "mode": "fixed",
      "default": "light",
      "control": "观察范围未提供深浅主题开关；本地固定浅色正文并保留图像原色。",
      "designReason": "固定文化机构的色彩与图像关系，避免主题切换改变壁画、釉色和建筑摄影的判断。"
    },
    "soundBehavior": {
      "kind": "none",
      "control": "此次观察的公开页面未发现独立BGM或音频控制；本地不增加声音。",
      "interactionRole": "阅读、图像和目录操作承担信息引导。"
    },
    "id": "palace-museum",
    "order": 30,
    "title": "故宫 · 六章探索与宫廷视觉目录",
    "subtitle": "Six chapters of architecture, collections, books and cultural destinations",
    "tags": [
      "中国",
      "故宫",
      "古建筑",
      "文物",
      "朱红",
      "文化专题",
      "纸签",
      "建筑目录"
    ],
    "summary": "朱红纹理、真实屋脊与圆形题饰建立建筑识别，藏品拼图、八枚典籍条、历史入口、文物医院轮播和五类纸签专题构成六章长页。",
    "accent": "#8c2927",
    "background": "#ffffff",
    "referenceUrl": "https://www.dpm.org.cn/Explore.html",
    "edition": "2026-10-09；中文探索页完整六章、桌面及官网响应断点",
    "principles": [
      "从真实建筑局部建立文化识别，再让名称目录承担检索；不依赖无差别传统纹样。",
      "专题图像负责感知，半幅浅纸签负责分类名称，避免文字直接压住复杂纹样。",
      "金色只承担屋脊、少量题饰和边界，朱红大面与白色阅读区相互制约。"
    ],
    "productFocus": "让读者在建筑、藏品与文化专题间选择下一步，真实资料与服务仍由故宫官网提供。",
    "interaction": [
      "进入与滚动：完整保留建筑、藏品、典籍、历史、文物医院和文化专题六章；桌面1258px内容宽、原站响应样式与素材尺寸经DOM/计算样式对照。",
      "建筑目录：朱红实物纹理与透明屋脊、独立圆形“建筑”题饰并置，八个建筑名称及更多建筑/地图均保留官方目的地。",
      "藏品与典籍：异形拼图的两张藏品照片悬停500ms显出黑色半透明文字层；八枚典籍条进入视域后自上方30%位移与1s淡入，依次延迟0.3s，离开后可反向恢复。",
      "文物医院：两张真实修复场景图片沿水平轨道500ms切换、5000ms自动播放，悬停/焦点暂停，两个原站圆点可直接选择。",
      "导航与页尾：桌面导航悬停展开、200ms离开隐藏；全站菜单打开/关闭、手机栏目展开、搜索空词提示及官方检索跳转、页尾六个社交二维码和浏览建议均保留。",
      "五类文化专题与历史五入口为真实链接；无障碍语音/读屏工具作为官网第三方服务明确跳回官方，账户、预约和完整详情不复制。"
    ],
    "theme": "官方白底与真实朱红纹理、金色屋脊、圆形题饰、淡纸色标签；Microsoft Yahei/PingFang SC/Arial字体栈沿用源CSS。",
    "constraints": [
      "固定中文探索页六章快照，不合并官网首页轮播、全景故宫或数字文物库的独立服务。",
      "完整检查并本地化本页适用图像、背景纹理与伪元素题饰；保留原字节、宽高和水印，权利归原机构/作者。",
      "原站业务链接回官方；第三方无障碍工具实际观察到15项入口，但语音/读屏服务未在本地克隆。",
      "桌面六章盒模型与原站同值；390px手机前四章同值、医院高度约0.5px差；不声称全站业务或所有浏览器像素一致。",
      "减少动态时保持内容可见、手动轮播可用，取消自动播放和位移。"
    ],
    "useCases": [
      "文化遗产机构门户",
      "古建筑目录",
      "文物专题与展览导航"
    ],
    "avoid": [
      "不具备真实物件和内容的装饰式中国风落地页",
      "需要持续监测实时预约状态的业务界面"
    ],
    "tokens": {
      "palette": [
        "#ffffff",
        "#8c2927",
        "#c1a56b",
        "#efebde",
        "#393830"
      ],
      "type": "Microsoft Yahei / PingFang SC / Arial；源站字体栈与26px章节题名。",
      "layout": "1258px居中内容，六章原生长页；朱红建筑→藏品拼图→八条典籍→历史→文物医院→五类专题。",
      "motion": "源站500ms藏品叠层、1s/0.3s典籍序列、5000ms/500ms医院轮播与可反向滚动。"
    },
    "composition": {
      "color": "源白色正文、建筑重复朱红纹理和金色屋脊、专题浅纸色标签；采用实际源CSS与图像。",
      "typography": "沿用源CSS Microsoft Yahei/PingFang SC/Arial字体栈；章节26px/32px，正文14px/1.5，官网手机rem断点。",
      "layout": "源站完整六章、1258px主内容和原始章节间距；典籍、历史及文物医院依次组织为独立章节。",
      "imagery": "官网透明屋脊、建筑/藏品/典籍/历史/医院题饰、全部章节摄影、纹理、五类专题桌面/手机图与伪元素资产均检查本地化。",
      "shape": "源端观察：矩形章节与专题图像上右半幅浅纸签并置，竖排类目为独立可读文字。",
      "hierarchy": "建筑形象先建立地点识别，建筑名称与藏品入口承担选择，专题纸签组织文化对象。",
      "motion": "源码与实测支持500ms叠层、1s与0.3s错开典籍、5000ms/500ms医院轨道，保留hover暂停和反向状态。",
      "coherence": "朱红/金/纸色分别对应建筑、文化细节与目录标签，装饰与文字入口的职责分开。"
    },
    "sources": [
      {
        "title": "故宫博物院 · 探索",
        "url": "https://www.dpm.org.cn/Explore.html",
        "type": "实例",
        "note": "同日重新以CDP读取原DOM、完整main.css/main.js/vendor.js，核实全部六章、桌面/手机盒模型、悬停与轮播真实状态；state-matrix.md记录详细证据。"
      },
      {
        "title": "故宫博物院 · 相关数字平台",
        "url": "https://www.dpm.org.cn/bottom/platform.html",
        "type": "实例",
        "note": "官方介绍数字文物库、全景故宫和名画记；用于说明各平台独立的业务与交互范围。"
      },
      {
        "title": "W3C WAI · Non-text Content",
        "url": "https://www.w3.org/WAI/WCAG22/Understanding/non-text-content.html",
        "type": "规范",
        "note": "用于图像目的与可点击图像的文字替代；不表示官网已经全面符合规范。"
      }
    ],
    "exercise": "替换为另一处有授权建筑的真实屋脊/门窗细节，保持名称目录可独立阅读，并解释图像局部为什么代表其文化内容。",
    "prompt": "按2026-10-09故宫中文探索页六章快照复现文化门户。先逐模块对照DOM和计算样式，保留1258px内容宽、源字体栈、章节间距、全部圆形题饰和真实本地化图像；建筑朱红纹理托起左侧说明/八项名称索引及右下屋脊，藏品保留异形图像拼图、500ms文字叠层，典籍保留八条1s/0.3s序列及反向恢复，历史五类入口，文物医院35/65分栏、两图5000ms自动/500ms水平切换和hover暂停，最后保留全部五类纸签专题及官方手机图。导航要含悬停子菜单、全站菜单、搜索空词提示、二维码与浏览建议。记录原站/本地状态矩阵、素材来源/尺寸/hash和未复刻服务；业务及第三方语音读屏走官方，减少动态关闭自动位移而保留手动操作。",
    "negativePrompt": "不要把所有区域做成统一圆角卡片；不要虚构官方藏品和开放状态；不要堆砌无来源的龙凤纹样、书法或BGM。",
    "demo": "demos/cases/palace-museum/index.html",
    "preview": "previews/cases/palace-museum.jpg",
    "research": "docs/cases/palace-museum.md",
    "fidelity": "demos/cases/palace-museum/fidelity.md",
    "assetManifest": "demos/cases/palace-museum/assets-manifest.json"
  },
  {
    "category": "艺术/文化",
    "country": "中国",
    "implementation": "reference-study",
    "capturedAt": "2026-10-09",
    "themeBehavior": {
      "mode": "fixed",
      "default": "light",
      "control": "观察范围未提供深浅主题开关；本地固定浅色正文并保留图像原色。",
      "designReason": "固定文化机构的色彩与图像关系，避免主题切换改变壁画、釉色和建筑摄影的判断。"
    },
    "soundBehavior": {
      "kind": "none",
      "control": "此次观察的公开页面未发现独立BGM或音频控制；本地不增加声音。",
      "interactionRole": "阅读、图像和目录操作承担信息引导。"
    },
    "id": "digital-dunhuang",
    "order": 31,
    "title": "数字敦煌 · 全幅影像与真实瓦片细察",
    "subtitle": "Four-image entrance, evidence-backed facets and public DeepZoom tiles",
    "tags": [
      "中国",
      "敦煌",
      "壁画",
      "石窟",
      "文物数字化",
      "检索",
      "分面筛选",
      "图像查看器"
    ],
    "summary": "四张石窟大图、中心检索和计数引导读者进入六个经典洞窟与十幅壁画；目录按真实三维分面筛选，独立Leaflet查看器按匿名公开边界加载瓦片。",
    "accent": "#b34037",
    "background": "#f1f0ec",
    "referenceUrl": "https://www.e-dunhuang.com/index.htm",
    "edition": "2026-10-09；首页完整序列、32项洞窟列表与莫高窟257窟主室西壁公开查看器",
    "principles": [
      "让文物影像成为主角，界面色彩服务搜索和目录状态。",
      "遗址、形制和时代拆为明确的条件维度，以已选摘要解释当前范围。",
      "从洞窟全貌进入壁画细节，查看尺度与图像真实分辨率分开说明。"
    ],
    "productFocus": "从公开影像进入数字文化遗产资料，按编号或时代寻找洞窟，再到官方平台查看完整解说与高清影像。",
    "interaction": [
      "首页：四幅真实石窟主图每3000ms水平切换500ms，原生箭头、中心检索与1500ms四项计数；六个经典洞窟、十幅壁画、寻境及运行时注入DLC横幅完整保留。",
      "目录：32项源站洞窟与三维条件——遗址4项、形制4项、时代11项；19个单条件服务端响应分别取得成员集与HTML hash，本地按这些集进行AND组合并同步URL。",
      "条件反馈：点击原条件可移除，已选条件行显示并可取消，折叠筛选耗时1000ms；北魏实测254、257、麦积127三项，叠加榆林窟为零项，浏览器返回恢复。",
      "壁画：莫高窟257窟主室西壁采用源站Leaflet 1.7.1与DeepZoom 2.0.0，21515×15796逻辑像素、1024瓦片，匿名minZoom9.75/maxZoom12，公开level10–12共9瓦片实际取得。",
      "细察：原生加减、滚轮、拖动和键盘平移，惯性参数与真实图像边界保留；高于11出现官方登录提醒，更高清业务回官方，不绕过匿名上限。",
      "阅读：洞窟/壁画导航与返回顶部1000ms，数字敦煌介绍1500ms展开；版权/Cookie/平台介绍可打开关闭，语言、登录及订阅服务仍走官方。"
    ],
    "theme": "浅色目录、深色全幅石窟与#080900壁画画布；原字体/字号/红色导航样式沿用源CSS。",
    "constraints": [
      "固定同日主页、洞窟目录与一幅壁画查看器；32目录结果与首页固定30统计同时保留，不能自行将来源不一致改成同一数字。",
      "19个单条件响应已验证，组合用公开成员集交集；没有声称枚举所有服务端组合、账户和实时数据库。",
      "真实匿名瓦片浏览只覆盖莫高窟257西壁；其他洞窟详页、另九幅查看器、登录后更高分辨率、云游戏与订阅不复制。",
      "原图保留水印与原字节；逻辑21515×15796不表示本地已下载此完整高清图，最高实际归档级别12。",
      "减少动态暂停自动轮播和计数过程，保持导航、筛选与查看器手动操作；加载旋转反馈使用原 Control.Loading 库。"
    ],
    "useCases": [
      "数字文化遗产资料库",
      "需要图像细读的艺术档案",
      "有时代/形制元数据的研究目录"
    ],
    "avoid": [
      "图像精度不足却宣称可研究级放大的展示",
      "没有元数据只用抽象风格标签的图库"
    ],
    "tokens": {
      "palette": [
        "#f1f0ec",
        "#282c2b",
        "#b34037",
        "#947650",
        "#ede8da"
      ],
      "type": "源CSS Microsoft Yahei与Bootstrap字体栈；图标字体本地化。",
      "layout": "完整首页序列→两列洞窟列表/三维条件→独立全视口瓦片画布，手机沿官方首页样式及列表单列适配。",
      "motion": "3000ms/500ms首页轮播、1500ms/100ms计数、1000ms导航/条件、1500ms介绍；真实地图拖动与缩放。"
    },
    "composition": {
      "color": "深色顶栏、石窟原色主图、源CSS红色导航/检索操作、浅灰白目录及#080900查看器画布。",
      "typography": "源Microsoft Yahei与Bootstrap字体栈、原标题/字号/洞窟编号/时代层级，图标字体保留。",
      "layout": "源HTML完整首页、32项目录与两列masonry；独立查看器铺满视口。",
      "imagery": "四张主图、六个洞窟、十幅壁画预览、运行时DLC内嵌PNG及9张公开瓦片本地化并保留水印。",
      "shape": "矩形图像、条件标签、两列洞窟卡片与全视口深色图像场；加减控件沿用原Leaflet样式。",
      "hierarchy": "环境影像建立地点，检索缩小候选，时代和编号解释对象，壁画查看器让用户主动改变观察尺度。",
      "motion": "从原站源码配置及真实点击读取轮播、计数、折叠/介绍时长；查看器使用同一Leaflet/DeepZoom逻辑及匿名边界。",
      "coherence": "文化图像负责氛围与证据，搜索/条件/编号负责发现过程，查看器清楚区分总览、局部和实际精度。"
    },
    "sources": [
      {
        "title": "敦煌研究院 · 数字敦煌",
        "url": "https://www.e-dunhuang.com/index.htm",
        "type": "实例",
        "note": "DOM/CSS/真实轮播与检索交互；另读取运行时pop.js注入的750×100 PNG，恢复四计数和完整内容序列。"
      },
      {
        "title": "数字敦煌 · 洞窟列表",
        "url": "https://www.e-dunhuang.com/section.htm",
        "type": "实例",
        "note": "实测时代北魏筛选，URL和已选中摘要同步；按遗址、形制、时代建立分面。"
      },
      {
        "title": "数字敦煌 · 第257窟主室西壁",
        "url": "https://www.e-dunhuang.com/showmural/10.0001/0001/0001/0257/0001/0003/01",
        "type": "实例",
        "note": "现场点击Zoom in与Zoom out，核验独立深色影像视域与可逆放缩。"
      },
      {
        "title": "W3C WAI · Modal Dialog",
        "url": "https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/",
        "type": "规范",
        "note": "首页版权/Cookie/平台介绍说明窗口提供明确关闭、Escape和焦点归还；壁画查看器为独立页面，不能使用此规范冒称它是dialog。"
      },
      {
        "title": "W3C WAI · Reflow",
        "url": "https://www.w3.org/WAI/WCAG22/Understanding/reflow.html",
        "type": "规范",
        "note": "目录窄屏重排；图像二维平移限于独立画布，避免整页横向溢出。"
      },
      {
        "title": "数字敦煌 · 257窟西壁公开查看器",
        "url": "https://www.e-dunhuang.com/showmural/10.0001/0001/0001/0257/0001/0003/01",
        "type": "实例",
        "note": "实际加减、拖动，读取原Leaflet/DeepZoom脚本、地图缩放和公开Network瓦片，不读取登录后级别。"
      }
    ],
    "exercise": "用有使用权的真实瓦片图像和完整元数据替换档案；逐条件验证成员集、组合空态、URL返回以及查看器真实精度、平移和缩放边界。",
    "prompt": "逐页对照数字敦煌同日首页、洞窟列表与257西壁查看器，完整保留四图3000ms/500ms轮播、中央检索、1500ms计数、六洞窟/十壁画/寻境/DLC横幅序列，严禁只用单张图替代。用源站19个真实单facet响应成员集建立遗址/形制/时代筛选及可回退URL，保留32项档案和已选条件。查看器使用真正Leaflet/DeepZoom、本地公开1024瓦片、21515×15796逻辑尺寸、min9.75/max12和官方登录边界，完整测试加减/拖动/滚轮/键盘。来源图像、CSS和运行库应记录hash/版权和许可；云游戏、账户与更高清服务仍回官方，不用CSS放大低清图冒充瓦片引擎。",
    "negativePrompt": "不要把敦煌只概括成飞天贴图和土黄色卡片；不要把低分辨率缩略图宣称高清；不要复制登录订阅或云游戏业务。",
    "demo": "demos/cases/digital-dunhuang/index.html",
    "preview": "previews/cases/digital-dunhuang.jpg",
    "research": "docs/cases/digital-dunhuang.md",
    "fidelity": "demos/cases/digital-dunhuang/fidelity.md",
    "assetManifest": "demos/cases/digital-dunhuang/assets-manifest.json"
  },
  {
    "category": "艺术/文化",
    "country": "中国",
    "implementation": "reference-study",
    "capturedAt": "2026-10-09",
    "themeBehavior": {
      "mode": "fixed",
      "default": "light",
      "control": "观察范围未提供深浅主题开关；本地固定浅色正文并保留图像原色。",
      "designReason": "固定文化机构的色彩与图像关系，避免主题切换改变壁画、釉色和建筑摄影的判断。"
    },
    "soundBehavior": {
      "kind": "none",
      "control": "此次观察的公开页面未发现独立BGM或音频控制；本地不增加声音。",
      "interactionRole": "阅读、图像和目录操作承担信息引导。"
    },
    "id": "suzhou-museum",
    "order": 32,
    "title": "苏州博物馆 · 四屏门户与图像目的地",
    "subtitle": "Four full-page chapters, live exhibition visuals and nine image destinations",
    "tags": [
      "中国",
      "苏州博物馆",
      "江南建筑",
      "贝聿铭",
      "粉墙黛瓦",
      "图像导航",
      "留白",
      "博物馆"
    ],
    "summary": "50px白色外缘框住建筑轮播、展览叙事、九个不等尺度图像入口和参观信息，右侧四条导航与方角摄影延续机构门户的清楚节奏。",
    "accent": "#aa4d35",
    "background": "#ffffff",
    "referenceUrl": "https://www.szmuseum.com/Home/Index",
    "edition": "2026-10-09；中文桌面首页四屏完整快照；手机同内容适配，WAP入口未取得",
    "principles": [
      "图像直接承担目的地入口，每个区域保留清晰的文字名称，而非把所有图像压成统一比例卡片。",
      "粉墙黛色与自然光来自建筑本身；网页借助白色留白、方形边界和真实摄影承接这种识别。",
      "目录选择与参观服务分别成章，图片的观看节奏和到访任务不互相覆盖。"
    ],
    "productFocus": "从机构门户进入馆藏、展览、学习和建筑内容，并把预约及实时到访信息交给官方服务。",
    "interaction": [
      "首页完整四屏：建筑双图轮播、七项展览、九目的地图像矩阵及开放时间/预约；用原站fullPage1.5.3、jQuery UI缓动和同一锚点/700ms受控滚动，第四屏向下循环回第一屏。",
      "轮播：首屏Owl单图5000ms自动、800ms切换、fade效果、hover暂停；展览lrtk七项5000ms、500ms淡入，箭头/七条指示条及横向触摸，所有正式展览链接回官方。",
      "图像目的地：资讯、云课堂、馆藏、活动、文创、数字苏博、展览、游戏、建筑美图九项原图/常显类目均保留，左右75%/25%及每块尺寸按源CSS。",
      "悬停：原站CSS scale1.1/500ms与脚本图宽增加1.1倍/300ms共同作用；数字苏博单独增高，保留真实实现而非泛化轻微缩放。",
      "访问与页尾：两张真实访问背景、70%半透明白板、原开放信息及预约链接，完整底栏网站地图展开500ms、浏览建议悬停；不添加建筑解说dialog。",
      "原站初载被第三方统计阻塞jQuery.ready，四屏交互取自明确记录的受控启动及原源码；移动UA路由/Wap/Home/Index本次连接失败，本地手机为同内容长页适配。"
    ],
    "theme": "原站白色外缘、黑灰机构文字、建筑及藏品原色、少量红色开放信息与方角画面。",
    "constraints": [
      "固定同日四屏、当前七项展览及九个图像入口，不声称预约、留言、商店、课堂或账户业务复制。",
      "公开摄影、机构字标、两类轮播和全部页面纹理/图饰检查本地化；保持原字节及水印。",
      "原站初载第三方阻塞与受控jQuery.ready验证分开记录，正常访客加载效果不能由受控状态推断。",
      "源PC最小1366px、移动UA跳到独立WAP；未取得WAP内容，因此手机响应适配明确不作为原站移动端像素复刻。",
      "部分源CSS的未用背景或隐藏箭头URL返回HTML，记录失败，不用猜测图片替代可见主要素材。"
    ],
    "useCases": [
      "有多个清晰内容目的地的文化机构门户",
      "建筑与城市文化展示",
      "馆藏、学习与参观并行的博物馆主页"
    ],
    "avoid": [
      "图片缺少语义、只靠悬停才显示入口名称的门户",
      "把所有文化机构都改成同一张水墨背景的主题页"
    ],
    "tokens": {
      "palette": [
        "#ffffff",
        "#303a3b",
        "#aa4d35",
        "#827f75",
        "#e5e5de"
      ],
      "type": "Microsoft Yahei/微软雅黑；原机构PNG字标，源CSS导航和类目字号。",
      "layout": "50px外缘、4个整屏；2张建筑图→7项展览→75/25九入口矩阵→双访问面板；390px同内容长页适配。",
      "motion": "fullPage700ms/easeInQuart、首屏5000ms/800ms fade、展览5000ms/500ms、矩阵双重1.1倍hover及500ms网站地图。"
    },
    "composition": {
      "color": "源端观察：白色界面、黑灰文字、少量红色机构标识，资讯瓦片用粉墙与深灰边饰的建筑摄影。",
      "typography": "原机构PNG书写字标和Microsoft Yahei导航/标签；类目1.5em、字距5px，非系统衬线重写品牌。",
      "layout": "四屏完整结构；50px左右外缘，1440×900时主画面1340×755；第三屏按原九项/75%与25%两区组织。",
      "imagery": "原站当前两张首页图、七项展览摄影、九项目的地、两张访问背景、字标和图饰本地化。",
      "shape": "源网页大白边界、方角画面、窄白缝和四条灰色章节导航；建筑轮廓在真实摄影内。",
      "hierarchy": "四屏分别解决机构进入、展览浏览、内容目的地、到访；网站地图在底栏展开，语义入口不依赖图库猜测。",
      "motion": "原站fullPage、Owl、lrtk真实源码配置与交互验证；保留反向、循环、hover和触摸，减少动态禁用自动与位移。",
      "coherence": "真实建筑和馆藏摄影与白色空间相互支撑，陶红只标记少量入口/焦点；官网业务明确外链。"
    },
    "sources": [
      {
        "title": "苏州博物馆 · 中文官网图像目录",
        "url": "https://www.szmuseum.com/Home/Index",
        "type": "实例",
        "note": "重新读取原DOM、homeindex/reset/innerfooter/fullPage/Owl/lrtk样式及运行库；冷加载被统计阻塞后明确jQuery.ready受控启动，对照四屏与真实导航/hover/轮播；详见state-matrix.md。"
      },
      {
        "title": "苏州博物馆 · 贝聿铭与苏博",
        "url": "https://www.szmuseum.com/Other/MuseumIntro",
        "type": "实例",
        "note": "官方建筑说明支持粉墙黛色、深灰石材边饰、自然光与江南园林的地域识别；网页迁移是本库解释。"
      },
      {
        "title": "W3C WAI · Non-text Content",
        "url": "https://www.w3.org/WAI/WCAG22/Understanding/non-text-content.html",
        "type": "规范",
        "note": "图像目的地用常显名称给链接命名，避免全部信息仅置于背景影像。"
      },
      {
        "title": "W3C WAI · Reflow",
        "url": "https://www.w3.org/WAI/WCAG22/Understanding/reflow.html",
        "type": "规范",
        "note": "本地矩阵窄屏重排并保留逻辑DOM顺序；规范是迁移约束，不表示官网合规审计。"
      }
    ],
    "exercise": "把同一目的地矩阵适配另一个真实文化机构，以有授权图像解释每个入口；在390px检查类目名称、DOM顺序与到访链接仍可用。",
    "prompt": "完整复现2026-10-09苏州博物馆中文PC首页的四屏，不只截第3/4屏。采用源字标、摄影、50px白色外缘、四条章节导航和fullPage700ms受控滚动/第四屏循环；首屏2图5000ms/800ms fade及hover暂停，展览7项5000ms/500ms淡入/7指示条，九目的地按75/25和原多尺度几何排列，标签常显，复用源CSS与脚本双重hover；第四屏保留两张背景及70%半透明开放/预约白板，底栏含500ms网站地图及浏览建议。所有源可见素材和jQuery UI缓动依赖本地化。第三方统计阻塞及受控启动写清证据，WAP未取到时将手机同内容适配明确标出，不能宣称原移动端复刻。官方服务保持真实外链，减少动态关闭自动轮播，别添加不在源站的建筑dialog或框线卡片。",
    "negativePrompt": "不要把江南设计简化为水墨背景；不要去掉图像入口名称；不要统一圆角卡片、强制手机整屏滚轮或复制预约商城业务。",
    "demo": "demos/cases/suzhou-museum/index.html",
    "preview": "previews/cases/suzhou-museum.jpg",
    "research": "docs/cases/suzhou-museum.md",
    "fidelity": "demos/cases/suzhou-museum/fidelity.md",
    "assetManifest": "demos/cases/suzhou-museum/assets-manifest.json"
  },
  {
    "id": "endfield-industrial",
    "order": 33,
    "title": "终末地 · 完整工业科幻门户",
    "subtitle": "ENDFIELD / EIGHT CHAPTERS, ROSTER, TRANSPARENT VIDEO AND POINT CLOUDS",
    "category": "游戏/IP",
    "country": "中国",
    "tags": [
      "明日方舟终末地",
      "鹰角网络",
      "白底工业",
      "亮黄信号",
      "斜线大字",
      "竖向媒体书脊",
      "35干员",
      "透明视频",
      "二进制点云",
      "自然滚动"
    ],
    "summary": "以同日官方DOM、CSS、内容映射与渲染算法恢复八章门户：35干员真实目录与透明enter/idle视频、六项点云世界观、10影像、版本日历、4玩法、5集成工业和公告；35位干员完整中文介绍按当前简中文本映射保留。",
    "accent": "#fffa00",
    "background": "#ffffff",
    "principles": [
      "明亮工业语言来自干员、玩法与集成工业分区；同日首页为雪凇幽梦活动，世界观为深色点云，不能把全站等同于白黄配色。",
      "淡网格、巨大斜线ENDFIELD、REC编号、实心姓名和多色标定条形成记录层级；采用来源CSS与字体，装饰不能取代资料内容。",
      "35干员同时提供头像窗口与完整职业/属性目录；3D入口是RGB/alpha透明视频的enter→idle，不能伪称可自由旋转的人物网格模型。",
      "世界观六项是真实Float32 xyz二进制点云，与人物透明视频属于不同机制；切换、扫描/旋转、拖动和媒体资源边界分别记录。",
      "AIC书脊与媒体共同组织类别；4玩法/5AIC采用源三层黑→黄→媒体的方向揭示，不用单静态工厂图替代整个相册。"
    ],
    "productFocus": "2026-10-09中国大陆公开官网八章快照：home、operator、lore、information、calendar、gameplay、aic、notice；35人目录、六世界模型、10影像、4玩法/5AIC、10公告。人物完整简介来自当前简中文本映射，逐角色核对原值与SHA256；账号、支付、下载/云游戏服务仍官方。",
    "interaction": [
      "载入与导航：使用原Updating图形和排版，本地必要首页图、干员图与字体的实际完成数推进；失败提供重试/继续。侧栏hover300ms展开，手机菜单、章节导航和自然滚动回程沿原结构。进度是任务完成比例，不声称网络字节百分比。",
      "干员：35项头像真实映射，箭头每次翻四个头像而不切角色，点击头像才更新名字/代号/阵营/种族/职业/属性/CV与星级；全部干员页按职业/属性AND筛选，返回正式档案。",
      "2D/3D：同35项立绘和70个原enter/idle视频。祀源影片3840×1080左右RGB/alpha，经原亮度权重0.3/0.59/0.11合成1920×1080透明canvas，enter结束切idle循环；不制造实时人物模型。",
      "世界观：帝江号/锚点/集成工业系统/天师桩/天使/裂地者六个原bin及模型参数，Float32 xyz、按Y跨度1900规范化；实际WebGL点云、扫描、转动、拖动、分页/标题与六指标同步。最终状态实测见fidelity，不因源码抽取而自动判通过。",
      "影像：10项真实标题/日期/分类/封面及预览，横向相邻卡与循环窗口、上一/下一、选卡和完整影片dialog；完整长片使用官方媒体URL，关闭停止播放。",
      "玩法/AIC：4段原玩法视频和5张原工业图；400ms三层方向揭示，黑层delay0/黄250/实际媒体500，总900ms；文字500ms退出/500ms进入，内容/编号/分页共同变化。",
      "日历与公告：原版本日历影像；10公告的原标题/日期/封面及官方详情入口，桌面卡片与手机两条分页。源公告展开500ms左向clip与600ms部件Y30%入场、300ms延迟卡片300ms横移由本地状态实现。",
      "声音和业务：原BGM及四种原始操作音由桌面/手机共用声音开关启用，默认关闭；选干员与2D/3D切换播放机械短音，头像翻页和档案展开/收起分别反馈。10槽音频池保留快速重复操作的叠响；关闭声音或隐藏页面立即停止，返回不重放短效。登录、下载、云游戏、支付、社区与全文信息保留官方目的地，不复制后台或提交数据。"
    ],
    "theme": "完整门户保留首页活动原色、白色干员/工业资料面、深色世界观点云和影像场；亮黄作为局部信号，字体与多色标定沿来源。",
    "constraints": [
      "固定2026-10-09大陆官网快照；完整八章的视觉/内容机制不表示账号、交易、实时更新与全站所有详情已复刻。",
      "姓名/代号/阵营/种族/职业/属性/CV、目录和媒体映射来自当前35人模块；源码内另26人旧数组不能混作当前总量。完整人物介绍来自当前简中文本映射，保留段落、空格与标点并逐角色核验。",
      "人物3D是透明视频而非可拖转三维角色；世界观才使用六真实bin点云，格式/归一化/参数与源码可回读，渲染效果仍需逐状态浏览器核验。",
      "70角色视频、公开静图、字体、六点云、影像预览、BGM与四种操作短音保留来源/字节/尺寸/hash；完整长片仍依赖官方URL，不承诺离线全片。",
      "桌面CSS使用源设计坐标与实际宽高比例，手机沿源portrait规则；需要验证手机、减弱动态、资源失败、快速反向输入以及视频/点云生命周期，未完成项以fidelity明确pending。",
      "采用来源CSS、字体与运行DOM；品牌与素材归相应权利人，不附商业再分发承诺。"
    ],
    "useCases": [
      "明亮工业科幻宣传",
      "角色与技术资料并列",
      "图像主导的设备/实验档案"
    ],
    "avoid": [
      "将亮黄大面积当正文底色",
      "密集交易与账户后台",
      "仅换配色来重复原版方舟案例"
    ],
    "tokens": {
      "palette": [
        "#ffffff",
        "#131315",
        "#fffa00",
        "#dedfe0"
      ],
      "type": "来源HarmonyOS Sans SC/SansRegular/SansMedium、Gilroy、Novecentosanswide等字体包与源字号/字距；档案实心前景及斜线背景字分工。",
      "layout": "自然滚动八章，桌面源160×90设计坐标，portrait宽67.5rem；原侧栏/35头像窗口/完整目录/世界观canvas/媒体与相册。",
      "motion": "300ms侧栏，源透明enter→idle、点云扫描/切换；相册400ms三层0/250/500ms，文字500/500ms；公告clip500ms与600ms入场。减少动态保留手动状态。"
    },
    "sources": [
      {
        "title": "Hypergryph · 明日方舟终末地中国大陆官方网站",
        "url": "https://endfield.hypergryph.com/",
        "type": "实例",
        "note": "同日原DOM/CSS、portrait布局、Next公开数据与模块资源映射、运行视频/点云算法均已采集；静态源码覆盖与浏览器实测分层，最终通过状态见fidelity。"
      },
      {
        "title": "Hypergryph · 明日方舟中文官方网站",
        "url": "https://ak.hypergryph.com/",
        "type": "实例",
        "note": "2026-10-09现场比较暗灰、青色和全屏档案语言；本库已有arknights-world，新增条目只提取终末地明亮分区的不同构成。"
      },
      {
        "title": "W3C · Use of Color",
        "url": "https://www.w3.org/WAI/WCAG22/Understanding/use-of-color.html",
        "type": "规范",
        "note": "支持本地用按钮文字、边界和aria状态同时表达选中，不能只靠亮黄变化。"
      },
      {
        "title": "W3C · Animation from Interactions",
        "url": "https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions.html",
        "type": "规范",
        "note": "WCAG 2.3.3为AAA；用于本地减少非必要缩放和滚动动态的设计依据，不表示源站已经符合该条。"
      }
    ],
    "prompt": "完整对照2026-10-09终末地中国大陆公开官网的八章，不把干员与AIC缩成两张静图。先检查原DOM/CSS/手机规则、数据模块/影片/二进制及运行状态，保留活动首页、35人真实元数据与头像窗口/全部目录，翻页箭头只翻四头像，点击才切角色。保留2D与原RGB/alpha透明enter→idle视频，0.3/0.59/0.11合成原透明边缘；别将它替代成可旋转人物模型。世界观六项使用原Float32 xyz bin、Y跨度1900规范化及各模型参数，核对扫描/旋转/拖动/切换和离屏暂停。10影像、日历、4玩法/5AIC与公告保留原媒体、文字、编号和返回，黑黄媒体三层400ms delay0/250/500及500/500ms文案。采用原CSS与字体，亮黄只作信号，白色工业区、深色世界观和当前活动各保持身份。人物完整中文介绍从当前语言映射静态解码，按35个当前角色key核对，避免混入旧26人数据；音轨由用户打开，账号/支付/公告详情与长片保留官方边界。每页逐状态用真实浏览器检验并记录尺寸/时序/资源失败/反向/键盘/减少动态，来源观察、源码配置、实现覆盖和验证pending分开，严禁凭截图概括或伪造全面pass。",
    "negativePrompt": "不要只做白底黄绿卡片或单人静图；不要用百分比CSS放大替代透明视频或虚构人物3D网格；不要把静态源码/数据已抽全写成每个运行状态通过；不要混入旧版本人物介绍、伪造实时业务或自动播放BGM。",
    "demo": "demos/cases/endfield-industrial/index.html",
    "preview": "previews/cases/endfield-industrial.jpg",
    "research": "docs/cases/endfield-industrial.md",
    "exercise": "替换为有使用权的科研设备图像，保留斜线注册大字与竖向类别书脊，检验背景标签与正文在手机上仍有清楚的主次。",
    "composition": {
      "color": "源干员与工业白底/黑标签/淡网格/亮黄局部信号；首页活动原色、深色世界观和影像各保留，彩色人物与标定条不被统一染黄。",
      "typography": "原字体、字号、字距、巨大斜线ENDFIELD与实心姓名/小编号；原素材纹理和mask沿源CSS。",
      "layout": "原八章自然滚动、固定侧栏和portrait布局；35人头像窗口及目录，六项世界观，全媒体/相册/公告结构。",
      "imagery": "35组头像/立绘/肖像和70透明角色视频、六bin点云、10媒体封面/预览、版本日历、4玩法视频/5AIC图及官方字体；完整影片走原URL。",
      "shape": "巨大斜线背景字、十字标定、REC、小编号、淡网格与实心资料；AIC竖书脊保留在媒体边界，黑黄三层作为切换状态。",
      "hierarchy": "活动入口→完整干员→世界观→影像→日历→玩法→工业→公告；每章保留原用途、目录/控制与真实业务入口。",
      "motion": "原CSS与算法提供时序依据；透明视频enter→idle、点云真实数据与源参数、相册方向层及公告展开；浏览器实测与pending见fidelity。",
      "coherence": "档案身份建立在真实素材、数据/标签、字体与状态机制上；不同章节无需统一成白黄卡片，相同编号/标定/导航贯穿门户。"
    },
    "referenceUrl": "https://endfield.hypergryph.com/",
    "implementation": "reference-study",
    "fidelity": "demos/cases/endfield-industrial/fidelity.md",
    "assetManifest": "demos/cases/endfield-industrial/assets-manifest.json",
    "capturedAt": "2026-10-09",
    "themeBehavior": {
      "mode": "fixed",
      "default": "light",
      "control": "所访公开官网无独立主题切换，本地固定保留各章节原浅/深场景；不把整站统一为白色。",
      "designReason": "各章原色与资料角色共存，亮黄只作状态与工业信号，不改变IP人物和活动图像。"
    },
    "soundBehavior": {
      "kind": "interactive",
      "control": "桌面声音工具与手机喇叭共用状态，默认关闭、aria-pressed同步；用户开启后播放原BGM及选干员/2D↔3D、头像翻页、档案展开/收起四种原音。关闭或后台立即停止，返回只恢复已开启BGM；预览和角色影片静音，完整影像独立控制。",
      "interactionRole": "机械短音与点击同刻触发，反馈选择、模式切换、翻页和档案开合；原音量1与10槽叠响依据公开源码及部分现场播放事件。目录选卡沿用角色选择反馈为本地迁移；不宣称其源目录或全部网站操作音已验证。"
    }
  },
  {
    "id": "rhine-lab",
    "order": 34,
    "title": "莱茵生命 · 影像终端的网页转译",
    "subtitle": "RHINE LAB / SOURCE FILM + INTERACTIVE WEB STUDY",
    "category": "游戏/IP",
    "country": "中国",
    "studyScope": "visual-adaptation",
    "tags": [
      "莱茵生命",
      "明日方舟",
      "官方影像网页转译",
      "原片段时序",
      "教学改编",
      "立体档案阵列",
      "双环光学",
      "环形连字",
      "科室矩阵",
      "橙色节点",
      "原比例"
    ],
    "summary": "以官方影片的多排透明档案、双环光学、细射线与完整科室字标保留原作细节；四个原比例无声场景配合本地章选、档案显隐和矩阵点选，明确属于影像的网页转译。",
    "accent": "#eb7900",
    "background": "#edeae5",
    "principles": [
      "官方影片27–39.2秒：大量平行立体档案覆盖视野，一件X-001被抬出，镜头靠近透明板，随后出现细射线、标定点和机密文字；不是少量平面卡片行。",
      "官方影片59.6–73.4秒：CMPT CTRL为中心，DEF、HRI、BSN、ENG、STRU、SCIEN、ORIG、NRG、ECO九个外围科室形成非等宽矩阵；环形连字、黑白表面、倾斜、射线和橙色空心节点共同编码机构。",
      "官方影片19.2–23.4秒的黑白细弧环和橙色节点形成许可处理过程；39.2–51.52秒双环的厚度、灰色透明渐变、橙色内缘与镜头旋转属于光学材质，不能用一个CSS圆框替代。",
      "本地使用四个1920×1080、25fps、1倍速度的官方无声片段与原尺寸解码帧保留光学和字标；章选、暂停重播、进度、档案选择/显隐和科室节点为可独立学习的网页状态代码。"
    ],
    "productFocus": "官方影像的网页转译／教学改编：固定2026-10-09采集的2022《莱茵生命：访问》，选取许可环线、档案阵列、双环光学和机构矩阵四个场景。保留原作媒体构成与片内时序，本地五份观察目录及十模块点选是adapted；不是官方品牌网站或原作3D源码移植。",
    "interaction": [
      "本地教学改编：在原作多排立体档案的35秒原帧上提供五个观察热点及前后选择，同一状态同步观察编号、标题、正文并收起旧展开；阵列显隐仅隐藏背景阵列，保留按源端四角轮廓裁切的抬出板。五个热点不是原片中的五个可点击档案。",
      "本地教学改编：原生展开按钮同步aria-expanded和正文；档案热点支持左右方向键，当前项与焦点同步。五份观察是本库的构成解释，不虚构机密档案内容或认证。",
      "本地教学改编：四个章选即时呈现各自原帧；播放、暂停、从头重播和0.04秒步长的范围条控制对应官方无声片段，源时间码与位置同步，最新请求取消旧解码回调。可选择连续播放四段，片内时序保留，段间连接为网页编排。",
      "本地教学改编：机构原帧上的十个DOM热点与可读目录按钮同步选择、全称、解释及同源橙色空心节点位置；原片只提供完整字标和矩阵运动，没有网页点击证据。手机保留16:9全幅画面，不裁成竖构图；用下方正常字号按钮提供等价科室入口。",
      "本地教学改编：默认静态原帧且无自动声音；减少动态保持章选、原帧、档案/矩阵与阅读，关闭本地220/180ms位移并停用连续自动推进，仍允许用户主动逐段播放和暂停。片段加载失败可重试或回到静态原帧。",
      "官方四周年专题的孤星活动背景只保留在比较来源卡；本地不把它当作莱茵档案矩阵的网页版本，完整原片、声音及专题在第一方入口打开。"
    ],
    "theme": "原作米白透明档案、黑白机构字标、橙色光学内缘与小面积状态节点形成研究终端；本地保持原色与16:9比例，外围控制使用相同中性色，不额外添加深绿卡片或整页主题切换。",
    "constraints": [
      "studyScope为visual-adaptation。标题、首屏和来源区均声明影像的网页转译；原作没有可核验的对应网页按钮。媒体保留与本地状态代码分别说明，不能称为官方品牌站复刻。",
      "2026-10-09实际观看官方Bilibili账号UID161775300发布的PV，通过video解码原尺寸帧与实际媒体轨道核验。原轨道HEVC、1920×1080、25fps、318.8秒，原文件hash/来源在清单，完整原轨道归档于仓库外。",
      "仓库保存四个必要无声H264片段，截取19.20–23.40、27.00–39.20、39.20–51.52、59.60–73.40秒；保持1倍速度、原尺寸及25fps，CRF18转码会有压缩差异，不能声称视频字节与原轨道一致。 双环片段请求12.30秒，实际25fps输出308帧/12.32秒，范围按实际末端51.52秒记录。",
      "22、35、48、68秒原尺寸解码帧未缩放/改色；机构字标和透明材质由原作媒体保留，没有重写影片的3D渲染器或臆造字体名称。点选、档案遮罩、节点移动、范围条与连续章编排均为本地代码。",
      "原片只检索并抬出X-001，本地五个观察样本属于教学目录；选中板的小位移与阵列显隐为adapted，不能说成原片悬停或档案数量。科室目录保留一中心加九外围，不扩写权限和完整游戏设定。",
      "官方字体/标志细节在原帧中保留；外围网页文字用系统字体，未单独复制字体包。官方封面与孤星背景仅作来源卡。片段无音轨，完整声音留在官方播放器。",
      "原画面使用等比例全幅展示，手机16:9构图仍保持完整，下方语义目录承担可读操作；这属于网页适配，不冒称原作有手机布局。",
      "RhineLabUI 为外部第三方代码复刻参考，固定核验版本 12cc5e4013acb9408f753ff71de6b8492299b7c8；本地不载入其 Three.js 工程、GLB、字体或音频，不将其实现精度、移动端或性能描述为本次已运行验证。"
    ],
    "useCases": [
      "机构影像转译为可操作资料",
      "光学/工业素材的场景式展示",
      "保留特殊字标的机构矩阵目录"
    ],
    "avoid": [
      "用泛化卡片替代立体阵列",
      "用普通字体抹平环形连字",
      "把媒体编排包装成3D源码复刻"
    ],
    "tokens": {
      "palette": [
        "#edeae5",
        "#111310",
        "#eb7900",
        "#c3c1ba"
      ],
      "type": "原帧保留RHINE LAB/ANALYSIS OS及十组特殊环形连字的真实像素；外围语义控件用系统中文/Arial及等宽时间码，不臆造官方字体。",
      "layout": "16:9原比例场景，保留大量立体阵列、完整中心/九外围矩阵及源端射线；外围四章控制、时间范围条与自然阅读。手机保留全幅场景，正常字号的目录/说明另行重排。",
      "motion": "原作片段分别4.2/12.2/12.32/13.8秒，25fps、1倍速度；原片内部镜头不重定时。本地板220ms微移、节点180ms移动为adapted，减少动态关闭并保留原帧/选择；播放由用户主动启用。"
    },
    "sources": [
      {
        "title": "明日方舟官方 · 特别映像「莱茵生命：访问」",
        "url": "https://www.bilibili.com/video/BV1rr4y1b7sz/",
        "type": "实例",
        "note": "官方UID161775300于2022-04-26发布。2026-10-09实际播放器观看并保存原尺寸关键帧/媒体轨道，核验1920×1080、25fps与四段许可/档案/光学/矩阵时序；网页点选是adapted。直接检索曾返回412，浏览器与公开媒体资源采集成功。"
      },
      {
        "title": "Hypergryph · 明日方舟四周年官方专题",
        "url": "https://ak.hypergryph.com/special/4th-anniversary/index.html",
        "type": "实例",
        "note": "官方2023专题，只作为孤星机械空间主图及真实宣传网页的比较来源；不支持莱茵档案点击或矩阵网页交互。"
      },
      {
        "title": "RhineLabUI · LBEILC 的第三方代码复刻（用户 fork）",
        "url": "https://github.com/MIBXR/RhineLabUI",
        "type": "实例",
        "note": "2026-10-11 核验 fork 与上游同为 12cc5e4013acb9408f753ff71de6b8492299b7c8。TypeScript、Three.js、Vite 实现 DOM/SVG 开场、档案阵列、解密及模型交互；搜索和收藏为开发者扩展。本库仅链接与说明，未运行或集成其三维工程。"
      },
      {
        "title": "LBEILC/RhineLabUI · 作者原仓库与许可边界",
        "url": "https://github.com/LBEILC/RhineLabUI",
        "type": "实例",
        "note": "作者原创代码采用 MIT；游戏名称、标志、原作媒体、第三方字体不因此获得 MIT 授权。源码阅读不等于完整视觉或性能实测。"
      },
      {
        "title": "W3C · Disclosure Pattern",
        "url": "https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/",
        "type": "规范",
        "note": "支持本地原生展开按钮、aria-expanded与正文关联，属于网页转译的实现依据。"
      },
      {
        "title": "W3C · Use of Color",
        "url": "https://www.w3.org/WAI/WCAG22/Understanding/use-of-color.html",
        "type": "规范",
        "note": "支持选中项同时以边界、编号、文字和aria状态区分；橙色不能独自承担状态含义。"
      },
      {
        "title": "W3C · Animation from Interactions",
        "url": "https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions.html",
        "type": "规范",
        "note": "WCAG2.3.3为AAA；指导本地取消非必要档案位移和平滑滚动，不声称原片或专题满足该条。"
      },
      {
        "title": "W3C · Pause, Stop, Hide",
        "url": "https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide.html",
        "type": "规范",
        "note": "本地连续片段播放提供明确暂停，后台暂停；减少动态默认静态，用户可主动逐段观看。"
      }
    ],
    "prompt": "制作一个明确标注“官方影像的网页转译／教学改编”的莱茵研究终端，使用已授权来源的原尺寸媒体保持真实构成，不以泛化五卡片或普通字体替代原作。四个场景分别为19.20–23.40许可弧环、27.00–39.20多排立体档案与单件X-001抬出/射线、39.20–51.52透明双环光学、59.60–73.40完整机构矩阵。必要官方片段保留1920×1080、25fps、1倍速度且无音轨，默认呈现35秒原帧；22/35/48/68秒原帧不缩放改色，记录原轨道hash、时间范围、转码参数与权利。影片负责难以精确重绘的光学材质与特殊字标，本地代码实现四章选中、播放/暂停/从头重播、0.04秒步长进度及源时间码，最新请求取消旧解码回调，失败能重试或保留原帧。档案区在真实多排阵列上提供五个本地观察热点、前后选择与可展开正文，同一个状态同步编号/标题/解释并收起旧正文；阵列显隐隐藏背景，选中板保留按官方四角轮廓裁切的同源像素。明确五热点是教学目录，原片只检索X-001。矩阵保留CMPT CTRL中心及DEF/HRI/BSN/ENG/STRU/SCIEN/ORIG/NRG/ECO九外围，环形连字、黑白表面、倾斜与射线仍可见；DOM热点与下方可读按钮同步同源橙色节点及解释，不能扩写组织权限。手机全幅16:9不裁切，正文和等价科室目录保持正常字号；固定米白主题，完整声音在官方外部播放器。减少动态保持静态原帧与全部状态，关闭板/节点位移和连续自动推进，仍可由用户逐段主动播放并暂停。源端影像时序、媒体保留、本地适配与未复现的完整影片/3D源码分别记录。",
    "negativePrompt": "不要把官方影像叫官方莱茵品牌网站；不要把大量立体档案改成五张通用平面卡；不要用CSS圆框替代厚度/灰色渐变/橙色内缘，不用Arial重排原作特殊连字；不要把影片抽出说成网页点击，不伪造权限/机密正文；不要声称H264转码字节等同原轨道，不自动出声、裁掉手机画面或复制整片3D源码的虚假边界。",
    "demo": "demos/cases/rhine-lab/index.html",
    "preview": "previews/cases/rhine-lab.jpg",
    "research": "docs/cases/rhine-lab.md",
    "exercise": "将拥有使用权的机构影片拆为四个有明确时间范围的场景，保留原尺寸与片内时序；用语义按钮与数据状态实现章选和目录，分别审阅媒体准确度与交互可复用性。",
    "composition": {
      "color": "源片米白透明档案与黑白机构字标保持原色，双环内缘及业务科焦点使用橙色；本地外围用米白、黑色和同源橙色节点，素材没有深绿/黄绿重着色。",
      "typography": "官方68秒原帧保留CMPT CTRL中心，以及DEF、HRI、BSN、ENG、STRU、SCIEN、ORIG、NRG、ECO九外围的环形连字、英文全称、黑白表面、透视倾斜及尺度差；网页控件使用系统字体，不替代原作字标。",
      "layout": "源片大量平行立体档案覆盖视野并抽出单件，机构采用一中心加九外围的非等宽矩阵与细射线；本地以16:9全幅场景保留构图，四章控件和说明在原画面外围自然阅读。",
      "imagery": "四个官方无声H264片段与22/35/48/68秒原尺寸解码帧保存透明阵列、双环材质及真实字标；橙色节点裁自68秒帧。本地没有重写原片3D渲染器；封面和孤星背景仅作来源卡。",
      "shape": "源片黑白弧环/橙色节点、档案四角标定/细射线、大小双环的灰色透明厚度与橙色内缘、中心矩阵及特殊环形字标；本地档案显隐遮罩按35秒抬出板的四角轮廓定位。",
      "hierarchy": "原比例档案抽出画面 → 四个原作场景与媒体状态 → 本地观察目录/展开阅读 → 十模块语义科室入口与解释 → 官方影片及辅助网页来源。",
      "motion": "许可环线、立体阵列抽出/镜头靠近、双环旋转和机构模块入场沿官方片段25fps/1倍速度；本地章选即时换原帧，点击板/节点位移及四段连续编排为adapted。",
      "coherence": "原作米白材质、环形连字、橙色内缘/节点、射线和编号在四个场景中连贯；语义按钮、同步时间码与阅读状态环绕原画面，媒体与网页改编各自可审阅。"
    },
    "referenceUrl": "https://www.bilibili.com/video/BV1rr4y1b7sz/",
    "implementation": "reference-study",
    "fidelity": "demos/cases/rhine-lab/fidelity.md",
    "assetManifest": "demos/cases/rhine-lab/assets-manifest.json",
    "capturedAt": "2026-10-09",
    "themeBehavior": {
      "mode": "fixed",
      "default": "light",
      "control": "固定米白主题，原片中的黑色字标/材质不等于网页深浅色切换。",
      "designReason": "保持源片材料、光学渐变和字标的原色，外围控件沿同一研究终端中性色。"
    },
    "soundBehavior": {
      "kind": "external",
      "control": "本地四个片段均无音轨；完整原片声音由官方Bilibili播放器控制，页面不自动出声。",
      "interactionRole": "媒体保留源端视觉时序，网页状态靠按钮、节点、文字与时间码反馈；不臆造原片独立BGM或操作音。"
    }
  },
  {
    "id": "zenless-zone-zero",
    "order": 35,
    "title": "绝区零 · 六章街头拼贴首页",
    "category": "游戏/IP",
    "country": "中国",
    "capturedAt": "2026-10-11",
    "referenceUrl": "https://zzz.mihoyo.com/main",
    "implementation": "reference-study",
    "demo": "demos/cases/zenless-zone-zero/index.html",
    "preview": "previews/cases/zenless-zone-zero.jpg",
    "research": "docs/cases/zenless-zone-zero.md",
    "fidelity": "demos/cases/zenless-zone-zero/fidelity.md",
    "assetManifest": "demos/cases/zenless-zone-zero/assets-manifest.json",
    "subtitle": "ZENLESS ZONE ZERO / OFFICIAL HOME SNAPSHOT",
    "edition": "2026-10-11 中国官网首页；六章完整内容，独立子页链接官网",
    "tags": [
      "绝区零",
      "完整首页",
      "街头拼贴",
      "斜切",
      "角色舞台",
      "缩略图分页",
      "BGM",
      "中国"
    ],
    "summary": "原画、斜切胶片和荧光黄章节标记串起六章首页；62名角色、9部影像、6条新闻、3张设定与4组游戏特色保留各自的浏览方式。",
    "accent": "#dfff00",
    "background": "#efefef",
    "principles": [
      "首页沿自然滚动串起主视觉、角色介绍、影像资料、新闻资讯、设定档案和游戏特色；右侧01–06编号轨道负责章内位置，顶栏负责官方独立页面。",
      "荧光黄编号块、黑色斜面、灰白大底、胶片齿孔和超大英文构成跨章骨架；角色与摄影保持原图比例，页面不用统一矩形卡片替代这些轮廓。",
      "角色舞台把立绘、阴影、阵营、中文名与英文背景视为同一个选中状态；缩略图翻页是独立浏览窗口，不顺带改变当前人物。",
      "桌面以25.6rem、手机以7.5rem为设计宽度；手机使用官方移动素材和紧凑构图，保留六章及底部可收起下载栏。"
    ],
    "productFocus": "官网首页的完整浏览体验：让游戏身份、人物、视频、新闻、世界设定及玩法依次可见；角色详情、新闻文章、设定和影像独立页继续指向官网。",
    "interaction": [
      "选择角色缩略图，同时切换62人中的立绘、阴影、阵营、中文名与英文背景；桌面角色图以500ms位移/透明度进入，阴影300ms，姓名与阵营延迟交接。",
      "角色箭头每次移动三张缩略图，保持当前人物不变；点击缩略图才选择角色。影像箭头则同步改变当前视频、标题、日期和缩略图位置，9部影像不循环越界。",
      "右侧01–06及上下箭头以650ms Power2.easeOut滚动到章节顶部，编号同步当前位置；背景、巨字和斜面按不同幅度视差移动，章节标题与面板分层进入。",
      "新闻6张横向轮播并同步标题、日期与滚动摘要；设定3张循环横移；特色4张交叉淡化并更换标题和说明。手机支持水平手势，独立内容打开官方详情。",
      "背景音乐由用户主动启用；点击影像静音BGM、打开原始官方视频播放器，关闭后按先前声音意图恢复。媒体失败显示可重试的官方入口；不把封面或静图称作视频播放。",
      "手机滚动超过三分之一视口显示菜单按钮；菜单支持关闭、Escape和焦点返回，底部下载栏在滚动100px后收起，可手动展开；下载与云游戏使用官网公开配置的实际入口。",
      "进入首页时显示官方邦布30帧精灵加载动画；主视觉图和字体就绪后退出。适龄提示、关注面板、二维码、分享链接与回到顶部均有对应操作。"
    ],
    "theme": "固定灰白、炭黑与荧光黄品牌主题；角色及游戏摄影保持原色，没有额外的全页主题切换。",
    "constraints": [
      "范围按用户确认：完整首页体验，独立子页链接官网；不包含账号、充值、安装或新闻后台。本地注明非官方网站。",
      "固定2026-10-11公开内容快照；角色62、影像9、新闻6、设定3、特色4。版本文案、新闻时间和角色名单不随原站后台自动变化。",
      "页面保留官方DOM构图、样式、字体、图像及BGM；交互调度由本地原生JS实现。章节入场和滚动视差按公开源码重建，浏览器差异与精度边界见fidelity，不宣称逐像素等同。",
      "影片保留9个官方原始MP4地址，用户点击才流式加载；它们不包含在离线素材包中。完整导出包含所有归档静态素材、字体、BGM与源码，影片仍需网络。",
      "手机源站在当前浏览器模拟器中触发方向提示，移动结构、样式和行为有第一方源码依据；本地390px已可操作，源站手机裸页面的逐帧视觉对照和真实手机仍需另行验证。",
      "官方游戏美术、字体和音乐保留来源与原始字节，不以仓库许可替代权利人的使用许可；键盘、焦点、默认静音及后台媒体管理为本地无障碍适配。"
    ],
    "useCases": [
      "具有强角色身份的游戏首页",
      "多章品牌与媒体展示",
      "大量人物的局部浏览窗口"
    ],
    "avoid": [
      "删减完整首页章节或角色名单",
      "让头像翻页意外切换人物",
      "将动态换态替换为整页视频截图"
    ],
    "tokens": {
      "palette": [
        "#efefef",
        "#111111",
        "#dfff00",
        "#767678",
        "#464646"
      ],
      "type": "官方Impact数字与英文、鸿蒙体常规/细体、MontHeavy及图标字形；桌面根字号width/25.6，手机width/7.5。来源艺术字号按原构图保存。",
      "layout": "六章自然滚动；斜面交错、右侧编号轨道、人物立绘跨越面板边界、新闻/影像/设定使用各自尺寸窗口；手机保留独立移动布局。",
      "motion": "章节650ms立方缓出；角色500/300ms分层换态；三种轮播默认300ms；新闻摘要20s线性循环；加载精灵500ms/30帧。"
    },
    "sources": [
      {
        "title": "绝区零中国官网首页",
        "url": "https://zzz.mihoyo.com/main",
        "type": "实例",
        "note": "2026-10-11 实际观察桌面六章、角色选择、影像和特色切换；来源当前首页而非2022概念站。"
      },
      {
        "title": "绝区零官方移动首页",
        "url": "https://zzz.mihoyo.com/m/main",
        "type": "实例",
        "note": "移动DOM、CSS和公开组件用于核对7.5rem构图、角色与下载栏；当前模拟器方向检测限制单列说明。"
      },
      {
        "title": "绝区零官方首页公开内容接口",
        "url": "https://api-takumi-static.mihoyo.com/content_v2_user/app/706fd13a87294881/getContentList?iChanId=272&iPageSize=200&iPage=1&sLangKey=zh-cn",
        "type": "实例",
        "note": "公开角色列表及同应用首页频道形成归档快照；不是从第三方百科补写。"
      },
      {
        "title": "绝区零官方界面与下载配置",
        "url": "https://fastcdn.mihoyo.com/mi18n/nap_cn/m03111446031031/m03111446031031-zh-cn.json",
        "type": "实例",
        "note": "适龄、菜单、分享文案及各平台官方下载地址。"
      },
      {
        "title": "WAI Carousel Pattern",
        "url": "https://www.w3.org/WAI/ARIA/apg/patterns/carousel/",
        "type": "规范",
        "note": "轮播控制、焦点及动态内容的无障碍参考；本地键盘适配不冒称原站观察。"
      }
    ],
    "prompt": "以绝区零中国官网2026-10-11首页快照为依据，实现【目标游戏】的完整六章首页。先读取本案例index.html、mobile.html、reference.css、reference-mobile.css、app.js、data.js、素材清单、研究与fidelity，再开始实现。保留主视觉、角色、影像、新闻、设定、特色的顺序与原有斜切胶片骨架，使用有权使用的真实角色与素材。角色的立绘、影子、阵营、中文名和英文背景必须同步；头像窗口翻三格不改变当前人物。视频箭头切换视频，新闻/世界/特色保留不同轮播结构。右侧编号定位章节顶部；手机使用7.5rem构图、真实移动素材、滚动后菜单和可收起下载栏。用户主动启用声音，视频与BGM互斥。保留加载、返回、反向快速操作、键盘焦点与减少动态状态。账号和独立内容页链接正式服务，不用演示假装执行。完整导出包含本地归档素材，影片为官方流式地址，需要网络；不把code-only说成完整离线包。",
    "negativePrompt": "不要少做章节、角色或媒体条目；不要把头像翻页和人物选择混为一谈；不要把所有斜面改成普通圆角卡片；不要使用整页视频代替代码交互；不要伪造原站操作音、账号或许可。",
    "exercise": "保留一套真实人物资料，分别实现头像窗口翻页与人物选择，检查翻页后当前身份不变、快速选择后所有身份线索一致。",
    "composition": {
      "color": "灰白连续页面、黑色结构板与荧光黄定位标记承担层级，彩色角色与摄影作为主体。",
      "typography": "Impact英文和大编号提供章节尺度，鸿蒙体用于中文名、菜单与内容，图像中的品牌字标保留原素材。",
      "layout": "六章沿自然滚动连接，左右交错的章节索引与斜面构成节奏；固定右轨提供位置感。",
      "imagery": "官方桌面/手机主视觉、62人分层角色图、9个影像封面、6个新闻封面、3个设定和4个特色画面。",
      "shape": "胶片齿孔、斜切面板、斜向人物窗口、粗描边胶囊和边缘编号轨道。",
      "hierarchy": "主视觉先传递游戏身份；人物和影像建立兴趣，新闻与设定提供深读入口，特色收束卖点。",
      "motion": "角色分层换态、独立头像窗口、影像选择、新闻横移、特色淡化与跨章视差各有职责。",
      "coherence": "轮廓、字体和荧光色跨六章重复，内容密度与主图尺寸随模块职责变化，手机保留同一视觉语言。"
    },
    "themeBehavior": {
      "mode": "fixed",
      "default": "light",
      "control": "固定品牌主题，无全局切换。",
      "designReason": "保留灰白空间、黑色斜面与荧光黄目录的关系。"
    },
    "soundBehavior": {
      "kind": "background",
      "control": "顶栏主动启用BGM；影片打开静音、关闭按用户意图恢复；后台暂停。",
      "interactionRole": "原BGM提供游戏氛围，影片保留原音轨；未发现足够证据支持额外角色/按钮短音，不添加虚构音效。"
    }
  },
  {
    "id": "deepseek-harness",
    "order": 36,
    "title": "DeepSeek Harness · 可观察的产品演示",
    "category": "产品",
    "country": "中国",
    "capturedAt": "2026-10-11",
    "referenceUrl": "https://www.deepseek.com/harness/",
    "implementation": "reference-study",
    "demo": "demos/cases/deepseek-harness/index.html",
    "preview": "previews/cases/deepseek-harness.jpg",
    "research": "docs/cases/deepseek-harness.md",
    "fidelity": "demos/cases/deepseek-harness/fidelity.md",
    "assetManifest": "demos/cases/deepseek-harness/assets-manifest.json",
    "subtitle": "DEEPSEEK HARNESS / READY TO USE. RIGHT NOW.",
    "edition": "2026-10-11 官方产品页中英文快照；完整落地页与四组动态演示",
    "tags": [
      "DeepSeek",
      "Harness",
      "完整产品页",
      "流体着色器",
      "插件",
      "执行轨迹",
      "代码动效",
      "中国"
    ],
    "summary": "深色流体主视觉衬托真实DOM工作台；插件、文件、自动化和执行轨迹四组代码动画，把产品能力拆成可观察的过程与结果。",
    "accent": "#82b7fc",
    "background": "#0a0a0a",
    "principles": [
      "先展示完整对话工作台，再以插件、成果、工作流和轨迹四张动态卡说明能力；开发者命令和生态入口负责后续行动。",
      "产品预览与四组演示使用真实DOM/CSS，Hero是WebGL2流体，页尾是网格和196个立方体；没有用视频覆盖整个产品界面。",
      "黑色背景、低透明白边框、少量蓝色光晕与白色主按钮形成克制层级；动画中的结构、代码和结果承担信息量。",
      "四卡保留独立暂停状态，离开视口停止推进；移动端从双列转单列，演示内部按容器宽度改变构图而不是只缩整张截图。"
    ],
    "productFocus": "通过插件创建、文件成果、定时工作和执行轨迹说明可组合的Agent产品，再提供下载、命令启动、源码、文档和社区入口。",
    "interaction": [
      "Hero使用官方WebGL2流体着色器，蓝灰五色场、暖色光核与低强度光晕持续演化；30fps、DPR上限1.5、离屏暂停。输入流场是1×1中性纹理，没有指针搅动逻辑。",
      "插件演示22秒：对话输入、10条工具步骤、过程折叠、番茄钟放大，再缩至右上角；插件管理器滚过7个官方插件并高亮已安装项，挂件贯穿场景交接。",
      "成果演示17.5秒：Word、Excel、HTML、TypeScript、Python、PDF、Markdown七类文件向上轮换；每格保持1.3秒、移动1.2秒，固定代码差异层显示+2−1。",
      "工作流演示每11秒切换周报、销售汇总和项目测试三种故事；输入JSON先出现，替换为计划结果，再收起执行过程并留下任务卡。使用固定2026-09-01演示时间，不创建真实任务。",
      "轨迹演示15秒：工具栏、三条泳道和37段时序先后进入，两轮日志上移，最后展开bash调用详情，在结果与计时之间交接，显示NAVIGATION_OK和34毫秒。",
      "四组演示分别在进入视口后播放，手动暂停优先于重入；离屏或后台暂停。减少动态使用原版插件/轨迹静态回退和文件/工作流的可读状态。",
      "页尾196个Three.js立方体随滚动从球面散布聚合为像素标志；独立2D网格以90px间隔绘制断开线段和3.6px方点，手机隐藏三维层。",
      "滚动超过80px，顶栏收缩为磨砂胶囊；中英切换、桌面下载菜单、手机全屏导航、命令复制反馈及公众号二维码均保留原组件。"
    ],
    "theme": "固定深色主题，底色#0a0a0a、白色文字与不同透明度的边框/表面；产品演示内部保留原配色。",
    "constraints": [
      "本地挂载官方公开营销页面模块，保留必要React、Framer、Three/R3F依赖，限定在独立Demo的vendor目录；Web Atlas主站架构仍为原生HTML/CSS/JS。",
      "本地加载器只注册模块，不执行Next全站启动回调；替换路由、静态语言/区域、素材前缀及统计边界。国内快照不请求IP地区识别服务，也不自动导入账户或遥测。",
      "动画中的工具调用、JSON、文件和定时任务属于官网预设演示，不运行模型、脚本、插件安装或任务调度。下载/政策/产品功能仍通向正式网站。",
      "保留官方字体与CSS；中文采用系统字体回退。Google Noto Sans SC外部CSS未打包，当前观察中未请求其字体子集，不能声称完整归档Noto字库。",
      "产品仓库MIT许可不自动覆盖营销页、品牌和字体；原始vendor及素材保存SHA256和来源，迁移前需确认各自许可。",
      "已在当前Chromium环境验收页面挂载；真实手机GPU、Safari/Firefox、下载安装和系统剪贴板跨应用结果不在本次已验证范围。"
    ],
    "useCases": [
      "开发者工具落地页",
      "需要解释多阶段能力的智能体产品",
      "以过程和成果说明功能的产品演示"
    ],
    "avoid": [
      "以一张截图代替演示全部状态",
      "把产品预设动画称作模型真实执行",
      "把页面依赖引入整个参考库主站"
    ],
    "tokens": {
      "palette": [
        "#0a0a0a",
        "#ffffff",
        "#204a7e",
        "#cec8bb",
        "#82b7fc"
      ],
      "type": "DM Sans正文、Montserrat拉丁标题、Fragment Mono代码；中文系统回退。H2手机28/42px、桌面36/54px，H3 20/30px；拟真UI内部7–9px保留来源尺度。",
      "layout": "内容最大1140px，超宽1280px；Hero工作台612px高，手机504px并隐藏侧栏。能力区1024px以上两列，下方单列，卡片40px内边距、32px间距。",
      "motion": "Hero标题900ms，说明延迟150ms、预览400ms；四卡22/17.5/11/15秒，循环与暂停独立；顶栏spring180/28；页尾三维层30fps、DPR上限1.5。"
    },
    "sources": [
      {
        "title": "DeepSeek Harness 官方中文产品页",
        "url": "https://www.deepseek.com/harness/",
        "type": "实例",
        "note": "2026-10-11 实际观察全部章节、四组播放/暂停和页尾GPU层；官网公开页面模块与素材为复现来源。"
      },
      {
        "title": "DeepSeek Harness 官方英文产品页",
        "url": "https://www.deepseek.com/en/harness/",
        "type": "实例",
        "note": "保留完整英文文案与两张英文回退图，本地lang=en切换。"
      },
      {
        "title": "DeepSeek Harness 官方产品仓库",
        "url": "https://github.com/deepseek-ai/deepseek-harness",
        "type": "实例",
        "note": "产品代码和文档入口；仓库website为文档站，不冒称营销页由该目录构建。"
      },
      {
        "title": "DeepSeek Harness 品牌规范",
        "url": "https://github.com/deepseek-ai/deepseek-harness/blob/master/BRAND_GUIDELINES.zh.md",
        "type": "实例",
        "note": "品牌来源、准确描述和避免官方背书误认；产品MIT与营销资源权利分别记录。"
      },
      {
        "title": "W3C Pause, Stop, Hide",
        "url": "https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide.html",
        "type": "规范",
        "note": "独立暂停控制和减少动态分支的无障碍依据。"
      }
    ],
    "prompt": "以DeepSeek Harness在2026-10-11的官方中英文落地页为依据，实现【目标产品】的完整产品介绍。先读取index.html、app.js、runtime.js、reference.css、messages.js、vendor原始模块、研究和fidelity；Prompt不能代替源码。保留Hero实时WebGL2流体、完整DOM对话工作台、四张能力卡、两张开发者命令卡、生态CTA和页尾。四卡必须覆盖插件创建到挂件跨场景保留、七类文件与固定diff、三种工作流的输入→结果→过程折叠、三泳道日志到调用详情；独立暂停、离屏停止和减少动态结果同时存在。保留196立方体随滚动聚合的页尾，不以静态背景或随机星点替代。响应式既改变网格也改变卡内构图，保留中英文、下载菜单、复制与二维码交互。复用时只接入目标产品真实可用的流程，标明固定演示，不执行动画中的命令或伪造结果；素材与第三方代码分别核实许可，不把产品MIT套用到所有营销资源。",
    "negativePrompt": "不要用录屏替代DOM动态；不要漏掉工作流三场景、插件挂件保留或轨迹详情；不要为流体添加无来源的鼠标交互；不要把插图当作真实AI执行；不要擅自搬入统计或账户服务。",
    "exercise": "选用一项真实能力，将输入、执行过程、可交付结果拆成三个阶段；让一个成果物在下一场景继续存在，并保留独立暂停和静态可读状态。",
    "composition": {
      "color": "黑底与透明白表面形成深度，蓝灰流体和页尾蓝光将重心限定在产品舞台。",
      "typography": "自然语言标题与等宽代码形成职责对比；两种语言保留相同内容层级和原生换行。",
      "layout": "Hero主张和工作台→四卡能力→两种开发入口→生态和版权；1024px下改为单列。",
      "imagery": "绝大部分产品画面为可检查的DOM，不是视频；WebP仅用于指定回退，SVG图标与字体保持原资产。",
      "shape": "磨砂胶囊导航、低对比细边框卡片、真实工具窗口、输入框与微小控件。",
      "hierarchy": "主张先建立用途，演示解释怎么做，命令和生态链接提供真实下一步。",
      "motion": "流体承担氛围，四张卡各自解释一个过程，页尾散点聚合完成品牌收束，暂停状态独立。",
      "coherence": "同一产品UI语言贯穿预览、插件、文件、任务和轨迹；低装饰表面让过程本身成为视觉焦点。"
    },
    "themeBehavior": {
      "mode": "fixed",
      "default": "dark",
      "control": "固定深色，没有额外系统主题按钮。",
      "designReason": "维持官网流体、透明窗口与代码演示的层次。"
    },
    "soundBehavior": {
      "kind": "none",
      "control": "原页面无audio/video和声音开关；本地不添加配乐。",
      "interactionRole": "动效和状态文本承担反馈，演示静音。"
    }
  },
  {
    "id": "stellar-museum",
    "order": 70,
    "title": "星槎 STELLAR · 太空探索博物馆",
    "subtitle": "garden-skills 的太空博物馆示范页与无 skill 基线",
    "category": "示范作品",
    "country": "来源未标注",
    "tags": [
      "示范作品",
      "虚构博物馆",
      "编辑排版",
      "程序化星球",
      "三维展示",
      "时间线",
      "基线对照"
    ],
    "summary": "来源仓库公开的太空博物馆示范页，以大标题、编号展厅、程序化三维场景和编年史组织长页；附未使用 web-design-engineer skill 时的生成结果作为基线。",
    "accent": "oklch(0.78 0.13 65)",
    "background": "oklch(0.10 0.015 250)",
    "principles": [
      "主页面以标题、编号、说明与场景组成编辑式网格，四个展厅共享三列结构，在窄屏折为单列。",
      "Instrument Serif、Space Grotesk 与 JetBrains Mono 分担展示、界面和数据层级；中文沿来源字体栈回退。",
      "近黑背景、暖白正文、少量琥珀强调和冷蓝数据标签通过 oklch 自定义属性协调。",
      "程序化月球、空间站、火星和银河属于页面内展示，不依赖外部摄影；编年史与预约票券继续提供阅读结构。"
    ],
    "productFocus": "归档 garden-skills 固定提交的生成示范页面，研究其设计机制及与无 skill 基线的结构、字体、色彩、动效和信息层级差别。页面内 STELLARIA／星海博物馆、馆藏、地址、预约信息及未来任务均按示范文案保留，不作为真实机构事实。",
    "interaction": [
      "首次进入：标题两行以 1.1 秒上移入场，第二行延迟 0.12 秒；Canvas 星空闪烁，首屏星球持续旋转，UTC 字符串每秒更新。UTC 是浏览器时钟，不是轨道实时数据。",
      "下滚超过 60px：固定导航加近黑半透明背景、16px 模糊与下边线；返回顶部恢复透明。页内锚点按目标位置减 60px 平滑滚动。",
      "展厅悬停：桌面行内上下留白从 48px 增至 56px、标题变强调色、场景放大 1.02 倍、箭头右移 8px；行项没有进入新展厅的点击处理。",
      "三维场景接近视口：IntersectionObserver 以 120px 外边距控制场景渲染；各 canvas 随容器尺寸更新，首屏按宽高比调整星球位置与尺度。",
      "订阅表单：浏览器校验邮箱后，提交仅阻止默认操作并将按钮文字改为“已订阅”；预约按钮与导览按钮保留来源的占位链接，不发起真实预约。",
      "基线版本是未使用 web-design-engineer skill 时的生成结果，依据来源 README 第 419、425–431 行；其表单提交显示成功文字，2400ms 后恢复并清空表单，仅为前端示范。",
      "首屏首次布局及容器尺寸改变：reposeHero() 按容器宽高比分五档设置同一星球的位置与缩放；宽高比大于 1.9 时为 [1.15, 0.30, 0]／0.68，大于 1.4 至 1.9 时为 [0.85, 0.30, 0]／0.58，大于 1.0 至 1.4 时为 [0.55, 0.45, 0]／0.48，大于 0.7 至 1.0 时为 [0.20, 0.80, 0]／0.45，其余为 [0.0, 0.95, 0]／0.42；大气层同步位置和比例，使横屏主角偏右、竖屏主角上移，为左下标题留白。",
      "首屏星球及月球、空间站、火星、银河窗口进入或离开扩展 120px 的视口范围：IntersectionObserver 以 rootMargin: '120px'、threshold: 0.0 更新各实例的 visible，统一帧循环跳过离屏实例，只渲染可见窗口；主循环和绝对时间仍持续推进，来源未实现页面后台可见性监听、用户暂停或离屏时间冻结，减少动态仅跳过对象旋转，仍更新着色器时间并渲染。"
    ],
    "theme": "主页面固定近黑，暖白用于主要文字，琥珀用于斜体强调和节点，冷蓝用于编年史标签；没有主题切换入口。",
    "constraints": [
      "归档对象是 ConardLi/garden-skills 的固定提交 2b9a89340b70f632d31c0f1c69fce94a7912423e，不是真实博物馆官网。主页面原文自称 STELLARIA／星海博物馆，基线自称星槎博物馆；归档标题按任务命名，不修改页内文案。",
      "主页面与基线均从固定提交 Git blob 复制，仅将 Google Fonts、preconnect 与 Three.js 外链替换为本地路径；逐项对应见 fidelity。HTML 内 CSS、JavaScript、占位链接及业务边界均保留来源。",
      "主页面需要支持 importmap、ESM 与 WebGL 的静态 HTTP 环境；Three.js 0.160.0、字体及各自许可随包保留。没有外部图片、音频或视频素材。",
      "来源的减少动态分支限制 CSS 动画、停止对象旋转及背景星空闪烁，但着色器时间、UTC 和平滑锚点滚动仍保留；本地不修改该行为，不声称完全静止。",
      "README 第 427 行文件路径多出 demo2/ 一层；归档依据实际存在的 demo/web-design-demo/demo1.html 与 demo1-with-skill.html。生成模型、运行次数及生成参数没有对应证据，不作补充推断。"
    ],
    "useCases": [
      "文化主题示范页研究",
      "编辑式长页排版",
      "程序化三维展品展示",
      "同题生成基线对照"
    ],
    "avoid": [
      "将示范内容当作真实机构资料",
      "把占位 CTA 描述为完整业务",
      "用单张截图判断全部交互精度"
    ],
    "tokens": {
      "palette": [
        "oklch(0.10 0.015 250)",
        "oklch(0.94 0.012 80)",
        "oklch(0.78 0.13 65)",
        "oklch(0.66 0.085 220)"
      ],
      "type": "来源样式：Instrument Serif 展示字、Space Grotesk 界面字、JetBrains Mono 数据字；主标题 clamp(60px, 11vw, 168px)，正文 16px，部分演示画面标签 9–11px。",
      "layout": "来源样式：内容最大宽度 1400px；横向内边距 clamp(24px, 5vw, 80px)；展厅 80px／1fr／1.1fr 三列、48px 列隙，960px 以下折为单列。",
      "motion": "来源样式与脚本：标题 1.1s／0.12s 交错；展厅留白 0.4s、图像 0.5s；星空正弦闪烁，三维对象使用共享渲染循环；减少动态边界见约束。"
    },
    "composition": {
      "color": "oklch 定义近黑表面、暖白文字、灰蓝次级信息、琥珀强调与冷蓝标签；边框以低亮度层次划分章节。",
      "typography": "展示衬线与斜体强调负责标题节奏，无衬线负责段落和导航，等宽字体负责编号、坐标、时间与票券字段；中文保持来源后备字体。",
      "layout": "全屏首部之后依次是馆长寄语、四个横向展厅、八节点纵向编年史、预约票券和四列页脚；窄屏按来源断点重排。",
      "imagery": "Three.js 以噪声着色器生成球体，以几何体组合空间站，以 12000 个粒子生成银河；背景星空为 Canvas，票券纹理为内联 SVG。",
      "shape": "轨道细环、场景四角标定、细分隔线、编年史节点与票券缺口共同延续档案和观测主题。",
      "hierarchy": "首屏宣言与星球 → 馆长寄语 → 编号展厅与说明 → 年份与历史节点 → 预约示意票券 → 联系与订阅示意。",
      "motion": "标题从行内遮罩升起，展厅悬停增加留白并放大画面；星球、空间站、银河与星空循环作为局部展示，页面仍由观看者自然滚动。",
      "coherence": "编号、坐标、细线、少量琥珀与字体职责贯穿首部、展厅、编年史和票券，将虚构博物馆的档案语言维持在同一层级。"
    },
    "sources": [
      {
        "title": "garden-skills · 有 skill 的太空博物馆示范源码",
        "url": "https://github.com/ConardLi/garden-skills/blob/2b9a89340b70f632d31c0f1c69fce94a7912423e/demo/web-design-demo/demo1-with-skill.html",
        "type": "实例",
        "note": "主页面全部 HTML、CSS 和 JavaScript 的固定版本依据；页内自称 STELLARIA／星海博物馆，内容按示范文案保留。"
      },
      {
        "title": "garden-skills · 无 skill 的基线源码",
        "url": "https://github.com/ConardLi/garden-skills/blob/2b9a89340b70f632d31c0f1c69fce94a7912423e/demo/web-design-demo/demo1.html",
        "type": "实例",
        "note": "未使用 web-design-engineer skill 时的生成结果；版本身份依据 README 第 419、425–431 行，文件实际位置以该固定提交为准。"
      },
      {
        "title": "web-design-engineer · 原始提示词与启用前后对照",
        "url": "https://github.com/ConardLi/garden-skills/blob/2b9a89340b70f632d31c0f1c69fce94a7912423e/skills/web-design-engineer/README.zh-CN.md#L417-L433",
        "type": "理论",
        "note": "第 419 行声明相同提示词下的有／无 skill 对照；第 423 行保存原始提示词，第 425–431 行列版本、字体与布局差别。作者的品质评价不作为本库实测结论。"
      },
      {
        "title": "web-design-engineer · 设计机制分析维度",
        "url": "https://github.com/ConardLi/garden-skills/blob/2b9a89340b70f632d31c0f1c69fce94a7912423e/skills/web-design-engineer/SKILL.md#L61-L71",
        "type": "规范",
        "note": "来源技能要求从色彩、字体、间距、圆角、阴影、运动和密度分析参考；仅用于解释该示范的设计机制，不声称生成过程逐步执行了全部工作流。"
      }
    ],
    "prompt": "帮我做一个'太空探索博物馆'的线上展览首页——全屏 Hero、4 个核心展览介绍、一个至少 6 个节点的时间线、参观预约 CTA、页脚。整体风格要沉浸感强、有宇宙的深邃感。\n\n出处：来源仓库固定提交 2b9a89340b70f632d31c0f1c69fce94a7912423e 的 skills/web-design-engineer/README.zh-CN.md 第 423 行，原始生成提示词照录。",
    "negativePrompt": "复现本归档时，不改来源页面的设计、文案、结构、交互或占位业务；只把外链资源换为本地路径。虚构机构、馆藏、地址和未来事件不得作为现实事实。此处为 Web Atlas 的复现约束，非来源原始负向提示词。",
    "demo": "demos/cases/stellar-museum/index.html",
    "preview": "previews/cases/stellar-museum.jpg",
    "research": "docs/cases/stellar-museum.md",
    "exercise": "在同一视口下打开主页面与 baseline.html，逐项观察结构、字体职责、色彩、局部动效与信息层级；区分作者对照说明、源码数值和实际浏览器结果。",
    "referenceUrl": "https://github.com/ConardLi/garden-skills/blob/2b9a89340b70f632d31c0f1c69fce94a7912423e/demo/web-design-demo/demo1-with-skill.html",
    "implementation": "reference-study",
    "fidelity": "demos/cases/stellar-museum/fidelity.md",
    "assetManifest": "demos/cases/stellar-museum/assets-manifest.json",
    "capturedAt": "2026-10-27",
    "patternIds": [
      "aspect-recomposed-3d-hero",
      "viewport-animation-lifecycle"
    ],
    "themeBehavior": {
      "mode": "fixed",
      "default": "dark",
      "control": "主页面与基线均为固定深色，没有主题切换；两版保留各自色彩系统。",
      "designReason": "主页面的近黑、暖白、琥珀和冷蓝配合程序化太空场景，形成来源定义的档案氛围。"
    },
    "soundBehavior": {
      "kind": "none",
      "control": "源码没有音频、视频或声音播放流程。",
      "interactionRole": "空间氛围由星空、三维场景与排版承担；叙述中的录音和环境重建只属于示范文案。"
    }
  },
  {
    "id": "mira-host-photography",
    "order": 71,
    "title": "Mira Høst · 北欧摄影作品集",
    "subtitle": "公开技能仓库中的虚构摄影师示范页",
    "category": "示范作品",
    "country": "来源未标注",
    "tags": [
      "示范作品",
      "虚构摄影师",
      "摄影作品集",
      "编辑排版",
      "衬线斜体",
      "暖纸色",
      "全幅摄影",
      "悬停预览"
    ],
    "summary": "以全幅摄影、暖纸色与墨色、衬线斜体和编号章节组织虚构摄影师的作品集；保留来源页面的慢速推镜、非对称图组和目录悬停预览。",
    "accent": "#161513",
    "background": "#f2efe8",
    "principles": [
      "摄影占满首屏，标题、作者与拍摄元数据叠于渐变遮罩上，图像承担第一视觉层。",
      "展示标题采用 Instrument Serif 正体与斜体，正文和大字距元数据采用 Space Grotesk，以字形和尺度组织层级。",
      "编号、细横线和重复对齐线连接专题、作品目录、人物介绍、合作方式、随笔与联系区域。",
      "专题采用左侧粘性说明与右侧非对称四图，目录以行式索引替代等规格卡片。"
    ],
    "productFocus": "归档 garden-skills 固定提交中的公开示范页面，研究摄影、编辑排版与局部动效如何构成一套视觉身份。来源 README 明确 Mira Høst 为虚构北欧摄影师；页面中的履历、地址、出版经历和摄影署名属于示范文案，不作为真实人物事实。",
    "interaction": [
      "首屏图片加载后增加 loaded 类，以 1.6 秒透明度过渡显现；随后以 24 秒周期交替缓慢缩放与平移，文字按来源的延迟逐词上移进入。",
      "滚动进入章节标题和内容组时，IntersectionObserver 以 0.12 阈值触发一次淡入上移；内容组按 0.12 秒递增延迟出现。",
      "桌面悬停作品目录行时，标题右移 8px、箭头右移 6px，对应照片缩略图从透明和 0.94 倍缩放进入；离开后回到初态。1100px 及以下隐藏缩略图。",
      "专题摄影与随笔封面悬停时以 1.4 秒过渡放大至 1.04 倍，离开后恢复。",
      "顶栏及页脚真实章节锚点平滑滚动到对应模块；作品目录、随笔详情与社交链接保留来源的 # 占位，不提供真实详情或账户服务。",
      "来源的减少动态分支停用首图和滚动提示线循环，使滚动显现内容直接可见，并将动画和过渡时长缩短至 0.001 秒；平滑滚动代码按原样保留。",
      "首屏始终使用同一张摄影，图片加载后以 1.6 秒透明度过渡显现；CSS 中的 Ken Burns 动画设置 1.6 秒启动延迟，每个单程 24 秒，从 1.04 倍且无平移变为 1.12 倍并平移至横向 -1.5%、纵向 -1%，再交替反向往返。文字保持独立叠层；来源未实现照片切换、交叉淡化、暂停或离屏停止，减少动态时停用该动画。"
    ],
    "theme": "暖纸色 #f2efe8 与墨色 #161513 构成固定双色基调，联系和页脚反转为墨底浅字；固定顶栏和两侧竖排标记使用差值混合跨越深浅背景。",
    "constraints": [
      "归档来源提交 2b9a89340b70f632d31c0f1c69fce94a7912423e 的 demo/web-design-demo/demo2-with-skill.html，仅将远程图片、字体样式表、字体文件与预连接目标改为本地路径，不改文案、布局或交互。",
      "README.zh-CN.md 第 436 行保存原始生成提示词，第 438–446 行将本页列为有技能示范；未据此推定生成模型、对话轮次或未公开制作过程。",
      "来源 demo/web-design-demo/demo2/index.html 是林月摄影作品集，内容不同；README 未明确其为无技能版本，本案例不设基线。",
      "14 个图片 URL 对应 10 张 Unsplash 照片，不同宽度和质量参数分别下载，不重编码；出处、尺寸与归属核查边界见素材清单。",
      "人物肖像区域保留来源的渐变占位图；作品目录、文章详情与社交链接的 # 占位按原样保留，不补造业务页面。",
      "独立 Demo 内小字号、文字箭头、加载与减少动态行为属于来源设计，按本轮忠实复制范围保留；不据此声称满足完整无障碍要求。",
      "页面脚注中的全部摄影归属表述属于虚构示范文案；实际图片为来源引用的 Unsplash 素材，不能据此归属给 Mira Høst。"
    ],
    "useCases": [
      "摄影作品集",
      "长篇专题展示",
      "独立创作者介绍",
      "杂志式作品目录"
    ],
    "avoid": [
      "将示范履历写成真实人物事实",
      "将所有章节改为等大卡片",
      "将占位链接包装成完整业务流程"
    ],
    "tokens": {
      "palette": [
        "#f2efe8",
        "#e8e4d9",
        "#161513",
        "#3a3631",
        "#8a857d"
      ],
      "type": "Instrument Serif 正体与斜体、Space Grotesk 300／400／500；主标题 clamp(54px, 9.2vw, 156px)，540px 以下改为 clamp(46px, 13vw, 80px)；正文约 13.5–15.5px。",
      "layout": "首屏 100dvh；章节内宽上限 1320px、桌面左右 48px；专题 5:7 双栏，右侧六列拼图；900px 以下改为单列、左右 22px。",
      "motion": "首图 24 秒交替推镜；标题 1.2 秒分词入场；章节显现 1.1 秒、组内 0.9 秒并错开 0.12 秒；目录预览 0.5／0.6 秒，图片悬停 1.4 秒。数值来自固定提交源码。"
    },
    "composition": {
      "color": "暖纸色与墨色为主体，灰褐色辅助信息降低对比；底部反转为墨色联系区，摄影保持原色。",
      "typography": "大号衬线标题与大量斜体营造编辑节奏，轻字重无衬线正文承担阅读；大字距小号编号、坐标、年份与图版数量形成元数据层。",
      "layout": "全幅首屏接编号章节；专题为 5:7 双栏及非对称四图，作品目录共享列线，合作方式三列、随笔三列；窄屏顺序折为单列。",
      "imagery": "14 个 Unsplash 图片请求分别服务首屏、专题图组、目录预览与随笔封面；人物肖像是 CSS 占位纹理，不是实际照片。",
      "shape": "细横线、窄编号条、方形字母印记和矩形图版构成边界，不依靠大圆角与投影。",
      "hierarchy": "摄影与主张 → 重点系列 → 六组作品目录 → 虚构作者介绍 → 三种合作方式 → 随笔 → 联系与页脚。",
      "motion": "缓慢首图推镜维持摄影氛围；分词入场和一次性滚动显现区分节奏；目录悬停预览只作用于当前行。",
      "coherence": "纸墨配色、衬线斜体、编号、细线、图版元数据与重复列线贯穿全部模块，联系区反转配色而保留相同文字与线条关系。"
    },
    "sources": [
      {
        "title": "来源仓库 · 摄影作品集示范页源码",
        "url": "https://github.com/ConardLi/garden-skills/blob/2b9a89340b70f632d31c0f1c69fce94a7912423e/demo/web-design-demo/demo2-with-skill.html",
        "type": "实例",
        "note": "固定提交中的完整 HTML、CSS 与 JavaScript；支持页面结构、字体、颜色、动效与占位边界的源码判断。"
      },
      {
        "title": "来源说明 · 原始提示词与虚构角色",
        "url": "https://github.com/ConardLi/garden-skills/blob/2b9a89340b70f632d31c0f1c69fce94a7912423e/skills/web-design-engineer/README.zh-CN.md#L434-L446",
        "type": "理论",
        "note": "第 436 行给出原始提示词；第 438–446 行列为有技能示范，第 441 行明确角色虚构。第 440 行文件路径多写一层 demo2/，归档采用实际存在的单文件路径。"
      },
      {
        "title": "来源技能 · 视觉层级与制作原则",
        "url": "https://github.com/ConardLi/garden-skills/blob/2b9a89340b70f632d31c0f1c69fce94a7912423e/skills/web-design-engineer/SKILL.md#L175-L182",
        "type": "理论",
        "note": "来源技能讨论视觉层级、对齐、色彩和字体数量，用于理解其设计取向；不视为具体生成过程或本页无障碍实测证据。"
      }
    ],
    "prompt": "帮我做一个独立摄影师的个人作品集网站首页。\n\n原始生成提示词，照录自 garden-skills 固定提交 2b9a89340b70f632d31c0f1c69fce94a7912423e 的 skills/web-design-engineer/README.zh-CN.md 第 436 行：https://github.com/ConardLi/garden-skills/blob/2b9a89340b70f632d31c0f1c69fce94a7912423e/skills/web-design-engineer/README.zh-CN.md#L436",
    "negativePrompt": "以下约束由 Web Atlas 撰写：不改来源设计与原文，不将示范人物、地点履历和图片署名当作真实机构事实，不增补来源没有的详情、后端、音乐或基线，不将源码判断写成浏览器实测。",
    "demo": "demos/cases/mira-host-photography/index.html",
    "preview": "previews/cases/mira-host-photography.jpg",
    "research": "docs/cases/mira-host-photography.md",
    "exercise": "用相同视口逐节查看来源与本地页面，核对摄影裁切、字体换行、目录悬停预览、章节导航、窄屏重排与减少动态分支；将真实可用入口和 # 占位链接分开记录。",
    "referenceUrl": "https://github.com/ConardLi/garden-skills/blob/2b9a89340b70f632d31c0f1c69fce94a7912423e/demo/web-design-demo/demo2-with-skill.html",
    "implementation": "reference-study",
    "fidelity": "demos/cases/mira-host-photography/fidelity.md",
    "assetManifest": "demos/cases/mira-host-photography/assets-manifest.json",
    "capturedAt": "2026-10-27",
    "patternIds": [
      "difference-blend-navigation",
      "inline-row-photo-preview",
      "photo-crossfade-cycle"
    ],
    "themeBehavior": {
      "mode": "fixed",
      "default": "light",
      "control": "固定暖纸色主题，联系区和页脚使用墨底浅字；没有全局深浅色切换。",
      "designReason": "摄影保持原色，纸墨基调与编辑排版相互配合；顶栏的差值混合适应经过的深浅背景。"
    },
    "soundBehavior": {
      "kind": "none",
      "control": "来源没有音频、背景音乐或声音控制。",
      "interactionRole": "摄影、排版、滚动与局部悬停承担叙事，不添加声音。"
    }
  },
  {
    "id": "atlas-sister-sites",
    "order": 72,
    "title": "Atlas 姊妹站 · 参考库界面骨架",
    "subtitle": "一套骨架，两种品牌：Web Atlas 与 Motion Atlas 的界面决策",
    "category": "示范作品",
    "implementation": "reference-study",
    "country": "中国",
    "tags": [
      "示范作品",
      "参考库",
      "品牌主题",
      "配色角色",
      "两栏吸附",
      "文档阅读",
      "页面过渡"
    ],
    "summary": "用列表、详情与文档三页抽象 Web Atlas 和 Motion Atlas 的共享骨架，切换品牌、深浅主题与说明长度，观察五层主题色、当前项分级、两栏吸附和固定顶栏过渡怎样协作。",
    "accent": "#d4ef76",
    "background": "#f4f5ee",
    "principles": [
      "共享顶栏、侧栏、网格、控件与阅读顺序；品牌通过主题色、标志、圆角与底色色相表达。",
      "深色强调、强调文字、实心底、高亮条、柔和底分别承担配色职责，实心底文字使用独立墨色。",
      "顶栏当前页实心，侧栏当前项柔和；非当前导航悬停使用中性次级面与正文色。",
      "详情保持一个页面滚动条，舞台始终贴住操作栏下方；舞台更长时说明栏也吸附。",
      "文档查找、正文阅读与章节定位各占一栏，正文保留行宽上限；页面交接中顶栏保持原位。"
    ],
    "productFocus": "把 MIBXR 两个参考库在固定提交中的界面机制制作成可操作的示范骨架，供观察与迁移；12 个条目名称、摘要和 CSS 图版为本案例虚构内容。",
    "interaction": [
      "品牌切换在同一 DOM 上更新 data-brand；主题按跟随系统、深色、浅色循环，四组变量分别控制页面底、表面、文字、五层主题色、标志与圆角，页面不刷新。",
      "顶栏当前页与手机全站导航当前页使用 --accent-3 底和 --accent-3-ink 字；侧栏和本文目录使用 --accent-4 底、--accent-2 字与 650 字重，非当前导航悬停使用次级面与正文色。",
      "列表可搜索标题、摘要和标签，按编号或名称双向排序，分类与收藏筛选同步结果；标题和预览进入详情，收藏在列表与详情共享并可导入、导出。",
      "详情以 ResizeObserver 读取顶栏、操作栏、舞台列与说明栏：1160px 起舞台列始终 sticky，说明比舞台短时同时 sticky；top 为顶栏 68px 加操作栏实高加 24px，两栏在容器末尾按自然 sticky 边界结束；1159px 及以下单列。",
      "hash 驱动列表、详情与文档的 DOM 更新；支持 startViewTransition 且不减少动态时开启 140ms ease-out 根过渡，atlas-header 快照无动画、旧快照隐藏；不支持或减少动态时直接更新。",
      "舞台工具条切换桌面与手机画面、播放与暂停，并以右栏较长／较短按钮切换 8 节或 2 节说明；上一个和下一个更换虚构作品，复制 Prompt 复制完整的实现提示词。",
      "文档左侧按标题搜索并折叠分组，长标题单行省略；右侧本文目录随滚动同步高亮，点击回到对应 h2／h3；仓库 Markdown 链接在文档阅读器打开。",
      "800px 及以下顶栏用单个菜单打开本页目录或全站导航，前者单列、后者两列；品牌与主题控制位于面板底部，选择、外部点击或 Escape 关闭；文档本文目录通过右下角按钮打开。",
      "卡片悬停上移 3px、增加阴影、内层画面放大 1.025，卡片底色保持原样；按钮悬停使用 --accent-4 底、--accent-1 字与边框，焦点轮廓使用 --accent-1。"
    ],
    "theme": "Web 浅色为偏绿页面底、白内容面，深色为中性近黑底与微绿内容面；Motion 使用暖浅底与微暖深色表面。品牌图形和装饰色独立于五个内容配色角色。",
    "constraints": [
      "数值取自 Web Atlas 2541e56a21d5321717b9397c14ae09462d562ee4 与 Motion Atlas 80aac18cd2fcef4a97e53b1ef9227a223136ff60 的 site/ 源码。",
      "独立 Demo 由 index.html、style.css、app.js 组成，不引用 site/ 文件；字体使用两站共用的系统字体栈。",
      "卡片与舞台画面使用 CSS 渐变与几何形状；研究原件保存在 source/，保持原始字节。",
      "列表、详情与文档使用相同品牌层；800px 及以下使用手机菜单，1159px 及以下详情回到单列。",
      "研究中记录被否决方案与数值；源码保持当前实现，复现范围与线上对照见 fidelity.md。"
    ],
    "useCases": [
      "参考库与素材库",
      "品牌主题系统",
      "双栏作品详情",
      "项目文档中心",
      "设计机制教学"
    ],
    "avoid": [
      "把全部强调角色合并为一个色值",
      "用导航悬停模拟持续当前状态",
      "把两栏各自设为滚动容器",
      "把虚构案例文案写成真实机构资料"
    ],
    "tokens": {
      "palette": [
        "#f4f5ee",
        "#ffffff",
        "#dcded4",
        "#252822",
        "#62695b",
        "#4b6118",
        "#5f7a1f",
        "#d4ef76",
        "#eef6d2"
      ],
      "type": "Inter, Segoe UI Variable, Segoe UI, PingFang SC, Microsoft YaHei, sans-serif；等宽 JetBrains Mono, Cascadia Mono, Consolas, monospace；界面 12／14／16／20／28px，列表标题最大 52px。",
      "layout": "Web 圆角 4／7／10px；顶栏 68px、水平 32／24／16px；侧栏 228px；卡片最小 300px、间距 18px、内边距 16px；详情 2:1、间距 32px；文档正文最大 860px。",
      "motion": "根 View Transition 140ms ease-out、顶栏无动画；卡片上移 3px、预览放大 1.025；减少动态直接更新页面并停止舞台形状动画。",
      "accentRoles": {
        "light": {
          "accent1": "#4b6118",
          "accent2": "#5f7a1f",
          "accent3": "#d4ef76",
          "accent3Ink": "#252822",
          "accentMark": "#d4ef76",
          "accent4": "#eef6d2"
        },
        "dark": {
          "accent1": "#d4ef76",
          "accent2": "#bcd86a",
          "accent3": "#d4ef76",
          "accent3Ink": "#252822",
          "accentMark": "#526438",
          "accent4": "#2a3320"
        }
      }
    },
    "composition": {
      "color": "浅色偏绿底与白卡片、深色中性底与微绿卡片；五个主题色角色区分链接、强调字、主操作、高亮条和柔和状态。Motion 替换相同角色的品牌数值。",
      "typography": "系统无衬线与等宽元数据共用两站字体栈；两行大标题、20px 卡片标题、16px 正文与 12px 标签形成稳定层级。",
      "layout": "列表为 228px 侧栏与自填充网格，详情为 2:1 吸附双栏，文档为 228px 目录、最大 860px 正文与右侧章节列表。",
      "imagery": "12 张虚构作品图版采用 CSS 渐变、圆、三角、斜矩形与细线；舞台使用同一图版规则并提供手机画面宽度。",
      "shape": "Web 交叉长条与小圆角，Motion 双圆与较大圆角及胶囊当前项；卡片内层边框与次级面区分内容深度。",
      "hierarchy": "品牌和页面位置 → 标题与设计决策 → 当前筛选或舞台 → 内容说明与取材动作；文档把查找和章节定位放在正文两侧。",
      "motion": "主体短淡化保持浏览连续，顶栏独立快照保留位置感；轻微卡片位移与画面缩放反馈可进入详情，舞台播放由用户控制。",
      "coherence": "三种页面沿用相同字体、控件高度、间距、图标与配色职责；品牌切换保留布局、导航和当前阅读任务。"
    },
    "sources": [
      {
        "title": "Web Atlas · 固定提交源码",
        "url": "https://github.com/MIBXR/web-atlas/tree/2541e56a21d5321717b9397c14ae09462d562ee4/site",
        "type": "实例",
        "note": "Web 配色、字体、顶栏、侧栏、卡片、文档与详情吸附、过渡的数值来源。"
      },
      {
        "title": "Motion Atlas · 固定提交源码",
        "url": "https://github.com/MIBXR/motion-atlas/tree/80aac18cd2fcef4a97e53b1ef9227a223136ff60/site",
        "type": "实例",
        "note": "Motion 品牌路径、暖色主题、圆角和胶囊当前项及共享骨架来源。"
      },
      {
        "title": "Web Atlas · 线上界面",
        "url": "https://mibxr-design-atlas.mibxranime.chatgpt.site/",
        "type": "实例",
        "note": "1440×900 下顶栏、列表、详情与文档的对照对象。"
      },
      {
        "title": "Motion Atlas · 线上界面",
        "url": "https://motion-atlas.mibxranime.chatgpt.site/",
        "type": "实例",
        "note": "同视口下品牌差异与骨架数值的对照对象。"
      }
    ],
    "prompt": "为一个参考库制作可运行的列表、详情、文档三页，hash 路由为 #list、#detail、#docs。共用 68px 通栏顶栏和 Inter 系统字体栈，左右内边距 32px、801–1159px 为 24px、800px 及以下为 16px。Web 品牌用固定源码中的交叉长条、小圆角 4／7／10px；Motion 用双圆、8／12／16px 和 999px 胶囊当前项。四组品牌与深浅主题变量直接沿用本案例源码。把主题色分成深色强调、强调文字、实心底与独立墨色、高亮条、柔和底五个角色；顶栏当前项实心、侧栏当前项柔和，非当前导航悬停用中性次级面。列表左栏 228px，主区两行大标题、设计决策折叠、搜索、双向排序及 12 张虚构案例卡；卡片最小 300px、间距 18px、内边距 16px，CSS 几何图版保持独立配色。详情采用 2:1 双栏与 32px 间距，操作栏吸附，舞台列在 1160px 起始终吸附于顶栏加操作栏实高加 24px 处，说明较短时也吸附，只有页面一个滚动条；提供桌面／手机、播放／暂停及 8／2 节说明切换。文档为三栏，左侧分组标题搜索、正文最大 860px、右侧滚动同步目录，示例文含表格和代码块。800px 及以下通过一个菜单切换单列本页目录与两列全站导航，品牌和主题在底部。页面 DOM 更新用 startViewTransition，根 140ms ease-out、顶栏 atlas-header 不动；不支持或减少动态时直接切换。卡片悬停只上移 3px、加阴影与图版放大 1.025，按钮悬停用柔和主题底，键盘焦点用深色强调。主题按系统、深色、浅色循环，舞台默认暂停，无声音。",
    "negativePrompt": "不使用外部图片，不从 site/ 加载运行文件，不改变固定提交配色与标志路径，不给顶栏过渡加淡化，不让导航悬停与当前项共用主题色底，不为两栏增加内部滚动，不把虚构条目当成真实机构。",
    "demo": "demos/cases/atlas-sister-sites/index.html",
    "preview": "previews/cases/atlas-sister-sites.jpg",
    "research": "docs/cases/atlas-sister-sites.md",
    "fidelity": "demos/cases/atlas-sister-sites/fidelity.md",
    "assetManifest": "demos/cases/atlas-sister-sites/assets-manifest.json",
    "referenceUrl": "https://mibxr-design-atlas.mibxranime.chatgpt.site/",
    "capturedAt": "2026-10-31",
    "patternIds": [
      "accent-role-tiers",
      "shorter-column-sticky",
      "current-item-emphasis-tiers",
      "persistent-header-page-transition"
    ],
    "exercise": "在 1440×900 与 390×844 下切换 Web／Motion 和浅／深主题，依次浏览三页，操作搜索、排序、收藏、菜单、文档目录与舞台；切换右栏长度并滚到底，观察吸附和底部对齐；对照固定源码及 fidelity 中的尺寸。",
    "themeBehavior": {
      "mode": "system-and-manual",
      "default": "system",
      "control": "主题按钮按跟随系统、深色、浅色循环，品牌分段控件独立切换 Web 与 Motion；两种偏好保存在本地。",
      "designReason": "布局和配色职责保持一致，通过品牌数值、标志与圆角展示两站差异；作品图版保留原色。"
    },
    "soundBehavior": {
      "kind": "none",
      "control": "无声音；舞台播放只控制 CSS 形状动画。",
      "interactionRole": "通过布局、状态颜色和页面交接表达反馈。"
    },
    "migration": {
      "entrypoint": "demos/cases/atlas-sister-sites/index.html",
      "files": [
        "demos/cases/atlas-sister-sites/style.css",
        "demos/cases/atlas-sister-sites/app.js"
      ],
      "editGuide": "app.js 的 cases、noteSections、docsPage() 分别保存图版与文案、详情说明和文章；style.css 开头四组变量负责品牌与主题。"
    }
  }
];
