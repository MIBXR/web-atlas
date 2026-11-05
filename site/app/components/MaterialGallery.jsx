import { useEffect, useRef, useState } from 'react';
import { ExternalLink, Volume2, VolumeX } from 'lucide-react';
import { Button, Dialog, DialogContent, DialogTrigger } from './ui';
import { ActionLink } from './actions';
function ArtworkComparison({ picture }) {
  const canvas = useRef(null);
  const panel = useRef(null);
  const video = useRef(null);
  const [sound, setSound] = useState(false);
  const [error, setError] = useState('');
  const [ready, setReady] = useState(false);
  const info = picture.compare;
  useEffect(() => {
    let active = true,
      animation,
      renderer,
      observer;
    const reduced = matchMedia('(prefers-reduced-motion: reduce)');
    const surface = canvas.current;
    const movie = video.current;
    let piece;
    const draw = () => {
      if (!active || !renderer) return;
      renderer.renderPiece(
        surface,
        piece,
        reduced.matches || piece.static ? 0 : movie?.currentTime || 0,
      );
      if (!reduced.matches && !piece.static)
        animation = requestAnimationFrame(draw);
    };
    const start = () => {
      cancelAnimationFrame(animation);
      if (movie) {
        movie.pause();
        movie.currentTime = 0;
        movie.controls = reduced.matches;
        if (!reduced.matches)
          movie.play().catch(() => {
            if (active) movie.controls = true;
          });
      }
      draw();
    };
    Promise.all(
      ['renderer.js', 'pieces.js'].map(
        (name) =>
          import(
            new URL('demos/materials/0010-vigil/demo/' + name, document.baseURI)
              .href
          ),
      ),
    )
      .then(([module, data]) => {
        if (!active) return;
        renderer = module;
        piece = data.pieces.find((item) => item.id === info.piece);
        surface.width = piece.originalWidth;
        surface.height = piece.originalHeight;
        const resize = () => {
          const box = panel.current.getBoundingClientRect();
          const width = Math.min(
            box.width,
            (box.height * piece.width) / piece.height,
          );
          surface.style.width = width + 'px';
          surface.style.height = (width * piece.height) / piece.width + 'px';
          renderer.renderPiece(
            surface,
            piece,
            reduced.matches || piece.static ? 0 : movie?.currentTime || 0,
          );
        };
        observer = new ResizeObserver(resize);
        observer.observe(panel.current);
        resize();
        setReady(true);
        reduced.addEventListener('change', start);
        start();
      })
      .catch((error2) => {
        if (active) setError(error2.message);
      });
    return () => {
      active = false;
      cancelAnimationFrame(animation);
      observer?.disconnect();
      reduced.removeEventListener('change', start);
      movie?.pause();
      renderer?.releaseRenderer(surface);
    };
  }, [picture, info]);
  return (
    <>
      <div className="gallery-compare-actions">
        {info.sound && (
          <Button
            variant="secondary"
            aria-pressed={sound}
            onClick={() => {
              video.current.muted = !video.current.muted;
              setSound(!video.current.muted);
            }}
          >
            {sound ? <Volume2 size={16} /> : <VolumeX size={16} />}声音
          </Button>
        )}
        <ActionLink href={picture.sourceUrl} target="_blank" rel="noreferrer">
          <ExternalLink size={16} />
          帖子
        </ActionLink>
      </div>
      <div className="gallery-compare-panels">
        <figure>
          <figcaption>复刻</figcaption>
          <div ref={panel} className="gallery-compare-art">
            <canvas
              ref={canvas}
              role="img"
              aria-label={picture.caption + '复刻'}
            />
            {!ready && (
              <p role={error ? 'alert' : 'status'}>{error || '正在载入…'}</p>
            )}
          </div>
        </figure>
        <figure>
          <figcaption>原作</figcaption>
          <div className="gallery-compare-art">
            {info.original.endsWith('.mp4') ? (
              <video
                ref={video}
                src={info.original}
                muted
                loop
                playsInline
                preload="auto"
                aria-label={picture.caption + '原作'}
                onError={() => setError('原作视频加载失败。')}
              />
            ) : (
              <img src={info.original} alt={picture.caption + '原作'} />
            )}
          </div>
        </figure>
      </div>
      {error && ready && <p role="alert">{error}</p>}
    </>
  );
}
export function MaterialGallery({ entry }) {
  const [selected, setSelected] = useState(null);
  const opener = useRef(null);
  const pictures = entry.gallery;
  const move = (direction) =>
    setSelected(
      (index) => (index + direction + pictures.length) % pictures.length,
    );
  return (
    <Dialog
      open={selected !== null}
      onOpenChange={(open) => {
        if (!open) setSelected(null);
      }}
    >
      <div
        className="material-gallery"
        style={{
          '--gallery-ratio': entry.galleryRatio || 'auto',
          '--gallery-fit': entry.galleryFit || 'contain',
        }}
      >
        {pictures.map((picture, index) => (
          <figure key={picture.path}>
            {picture.compare ? (
              <DialogTrigger asChild>
                <button
                  type="button"
                  onClick={(event) => {
                    opener.current = event.currentTarget;
                    setSelected(index);
                  }}
                  aria-label={'对比作品：' + picture.caption}
                >
                  <img
                    src={picture.path}
                    alt={picture.caption}
                    width={picture.width}
                    height={picture.height}
                    loading="lazy"
                  />
                </button>
              </DialogTrigger>
            ) : (
              <a
                href={picture.path}
                target="_blank"
                rel="noreferrer"
                aria-label={'查看原图：' + picture.caption}
              >
                <img
                  src={picture.path}
                  alt={picture.caption}
                  width={picture.width}
                  height={picture.height}
                  loading="lazy"
                />
              </a>
            )}
            <figcaption>
              <span className="entry-tag">
                {
                  { work: '作品节选', style: '风格样张', theme: '主题预览' }[
                    picture.kind
                  ]
                }
              </span>
              <p>{picture.caption}</p>
              {picture.replicaPage && (
                <a href={picture.replicaPage}>打开本库页面</a>
              )}
            </figcaption>
          </figure>
        ))}
      </div>
      <DialogContent
        title={selected === null ? '作品对照' : pictures[selected].caption}
        className="gallery-dialog"
        onCloseAutoFocus={(event) => {
          event.preventDefault();
          opener.current?.focus();
        }}
        onKeyDown={(event) => {
          if (event.target.closest('input,video')) return;
          if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
            event.preventDefault();
            move(event.key === 'ArrowRight' ? 1 : -1);
          }
        }}
      >
        {selected !== null && (
          <>
            <ArtworkComparison key={selected} picture={pictures[selected]} />
            <div className="gallery-dialog-actions">
              <Button variant="secondary" onClick={() => move(-1)}>
                上一件
              </Button>
              <span>
                {selected + 1} / {pictures.length}
              </span>
              <Button variant="secondary" onClick={() => move(1)}>
                下一件
              </Button>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
