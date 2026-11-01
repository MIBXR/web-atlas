# 推子同时控制声音与夜景 · 复用 Prompt

[结构化条目](../../entries/patterns/weather-sound-scene-mixer.json)

为目标页面实现「推子同时控制声音与夜景」：雨、风和列车共用level与穿越相位，推子同步多个面板；定时器前段保持，后段余弦淡出到静音与结束状态。触发：调整推子、淡出定时器或Listen/Stop。结果：视觉材料帮助理解混音，启停和结束状态清楚。参数：初值=雨.6、风.35、列车.15、定时30min；列车=周期62s，穿越44s；淡出=前60%保持，后40%余弦淡出，Stop后900ms挂起。先读来源实际源码与 fidelity.md，以目标内容替换原作材料；推子支持方向键、PageUp/Down和Home/End，Listen是原生按钮。显示静态夜景并即时更新强度，保留用户启停声音。

## 制作约束

- 固定提交源码与复刻范围见 demos/cases/hallmark/fidelity.md。
