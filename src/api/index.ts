import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.API_URL,
});

axiosInstance.interceptors.request.use(
  config => {
    config.headers.Authorization = JSON.parse(localStorage.getItem('token'));
    return config;
  },
  error => Promise.reject(error)
);

export default axiosInstance;
