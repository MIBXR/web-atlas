const svg = (paths, className='') => `<svg class="${className}" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths}</svg>`;
const arrow = svg('<path d="M5 12h14m-7-7 7 7-7 7"/>');
const arrowUp = svg('<path d="M7 17 17 7M7 7h10v10"/>');
const copy = svg('<rect x="8" y="8" width="12" height="12" rx="2"/><path d="M16 8V4H4v12h4"/>');
const check = svg('<path d="m5 12 4 4L19 6"/>');
const close = svg('<path d="m6 6 12 12M6 18 18 6"/>');
const menu = svg('<path d="M4 8h16M4 16h16"/>');
const sun = svg('<circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5m11 11L19 19M5 19l1.5-1.5m11-11L19 5"/>');
const moon = svg('<path d="M20.5 13A9 9 0 0 1 11 3.5 9 9 0 1 0 20.5 13Z"/>');
let wordIndex=0;
document.querySelectorAll('.title-line').forEach(line=>{
  line.setAttribute('aria-hidden','true');
  line.innerHTML=line.textContent.split(' ').map(word=>`<span class="word-clip"><span class="title-word" style="animation-delay:${wordIndex++*.04}s">${word}</span></span>`).join(' ');
});
document.querySelectorAll('[data-arrow]').forEach(e=>e.insertAdjacentHTML('beforeend',arrow));
document.querySelector('.header-cta svg').outerHTML=arrowUp;
document.querySelectorAll('#mobile-navigation nav>a').forEach(link=>link.insertAdjacentHTML('beforeend',arrowUp));
document.querySelector('#mobile-navigation .menu-action').insertAdjacentHTML('afterbegin',document.querySelector('.star svg').outerHTML);
document.querySelector('#dismiss').innerHTML=close;
document.querySelector('#menu-trigger').innerHTML=menu;
document.querySelector('#menu-close').innerHTML=close;
document.querySelectorAll('[data-copy]').forEach(button=>{
  button.innerHTML=copy;
  button.addEventListener('click',async()=>{
    await navigator.clipboard.writeText(button.dataset.copy);
    button.innerHTML=check;
    button.setAttribute('aria-label','Copied');
    setTimeout(()=>{button.innerHTML=copy;button.setAttribute('aria-label','Copy command');},1800);
  });
});
const themeButton=document.querySelector('#theme');
const systemTheme=matchMedia('(prefers-color-scheme: dark)');
function setTheme(theme){
  document.documentElement.dataset.theme=theme;
  themeButton.innerHTML=theme==='dark'?sun:moon;
  themeButton.setAttribute('aria-label',`Switch to ${theme==='dark'?'light':'dark'} theme`);
}
setTheme(localStorage.getItem('uiarc-study-theme')||(systemTheme.matches?'dark':'light'));
themeButton.addEventListener('click',()=>{const theme=document.documentElement.dataset.theme==='dark'?'light':'dark';localStorage.setItem('uiarc-study-theme',theme);setTheme(theme);});
systemTheme.addEventListener('change',event=>{if(!localStorage.getItem('uiarc-study-theme'))setTheme(event.matches?'dark':'light');});
document.querySelector('#dismiss').addEventListener('click',()=>document.querySelector('.announcement').remove());

const navigation=document.querySelector('#mobile-navigation');
const menuTrigger=document.querySelector('#menu-trigger');
function closeMenu(){navigation.close();menuTrigger.setAttribute('aria-expanded','false');menuTrigger.focus();}
menuTrigger.addEventListener('click',()=>{navigation.style.top=`${document.querySelector('.site-header').getBoundingClientRect().height}px`;navigation.showModal();menuTrigger.setAttribute('aria-expanded','true');});
document.querySelector('#menu-close').addEventListener('click',closeMenu);
navigation.addEventListener('click',event=>{if(event.target===navigation)closeMenu();});
navigation.addEventListener('close',()=>menuTrigger.setAttribute('aria-expanded','false'));
navigation.querySelector('a[href="#showcase"]').addEventListener('click',closeMenu);

document.querySelectorAll('.faq-item > h3 > button').forEach(button=>{
  button.addEventListener('click',()=>{
    const open=button.getAttribute('aria-expanded')==='true';
    document.querySelectorAll('.faq-item > h3 > button').forEach(other=>{
      const active=other===button&&!open;
      other.setAttribute('aria-expanded',String(active));
      const panel=document.getElementById(other.getAttribute('aria-controls'));
      panel.inert=!active;
      panel.classList.toggle('open',active);
    });
  });
});

