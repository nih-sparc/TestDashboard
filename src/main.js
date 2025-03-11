import { createApp } from 'vue'
import App from './App.vue'
import { installDashboard } from '../dist/index'
import { createPinia} from 'pinia'

const app = createApp(App);
const pinia = createPinia();

const componentMap = [
    'FlatmapViewer',
    'ImageSelector',
    'BiolucidaViewer',
    'QDBGraph',
    'TextWidget',
    'CountWidget'
]

async function initializeApp() {
    await installDashboard(app, componentMap); 
    app.mount('#app'); 
}

initializeApp();
