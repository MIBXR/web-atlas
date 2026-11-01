import { useRef, useState, type CSSProperties } from 'react';
import { createRoot } from 'react-dom/client';
import { AnimatePresence, animate, motion, useReducedMotion } from 'motion/react';
import * as Dialog from '@radix-ui/react-dialog';
import { ArrowRight, ArrowUpRight, Check, ShieldCheck, X } from 'lucide-react';
import { Accordion } from '@/registry/components/accordion/accordion';
import { AnimatedCounter } from '@/registry/components/animated-counter/animated-counter';
import { Button } from '@/registry/components/button/button';
import { CopyButton } from '@/registry/components/copy-button/copy-button';
import SegmentedControl from '@/registry/components/segmented-control/segmented-control';
import { motionTokens } from '@/lib/motion-tokens';

const plans={
  yearly:{description:'Every Pro piece and new releases while your plan is active.',amount:149,period:'per year',note:'Renews each year. Cancel any time.',features:['117 Pro components and 116 Pro blocks','New Pro releases while active','Pro install through the CLI and MCP','Cancel any time from your account'],action:'Choose yearly for $149',href:'https://uiarc.dev/pricing'},
  free:{description:'The open core. No account needed.',amount:0,period:'forever',note:'120 components and 22 blocks, with CLI, MCP, and AI docs.',features:['Every core component, with source','A starter set of complete blocks','Public registry, CLI install, MCP, and AI-readable docs'],action:'Browse free components',href:'https://uiarc.dev/components/button'}
};

function PlanCard(){
  const [value,setValue]=useState('yearly');
  const reduced=useReducedMotion();
  const plan=plans[value as keyof typeof plans];
  const change=reduced?{initial:{opacity:0},animate:{opacity:1},exit:{opacity:0},transition:{duration:0}}:{initial:{opacity:0,y:10,filter:'blur(2px)'},animate:{opacity:1,y:0,filter:'blur(0px)'},exit:{opacity:0,y:-8,filter:'blur(2px)',transition:{duration:.18}},transition:{opacity:{duration:.24,ease:[...motionTokens.ease.enter]},filter:{duration:.24},y:motionTokens.spring.smooth}};
  return <><h3 id="pricing-flex" className="visually-hidden">{value==='yearly'?'Pro yearly':'Free'}</h3><div className="plan-selector"><SegmentedControl label="Pro yearly or free" value={value} onValueChange={setValue} options={[{value:'yearly',label:'Pro yearly'},{value:'free',label:'Free'}]}/></div><div className="plan-body"><AnimatePresence initial={false} mode="popLayout"><motion.div className="plan-view" key={value} {...change}><p className="plan-description">{plan.description}</p><div className="plan-price"><span className="price-value"><span className="price-amount"><AnimatedCounter value={plan.amount} prefix="$"/></span><small>{plan.period}</small></span></div><p className="plan-note">{plan.note}</p><ul className="features">{plan.features.map(text=><li key={text}><Check size={16} strokeWidth={1.75} aria-hidden="true"/><span>{text}</span></li>)}</ul><a className={`plan-action ${value==='yearly'?'solid':''}`} href={plan.href}>{plan.action}<ArrowRight size={16} strokeWidth={1.75} aria-hidden="true"/></a>{value==='yearly'&&<p className="guarantee"><ShieldCheck size={14} strokeWidth={1.75} aria-hidden="true"/>14-day money-back guarantee</p>}</motion.div></AnimatePresence></div></>;
}

const faq=document.querySelector('.faq-list')!;
const questions=[...faq.querySelectorAll('.faq-item')].map(item=>({title:item.querySelector('h3 button')!.textContent!.trim(),content:<p>{item.querySelector('p')!.textContent}</p>}));
createRoot(faq).render(<Accordion items={questions} size="lg"/>);
createRoot(document.getElementById('flex-plan')!).render(<PlanCard/>);
const lifetime=document.querySelector('.lifetime .price-amount')!;
const lifetimeAmount=Number(lifetime.textContent!.replace('$',''));
createRoot(lifetime).render(<AnimatedCounter value={lifetimeAmount} prefix="$"/>);
const lifetimeGuarantee=document.querySelector('.lifetime .guarantee')!;
const guaranteeText=lifetimeGuarantee.textContent;
createRoot(lifetimeGuarantee).render(<><ShieldCheck size={14} strokeWidth={1.75} aria-hidden="true"/>{guaranteeText}</>);

