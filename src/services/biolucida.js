import axios from "axios";
const base = 'https://sparc-api.herokuapp.com/'

const CreateBaseApiService = (resource) => {
  return {
    // Get a list of resources
    searchDataset: (id) => axios.get(`${base}image_search/${id}`),
    // Get a single resource by its id
    getBLVLink: (id) => axios.get(`${base}image_blv_link/${id}`),
    // Create a new resource
    //create: (payload) => axios.post(`${base}/${resource}`, payload),
    // Replace an existing resource with payload
    //update: (id, payload) => axios.put(`${base}/${resource}/${id}`, payload),
  };
};


export const biolucida = {
  ...CreateBaseApiService("users"),
  //custom: axios.get(`${base}/some/custom/route`, config),
};

const searchDataset = async (id) => {
    const { $portalApiClient } = useNuxtApp()
    const response = await $portalApiClient.get('image_search/' + id)
    return response.data
  }
  const getBLVLink = async (id) => {
    const { $portalApiClient } = useNuxtApp()
    const response = await $portalApiClient.get('image_blv_link/' + id)
    return response.data
  }
  const getXMPInfo = async (id) => {
    const { $portalApiClient } = useNuxtApp()
    const response = await $portalApiClient.get('image_xmp_info/' + id)
    return response.data
  }
  
  const getThumbnail = async (id) => {
    const { $portalApiClient } = useNuxtApp()
    return $portalApiClient.get('thumbnail/' + id)
  }
  
  const getNeurolucidaThumbnail = async (id, version, path) => {
    const { $portalApiClient } = useNuxtApp()
    const config = {
      params: {
        datasetId: id,
        version,
        path: `files/${path}`
      }
    }
    const response = await $portalApiClient.get('thumbnail/neurolucida', config)
    return response.data
  }
  
  const getImageInfo = async (id) => {
    const { $portalApiClient } = useNuxtApp()
    const response = await $portalApiClient.get('image/' + id)
    return response.data
  }
  
  const getCollectionInfo = async (id) => {
    const { $portalApiClient } = useNuxtApp()
    return $portalApiClient.get('collections/' + id)
  }
  

  
  const fetchNeurolucida360Url = (payload) => {
    const { $mbfSparcApiClient } = useNuxtApp()
    return $mbfSparcApiClient.post('', payload)
  }
  
  const decodeViewParameter = encodedView => {
    const urlDecodedView = decodeURIComponent(encodedView)
    const decodedString = atob(urlDecodedView);
    const decodedView = decodedString.toString('utf-8')
    return decodedView.split('-')
  }
  
  export default {
    decodeViewParameter,
    fetchNeurolucida360Url,
    getBLVLink,
    getThumbnail,
    getNeurolucidaThumbnail,
    searchDataset,
    getImageInfo,
    getCollectionInfo,
    getXMPInfo
  }