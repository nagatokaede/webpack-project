'use static';
import { api } from '../../uitl/axios.js';

export const leaveMessageFindByPage = query => api.get(
  '/leaveMessage/',
  { params: query }
);

export const leaveMessageInsert = body => api.post(
  '/leaveMessage/',
  body
);

export const leaveMessageDelete = body => api.put(
  '/leaveMessage/',
  body
);