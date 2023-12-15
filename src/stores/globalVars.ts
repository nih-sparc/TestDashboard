import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useGlobalVarsStore = defineStore('globalVars', () => {
  const count = ref(0)
  const componentList = ref([]);
  return { componentList }
})
