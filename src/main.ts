import './assets/main.css'

import { createApp, defineAsyncComponent } from 'vue'
import { createPinia } from 'pinia'
import DesignSystemComponentsPlugin from 'sparc-design-system-components-2'
import mitt from 'mitt'
import App from './App.vue'
import { useGlobalVarsStore } from './stores/globalVars'

const app = createApp(App);
const emitter = mitt();
app.provide('emitter', emitter); 

const componentMap = [
    'ImageSelector',
    'LocationNav',
    'FlatmapViewer',
    'BiolucidaViewer'
]
componentMap.forEach(comp=>{
    const asyncComponent = defineAsyncComponent(() => import(`./components/${comp}.vue`)); 
    app.component(comp, asyncComponent);
})

app.use(createPinia());
//add list of components to add componet drop down
const globalVars = useGlobalVarsStore();
globalVars.componentList = componentMap;

app.use(DesignSystemComponentsPlugin);

app.mount('#app');
