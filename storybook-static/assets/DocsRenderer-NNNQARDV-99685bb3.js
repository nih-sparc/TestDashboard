import{_ as h}from"./iframe-f8dc133d.js";import{e as d,R as o,r as a,C as E,A as R,H as x,D as y}from"./index-8560e86d.js";import"../sb-preview/runtime.js";import"./chunk-E56DBAEL-b6679ac2.js";import"./_commonjsHelpers-de833af9.js";import"./index-d37d4223.js";import"./index-9ad20695.js";import"./index-356e4a49.js";var c={},m=d;c.createRoot=m.createRoot,c.hydrateRoot=m.hydrateRoot;var n=new Map,D=({callback:e,children:t})=>{let r=a.useRef();return a.useLayoutEffect(()=>{r.current!==e&&(r.current=e,e())},[e]),t},_=async(e,t)=>{let r=await w(t);return new Promise(s=>{r.render(o.createElement(D,{callback:()=>s(null)},e))})},v=(e,t)=>{let r=n.get(e);r&&(r.unmount(),n.delete(e))},w=async e=>{let t=n.get(e);return t||(t=c.createRoot(e),n.set(e,t)),t},f={code:E,a:R,...x},g=class extends a.Component{constructor(){super(...arguments),this.state={hasError:!1}}static getDerivedStateFromError(){return{hasError:!0}}componentDidCatch(e){let{showException:t}=this.props;t(e)}render(){let{hasError:e}=this.state,{children:t}=this.props;return e?null:o.createElement(o.Fragment,null,t)}},T=class{constructor(){this.render=async(e,t,r)=>{let s={...f,...t==null?void 0:t.components},i=y;return new Promise((u,p)=>{h(()=>import("./index-99791ac7.js"),["./index-99791ac7.js","./index-518f6c6a.js","./index-8560e86d.js","./iframe-f8dc133d.js","./chunk-E56DBAEL-b6679ac2.js","./_commonjsHelpers-de833af9.js","./index-d37d4223.js","./index-9ad20695.js","./index-356e4a49.js"],import.meta.url).then(({MDXProvider:l})=>_(o.createElement(g,{showException:p,key:Math.random()},o.createElement(l,{components:s},o.createElement(i,{context:e,docsParameter:t}))),r)).then(()=>u())})},this.unmount=e=>{v(e)}}};export{T as DocsRenderer,f as defaultComponents};
//# sourceMappingURL=DocsRenderer-NNNQARDV-99685bb3.js.map
