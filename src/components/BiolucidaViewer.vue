<template>
          
    <slot :widgetName="widgetName"></slot>
    
    <div class="tw-flex tw-flex-col tw-h-full">
        <div class="bv-metadata tw-text-left tw-p-1 tw-text-sm">
            <p><span>Dataset: </span>
    Dataset Name Here </p>
            <p><span>Metadata: </span>Metadata could go here</p>
        </div>
        <div class="tw-h-screen tw-flex tw-justify-center">
            <iframe class="tw-p-1 tw-w-screen" :src="mbfURLSrc" ></iframe>
        </div>
    </div>
</template>
<script setup>
  import {ref, onMounted, onUnmounted, inject} from "vue";
  import { Api } from "../services";
  import {Dataset} from '../assets/Model';
  import { useOpenerStore } from "../stores/opener";

  const widgetName = ref('MBF Image Viewer');
  const emit = defineEmits(['selectWidget']);

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
    padding-left:10px;
    span{
        font-weight: bold;
    }
}
.hightlight{
        border:solid $lightPurple 2px !important;
    }
    iframe{padding:0; border:none;}
</style>