const $ = id => document.getElementById(id);
const query = new URLSearchParams(location.search);
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
const themeMedia = matchMedia('(prefers-color-scheme: dark)');
let styleReady;
try { styleReady = document.querySelector('link[href="vendor/98.css@0.1.21/98.css"]').sheet?.cssRules.length > 0; }
catch { styleReady = false; }
function applyTheme() {
  let theme = query.get('theme');
  try { theme ||= parent !== window ? parent.document.documentElement.dataset.atlasTheme : localStorage.getItem('atlas-color-scheme'); }
  catch { theme ||= themeMedia.matches ? 'dark' : 'light'; }
  document.documentElement.dataset.theme = theme === 'light' || theme === 'dark' ? theme : themeMedia.matches ? 'dark' : 'light';
}
applyTheme();
themeMedia.addEventListener('change', applyTheme);
window.addEventListener('storage', applyTheme);
if (parent !== window) {
  try { new MutationObserver(applyTheme).observe(parent.document.documentElement, {attributes:true,attributeFilter:['data-atlas-theme']}); }
  catch { document.documentElement.dataset.theme ||= 'light'; }
}
let timer = null;
let progress = 0;
function renderProgress(state = '等待开始') {
  $('progress-fill').style.width = `${progress}%`;
  $('transfer-progress').setAttribute('aria-valuenow', progress);
  $('progress-status').textContent = `${progress === 100 ? '演示完成（未生成文件）' : state} · ${progress}%`;
  $('start-progress').textContent = timer ? '暂停演示' : progress === 100 ? '再次演示' : '开始演示';
}
function pause() { clearInterval(timer); timer = null; renderProgress(progress ? '已暂停' : '等待开始'); }
const selectors = [...document.querySelectorAll('[data-demo]')];
function selectDemo(id) {
  const selected = selectors.find(button => button.dataset.demo === id) || selectors[0];
  pause();
  selectors.forEach(button => { const active = button === selected; button.setAttribute('aria-pressed', active); $(button.dataset.demo).hidden = !active; });
}
function selectTab(tab) {
  for (const candidate of document.querySelectorAll('[role="tab"]')) {
    const active = candidate === tab;
    candidate.setAttribute('aria-selected',active); candidate.tabIndex = active ? 0 : -1;
    $(candidate.getAttribute('aria-controls')).hidden = !active;
  }
}
if (query.get('fallback') === '1') {
  document.querySelectorAll('button,input,select').forEach(control => control.disabled = true);
  $('runtime-status').textContent = styleReady ? '静态后备演示 · 真实 CSS 保留，交互已主动关闭。' : '静态后备 · 98.css 未加载，保留原生内容与本地布局；交互已关闭。';
} else {
  selectors.forEach(button => button.addEventListener('click', () => selectDemo(button.dataset.demo)));
  const tabs = [...document.querySelectorAll('[role="tab"]')];
  tabs.forEach((tab,index) => {
    tab.addEventListener('click', () => selectTab(tab));
    tab.addEventListener('keydown', event => {
      if (!['ArrowLeft','ArrowRight','Home','End'].includes(event.key)) return;
      event.preventDefault();
      const next = event.key === 'Home' ? 0 : event.key === 'End' ? tabs.length - 1 : (index + (event.key === 'ArrowRight' ? 1 : -1) + tabs.length) % tabs.length;
      tabs[next].focus(); selectTab(tabs[next]);
    });
  });
  function applySettings() {
    $('wallpaper').style.background = $('desktop-color').value;
    document.querySelector('.mini-window p').hidden = !$('show-caption').checked;
    document.querySelector('#settings .window').classList.toggle('compact', $('compact-spacing').checked);
    $('settings-status').textContent = `${$('desktop-color').selectedOptions[0].textContent} · ${$('compact-spacing').checked ? '紧凑留白' : '默认留白'} · 已应用`;
  }
  $('apply-settings').addEventListener('click',applySettings);
  $('reset-settings').addEventListener('click',() => { $('desktop-color').value = '#008080'; $('show-caption').checked = true; $('compact-spacing').checked = false; applySettings(); });
  const descriptions = {'海报构图':'适合活动封面与作品展示；这里仅演示目录选择。','字体试排':'适合比较标题与正文层级；这里不额外载入字体。','操作音效':'适合主动触发的界面反馈；此目录示例不播放声音。'};
  document.querySelectorAll('.row-select').forEach(button => button.addEventListener('click', () => {
    document.querySelectorAll('[data-name]').forEach(row => row.classList.toggle('highlighted',row === button.closest('tr')));
    $('selection-title').textContent = button.dataset.item; $('selection-info').textContent = descriptions[button.dataset.item];
  }));
  $('catalog-filter').addEventListener('input', () => {
    const term = $('catalog-filter').value.trim().toLowerCase();
    const rows = [...document.querySelectorAll('[data-name]')];
    rows.forEach(row => row.hidden = !row.dataset.name.includes(term));
    const count = rows.filter(row => !row.hidden).length;
    $('catalog-count').textContent = `${count} 项示例`; $('no-results').hidden = count > 0;
  });
  $('segmented').addEventListener('change', () => $('transfer-progress').classList.toggle('segmented',$('segmented').checked));
  $('start-progress').addEventListener('click', () => {
    if (timer) { pause(); return; }
    if (progress === 100) progress = 0;
    if (reducedMotion.matches) { progress = Math.min(100,progress + 10); renderProgress('减少动态 · 手动前进'); return; }
    timer = setInterval(() => { progress = Math.min(100,progress + 2); if (progress === 100) { clearInterval(timer); timer = null; } renderProgress('模拟打包中'); },240);
    renderProgress('模拟打包中');
  });
  $('step-progress').addEventListener('click', () => { pause(); progress = Math.min(100,progress + 10); renderProgress('手动前进'); });
  $('reset-progress').addEventListener('click', () => { pause(); progress = 0; renderProgress(); });
  document.addEventListener('visibilitychange', () => { if (document.hidden) pause(); });
  reducedMotion.addEventListener('change', () => { if (reducedMotion.matches) pause(); });
  window.addEventListener('pagehide',pause);
  selectDemo(query.get('demo'));
  $('runtime-status').hidden = styleReady;
  if (!styleReady) $('runtime-status').textContent = '98.css 样式未加载，当前使用原生控件。';
}
