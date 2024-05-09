import axios from "axios";
export default qdbPlugin(() => {
  const config = useRuntimeConfig()
  const apiClient = axios.create({
    baseURL: config.public.portal_api, ///change to qdb stuff
    withCredentials: false,
    timeout: 30000
  })
  return {
    provide: {
      portalApiClient: apiClient
    },
  }
})