<template>
    <div class="fill">
        <img :src=imgPath>
    </div>
    <div class="tw-p-1">
        <el-select placeholder="Select Subject"><el-option :value="0">sub 1 </el-option> <el-option :value="1">sub 2</el-option><el-option :value="2">sub 3</el-option></el-select>
    </div>
    <el-table :data="TableData" class="table-of-images tw-text-sm">
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
    import { ref, inject, nextTick } from "vue";
    import { useOpenerStore } from "../stores/opener";
    import {Dataset} from '../assets/Model';
    import { Api } from "../services";
    const emitter = inject('emitter');
    //const opener = useOpenerStore();
    import imageMod from "../assets/imgs/imgInfo.png"
    let imgPath = ref(null);

    let TableData = ref();

    const emit = defineEmits(['setTitle'])
    emit('setTitle','MUSE Image Selector');

function selectImage(index){
    let img = TableData.value[index].path;
    emitter.emit("mbf-image-selected",img);
//  opener.openWidget("BiolucidaViewer", [{key:"mbfLink",value:img}])
}

emitter.on('anatomical-location-selected',(location)=>{
    getImagesFromDataset(location);
});
//on update
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
    imgPath = imageMod;
}

    emitter.on('selectSubject', (value) => {  
        imgPath.value = value;
        imgPath2.value = "./imgs/imgSel.png";
        imgPath3.value = "./imgs/imgSel2.png";
    });

</script>
<style scoped>
    .selector-body{
        
    }
</style>