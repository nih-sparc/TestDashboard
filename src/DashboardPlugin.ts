import SparcDashboard from './devComponents/Dashboard/SparcDashboard.vue';
import { defineAsyncComponent, defineCustomElement, App, isRef } from 'vue';
import { useGlobalVarsStore } from './stores/globalVars';
import { createPinia, type Pinia } from 'pinia';
import { clickOut } from "./directives/directives.js"; 
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import "../tailwind/output.css";

export function installDashboard(
  app: App<Element>,
  componentMap: Array<string>,
  pinia: Pinia | null = null,
  options: { useShadowDOM?: boolean } = {}
) {
  const useShadowDOM = options.useShadowDOM ?? false;
  // Setup Pinia
  if (!pinia || !isPiniaInstance(pinia)) {
    pinia = createPinia();
    app.use(pinia);
  }

  // Register all async components
  componentMap.forEach(comp => {
    const asyncComponent = defineAsyncComponent(() => import(`./components/${comp}.vue`));
    app.component(comp, asyncComponent);
  });

  // Save component list to global state
  const globalVars = useGlobalVarsStore(pinia);
  globalVars.componentList = componentMap;

  // Register SPARC Dashboard component
  if (options.useShadowDOM) {
    const SparcDashboardCE = defineCustomElement(SparcDashboard);
    // Note: tag must be kebab-case for custom elements
    if (!customElements.get('sparc-dashboard')) {
      customElements.define('sparc-dashboard', SparcDashboardCE);
    }
  } else {
    app.component('SparcDashboard', SparcDashboard);
  }

  // Register directives
  app.directive("focus", focus);
  app.directive("click-out", clickOut);

  // Add Element Plus UI library
  app.use(ElementPlus);
}

export default SparcDashboard;

function isPiniaInstance(obj: unknown): obj is Pinia {
  return (
    !!obj &&
    typeof obj === 'object' &&
    typeof (obj as Pinia).install === 'function' &&
    typeof (obj as Pinia).use === 'function' &&
    isRef((obj as Pinia).state)
  );
}
