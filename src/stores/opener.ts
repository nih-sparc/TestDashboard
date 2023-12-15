import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useOpenerStore = defineStore('opener', () => {

    const imageSelectorOpen = ref(false);
    const openImage = ref(1);
    const navigatorType = ref("SubjectNav");//default 
    let count = 0;

    //does not need bool value, because multiple image viewers can be opened
    function openImageViewer(){
       openImage.value = count++;
    }

  return { openImageViewer, navigatorType,imageSelectorOpen, openImage }
})
