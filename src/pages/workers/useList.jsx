import { useState } from "react";
import { DATE_FORMAT } from "@/constants/format";
import { REACT_QUERY_KEYS } from "@/constants/react-query-keys";
import { useMutation, useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import { Tag, notification, Modal } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import { getStatus, tagStatus } from "@/utils/status";
import { STATUS } from "@/constants/status";
import {
  SyncOutlined,
  ExclamationCircleOutlined,
  EyeFilled,
} from "@ant-design/icons";
import { ROUTER } from "@/constants/router";
import { getWorkersList } from "@/shared/modules/workers";

export const useList = () => {
  const { confirm } = Modal;
  const navigate = useNavigate();
  const [api, contextHolder] = notification.useNotification();
  const { search } = useLocation();
  const initial_params = new URLSearchParams(search);
  const [params, setParams] = useState({
    page: initial_params.has("page") ? Number(initial_params.get("page")) : 1,
    limit: initial_params.has("limit")
      ? Number(initial_params.get("limit"))
      : 10,
  });
  const {
    data: workerList = {
      count: 0,
      data: [],
    },
    isLoading,
  } = useQuery({
    queryKey: ["get-workers-list", params],
    queryFn: () => getWorkersList(params),
    select: (res) => {
      return {
        count: res?.data?.count,
        data: res?.data?.results,
      };
    },
  });

  const columns = [
    {
      title: "T/r",
      key: "1",
      render: (id, record, index) => (
        <p>{(params.page - 1) * params.limit + index + 1}</p>
      ),
    },
    // {
    //   title: "Buyurtma ID si",
    //   key: "2",
    //   render: (row) => <p>{row?.id}</p>,
    // },
    {
      title: "Ishchi",
      dataIndex: "firstname",
      key: "firstname",
    },
    {
      title: "Sotuv",
      key: "3",
      dataIndex: 'order',
      render: (order) => <p>{order?.count} ta</p>,
    },
    // {
    //   title: 'Yaratilgan vaqti',
    //   dataIndex: 'created_at',
    //   key: 'created_at',
    //   render: (created_at) => (
    //     <p style={{ margin: '0' }}>{dayjs(created_at).format(DATE_FORMAT)}</p>
    //   ),
    // },
  ];

  return {
    columns,
    data: workerList.data,
    isLoading,
    contextHolder,
    count: workerList.count,
    params,
    setParams,
  };
};
