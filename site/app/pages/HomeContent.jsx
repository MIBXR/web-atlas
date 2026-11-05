import { Button, CopyButton, Textarea } from '../components/ui';
import { PatternPlayground } from '../components/PatternPlayground';
import { ExternalLink } from 'lucide-react';
export const agentPrompt =
  '$web-atlas 先为我的产品比较设计方向。\n确认候选，再取完整说明、Prompt 与源码。\n把设计机制适配到我的内容和功能。';
export function HomeContent({ story, counts, activeType, onType }) {
  return (
    <>
      <section className="landing-hero" aria-labelledby="hero-title">
        <p className="landing-kicker">{'OBSERVE. UNDERSTAND. MAKE.'}</p>
        <h1 id="hero-title">
          {'看见设计。理解设计。'}
          <br />
          {'做出'}
          <span>{'你的设计。'}</span>
        </h1>
        <p className="landing-lead">
          {'从完整案例理解风格，从独立巧思学习视觉、动效与声音。'}
          <br className="landing-desktop" />
          {'在素材库试用组件与资源，找到可直接取用的实现。'}
          <br className="landing-desktop" />
          {'亲手操作，再让 Agent 取得来源与源码，把参考用于你的项目。'}
        </p>
        <div className="landing-actions" aria-label="选择你的使用方式">
          <a
            className="landing-button landing-button--primary"
            href="cases.html"
          >
            {'浏览案例'}
          </a>
          <a className="landing-button" href="lab.html">
            {'进入实验室'}
          </a>
          <a className="landing-button" href="agent.html">
            {'探索工作流'}
          </a>
        </div>
        <p className="landing-hero-note">
          <span data-home-count="all">{counts.all}</span>
          {' 个案例 '}
          <span aria-hidden="true">{'·'}</span>
          <span data-home-count="patterns">{counts.patterns}</span>
          {' 个设计巧思 '}
          <span aria-hidden="true">{'·'}</span>
          {' 可运行 Demo '}
          <span aria-hidden="true">{'·'}</span>
          {' 完整取材'}
        </p>
      </section>

      <section
        className="landing-features"
        id="features"
        aria-labelledby="features-title"
      >
        <div className="landing-section-heading">
          <p className="landing-kicker">{'THREE WAYS TO START'}</p>
          <h2 id="features-title">{'灵感，有了下一步。'}</h2>
          <p>{'浏览案例、亲手调配，再带着设计依据开始构建。'}</p>
        </div>
        {story}
      </section>

      <section
        className="home-patterns"
        id="pattern-practice"
        aria-labelledby="home-patterns-title"
      >
        <div className="landing-section-heading">
          <p className="landing-kicker">{'ONE MECHANISM AT A TIME'}</p>
          <h2 id="home-patterns-title">{'拆开一个巧思，亲手看它怎样工作。'}</h2>
          <p>
            {
              '先看它解决什么问题，再判断是否适合你的页面。一个巧思可以跨多个类型，案例也不必包含所有类型。'
            }
          </p>
        </div>
        <div
          className="home-pattern-switch"
          role="group"
          aria-label="选择巧思体验类型"
        >
          <Button
            type="button"
            data-home-pattern="visual"
            aria-controls="home-pattern-visual"
            variant="secondary"
            onClick={() => onType('visual')}
            aria-pressed={activeType === 'visual'}
          >
            {'视觉构成'}
          </Button>
          <Button
            type="button"
            data-home-pattern="micro-motion"
            aria-controls="home-pattern-micro-motion"
            variant="secondary"
            onClick={() => onType('micro-motion')}
            aria-pressed={activeType === 'micro-motion'}
          >
            {'微动效'}
          </Button>
          <Button
            type="button"
            data-home-pattern="page-motion"
            aria-controls="home-pattern-page-motion"
            variant="secondary"
            onClick={() => onType('page-motion')}
            aria-pressed={activeType === 'page-motion'}
          >
            {'页面动效'}
          </Button>
          <Button
            type="button"
            data-home-pattern="sound"
            aria-controls="home-pattern-sound"
            variant="secondary"
            onClick={() => onType('sound')}
            aria-pressed={activeType === 'sound'}
          >
            {'声音'}
          </Button>
        </div>
        <div className="home-pattern-panels">
          <article
            className="home-pattern-panel"
            id="home-pattern-visual"
            hidden={activeType !== 'visual'}
            inert={activeType !== 'visual'}
          >
            <div className="home-pattern-copy">
              <span>{'01 / 视觉构成'}</span>
              <h3>{'第一眼，视线停在哪里？'}</h3>
              <p>
                {
                  '文字强调、颜色角色、容器与几何装饰，用一条构成规则建立重点。改变参数，观察同一内容的层级。'
                }
              </p>
              <a
                className="landing-module-link"
                href="patterns.html#patterns?type=visual"
              >
                {'探索视觉巧思'}
              </a>
            </div>
            <PatternPlayground type="visual" active={activeType === 'visual'} />
          </article>
          <article
            className="home-pattern-panel"
            id="home-pattern-micro-motion"
            hidden={activeType !== 'micro-motion'}
            inert={activeType !== 'micro-motion'}
          >
            <div className="home-pattern-copy">
              <span>{'02 / 微动效'}</span>
              <h3>{'让局部反馈，跟得上操作。'}</h3>
              <p>
                {
                  '悬停、聚焦、按下与复位，帮助确认当前目标和操作结果。移入、点击后再移出，观察反馈如何复位。'
                }
              </p>
              <a
                className="landing-module-link"
                href="patterns.html#patterns?type=micro-motion"
              >
                {'探索微动效'}
              </a>
            </div>
            <PatternPlayground
              type="micro-motion"
              active={activeType === 'micro-motion'}
            />
          </article>
          <article
            className="home-pattern-panel"
            id="home-pattern-page-motion"
            hidden={activeType !== 'page-motion'}
            inert={activeType !== 'page-motion'}
          >
            <div className="home-pattern-copy">
              <span>{'03 / 页面动效'}</span>
              <h3>{'让内容的交接，也有顺序。'}</h3>
              <p>
                {
                  '加载、滚动叙事与章节转场作用于内容主体。操作遮罩切换，再反向返回，观察旧内容退出与新内容进入。'
                }
              </p>
              <a
                className="landing-module-link"
                href="patterns.html#patterns?type=page-motion"
              >
                {'探索页面动效'}
              </a>
            </div>
            <PatternPlayground
              type="page-motion"
              active={activeType === 'page-motion'}
            />
          </article>
          <article
            className="home-pattern-panel"
            id="home-pattern-sound"
            hidden={activeType !== 'sound'}
            inert={activeType !== 'sound'}
          >
            <div className="home-pattern-copy">
              <span>{'04 / 声音'}</span>
              <h3>{'声音，给动作另一条线索。'}</h3>
              <p>
                {
                  '环境音乐建立氛围，操作短音确认动作。这里由你启用合成操作音，体验触发与静音；声音始终是辅助反馈。'
                }
              </p>
              <a
                className="landing-module-link"
                href="patterns.html#patterns?type=sound"
              >
                {'探索声音巧思'}
              </a>
            </div>
            <PatternPlayground type="sound" active={activeType === 'sound'} />
          </article>
        </div>
        <div className="home-pattern-footnote">
          <p>
            {
              '这里的本地机制示意用于理解构成与状态；实际表现和来源证据见巧思及完整案例。'
            }
          </p>
          <a href="patterns.html#patterns?type=structure">
            {'也看看结构与状态巧思'}
          </a>
          <a href="lab.html#pattern-lab">{'进入机制实验'}</a>
        </div>
      </section>

      <section
        className="home-materials"
        aria-labelledby="home-materials-title"
      >
        <div className="landing-section-heading">
          <p className="landing-kicker">{'MATERIALS YOU CAN TRY'}</p>
          <h2 id="home-materials-title">{'把一个效果，放进你的设计。'}</h2>
          <p>
            {
              '素材库从组件与内容资源中选取可亲手试用的样例，保留来源、使用方法和授权边界。'
            }
          </p>
        </div>
        <a
          className="home-material-preview"
          href="materials.html#material/shaders"
        >
          <img
            src="previews/materials/shaders.png"
            alt="Shaders 网格渐变、条纹玻璃、指针波纹和噪声溶解四种样例"
            loading="lazy"
          />
          <div>
            <p className="landing-module-tag">{'组件与效果 / Shaders'}</p>
            <h3>{'四种效果，四个可以操作的起点。'}</h3>
            <p>
              {
                '调整渐变、折射和转场参数，移动指针观察反馈，再取得固定版本源码与适配说明。'
              }
            </p>
            <span className="landing-module-link">{'进入素材库'}</span>
          </div>
        </a>
      </section>

      <section className="landing-paths" aria-labelledby="paths-title">
        <div className="landing-section-heading">
          <p className="landing-kicker">{'DESIGN WITH CONTEXT'}</p>
          <h2 id="paths-title">{'看过之后，继续往前。'}</h2>
          <p>{'三种入口可以独立使用，也可以接成你的设计过程。'}</p>
        </div>
        <ol>
          <li>
            <span>{'01'}</span>
            <h3>{'观察一个案例'}</h3>
            <p>{'看画面与 Demo，找出对你的场景有用的机制。'}</p>
            <a href="cases.html">{'从案例开始'}</a>
          </li>
          <li>
            <span>{'02'}</span>
            <h3>{'试一组搭配'}</h3>
            <p>{'在相同内容上调整元素，观察气质与阅读关系。'}</p>
            <a href="patterns.html">{'浏览巧思'}</a>
            <a href="lab.html">{'去实验室观察'}</a>
          </li>
          <li>
            <span>{'03'}</span>
            <h3>{'带着依据实现'}</h3>
            <p>{'让 Agent 取得完整参考，适配你自己的内容和功能。'}</p>
            <a href="agent.html">{'查看取材工作流'}</a>
          </li>
        </ol>
      </section>

      <section className="landing-ending" aria-labelledby="ending-title">
        <p className="landing-kicker">{'YOUR NEXT DESIGN'}</p>
        <h2 id="ending-title">
          {'下一次灵感，'}
          <br />
          {'从这里开始。'}
        </h2>
        <div className="landing-actions">
          <a
            className="landing-button landing-button--primary"
            href="cases.html"
          >
            {'浏览案例'}
          </a>
          <a className="landing-button" href="lab.html">
            {'进入实验室'}
          </a>
          <a className="landing-button" href="agent.html">
            {'探索工作流'}
          </a>
        </div>
        <p>
          <span data-home-count="studies">{counts.studies}</span>
          {' 个品牌／文化研究 · '}
          <span data-home-count="classics">{counts.classics}</span>
          {' 种经典设计语言 · '}
          <span data-home-count="showcases">{counts.showcases}</span>
          {' 个示范作品'}
        </p>
      </section>
    </>
  );
}
export function HomeStoryMarkup({
  rootRef,
  labRef,
  frameHeight,
  enhanced,
  phase,
  active,
  intro,
  progress,
  onMode,
  onIntro,
  onNext,
  onLabLoad,
  onLabPointer,
  onLabFocus,
  onFocusChange,
  paused,
}) {
  return (
    <div
      id="home-story"
      ref={rootRef}
      className={'home-story' + (enhanced ? ' home-story--enhanced' : '')}
      data-phase={phase}
      onFocusCapture={onFocusChange}
      onBlurCapture={onFocusChange}
    >
      <div className="home-story-sticky">
        <div
          className="home-story-intro-actions"
          role="group"
          aria-label="选择想探索的方式"
          hidden={!enhanced}
          inert={phase === 'story'}
        >
          <Button
            type="button"
            data-home-intro="cases"
            variant="secondary"
            onClick={() => onIntro(0)}
            aria-pressed={intro === 0}
          >
            {'浏览案例'}
          </Button>
          <Button
            type="button"
            data-home-intro="lab"
            variant="secondary"
            onClick={() => onIntro(1)}
            aria-pressed={intro === 1}
          >
            {'调配元素'}
          </Button>
          <Button
            type="button"
            data-home-intro="agent"
            variant="secondary"
            onClick={() => onIntro(2)}
            aria-pressed={intro === 2}
          >
            {'参考构建'}
          </Button>
        </div>
        <nav
          className="home-story-rail"
          aria-label="探索三种使用方式"
          inert={!enhanced || phase !== 'story'}
        >
          <article
            className={'home-story-step' + (active === 0 ? ' is-active' : '')}
          >
            <Button
              type="button"
              id="home-mode-cases"
              data-home-mode="cases"
              aria-controls="home-description-cases home-panel-cases"
              variant="secondary"
              onClick={() => onMode(0)}
              aria-expanded={!enhanced || active === 0}
            >
              <span>{'01'}</span>
              {'案例库'}
            </Button>
            <div
              className="home-story-description"
              id="home-description-cases"
              hidden={enhanced && active !== 0}
              inert={enhanced && active !== 0}
            >
              <h3>{'先看见，再看懂。'}</h3>
              <p>
                {
                  '在完整 Demo 中理解风格，再到巧思库拆解可独立借用的视觉规则与交互机制。'
                }
              </p>
              <a className="landing-module-link" href="cases.html">
                {'浏览案例'}
              </a>
              <a className="landing-module-link" href="patterns.html">
                {'拆解设计巧思'}
              </a>
            </div>
            <div className="home-story-progress" aria-hidden="true">
              <span style={{ transform: 'scaleX(' + progress[0] + ')' }} />
            </div>
          </article>
          <article
            className={'home-story-step' + (active === 1 ? ' is-active' : '')}
          >
            <Button
              type="button"
              id="home-mode-lab"
              data-home-mode="lab"
              aria-controls="home-description-lab home-panel-lab"
              variant="secondary"
              onClick={() => onMode(1)}
              aria-expanded={!enhanced || active === 1}
            >
              <span>{'02'}</span>
              {'设计实验室'}
            </Button>
            <div
              className="home-story-description"
              id="home-description-lab"
              hidden={enhanced && active !== 1}
              inert={enhanced && active !== 1}
            >
              <h3>{'同样内容，不同表达。'}</h3>
              <p>
                {'亲手切换方案，调配颜色、字体与留白，观察这些元素怎样配合。'}
              </p>
              <a className="landing-module-link" href="lab.html#lab">
                {'打开完整实验室'}
              </a>
            </div>
            <div className="home-story-progress" aria-hidden="true">
              <span style={{ transform: 'scaleX(' + progress[1] + ')' }} />
            </div>
          </article>
          <article
            className={'home-story-step' + (active === 2 ? ' is-active' : '')}
          >
            <Button
              type="button"
              id="home-mode-agent"
              data-home-mode="agent"
              aria-controls="home-description-agent home-panel-agent"
              variant="secondary"
              onClick={() => onMode(2)}
              aria-expanded={!enhanced || active === 2}
            >
              <span>{'03'}</span>
              {'Agent 工作流'}
            </Button>
            <div
              className="home-story-description"
              id="home-description-agent"
              hidden={enhanced && active !== 2}
              inert={enhanced && active !== 2}
            >
              <h3>{'把参考带进你的项目。'}</h3>
              <p>
                {
                  '围绕需求比较设计方向，再取得完整说明、Prompt、研究与源码，作为构建依据。'
                }
              </p>
              <a className="landing-module-link" href="agent.html">
                {'查看取材工作流'}
              </a>
            </div>
            <div className="home-story-progress" aria-hidden="true">
              <span style={{ transform: 'scaleX(' + progress[2] + ')' }} />
            </div>
          </article>
        </nav>
        <div className="home-story-window">
          <div className="home-story-window-bar">
            <p>
              <span>{'WEB ATLAS'}</span>
              <strong id="home-story-window-title">
                {['案例库', '设计实验室', 'Agent 工作流'][active]}
              </strong>
            </p>
            <span id="home-story-position">
              {String(active + 1).padStart(2, '0') + ' / 03'}
            </span>
          </div>
          <div className="home-story-panes">
            <article
              className="home-story-pane home-story-pane--cases"
              id="home-panel-cases"
              aria-labelledby="home-cases-title"
              hidden={enhanced && active !== 0}
              inert={enhanced && active !== 0}
            >
              <div className="home-story-pane-heading">
                <p className="landing-module-tag">{'01 / 案例库'}</p>
                <h3 id="home-cases-title">{'先看见。再看懂。'}</h3>
                <p className="landing-description">
                  {'从真实品牌页面到经典设计语言，理解画面背后的设计选择。'}
                </p>
                <a className="landing-module-link" href="cases.html">
                  {'寻找你的设计方向'}
                </a>
              </div>
              <div
                className="landing-case-grid"
                aria-label="案例库中的真实 Demo 预览"
              >
                <a
                  className="landing-case"
                  href="cases.html#style/notion-editorial"
                >
                  <img
                    src="previews/cases/notion-editorial.jpg"
                    width={1425}
                    height={990}
                    loading="lazy"
                    alt="Notion 案例 Demo，展示清晰文字层级与协作产品界面"
                  />
                  <span>
                    {'Notion '}
                    <small>{'清晰与协作'}</small>
                  </span>
                </a>
                <a className="landing-case" href="cases.html#style/swiss-grid">
                  <img
                    src="previews/cases/swiss-grid.jpg"
                    width={1425}
                    height={990}
                    loading="lazy"
                    alt="瑞士设计练习，展示非对称标题与信息网格"
                  />
                  <span>
                    {'瑞士设计 '}
                    <small>{'网格与秩序'}</small>
                  </span>
                </a>
                <a
                  className="landing-case"
                  href="cases.html#style/design-sight"
                >
                  <img
                    src="previews/cases/design-sight.jpg"
                    width={1425}
                    height={990}
                    loading="lazy"
                    alt="21_21 DESIGN SIGHT 案例 Demo，展示真实展览海报与四列档案"
                  />
                  <span>
                    {'21_21 DESIGN SIGHT '}
                    <small>{'艺术与档案'}</small>
                  </span>
                </a>
                <a
                  className="landing-case"
                  href="cases.html#style/google-material"
                >
                  <img
                    src="previews/cases/google-material.jpg"
                    width={1425}
                    height={990}
                    loading="lazy"
                    alt="Google Material Design 案例 Demo，展示组件配色与圆角容器"
                  />
                  <span>
                    {'Google Material '}
                    <small>{'组件与表现力'}</small>
                  </span>
                </a>
              </div>
              <p className="landing-caption">
                {'在完整案例中看设计元素如何配合；在'}
                <a href="patterns.html">{'巧思库'}</a>
                {'与'}
                <a href="materials.html">{'素材库'}</a>
                {'中看单个机制的触发、结果与适用边界。'}
              </p>
            </article>
            <article
              className="home-story-pane home-story-pane--lab"
              id="home-panel-lab"
              aria-labelledby="home-lab-title"
              hidden={enhanced && active !== 1}
              inert={enhanced && active !== 1}
            >
              <div className="home-story-pane-heading">
                <p className="landing-module-tag">{'02 / 设计实验室'}</p>
                <h3 id="home-lab-title">{'同样的内容，不同的表达。'}</h3>
                <p className="landing-description">
                  {'切换方案，直接调配颜色、字体与留白。'}
                </p>
                <a className="landing-module-link" href="lab.html#lab">
                  {'打开完整实验室'}
                </a>
              </div>
              <div className="landing-lab-preview">
                <iframe
                  className="landing-lab-frame"
                  src="lab.html?embed=home"
                  title="设计实验室交互预览"
                  loading="lazy"
                  height={650}
                  ref={labRef}
                  style={{ height: frameHeight }}
                  onLoad={onLabLoad}
                  onPointerEnter={() => onLabPointer(true)}
                  onPointerLeave={() => onLabPointer(false)}
                  onFocus={onLabFocus}
                />
              </div>
              <p className="landing-caption">
                {
                  '试着写下一条发现。打开完整实验室，还可以调配布局、形状与更多元素。'
                }
              </p>
            </article>
            <article
              className="home-story-pane home-story-pane--agent"
              id="home-panel-agent"
              aria-labelledby="home-agent-title"
              hidden={enhanced && active !== 2}
              inert={enhanced && active !== 2}
            >
              <div className="home-story-pane-heading">
                <p className="landing-module-tag">{'03 / Agent 工作流'}</p>
                <h3 id="home-agent-title">{'把参考变成构建的上下文。'}</h3>
                <p className="landing-description">
                  {
                    '和 Agent 比较设计方向，确认方向后读取完整参考资料，适配自己的内容与功能。'
                  }
                </p>
                <a className="landing-module-link" href="agent.html">
                  {'进入 Agent 工作流'}
                </a>
              </div>
              <div className="landing-agent-preview">
                <div className="landing-command">
                  <div className="landing-command-heading">
                    <label htmlFor="home-agent-prompt">
                      {'安装 skill 后，用这段话开始'}
                    </label>
                    <CopyButton value={agentPrompt} label="复制示例" />
                  </div>
                  <Textarea
                    id="home-agent-prompt"
                    label="Agent skill 调用示例"
                    value={agentPrompt}
                    readOnly
                  />
                  <p id="home-copy-status" role="status">
                    {'先讨论设计方向，再从同一版本取用资料。'}
                  </p>
                </div>
                <div className="landing-materials">
                  <p>{'完整案例提供以下参考资料'}</p>
                  <dl>
                    <div>
                      <dt>{'设计机制与 Prompt'}</dt>
                      <dd>{'entry'}</dd>
                    </div>
                    <div>
                      <dt>{'网页中的实际说明'}</dt>
                      <dd>{'webNotes'}</dd>
                    </div>
                    <div>
                      <dt>{'研究与复现边界'}</dt>
                      <dd>{'documents'}</dd>
                    </div>
                    <div>
                      <dt>{'源码、媒体与校验清单'}</dt>
                      <dd>{'files'}</dd>
                    </div>
                  </dl>
                </div>
              </div>
            </article>
          </div>
          <div className="home-story-controls" hidden={!enhanced}>
            <p id="home-story-status" role="status">
              {paused
                ? '画面已暂停切换。完成操作后，可继续下一步。'
                : '滚动探索，也可选择左侧入口。'}
            </p>
            <Button
              className="landing-button"
              type="button"
              id="home-story-next"
              variant="secondary"
              onClick={onNext}
            >
              {['继续调配元素', '继续参考构建', '继续往下了解'][active]}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
