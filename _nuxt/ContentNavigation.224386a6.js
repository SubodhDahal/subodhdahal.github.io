import{h as b,_ as r,l as m,q as s,I as j,i as N,J as $,s as c,K as k,L as y,u as B,M as C,z as v,y as S,N as x,O as L,b as A,e as T,P as w,k as M,d as o,t as z,Q as H,m as q,R as F}from"./entry.048b6b8c.js";import{q as Q,h as g,e as U,j as W,u as G}from"./query.c85b9db2.js";import{w as O,s as J,u as K}from"./utils.12cd6b98.js";import{u as Y}from"./preview.c620e5e0.js";/* empty css                 */import"./ContentDoc.64a1e7f8.js";import"./ContentList.36bead4e.js";import"./ContentQuery.dcecbe08.js";import"./ContentRenderer.8e3fab1e.js";import"./ContentRendererMarkdown.b03f8cad.js";import"./ContentSlot.c0bb830e.js";import"./DocumentDrivenEmpty.07ca1d65.js";import"./DocumentDrivenNotFound.0c168ea1.js";import"./Markdown.53161ac2.js";import"./ProseCode.0b363cf4.js";import"./index.68c44503.js";const X=async t=>{const{content:e}=b().public;typeof(t==null?void 0:t.params)!="function"&&(t=Q(t));const i=t.params(),u=e.experimental.stripQueryParameters?O(`/navigation/${`${g(i)}.${e.integrity}`}/${U(i)}.json`):O(`/navigation/${g(i)}.${e.integrity}.json`);if(J())return(await r(()=>import("./client-db.98c44a05.js"),["./client-db.98c44a05.js","./entry.048b6b8c.js","./entry.6d893e36.css","./query.c85b9db2.js","./utils.12cd6b98.js","./preview.c620e5e0.js","./index.68c44503.js"],import.meta.url).then(l=>l.generateNavigation))(i);const a=await $fetch(u,{method:"GET",responseType:"json",params:e.experimental.stripQueryParameters?void 0:{_params:W(i),previewToken:Y().getPreviewToken()}});if(typeof a=="string"&&a.startsWith("<!DOCTYPE html>"))throw new Error("Not found");return a};const I={},Z=m({props:{name:String},async setup(t,e){const i=await I[t.name]().then(u=>u.default||u);return()=>s(i,{},e.slots)}}),tt=m({props:{name:{type:[String,Boolean,Object],default:null}},setup(t,e){const i=j("_route"),u=i===N()?$():i,a=c(()=>{var n,l;return(l=(n=B(t.name))!=null?n:u.meta.layout)!=null?l:"default"});return()=>{var d;const n=a.value&&a.value in I,l=(d=u.meta.layoutTransition)!=null?d:k;return y(C,n&&l,{default:()=>y(Z,n&&{key:a.value,name:a.value,hasTransition:void 0},e.slots).default()}).default()}}}),et=Object.freeze(Object.defineProperty({__proto__:null,default:tt},Symbol.toStringTag,{value:"Module"})),rt=m({emits:{error(t){return!0}},setup(t,{slots:e,emit:i}){const u=v(null),a=S();return x(n=>{if(!a.isHydrating)return i("error",n),u.value=n,!1}),()=>{var n,l;return u.value?(n=e.error)==null?void 0:n.call(e,{error:u}):(l=e.default)==null?void 0:l.call(e)}}}),ot=Object.freeze(Object.defineProperty({__proto__:null,default:rt},Symbol.toStringTag,{value:"Module"})),it=m({name:"ClientOnly",inheritAttrs:!1,props:["fallback","placeholder","placeholderTag","fallbackTag"],setup(t,{slots:e,attrs:i}){const u=v(!1);return L(()=>{u.value=!0}),a=>{var _;if(u.value)return(_=e.default)==null?void 0:_.call(e);const n=e.fallback||e.placeholder;if(n)return n();const l=a.fallback||a.placeholder||"",d=a.fallbackTag||a.placeholderTag||"span";return A(d,i,l)}}}),E=new WeakMap;function nt(t){if(E.has(t))return E.get(t);const e={...t};return e.render?e.render=(i,...u)=>{var a;if(i.mounted$){const n=t.render(i,...u);return n.children===null||typeof n.children=="string"?T(n.type,n.props,n.children,n.patchFlag,n.dynamicProps,n.shapeFlag):s(n)}else return s("div",(a=i.$attrs)!=null?a:i._.attrs)}:e.template&&(e.template=`
      <template v-if="mounted$">${t.template}</template>
      <template v-else><div></div></template>
    `),e.setup=(i,u)=>{var n;const a=v(!1);return L(()=>{a.value=!0}),Promise.resolve(((n=t.setup)==null?void 0:n.call(t,i,u))||{}).then(l=>typeof l!="function"?{...l,mounted$:a}:(...d)=>{if(a.value){const _=l(...d);return _.children===null||typeof _.children=="string"?T(_.type,_.props,_.children,_.patchFlag,_.dynamicProps,_.shapeFlag):s(_)}else return s("div",u.attrs)})},E.set(t,e),e}const at=Object.freeze(Object.defineProperty({__proto__:null,default:it,createClientOnly:nt},Symbol.toStringTag,{value:"Module"})),ut=m({name:"DevOnly",setup(t,e){return()=>null}}),lt=Object.freeze(Object.defineProperty({__proto__:null,default:ut},Symbol.toStringTag,{value:"Module"})),_t=m({name:"ServerPlaceholder",render(){return A("div")}}),mt=Object.freeze(Object.defineProperty({__proto__:null,default:_t},Symbol.toStringTag,{value:"Module"})),dt=m({name:"NuxtLoadingIndicator",props:{throttle:{type:Number,default:200},duration:{type:Number,default:2e3},height:{type:Number,default:3},color:{type:String,default:"repeating-linear-gradient(to right,#00dc82 0%,#34cdfe 50%,#0047e1 100%)"}},setup(t,{slots:e}){const i=st({duration:t.duration,throttle:t.throttle}),u=S();return u.hook("page:start",i.start),u.hook("page:finish",i.finish),w(()=>i.clear),()=>s("div",{class:"nuxt-loading-indicator",style:{position:"fixed",top:0,right:0,left:0,pointerEvents:"none",width:`${i.progress.value}%`,height:`${t.height}px`,opacity:i.isLoading.value?1:0,background:t.color,backgroundSize:`${100/i.progress.value*100}% auto`,transition:"width 0.1s, height 0.4s, opacity 0.4s",zIndex:999999}},e)}});function st(t){const e=v(0),i=v(!1),u=c(()=>1e4/t.duration);let a=null,n=null;function l(){_(),e.value=0,i.value=!0,t.throttle?n=setTimeout(P,t.throttle):P()}function d(){e.value=100,D()}function _(){clearInterval(a),clearTimeout(n),a=null,n=null}function R(V){e.value=Math.min(100,e.value+V)}function D(){_(),setTimeout(()=>{i.value=!1,setTimeout(()=>{e.value=0},400)},500)}function P(){a=setInterval(()=>{R(u.value)},100)}return{progress:e,isLoading:i,start:l,finish:d,clear:_}}const pt=Object.freeze(Object.defineProperty({__proto__:null,default:dt},Symbol.toStringTag,{value:"Module"})),ft=t=>Object.fromEntries(Object.entries(t).filter(([,e])=>e!==void 0)),f=(t,e)=>(i,u)=>(M(()=>t({...ft(i),...u.attrs},u)),()=>{var a,n;return e?(n=(a=u.slots).default)==null?void 0:n.call(a):null}),h={accesskey:String,autocapitalize:String,autofocus:{type:Boolean,default:void 0},class:String,contenteditable:{type:Boolean,default:void 0},contextmenu:String,dir:String,draggable:{type:Boolean,default:void 0},enterkeyhint:String,exportparts:String,hidden:{type:Boolean,default:void 0},id:String,inputmode:String,is:String,itemid:String,itemprop:String,itemref:String,itemscope:String,itemtype:String,lang:String,nonce:String,part:String,slot:String,spellcheck:{type:Boolean,default:void 0},style:String,tabindex:String,title:String,translate:String},ht=m({name:"NoScript",inheritAttrs:!1,props:{...h,title:String,body:Boolean,renderPriority:[String,Number]},setup:f((t,{slots:e})=>{var a;const i={...t},u=(((a=e.default)==null?void 0:a.call(e))||[]).filter(({children:n})=>n).map(({children:n})=>n).join("");return u&&(i.children=u),{noscript:[i]}})}),vt=m({name:"Link",inheritAttrs:!1,props:{...h,as:String,crossorigin:String,disabled:Boolean,fetchpriority:String,href:String,hreflang:String,imagesizes:String,imagesrcset:String,integrity:String,media:String,prefetch:{type:Boolean,default:void 0},referrerpolicy:String,rel:String,sizes:String,title:String,type:String,methods:String,target:String,body:Boolean,renderPriority:[String,Number]},setup:f(t=>({link:[t]}))}),Et=m({name:"Base",inheritAttrs:!1,props:{...h,href:String,target:String},setup:f(t=>({base:t}))}),gt=m({name:"Title",inheritAttrs:!1,setup:f((t,{slots:e})=>{var u,a,n;return{title:((n=(a=(u=e.default)==null?void 0:u.call(e))==null?void 0:a[0])==null?void 0:n.children)||null}})}),ct=m({name:"Meta",inheritAttrs:!1,props:{...h,charset:String,content:String,httpEquiv:String,name:String,body:Boolean,renderPriority:[String,Number]},setup:f(t=>{const e={...t};return e.httpEquiv&&(e["http-equiv"]=e.httpEquiv,delete e.httpEquiv),{meta:[e]}})}),Pt=m({name:"Style",inheritAttrs:!1,props:{...h,type:String,media:String,nonce:String,title:String,scoped:{type:Boolean,default:void 0},body:Boolean,renderPriority:[String,Number]},setup:f((t,{slots:e})=>{var a,n,l;const i={...t},u=(l=(n=(a=e.default)==null?void 0:a.call(e))==null?void 0:n[0])==null?void 0:l.children;return u&&(i.children=u),{style:[i]}})}),yt=m({name:"Head",inheritAttrs:!1,setup:(t,e)=>()=>{var i,u;return(u=(i=e.slots).default)==null?void 0:u.call(i)}}),Tt=m({name:"Html",inheritAttrs:!1,props:{...h,manifest:String,version:String,xmlns:String,renderPriority:[String,Number]},setup:f(t=>({htmlAttrs:t}),!0)}),Ot=m({name:"Body",inheritAttrs:!1,props:{...h,renderPriority:[String,Number]},setup:f(t=>({bodyAttrs:t}),!0)}),p=Object.freeze(Object.defineProperty({__proto__:null,NoScript:ht,Link:vt,Base:Et,Title:gt,Meta:ct,Style:Pt,Head:yt,Html:Tt,Body:Ot},Symbol.toStringTag,{value:"Module"}));o(()=>r(()=>import("./InfoBox.7619bbe8.js"),["./InfoBox.7619bbe8.js","./entry.048b6b8c.js","./entry.6d893e36.css"],import.meta.url).then(t=>t.default||t));o(()=>r(()=>import("./AppSearchInput.5d65aba4.js"),["./AppSearchInput.5d65aba4.js","./entry.048b6b8c.js","./entry.6d893e36.css"],import.meta.url).then(t=>t.default||t));o(()=>r(()=>import("./ArticleTags.46bf28fe.js"),["./ArticleTags.46bf28fe.js","./entry.048b6b8c.js","./entry.6d893e36.css"],import.meta.url).then(t=>t.default||t));o(()=>r(()=>import("./BlogPosts.46b2cbb1.js"),["./BlogPosts.46b2cbb1.js","./BlogPosts.vue.1779cfab.js","./ArticleTags.46bf28fe.js","./entry.048b6b8c.js","./entry.6d893e36.css","./query.c85b9db2.js","./utils.12cd6b98.js","./preview.c620e5e0.js"],import.meta.url).then(t=>t.default||t));o(()=>r(()=>import("./BlogPrevNext.34560d7f.js"),["./BlogPrevNext.34560d7f.js","./BlogPrevNext.vue.4ae0d208.js","./entry.048b6b8c.js","./entry.6d893e36.css"],import.meta.url).then(t=>t.default||t));o(()=>r(()=>import("./NotFound.47b7af2d.js"),["./NotFound.47b7af2d.js","./entry.048b6b8c.js","./entry.6d893e36.css"],import.meta.url).then(t=>t.default||t));o(()=>r(()=>import("./entry.048b6b8c.js").then(t=>t.ah),["./entry.048b6b8c.js","./entry.6d893e36.css"],import.meta.url).then(t=>t.default||t));o(()=>r(()=>import("./entry.048b6b8c.js").then(t=>t.ai),["./entry.048b6b8c.js","./entry.6d893e36.css"],import.meta.url).then(t=>t.default||t));o(()=>r(()=>import("./entry.048b6b8c.js").then(t=>t.aa),["./entry.048b6b8c.js","./entry.6d893e36.css"],import.meta.url).then(t=>t.default||t));o(()=>r(()=>import("./entry.048b6b8c.js").then(t=>t.ae),["./entry.048b6b8c.js","./entry.6d893e36.css"],import.meta.url).then(t=>t.default||t));o(()=>r(()=>import("./entry.048b6b8c.js").then(t=>t.ag),["./entry.048b6b8c.js","./entry.6d893e36.css"],import.meta.url).then(t=>t.default||t));o(()=>r(()=>import("./entry.048b6b8c.js").then(t=>t.ac),["./entry.048b6b8c.js","./entry.6d893e36.css"],import.meta.url).then(t=>t.default||t));o(()=>r(()=>import("./entry.048b6b8c.js").then(t=>t.af),["./entry.048b6b8c.js","./entry.6d893e36.css"],import.meta.url).then(t=>t.default||t));o(()=>r(()=>import("./entry.048b6b8c.js").then(t=>t.ad),["./entry.048b6b8c.js","./entry.6d893e36.css"],import.meta.url).then(t=>t.default||t));o(()=>r(()=>import("./Tags.47b74d18.js"),["./Tags.47b74d18.js","./entry.048b6b8c.js","./entry.6d893e36.css","./query.c85b9db2.js","./utils.12cd6b98.js","./preview.c620e5e0.js","./utils.7fe0e9fa.js","./Tags.eae206af.css"],import.meta.url).then(t=>t.default||t));o(()=>r(()=>import("./TagsList.a3dd94c8.js"),["./TagsList.a3dd94c8.js","./entry.048b6b8c.js","./entry.6d893e36.css","./utils.7fe0e9fa.js"],import.meta.url).then(t=>t.default||t));o(()=>r(()=>import("./ContentDoc.64a1e7f8.js"),["./ContentDoc.64a1e7f8.js","./entry.048b6b8c.js","./entry.6d893e36.css","./ContentRenderer.8e3fab1e.js","./ContentRendererMarkdown.b03f8cad.js","./index.68c44503.js","./preview.c620e5e0.js","./ContentQuery.dcecbe08.js","./query.c85b9db2.js","./utils.12cd6b98.js"],import.meta.url).then(t=>t.default||t));o(()=>r(()=>import("./ContentList.36bead4e.js"),["./ContentList.36bead4e.js","./ContentQuery.dcecbe08.js","./entry.048b6b8c.js","./entry.6d893e36.css","./query.c85b9db2.js","./utils.12cd6b98.js","./preview.c620e5e0.js"],import.meta.url).then(t=>t.default||t));o(()=>r(()=>Promise.resolve().then(()=>Lt),void 0,import.meta.url).then(t=>t.default||t));o(()=>r(()=>import("./ContentQuery.dcecbe08.js"),["./ContentQuery.dcecbe08.js","./entry.048b6b8c.js","./entry.6d893e36.css","./query.c85b9db2.js","./utils.12cd6b98.js","./preview.c620e5e0.js"],import.meta.url).then(t=>t.default||t));o(()=>r(()=>import("./ContentRenderer.8e3fab1e.js"),["./ContentRenderer.8e3fab1e.js","./ContentRendererMarkdown.b03f8cad.js","./index.68c44503.js","./entry.048b6b8c.js","./entry.6d893e36.css","./preview.c620e5e0.js"],import.meta.url).then(t=>t.default||t));o(()=>r(()=>import("./ContentRendererMarkdown.b03f8cad.js"),["./ContentRendererMarkdown.b03f8cad.js","./index.68c44503.js","./entry.048b6b8c.js","./entry.6d893e36.css","./preview.c620e5e0.js"],import.meta.url).then(t=>t.default||t));o(()=>r(()=>import("./ContentSlot.c0bb830e.js"),["./ContentSlot.c0bb830e.js","./utils.12cd6b98.js","./entry.048b6b8c.js","./entry.6d893e36.css","./preview.c620e5e0.js"],import.meta.url).then(t=>t.default||t));o(()=>r(()=>import("./DocumentDrivenEmpty.07ca1d65.js"),["./DocumentDrivenEmpty.07ca1d65.js","./entry.048b6b8c.js","./entry.6d893e36.css"],import.meta.url).then(t=>t.default||t));o(()=>r(()=>import("./DocumentDrivenNotFound.0c168ea1.js"),["./DocumentDrivenNotFound.0c168ea1.js","./entry.048b6b8c.js","./entry.6d893e36.css"],import.meta.url).then(t=>t.default||t));o(()=>r(()=>import("./Markdown.53161ac2.js"),["./Markdown.53161ac2.js","./ContentSlot.c0bb830e.js","./utils.12cd6b98.js","./entry.048b6b8c.js","./entry.6d893e36.css","./preview.c620e5e0.js"],import.meta.url).then(t=>t.default||t));o(()=>r(()=>import("./ProseA.e2702bc6.js"),["./ProseA.e2702bc6.js","./entry.048b6b8c.js","./entry.6d893e36.css"],import.meta.url).then(t=>t.default||t));o(()=>r(()=>import("./ProseBlockquote.5252639e.js"),["./ProseBlockquote.5252639e.js","./entry.048b6b8c.js","./entry.6d893e36.css"],import.meta.url).then(t=>t.default||t));o(()=>r(()=>import("./ProseCode.0b363cf4.js"),["./ProseCode.0b363cf4.js","./entry.048b6b8c.js","./entry.6d893e36.css","./ProseCode.e63e49c6.css"],import.meta.url).then(t=>t.default||t));o(()=>r(()=>import("./ProseCodeInline.e9de97e7.js"),["./ProseCodeInline.e9de97e7.js","./entry.048b6b8c.js","./entry.6d893e36.css"],import.meta.url).then(t=>t.default||t));o(()=>r(()=>import("./ProseEm.d2861efa.js"),["./ProseEm.d2861efa.js","./entry.048b6b8c.js","./entry.6d893e36.css"],import.meta.url).then(t=>t.default||t));o(()=>r(()=>import("./ProseH1.b8154635.js"),["./ProseH1.b8154635.js","./entry.048b6b8c.js","./entry.6d893e36.css"],import.meta.url).then(t=>t.default||t));o(()=>r(()=>import("./ProseH2.89dfa48a.js"),["./ProseH2.89dfa48a.js","./entry.048b6b8c.js","./entry.6d893e36.css"],import.meta.url).then(t=>t.default||t));o(()=>r(()=>import("./ProseH3.16d53772.js"),["./ProseH3.16d53772.js","./entry.048b6b8c.js","./entry.6d893e36.css"],import.meta.url).then(t=>t.default||t));o(()=>r(()=>import("./ProseH4.966f4e17.js"),["./ProseH4.966f4e17.js","./entry.048b6b8c.js","./entry.6d893e36.css"],import.meta.url).then(t=>t.default||t));o(()=>r(()=>import("./ProseH5.7f56451f.js"),["./ProseH5.7f56451f.js","./entry.048b6b8c.js","./entry.6d893e36.css"],import.meta.url).then(t=>t.default||t));o(()=>r(()=>import("./ProseH6.22b470fa.js"),["./ProseH6.22b470fa.js","./entry.048b6b8c.js","./entry.6d893e36.css"],import.meta.url).then(t=>t.default||t));o(()=>r(()=>import("./ProseHr.d8971959.js"),["./ProseHr.d8971959.js","./entry.048b6b8c.js","./entry.6d893e36.css"],import.meta.url).then(t=>t.default||t));o(()=>r(()=>import("./ProseImg.a8ea84b8.js"),["./ProseImg.a8ea84b8.js","./entry.048b6b8c.js","./entry.6d893e36.css"],import.meta.url).then(t=>t.default||t));o(()=>r(()=>import("./ProseLi.3c58a5aa.js"),["./ProseLi.3c58a5aa.js","./entry.048b6b8c.js","./entry.6d893e36.css"],import.meta.url).then(t=>t.default||t));o(()=>r(()=>import("./ProseOl.934d970d.js"),["./ProseOl.934d970d.js","./entry.048b6b8c.js","./entry.6d893e36.css"],import.meta.url).then(t=>t.default||t));o(()=>r(()=>import("./ProseP.37951460.js"),["./ProseP.37951460.js","./entry.048b6b8c.js","./entry.6d893e36.css"],import.meta.url).then(t=>t.default||t));o(()=>r(()=>import("./ProseStrong.cbafbe86.js"),["./ProseStrong.cbafbe86.js","./entry.048b6b8c.js","./entry.6d893e36.css"],import.meta.url).then(t=>t.default||t));o(()=>r(()=>import("./ProseTable.cc377284.js"),["./ProseTable.cc377284.js","./entry.048b6b8c.js","./entry.6d893e36.css"],import.meta.url).then(t=>t.default||t));o(()=>r(()=>import("./ProseTbody.33a71185.js"),["./ProseTbody.33a71185.js","./entry.048b6b8c.js","./entry.6d893e36.css"],import.meta.url).then(t=>t.default||t));o(()=>r(()=>import("./ProseTd.a71514a3.js"),["./ProseTd.a71514a3.js","./entry.048b6b8c.js","./entry.6d893e36.css"],import.meta.url).then(t=>t.default||t));o(()=>r(()=>import("./ProseTh.681e59ce.js"),["./ProseTh.681e59ce.js","./entry.048b6b8c.js","./entry.6d893e36.css"],import.meta.url).then(t=>t.default||t));o(()=>r(()=>import("./ProseThead.e4ea725a.js"),["./ProseThead.e4ea725a.js","./entry.048b6b8c.js","./entry.6d893e36.css"],import.meta.url).then(t=>t.default||t));o(()=>r(()=>import("./ProseTr.100cc642.js"),["./ProseTr.100cc642.js","./entry.048b6b8c.js","./entry.6d893e36.css"],import.meta.url).then(t=>t.default||t));o(()=>r(()=>import("./ProseUl.df5c75b1.js"),["./ProseUl.df5c75b1.js","./entry.048b6b8c.js","./entry.6d893e36.css"],import.meta.url).then(t=>t.default||t));o(()=>r(()=>import("./welcome.4a1c8baf.js"),["./welcome.4a1c8baf.js","./entry.048b6b8c.js","./entry.6d893e36.css","./query.c85b9db2.js","./utils.12cd6b98.js","./preview.c620e5e0.js","./ContentDoc.64a1e7f8.js","./ContentRenderer.8e3fab1e.js","./ContentRendererMarkdown.b03f8cad.js","./index.68c44503.js","./ContentQuery.dcecbe08.js","./ContentList.36bead4e.js","./ContentSlot.c0bb830e.js","./DocumentDrivenEmpty.07ca1d65.js","./DocumentDrivenNotFound.0c168ea1.js","./Markdown.53161ac2.js","./ProseCode.0b363cf4.js","./ProseCode.e63e49c6.css","./Tags.eae206af.css"],import.meta.url).then(t=>t.default||t));o(()=>r(()=>Promise.resolve().then(()=>et),void 0,import.meta.url).then(t=>t.default||t));o(()=>r(()=>Promise.resolve().then(()=>ot),void 0,import.meta.url).then(t=>t.default||t));o(()=>r(()=>Promise.resolve().then(()=>at),void 0,import.meta.url).then(t=>t.default||t));o(()=>r(()=>Promise.resolve().then(()=>lt),void 0,import.meta.url).then(t=>t.default||t));o(()=>r(()=>Promise.resolve().then(()=>mt),void 0,import.meta.url).then(t=>t.default||t));o(()=>r(()=>import("./entry.048b6b8c.js").then(t=>t.a9),["./entry.048b6b8c.js","./entry.6d893e36.css"],import.meta.url).then(t=>t.default||t));o(()=>r(()=>Promise.resolve().then(()=>pt),void 0,import.meta.url).then(t=>t.default||t));o(()=>r(()=>import("./entry.048b6b8c.js").then(t=>t.ab),["./entry.048b6b8c.js","./entry.6d893e36.css"],import.meta.url).then(t=>t.default||t));o(()=>r(()=>Promise.resolve().then(()=>p),void 0,import.meta.url).then(t=>t.NoScript));o(()=>r(()=>Promise.resolve().then(()=>p),void 0,import.meta.url).then(t=>t.Link));o(()=>r(()=>Promise.resolve().then(()=>p),void 0,import.meta.url).then(t=>t.Base));o(()=>r(()=>Promise.resolve().then(()=>p),void 0,import.meta.url).then(t=>t.Title));o(()=>r(()=>Promise.resolve().then(()=>p),void 0,import.meta.url).then(t=>t.Meta));o(()=>r(()=>Promise.resolve().then(()=>p),void 0,import.meta.url).then(t=>t.Style));o(()=>r(()=>Promise.resolve().then(()=>p),void 0,import.meta.url).then(t=>t.Head));o(()=>r(()=>Promise.resolve().then(()=>p),void 0,import.meta.url).then(t=>t.Html));o(()=>r(()=>Promise.resolve().then(()=>p),void 0,import.meta.url).then(t=>t.Body));const St=m({name:"ContentNavigation",props:{query:{type:Object,required:!1,default:void 0}},async setup(t){const{query:e}=z(t),i=c(()=>{var a;return typeof((a=e.value)==null?void 0:a.params)=="function"?e.value.params():e.value});if(!i.value&&H("dd-navigation").value){const{navigation:a}=K();return{navigation:a}}const{data:u}=await G(`content-navigation-${g(i.value)}`,()=>X(i.value));return{navigation:u}},render(t){const e=q(),{navigation:i}=t,u=l=>s(F,{to:l._path},()=>l.title),a=(l,d)=>s("ul",d?{"data-level":d}:null,l.map(_=>_.children?s("li",null,[u(_),a(_.children,d+1)]):s("li",null,u(_)))),n=l=>a(l,0);return e!=null&&e.default?e.default({navigation:i,...this.$attrs}):n(i)}}),Lt=Object.freeze(Object.defineProperty({__proto__:null,default:St},Symbol.toStringTag,{value:"Module"}));export{St as default};
