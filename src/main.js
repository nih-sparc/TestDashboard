import './assets/main.css'

import { createApp, defineAsyncComponent } from 'vue'

import { createPinia } from 'pinia'
import '../node_modules/sparc-design-system-components-2/dist/style.css';

import ElementPlus from 'element-plus'
 import App from './App.vue'
import { useGlobalVarsStore } from './stores/globalVars'
import "../dist/output.css"
import { clickOut } from "./directives/directives.js" 
import { installDashboard} from './DashboardPlugin.ts'

const app = createApp(App);
const pinia = createPinia();

app.use(ElementPlus)

const componentMap = [
    'FlatmapViewer',
    'ImageSelector',
    'BiolucidaViewer',
    'QDBGraph',
    'TextWidget',
    'CountWidget'
]

installDashboard(app,componentMap);
componentMap.forEach(comp=>{
    const asyncComponent = defineAsyncComponent(() => import(`./components/${comp}.vue`)); 
    app.component(comp, asyncComponent);
})

app.directive("focus", focus);
app.directive('click-out', clickOut)

//add list of components to add componet drop down
const globalVars = useGlobalVarsStore();
globalVars.componentList = componentMap;

//app.use(DesignSystemComponents);

app.mount('#app');
