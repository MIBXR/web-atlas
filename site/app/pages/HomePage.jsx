import { useEffect, useRef, useState } from 'react';
import catalog from 'atlas:catalog';
import { Shell } from '../components/Shell';
import { HomeContent, HomeStoryMarkup } from './HomeContent';
import '../styles/home.css';
const modes = ['cases', 'lab', 'agent'];
const clamp = (value) => Math.max(0, Math.min(1, value));
function HomeStory() {
  const rootRef = useRef(null);
  const labRef = useRef(null);
  const actions = useRef({});
  const [frameHeight, setFrameHeight] = useState(650);
  const [view, setView] = useState({
    active: 0,
    intro: 0,
    enhanced: false,
    phase: 'sequential',
    progress: [0, 0, 0],
    paused: false,
  });
  useEffect(() => {
    const root = rootRef.current;
    const lab = labRef.current;
    const desktop = matchMedia('(min-width:1100px)');
    const tall = matchMedia('(min-height:740px)');
    const reduced = matchMedia('(prefers-reduced-motion:reduce)');
    let current = {
      active: 0,
      intro: 0,
      enhanced: false,
      phase: 'intro',
      progress: [0, 0, 0],
      paused: false,
    };
    let frame = 0;
    let hold = false;
    let pointerInLab = false;
    let heldPhase = 'story';
    let navigationTarget;
    let labHeightReceived = false;
    let measuredWidth = 0;
    let contentOverflow = false;
    let overflowFrames = 0;
    let settlesAt = 0;
    let removeChildListeners = () => {};
    const publish = (patch) => {
      current = { ...current, ...patch };
      setView(current);
    };
    const inset = () =>
      (document.querySelector('.site-header')?.offsetHeight || 68) + 16;
    const focused = () =>
      root
        .querySelector('#home-panel-' + modes[current.active])
        .contains(document.activeElement) ||
      (current.active === 1 && document.activeElement === lab);
    function update() {
      frame = 0;
      if (!current.enhanced) return;
      const delta = inset() - root.getBoundingClientRect().top;
      if (
        navigationTarget &&
        (Math.abs(scrollY - navigationTarget.top) < 3 ||
          Date.now() > navigationTarget.expires)
      )
        navigationTarget = null;
      const paused =
        hold || focused() || (current.active === 1 && pointerInLab);
      const requested = navigationTarget
        ? navigationTarget.index
        : delta < 340
          ? current.intro
          : Math.min(2, Math.max(0, Math.floor((delta - 500) / 500)));
      const phase = paused
        ? hold
          ? heldPhase
          : current.phase
        : navigationTarget || delta >= 340
          ? 'story'
          : delta > 0
            ? 'handoff'
            : 'intro';
      const nextActive = paused ? current.active : requested;
      if (nextActive !== current.active) settlesAt = Date.now() + 900;
      const progress = paused
        ? current.progress
        : modes.map((_, index) => clamp((delta - 500 - index * 500) / 500));
      publish({ active: nextActive, phase, paused, progress });
      const panel = root.querySelector('#home-panel-' + modes[nextActive]);
      const measured =
        nextActive !== 1 ||
        (labHeightReceived &&
          (!measuredWidth || Math.abs(measuredWidth - lab.clientWidth) < 2));
      if (
        measured &&
        panel.clientHeight > 0 &&
        panel.scrollHeight > panel.clientHeight + 2
      ) {
        if (Date.now() < settlesAt || ++overflowFrames < 6) schedule();
        else {
          contentOverflow = true;
          adapt();
        }
      } else overflowFrames = 0;
    }
    function schedule() {
      if (!frame) frame = requestAnimationFrame(update);
    }
    function adapt() {
      const enhanced =
        desktop.matches && tall.matches && !reduced.matches && !contentOverflow;
      const focusedIndex = modes.findIndex((mode) =>
        root
          .querySelector('#home-panel-' + mode)
          .contains(document.activeElement),
      );
      hold = enhanced && focusedIndex === 1;
      navigationTarget = null;
      settlesAt = Date.now() + 900;
      publish({
        active: focusedIndex >= 0 ? focusedIndex : current.active,
        enhanced,
        phase: enhanced ? 'intro' : 'sequential',
        paused: hold,
      });
      schedule();
    }
    function go(index) {
      if (!current.enhanced) return;
      hold = false;
      pointerInLab = false;
      navigationTarget = null;
      if (index < 3) {
        const top =
          root.getBoundingClientRect().top +
          scrollY -
          inset() +
          750 +
          index * 500;
        navigationTarget = { index, top, expires: Date.now() + 1400 };
        publish({ active: index, phase: 'story', paused: false });
        document
          .getElementById('home-mode-' + modes[index])
          .focus({ preventScroll: true });
        window.scrollTo({ top, behavior: 'smooth' });
      } else
        window.scrollTo({
          top: root.getBoundingClientRect().bottom + scrollY - inset(),
          behavior: 'smooth',
        });
      schedule();
    }
    function holdLab() {
      if (!current.enhanced || current.active !== 1) return;
      hold = true;
      heldPhase = current.phase;
      navigationTarget = null;
      publish({ paused: true });
      schedule();
    }
    function bindLab() {
      removeChildListeners();
      const doc = lab.contentDocument;
      if (!doc) return;
      const events = ['pointerdown', 'input', 'change', 'focusin'];
      events.forEach((type) => doc.addEventListener(type, holdLab));
      removeChildListeners = () =>
        events.forEach((type) => doc.removeEventListener(type, holdLab));
    }
    function message(event) {
      if (
        event.origin !== location.origin ||
        event.source !== lab.contentWindow ||
        event.data?.type !== 'design-atlas:lab-height'
      )
        return;
      labHeightReceived = true;
      measuredWidth = event.data.width;
      setFrameHeight(
        Math.max(300, Math.min(2e3, Math.ceil(event.data.height))),
      );
      schedule();
    }
    function resize() {
      contentOverflow = false;
      overflowFrames = 0;
      adapt();
    }
    actions.current = {
      onMode: go,
      onIntro(index) {
        hold = false;
        pointerInLab = false;
        navigationTarget = null;
        publish({ intro: index, active: index });
        schedule();
      },
      onNext() {
        go(current.active + 1);
      },
      onLabLoad: bindLab,
      onLabFocus: holdLab,
      onLabPointer(inside) {
        pointerInLab = inside;
        schedule();
      },
      onFocusChange: schedule,
    };
    [desktop, tall, reduced].forEach((media) =>
      media.addEventListener('change', adapt),
    );
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', resize);
    window.addEventListener('message', message);
    bindLab();
    adapt();
    return () => {
      [desktop, tall, reduced].forEach((media) =>
        media.removeEventListener('change', adapt),
      );
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', resize);
      window.removeEventListener('message', message);
      removeChildListeners();
      cancelAnimationFrame(frame);
    };
  }, []);
  return (
    <HomeStoryMarkup
      rootRef={rootRef}
      labRef={labRef}
      frameHeight={frameHeight}
      {...view}
      onMode={(index) => actions.current.onMode?.(index)}
      onIntro={(index) => actions.current.onIntro?.(index)}
      onNext={() => actions.current.onNext?.()}
      onLabLoad={() => actions.current.onLabLoad?.()}
      onLabFocus={() => actions.current.onLabFocus?.()}
      onLabPointer={(inside) => actions.current.onLabPointer?.(inside)}
      onFocusChange={() => actions.current.onFocusChange?.()}
    />
  );
}
export default function HomePage() {
  const [activeType, setActiveType] = useState('visual');
  const showcases = catalog.cases.filter(
    (entry) => entry.category === '示范作品',
  ).length;
  const studies = catalog.cases.filter(
    (entry) =>
      entry.implementation === 'reference-study' &&
      entry.category !== '示范作品',
  ).length;
  const counts = {
    all: catalog.cases.length,
    studies,
    showcases,
    classics: catalog.cases.length - studies - showcases,
    patterns: catalog.patterns.length,
  };
  return (
    <Shell page="index" className="landing-page" mainClassName="landing-main">
      <HomeContent
        story={<HomeStory />}
        counts={counts}
        activeType={activeType}
        onType={setActiveType}
      />
    </Shell>
  );
}
