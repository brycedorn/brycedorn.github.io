import{W as u,m as y,am as E,h as d,J as g,K as c,N as m,O as _,q as r,I as l,G as h,an as w,ao as N,P as A}from"./runtime.ChaEFXpI.js";let a;function I(){a=void 0}function M(t){let e=null,n=d;var f;if(d){for(e=r,a===void 0&&(a=l(document.head));a!==null&&(a.nodeType!==8||a.data!==g);)a=c(a);a===null?m(!1):a=_(c(a))}d||(f=document.head.appendChild(u()));try{y(()=>t(f),E)}finally{n&&(m(!0),a=r,_(e))}}function b(t){var e=document.createElement("template");return e.innerHTML=t,e.content}function o(t,e){var n=h;n.nodes_start===null&&(n.nodes_start=t,n.nodes_end=e)}function O(t,e){var n=(e&w)!==0,f=(e&N)!==0,i,v=!t.startsWith("<!>");return()=>{if(d)return o(r,null),r;i===void 0&&(i=b(v?t:"<!>"+t),n||(i=l(i)));var s=f?document.importNode(i,!0):i.cloneNode(!0);if(n){var p=l(s),T=s.lastChild;o(p,T)}else o(s,s);return s}}function P(t=""){if(!d){var e=u(t+"");return o(e,e),e}var n=r;return n.nodeType!==3&&(n.before(n=u()),_(n)),o(n,n),n}function R(){if(d)return o(r,null),r;var t=document.createDocumentFragment(),e=document.createComment(""),n=u();return t.append(e,n),o(e,n),t}function D(t,e){if(d){h.nodes_end=r,A();return}t!==null&&t.before(e)}const x="5";typeof window<"u"&&(window.__svelte||(window.__svelte={v:new Set})).v.add(x);export{D as a,o as b,R as c,P as d,M as h,I as r,O as t};
