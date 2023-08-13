import m from"./ContentDoc.b49e8caf.js";import{h as _,u as h,i as p,o as s,c as o,a as t,b as g,w as u,F as x,n as b,t as a}from"./entry.cea4165e.js";import"./ContentRenderer.5ee590f7.js";import"./ContentRendererMarkdown.21c180f6.js";import"./index.a6ef77ff.js";import"./preview.1c216315.js";import"./ContentQuery.6011cf9c.js";import"./query.db37058c.js";import"./utils.57e1ff67.js";const y={class:"container blog-page my-10"},f=t("div",{class:"prose max-w-none"},[t("h1",{class:"mb-1"},"Library"),t("p",{class:"mb-5"}," Some of the books that I have read in the past few years and recommend, in no particular order. ")],-1),v={class:"mt-10 mx-10"},w={class:"grid md:grid-cols-5 md:gap-20 gap-10"},B={class:"h-60"},k=["src"],C={class:"mt-3"},L={class:"text-lg font-bold"},S={class:"text-gray-600 text-sm"},j={class:"text-gray-400 text-xs mt-1"},n="Library",D="Books that I have read and recommend",E="",i="/library",A=_({__name:"library",setup(F){h({title:n,meta:p({title:n,description:D,image:E,url:i}),link:[{rel:"canonical",href:`https://subodhdahal.com${i}`}]});const c=r=>`/images/library/${r}`;return(r,I)=>{const l=m;return s(),o("div",y,[f,t("div",v,[t("div",w,[g(l,null,{default:u(({doc:d})=>[(s(!0),o(x,null,b(d.books,e=>(s(),o("div",{key:e.title},[t("div",B,[t("img",{src:c(e.image),class:"h-full object-cover border border-gray-200 shadow-xl rounded-lg"},null,8,k)]),t("div",C,[t("h2",L,a(e.title),1),t("p",S,a(e.author),1),t("p",j,a(e.genres.join(", ")),1)])]))),128))]),_:1})])])])}}});export{A as default};
