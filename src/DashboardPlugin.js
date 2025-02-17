
import  SparcDashboard  from './devComponents/Dashboard/SparcDashboard.vue'
import "../dist/output.css"
import { defineAsyncComponent } from 'vue'
import { useGlobalVarsStore } from './stores/globalVars'
import '../node_modules/sparc-design-system-components-2/dist/style.css';

//for auto install -----------------------------------------------------------------------------------------------------------------
  
export function installDashboard(app, pinia,componentMap){
  
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

  

