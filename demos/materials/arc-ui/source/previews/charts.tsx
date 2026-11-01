import { useState } from 'react';
import { Button } from '../upstream/registry/components/button/button';
import { LineChart } from '../upstream/registry/components/line-chart/line-chart';
import { BarChart } from '../upstream/registry/components/bar-chart/bar-chart';
import { DonutChart } from '../upstream/registry/components/donut-chart/donut-chart';
import { Streamgraph } from '../upstream/registry/components/streamgraph/streamgraph';
import { BrushChart } from '../upstream/registry/components/brush-chart/brush-chart';
import { Ridgeline } from '../upstream/registry/components/ridgeline/ridgeline';
import { Treemap } from '../upstream/registry/components/treemap/treemap';
import { WaffleChart } from '../upstream/registry/components/waffle-chart/waffle-chart';
import { SlopeChart } from '../upstream/registry/components/slope-chart/slope-chart';
import { Sparkline } from '../upstream/registry/components/sparkline/sparkline';
import { Gauge } from '../upstream/registry/components/gauge/gauge';
import { AnimatedCounter } from '../upstream/registry/components/animated-counter/animated-counter';
import { ActivityHeatmap } from '../upstream/registry/components/activity-heatmap/activity-heatmap';

export const chartIds=['line-chart','bar-chart','donut-chart','streamgraph','brush-chart','ridgeline','treemap','waffle-chart','slope-chart','sparkline','gauge','animated-counter','activity-heatmap'];
const series=[{key:'direct',label:'Direct',color:'var(--series-1)',area:true},{key:'organic',label:'Organic',color:'var(--series-2)',dashed:true},{key:'referral',label:'Referral',color:'var(--series-3)'}];
const base=[42,58,51,73,68,82,96,84,112,101,128,119,148,136,157,142,173,159,186,176,201,189,216,208,231,224,247,235,264,251];
const day=86400000;
const epoch=Date.UTC(2026,8,1);
const density=Array.from({length:96},(_,i)=>15+(i*29%90)+Math.sin(i*.9)*18);

