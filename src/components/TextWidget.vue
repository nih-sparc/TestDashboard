<template>
  <slot :widgetName="widgetName" :childIcons="childIcons"></slot>
<div class="text-widget-wrap" v-bind="$attrs">
      <!-- if user binds widget to global variable -->
    <div v-if="useGlobalVar">
      <h2>{{ textContentGV }}</h2>
    </div>
    <!-- if user is manually inputting value -->
    <div v-else v-click-out="saveInput" @keyup.enter="saveInput" class="tw-flex">
      <div v-show="editing">
          <el-input @focus="$event.target.select()" ref="textContentInput" v-model="textContent"></el-input>
      </div> 
      <div v-show="!editing" @click="editInput()" class="tw-w-full tw-h-full">
          <h2>{{ textContent }}</h2>
      </div>
      <!-- <el-icon v-show="!editing">
        <Edit @click="editInput()"/>
      </el-icon> -->
    </div>

  </div>
  <TextWidgetSettings  
      :show-dialog="settingsVisible"
      :widget-source-value = "componentName.replaceAll(' ','')"
      :widgetTitleValue = "hideHeader?'':componentName"
      :hideHeaderValue = "hideHeader"
      @close-dialog="settingsVisible = false"
      @update-text-var="(x)=>updateTextVariable(x)"
      @hide-header="(x)=>handleHideHeader(x)"
      >
  </TextWidgetSettings>
</template>
<script setup>
  import { ref, shallowRef, onMounted, computed } from "vue";
  import { Edit } from "@element-plus/icons-vue";
  import TextWidgetSettings from "../devComponents/TextWidget/TextWidgetSettings.vue";
  import {useGlobalVarsStore} from "../stores/globalVars.ts"
  const globalVars = useGlobalVarsStore();

  defineOptions({
      inheritAttrs: false
  })    
  const props = defineProps({
    displayText:String,
    hideHeader:Boolean,
    widgetID:String,
    componentName:String
  })
  const emit = defineEmits(['remove-header']);
  const widgetName = props.header ? ref(props.header) : ref('Text Widget')

  //add icon to header
  const childIcons=shallowRef([{"comp":Edit,"event":openSettings,"tooltip":"open Text settings"}])

  onMounted(() => {
    if(props.hideHeader){emit("remove-header",true)}
  });

  const textContent = ref(props.displayText);
  const editing = ref(false);
  const textContentInput = ref(null);
  const useGlobalVar = ref(false);
  const selectedGlobalVar = ref("");

  function editInput(){
        editing.value=true;
        textContentInput.value ? textContentInput.value.focus(): "";
  }
  function saveInput(){
        editing.value=false;
  }

  //open settings to set global variable
  const settingsVisible = ref(false)
  function openSettings(){
    settingsVisible.value=true
  }
  //called when hide header is checked in settings
  function handleHideHeader(hideIt){
    emit("remove-header",hideIt)
  }
  // called when settings is updated
  function updateTextVariable(newVal){
    useGlobalVar.value = !!newVal.widgetSource;
    selectedGlobalVar.value = newVal.widgetSource;
    const dashItem = globalVars.DASHBOARD_ITEMS.find(item => item.id===props.widgetID)
    dashItem.componentName = newVal.title ? newVal.title: camelCaseToTitle(newVal.widgetSource);
  }
   //version of textContent that is used when binded to global variable
   const textContentGV = computed(() => {
      const selectedValue = globalVars.optionsData.find(item => item.name === selectedGlobalVar.value);
      return selectedValue ? selectedValue.value : null; 
  });

  function camelCaseToTitle(str) {
    if(!str){return;}
    return str
        .replace(/([a-z])([A-Z])/g, '$1 $2') // Add space before uppercase letters
        .replace(/^./, match => match.toUpperCase()); // Capitalize first letter
}

</script>
<style scoped>
  .text-widget-wrap{
      margin:auto;
  }
</style>