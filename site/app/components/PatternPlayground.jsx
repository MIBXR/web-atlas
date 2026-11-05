import { useEffect, useRef, useState } from 'react';
let runtime;
function loadPlayground() {
  if (!runtime)
    runtime = new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = new URL(
        'site/playground/pattern-playground.js',
        document.baseURI,
      ).href;
      script.onload = () => resolve(window.AtlasPlayground);
      script.onerror = () => reject(new Error('巧思示意加载失败。'));
      document.head.append(script);
    });
  return runtime;
}
export function PatternPlayground({ type, active = true }) {
  const host = useRef(null);
  const [error, setError] = useState('');
  useEffect(() => {
    if (!active) return;
    const node = host.current;
    let mounted;
    let current = true;
    loadPlayground()
      .then((playground) => {
        if (!current) return;
        mounted = playground;
        playground.mount(node, { type });
      })
      .catch((error2) => {
        if (current) setError(error2.message);
      });
    return () => {
      current = false;
      mounted?.dispose(node);
    };
  }, [type, active]);
  return (
    <>
      <div ref={host} className="pattern-playground-host" data-type={type} />
      {error && <p role="alert">{error}</p>}
    </>
  );
}
