<template>              
      <slot :widgetName="widgetName"></slot>

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
    import { TableObject} from "../devComponents/ImageSelector/ImageModel"
    import { Api } from "../services";
    const emitter = inject('emitter');

    defineOptions({
        inheritAttrs: false
    })    
    
    import imageMod from "../assets/imgs/imgInfo.png"
    const imgPath = ref(null);
    const imageArray = ref(null);
    const imageType = ref("");
    const TableData = ref();

    const widgetName = ref('MUSE Image Selector');

function selectImage(index){
    let img = TableData.value[index].path;
    emitter.emit("ImageSelector-mbfImageSelected",img);
}

emitter.on('locationSelect-MBFImageArrayUpdate',(imageArray)=>{
    //buildDataTable
    //imageArray.value = new TableObject(imageArray);

    //TableData.value = imageArray.value.buildTableMBF();
    getImagesFromDataset();
});
//on update
const getImagesFromDataset = async (datasetId)=>{
    datasetId=353;
    TableData.value=[];
            let _biolucidaImageData = {};
            let _response = {};
            try{
                await Api.biolucida.searchDataset(datasetId).then(response =>{
                    _response = response;
                })
                if (_response.status === 200) {
                _biolucidaImageData = _response;
                //buildTable needs to belong to ImageModel/s 
                imageArray.value = new TableObject(_biolucidaImageData.data.dataset_images);
                TableData.value = imageArray.value.buildTableSPARC();
                //buildDataTable(Object.assign(new TableObject(_biolucidaImageData.data.dataset_images)));
                }
            }catch(e){
                console.error("couldn't fetch images from dataset");
            }
        }

function buildDataTable(tbleObj){
    const imgs = tbleObj.SparcImageArray;
    let _tempArr=[];
    imgs.forEach((img)=>{
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