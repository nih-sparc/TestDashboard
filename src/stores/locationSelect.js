import { ref, inject } from 'vue'
import { defineStore } from 'pinia'
import { Api } from "../services";
import {useGlobalVarsStore} from "../stores/globalVars"
const GlobalVars = useGlobalVarsStore();

export const useLocationStore = defineStore('locationSelected', () => {
  const emitter = inject('emitter');

  //this was used to add this event listener to a component
    function init(){
      // emitter.on('FlatmapViewer-anatomicalLocationSelected',(location)=>{
      //   if(location && location.min && location.max){
      //     getRegionMinMax(location.min,location.max);
      //   }
      // });
    }

function getLocationFromMinMax(min,max){
  if(min && max){
    getRegionMinMax(min, max);
  }
}
//user has selected a location on the flatmap
//use coord system from 0-1 to call qdb for a list of instances of images within that range 
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

//send in instanceIds to get the package Ids associated with them. 
// call only takes 1 instance id at a time currently

const getPackageIds = async(instances)=>{
  let ImagesArray = [];
  for(var i=0;i<instances.length;i++){
      let _image_list = {};
      let _response = {};
      const instance = instances[i].inst || null;
      const dataset = instances[i].dataset || null;
      GlobalVars.datasetID = dataset;
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
  getMetadataForImages(ImagesArray)
}
//call for actual metadata you can use
const getMetadataForImages= async(images)=>{
  let withMetadata = {};
  let _response = {};
    try{


// WARNING: For GET requests, body is set to null by browsers.
var data = JSON.stringify({
  "track_total_hits": true,
  "query": {
    "terms": {
      "path_metadata.remote_id.keyword": [
        "package:e5934c93-244a-4e84-84ec-4a931a30f6a4",
        "package:cbfda02a-e982-40fb-b7cb-8bb5c70e24d6"
      ]
    }
  }
});

var xhr = new XMLHttpRequest();
xhr.withCredentials = false;

xhr.addEventListener("readystatechange", function() {
  if(this.readyState === 4) {
    console.log(this.responseText);
  }
});

xhr.open("POST", "https://api.scicrunch.io/elastic/v2/SPARC_SingleFile_pr/_search?apikey=LPsd27PyUmuXRcLO12BRDpLfoVABieAc");
xhr.setRequestHeader("Content-Type", "application/json");

xhr.send(data);

    //   const packageIdList = images.map(i=>i.pack)
    //   const auth =  {
    //     headers: {
    //       'apikey':"LPsd27PyUmuXRcLO12BRDpLfoVABieAc" //`${token}`
    //     }
    //   }
    //   const params = {
    //     headers: {
    //       'apikey':"LPsd27PyUmuXRcLO12BRDpLfoVABieAc" //`${token}`
    //     },
    //     "track_total_hits": true,
        
    //     "query": {
    
    //         "terms": {
    //             "path_metadata.remote_id.keyword": [ 
    //                 "package:aa653ec5-54dd-42d2-9b8e-43d63bf225c4",
    //                 "package:e5934c93-244a-4e84-84ec-4a931a30f6a4", "package:cbfda02a-e982-40fb-b7cb-8bb5c70e24d6"] 
    //         }
    //     }
    
    // };
    //   await Api.fli.getFileLevelData(params, auth).then(response =>{
    //       _response = response;
    //   })
    //   if (_response.status === 200) {
    //     withMetadata = _response.data.result;
    //   }
  }catch(e){
      console.error("couldn't get metadata from list of images from File Level Index");
      console.log(e)
  }

  GlobalVars.MBF_IMAGE_ARRAY = images;
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
  return { init, navigatorType, getLocationFromMinMax }
})
