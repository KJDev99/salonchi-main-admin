import { request } from "../api/request";
import { ENDPOINTS } from "../endpoints";

export const getProducts = (params) =>
  request(`admin/product/list?limit=10&page=${params.page}`);

export const createProducts = (data) =>
  request.post(ENDPOINTS.ADMIN_PRODUCT_CREATE, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

export const deleteProducts = (id) =>
  request.delete(`admin/product/${id}/delete`);

export const detailProduct = (id) => request(`admin/product/${id}/detail`);
export const updateProducts = (id, data) =>
  request.put(`admin/product/${id}/update`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

export const bodyPrice = (payload) =>
  request.post(`admin/product/body/price/${payload?.id}/update`, {
    body_price: payload?.body_price,
  });
