import axios from 'axios'
import { VITE_API_URL } from 'constants'

const axiosInstance = axios.create({
  baseURL: VITE_API_URL,
})

axiosInstance.interceptors.request.use(
  config => {
    config.headers.Authorization = JSON.parse(localStorage.getItem('token'))
    return config
  },
  error => Promise.reject(error)
)

export default axiosInstance
