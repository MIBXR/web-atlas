import type { AnchorHTMLAttributes } from 'react';
export default function LocalLink({prefetch,...props}:AnchorHTMLAttributes<HTMLAnchorElement>&{prefetch?:boolean}){return <a {...props}/>;}
