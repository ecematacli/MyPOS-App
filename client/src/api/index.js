import axios from 'axios';

let axiosInstance = axios.create({
  baseURL: 'http://stock-management-dev.eu-central-1.elasticbeanstalk.com'
});

axiosInstance.interceptors.request.use(
  config => {
    config.headers.Authorization = JSON.parse(localStorage.getItem('token'));
    return config;
  },
  error => Promise.reject(error)
);

export default axiosInstance;
