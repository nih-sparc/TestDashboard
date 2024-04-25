<template>
    <div class="flex flex-col h-full">
        <div class="bv-metadata text-left p-1 text-sm">
            <p><span>Dataset: </span>
    Dataset Name Here </p>
            <p><span>Metadata: </span>Metadata could go here</p>
        </div>
        <div class="bio-viewer h-screen flex justify-center">
            <iframe class="p-1 w-screen" :src="mbfURLSrc" ></iframe>
        </div>
    </div>
</template>
<script setup>
  import {ref, onMounted, onUnmounted, inject} from "vue";
  import { Api } from "../services";
  import {Dataset} from '../assets/Model';
  import { useOpenerStore } from "../stores/opener";

  const emit = defineEmits(['setTitle','selectWidget']);

  const props = defineProps({
    imageID:0,
    mbfLink: {type:String},
    listening:{
            tyep:Boolean
    }
  })

  const emitter = inject('emitter');
  let mbfURLSrc =ref(props.mbfLink);

  const opener = useOpenerStore();

  onMounted(() => {
    emit('setTitle','MBF Image Viewer');
    opener.mbfViewerCount++;
  });
  onUnmounted(()=>{
    opener.mbfViewerCount--;
  })
    emitter.on('mbf-image-selected',(img)=>{
        if(opener.mbfViewerCount>1 && props.listening || opener.mbfViewerCount==1){
            mbfURLSrc.value=img;
        }
    });


        // const getImageURLByID = async(_imageId)=>{
        //     let _biolucidaUrl = {};
        //     let _response ={};
        //     try{
        //         await Api.biolucida.getBLVLink(_imageId).then(response =>{
        //             _response = response;
        //             if(_response.status===200){
        //                 _biolucidaUrl = response;
        //                 mbfLink.value = response.data.link;
        //             }
        //         })
        //     }catch(e){
        //         console.error("couldn't get image url by id");
        //     }
        // }
   // getImageURLByID(21572);
</script>
<style scoped lang="scss">
@import './node_modules/sparc-design-system-components-2/src/assets/_variables.scss';
.bv-metadata{

    span{
        font-weight: bold;
    }
}
.hightlight{
        border:solid $lightPurple 2px !important;
    }
</style>