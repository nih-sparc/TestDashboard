<template>
    <div class="fill">
        <img :src=imgPath>
    </div>
    <div class="selector-body">
        <div @click="selectImage('./imgs/img.png')" class="fill">
            <img :src=imgPath2>
        </div>
        <div @click="selectImage('./imgs/img2.png')" class="fill">
            <img :src=imgPath3>
        </div>
        <div @click="selectImage('./imgs/img.png')"  class="fill">
            <img :src=imgPath2>
        </div>
        <div @click="selectImage('./imgs/img2.png')"  class="fill">
            <img :src=imgPath3>
        </div>
        <div @click="selectImage('./imgs/img.png')"  class="fill">
            <img :src=imgPath2>
        </div>
        <div @click="selectImage('./imgs/img2.png')"  class="fill">
            <img :src=imgPath3>
        </div>
    </div>


</template>
<script setup>
    import { ref, inject, onUnmounted, onMounted, nextTick } from "vue";
    import { useOpenerStore } from "../stores/opener";
    const emitter = inject('emitter');
    const opener = useOpenerStore();

    const imgPath = ref("./imgs/imgInfo.png");
    const imgPath2 = ref("./imgs/imgSel.png");
    const imgPath3 = ref("./imgs/imgSel2.png");

    const emit = defineEmits(['setName'])
    emit('setName','MUSE Image Selector');

    function selectImage(img){
        opener.openWidget("ImageViewer",[{key:"imageSrc",value:img}]);
    }

    emitter.on('selectSubject', (value) => {  
        imgPath.value = value;
        imgPath2.value = "./imgs/imgSel.png";
        imgPath3.value = "./imgs/imgSel2.png";
    });
    
// onMounted(()=>{
//     opener.imageSelectorOpen = true;
// })
// onUnmounted(()=>{
//     opener.imageSelectorOpen = false;
// })
//'./imgs/imgInfo.png'

</script>
<style scoped>
    .selector-body{
        
    }
</style>