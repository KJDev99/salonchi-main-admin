import { getStatus, tagStatus } from "@/utils/status";
import { Button, Space, Tag, notification, Modal } from "antd";
import dayjs from "dayjs";
import { DATE_FORMAT } from "@/constants/format";
import { useMutation, useQuery } from "@tanstack/react-query";
import { reCall, updateReCall } from "@/shared/modules/re-call";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { STATUS } from "@/constants/status";
import {
  EyeFilled,
  SyncOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import { ROUTER } from "@/constants/router";
import { useLocation, useNavigate } from "react-router-dom";

export const useList = () => {
  const { confirm } = Modal;
  const form = useForm();
  const navigate = useNavigate();
  const [rowid, setRowid] = useState(null);
  const { search } = useLocation();
  const initial_params = new URLSearchParams(search);
  const [params, setParams] = useState({
    page: initial_params.has("page") ? Number(initial_params.get("page")) : 1,
    limit: initial_params.has("limit")
      ? Number(initial_params.get("limit"))
      : 20,
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [api, contextHolder] = notification.useNotification();

  const {
    data: recall = {
      count: 0,
      data: [],
    },
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["get-re-call-order-list", params, form.watch("date")],
    queryFn: () =>
      reCall({
        params,
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
  });

  const updateMutate = useMutation((data) => updateReCall(rowid, data), {
    onSuccess: () => {
      refetch();
      api["success"]({
        message: "Success",
        description: "Buyurtma holati o'zgartirildi",
      });
      setIsModalOpen(false);
    },
    onError: (error) => {
      api["error"]({
        message: "Error",
        description: error?.response?.data?.detail || "Something went wrong!",
      });
    },
  });

  const accept = (id) => {
    confirm({
      title: "Buyurtmani qabul chiqmoqchimisiz?",
      icon: <ExclamationCircleOutlined />,
      onOk() {
        setRowid(id);
        let payload = {
          status: STATUS.ACCEPTED,
        };
        updateMutate.mutate(payload);
      },
      okText: "Ha",
      cancelText: "Bekor qilish",

      // onCancel() {
      //   console.log("Cancel");
      // },
    });
  };

  const cancel = (id) => {
    setRowid(id);
    setIsModalOpen(true);
  };

  const handleOk = () => {
    let payload = {
      status: STATUS.CANCELLED,
      comment: form.watch("comment"),
    };
    updateMutate.mutate(payload);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
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
      title: "Izoh",
      dataIndex: "comment",
      key: "comment",
      render: (comment) => <p>{comment !== "" ? comment : "Izoh yo'q"}</p>,
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
        </Space>
      ),
    },
    {
      title: "Actions",
      key: "row",
      render: (row) => (
        <Space>
          <Button type="primary" onClick={() => accept(row?.id)}>
            Qabul qilish
          </Button>
          <Button type="primary" danger onClick={() => cancel(row?.id)}>
            Rad etish
          </Button>
        </Space>
      ),
    },
  ];

  return {
    form,
    columns,
    data: recall.data,
    count: recall.count,
    isLoading,
    params,
    setParams,
    isModalOpen,
    handleOk,
    handleCancel,
    contextHolder,
    isFetching: updateMutate.isFetching,
  };
};
