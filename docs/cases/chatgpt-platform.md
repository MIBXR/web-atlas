# ChatGPT：当前页面的设计与交互

## 触发、视觉响应与用途

- 首屏悬停/聚焦/点击“聊天、工作、编程” → 当前中文逐字换强调色，中央图垂直退出/进入，20 个官方周边素材按模式替换 → 用动作表达三种用途；在首屏标题体验。

- 选择工作 → 工作的独立素材从四周进入，原模式素材离开；快速切换清理旧离场层 → 保持一套可读场景；移到“工作”再快速移到“编程”。

- 向下/向上滚动 → 周边素材随滚动带入/收束，随后淡出；同一窗口保持 sticky，越过交接阈值再向右下移动 → 从吸引注意过渡到解释产品；在首屏下面往返滚动。

- 桌面左侧 rail 出现后，滚动三段哨兵或点击/方向键 → 说明高度、标题缩放、窗口模式及进度对应更新；顶部标题模式和下段模式彼此独立。

- 手机使用三卡原生横向滚动，标题选择定位相应卡片；桌面 sticky rail 不出现在手机。导航保持桌面即时开关和手机全屏分层列表。

- 用途架子保留原生横滑及左右按钮；后续价格、安全、结束行动与页尾为普通滚动。

## 完整浏览路径

首屏标题和拼贴 → 约 2000px+视口的居中/交接/说明长段 → 用途横向架子 → 价格 → 安全 → 结束行动 → 页尾；上下方向可逆。手机改为原生三模式横向卡片，再顺序浏览相同后续内容。

## 主题与声音

跟随 prefers-color-scheme；页面没有全局手动主题按钮，桌面产品界面随系统换深浅，手机保持原站的浅色界面图。

此介绍页没有背景音乐、音频或影片。页面通过运动和空间关系串联能力介绍。

## 配色、排版与元素协调

主题和运动共同突出产品重点：中文标题可操作，周边拼贴按模式变化；同一产品窗口从居中舞台移向右侧，为左侧说明让出空间。

## 观察依据

源 DOM 测得窗口中心比例、2562/1642 宽高比、说明状态 896px 最大宽度；rail 未激活标题缩放 0.718309859，360ms cubic-bezier(.22,1,.36,1)。源站滚动跨阈值后触发位置过渡，而非每一像素均匀插值。悬停人工选择释放后仍保持所选模式，观察超过 40 秒没有自动恢复。

## 观察证据

- [chatgpt-motion-evidence.json](../../demos/cases/chatgpt-platform/source/chatgpt-motion-evidence.json)
- [screenshots/chatgpt-handoff.jpg](../../demos/cases/chatgpt-platform/source/screenshots/chatgpt-handoff.jpg)
- [screenshots/chatgpt-mode-rail.jpg](../../demos/cases/chatgpt-platform/source/screenshots/chatgpt-mode-rail.jpg)
- [screenshots/chatgpt-work-scroll.jpg](../../demos/cases/chatgpt-platform/source/screenshots/chatgpt-work-scroll.jpg)
