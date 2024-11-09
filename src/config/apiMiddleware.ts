import axios from 'axios';

const apiMiddleware = axios.create({
  baseURL: process.env.REACT_APP_MIDDLEWARE_API_BASE_URL || 'http://localhost:3001/',
  timeout: 15000,
});

export default apiMiddleware;