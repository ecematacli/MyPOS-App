import axios from 'axios';

export default axios.create({
  baseURL: 'http://localhost:3091',
  headers: {
    Authorization: JSON.parse(localStorage.getItem('token'))
  }
});

// 'http://stockmanagementservicedev.pkupag2y6m.eu-central-1.elasticbeanstalk.com/',
