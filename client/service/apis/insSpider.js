'use static';
import { api } from '../../uitl/axios.js';

export const getInstagramSpider = body => api.post(
  '/instagramSpider/',
  body
);
