import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { SparcImageObject } from '../devComponents/ImageSelector/ImageModel';

export const useGlobalVarsStore = defineStore('globalVars', () => {
  //global objects
  const componentList = ref([""]);
  const navigatorType = ref("LocationNav");//default 
  const DATASET_ID = ref("");
 
  //component objects
  const DASH_IMAGE_ARRAY = ref([]);
  const FLATMAP_LOCATION = ref("");
  const MBF_IMAGE_NAME = ref("");

  //filtered metadata
  const SUBJECT_SEX = ref("");
  const SUBJECT_AGE = ref(null);
  const SELECTED_IMAGE = ref(null);

  const selectibleWidgets=["BiolucidaViewer"];
  const mbfViewerCount = 0;


  //SETTERS
  const setImageArray = (newArray: SparcImageObject[]) => {
    if (!Array.isArray(newArray)) {
      console.error("setImageArray expects an array.");
      return;
    }
    DASH_IMAGE_ARRAY.value = [...newArray]; 
  };
  const setSelectedImage = (selectedImage:SparcImageObject)=>{
    SELECTED_IMAGE.value = selectedImage;
    MBF_IMAGE_NAME.value = selectedImage.packageId;
  }
  const setBiolucidaPath = (path:String) => {
    if (SELECTED_IMAGE.value) {
      SELECTED_IMAGE.value.biolucidaPath = path;
    }
  };

  return { 
    componentList, 
    navigatorType, 
    DASH_IMAGE_ARRAY, 
    DATASET_ID, 
    FLATMAP_LOCATION,
    MBF_IMAGE_NAME,
    selectibleWidgets,
    mbfViewerCount,
    SUBJECT_AGE,
    SUBJECT_SEX,
    SELECTED_IMAGE,
    setBiolucidaPath,
    setImageArray,
    setSelectedImage
 }
})
