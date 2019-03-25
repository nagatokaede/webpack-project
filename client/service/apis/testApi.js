'use static';
import { api } from '../../util/axios.js';

export const testGet = query => api.get(
  '/test/',
  { params: query }
);

export const testPost = body => api.post(
  '/test/',
  body
);