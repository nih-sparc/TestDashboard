import axios from "axios";
const base = "https://api.scicrunch.io/elastic/v2/SPARC_SingleFile_pr/"

const CreateBaseApiService = () => {
    axios.create(
        {
            withCredentials: false,
            timeout: 30000
        }
    )
  return {
    getFileLevelData: (params,auth) => axios.post(`${base}_search`,{params}),
  };
};


export const fli = {
  ...CreateBaseApiService(),
};
