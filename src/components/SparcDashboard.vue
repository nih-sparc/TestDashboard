<template>
  
    <el-col>
      <el-row class="m-12">
        <el-select v-model="NewComponent" placeholder="Add New Widget">
          <el-option
            v-for="item in componentListOptions"
            :key="item"
            :label="item"
            :value="item"
            @click="addNewWidget()">
          </el-option>
        </el-select>
          <el-button type="default" @click="saveDashboard()">Save Dashboard</el-button>
      </el-row>
  </el-col> 
    <div class="grid-stack">
      <div class="grid-stack-item" :gs-id="navItem.id" :gs-x="navItem.x" :gs-y="navItem.y" :gs-w="navItem.w" :gs-h="navItem.h" 
      :id="navItem.id" :key="navItem.id" :gs-no-move="navItem.noMove" :gs-locked="navItem.locked" :gs-min-height="3" :navType="navItem.component">
        <NavWidget>
            <component :is="navItem.component"></component>
        </NavWidget>
      </div>
      <div v-for="(w, indexs) in DashboardItems" class="grid-stack-item" :gs-x="w.x" :gs-y="w.y" :gs-w="w.w" :gs-h="w.h"
            :gs-id="w.id" :id="w.id" :key="w.id">
            <ItemWidget :widgetID="w.id" :widgetName="w.componentName" @remove-widget="removeWidget(w.id)">
              <component :widgetID="w.id" :is="w.component"  @set-name="(n)=>w.componentName=n"></component>
            </ItemWidget>
      </div>
    </div>
</template>

<script setup>

import { ref, onMounted, nextTick, watch, defineAsyncComponent} from 'vue';
import { GridStack } from 'gridstack';
import ItemWidget from './ItemWidget.vue';
import NavWidget from './NavWidget.vue';
import { useOpenerStore } from '../stores/opener.ts';
import { useGlobalVarsStore }from '../stores/globalVars.ts';

import "gridstack/dist/gridstack.min.css";
import "gridstack/dist/gridstack-extra.min.css";

const emit = defineEmits([])
const opener = useOpenerStore();

const globalVars = useGlobalVarsStore();

//counts the widget id
const newName="";
let grid = null;
let navItem = ref({});
let DashboardItems = ref([]);
getItemsFromLS();
let componentListOptions = globalVars.componentList;
let NewComponent = ref("");

let nextId = DashboardItems.value.length;


onMounted(() => {
    initGridStack();
  });


//add gridstack specific events here - - - - - - --  -- -- - - -- - --  -- - - -----  -  - - - - 
function initGridStack(){
    const options={
      float:true,
      column: 4,
      cellHeight: 100,
      minRow: 6,
      margin:5
    }
    grid = GridStack.init(options);

}
//All additional Functions - - - - - - - - -- - - - - --  -- - -- - - - - - - -  --
function removeWidget(widget) {
    var index = DashboardItems.value.findIndex(w => w.id == widget.id);
    DashboardItems.value.splice(index, 1);
    const selector = `#${widget.id}`;
    grid.removeWidget(selector, false);    
  }

// watch(() => opener.openImage, (newVal, oldVal) => {

//   const imgViewer ={id:"img"+newVal,x:1,y:0,w:1,h:2,component: "ImageViewer"};
//   addNewWidget(imgViewer);
// });

function addNewWidget() {
    const node = {id:NewComponent.value+"-"+nextId,x:1,y:0,w:1,h:2,component: NewComponent.value, componentName:NewComponent.value};
    nextId++;
    //add component to items array first. this will update the dom
    DashboardItems.value.push(node);

    nextTick(()=>{
      //after dom updates, add your widget to the grid with makewidget. don't use addwidget
      grid.makeWidget(node.id);
    });
}
function saveDashboard(){
  const gridItems = grid.save();
  gridItems.forEach(item => {
    item.component = item.id.split("-")[0];
    item.componentName = item.component;
  });
  window.localStorage.setItem("DashboardItems",JSON.stringify(gridItems));
}
function getItemsFromLS(){
  let dashItems = [];
  let nav = {};
 
  
  if(isValidJSON(window.localStorage.getItem("DashboardItems"))){
    dashItems = JSON.parse(window.localStorage.getItem("DashboardItems"));
  }
  nav = dashItems.find(item => item.id === "SubjectNav");
  if(!nav){
    navItem = {id:"SubjectNav",x:0,y:0,h:6,w:1, component:opener.navigatorType, noMove:true, locked:true};
  }else{
    navItem = nav;
  }
  let navIndex = dashItems.indexOf(nav);
  if(navIndex!==-1){
    dashItems.splice(navIndex,1);
  }

  DashboardItems.value = dashItems;
}
          // function onChange(event, changeItems) {
          //  //updateInfo();
          //   // update item position
          //   changeItems.forEach(item => {
          //     var widget = items.value.find(w => w.id == item.id);
          //     if (!widget) {
          //       alert("Widget not found: " + item.id);
          //       return;
          //     }
          //     widget.x = item.x;
          //     widget.y = item.y;
          //     widget.w = item.w;
          //     widget.h = item.h;            
          //   });
          // }

          
          // function removeLastWidget() {
          //   if (count.value == 0) return;
          //   var id = `w_${count.value-1}`;
          //   var index = items.value.findIndex(w => w.id == id);    
          //   if (index < 0) return;
          //   var removed = items.value[index];
          //   removeWidget(removed);
          // }
          

          // function updateInfo() {
          //   color.value = grid.engine.nodes.length == items.value.length ? "black" : "red";
          //   gridInfo.value = `Grid engine: ${grid.engine.nodes.length}, widgets: ${items.value.length}`;
          // }       
function isValidJSON(str) {
  if(!str){return false;}
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    
    return true;
}
</script>

<style  lang="scss">
@import '../assets/delete-when-dsc2-imported/_variables.scss';


a {
  text-decoration: none;
}

h1 {
  font-size: 2.5rem;
  margin-bottom: .5rem;
}

.grid-stack {
  background: $background;
}

.grid-stack-item-removing {
  opacity: 0.5;
}

.grid-stack-item {
  overflow: scroll;
  text-align: center;
  line-height: 35px;
}



</style>