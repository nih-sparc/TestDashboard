import { createApp } from 'vue'
import App from './App.vue'
import {installDashboard} from './DashboardPlugin.ts'
import { createPinia} from 'pinia'

const app = createApp(App);
const pinia = createPinia();

const componentMap = [
    'FlatmapViewer',
    'ImageSelector',
    'BiolucidaViewer',
    'QDBGraph',
    'TextWidget',
    'CountWidget',
    'ScaffoldViewer'
]

async function initializeApp() {
    await installDashboard(app, componentMap); 
    app.mount('#app'); 
}

initializeApp();
