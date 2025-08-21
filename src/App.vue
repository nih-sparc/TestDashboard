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
import {ImageSelectorDash,BiolucidaViewerDash,QDBGraphDash,TextWidgetDash,ScaffoldViewerDash,SubjectSelectorDash,HealFlatmapDash, FlatmapViewerDash, MarkdownDash} from './components/Index' //import all the external widgets from your chosen library. 
import * as siteConfig from '@/config/local.json'
import algoliasearch from 'algoliasearch'
// Lazy loader for Flatmap; only fetched when used
//const FlatmapViewerDash = () => import('./components/FlatmapViewer.vue'); //when own library import('SparcDash/FlatmapWidget');
//add them to the dashboard via your options.availableWidgets array
const availableWidgets = [
    {name:"Flatmap",loader:FlatmapViewerDash},
    {name:"ImageSelector",component:ImageSelectorDash},
    {name:"BiolucidaViewer",component:BiolucidaViewerDash},
    {name:"QDBDGraph",component:QDBGraphDash},
    {name:"TextWidget",component:TextWidgetDash},
    {name:"SubjectSelector",component:SubjectSelectorDash},
    {name:"Read Me",component:MarkdownDash}
]

//component name works more like a header and might need to be renamed throughout the ap
const debug = false;
const defaultLayout = debug ? [
  { id: "TextWidget-1", x: 0, y: 0, h: 1, w:4, componentName:"Ted",component:TextWidgetDash,hideHeader:true, Props:{displayText:"Dastaset Overview"} },
  { id: "TextWidget-2", x: 0, y: 1, h: 2, w:2, componentName:"Bob",component:TextWidgetDash,Props:{bindedKey:"FileCount"} },
  { id: "TextWidget-3", x: 2, y: 1, h: 2, w:2, componentName:"Karen",component:TextWidgetDash,Props:{bindedKey:"Status"}},
  { id: "TextWidget-4", x: 3, y: 1, h: 2, w:2, componentName:"Collaborator Counts",component:TextWidgetDash,Props:{bindedKey:"CollaboaratorCount"}}
] : 
[
    { id: "SubjectSelector-1",component: SubjectSelectorDash,componentName: "Select Subject",h:2, w:5, x:0, y:0 },
        { id: "BiolucidaViewer-2", componentName:"MBF Viewer", component:BiolucidaViewerDash, h:11, w:7, x:5, y:0},
        { id: "FlatmapViewer-3",component: FlatmapViewerDash,componentName: "Flatmap Viewer",h: 8, w: 2, x: 0, y: 2},
        { id: "ImageSelector-4", component:ImageSelectorDash, componentName:"Image Selector", h:8, w:3, x:2, y:2},
        { id: "ODBGraph-5", component: QDBGraphDash, componentName: "Graph", h: 3, w: 5, x: 0, y: 10, }
      ]

const AlgoliaClient = algoliasearch(siteConfig?.ALGOLIA_APP_ID, siteConfig?.ALGOLIA_API_KEY);
//options object ot pass the Dashboard. 
const dashboardOptions =ref({
//key value pairs that can be accessed to the user from high-configurable widgets. 
  globalData:{
    FileCount:20,
    Status:"Draft",
    CollaboaratorCount:0
    },
  services:{
    AlgoliaClient,
    AlgoliaConfig:{
      apiKey:siteConfig?.ALGOLIA_API_KEY,
      appID:siteConfig?.ALGOLIA_APP_ID,
      indexName:siteConfig?.AlgoliaIndexName
    }
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
