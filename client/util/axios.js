'use static';

const axios = require('axios');

class instance {
  constructor(baseURL) {
    this.axios = axios.create({
      baseURL: baseURL,
      timeout: 3000,
    });
  };

  get(url, config) {
    return this.axios.get(url, config);
  };

  delete(url, config) {
    return this.axios.delete(url, config);
  };

  post(url, data, config) {
    return this.axios.post(url, data, config);
  };

  put(url, data, config) {
    return this.axios.put(url, data, config);
  };
}

export const api = new instance('api-getaway');
