import { Button, CopyButton, Textarea } from '../components/ui';
import { PatternPlayground } from '../components/PatternPlayground';
import { ExternalLink } from 'lucide-react';
export const initialPrompt =
  '为 [产品/项目] 制作面向 [目标用户] 的网页。核心目标是 [用户应理解什么、完成什么行动]。请先明确内容顺序、核心卖点与主行动，再组织视觉。\n\n选择 [案例库中的真实案例/主要风格] 作为方向，说明你借鉴的是哪些可观察规则，而不是只贴风格标签。给出一套协调的视觉规则：\n1. 配色：区分背景、表面、文字、强调和状态颜色；说明主次，保证文字可读，状态不要只靠颜色。\n2. 字体与排版：确定标题/正文/说明的字体、字号、字重、行高与行长；使用有限且有规律的层级，中文长文保持易读。\n3. 形状、线条与图像：统一圆角/直角、边框粗细、图标和插画的处理方式；图像要帮助展示卖点，质感不能干扰内容。\n4. 空间与组织：用稳定的对齐线和间距尺度建立布局；组内近、组间远，重要内容有适当留白；用比例、平衡、对比与重复协调元素。\n5. 视觉巧思与微动效：按内容需要选择文字强调、颜色区分、容器或装饰规则；为悬停、聚焦、按下和复位写清触发、局部变化与操作结果。静态文字和状态仍能独立表达反馈，手机与键盘可操作。\n6. 页面动效：核对首次加载、欢迎界面、滚动叙事与章节交接；保留来源的自然滚动或分屏机制。写清起始、过程、完成、反向返回与快速重复时的状态顺序，尊重prefers-reduced-motion。\n7. 深浅主题：区分固定主题、系统跟随与手动切换；切换时重映射背景、表面、文字、强调和边界角色，不简单反色图片。强IP或摄影主题若无切换，可保留固定主题并解释。\n8. 声音：分别核对背景音乐、开场音和操作短音，保留真实素材与用户启用/静音/暂停流程。验证触发时机、重复操作、手机入口和后台返回；静音后保留完整反馈。没有声音的网站不添加配乐。\n\n先做一个包含真实内容的关键页面，再检查配色、排版、形状与留白是否共同突出同一重点。解释每个视觉选择如何服务目标，区分来源事实与你的迁移判断。不要自动把某品牌的专属规则当成所有网页的普遍标准。';
