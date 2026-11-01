import { useEffect, useRef, useState, type ReactNode, type RefObject } from 'react';
import { motion } from 'motion/react';
import { Search, X, ChevronDown, Component, PanelsTopLeft } from 'lucide-react';
import { motionTokens } from './upstream/lib/motion-tokens';
import data from '../demo/catalog.json';

function Branch({id,prefix,title,titleZh,count,open,onToggle,section=false,children}:{id:string;prefix:string;title:string;titleZh:string;count:number;open:boolean;onToggle:()=>void;section?:boolean;children:ReactNode}){
  return <section className={section?'catalog-section':'catalog-group'}>
    <button className={section?'catalog-section-heading':'catalog-group-heading'} aria-expanded={open} aria-controls={`${prefix}-tree-${id}`} onClick={onToggle}>
      {section?(id==='component'?<Component size={15} strokeWidth={1.75}/>:<PanelsTopLeft size={15} strokeWidth={1.75}/>):<ChevronDown size={12} className={open?'is-open':''}/>}
      <span className="branch-label"><span>{titleZh}</span><span className="branch-english" lang="en">{title}</span></span><span className="branch-count">{count}</span>{section&&<ChevronDown size={14} className={open?'is-open':''}/>}
    </button>
    <motion.div id={`${prefix}-tree-${id}`} className="catalog-branch-body" aria-hidden={!open} inert={!open} initial={false} animate={{height:open?'auto':0,opacity:open?1:0}} transition={{height:motionTokens.spring.smooth,opacity:{duration:motionTokens.duration.fast}}}>{children}</motion.div>
  </section>;
}

export function CatalogPanel({selected,query,onQuery,collapsed,onToggle,onChoose,inputRef,mobile=false,onClose}:{selected:string;query:string;onQuery:(query:string)=>void;collapsed:Record<string,boolean>;onToggle:(id:string)=>void;onChoose:(id:string)=>void;inputRef?:RefObject<HTMLInputElement|null>;mobile?:boolean;onClose?:()=>void}){
  const [hovered,setHovered]=useState<string|null>(null);
  const nav=useRef<HTMLElement>(null);
  const search=query.trim().toLowerCase();
  const filtered=data.items.filter(item=>`${item.titleZh} ${item.title} ${item.id} ${item.category.titleZh} ${item.category.title}`.toLowerCase().includes(search));
  const prefix=mobile?'mobile':'desktop';
  const open=(id:string)=>!!search||!collapsed[id];
  const focusable=()=>[...nav.current!.querySelectorAll<HTMLElement>('a[href],button')].filter(e=>e.getClientRects().length&&!e.closest('[inert],[aria-hidden="true"]'));
  useEffect(()=>{const frame=requestAnimationFrame(()=>{const row=nav.current?.querySelector<HTMLElement>(`[data-demo-id="${selected}"]`);if(row?.getClientRects().length&&!row.closest('[inert]'))row.scrollIntoView({block:'nearest'});});return()=>cancelAnimationFrame(frame);},[selected,mobile]);
  return <div className={`catalog-panel ${mobile?'catalog-panel-mobile':''}`}>
    <div className="catalog-search-row"><label className="catalog-search"><Search size={mobile?16:14} strokeWidth={1.8}/><input ref={inputRef} aria-label="搜索免费组件" value={query} onChange={event=>onQuery(event.target.value)} placeholder="搜索中文或英文名称" autoComplete="off" spellCheck={false} onKeyDown={event=>{if(event.key==='ArrowDown'||event.key==='ArrowUp'){event.preventDefault();const rows=focusable().filter(e=>e.tagName==='A');(event.key==='ArrowDown'?rows[0]:rows.at(-1))?.focus();}else if(event.key==='Enter'&&filtered.length){event.preventDefault();onChoose(filtered[0].id);}}}/>{!mobile&&<kbd>Ctrl K</kbd>}</label>{mobile&&<button className="toolbar-icon" onClick={onClose} aria-label="关闭组件目录"><X size={18}/></button>}</div>
    <nav ref={nav} className="catalog-list" aria-label="免费组件目录" onPointerLeave={()=>setHovered(null)} onBlur={event=>{if(!event.currentTarget.contains(event.relatedTarget))setHovered(null);}} onKeyDown={event=>{if(!['ArrowUp','ArrowDown','Home','End'].includes(event.key))return;const rows=focusable(),index=rows.indexOf(document.activeElement as HTMLElement);if(index<0)return;event.preventDefault();rows[event.key==='Home'?0:event.key==='End'?rows.length-1:(index+(event.key==='ArrowDown'?1:-1)+rows.length)%rows.length]?.focus();}}>
      {data.sections.map(section=>{const sectionItems=filtered.filter(item=>item.kind===section.id);return sectionItems.length?<Branch key={section.id} id={section.id} prefix={prefix} title={section.title} titleZh={section.titleZh} count={sectionItems.length} section open={open(section.id)} onToggle={()=>onToggle(section.id)}>
        {section.groups.map(group=>{const items=filtered.filter(item=>group.items.includes(item.id));return items.length?<Branch key={group.id} id={group.id} prefix={prefix} title={group.title} titleZh={group.titleZh} count={items.length} open={open(group.id)} onToggle={()=>onToggle(group.id)}><ul>{items.map(item=><li key={item.id}><a href={`?demo=${item.id}`} data-demo-id={item.id} aria-current={selected===item.id?'page':undefined} title={`${item.titleZh} · ${item.title}`} onPointerEnter={()=>setHovered(item.id)} onFocus={()=>setHovered(item.id)} onClick={event=>{if(event.metaKey||event.ctrlKey||event.shiftKey||event.button!==0)return;event.preventDefault();onChoose(item.id);}}>{(hovered||selected)===item.id&&<motion.span className="catalog-row-highlight" layoutId={`catalog-row-${prefix}`} transition={motionTokens.spring.morph}/>}<span className="catalog-label"><span className="catalog-chinese">{item.titleZh}</span><span className="catalog-english" lang="en">{item.title}</span></span></a></li>)}</ul></Branch>:null;})}
      </Branch>:null;})}
      {!filtered.length&&<p className="empty-search">没有匹配的组件。</p>}
    </nav>
    <p className="catalog-count">{filtered.length} 个免费样例</p>
  </div>;
}