const plans={
  yearly:{description:'Every Pro piece and new releases while your plan is active.',price:'149',period:'per year',note:'Renews each year. Cancel any time.',features:['117 Pro components and 116 Pro blocks','New Pro releases while active','Pro install through the CLI and MCP','Cancel any time from your account'],action:'Choose yearly for $149',href:'https://uiarc.dev/pricing'},
  free:{description:'The open core. No account needed.',price:'0',period:'forever',note:'120 components and 22 blocks, with CLI, MCP, and AI docs.',features:['Every core component, with source','A starter set of complete blocks','Public registry, CLI install, MCP, and AI-readable docs'],action:'Browse free components',href:'https://uiarc.dev/components/button'}
};
function alignPlanSelection(){
  const selected=document.querySelector('[data-plan-choice][aria-pressed="true"]');
  const selection=document.querySelector('.plan-selection');
  selection.style.transform=`translateX(${selected.offsetLeft-3}px)`;
  selection.style.width=`${selected.offsetWidth}px`;
}
window.addEventListener('resize',alignPlanSelection);
function choosePlan(value){
  const plan=plans[value];
  const panel=document.querySelector('#flex-plan');
  panel.dataset.plan=value;
  document.querySelectorAll('[data-plan-choice]').forEach(button=>{
    const active=button.dataset.planChoice===value;
    button.setAttribute('aria-pressed',String(active));
    button.tabIndex=active?0:-1;
  });
  alignPlanSelection();
  panel.querySelector('.plan-body').innerHTML=`<p class="plan-description">${plan.description}</p><div class="plan-price"><span>$${plan.price}</span><small>${plan.period}</small></div><p class="plan-note">${plan.note}</p><ul class="features">${plan.features.map(text=>`<li>${check}<span>${text}</span></li>`).join('')}</ul><a class="plan-action ${value==='yearly'?'solid':''}" href="${plan.href}" data-arrow>${plan.action}${arrow}</a>${value==='yearly'?'<p class="guarantee">14-day money-back guarantee</p>':''}`;
}
document.querySelectorAll('[data-plan-choice]').forEach(button=>{
  button.addEventListener('click',()=>choosePlan(button.dataset.planChoice));
  button.addEventListener('keydown',event=>{
    if(['ArrowLeft','ArrowRight','Home','End'].includes(event.key)){
      event.preventDefault();
      const value=event.key==='Home'?'yearly':event.key==='End'?'free':button.dataset.planChoice==='yearly'?'free':'yearly';
      choosePlan(value);document.querySelector(`[data-plan-choice="${value}"]`).focus();
    }
  });
});
choosePlan('yearly');

const content=await fetch('source/content.json').then(response=>response.json());
const tile=clip=>`<article class="tile"><a href="${clip.href}"><div class="clip-stage"><img src="assets/clips/${clip.id}.webp" alt="${clip.title}: ${clip.description}" width="1600" height="1000" loading="lazy"><video muted loop playsinline preload="none" data-src="assets/clips/${clip.id}.webm" aria-hidden="true" tabindex="-1"></video></div><div class="caption"><div class="name-row"><span>${clip.title}</span><span class="tier ${clip.tier.toLowerCase()}">${clip.tier}</span></div><span class="hint">${clip.description}</span></div></a></article>`;
document.querySelector('#pro-clips').innerHTML=content.clips.slice(0,6).map(tile).join('');
document.querySelector('#free-clips').innerHTML=content.clips.slice(6).map(tile).join('');
const logoRow=content.logos.map(logo=>{const box=logo.viewBox.split(/\s+/).map(Number),factor=Number((logo.factor||'').match(/--logo-factor:\s*([.\d]+)/)?.[1]||1);return `<li><img src="${logo.file}" alt="${logo.name}" style="height:calc(var(--logo-size)*${factor});width:calc(var(--logo-size)*${factor*box[2]/box[3]})"></li>`;}).join('');
document.querySelector('.marquee-track').innerHTML=`<ul aria-label="Used by developers at">${logoRow}</ul><ul aria-hidden="true">${logoRow.replaceAll(/alt="[^"]*"/g,'alt=""')}</ul>`;

const reduced=matchMedia('(prefers-reduced-motion: reduce)');
const videos=[...document.querySelectorAll('video')];
function syncVideo(video){
  if(video.dataset.visible==='true'&&!document.hidden&&!reduced.matches){
    if(!video.src)video.src=video.dataset.src;
    video.play().catch(()=>video.classList.remove('playing'));
  }else{video.pause();video.classList.remove('playing');}
}
const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{entry.target.dataset.visible=String(entry.isIntersecting);syncVideo(entry.target);}),{threshold:.1});
videos.forEach(video=>{video.addEventListener('playing',()=>video.classList.add('playing'));observer.observe(video);});
document.addEventListener('visibilitychange',()=>videos.forEach(syncVideo));
reduced.addEventListener('change',()=>videos.forEach(syncVideo));
const titleObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('revealed');titleObserver.unobserve(entry.target);}}),{threshold:.25});
document.querySelectorAll('[data-reveal]').forEach(title=>titleObserver.observe(title));
