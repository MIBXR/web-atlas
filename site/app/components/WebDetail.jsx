import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Crosshair, ExternalLink, Minus, RotateCcw } from 'lucide-react';
import catalog from 'atlas:catalog';
import {
  Accordion,
  Button,
  CodeBlock,
  CopyButton,
  DropdownMenu,
  SegmentedControl,
  Tooltip,
} from './ui';
import { ActionLink, Choice, FavoriteAction, IconAction } from './actions';
import { navigate } from '../state/location';
import { mountPatternFocus } from '../domain/pattern-focus';
import { MaterialGallery } from './MaterialGallery';
import { caseNoteSections } from '../domain/case-notes.mjs';
import '../styles/detail.css';
const names = { cases: '案例库', patterns: '巧思库', materials: '素材库' };
const themeLabels = {
  fixed: '固定主题',
  system: '跟随系统',
  manual: '手动切换',
  'system-and-manual': '系统 + 手动',
};
const soundLabels = {
  none: '无网站配乐',
  background: '背景音乐',
  video: '媒体声音',
  external: '外部音乐入口',
  interactive: '操作／演奏声音',
};
const roleLabels = {
  foundation: '主要结构',
  support: '辅助机制',
  accent: '局部强调',
};
const evidenceLabels = {
  observed: '来源观察',
  adapted: '教学改编',
  inferred: '分析推断',
  source: '源码依据',
};
const docHref = (file) => 'docs.html?file=' + encodeURIComponent(file);
const noteId = (title) => 'detail-' + encodeURIComponent(title);
export function NoteList({ values = [], ordered = false }) {
  const Tag = ordered ? 'ol' : 'ul';
  return (
    values.length > 0 && (
      <Tag>
        {values.map((value, index) => (
          <li key={index}>{value}</li>
        ))}
      </Tag>
    )
  );
}
export function NoteSection({ title, children }) {
  return (
    <section>
      <h2 id={noteId(title)}>{title}</h2>
      {children}
    </section>
  );
}
export function Palette({ entry }) {
  return (
    <div className="palette-swatches">
      {entry.tokens.palette.map((color) => (
        <span key={color}>
          <i style={{ background: color }} />
          {color}
        </span>
      ))}
    </div>
  );
}
export function ThemeBehavior({ entry }) {
  return (
    <>
      <h3>显示主题</h3>
      <p>
        <strong>{themeLabels[entry.themeBehavior.mode]}</strong>
      </p>
      <p>{entry.themeBehavior.control}</p>
      <p>{entry.themeBehavior.designReason}</p>
      <h3>声音与交互</h3>
      <p>
        <strong>{soundLabels[entry.soundBehavior.kind]}</strong>
      </p>
      <p>{entry.soundBehavior.control}</p>
      {entry.soundBehavior.interactionRole && (
        <p>{entry.soundBehavior.interactionRole}</p>
      )}
    </>
  );
}
function Constraints({ entry, title = '约束与适用场景' }) {
  return (
    <NoteSection title={title}>
      {entry.useCases?.length > 0 && (
        <>
          <h3>适合</h3>
          <NoteList values={entry.useCases} />
        </>
      )}
      {entry.avoid?.length > 0 && (
        <>
          <h3>谨慎使用</h3>
          <NoteList values={entry.avoid} />
        </>
      )}
      <h3>实现约束</h3>
      <NoteList values={entry.constraints} />
    </NoteSection>
  );
}
function SourceLink({ href, children }) {
  if (!href) return children;
  return (
    <a href={href} target="_blank" rel="noreferrer">
      {children}
      <ExternalLink size={13} aria-hidden="true" />
    </a>
  );
}
function RelatedEntries({ entry }) {
  const types = {
    case: ['cases', 'style'],
    pattern: ['patterns', 'pattern'],
    material: ['materials', 'material'],
  };
  return (
    entry.relatedEntries?.length > 0 && (
      <NoteSection title="关联条目">
        <ul>
          {entry.relatedEntries.map((related) => {
            const [kind, prefix] = types[related.kind];
            const item = catalog[kind].find((value) => value.id === related.id);
            return (
              <li key={related.kind + related.id}>
                <a href={`${kind}.html#${prefix}/${related.id}`}>
                  {item.title}
                </a>
                <p>{related.note}</p>
              </li>
            );
          })}
        </ul>
      </NoteSection>
    )
  );
}
function Parameters({ parameters, caption }) {
  return (
    parameters?.length > 0 && (
      <div className="parameters-scroll">
        <table className="parameter-table">
          {caption && <caption>{caption}</caption>}
          <thead>
            <tr>
              <th scope="col">参数</th>
              <th scope="col">参考值</th>
              <th scope="col">适配提示</th>
            </tr>
          </thead>
          <tbody>
            {parameters.map((parameter, index) => (
              <tr key={index}>
                <th scope="row">{parameter.name}</th>
                <td>{parameter.value}</td>
                <td>{parameter.note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  );
}
function CaseNotes({ entry }) {
  function render(block, index) {
    switch (block.type) {
      case 'paragraph':
        return <p key={index}>{block.text}</p>;
      case 'heading':
        return <h3 key={index}>{block.text}</h3>;
      case 'list':
        return <NoteList key={index} values={block.values} />;
      case 'link':
        return (
          <a key={index} href={block.href}>
            {block.text}
          </a>
        );
      case 'links':
        return (
          <ul key={index}>
            {block.values.map((value) => (
              <li key={value.href}>
                <a href={value.href}>{value.text}</a>
              </li>
            ))}
          </ul>
        );
      case 'definitions':
        return (
          <dl key={index} className="composition-map">
            {block.values.map(([term, value]) => (
              <div key={term}>
                <dt>{term}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>
        );
      case 'palette':
        return (
          <Palette key={index} entry={{ tokens: { palette: block.values } }} />
        );
      case 'prompt':
        return (
          <div key={index}>
            <CodeBlock code={block.text} language="text" maxLines={14} />
            <Accordion
              defaultOpen={-1}
              items={[
                {
                  title: '负面约束 / Negative Prompt',
                  content: <p>{block.negative}</p>,
                },
              ]}
            />
          </div>
        );
      case 'sources':
        return (
          <div key={index}>
            {block.values.map((source, sourceIndex) => (
              <article className="source-note" key={sourceIndex}>
                <span className="entry-tag">{source.type}</span>
                <SourceLink href={source.url}>{source.title}</SourceLink>
                <p>{source.note}</p>
              </article>
            ))}
          </div>
        );
      default:
        throw new Error(`Unknown case note block: ${block.type}`);
    }
  }
  return caseNoteSections(entry, catalog.patterns).map((section) => (
    <NoteSection key={section.title} title={section.title}>
      {section.blocks.map(render)}
    </NoteSection>
  ));
}
function PatternNotes({ entry, source }) {
  const composition = entry.composition;
  const links = (ids) => (
    <ul>
      {ids.map((id) => {
        const item = catalog.patterns.find((pattern) => pattern.id === id);
        return (
          <li key={id}>
            <a href={`patterns.html#pattern/${id}`}>{item.title}</a>
            <p>{item.summary}</p>
          </li>
        );
      })}
    </ul>
  );
  return (
    <>
      <NoteSection title="观察位置">
        <p>{source.focus.instruction}</p>
      </NoteSection>
      <NoteSection title="机制">
        <p>{entry.mechanism}</p>
        <dl className="composition-map">
          {entry.trigger && (
            <div>
              <dt>触发条件</dt>
              <dd>{entry.trigger}</dd>
            </div>
          )}
          {entry.effect && (
            <div>
              <dt>设计效果</dt>
              <dd>{entry.effect}</dd>
            </div>
          )}
        </dl>
      </NoteSection>
      {entry.parameters.length > 0 && (
        <NoteSection title="可调参数">
          <Parameters
            parameters={entry.parameters}
            caption="取材基线与适配提示"
          />
        </NoteSection>
      )}
      <Constraints entry={entry} />
      {(composition.notes ||
        composition.pairsWellWith.length > 0 ||
        composition.conflicts.length > 0) && (
        <NoteSection title="组合建议">
          {composition.notes && <p>{composition.notes}</p>}
          {composition.pairsWellWith.length > 0 && (
            <>
              <h3>可搭配</h3>
              {links(composition.pairsWellWith)}
            </>
          )}
          {composition.conflicts.length > 0 && (
            <>
              <h3>冲突与取舍</h3>
              {links(composition.conflicts)}
            </>
          )}
        </NoteSection>
      )}
      <NoteSection title="复用 Prompt">
        <CodeBlock code={entry.prompt} language="text" maxLines={14} />
      </NoteSection>
      <NoteSection title="来源与证据">
        {entry.sources.map((item, index) => {
          const observation = item.observation.startsWith('{')
            ? JSON.parse(item.observation)
            : null;
          const origin = catalog.cases.find(
            (value) => value.id === item.caseId,
          );
          return (
            <article className="source-note" key={index}>
              <span className="entry-tag">
                {evidenceLabels[item.evidence] || item.evidence}
              </span>
              <a href={`cases.html#style/${item.caseId}`}>{origin.title}</a>
              <p>{observation ? observation.note : item.observation}</p>
              <p className="support-text">
                取材位置：{item.locator}
                {item.capturedAt ? ' · 采集 / 核验：' + item.capturedAt : ''}
              </p>
              {item.referenceUrl && (
                <SourceLink href={item.referenceUrl}>
                  {observation ? observation.title : '对照原始参考'}
                </SourceLink>
              )}
            </article>
          );
        })}
      </NoteSection>
    </>
  );
}
function MaterialNotes({ entry }) {
  const parameters = (entry.demos || []).filter(
    (demo) => demo.parameters?.length,
  );
  return (
    <>
      <Constraints entry={entry} title="适用场景与限制" />
      {parameters.length > 0 && (
        <NoteSection title="样例与参数">
          {parameters.map((demo) => (
            <div key={demo.id}>
              <h3>{demo.title}</h3>
              <p>{demo.summary}</p>
              <Parameters
                parameters={demo.parameters}
                caption={`${demo.component} · 样例基线`}
              />
            </div>
          ))}
        </NoteSection>
      )}
      <RelatedEntries entry={entry} />
      <NoteSection title="许可证与来源">
        <p>
          <SourceLink href={entry.license.url}>
            {entry.license.name} · 查看许可依据
          </SourceLink>
        </p>
        <p>{entry.license.scope}</p>
        {entry.license.notes && <p>{entry.license.notes}</p>}
        <p>
          {entry.upstream.version
            ? `核验版本 ${entry.upstream.version} · `
            : '来源核验 · '}
          {entry.upstream.verifiedAt}
        </p>
        {entry.upstream.commit && (
          <code className="source-commit">{entry.upstream.commit}</code>
        )}
        {entry.sources.map((source, index) => (
          <article className="source-note" key={index}>
            <SourceLink href={source.url}>{source.title}</SourceLink>
            <p>{source.note}</p>
          </article>
        ))}
        <a href={docHref(entry.research)}>查看素材使用与维护说明</a>
      </NoteSection>
      <NoteSection title="复用 Prompt">
        <CodeBlock code={entry.prompt} language="text" maxLines={14} />
      </NoteSection>
    </>
  );
}
function PreviewPanel({ kind, entry, source, onSourceChange, actionsRef }) {
  const [mode, setMode] = useState(
    source?.focus.viewport ||
      (entry.id === 'chatgpt-platform' ? 'wide' : 'desktop'),
  );
  const [revision, setRevision] = useState(0);
  const [example, setExample] = useState(null);
  const [located, setLocated] = useState(false);
  const [dimensions, setDimensions] = useState({ width: 700, height: 600 });
  const panelRef = useRef(null);
  const viewportRef = useRef(null);
  const frameHost = useRef(null);
  const focusRuntime = useRef(null);
  const sourceEntry = source
    ? catalog.cases.find((item) => item.id === source.caseId)
    : entry;
  const currentDemo =
    example?.entrypoint || source?.focus.entrypoint || sourceEntry.demo;
  const materialDocument =
    kind === 'materials' && ['agent-skill', 'prompt-kit'].includes(entry.type);
  const imageMaterial =
    kind === 'materials' && entry.type === 'image' && entry.gallery?.length > 0;
  useLayoutEffect(() => {
    if (!viewportRef.current) return;
    const measure = () => {
      const panel = panelRef.current;
      const viewport = viewportRef.current;
      const controls =
        viewport.getBoundingClientRect().top -
        panel.getBoundingClientRect().top;
      const top =
        document.querySelector('.site-header').offsetHeight +
        (actionsRef.current?.offsetHeight || 0) +
        24;
      setDimensions({
        width: viewport.clientWidth,
        height: Math.max(160, innerHeight - top - controls - 24),
      });
    };
    const observer = new ResizeObserver(measure);
    observer.observe(panelRef.current);
    observer.observe(viewportRef.current);
    if (actionsRef.current) observer.observe(actionsRef.current);
    window.addEventListener('resize', measure);
    measure();
    return () => {
      observer.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, [actionsRef, kind, materialDocument, imageMaterial]);
  useEffect(() => {
    if (kind !== 'patterns') return;
    setLocated(false);
    const runtime = mountPatternFocus(
      frameHost.current,
      sourceEntry,
      source.focus,
      () => {},
    );
    focusRuntime.current = runtime;
    let active = true;
    runtime.ready.then(() => {
      if (active) setLocated(true);
    });
    return () => {
      active = false;
      runtime.dispose();
    };
  }, [kind, source, sourceEntry, revision]);
  useEffect(() => {
    if (source?.focus.viewport) setMode(source.focus.viewport);
  }, [source]);
  const fixedWidth =
    mode === 'wide' ? 1440 : mode === 'mobile' ? 390 : dimensions.width;
  const scale = Math.min(1, dimensions.width / fixedWidth);
  const frameStyle = {
    '--frame-width': fixedWidth + 'px',
    '--frame-scale': scale,
    '--frame-height': dimensions.height / scale + 'px',
    width: fixedWidth * scale,
    height: dimensions.height,
  };
  if (materialDocument || imageMaterial)
    return (
      <div className="demo-panel material-document-panel" ref={panelRef}>
        {materialDocument && (
          <NoteSection title="工作流">
            <NoteList values={entry.workflow} ordered />
          </NoteSection>
        )}
        {entry.gallery?.length > 0 && (
          <>
            <h2>{imageMaterial ? '作品画廊' : '效果图画廊'}</h2>
            <MaterialGallery entry={entry} />
          </>
        )}
        {materialDocument && (
          <>
            <RelatedEntries entry={entry} />
            <NoteSection title="Skill 原文快照">
              <p>
                <a href={docHref(entry.snapshotPath + entry.snapshotEntry)}>
                  {entry.snapshotEntry} · 阅读原始工作指引
                </a>
              </p>
              <p>
                <a href={docHref(entry.snapshotPath + 'README.md')}>
                  README · 阅读原始使用说明
                </a>
              </p>
            </NoteSection>
          </>
        )}
        {entry.install && (
          <NoteSection title="安装与取材">
            <CodeBlock code={entry.install} language="text" />
          </NoteSection>
        )}
      </div>
    );
  return (
    <section className="demo-panel" ref={panelRef} aria-label="作品预览">
      {kind === 'patterns' && (
        <div className="source-choice">
          <Choice
            label="选择来源 Demo"
            options={[...new Set(entry.sources.map((item) => item.caseId))].map(
              (id) => ({
                value: id,
                label: catalog.cases.find((item) => item.id === id).title,
              }),
            )}
            value={source.caseId}
            onValueChange={onSourceChange}
          />
        </div>
      )}
      {kind === 'materials' &&
        !['arc-ui', 'animejs'].includes(entry.id) &&
        entry.demos?.length > 0 && (
          <div className="source-choice">
            <Choice
              label="当前样例"
              options={entry.demos.map((item) => ({
                value: item.id,
                label: item.title,
              }))}
              value={example?.id || entry.demos[0].id}
              onValueChange={(id) =>
                setExample(entry.demos.find((item) => item.id === id))
              }
            />
          </div>
        )}
      <div className="preview-toolbar">
        <SegmentedControl
          label="预览尺寸"
          options={[
            { value: 'desktop', label: '适应面板' },
            { value: 'wide', label: '桌面 1440px' },
            { value: 'mobile', label: '手机 390px' },
          ]}
          value={mode}
          onValueChange={setMode}
        />
        <div className="preview-actions">
          {kind === 'patterns' && (
            <IconAction
              label="定位当前巧思"
              disabled={!located}
              onClick={() => {
                if (source.focus.viewport) setMode(source.focus.viewport);
                if (
                  source.focus.phase === 'loading' ||
                  !focusRuntime.current.isSourcePage()
                )
                  setRevision(revision + 1);
                else focusRuntime.current.locate();
              }}
            >
              <Crosshair size={17} />
            </IconAction>
          )}
          <IconAction label="重播" onClick={() => setRevision(revision + 1)}>
            <RotateCcw size={17} />
          </IconAction>
          <ActionLink href={currentDemo} target="_blank" rel="noreferrer">
            <ExternalLink size={16} />
            独立打开
          </ActionLink>
        </div>
      </div>
      <div
        className="preview-viewport"
        ref={viewportRef}
        style={{ height: dimensions.height }}
      >
        <div className="preview-frame-host" ref={frameHost} style={frameStyle}>
          {kind !== 'patterns' && (
            <iframe
              key={currentDemo + revision}
              className="demo-frame"
              title={`${entry.title}交互 Demo`}
              src={currentDemo}
              allow="autoplay; fullscreen"
            />
          )}
        </div>
      </div>
      {kind === 'cases' && entry.referencePreview && (
        <div className="source-comparison">
          <Accordion
            defaultOpen={-1}
            items={[
              {
                title: '展开原站与本地画面对照',
                content: (
                  <div className="source-comparison-images">
                    <figure>
                      <img
                        src={entry.referencePreview}
                        alt={`${entry.title}原始参考`}
                      />
                      <figcaption>
                        {entry.referencePreviewNote || '原始参考'}
                      </figcaption>
                    </figure>
                    <figure>
                      <img src={entry.preview} alt={`${entry.title}本地复现`} />
                      <figcaption>本地复现</figcaption>
                    </figure>
                  </div>
                ),
              },
            ]}
          />
        </div>
      )}
      {kind === 'materials' && entry.install && (
        <NoteSection title="安装与取材">
          <CodeBlock code={entry.install} language="text" />
        </NoteSection>
      )}
    </section>
  );
}
export function WebDetail({ kind, entry, listHref, onCompare }) {
  const rootRef = useRef(null);
  const actionsRef = useRef(null);
  const notesRef = useRef(null);
  const [sourceId, setSourceId] = useState(() => {
    if (kind !== 'patterns') return null;
    const requested = new URLSearchParams(
      location.hash.split('?')[1] || '',
    ).get('source');
    return entry.sources.some((item) => item.caseId === requested)
      ? requested
      : entry.sources[0].caseId;
  });
  const [toc, setToc] = useState([]);
  const [currentHeading, setCurrentHeading] = useState(null);
  const source =
    kind === 'patterns'
      ? entry.sources.find((item) => item.caseId === sourceId)
      : null;
  const prompt =
    entry.prompt +
    (kind === 'cases' ? '\n\n负面约束：' + entry.negativePrompt : '');
  const bundle = `agent/${kind}/${entry.id}.json`;
  const secondaryActions = [
    ...(kind === 'cases' && entry.referenceUrl
      ? [{ label: '对照原站', href: entry.referenceUrl, target: '_blank' }]
      : []),
    ...(kind === 'cases'
      ? [{ label: 'Agent 取材', href: `agent.html#${entry.id}` }]
      : []),
    {
      label:
        '下载' +
        (kind === 'cases'
          ? '完整案例包'
          : kind === 'patterns'
            ? 'Agent 巧思包'
            : 'Agent 素材包'),
      href: bundle,
      download: true,
    },
    ...(onCompare ? [{ label: '比较案例', onSelect: onCompare }] : []),
  ];
  useLayoutEffect(() => {
    const root = rootRef.current;
    const preview = root.querySelector('.demo-panel');
    const notes = notesRef.current;
    const measure = () => {
      const top =
        document.querySelector('.site-header').offsetHeight +
        actionsRef.current.offsetHeight +
        24;
      const available = innerHeight - top;
      const previewHeight = preview.offsetHeight;
      const notesHeight = notes.offsetHeight;
      root.style.setProperty(
        '--detail-sticky-top',
        `calc(var(--atlas-visible-header) + ${actionsRef.current.offsetHeight + 24}px)`,
      );
      preview.classList.toggle(
        'detail-sticky',
        innerWidth >= 1160 && previewHeight <= available,
      );
      notes.classList.toggle(
        'detail-sticky',
        innerWidth >= 1160 &&
          previewHeight > notesHeight &&
          notesHeight <= available,
      );
    };
    const observer = new ResizeObserver(measure);
    [actionsRef.current, preview, notes].forEach((node) =>
      observer.observe(node),
    );
    window.addEventListener('resize', measure);
    measure();
    return () => {
      observer.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, []);
  useEffect(() => {
    const headings = [...notesRef.current.querySelectorAll('h1,h2')];
    setToc(
      headings.map((heading) => ({
        id: heading.id,
        title: heading.textContent,
      })),
    );
    let animation;
    const update = () => {
      cancelAnimationFrame(animation);
      animation = requestAnimationFrame(() => {
        const offset =
          document.querySelector('.site-header').offsetHeight +
          actionsRef.current.offsetHeight +
          32;
        const active =
          headings.findLast(
            (heading) => heading.getBoundingClientRect().top <= offset,
          ) || headings[0];
        setCurrentHeading(active.id);
      });
    };
    window.addEventListener('scroll', update, { passive: true });
    update();
    return () => {
      window.removeEventListener('scroll', update);
      cancelAnimationFrame(animation);
    };
  }, [entry, kind]);
  function selectSource(id) {
    setSourceId(id);
    const [route, query] = location.hash.slice(1).split('?');
    const params = new URLSearchParams(query);
    params.set('source', id);
    history.replaceState(
      history.state,
      '',
      location.pathname + location.search + '#' + route + '?' + params,
    );
  }
  function back(event) {
    if (event.metaKey || event.ctrlKey || event.shiftKey) return;
    event.preventDefault();
    if (history.state?.depth) history.go(-history.state.depth);
    else navigate(listHref);
  }
  return (
    <article className="detail-page" key={entry.id} ref={rootRef}>
      <div className="detail-actions" ref={actionsRef}>
        <ActionLink href={listHref} onClick={back}>
          返回{names[kind]}
        </ActionLink>
        <div>
          <FavoriteAction kind={kind} entry={entry} />
          <div className="detail-secondary">
            {secondaryActions.map((action) =>
              action.href ? (
                <ActionLink
                  key={action.label}
                  href={action.href}
                  target={action.target}
                  download={action.download}
                  rel={action.target ? 'noreferrer' : void 0}
                >
                  {action.label}
                </ActionLink>
              ) : (
                <Button
                  key={action.label}
                  variant="secondary"
                  onClick={action.onSelect}
                >
                  {action.label}
                </Button>
              ),
            )}
          </div>
          <div className="detail-more">
            <DropdownMenu label="更多" items={secondaryActions} />
          </div>
          <CopyButton value={prompt} label="复制 Prompt" variant="filled" />
        </div>
      </div>
      <div className="detail-columns">
        <PreviewPanel
          key={entry.id}
          kind={kind}
          entry={entry}
          source={source}
          onSourceChange={selectSource}
          actionsRef={actionsRef}
        />
        <div className="detail-notes" ref={notesRef}>
          <header className="detail-heading">
            <p className="eyebrow">
              {kind === 'cases'
                ? entry.category
                : kind === 'patterns'
                  ? `${entry.category} / ${roleLabels[entry.composition.role]}`
                  : entry.category}
            </p>
            <h1 id={noteId(entry.title)}>{entry.title}</h1>
            <p>{entry.summary}</p>
            <div className="entry-tags">
              {(entry.tags || []).map((tag) => (
                <span className="entry-tag" key={tag}>
                  {tag}
                </span>
              ))}
            </div>
          </header>
          {kind === 'cases' ? (
            <CaseNotes entry={entry} />
          ) : kind === 'patterns' ? (
            <PatternNotes entry={entry} source={source} />
          ) : (
            <MaterialNotes entry={entry} />
          )}
        </div>
      </div>
      <nav className="floating-detail-toc" aria-label="详情目录">
        {toc.map((heading) => (
          <Tooltip key={heading.id} content={heading.title} side="left">
            <Button
              variant="ghost"
              className="toc-marker"
              aria-label={heading.title}
              aria-current={currentHeading === heading.id ? 'location' : void 0}
              onClick={() => {
                const node = document.getElementById(heading.id);
                window.scrollTo({
                  top:
                    scrollY +
                    node.getBoundingClientRect().top -
                    Math.max(
                      0,
                      document
                        .querySelector('.site-header')
                        .getBoundingClientRect().bottom,
                    ) -
                    actionsRef.current.offsetHeight -
                    24,
                  behavior: matchMedia('(prefers-reduced-motion:reduce)')
                    .matches
                    ? 'instant'
                    : 'smooth',
                });
              }}
            >
              <Minus size={22} />
            </Button>
          </Tooltip>
        ))}
      </nav>
    </article>
  );
}
