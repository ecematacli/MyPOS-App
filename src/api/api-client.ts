import axios from 'axios'
import { VITE_API_URL } from 'constants/vite'

const token = localStorage.getItem('token') || ''

const axiosInstance = axios.create({
  baseURL: VITE_API_URL,
})

axiosInstance.interceptors.request.use(
  config => {
    config.headers.Authorization = JSON.parse(token)
    return config
  },
  error => Promise.reject(error)
)

export const api = axiosInstance
