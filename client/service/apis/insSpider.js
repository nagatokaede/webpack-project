'use static';
import { api } from '../../util/axios.js';

export const getInstagramSpider = body => api.post(
  '/instagramSpider',
  body
);
