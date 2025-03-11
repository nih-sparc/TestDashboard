import { createApp } from 'vue'
import App from './App.vue'
import {installDashboard} from '../dist/index'

const app = createApp(App);

const componentMap = [
    'FlatmapViewer',
    'ImageSelector',
    'BiolucidaViewer',
    'QDBGraph',
    'TextWidget',
    'CountWidget',
    'ScaffoldViewer'
]

installDashboard(app, componentMap); 
app.mount('#app'); 

