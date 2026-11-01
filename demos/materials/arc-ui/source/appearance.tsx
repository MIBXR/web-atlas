import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { flushSync } from 'react-dom';
import { Check, SlidersHorizontal } from 'lucide-react';
import { Popover, PopoverTrigger, PopoverContent } from './upstream/registry/components/popover/popover';
import { CopyButton } from './upstream/registry/components/copy-button/copy-button';
import type { Theme, ThemeSwitchVariant } from './upstream/registry/components/theme-switch/theme-switch';

export const accents=[
  {id:'neutral',label:'灰色',color:'#747474'},
  {id:'violet',label:'紫色',color:'#7747ff'},
  {id:'blue',label:'蓝色',color:'#0562ef'},
  {id:'green',label:'绿色',color:'#0db879'},
  {id:'amber',label:'琥珀色',color:'#f3ad20'},
  {id:'orange',label:'橙色',color:'#f48120'},
  {id:'coral',label:'珊瑚色',color:'#f15f55'},
  {id:'rose',label:'玫红',color:'#ed4e9d'}
];

export function syncPreviewAppearance(frame?:HTMLIFrameElement){
  const root=document.documentElement;
  for(const target of frame?[frame]:document.querySelectorAll<HTMLIFrameElement>('iframe[data-arc-frame]')){
    const child=target.contentDocument?.documentElement;
    if(child){child.dataset.theme=root.dataset.theme;child.dataset.accent=root.dataset.accent;}
  }
}

export function useAppearance(){
  const [theme,setTheme]=useState<Theme>(()=>(localStorage.getItem('atlas-arc-theme') as Theme)||'light');
  const [accent,setAccent]=useState(()=>localStorage.getItem('atlas-arc-accent')||'neutral');
  const requested=useRef(theme);
  const active=useRef<ViewTransition|null>(null);
  useLayoutEffect(()=>{
    document.documentElement.dataset.theme=theme;
    document.documentElement.dataset.accent=accent;
    localStorage.setItem('atlas-arc-theme',theme);
    localStorage.setItem('atlas-arc-accent',accent);
    syncPreviewAppearance();
  },[theme,accent]);
  const changeTheme=useCallback((next:Theme,variant:ThemeSwitchVariant,trigger:HTMLElement)=>{
    if(next===requested.current)return;
    requested.current=next;
    const root=document.documentElement,rect=trigger.getBoundingClientRect();
    root.style.setProperty('--theme-origin-x',`${rect.left+rect.width/2}px`);
    root.style.setProperty('--theme-origin-y',`${rect.top+rect.height/2}px`);
    active.current?.skipTransition();
    const apply=()=>{root.dataset.theme=next;flushSync(()=>setTheme(next));syncPreviewAppearance();};
    if(matchMedia('(prefers-reduced-motion: reduce)').matches){delete root.dataset.themeMotion;apply();return;}
    root.dataset.themeMotion=variant;
    const transition=document.startViewTransition(apply);
    active.current=transition;
    const finish=()=>{if(active.current===transition){active.current=null;delete root.dataset.themeMotion;}};
    transition.finished.then(finish,finish);
  },[]);
  return {theme,accent,setAccent,changeTheme};
}

export function AppearanceControl({theme,accent,onAccent,onTheme}:{theme:Theme;accent:string;onAccent:(value:string)=>void;onTheme:(next:Theme,variant:ThemeSwitchVariant,trigger:HTMLElement)=>void}){
  const [open,setOpen]=useState(false);
  const [themeCss,setThemeCss]=useState('');
  useEffect(()=>{const style=getComputedStyle(document.documentElement);setThemeCss(`:root {\n  --accent: ${style.getPropertyValue('--accent').trim()};\n  --accent-strong: ${style.getPropertyValue('--accent-strong').trim()};\n  --accent-subtle: ${style.getPropertyValue('--accent-subtle').trim()};\n}`);},[theme,accent,open]);
  return <Popover open={open} onOpenChange={setOpen}>
    <PopoverTrigger asChild><button className="toolbar-icon appearance-trigger" aria-label="调整外观"><SlidersHorizontal size={16} strokeWidth={1.7}/><span>外观</span></button></PopoverTrigger>
    <PopoverContent align="end" sideOffset={8} className="appearance-popover" aria-label="调整外观">
      <h2>外观 <span>Appearance</span></h2>
      <section><h3>强调色</h3><div className="accent-swatches">{accents.map(tone=><button key={tone.id} aria-label={`${tone.label}强调色`} aria-pressed={accent===tone.id} onClick={()=>onAccent(tone.id)} style={{background:tone.color}}>{accent===tone.id&&<Check size={15} strokeWidth={2.4}/>}</button>)}</div><CopyButton value={themeCss} label="复制主题 CSS" variant="plain"/></section>
      <section><h3>主题</h3><div className="appearance-themes" role="group" aria-label="主题">{(['light','dark'] as const).map(value=><button key={value} aria-pressed={theme===value} onClick={event=>onTheme(value,'rise',event.currentTarget)}>{value==='light'?'浅色':'深色'}</button>)}</div></section>
    </PopoverContent>
  </Popover>;
}
