import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useOpenerStore = defineStore('opener', () => {

    const imageSelectorOpen = ref(false);
    const ImageViewerOpen = ref(false);
    const ImageViewerCount = ref(0);

  return { imageSelectorOpen, ImageViewerOpen, ImageViewerCount }
})
