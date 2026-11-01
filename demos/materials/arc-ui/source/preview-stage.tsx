import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, animate, motion, useReducedMotion } from 'motion/react';
import { Scan, Smartphone, Maximize2, X } from 'lucide-react';
import { motionTokens } from './upstream/lib/motion-tokens';
import { syncPreviewAppearance } from './appearance';

export type PreviewMode='fit'|'mobile';

export function PreviewTools({mode,onMode,onFullscreen,onPrime}:{mode:PreviewMode;onMode:(mode:PreviewMode)=>void;onFullscreen:()=>void;onPrime:()=>void}){
  return <div className="preview-tools" onPointerEnter={onPrime} onFocus={onPrime}><div className="preview-size-switch" role="radiogroup" aria-label="预览尺寸">{([{id:'fit',label:'适应预览',icon:Scan},{id:'mobile',label:'手机预览',icon:Smartphone}] as const).map((option,index)=><button key={option.id} role="radio" aria-checked={mode===option.id} aria-label={option.label} title={option.label} tabIndex={mode===option.id?0:-1} onClick={()=>onMode(option.id)} onKeyDown={event=>{if(['ArrowLeft','ArrowRight','ArrowUp','ArrowDown'].includes(event.key)){event.preventDefault();onMode(index===0?'mobile':'fit');(event.currentTarget.parentElement!.children[index===0?1:0] as HTMLButtonElement).focus();}}}>{mode===option.id&&<motion.span className="preview-size-highlight" layoutId="preview-size-selection" transition={motionTokens.spring.snappy}/>}<option.icon size={14} strokeWidth={1.8}/></button>)}</div><button className="preview-expand" aria-label="全屏预览" title="全屏预览" aria-haspopup="dialog" onClick={onFullscreen}><Maximize2 size={14} strokeWidth={1.8}/></button></div>;
}

function Frame({src,title,className=''}:{src:string;title:string;className?:string}){
  const [ready,setReady]=useState(false);
  return <iframe src={src} title={title} className={`preview-iframe ${className}`} data-arc-frame="" data-ready={ready||undefined} allow="clipboard-write" onLoad={event=>{syncPreviewAppearance(event.currentTarget);setReady(true);}}/>;
}

function phoneSize(width:number,height:number){
  const scale=Math.max(.3,Math.min(1,(width-20)/390,Math.max(.8,(height-20)/844)));
  return {scale,width:Math.round(390*scale)+20,height:Math.round(844*scale)+20};
}

export function PreviewStage({mode,warm,src,title,fullscreen,onFullscreen,children}:{mode:PreviewMode;warm:boolean;src:string;title:string;fullscreen:boolean;onFullscreen:(open:boolean)=>void;children:ReactNode}){
  const reduced=useReducedMotion();
  const wrap=useRef<HTMLDivElement>(null),shell=useRef<HTMLDivElement>(null),fit=useRef<HTMLDivElement>(null),phone=useRef<HTMLDivElement>(null),bezel=useRef<HTMLDivElement>(null);
  const [previous,setPrevious]=useState(mode),[from,setFrom]=useState<PreviewMode|null>(null),[prepared,setPrepared]=useState(mode==='mobile');
  const [size,setSize]=useState({width:0,height:780});
  if(previous!==mode){setPrevious(mode);setFrom(previous);}
  if((warm||mode==='mobile')&&!prepared)setPrepared(true);
  useLayoutEffect(()=>{
    const element=wrap.current!;
    const measure=()=>{const next={width:Math.floor(element.clientWidth),height:Math.max(360,Math.min(780,innerHeight-200))};setSize(previous=>previous.width===next.width&&previous.height===next.height?previous:next);};
    measure();const observer=new ResizeObserver(measure);observer.observe(element);window.addEventListener('resize',measure);
    return()=>{observer.disconnect();window.removeEventListener('resize',measure);};
  },[]);
  const phoneRect=phoneSize(size.width||390,size.height);
  useLayoutEffect(()=>{
    if(!from)return;
    if(reduced){setFrom(null);return;}
    const element=shell.current!,rim=bezel.current!,rect=element.getBoundingClientRect();
    const toMobile=from==='fit';
    const target=toMobile?phoneRect:{width:size.width,height:Math.max(400,fit.current?.offsetHeight||400)};
    Object.assign(element.style,{width:`${rect.width}px`,height:`${rect.height}px`,minHeight:'0px',borderRadius:toMobile?'20px':'46px'});
    const outgoing=toMobile?fit.current:phone.current,incoming=toMobile?phone.current:fit.current;
    if(incoming)Object.assign(incoming.style,{opacity:'0',filter:`blur(${motionTokens.blur.soft}px)`});
    const controls=[animate(element,{width:target.width,height:target.height,borderRadius:toMobile?'46px':'20px'},motionTokens.spring.smooth),animate(rim,{opacity:toMobile?1:0},{duration:.3,ease:[...motionTokens.ease.standard]})];
    if(outgoing)controls.push(animate(outgoing,{opacity:0,filter:`blur(${motionTokens.blur.soft}px)`},{duration:.16,ease:[...motionTokens.ease.standard]}));
    if(incoming)controls.push(animate(incoming,{opacity:1,filter:'blur(0px)'},{duration:.28,delay:.1,ease:[...motionTokens.ease.standard]}));
    let current=true;controls[0].then(()=>{if(current){if(incoming)Object.assign(incoming.style,{opacity:'',filter:''});setFrom(null);}});
    return()=>{current=false;controls.forEach(control=>control.stop());};
  },[from]);
  const basis=from||mode;
  return <><div ref={wrap} className="preview-stage-wrap"><div ref={shell} className="preview-stage" data-mode={mode} data-preview-morph={from?true:undefined} style={basis==='mobile'?{width:phoneRect.width,height:phoneRect.height,borderRadius:46}:{width:'100%',minHeight:400,borderRadius:20}}><div ref={bezel} className="preview-bezel" style={{opacity:basis==='mobile'?1:0}}/>{(mode==='fit'||from==='fit')&&<div ref={fit} className="preview-fit-layer" data-floating={mode==='fit'&&from?true:undefined} style={mode==='fit'&&from?{width:size.width}:undefined}>{children}</div>}{prepared&&size.width>0&&<div ref={phone} className="preview-phone-screen" data-idle={mode!=='mobile'&&from!=='mobile'||undefined} inert={mode!=='mobile'&&from!=='mobile'}><div className="preview-phone-scaler" style={{width:390,height:844,transform:`scale(${phoneRect.scale})`}}><Frame key={src} src={src} title={`${title} · 手机预览`}/></div></div>}</div></div><Fullscreen open={fullscreen} onClose={()=>onFullscreen(false)} origin={()=>shell.current?.getBoundingClientRect()||null} src={src} mode={mode} title={title}/></>;
}

