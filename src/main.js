import "./assets/themes/blue.scss";
import { createApp } from 'vue'
import App from './App.vue'
//import {installDashboard} from '../dist/index'
import { installDashboard } from './DashboardPlugin';
import ElementPlus from 'element-plus';
import { createPinia } from "pinia";
import 'element-plus/dist/index.css';

const app = createApp(App);

installDashboard(app); 
// Add Element Plus UI library
app.use(ElementPlus);
app.mount('#app'); 
