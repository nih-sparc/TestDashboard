import axios from "axios";
const base = "https://services.scicrunch.io/quantdb/api/1/"

const CreateBaseApiService = () => {
  return {
    // Get a list of classes qdb contains
    getClasses: () => axios.get(`${base}classes`),
    getAspectsFromMetric: (metric) => axios.get(`${base}aspects?desc-inst=${metric}`),
    getDataByAspect: (metric, aspect)=> axios.get(`${base}values/quant?aspect=${aspect}&desc-inst=${metric}`),
    getLocationMinMax:(min, max, subject)=>axios.get(`${base}values/quant?aspect=distance-via-reva-ft-sample-id-normalized-v1&subject=${subject}&value-quant-min=${min}&value-quant-max=${max}`),
    getImagesByInstance:(dataset,instance)=>axios.get(`${base}objects?dataset=${dataset}&inst=${instance}`)
  };
};


export const qdb = {
  ...CreateBaseApiService(),
};

// const getClasses = async () => {
//     const { $portalApiClient } = useNuxtApp()
//     const response = await $portalApiClient.get(`${base}classes/`)
//     return response.data
//   }
// export default{
//     getClasses
// }