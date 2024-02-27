<template>
    <div class="bv-metadata text-left p-1 text-sm">
        <p><span>Dataset: </span>
Mapping of dorsal root ganglia sensory nerve populations in the mouse lung </p>
        <p><span>Age: </span>4</p>
        <p><span>Sex: </span>Female</p>
    </div>
    <div class="bio-viewer h-screen flex justify-center">
        <iframe class="p-1 w-screen" src="https://sparc.biolucida.net/image?c=MjE1NzItY29sLTI0OA%3D%3D" ></iframe>
    </div>

</template>
<script setup>
  import { ref} from "vue";
  import biolucida from '@/services/biolucida'
  import {Dataset} from '../assets/Model';

  const props = defineProps({

        })

        const getImagesFromDataset = async (datasetId)=>{
            let _biolucidaImageData = {};
            let _response = {};

            try{
                await biolucida.searchDataset(datasetId).then(response =>{
                    _response = response;
                    console.log(response)
                })

              
                if (_response.status === 'success') {

                _biolucidaImageData = _response;

                }
            }catch(e){
                console.error("couldn't fetch images from dataset");
            }
        }

        const getImageURLByID = async(imageId)=>{
            let _biolucidaUrl = {};
            let _response ={};
                
            try{
                await biolucida.getImageURLByID(imageId).then(response =>{
                    _response = response;
                    if(_response.status==='sucess'){
                        _biolucidaUrl = response;
                    }
                })
            }catch(e){
                console.error("couldn't get image url by id");
            }
        }
   // getImageURLByID(16179);
</script>
<style scoped lang="scss">
.bv-metadata{

    span{
        font-weight: bold;
    }
}
</style>