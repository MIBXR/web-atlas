const films = [
  [
    {
      kind: 'Launch film',
      name: 'Studio launch',
      ar: 1.7777777777777777,
      src: 'assets/homepage/showcase/card/studio-launch-v1.mp4',
      poster: 'assets/site/studio-launch-nib-sf-audio-poster.jpg',
    },
    {
      kind: 'VFX',
      name: 'Out of the billboard',
      ar: 0.5625,
      src: 'assets/homepage/showcase/card/vfx-billboard-hoodie-handoff-v1.mp4',
      poster: 'assets/homepage/showcase/poster/vfx-billboard-hoodie-handoff-v1.jpg',
    },
    {
      kind: 'Awards trailer',
      name: 'Opening night',
      ar: 1.7777777777777777,
      src: 'assets/homepage/showcase/card/frameys-opening-night-v1.mp4',
      poster: 'assets/homepage/showcase/poster/frameys-opening-night-v1.jpg',
    },
    {
      kind: '3D build',
      name: 'Jake & the Taycan',
      ar: 1,
      src: 'assets/homepage/showcase/card/jake-taycan-bricks-v1.mp4',
      poster: 'assets/homepage/showcase/poster/jake-taycan-bricks-v1.jpg',
    },
    {
      kind: 'Cartoon',
      name: 'The Frameys',
      ar: 1.7777777777777777,
      src: 'assets/homepage/showcase/card/cartoon-frameys-launch-one-take-v1.mp4',
      poster: 'assets/homepage/showcase/poster/cartoon-frameys-launch-one-take-v1.jpg',
    },
    {
      kind: 'Explainer',
      name: 'The journey of “k”',
      ar: 0.5625,
      src: 'assets/homepage/showcase/card/k-v1.mp4',
      poster: 'assets/homepage/showcase/poster/k-v1.jpg',
    },
    {
      kind: 'Real UI',
      name: 'Men walk on the Moon',
      ar: 1.7777777777777777,
      src: 'assets/homepage/showcase/card/real-ui-newspaper-1969-v2.mp4',
      poster: 'assets/homepage/showcase/poster/real-ui-newspaper-1969-v2.jpg',
    },
    {
      kind: 'Product launch',
      name: 'Storyboard first',
      ar: 1.7777777777777777,
      src: 'assets/homepage/showcase/card/launch-storyboard-first-v1.mp4',
      poster: 'assets/homepage/showcase/poster/launch-storyboard-first-v1.jpg',
    },
    {
      kind: 'Captions',
      name: 'Don’t tell my clients',
      ar: 0.8,
      src: 'assets/homepage/showcase/card/captions-v1.mp4',
      poster: 'assets/homepage/showcase/poster/captions-v1.jpg',
    },
    {
      kind: 'Manga',
      name: 'The last onigiri',
      ar: 1.7777777777777777,
      src: 'assets/homepage/showcase/card/manga-last-onigiri-v1.mp4',
      poster: 'assets/homepage/showcase/poster/manga-last-onigiri-v1.jpg',
    },
    {
      kind: 'Live-coded music',
      name: 'Square one',
      ar: 1,
      src: 'assets/homepage/showcase/card/square-one-strudel-v2.mp4',
      poster: 'assets/homepage/showcase/poster/square-one-strudel-v2.jpg',
    },
    {
      kind: 'VFX',
      name: 'Background removal',
      ar: 1.7777777777777777,
      src: 'assets/homepage/showcase/card/vfx-background-removal-launch-v1.mp4',
      poster: 'assets/homepage/showcase/poster/vfx-background-removal-launch-v1.jpg',
    },
    {
      kind: 'Sitcom',
      name: 'Two lines',
      ar: 0.5625,
      src: 'assets/homepage/showcase/card/sitcom-v1.mp4',
      poster: 'assets/homepage/showcase/poster/sitcom-v1.jpg',
    },
    {
      kind: 'Explainer',
      name: 'It’s just HTML',
      ar: 1.7777777777777777,
      src: 'assets/homepage/showcase/card/just-html-v1.mp4',
      poster: 'assets/homepage/showcase/poster/just-html-v1.jpg',
    },
    {
      kind: 'Kinetic type',
      name: 'Going through a change',
      ar: 1.3333333333333333,
      src: 'assets/homepage/showcase/card/kinetic-type-curiosity-v1.mp4',
      poster: 'assets/homepage/showcase/poster/kinetic-type-curiosity-v1.jpg',
    },
    {
      kind: 'Many looks',
      name: 'This homepage',
      ar: 1.7777777777777777,
      src: 'assets/homepage/showcase/card/home-v1.mp4',
      poster: 'assets/homepage/showcase/poster/home-v1.jpg',
    },
    {
      kind: 'Logo sting',
      name: 'Wordmark',
      ar: 1,
      src: 'assets/homepage/showcase/card/wordmark-sting-v1.mp4',
      poster: 'assets/homepage/showcase/poster/wordmark-sting-v1.jpg',
    },
    {
      kind: 'Cartoon',
      name: 'Jake’s favorite agent',
      ar: 1.7777777777777777,
      src: 'assets/homepage/showcase/card/session-story-v1.mp4',
      poster: 'assets/homepage/showcase/poster/session-story-v1.jpg',
    },
    {
      kind: 'Square',
      name: 'Claude Motion',
      ar: 1,
      src: 'assets/homepage/showcase/card/launch-claude-motion-v1.mp4',
      poster: 'assets/homepage/showcase/poster/launch-claude-motion-v1.jpg',
    },
    {
      kind: 'Real UI',
      name: 'How do cameras focus',
      ar: 1.7777777777777777,
      src: 'assets/homepage/showcase/card/real-ui-google-search-v2.mp4',
      poster: 'assets/homepage/showcase/poster/real-ui-google-search-v2.jpg',
    },
    {
      kind: 'Style study',
      name: 'One horse, many looks',
      ar: 3.5555555555555554,
      src: 'assets/homepage/showcase/card/muybridge-horse-styles-v2.mp4',
      poster: 'assets/homepage/showcase/poster/muybridge-horse-styles-v2.jpg',
    },
    {
      kind: 'Cartoon',
      name: 'Rackrats',
      ar: 1.7777777777777777,
      src: 'assets/homepage/showcase/card/rackrats-v1.mp4',
      poster: 'assets/homepage/showcase/poster/rackrats-v1.jpg',
    },
  ],
  [
    {
      kind: 'Tutorial',
      name: 'Reference any video',
      ar: 1.7777777777777777,
      src: 'assets/homepage/showcase/card/tutorial-wenbo-studio-tutorial-talkinghead-v1.mp4',
      poster: 'assets/homepage/showcase/poster/tutorial-wenbo-studio-tutorial-talkinghead-v1.jpg',
    },
    {
      kind: '3D tutorial',
      name: 'Axe chop',
      ar: 0.5625,
      src: 'assets/homepage/showcase/card/axe-v1.mp4',
      poster: 'assets/homepage/showcase/poster/axe-v1.jpg',
    },
    {
      kind: 'Cartoon',
      name: 'Halloween party',
      ar: 1.7777777777777777,
      src: 'assets/homepage/showcase/card/framey-orby-halloween-v1.mp4',
      poster: 'assets/homepage/showcase/poster/framey-orby-halloween-v1.jpg',
    },
    {
      kind: 'Launch parody',
      name: 'Cow 1.0',
      ar: 1.7777777777777777,
      src: 'assets/homepage/showcase/card/cow-v1.mp4',
      poster: 'assets/homepage/showcase/poster/cow-v1.jpg',
    },
    {
      kind: 'Logo sting',
      name: 'ASCII sharks',
      ar: 1.7777777777777777,
      src: 'assets/homepage/showcase/card/ascii-sharks-logo-v1.mp4',
      poster: 'assets/homepage/showcase/poster/ascii-sharks-logo-v1.jpg',
    },
    {
      kind: 'VFX',
      name: 'Giant keyboard',
      ar: 0.5625,
      src: 'assets/homepage/showcase/card/vfx-giant-keyboard-reel-v1.mp4',
      poster: 'assets/homepage/showcase/poster/vfx-giant-keyboard-reel-v1.jpg',
    },
    {
      kind: 'Real UI',
      name: 'Wikipedia',
      ar: 1.7777777777777777,
      src: 'assets/homepage/showcase/card/real-ui-wikipedia-v2.mp4',
      poster: 'assets/homepage/showcase/poster/real-ui-wikipedia-v2.jpg',
    },
    {
      kind: 'AI footage',
      name: 'HeyGen Video 1',
      ar: 1.7777777777777777,
      src: 'assets/homepage/showcase/card/launch-heygen-video1-v1.mp4',
      poster: 'assets/homepage/showcase/poster/launch-heygen-video1-v1.jpg',
    },
    {
      kind: 'Code tutorial',
      name: 'A game in one canvas',
      ar: 1.7777777777777777,
      src: 'assets/homepage/showcase/card/pixel-game-one-canvas-v1.mp4',
      poster: 'assets/homepage/showcase/poster/pixel-game-one-canvas-v1.jpg',
    },
    {
      kind: 'Talking head',
      name: 'Tool demo',
      ar: 0.5625,
      src: 'assets/homepage/showcase/card/demo-v1.mp4',
      poster: 'assets/homepage/showcase/poster/demo-v1.jpg',
    },
    {
      kind: 'Motion design',
      name: 'Everything was written',
      ar: 1.7777777777777777,
      src: 'assets/homepage/showcase/card/everything-was-written-v2.mp4',
      poster: 'assets/homepage/showcase/poster/everything-was-written-v2.jpg',
    },
    {
      kind: 'Kinetic type',
      name: 'Keynote line',
      ar: 1.7777777777777777,
      src: 'assets/homepage/showcase/card/launch-v1.mp4',
      poster: 'assets/homepage/showcase/poster/launch-v1.jpg',
    },
    {
      kind: '3D voxel',
      name: 'Remotion to HyperFrames',
      ar: 1.7777777777777777,
      src: 'assets/homepage/showcase/card/remotion-to-hyperframes-v1.mp4',
      poster: 'assets/homepage/showcase/poster/remotion-to-hyperframes-v1.jpg',
    },
    {
      kind: 'Presenter',
      name: 'Code2Video Bench',
      ar: 1.7777777777777777,
      src: 'assets/homepage/showcase/card/explainer-code2video-bench-v1.mp4',
      poster: 'assets/homepage/showcase/poster/explainer-code2video-bench-v1.jpg',
    },
    {
      kind: 'Real UI',
      name: 'CCTV tracking',
      ar: 1.7777777777777777,
      src: 'assets/homepage/showcase/card/real-ui-cctv-v2.mp4',
      poster: 'assets/homepage/showcase/poster/real-ui-cctv-v2.jpg',
    },
    {
      kind: '3D characters',
      name: 'The Frameys dance',
      ar: 1.7777777777777777,
      src: 'assets/homepage/showcase/card/frameys-felt-party-v2.mp4',
      poster: 'assets/homepage/showcase/poster/frameys-felt-party-v2.jpg',
    },
    {
      kind: 'Product launch',
      name: 'Moments catalog',
      ar: 1.7777777777777777,
      src: 'assets/homepage/showcase/card/launch-moments-catalog-v1.mp4',
      poster: 'assets/homepage/showcase/poster/launch-moments-catalog-v1.jpg',
    },
    {
      kind: 'Logo reveal',
      name: 'Shards',
      ar: 1.7777777777777777,
      src: 'assets/homepage/showcase/card/shards-logo-reveal-v1.mp4',
      poster: 'assets/homepage/showcase/poster/shards-logo-reveal-v1.jpg',
    },
    {
      kind: 'Product reveal',
      name: 'Studio intro',
      ar: 1.7777777777777777,
      src: 'assets/homepage/showcase/card/launch-hyperframes-studio-intro-v1.mp4',
      poster: 'assets/homepage/showcase/poster/launch-hyperframes-studio-intro-v1.jpg',
    },
    {
      kind: 'Launch film',
      name: 'A launch video in 6 hours',
      ar: 1.7777777777777777,
      src: 'assets/homepage/showcase/card/studio-launch-pixel-v1.mp4',
      poster: 'assets/homepage/showcase/poster/studio-launch-pixel-v1.jpg',
    },
    {
      kind: 'YouTube edit',
      name: 'Online business story',
      ar: 1.7777777777777777,
      src: 'assets/homepage/showcase/card/youtube-online-business-v1.mp4',
      poster: 'assets/homepage/showcase/poster/youtube-online-business-v1.jpg',
    },
    {
      kind: 'Product launch',
      name: 'From your website',
      ar: 1.7777777777777777,
      src: 'assets/homepage/showcase/card/website-to-launch-v1.mp4',
      poster: 'assets/homepage/showcase/poster/website-to-launch-v1.jpg',
    },
    {
      kind: 'Generative art',
      name: 'Code is a material',
      ar: 1.7777777777777777,
      src: 'assets/homepage/showcase/card/generative-replica-v1.mp4',
      poster: 'assets/homepage/showcase/poster/generative-replica-v1.jpg',
    },
  ],
];

