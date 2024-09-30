import { request } from "../api/request";
import { ENDPOINTS } from "../endpoints";

export const getCustomers = (params) =>
  request(ENDPOINTS.CUSTOMER_LIST, {
    params: {
      page: params?.page,
      limit: params?.limit,
    },
  });
