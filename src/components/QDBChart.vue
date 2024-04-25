
<template>
    <div class="flex flex-col h-full">
        <Bar
        id="my-chart-id"
        :options="chartOptions"
        :data="chartData"
    />
    </div>
</template>
<script setup>
  import {ref} from "vue";
  import { Bar } from 'vue-chartjs'
  import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'
  const emit = defineEmits(['setTitle']);
  emit('setTitle','Quantitative Graph')
  ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

  const props = defineProps({
  })
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