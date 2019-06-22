'use static';
import { api } from '../../util/axios.js';

export const upFile = file => {
  // 创建form对象
  const param = new FormData();
  // 通过append向form对象添加数据
  param.append('file', file);

  return new Promise((resolve, reject) => {
    api.post(
      '/upload',
      param
    ).then(res => {
      resolve(res);
    }).catch(err => {
      reject(err);
    });
  });
};
