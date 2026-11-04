# Notion：当前页面的设计与交互

## 触发、视觉响应与用途

- 2500ms 自动 Think/Ship/Create/Build/Jam/Scale → 直接替换文字，测量 scrollWidth 后，宽度以 300ms cubic-bezier(.86,0,.07,1) 变化，底色/圆点对应变化；原站机制不含文字飞入飞出。

- 桌面官方产品视频静音循环，可暂停；手机保留上方七个头像 pile，当前页面隐藏 hero 媒体区。

- 客户标识原生连续横移，指针停留时暂停；手机保持条带，不排成多行。

- 桌面 Product/Resources 指针进入与点击 → 首次 opacity 与 translateY(-16px) 用 250ms ease-out；离开、外部点击或 Escape 用 150ms ease-in、延迟 50ms 退出，已打开分类间按源 instantSwitch 直接切换，重复浏览时无需再次等待入场动画。手机打开全屏菜单 → Product/AI/Resources 原地单开，切换时收起前一组，再点同组收起；其余分类变灰，Download app/Log in 保持底部。长列表在菜单内滚动，关闭/Escape 恢复阅读，维持当前层级和行动位置。

- Capture/Find 两列和 Automate 通栏保持不同层次；下方五用途横向入口、团队故事、结束行动、页尾按原站顺序展开。页面中的演示账户按钮先显示本地说明；手机菜单使用已观察的原站公开入口。

## 完整浏览路径

语言提示/导航 → 动作胶囊/头像/桌面产品视频 → 标识条带 → 两列+通栏 Bento → 五用途 → 团队故事 → 结束行动 → 页尾。

## 主题与声音

营销首页固定白底、浅色 Bento 和蓝色 CTA；没有全局主题切换。

桌面官方 hero 产品演示默认静音循环，有本地暂停/播放；手机当前源页隐藏这一媒体区域。没有背景音乐。演示内部 UI 展示团队和 agent 的工作，静音让阅读重点留在主标题与插画上。

## 配色、排版与元素协调

主题与动态共同突出产品重点：白底居中标题配合变宽动作胶囊、人格化官方头像和分能力 Bento，建立友好的工具定位。

## 源端观察

当前公开模块 ProductPillAnimation 明确 setInterval 2500ms、直接 React 文本替换、ResizeObserver 测宽；CSS 只过渡 label inline-size。真实 390px 页父容器隐藏产品媒体，头像与横移标识保留。

[本地对照与差异](../../demos/cases/notion-editorial/fidelity.md)

## 移动菜单时序

子菜单 300ms ease-out、入口 transform 350ms cubic-bezier(.16,1,.3,1)、内容 opacity 400ms 延迟 200ms、底部行动延迟 250ms 来自源 CSS。
