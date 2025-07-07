<template>
    <SparcDashboard :options="dashboardOptions"></SparcDashboard>
    <el-button type="primary" @click="openDialog">Open Dialog</el-button>
    <el-dialog
      v-model="dialogVisible"
      title="Basic Dialog"

      @close="closeDialog"
    >
      <p>This is a dialog content area.</p>

      <template #footer>
        <el-button @click="closeDialog">Cancel</el-button>
        <el-button type="primary" @click="closeDialog">Confirm</el-button>
      </template>
    </el-dialog>
</template>
<script setup lang="ts">
import { ref, onMounted, watch} from 'vue';
import {FlatmapViewerDash,ImageSelectorDash,BiolucidaViewerDash,QDBGraphDash,TextWidgetDash,ScaffoldViewerDash,SubjectSelectorDash,HealFlatmapDash} from './components/Index' //import all the external widgets from your chosen library. 
import { changeGlobalNodesTarget } from 'element-plus/es/utils';

const availableWidgets = [
    FlatmapViewerDash, //add them to the dashboard via your options.availableWidgets array
    ImageSelectorDash,
    BiolucidaViewerDash,
    QDBGraphDash,
    TextWidgetDash,
    ScaffoldViewerDash,
    SubjectSelectorDash,
    HealFlatmapDash
]

//component name works more like a header and might need to be renamed throughout the ap
const debug = false;
const defaultLayout = debug ? [
  { id: "TextWidget-1", x: 0, y: 0, h: 1, w:4, componentName:"Ted",component:TextWidgetDash,hideHeader:true, Props:{displayText:"Dastaset Overview"} },
  { id: "TextWidget-2", x: 0, y: 1, h: 2, w:2, componentName:"Bob",component:TextWidgetDash,Props:{bindedKey:"FileCount"} },
  { id: "TextWidget-3", x: 2, y: 1, h: 2, w:2, componentName:"Karen",component:TextWidgetDash,Props:{bindedKey:"Status"}},
  { id: "TextWidget-4", x: 3, y: 1, h: 2, w:2, componentName:"Collaborator Counts",component:TextWidgetDash,Props:{bindedKey:"CollaboaratorCount"}}
] : 
[{ id: "FlatmapViewer-1", x: 0, y: 0, h: 8, w:2, componentName:"Flatmap Viewer",component:FlatmapViewerDash },
    { id: "ImageSelector-2", x: 2, y: 0, h: 8, w:3, componentName:"Image Selector", component:ImageSelectorDash},
    { id: "BiolucidaViewer-3", x: 5, y: 0,h: 11, w:7, componentName:"MBF Viewer", component:BiolucidaViewerDash},
    { id: "ODBGraph-1", x: 0, y: 8, h: 3, w:5, componentName:"Graph",component:QDBGraphDash },
    { id: "TextWidget-4", x: 3, y: 1, h: 2, w:2, componentName:"Collaborator Counts",component:TextWidgetDash,Props:{bindedKey:"CollaboaratorCount"}}]

//options object ot pass the Dashboard. 
const dashboardOptions =ref({
//key value pairs that can be accessed to the user from high-configurable widgets. 
  globalData:{
    FileCount:20,
    Status:"Draft",
    CollaboaratorCount:0
  },
  availableWidgets,
  defaultLayout
})

const dialogVisible = ref(false);
function closeDialog(){
  dialogVisible.value = false
}
function openDialog(){
  dialogVisible.value = true;
}
  onMounted(() => {

  });

</script>
<style lang="scss">

</style>
