# Persona 5 Royal · 单次参考快照

参考 URL：https://persona.atlus.com/p5r/?lang=en#
采集日期：2026-10-07，英文首页。归档本次所见，不维护未来官网版本。

原站的完整浏览路径是 KV→介绍→角色→学校生活→怪盗生活→规格→底部信息与购买→页脚；本次已从入口浏览至实际 footer，再反向返回。已操作角色 Next 和两个生活轮播，并检查公开 CSS/JS。

从公开渲染模块 175/558/562 可见，星光分为两层：desktop kv-canvas 是 5 颗固定位置星光，背景 bg-stars 是 15 颗随机星。星纹理从六张官方PNG中随机选取，以SCREEN混合；透明度以 3000ms inOutSine 往复，起始延迟0–5000ms。背景星在滚动时按“旧位置减新位置”的差值除以1–3系数移动，越界重置。没有发现原站鼠标视差，本地没有添加。

角色横向轨道以500ms切换，在首尾停止，服装有独立状态。学校生活与怪盗生活各自使用无限循环的中心轮播，露出相邻画面。

原站未见独立BGM、声音门或界面操作音。用户点击WATCH THE OFFICIAL TRAILER才打开官方YouTubePV，音乐配合影片的镜头剪辑，不覆盖普通浏览。未见明暗主题控件，金、红、黑维持固定主题。

公开源： https://persona.atlus.com/p5r/resources/js/top.d7194e2d6bcaddee6e3c.js 和 https://persona.atlus.com/p5r/resources/css/top.bfd93acea98167fad971.css 。最终图像逐项来源见 assets-manifest.json。版权归ATLUS/SEGA。

迁移原则：把主题纹理用作实际运动层；露出相邻画面作为预告，呈现内容的连续性；白天与夜晚使用独立状态，而不是给同一张卡片换色。Prompt见entry。

[本地对照与差异](../../demos/cases/persona-kinetic/fidelity.md)

## 观察证据

- [screenshots/persona-character-source.jpg](../../demos/cases/persona-kinetic/source/screenshots/persona-character-source.jpg)
