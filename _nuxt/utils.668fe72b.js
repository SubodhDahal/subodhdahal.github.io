import{z as S,w as C,x as A,H as T,s as w,h as b}from"./entry.f3616316.js";const k=decodeURIComponent,E=encodeURIComponent,R=/; */,c=/^[\u0009\u0020-\u007e\u0080-\u00ff]+$/;function U(e,t){if(typeof e!="string")throw new TypeError("argument str must be a string");let i={},r=t||{},o=e.split(R),a=r.decode||k;for(let n=0;n<o.length;n++){let s=o[n],f=s.indexOf("=");if(f<0)continue;let h=s.substr(0,f).trim(),u=s.substr(++f,s.length).trim();u[0]=='"'&&(u=u.slice(1,-1)),i[h]==null&&(i[h]=D(u,a))}return i}function m(e,t,i){let r=i||{},o=r.encode||E;if(typeof o!="function")throw new TypeError("option encode is invalid");if(!c.test(e))throw new TypeError("argument name is invalid");let a=o(t);if(a&&!c.test(a))throw new TypeError("argument val is invalid");let n=e+"="+a;if(r.maxAge!=null){let s=r.maxAge-0;if(isNaN(s)||!isFinite(s))throw new TypeError("option maxAge is invalid");n+="; Max-Age="+Math.floor(s)}if(r.domain){if(!c.test(r.domain))throw new TypeError("option domain is invalid");n+="; Domain="+r.domain}if(r.path){if(!c.test(r.path))throw new TypeError("option path is invalid");n+="; Path="+r.path}if(r.expires){if(typeof r.expires.toUTCString!="function")throw new TypeError("option expires is invalid");n+="; Expires="+r.expires.toUTCString()}if(r.httpOnly&&(n+="; HttpOnly"),r.secure&&(n+="; Secure"),r.sameSite)switch(typeof r.sameSite=="string"?r.sameSite.toLowerCase():r.sameSite){case!0:n+="; SameSite=Strict";break;case"lax":n+="; SameSite=Lax";break;case"strict":n+="; SameSite=Strict";break;case"none":n+="; SameSite=None";break;default:throw new TypeError("option sameSite is invalid")}return n}function D(e,t){try{return t(e)}catch{return e}}const j={path:"/",decode:e=>A(decodeURIComponent(e)),encode:e=>encodeURIComponent(typeof e=="string"?e:JSON.stringify(e))};function O(e,t){var a,n;const i={...j,...t},r=B(i)||{},o=S((n=r[e])!=null?n:(a=i.default)==null?void 0:a.call(i));return C(o,()=>{L(e,o.value,i)}),o}function B(e={}){return U(document.cookie,e)}function I(e,t,i={}){return t==null?m(e,t,{...i,maxAge:-1}):m(e,t,i)}function L(e,t,i={}){document.cookie=I(e,t,i)}const M=["p","h1","h2","h3","h4","h5","h6","li"];function l(e,t){return e.type===t||typeof e.type=="object"&&e.type.tag===t||e.tag===t}function d(e){return l(e,"text")||typeof e.children=="string"}function g(e){return Array.isArray(e.children)||typeof e.children=="string"?e.children:typeof e.children.default=="function"?e.children.default():[]}function p(e){if(!e)return"";if(Array.isArray(e))return e.map(p).join("");if(d(e))return e.children||e.value;const t=g(e);return Array.isArray(t)?t.map(p).join(""):""}function y(e,t=["p"]){if(Array.isArray(e))return e.flatMap(r=>y(r,t));let i=e;return t.some(r=>r==="*"||l(e,r))&&(i=g(e)||e,!Array.isArray(i)&&M.some(r=>l(e,r))&&(i=[i])),i}function x(e,t=["p"]){return e=Array.isArray(e)?e:[e],t.length?e.flatMap(i=>x(y(i,[t[0]]),t.slice(1))).filter(i=>!(d(i)&&p(i).trim()==="")):e}const q=e=>T(e,w().public.content.api.baseURL),z=()=>({unwrap:y,flatUnwrap:x}),v=()=>{throw console.warn("useContent is only accessible when you are using `documentDriven` mode."),console.warn("Learn more by visiting: https://content.nuxtjs.org/guide/writing/document-driven"),new Error("useContent is only accessible when you are using `documentDriven` mode.")},H=()=>{const{experimental:e}=w().content;if(e.clientDB)return!0;const t=b().query;return Object.prototype.hasOwnProperty.call(t,"preview")&&!t.preview?!1:!!(t.preview||O("previewToken").value)};export{v as a,z as b,H as s,O as u,q as w};
