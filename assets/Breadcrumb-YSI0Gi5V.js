import{y as o,j as e,L as n}from"./index-39Ev7rQh.js";/**
 * @license lucide-react v0.460.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const x=o("ChevronRight",[["path",{d:"m9 18 6-6-6-6",key:"mthhwq"}]]);function p({items:l,className:c="",light:r=!1}){const s=[{label:"Home",to:"/"},...l];return e.jsx("nav",{"aria-label":"Breadcrumb",className:c,children:e.jsx("ol",{className:`flex flex-wrap items-center gap-1.5 text-xs uppercase tracking-[0.16em] ${r?"text-ivory/70":"text-espresso-soft"}`,children:s.map((a,t)=>e.jsxs("li",{className:"flex items-center gap-1.5",children:[t>0&&e.jsx(x,{className:"h-3 w-3","aria-hidden":"true"}),a.to&&t<s.length-1?e.jsx(n,{to:a.to,className:`tap-area ${r?"hover:text-amber":"hover:text-terracotta-deep"}`,children:a.label}):e.jsx("span",{"aria-current":"page",className:r?"text-ivory":"text-espresso",children:a.label})]},a.label))})})}export{p as B};
