import axios from 'axios';

const http = axios.create({
  baseURL: 'https://api.intern.d-tt.nl/api/'
});

http.defaults.headers.common['X-API-Key'] = 'PWEjgcuTChF4dKV1sa2MAiG-Bpvf9kHq';

export default http;