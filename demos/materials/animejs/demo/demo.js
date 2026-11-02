export function mountDirectory(nav, material, requested, activate) {
  const root = new URL('../../../../', import.meta.url);
  nav.innerHTML = `<button type="button" class="aj-toggle" aria-expanded="false"></button>
    <div class="aj-sources"><a href="${material.upstream.url}/tree/${material.upstream.commit}/examples" target="_blank" rel="noopener">仓库样例</a><a href="https://codepen.io/collection/Poerqa" target="_blank" rel="noopener">CodePen</a></div>
    <div class="aj-branches"></div><a class="aj-code" target="_blank" rel="noopener">当前样例源码</a>`;
  const groups = new Map();
  const examples = new Map();
  const toggle = nav.querySelector('.aj-toggle');
  let selected;

  function setOpen(open) {
    nav.classList.toggle('open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.textContent = open ? '收起样例目录' : '样例目录 · ' + selected.title;
  }

  for (const example of material.demos) {
    const url = new URL(example.entrypoint, root);
    const path = url.searchParams.get('demo');
    if (!groups.has(example.group)) {
      const group = document.createElement('details');
      const heading = document.createElement('summary');
      heading.textContent = example.group;
      group.append(heading);
      nav.querySelector('.aj-branches').append(group);
      groups.set(example.group, group);
    }
    const link = document.createElement('a');
    link.href = url.href;
    link.textContent = example.title;
    groups.get(example.group).append(link);
    examples.set(path, {example,link});
    link.addEventListener('click', event => {
      if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      select(path);
    });
  }

  function select(path) {
    const {example,link} = examples.get(path);
    selected = example;
    nav.querySelector('[aria-current]')?.removeAttribute('aria-current');
    link.setAttribute('aria-current','page');
    link.parentElement.open = true;
    nav.querySelector('.aj-code').href = material.upstream.url + '/tree/' + material.upstream.commit + '/examples/' + path;
    const wasOpen = nav.classList.contains('open');
    setOpen(false);
    activate(example,path);
    if (wasOpen) toggle.focus({preventScroll:true});
  }
  toggle.onclick = () => setOpen(!nav.classList.contains('open'));
  select(requested || 'animejs-v4-logo-animation');
}
