import type { ImgHTMLAttributes } from 'react';
import * as original from './upstream/lib/media';
export type { PersonId, PhotoId, MediaPerson, MediaPhoto } from './upstream/lib/media';
export function mediaUrl(path:string){return path.startsWith('/media/')?`demo${path.replace(/(\/people\/[^.]+)\.jpg$/,'$1.svg')}`:path;}
export const people=original.people.map(person=>({...person,src:mediaUrl(person.src)}));
export const photos=original.photos.map(photo=>({...photo,src:mediaUrl(photo.src)}));
export const person=(id:original.PersonId)=>people.find(item=>item.id===id)!;
export const photo=(id:original.PhotoId)=>photos.find(item=>item.id===id)!;
export const avatar=(id:original.PersonId)=>person(id).src;
export default function LocalImage({src,fill,priority,unoptimized,quality,loader,...props}:ImgHTMLAttributes<HTMLImageElement>&{src:string;fill?:boolean;priority?:boolean;unoptimized?:boolean;quality?:number;loader?:unknown}){
  return <img decoding="async" {...props} loading={props.loading??(priority?'eager':'lazy')} fetchPriority={priority?'high':props.fetchPriority} src={mediaUrl(src)} style={fill?{...props.style,position:'absolute',inset:0,width:'100%',height:'100%'}:props.style}/>;
}
