<template>
    <div class="bv-metadata text-left p-1 text-sm">
        <p><span>Dataset: </span>
Dataset Name Here </p>
        <p><span>Metadata: </span>Metadata could go here</p>
    </div>
    <div class="bio-viewer h-screen flex justify-center">
        <iframe class="p-1 w-screen" :src="props.mbfLink" ></iframe>
    </div>

</template>
<script setup>
  import {ref, watch} from "vue";
  import { Api } from "../services";
  import {Dataset} from '../assets/Model';

  let mbfLink =ref("");
  const props = defineProps({
    imageID:0,
    mbfLink: {type:String}
  })
    // watch(() => mbfLink.value, (newVal) => {
    //        console.log(mbfLink);
    // });


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