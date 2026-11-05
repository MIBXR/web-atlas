import { useEffect, useRef, useState } from 'react';
import {
  ArrowDown,
  ArrowUp,
  Columns2,
  Download,
  Filter,
  Upload,
  X,
} from 'lucide-react';
import catalog from 'atlas:catalog';
import {
  Accordion,
  Button,
  Checkbox,
  Dialog,
  DialogContent,
  DialogTrigger,
  SearchField,
  useToastStack,
} from '../components/ui';
import { Choice, FavoriteAction, IconAction } from '../components/actions';
import { Shell } from '../components/Shell';
import { useLocation, navigate } from '../state/location';
import { usePreferences } from '../state/preferences';
import { WebDetail } from '../components/WebDetail';
import { Comparison } from '../components/Comparison';
import { PatternPlayground } from '../components/PatternPlayground';
import '../styles/library.css';
export const experienceLabels = {
  visual: '视觉构成',
  'micro-motion': '微动效',
  'page-motion': '页面动效',
  sound: '声音巧思',
  structure: '内容与组织',
};
export const materialLabels = {
  'component-library': '组件库',
  'agent-skill': 'Agent Skill',
  'prompt-kit': '提示词套件',
  image: '图像',
  sound: '声音',
  font: '字体',
  poster: '海报',
};
const caseCategories = {
  products: '产品',
  games: '游戏/IP',
  classics: '经典风格',
  showcases: '示范作品',
  culture: '艺术/文化',
};
const categoryLabels = {
  all: '全部风格',
  products: '产品与平台',
  games: '游戏与 IP',
  classics: '经典设计语言',
  showcases: '示范作品',
  culture: '艺术与文化',
};
const libraryLabels = {
  cases: '案例库',
  patterns: '巧思库',
  materials: '素材库',
};
const detailPrefixes = {
  cases: 'style',
  patterns: 'pattern',
  materials: 'material',
};
const unique = (values) => [...new Set(values)].filter(Boolean);
const choices = (values, labels = {}) =>
  values.map((value) => ({ value, label: labels[value] || value }));
