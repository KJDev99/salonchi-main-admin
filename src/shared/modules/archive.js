import { request } from "../api/request";
import { ENDPOINTS } from "../endpoints";

export const archive = (data) =>
  request(ENDPOINTS.ADMIN_ORDER_ARCHIVE, {
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
