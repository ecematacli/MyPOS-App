import axios from 'axios'

import { VITE_API_URL } from 'constants/vite'

const axiosInstance = axios.create({
  baseURL: VITE_API_URL,
})

axiosInstance.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token')

    if (token) {
      config.headers.Authorization = JSON.parse(token)
    }

    return config
  },
  error => Promise.reject(error)
)

export const api = axiosInstance
