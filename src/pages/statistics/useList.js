import { REACT_QUERY_KEYS } from "@/constants/react-query-keys";
import {
  getAnalytics,
  getGraphy,
  getPieChart,
} from "@/shared/modules/analytics";
import {
  getSuperUserStatistics,
  getWorkerStatistics,
} from "@/shared/modules/statistics";
import { getUser } from "@/utils/user";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import { useForm } from "react-hook-form";

export const useList = () => {
  const form = useForm();
  const user = getUser();

  const dates = {
    from_date:
      form.watch("filter") == undefined
        ? null
        : dayjs(form.watch("filter")?.[0]).format("YYYY-MM-DD"),
    to_date:
      form.watch("filter") === undefined
        ? null
        : dayjs(form.watch("filter")?.[1]).format("YYYY-MM-DD"),
  };

  const { data: statistics = {}, isLoading } = useQuery({
    queryKey: [REACT_QUERY_KEYS.GET_STATISTICS],
    queryFn: user?.is_superuser ? getSuperUserStatistics : getWorkerStatistics,
    select: (res) => res.data,
  });
  const { data: analytics = null } = useQuery({
    queryKey: ["get-general-analytics", dates],
    queryFn: () => getAnalytics(dates),
    select: (res) => res?.data,
  });
  const {
    data: piechart = {
      series: [],
      labels: [],
    },
  } = useQuery({
    queryKey: ["get-piechart-analytics"],
    queryFn: getPieChart,
    select: (res) => {
      return {
        series: Object.values(res?.data),
        labels: Object.keys(res?.data),
      };
    },
  });

  const {
    data: graph = {
      data: [],
      categories: [],
    },
  } = useQuery({
    queryKey: ["get-analiticy-graph", dates],
    queryFn: () => getGraphy(dates),
    select: (res) => {
      return {
        data: Object.values(res?.data),
        categories: Object.keys(res?.data),
      };
    },
  });

  return {
    form,
    graph,
    piechart,
    statistics,
    isLoading,
    analytics,
  };
};
