'use static';
import { api } from '../../util/axios.js';

export const apiFindOne = query => api.get(
  '/api/findOne',
  { params: query }
);

export const apiFind = query => api.get(
  '/api/find',
  { params: query }
);

export const apiCreate = body => api.post(
  '/api/create',
  body
);

export const apiChange = body => api.put(
  '/api/edit',
  body
);

export const apiDelete = query => api.delete(
  '/api/delete',
  { params: query }
);

// usoDataApi --------------------------------------------
export const dataFindOne = query => api.get(
  '/usoDataApi/findOne',
  { params: query }
);

export const dataFind = query => api.get(
  '/usoDataApi/find',
  { params: query }
);

export const dataCreate = body => api.post(
  '/usoDataApi/create',
  body
);

export const dataChange = body => api.put(
  '/usoDataApi/edit',
  body
);

export const dataDelete = query => api.delete(
  '/usoDataApi/delete',
  { params: query }
);
