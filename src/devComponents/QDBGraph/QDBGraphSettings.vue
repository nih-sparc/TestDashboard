<template>

<el-dialog
    v-model="dialogVisible"
    title="QDB Graph Settings"
    width="1000"
    :append-to-body="true"
  >
    <div class="tw-p-1">
      <label>Select Your Visualization: </label>
      {{ selectedVisual }}
      <div><el-button v-for="v in  visualizations" @click="changeVisualization(v)" 
        :class="{ 'secondary': v!=selectedVisual }" >{{ v }}</el-button></div>
    </div>
      <slot>
        <div class="tw-border-solid" v-for="gm in gMList">
          <label>Select Metric</label>
          <el-select  v-model="selectedMetric" placeholder="select Metric">
            <el-option
              v-for="m in metricList" :key="m" :label="m" :value="m" @click="getAspectList(m)">
            </el-option>
          </el-select>

          <div v-if="selectedVisual=='Scatter'">
            <label>y-axis:</label>
    
            <el-select  v-model="selectedX" placeholder="select label">
              <el-option
                v-for="a in aspectList" :key="a" :label="a" :value="a" @click="changeXaxis(a)">
              </el-option>
            </el-select>
            <label>x-axis:</label>
    
            <el-select  v-model="selectedY" placeholder="select label">
              <el-option
                v-for="a in aspectList" :key="a" :label="a" :value="a" @click="changeYaxis(a)">
              </el-option>
            </el-select>
          </div>
          <el-button @click="removeMetric(gm)"></el-button>
        </div>
        <el-button @click="addMetric()">add Metric</el-button>
      </slot>

    <template #footer>
      <div class="dialog-footer">
        <el-button class="secondary" @click="dialogVisible = false">Cancel</el-button>
        <el-button @click="updateGraph()">
          Save
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>
<script setup>

import { ref, onMounted, watch, reactive } from 'vue'
import { ElMessageBox } from 'element-plus'
import {VisualizationMap, GraphSettingsObject} from "./GraphModel.js"
import { Api } from "../../services";

const emit = defineEmits(['close-dialog','update-chart']);

const props = defineProps({      
    showDialog:{
      type: Boolean,
      default: false
    },
    options:{default:{}},
    settingsData:{default:{}},
})
//copy property data
const newGraphData = new GraphSettingsObject(props.settingsData);
onMounted(()=>{
  getMetricList();
})

//close and open------------------------------------
const dialogVisible=ref(false);
watch(dialogVisible, (newVal) => {
  if(newVal==false){
      emit("close-dialog")}
  })
 watch(()=>props.showDialog, (newVal) => {
       dialogVisible.value=newVal
   });

// on Save------------------------------------------------------
function updateGraph(){
  getDataPointsFromQDB();
  dialogVisible.value=false
}

//visualizations ---------------------------------------------
const visualizations =  Array.from(VisualizationMap.keys());
let selectedVisual = ref(newGraphData.visualizationName);
//const foo = newGraphData.value;
function changeVisualization(graphName){
    selectedVisual.value = graphName ;
    //highlight button
    newGraphData.visualization = VisualizationMap.get(graphName);
}
//multi metric options -----------------------------------------
const gMList = ref(newGraphData.datasets);
function addMetric(){
    newGraphData.addDataset();
}
function removeMetric(metric){
  if(gMList.value.length>1){
    const index = gMList.value.indexOf(metric);
    gMList.value.slice(index,1);
  }
}
//metrics ------------------------------------------------------
const metricList = ref([]);
const selectedMetric = ref("");
const selectedX = ref("");
const selectedY = ref("");
const getMetricList = async ()=>{
  let _metric_list = {};
  let _response = {};
    try{
        await Api.qdb.getClasses().then(response =>{
            _response = response;
        })
        if (_response.status === 200) {
        _metric_list = _response.data.result;
            metricList.value = _metric_list.map(m=>m.label);
        }
    }catch(e){
        console.error("couldn't fetch classes/metrics from QDB");
        console.log(e)
    }
  }
//aspects --------------------------------------------------------
const aspectList = ref([]);
const getAspectList = async(metric)=>{
  let _aspect_list = {};
  let _response = {};
  try{
      await Api.qdb.getAspectsFromMetric(metric).then(response =>{
          _response = response;
      })
      if (_response.status === 200) {
        _aspect_list = _response.data.result;
          aspectList.value = _aspect_list.map(a=>a.label);
      }
  }catch(e){
      console.error("couldn't fetch aspects of "+m+" from QDB");
      console.log(e)
  }
}

function changeXaxis(x){
  selectedX.value = x;
}
function changeYaxis(y){
  selectedY.value=y;
}

//---------------------------------------------------------------
const getDataPointsFromQDB = async()=>{
  let _response = {};
  let _xAxis = {};
  let _yAxis = {};
  try{
    await Api.qdb.getDataByAspect(selectedMetric.value, selectedX.value).then(response=>{
      _response = response;
    })
    if(_response.status===200){
      _xAxis = _response.data.result;

      await Api.qdb.getDataByAspect(selectedMetric.value, selectedY.value).then(response=>{
        _response = response;
      })
      if(_response.status===200){
        _yAxis = _response.data.result;
        pointData(_xAxis,_yAxis);
        emit('update-chart',newGraphData)
      }
    }

  }catch(e){
    console.error("could not fetch data points from qdb");
    console.log(e);
  }
}

function pointData(xAxis,yAxis){
  //match up where inst is the same and agg_type = instance
 // let results = xAxis.filter(o1 => y.some(o2 => o1.id === o2.id));
 let pointDataArray=[];
 xAxis.forEach(x => {
    const yMatch = yAxis.find(y => y.inst === x.inst && y.agg_type=="instance" && x.agg_type==="instance");
    if(yMatch){
      pointDataArray.push({"x":x.value,"y":x.value});
    }
  });
  newGraphData.datasets.data = pointDataArray;
  //get value from each pair
}
const handleClose = () => {
 // ElMessageBox.confirm('Hello World')
 alert("yo")
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