<template>
    <el-col>
      <el-row class="m-12">
          <el-button type="primary" @click="addNewWidget()">Add New Widget</el-button>
          <el-button type="default" @click="removeLastWidget()">Remove Last Widget</el-button>
      </el-row>
  </el-col> 
  <el-col>
    <div class="grid-stack">
      <div class="grid-stack-item" :gs-id="navItem.id" :gs-x="navItem.x" :gs-y="navItem.y" :gs-w="navItem.w" :gs-h="navItem.h" 
      :id="navItem.id" :key="navItem.id" :gs-no-move="navItem.noMove" :gs-locked="navItem.locked" :gs-min-height="3">
        <NavWidget>
              <component :is="GetComponentRef(navItem.component)"></component>
        </NavWidget>
      </div>
      <div v-for="(w, indexs) in items" class="grid-stack-item" :gs-x="w.x" :gs-y="w.y" :gs-w="w.w" :gs-h="w.h"
            :gs-id="w.id" :id="w.id" :key="w.id">
            <ItemWidget :widgetName="w.component" @remove-widget="removeWidget(w.id)">
              <component :is="GetComponentRef(w.component)"></component>
            </ItemWidget>
      </div>
    </div>
  </el-col>
</template>

<script setup>

import { ref, onMounted, nextTick, watch} from 'vue';
import { GridStack } from 'gridstack';
import ItemWidget from './ItemWidget.vue';
import NavWidget from './NavWidget.vue';
import SubjectNav from './SubjectNav.vue';
import ImageSelector from './ImageSelector.vue';
import ImageViewer from './ImageViewer.vue';
import { useOpenerStore } from '../stores/opener.ts';

import "gridstack/dist/gridstack.min.css";
import "gridstack/dist/gridstack-extra.min.css";

const emit = defineEmits([])
const opener = useOpenerStore();

// let info = ref("");

// let color = ref("$grey");
// let gridInfo = ref("");


//counts the widget id
let nextId = ref(0);
let grid = null; // DO NOT use ref(null) as proxies GS will break all logic when comparing structures... see https://github.com/gridstack/gridstack.js/issues/2115
let items = ref([]);
opener.navigatorType ="SubjectNav";
let navItem = ref({id:"nav",x:0,y:0,h:6,w:1, component:opener.navigatorType, noMove:true, locked:true});

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
      margin: 10,
    }
    grid = GridStack.init(options);

}
//All additional Functions - - - - - - - - -- - - - - --  -- - -- - - - - - - -  --
function removeWidget(widget) {
    var index = items.value.findIndex(w => w.id == widget.id);
    items.value.splice(index, 1);
    const selector = `#${widget.id}`;
    grid.removeWidget(selector, false);    
  }
function GetComponentRef(name){
  return this[name];
}

watch(() => opener.imageSelectorOpen, (newVal, oldVal) => {
  const imgSelect ={id:"comp1",x:1,y:0,w:1,h:3, component:"ImageSelector"};
  addNewWidget(imgSelect)
});
watch(() => opener.openImage, (newVal, oldVal) => {

  const imgViewer ={id:"img"+newVal,x:1,y:0,w:1,h:2,component: "ImageViewer"};
  addNewWidget(imgViewer);
});

          function onChange(event, changeItems) {
           //updateInfo();
            // update item position
            changeItems.forEach(item => {
              var widget = items.value.find(w => w.id == item.id);
              if (!widget) {
                alert("Widget not found: " + item.id);
                return;
              }
              widget.x = item.x;
              widget.y = item.y;
              widget.w = item.w;
              widget.h = item.h;            
            });
          }

          function addNewWidget(widget) {
            const node = widget;
            //add component to items array first. this will update the dom
            items.value.push(node);

            nextTick(()=>{
              //after dom updates, add your widget to the grid with makewidget. don't use addwidget
              grid.makeWidget(node.id);
            });
          }
          
          function removeLastWidget() {
            if (count.value == 0) return;
            var id = `w_${count.value-1}`;
            var index = items.value.findIndex(w => w.id == id);    
            if (index < 0) return;
            var removed = items.value[index];
            removeWidget(removed);
          }
          

          function updateInfo() {
            color.value = grid.engine.nodes.length == items.value.length ? "black" : "red";
            gridInfo.value = `Grid engine: ${grid.engine.nodes.length}, widgets: ${items.value.length}`;
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
  border: 2px solid $purple;
  border-radius: 0.75rem;
  text-align: center;
  line-height: 35px;
  background: $cochlear;
  cursor: default;
}

</style>