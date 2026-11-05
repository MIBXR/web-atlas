const $ = id => document.getElementById(id);
const query = new URLSearchParams(location.search);
const themeMedia = matchMedia('(prefers-color-scheme: dark)');
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
const tabs = [...document.querySelectorAll('[data-demo]')];
function selectDemo(id) {
  const selected = tabs.find(tab => tab.dataset.demo === id) || tabs[0];
  tabs.forEach(tab => {
    const active = tab === selected;
    tab.setAttribute('aria-selected', active);
    tab.tabIndex = active ? 0 : -1;
    $(tab.dataset.demo).hidden = !active;
  });
  requestAnimationFrame(() => document.querySelectorAll(`${'#' + selected.dataset.demo} wired-card, ${'#' + selected.dataset.demo} wired-progress, ${'#' + selected.dataset.demo} wired-slider`).forEach(element => element.requestUpdate?.()));
}
tabs.forEach((tab,index) => {
  tab.addEventListener('click', () => selectDemo(tab.dataset.demo));
  tab.addEventListener('keydown', event => {
    if (!['ArrowLeft','ArrowRight','Home','End'].includes(event.key)) return;
    event.preventDefault();
    const next = event.key === 'Home' ? 0 : event.key === 'End' ? tabs.length - 1 : (index + (event.key === 'ArrowRight' ? 1 : -1) + tabs.length) % tabs.length;
    tabs[next].focus(); selectDemo(tabs[next].dataset.demo);
  });
});
selectDemo(query.get('demo'));
async function start() {
  try {
    if (query.get('fallback') === '1') throw new Error('preview-fallback');
    await import('../vendor/wired-elements@2.1.2/wired-elements-2.1.2.js');
    $('fallback').hidden = true;
    $('examples').hidden = false;
    selectDemo(query.get('demo'));
    await Promise.all([...document.querySelectorAll('wired-card,wired-checkbox,wired-slider,wired-toggle,wired-progress,wired-button')].map(element => element.updateComplete));
    const tasks = [...document.querySelectorAll('[data-task]')];
    function updateTasks() {
      const count = tasks.filter(task => task.checked).length;
      $('task-count').textContent = `${count} / 3`;
      $('task-progress').value = count;
    }
    tasks.forEach(task => task.addEventListener('change', updateTasks));
    $('reset-tasks').addEventListener('click', () => { tasks.forEach((task,index) => task.checked = index === 0); updateTasks(); });
    $('save-preferences').addEventListener('click', () => {
      $('mode-name').textContent = $('focus-toggle').checked ? '专注视图' : '完整视图';
      $('digest-preview').hidden = !$('digest-check').checked;
      $('preference-status').textContent = '已应用到当前示例；刷新后恢复默认。';
      document.querySelector('#preferences wired-card').requestUpdate();
    });
    $('elevation').shadowRoot.querySelector('input').setAttribute('aria-label','卡片层级');
    $('focus-toggle').shadowRoot.querySelector('input').setAttribute('aria-label','专注模式');
    $('elevation').addEventListener('change', () => {
      $('concept-card').elevation = $('elevation').value;
      $('elevation-value').textContent = $('elevation').value;
    });
    $('fill-color').addEventListener('input', () => $('concept-card').fill = $('fill-color').value);
    const resize = new ResizeObserver(entries => entries.forEach(entry => entry.target.requestUpdate()));
    document.querySelectorAll('wired-card,wired-progress,wired-slider').forEach(element => resize.observe(element));
    $('runtime-status').hidden = true;
  } catch {
    $('examples').hidden = true;
    $('fallback').hidden = false;
    $('runtime-status').textContent = query.get('fallback') === '1' ? '静态后备 · 已跳过组件加载。' : '组件未能载入，当前显示静态说明。';
  }
}
start();
