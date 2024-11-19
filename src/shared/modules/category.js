import { request } from "../api/request";
import { ENDPOINTS } from "../endpoints";

export const createCategory = (data) =>
  request.post(ENDPOINTS.ADMIN_CATEGORY_CREATE, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

export const getCategory = (params) =>
  request(
    ENDPOINTS.ADMIN_CATEGORY_LIST + `?page=${params.page}&limit=${params.limit}`
  );
export const getSubCategory = (params) =>
  request(
    "admin/category/" +
      params.categoryId +
      "/sub" +
      `?page=${params.page}&limit=${params.limit}`
  );
export const getCategorySelect = () =>
  request(ENDPOINTS.ADMIN_CATEGORY_SELECT_LIST);
export const getCategorySelectProduct = () =>
  request(ENDPOINTS.ADMIN_CATEGORY_SELECT_LIST + `?product=true`);
// export const getColorsSelect = () => request(ENDPOINTS.ADMIN_COLOR_LIST);
export const deleteCategory = (id) =>
  request.delete(`admin/category/${id}/delete`);

export const detailCategory = (id) => request(`admin/category/${id}/detail`);

export const updateCategory = (id, data) =>
  request.put(`admin/category/${id}/update`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