export function ChartsPreview({id}:{id:string}){
  const [range,setRange]=useState(14);
  const [changed,setChanged]=useState(false);
  const [empty,setEmpty]=useState(false);
  const [selected,setSelected]=useState<string|null>(null);
  const values=base.slice(0,range).map((v,i)=>Math.round(v*(changed?.72:1)+Math.sin(i*.8)*(changed?24:0)));
  const data=empty?[]:values.map((v,i)=>({key:`day-${i}`,label:`Sep ${i+1}`,axisLabel:i%Math.max(1,Math.floor(range/6))===0?String(i+1):'',values:{direct:v,organic:Math.round(v*.62+Math.cos(i)*12),referral:Math.round(v*.27+Math.sin(i)*8)}}));
  const segments=empty?[]:[{key:'design',label:'Design',value:changed?28:42},{key:'engineering',label:'Engineering',value:changed?47:31},{key:'marketing',label:'Marketing',value:changed?18:18},{key:'other',label:'Other',value:changed?7:9}];
  let view;
  switch(id){
    case 'line-chart':view=<LineChart data={data} series={series} label="Revenue by channel" height={280} unit="USD"/>;break;
    case 'bar-chart':view=<BarChart data={empty?[]:values.map((value,i)=>({key:`day-${i}`,label:`Sep ${i+1}`,axisLabel:i%2===0?String(i+1):'',value}))} label="Active minutes" period={`Sep 1–${range}, 2026`} unit="min" height={260}/>;break;
    case 'donut-chart':view=<DonutChart data={segments} label="Workspace allocation" unit="%" size={240}/>;break;
    case 'streamgraph':view=<Streamgraph data={data} series={series} label="Traffic sources" unit="visits" height={280} directLabels/>;break;
    case 'brush-chart':view=<BrushChart data={empty?[]:Array.from({length:180},(_,i)=>({date:epoch+i*day,value:base[i%base.length]*4+Math.sin(i*.15)*110+(changed?150:0)}))} label="Daily active users" unit="users" height={230} defaultRange={[epoch+100*day,epoch+150*day]} annotations={[{date:epoch+120*day,label:'v2 launch',description:'A new product release'}]}/>;break;
    case 'ridgeline':view=<Ridgeline label="Response time by region" unit="ms" series={empty?[]:['North America','Europe','Asia Pacific','Latin America','Middle East'].map((label,index)=>({id:`region-${index}`,label,values:density.map((value,i)=>value+index*14+Math.sin(i*.3)*(changed?25:8))}))} rowHeight={62} tint/>;break;
    case 'treemap':view=<Treemap label="Revenue by team" height={340} data={{id:'root',label:'All teams',children:empty?[]:[{id:'product',label:'Product',children:segments.slice(0,2).map(s=>({id:s.key,label:s.label,value:s.value*1000,color:s.value}))},{id:'growth',label:'Growth',children:segments.slice(2).map(s=>({id:s.key,label:s.label,value:s.value*1000,color:s.value}))}]}} formatValue={value=>`$${value.toLocaleString('en-US')}`} colorLabel="Growth"/>;break;
    case 'waffle-chart':view=<WaffleChart data={segments} label="How the week is spent" unit="%" columns={10} rows={10}/>;break;
    case 'slope-chart':view=<SlopeChart label="Retention by team" startLabel="Last quarter" endLabel="This quarter" data={empty?[]:[{key:'design',label:'Design',start:64,end:changed?68:82},{key:'engineering',label:'Engineering',start:78,end:changed?91:72},{key:'marketing',label:'Marketing',start:42,end:57},{key:'support',label:'Support',start:56,end:61}]} height={280} formatValue={value=>`${value}%`}/>;break;
    case 'sparkline':view=<div className="sparkline-examples">{(['accent','success','warning','danger'] as const).map((tone,index)=><Sparkline key={tone} label={['Revenue','Subscribers','Open requests','Response time'][index]} data={empty?[]:values.map((value,i)=>index%2===0?value:value+Math.cos(i)*80)} value={changed?'$18,420':'$12,480'} change={index%2===0?'+18.7%':'−4.2%'} tone={tone} width={240} height={70} interactive area/>)}</div>;break;
    case 'gauge':view=<div className="gauge-examples"><Gauge value={changed?88:64} label="Performance" detail="Compared to your target" thresholds={[{from:0,tone:'danger',label:'Needs attention'},{from:40,tone:'warning',label:'Getting there'},{from:75,tone:'success',label:'On track'}]}/><Gauge value={changed?42:78} label="Storage" detail="GB of 100 GB" tone="accent"/></div>;break;
    case 'animated-counter':view=<div className="counter-examples"><div><small>Revenue</small><AnimatedCounter value={changed?18420:12480} prefix="$"/></div><div><small>Conversion</small><AnimatedCounter value={changed?4.8:3.6} suffix="%" decimals={1}/></div><div><small>Subscribers</small><AnimatedCounter value={changed?1284:976}/></div></div>;break;
    case 'activity-heatmap':view=<ActivityHeatmap label="Project contributions" period="2026" days={empty?[]:Array.from({length:365},(_,i)=>({date:new Date(Date.UTC(2026,0,1)+i*day).toISOString().slice(0,10),count:(i*17+Math.floor(i/7)*3+(changed?8:0))%19===0?0:(i*13)%11}))} selectedDate={selected} onSelectDate={setSelected}/>;break;
  }
  return <div className="chart-preview"><div className="chart-actions">{['line-chart','bar-chart','streamgraph','sparkline'].includes(id)&&<div className="example-row">{[7,14,30].map(days=><Button key={days} size="sm" variant={range===days?'primary':'secondary'} onClick={()=>setRange(days)}>{days} days</Button>)}</div>}<div className="example-row"><Button size="sm" variant="secondary" onClick={()=>setChanged(!changed)}>Update data</Button>{!['gauge','animated-counter'].includes(id)&&<Button size="sm" variant="ghost" onClick={()=>setEmpty(!empty)}>{empty?'Restore data':'Empty state'}</Button>}</div></div>{view}</div>;
}
