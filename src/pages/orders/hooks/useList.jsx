import { DATE_FORMAT } from "@/constants/format";
import { REACT_QUERY_KEYS } from "@/constants/react-query-keys";
import { ROUTER } from "@/constants/router";
import { STATUS } from "@/constants/status";
import { getOrders, updateWorker } from "@/shared/modules/orders";
import { NotifyText, Text } from "@/styles/global";
import { getStatus, tagStatus } from "@/utils/status";
import { EyeFilled, SyncOutlined } from "@ant-design/icons";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Button, Space, Tag, notification } from "antd";
import dayjs from "dayjs";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { BsCheck2All } from "react-icons/bs";
import { AiOutlineClose } from "react-icons/ai";
import { NumberFormat } from "@/components/number-format";
import { Modal } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";

export const useList = () => {
  const { confirm } = Modal;
  const [api, contextHolder] = notification.useNotification();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isnotDeliveryOpen, setIsOpen] = useState(false);
  const [isreCallOpen, setIsReCallOpen] = useState(false);
  const [rowId, setRowId] = useState(null);
  const navigate = useNavigate();
  const { search } = useLocation();
  const initial_params = new URLSearchParams(search);
  const [params, setParams] = useState({
    page: initial_params.has("page") ? Number(initial_params.get("page")) : 1,
    limit: initial_params.has("limit")
      ? Number(initial_params.get("limit"))
      : 20,
  });
  const form = useForm();
  const {
    data: orders = {
      count: 0,
      data: [],
    },
    isLoading,
    refetch,
  } = useQuery({
    queryKey: [
      REACT_QUERY_KEYS.GET_ORDERS,
      params,
      form.watch("status"),
      form.watch("date"),
    ],
    queryFn: () =>
      getOrders({
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

  const updateMutate = useMutation(
    (data) => updateWorker({ id: rowId, ...data }),
    {
      onSuccess: () => {
        refetch();
        setIsModalOpen(false);
        setIsOpen(false);
        setIsReCallOpen(false);
        api["success"]({
          message: "Success",
          description: "Buyurtma holati o'zgartirildi",
        });
      },

      onError: (error) => {
        api["error"]({
          message: "Error",
          description: error?.response?.data?.detail || "Something went wrong!",
        });
      },
    }
  );

  const acceptOrder = (id) => {
    confirm({
      title: "Buyurtmani qabul chiqmoqchimisiz?",
      icon: <ExclamationCircleOutlined />,
      onOk() {
        setRowId(id);
        let payload = {
          status: STATUS.ACCEPTED,
        };
        updateMutate.mutate(payload);
      },
      okText: "Ha",
      cancelText: "Bekor qilish",
    });
  };

  const handleOk = () => {
    let payload = {
      comment: form.watch("comment"),
      status: STATUS.CANCELLED,
    };
    updateMutate.mutate(payload);
  };

  const handleDeliveryOk = () => {
    let payload = {
      comment: form.watch("comment"),
      status: STATUS.CANCELLED_BY_DELIVER,
    };
    updateMutate.mutate(payload);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handleDeliveryCancel = () => {
    setIsOpen(false);
  };

  const cancelOrder = (id) => {
    setRowId(id);
    setIsModalOpen(true);
  };

  const handleDelivery = (id) => {
    setRowId(id);
    let payload = {
      status: STATUS.DELIVERED,
    };
    updateMutate.mutate(payload);
  };

  const cancelFromCourier = (id) => {
    setRowId(id);
    setIsOpen(true);
  };

  const reCall = (id) => {
    setRowId(id);
    setIsReCallOpen(true);
  };

  const handleReCallOk = () => {
    let payload = {
      comment: form.watch("comment"),
      status: STATUS.RE_CALL,
    };
    updateMutate.mutate(payload);
  };

  const handleReCallCancel = () => {
    setIsReCallOpen(false);
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
      render: (row) => (
        <a href={`tel:${row.phone}`}>
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/d/d5/Phone_Shiny_Icon.svg"
            width={22}
            alt="message-icon"
          />
          {row?.phone}
        </a>
      ),
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
      render: (amount) => (
        <p style={{ margin: "0" }}>
          <NumberFormat value={amount} /> so`m
        </p>
      ),
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
      render: (comment) => (
        <Text>{comment !== "" ? comment : "Izoh yo'q"}</Text>
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
        </Space>
      ),
    },
    {
      title: "Harakatlar",
      key: "row",
      render: (row) => (
        <>
          {(orders.data?.filter((v) => v.id == row?.id) &&
            row?.status === STATUS.CANCELLED) ||
          row?.status === STATUS.ACCEPTED ||
          row?.status === STATUS.DELIVERED ||
          row?.status === STATUS.CANCELLED_BY_DELIVER ? (
            <NotifyText
              className={
                row?.status == STATUS.DELIVERED ||
                row?.status == STATUS.ACCEPTED
                  ? ""
                  : "canceled_by_deliver"
              }
            >
              {row?.status === STATUS.CANCELLED ||
              row?.status === STATUS.CANCELLED_BY_DELIVER ? (
                <AiOutlineClose />
              ) : (
                <BsCheck2All />
              )}
              {getStatus(row?.status)?.label}
            </NotifyText>
          ) : orders?.data?.filter((v) => v?.id == row?.id) &&
            row.status == STATUS.ON_THE_WAY ? (
            <Space wrap>
              <Button type="primary" onClick={() => handleDelivery(row?.id)}>
                Yetkazib berish
              </Button>
              <Button
                type="primary"
                danger
                onClick={() => cancelFromCourier(row?.id)}
              >
                Ortga qaytarish
              </Button>
            </Space>
          ) : (
            <Space direction="vertical">
              <Button
                type="primary"
                onClick={() => acceptOrder(row?.id)}
                style={{ width: "120px" }}
              >
                Qabul qilish
              </Button>
              <Button
                type="primary"
                danger
                onClick={() => cancelOrder(row?.id)}
                style={{ width: "120px" }}
              >
                Rad etish
              </Button>
              <Button
                value="default"
                danger
                onClick={() => reCall(row?.id)}
                style={{ width: "120px" }}
              >
                Qayta aloqa
              </Button>
            </Space>
          )}
        </>
      ),
    },
  ];

  return {
    columns,
    data: orders.data,
    isLoading,
    form,
    isModalOpen,
    params,
    setParams,
    handleOk,
    handleCancel,
    contextHolder,
    count: orders.count,
    isFetching: updateMutate.isLoading,
    isnotDeliveryOpen,
    handleDeliveryOk,
    handleDeliveryCancel,
    isreCallOpen,
    handleReCallOk,
    handleReCallCancel,
  };
};
