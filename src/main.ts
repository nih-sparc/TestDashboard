import './assets/main.css'

import { createApp, defineAsyncComponent } from 'vue'
import { createPinia } from 'pinia'
import mitt from 'mitt'
import ElementPlus from 'element-plus'
import App from './App.vue'
import { useGlobalVarsStore } from './stores/globalVars'

const app = createApp(App);
const emitter = mitt();
app.provide('emitter', emitter); 

const componentMap = [
    'SubjectNav',
    'ImageSelector',
    'ImageViewer',
    'LocationNav'
]
componentMap.forEach(comp=>{
    const asyncComponent = defineAsyncComponent(() => import(`./components/${comp}.vue`)); 
    app.component(comp, asyncComponent);
})

app.use(createPinia());
//add list of components to add componet drop down
const globalVars = useGlobalVarsStore();
globalVars.componentList = componentMap;

app.use(ElementPlus);
app.mount('#app');
