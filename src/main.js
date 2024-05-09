import './assets/main.css'

import { createApp, defineAsyncComponent } from 'vue'

import { createPinia } from 'pinia'
import DesignSystemComponentsPlugin from 'sparc-design-system-components-2'
import '../node_modules/sparc-design-system-components-2/dist/style.css';
import mitt from 'mitt'
 import App from './App.vue'
 //import DashboardPlugin from "../dist/index"
 //import DashboardPlugin from './DashboardPlugin'
import { useGlobalVarsStore } from './stores/globalVars'
import "../tailwind/output.css"

 const app = createApp(App);
app.use(DesignSystemComponentsPlugin);
app.use(createPinia());
//app.use(DashboardPlugin);
const emitter = mitt();
app.provide('emitter', emitter); 

const componentMap = [
    'ImageSelector',
    'FlatmapViewer',
    'BiolucidaViewer',
    'QDBGraph'
]
componentMap.forEach(comp=>{
    const asyncComponent = defineAsyncComponent(() => import(`./components/${comp}.vue`)); 
    app.component(comp, asyncComponent);
})


//add list of components to add componet drop down
const globalVars = useGlobalVarsStore();
globalVars.componentList = componentMap;

app.use(DesignSystemComponentsPlugin);

app.mount('#app');
