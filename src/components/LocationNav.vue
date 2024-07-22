<template>
    <div class="content-header stick-to-top tw-flex tw-flex-row tw-items-center tw-justify-between tw-h-10 tw-p-1">                    
      <slot></slot>
    </div>
    <div class="fill">

    </div>
    <div class="branch-slider">
        <branch-slider :dataList="dataList" @on-value-change="(loc)=>selectLocation(loc)"></branch-slider>
    </div>
    <el-table :data="TableData" class="table-of-images">
        <el-table-column prop="name" label="Name"/>
        <el-table-column prop="size" label="Size"/>
        <el-table-column fixed="right" label="Img">
            <template #default="scope">
                <el-button link type="primary" size="small" @click="selectImage(scope.$index)">Open</el-button>
            </template> 
        </el-table-column>
    </el-table>
</template>
<script setup>
  import { ref, inject, nextTick} from "vue";
  import { useOpenerStore } from "../stores/opener";
  import BranchSlider from "../devComponents/BranchSlider.vue";
  import {Dataset} from '../assets/Model';

  const emitter = inject('emitter');
  const opener = useOpenerStore();
  const baseUrl = './imgs/'
  let TableData = ref();
  let Location ="";


  const props = defineProps({
            dataList:{
                type:Array,
                required:false
            }
        })
        

function selectImage(index){

    let img = TableData.value[index].path;
    opener.openWidget("BiolucidaViewer", [{key:"mbfLink",value:img}])
    
}
function selectLocation(location){
    Location=location;
    //make call using location
    fetch('./dataByLocation.json')
        .then((response) => response.json())
        .then((json) => buildDataTable(Object.assign(new Dataset(json)).Imgs),
        );
}

function buildDataTable(Imgs){
    let _tempArr=[];
    Imgs.forEach((img)=>{
        let column = {
            name:img.ImgName,
            size: "...",
            path: img.Path
        }
        _tempArr.push(column);
    })
    TableData.value=_tempArr;
}
</script>
<style scoped lang="scss">
    .branch-slider{
        display:flex;
        justify-content: center;
        margin-bottom:10px;
    }
    .open-image{
        color:#8300BF;
    }

</style>