function Fullscreen({open,onClose,origin,src,mode,title}:{open:boolean;onClose:()=>void;origin:()=>DOMRect|null;src:string;mode:PreviewMode;title:string}){
  return createPortal(<AnimatePresence>{open&&<FullscreenPanel onClose={onClose} origin={origin} src={src} mode={mode} title={title}/>}</AnimatePresence>,document.body);
}

function FullscreenPanel({onClose,origin,src,mode,title}:{onClose:()=>void;origin:()=>DOMRect|null;src:string;mode:PreviewMode;title:string}){
  const reduced=useReducedMotion(),close=useRef<HTMLButtonElement>(null);
  const [opener]=useState(()=>document.activeElement as HTMLElement|null);
  const [start]=useState(()=>{const r=origin();return r?{left:r.left,top:r.top,width:r.width,height:r.height,borderRadius:26}:null;});
  const [viewport,setViewport]=useState({width:innerWidth,height:innerHeight});
  const closeRef=useRef(onClose);closeRef.current=onClose;
  useEffect(()=>{
    close.current?.focus({preventScroll:true});const old=document.documentElement.style.overflow;document.documentElement.style.overflow='hidden';
    const key=(event:KeyboardEvent)=>{if(event.key==='Escape'&&!event.defaultPrevented){event.preventDefault();closeRef.current();}};
    const message=(event:MessageEvent)=>{if(event.origin===location.origin&&event.data?.type==='atlas-preview-close')closeRef.current();};
    const resize=()=>setViewport({width:innerWidth,height:innerHeight});
    window.addEventListener('keydown',key);window.addEventListener('message',message);window.addEventListener('resize',resize);
    return()=>{document.documentElement.style.overflow=old;window.removeEventListener('keydown',key);window.removeEventListener('message',message);window.removeEventListener('resize',resize);opener?.focus({preventScroll:true});};
  },[opener]);
  const end={left:0,top:0,...viewport,borderRadius:0};
  const phone=phoneSize(viewport.width-32,viewport.height-88);
  return <div className="preview-fullscreen-layer" role="dialog" aria-modal="true" aria-label={`${title} · 全屏预览`}><motion.div className="preview-fullscreen-backdrop" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} onClick={onClose}/><motion.div className="preview-fullscreen-panel" initial={reduced?{...end,opacity:0}:start||{...end,opacity:0}} animate={{...end,opacity:1}} exit={reduced?{opacity:0}:start?{...start,opacity:0}:{opacity:0}} transition={reduced?{duration:0}:motionTokens.spring.smooth}><header><span>{title}</span><button ref={close} className="toolbar-icon" aria-label="关闭全屏预览" onClick={onClose}><X size={16}/></button></header><div className="preview-fullscreen-body" data-mode={mode}>{mode==='fit'?<Frame src={src} title={`${title} · 全屏预览`} className="preview-full-frame"/>:<motion.div className="preview-full-phone" initial={false} animate={{width:phone.width,height:phone.height}} transition={motionTokens.spring.smooth}><div className="preview-full-phone-screen"><div className="preview-phone-scaler" style={{width:390,height:844,transform:`scale(${phone.scale})`}}><Frame src={src} title={`${title} · 手机全屏预览`}/></div></div></motion.div>}</div></motion.div></div>;
}
