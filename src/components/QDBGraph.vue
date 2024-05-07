
<template>
    <div class="tw-flex tw-flex-col tw-h-full">
        <Bar
        id="my-chart-id"
        :options="chartOptions"
        :data="chartData"
    />
    </div>
    <div>
      <label>x-axis:</label>
      <el-select :value="labels" placeholder="select label">
          <el-option
            v-for="x in xAxis" :key="x" :label="x" :value="x" @click="updateGraph(x)">
          </el-option>
        </el-select>
    </div>
</template>
<script setup>
  import {ref} from "vue";
  import { Bar } from 'vue-chartjs'
  import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'
  import qdbPlugin from '../plugins/QDBApiClient.js'
  const emit = defineEmits(['setTitle']);
  emit('setTitle','Quantitative Graph')
  emit('addSettings');
  ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

  const props = defineProps({
  })
  const xAxis = ref(["Months", "Years"])

  const years = ["2019","2020","2021"]
  const months = [ 'January', 'February', 'March' ]
  const labels = ref(months)
  const chartData = ref({
        labels: labels.value,
        datasets: [ { data: [40, 20, 12] } ]
      });
    
const chartOptions = ref({
        responsive: true
      });

function updateGraph(type){
  //switch statement 
  if(type=="Years"){
    labels.value = years;
  }else{
    labels.value = months;
  }
  updateChart();
}
function updateChart(){
  chartData.value = {
        labels: labels.value,
        datasets: [ { data: [40, 20, 12] } ]
      };
}
</script>
<style scoped lang="scss">
@import './node_modules/sparc-design-system-components-2/src/assets/_variables.scss';

</style>