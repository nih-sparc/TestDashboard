
import { SparcDashboard } from './components/Index'
import "../tailwind/output.css"
import { createPinia } from 'pinia'
import { defineAsyncComponent } from 'vue'
import mitt from 'mitt'
import { useGlobalVarsStore } from './stores/globalVars'
import '../node_modules/sparc-design-system-components-2/dist/style.css';


  //for auto install -----------------------------------------------------------------------------------------------------------------
  
export default {
  install: (app) => {

    const emitter = mitt();
    app.provide('emitter', emitter); 
    //app.config.globalProperties.$emitter = emitter;
    app.use(createPinia());
  
    const componentMap = [
        'ImageSelector',
        'QDBChart',
        'FlatmapViewer',
        'BiolucidaViewer'
    ]
    componentMap.forEach(comp=>{
        const asyncComponent = defineAsyncComponent(() => import(`./components/${comp}.vue`)); 
        app.component(comp, asyncComponent);
    })

    //add list of components to add componet drop down
    const globalVars = useGlobalVarsStore();
    globalVars.componentList = componentMap;

    app.component("SparcDashboard", SparcDashboard);
  },
};
export {SparcDashboard};
// Auto-install when vue is found (eg. in browser via <script> tag)
// let GlobalVue = null;
// if (typeof window !== 'undefined') {
// 	GlobalVue = window.Vue;
// } else if (typeof global !== 'undefined') {
// 	GlobalVue = global.Vue;
// }
// if (GlobalVue) {
// 	GlobalVue.use(sparcDash);
// }
//------------------------------------------------------------------------------------------------------------------------------------
  

