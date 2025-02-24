import './assets/main.css'

import { createApp, defineAsyncComponent } from 'vue'

import { createPinia } from 'pinia'
import '../node_modules/sparc-design-system-components-2/dist/style.css';

import ElementPlus from 'element-plus'
 import App from './App.vue'
import { useGlobalVarsStore } from './stores/globalVars'
import "../dist/output.css"
import { installDashboard} from './DashboardPlugin.ts'

const app = createApp(App);


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

//app.use(DesignSystemComponents);

app.mount('#app');
