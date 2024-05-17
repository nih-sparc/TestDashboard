
<template>
    <button @click="settingsVisible=true" ><i>settings</i></button>
    <div class="tw-flex tw-flex-col tw-h-full">
      <component
      id="my-chart-id"
      :is="visualisation"
      :options="chartOptions"
      :data="chartData">
    </component>
    </div>

      <GraphSettings    
      :show-dialog="settingsVisible"
      @close-dialog="settingsVisible = false"
      @update-chart="(x)=>updateChart(x)"
      :labels="labels"
      :data="graphModeData"
      >
        
      </GraphSettings>
</template>
<script setup>
  import {ref, inject} from "vue";
  import { Bar, Scatter } from 'vue-chartjs'
  import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'

  import GraphSettings from '../devComponents/QDBGraph/QDBGraphSettings.vue'
  
  const emit = defineEmits(['setTitle']);
  emit('setTitle','QDB Graph')

  const settingsVisible=ref(false);

  ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

  const visualisation = ref(Bar);
  const graphModeData = {}
  graphModeData.years = ["2019","2020","2021"]
  graphModeData.months = [ 'January', 'February', 'March' ]
  graphModeData.visualisation = visualisation;
  const labels = ref(graphModeData.months)
  const chartData = ref({
        labels: labels.value,
        datasets: [ { data: [40, 20, 12] } ]
      });
    
const chartOptions = ref({
        responsive: true
      });

function updateChart(newGraphData){
  chartData.value = {
        labels: newGraphData.labelOptions,
        datasets: [ { data: [40, 20, 12] } ]
      };
}
</script>
<style scoped lang="scss">
@import './node_modules/sparc-design-system-components-2/src/assets/_variables.scss';

</style>