import{j as e}from"./jsx-runtime-8ce2fded.js";import{M as d,b as a}from"./index-8560e86d.js";import{Primary as i,ListChange as o}from"./LocationNavigator.stories-dc332b03.js";import{u as r}from"./index-518f6c6a.js";import"./iframe-f8dc133d.js";import"../sb-preview/runtime.js";import"./chunk-E56DBAEL-b6679ac2.js";import"./_commonjsHelpers-de833af9.js";import"./index-d37d4223.js";import"./index-9ad20695.js";import"./index-356e4a49.js";import"./vue.esm-bundler-b8c22e10.js";function s(t){const n=Object.assign({h1:"h1",p:"p",h2:"h2",code:"code",h3:"h3",h4:"h4",pre:"pre"},r(),t.components);return e.jsxs(e.Fragment,{children:[e.jsx(d,{title:"Components/LocationNavigator"}),`
`,e.jsx(n.h1,{id:"location-navigator",children:"Location Navigator"}),`
`,e.jsx(n.p,{children:`The Location Navigator contains component BranchSlider that uses el-slider with a vertical attribure
Currently the Location Navigator is using hard coded data`}),`
`,e.jsx(n.h2,{id:"properties",children:"Properties"}),`
`,e.jsx(n.p,{children:"The Location Navigator component accepts the following properties:"}),`
`,e.jsxs(n.p,{children:[e.jsx(n.code,{children:"dataList"}),": The default list is the vagus anatomical locations. You can change the list to by sending the property dataList, which is an array of strings."]}),`
`,e.jsx(n.h2,{id:"events",children:"Events"}),`
`,e.jsxs(n.p,{children:[e.jsx(n.code,{children:"SparcDashboard-addNewWidget"}),": Will fire when a user makes a selection change. This tells the dashboard to add a new widget to the dashboard."]}),`
`,e.jsxs(n.p,{children:[e.jsx(n.code,{children:"Dashboard-Image-Selected"}),": Will fire when a user makes a selection change. Returns a type string that is the location identifier. This can be listened to by any component."]}),`
`,e.jsx(n.h3,{id:"location-navigator-1",children:"Location Navigator"}),`
`,e.jsx(a,{of:i,children:i()}),`
`,e.jsx(n.h4,{id:"code",children:"Code"}),`
`,e.jsx(n.p,{children:"to listen for location-navigator event"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-js",children:`
    emitter.on('Dashboard-Image-Selected', (value) => {  
        //do something with the payload
    });

`})}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-html",children:`<location-navigator/>
`})}),`
`,e.jsx(n.h3,{id:"adding-a-different-list",children:"adding a different list"}),`
`,e.jsx(a,{of:o,children:o()}),`
`,e.jsx(n.h4,{id:"code-1",children:"Code"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-js",children:`data() {
  return {
    dataList:[0,1,2,3]
  }
}
`})}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-html",children:`<location-navigator
  :dataList="dataList"  
/>
`})})]})}function L(t={}){const{wrapper:n}=Object.assign({},r(),t.components);return n?e.jsx(n,Object.assign({},t,{children:e.jsx(s,t)})):s(t)}export{L as default};
//# sourceMappingURL=LocationNavigator-ae46127d.js.map
