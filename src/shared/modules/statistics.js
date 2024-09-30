import { request } from '../api/request';
import { ENDPOINTS } from '../endpoints';

export const getSuperUserStatistics = () =>
  request(ENDPOINTS.ADMIN_SUPERUSER_STATISTICS);
export const getWorkerStatistics = () =>
  request(ENDPOINTS.ADMIN_WORKER_STATISTICS);
