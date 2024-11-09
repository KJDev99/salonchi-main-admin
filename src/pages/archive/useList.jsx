import { DATE_FORMAT } from "@/constants/format";
import { archive, deleteOrderWaiting } from "@/shared/modules/archive";
import { Text } from "@/styles/global";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import dayjs from "dayjs";
import { getStatus, tagStatus } from "@/utils/status";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Modal, notification, Space, Tag } from "antd";
import { STATUS } from "@/constants/status";
import {
  DeleteFilled,
  ExclamationCircleOutlined,
  EyeFilled,
  SyncOutlined,
} from "@ant-design/icons";
import { useLocation, useNavigate } from "react-router-dom";
import { ROUTER } from "@/constants/router";
// import { REACT_QUERY_KEYS } from "@/constants/react-query-keys";

export const useList = () => {
  const form = useForm();
  const navigate = useNavigate();
  const { search } = useLocation();
  const initial_params = new URLSearchParams(search);
  const [api, contextHolder] = notification.useNotification();
  const { confirm } = Modal;
  const queryClient = useQueryClient();
  const [params, setParams] = useState({
    page: initial_params.has("page") ? Number(initial_params.get("page")) : 1,
    limit: initial_params.has("limit")
      ? Number(initial_params.get("limit"))
      : 20,
  });
  const {
    data: archives = {
      count: 0,
      data: [],
    },
    isLoading,
  } = useQuery({
    queryKey: ["get-archive", params, form.watch("status"), form.watch("date")],
    queryFn: () =>
      archive({
        params: params,
        status: form.watch("status"),
        from_date:
          form.watch("date") == undefined
            ? null
            : dayjs(form.watch("date")[0]).format("YYYY-MM-DD"),
        to_date:
          form.watch("date") == undefined
            ? null
            : dayjs(form.watch("date")[1]).format("YYYY-MM-DD"),
      }),
    select: (res) => {
      return {
        count: res?.data?.count,
        data: res?.data?.results,
      };
    },
    onSuccess: () => {
      if (params?.page > 1 && form.watch("date")) {
        setParams({
          limit: 20,
          page: 1,
        });
      }
    },
  });
  const deleteMutate = useMutation((data) => deleteOrderWaiting(data), {
    onSuccess: () => {
      api["success"]({
        message: "Success",
        description: "Buyurtma muvoffaqiyatli o`chirildi",
      });
      queryClient.invalidateQueries(["get-archive"]);
    },
    onError: (err) => {
      api["error"]({
        message: "Error",
        description:
          err?.response?.data?.detail || "Nimadur xatolik yuz berdi!",
      });
    },
  });
  const handleDelete = (id) => {
    confirm({
      title: "Buyurtmani o`chirmoqchimisiz?",
      icon: <ExclamationCircleOutlined />,
      onOk() {
        deleteMutate.mutate(id);
      },
      okText: "Ha",
      cancelText: "Bekor qilish",

      // onCancel() {
      //   console.log("Cancel");
      // },
    });
    // deleteMutate.mutate(id);
  };
  const columns = [
    {
      title: "T/r",
      key: "row",
      render: (id, record, index) => (
        <p>{(params.page - 1) * params.limit + index + 1}</p>
      ),
    },
    {
      title: "Buyurtma ID si",
      key: "row",
      render: (row) => <p>{row?.id}</p>,
    },
    {
      title: "Telefon raqami",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Statusi",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag
          icon={status == STATUS.ON_THE_WAY && <SyncOutlined spin />}
          color={tagStatus(status)}
          bordered={false}
        >
          {getStatus(status)?.label}
        </Tag>
      ),
    },
    {
      title: "Umumiy summa",
      dataIndex: "amount",
      key: "amount",
      render: (amount) => <p style={{ margin: "0" }}>{amount} so`m</p>,
    },
    {
      title: "Yaratilgan vaqti",
      dataIndex: "created_at",
      key: "created_at",
      render: (created_at) => (
        <p style={{ margin: "0" }}>{dayjs(created_at).format(DATE_FORMAT)}</p>
      ),
    },
    {
      title: "Ko`rish",
      key: "row",
      render: (row) => (
        <Space>
          <Button
            type="primary"
            ghost
            onClick={() => navigate(`${ROUTER.DETAIL}/${row.id}`)}
          >
            <EyeFilled />
          </Button>
          <Space>
            <Button
              type="primary"
              className="delete-btn"
              style={{ color: "red", borderColor: "red" }}
              ghost
              onClick={() => {
                handleDelete(row.id);
              }}
            >
              <DeleteFilled />
            </Button>
          </Space>
        </Space>
      ),
    },
    {
      title: "Izoh",
      dataIndex: "comment",
      key: "comment",
      render: (comment) => <Text>{comment}</Text>,
    },
  ];

  return {
    form,
    isLoading,
    data: archives.data,
    columns,
    params,
    setParams,
    count: archives.count,
    contextHolder,
  };
};
