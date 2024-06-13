
<template>
    <button @click="settingsVisible=true" ><i>settings</i></button> 
    <div class="tw-flex tw-flex-col tw-h-full">
      <component
      id="my-chart-id"
      :is="visualization"
      :options="chartOptions"
      :data="chartData">
    </component>
    </div>

      <GraphSettings    
      :show-dialog="settingsVisible"
      @close-dialog="settingsVisible = false"
      @update-chart="(x)=>updateChart(x)"
      :data="graphSettings"
      >
        
      </GraphSettings>
</template>
<script setup>

  import {ref, onBeforeMount} from "vue";
  import { Bar, Scatter, Pie, Line  } from 'vue-chartjs'
  import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale,PointElement, LineElement } from 'chart.js'
  ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, PointElement, LineElement)
  import {GraphSettingsObject} from "../devComponents/QDBGraph/GraphModel.js"
  import GraphSettings from '../devComponents/QDBGraph/QDBGraphSettings.vue'
  defineOptions({
  inheritAttrs: false
  })
  const emit = defineEmits(['setTitle']);
  emit('setTitle','QDB Graph')

  const settingsVisible=ref(false);

  //retrieve saved settings if exist
  let graphSettings = getSavedGraphSettings();
  let visualization = graphSettings.visualization;
  const chartData = ref(graphSettings.returnSettingsData(Bar));
    
const chartOptions = ref({
        responsive: true,
        maintainAspectRatio: false
      });

//called by Graph Settings component
function updateChart(newGraphData){
  if(visualization !=newGraphData.visualization){ChartJS.destroy}
  visualization=newGraphData.visualization;
  chartData.value = newGraphData.returnSettingsData(visualization);
}

function getSavedGraphSettings(){
   //temporarily return with no settings
   let hasSavedSettings = false;
   if(hasSavedSettings){
    return new GraphSettingsObject();
   }else{
    return new GraphSettingsObject();
   }
}

</script>
<style scoped lang="scss">
@import './node_modules/sparc-design-system-components-2/src/assets/_variables.scss';

</style>