import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || 'https://rickandmortyapi.com/api',
  timeout: 15000,
});

export default api;