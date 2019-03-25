'use static';

const axios = require('axios');

class instance {
  constructor(baseURL) {
    this.axios = axios.create({
      baseURL: baseURL,
      timeout: 3000,
    });
  };
  
  get(url, params) {
    return this.axios.get(url, params);
  };
  
  delete(url, params) {
    return this.axios.delete(url, params);
  };
  
  head(url, params) {
    return this.axios.head(url, params);
  };
  
  post(url, params) {
    return this.axios.post(url, params);
  };
  
  put(url, params) {
    return this.axios.put(url, params);
  };
  
  patch(url, params) {
    return this.axios.patch(url, params);
  };
}

// export const api = new instance('https://kaede.nagato.top/');
export const api = new instance('https://localhost/');
