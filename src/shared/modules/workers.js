import { request } from '../api/request';
import { ENDPOINTS } from '../endpoints';

export const getWorkersList = (params) =>
  request(ENDPOINTS.ADMIN_WORKER_LIST + `?page=${params.page}`);