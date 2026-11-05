(() => {
  'use strict';
  const icon = name => window.AtlasIcons.svg(name);
  let disposeMenu = () => {};
  function label(element, name, text = element.textContent.trim()) {
    element.innerHTML = icon(name) + '<span>' + text + '</span>';
  }
  function paintFavorite(button, selected) {
    if (!button.hasAttribute('data-detail-favorite')) return;
    label(button, selected ? 'starFill' : 'star', selected ? '已收藏' : '收藏');
  }
  function mount(root, library) {
    disposeMenu();
    document.body.classList.add('atlas-detail');
    const actions = root.querySelector('.detail-top');
    const back = actions.querySelector('.back');
    back.classList.add('copy-button');
    label(back, 'back', '返回' + library);
    back.setAttribute('aria-label', '返回' + library);
    const tools = actions.querySelector('div');
    tools.classList.add('detail-actions');
    const favorite = tools.querySelector('.favorite');
    favorite.classList.add('copy-button');
    favorite.setAttribute('data-detail-favorite', '');
    paintFavorite(favorite, favorite.getAttribute('aria-pressed') === 'true');

    const stage = root.querySelector('.demo-panel');
    const toolbar = stage.querySelector('.demo-toolbar');
    toolbar.querySelector(':scope>span')?.remove();
    const views = document.createElement('div');
    views.className = 'demo-view-controls';
    views.append(...toolbar.querySelectorAll('[data-viewport]'));
    for (const button of views.children) {
      const text=button.textContent.trim();
      button.setAttribute('aria-label',text);
      button.innerHTML='<span class="demo-view-full">'+text+'</span><span class="demo-view-short">'+({desktop:'适应',wide:'桌面',mobile:'手机'})[button.dataset.viewport]+'</span>';
    }
    const playback = document.createElement('div');
    playback.className = 'demo-play-controls';
    const replay = toolbar.querySelector('#reload-demo,#pattern-demo-replay,#material-demo-replay');
    const open = tools.querySelector('a.primary-button') || toolbar.querySelector('#pattern-demo-open,#material-demo-open');
    if (replay) {replay.disabled=replay.hidden;replay.hidden=false;replay.setAttribute('aria-label','重播');replay.title='重播';label(replay, 'replay', '重播');playback.append(replay);}
    if (open) {open.classList.remove('primary-button');open.classList.add('copy-button');open.setAttribute('aria-label','独立打开 Demo');open.title='独立打开 Demo';label(open, 'external', '独立打开 Demo');playback.append(open);}
    if (views.childElementCount || playback.childElementCount) {
      toolbar.replaceChildren(views, playback);
      toolbar.parentElement.before(toolbar);
    }
    else toolbar.remove();

    const title = root.querySelector('.detail-title');
    title.classList.add('detail-reading-head');
    const descriptions = [...root.querySelectorAll('.notes')].filter(element => !element.classList.contains('material-skill-content'));
    const notes = document.createElement('aside');
    notes.className = 'notes detail-notes';
    notes.append(title);
    for (const description of descriptions) {
      if (description.firstElementChild.tagName === 'SECTION') notes.append(...description.childNodes);
      else {const section=document.createElement('section');section.append(...description.childNodes);notes.append(section);}
      description.remove();
    }
    root.querySelector('.detail-layout').replaceChildren(stage, notes);
    const headings = [...notes.querySelectorAll('h1,h2')];
    const toc = document.createElement('nav');
    toc.className = 'detail-toc';
    toc.setAttribute('aria-label', '详情目录');
    const markers = headings.map(heading => {
      const button = document.createElement('button');
      button.type = 'button';
      button.setAttribute('aria-label', heading.textContent.trim());
      button.innerHTML = '<svg viewBox="0 0 24 4" aria-hidden="true"><path d="M2 2h20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>';
      const caption = document.createElement('span');
      caption.className = 'detail-toc-label';
      caption.textContent = heading.textContent.trim();
      caption.setAttribute('aria-hidden', 'true');
      button.append(caption);
      button.addEventListener('click', () => window.scrollTo({
        top: Math.max(0, scrollY + heading.getBoundingClientRect().top - header.getBoundingClientRect().height - actions.getBoundingClientRect().height - 24),
        behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth',
      }));
      toc.append(button);
      return button;
    });
    document.body.append(toc);
    let tocFrame = 0;
    const syncToc = () => {
      tocFrame = 0;
      const top = header.getBoundingClientRect().height + actions.getBoundingClientRect().height + 24;
      toc.style.top = `${top}px`;
      let current = 0;
      headings.forEach((heading, index) => {if (heading.getBoundingClientRect().top <= top + 8) current = index;});
      if (scrollY + innerHeight >= document.documentElement.scrollHeight - 2) current = headings.length - 1;
      markers.forEach((button, index) => {
        if (index === current) button.setAttribute('aria-current', 'location');
        else button.removeAttribute('aria-current');
      });
    };
    const scheduleToc = () => {if (!tocFrame) tocFrame = requestAnimationFrame(syncToc);};
    window.addEventListener('scroll', scheduleToc, {passive:true});
    const copy = root.querySelector('#copy-prompt,#copy-pattern-prompt,#copy-material-prompt');
    copy.classList.remove('copy-button');copy.classList.add('primary-button');
    label(copy, 'copy', '复制 Prompt');tools.append(copy);
    for (const link of tools.querySelectorAll('a')) {
      const text=link.textContent.trim();
      label(link,link.hasAttribute('download')?'download':text.startsWith('Agent')?'arrow':'external');
    }
    const secondary=[...tools.querySelectorAll('a')];
    const more=document.createElement('div');more.className='detail-more';
    const trigger=document.createElement('button');trigger.type='button';trigger.className='copy-button detail-more-toggle';
    trigger.setAttribute('aria-label','更多操作');trigger.setAttribute('aria-controls','detail-more-menu');
    label(trigger,'more','更多');
    const menu=document.createElement('nav');menu.id='detail-more-menu';menu.className='detail-more-menu';menu.setAttribute('aria-label','更多操作');
    more.append(trigger,menu);copy.before(more);
    const compact=matchMedia('(max-width:800px)');
    const setOpen=open=>{menu.hidden=!open;trigger.setAttribute('aria-expanded',String(open));};
    const sync=()=>{
      setOpen(false);more.hidden=!compact.matches;
      if(compact.matches)menu.append(...secondary);
      else for(const link of secondary)tools.insertBefore(link,more);
    };
    trigger.addEventListener('click',()=>setOpen(menu.hidden));
    const outside=event=>{if(!more.contains(event.target))setOpen(false);};
    const escape=event=>{if(event.key==='Escape'&&!menu.hidden){setOpen(false);trigger.focus();event.preventDefault();}};
    menu.addEventListener('click',event=>{if(event.target.closest('a'))setOpen(false);});
    document.addEventListener('click',outside);document.addEventListener('keydown',escape);compact.addEventListener('change',sync);
    const header=document.querySelector('.atlas-site-header');
    const syncColumns=()=>{
      const actionsHeight=actions.getBoundingClientRect().height;
      const stageHeight=stage.getBoundingClientRect().height;
      const notesHeight=notes.getBoundingClientRect().height;
      const availableHeight=window.innerHeight-header.getBoundingClientRect().height-actionsHeight-24;
      root.style.setProperty('--atlas-detail-sticky-top',`calc(var(--atlas-visible-header-height) + ${actionsHeight}px + 24px)`);
      stage.classList.toggle('detail-sticky',window.innerWidth>=1160&&stageHeight<=availableHeight);
      notes.classList.toggle('detail-sticky',window.innerWidth>=1160&&stageHeight>notesHeight&&notesHeight<=availableHeight);
      scheduleToc();
    };
    const columnsObserver=new ResizeObserver(syncColumns);
    for(const element of [header,actions,stage,notes])columnsObserver.observe(element);
    window.addEventListener('resize',syncColumns);
    disposeMenu=()=>{document.removeEventListener('click',outside);document.removeEventListener('keydown',escape);compact.removeEventListener('change',sync);columnsObserver.disconnect();window.removeEventListener('resize',syncColumns);window.removeEventListener('scroll',scheduleToc);cancelAnimationFrame(tocFrame);toc.remove();};
    sync();
    window.AtlasIcons.paint(root);
    syncColumns();
  }
  window.AtlasDetail = {mount, paintFavorite, clear: () => {disposeMenu();document.body.classList.remove('atlas-detail');}};
})();
