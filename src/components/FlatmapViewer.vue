<template>
    <div>
        <div class="flatmap-viewer h-4/6 flex justify-center mb-1">
            <FlatmapVuer disableUI="true" minZoom="6" entry="UBERON:1759" v-on:resource-selected="FlatmapSelected"  v-on:ready="FlatmapReady"/>
        </div>
        <el-table :data="TableData" class="table-of-images h-2/6 text-sm">
            <el-table-column prop="name" label="Name"/>
            <el-table-column prop="size" label="Size"/>
            <el-table-column fixed="right" label="Img">
                <template #default="scope">
                    <el-button link type="primary" size="small" @click="selectImage(scope.$index)">Open</el-button>
                </template> 
            </el-table-column>
        </el-table>
    </div>
</template>
<script setup>
  import { ref, inject, nextTick} from "vue";
  import {Dataset} from '../assets/Model';
  import { Api } from "../services";
  import {FlatmapVuer, MultiFlatmapVuer} from '@abi-software/flatmapvuer';
  import { useOpenerStore } from "../stores/opener";
  FlatmapVuer.props.flatmapAPI.default="https://mapcore-demo.org/devel/flatmap/v4/";

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
function FlatmapSelected(data){
    Location = data.feature.featureId;
    getImagesFromDataset(353);
}

const getImagesFromDataset = async (datasetId)=>{
            let _biolucidaImageData = {};
            let _response = {};
            try{
                await Api.biolucida.searchDataset(datasetId).then(response =>{
                    _response = response;
                })
                if (_response.status === 200) {
                _biolucidaImageData = _response;
                buildDataTable(Object.assign(new Dataset(_biolucidaImageData.data.dataset_images)).Imgs);
                }
            }catch(e){
                console.error("couldn't fetch images from dataset");
            }
        }
function selectImage(index){
    let img = TableData.value[index].path;
    opener.openWidget("BiolucidaViewer", [{key:"mbfLink",value:img}])
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
    .flatmap-viewer{
        :deep(.flatmap-container){
            width: 100%;
        }
    }
    .open-image{
        color:#8300BF;
    }

</style>