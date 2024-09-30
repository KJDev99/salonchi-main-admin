import { request } from '../api/request';
import { ENDPOINTS } from '../endpoints';

export const getUserData = () => request(ENDPOINTS.GET_USER_DATA);
