import{l,W as _,o as s,b as a,e as n,Y as i,Z as u,u as p,V as m,S as x,X as d,R as f}from"./entry.c9e24674.js";import{u as g,q as y}from"./query.23d7aa35.js";const h=n("h3",{class:"my-10 font-bold text-2xl uppercase text-center"}," Topics ",-1),w={class:"flex flex-wrap mb-4 text-center"},b={class:"font-bold text-gray-600 uppercase tracking-wider font-medium text-ss"},q=l({__name:"BlogTags",async setup(k){let t,o;const{data:r}=([t,o]=_(()=>g("articles-tags",()=>y("tags").limit(6).find())),t=await t,o(),t);return(B,C)=>{const c=f;return s(),a("div",null,[h,n("ul",w,[(s(!0),a(i,null,u(p(r),e=>(s(),a("li",{key:e.slug,class:"xs:w-full md:w-1/3 lg:flex-1 px-2 text-center"},[m(c,{to:`/blog/tag/${e.slug}`,class:""},{default:x(()=>[n("p",b,d(e.name),1)]),_:2},1032,["to"])]))),128))])])}}});export{q as _};