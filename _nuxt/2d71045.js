(window.webpackJsonp=window.webpackJsonp||[]).push([[3],{307:function(t,e,n){var content=n(310);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(58).default)("6453c9b6",content,!0,{sourceMap:!1})},309:function(t,e,n){"use strict";n(307)},310:function(t,e,n){var l=n(57)((function(i){return i[1]}));l.push([t.i,'/*purgecss start ignore*/\n.blog-page h1,.blog-page h2{\n  font-family:"Source Serif Pro",serif;\n  font-weight:700\n}\n\n/*purgecss end ignore*/',""]),l.locals={},t.exports=l},311:function(t,e,n){"use strict";n.r(e);var l=n(7),r=(n(46),{data:function(){return{articles:[]}},fetch:function(){var t=this;return Object(l.a)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.$content("articles").only(["title","description","image","slug","author"]).sortBy("createdAt","desc").fetch();case 2:t.articles=e.sent;case 3:case"end":return e.stop()}}),e)})))()}}),o=(n(309),n(16)),component=Object(o.a)(r,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"blog-page"},[n("h1",{staticClass:"font-bold text-4xl text-center mb-10"},[t._v("\n    Blog Articles\n  ")]),t._v(" "),n("ul",{staticClass:"flex flex-wrap"},t._l(t.articles,(function(article){return n("li",{key:article.slug,staticClass:"xs:w-full md:w-1/2 px-2 xs:mb-6 md:mb-12 article-card"},[n("NuxtLink",{staticClass:"md:flex transition-shadow duration-150 ease-in-out shadow-sm hover:shadow-md xxlmax:flex-col",attrs:{to:{name:"blog-slug",params:{slug:article.slug}}}},[article.image?n("img",{staticClass:"w-full md:w-auto h-48 mx-auto xxlmin:w-1/2 xxlmax:w-full object-cover",attrs:{src:article.image}}):t._e(),t._v(" "),n("div",{staticClass:"p-0 pt-4 md:p-6 md:pt-0 xxlmin:w-1/2 xxlmax:w-full"},[n("h2",{staticClass:"article-title font-bold"},[t._v("\n            "+t._s(article.title)+"\n          ")]),t._v(" "),n("p",{staticClass:"font-bold text-gray-600"},[t._v("\n            "+t._s(article.description)+"\n          ")])])])],1)})),0)])}),[],!1,null,null,null);e.default=component.exports}}]);