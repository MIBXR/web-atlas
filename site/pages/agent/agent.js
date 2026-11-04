(() => {
  'use strict';
  const $ = selector => document.querySelector(selector);
  const esc = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  let catalog;
  function toast(message) { $('#toast').textContent=message;$('#toast').classList.add('visible');clearTimeout(toast.timer);toast.timer=setTimeout(()=>$('#toast').classList.remove('visible'),2500); }
  async function copy(value) {
    try { await navigator.clipboard.writeText(value);toast('已复制。'); }
    catch {
      let area = document.getElementById('copy-fallback');
      if(!area) {
        area=document.createElement('textarea');area.id='copy-fallback';area.setAttribute('aria-label','手动复制的 Agent 入口');
        area.style.cssText='position:fixed;left:5vw;bottom:20px;width:90vw;height:150px;z-index:45;padding:14px;background:var(--atlas-surface);color:var(--atlas-ink);border:2px solid var(--accent-1)';document.body.append(area);
      }
      area.value=value;area.focus();area.select();toast('已显示并选中文字，请按 Ctrl+C 复制；按 Escape 收起。');
      area.addEventListener('keydown',event=>{if(event.key==='Escape')area.remove();},{once:true});
    }
  }
  function render() {
    const terms = $('#agent-query').value.trim().toLowerCase().split(/\s+/).filter(Boolean);
    const entries = catalog.entries.filter(entry => terms.every(term => JSON.stringify(entry).toLowerCase().includes(term)));
    $('#agent-status').textContent = `${entries.length} / ${catalog.entryCount} 个案例 · 关键词筛选`;
    $('#agent-cases').innerHTML = entries.map(e => `<article class="agent-case"><small>${esc(e.category)} · ${esc(e.country || '未确认')}</small><h3>${esc(e.title)}</h3><p>${esc(e.summary)}</p><code>${esc(e.id)}</code><div class="agent-case-actions"><a class="copy-button" href="cases.html#style/${encodeURIComponent(e.id)}">预览案例</a><a class="copy-button" href="${esc(e.paths.bundle)}" download="${esc(e.id)}-context.json">下载案例包 JSON</a><button class="copy-button" data-case="${esc(e.id)}">复制 Agent 入口</button></div></article>`).join('');
    $('#agent-cases').querySelectorAll('[data-case]').forEach(button => button.addEventListener('click', () => {
      const e = catalog.entries.find(entry => entry.id === button.dataset.case);
      const source = catalog.source;
      const bundleURL = source ? new URL(e.paths.bundle,source.baseUrl).href : new URL(e.paths.bundle,location.href).href;
      const sourceHint = source ? `原始文件基址：${source.baseUrl}\n对 files 中每个 path 使用这个基址获取原始文件；网页播放文件经过部署转换。此入口对应当前网页发布版本：${source.commit}。若要探索上游最新案例，请调用 web-atlas skill 开始新会话。` : '通过 web-atlas skill 开始会话，解析上游最新完整提交 SHA，并用本次会话的同一提交读取原始文件。';
      copy(`请读取 Web Atlas 案例 ${e.id} 的完整上下文：\n${bundleURL}\n先结合我的真实需求阅读 entry、webNotes（网页右侧说明）和 documents，再按 files 取用源码。保留原始约束、来源和复现边界。\n${sourceHint}`);
    }));
  }
  document.querySelectorAll('[data-copy]').forEach(button => button.addEventListener('click',()=>copy(document.getElementById(button.dataset.copy).textContent)));
  $('#agent-query').addEventListener('input', () => { if(catalog)render(); });
  fetch('agent/catalog.json').then(response => { if(!response.ok)throw new Error('HTTP '+response.status);return response.json(); }).then(data => {
    if(data.schemaVersion!==1 || !Array.isArray(data.entries))throw new Error('不支持的索引版本');
    catalog=data;$('#agent-count').textContent=catalog.entryCount;$('#agent-pattern-count').textContent=catalog.patterns?.patternCount ?? 0;$('#agent-version').textContent=catalog.source?.commit ? `GIT ${catalog.source.commit.slice(0,12)} / SCHEMA 1` : 'SOURCE-BACKED / SCHEMA 1';
    const selected = decodeURIComponent(location.hash.slice(1));
    if(catalog.entries.some(entry => entry.id === selected)) $('#agent-query').value = selected;
    render();
  }).catch(error => { $('#agent-status').textContent=`索引加载失败：${error.message}。请刷新重试，或从 GitHub 仓库读取。`; });
})();
