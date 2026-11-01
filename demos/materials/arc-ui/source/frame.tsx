import { useLayoutEffect, useState } from 'react';
import { flushSync } from 'react-dom';
import { MotionConfig } from 'motion/react';
import { ArcProvider } from './upstream/lib/arc-provider';
import type { Theme } from './upstream/registry/components/theme-switch/theme-switch';
import LocalImage from './media';
import { RenderPreview } from './render-preview';
import data from '../demo/catalog.json';

export function PreviewFrame(){
  const id=new URLSearchParams(location.search).get('demo')!;
  const item=data.items.find(item=>item.id===id);
  if(!item)throw Error(`未知组件：${id}`);
  const [theme,setTheme]=useState<Theme>('light');
  useLayoutEffect(()=>{
    const root=document.documentElement,parentRoot=window.parent.document.documentElement;
    document.body.classList.add('preview-frame-page');
    root.dataset.theme=parentRoot.dataset.theme||'light';root.dataset.accent=parentRoot.dataset.accent||'neutral';
    setTheme(root.dataset.theme as Theme);
    const observer=new MutationObserver(()=>flushSync(()=>setTheme(root.dataset.theme as Theme)));
    observer.observe(root,{attributes:true,attributeFilter:['data-theme']});
    const escape=(event:KeyboardEvent)=>{if(event.key==='Escape'&&!event.defaultPrevented&&!document.querySelector('[role="dialog"],[role="alertdialog"]'))window.parent.postMessage({type:'atlas-preview-close'},location.origin);};
    window.addEventListener('keydown',escape);
    return()=>{observer.disconnect();window.removeEventListener('keydown',escape);document.body.classList.remove('preview-frame-page');};
  },[]);
  return <MotionConfig reducedMotion="user"><ArcProvider image={LocalImage}><main className={`frame-preview ${item.kind==='block'?'frame-block':''}`}><RenderPreview id={id} group={item.group} theme={theme} onThemeChange={(next,variant)=>window.parent.postMessage({type:'atlas-preview-theme',theme:next,variant},location.origin)}/></main></ArcProvider></MotionConfig>;
}
