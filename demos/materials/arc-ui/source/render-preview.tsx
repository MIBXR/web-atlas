import { lazy, Suspense } from 'react';
import { ToastStackProvider } from './upstream/registry/components/toast-stack/toast-stack';
import type { Theme, ThemeSwitchVariant } from './upstream/registry/components/theme-switch/theme-switch';

const views={
  actions:lazy(()=>import('./previews/actions').then(module=>({default:module.ActionsPreview}))),
  inputs:lazy(()=>import('./previews/inputs').then(module=>({default:module.InputsPreview}))),
  content:lazy(()=>import('./previews/content').then(module=>({default:module.ContentPreview}))),
  charts:lazy(()=>import('./previews/charts').then(module=>({default:module.ChartsPreview}))),
  text:lazy(()=>import('./previews/text').then(module=>({default:module.TextPreview}))),
  blocks:lazy(()=>import('./previews/blocks').then(module=>({default:module.BlocksPreview})))
};

export function RenderPreview({id,group,theme,onThemeChange}:{id:string;group:string;theme:Theme;onThemeChange:(next:Theme,variant:ThemeSwitchVariant,trigger:HTMLElement)=>void}){
  const View=views[group as keyof typeof views];
  return <ToastStackProvider key={id}><Suspense fallback={<p className="loading">正在载入组件…</p>}><View id={id} theme={theme} onThemeChange={onThemeChange}/></Suspense></ToastStackProvider>;
}
