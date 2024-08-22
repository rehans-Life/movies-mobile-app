import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://wbq205ob16.execute-api.us-east-1.amazonaws.com/dev/v1',
});

export default instance;
