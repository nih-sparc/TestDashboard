import{d as M,q as D,w as P,s as u,o as _,e as h,f,u as l,F as I,v as T,x as N,t as q,y as v,g as z,z as E,A as O}from"./vue.esm-bundler-b8c22e10.js";const $={class:"branch-slider-wrap"},j={class:"branch-slider-block"},F={class:"branch-slider-label"},C=M({__name:"BranchSlider",props:{dataList:{type:Array,required:!1}},emits:["onValueChange"],setup(a,{emit:e}){const n=a,d=e;let o=new Map([[8,"Main Trunk"],[7,"Meningeal Branch"],[6,"Auricular Branch"],[5,"Pharyngeal Branch"],[4,"Cardiac Branch"],[3,"Gastric Branch"],[2,"Celiac Branch"],[1,"Heaptic Branch"]]);n.dataList&&n.dataList.length>0&&(o.clear(),n.dataList.forEach((t,c)=>{o.set(c,t)}));const r=D(8),s=t=>o.get(t);return P(r,t=>{d("onValueChange",o.get(t))}),(t,c)=>{const g=u("el-slider");return _(),h("div",$,[f("div",j,[l(g,{modelValue:r.value,"onUpdate:modelValue":c[0]||(c[0]=i=>r.value=i),vertical:"",min:1,max:8,placement:"left","format-tooltip":s},null,8,["modelValue"])]),f("div",F,[(_(!0),h(I,null,T(N(o),i=>(_(),h("li",null,q(i[1]),1))),256))])])}}});const w=(a,e)=>{const n=a.__vccOpts||a;for(const[d,o]of e)n[d]=o;return n},k=w(C,[["__scopeId","data-v-b3d5ce87"]]);C.__docgenInfo={exportName:"default",displayName:"BranchSlider",description:"",tags:{},props:[{name:"dataList",type:{name:"array"},required:!1}],events:[{name:"onValueChange"}],sourceFiles:["/Users/samanthakraft/Documents/Dev/Sparc/TestDashboard/src/devComponents/BranchSlider.vue"]};class U{constructor(e){this.ImgName=e.ImgName,this.Path=e.Path,this.Subject=new J(e.Subject),this.Metadata=new H(e.Metadata)}}class G{constructor(e){this.Imgs=[],e.Imgs.forEach(n=>this.Imgs.push(new U(n)))}}class H{constructor(e){this.Branch=e.Branch,this.Sample=e.Sample}}class J{constructor(e){this.ID=e.ID,this.Sex=e.Sex,this.Age=e.Age}}const K=a=>(E("data-v-ba4a8f84"),a=a(),O(),a),Q=K(()=>f("div",{class:"fill"},null,-1)),R={class:"branch-slider"},V={__name:"LocationNavDemo",props:{dataList:{type:Array,required:!1}},setup(a){let e=D();function n(r){e.value[r].path}function d(r){fetch("./dataByLocation.json").then(s=>s.json()).then(s=>o(Object.assign(new G(s)).Imgs))}function o(r){let s=[];r.forEach(t=>{let c={name:t.ImgName,size:"...",path:t.Path};s.push(c)}),e.value=s}return(r,s)=>{const t=u("el-table-column"),c=u("el-button"),g=u("el-table");return _(),h(I,null,[Q,f("div",R,[l(k,{dataList:a.dataList,onOnValueChange:s[0]||(s[0]=i=>d())},null,8,["dataList"])]),l(g,{data:N(e),class:"table-of-images"},{default:v(()=>[l(t,{prop:"name",label:"Name"}),l(t,{prop:"size",label:"Size"}),l(t,{fixed:"right",label:"Img"},{default:v(i=>[l(c,{link:"",type:"primary",size:"small",onClick:X=>n(i.$index)},{default:v(()=>[z("Open")]),_:2},1032,["onClick"])]),_:1})]),_:1},8,["data"])],64)}}},W=w(V,[["__scopeId","data-v-ba4a8f84"]]);V.__docgenInfo={exportName:"default",displayName:"LocationNavDemo",description:"",tags:{},props:[{name:"dataList",type:{name:"array"},required:!1}],sourceFiles:["/Users/samanthakraft/Documents/Dev/Sparc/TestDashboard/src/demo/LocationNavDemo.vue"]};const Z={title:"Components/LocationNavigator"},A=()=>({components:{LocationNav:W,BranchSlider:k},data(){return{}},template:`
      <div style="width: 300px;
      margin: auto;
      border: solid 1px purple;
      padding: 10px;">
        <location-nav/>
      </div>
    `}),p=()=>A(),m=()=>A();var b,y,L;p.parameters={...p.parameters,docs:{...(b=p.parameters)==null?void 0:b.docs,source:{originalSource:`() => createDemo({
  label: 'Primary',
  id: '0',
  data: []
})`,...(L=(y=p.parameters)==null?void 0:y.docs)==null?void 0:L.source}}};var S,x,B;m.parameters={...m.parameters,docs:{...(S=m.parameters)==null?void 0:S.docs,source:{originalSource:`() => createDemo({
  label: 'ListChange',
  id: '1',
  data: [{
    dataList: [0, 1, 2, 3]
  }]
})`,...(B=(x=m.parameters)==null?void 0:x.docs)==null?void 0:B.source}}};const ee=["Primary","ListChange"];export{m as ListChange,p as Primary,ee as __namedExportsOrder,Z as default};
//# sourceMappingURL=LocationNavigator.stories-dc332b03.js.map