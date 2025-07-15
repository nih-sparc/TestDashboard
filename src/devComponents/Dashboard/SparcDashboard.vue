<template>
  <!-- Dashboard Header - with and without Filter -->
  <div class="dashboard-app">
    <div v-if="!hideHeader" class="dash-header tw-max-h-screen tw-flex tw-flex-col">
      <span class="tw-float-left tw-m-1 button">
        <el-button class="edit-button"
        @click="handleEditGrid()">
        {{ editGridButton }}
      </el-button>
      </span>
      <FilterWidget></FilterWidget>
    </div>
    <div v-else class="tw-h-10 dash-header">x
      <span class="tw-float-left tw-m-1">
        <el-button class="edit-button"
        @click="handleEditGrid()">
        {{ editGridButton }}
        </el-button>
      </span>
    </div>
<!-- Add New Widget Drop Down -->
    <el-col v-if="!staticMode">
      <div class="tw-m-4 tw-w-40">
        <el-select
        placeholder="Add New Widget">
          <el-option
            v-for="item in ComponentListOptions"
            :key="item"
            :label="item"
            :value="item"
            @click="addNewWidget(item)">
          </el-option>
        </el-select>
    </div>
  </el-col>
  <!-- Grid Stack JS -->
    <div  ref="root" class="grid-stack tw-h-screen">
      <div v-for="(w) in DashboardItems" class="grid-stack-item"
        :ref="el => widgetRefs[w.id] = el"
        :gs-x="w.x"
        :gs-y="w.y"
        :gs-w="w.w"
        :gs-h="w.h"
        :gs-id="w.id"
        :id="w.id"
        :key="w.id"
        :props ="w.Props"
        :gs-locked="w.Props?.locked"
        :gs-no-move="w.Props?.locked"
        :gs-no-resize="w.Props?.locked">
          <ItemWidget
          :widgetID="w.id"
          @remove-widget="removeWidget(w.id)"
          @toggle-lock="toggleWidgetLock"
          :static-mode="staticMode"
          :componentTag="w.component"
          :componentProperties="w.Props"
          :componentName="w.componentName"
          :hideWidgetsHeader="w.hideHeader"
          :is-locked="w.Props?.locked">
          </ItemWidget>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">

import { ref, onBeforeMount, onMounted, nextTick, watch, watchEffect, reactive, computed} from 'vue';
import { GridStack } from 'gridstack';
import FilterWidget from "../FilterWidget/FilterWidget.vue";
import ItemWidget from './ItemWidget.vue';
import { useGlobalVarsStore }from '../../stores/globalVars.ts';
import { storeToRefs } from 'pinia';
import "../../assets/theme.scss";
import "gridstack/dist/gridstack.min.css";
import "gridstack/dist/gridstack-extra.min.css";
import { componentSizeMap } from 'element-plus';

interface DashboardOptions {
  availableWidgets:any[];
  defaultLayout:any[];
  globalData:Record<string,any>;
}

const props = defineProps<{
    hideHeader?:Boolean,
    options:DashboardOptions
}>();

const _globalVars = useGlobalVarsStore();
const { DASHBOARD_ITEMS: DashboardItems } = storeToRefs(_globalVars);



let editGridButton = ref<string>("Edit Grid")
const {gridInstance:Grid} = storeToRefs(_globalVars);
const root = ref<HTMLElement | null>(null);
let staticMode = ref<boolean>(true);
let NextId = 0;

// Track component registry
const ComponentListOptions = ref<string[]>([]);
const {ComponentRegistry:localRegistry} = storeToRefs(_globalVars);
const widgetRefs = reactive<Record<string,HTMLElement | null>>({});

//Load from Local Storage
onBeforeMount(() => {
    _globalVars.DefaultLayout = props.options.defaultLayout;
    _globalVars.loadFromLocalStorage();
    NextId = _globalVars.DASHBOARD_ITEMS.length+1

  });
  onMounted(() => {
    initGridStack();
    parseOptions();

  });


