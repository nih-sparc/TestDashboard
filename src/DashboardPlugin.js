
import  SparcDashboard  from './components/SparcDashboard.vue'
import "../dist/output.css"
import { defineAsyncComponent } from 'vue'
import mitt from 'mitt'
import { useGlobalVarsStore } from './stores/globalVars'
import '../node_modules/sparc-design-system-components-2/dist/style.css';


  //for auto install -----------------------------------------------------------------------------------------------------------------
  
export function installDashboard (app, pinia){

    const emitter = mitt();
    app.provide('emitter', emitter); 
    //app.config.globalProperties.$emitter = emitter;
    //app.use(createPinia());
  
    const componentMap = [
        'ImageSelector',
        'QDBGraph',
        'FlatmapViewer',
        'BiolucidaViewer'
    ]
    componentMap.forEach(comp=>{
        const asyncComponent = defineAsyncComponent(() => import(`./components/${comp}.vue`)); 
        app.component(comp, asyncComponent);
    })

    //add list of components to add componet drop down
    const globalVars = useGlobalVarsStore(pinia);
    globalVars.componentList = componentMap;

    app.component("SparcDashboard", SparcDashboard);
  }
export default SparcDashboard;

  

