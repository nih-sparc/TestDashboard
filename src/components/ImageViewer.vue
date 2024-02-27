<template>
    <div class="metadata-imgV">

    </div>
    <div ref="instance" @click="listening = !listening" class="viewer-img">
        <img :src=imgPath> 
    </div>
</template>
<script setup>

    import { ref, defineEmits, inject, watch, onMounted, onUnmounted } from 'vue';
    import { useOpenerStore } from '../stores/opener';

    const emitter = inject('emitter');
    const opener = useOpenerStore();

    const props = defineProps({
        title:{
                type:String,
                required:true
            },  
        widgetID:{
                type:String,
                required:true
            }
    })

    const listening = ref(false);
    const imgPath = ref("");

    
    const emit = defineEmits(['setName']);
    emit('setName','MUSE Image Viewer');


    emitter.on('Dashboard-Image-Selected', (value) => {  
        if(listening.value || opener.ImageViewerCount===1){
            imgPath.value = value;
        }
    });

    //uses widgetID to specify own wrapper
    watch(() => listening.value, (newVal, oldVal) => {
           emitter.emit('ImageViewwer-imageSelected-'+props.widgetID, newVal);
    });

onMounted(()=>{
    opener.ImageViewerOpen = true;
    opener.ImageViewerCount++;
})
onUnmounted(()=>{
    opener.ImageViewerOpen = false;
    opener.ImageViewerCount--;
})
    //have the data on the dashboard save, not just the positions

</script>
<style scoped lang="scss">
@import '../assets/delete-when-dsc2-imported/_variables.scss';
    .viewer-img{
        display: flex;
        height: 100%;
        img{
            max-width: 100%;
            max-height: 100%;
        }
    }
    .highlight{
        border: solid $lightPurple 2px;
    }
.metadata-imgV{
    text-align: left;
    margin-left:6px;
    margin:0;
        line-height: 1rem !important;
    p{
        margin:0 !important;
    }
}
</style>
<style lang="scss">
@import '../assets/delete-when-dsc2-imported/_variables.scss';

</style>