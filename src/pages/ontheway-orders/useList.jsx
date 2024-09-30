import { useState } from "react";
import dayjs from "dayjs";
import { DATE_FORMAT } from "@/constants/format";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Button, Space, Tag, notification, Modal } from "antd";
import { getOrdersOnTheWay } from "@/shared/modules/orders-on-the-way";
// import { LiaMoneyBillWaveAltSolid } from 'react-icons/lia';
import {
  // BsCreditCard,
  BsCheck2All,
} from "react-icons/bs";
import { NotifyText, Text } from "@/styles/global";
import { getStatus, tagStatus } from "@/utils/status";
import { STATUS } from "@/constants/status";
import { updateWorker } from "@/shared/modules/orders";
import { AiOutlineClose } from "react-icons/ai";
import { useForm } from "react-hook-form";
import {
  EyeFilled,
  SyncOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import { ROUTER } from "@/constants/router";
import { useLocation, useNavigate } from "react-router-dom";

export const useList = () => {
  const { confirm } = Modal;
  const form = useForm({
    defaultValues: {
      status: "ON_THE_WAY",
    },
  });
  const navigate = useNavigate();
  const [api, contextHolder] = notification.useNotification();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rowID, setRowID] = useState(null);
  const { search } = useLocation();
  const initial_params = new URLSearchParams(search);
  const [params, setParams] = useState({
    page: initial_params.has("page") ? Number(initial_params.get("page")) : 1,
    limit: initial_params.has("limit")
      ? Number(initial_params.get("limit"))
      : 10,
  });
  const {
    data: ordersOnTheWay = {
      count: 0,
      data: [],
    },
    isLoading,
    refetch,
  } = useQuery({
    queryKey: [
      "get-orders-on-the-way",
      params,
      form.watch("status"),
      form.watch("date"),
    ],
    queryFn: () =>
      getOrdersOnTheWay({
        params,
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
          limit: 10,
          page: 1,
        });
      }
    },
  });

  const updateMutate = useMutation((data) => updateWorker(data), {
    onSuccess: () => {
      api["success"]({
        message: "Success",
        description: "Buyurtma holati o`zgartirildi",
      });
      refetch();
      setIsModalOpen(false);
    },
  });

  const handleMutate = (id) => {
    confirm({
      title: "Buyurtmani yetkazildimi?",
      icon: <ExclamationCircleOutlined />,
      onOk() {
        const payload = {
          id: id,
          status: STATUS.DELIVERED,
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

  const cancelCourier = (id) => {
    setRowID(id);
    setIsModalOpen(true);
  };

  const handleOk = () => {
    let payload = {
      comment: form.watch("comment"),
      status: STATUS.CANCELLED_BY_DELIVER,
      id: rowID,
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
    // {
    //   title: 'To`lov turi',
    //   dataIndex: 'payment_type',
    //   key: 'payment_type',
    //   render: (payment_type) =>
    //     payment_type == 'CASH' ? (
    //       <LiaMoneyBillWaveAltSolid
    //         style={{ color: 'green', fontSize: '28px' }}
    //       />
    //     ) : (
    //       <BsCreditCard style={{ color: 'green', fontSize: '28px' }} />
    //     ),
    // },
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
      title: "Actions",
      dataIndex: "actions",
      key: "row",
      render: (id, row) => (
        <>
          {(ordersOnTheWay.data?.filter((v) => v?.id == row?.id) &&
            row?.status == STATUS.DELIVERED) ||
          row?.status == STATUS.CANCELLED_BY_DELIVER ? (
            <NotifyText
              className={
                row?.status == STATUS.DELIVERED ? "" : "canceled_by_deliver"
              }
            >
              {row?.status == STATUS.DELIVERED ? (
                <BsCheck2All />
              ) : (
                <AiOutlineClose />
              )}{" "}
              {row?.status == STATUS.DELIVERED
                ? "Yetkazib berildi"
                : "Kuryerdan qaytarildi"}
            </NotifyText>
          ) : (
            <Space wrap>
              <Button type="primary" onClick={() => handleMutate(row.id)}>
                Yetkazib berish
              </Button>
              <Button
                type="primary"
                onClick={() => cancelCourier(row.id)}
                danger
              >
                Ortga qaytarish
              </Button>
            </Space>
          )}
        </>
      ),
    },
  ];

  return {
    form,
    columns,
    data: ordersOnTheWay.data,
    isLoading,
    contextHolder,
    params,
    setParams,
    count: ordersOnTheWay.count,
    isModalOpen,
    handleCancel,
    handleOk,
    isFetching: updateMutate.isFetching,
  };
};
