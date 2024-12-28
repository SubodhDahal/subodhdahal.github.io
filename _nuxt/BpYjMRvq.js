import{a5 as x,W as N,X as S,a6 as B,a7 as O,a8 as U,a9 as $,L as q,D as E,n as p,g as H,q as I,u as C,aa as F,H as T,o as k,f as G,j,ab as J,G as V}from"./BgjGqOKH.js";async function X(e,t){return await Q(t).catch(i=>(console.error("Failed to get image meta for "+t,i+""),{width:0,height:0,ratio:0}))}async function Q(e){if(typeof Image>"u")throw new TypeError("Image not supported");return new Promise((t,r)=>{const i=new Image;i.onload=()=>{const n={width:i.width,height:i.height,ratio:i.width/i.height};t(n)},i.onerror=n=>r(n),i.src=e})}function M(e){return t=>t?e[t]||t:e.missingValue}function Y({formatter:e,keyMap:t,joinWith:r="/",valueMap:i}={}){e||(e=(s,o)=>`${s}=${o}`),t&&typeof t!="function"&&(t=M(t));const n=i||{};return Object.keys(n).forEach(s=>{typeof n[s]!="function"&&(n[s]=M(n[s]))}),(s={})=>Object.entries(s).filter(([d,c])=>typeof c<"u").map(([d,c])=>{const l=n[d];return typeof l=="function"&&(c=l(s[d])),d=typeof t=="function"?t(d):d,e(d,c)}).join(r)}function h(e=""){if(typeof e=="number")return e;if(typeof e=="string"&&e.replace("px","").match(/^\d+$/g))return parseInt(e,10)}function Z(e=""){if(e===void 0||!e.length)return[];const t=new Set;for(const r of e.split(" ")){const i=parseInt(r.replace("x",""));i&&t.add(i)}return Array.from(t)}function K(e){if(e.length===0)throw new Error("`densities` must not be empty, configure to `1` to render regular size only (DPR 1.0)")}function ee(e){const t={};if(typeof e=="string")for(const r of e.split(/[\s,]+/).filter(i=>i)){const i=r.split(":");i.length!==2?t["1px"]=i[0].trim():t[i[0].trim()]=i[1].trim()}else Object.assign(t,e);return t}function te(e){const t={options:e},r=(n,s={})=>D(t,n,s),i=(n,s={},o={})=>r(n,{...o,modifiers:O(s,o.modifiers||{})}).url;for(const n in e.presets)i[n]=(s,o,d)=>i(s,o,{...e.presets[n],...d});return i.options=e,i.getImage=r,i.getMeta=(n,s)=>ie(t,n,s),i.getSizes=(n,s)=>se(t,n,s),t.$img=i,i}async function ie(e,t,r){const i=D(e,t,{...r});return typeof i.getMeta=="function"?await i.getMeta():await X(e,i.url)}function D(e,t,r){var l,u;if(typeof t!="string"||t==="")throw new TypeError(`input must be a string (received ${typeof t}: ${JSON.stringify(t)})`);if(t.startsWith("data:"))return{url:t};const{provider:i,defaults:n}=re(e,r.provider||e.options.provider),s=ne(e,r.preset);if(t=x(t)?t:N(t),!i.supportsAlias)for(const m in e.options.alias)t.startsWith(m)&&(t=S(e.options.alias[m],t.substr(m.length)));if(i.validateDomains&&x(t)){const m=B(t).host;if(!e.options.domains.find(w=>w===m))return{url:t}}const o=O(r,s,n);o.modifiers={...o.modifiers};const d=o.modifiers.format;(l=o.modifiers)!=null&&l.width&&(o.modifiers.width=h(o.modifiers.width)),(u=o.modifiers)!=null&&u.height&&(o.modifiers.height=h(o.modifiers.height));const c=i.getImage(t,o,e);return c.format=c.format||d||"",c}function re(e,t){const r=e.options.providers[t];if(!r)throw new Error("Unknown provider: "+t);return r}function ne(e,t){if(!t)return{};if(!e.options.presets[t])throw new Error("Unknown preset: "+t);return e.options.presets[t]}function se(e,t,r){var g,b,_,z,W;const i=h((g=r.modifiers)==null?void 0:g.width),n=h((b=r.modifiers)==null?void 0:b.height),s=ee(r.sizes),o=(_=r.densities)!=null&&_.trim()?Z(r.densities.trim()):e.options.densities;K(o);const d=i&&n?n/i:0,c=[],l=[];if(Object.keys(s).length>=1){for(const f in s){const v=A(f,String(s[f]),n,d,e);if(v!==void 0){c.push({size:v.size,screenMaxWidth:v.screenMaxWidth,media:`(max-width: ${v.screenMaxWidth}px)`});for(const y of o)l.push({width:v._cWidth*y,src:P(e,t,r,v,y)})}}oe(c)}else for(const f of o){const v=Object.keys(s)[0];let y=A(v,String(s[v]),n,d,e);y===void 0&&(y={size:"",screenMaxWidth:0,_cWidth:(z=r.modifiers)==null?void 0:z.width,_cHeight:(W=r.modifiers)==null?void 0:W.height}),l.push({width:f,src:P(e,t,r,y,f)})}ae(l);const u=l[l.length-1],m=c.length?c.map(f=>`${f.media?f.media+" ":""}${f.size}`).join(", "):void 0,w=m?"w":"x",a=l.map(f=>`${f.src} ${f.width}${w}`).join(", ");return{sizes:m,srcset:a,src:u==null?void 0:u.src}}function A(e,t,r,i,n){const s=n.options.screens&&n.options.screens[e]||parseInt(e),o=t.endsWith("vw");if(!o&&/^\d+$/.test(t)&&(t=t+"px"),!o&&!t.endsWith("px"))return;let d=parseInt(t);if(!s||!d)return;o&&(d=Math.round(d/100*s));const c=i?Math.round(d*i):r;return{size:t,screenMaxWidth:s,_cWidth:d,_cHeight:c}}function P(e,t,r,i,n){return e.$img(t,{...r.modifiers,width:i._cWidth?i._cWidth*n:void 0,height:i._cHeight?i._cHeight*n:void 0},r)}function oe(e){var r;e.sort((i,n)=>i.screenMaxWidth-n.screenMaxWidth);let t=null;for(let i=e.length-1;i>=0;i--){const n=e[i];n.media===t&&e.splice(i,1),t=n.media}for(let i=0;i<e.length;i++)e[i].media=((r=e[i+1])==null?void 0:r.media)||""}function ae(e){e.sort((r,i)=>r.width-i.width);let t=null;for(let r=e.length-1;r>=0;r--){const i=e[r];i.width===t&&e.splice(r,1),t=i.width}}const de=Y({keyMap:{format:"f",fit:"fit",width:"w",height:"h",resize:"s",quality:"q",background:"b"},joinWith:"&",formatter:(e,t)=>$(e)+"_"+$(t)}),ce=(e,{modifiers:t={},baseURL:r}={},i)=>{t.width&&t.height&&(t.resize=`${t.width}x${t.height}`,delete t.width,delete t.height);const n=de(t)||"_";return r||(r=S(i.options.nuxt.baseURL,"/_ipx")),{url:S(r,n,U(e))}},le=!0,ue=!0,fe=Object.freeze(Object.defineProperty({__proto__:null,getImage:ce,supportsAlias:ue,validateDomains:le},Symbol.toStringTag,{value:"Module"})),L={screens:{xs:320,sm:640,md:768,lg:1024,xl:1280,xxl:1536,"2xl":1536},presets:{},provider:"ipxStatic",domains:[],alias:{},densities:[1,2],format:["webp"]};L.providers={ipxStatic:{provider:fe,defaults:{}}};const R=()=>{const e=E(),t=q();return t.$img||t._img||(t._img=te({...L,nuxt:{baseURL:e.app.baseURL}}))},ge={src:{type:String,required:!0},format:{type:String,default:void 0},quality:{type:[Number,String],default:void 0},background:{type:String,default:void 0},fit:{type:String,default:void 0},modifiers:{type:Object,default:void 0},preset:{type:String,default:void 0},provider:{type:String,default:void 0},sizes:{type:[Object,String],default:void 0},densities:{type:String,default:void 0},preload:{type:Boolean,default:void 0},width:{type:[String,Number],default:void 0},height:{type:[String,Number],default:void 0},alt:{type:String,default:void 0},referrerpolicy:{type:String,default:void 0},usemap:{type:String,default:void 0},longdesc:{type:String,default:void 0},ismap:{type:Boolean,default:void 0},loading:{type:String,default:void 0,validator:e=>["lazy","eager"].includes(e)},crossorigin:{type:[Boolean,String],default:void 0,validator:e=>["anonymous","use-credentials","",!0,!1].includes(e)},decoding:{type:String,default:void 0,validator:e=>["async","auto","sync"].includes(e)},nonce:{type:[String],default:void 0}},he=e=>{const t=p(()=>({provider:e.provider,preset:e.preset})),r=p(()=>({width:h(e.width),height:h(e.height),alt:e.alt,referrerpolicy:e.referrerpolicy,usemap:e.usemap,longdesc:e.longdesc,ismap:e.ismap,crossorigin:e.crossorigin===!0?"anonymous":e.crossorigin||void 0,loading:e.loading,decoding:e.decoding,nonce:e.nonce})),i=R(),n=p(()=>({...e.modifiers,width:h(e.width),height:h(e.height),format:e.format,quality:e.quality||i.options.quality,background:e.background,fit:e.fit}));return{options:t,attrs:r,modifiers:n}},me={...ge,placeholder:{type:[Boolean,String,Number,Array],default:void 0}},ve=H({name:"NuxtImg",props:me,emits:["load","error"],setup:(e,t)=>{const r=R(),i=he(e),n=I(!1),s=p(()=>r.getSizes(e.src,{...i.options.value,sizes:e.sizes,densities:e.densities,modifiers:{...i.modifiers.value,width:h(e.width),height:h(e.height)}})),o=p(()=>{const a={...i.attrs.value,"data-nuxt-img":""};return(!e.placeholder||n.value)&&(a.sizes=s.value.sizes,a.srcset=s.value.srcset),a}),d=p(()=>{let a=e.placeholder;if(a===""&&(a=!0),!a||n.value)return!1;if(typeof a=="string")return a;const g=Array.isArray(a)?a:typeof a=="number"?[a,a]:[10,10];return r(e.src,{...i.modifiers.value,width:g[0],height:g[1],quality:g[2]||50,blur:g[3]||3},i.options.value)}),c=p(()=>e.sizes?s.value.src:r(e.src,i.modifiers.value,i.options.value)),l=p(()=>d.value?d.value:c.value);if(e.preload){const a=Object.values(s.value).every(g=>g);C({link:[{rel:"preload",as:"image",nonce:e.nonce,...a?{href:s.value.src,imagesizes:s.value.sizes,imagesrcset:s.value.srcset}:{href:l.value}}]})}const u=I(),w=q().isHydrating;return F(()=>{if(d.value){const a=new Image;a.src=c.value,e.sizes&&(a.sizes=s.value.sizes||"",a.srcset=s.value.srcset),a.onload=g=>{n.value=!0,t.emit("load",g)};return}u.value&&(u.value.complete&&w&&(u.value.getAttribute("data-error")?t.emit("error",new Event("error")):t.emit("load",new Event("load"))),u.value.onload=a=>{t.emit("load",a)},u.value.onerror=a=>{t.emit("error",a)})}),()=>T("img",{ref:u,src:l.value,...o.value,...t.attrs})}}),ye=H({__name:"ProseImg",props:{src:{type:String,default:""},alt:{type:String,default:""},width:{type:[String,Number],default:void 0},height:{type:[String,Number],default:void 0}},setup(e){const t=e,r=p(()=>{var i;if((i=t.src)!=null&&i.startsWith("/")&&!t.src.startsWith("//")){const n=N(V(E().app.baseURL));if(n!=="/"&&!t.src.startsWith(n))return S(n,t.src)}return t.src});return(i,n)=>(k(),G(J(j(ve)),{src:j(r),alt:t.alt,width:t.width,height:t.height},null,8,["src","alt","width","height"]))}});export{ye as default};
