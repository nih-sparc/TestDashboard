import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useGlobalVarsStore = defineStore('globalVars', () => {
  const componentList = ref([]);
  const navigatorType = ref("LocationNav");//default 
  return { componentList, navigatorType }
})
