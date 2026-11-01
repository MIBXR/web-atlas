import { useState } from 'react';
import { SignupForm } from '../upstream/registry/blocks/signup-form/signup-form';
import { LogoMarquee } from '../upstream/registry/blocks/logo-marquee/logo-marquee';
import { PlanComparison } from '../upstream/registry/blocks/plan-comparison/plan-comparison';
import { ChangelogFeed } from '../upstream/registry/blocks/changelog-feed/changelog-feed';
import { SignIn } from '../upstream/registry/blocks/sign-in/sign-in';
import { PageHeader } from '../upstream/registry/blocks/page-header/page-header';
import { EmptyStates } from '../upstream/registry/blocks/empty-states/empty-states';
import { LoginCentered } from '../upstream/registry/blocks/login-centered/login-centered';
import { SiteHeaderBlock } from '../upstream/registry/blocks/site-header/site-header';
import { SiteFooterBlock } from '../upstream/registry/blocks/site-footer/site-footer';
import { HeroSectionBlock } from '../upstream/registry/blocks/hero-section/hero-section';
import { FaqSectionBlock } from '../upstream/registry/blocks/faq-section/faq-section';
import { ContactSectionBlock } from '../upstream/registry/blocks/contact-section/contact-section';
import { BlogGrid } from '../upstream/registry/blocks/blog-grid/blog-grid';
import { blogPosts } from '../upstream/registry/blocks/blog-grid/blog-grid-data';
import { mediaUrl } from '../media';
import { ComparisonTableBlock } from '../upstream/registry/blocks/comparison-table/comparison-table';
import { StatsBandBlock } from '../upstream/registry/blocks/stats-band/stats-band';
import { CtaSectionBlock } from '../upstream/registry/blocks/cta-section/cta-section';
import { NewsletterSignupBlock } from '../upstream/registry/blocks/newsletter-signup/newsletter-signup';

export const blockIds=['signup-form','logo-marquee','plan-comparison','changelog-feed','sign-in','page-header','empty-states','login-centered','site-header','site-footer','hero-section','faq-section','contact-section','blog-grid','comparison-table','stats-band','cta-section','newsletter-signup'];
const brands=[{name:'Figma',icon:'demo/block-logos/figma.svg',colorIcon:'demo/block-logos/figma-color.svg'},{name:'Linear',icon:'demo/block-logos/linear.svg',color:'#5E6AD2'},{name:'Notion',icon:'demo/block-logos/notion.svg'},{name:'Slack',icon:'demo/block-logos/slack.svg',colorIcon:'demo/block-logos/slack-color.svg'},{name:'GitHub',icon:'demo/block-logos/github.svg'},{name:'Stripe',icon:'demo/block-logos/stripe.svg',color:'#635BFF'},{name:'Vercel',icon:'demo/block-logos/vercel.svg'}];
const localPosts=blogPosts.map(post=>({...post,image:post.image&&{...post.image,src:mediaUrl(post.image.src)},author:{...post.author,avatar:post.author.avatar&&mediaUrl(post.author.avatar)}}));
export function BlocksPreview({id}:{id:string}){
  const [status,setStatus]=useState('');
  const [tone,setTone]=useState<'color'|'mono'>('color');
  let view;
  switch(id){
    case 'signup-form':view=<SignupForm onSubmit={async details=>{await new Promise(resolve=>setTimeout(resolve,1000));setStatus(`${details.name || details.email}: account created in this preview`);}} onProvider={provider=>setStatus(`${provider} sign-up selected in this preview`)}/>;break;
    case 'logo-marquee':view=<><div className="example-row"><button className="plain-button" onClick={()=>setTone(tone==='color'?'mono':'color')}>{tone==='color'?'Monochrome logos':'Color logos'}</button></div><LogoMarquee brands={brands} tone={tone}/></>;break;
    case 'plan-comparison':view=<PlanComparison/>;break;
    case 'changelog-feed':view=<ChangelogFeed/>;break;
    case 'sign-in':view=<SignIn onSignIn={account=>setStatus(`${account.name}: signed in within this preview`)}/>;break;
    case 'page-header':view=<PageHeader/>;break;
    case 'empty-states':view=<EmptyStates/>;break;
    case 'login-centered':view=<LoginCentered onSignIn={email=>setStatus(`${email}: signed in within this preview`)}/>;break;
    case 'site-header':view=<SiteHeaderBlock/>;break;
    case 'site-footer':view=<SiteFooterBlock/>;break;
    case 'hero-section':view=<HeroSectionBlock/>;break;
    case 'faq-section':view=<FaqSectionBlock/>;break;
    case 'contact-section':view=<ContactSectionBlock/>;break;
    case 'blog-grid':view=<BlogGrid posts={localPosts}/>;break;
    case 'comparison-table':view=<ComparisonTableBlock/>;break;
    case 'stats-band':view=<StatsBandBlock/>;break;
    case 'cta-section':view=<CtaSectionBlock/>;break;
    case 'newsletter-signup':view=<NewsletterSignupBlock/>;break;
  }
  return <><div className={`block-preview ${['signup-form','sign-in','login-centered'].includes(id)?'form-block':''}`}>{view}</div><p className="preview-status" role="status">{status}</p></>;
}
