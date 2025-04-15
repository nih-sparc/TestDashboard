import "./assets/themes/blue.scss";
import { createApp } from 'vue'
import App from './App.vue'
//import {installDashboard} from '../dist/index'
import { installDashboard } from './DashboardPlugin';


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
