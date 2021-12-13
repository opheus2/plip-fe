import axios from 'axios'

export default function Http() {
   const http = axios.create({
      baseURL: `${process.env.NEXT_PUBLIC_BASE_API_URL}`,
      withCredentials: true,
   })

   http.interceptors.request.use(function (config) {
      const getToken = localStorage.getItem('recoil-persist') ?? ''
      const token = getToken ? JSON.parse(getToken)['plip.userToken'] : ''

      config.headers.Authorization = token ? `Bearer ${token}` : ''
      return config
   })

   http.interceptors.response.use(
      (response) => response,
      (error) => {
         if (error.response) {
            if (error.response.status === 401) {
               window.location.assign('/login')
            }
         }
         console.log(error)

         return Promise.reject(error)
      }
   )
   return http
}
