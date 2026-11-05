(() => {
  'use strict';
  const el = id => document.getElementById(id);
  const isExternalLink = href => {try {const url=new URL(href,location.href);return /^https?:$/.test(url.protocol)&&url.origin!==location.origin;}catch{return false;}};
  const sample = el('sample');
  const elementPanel = document.querySelector('.element-controls');
  document.querySelector('.experiment').before(elementPanel);
  const workspace=document.createElement('div');
  workspace.className='lab-workspace';
  elementPanel.before(workspace);
  workspace.append(elementPanel,document.querySelector('.experiment'));
  elementPanel.insertAdjacentHTML('beforeend', '<div class="graphic-control"><label for="graphic-choice">⑥ 图形素材</label><select id="graphic-choice"><option value="line">线描 / 轮廓表达</option><option value="geometry">几何 / 抽象构成</option><option value="product">产品 / 记录工具</option></select><small>三幅本地原创SVG，使用当前配色与线条规则。</small></div><div class="hierarchy-control"><label for="hierarchy-choice">⑦ 信息层级</label><select id="hierarchy-choice"><option value="clear">清楚主次 / 大标题</option><option value="flat">相近平级 / 观察比较</option></select><small>改变标题比例与字重，语义标题和内容保持不变。</small></div><div class="texture-control"><label for="texture-choice">⑧ 质感</label><select id="texture-choice"><option value="flat">平面 / 无额外质感</option><option value="grain">颗粒 / 轻微纸感</option><option value="lift">阴影 / 表面层次</option></select><small>装饰只做轻量示范，不降低正文对比。</small></div><div class="motion-control"><label class="motion-switch" for="motion-choice"><input id="motion-choice" type="checkbox" checked>⑨ 微动效</label><small>用示例下方“体验操作反馈”按钮观察。关闭动效后仍有文字反馈；减少动态偏好优先。</small></div>');
  elementPanel.insertAdjacentHTML('beforeend','<div class="theme-control"><label for="sample-theme">⑩ 深浅色 / 颜色角色一起切换</label><select id="sample-theme"><option value="reference">保留方案 / 原案例主题</option><option value="system">跟随系统</option><option value="light">浅色</option><option value="dark">深色</option></select><small>这是教学迁移，来源 Demo 保留原色。切换主题时，比较表面、文字、按钮与边界；图片不反色。</small><p id="theme-note" role="status"></p><p id="reference-sound-note"></p></div>');
  const systemTheme=matchMedia('(prefers-color-scheme:dark)');
  const graphic = document.createElement('div');
  graphic.className='sample-graphic';
  graphic.setAttribute('aria-label','当前选择的原创图形');
  document.querySelector('.note-preview-top').after(graphic);
  const feedback = document.createElement('div');
  feedback.className='sample-feedback';
  feedback.innerHTML='<button id="feedback-demo" class="sample-primary" type="button">体验操作反馈</button><p id="feedback-message" role="status" aria-live="polite">点击后查看文字与视觉反馈。</p>';
  el('sample-features').after(feedback);
  const graphicNames={line:'线描',geometry:'几何',product:'产品'};
  const graphics={
    line:'<svg viewBox="0 0 240 100" role="img" aria-label="线描：一本笔记与一片叶子"><path d="M23 20h118v68H23zM33 20v68M48 38h58M48 49h72M48 60h48M48 71h61"/><path d="M168 82c-9-16-18-41 13-59 30 6 31 45-2 52M164 87l26-52M175 66l-13-17M184 47l18 2"/><path d="m117 34 25-21 6 7-25 21-11 3z"/></svg>',
    geometry:'<svg viewBox="0 0 240 100" role="img" aria-label="几何：圆、矩形和三角构成"><rect class="graphic-soft" x="25" y="18" width="71" height="65"/><circle class="graphic-accent" cx="139" cy="42" r="28"/><path class="graphic-outline" d="m152 84 36-64 36 64Z"/><path d="M22 90h202M46 29v43M61 29v31M76 29v39"/></svg>',
    product:'<svg viewBox="0 0 240 100" role="img" aria-label="产品：笔记本与便携记录工具"><rect class="graphic-soft" x="24" y="11" width="119" height="76" rx="4"/><path d="M39 11v76M55 31h62M55 44h46M55 57h54M55 70h34"/><rect x="164" y="8" width="49" height="82" rx="5"/><rect class="graphic-accent" x="174" y="25" width="29" height="25"/><path d="M180 17h16M174 63h26M174 72h19"/><circle cx="188" cy="82" r="2"/></svg>'
  };
  const names = { paper:'纸页', friendly:'亲和', tool:'工具' };
  const labels = { palette:'配色', type:'字体', shape:'形状', space:'留白' };
  const fontNames = { serif:'衬线', sans:'无衬线', mono:'等宽' };
  const layoutNames = { split:'左文右图', center:'居中纵向', editorial:'左图右文' };
  const shapeNames = { sharp:'直角 / 0px', soft:'小圆角 / 8px', round:'大圆角 / 24px' };
  const schemes = {
    // Snapshot references: Notion's neutral workspace, Material's tonal purple, Swiss's paper/ink/red.
    paper:{ name:'纸页', palette:{bg:'#f7f7f5',ink:'#101010',accent:'#373737'},type:'sans',layout:'split',shape:'soft',space:32,graphic:'line',hierarchy:'clear',texture:'flat',motion:true, description:'中性纸面、墨色信息与少量深灰强调，配合清楚的无衬线层级、细框和留白，表达安静阅读。' },
    friendly:{ name:'亲和',palette:{bg:'#fefbff',ink:'#1c1b1d',accent:'#6442d6'},type:'sans',layout:'split',shape:'round',space:28,graphic:'geometry',hierarchy:'clear',texture:'flat',motion:true,description:'柔白表面、深色正文与紫色行动，配合柔和图形和适中留白，让信息清楚、操作亲和。' },
    tool:{name:'工具',palette:{bg:'#f2efe6',ink:'#171717',accent:'#e3402e'},type:'sans',layout:'editorial',shape:'sharp',space:24,graphic:'product',hierarchy:'clear',texture:'flat',motion:false,description:'纸白、炭黑与信号红，配合严格对齐、直线边界与紧凑间距，突出可扫描的工具信息。'}
  };
  const fontRules = {
    serif:{title:'Georgia,"SimSun",serif',body:'Arial,"Microsoft YaHei",sans-serif',weight:'500',track:'-1px'},
    sans:{title:'"Microsoft YaHei","微软雅黑","Segoe UI",Arial,sans-serif',body:'"Microsoft YaHei","微软雅黑","Segoe UI",Arial,sans-serif',weight:'650',track:'-.5px'},
    mono:{title:'"Courier New","Microsoft YaHei",monospace',body:'"Courier New","Microsoft YaHei",monospace',weight:'700',track:'-.8px'}
  };
  const shapeRules = {sharp:{radius:0,stroke:1,cap:'butt',shadow:'none'},soft:{radius:8,stroke:1,cap:'round',shadow:'none'},round:{radius:24,stroke:1,cap:'round',shadow:'none'}};
  let state;
  let groupOrigins;
  let referenceEntry = null;
  const hex = value => String(value).toLowerCase();
  const rgb = value => [1,3,5].map(start => parseInt(value.slice(start,start+2),16));
  const toHex = array => '#'+array.map(n=>Math.round(n).toString(16).padStart(2,'0')).join('');
  const blend = (a,b,t) => toHex(rgb(a).map((v,i)=>v*(1-t)+rgb(b)[i]*t));
  const luminance = color => rgb(color).map(v=>{const s=v/255;return s<=.04045?s/12.92:Math.pow((s+.055)/1.055,2.4)}).reduce((sum,v,i)=>sum+v*[.2126,.7152,.0722][i],0);
  const contrast = (a,b) => {const x=luminance(a),y=luminance(b);return (Math.max(x,y)+.05)/(Math.min(x,y)+.05)};
  const bestText = background => contrast(background,'#ffffff')>contrast(background,'#171717')?'#ffffff':'#171717';
  const clone = value => JSON.parse(JSON.stringify(value));
  const setVar = (key,value) => sample.style.setProperty('--'+key,String(value));
  function resolvedPalette(){
    const base=state.palette;
    const choice=state.themeChoice||'reference';
    const dark=choice==='system'?systemTheme.matches:choice==='dark';
    const baseDark=luminance(base.bg)<.25;
    if(choice==='reference'||dark===baseDark)return base;
    return dark?{bg:blend(base.bg,'#111713',.93),ink:blend(base.ink,'#ffffff',.9),accent:blend(base.accent,'#ffffff',.42)}:{bg:blend(base.bg,'#ffffff',.96),ink:blend(base.ink,'#101b14',.94),accent:blend(base.accent,'#101b14',.57)};
  }
  function config(){
    return {
      version:3,
      purpose:'同一虚构产品内容的设计元素教学实验，不是来源网站复刻',
      reference:referenceEntry?{id:referenceEntry.id,title:referenceEntry.title,sources:referenceEntry.sources.map(s=>({title:s.title,url:s.url}))}:null,
      baseScheme:state.name,
      color:{background:resolvedPalette().bg,text:resolvedPalette().ink,accent:resolvedPalette().accent,buttonText:bestText(resolvedPalette().accent)},
      theme:{choice:state.themeChoice||'reference',resolved:luminance(resolvedPalette().bg)<.25?'dark':'light',systemDark:systemTheme.matches,sourceBehavior:referenceEntry?.themeBehavior||null,note:'教学迁移使用协调颜色角色，固定主题案例的真实demo不改色'},
      sound:{kind:'none',control:'协调实验不播放音乐或操作音',interactionRole:'反馈由文字和微动效表达',sourceBehavior:referenceEntry?.soundBehavior||null},
      typography:{choice:state.type,titleFont:fontRules[state.type].title,bodyFont:fontRules[state.type].body},
      layout:{choice:state.layout,meaning:layoutNames[state.layout]},
      shape:{choice:state.shape,radiusPx:shapeRules[state.shape].radius,strokePx:shapeRules[state.shape].stroke,buttonRadiusPx:8},
      spacing:{basePx:state.space,note:'手机外边距上限28px，组间距离继续按所选尺度变化'},
      graphic:{choice:state.graphic,meaning:graphicNames[state.graphic],asset:'本地原创SVG，无外部素材'},
      hierarchy:state.hierarchy,
      texture:state.texture,
      motion:{type:'micro-motion',enabled:state.motion,reducedMotionPreferred:matchMedia('(prefers-reduced-motion:reduce)').matches,note:'仅协调实验的局部反馈；文字反馈始终存在'},
      elementOrigins:clone(groupOrigins),
      constraints:['内容先于装饰','颜色角色一致','自然滚动，手机重排，键盘焦点可见','产品文案保持相同，图形呈现方式可单独切换']
    };
  }
  function syncInputs(){
    el('color-bg').value=state.palette.bg;
    el('color-ink').value=state.palette.ink;
    el('color-accent').value=state.palette.accent;
    el('type-choice').value=state.type;
    el('layout-choice').value=state.layout;
    el('shape-choice').value=state.shape;
    el('space-choice').value=String(state.space);
    el('graphic-choice').value=state.graphic;
    el('hierarchy-choice').value=state.hierarchy;
    el('texture-choice').value=state.texture;
    el('motion-choice').checked=state.motion;
    el('sample-theme').value=state.themeChoice||'reference';
  }
  function render(){
    const {bg,ink,accent}=resolvedPalette();
    el('sample-theme').value=state.themeChoice||'reference';
    const dark=luminance(bg)<.25;
    sample.style.colorScheme=dark?'dark':'light';
    sample.dataset.theme=dark?'dark':'light';
    const origin=referenceEntry?.themeBehavior;
    el('theme-note').textContent='当前示例：'+(dark?'深色':'浅色')+'；'+((state.themeChoice||'reference')==='system'?'随系统变化。':'可切换比较。')+(origin?'原案例：'+origin.control+'；'+origin.designReason:'背景、表面、正文、强调和边界按各自角色一起切换，不对图片施加反色。');
    const sound=referenceEntry?.soundBehavior;
    el('reference-sound-note').textContent=sound?'协调实验无声音。原案例声音：'+sound.control+' '+sound.interactionRole:'协调实验无声音；下方声音机制实验可单独启用合成操作音。';
    setVar('bg',bg);setVar('ink',ink);setVar('accent',accent);setVar('on-accent',bestText(accent));
    setVar('surface',blend(bg,ink,.035));setVar('soft',blend(bg,ink,.075));setVar('line',blend(bg,ink,.26));setVar('muted',blend(ink,bg,.18));
    setVar('accent-text',contrast(accent,bg)>=4.5?accent:ink);
    const fonts=fontRules[state.type];
    setVar('font-title',fonts.title);setVar('font-body',fonts.body);setVar('title-weight',fonts.weight);setVar('title-track',fonts.track);
    const shape=shapeRules[state.shape];
    setVar('radius',shape.radius+'px');setVar('stroke',shape.stroke+'px');setVar('linecap',shape.cap);setVar('shadow',shape.shadow);
    setVar('pad',state.space+'px');setVar('gap',Math.round(state.space*.7)+'px');setVar('card-pad',Math.round(state.space*.7)+'px');
    sample.dataset.layout=state.layout;
    sample.dataset.hierarchy=state.hierarchy;
    sample.dataset.texture=state.texture;
    sample.dataset.motion=state.motion?'on':'off';
    setVar('duration',state.motion?'180ms':'0ms');
    graphic.innerHTML=graphics[state.graphic];
    graphic.setAttribute('aria-label','当前图形：'+graphicNames[state.graphic]);
    el('color-bg').value=bg;el('color-ink').value=ink;el('color-accent').value=accent;
    el('hex-bg').textContent=bg;el('hex-ink').textContent=ink;el('hex-accent').textContent=accent;el('space-value').textContent=state.space+'px';
    const textRatio=contrast(bg,ink),buttonRatio=contrast(accent,bestText(accent));
    el('contrast-note').textContent='文字 / 背景 '+textRatio.toFixed(2)+':1；按钮文字 '+buttonRatio.toFixed(2)+':1。'+(textRatio<4.5?'正文读数低于4.5:1，试着调深或调浅文字。':'这两组读数不代表整页无障碍达标。')+'按钮文字自动选择深浅。';
    el('contrast-note').classList.toggle('warn',textRatio<4.5);
    el('token-palette').textContent=groupOrigins.palette;
    el('token-type').textContent=fontNames[state.type]+' · '+groupOrigins.type;
    el('token-shape').textContent=shapeNames[state.shape];
    el('token-space').textContent=state.space+'px · '+groupOrigins.space;
    el('current-config').value=JSON.stringify(config(),null,2);
  }
  function clearSchemeButtons(){document.querySelectorAll('[data-scheme]').forEach(button=>button.setAttribute('aria-pressed','false'))}
  function message(title,copy,question){
    const target=el('change-note');target.replaceChildren();const strong=document.createElement('strong');strong.textContent=title+'：';target.append(strong,document.createTextNode(copy));
    el('observe-note').textContent=question||'观察：标题、主按钮和笔记是否形成明确主次？形状与字体是否表达相近气质？相关信息是否靠得更近？';
  }
  function setScheme(id){
    state=clone(schemes[id]);groupOrigins={palette:names[id],type:names[id],shape:names[id],space:names[id]};referenceEntry=null;
    document.querySelectorAll('[data-scheme]').forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.scheme===id)));
    el('reference-style').value='';el('style-context').textContent='已恢复完整协调方案。各控件仍可单独调整，产品文案不变。';el('style-source-links').replaceChildren();
    el('current-plan').textContent='当前：'+names[id]+'完整方案';syncInputs();render();message(names[id]+'完整方案',schemes[id].description);
  }
  document.querySelectorAll('[data-scheme]').forEach(button=>button.addEventListener('click',()=>{setScheme(button.dataset.scheme);try{const url=new URL(location.href);url.searchParams.delete('style');history.replaceState(null,'',url)}catch{}}));
  el('apply-one').addEventListener('click',()=>{
    const group=el('override-element').value,id=el('borrow-scheme').value,borrowed=schemes[id];
    if(group==='palette')state.palette=clone(borrowed.palette);else if(group==='type')state.type=borrowed.type;else if(group==='shape')state.shape=borrowed.shape;else if(group==='space')state.space=borrowed.space;
    groupOrigins[group]='借用·'+names[id];clearSchemeButtons();syncInputs();render();el('current-plan').textContent='当前：'+state.name+' + 单项混合';
    const questions={palette:'观察：新的背景、文字和强调色是否仍把视线带到主行动？色彩气质与原有字体、形状如何相处？',type:'观察：字形改变后，标题气质与现有圆角、边框是否接近？换行与阅读密度发生了什么？',shape:'观察：按钮、笔记与图形边线的形状改变后，是否仍像同一套语言？',space:'观察：更疏朗或更紧凑的间距如何改变分组与阅读速度？哪些内容应该靠近？'};
    message('只替换'+labels[group],'从“'+names[id]+'”借用这一项，其余元素维持当前配置。单项混合不一定错误，试着判断它是否服务同一目标。',questions[group]);
  });
  const changed=(group,title,copy,question)=>{groupOrigins[group]='手动调整';clearSchemeButtons();render();el('current-plan').textContent='当前：'+state.name+' + 自定义';message(title,copy,question)};
  [['color-bg','bg','背景'],['color-ink','ink','文字'],['color-accent','accent','强调']].forEach(([id,key,label])=>el(id).addEventListener('input',event=>{
    state.palette={...resolvedPalette()};state.themeChoice='reference';state.palette[key]=hex(event.target.value);changed('palette','调整'+label+'色','只改动这个颜色角色；字体、布局、形状与留白保持当前值。','观察：视线先落在哪里？请同时查看文字与背景对比读数；亮丽的颜色也可能降低可读性。');
  }));
  el('type-choice').addEventListener('change',event=>{state.type=event.target.value;changed('type','调整字体','标题与正文改用“'+fontNames[state.type]+'”字体方案，产品文字保持不变。','观察：字形、字重和换行是否改变阅读气质？与现有线条、形状的关系是否清晰？')});
  el('layout-choice').addEventListener('change',event=>{state.layout=event.target.value;clearSchemeButtons();render();el('current-plan').textContent='当前：'+state.name+' + 布局调整';message('调整布局','切换为“'+layoutNames[state.layout]+'”。手机会重排为纵向，但图文顺序仍体现这个选择。','观察：先看到的是文案还是示例笔记？布局是否将产品重点带到了更明确的位置？')});
  el('shape-choice').addEventListener('change',event=>{state.shape=event.target.value;changed('shape','调整形状与圆角','采用“'+shapeNames[state.shape]+'”，笔记卡片与边线处理一起更新，行动按钮保留统一圆角。','观察：多个元素重复同一种形状规则后，是否更容易被理解为一个整体？')});
  el('space-choice').addEventListener('input',event=>{state.space=Number(event.target.value);changed('space','调整留白','基准间距改为'+state.space+'px；外边距、组间距与内距按同一尺度变化。手机外边距有28px上限。','观察：哪些内容成了一组？重点周围是否有空间？密集与疏朗会如何改变阅读速度？')});
  el('graphic-choice').addEventListener('change',event=>{state.graphic=event.target.value;clearSchemeButtons();render();el('current-plan').textContent='当前：'+state.name+' + 图形调整';message('调整图形素材','换成“'+graphicNames[state.graphic]+'”呈现方式；三幅SVG沿用当前配色与线条规则，文字卖点保持相同。','观察：线描、抽象构成与具体产品图分别强调了什么？哪一种更适合解释当前卖点？')});
  el('hierarchy-choice').addEventListener('change',event=>{state.hierarchy=event.target.value;clearSchemeButtons();render();el('current-plan').textContent='当前：'+state.name+' + 层级调整';message('调整信息层级',state.hierarchy==='clear'?'恢复明显的标题尺度与字重差。':'把标题尺度和字重拉近正文，观察视觉更趋平级时的阅读变化。','观察：第一眼先看到什么？标题和主要行动还容易找到吗？语义标题没有改变，只改变视觉关系。')});
  el('texture-choice').addEventListener('change',event=>{state.texture=event.target.value;clearSchemeButtons();render();el('current-plan').textContent='当前：'+state.name+' + 质感调整';message('调整质感',{flat:'去掉额外颗粒和阴影，保持平面。',grain:'加入轻微颗粒，示范纸面感觉；文字区域保留可读性。',lift:'用阴影区分表面层次，不移动实际布局。'}[state.texture],'观察：质感有没有帮助理解层次？如果去掉它，产品重点仍然清楚吗？')});
  el('sample-theme').addEventListener('change',event=>{state.themeChoice=event.target.value;clearSchemeButtons();render();message('切换显示主题','比较同一内容在深浅主题下的背景、表面、文字、按钮与分组边界；颜色按角色调整，并非直接反转。','观察：主行动是否仍突出？文字、边框、图形是否仍可读？强主题原站是否适合提供切换？');});
  systemTheme.addEventListener('change',()=>{if(state?.themeChoice==='system')render();});
  el('motion-choice').addEventListener('change',event=>{state.motion=event.target.checked;clearSchemeButtons();render();el('current-plan').textContent='当前：'+state.name+' + 动效调整';message('调整微动效',state.motion?'已允许短暂反馈动效；系统减少动态偏好仍优先。':'已关闭非必要动效，点击反馈按钮仍会显示结果文字。','用示例下方按钮体验：动效可以帮助确认操作，但不能成为反馈的唯一方式。')});
  el('feedback-demo').addEventListener('click',()=>{const button=el('feedback-demo');button.classList.remove('feedback-pulse');if(state.motion&&!matchMedia('(prefers-reduced-motion:reduce)').matches)requestAnimationFrame(()=>button.classList.add('feedback-pulse'));el('feedback-message').innerHTML='<svg class="atlas-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="m5 12 4 4L19 6"/></svg> 操作已完成。'+(state.motion&&!matchMedia('(prefers-reduced-motion:reduce)').matches?'同时提供短暂视觉反馈。':'当前使用静态文字反馈。')});
  const catalog=Array.isArray(window.ATLAS_CASES)?window.ATLAS_CASES:[];
  for(const entry of catalog){const option=document.createElement('option');option.value=entry.id;option.textContent=String(entry.order).padStart(2,'0')+' / '+entry.title;el('reference-style').append(option)}
  function applyReference(entry){
    const palette=(entry.tokens&&Array.isArray(entry.tokens.palette)?entry.tokens.palette:[]).filter(c=>/^#[0-9a-f]{6}$/i.test(c));
    const bg=/^#[0-9a-f]{6}$/i.test(entry.background)?entry.background:'#f4eee2';
    const readablePalette=palette.filter(color=>contrast(color,bg)>=4.5);
    const candidates=readablePalette.length?readablePalette:['#171717','#fff1e8'];const ink=candidates.sort((a,b)=>contrast(b,bg)-contrast(a,bg))[0];
    const accent=/^#[0-9a-f]{6}$/i.test(entry.accent)?entry.accent:palette[2]||'#49654d';
    const mono=/retro-80s|pixel-world/.test(entry.id);
    const serif=/zelda-world|hand-drawn|isometric-3d/.test(entry.id);
    const sharp=/swiss-grid|bauhaus-geometry|line-art|persona-kinetic|retro-80s|pixel-world/.test(entry.id);
    const center=/apple-product|shape-morph/.test(entry.id);
    const editorial=/swiss-grid|line-art|persona-kinetic/.test(entry.id);
    const space=/apple-product|hand-drawn/.test(entry.id)?48:/retro-80s|pixel-world/.test(entry.id)?24:32;
    state={name:entry.title,palette:{bg:hex(bg),ink:hex(ink),accent:hex(accent)},type:mono?'mono':serif?'serif':'sans',layout:center?'center':editorial?'editorial':'split',shape:sharp?'sharp':entry.category==='产品'?'round':'soft',space,graphic:/line-art|hand-drawn/.test(entry.id)?'line':/swiss-grid|bauhaus-geometry|shape-morph/.test(entry.id)?'geometry':'product',hierarchy:'clear',texture:/hand-drawn|zelda-world/.test(entry.id)?'grain':entry.category==='产品'?'lift':'flat',motion:true};
    referenceEntry=entry;groupOrigins={palette:'条目色板',type:'教学映射',shape:'教学映射',space:'教学映射'};clearSchemeButtons();syncInputs();render();
    el('reference-style').value=entry.id;el('current-plan').textContent='当前：'+entry.title+' / 教学迁移';
    el('style-context').textContent='“'+entry.title+'”已带入：色板来自本地条目；字体、布局、形状与间距按条目ID/类别归纳为教学配置，供比较使用。这是元素迁移示例，并非官网或来源 Demo 的像素复刻。';
    const links=el('style-source-links');links.replaceChildren();for(const source of entry.sources.slice(0,2)){const a=document.createElement('a');a.href=source.url;a.textContent=source.title;a.target='_blank';a.rel='noreferrer';if(isExternalLink(a.href)){const icon=document.createElement('span');icon.className='atlas-external-icon';icon.setAttribute('aria-hidden','true');icon.innerHTML='' + AtlasIcons.svg('external') + '';a.append(' ',icon)}links.append(a)}
    message('从风格库迁移','保持“拾光笔记”的产品内容，借用“'+entry.title+'”的元素特征。完整信息架构与核心交互见该条目的独立 Demo。','观察：同一内容借用不同风格后，气质、视觉重点与阅读密度有什么变化？再单独改一项，检验它与其他元素的关系。');
  }
  el('reference-style').addEventListener('change',event=>{const entry=catalog.find(item=>item.id===event.target.value);if(entry)applyReference(entry);else setScheme('paper');try{const url=new URL(location.href);if(entry)url.searchParams.set('style',entry.id);else url.searchParams.delete('style');history.replaceState(null,'',url)}catch{}});
  async function copy(text,feedback,fallback){
    try{if(!navigator.clipboard||!navigator.clipboard.writeText)throw new Error('Clipboard unavailable');await navigator.clipboard.writeText(text);feedback.textContent='已复制，可以粘贴到新的制作请求中。'}catch{
      const node=fallback||el('current-config');node.value=text;if(node.closest('details'))node.closest('details').open=true;node.focus();node.select();feedback.textContent='浏览器未允许自动复制。文本已选中，请按 Ctrl+C 或使用系统复制。';
    }
  }
  el('copy-prompt').addEventListener('click',()=>copy(el('prompt-text').value,el('copy-status'),el('prompt-text')));
  el('copy-config').addEventListener('click',()=>copy(JSON.stringify(config(),null,2),el('config-copy-status')));
  el('copy-current-prompt').addEventListener('click',()=>{
    const source=referenceEntry?'\n参考方向：'+referenceEntry.title+'；来源：'+referenceEntry.sources.map(s=>s.url).join('，')+'。这是元素教学迁移，请结合原条目研究其完整布局与交互。':'';
    const text=el('prompt-text').value+source+'\n\n当前元素配置（可据项目内容调整，不作为审美评分）：\n'+JSON.stringify(config(),null,2);copy(text,el('config-copy-status'));
  });
  function showComposer(open){el('sample-compose').hidden=!open;el('sample-action').setAttribute('aria-expanded',String(open));if(open)el('sample-note').focus();}
  el('sample-action').addEventListener('click',()=>showComposer(el('sample-compose').hidden));
  el('sample-cancel').addEventListener('click',()=>{showComposer(false);el('sample-action').focus({preventScroll:true});});
  el('sample-compose').addEventListener('submit',event=>{event.preventDefault();const text=el('sample-note').value.trim();if(!text){el('sample-message').textContent='先写一句发现，再保存。';el('sample-note').focus();return}document.querySelector('.note-preview h4').textContent=text;el('sample-message').textContent='已在本次页面保存。示例笔记已更新；刷新后不会保留。'});
  setScheme('paper');
  const requested=new URLSearchParams(location.search).get('style');
  if(requested){const entry=catalog.find(item=>item.id===requested);if(entry)applyReference(entry);else el('style-context').textContent='未找到这个风格编号，当前使用纸页基础方案。请重新选择风格。'}
  const sectionLinks=[...document.querySelectorAll('.atlas-section-nav>a')];
  function setCurrentSection(hash){
    for(const link of sectionLinks){
      if(link.hash===hash)link.setAttribute('aria-current','location');
      else link.removeAttribute('aria-current');
    }
  }
  for(const link of sectionLinks)link.addEventListener('click',()=>setCurrentSection(link.hash));
  setCurrentSection(sectionLinks.some(link=>link.hash===location.hash)?location.hash:sectionLinks[0].hash);
  const sectionObserver=new IntersectionObserver(entries=>{
    for(const entry of entries)if(entry.isIntersecting)setCurrentSection('#'+entry.target.id);
  },{rootMargin:'-30% 0px -60% 0px'});
  for(const link of sectionLinks)sectionObserver.observe(document.querySelector(link.hash));
  if(document.documentElement.dataset.labEmbed==='home' && window.parent!==window){
    const experiment=el('lab');
    let reportedHeight=0;
    let reportedWidth=0;
    const reportHeight=()=>{
      const height=Math.ceil(experiment.getBoundingClientRect().height);
      const width=Math.round(window.innerWidth);
      if(!Number.isFinite(height)||height<=0||!Number.isFinite(width)||width<=0||(height===reportedHeight&&width===reportedWidth))return;
      reportedHeight=height;reportedWidth=width;
      window.parent.postMessage({type:'design-atlas:lab-height',height,width},location.origin);
    };
    new ResizeObserver(reportHeight).observe(experiment);
    reportHeight();
  }
})();
