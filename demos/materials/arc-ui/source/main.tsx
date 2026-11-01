import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { createRoot } from 'react-dom/client';
import { AnimatePresence, MotionConfig, motion, useReducedMotion } from 'motion/react';
import { Search, Menu, X, ExternalLink, Eye, CodeXml, ChevronDown, ChevronRight, ChevronLeft, FileCode2 } from 'lucide-react';
import { CopyButton } from './upstream/registry/components/copy-button/copy-button';
import { ThemeSwitch } from './upstream/registry/components/theme-switch/theme-switch';
import { ArcProvider } from './upstream/lib/arc-provider';
import { motionTokens } from './upstream/lib/motion-tokens';
import LocalImage from './media';
import catalogData from '../demo/catalog.json';
import { useAppearance, AppearanceControl } from './appearance';
import { CatalogPanel } from './catalog-panel';
import { CatalogSheet, GlobalSearch } from './library-overlays';
import { PreviewStage, PreviewTools, type PreviewMode } from './preview-stage';
import { RenderPreview } from './render-preview';
import { PreviewFrame } from './frame';

const catalog=catalogData.items;
type Item=typeof catalog[number];
const tokenPattern=/\/\*[\s\S]*?\*\/|\/\/[^\n]*|<!--[\s\S]*?-->|`(?:\\.|[^`\\])*`|"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|\b\d+(?:\.\d+)?\b|\b[A-Za-z_$][\w$-]*\b|[{}[\]();,.<>:=+*/!?|&-]/g;
const keywordPattern=/^(?:abstract|as|async|await|break|case|catch|class|const|continue|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|of|private|protected|public|readonly|return|set|static|switch|throw|try|type|typeof|var|void|while|with|yield|true|false|null|undefined)$/;

function highlightLines(code:string,language:string){
  const lines:ReactNode[][]=[[]];
  let cursor=0;
  function append(text:string,kind?:string){
    text.split('\n').forEach((part,index)=>{
      if(index)lines.push([]);
      const line=lines[lines.length-1];
      if(part)line.push(kind?<span className={`source-token-${kind}`} key={line.length}>{part}</span>:part);
    });
  }
  for(const match of code.matchAll(tokenPattern)){
    const value=match[0],index=match.index!;
    append(code.slice(cursor,index));
    let kind:string|undefined;
    if(value.startsWith('//')||value.startsWith('/*')||value.startsWith('<!--'))kind='comment';
    else if(/^["'`]/.test(value))kind='string';
    else if(/^\d/.test(value))kind='number';
    else if(keywordPattern.test(value))kind='keyword';
    else if(['tsx','jsx','html'].includes(language)&&/<\/?$/.test(code.slice(0,index)))kind='tag';
    append(value,kind);
    cursor=index+value.length;
  }
  append(code.slice(cursor));
  return lines;
}

function CodePane({item}:{item:Item}){
  const [file,setFile]=useState(item.files[0]);
  const [code,setCode]=useState('');
  const [expanded,setExpanded]=useState(false);
  const pre=useRef<HTMLPreElement>(null);
  const [sizes,setSizes]=useState({full:0,collapsed:0});
  const reduced=useReducedMotion();
  const language=file.split('.').pop()!;
  const lines=useMemo(()=>highlightLines(code.replace(/\r?\n$/,''),language),[code,language]);
  useEffect(()=>{
    const controller=new AbortController();
    setCode('');
    fetch(`source/upstream/${file}`,{signal:controller.signal})
      .then(response=>{if(!response.ok)throw Error(`无法读取源码：${file}`);return response.text();})
      .then(setCode)
      .catch(error=>{if(error.name!=='AbortError')throw error;});
    return ()=>controller.abort();
  },[file]);
  useLayoutEffect(()=>{const element=pre.current!;const measure=()=>{const style=getComputedStyle(element),full=element.offsetHeight,collapsed=Math.min(full,24*parseFloat(style.lineHeight)+parseFloat(style.paddingTop)+parseFloat(style.paddingBottom));setSizes(previous=>previous.full===full&&previous.collapsed===collapsed?previous:{full,collapsed});};measure();const observer=new ResizeObserver(measure);observer.observe(element);return()=>observer.disconnect();},[]);
  return <div className="code-pane source-block">
    <header className="source-header">
      <div className="source-file"><FileCode2 size={16} strokeWidth={1.75}/><div className="source-file-picker">
        <select aria-label="源文件" value={file} title={file} onChange={event=>{setFile(event.target.value);setExpanded(false);}}>
          {item.files.map(path=><option key={path} value={path}>{path}</option>)}
        </select><ChevronDown size={12} aria-hidden="true"/>
      </div><span className="source-language">{language}</span></div>
      <CopyButton className="source-copy" value={code} label="复制代码" variant="plain" disabled={!code}/>
    </header>
    <motion.div className="source-code-viewport" initial={false} animate={{height:(expanded?sizes.full:sizes.collapsed)||'auto'}} transition={reduced?{duration:0}:motionTokens.spring.smooth}><pre ref={pre} tabIndex={0} aria-label={`${file} 源码`}><code>{code?lines.map((line,index)=><span className="source-line" key={index}><span className="source-line-number" aria-hidden="true">{index+1}</span><span>{line.length?line:' '}</span></span>):<span className="source-loading">正在读取源码…</span>}</code></pre></motion.div>
    {lines.length>24&&<button className="source-expand" aria-expanded={expanded} onClick={()=>setExpanded(!expanded)}>{expanded?'收起代码':`显示全部 ${lines.length} 行`}<ChevronDown size={14} className={expanded?'is-open':''}/></button>}
  </div>;
}

