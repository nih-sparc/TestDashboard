import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useGlobalVarsStore = defineStore('globalVars', () => {
  //global objects
  const componentList = ref([""]);
  const navigatorType = ref("LocationNav");//default 
  const datasetID = ref("");
 
  //component objects
  const MBF_IMAGE_ARRAY = ref([]);


  return { componentList, navigatorType, MBF_IMAGE_ARRAY, datasetID }
})
