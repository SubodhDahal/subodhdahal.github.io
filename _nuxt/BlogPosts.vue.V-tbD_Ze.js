import{_ as h}from"./ArticleTags.y6prs-do.js";import{h as w,v as f,j as g,A as y,o,c as n,F as b,r as k,b as x,w as q,m as A,a as m,t as d,l as C,e as v}from"./entry.J86Ss4YB.js";import{u as B,q as N}from"./query.KujL3dX0.js";const D={class:"flex flex-wrap"},V=["src"],j={class:"p-0 pt-4 md:p-6 md:pt-0 xxlmin:w-1/2 xxlmax:w-full"},F={class:"text-2xl font-bold"},L={class:"text-gray-600 dark:text-white"},S=w({__name:"BlogPosts",props:{tags:{},quantity:{},content:{}},async setup(p){let a,i;const s=p;let l=f([]);l=([a,i]=g(()=>_(s.tags,s.quantity,s.content)),a=await a,i(),a),y(()=>s.tags,async e=>{l=await _(e,s.quantity,s.content)});async function _(e=[],u=100,c){const{data:r}=await B("articles-home",()=>N(c).where({tags:{$contains:e}}).without("body").sort({postDate:-1}).limit(u).find());return r}return(e,u)=>{const c=h,r=v;return o(),n("ul",D,[(o(!0),n(b,null,k(C(l),t=>(o(),n("li",{key:t.url||t._path,class:"xs:w-full md:w-1/2 px-2 xs:mb-6 md:mb-12 mb-6 article-card"},[x(r,{to:t.url||t._path,target:t.url?"_blank":"_self",class:"md:flex transition-shadow duration-150 ease-in-out shadow-sm hover:shadow-md xxlmax:flex-col"},{default:q(()=>[t.image?(o(),n("img",{key:0,class:"w-full md:w-48 xxlmin:w-1/2 xxlmax:w-full h-48 mx-auto object-cover",src:t.image},null,8,V)):A("",!0),m("div",j,[m("h2",F,d(t.title),1),m("p",L,d(t.description),1),x(c,{tags:t.tags,class:"mt-2"},null,8,["tags"])])]),_:2},1032,["to","target"])]))),128))])}}});export{S as _};
