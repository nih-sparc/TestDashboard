
<template>
  <div>
    <el-option
            v-for="chartType in chartTypeList" :key="            v-for="chartType in chartTypeList" :key="item" :label="chartType" :value="item" @click="addNewWidget(item)">
" :label="chartType" :value="            v-for="chartType in chartTypeList" :key="item" :label="chartType" :value="item" @click="addNewWidget(item)">
" @click="addNewWidget(item)">
    </el-option>
  </div>
    <div class="flex flex-col h-full">
        <component
        :is="chartType"
        :options="chartOptions"
        :data="chartData"
    />
    </div>
</template>
<script setup>
  import {ref} from "vue";
  import { Bar, Scatter } from 'vue-chartjs'
  import { Chart as ChartJS, Title, Tooltip, Legend, PointElement, BarElement, CategoryScale, LinearScale, LineElement } from 'chart.js'
  import * as chartConfig from '@/demo/qdbChartConfig.js'
  const emit = defineEmits(['setTitle']);
  emit('setTitle','Quantitative Graph')
  ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, PointElement, LineElement)

  const props = defineProps({
  })
  let chartType = ref("Bar")
  const chartTypeList = ref([
    "Scatter",
    "Bar"
  ])
  const chartData = ref({
        labels: [ 'January', 'February', 'March' ],
        datasets: [ { data: [40, 20, 12] } ]
      });
const chartOptions = ref({
        responsive: true
      });

</script>
<style scoped lang="scss">
@import './node_modules/sparc-design-system-components-2/src/assets/_variables.scss';

</style>