export function LabContent({ experiment, promptText, onPromptTextChange }) {
  return (
    <>
      <section className="intro" aria-labelledby="intro-title">
        <div>
          <p className="eyebrow">{'START HERE / 从这里开始'}</p>
          <h1 id="intro-title">
            {'网页的设计，'}
            <br />
            <em>{'从关系开始。'}</em>
          </h1>
          <p className="lead">
            {
              '先调整配色、排版与形状，再分别体验视觉、微动效、页面动效和声音机制，观察它们如何影响内容层级和实际操作。'
            }
          </p>
        </div>
        <div className="intro-art" aria-hidden="true">
          <div className="art-type">
            {'Aa'}
            <span>{'字'}</span>
          </div>
          <div className="art-line" />
          <div className="art-swatches">
            <i />
            <i />
            <i />
          </div>
          <div className="art-caption">{'COLOR + TYPE + FORM + SPACE'}</div>
        </div>
      </section>

      <section className="framework" aria-labelledby="framework-title">
        <div className="section-label">
          <span>{'01 / 理解三层关系'}</span>
          <h2 id="framework-title">{'先看材料，再看组织，最后看使用。'}</h2>
        </div>
        <div className="layer-grid">
          <article className="layer">
            <span className="layer-no">{'01'}</span>
            <h3>{'视觉材料'}</h3>
            <p>{'颜色、字体、形状与线条、图像与图标、空间、质感。'}</p>
            <div className="layer-question">{'有哪些东西？'}</div>
          </article>
          <article className="layer">
            <span className="layer-no">{'02'}</span>
            <h3>{'组织原则'}</h3>
            <p>{'布局与对齐、层级与对比、比例与平衡、重复与节奏。'}</p>
            <div className="layer-question">{'它们是什么关系？'}</div>
          </article>
          <article className="layer">
            <span className="layer-no">{'03'}</span>
            <h3>{'网页体验'}</h3>
            <p>{'目标与内容顺序、操作与反馈、响应式与无障碍。'}</p>
            <div className="layer-question">{'用户看得懂、用得了吗？'}</div>
          </article>
        </div>
        <p className="annotation">
          {
            '这是本库结合设计系统、UX研究与网页规范整理的教学框架，不是唯一的国际分类标准。'
          }
        </p>
      </section>

      {experiment}

      <section
        className="lab-patterns"
        id="pattern-lab"
        aria-labelledby="pattern-lab-title"
      >
        <div className="section-label">
          <span>{'03 / 巧思机制实验'}</span>
          <h2 id="pattern-lab-title">{'从一条规则，到一次完整反馈。'}</h2>
        </div>
        <p className="section-copy">
          {'视觉看构成规则，动效看'}
          <strong>{'触发、过程、完成与回程'}</strong>
          {
            '，声音看启用和停止。以下是独立的本地机制示意；上方协调实验的配置导出只包含“拾光笔记”的实际选择。'
          }
        </p>
        <div className="lab-pattern-grid">
          <article className="lab-pattern-card">
            <p className="lab-pattern-kind">{'VISUAL / 视觉构成'}</p>
            <h3>{'强调，不必依赖运动。'}</h3>
            <p>
              {
                '文字下划线、颜色角色、圆角容器和几何装饰，可以建立一眼可见的层级。改变参数，判断重点是否清楚、装饰是否服务内容。'
              }
            </p>
            <PatternPlayground type="visual" active={true} />
            <p className="lab-pattern-observe">
              {'观察：强调词是否仍可读？容器与装饰有没有争夺主次？'}
            </p>
            <a href="patterns.html#patterns?type=visual">
              {'查看有来源的视觉巧思'}
            </a>
          </article>
          <article className="lab-pattern-card">
            <p className="lab-pattern-kind">{'MICRO MOTION / 微动效'}</p>
            <h3>{'局部反馈，跟着意图走。'}</h3>
            <p>
              {
                '悬停、键盘聚焦和按下反馈帮助定位与确认。移入、操作、移出，再试快速重复；手机可以直接点击，不依赖悬停。'
              }
            </p>
            <PatternPlayground type="micro-motion" active={true} />
            <p className="lab-pattern-observe">
              {'观察：进入和复位是否连贯？静态结果能否独立表达完成？'}
            </p>
            <a href="patterns.html#patterns?type=micro-motion">
              {'查看有来源的微动效'}
            </a>
          </article>
          <article className="lab-pattern-card">
            <p className="lab-pattern-kind">{'PAGE MOTION / 页面动效'}</p>
            <h3>{'内容主体，按顺序交接。'}</h3>
            <p>
              {
                '加载、滚动叙事和章节转场会改变主要内容的呈现。用前进与返回观察遮罩、旧内容退出和新内容进入，区分起始、过程与完成。'
              }
            </p>
            <PatternPlayground type="page-motion" active={true} />
            <p className="lab-pattern-observe">
              {
                '观察：切换中再次操作，会不会让当前内容与状态脱节？减少动态时仍应直接到达目标。'
              }
            </p>
            <a href="patterns.html#patterns?type=page-motion">
              {'查看有来源的页面动效'}
            </a>
          </article>
          <article className="lab-pattern-card">
            <p className="lab-pattern-kind">{'SOUND / 声音'}</p>
            <h3>{'把声音，当作辅助信息。'}</h3>
            <p>
              {
                '环境音乐承担氛围，操作短音承担确认，两者分别管理。这里仅演示合成操作音，由你启用；尝试重复触发、静音与后台返回。'
              }
            </p>
            <PatternPlayground type="sound" active={true} />
            <p className="lab-pattern-observe">
              {
                '观察：声音与动作是否对应？静音后，文字和视觉反馈是否仍完整？原站音轨与播放流程请回到来源案例。'
              }
            </p>
            <a href="patterns.html#patterns?type=sound">
              {'查看有来源的声音巧思'}
            </a>
          </article>
        </div>
        <div className="lab-pattern-structure">
          <div>
            <p className="lab-pattern-kind">
              {'STRUCTURE & STATE / 结构与状态'}
            </p>
            <h3>{'还有一些巧思，藏在信息组织里。'}</h3>
            <p>
              {
                '分组、渐进展开、导航位置与状态同步，也能独立借用。按机制本身归类，一个巧思可以同时涉及视觉和动效；不要求每个案例都凑齐类型。'
              }
            </p>
            <a href="patterns.html#patterns?type=structure">
              {'探索结构与状态巧思'}
            </a>
          </div>
          <PatternPlayground type="structure" active={true} />
        </div>
        <p className="annotation">
          {
            '这些示意是本地原创教学机制，参数不代表原站实测值，也不替代来源 Demo。巧思详情保留真实来源、适用任务、键盘策略与减少动态边界。'
          }
        </p>
      </section>

      <section
        className="elements"
        id="elements"
        aria-labelledby="elements-title"
      >
        <div className="section-label">
          <span>{'04 / 逐项拆解'}</span>
          <h2 id="elements-title">{'网页里，具体有哪些设计元素？'}</h2>
        </div>
        <div className="element-grid">
          <article className="element">
            <div className="mini color-mini" aria-hidden="true">
              <i />
              <i />
              <i />
            </div>
            <h3>{'色彩'}</h3>
            <p>
              {
                '背景、文字、强调、状态，各有角色。先决定谁是主色，哪些颜色负责行动与反馈。'
              }
            </p>
            <small>
              {'观察：同一种行动是否总用同一颜色？文字能否轻松读出？'}
            </small>
          </article>
          <article className="element">
            <div className="mini type-mini" aria-hidden="true">
              {'Aa '}
              <span>{'字'}</span>
            </div>
            <h3>{'字体与排版'}</h3>
            <p>
              {
                '不只是选字体，还包括字号、字重、行高、字距与行长。它们共同影响气质和阅读速度。'
              }
            </p>
            <small>
              {'观察：标题比正文重要在哪里？长段落是否太宽或太挤？'}
            </small>
          </article>
          <article className="element">
            <div className="mini shape-mini" aria-hidden="true">
              <i />
              <i />
              <i />
            </div>
            <h3>{'形状与线条'}</h3>
            <p>
              {
                '圆角、直角、边框粗细、线条端点都是语言。按钮、图标和插画可以共享相似规则。'
              }
            </p>
            <small>
              {'观察：一处很圆、一处很尖，是有意强调，还是没有规则？'}
            </small>
          </article>
          <article className="element">
            <div className="mini image-mini" aria-hidden="true">
              <svg viewBox="0 0 100 50">
                <rect x="2" y="3" width={66} height={44} rx="3" />
                <circle cx="48" cy="16" r="5" />
                <path d="m8 40 18-19 12 13 8-8 15 14M80 14h16M80 25h16M80 36h10" />
              </svg>
            </div>
            <h3>{'图像与图标'}</h3>
            <p>
              {
                '照片、插画、产品截图和图标负责展示内容。画面题材、视角与细节量应服务同一个主题。'
              }
            </p>
            <small>
              {'观察：图像在证明卖点，还是占位置？图标是否容易理解？'}
            </small>
          </article>
          <article className="element">
            <div className="mini space-mini" aria-hidden="true">
              <div>
                <i />
                <i />
              </div>
              <div>
                <i />
                <i />
              </div>
            </div>
            <h3>{'空间与留白'}</h3>
            <p>
              {
                '距离能告诉我们什么是一组。组内近、组间远；重要内容周围留一点空间，视线更容易停留。'
              }
            </p>
            <small>
              {'观察：哪些内容应靠近？页面有没有让眼睛休息的地方？'}
            </small>
          </article>
          <article className="element">
            <div className="mini texture-mini" aria-hidden="true">
              <i />
              <i />
              <i />
            </div>
            <h3>{'质感'}</h3>
            <p>
              {
                '光影、渐变、颗粒和材质，让元素有表面感。也可以保持完全平面；关键是用途和分寸。'
              }
            </p>
            <small>
              {'观察：质感在帮助理解层次，还是干扰文字与产品本身？'}
            </small>
          </article>
        </div>
      </section>

      <section className="principles" aria-labelledby="principles-title">
        <div className="section-label">
          <span>{'05 / 让元素共同工作'}</span>
          <h2 id="principles-title">{'统一规则，也保留重点的差异。'}</h2>
        </div>
        <div className="principle-list">
          <article>
            <span>{'01'}</span>
            <h3>{'布局与对齐'}</h3>
            <p>
              {
                '用稳定的边线、网格与分组组织信息。元素即使大小不同，也能共享对齐关系。'
              }
            </p>
          </article>
          <article>
            <span>{'02'}</span>
            <h3>{'层级与对比'}</h3>
            <p>
              {
                '决定先看什么、再看什么。通过大小、位置、明暗和留白突出重点；次要文字仍要可读。'
              }
            </p>
          </article>
          <article>
            <span>{'03'}</span>
            <h3>{'比例与平衡'}</h3>
            <p>
              {
                '考虑文字、图形和空白的相对重量。平衡可以对称，也可以不对称，不是把每个块做成同样大。'
              }
            </p>
          </article>
          <article>
            <span>{'04'}</span>
            <h3>{'重复、节奏与一致性'}</h3>
            <p>
              {
                '重复字号、颜色角色、线条与间距规则，形成熟悉感。需要强调的地方，再有意识地改变节奏。'
              }
            </p>
          </article>
        </div>
        <p className="reading-note">
          {
            '这些原则互相作用。例如，留白既是一种视觉材料，也能帮助分组、建立层级和形成节奏。分类是为了学习，不是把关系割开。'
          }
        </p>
      </section>

      <section className="workflow" aria-labelledby="workflow-title">
        <div className="section-label">
          <span>{'06 / 从样式回到网页'}</span>
          <h2 id="workflow-title">{'开始制作前，先回答三个问题。'}</h2>
        </div>
        <div className="workflow-grid">
          <article>
            <span className="step-number">{'1'}</span>
            <h3>{'谁来用，要做什么？'}</h3>
            <p>
              {
                '把核心目标写成一句话。比如“让第一次来的人理解产品，并试用一项功能”。内容顺序应围绕这个目标。'
              }
            </p>
          </article>
          <article>
            <span className="step-number">{'2'}</span>
            <h3>{'操作后，会发生什么？'}</h3>
            <p>
              {
                '按钮要有实际结果，加载、成功、失败都需要反馈。同一种状态的文字、图标和颜色应保持一致。'
              }
            </p>
          </article>
          <article>
            <span className="step-number">{'3'}</span>
            <h3>{'换一种方式，还能用吗？'}</h3>
            <p>
              {
                '在手机、键盘、放大文字时检查页面。保留焦点与可读对比，尊重减少动态偏好；漂亮不应成为使用障碍。'
              }
            </p>
          </article>
        </div>
      </section>

      <section
        className="prompt-section"
        id="prompt"
        aria-labelledby="prompt-title"
      >
        <div className="section-label">
          <span>{'07 / 可复用的起点'}</span>
          <h2 id="prompt-title">{'把设计要求，写成可以执行的 Prompt。'}</h2>
        </div>
        <p className="section-copy">
          {
            '先使用这份基础约束，再补充案例库中所选风格的专属 Prompt。把方括号中的内容替换为你的项目信息。'
          }
        </p>
        <div className="prompt-editor">
          <div className="prompt-tools">
            <span>{'通用基础 Prompt · 中文'}</span>
            <CopyButton value={promptText} label="复制 Prompt" />
          </div>
          <Textarea
            id="prompt-text"
            label="设计要求"
            value={promptText}
            onChange={(event) => onPromptTextChange(event.target.value)}
            rows={18}
          />
        </div>
        <p
          id="copy-status"
          className="copy-status"
          role="status"
          aria-live="polite"
        >
          {'若浏览器不允许自动复制，可选中上方文本手动复制。'}
        </p>
      </section>

      <section className="sources" aria-labelledby="sources-title">
        <div className="section-label">
          <span>{'08 / 查到的依据'}</span>
          <h2 id="sources-title">{'这套学习方法从哪里来？'}</h2>
        </div>
        <p className="section-copy">
          {
            '核验于2026-10-07。下面是实际阅读的第一方资料；我们将它们综合为初学者框架。IBM的核心蓝色和专属配色限制属于它的品牌系统，不是通用定律。'
          }
        </p>
        <div className="source-list">
          <a
            href="https://www.ibm.com/design/language/layout/overview/"
            target="_blank"
            rel="noreferrer"
          >
            <strong>{'IBM Design Language · Layout'}</strong>
            <span>
              {'布局把元素组合起来：层级、比例、对比、和谐、节奏、重复。'}
            </span>
            <ExternalLink size={16} aria-hidden="true" />
          </a>
          <a
            href="https://www.ibm.com/design/language/color/"
            target="_blank"
            rel="noreferrer"
          >
            <strong>{'IBM Design Language · Color'}</strong>
            <span>{'颜色角色、一致性和可读性；区分品牌专属规则。'}</span>
            <ExternalLink size={16} aria-hidden="true" />
          </a>
          <a
            href="https://www.carbondesignsystem.com/building-blocks/foundations/spacing/overview"
            target="_blank"
            rel="noreferrer"
          >
            <strong>{'Carbon · Spacing'}</strong>
            <span>{'间距如何形成分组、层级和阅读空间。'}</span>
            <ExternalLink size={16} aria-hidden="true" />
          </a>
          <a
            href="https://www.nngroup.com/articles/principles-visual-design/"
            target="_blank"
            rel="noreferrer"
          >
            <strong>{'NN/g · 视觉设计原则'}</strong>
            <span>{'尺度、层级、平衡、对比和Gestalt关系。'}</span>
            <ExternalLink size={16} aria-hidden="true" />
          </a>
          <a
            href="https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html"
            target="_blank"
            rel="noreferrer"
          >
            <strong>{'W3C · 文本对比'}</strong>
            <span>
              {'普通文本通常4.5:1、大号文本3:1；需结合字重、用途和例外。'}
            </span>
            <ExternalLink size={16} aria-hidden="true" />
          </a>
          <a
            href="https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions.html"
            target="_blank"
            rel="noreferrer"
          >
            <strong>{'W3C · 交互动效'}</strong>
            <span>{'非必要交互动效可停用；该成功准则为Level AAA。'}</span>
            <ExternalLink size={16} aria-hidden="true" />
          </a>
        </div>
        <p className="annotation">
          <a href="docs.html?file=docs%2Ffoundations.md">
            {'查看完整调研、来源边界和实验映射'}
          </a>
        </p>
      </section>
    </>
  );
}
