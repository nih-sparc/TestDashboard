//import './assets/main.css'

import { createApp } from 'vue'

 import App from './App.vue'

import { installDashboard} from '../dist/index.js'

const app = createApp(App);


//app.use(ElementPlus)

const componentMap = [
    'FlatmapViewer',
    'ImageSelector',
    'BiolucidaViewer',
    'QDBGraph',
    'TextWidget',
    'CountWidget'
]

installDashboard(app,componentMap);

app.mount('#app');
