const favoriteFormat = 'web-atlas-favorites';

function favoriteValues(data) {
  if (
    data.format !== favoriteFormat ||
    ['cases', 'patterns', 'materials'].some(
      (kind) => !Array.isArray(data[kind]),
    )
  )
    throw new Error('请选择导出的收藏 JSON 文件。');
  return data;
}

export const project = {
  name: 'Web Atlas',
  wordmark: 'WEB ATLAS',
  tagline: '从案例到实践',
  repository: 'MIBXR/web-atlas',
  mark: 'M24 8 88 72 72 88 8 24Z M8 72 72 8 88 24 24 88Z',
  labName: '设计实验室',
  themeKey: 'atlas-color-scheme',
  themeJSON: false,
  themeOrder: ['system', 'dark', 'light'],
  favoriteKey: favoriteFormat,
  readStoredFavorites: favoriteValues,
  readFavoriteBackup: favoriteValues,
  favoriteStorage: (values) => ({ format: favoriteFormat, ...values }),
  favoriteBackup: (values) => ({ format: favoriteFormat, ...values }),
  favoriteFilename: 'web-atlas-favorites.json',
  assetAPI: 'AtlasAssets',
  cacheAPI: 'AtlasAssetCache',
  footerDescription: '从案例到实践，让设计依据进入你的作品。',
  methodologyDocument: 'docs/overview.md',
  documentURL: (file, anchor = '') =>
    'docs.html?file=' +
    encodeURIComponent(file) +
    (anchor ? '#' + encodeURIComponent(anchor) : ''),
  documentLocation: (url) => ({
    file: url.searchParams.get('file') || 'docs/guide.md',
    anchor: decodeURIComponent(url.hash.slice(1)),
  }),
  documentTocLevels: [1, 2],
};
