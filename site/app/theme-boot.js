(() => {
  let choice = 'system';
  try {
    choice = localStorage.getItem('atlas-color-scheme') || 'system';
  } catch {}
  if (!['system', 'dark', 'light'].includes(choice)) choice = 'system';
  const resolved =
    choice === 'system'
      ? matchMedia('(prefers-color-scheme:dark)').matches
        ? 'dark'
        : 'light'
      : choice;
  document.documentElement.dataset.atlasTheme = resolved;
  document.documentElement.dataset.atlasThemeChoice = choice;
  document.documentElement.dataset.theme = resolved;
  document.documentElement.style.colorScheme = resolved;
  if (new URLSearchParams(location.search).get('embed') === 'home')
    document.documentElement.dataset.labEmbed = 'home';
})();
