import w from"./ArticleTags.0792645c.js";import{l as f,z as h,W as g,w as y,o as e,b as a,Y as b,Z as k,u as C,U as i,S as V,$ as A,e as l,X as u,R as B}from"./entry.405f29fb.js";import{u as N,q as v}from"./query.6eab2c97.js";const D={class:"flex flex-wrap"},$=["src"],q={class:"p-0 pt-4 md:p-6 md:pt-0 xxlmin:w-1/2 xxlmax:w-full"},L={class:"text-2xl font-bold"},S={class:"text-gray-600"},F=f({__name:"BlogPosts",props:{tags:null},async setup(d){let s,r;const c=d;let o=h([]);async function m(_){const{data:n}=await N("articles-home",()=>v("blog").where({tags:{$contains:c.tags}}).without("body").sort({postDate:-1}).limit(6).find());return n}return o=([s,r]=g(()=>m()),s=await s,r(),s),y(c,async(_,n)=>{o=await m()},{deep:!0}),(_,n)=>{const x=w,p=B;return e(),a("ul",D,[(e(!0),a(b,null,k(C(o),t=>(e(),a("li",{key:t.url||t._path,class:"xs:w-full md:w-1/2 px-2 xs:mb-6 md:mb-12 mb-6 article-card"},[i(p,{to:t.url||t._path,target:t.url?"_blank":"_self",class:"md:flex transition-shadow duration-150 ease-in-out shadow-sm hover:shadow-md xxlmax:flex-col"},{default:V(()=>[t.image?(e(),a("img",{key:0,class:"w-full md:w-48 xxlmin:w-1/2 xxlmax:w-full h-48 mx-auto object-cover",src:t.image},null,8,$)):A("",!0),l("div",q,[l("h2",L,u(t.title),1),l("p",S,u(t.description),1),i(x,{tags:t.tags,class:"mt-2"},null,8,["tags"])])]),_:2},1032,["to","target"])]))),128))])}}});export{F as _};