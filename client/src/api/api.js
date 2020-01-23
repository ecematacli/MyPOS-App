import axios from 'axios';

export default axios.create({
  baseURL:
    'http://stockmanagementservicedev.pkupag2y6m.eu-central-1.elasticbeanstalk.com/',
  headers: {
    Authorization: JSON.parse(localStorage.getItem('token'))
  }
});
