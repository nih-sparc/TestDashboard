import axios from "axios";
const base = "https://api.scicrunch.io/elastic/v2/SPARC_SingleFile_pr/"

const CreateBaseApiService = () => {
    axios.create(
        {
            withCredentials: true,
            timeout: 30000,
        }
    )

  return {
    getFileLevelData: (params, config) => axios.post(`${base}_search?apikey=LPsd27PyUmuXRcLO12BRDpLfoVABieAc`,params,config)
    //https://api.scicrunch.io/elastic/v2/SPARC_SingleFile_pr/_search?apikey=LPsd27PyUmuXRcLO12BRDpLfoVABieAc
  };
  
};


export const fli = {
  ...CreateBaseApiService(),
};