function ContentHeight({children}:{children:ReactNode}){
  const content=useRef<HTMLDivElement>(null),reduced=useReducedMotion();
  const [height,setHeight]=useState<number|'auto'>('auto'),[moving,setMoving]=useState(false),[morphing,setMorphing]=useState(false);
  useLayoutEffect(()=>{const element=content.current!;const measure=()=>{setMorphing(!!element.querySelector('[data-preview-morph]'));setHeight(element.offsetHeight);};measure();const observer=new ResizeObserver(measure);observer.observe(element);return()=>observer.disconnect();},[]);
  return <motion.div className="pane-height" initial={false} animate={{height}} transition={reduced||morphing?{duration:0}:motionTokens.spring.smooth} style={{overflow:moving?'clip':'visible'}} onAnimationStart={()=>setMoving(true)} onAnimationComplete={()=>setMoving(false)}><div ref={content} className="pane-height-content">{children}</div></motion.div>;
}

function App(){
  const [selected,setSelected]=useState(()=>new URLSearchParams(location.search).get('demo')||'button');
  const [query,setQuery]=useState('');
  const [tab,setTab]=useState('preview');
  const [catalogOpen,setCatalogOpen]=useState(false),[searchOpen,setSearchOpen]=useState(false);
  const [mode,setMode]=useState<PreviewMode>('fit'),[warm,setWarm]=useState(false),[fullscreen,setFullscreen]=useState(false);
  const [collapsed,setCollapsed]=useState<Record<string,boolean>>({block:true});
  const directoryInput=useRef<HTMLInputElement>(null),mobileDirectoryInput=useRef<HTMLInputElement>(null),menuButton=useRef<HTMLButtonElement>(null),searchButton=useRef<HTMLButtonElement>(null);
  const {theme,accent,setAccent,changeTheme}=useAppearance();
  const reduced=useReducedMotion();
  const current=catalog.find(item=>item.id===selected);
  if(!current)throw Error(`未知组件：${selected}`);
  const peers=catalog.filter(item=>item.kind===current.kind),index=peers.findIndex(item=>item.id===selected),previous=peers[index-1],next=peers[index+1];
  const rootItem=peers[0];
  const closeCatalog=useCallback(()=>{setCatalogOpen(false);requestAnimationFrame(()=>menuButton.current?.focus({preventScroll:true}));},[]);
  const dismissCatalog=useCallback(()=>setCatalogOpen(false),[]);
  const toggle=useCallback((id:string)=>setCollapsed(state=>({...state,[id]:!state[id]})),[]);
  function choose(id:string){
    const item=catalog.find(item=>item.id===id)!;
    setSelected(id);setTab('preview');setMode('fit');setWarm(false);setFullscreen(false);
    setCollapsed(state=>({...state,[item.kind]:false,[item.category.id]:false}));
    if(catalogOpen){setQuery('');closeCatalog();}
    if(searchOpen){setQuery('');setSearchOpen(false);}
    history.pushState(null,'',`?demo=${encodeURIComponent(id)}`);
    window.scrollTo({top:0,behavior:'instant'});
  }
  useEffect(()=>{const back=()=>{const id=new URLSearchParams(location.search).get('demo')||'button',item=catalog.find(item=>item.id===id)!;setSelected(id);setTab('preview');setMode('fit');setWarm(false);setFullscreen(false);setCollapsed(state=>({...state,[item.kind]:false,[item.category.id]:false}));window.scrollTo({top:0,behavior:'instant'});};addEventListener('popstate',back);return()=>removeEventListener('popstate',back);},[]);
  useEffect(()=>{
    const key=(event:KeyboardEvent)=>{
      if(event.defaultPrevented||searchOpen||fullscreen)return;
      const editing=(event.target as Element)?.closest('input,textarea,select,[contenteditable="true"]');
      if((event.ctrlKey||event.metaKey)&&event.key.toLowerCase()==='k'&&innerWidth>760){event.preventDefault();directoryInput.current?.focus();directoryInput.current?.select();}
      else if(event.key==='/'&&!editing&&!event.metaKey&&!event.ctrlKey&&!event.altKey){event.preventDefault();if(innerWidth<=760){setCatalogOpen(true);requestAnimationFrame(()=>mobileDirectoryInput.current?.focus());}else directoryInput.current?.focus();}
    };
    window.addEventListener('keydown',key,{capture:true});return()=>window.removeEventListener('keydown',key,{capture:true});
  },[searchOpen,fullscreen]);
  useEffect(()=>{
    const message=(event:MessageEvent)=>{if(event.origin!==location.origin||event.data?.type!=='atlas-preview-theme')return;const frame=[...document.querySelectorAll<HTMLIFrameElement>('iframe[data-arc-frame]')].find(frame=>frame.contentWindow===event.source);if(frame)changeTheme(event.data.theme,event.data.variant,frame);};
    window.addEventListener('message',message);return()=>window.removeEventListener('message',message);
  },[changeTheme]);
  const panelProps={selected,query,onQuery:setQuery,collapsed,onToggle:toggle,onChoose:choose};
  const paneMotion=reduced?{initial:false,animate:{opacity:1},exit:{opacity:0},transition:{duration:0}}:{initial:{opacity:0,y:6},animate:{opacity:1,y:0,transition:{opacity:{duration:.24,ease:[...motionTokens.ease.enter]},y:motionTokens.spring.smooth}},exit:{opacity:0,transition:{duration:motionTokens.duration.instant,ease:[...motionTokens.ease.standard]}}};
  return <MotionConfig reducedMotion="user"><ArcProvider image={LocalImage}>
    <header className="topbar">
      <div className="topbar-brand-group"><button ref={menuButton} className="toolbar-icon mobile-library-trigger" aria-label={catalogOpen?'关闭组件目录':'打开组件目录'} aria-expanded={catalogOpen} aria-controls="mobile-library-navigation" onClick={()=>setCatalogOpen(open=>!open)}>{catalogOpen?<X size={19}/>:<Menu size={19}/>}</button>
        <a className="brand" href="https://uiarc.dev/" target="_blank" rel="noreferrer" inert={catalogOpen||fullscreen}><svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="5.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M9 48V29C9 15 19 7 32 7s23 8 23 22v19"/><path d="M20 48V31c0-8 5-13 12-13s12 5 12 13v17"/><path d="M32 38v10"/></svg>Arc<span>免费组件与区块</span></a>
      </div>
      <div className="topbar-tools" inert={catalogOpen||fullscreen}><button ref={searchButton} className="toolbar-icon global-search-trigger" aria-label="搜索组件" onClick={()=>setSearchOpen(true)}><Search size={16} strokeWidth={1.8}/><span>搜索</span><kbd>Ctrl K</kbd></button><div className="appearance-group"><AppearanceControl theme={theme} accent={accent} onAccent={setAccent} onTheme={changeTheme}/><span className="toolbar-theme"><ThemeSwitch theme={theme} variant="rise" iconOnly onThemeChange={changeTheme} label={theme==='light'?'切换深色主题':'切换浅色主题'}/></span></div></div>
    </header>
    <div className="gallery-layout" inert={catalogOpen||fullscreen}>
      <aside className="catalog"><CatalogPanel {...panelProps} inputRef={directoryInput}/></aside>
      <main className="gallery-main" id="component-detail">
        <nav className="component-breadcrumb" aria-label="面包屑"><a href={`?demo=${rootItem.id}`} onClick={event=>{event.preventDefault();choose(rootItem.id);}}>{current.kind==='block'?'区块':'组件'} <span lang="en">{current.kind==='block'?'Blocks':'Components'}</span></a><ChevronRight size={13} aria-hidden="true"/><span aria-current="page">{current.titleZh} <span lang="en">{current.title}</span></span></nav>
        <div className="component-heading"><h1>{current.titleZh}<small lang="en">{current.title}</small></h1><a className="source-link" href={current.url} target="_blank" rel="noreferrer">官网示例<ExternalLink size={14}/></a></div>
        <section className="example-panel">
          <div className="panel-toolbar">
            <div className="pane-tabs" role="tablist" aria-label="预览与源码" onKeyDown={event=>{if(!['ArrowLeft','ArrowRight','Home','End'].includes(event.key))return;event.preventDefault();const next=event.key==='Home'?'preview':event.key==='End'?'code':tab==='preview'?'code':'preview';setTab(next);document.getElementById(`${next}-tab`)!.focus();}}>
              <button id="preview-tab" role="tab" tabIndex={tab==='preview'?0:-1} aria-selected={tab==='preview'} aria-controls="preview-panel" onClick={()=>setTab('preview')}><span><Eye size={14} strokeWidth={1.8}/>预览 <span className="tab-english">Preview</span></span>{tab==='preview'&&<motion.i className="tab-underline" layoutId="preview-code-indicator" transition={motionTokens.spring.snappy}/>}</button>
              <button id="code-tab" role="tab" tabIndex={tab==='code'?0:-1} aria-selected={tab==='code'} aria-controls="code-panel" onClick={()=>setTab('code')}><span><CodeXml size={14} strokeWidth={1.8}/>代码 <span className="tab-english">Code</span></span>{tab==='code'&&<motion.i className="tab-underline" layoutId="preview-code-indicator" transition={motionTokens.spring.snappy}/>}</button>
            </div>
            {tab==='preview'&&<div className="preview-toolbar-right"><span className="preview-live-hint">可交互 · 支持键盘</span><PreviewTools mode={mode} onMode={setMode} onFullscreen={()=>setFullscreen(true)} onPrime={()=>setWarm(true)}/></div>}
          </div>
          <ContentHeight><AnimatePresence initial={false} mode="popLayout">{tab==='preview'?<motion.div key="preview" id="preview-panel" className="preview-panel" role="tabpanel" aria-labelledby="preview-tab" {...paneMotion}><PreviewStage key={selected} mode={mode} warm={warm} src={`index.html?demo=${encodeURIComponent(selected)}&frame=1`} title={`${current.titleZh} · ${current.title}`} fullscreen={fullscreen} onFullscreen={setFullscreen}><div className={`stage-fit-body ${current.kind==='block'?'is-block':''}`}><RenderPreview id={selected} group={current.group} theme={theme} onThemeChange={changeTheme}/></div></PreviewStage></motion.div>:<motion.div key="code" id="code-panel" role="tabpanel" aria-labelledby="code-tab" {...paneMotion}><CodePane item={current} key={selected}/></motion.div>}</AnimatePresence></ContentHeight>
        </section>
        <p className="source-note">组件与区块使用固定版本的原始源码。源码区可切换 TypeScript、CSS 及关联文件。</p>
        <nav className="component-pagination" aria-label="相邻条目">{previous?<a href={`?demo=${previous.id}`} onClick={event=>{event.preventDefault();choose(previous.id);}}><ChevronLeft size={15}/><span><small>上一项</small><span>{previous.titleZh} <span lang="en">{previous.title}</span></span></span></a>:<span/>}{next&&<a href={`?demo=${next.id}`} onClick={event=>{event.preventDefault();choose(next.id);}}><span><small>下一项</small><span>{next.titleZh} <span lang="en">{next.title}</span></span></span><ChevronRight size={15}/></a>}</nav>
        <footer className="gallery-footer"><a href="source/upstream/README.md" target="_blank">上游使用说明</a><a href="LICENSES.md" target="_blank">许可与署名</a><span>Arc UI · 免费部分</span></footer>
      </main>
    </div>
    <CatalogSheet open={catalogOpen} onClose={closeCatalog} onDismiss={dismissCatalog}><CatalogPanel {...panelProps} inputRef={mobileDirectoryInput} mobile onClose={closeCatalog}/></CatalogSheet>
    <GlobalSearch open={searchOpen} onOpenChange={setSearchOpen} onChoose={choose} returnFocusRef={searchButton}/>
  </ArcProvider></MotionConfig>;
}

createRoot(document.getElementById('root')!).render(new URLSearchParams(location.search).has('frame')?<PreviewFrame/>:<App/>);
