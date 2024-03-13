import { defineStore } from 'pinia'
import {inject} from 'vue'

export const useOpenerStore = defineStore('opener',{

  state:() => ({
    emitter: inject('emitter'),
    imageSelectorOpen: false,
    ImageViewerOpen: false,
    ImageViewerCount: false
  }),
  actions:{
    openWidget(widgetName, props){
      this.emitter.emit("SparcDashboard-addNewWidget",[widgetName, props]);
    },
  },
    
})
