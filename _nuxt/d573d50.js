(window.webpackJsonp=window.webpackJsonp||[]).push([[7,3],{307:function(t,e,n){var content=n(310);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(58).default)("6453c9b6",content,!0,{sourceMap:!1})},308:function(t,e,n){"use strict";(function(t){n.d(e,"a",(function(){return r}));n(20),n(47);var r=function(data){return[{hid:"og:title",property:"og:title",content:data.title},{hid:"description",name:"description",content:data.description},{hid:"og:description",property:"og:description",content:data.description},{hid:"og:image",property:"og:image",content:data.image},{hid:"og:url",property:"og:url",content:t.env.HOST_NAME+"/"+data.url},{hid:"twitter:card",name:"twitter:card",content:data.cardType||"summary_large_image"}]}}).call(this,n(146))},309:function(t,e,n){"use strict";n(307)},310:function(t,e,n){var r=n(57)((function(i){return i[1]}));r.push([t.i,'/*purgecss start ignore*/\n.blog-page h1,.blog-page h2{\n  font-family:"Source Serif Pro",serif;\n  font-weight:700\n}\n\n/*purgecss end ignore*/',""]),r.locals={},t.exports=r},311:function(t,e,n){"use strict";n.r(e);var r=n(7),o=(n(46),{data:function(){return{articles:[]}},fetch:function(){var t=this;return Object(r.a)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.$content("articles").only(["title","description","image","slug","author"]).sortBy("createdAt","desc").fetch();case 2:t.articles=e.sent;case 3:case"end":return e.stop()}}),e)})))()}}),l=(n(309),n(16)),component=Object(l.a)(o,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"blog-page"},[n("h1",{staticClass:"font-bold text-4xl text-center mb-10"},[t._v("\n    Blog Articles\n  ")]),t._v(" "),n("ul",{staticClass:"flex flex-wrap"},t._l(t.articles,(function(article){return n("li",{key:article.slug,staticClass:"xs:w-full md:w-1/2 px-2 xs:mb-6 md:mb-12 article-card"},[n("NuxtLink",{staticClass:"md:flex transition-shadow duration-150 ease-in-out shadow-sm hover:shadow-md xxlmax:flex-col",attrs:{to:{name:"blog-slug",params:{slug:article.slug}}}},[article.image?n("img",{staticClass:"w-full md:w-auto h-48 mx-auto xxlmin:w-1/2 xxlmax:w-full object-cover",attrs:{src:article.image}}):t._e(),t._v(" "),n("div",{staticClass:"p-0 pt-4 md:p-6 md:pt-0 xxlmin:w-1/2 xxlmax:w-full"},[n("h2",{staticClass:"article-title font-bold"},[t._v("\n            "+t._s(article.title)+"\n          ")]),t._v(" "),n("p",{staticClass:"text-gray-600"},[t._v("\n            "+t._s(article.description)+"\n          ")])])])],1)})),0)])}),[],!1,null,null,null);e.default=component.exports},312:function(t,e,n){var content=n(316);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(58).default)("c43509ec",content,!0,{sourceMap:!1})},315:function(t,e,n){"use strict";n(312)},316:function(t,e,n){var r=n(57)((function(i){return i[1]}));r.push([t.i,'/*purgecss start ignore*/\n.blog-page h1,.blog-page h2,.blog-page h3{\n  font-family:"Source Serif Pro",serif;\n  font-weight:700\n}\n.article-title{\n  margin-bottom:0.75rem;\n  font-size:1.875rem;\n  line-height:2.25rem\n}\n\n/*purgecss end ignore*/',""]),r.locals={},t.exports=r},336:function(t,e,n){"use strict";n.r(e);var r=n(7),o=(n(46),n(308)),l={asyncData:function(t){return Object(r.a)(regeneratorRuntime.mark((function e(){var n,r;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=t.$content,e.next=3,n("tags").only(["name","description","image","slug"]).sortBy("createdAt","asc").fetch();case 3:return r=e.sent,e.abrupt("return",{tags:r});case 5:case"end":return e.stop()}}),e)})))()},head:function(){var title="Blog posts - Subodh Dahal";return{title:title,meta:Object(o.a)({title:title,description:"Blog posts",image:"",url:"/blog"})}}},c=(n(315),n(16)),component=Object(c.a)(l,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"container blog-page"},[n("BlogPosts",{staticClass:"mt-10"}),t._v(" "),n("h3",{staticClass:"my-10 font-bold text-2xl uppercase text-center"},[t._v("\n    Topics\n  ")]),t._v(" "),n("ul",{staticClass:"flex flex-wrap mb-4 text-center"},t._l(t.tags,(function(e){return n("li",{key:e.slug,staticClass:"xs:w-full md:w-1/3 lg:flex-1 px-2 text-center"},[n("NuxtLink",{attrs:{to:"/blog/tag/"+e.slug}},[n("p",{staticClass:"font-bold text-gray-600 uppercase tracking-wider font-medium text-ss"},[t._v("\n          "+t._s(e.name)+"\n        ")])])],1)})),0)],1)}),[],!1,null,null,null);e.default=component.exports;installComponents(component,{BlogPosts:n(311).default})}}]);