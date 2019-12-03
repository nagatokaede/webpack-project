'use static';
import { api } from '../../util/axios.js';

export const informationStatisticsFindByPage = query => api.get(
  '/informationStatistics',
  { params: query }
);

export const informationStatisticsInsert = body => api.post(
  '/informationStatistics',
  body
);

export const informationStatisticsDelete = body => api.put(
  '/informationStatistics',
  body
);
