import { request } from "../api/request";
import { ENDPOINTS } from "../endpoints";

export const getRoles = (params) =>
  request(ENDPOINTS.ADMIN_ROLE_LIST + `?page=${params.page}`);

export const createEmployee = (data) =>
  request.post(ENDPOINTS.ADMIN_ROLE_CREATE, data);

export const deleteEmployee = (id) =>
  request.delete(ENDPOINTS.ADMIN_ROLE_DELETE + id);

export const updateForEmployee = (id) => request(`admin/role/detail/${id}`);

export const updateEmployee = (id, data) =>
  request.patch(`admin/role/update/${id}`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