document.querySelectorAll<HTMLButtonElement>('[data-copy]').forEach(button=>{
  const host=document.createElement('span');
  host.className='component-host';
  button.replaceWith(host);
  createRoot(host).render(<CopyButton value={button.dataset.copy!} label="Copy command" variant="plain" iconOnly/>);
});

const template=document.getElementById('mobile-navigation')!;
const menuTitle=template.querySelector('h2')!.textContent;
const menuLinks=[...template.querySelectorAll<HTMLAnchorElement>('nav>a')].map(link=>({label:link.firstChild!.textContent!.trim(),detail:link.querySelector('small')!.textContent,href:link.getAttribute('href')!}));
const menuActions=[...template.querySelectorAll<HTMLAnchorElement>('.menu-action')].map(link=>({href:link.getAttribute('href')!,text:link.textContent!.trim()}));
const githubMark=document.querySelector('.star svg path')!.getAttribute('d')!;
template.remove();

function Navigation(){
  const [open,setOpen]=useState(false);
  const section=useRef<string|null>(null);
  const reduced=useReducedMotion();
  return <Dialog.Root open={open} onOpenChange={setOpen}><Dialog.Trigger asChild><Button variant="ghost" id="menu-trigger" className="icon-button" aria-label={open?'Close navigation':'Open navigation'}><span className="menu-glyph" data-open={open}><svg width="18" height="12" viewBox="0 0 18 12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true"><path d="M.75 2.75h16.5"/><path d="M.75 9.25h16.5"/></svg></span></Button></Dialog.Trigger><Dialog.Portal><Dialog.Overlay className="menu-overlay"/><Dialog.Content className="mobile-menu" aria-describedby={undefined} onCloseAutoFocus={event=>{
    if(!section.current)return;
    const id=section.current;section.current=null;event.preventDefault();
    requestAnimationFrame(()=>{const target=document.getElementById(id)!;target.scrollIntoView({behavior:reduced?'instant':'smooth',block:'start'});target.setAttribute('tabindex','-1');target.focus({preventScroll:true});});
  }}><div className="menu-top"><Dialog.Title>{menuTitle}</Dialog.Title><Dialog.Close asChild><Button variant="ghost" className="icon-button menu-close" aria-label="Close navigation"><X size={20} aria-hidden="true"/></Button></Dialog.Close></div><nav className="menu-links" aria-label="Mobile navigation">{menuLinks.map((link,index)=><a key={link.href} href={link.href} style={{'--item':index} as CSSProperties} onClick={()=>setOpen(false)}><span><strong>{link.label}</strong><small>{link.detail}</small></span><ArrowUpRight size={20} aria-hidden="true"/></a>)}</nav><a className="star menu-stars" href={menuActions[0].href}><svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true"><path d={githubMark}/></svg>Star on GitHub<span className="star-count">1.1k</span></a><div className="menu-bottom"><a className="menu-action solid" href={menuActions[1].href} onClick={()=>setOpen(false)}>{menuActions[1].text}</a><a className="menu-action" href={menuActions[2].href} onClick={event=>{event.preventDefault();section.current='showcase';history.pushState(null,'','#showcase');setOpen(false);}}>{menuActions[2].text}</a></div></Dialog.Content></Dialog.Portal></Dialog.Root>;
}
createRoot(document.getElementById('menu-root')!).render(<Navigation/>);

const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
for(const [index,element] of [document.querySelector<HTMLElement>('.pricing-heading')!,document.querySelector<HTMLElement>('.plans')!].entries()){
  if(reduced)continue;
  const distance=index===0?18:24;
  element.style.opacity='0';element.style.transform=`translateY(${distance}px)`;
  const observer=new IntersectionObserver(entries=>{if(entries.some(entry=>entry.intersectionRatio>=.2)){animate(element,{opacity:1,y:0},{opacity:{duration:.4,ease:[...motionTokens.ease.enter],delay:.06*index},y:{...motionTokens.spring.smooth,visualDuration:.6,delay:.06*index}});observer.disconnect();}},{threshold:.2});
  observer.observe(element);
}