function readRoute(url, kind) {
  const hash = decodeURIComponent(url.hash.slice(1));
  const [route, query = ''] = hash.split('?');
  const params =
    kind === 'cases' ? url.searchParams : new URLSearchParams(query);
  const id = route.startsWith(detailPrefixes[kind] + '/')
    ? route.slice(detailPrefixes[kind].length + 1)
    : null;
  return { id, compare: kind === 'cases' && route === 'compare', params };
}
function collectionHref(kind, params, id = null) {
  const query = params.toString();
  if (kind === 'cases')
    return (
      'cases.html' +
      (query ? '?' + query : '') +
      (id ? '#style/' + encodeURIComponent(id) : '')
    );
  return (
    kind +
    '.html#' +
    (id ? detailPrefixes[kind] + '/' + encodeURIComponent(id) : kind) +
    (query ? '?' + query : '')
  );
}
function Hero({ kind }) {
  const copy = {
    cases: {
      eyebrow: 'OBSERVE. UNDERSTAND. MAKE.',
      title: (
        <>
          从看见风格，
          <br />
          到掌握它的语言<span>.</span>
        </>
      ),
      description:
        '真实网站的设计拆解：设计约束、可复用的 Prompt 和可操作的本地 Demo。',
    },
    patterns: {
      eyebrow: 'OBSERVE. COMPOSE. MAKE.',
      title: (
        <>
          从一个巧思，
          <br />
          到自己的设计<span>.</span>
        </>
      ),
      description:
        '了解可组合的设计机制，查看触发方式、实现约束与可复用的 Prompt，也可回到来源案例看整体效果。',
    },
    materials: {
      eyebrow: 'DISCOVER. TRY. ADAPT.',
      title: (
        <>
          好用的素材，
          <br />
          先亲手试一试<span>.</span>
        </>
      ),
      description: '有来源的素材：可操作的样例、适用场景与使用边界。',
    },
  }[kind];
  return (
    <section className={`library-hero hero-${kind}`}>
      <div>
        <p className="eyebrow">{copy.eyebrow}</p>
        <h1>{copy.title}</h1>
        <p className="hero-description">{copy.description}</p>
      </div>
      <div className="library-geometry" aria-hidden="true">
        <div className="geometry-grid" />
        <svg viewBox="0 0 270 195">
          <circle cx="185" cy="77" r="64" fill="var(--atlas-muted)" />
          <path
            d={
              kind === 'patterns' ? 'M39 164h126L165 38Z' : 'M39 164h126L39 38Z'
            }
            fill="var(--atlas-ink)"
          />
          <path
            d="M39 164 185 77 249 77"
            fill="none"
            stroke="var(--atlas-line)"
          />
        </svg>
        <small>
          A STUDY OF FORM
          <br />
          AND FUNCTION
        </small>
      </div>
    </section>
  );
}
function DirectoryItem({ label, count, icon, ...props }) {
  return (
    <div className="directory-item">
      <Button
        variant="ghost"
        {...props}
        aria-label={count === void 0 ? label : `${label} ${count}`}
      >
        {label}
      </Button>
      <span className="directory-item-end" aria-hidden="true">
        {icon ||
          (count === void 0 ? null : (
            <b className="directory-count">{String(count).padStart(2, '0')}</b>
          ))}
      </span>
    </div>
  );
}
function Sidebar({ kind, params, update }) {
  const { favorites, exportFavorites, importFavorites } = usePreferences();
  const { toast } = useToastStack();
  const fileInput = useRef(null);
  const values =
    kind === 'cases'
      ? ['all', ...Object.keys(caseCategories)]
      : kind === 'patterns'
        ? ['all', ...unique(catalog.patterns.map((entry) => entry.category))]
        : ['all', ...unique(catalog.materials.map((entry) => entry.type))];
  const field = kind === 'materials' ? 'type' : 'category';
  const selected = params.get(field) || 'all';
  const favoriteMode =
    kind === 'cases'
      ? selected === 'favorites'
      : params.get('favorites') === '1';
  function select(value) {
    update({
      [field]: value === 'all' ? null : value,
      favorites: null,
      ...(kind === 'cases' ? { type: null } : {}),
    });
  }
  function count(value) {
    return catalog[kind].filter(
      (entry) =>
        value === 'all' ||
        (kind === 'cases'
          ? entry.category === caseCategories[value]
          : entry[field] === value),
    ).length;
  }
  const categories = (
    <div className="directory-items">
      {values.map((value) => (
        <DirectoryItem
          key={value}
          label={
            kind === 'cases'
              ? categoryLabels[value]
              : value === 'all'
                ? '全部类型'
                : materialLabels[value] || value
          }
          count={count(value)}
          data-close-directory
          aria-pressed={!favoriteMode && selected === value}
          onClick={() => select(value)}
        />
      ))}
    </div>
  );
  const tools = (
    <div className="directory-items">
      <DirectoryItem
        label="我的收藏"
        count={favorites[kind].length}
        data-close-directory
        aria-pressed={favoriteMode}
        onClick={() =>
          update(
            kind === 'cases'
              ? { category: 'favorites', type: null }
              : { favorites: '1', [field]: null },
          )
        }
      />
      <DirectoryItem
        label="导出收藏"
        icon={<Download size={15} />}
        onClick={exportFavorites}
      />
      <DirectoryItem
        label="导入收藏"
        icon={<Upload size={15} />}
        onClick={() => fileInput.current.click()}
      />
    </div>
  );
  return (
    <>
      <section className="directory-group">
        <Accordion
          items={[
            {
              title:
                kind === 'cases'
                  ? '案例分类'
                  : kind === 'patterns'
                    ? '巧思分类'
                    : '素材分类',
              content: categories,
            },
          ]}
        />
      </section>
      <section className="directory-group">
        <Accordion items={[{ title: '收藏', content: tools }]} />
        <input
          hidden
          ref={fileInput}
          type="file"
          accept="application/json"
          aria-label="导入收藏文件"
          onChange={async (event) => {
            const file = event.target.files[0];
            if (!file) return;
            try {
              await importFavorites(file);
            } catch (error) {
              toast({ title: error.message, type: 'error' });
            }
            event.target.value = '';
          }}
        />
      </section>
    </>
  );
}
function EntryCard({ kind, entry, href, onOpen, selected, onCompare }) {
  const subtitle =
    kind === 'cases'
      ? entry.subtitle
      : kind === 'patterns'
        ? entry.category
        : entry.upstream?.repository || '内容素材';
  const tags =
    kind === 'cases'
      ? [
          entry.country,
          ...entry.tags.filter((tag) => tag !== entry.country).slice(0, 2),
        ]
      : kind === 'patterns'
        ? (entry.experienceTypes || []).map((type) => experienceLabels[type])
        : [materialLabels[entry.type], entry.category];
  return (
    <article className="entry-card">
      <a
        className="entry-preview"
        href={href}
        onClick={onOpen}
        aria-label={`查看${entry.title}`}
      >
        <img src={entry.preview} alt={`${entry.title}预览`} loading="lazy" />
      </a>
      <div className="entry-card-body">
        <div className="entry-card-title">
          <h2>
            <a href={href} onClick={onOpen}>
              {entry.title}
            </a>
          </h2>
          <FavoriteAction kind={kind} entry={entry} />
        </div>
        <p className="entry-summary">{entry.summary}</p>
        <p className="entry-subtitle">{subtitle}</p>
        <div className="entry-tags">
          {tags.filter(Boolean).map((tag, index) => (
            <span className="entry-tag" key={tag + index}>
              {tag}
            </span>
          ))}
        </div>
        <div className="entry-card-actions">
          {kind === 'cases' ? (
            <Checkbox
              label="加入比较"
              checked={selected}
              onCheckedChange={onCompare}
              aria-label={`比较${entry.title}`}
            />
          ) : (
            <span>{kind === 'patterns' ? '来源与机制' : '来源与许可'}</span>
          )}
          <a href={href} onClick={onOpen}>
            {kind === 'cases' ? '拆解 & demo' : '查看详情'}
          </a>
        </div>
      </div>
    </article>
  );
}
export default function CatalogPage({ kind }) {
  const url = useLocation();
  const { id, params, compare } = readRoute(url, kind);
  const { favorites } = usePreferences();
  const { toast } = useToastStack();
  const [selected, setSelected] = useState([]);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [showcaseOpen, setShowcaseOpen] = useState(false);
  const searchRef = useRef(null);
  const previousId = useRef(null);
  const query = params.get('q') || '';
  const category = params.get('category') || 'all';
  const type = params.get('type') || 'all';
  const favoriteMode =
    kind === 'cases'
      ? category === 'favorites'
      : params.get('favorites') === '1';
  const sort = params.get('sort') || 'curated';
  const direction = params.get('dir') || 'asc';
  const entry = id && catalog[kind].find((item) => item.id === id);
  const listHref = collectionHref(kind, params);
  useEffect(() => {
    history.scrollRestoration = 'manual';
    return () => {
      history.scrollRestoration = 'auto';
    };
  }, []);
  useEffect(() => {
    if (id || compare) window.scrollTo({ top: 0, behavior: 'instant' });
    else if (previousId.current)
      requestAnimationFrame(() =>
        window.scrollTo({
          top: history.state?.listScroll || 0,
          behavior: 'instant',
        }),
      );
    previousId.current = id || compare;
  }, [id, compare]);
  useEffect(() => {
    const keyboard = (event) => {
      if (
        event.key !== '/' ||
        event.target.closest('input,textarea,select,[contenteditable]') ||
        document.querySelector('[role="dialog"]')
      )
        return;
      event.preventDefault();
      if (id || compare) navigate(listHref);
      requestAnimationFrame(() => searchRef.current?.focus());
    };
    window.addEventListener('keydown', keyboard);
    return () => window.removeEventListener('keydown', keyboard);
  }, [id, compare, listHref]);
  useEffect(() => {
    const media = matchMedia('(max-width:800px)');
    const close = () => {
      if (!media.matches) setFiltersOpen(false);
    };
    media.addEventListener('change', close);
    return () => media.removeEventListener('change', close);
  }, []);
  function update(patch, replace = false) {
    const next = new URLSearchParams(params);
    for (const [key, value] of Object.entries(patch))
      value === null || value === '' || value === 'all'
        ? next.delete(key)
        : next.set(key, value);
    navigate(collectionHref(kind, next), { replace });
  }
  function clear() {
    const next = new URLSearchParams();
    if (sort !== 'curated') next.set('sort', sort);
    if (direction !== 'asc') next.set('dir', direction);
    navigate(collectionHref(kind, next));
  }
  function openEntry(event, item) {
    if (
      event.button ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    )
      return;
    event.preventDefault();
    history.replaceState({ ...history.state, listScroll: scrollY }, '');
    navigate(collectionHref(kind, params, item.id), { state: { depth: 1 } });
  }
  function toggleCompare(itemId, checked) {
    if (checked && selected.length === 3) {
      toast({ title: '一次最多比较 3 项，请先取消一个条目。' });
      return;
    }
    setSelected(
      checked
        ? [...selected, itemId]
        : selected.filter((value) => value !== itemId),
    );
  }
  function openComparison() {
    if (selected.length < 2) {
      toast({ title: '请在列表再勾选一个案例。' });
      return;
    }
    history.replaceState({ ...history.state, listScroll: scrollY }, '');
    navigate('cases.html' + url.search + '#compare', { state: { depth: 1 } });
  }
  let results = catalog[kind].filter((item) => {
    if (favoriteMode && !favorites[kind].includes(item.id)) return false;
    if (kind === 'cases') {
      if (
        !favoriteMode &&
        category !== 'all' &&
        item.category !== caseCategories[category]
      )
        return false;
      if (
        favoriteMode &&
        type !== 'all' &&
        item.category !== caseCategories[type]
      )
        return false;
      if (params.get('country') && item.country !== params.get('country'))
        return false;
    } else if (kind === 'patterns') {
      if (category !== 'all' && item.category !== category) return false;
      if (type !== 'all' && !item.experienceTypes?.includes(type)) return false;
      if (
        params.get('source') &&
        !item.sources.some((source) => source.caseId === params.get('source'))
      )
        return false;
    } else {
      if (category !== 'all' && item.category !== category) return false;
      if (type !== 'all' && item.type !== type) return false;
    }
    const haystack =
      kind === 'cases'
        ? JSON.stringify(item).toLowerCase()
        : (kind === 'patterns'
            ? [
                item.title,
                item.category,
                ...(item.experienceTypes || []).map(
                  (type2) => experienceLabels[type2],
                ),
                item.summary,
                item.mechanism,
                item.trigger,
                item.effect,
                ...item.useCases,
                ...item.constraints,
                ...item.sources.map(
                  (source) =>
                    catalog.cases.find((entry2) => entry2.id === source.caseId)
                      .title,
                ),
              ]
            : [
                item.title,
                item.summary,
                item.category,
                ...item.tags,
                ...item.useCases,
                ...(item.workflow || []),
                ...(item.demos || []).map(
                  (demo) => demo.title + ' ' + demo.summary,
                ),
              ]
          )
            .join(' ')
            .toLocaleLowerCase();
    return kind === 'cases'
      ? haystack.includes(query.toLowerCase())
      : query
          .toLocaleLowerCase()
          .split(/\s+/)
          .every((term) => haystack.includes(term));
  });
  if (sort === 'title')
    results.sort((a, b) => a.title.localeCompare(b.title, 'zh-CN'));
  if (direction === 'desc') results = results.toReversed();
  const filters = [];
  if (kind === 'cases') {
    if (favoriteMode)
      filters.push({
        key: 'type',
        label: '收藏分类',
        options: [
          { value: 'all', label: '全部分类' },
          ...Object.keys(caseCategories)
            .filter((value) =>
              catalog.cases.some(
                (item) =>
                  favorites.cases.includes(item.id) &&
                  item.category === caseCategories[value],
              ),
            )
            .map((value) => ({ value, label: categoryLabels[value] })),
        ],
      });
    filters.push({
      key: 'country',
      label: '国家或地区',
      options: [
        { value: 'all', label: '全部地区' },
        ...choices(
          unique(catalog.cases.map((item) => item.country)).sort((a, b) =>
            a.localeCompare(b, 'zh-CN'),
          ),
        ),
      ],
    });
  } else if (kind === 'patterns') {
    filters.push({
      key: 'type',
      label: '体验类型',
      options: [
        { value: 'all', label: '全部体验类型' },
        ...choices(Object.keys(experienceLabels), experienceLabels),
      ],
    });
    filters.push({
      key: 'source',
      label: '来源案例',
      options: [
        { value: 'all', label: '全部来源' },
        ...catalog.cases
          .filter((item) =>
            catalog.patterns.some((pattern) =>
              pattern.sources.some((source) => source.caseId === item.id),
            ),
          )
          .map((item) => ({ value: item.id, label: item.title })),
      ],
    });
  } else
    filters.push({
      key: 'category',
      label: '功能分类',
      options: [
        { value: 'all', label: '全部分类' },
        ...choices(unique(catalog.materials.map((item) => item.category))),
      ],
    });
  const filterControls = filters.map((filter) => (
    <Choice
      key={filter.key}
      label={filter.label}
      options={filter.options}
      value={params.get(filter.key) || 'all'}
      onValueChange={(value) => update({ [filter.key]: value })}
    />
  ));
  const activeFilters = filters.filter((filter) =>
    params.get(filter.key),
  ).length;
  const hasFilters =
    query ||
    favoriteMode ||
    category !== 'all' ||
    type !== 'all' ||
    activeFilters;
  const directory = <Sidebar kind={kind} params={params} update={update} />;
  return (
    <Shell
      page={kind}
      directory={directory}
      className={`library-page ${kind}-page`}
    >
      {id ? (
        entry ? (
          <WebDetail
            key={entry.id}
            kind={kind}
            entry={entry}
            listHref={listHref}
            onCompare={
              kind === 'cases'
                ? () => {
                    if (!selected.includes(id)) {
                      if (selected.length === 3) {
                        toast({ title: '已选满 3 项，请在列表调整选择。' });
                        return;
                      }
                      setSelected([...selected, id]);
                    }
                    if (selected.length >= (selected.includes(id) ? 2 : 1))
                      navigate('cases.html' + url.search + '#compare');
                    else {
                      navigate(listHref);
                      toast({ title: '已加入当前案例，请再勾选一个案例。' });
                    }
                  }
                : void 0
            }
          />
        ) : (
          <div className="empty-state">
            <h1>没有找到这个条目</h1>
            <a href={listHref}>返回{libraryLabels[kind]}</a>
          </div>
        )
      ) : compare ? (
        <Comparison
          entries={selected.map((itemId) =>
            catalog.cases.find((item) => item.id === itemId),
          )}
          listHref={listHref}
        />
      ) : (
        <>
          <Hero kind={kind} />
          <div className="collection-toolbar">
            <div className="toolbar-search">
              <SearchField
                ref={searchRef}
                label={`搜索${libraryLabels[kind]}`}
                placeholder={
                  kind === 'cases'
                    ? '搜索风格、案例、交互或约束…'
                    : '搜索名称、机制、标签或用途…'
                }
                value={query}
                onValueChange={(value) => update({ q: value }, true)}
              />
            </div>
            <div className="desktop-filters">{filterControls}</div>
            <div className="mobile-filter-trigger">
              <Dialog open={filtersOpen} onOpenChange={setFiltersOpen}>
                <DialogTrigger asChild>
                  <Button variant="secondary">
                    <Filter size={16} />
                    筛选{activeFilters ? ' · ' + activeFilters : ''}
                  </Button>
                </DialogTrigger>
                <DialogContent title="筛选" className="filter-dialog">
                  <div className="filter-dialog-fields">{filterControls}</div>
                  <div className="filter-dialog-actions">
                    <Button variant="ghost" onClick={clear}>
                      清除
                    </Button>
                    <Button onClick={() => setFiltersOpen(false)}>完成</Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
            <div className="sort-control">
              <Choice
                label="排序方式"
                options={[
                  { value: 'curated', label: '按编号' },
                  { value: 'title', label: '按名称' },
                ]}
                value={sort}
                onValueChange={(value) =>
                  update({ sort: value === 'curated' ? null : value })
                }
              />
            </div>
            <div className="toolbar-button">
              <IconAction
                label={direction === 'asc' ? '正序' : '反序'}
                aria-pressed={direction === 'desc'}
                onClick={() =>
                  update({ dir: direction === 'asc' ? 'desc' : null })
                }
              >
                {direction === 'asc' ? (
                  <ArrowUp size={17} />
                ) : (
                  <ArrowDown size={17} />
                )}
              </IconAction>
            </div>
            {kind === 'cases' && (
              <div className="toolbar-button">
                <Button
                  variant="secondary"
                  onClick={openComparison}
                  aria-label="比较案例"
                >
                  <Columns2 size={17} />
                  比较 {selected.length}/3
                </Button>
              </div>
            )}
            {kind === 'patterns' && (
              <div className="toolbar-button">
                <Dialog open={showcaseOpen} onOpenChange={setShowcaseOpen}>
                  <DialogTrigger asChild>
                    <Button variant="secondary">
                      体验{experienceLabels[type] || '视觉构成'}
                    </Button>
                  </DialogTrigger>
                  <DialogContent
                    title={
                      '体验示意 · ' + (experienceLabels[type] || '视觉构成')
                    }
                    description="示意使用通用内容；请在来源案例中核对原始样式与组合。"
                  >
                    <PatternPlayground
                      type={type === 'all' ? 'visual' : type}
                      active={showcaseOpen}
                    />
                  </DialogContent>
                </Dialog>
              </div>
            )}
          </div>
          <div className="collection-caption">
            <span role="status">
              {favoriteMode
                ? '我的收藏'
                : kind === 'cases'
                  ? categoryLabels[category] || '全部风格'
                  : '当前筛选'}{' '}
              / {results.length} 个条目
            </span>
            {hasFilters ? (
              <Button variant="ghost" size="sm" onClick={clear}>
                清除筛选
              </Button>
            ) : (
              <span>
                {kind === 'cases'
                  ? '每一种风格，都有来处'
                  : kind === 'patterns'
                    ? '从来源中理解机制'
                    : '先试用，再取材'}
              </span>
            )}
          </div>
          {results.length ? (
            <div className="entry-grid">
              {results.map((item) => (
                <EntryCard
                  key={item.id}
                  kind={kind}
                  entry={item}
                  href={collectionHref(kind, params, item.id)}
                  onOpen={(event) => openEntry(event, item)}
                  selected={selected.includes(item.id)}
                  onCompare={(checked) => toggleCompare(item.id, checked)}
                />
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <h2>没有匹配的条目</h2>
              <p>调整关键词或筛选条件后再试。</p>
              <Button onClick={clear}>清除筛选</Button>
            </div>
          )}
        </>
      )}
      {selected.length > 0 && !compare && (
        <div className="compare-tray">
          <span>
            已选择 {selected.length} 项：
            {selected
              .map(
                (itemId) =>
                  catalog.cases.find((item) => item.id === itemId).title,
              )
              .join(' · ')}
          </span>
          <Button onClick={openComparison} disabled={selected.length < 2}>
            并排比较
          </Button>
          <IconAction label="清空比较" onClick={() => setSelected([])}>
            <X size={17} />
          </IconAction>
        </div>
      )}
    </Shell>
  );
}
