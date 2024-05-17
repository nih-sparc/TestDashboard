<template>

<el-dialog
    v-model="dialogVisible"
    title="QDB Graph Settings"
    width="1000"
    :append-to-body="true"
    @close="updateGraph()"

  >
    <div class="tw-p-1">
      <label>Select Your Visualization</label>
      <div><el-button v-for="v in visualisations" @click="changeVisualization(v)">{{ v }}</el-button></div>
    </div>
      <slot>
        <div>
          <label>x-axis:</label>
          <el-select :value="labelOptions" v-model="selectedMode" placeholder="select label">
            <el-option
              v-for="x in xAxis" :key="x" :label="x" :value="x" @click="changeLabels(x)">
            </el-option>
          </el-select>
        </div>
      </slot>

    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="dialogVisible = false">
          Save
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>
<script setup>

import { ref, shallowRef, watch } from 'vue'
import { ElMessageBox } from 'element-plus'

const emit = defineEmits(['close-dialog','update-chart']);

const props = defineProps({      
    showDialog:{
      type: Boolean,
      default: false
    },
    labels:{default:[]},
    data:{default:{}},
})

const dialogVisible=ref(false);

watch(dialogVisible, (newVal) => {
  if(newVal==false){
      emit("close-dialog")}
  })

 watch(()=>props.showDialog, (newVal) => {
       dialogVisible.value=newVal
   });

  const newGraphData = props.data;
  const labelOptions = ref(props.labels);
  const xAxis = ref(["Months", "Years"])
  const selectedMode = ref("Years")

function updateGraph(){
  dialogVisible.value=false
  newGraphData.labelOptions = labelOptions;
  emit('update-chart',newGraphData)
}

const visualisations = ["Distribution", "Timeseries","Bar", "Scatter", "Pie Chart"]
const selectedVisual = shallowRef(newGraphData.visualisations)
function changeVisualization(mode){
    selectedVisual.value = mode;
    //highlight button
    newGraphData.visualisations = mode;
}

function changeLabels(label){
  selectedMode.value = label ? label: selectedMode.value;
  labelOptions.value = props.data[label.toLowerCase()];
}

const handleClose = () => {
  ElMessageBox.confirm('Hello World')
    .then(() => {
      done()
    })
    .catch(() => {
      // catch error
    })
}

</script>
<style>
</style>