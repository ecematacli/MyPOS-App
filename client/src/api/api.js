import axios from 'axios';

export default axios.create({
  baseURL: 'http://localhost:3091',
  headers: {
    Authorization: JSON.parse(localStorage.getItem('token'))
  }
});
