import { request } from "../api/request";
import { ENDPOINTS } from "../endpoints";

export const getExpenses = (params, dates) =>
  request(ENDPOINTS.EXPENSES, {
    params: {
      page: params?.page,
      limit: params?.limit,
      from_date: dates?.from_date,
      to_date: dates?.to_date,
    },
  });

export const createExpenses = (data) =>
  request.post(ENDPOINTS.CREATE_EXPENSES, data);

export const deleteExpenses = (id) =>
  request.delete(`${ENDPOINTS.DELETE_EXPENSES}/${id}`);
