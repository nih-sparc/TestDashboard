<template>
    <SparcDashboard :dBItems="dBItems"  :options="dashboardOptions"></SparcDashboard>
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
import SparcDashboard from "./devComponents/Dashboard/SparcDashboard.vue"

const debug = true;
const dBItems = debug ? [{ id: "TextWidget-1", x: 0, y: 0, h: 1, w:4, componentName:"Text",component:"TextWidget",Props:{displayText:"Dastaset Overview",hideHeader:true} },
{ id: "TextWidget-2", x: 0, y: 1, h: 2, w:2, componentName:"File Count",component:"TextWidget",Props:{displayText:"20"} },
{ id: "TextWidget-3", x: 2, y: 1, h: 2, w:2, componentName:"Status",component:"TextWidget",Props:{displayText:"Published"}}] : 
[{ id: "FlatmapViewer-1", x: 0, y: 0, h: 8, w:2, componentName:"Flatmap Viewer",component:"FlatmapViewer" },
    { id: "ImageSelector-2", x: 2, y: 0, h: 8, w:3, componentName:"Image Selector", component:"ImageSelector"},
    { id: "BiolucidaViewer-3", x: 5, y: 0,h: 11, w:7, componentName:"MBF Viewer", component:"BiolucidaViewer"},
    { id: "ODBGraph-1", x: 0, y: 8, h: 3, w:5, componentName:"Graph",component:"QDBGraph" }]

  //options object ot pass the Dashboard. 
const dashboardOptions =ref({
  //key value pairs that can be accessed to the user from high-configurable widgets. 
  globalData:{
    FileCount:20,
    Status:"Draft",
    CollaboaratorCount:0
  }
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
