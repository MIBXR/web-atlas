import { useEffect, useMemo, useRef, useState } from 'react';
import { MotionConfig } from 'motion/react';
import catalog from 'atlas:catalog';
import {
  Button,
  CodeBlock,
  ColorPicker,
  CopyButton,
  Slider,
  Switch,
} from './ui';
import { Choice } from './actions';
import { LabSample, initialNote } from './LabSample';
import { usePreferences } from '../state/preferences';
import { navigate } from '../state/location';
import {
  schemes,
  fontNames,
  layoutNames,
  shapeNames,
  graphicNames,
  fontRules,
  shapeRules,
  blend,
  luminance,
  contrast,
  bestText,
  referenceDesign,
  resolvedPalette,
  configuration,
} from '../domain/lab-design';
const optionList = (labels) =>
  Object.entries(labels).map(([value, label]) => ({ value, label }));
const originForScheme = (name) => ({
  palette: name,
  type: name,
  shape: name,
  space: name,
});
const defaultObservation =
  '观察：标题、主按钮和笔记是否形成明确主次？形状与字体是否表达相近气质？相关信息是否靠得更近？';
export function LabEditor({ promptText, embedded = false }) {
  const requested = new URLSearchParams(location.search).get('style');
  const initialReference = catalog.cases.find(
    (entry) => entry.id === requested,
  );
  const [design, setDesign] = useState(() =>
    initialReference ? referenceDesign(initialReference) : schemes.paper,
  );
  const [referenceId, setReferenceId] = useState(
    initialReference?.id || 'none',
  );
  const [activeScheme, setActiveScheme] = useState(
    initialReference ? null : 'paper',
  );
  const [origins, setOrigins] = useState(
    initialReference
      ? {
          palette: '条目色板',
          type: '教学映射',
          shape: '教学映射',
          space: '教学映射',
        }
      : originForScheme('纸页'),
  );
  const [borrowPart, setBorrowPart] = useState('palette');
  const [borrowScheme, setBorrowScheme] = useState('friendly');
  const [notice, setNotice] = useState(
    initialReference
      ? `“${initialReference.title}”已带入：色板来自本地条目；字体、布局、形状与间距为教学迁移。`
      : schemes.paper.description,
  );
  const [observation, setObservation] = useState(defaultObservation);
  const [note, setNote] = useState(initialNote);
  const [draft, setDraft] = useState('');
  const [composeOpen, setComposeOpen] = useState(false);
  const [sampleMessage, setSampleMessage] = useState('');
  const [feedback, setFeedback] = useState('点击后查看文字与视觉反馈。');
  const [systemDark, setSystemDark] = useState(
    () => matchMedia('(prefers-color-scheme:dark)').matches,
  );
  const { theme } = usePreferences();
  const sectionRef = useRef(null);
  const reference = catalog.cases.find((entry) => entry.id === referenceId);
  const canvas =
    theme === 'dark' || (theme === 'system' && systemDark)
      ? '#1c201b'
      : '#ffffff';
  const palette = resolvedPalette(design, systemDark, canvas);
  const dark = luminance(palette.bg) < 0.25;
  const config = configuration(design, palette, reference, origins, systemDark);
  const configText = JSON.stringify(config, null, 2);
  const referenceHint = reference
    ? `
参考方向：${reference.title}；来源：${reference.sources.map((source) => source.url).join('，')}。这是元素教学迁移，请结合原条目研究其完整布局与交互。`
    : '';
  const currentPrompt =
    promptText +
    referenceHint +
    '\n\n当前元素配置（可据项目内容调整，不作为审美评分）：\n' +
    configText;
  const textContrast = contrast(palette.bg, palette.ink);
  const buttonContrast = contrast(palette.accent, bestText(palette.accent));
  const sampleStyle = useMemo(() => {
    const font = fontRules[design.type];
    const shape = shapeRules[design.shape];
    return {
      colorScheme: dark ? 'dark' : 'light',
      '--bg': palette.bg,
      '--ink': palette.ink,
      '--accent': palette.accent,
      '--on-accent': bestText(palette.accent),
      '--surface': blend(palette.bg, palette.ink, 0.035),
      '--soft': blend(palette.bg, palette.ink, 0.075),
      '--line': blend(palette.bg, palette.ink, 0.26),
      '--muted': blend(palette.ink, palette.bg, 0.18),
      '--accent-text':
        contrast(palette.accent, palette.bg) >= 4.5
          ? palette.accent
          : palette.ink,
      '--font-title': font.title,
      '--font-body': font.body,
      '--title-weight': font.weight,
      '--title-track': font.track,
      '--radius': shape.radius + 'px',
      '--stroke': shape.stroke + 'px',
      '--linecap': shape.cap,
      '--shadow': 'none',
      '--pad': design.space + 'px',
      '--gap': Math.round(design.space * 0.7) + 'px',
      '--card-pad': Math.round(design.space * 0.7) + 'px',
      '--duration': design.motion ? '180ms' : '0ms',
      '--foreground': palette.ink,
      '--background': palette.bg,
      '--text-secondary': blend(palette.ink, palette.bg, 0.18),
      '--text-muted': blend(palette.ink, palette.bg, 0.18),
      '--accent-foreground': bestText(palette.accent),
      '--border': blend(palette.bg, palette.ink, 0.26),
      '--radius-control': '8px',
    };
  }, [design, palette.bg, palette.ink, palette.accent, dark]);
  useEffect(() => {
    const preference = matchMedia('(prefers-color-scheme:dark)');
    const update = () => setSystemDark(preference.matches);
    preference.addEventListener('change', update);
    return () => preference.removeEventListener('change', update);
  }, []);
  useEffect(() => {
    if (!embedded || window.parent === window) return;
    let lastHeight = 0;
    let lastWidth = 0;
    const report = () => {
      const height = Math.ceil(
        sectionRef.current.getBoundingClientRect().height,
      );
      const width = innerWidth;
      if (height === lastHeight && width === lastWidth) return;
      lastHeight = height;
      lastWidth = width;
      parent.postMessage(
        { type: 'design-atlas:lab-height', height, width },
        location.origin,
      );
    };
    const observer = new ResizeObserver(report);
    observer.observe(sectionRef.current);
    report();
    return () => observer.disconnect();
  }, [embedded]);
  function selectScheme(id) {
    setDesign({ ...schemes[id], palette: { ...schemes[id].palette } });
    setOrigins(originForScheme(schemes[id].name));
    setReferenceId('none');
    setActiveScheme(id);
    setNotice(schemes[id].description);
    setObservation(defaultObservation);
    const url = new URL(location.href);
    url.searchParams.delete('style');
    navigate(url, { replace: true });
  }
  function change(field, value, label, question) {
    setDesign((previous) => ({ ...previous, [field]: value }));
    if (['palette', 'type', 'shape', 'space'].includes(field))
      setOrigins((previous) => ({ ...previous, [field]: '手动调整' }));
    setActiveScheme(null);
    setNotice(`调整${label}，其余元素维持当前配置。`);
    setObservation(question || defaultObservation);
  }
  function selectReference(id) {
    if (id === 'none') {
      selectScheme('paper');
      return;
    }
    const entry = catalog.cases.find((item) => item.id === id);
    setReferenceId(id);
    setDesign(referenceDesign(entry));
    setOrigins({
      palette: '条目色板',
      type: '教学映射',
      shape: '教学映射',
      space: '教学映射',
    });
    setActiveScheme(null);
    setNotice(
      `保持“拾光笔记”的产品内容，借用“${entry.title}”的元素特征。完整信息架构与核心交互见该条目的独立 Demo。`,
    );
    setObservation(
      '观察：同一内容借用不同风格后，气质、视觉重点与阅读密度有什么变化？再单独改一项，检验它与其他元素的关系。',
    );
    const url = new URL(location.href);
    url.searchParams.set('style', id);
    navigate(url, { replace: true });
  }
  function borrow() {
    setDesign((previous) => ({
      ...previous,
      [borrowPart]: schemes[borrowScheme][borrowPart],
    }));
    setOrigins((previous) => ({
      ...previous,
      [borrowPart]: '借用·' + schemes[borrowScheme].name,
    }));
    setActiveScheme(null);
    setNotice(
      `从“${schemes[borrowScheme].name}”借用${{ palette: '配色', type: '字体', shape: '形状', space: '留白' }[borrowPart]}，其余元素维持当前配置。单项混合不一定错误，试着判断它是否服务同一目标。`,
    );
  }
  function saveNote(event) {
    event.preventDefault();
    if (!draft.trim()) {
      setSampleMessage('先写一句发现，再保存。');
      return;
    }
    setNote(draft.trim());
    setSampleMessage('已在本次页面保存。示例笔记已更新；刷新后不会保留。');
  }
  return (
    <section className="lab-section" id="lab" ref={sectionRef}>
      <div className="section-label">
        <span>03 / 协调实验</span>
        <h2 id="lab-title">同样的内容，三种协调方案。</h2>
      </div>
      <p className="section-copy">
        保持“拾光笔记”的产品内容，切换完整方案，再单独调整设计元素，观察它们怎样配合。
      </p>
      <div className="lab-controls">
        <div className="scheme-controls">
          {Object.entries(schemes).map(([id, scheme]) => (
            <Button
              key={id}
              variant="secondary"
              className="scheme-btn"
              aria-pressed={activeScheme === id}
              onClick={() => selectScheme(id)}
            >
              <span
                className="swatch"
                style={{ background: scheme.palette.accent }}
              />
              <span>
                {scheme.name}
                <small>{scheme.description}</small>
              </span>
            </Button>
          ))}
        </div>
        <div className="single-control">
          <Choice
            label="只替换"
            value={borrowPart}
            onValueChange={setBorrowPart}
            options={optionList({
              palette: '配色',
              type: '字体',
              shape: '形状',
              space: '留白',
            })}
          />
          <Choice
            label="借用方案"
            value={borrowScheme}
            onValueChange={setBorrowScheme}
            options={optionList(
              Object.fromEntries(
                Object.entries(schemes).map(([key, scheme]) => [
                  key,
                  scheme.name,
                ]),
              ),
            )}
          />
          <Button variant="secondary" onClick={borrow}>
            应用单项
          </Button>
        </div>
      </div>
      <div className="lab-workspace">
        <aside className="element-controls" aria-label="设计元素参数">
          <div className="reference-control">
            <Choice
              label="从风格库迁移"
              value={referenceId}
              onValueChange={selectReference}
              options={[
                { value: 'none', label: '不带入来源风格' },
                ...catalog.cases.map((entry) => ({
                  value: entry.id,
                  label: entry.title,
                })),
              ]}
            />
            <p id="style-context">
              {reference
                ? `“${reference.title}”已带入。这是元素迁移示例，并非官网或来源 Demo 的像素复刻。`
                : '已恢复完整协调方案。各控件仍可单独调整，产品文案不变。'}
            </p>
            {reference && (
              <div className="style-source-links">
                {reference.sources.slice(0, 2).map((source) => (
                  <a
                    href={source.url}
                    key={source.url}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {source.title}
                  </a>
                ))}
              </div>
            )}
          </div>
          <fieldset className="color-controls">
            <legend>① 配色角色</legend>
            {[
              ['bg', '背景'],
              ['ink', '文字'],
              ['accent', '强调'],
            ].map(([key, label]) => (
              <div className="lab-color-field" key={key}>
                <ColorPicker
                  label={label}
                  value={design.palette[key]}
                  background={palette.bg}
                  onValueChange={(value) =>
                    change(
                      'palette',
                      { ...design.palette, [key]: value },
                      '配色',
                    )
                  }
                />
              </div>
            ))}
            <p className={`color-note ${textContrast < 4.5 ? 'warn' : ''}`}>
              文字 / 背景 {textContrast.toFixed(2)}:1；按钮文字{' '}
              {buttonContrast.toFixed(2)}:1。
              {textContrast < 4.5
                ? '正文读数低于4.5:1，试着调深或调浅文字。'
                : '这两组读数不代表整页无障碍达标。'}
              按钮文字自动选择深浅。
            </p>
          </fieldset>
          <div className="type-control">
            <Choice
              label="② 字体与排版"
              options={optionList(fontNames)}
              value={design.type}
              onValueChange={(value) =>
                change(
                  'type',
                  value,
                  '字体',
                  '观察：字形、字重和换行是否改变阅读气质？与现有线条、形状的关系是否清晰？',
                )
              }
            />
          </div>
          <div className="layout-control">
            <Choice
              label="③ 布局"
              options={optionList(layoutNames)}
              value={design.layout}
              onValueChange={(value) =>
                change(
                  'layout',
                  value,
                  '布局',
                  '观察：先看到的是文案还是示例笔记？布局是否将产品重点带到了更明确的位置？',
                )
              }
            />
          </div>
          <div className="shape-control">
            <Choice
              label="④ 形状与圆角"
              options={optionList(shapeNames)}
              value={design.shape}
              onValueChange={(value) => change('shape', value, '形状与圆角')}
            />
          </div>
          <div className="space-control">
            <Slider
              label="⑤ 空间与留白"
              min={12}
              max={60}
              step={4}
              value={design.space}
              onValueChange={(value) => change('space', value, '留白')}
              format={(value) => value + 'px'}
            />
          </div>
          <div className="graphic-control">
            <Choice
              label="⑥ 图形素材"
              options={optionList({
                line: '线描 / 轮廓表达',
                geometry: '几何 / 抽象构成',
                product: '产品 / 记录工具',
              })}
              value={design.graphic}
              onValueChange={(value) => change('graphic', value, '图形素材')}
            />
            <small>三幅本地原创 SVG，使用当前配色与线条规则。</small>
          </div>
          <div className="hierarchy-control">
            <Choice
              label="⑦ 信息层级"
              options={optionList({
                clear: '清楚主次 / 大标题',
                flat: '相近平级 / 观察比较',
              })}
              value={design.hierarchy}
              onValueChange={(value) => change('hierarchy', value, '信息层级')}
            />
          </div>
          <div className="texture-control">
            <Choice
              label="⑧ 质感"
              options={optionList({
                flat: '平面 / 无额外质感',
                grain: '颗粒 / 轻微纸感',
                lift: '阴影 / 表面层次',
              })}
              value={design.texture}
              onValueChange={(value) => change('texture', value, '质感')}
            />
          </div>
          <div className="motion-control">
            <Switch
              label="⑨ 微动效"
              checked={design.motion}
              onCheckedChange={(value) => change('motion', value, '微动效')}
            />
            <small>关闭动效后仍有文字反馈；减少动态偏好优先。</small>
          </div>
          <div className="theme-control">
            <Choice
              label="⑩ 深浅色 / 颜色角色一起切换"
              options={optionList({
                reference: '保留方案 / 原案例主题',
                system: '跟随系统',
                light: '浅色',
                dark: '深色',
              })}
              value={design.themeChoice || 'reference'}
              onValueChange={(value) =>
                change('themeChoice', value, '显示主题')
              }
            />
            <p>
              当前示例：{dark ? '深色' : '浅色'}；
              {reference?.themeBehavior
                ? `原案例：${reference.themeBehavior.control}；${reference.themeBehavior.designReason}`
                : '背景、表面、正文、强调和边界按各自角色一起切换，不对图片施加反色。'}
            </p>
            <p>
              {reference?.soundBehavior
                ? `协调实验无声音。原案例声音：${reference.soundBehavior.control} ${reference.soundBehavior.interactionRole || ''}`
                : '协调实验无声音；下方声音机制实验可单独启用合成操作音。'}
            </p>
          </div>
        </aside>
        <div className="experiment">
          <div className="demo-label">
            <span>拾光笔记 · 同一份产品内容</span>
            <strong>
              当前：{design.name}
              {activeScheme ? '完整方案' : ' + 自定义'}
            </strong>
          </div>
          <MotionConfig reducedMotion={design.motion ? 'user' : 'always'}>
            <LabSample
              sampleStyle={sampleStyle}
              design={design}
              dark={dark}
              note={note}
              composeOpen={composeOpen}
              draft={draft}
              onDraft={setDraft}
              onSave={saveNote}
              onCancel={() => setComposeOpen(false)}
              onCompose={() => setComposeOpen(!composeOpen)}
              feedback={feedback}
              onFeedback={() =>
                setFeedback(
                  '操作已完成。' +
                    (design.motion &&
                    !matchMedia('(prefers-reduced-motion:reduce)').matches
                      ? '同时提供短暂视觉反馈。'
                      : '当前使用静态文字反馈。'),
                )
              }
              message={sampleMessage}
            />
          </MotionConfig>
        </div>
      </div>
      <div className="observation">
        <p id="change-note" role="status">
          {notice}
        </p>
        <p id="observe-note">{observation}</p>
      </div>
      <div className="token-summary">
        <div>
          <span>配色</span>
          <strong>{origins.palette}</strong>
        </div>
        <div>
          <span>字体</span>
          <strong>
            {fontNames[design.type]} · {origins.type}
          </strong>
        </div>
        <div>
          <span>形状</span>
          <strong>{shapeNames[design.shape]}</strong>
        </div>
        <div>
          <span>留白</span>
          <strong>
            {design.space}px · {origins.space}
          </strong>
        </div>
      </div>
      <div className="configuration-tools">
        <CopyButton value={configText} label="复制当前元素配置" />
        <CopyButton value={currentPrompt} label="复制当前 Prompt" />
        <CodeBlock code={configText} language="json" maxLines={12} />
      </div>
    </section>
  );
}
