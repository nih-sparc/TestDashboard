<template>
    <div class="fill sticky">
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
    import { ref, defineEmits, inject } from "vue";
    const emitter = inject('emitter');

    const imgPath = ref();
    const imgPath2 = ref();
    const imgPath3 = ref();

    const emit = defineEmits(['setName'])
    emit('setName','MUSE Image Selector');

    function selectImage(img){
        emitter.emit('selectImage', img);
    }

    emitter.on('selectSubject', (value) => {  
        imgPath.value = value;
        imgPath2.value = "./imgs/imgSel.png";
        imgPath3.value = "./imgs/imgSel2.png";
    });
    
//'./imgs/imgInfo.png'

</script>
<style scoped>
    .selector-body{
        
    }
</style>