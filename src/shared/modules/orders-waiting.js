import { request } from "../api/request";
import { ENDPOINTS } from "../endpoints";

export const getOrdersWaiting = (params) =>
  request(ENDPOINTS.ADMIN_ORDER_WAITING, {
    params: {
      page: params?.page,
      limit: params?.limit,
    },
  });

export const updateOrderWaiting = (id) =>
  request.post(`admin/order/${id}/update/waiting?status=NEW`);
