import { ref, inject } from 'vue'
import { defineStore } from 'pinia'
import { Api } from "../services";


export const useLocationStore = defineStore('locationSelected', () => {
  const emitter = inject('emitter');
    function init(){

      emitter.on('FlatmapViewer-anatomicalLocationSelected',(location)=>{
        if(location && location.min && location.max){
          getRegionMinMax(location.min,location.max);
        }
      });
    }

//call for min/max
const getRegionMinMax = async(min, max, subject)=>{
    subject = "sub-f001";
    let _instance_list = {};
    let _response = {};
    try{
        await Api.qdb.getLocationMinMax(min,max,subject).then(response =>{
            _response = response;
        })
        if (_response.status === 200) {
          _instance_list = _response.data.result;
          handleMinMaxRequest(_instance_list);
        }
    }catch(e){
        console.error("couldn't get min max region "+subject+" from QDB /n min: "+min +" max: "+ max);
        console.log(e)
    }
}
function handleMinMaxRequest(results){
    const instances =results.filter(y => y.agg_type ==="instance");
    getPackageIds(instances)
}

//call for min/max

const getPackageIds = async(instances)=>{
  let ImagesArray = [];
  for(var i=0;i<instances.length;i++){
      let _image_list = {};
      let _response = {};
      const instance = instances[i].inst || null;
      const dataset = instances[i].dataset || null;
      try{
          await Api.qdb.getImagesByInstance(dataset,instance).then(response =>{
              _response = response;
          })
          if (_response.status === 200) {
            _image_list = _response.data.result;
            ImagesArray = [...ImagesArray, ..._image_list]
          }
      }catch(e){
          console.error("couldn't get images from instance "+instance+" and dataset "+dataset+" from QDB");
          console.log(e)
    }
  }
  ImagesArray = ImagesArray.filter(x=>x.id_type!=="quantdb"&& x.id);
  emitter.emit('locationSelect-MBFImageArrayUpdate',ImagesArray);
}
//https://services.scicrunch.io/quantdb/api/1/values/quant?aspect=distance-via-reva-ft-sample-id-normalized-v1&subject=sub-f001&value-quant-min=0.0&value-quant-max=0.1

// call for each dataset and instance/segment
//https://services.scicrunch.io/quantdb/api/1/objects?dataset=aa43eda8-b29a-4c25-9840-ecbd57598afc&inst=sam-c-seg-15c
//check for unique inst and dataset... and later clarify what the min/max ones are

//if you get all of those then you will have a package id for each one that is associated with one jpg2000 (hopefully)
//user clicks on image
//that's when you need this call to get an image
//https://sparc.biolucida.net/api/v1/imagemap/sharelink/N:package:ad977506-77bf-4f3b-93b3-41f6426c0b44/268
//package id and dataset id... but need to clarify dataset id. 
//then you get biolucida image path... uhg. 

  const componentList = ref([""]);
  const navigatorType = ref("LocationNav");//default 
  return { init, navigatorType }
})
