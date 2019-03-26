'use static';
import { api } from '../../util/axios.js';

export const userLogin = body => api.post(
  '/user/login',
  body
);

export const userRegister = body => api.post(
  '/user/register',
  body
);

export const userChangePassword = body => api.put(
  '/user/changePassword',
  body
);

export const userDelete = body => api.put(
  '/user/userDelete',
  body
);