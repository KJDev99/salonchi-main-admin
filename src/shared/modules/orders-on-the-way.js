import { request } from '../api/request';
import { ENDPOINTS } from '../endpoints';

export const getOrdersOnTheWay = (data) =>
  request(ENDPOINTS.ADMIN_ORDER_ON_THE_WAY, {
    params: {
      page:
        data?.params?.page > 1 && data?.from_date && data?.to_date
          ? 1
          : data.params.page,
      limit: data?.params?.limit,
      from_date: data?.from_date,
      to_date: data?.to_date,
      status: data?.status,
    },
  });

export const updateStock = (data) =>
  request.put(`admin/order/${data?.id}/update/stock`, { status: data?.status });