//Initialize Gridstack
function initGridStack(){
    const options={
      float:true,
      column:12,
      cellHeight: "70px",
      minRow: 12,
      margin:5,
      alwaysShowResizeHandle:true,

      resizable: {
        handles: 'e,se,s,sw,w,n'
      }
    }
    Grid.value = GridStack.init(options);
    Grid.value.setStatic(staticMode.value)
}
//Update Dropdown Options
watchEffect(() => {
  const widgets = props.options.availableWidgets ?? [];
  widgets.forEach((comp) => {
    if (comp?.__name && !(comp.__name in localRegistry.value)) {
      localRegistry.value[comp.__name] = comp;
      ComponentListOptions.value.push(comp.__name);
    }
  });
});
//Parse Options to Global Vars
function parseOptions():void{
  const data = props.options.globalData
  if(data){
    _globalVars.clearOptionsDataItems();
      for(const key in data){
        _globalVars.addOptionsDataItems(key,data[key])
      }
  }
}

//Watch for mode change
watch(()=> staticMode.value, (value:boolean) => {
  Grid.value.setStatic(value);
  editGridButton.value = !value?"Save Grid":"Edit Grid";
})
//Add new Widget
function addNewWidget(name:string):void {
  if(!name){return}
  // adding new widget from dropdown
    const id = `${name}-${NextId}`;
    const node = {
      id:id,
      w:2,
      h:6,
      autoPosition:true,
      component: localRegistry.value[name],
      componentName:name, 
      Props:{}
    };

    NextId++;
    //add component to items array first. this will update the dom
    DashboardItems.value.push(node);
    nextTick(()=>{
      //after dom updates, add your widget to the grid
      Grid.value?.makeWidget(`#${id}`);
    });
}
// Remove widget
function removeWidget(widget:string):void {
    var index = DashboardItems.value.findIndex(w => w.id == widget);
    DashboardItems.value.splice(index, 1);
    const selector = `#${widget}`;
    Grid.value.removeWidget(selector, false);
  }

//Lock or Unlock Widget
function toggleWidgetLock({id,isLocked}:{id:string;isLocked:boolean}):void{
  const el = widgetRefs[id];
  if (el && Grid.value) {
    Grid.value.update(el, {
      locked:!isLocked,
      noMove: !isLocked,
      noResize: !isLocked
    });
  }
  _globalVars.toggleWidgetLock(id);
}
//Toggle Edit Mode
function handleEditGrid():void{
  staticMode.value=!staticMode.value;
  if(staticMode.value){
    _globalVars.saveToLocalStorage()
  }
}


</script>

<style scoped lang="scss">
@import '../../assets/vars.scss';
.el-dialog__title {
  color: white;
}

.grid-stack {
 //background
}
.grid-stack-item {

  text-align: center;
  line-height: 35px;
  .grid-stack-item-content{
    overflow: hidden;
    // box-shadow: $dropShadow;
    border:solid $textLight 1px;
    border-radius: 0.2rem;
  }
}
.dashboard-app{
  font-family: Roboto, sans-serif;
  font-size: 14px;
  line-height: 17px;
  background: $background;
  color: $textDark;


  /* Force Inheritance */
  .edit-button {
    background-color: var(--el-color-primary);
    border-color: var(--el-color-primary-dark-2);
    color: white;

    &:hover{
      color:var(--el-color-primary-dark-2);
      background-color: var(--el-color-primary-light-3);
     border-color: var(--el-color-primary-dark-2);
    }
  }

  // .el-button:hover {
  //   background-color: var(--el-color-primary-light-3);
  //   border-color: var(--el-color-primary-dark-2);
  // }
}
</style>
<style lang="scss">
.el-dialog.full-dialog-dashboard {
  width: 95%;
  height: 95%;
  margin: auto;
  margin-top: 2.5%;
  font-family: Roboto, sans-serif;
  font-size: 14px;
  color: var(--textDark);
}

</style>