export function mountShowcase() {
  const section = document.querySelector('.hf-showcase');
  const dialog = section.querySelector('.hf-player');
  const pauseButton = section.querySelector('.hf-rows-pause button');
  const assets = window.AtlasAssets;
  let paused = false;
  const controllers = [];
  function open(film) {
    dialog.className = 'hf-player' + (film.ar < 1 ? ' is-tall' : '');
    dialog.setAttribute('aria-label', film.name);
    const video = document.createElement('video');
    video.src = assets.resolve(film.src);
    video.poster = assets.resolve(film.poster);
    video.controls = true;
    video.playsInline = true;
    dialog.append(video);
    dialog.showModal();
    video.play().catch(() => {});
  }
  dialog.querySelector('.hf-player-close').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', (event) => {
    if (event.target === dialog) dialog.close();
  });
  dialog.addEventListener('close', () => {
    dialog.querySelector('video')?.remove();
    dialog.className = 'hf-player';
    dialog.removeAttribute('aria-label');
  });
  section.querySelectorAll('.hf-row').forEach((row, rowIndex) => {
    const direction = [-1, 1][rowIndex],
      speed = [40, 34][rowIndex];
    const autoplay =
      !matchMedia('(prefers-reduced-motion: reduce)').matches && !navigator.connection?.saveData;
    const abort = new AbortController(),
      options = { signal: abort.signal };
    let offset = 0,
      inertia = 0,
      previous = 0,
      frame = 0,
      distance = 0,
      focused = false,
      drag = null;
    const span = () => row.children[row.children.length / 2].offsetLeft - row.children[0].offsetLeft;
    function render(timestamp) {
      const delta = Math.min(0.05, (timestamp - previous) / 1000);
      previous = timestamp;
      const width = span();
      if (!drag?.on) {
        offset += inertia;
        inertia = Math.abs(inertia) < 0.05 ? 0 : 0.86 * inertia;
        if (autoplay && !paused && !focused) offset += speed * delta;
      }
      offset = ((offset % width) + width) % width;
      row.parentElement.scrollLeft = 0;
      row.style.transform = `translateX(${(direction < 0 ? -offset : offset - width).toFixed(1)}px)`;
      frame = requestAnimationFrame(render);
    }
    const rowObserver = new IntersectionObserver(([entry]) => {
      cancelAnimationFrame(frame);
      if (entry.isIntersecting) {
        previous = performance.now();
        frame = requestAnimationFrame(render);
      }
    });
    rowObserver.observe(row);
    const videoObserver = new IntersectionObserver(
      (entries) => {
        for (const { target: video, isIntersecting } of entries) {
          if (isIntersecting) {
            if (autoplay && !paused) {
              if (!video.src) video.src = assets.resolve(video.dataset.src);
              video.play().catch(() => {});
            }
          } else {
            video.pause();
            if (video.src) {
              video.removeAttribute('src');
              video.load();
            }
          }
        }
      },
      { threshold: 0.2 },
    );
    const posterObserver = new IntersectionObserver(
      (entries) => {
        for (const { target: video, isIntersecting } of entries)
          if (isIntersecting) {
            video.poster = assets.resolve(video.dataset.poster);
            posterObserver.unobserve(video);
          }
      },
      { rootMargin: '400px' },
    );
    row.querySelectorAll('video').forEach((video) => {
      videoObserver.observe(video);
      posterObserver.observe(video);
    });
    row.addEventListener(
      'focusin',
      (event) => {
        const card = event.target;
        if (!card.matches(':focus-visible')) return;
        focused = true;
        const margin = (row.parentElement.clientWidth - card.offsetWidth) / 2;
        const target = Math.max(0.5, card.offsetLeft - margin);
        offset = direction < 0 ? target : span() - target;
      },
      options,
    );
    row.addEventListener(
      'focusout',
      () => {
        focused = false;
      },
      options,
    );
    row.addEventListener(
      'pointerdown',
      (event) => {
        drag = { x: event.clientX, x0: offset, id: event.pointerId, on: false };
        distance = inertia = 0;
      },
      options,
    );
    row.addEventListener(
      'pointermove',
      (event) => {
        if (!drag) return;
        const delta = event.clientX - drag.x;
        distance = Math.max(distance, Math.abs(delta));
        if (!drag.on && distance > 6) {
          drag.on = true;
          row.setPointerCapture(drag.id);
          row.classList.add('is-dragging');
        }
        if (drag.on) offset = drag.x0 + delta * direction;
      },
      options,
    );
    function release() {
      drag = null;
      row.classList.remove('is-dragging');
    }
    window.addEventListener('pointerup', release, options);
    window.addEventListener('pointercancel', release, options);
    row.addEventListener('lostpointercapture', release, options);
    row.addEventListener(
      'click',
      (event) => {
        if (event.detail > 0 && distance > 6) {
          event.stopPropagation();
          event.preventDefault();
        }
        distance = 0;
      },
      { capture: true, signal: abort.signal },
    );
    row.addEventListener(
      'wheel',
      (event) => {
        const delta =
          Math.abs(event.deltaX) > Math.abs(event.deltaY) ? event.deltaX : event.shiftKey ? event.deltaY : 0;
        if (delta) {
          event.preventDefault();
          inertia += -(delta * direction);
        }
      },
      { passive: false, signal: abort.signal },
    );
    [...row.children].forEach((card, index) =>
      card.addEventListener('click', () => open(films[rowIndex][index % films[rowIndex].length])),
    );
    function updatePause() {
      for (const video of row.querySelectorAll('video')) {
        if (paused) {
          video.pause();
          continue;
        }
        const box = video.getBoundingClientRect();
        if (autoplay && box.right > 0 && box.left < innerWidth && box.bottom > 0 && box.top < innerHeight) {
          if (!video.src) video.src = assets.resolve(video.dataset.src);
          video.play().catch(() => {});
        }
      }
    }
    updatePause();
    controllers.push({
      updatePause,
      destroy() {
        cancelAnimationFrame(frame);
        rowObserver.disconnect();
        videoObserver.disconnect();
        posterObserver.disconnect();
        abort.abort();
      },
    });
  });
  pauseButton.addEventListener('click', () => {
    paused = !paused;
    const label = paused ? 'Play animation' : 'Pause animation';
    pauseButton.setAttribute('aria-label', label);
    pauseButton.title = label;
    pauseButton.dataset.carouselPause = paused ? 'paused' : 'playing';
    pauseButton.innerHTML = `<svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true" focusable="false">${paused ? '<path d="M3 1.5v9l7.5-4.5z" fill="currentColor"></path>' : '<rect x="2.25" y="1.5" width="2.5" height="9" rx="0.75" fill="currentColor"></rect><rect x="7.25" y="1.5" width="2.5" height="9" rx="0.75" fill="currentColor"></rect>'}</svg>`;
    controllers.forEach((controller) => controller.updatePause());
  });
  return () => controllers.forEach((controller) => controller.destroy());
}
