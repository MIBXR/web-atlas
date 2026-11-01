const svg = (paths, className='') => `<svg class="${className}" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths}</svg>`;
const arrow = svg('<path d="M5 12h14m-7-7 7 7-7 7"/>');
const arrowUp = svg('<path d="M7 17 17 7M7 7h10v10"/>');
const sun = svg('<circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5m11 11L19 19M5 19l1.5-1.5m11-11L19 5"/>');
const moon = svg('<path d="M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401"/>');
let wordIndex=0;
document.querySelectorAll('.title-line').forEach(line=>{
  line.setAttribute('aria-hidden','true');
  line.innerHTML=line.textContent.split(' ').map(word=>`<span class="word-clip"><span class="title-word" style="animation-delay:${wordIndex++*.04}s">${word}</span></span>`).join(' ');
});
document.querySelectorAll('[data-arrow]').forEach(e=>e.insertAdjacentHTML('beforeend',arrow));
document.querySelector('.header-cta svg').outerHTML=arrowUp;
const themeButton=document.querySelector('#theme');
const systemTheme=matchMedia('(prefers-color-scheme: dark)');
function setTheme(theme){
  document.documentElement.dataset.theme=theme;
  themeButton.innerHTML=theme==='dark'?sun:moon;
  themeButton.setAttribute('aria-label',`Switch to ${theme==='dark'?'light':'dark'} theme`);
}
setTheme(localStorage.getItem('uiarc-study-theme')||(systemTheme.matches?'dark':'light'));
let themeTransition;
themeButton.addEventListener('click',async()=>{
  const theme=document.documentElement.dataset.theme==='dark'?'light':'dark';
  localStorage.setItem('uiarc-study-theme',theme);
  themeTransition?.skipTransition();
  if(matchMedia('(prefers-reduced-motion: reduce)').matches){setTheme(theme);return;}
  document.documentElement.dataset.themeMotion='split';
  const transition=document.startViewTransition(()=>setTheme(theme));
  themeTransition=transition;
  await transition.finished;
  if(themeTransition===transition){
    document.documentElement.removeAttribute('data-theme-motion');
    themeTransition=null;
  }
});
systemTheme.addEventListener('change',event=>{if(!localStorage.getItem('uiarc-study-theme'))setTheme(event.matches?'dark':'light');});

const content=await fetch('source/content.json').then(response=>response.json());
const tile=clip=>`<article class="tile"><a href="${clip.href}"><div class="clip-stage"><img src="assets/clips/${clip.id}.webp" alt="${clip.title}: ${clip.description}" width="1600" height="1000" loading="lazy"><video muted loop playsinline preload="none" data-src="assets/clips/${clip.id}.webm" aria-hidden="true" tabindex="-1"></video></div><div class="caption"><div class="name-row"><span>${clip.title}</span><span class="tier ${clip.tier.toLowerCase()}">${clip.tier}</span></div><span class="hint">${clip.description}</span></div></a></article>`;
document.querySelector('#pro-clips').innerHTML=content.clips.slice(0,6).map(tile).join('');
document.querySelector('#free-clips').innerHTML=content.clips.slice(6).map(tile).join('');
const logoRow=content.logos.map(logo=>`<li><span class="client-logo" role="img" aria-label="${logo.name}" style="--logo-image:url('${logo.file}');height:calc(var(--logo-size)*${logo.factor});width:calc(var(--logo-size)*${logo.factor*logo.ratio})"></span></li>`).join('');
document.querySelector('.marquee-track').innerHTML=`<ul aria-label="Used by developers at">${logoRow}</ul><ul aria-hidden="true">${logoRow}</ul>`;

const reduced=matchMedia('(prefers-reduced-motion: reduce)');
const videos=[...document.querySelectorAll('video')];
const playing=[];
const manualOnly=reduced.matches||navigator.connection?.saveData===true;
function removePlaying(video){
  const index=playing.indexOf(video);
  if(index>=0)playing.splice(index,1);
}
function pauseVideo(video){video.pause();removePlaying(video);}
function loadVideo(video){
  if(!video.src){video.preload='metadata';video.src=video.dataset.src;}
}
function syncVideo(video){
  if(video.dataset.visible==='true'&&!document.hidden&&(!manualOnly||video.dataset.manual==='true')){
    loadVideo(video);
    const index=playing.indexOf(video);
    if(index>=0)playing.splice(index,1);
    playing.push(video);
    while(playing.length>8)playing.shift().pause();
    video.play().catch(()=>removePlaying(video));
  }else pauseVideo(video);
}
const warm=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){loadVideo(entry.target);warm.unobserve(entry.target);}}),{rootMargin:'100% 0px'});
const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{entry.target.dataset.visible=String(entry.intersectionRatio>=.35);syncVideo(entry.target);}),{threshold:[0,.35,.6]});
videos.forEach(video=>{
  video.disablePictureInPicture=true;
  video.addEventListener('playing',()=>video.classList.add('playing'));
  if(manualOnly){
    const button=document.createElement('button');button.type='button';button.className='preview-play';
    button.setAttribute('aria-label',`Play ${video.closest('.tile').querySelector('.name-row>span').textContent} preview`);
    button.innerHTML='<svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true"><path d="M3 1.8v8.4c0 .5.5.8.9.5l6.4-4.2a.6.6 0 0 0 0-1L3.9 1.3c-.4-.3-.9 0-.9.5Z" fill="currentColor"/></svg>';
    button.addEventListener('click',event=>{event.preventDefault();event.stopPropagation();video.dataset.manual='true';button.remove();loadVideo(video);syncVideo(video);});
    video.parentElement.append(button);
  }else warm.observe(video);
  observer.observe(video);
});
document.addEventListener('visibilitychange',()=>videos.forEach(syncVideo));
const titles=[...document.querySelectorAll('[data-reveal]')];
const late=performance.now()>2400;
const titleObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.intersectionRatio>=.45){entry.target.classList.add('revealed');titleObserver.unobserve(entry.target);}}),{threshold:.45});
titles.forEach(title=>{
  const lines=title.innerHTML.split('<br>');
  title.setAttribute('aria-label',lines.join(' '));
  title.innerHTML=lines.map((line,index)=>`<span class="heading-clip" aria-hidden="true"><span class="heading-part" style="--line:${index}">${line}</span></span>`).join('');
  if(reduced.matches||late||title.getBoundingClientRect().top<0)title.classList.add('revealed');
  else titleObserver.observe(title);
});
function revealPassedTitles(){
  titles.forEach(title=>{if(title.getBoundingClientRect().top<0){title.classList.add('revealed');titleObserver.unobserve(title);}});
  if(titles.every(title=>title.classList.contains('revealed')))window.removeEventListener('scroll',revealPassedTitles);
}
window.addEventListener('scroll',revealPassedTitles,{passive:true});
