import axios from "axios";
const base = "https://services.scicrunch.io/quantdb/api/1/"

const CreateBaseApiService = () => {
  return {
    // Get a list of classes qdb contains
    getClasses: () => axios.get(`${base}classes`),
    getAspectsFromMetric: (metric) => axios.get(`${base}aspects?desc-inst=${metric}`),
    getDataByAspect: (metric, aspect)=> axios.get(`${base}values/quant?aspect=${aspect}&desc-inst=${metric}`)
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