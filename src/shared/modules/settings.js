import { request } from "../api/request";

export const getUserName = (id) => request(`admin/worker/detail`);

export const updateUserName = (data) =>
  request.patch(`admin/worker/detail`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
export const updatePassword = (data) =>
  request.patch(`admin/worker/change-password`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
