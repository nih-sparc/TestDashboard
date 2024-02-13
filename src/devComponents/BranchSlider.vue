<template>
    <div class="branch-slider-wrap">
        <div class="branch-slider-block">
            <el-slider v-model="value" vertical :min="1" :max="8" placement="left" :format-tooltip="formatLabel"/>
        </div>
        <div class="branch-slider-label">
            <li v-for="branch in BranchMap">{{ branch[1] }}</li>
        </div>
    </div>

</template>
<script lang="ts" setup>
import { reactive, ref, watch} from "vue";

const props = defineProps({
            dataList:{
                type:Array,
                required:false
            }
        })

const emit = defineEmits(['onValueChange']);

//map
let BranchMap = new Map([
    [8,'Main Trunk'],
    [7, 'Meningeal Branch'],
    [6, 'Auricular Branch'],
    [5, 'Pharyngeal Branch'],
    [4, 'Cardiac Branch'],
    [3, 'Gastric Branch'],
    [2, 'Celiac Branch'],
    [1, 'Heaptic Branch']
])
if(props.dataList && props.dataList.length>0){
    BranchMap.clear();
    props.dataList.forEach((d:string,i)=>{
        BranchMap.set(i,d);
    })
}

const value = ref(8);
const formatLabel= (val:number)=>{
    return BranchMap.get(val);
}

watch(value,(newValue)=>{
    emit('onValueChange',BranchMap.get(newValue));
})

</script>
<style scoped lang="scss">
@import '../assets/delete-when-dsc2-imported/_variables.scss';
.branch-slider-wrap{
    display:flex;
    flex-flow:row;
    height: inherit; 
    background: $background;
    padding:5px;
    .branch-slider-block {
        align-items: center;
        padding:16px 0 16px 0;
    }   
    .branch-slider-label{
        text-align: left;
    }
    .branch-slider-block{
        .el-slider{
            margin-top: 0;
            margin-left: 12px;
        }
        :deep(.el-slider__runway) {
            background-color: white;
        }
        :deep(.el-slider__stop){
            background-color: #8300BF;
        }
        :deep(.el-slider__bar){
            background-color: white;
        }
    } 
}

</style>