import { createGround } from './ground.js';
import { mountFilm } from './film.js';
import { mountShowcase } from './showcase.js';

function mountNavigation() {
  const button = document.querySelector('[aria-controls="hf-mobile-nav"]');
  const links = [...document.querySelectorAll('.sr-bar-links a')].map((link) => ({
    href: link.href,
    label: link.textContent,
  }));
  const lines = button.querySelectorAll('span > span');
  let sheet = null;
  const transform =
    'absolute left-0 block h-2 w-18 bg-[var(--sr-ink)] transition-transform duration-200 ease-out motion-reduce:transition-none ';
  function close(focus = true) {
    sheet?.remove();
    sheet = null;
    button.setAttribute('aria-expanded', 'false');
    button.setAttribute('aria-label', 'Open navigation');
    lines[0].className = transform + 'top-0';
    lines[1].className =
      'absolute top-6 left-0 block h-2 w-18 bg-[var(--sr-ink)] transition-opacity duration-200 ease-out motion-reduce:transition-none opacity-100';
    lines[2].className = transform + 'top-12';
    document.removeEventListener('keydown', keydown);
    document.removeEventListener('pointerdown', outside);
    if (focus) button.focus();
  }
  function keydown(event) {
    if (event.key === 'Escape') close();
  }
  function outside(event) {
    if (!sheet.contains(event.target) && !button.contains(event.target)) close(false);
  }
  button.addEventListener('click', () => {
    if (sheet) {
      close(false);
      return;
    }
    button.setAttribute('aria-expanded', 'true');
    button.setAttribute('aria-label', 'Close navigation');
    lines[0].className = transform + 'top-6 rotate-45';
    lines[1].className =
      'absolute top-6 left-0 block h-2 w-18 bg-[var(--sr-ink)] transition-opacity duration-200 ease-out motion-reduce:transition-none opacity-0';
    lines[2].className = transform + 'top-6 -rotate-45';
    sheet = document.createElement('div');
    sheet.id = 'hf-mobile-nav';
    sheet.className = 'sr-sheet min-[900px]:hidden';
    for (const link of links) {
      const anchor = document.createElement('a');
      anchor.href = link.href;
      anchor.textContent = link.label;
      anchor.addEventListener('click', () => close(false));
      sheet.append(anchor);
    }
    button.closest('nav').append(sheet);
    document.addEventListener('keydown', keydown);
    document.addEventListener('pointerdown', outside);
  });
}

function mountDownloads() {
  const desktop = document.querySelector('.hf-desktop-only');
  const template = desktop.innerHTML;
  const primaryTemplate = desktop.querySelector('.sr-pill');
  const appleIcon = primaryTemplate.querySelectorAll('.sr-labels > span')[1].querySelector('svg').outerHTML;
  const windows = desktop.querySelector('.sr-alt').outerHTML;
  const userAgent = navigator.userAgent || navigator.vendor || window.opera || '';
  const system = /\bAndroid\b/.test(userAgent)
    ? null
    : /\bLinux\b/.test(userAgent)
      ? 'linux'
      : /\bMacintosh\b/.test(userAgent)
        ? 'mac'
        : null;
  const download = (os) => `https://hyperframes.studio/studio/download?${os ? `os=${os}&` : ''}src=home-hero`;
  function macLink(architecture, label) {
    const anchor = document.createElement('a');
    anchor.href = download(architecture ? 'mac-' + architecture : 'mac');
    anchor.textContent = label;
    return anchor;
  }
  function render(architecture) {
    if (system === 'mac' && architecture === null) {
      desktop.innerHTML = `<a href="${download('mac-arm64')}" class="sr-pill sr-lg">${appleIcon}Apple Silicon</a><a href="${download('mac-x64')}" class="sr-alt">Intel</a>${windows}<p class="sr-mac-note"></p>`;
      desktop
        .querySelector('.sr-mac-note')
        .append(
          'Not sure? Apple menu > About This Mac: Chip means Apple Silicon, Processor means Intel. Or get the',
          ' ',
          macLink(null, 'universal installer'),
          ', which runs on either.',
        );
      return;
    }
    desktop.innerHTML = template;
    const primary = desktop.querySelector('.sr-pill');
    const selected = system === 'mac' ? 1 : system === 'linux' ? 2 : 0;
    const labels = ['Download HyperFrames', 'Download for macOS', 'Download for Linux'];
    primary.setAttribute('aria-label', labels[selected]);
    primary.href = system === 'mac' && architecture ? download('mac-' + architecture) : download();
    primary.querySelectorAll('.sr-labels > span').forEach((span, index) => {
      if (index === selected) span.removeAttribute('class');
      else span.className = 'invisible';
    });
    if (system === 'mac')
      desktop
        .querySelector('.sr-mac-note')
        .replaceChildren(
          'Other Mac:',
          ' ',
          macLink('arm64', 'Apple Silicon'),
          ' ',
          '·',
          ' ',
          macLink('x64', 'Intel'),
        );
  }
  const entropy = navigator.userAgentData?.getHighEntropyValues;
  render(typeof entropy === 'function' ? undefined : null);
  if (typeof entropy === 'function')
    navigator.userAgentData.getHighEntropyValues(['architecture']).then(
      (result) =>
        render(result.architecture === 'arm' ? 'arm64' : result.architecture === 'x86' ? 'x64' : null),
      () => render(null),
    );
  const phone = document.querySelector('.hf-phone-only');
  const button = phone.querySelector('button');
  const icon = button.querySelector('svg').outerHTML;
  const link = 'https://hyperframes.studio/studio/download?src=home-phone-share';
  button.addEventListener('click', async () => {
    if (
      navigator.share &&
      (await navigator
        .share({ title: 'HyperFrames Studio', text: 'Download HyperFrames Studio', url: link })
        .then(
          () => true,
          (error) => error?.name === 'AbortError',
        ))
    )
      return;
    const copied = await (navigator.clipboard?.writeText(link).then(
      () => true,
      () => false,
    ) ?? false);
    button.innerHTML = icon + (copied ? 'Link copied' : 'Send to my computer');
    let shown = phone.querySelector('[data-share-link]');
    if (copied) shown?.remove();
    else {
      if (!shown) {
        shown = document.createElement('p');
        shown.className = 'sr-mac-note';
        shown.dataset.shareLink = '';
        button.after(shown);
      }
      shown.replaceChildren('Open this link on your computer: ', link);
    }
  });
}

