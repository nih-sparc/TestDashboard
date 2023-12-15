<template>
    <div ref="instance" @click="listening = !listening" class="viewer-img">
        <img :src=imgPath> 
    </div>
</template>
<script setup>

    import { ref, defineEmits, inject, watch } from 'vue';
    const emitter = inject('emitter');

    const props = defineProps({
        widgetID:{
                type:String,
                required:true
            }
    })

    const listening = ref(false);
    const imgPath = ref("");

    
    const emit = defineEmits(['setName']);
    emit('setName','MUSE Image Viewer');

    emitter.on('selectImage', (value) => {  
        if(listening.value){
            imgPath.value = value;
        }
    });

    //send something custom to parent
    const hightlightFunction = function(instance,allRefs){
        instance.classList.toggle("focus-from-Img-View");
    }
         //use the name of the component you want to talk to and pass it a function
         //i need to make a refs for the component without the id, so it accesses all instances of the component
    watch(() => listening.value, (newVal, oldVal) => {
           emitter.emit('custom-events-ItemWidget-'+props.widgetID, hightlightFunction);
    });

    const customFunction = ref(null);
    const allRefs = {listening,imgPath} // ref you want to expose 
    //this code needs to be included if you want your widget to be interacted with. 
    emitter.on('custom-events-'+props.widgetID, (value) => {  
        customFunction = value;
            nextTick(()=>{
                customFunction(instance, allRefs);
            })
    });



    //have the data on the dashboard save, not just the positions

</script>
<style scoped lang="scss">
@import '../assets/delete-when-dsc2-imported/_variables.scss';
    .viewer-img{
        height:85%
    }
    .highlight{
        border: solid $lightPurple 2px;
    }
</style>
<style lang="scss">
@import '../assets/delete-when-dsc2-imported/_variables.scss';
    .focus-from-Img-View{
        border:solid $lightPurple 2px !important;
    }
</style>