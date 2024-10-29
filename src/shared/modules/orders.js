import { request } from "../api/request";
import { ENDPOINTS } from "../endpoints";

export const getOrders = (data) =>
  request(ENDPOINTS.ADMIN_ORDER, {
    params: {
      limit: 20,
      page:
        data?.params?.page > 1 && data?.from_date && data?.to_date
          ? 1
          : data.params.page,
      from_date: data?.from_date,
      to_date: data?.to_date,
      status: data?.status,
    },
  });

export const orderDetails = (id) => request(`admin/order/${id}/detail`);

export const orderAccepted = (params) =>
  request(ENDPOINTS.ADMIN_ORDER_ACCEPTED, {
    params: {
      limit: 20,
      page: params?.page,
    },
  });

export const updateWorker = (data) =>
  request.put(`admin/order/${data?.id}/update/worker`, {
    status: data?.status,
    comment: data?.comment,
  });