function mountInstallCommand() {
  const button = document.querySelector('.sr-cmd');
  const command = button.querySelector('code').textContent;
  const icon = button.querySelector('.sr-ic');
  const originalIcon = icon.innerHTML;
  const status = button.querySelector('[role="status"]');
  let resetTimer, timeout;
  button.addEventListener('click', async () => {
    let copied = false;
    try {
      copied = await Promise.race([
        navigator.clipboard.writeText(command).then(
          () => true,
          () => false,
        ),
        new Promise((resolve) => {
          timeout = setTimeout(() => resolve(false), 1000);
        }),
      ]);
    } catch {
      copied = false;
    } finally {
      clearTimeout(timeout);
    }
    if (!copied) {
      const textarea = document.createElement('textarea');
      textarea.value = command;
      document.body.append(textarea);
      textarea.select();
      try {
        copied = document.execCommand('copy');
      } catch {
        copied = false;
      }
      textarea.remove();
    }
    if (!copied) return;
    button.setAttribute('aria-label', 'Copied');
    icon.innerHTML =
      '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3.5 8.5l3 3 6-7"></path></svg>';
    status.textContent = 'Command copied to clipboard';
    clearTimeout(resetTimer);
    resetTimer = setTimeout(() => {
      button.setAttribute('aria-label', 'Copy install command: ' + command);
      icon.innerHTML = originalIcon;
      status.textContent = '';
    }, 1600);
  });
}

await document.fonts.ready;
const stopGround = createGround(document.querySelector('.sr-ground-canvas'));
mountNavigation();
mountDownloads();
mountInstallCommand();
const stopShowcase = mountShowcase();
const stopFilm = mountFilm();
const announcer = document.createElement('next-route-announcer');
announcer.style.position = 'absolute';
announcer.attachShadow({ mode: 'open' }).innerHTML =
  '<div aria-live="assertive" id="__next-route-announcer__" role="alert" style="position: absolute; border: 0px; height: 1px; margin: -1px; padding: 0px; width: 1px; clip: rect(0px, 0px, 0px, 0px); overflow: hidden; white-space: nowrap; overflow-wrap: normal;"></div>';
document.body.append(announcer);
function sceneReady() {
  const skeleton = document.querySelector('.hf-hero-skeleton');
  skeleton.classList.replace('opacity-100', 'opacity-0');
  document.documentElement.dataset.caseLoading = 'ready';
}
let stopRibbon;
import('./ribbon.js')
  .then(({ createRibbonField }) => {
    stopRibbon = createRibbonField(document.querySelector('.hf-ribbon'), sceneReady);
  })
  .catch((error) => {
    console.error('[HyperFrames] ribbon scene failed to start:', error);
    sceneReady();
  });
window.addEventListener(
  'pagehide',
  () => {
    stopGround();
    stopShowcase();
    stopFilm();
    stopRibbon?.();
  },
  { once: true },
);
