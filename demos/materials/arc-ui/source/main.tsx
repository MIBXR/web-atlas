import { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { MotionConfig } from 'motion/react';
import { Button } from './upstream/registry/components/button/button';
import { MorphSelect } from './upstream/registry/components/morph-select/morph-select';
import { ElasticSlider } from './upstream/registry/components/elastic-slider/elastic-slider';
import { BillingToggle } from './upstream/registry/components/billing-toggle/billing-toggle';
import { AnimatedCounter } from './upstream/registry/components/animated-counter/animated-counter';
import { Tabs, TabsList, TabsTrigger, TabsContent } from './upstream/registry/components/tabs/tabs';
import { Dialog, DialogTrigger, DialogContent, DialogClose } from './upstream/registry/components/dialog/dialog';
import { LineChart } from './upstream/registry/components/line-chart/line-chart';
import { ToastStackProvider, ToastStack, useToastStack } from './upstream/registry/components/toast-stack/toast-stack';

const samples = [
  {id:'buttons',title:'按钮反馈',component:'Button',description:'同一按钮在主操作、次操作、禁用与结果状态之间保持位置，标签与图标在原组件内交接。'},
  {id:'morph-select',title:'形变选择器',component:'MorphSelect',description:'触发器本身长成选项面板；选中标签从列表回到触发器，宽度随内容收束。'},
  {id:'elastic-slider',title:'弹性滑块',component:'ElasticSlider',description:'拖过端点时轨道产生阻力，松手后回弹；刻度吸附与键盘步进使用同一数值。'},
  {id:'tabs',title:'标签切换',component:'Tabs',description:'选中底板在标签之间移动，内容根据方向进入；键盘方向键可以切换当前面板。'},
  {id:'billing',title:'计费周期',component:'BillingToggle / AnimatedCounter',description:'切换计费周期时，底板、优惠标签与价格数字一起更新；业务数值是本地示例。'},
  {id:'chart',title:'折线图',component:'LineChart',description:'切换时间范围时复用同一条路径，图例控制系列显隐；指针与键盘都能读取数据。'},
  {id:'dialog',title:'对话框',component:'Dialog',description:'原组件管理浮层、焦点限制、Escape 与关闭后的焦点返回，示例只更新页面内状态。'},
  {id:'toast',title:'通知堆叠',component:'ToastStack',description:'新通知从底部入场，旧通知缩进后方；悬停或聚焦展开，支持关闭与撤回。'}
];

function ButtonsDemo(){
  const [saved,setSaved]=useState(false);
  return <div className="stack"><div className="row"><Button onClick={()=>setSaved(!saved)}>{saved?'已加入收藏':'加入收藏'}</Button><Button variant="secondary" onClick={()=>setSaved(false)}>重置</Button><Button variant="ghost" disabled>暂无更新</Button></div><p className="status" role="status">{saved?'已收藏这份参考；再次点击可以移除。':'点击按钮，观察按压与文字交接。'}</p></div>;
}
function SelectDemo(){
  const [value,setValue]=useState('design');
  return <div className="stack"><MorphSelect label="工作方向" value={value} onValueChange={setValue} items={[{value:'design',label:'界面设计',meta:'12 项'},{value:'motion',label:'动态设计',meta:'8 项'},{value:'code',label:'前端实现',meta:'16 项'},{value:'archive',label:'资料整理',meta:'6 项'}]}/><p className="status">当前值：{value}</p></div>;
}
function SliderDemo(){const [value,setValue]=useState(40);return <div className="stack"><ElasticSlider label="预览强度" value={value} onValueChange={setValue} min={0} max={100} step={5} marks={[0,25,50,75,100]} format={v=>`${v}%`}/><p className="status">拖动滑块或按方向键；Home / End 到达两端。</p></div>;}
function TabsDemo(){return <Tabs defaultValue="layout"><TabsList aria-label="设计内容"><TabsTrigger value="layout">布局</TabsTrigger><TabsTrigger value="motion">动效</TabsTrigger><TabsTrigger value="source">源码</TabsTrigger></TabsList><TabsContent value="layout"><p className="tab-copy">用稳定的对齐线组织标题、正文与操作。内容变长时，面板按真实高度调整。</p></TabsContent><TabsContent value="motion"><p className="tab-copy">底板与内容共享当前项。快速来回切换时，由组件接续正在进行的动画。</p></TabsContent><TabsContent value="source"><p className="tab-copy">完整免费源码在 source/upstream/，保留原始目录、CSS Modules 与 MIT 许可。</p></TabsContent></Tabs>;}
function BillingDemo(){const [value,setValue]=useState('monthly');return <><BillingToggle value={value} onValueChange={setValue} label="计费周期" options={[{value:'monthly',label:'按月'},{value:'yearly',label:'按年',badge:'节省 20%',activeBadge:'每年节省 ¥48'}]}/><p className="price"><AnimatedCounter value={value==='monthly'?20:16} prefix="¥"/><small> / 月</small></p><p className="status">本地演示价格，不发生订阅或付款。</p></>;}
const chartSeries=[{key:'current',label:'本期',color:'var(--accent)'},{key:'previous',label:'上期',dashed:true,color:'var(--text-muted)'}];
const chartData=(days:number)=>Array.from({length:days},(_,i)=>({key:`day-${i}`,label:`第 ${i+1} 天`,axisLabel:i%Math.max(1,Math.floor(days/5))===0?`${i+1}日`:'',values:{current:[32,48,42,66,58,80,92,74,102,88,122,112,140,128][i%14],previous:[24,30,38,32,48,44,60,58,68,60,80,76,92,88][i%14]}}));
function ChartDemo(){const [days,setDays]=useState(7);return <div className="stack"><div className="row"><Button variant={days===7?'primary':'secondary'} onClick={()=>setDays(7)}>近 7 天</Button><Button variant={days===14?'primary':'secondary'} onClick={()=>setDays(14)}>近 14 天</Button></div><LineChart data={chartData(days)} series={chartSeries} label="参考收录数量示例" height={220} categoryLabel="日期"/></div>;}
function DialogDemo(){const [saved,setSaved]=useState(false);return <div className="stack"><Dialog><DialogTrigger asChild><Button>整理资料</Button></DialogTrigger><DialogContent title="归档这份参考？" description="这只会改变当前样例中的状态。"><p>确认后可以用重置按钮恢复。</p><div className="row"><DialogClose asChild><Button variant="secondary">取消</Button></DialogClose><DialogClose asChild><Button onClick={()=>setSaved(true)}>确认归档</Button></DialogClose></div></DialogContent></Dialog><p role="status">{saved?'这份参考已在样例中归档。':'资料仍在待整理列表。'}</p><Button variant="ghost" onClick={()=>setSaved(false)}>重置状态</Button></div>;}
function ToastDemo(){const {toast,dismiss,update}=useToastStack();return <div className="stack toast-stage"><div className="row"><Button onClick={()=>toast({title:'参考已收藏',description:'可在本次浏览中继续整理。',type:'success',action:{label:'撤回',onClick:id=>update(id,{title:'已撤回收藏',description:undefined,type:'info',action:undefined})}})}>添加通知</Button><Button variant="secondary" onClick={()=>dismiss()}>清空通知</Button></div><p className="status">连续添加几条，再将焦点或指针移到通知上。</p><ToastStack label="操作结果" contained position="bottom-center"/></div>;}
const views=[ButtonsDemo,SelectDemo,SliderDemo,TabsDemo,BillingDemo,ChartDemo,DialogDemo,ToastDemo];

function App(){
  const query=new URLSearchParams(location.search).get('demo')||'buttons';
  const [sample,setSample]=useState(query);
  const [dark,setDark]=useState(false);
  const [accent,setAccent]=useState('violet');
  const [reduced,setReduced]=useState(false);
  const index=samples.findIndex(item=>item.id===sample);
  if(index<0) throw new Error(`未知样例：${sample}`);
  const current=samples[index],View=views[index];
  useEffect(()=>{document.documentElement.dataset.theme=dark?'dark':'light';document.documentElement.dataset.accent=accent;document.documentElement.dataset.reduced=String(reduced);},[dark,accent,reduced]);
  function choose(id:string){setSample(id);history.replaceState(null,'',`?demo=${id}`);}
  return <MotionConfig reducedMotion={reduced?'always':'user'}><ToastStackProvider><header className="topbar"><div className="brand">Arc UI<span>源码组件样例</span></div><div className="settings"><button className="plain-button" onClick={()=>setDark(!dark)}>{dark?'浅色主题':'深色主题'}</button><label>强调色<select value={accent} onChange={e=>setAccent(e.target.value)}><option value="violet">紫色</option><option value="blue">蓝色</option><option value="green">绿色</option><option value="neutral">中性</option></select></label><label><input type="checkbox" checked={reduced} onChange={e=>setReduced(e.target.checked)}/>减少动态</label></div></header><div className="layout"><nav className="samples" aria-label="组件样例"><p>真实组件 · 本地组合</p>{samples.map(item=><a href={`?demo=${item.id}`} key={item.id} aria-current={sample===item.id?'page':undefined} onClick={e=>{e.preventDefault();choose(item.id);}}>{item.title}</a>)}</nav><main><p className="eyebrow">ARC / OPEN SOURCE</p><h1>{current.title}</h1><p className="intro">{current.description}</p><section className="stage" aria-label={current.title} key={sample}><div className="stage-inner"><View/></div></section><aside className="demo-note"><p>使用组件：<code>{current.component}</code></p><p>组件逻辑和样式来自固定提交的免费源码；中文文案、示例数据与这套样例界面由本库编写。</p></aside><footer className="footer"><a href="https://uiarc.dev/" target="_blank" rel="noreferrer">查看官网</a><a href="source/upstream/README.md" target="_blank">上游使用说明</a><a href="LICENSES.md" target="_blank">许可</a></footer></main></div></ToastStackProvider></MotionConfig>;
}
createRoot(document.getElementById('root')!).render(<App/>);
