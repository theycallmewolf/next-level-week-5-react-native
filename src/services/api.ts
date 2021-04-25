import axios from 'axios';

const api = axios.create({
  baseURL: 'http://192.168.1.217:3333',
  // use IP address instead of localhost
  // $ ipconfig getifaddr en0
});

export default api;