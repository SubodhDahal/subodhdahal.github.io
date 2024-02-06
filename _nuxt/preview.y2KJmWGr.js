import{v as L,a0 as P,a1 as z,A as F,a2 as H,$ as K,C as q,i as x}from"./entry.azEv5I1N.js";const S=/^[\u0009\u0020-\u007E\u0080-\u00FF]+$/;function V(t,i){if(typeof t!="string")throw new TypeError("argument str must be a string");const n={},r=(i||{}).decode||$;let o=0;for(;o<t.length;){const s=t.indexOf("=",o);if(s===-1)break;let a=t.indexOf(";",o);if(a===-1)a=t.length;else if(a<s){o=t.lastIndexOf(";",s-1)+1;continue}const c=t.slice(o,s).trim();if(n[c]===void 0){let u=t.slice(s+1,a).trim();u.codePointAt(0)===34&&(u=u.slice(1,-1)),n[c]=W(u,r)}o=a+1}return n}function T(t,i,n){const e=n||{},r=e.encode||X;if(typeof r!="function")throw new TypeError("option encode is invalid");if(!S.test(t))throw new TypeError("argument name is invalid");const o=r(i);if(o&&!S.test(o))throw new TypeError("argument val is invalid");let s=t+"="+o;if(e.maxAge!==void 0&&e.maxAge!==null){const a=e.maxAge-0;if(Number.isNaN(a)||!Number.isFinite(a))throw new TypeError("option maxAge is invalid");s+="; Max-Age="+Math.floor(a)}if(e.domain){if(!S.test(e.domain))throw new TypeError("option domain is invalid");s+="; Domain="+e.domain}if(e.path){if(!S.test(e.path))throw new TypeError("option path is invalid");s+="; Path="+e.path}if(e.expires){if(!J(e.expires)||Number.isNaN(e.expires.valueOf()))throw new TypeError("option expires is invalid");s+="; Expires="+e.expires.toUTCString()}if(e.httpOnly&&(s+="; HttpOnly"),e.secure&&(s+="; Secure"),e.priority)switch(typeof e.priority=="string"?e.priority.toLowerCase():e.priority){case"low":s+="; Priority=Low";break;case"medium":s+="; Priority=Medium";break;case"high":s+="; Priority=High";break;default:throw new TypeError("option priority is invalid")}if(e.sameSite)switch(typeof e.sameSite=="string"?e.sameSite.toLowerCase():e.sameSite){case!0:s+="; SameSite=Strict";break;case"lax":s+="; SameSite=Lax";break;case"strict":s+="; SameSite=Strict";break;case"none":s+="; SameSite=None";break;default:throw new TypeError("option sameSite is invalid")}return s}function J(t){return Object.prototype.toString.call(t)==="[object Date]"||t instanceof Date}function W(t,i){try{return i(t)}catch{return t}}function $(t){return t.includes("%")?decodeURIComponent(t):t}function X(t){return encodeURIComponent(t)}const C=Object.freeze({ignoreUnknown:!1,respectType:!1,respectFunctionNames:!1,respectFunctionProperties:!1,unorderedObjects:!0,unorderedArrays:!1,unorderedSets:!1,excludeKeys:void 0,excludeValues:void 0,replacer:void 0});function B(t,i){i?i={...C,...i}:i=C;const n=R(i);return n.dispatch(t),n.toString()}const Y=Object.freeze(["prototype","__proto__","constructor"]);function R(t){let i="",n=new Map;const e=r=>{i+=r};return{toString(){return i},getContext(){return n},dispatch(r){return t.replacer&&(r=t.replacer(r)),this[r===null?"null":typeof r](r)},object(r){if(r&&typeof r.toJSON=="function")return this.object(r.toJSON());const o=Object.prototype.toString.call(r);let s="";const a=o.length;a<10?s="unknown:["+o+"]":s=o.slice(8,a-1),s=s.toLowerCase();let c=null;if((c=n.get(r))===void 0)n.set(r,n.size);else return this.dispatch("[CIRCULAR:"+c+"]");if(typeof Buffer<"u"&&Buffer.isBuffer&&Buffer.isBuffer(r))return e("buffer:"),e(r.toString("utf8"));if(s!=="object"&&s!=="function"&&s!=="asyncfunction")this[s]?this[s](r):t.ignoreUnknown||this.unkown(r,s);else{let u=Object.keys(r);t.unorderedObjects&&(u=u.sort());let f=[];t.respectType!==!1&&!A(r)&&(f=Y),t.excludeKeys&&(u=u.filter(l=>!t.excludeKeys(l)),f=f.filter(l=>!t.excludeKeys(l))),e("object:"+(u.length+f.length)+":");const h=l=>{this.dispatch(l),e(":"),t.excludeValues||this.dispatch(r[l]),e(",")};for(const l of u)h(l);for(const l of f)h(l)}},array(r,o){if(o=o===void 0?t.unorderedArrays!==!1:o,e("array:"+r.length+":"),!o||r.length<=1){for(const c of r)this.dispatch(c);return}const s=new Map,a=r.map(c=>{const u=R(t);u.dispatch(c);for(const[f,h]of u.getContext())s.set(f,h);return u.toString()});return n=s,a.sort(),this.array(a,!1)},date(r){return e("date:"+r.toJSON())},symbol(r){return e("symbol:"+r.toString())},unkown(r,o){if(e(o),!!r&&(e(":"),r&&typeof r.entries=="function"))return this.array(Array.from(r.entries()),!0)},error(r){return e("error:"+r.toString())},boolean(r){return e("bool:"+r)},string(r){e("string:"+r.length+":"),e(r)},function(r){e("fn:"),A(r)?this.dispatch("[native]"):this.dispatch(r.toString()),t.respectFunctionNames!==!1&&this.dispatch("function-name:"+String(r.name)),t.respectFunctionProperties&&this.object(r)},number(r){return e("number:"+r)},xml(r){return e("xml:"+r.toString())},null(){return e("Null")},undefined(){return e("Undefined")},regexp(r){return e("regex:"+r.toString())},uint8array(r){return e("uint8array:"),this.dispatch(Array.prototype.slice.call(r))},uint8clampedarray(r){return e("uint8clampedarray:"),this.dispatch(Array.prototype.slice.call(r))},int8array(r){return e("int8array:"),this.dispatch(Array.prototype.slice.call(r))},uint16array(r){return e("uint16array:"),this.dispatch(Array.prototype.slice.call(r))},int16array(r){return e("int16array:"),this.dispatch(Array.prototype.slice.call(r))},uint32array(r){return e("uint32array:"),this.dispatch(Array.prototype.slice.call(r))},int32array(r){return e("int32array:"),this.dispatch(Array.prototype.slice.call(r))},float32array(r){return e("float32array:"),this.dispatch(Array.prototype.slice.call(r))},float64array(r){return e("float64array:"),this.dispatch(Array.prototype.slice.call(r))},arraybuffer(r){return e("arraybuffer:"),this.dispatch(new Uint8Array(r))},url(r){return e("url:"+r.toString())},map(r){e("map:");const o=[...r];return this.array(o,t.unorderedSets!==!1)},set(r){e("set:");const o=[...r];return this.array(o,t.unorderedSets!==!1)},file(r){return e("file:"),this.dispatch([r.name,r.size,r.type,r.lastModfied])},blob(){if(t.ignoreUnknown)return e("[blob]");throw new Error(`Hashing Blob objects is currently not supported
Use "options.replacer" or "options.ignoreUnknown"
`)},domwindow(){return e("domwindow")},bigint(r){return e("bigint:"+r.toString())},process(){return e("process")},timer(){return e("timer")},pipe(){return e("pipe")},tcp(){return e("tcp")},udp(){return e("udp")},tty(){return e("tty")},statwatcher(){return e("statwatcher")},securecontext(){return e("securecontext")},connection(){return e("connection")},zlib(){return e("zlib")},context(){return e("context")},nodescript(){return e("nodescript")},httpparser(){return e("httpparser")},dataview(){return e("dataview")},signal(){return e("signal")},fsevent(){return e("fsevent")},tlswrap(){return e("tlswrap")}}}const N="[native code] }",G=N.length;function A(t){return typeof t!="function"?!1:Function.prototype.toString.call(t).slice(-G)===N}class d{constructor(i,n){i=this.words=i||[],this.sigBytes=n===void 0?i.length*4:n}toString(i){return(i||Q).stringify(this)}concat(i){if(this.clamp(),this.sigBytes%4)for(let n=0;n<i.sigBytes;n++){const e=i.words[n>>>2]>>>24-n%4*8&255;this.words[this.sigBytes+n>>>2]|=e<<24-(this.sigBytes+n)%4*8}else for(let n=0;n<i.sigBytes;n+=4)this.words[this.sigBytes+n>>>2]=i.words[n>>>2];return this.sigBytes+=i.sigBytes,this}clamp(){this.words[this.sigBytes>>>2]&=4294967295<<32-this.sigBytes%4*8,this.words.length=Math.ceil(this.sigBytes/4)}clone(){return new d([...this.words])}}const Q={stringify(t){const i=[];for(let n=0;n<t.sigBytes;n++){const e=t.words[n>>>2]>>>24-n%4*8&255;i.push((e>>>4).toString(16),(e&15).toString(16))}return i.join("")}},Z={stringify(t){const i="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",n=[];for(let e=0;e<t.sigBytes;e+=3){const r=t.words[e>>>2]>>>24-e%4*8&255,o=t.words[e+1>>>2]>>>24-(e+1)%4*8&255,s=t.words[e+2>>>2]>>>24-(e+2)%4*8&255,a=r<<16|o<<8|s;for(let c=0;c<4&&e*8+c*6<t.sigBytes*8;c++)n.push(i.charAt(a>>>6*(3-c)&63))}return n.join("")}},ee={parse(t){const i=t.length,n=[];for(let e=0;e<i;e++)n[e>>>2]|=(t.charCodeAt(e)&255)<<24-e%4*8;return new d(n,i)}},te={parse(t){return ee.parse(unescape(encodeURIComponent(t)))}};class re{constructor(){this._data=new d,this._nDataBytes=0,this._minBufferSize=0,this.blockSize=512/32}reset(){this._data=new d,this._nDataBytes=0}_append(i){typeof i=="string"&&(i=te.parse(i)),this._data.concat(i),this._nDataBytes+=i.sigBytes}_doProcessBlock(i,n){}_process(i){let n,e=this._data.sigBytes/(this.blockSize*4);i?e=Math.ceil(e):e=Math.max((e|0)-this._minBufferSize,0);const r=e*this.blockSize,o=Math.min(r*4,this._data.sigBytes);if(r){for(let s=0;s<r;s+=this.blockSize)this._doProcessBlock(this._data.words,s);n=this._data.words.splice(0,r),this._data.sigBytes-=o}return new d(n,o)}}class ne extends re{update(i){return this._append(i),this._process(),this}finalize(i){i&&this._append(i)}}const E=[1779033703,-1150833019,1013904242,-1521486534,1359893119,-1694144372,528734635,1541459225],ie=[1116352408,1899447441,-1245643825,-373957723,961987163,1508970993,-1841331548,-1424204075,-670586216,310598401,607225278,1426881987,1925078388,-2132889090,-1680079193,-1046744716,-459576895,-272742522,264347078,604807628,770255983,1249150122,1555081692,1996064986,-1740746414,-1473132947,-1341970488,-1084653625,-958395405,-710438585,113926993,338241895,666307205,773529912,1294757372,1396182291,1695183700,1986661051,-2117940946,-1838011259,-1564481375,-1474664885,-1035236496,-949202525,-778901479,-694614492,-200395387,275423344,430227734,506948616,659060556,883997877,958139571,1322822218,1537002063,1747873779,1955562222,2024104815,-2067236844,-1933114872,-1866530822,-1538233109,-1090935817,-965641998],y=[];class se extends ne{constructor(){super(...arguments),this._hash=new d([...E])}reset(){super.reset(),this._hash=new d([...E])}_doProcessBlock(i,n){const e=this._hash.words;let r=e[0],o=e[1],s=e[2],a=e[3],c=e[4],u=e[5],f=e[6],h=e[7];for(let l=0;l<64;l++){if(l<16)y[l]=i[n+l]|0;else{const w=y[l-15],M=(w<<25|w>>>7)^(w<<14|w>>>18)^w>>>3,m=y[l-2],U=(m<<15|m>>>17)^(m<<13|m>>>19)^m>>>10;y[l]=M+y[l-7]+U+y[l-16]}const g=c&u^~c&f,k=r&o^r&s^o&s,b=(r<<30|r>>>2)^(r<<19|r>>>13)^(r<<10|r>>>22),D=(c<<26|c>>>6)^(c<<21|c>>>11)^(c<<7|c>>>25),_=h+D+g+ie[l]+y[l],I=b+k;h=f,f=u,u=c,c=a+_|0,a=s,s=o,o=r,r=_+I|0}e[0]=e[0]+r|0,e[1]=e[1]+o|0,e[2]=e[2]+s|0,e[3]=e[3]+a|0,e[4]=e[4]+c|0,e[5]=e[5]+u|0,e[6]=e[6]+f|0,e[7]=e[7]+h|0}finalize(i){super.finalize(i);const n=this._nDataBytes*8,e=this._data.sigBytes*8;return this._data.words[e>>>5]|=128<<24-e%32,this._data.words[(e+64>>>9<<4)+14]=Math.floor(n/4294967296),this._data.words[(e+64>>>9<<4)+15]=n,this._data.sigBytes=this._data.words.length*4,this._process(),this._hash}}function oe(t){return new se().finalize(t).toString(Z)}function pe(t,i={}){const n=typeof t=="string"?t:B(t,i);return oe(n).slice(0,10)}function ae(t,i,n={}){return t===i||B(t,n)===B(i,n)}function p(t){if(typeof t!="object")return t;var i,n,e=Object.prototype.toString.call(t);if(e==="[object Object]"){if(t.constructor!==Object&&typeof t.constructor=="function"){n=new t.constructor;for(i in t)t.hasOwnProperty(i)&&n[i]!==t[i]&&(n[i]=p(t[i]))}else{n={};for(i in t)i==="__proto__"?Object.defineProperty(n,i,{value:p(t[i]),configurable:!0,enumerable:!0,writable:!0}):n[i]=p(t[i])}return n}if(e==="[object Array]"){for(i=t.length,n=Array(i);i--;)n[i]=p(t[i]);return n}return e==="[object Set]"?(n=new Set,t.forEach(function(r){n.add(p(r))}),n):e==="[object Map]"?(n=new Map,t.forEach(function(r,o){n.set(p(o),p(r))}),n):e==="[object Date]"?new Date(+t):e==="[object RegExp]"?(n=new RegExp(t.source,t.flags),n.lastIndex=t.lastIndex,n):e==="[object DataView]"?new t.constructor(p(t.buffer)):e==="[object ArrayBuffer]"?t.slice(0):e.slice(-6)==="Array]"?new t.constructor(t):t}const ce={path:"/",watch:!0,decode:t=>K(decodeURIComponent(t)),encode:t=>encodeURIComponent(typeof t=="string"?t:JSON.stringify(t))};function v(t,i){var c;const n={...ce,...i},e=O(n)||{};let r;n.maxAge!==void 0?r=n.maxAge*1e3:n.expires&&(r=n.expires.getTime()-Date.now());const o=r!==void 0&&r<=0,s=p(o?void 0:e[t]??((c=n.default)==null?void 0:c.call(n))),a=r&&!o?fe(s,r):L(s);{const u=typeof BroadcastChannel>"u"?null:new BroadcastChannel(`nuxt:cookies:${t}`),f=()=>{n.readonly||ae(a.value,e[t])||(le(t,a.value,n),e[t]=p(a.value),u==null||u.postMessage({value:n.encode(a.value)}))},h=g=>{var b;const k=g.refresh?(b=O(n))==null?void 0:b[t]:n.decode(g.value);l=!0,e[t]=a.value=k,q(()=>{l=!1})};let l=!1;P()&&z(()=>{l=!0,f(),u==null||u.close()}),u&&(u.onmessage=({data:g})=>h(g)),n.watch?F(a,()=>{l||f()},{deep:n.watch!=="shallow"}):f()}return a}function O(t={}){return V(document.cookie,t)}function ue(t,i,n={}){return i==null?T(t,i,{...n,maxAge:-1}):T(t,i,n)}function le(t,i,n={}){document.cookie=ue(t,i,n)}const j=2147483647;function fe(t,i){let n,e=0;return P()&&z(()=>{clearTimeout(n)}),H((r,o)=>{function s(){clearTimeout(n);const a=i-e,c=a<j?a:j;n=setTimeout(()=>{if(e+=c,e<i)return s();t=void 0,o()},c)}return{get(){return r(),t},set(a){s(),t=a,o()}}})}const de=()=>({isEnabled:()=>{const e=x().query;return Object.prototype.hasOwnProperty.call(e,"preview")&&!e.preview?!1:!!(e.preview||v("previewToken").value||sessionStorage.getItem("previewToken"))},getPreviewToken:()=>v("previewToken").value||sessionStorage.getItem("previewToken")||void 0,setPreviewToken:e=>{v("previewToken").value=e,x().query.preview=e||"",e?sessionStorage.setItem("previewToken",e):sessionStorage.removeItem("previewToken"),window.location.reload()}});export{pe as h,de as u};
