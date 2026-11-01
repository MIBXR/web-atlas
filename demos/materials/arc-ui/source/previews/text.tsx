import { useState } from 'react';
import { Button } from '../upstream/registry/components/button/button';
import { TextReveal } from '../upstream/registry/components/text-reveal/text-reveal';
import { InViewTitle } from '../upstream/registry/components/in-view-title/in-view-title';
import { TextMorph } from '../upstream/registry/components/text-morph/text-morph';
import { TextShimmer } from '../upstream/registry/components/text-shimmer/text-shimmer';
import { SlotText } from '../upstream/registry/components/slot-text/slot-text';
import { ExpandableText } from '../upstream/registry/components/expandable-text/expandable-text';

export const textIds=['text-reveal','in-view-title','text-morph','text-shimmer','slot-text','expandable-text'];
export function TextPreview({id}:{id:string}){
  const [iteration,setIteration]=useState(0);
  const [active,setActive]=useState(true);
  let view;
  switch(id){
    case 'text-reveal':view=<TextReveal key={iteration} text="Small details. A better feeling." as="h2"/>;break;
    case 'in-view-title':view=<div key={iteration} className="example-stack"><InViewTitle text="Make room for the work." as="h2"/><InViewTitle text="One clear idea at a time." as="h3" once={false}/></div>;break;
    case 'text-morph':view=<div className="morph-line">Make it <TextMorph as="strong">{['useful.','clear.','feel right.','your own.'][iteration%4]}</TextMorph></div>;break;
    case 'text-shimmer':view=<div className="example-stack"><TextShimmer active={active} as="h2">Thinking through the details</TextShimmer><Button variant="secondary" onClick={()=>setActive(!active)}>{active?'Pause shimmer':'Resume shimmer'}</Button></div>;break;
    case 'slot-text':view=<div className="slot-examples"><SlotText value={[12480,18420,976,28750][iteration%4]} format={value=>`$${value.toLocaleString('en-US')}`}/><SlotText value={['DESIGN','MOTION','BUILD','SHIP'][iteration%4]}/></div>;break;
    case 'expandable-text':view=<ExpandableText lines={3}><p>A good interface gives every detail a reason to be there. Motion can help someone understand where they are, what changed, and what to do next. It works best when the behavior follows a clear idea: a surface grows around its content, a selected label keeps its place, or a result arrives exactly where the action began.</p><p>Arc components keep those decisions in plain source. You can change the content, adjust the tokens, and fit the pieces to your own product while keeping keyboard support and reduced motion in place.</p></ExpandableText>;break;
  }
  return <div className="text-preview"><div className="text-stage">{view}</div>{!['text-shimmer','expandable-text'].includes(id)&&<Button variant="secondary" onClick={()=>setIteration(value=>value+1)}>{['text-morph','slot-text'].includes(id)?'Change text':'Replay animation'}</Button>}</div>;
}
