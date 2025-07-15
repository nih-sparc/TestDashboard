import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { SparcImageObject } from '../devComponents/ImageSelector/ImageModel';

export const useGlobalVarsStore = defineStore('globalVars', () => {
  //global objects
  const DefaultLayout = ref([]); //retrieved from Dashboard's properties
  const ComponentRegistry = ref<Record<string,any>>({})
  //gridstack.js instance
  const gridInstance = ref(null);
  const DATASET_ID = ref("");
  const optionsData = ref([])
  const DASHBOARD_ITEMS = ref([]);
 
  //component objects
    //ImageSelector.vue
  const DASH_IMAGE_ARRAY = ref([]);
    //FlatmapViewer.vue
  const FLATMAP_LOCATION = ref("");
    //FilterWidget.vue
  const MBF_IMAGE_NAME = ref("");

  //filtered metadata

  const SELECTED_SUBJECTS = ref([])
  const CURRENT_ROW = ref({})
    //BiolucidaViewer.vue
  const SELECTED_IMAGE = ref(null);


  //scaffold
  //const SCAFFOLD_URL = ref("https://sparc.science/datasets/426?type=dataset&datasetDetailsTab=images")
  const SCAFFOLD_URL = ref("https://mapcore-bucket1.s3-us-west-2.amazonaws.com/others/29_Jan_2020/heartICN_metadata.json")

  const clearAllFilters = ()=>{
    DATASET_ID.value = "";
    DASH_IMAGE_ARRAY.value = [];
    FLATMAP_LOCATION.value = "";
    MBF_IMAGE_NAME.value = "";
    SELECTED_SUBJECTS.value = [];
    CURRENT_ROW.value = {};
    SELECTED_IMAGE.value = null;
    SCAFFOLD_URL.value = "";
    saveToLocalStorage()
  }

  //GETTERS
  const getDashItem =(widgetId:string)=>{
    return DASHBOARD_ITEMS.value?.find(item => item.id===widgetId);
  }
  //SETTERS
  const addOptionsDataItems = (name:string,value:any)=>{
      optionsData.value.push({name,value})
  }
  const clearOptionsDataItems = ()=>{
    optionsData.value = [];
  }
  const setImageArray = (newArray: SparcImageObject[]) => {
    if (!Array.isArray(newArray)) {
      console.error("setImageArray expects an array.");
      return;
    }
    DASH_IMAGE_ARRAY.value = [...newArray]; 
  };
  const setSelectedImage = (selectedImage: SparcImageObject | null, row:Object | null) => {
    if (!selectedImage) {
      console.warn("No valid image selected.");
      return;
    }
    if(row){CURRENT_ROW.value = row}
    SELECTED_IMAGE.value = selectedImage;
    MBF_IMAGE_NAME.value = selectedImage.packageId || "";
  };
  
  const setBiolucidaPath = (path: string) => {
    if (SELECTED_IMAGE.value) {
      SELECTED_IMAGE.value = { ...SELECTED_IMAGE.value, biolucidaPath: path };
    } else {
      console.warn("No image selected. Cannot set Biolucida path.");
    }
  };

  const toggleWidgetLock = (widgetId: string) => {
    const widget = DASHBOARD_ITEMS.value.find(w => w.id === widgetId);
    if (widget) {
      widget.Props = widget.Props || {};
      widget.Props.locked = !widget.Props.locked;
    }
  }
//Save Dashboard to Local Storage
function saveDashboardGrid():void {
  const gridItems = gridInstance.value.save()??[];
  console.log(gridItems)
  const merged = gridItems.map((fromGrid:any) => {
    const dashItems = DASHBOARD_ITEMS.value.find(DI => DI.id === fromGrid.id) || {};
    const overrides = (({ x, y, h, w }) => ({ x, y, h, w }))(fromGrid);
    return { ...dashItems, ...overrides };
  });
  window.localStorage.setItem("DashboardItems", JSON.stringify(merged));
}
  const saveToLocalStorage = ()=>{
    saveDashboardGrid()
    const data = {
      
      DASHBOARD_ITEMS: DASHBOARD_ITEMS.value,
      SELECTED_SUBJECTS: SELECTED_SUBJECTS.value,
      CURRENT_ROW: CURRENT_ROW.value,
      DASH_IMAGE_ARRAY: DASH_IMAGE_ARRAY.value,
      DATASET_ID: DATASET_ID.value,
      FLATMAP_LOCATION: FLATMAP_LOCATION.value,
      MBF_IMAGE_NAME: MBF_IMAGE_NAME.value,
      SELECTED_IMAGE: SELECTED_IMAGE.value,
      optionsData: optionsData.value
    };
  
    localStorage.setItem("dashboard-globalVarsStore", JSON.stringify(data));
  }
  //Load from Local Storage
function getDashItemsFromLS():any[]{
  const raw = window.localStorage.getItem("DashboardItems")
    if(isValidJSON(raw)){
      const dashItems = JSON.parse(raw as string);
      //const maybe =dashItems.map((item:any) => ({...item,tag: item.component.__name}));
      return parseSavedDashItems(dashItems);
    }
    return [];
}
  const loadFromLocalStorage = () => {
    const stored = localStorage.getItem("dashboard-globalVarsStore");
    if (!stored){
      DASHBOARD_ITEMS.value = DefaultLayout.value;
      return;
    } 
    try {
      const data = JSON.parse(stored);
      DASHBOARD_ITEMS.value = getDashItemsFromLS();
      if('SELECTED_SUBJECTS' in data) SELECTED_SUBJECTS.value = data.SELECTED_SUBJECTS;
      if ('CURRENT_ROW' in data) CURRENT_ROW.value = data.CURRENT_ROW;
      if ('DASH_IMAGE_ARRAY' in data) DASH_IMAGE_ARRAY.value = data.DASH_IMAGE_ARRAY;
      if ('DATASET_ID' in data) DATASET_ID.value = data.DATASET_ID;
      if ('FLATMAP_LOCATION' in data) FLATMAP_LOCATION.value = data.FLATMAP_LOCATION;
      if ('MBF_IMAGE_NAME' in data) MBF_IMAGE_NAME.value = data.MBF_IMAGE_NAME;
      if ('SELECTED_IMAGE' in data) SELECTED_IMAGE.value = data.SELECTED_IMAGE;
      if ('optionsData' in data) optionsData.value = data.optionsData;

    } catch (error) {
      console.error("Failed to parse globalVarsStore from localStorage:", error);
    }
  };
//internal 
//Match string with corresponding dashboard component
  const parseSavedDashItems = (savedItems:Array<any>)=>{
    return savedItems.map((item:any)=>{
      const component = ComponentRegistry.value[item.component?.__name]
      if(!component){return null}
      item.component = component;
      return item
      
    }).filter(comp=>!!comp)
  }

function isValidJSON(str:string | null) {
  if(!str){return false;}
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}

  return { 
    DASHBOARD_ITEMS,
    DefaultLayout,
    ComponentRegistry,
    DASH_IMAGE_ARRAY, 
    CURRENT_ROW,
    DATASET_ID, 
    FLATMAP_LOCATION,
    MBF_IMAGE_NAME,
    SELECTED_SUBJECTS,
    SELECTED_IMAGE,
    optionsData,
    SCAFFOLD_URL,
    gridInstance,
    getDashItem,
    toggleWidgetLock,
    setBiolucidaPath,
    setImageArray,
    setSelectedImage,
    addOptionsDataItems,
    clearOptionsDataItems,
    saveToLocalStorage,
    loadFromLocalStorage,
    clearAllFilters
 }
})
