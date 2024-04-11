import SparcDashboard from './src/components/SparcDashboard.vue';
import "./tailwind/output.css"

//import { defineAsyncComponent } from 'vue'
//import mitt from 'mitt'
//import { useGlobalVarsStore } from './src/stores/globalVars'

export default SparcDashboard;

export function install(app) {
    // Register your component globally
    //app.component('SparcDashboard', SparcDashboard);
  
    // Set up any dependencies here. Example with mitt:
    //const emitter = mitt();
    //app.config.globalProperties.$emitter = emitter;
  
    // const componentMap = [
    //     'SubjectNav',
    //     'ImageSelector',
    //     'ImageViewer',
    //     'LocationNav',
    //     'FlatmapViewer',
    //     'BiolucidaViewer'
    // ]
    // componentMap.forEach(comp=>{
    //     const asyncComponent = defineAsyncComponent(() => import(`./components/${comp}.vue`)); 
    //     app.component(comp, asyncComponent);
    // })

    //add list of components to add componet drop down
    //const globalVars = useGlobalVarsStore();
    //globalVars.componentList = componentMap;

  }
  //instruct users to install
