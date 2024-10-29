import { getStatus, tagStatus } from "@/utils/status";
import dayjs from "dayjs";
import { Text } from "@/styles/global";
import { DATE_FORMAT } from "@/constants/format";
import { useMutation, useQuery } from "@tanstack/react-query";
import { orderAccepted } from "@/shared/modules/orders";
import { LiaMoneyBillWaveAltSolid } from "react-icons/lia";
import { Button, Space, Tag, notification, Modal } from "antd";
import { STATUS } from "@/constants/status";
import { updateStock } from "@/shared/modules/orders-on-the-way";
import { useState } from "react";
import { ReactComponent as Nasiya } from "@/assets/nasiya.svg";
import {
  ExclamationCircleOutlined,
  EyeFilled,
  SyncOutlined,
} from "@ant-design/icons";
import { ROUTER } from "@/constants/router";
import { useLocation, useNavigate } from "react-router-dom";
import { BsCreditCard } from "react-icons/bs";

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
      : 20,
  });
  const {
    data: acceptedOrders = {
      count: 0,
      data: [],
    },
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["get-accepted-orders", params],
    queryFn: () => orderAccepted(params),
    select: (res) => {
      return {
        count: res?.data?.count,
        data: res?.data?.results,
      };
    },
  });

  const updateMutate = useMutation((data) => updateStock(data), {
    onSuccess: () => {
      refetch();
      api["success"]({
        message: "Success",
        description: "Buyurtma holati muvaffaqiyatli o`zgartirildi",
      });
    },
  });

  const handleMutate = (id) => {
    confirm({
      title: "Buyurtmani qabul chiqmoqchimisiz?",
      icon: <ExclamationCircleOutlined />,
      onOk() {
        const payload = {
          id: id,
          status: STATUS.ON_THE_WAY,
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
      title: "To`lov turi",
      dataIndex: "payment_type",
      key: "payment_type",
      render: (payment_type) => {
        if (payment_type == "CASH") {
          return (
            <LiaMoneyBillWaveAltSolid
              style={{ color: "green", fontSize: "28px" }}
            />
          );
        } else if (payment_type == "UZUM") {
          return <Nasiya style={{ width: "100px", height: "30px" }} />;
        } else if (payment_type == "CART") {
          return <BsCreditCard style={{ color: "green", fontSize: "28px" }} />;
        }
      },
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
            onClick={() => navigate(`${ROUTER.DETAIL}/${row?.id}`)}
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
        <Space wrap>
          <Button type="primary" onClick={() => handleMutate(row.id)}>
            Kuryerga chiqarish
          </Button>
        </Space>
      ),
    },
  ];

  return {
    columns,
    data: acceptedOrders.data,
    isLoading,
    contextHolder,
    params,
    setParams,
    count: acceptedOrders.count,
  };
};
