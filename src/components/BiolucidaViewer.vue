<template>
    <div class="flex flex-col">
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
  import {ref, watch, inject} from "vue";
  import { Api } from "../services";
  import {Dataset} from '../assets/Model';

  const props = defineProps({
    imageID:0,
    mbfLink: {type:String}
  })

  const emitter = inject('emitter');
  let mbfURLSrc =ref(props.mbfLink);


    // watch(() => mbfLink.value, (newVal) => {
    //        console.log(mbfLink);
    // });

    emitter.on('mbf-image-selected',(img)=>{
        mbfURLSrc.value=img;
    });
        const getImageURLByID = async(_imageId)=>{
            let _biolucidaUrl = {};
            let _response ={};
            try{
                await Api.biolucida.getBLVLink(_imageId).then(response =>{
                    _response = response;
                    if(_response.status===200){
                        _biolucidaUrl = response;
                        mbfLink.value = response.data.link;
                    }
                })
            }catch(e){
                console.error("couldn't get image url by id");
            }
        }
   // getImageURLByID(21572);
</script>
<style scoped lang="scss">
.bv-metadata{

    span{
        font-weight: bold;
    }
}
</style>