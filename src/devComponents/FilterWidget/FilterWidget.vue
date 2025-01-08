<template>                  
    <el-row class="filter-wrapper">
        <div class="tw-m-2">{{displayString }}</div>
    </el-row>
</template>
<script setup>
  import { ref, watch, computed} from "vue";
  import { useGlobalVarsStore } from '../../stores/globalVars'
    const GlobalVars = useGlobalVarsStore();

    defineOptions({
        inheritAttrs: false
    })
  const props = defineProps({
    listening:{
            tyep:Boolean
    }
  })

const ActiveFilters = ref(new Map());
const displayString = computed(()=>{
    let filterString = "";
    filterOrder.forEach(key => {
        const value = ActiveFilters.value.get(key);
        if(value){
            filterString += `${key}: ${value}, `;
        }
    });
    filterString = filterString.slice(0, -2); 
    return filterString;
});
//watches
// dataset > anatomical location name > Image name 
//add to ActiveFilters. reactivity should update dom 
watch(() => GlobalVars.DATASET_ID, (newVal, oldVal) => {
    const orderNum = 0;
    ActiveFilters.value.delete(filterOrder[orderNum])
    ActiveFilters.value.set(filterOrder[orderNum],newVal)
        // const indexOf = ActiveFilters.value.indexOf(oldVal);
        // indexOf!==-1 ?  ActiveFilters.value.splice(indexOf,1): null;
        // newVal? ActiveFilters.value.push(newVal): null;
    })
watch(() => GlobalVars.FLATMAP_LOCATION, (newVal, oldVal) => {
    const orderNum = 1;
    ActiveFilters.value.delete(filterOrder[orderNum])
    ActiveFilters.value.set(filterOrder[orderNum],newVal)
    // const indexOf = ActiveFilters.value.indexOf(oldVal);
    // indexOf!==-1 ?  ActiveFilters.value.splice(indexOf,1): null;
    // newVal? ActiveFilters.value.push(newVal): null;
})
watch(() => GlobalVars.MBF_IMAGE_NAME, (newVal, oldVal) => {
    const orderNum = 2;
    ActiveFilters.value.delete(filterOrder[orderNum])
    ActiveFilters.value.set(filterOrder[orderNum],newVal)
    // const indexOf = ActiveFilters.value.indexOf(oldVal);
    // indexOf!==-1 ?  ActiveFilters.value.splice(indexOf,1): null;
    // newVal? ActiveFilters.value.push(newVal): null;
})

const filterOrder = ["Dataset", "Vagal Location", "Selected Image"]

</script>
<style scoped lang="scss">
@import './node_modules/sparc-design-system-components-2/src/assets/_variables.scss';

</style>