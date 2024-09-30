import { request } from '../api/request';
import { ENDPOINTS } from '../endpoints';

export const getOrganizations = () => request(ENDPOINTS.READ_ORGANIZATIONS);
