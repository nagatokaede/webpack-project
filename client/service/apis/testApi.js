'use static';
import { api } from '../../uitl/axios.js';

export const testGet = query => api.get(
  '/test/',
  { params: query }
);

export const testPost = body => api.post(
  '/test/',
  body
);