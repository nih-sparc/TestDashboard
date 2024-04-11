import { defineStore } from 'pinia'
import {inject} from 'vue'

export const useOpenerStore = defineStore('opener',{

  state:() => {
    return {
      emitter: inject('emitter'),
      mbfViewerCount:0,
      selectibleWidgets:["BiolucidaViewer"]
    }

  },
  actions:{
    //example of a call to open BiolucidaViewer
    //  opener.openWidget("BiolucidaViewer", [{key:"mbfLink",value:img}])
    openWidget(widgetName:string, props:string){
      this.emitter.emit("SparcDashboard-addNewWidget",[widgetName, props]);
    },
    updateWidget(widgetName:string, props:string){
      this.emitter.emit("SparcDashboard-updateWidget",[widgetName,props]);
    }
  },
  
})
