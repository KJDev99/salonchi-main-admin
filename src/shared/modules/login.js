import { request } from '../api/request';
import { ENDPOINTS } from '../endpoints';

export const login = (data) => request.post(ENDPOINTS.ADMIN_LOGIN, data);
export const getUrl = () => request(ENDPOINTS.ONEID_GET_URL);
