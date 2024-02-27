import{d as u,o as t,e as i,f as o,g as m,t as d,j as a,k as l,l as p}from"./vue.esm-bundler-b8c22e10.js";import{_ as n}from"./Button-8fa75e2b.js";const c={class:"storybook-header"},g=p('<div><svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><g fill="none" fill-rule="evenodd"><path d="M10 0h12a10 10 0 0110 10v12a10 10 0 01-10 10H10A10 10 0 010 22V10A10 10 0 0110 0z" fill="#FFF"></path><path d="M5.3 10.6l10.4 6v11.1l-10.4-6v-11zm11.4-6.2l9.7 5.5-9.7 5.6V4.4z" fill="#555AB9"></path><path d="M27.2 10.6v11.2l-10.5 6V16.5l10.5-6zM15.7 4.4v11L6 10l9.7-5.5z" fill="#91BAF8"></path></g></svg><h1>Acme</h1></div>',1),v={key:0,class:"welcome"},h=u({__name:"Header",props:{user:{}},emits:["createAccount","login","logout"],setup(f){return(e,s)=>(t(),i("header",null,[o("div",c,[g,o("div",null,[e.user?(t(),i("span",v,[m("Welcome, "),o("b",null,d(e.user.name),1),m("!")])):a("",!0),e.user?(t(),l(n,{key:1,size:"small",onClick:s[0]||(s[0]=r=>e.$emit("logout")),label:"Log out"})):a("",!0),e.user?a("",!0):(t(),l(n,{key:2,size:"small",onClick:s[1]||(s[1]=r=>e.$emit("login")),label:"Log in"})),e.user?a("",!0):(t(),l(n,{key:3,primary:"",size:"small",onClick:s[2]||(s[2]=r=>e.$emit("createAccount")),label:"Sign up"}))])])]))}});h.__docgenInfo={exportName:"default",displayName:"Header",description:"",tags:{},props:[{name:"user",required:!0,type:{name:"union",elements:[{name:"{ name: string }"},{name:"null"}]}}],events:[{name:"logout"},{name:"login"},{name:"createAccount"}],sourceFiles:["/Users/samanthakraft/Documents/Dev/Sparc/TestDashboard/src/stories/Header.vue"]};export{h as _};
//# sourceMappingURL=Header-a788cf41.js.map