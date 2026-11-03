(() => {
'use strict';
const entries = window.ATLAS_CASES || [];
const $ = selector => document.querySelector(selector);
const esc = value => String(value ?? '').replace(/[&<>"']/g,x=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[x]));
const docHref = file => `docs.html?file=${encodeURIComponent(file)}`;
const siteIcon = name => window.AtlasIcons?.svg(name) || '';
const externalIcon = href => {try {const url=new URL(href,location.href);return /^https?:$/.test(url.protocol)&&url.origin!==location.origin?siteIcon('external'):'';}catch{return '';}};
const favoriteStore=window.AtlasFavorites;
let favorites=favoriteStore.ids('cases');
let previewObserver;
let country='all'; let selected=[]; let filter='all'; let favoriteCategory='all'; let query=''; let sort='curated'; let dir='asc';
let renderedLocation='';
const categoryFilters={products:'产品',games:'游戏/IP',classics:'经典风格',showcases:'示范作品',culture:'艺术/文化',favorites:'favorites'};
function readCollectionState(){
  const params=new URL(location.href).searchParams;
  const category=params.get('category');
  filter=Object.hasOwn(categoryFilters,category)?categoryFilters[category]:'all';
  favoriteCategory=filter==='favorites'&&Object.hasOwn(categoryFilters,params.get('type'))&&params.get('type')!=='favorites'?categoryFilters[params.get('type')]:'all';
  country=countries.includes(params.get('country'))?params.get('country'):'all';
  query=(params.get('q')||'').trim();
  sort=params.get('sort')==='title'?'title':'curated';
  dir=params.get('dir')==='desc'?'desc':'asc';
  $('#search').value=query;
  $('#country').value=country;
  $('#sort').value=sort;
  syncSortDirection();
  document.querySelectorAll('[data-filter]').forEach(button=>{
    const active=button.dataset.filter===filter;
    button.classList.toggle('active',active);
    button.setAttribute('aria-pressed',String(active));
  });
}
function writeCollectionState({replace=false,showCollection=false}={}){
  const url=new URL(location.href);
  const category=Object.keys(categoryFilters).find(key=>categoryFilters[key]===filter);
  const type=filter==='favorites'?Object.keys(categoryFilters).find(key=>categoryFilters[key]===favoriteCategory):null;
  const values={category,type,country:country==='all'?null:country,q:query,sort:sort==='curated'?null:sort,dir:dir==='desc'?'desc':null};
  Object.entries(values).forEach(([key,value])=>value?url.searchParams.set(key,value):url.searchParams.delete(key));
  if(showCollection)url.hash='';
  if(url.href!==location.href)history[replace?'replaceState':'pushState'](null,'',url);
  if(showCollection)route();
  else{syncSortDirection();renderCards();renderedLocation=location.href;}
}
const elementLabels={color:'配色角色',typography:'字体排版',layout:'布局留白',imagery:'图像图标',shape:'线条形状',hierarchy:'信息层级',motion:'动效反馈',coherence:'协调逻辑',scroll:'滚动结构'};
const composition = e => `<dl class="element-map">${Object.entries(e.composition||{}).map(([k,v])=>`<div class="${k==='coherence'?'coherence':''}"><dt>${elementLabels[k]||esc(k)}</dt><dd>${esc(v)}</dd></div>`).join('')}</dl>`;
const themeModeLabels={fixed:'固定主题',system:'跟随系统',manual:'手动切换','system-and-manual':'系统 + 手动'};
const soundKindLabels={none:'无网站配乐',background:'背景音乐',video:'媒体声音',external:'外部音乐入口',interactive:'操作／演奏声音'};
const behaviors=e=>`<div class="behavior-block"><span class="behavior-label">显示主题</span><h3>${esc(themeModeLabels[e.themeBehavior.mode])}</h3><p>${esc(e.themeBehavior.control)}</p><p>${esc(e.themeBehavior.designReason)}</p></div><div class="behavior-block"><span class="behavior-label">声音与交互</span><h3>${esc(soundKindLabels[e.soundBehavior.kind])}</h3><p>${esc(e.soundBehavior.control)}</p>${e.soundBehavior.interactionRole?`<p>${esc(e.soundBehavior.interactionRole)}</p>`:''}</div>`;
const labels = {all:'全部风格',产品:'产品与平台','游戏/IP':'游戏与 IP',经典风格:'经典设计语言','示范作品':'示范作品','艺术/文化':'艺术与文化',favorites:'我的收藏'};
const list = values => `<ul>${values.map(x=>`<li>${esc(x)}</li>`).join('')}</ul>`;
const swatches = e => `<div class="swatches">${e.tokens.palette.map(x=>`<span class="swatch"><i style="background:${esc(x)}"></i>${esc(x)}</span>`).join('')}</div>`;
function toast(message){$('#toast').textContent=message;$('#toast').classList.add('visible');clearTimeout(toast.timer);toast.timer=setTimeout(()=>$('#toast').classList.remove('visible'),2300);}
function toggleFavorite(id){favoriteStore.toggle('cases',id);}
const favoriteStar = siteIcon('star');
function favoriteButton(e){return `<button class="favorite ${favorites.includes(e.id)?'selected':''}" data-fav="${e.id}" aria-label="收藏${esc(e.title)}" aria-pressed="${favorites.includes(e.id)}">${favoriteStar}</button>`;}
function updateTray(){const count=selected.length;document.body.classList.toggle('has-tray',count>0);$('#compare-count').textContent=count;$('#compare-tray').hidden=!count;$('#tray-text').textContent=`已选择 ${count} 项：${selected.map(id=>entries.find(e=>e.id===id)?.title).join(' · ')}`;$('#compare-go').disabled=count<2;}
function selectCompare(id,checked){if(checked && !selected.includes(id)){if(selected.length===3){toast('一次最多比较 3 项，请先取消一个条目。');renderCards();return;}selected.push(id);}else if(!checked){selected=selected.filter(x=>x!==id);}updateTray();}
function syncSortDirection(){
  const button=$('#sort-dir');
  button.setAttribute('aria-label',dir==='desc'?'反序':'正序');
  button.setAttribute('aria-pressed',String(dir==='desc'));
  button.innerHTML=siteIcon(dir==='desc'?'sortDesc':'sortAsc');
}
function renderCards(){
  const saved=entries.filter(e=>favorites.includes(e.id));
  const categorySelect=$('#favorite-category');
  categorySelect.hidden=filter!=='favorites';
  if(filter==='favorites'){
    categorySelect.innerHTML='<option value="all">全部分类</option>'+Object.entries(categoryFilters).filter(([key,category])=>key!=='favorites'&&saved.some(e=>e.category===category)).map(([,category])=>`<option value="${esc(category)}">${esc(labels[category])}</option>`).join('');
    categorySelect.value=favoriteCategory;
  }
  let results=(filter==='favorites'?saved.filter(e=>favoriteCategory==='all'||e.category===favoriteCategory):entries.filter(e=>filter==='all'||e.category===filter)).filter(e=>country==='all'||e.country===country);if(query){results=results.filter(e=>JSON.stringify(e).toLowerCase().includes(query.toLowerCase()));}if(sort==='title')results.sort((a,b)=>a.title.localeCompare(b.title,'zh-CN'));if(dir==='desc')results.reverse();$('#cards').innerHTML=results.map(e=>`<article class="card"><a class="card-preview" href="#style/${e.id}" aria-label="查看${esc(e.title)}"><img src="${esc(e.preview)}" alt="${esc(e.title)}代码 demo 的实际首屏" loading="lazy"></a><div class="card-body"><div class="card-title"><h2><a href="#style/${e.id}">${esc(e.title)}</a></h2>${favoriteButton(e)}</div><p class="subtitle">${esc(e.subtitle)}</p><p class="card-summary">${esc(e.summary)}</p><div class="tags">${[...new Set([e.country,...e.tags].filter(Boolean))].slice(0,3).map(x=>`<span class="tag">${esc(x)}</span>`).join('')}</div><div class="card-bottom"><label class="compare-label"><input type="checkbox" data-compare="${e.id}" ${selected.includes(e.id)?'checked':''} aria-label="比较${esc(e.title)}">加入比较</label><a href="#style/${e.id}">拆解 & demo</a></div></div></article>`).join('');$('#results-label').textContent=`${labels[filter]}${filter==='favorites'&&favoriteCategory!=='all'?' · '+labels[favoriteCategory]:''} / ${results.length} 个条目${country!=='all'?' · '+country:''}${query?' · '+query:''}`;$('#empty').hidden=!!results.length;
  window.AtlasCollectionFilters?.sync();
}
function route(){
  window.AtlasDetail?.clear();
  previewObserver?.disconnect();
  readCollectionState();
  let hash;
  try{hash=decodeURIComponent(location.hash);}catch{hash='';}
  $('#collection').hidden=true;$('#detail').hidden=true;$('#comparison').hidden=true;
  // Hidden demos keep running (audio included); remove them so leaving a view releases them.
  $('#detail').innerHTML='';$('#comparison').innerHTML='';
  if(hash.startsWith('#style/')){
    const entry=entries.find(x=>x.id===hash.slice(7));
    if(entry){renderDetail(entry);$('#detail').hidden=false;window.AtlasDetail?.mount($('#detail'),'案例库');}
    else{const url=new URL(location.href);url.hash='';history.replaceState(null,'',url);$('#collection').hidden=false;renderCards();}
  }else if(hash==='#compare'){renderComparison();$('#comparison').hidden=false;}
  else{$('#collection').hidden=false;renderCards();}
  const inDetail=!$('#detail').hidden;
  $('#compare-list-label').hidden=inDetail;
  $('#compare-detail-label').hidden=!inDetail;
  renderedLocation=location.href;
  window.scrollTo({top:0,behavior:'instant'});updateTray();
}
function renderDetail(e){const documents=[[e.research,'调研记录'],[e.fidelity,'复现范围与差异'],[e.assetManifest,'素材来源清单'],[e.fidelity&&`demos/cases/${e.id}/LICENSES.md`,'许可原文索引']].filter(([file])=>file);$('#detail').innerHTML=`<div class="detail-top"><a class="back" href="#">返回案例库</a><div>${favoriteButton(e)}${e.referenceUrl?`<a class="copy-button" href="${esc(e.referenceUrl)}" target="_blank" rel="noopener noreferrer">${e.category==='示范作品'?'对照来源仓库':e.studyScope==='visual-adaptation'?'对照官方来源':'对照原站'} ${externalIcon(e.referenceUrl)}</a>`:''}<a class="copy-button" href="agent.html#${encodeURIComponent(e.id)}">Agent 取材</a><a class="copy-button" href="agent/cases/${encodeURIComponent(e.id)}.json" download="${esc(e.id)}-context.json">下载完整案例包</a><a class="primary-button" href="${esc(e.demo)}" target="_blank">独立打开 Demo</a></div></div><div class="detail-title"><div><p class="eyebrow">${esc(e.category)} / ${esc(e.subtitle)}</p><h1>${esc(e.title)}</h1><p>${esc(e.summary)}</p></div><div class="tags">${e.tags.map(x=>`<span class="tag">${esc(x)}</span>`).join('')}</div></div><div class="detail-layout"><div class="demo-panel"><div class="demo-surface"><div class="demo-toolbar"><span>LIVE DEMO / ${e.category==='示范作品'?'示范页面复现':e.studyScope==='visual-adaptation'?'官方影像网页转译':e.implementation==='reference-study'?'来源页面复现':'经典风格练习'}</span><div><button data-viewport="desktop" class="active" aria-pressed="true">适应面板</button><button data-viewport="wide" aria-pressed="false">桌面 1440px</button><button data-viewport="mobile" aria-pressed="false">手机 390px</button><button id="reload-demo">重播</button></div></div><div class="frame-wrap"><iframe class="demo-frame" title="${esc(e.title)}交互 demo" src="${esc(e.demo)}"></iframe></div></div>${e.referencePreview?`<details class="source-comparison"><summary>${e.studyScope==='visual-adaptation'?'展开官方资料与本地画面对照':'展开原站与本地画面对照'}</summary><div><figure><img src="${esc(e.referencePreview)}" alt="${esc(e.title)}${e.studyScope==='visual-adaptation'?'官方资料快照':'原站实访截图'}"><figcaption>${e.studyScope==='visual-adaptation'?'官方资料 · 视觉快照':'原站 · 实访快照'}${e.referencePreviewNote?" · "+esc(e.referencePreviewNote):""}</figcaption></figure><figure><img src="${esc(e.preview)}" alt="${esc(e.title)}本地截图"><figcaption>${e.studyScope==='visual-adaptation'?'本地 · 教学网页转译':'本地 · 复现'}</figcaption></figure></div></details>`:''}</div><aside class="notes"><section><h2>从要素看风格</h2><a class="element-lab-link" href="lab.html?style=${e.id}">调配这个风格的设计要素</a>${composition(e)}</section><section><h2>设计机制</h2>${list(e.principles)}<h3>设计重点</h3><p>${esc(e.productFocus)}</p>${e.theme?`<h3>主题与情绪</h3><p>${esc(e.theme)}</p>`:''}</section><section><h2>页面交互</h2>${list(e.interaction)}${behaviors(e)}</section><section><h2>约束与适用场景</h2>${list(e.constraints)}<h3>适合</h3><p>${e.useCases.map(esc).join(' / ')}</p><h3>谨慎使用</h3><p>${e.avoid.map(esc).join(' / ')}</p></section><section><h2>设计参数</h2>${swatches(e)}<p><b>字体</b> · ${esc(e.tokens.type)}<br><b>布局</b> · ${esc(e.tokens.layout)}<br><b>动效</b> · ${esc(e.tokens.motion)}</p></section><section><div class="prompt-head"><h2>可复用 Prompt</h2><button class="copy-button" id="copy-prompt">复制 Prompt</button></div><textarea class="prompt-box" aria-label="可复用 Prompt" readonly>${esc(e.prompt)}</textarea><details><summary>负面约束 / Negative Prompt</summary><p>${esc(e.negativePrompt)}</p></details><h3>改造练习</h3><p>${esc(e.exercise)}</p></section>${window.AtlasPatterns?.caseLinks(e.id)||''}<section><h2>来源与证据</h2>${e.sources.map(s=>`<div class="source-item"><span class="source-badge">${esc(s.type)}</span><a href="${esc(s.url)}" target="_blank" rel="noopener noreferrer">${esc(s.title)} ${externalIcon(s.url)}</a><small>${esc(s.note)}</small></div>`).join('')}<p>${e.referenceUrl?`${e.category==='示范作品'?'来源归档':e.studyScope==='visual-adaptation'?'官方资料采集':'参考站采集'}：${esc(e.capturedAt)}。`:`理论来源核验：${esc(e.theoryVerifiedAt)}。`}</p></section><section><h2>相关文档</h2><ul>${documents.map(([file,label])=>`<li><a href="${esc(file.endsWith('.md')?docHref(file):file)}" target="_blank">${label}</a></li>`).join('')}</ul></section></aside></div>`;$('#copy-prompt').addEventListener('click',async()=>{try{await navigator.clipboard.writeText(e.prompt+'\n\n负面约束：'+e.negativePrompt);toast('Prompt 与负面约束已复制。');}catch{const area=$('.prompt-box');area.focus();area.select();toast('已选中 Prompt，请按 Ctrl+C 复制。');}});$('#reload-demo').addEventListener('click',()=>{$('.demo-frame').src=e.demo;});initPreview(e.id==='chatgpt-platform'?'wide':'desktop');}
function initPreview(initialMode){
  previewObserver=window.AtlasPreview.mount($('.frame-wrap'),document.querySelectorAll('#detail [data-viewport]'),initialMode);
}

function renderComparison(){
  const chosen=selected.map(id=>entries.find(e=>e.id===id)).filter(Boolean);
  const sections=[
    ['summary','案例概览',e=>`<p>${esc(e.summary)}</p>`],
    ['focus','信息焦点',e=>`<p>${esc(e.productFocus)}</p>`],
    ['mechanism','设计机制',e=>list(e.principles)],
    ['interaction','页面交互',e=>list(e.interaction)+behaviors(e)],
    ['theme','主题与配色',e=>`<p>${esc(e.theme)}</p>${swatches(e)}`],
    ['composition','要素协调',e=>`<p>${esc(e.composition?.coherence||'')}</p>`],
    ['constraints','硬约束',e=>list(e.constraints)],
    ['use','适用场景',e=>`<p>${e.useCases.map(esc).join(' / ')}</p>`],
    ['avoid','谨慎使用',e=>`<p>${e.avoid.map(esc).join(' / ')}</p>`],
    ['materials','操作与取材',e=>`<div class="compare-actions"><a class="copy-button" href="agent.html#${encodeURIComponent(e.id)}">Agent 取材</a><a class="copy-button" href="agent/cases/${encodeURIComponent(e.id)}.json" download="${esc(e.id)}-context.json">下载完整案例包</a><a class="primary-button" href="${esc(e.demo)}" target="_blank" rel="noopener noreferrer">操作 demo</a></div>`],
  ];
  $('#comparison').innerHTML=`<div class="detail-top"><a href="#" class="back copy-button">返回案例库</a><button id="return-select" class="copy-button">调整选择</button></div><h1 class="compare-title">看见风格之间的差异。</h1><p class="compare-tip">比较信息层级、交互目的与设计约束，再选择适合项目的设计语言。每个章节按行对齐，保留完整内容。</p>${chosen.length<2?'<p class="compare-empty">请先在案例库选择 2–3 个条目。</p>':`<p id="compare-scroll-hint" class="compare-scroll-hint">窄屏可左右滑动；键盘可聚焦比较区域后，用方向键横向查看。</p><div class="compare-scroll" role="region" aria-label="案例逐节比较" aria-describedby="compare-scroll-hint" tabindex="0"><table class="compare-table ${chosen.length===2?'two':''}"><caption>${chosen.map(e=>esc(e.title)).join(' · ')} / 逐节对照</caption><colgroup><col class="compare-label-col">${chosen.map(()=>'<col>').join('')}</colgroup><thead><tr><th class="compare-corner" scope="col">比较维度</th>${chosen.map(e=>`<th scope="col" id="compare-case-${esc(e.id)}"><a href="#style/${encodeURIComponent(e.id)}"><img src="${esc(e.preview)}" alt="${esc(e.title)} demo"><h2>${esc(e.title)}</h2></a></th>`).join('')}</tr></thead><tbody>${sections.map(([id,title,content])=>`<tr data-compare-section="${id}"><th scope="row" class="compare-row-label" id="compare-section-${id}">${title}</th>${chosen.map(e=>`<td headers="compare-section-${id} compare-case-${esc(e.id)}">${content(e)}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`}`;
  $('#return-select').onclick=()=>{location.hash='';};
  window.AtlasIcons?.paint($('#comparison'));
}
document.addEventListener('click',event=>{const button=event.target.closest('[data-fav]');if(button)toggleFavorite(button.dataset.fav);});
document.addEventListener('change',event=>{const item=event.target.closest('[data-compare]');if(item)selectCompare(item.dataset.compare,item.checked);});
document.querySelectorAll('[data-filter]').forEach(button=>button.addEventListener('click',()=>{
  if(button.dataset.filter==='favorites'&&filter==='favorites')return;
  filter=button.dataset.filter;
  favoriteCategory='all';
  writeCollectionState({showCollection:true});
}));
$('#favorite-category').addEventListener('change',event=>{favoriteCategory=event.target.value;writeCollectionState();});
$('#search').addEventListener('input',event=>{query=event.target.value.trim();writeCollectionState({replace:true});});
$('#sort').addEventListener('change',event=>{sort=event.target.value;writeCollectionState();});
$('#sort-dir').addEventListener('click',()=>{dir=dir==='desc'?'asc':'desc';writeCollectionState();});
$('#reset-search').onclick=()=>{
  query='';filter='all';country='all';sort='curated';dir='asc';
  writeCollectionState({showCollection:true});
};
function showCompareSelection(){
  const url=new URL(location.href);
  url.hash='';
  if(url.href!==location.href)history.pushState(null,'',url);
  route();
  (document.querySelector('#cards [data-compare]:not(:checked)')||$('#search')).focus();
}
$('#compare-open').onclick=()=>{
  const inDetail=!$('#detail').hidden;
  if(inDetail){
    const id=location.hash.slice(7);
    if(!selected.includes(id)){
      if(selected.length===3){showCompareSelection();toast('已选满 3 项，请在列表调整选择。');return;}
      selectCompare(id,true);
    }
  }
  if(selected.length<2){showCompareSelection();toast(inDetail?'已加入当前案例，请再勾选一个案例。':'请在列表再勾选一个案例。');return;}
  location.hash='#compare';
};
$('#compare-go').onclick=()=>{if(selected.length>=2)location.hash='#compare';};
$('#compare-clear').onclick=()=>{selected=[];updateTray();if(location.hash==='#compare')renderComparison();else if(!$('#collection').hidden)renderCards();};
document.addEventListener('keydown',event=>{
  if($('#asset-cache-dialog')?.open)return;
  if(event.key==='/'&&!['INPUT','TEXTAREA','SELECT'].includes(document.activeElement.tagName)){
    event.preventDefault();
    if($('#collection').hidden)writeCollectionState({showCollection:true});
    $('#search').focus();
  }
});
$('.skip').addEventListener('click',event=>{event.preventDefault();$('#main').focus();$('#main').scrollIntoView();});
function restoreRoute(){
  // Back/Forward can emit both events for one hash navigation. Render once.
  if(renderedLocation===location.href)return;
  renderedLocation=location.href;
  window.AtlasViewTransition(()=>{route();$('#main').focus({preventScroll:true});});
}
window.addEventListener('popstate',restoreRoute);
window.addEventListener('hashchange',restoreRoute);
$('#all-count').textContent=entries.length;
$('#footer-count').textContent=entries.length+' DEMOS · '+entries.filter(e=>e.implementation!=='reference-study').length+' CLASSIC STYLES · GIT ARCHIVE';
document.querySelectorAll('[data-category-count]').forEach(el=>el.textContent=String(entries.filter(e=>e.category===el.dataset.categoryCount).length).padStart(2,'0'));
const countries=[...new Set(entries.map(e=>e.country).filter(Boolean))].sort((a,b)=>a.localeCompare(b,'zh-CN'));$('#country').innerHTML='<option value="all">全部地区</option>'+countries.map(c=>'<option value="'+esc(c)+'">'+esc(c)+'</option>').join('');$('#country').onchange=event=>{country=event.target.value;writeCollectionState();};
favoriteStore.subscribe(({error})=>{
  favorites=favoriteStore.ids('cases');
  $('#fav-count').textContent=String(favorites.length).padStart(2,'0');
  document.querySelectorAll('[data-fav]').forEach(button=>{const selected=favorites.includes(button.dataset.fav);button.classList.toggle('selected',selected);button.setAttribute('aria-pressed',String(selected));window.AtlasDetail?.paintFavorite(button,selected);});
  if(error)toast(error);
  if(filter==='favorites'&&!$('#collection').hidden)renderCards();
});
route();
})();
