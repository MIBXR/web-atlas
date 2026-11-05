import { ActionLink } from './actions';
import { NoteList, Palette, ThemeBehavior } from './WebDetail';
import { navigate } from '../state/location';
export function Comparison({ entries, listHref }) {
  function back(event) {
    if (event.button || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    if (history.state?.depth) history.go(-history.state.depth);
    else navigate(listHref);
  }
  function openEntry(event) {
    if (event.button || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    navigate(event.currentTarget.href, { state: { depth: (history.state?.depth || 0) + 1 } });
  }
  const sections = [
    ['summary', '案例概览', (entry) => <p>{entry.summary}</p>],
    ['focus', '信息焦点', (entry) => <p>{entry.productFocus}</p>],
    [
      'mechanism',
      '设计机制',
      (entry) => <NoteList values={entry.principles} />,
    ],
    [
      'interaction',
      '页面交互',
      (entry) => (
        <>
          <NoteList values={entry.interaction} />
          <ThemeBehavior entry={entry} />
        </>
      ),
    ],
    [
      'theme',
      '主题与配色',
      (entry) => (
        <>
          <p>{entry.theme}</p>
          <Palette entry={entry} />
        </>
      ),
    ],
    [
      'composition',
      '要素协调',
      (entry) => <p>{entry.composition?.coherence}</p>,
    ],
    [
      'constraints',
      '硬约束',
      (entry) => <NoteList values={entry.constraints} />,
    ],
    ['use', '适用场景', (entry) => <p>{entry.useCases.join(' / ')}</p>],
    ['avoid', '谨慎使用', (entry) => <p>{entry.avoid.join(' / ')}</p>],
    [
      'materials',
      '操作与取材',
      (entry) => (
        <div className="comparison-actions">
          <ActionLink href={`agent.html#${entry.id}`}>Agent 取材</ActionLink>
          <ActionLink href={`agent/cases/${entry.id}.json`} download>
            下载完整案例包
          </ActionLink>
          <ActionLink href={entry.demo} target="_blank" rel="noreferrer">
            操作 Demo
          </ActionLink>
        </div>
      ),
    ],
  ];
  return (
    <section className="comparison-page">
      <div className="detail-actions">
        <ActionLink href={listHref} onClick={back}>返回案例库</ActionLink>
        <ActionLink href={listHref} onClick={back}>调整选择</ActionLink>
      </div>
      <h1>看见风格之间的差异。</h1>
      <p className="comparison-intro">
        比较信息层级、交互目的与设计约束，再选择适合项目的设计语言。各案例的对应章节排在同一行，内容完整保留。
      </p>
      {entries.length < 2 ? (
        <p>请先在案例库选择 2–3 个条目。</p>
      ) : (
        <>
          <p className="support-text">窄屏可左右滑动查看对应章节。</p>
          <div
            className="comparison-scroll"
            role="region"
            aria-label="案例逐节比较"
            tabIndex={0}
          >
            <table className="comparison-table">
              <caption>
                {entries.map((entry) => entry.title).join(' · ')} / 逐节对照
              </caption>
              <thead>
                <tr>
                  <th scope="col">比较维度</th>
                  {entries.map((entry) => (
                    <th scope="col" key={entry.id}>
                    <a href={`${listHref}#style/${entry.id}`} onClick={openEntry}>
                        <img src={entry.preview} alt={`${entry.title} Demo`} />
                        <h2>{entry.title}</h2>
                      </a>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {sections.map(([id, title, render]) => (
                  <tr key={id}>
                    <th scope="row">{title}</th>
                    {entries.map((entry) => (
                      <td key={entry.id}>{render(entry)}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </section>
  );
}
