import { useEffect, useMemo, useState } from 'react';
import { CodeBlock, CopyButton, SearchField } from '../components/ui';
import { ActionLink } from '../components/actions';
import { Shell } from '../components/Shell';
import '../styles/agent.css';
const skillExample = `$web-atlas 我还没决定网站的设计方向，先介绍有哪些案例。
接下来根据我的产品、用户和页面任务，和我一起筛选几个候选。
确定方向后，自动读取完整说明、文档和源码，再完成实现。
也可以单独探索设计巧思：给我一个清晰的页面基础，
再选择来自不同案例的悬停反馈和滚动叙事，说明各自职责与组合约束。`;
const cliExample = `node scripts/atlas.mjs search "深色 产品" --limit 3
node scripts/atlas.mjs show linear-workflow
node scripts/atlas.mjs show linear-workflow --source
node scripts/atlas.mjs export linear-workflow --out ../linear-reference`;
const materialExample = `python ATLAS_SCRIPT --session SESSION_FILE material-search "渐变"
python ATLAS_SCRIPT --session SESSION_FILE material-show shaders --source
python ATLAS_SCRIPT --session SESSION_FILE material-export shaders --out NEW_DIRECTORY`;
function agentEntry(entry, catalog) {
  const source = catalog.source;
  const url = new URL(entry.paths.bundle, source?.baseUrl || location.href)
    .href;
  const hint = source
    ? `原始文件基址：${source.baseUrl}
对 files 中每个 path 使用这个基址获取原始文件；网页播放文件经过部署转换。此入口对应当前网页发布版本：${source.commit}。若要探索上游最新案例，请调用 web-atlas skill 开始新会话。`
    : '通过 web-atlas skill 开始会话，解析上游最新完整提交 SHA，并用本次会话的同一提交读取原始文件。';
  return `请读取 Web Atlas 案例 ${entry.id} 的完整上下文：
${url}
先结合我的真实需求阅读 entry、webNotes（网页右侧说明）和 documents，再按 files 取用源码。保留原始约束、来源和复现边界。
${hint}`;
}
export default function AgentPage() {
  const [catalog, setCatalog] = useState(null);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState('');
  useEffect(() => {
    const request = new AbortController();
    fetch('agent/catalog.json', { signal: request.signal })
      .then((response) => {
        if (!response.ok) throw new Error('HTTP ' + response.status);
        return response.json();
      })
      .then((data) => {
        if (data.schemaVersion !== 1 || !Array.isArray(data.entries))
          throw new Error('不支持的索引版本');
        setCatalog(data);
        const selected = decodeURIComponent(location.hash.slice(1));
        if (data.entries.some((entry) => entry.id === selected))
          setQuery(selected);
      })
      .catch((error2) => {
        if (!request.signal.aborted) setError(error2.message);
      });
    return () => request.abort();
  }, []);
  const results = useMemo(() => {
    const terms = query.trim().toLowerCase().split(/\s+/).filter(Boolean);
    return (
      catalog?.entries.filter((entry) =>
        terms.every((term) =>
          JSON.stringify(entry).toLowerCase().includes(term),
        ),
      ) || []
    );
  }, [catalog, query]);
  return (
    <Shell page="agent" className="agent-page">
      <div className="agent-content">
        <header className="page-heading">
          <p className="eyebrow">DESIGN WITH CONTEXT</p>
          <h1>
            把设计依据，
            <br />
            直接交给 Agent<span>.</span>
          </h1>
          <p>
            先探索案例与巧思，再根据真实需求选方向。每个案例提供完整说明、Prompt、文档和源码入口。
          </p>
          <p className="agent-stats">
            {catalog?.entryCount ?? '—'} 个案例 ·{' '}
            {catalog?.patterns?.patternCount ?? '—'} 个设计巧思 ·
            结构化资料与完整取材
          </p>
        </header>
        <section className="agent-section">
          <div className="agent-introduction">
            <p className="eyebrow">01 / EXPLORE</p>
            <h2>先探索，再围绕需求选方向</h2>
          </div>
          <div>
            <p>
              使用配套的 Web Atlas
              skill，先描述产品、用户和页面任务，再一起筛选案例与巧思。确定方向后，读取同一版本的完整材料。
            </p>
            <p>
              <ActionLink
                href="https://github.com/MIBXR/mibxr-skills/tree/main/skills/web-atlas"
                target="_blank"
                rel="noreferrer"
              >
                取得 Web Atlas skill
              </ActionLink>
            </p>
            <CodeBlock code={skillExample} language="text" />
          </div>
        </section>
        <section className="agent-section">
          <div className="agent-introduction">
            <p className="eyebrow">DESIGN PATTERNS</p>
            <h2>按机制取材，跨案例组合</h2>
          </div>
          <div>
            <p>
              按视觉、微动效、页面动效、声音、内容与组织筛选可独立迁移的机制；还可结合功能用途和来源案例继续筛选。每条巧思保留触发、效果、约束和来源。
            </p>
            <p>
              skill 的 <code>pattern-search</code>、<code>pattern-show</code> 与{' '}
              <code>pattern-export</code>{' '}
              使用同一会话版本。先分配基础、辅助和强调的职责，再检查动效与输入冲突。
            </p>
            <div className="agent-inline-actions">
              <ActionLink href="patterns.html">浏览设计巧思</ActionLink>
              <ActionLink href="agent/patterns/index.json">
                查看巧思索引 JSON
              </ActionLink>
            </div>
          </div>
        </section>
        <section className="agent-retrieval">
          <div className="agent-section-head">
            <div>
              <p className="eyebrow">02 / RETRIEVE</p>
              <h2>探索案例，也可以直接取材</h2>
            </div>
            <ActionLink href="agent/catalog.json">
              查看结构化索引 JSON
            </ActionLink>
          </div>
          <p>
            搜索品牌、布局、场景或交互关键词。“案例包”是 JSON
            文件，包含完整设计资料、网页右侧说明、文档原文，以及源码和媒体的文件路径。已经选好案例时，可以直接复制入口。
          </p>
          <SearchField
            label="搜索 Agent 案例"
            placeholder="试试 Linear、网格、产品、手绘…"
            value={query}
            onValueChange={setQuery}
          />
          <p role="status" className="agent-status">
            {error
              ? `索引加载失败：${error}。请刷新重试，或从 GitHub 仓库读取。`
              : catalog
                ? `${results.length} / ${catalog.entryCount} 个案例 · 关键词筛选`
                : '正在读取案例索引…'}
          </p>
          <div className="agent-cases">
            {results.map((entry) => (
              <article key={entry.id} className="agent-entry">
                <small>
                  {entry.category} · {entry.country || '未确认'}
                </small>
                <h3>{entry.title}</h3>
                <p>{entry.summary}</p>
                <code>{entry.id}</code>
                <div className="agent-inline-actions">
                  <ActionLink href={`cases.html#style/${entry.id}`}>
                    预览案例
                  </ActionLink>
                  <ActionLink
                    href={entry.paths.bundle}
                    download={`${entry.id}-context.json`}
                  >
                    下载案例包 JSON
                  </ActionLink>
                  <CopyButton
                    value={agentEntry(entry, catalog)}
                    label="复制 Agent 入口"
                  />
                </div>
              </article>
            ))}
          </div>
        </section>
        <section className="agent-section">
          <div className="agent-introduction">
            <p className="eyebrow">03 / LOCAL WORKFLOW</p>
            <h2>仓库里也能直接运行</h2>
          </div>
          <div>
            <p>
              使用 Node.js 即可运行，无需安装依赖。完整导出保留
              Demo、共用模块、字体和媒体的相对路径；大型品牌案例可能包含影片。
            </p>
            <p>
              <ActionLink href="docs.html?file=docs%2Fagent.md">
                读取完整工作流与数据契约
              </ActionLink>
            </p>
            <CodeBlock code={cliExample} language="shell" />
          </div>
        </section>
        <section className="agent-context">
          <p className="eyebrow">DESIGN WITH CONTEXT</p>
          <h2>带着依据适配你的场景</h2>
          <div>
            <p>
              <strong>保留设计机制</strong>
              <br />
              读取布局、视觉层级、状态和触发关系，选择能说明当前产品的表达方式。
            </p>
            <p>
              <strong>替换真实内容</strong>
              <br />
              用自己的品牌、文案和有使用权的素材，依据真实功能调整交互。
            </p>
            <p>
              <strong>验证当前成果</strong>
              <br />
              检查桌面与手机、键盘、减少动态和资源加载，保留来源中近似与未验证的标记。
            </p>
          </div>
        </section>
        <section className="agent-materials">
          <h2>取得组件与内容素材</h2>
          <p>
            在<a href="materials.html">素材库</a>操作代表性样例，再让 Skill
            读取使用说明、版本、许可证与完整
            Demo。案例、巧思和素材共用同一取材会话。
          </p>
          <CodeBlock code={materialExample} language="shell" />
          <p>
            直接读取<a href="agent/materials/index.json">素材目录</a>，或
            <a href="agent/materials/shaders.json">下载 Shaders 资料包</a>
            。更多组件与作者预设请到来源查看；浏览器不支持 WebGPU 时，Demo
            显示明确标注的静态参考。
          </p>
        </section>
        <p className="agent-version">
          {catalog?.source?.commit
            ? `GIT ${catalog.source.commit.slice(0, 12)} / SCHEMA 1`
            : 'SOURCE-BACKED / SCHEMA 1'}
        </p>
      </div>
    </Shell>
  );
}
