<template>
    <div class="text-3xl bg-green-300 font-bold underline">
      Sparc Dashboard
    </div>
    <el-col>
      <el-row class="m-12">
        <el-select v-model="NewComponent" placeholder="Add New Widget">
          <el-option
            v-for="item in ComponentListOptions"
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
      <div class="grid-stack-item" 
      :gs-id="NavItem.id" :gs-x="NavItem.x" :gs-y="NavItem.y" :gs-w="NavItem.w" :gs-h="NavItem.h" :id="NavItem.id" :key="NavItem.id" 
      :gs-no-move="NavItem.noMove" :gs-locked="NavItem.locked" :gs-min-height="3">
          <NavWidget :navType="NavItem.component">
              <component :is="NavItem.component"></component>
          </NavWidget>
      </div>
      <div v-for="(w, indexs) in DashboardItems" class="grid-stack-item" 
      :gs-x="w.x" :gs-y="w.y" :gs-w="w.w" :gs-h="w.h" :gs-id="w.id" :id="w.id" :key="w.id">
            <ItemWidget 
            :widgetID="w.id" :widgetName="w.componentName" @remove-widget="removeWidget(w.id)">
              <component 
              :widgetID="w.id" :is="w.component"  @set-name="(n)=>w.componentName=n">
              </component>
            </ItemWidget>
      </div>
    </div>
</template>

<script setup>

import { ref, onMounted, nextTick, inject} from 'vue';
import { GridStack } from 'gridstack';
import ItemWidget from './ItemWidget.vue';
import NavWidget from './NavWidget.vue';
import { useGlobalVarsStore }from '../stores/globalVars.ts';

import "gridstack/dist/gridstack.min.css";
import "gridstack/dist/gridstack-extra.min.css";

const _emitter = inject('emitter');
const _globalVars = useGlobalVarsStore();

//counts the widget id
let Grid = null;
let NavItem = ref({});
let DashboardItems = ref([]);
getItemsFromLS();
let ComponentListOptions = _globalVars.componentList;
let NewComponent = ref("");

let NextId = DashboardItems.value.length;


onMounted(() => {
    initGridStack();
  });


//add gridstack specific events here - - - - - - --  -- -- - - -- - --  -- - - -----  -  - - - - 
function initGridStack(){
    const options={
      float:true,
      column: 12,
      cellHeight: 30,
      minRow: 6,
      margin:5,
      alwaysShowResizeHandle:true,
      row:28
    }
    Grid = GridStack.init(options);

}
//All additional Functions - - - - - - - - -- - - - - --  -- - -- - - - - - - -  --

function addNewWidget() {
    const node = {id:NewComponent.value+"-"+NextId,w:2,h:6,autoPosition:true, component: NewComponent.value, componentName:NewComponent.value};
    NextId++;
    //add component to items array first. this will update the dom
    DashboardItems.value.push(node);

    nextTick(()=>{
      //after dom updates, add your widget to the grid with makewidget. don't use addwidget
      Grid.makeWidget(node.id);
    });
}
_emitter.on('SparcDashboard-addNewWidget', (value) => { 
      NewComponent.value = value;
      addNewWidget()  
  })
  
function removeWidget(widget) {
    var index = DashboardItems.value.findIndex(w => w.id == widget);
    DashboardItems.value.splice(index, 1);
    const selector = `#${widget}`;
    Grid.removeWidget(selector, false);    
  }
function saveDashboard(){
  const gridItems = Grid.save();
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
      NavItem= {id:"SubjectNav",x:0,y:0,h:20,w:2, component:_globalVars.navigatorType, noMove:true, locked:true};
    }else{
      NavItem = nav;
    }
    let navIndex = dashItems.indexOf(nav);
    if(navIndex!==-1){
      dashItems.splice(navIndex,1);
    }
    DashboardItems.value = dashItems;
}
    
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

.grid-stack {
  background: $background;
}

.grid-stack-item {
  overflow: scroll;
  text-align: center;
  line-height: 35px;
}



</style>