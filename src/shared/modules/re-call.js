import { request } from "../api/request";
import { ENDPOINTS } from "../endpoints";

export const reCall = (data) =>
  request(ENDPOINTS.ADMIN_ORDER_RE_CALL, {
    params: {
      page:
        data?.params?.page > 1 && data?.from_date && data?.to_date
          ? 1
          : data.params.page,
      limit: data?.params?.limit,
      from_date: data?.from_date,
      to_date: data?.to_date,
    },
  });
// request(
//   ENDPOINTS.ADMIN_ORDER_RE_CALL +
//     `?limit=${params?.limit}&page=${params?.page}`
// );

export const updateReCall = (id, data) =>
  request.put(`admin/order/${id}/update/re-call`, data);
