import { Button, Textarea } from './ui';
export const initialNote = '光穿过树叶，像一张会变化的地图。';
function SampleGraphic({ kind }) {
  return {
    line: (
      <svg
        viewBox="0 0 240 100"
        role="img"
        aria-label="线描：一本笔记与一片叶子"
      >
        <path d="M23 20h118v68H23zM33 20v68M48 38h58M48 49h72M48 60h48M48 71h61" />
        <path d="M168 82c-9-16-18-41 13-59 30 6 31 45-2 52M164 87l26-52M175 66l-13-17M184 47l18 2" />
        <path d="m117 34 25-21 6 7-25 21-11 3z" />
      </svg>
    ),
    geometry: (
      <svg
        viewBox="0 0 240 100"
        role="img"
        aria-label="几何：圆、矩形和三角构成"
      >
        <rect className="graphic-soft" x="25" y="18" width="71" height="65" />
        <circle className="graphic-accent" cx="139" cy="42" r="28" />
        <path className="graphic-outline" d="m152 84 36-64 36 64Z" />
        <path d="M22 90h202M46 29v43M61 29v31M76 29v39" />
      </svg>
    ),
    product: (
      <svg
        viewBox="0 0 240 100"
        role="img"
        aria-label="产品：笔记本与便携记录工具"
      >
        <rect
          className="graphic-soft"
          x="24"
          y="11"
          width="119"
          height="76"
          rx="4"
        />
        <path d="M39 11v76M55 31h62M55 44h46M55 57h54M55 70h34" />
        <rect x="164" y="8" width="49" height="82" rx="5" />
        <rect
          className="graphic-accent"
          x="174"
          y="25"
          width="29"
          height="25"
        />
        <path d="M180 17h16M174 63h26M174 72h19" />
        <circle cx="188" cy="82" r="2" />
      </svg>
    ),
  }[kind];
}
export function LabSample({
  sampleStyle,
  design,
  dark,
  note,
  composeOpen,
  draft,
  onDraft,
  onSave,
  onCancel,
  onCompose,
  feedback,
  onFeedback,
  message,
}) {
  return (
    <div
      className="sample"
      id="sample"
      style={sampleStyle}
      data-layout={design.layout}
      data-hierarchy={design.hierarchy}
      data-texture={design.texture}
      data-motion={design.motion ? 'on' : 'off'}
      data-theme={dark ? 'dark' : 'light'}
    >
      <div className="sample-header">
        <a href="#sample-title" className="sample-brand">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M5 3h13v18H5zM8 7h7M8 11h7M8 15h4" />
          </svg>
          {'拾光笔记'}
        </a>
        <span className="sample-meta">{'YOUR EVERYDAY FIELD NOTES'}</span>
      </div>
      <div className="sample-hero">
        <div className="sample-copy">
          <div className="sample-kicker">{'灵感来了，就留下。'}</div>
          <h3 id="sample-title">
            {'把日常的小发现，'}
            <br />
            {'变成自己的灵感库。'}
          </h3>
          <p>
            {'随手记录文字与想法，整理成主题，'}
            <br />
            {'在需要的时候，找回那一刻。'}
          </p>
          <div className="sample-actions">
            <Button
              className="sample-primary"
              id="sample-action"
              type="button"
              aria-controls="sample-compose"
              variant="secondary"
              onClick={onCompose}
              aria-expanded={composeOpen}
            >
              {'试写一条'}
            </Button>
            <a href="#sample-features">{'浏览功能'}</a>
          </div>
          <p className="sample-footnote">{'本地交互示例 · 无需注册'}</p>
        </div>
        <div className="note-preview" aria-label="示例笔记">
          <div className="note-preview-top">
            <span>{'今天的发现'}</span>
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="m12 2 2.5 7.5L22 12l-7.5 2.5L12 22l-2.5-7.5L2 12l7.5-2.5Z" />
            </svg>
          </div>
          <div className="sample-graphic" aria-label="当前选择的原创图形">
            <SampleGraphic kind={design.graphic} />
          </div>
          <h4>{note}</h4>
          <div className="note-rule" />
          <p>{'散步 / 城市观察'}</p>
          <span className="note-tag">{'灵感片段'}</span>
        </div>
      </div>
      <div className="sample-features" id="sample-features">
        <div>
          <span className="feature-icon" aria-hidden="true">
            <svg
              className="atlas-icon"
              viewBox="0 0 24 24"
              aria-hidden="true"
              focusable="false"
            >
              <path d="m16 3 5 5M4 20l5-1L21 7l-5-5L4 14Z" />
            </svg>
          </span>
          <strong>{'随手记录'}</strong>
          <p>{'先留下，不急着整理。'}</p>
        </div>
        <div>
          <span className="feature-icon" aria-hidden="true">
            <svg
              className="atlas-icon"
              viewBox="0 0 24 24"
              aria-hidden="true"
              focusable="false"
            >
              <path d="M4 4h16v16H4ZM4 9h16M9 13h6" />
            </svg>
          </span>
          <strong>{'主题归档'}</strong>
          <p>{'让相关想法靠在一起。'}</p>
        </div>
        <div>
          <span className="feature-icon" aria-hidden="true">
            <svg
              className="atlas-icon"
              viewBox="0 0 24 24"
              aria-hidden="true"
              focusable="false"
            >
              <path d="m16 16 4.5 4.5M17 10.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0" />
            </svg>
          </span>
          <strong>{'快速找回'}</strong>
          <p>{'需要时，找到熟悉的线索。'}</p>
        </div>
      </div>
      <div className="sample-feedback">
        <Button className="sample-primary" onClick={onFeedback}>
          体验操作反馈
        </Button>
        <p role="status">{feedback}</p>
      </div>
      <form
        className="sample-compose"
        id="sample-compose"
        hidden={!composeOpen}
        onSubmit={onSave}
      >
        <Textarea
          id="sample-note"
          label="写下你今天的一个发现"
          value={draft}
          onChange={(event) => onDraft(event.target.value)}
          maxLength={180}
          rows={3}
          placeholder="例如：雨后的路面，让霓虹的颜色多停留了一会儿。"
        />
        <div>
          <Button
            className="sample-primary"
            id="sample-save"
            type="submit"
            variant="secondary"
          >
            {'保存这条发现'}
          </Button>
          <Button
            className="sample-secondary"
            id="sample-cancel"
            type="button"
            variant="secondary"
            onClick={onCancel}
          >
            {'返回预览'}
          </Button>
          <p id="sample-message" role="status" aria-live="polite">
            {message}
          </p>
        </div>
      </form>
    </div>
  );
}
