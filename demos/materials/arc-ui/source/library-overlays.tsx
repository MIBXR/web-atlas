import { useEffect, useRef, type ReactNode, type RefObject } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, animate, motion, useDragControls, useMotionValue, useReducedMotion } from 'motion/react';
import { CodeXml, PanelsTopLeft } from 'lucide-react';
import { motionTokens } from './upstream/lib/motion-tokens';
import { Dialog, DialogContent } from './upstream/registry/components/dialog/dialog';
import { CommandPalette } from './upstream/registry/components/command-palette/command-palette';
import data from '../demo/catalog.json';

export function CatalogSheet({open,onClose,onDismiss,children}:{open:boolean;onClose:()=>void;onDismiss:()=>void;children:ReactNode}){
  const sheet=useRef<HTMLDivElement>(null);
  const reduced=useReducedMotion();
  const drag=useDragControls(),y=useMotionValue(0);
  useEffect(()=>{
    if(!open)return;
    const panel=sheet.current!;
    if(!panel.contains(document.activeElement))panel.focus({preventScroll:true});
    const overflow=document.body.style.overflow;
    document.body.style.overflow='hidden';
    const key=(event:KeyboardEvent)=>{
      if(event.defaultPrevented)return;
      if(event.key==='Escape'){event.preventDefault();onClose();return;}
      if(event.key!=='Tab')return;
      const items=[...panel.querySelectorAll<HTMLElement>('a[href],button:not([disabled]),input:not([disabled]),[tabindex="0"]')].filter(e=>e.getClientRects().length&&!e.closest('[inert],[aria-hidden="true"]'));
      const first=items[0],last=items.at(-1);
      if(!first||!last)return;
      if(event.shiftKey&&(document.activeElement===first||document.activeElement===panel)){event.preventDefault();last.focus();}
      else if(!event.shiftKey&&(document.activeElement===last||!panel.contains(document.activeElement))){event.preventDefault();first.focus();}
    };
    const resize=()=>{if(innerWidth>760)onDismiss();};
    document.addEventListener('keydown',key);window.addEventListener('resize',resize);
    return()=>{document.body.style.overflow=overflow;document.removeEventListener('keydown',key);window.removeEventListener('resize',resize);};
  },[open,onClose,onDismiss]);
  return createPortal(<AnimatePresence>{open&&<motion.div className="catalog-backdrop" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} transition={{duration:reduced?0:.26,ease:[...motionTokens.ease.standard]}} onClick={onClose} key="backdrop"/>}{open&&<motion.div ref={sheet} id="mobile-library-navigation" className="catalog-sheet" role="dialog" aria-modal="true" aria-label="组件目录" tabIndex={-1} initial={reduced?{opacity:0}:{y:'100%'}} animate={{y:0,opacity:1}} exit={reduced?{opacity:0}:{y:'100%'}} transition={reduced?{duration:0}:motionTokens.spring.smooth} drag="y" dragListener={false} dragControls={drag} dragConstraints={{top:0}} dragElastic={{top:0}} dragMomentum={false} style={{y}} onDragEnd={(_event,info)=>{if(info.offset.y>110||info.velocity.y>650)onClose();else animate(y,0,reduced?{duration:0}:motionTokens.spring.snappy);}} key="sheet"><div className="catalog-grabber" aria-hidden="true" onPointerDown={event=>drag.start(event)}><span/></div>{children}</motion.div>}</AnimatePresence>,document.body);
}

const searchItems=data.items.map(item=>({id:item.id,label:`${item.titleZh} · ${item.title}`,description:`${item.category.titleZh} · ${item.category.title}`,group:item.kind==='block'?'区块 Blocks':'组件 Components',keywords:[item.id,item.title,item.titleZh,item.category.title,item.category.titleZh],icon:item.kind==='block'?<PanelsTopLeft size={16}/>:<CodeXml size={16}/>}));

export function GlobalSearch({open,onOpenChange,onChoose,returnFocusRef}:{open:boolean;onOpenChange:(open:boolean)=>void;onChoose:(id:string)=>void;returnFocusRef:RefObject<HTMLButtonElement|null>}){
  return <Dialog open={open} onOpenChange={onOpenChange}><DialogContent className="library-search-dialog" title="搜索组件" description="搜索免费组件与区块的中英文名称。" onCloseAutoFocus={event=>{event.preventDefault();returnFocusRef.current?.focus({preventScroll:true});}}><CommandPalette autoFocus label="搜索免费目录" placeholder="搜索中文或英文名称" items={searchItems} onSelect={item=>onChoose(item.id)} onClose={()=>onOpenChange(false)}/></DialogContent></Dialog>;
}
