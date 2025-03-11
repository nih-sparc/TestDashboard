
import  SparcDashboard  from './devComponents/Dashboard/SparcDashboard.vue'
import "../dist/output.css"
import { defineAsyncComponent } from 'vue'
import { useGlobalVarsStore } from './stores/globalVars'
import { createPinia, type Pinia} from 'pinia'
import {App, isRef} from 'vue'
import { clickOut } from "./directives/directives.js" 
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'; 

//for auto install -----------------------------------------------------------------------------------------------------------------
  
export function installDashboard(app: App<Element>, componentMap:Array<string>,pinia){
  if (!pinia || !isPiniaInstance(pinia)) {
    pinia = createPinia();
    app.use(pinia)
  }
  app.use(pinia)
    componentMap.forEach(comp=>{
        const asyncComponent = defineAsyncComponent(() => import(`./components/${comp}.vue`)); 
        app.component(comp, asyncComponent);
    })

    //add list of components to add componet drop down
    const globalVars = useGlobalVarsStore(pinia);
    globalVars.componentList = componentMap;

    app.component("SparcDashboard", SparcDashboard);
    app.directive("focus", focus);
    app.directive('click-out', clickOut)
    app.use(ElementPlus)
  }
export default SparcDashboard;


function isPiniaInstance(obj: unknown): obj is Pinia {
  return (
    !!obj &&
    typeof obj === 'object' &&
    typeof (obj as Pinia).install === 'function' &&  
    typeof (obj as Pinia).use === 'function' &&     
    isRef((obj as Pinia).state)                      
  );
}



