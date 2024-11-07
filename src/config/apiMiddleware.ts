import axios from 'axios';

const apiMiddleware = axios.create({
  baseURL: 'http://192.168.100.55:3001/',
  timeout: 15000,
});

export default apiMiddleware;