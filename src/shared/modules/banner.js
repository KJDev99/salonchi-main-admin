import { request } from '../api/request';
import { ENDPOINTS } from '../endpoints';

export const createBanner = (data) =>
  request.post(ENDPOINTS.ADMIN_BANNER_CREATE, data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

export const getBannerList = (params) =>
  request(ENDPOINTS.ADMIN_BANNER_LIST + `?page=${params.page}`);
export const getCategorySelect = () =>
  request(ENDPOINTS.ADMIN_CATEGORY_SELECT_LIST);
export const getColorsSelect = () => request(ENDPOINTS.ADMIN_COLOR_LIST);
export const deleteBanner = (id) => request.delete(`admin/banner/${id}/delete`);

export const detailBanner = (id) => request(`admin/banner/${id}/detail`);

export const updateBanner = (id, data) =>
  request.patch(`admin/banner/${id}/update`, data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
