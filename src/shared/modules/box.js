import { request } from '../api/request';
import { ENDPOINTS } from '../endpoints';

export const boxList = (params) =>
  request(ENDPOINTS.ADMIN_BOX_LIST, {
    params: {
      page: params.page,
      limit: params.limit,
    },
  });

export const deleteBox = (id) => request.delete(`admin/box/${id}/delete`);

export const detailBox = (id) => request(`admin/box/${id}/detail`);

export const createBox = (data) =>
  request.post(ENDPOINTS.ADMIN_BOX_CREATE, data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

export const updateBox = (id, data) =>
  request.patch(`admin/box/${id}/update`, data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
