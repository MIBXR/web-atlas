const labels = {
  color: '配色角色',
  typography: '字体排版',
  layout: '布局留白',
  imagery: '图像图标',
  shape: '线条形状',
  hierarchy: '信息层级',
  motion: '动效反馈',
  coherence: '协调逻辑',
  scroll: '滚动结构',
};
const themes = {
  fixed: '固定主题',
  system: '跟随系统',
  manual: '手动切换',
  'system-and-manual': '系统 + 手动',
};
const sounds = {
  none: '无网站配乐',
  background: '背景音乐',
  video: '媒体声音',
  external: '外部音乐入口',
  interactive: '操作／演奏声音',
};
const paragraph = (text) => ({ type: 'paragraph', text });
const heading = (text) => ({ type: 'heading', text });
const list = (values) => ({ type: 'list', values });
const link = (href, text) => ({ type: 'link', href, text });

export function caseNoteSections(entry, patterns) {
  const related = patterns.filter((pattern) =>
    pattern.sources.some((source) => source.caseId === entry.id),
  );
  const documents = [
    [entry.research, '调研记录'],
    [entry.fidelity, '复现范围与差异'],
    [entry.assetManifest, '素材来源清单'],
    [entry.fidelity && `demos/cases/${entry.id}/LICENSES.md`, '许可原文索引'],
  ].filter(([file]) => file);
  const dateLabel = entry.referenceUrl
    ? entry.category === '示范作品'
      ? '来源归档'
      : entry.studyScope === 'visual-adaptation'
        ? '官方资料采集'
        : '参考站采集'
    : '理论来源核验';
  return [
    {
      title: '从要素看风格',
      blocks: [
        link(`lab.html?style=${entry.id}`, '调配这个风格的设计要素'),
        {
          type: 'definitions',
          values: Object.entries(entry.composition || {}).map(
            ([key, value]) => [labels[key] || key, value],
          ),
        },
      ],
    },
    {
      title: '设计机制',
      blocks: [
        list(entry.principles),
        heading('设计重点'),
        paragraph(entry.productFocus),
        ...(entry.theme ? [heading('主题与情绪'), paragraph(entry.theme)] : []),
      ],
    },
    {
      title: '页面交互',
      blocks: [
        list(entry.interaction),
        heading('显示主题'),
        paragraph(themes[entry.themeBehavior.mode]),
        paragraph(entry.themeBehavior.control),
        paragraph(entry.themeBehavior.designReason),
        heading('声音与交互'),
        paragraph(sounds[entry.soundBehavior.kind]),
        paragraph(entry.soundBehavior.control),
        ...(entry.soundBehavior.interactionRole
          ? [paragraph(entry.soundBehavior.interactionRole)]
          : []),
      ],
    },
    {
      title: '约束与适用场景',
      blocks: [
        list(entry.constraints),
        ...(entry.useCases.length
          ? [heading('适合'), list(entry.useCases)]
          : []),
        ...(entry.avoid.length ? [heading('谨慎使用'), list(entry.avoid)] : []),
      ],
    },
    {
      title: '设计参数',
      blocks: [
        { type: 'palette', values: entry.tokens.palette },
        paragraph(`字体 · ${entry.tokens.type}`),
        paragraph(`布局 · ${entry.tokens.layout}`),
        paragraph(`动效 · ${entry.tokens.motion}`),
      ],
    },
    {
      title: '可复用 Prompt',
      blocks: [
        { type: 'prompt', text: entry.prompt, negative: entry.negativePrompt },
        heading('改造练习'),
        paragraph(entry.exercise),
      ],
    },
    ...(related.length
      ? [
          {
            title: '关联巧思',
            blocks: [
              link(
                `patterns.html#patterns?source=${entry.id}`,
                `按来源浏览全部 ${related.length} 项`,
              ),
              {
                type: 'links',
                values: related.map((pattern) => ({
                  href: `patterns.html#pattern/${pattern.id}?source=${entry.id}`,
                  text: pattern.title,
                })),
              },
            ],
          },
        ]
      : []),
    {
      title: '来源与证据',
      blocks: [
        { type: 'sources', values: entry.sources },
        paragraph(
          `${dateLabel}：${entry.referenceUrl ? entry.capturedAt : entry.theoryVerifiedAt}。`,
        ),
      ],
    },
    {
      title: '相关文档',
      blocks: [
        {
          type: 'links',
          values: documents.map(([file, text]) => ({
            href: file.endsWith('.md')
              ? 'docs.html?file=' + encodeURIComponent(file)
              : file,
            text,
          })),
        },
      ],
    },
  ];
}
