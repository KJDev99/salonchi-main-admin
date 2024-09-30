import { request } from "../api/request";
import { ENDPOINTS } from "../endpoints";

export const getAnalytics = (date) =>
  request(ENDPOINTS.ANALYTICS_GENERAL, {
    params: {
      from_date: date?.from_date,
      to_date: date?.to_date,
    },
  });

export const getPieChart = () => request(ENDPOINTS.PIE_CHART);

export const getGraphy = (date) =>
  request("admin/analytics/graph", {
    params: {
      from_date: date?.from_date,
      to_date: date?.to_date,
    },
  });
