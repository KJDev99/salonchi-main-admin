import { useState } from "react";
import { DATE_FORMAT } from "@/constants/format";
import { REACT_QUERY_KEYS } from "@/constants/react-query-keys";
import {
  deleteOrderWaiting,
  getOrdersWaiting,
  updateOrderWaiting,
} from "@/shared/modules/orders-waiting";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import dayjs from "dayjs";
import { Button, Space, Tag, notification, Modal } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import { getStatus, tagStatus } from "@/utils/status";
import { STATUS } from "@/constants/status";
import {
  SyncOutlined,
  ExclamationCircleOutlined,
  EyeFilled,
  DeleteFilled,
} from "@ant-design/icons";
import { ROUTER } from "@/constants/router";
// import { LiaMoneyBillWaveAltSolid } from 'react-icons/lia';
// import { BsCreditCard } from 'react-icons/bs';

export const useList = () => {
  const { confirm } = Modal;
  const navigate = useNavigate();
  const [api, contextHolder] = notification.useNotification();
  const { search } = useLocation();
  const initial_params = new URLSearchParams(search);
  const queryClient = useQueryClient();
  const [params, setParams] = useState({
    page: initial_params.has("page") ? Number(initial_params.get("page")) : 1,
    limit: initial_params.has("limit")
      ? Number(initial_params.get("limit"))
      : 20,
  });
  const {
    data: ordersWaiting = {
      count: 0,
      data: [],
    },
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: [REACT_QUERY_KEYS.GET_ORDER_WAITING, params],
    queryFn: () => getOrdersWaiting(params),
    select: (res) => {
      return {
        count: res?.data?.count,
        data: res?.data?.results,
      };
    },
    keepPreviousData: true,
  });

  const updateMutate = useMutation((data) => updateOrderWaiting(data), {
    onSuccess: () => {
      api["success"]({
        message: "Success",
        description: "Buyurtma holati o`zgartirildi",
      });
      navigate("/admin/orders");
    },
    onError: (err) => {
      if (err?.response?.data?.detail == "You have an incomplete order") {
        api["warning"]({
          message: "Warning",
          description:
            "Sizda toʻliq boʻlmagan buyurtma bor" ||
            "Nimadur xatolik yuz berdi!",
        });
      } else {
        api["error"]({
          message: "Error",
          description:
            err?.response?.data?.detail || "Nimadur xatolik yuz berdi!",
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
      queryClient.invalidateQueries([REACT_QUERY_KEYS.GET_ORDER_WAITING]);
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

  const handleMutate = (id) => {
    confirm({
      title: "Buyurtmani qabul chiqmoqchimisiz?",
      icon: <ExclamationCircleOutlined />,
      onOk() {
        updateMutate.mutate(id);
      },
      okText: "Ha",
      cancelText: "Bekor qilish",

      // onCancel() {
      //   console.log("Cancel");
      // },
    });
    // updateMutate.mutate(id);
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
      dataIndex: "actions",
      key: "row",
      render: (id, row) => (
        <Space wrap>
          <Button type="primary" onClick={() => handleMutate(row.id)}>
            Buyurtmani olish
          </Button>
          <Space>
            <Button
              type="primary"
              className="delete-btn"
              style={{ color: "red", borderColor: "red" }}
              ghost
              onClick={() => handleDelete(row.id)}
            >
              <DeleteFilled />
            </Button>
          </Space>
        </Space>
      ),
    },
  ];

  return {
    data: ordersWaiting.data,
    count: ordersWaiting.count,
    params,
    columns,
    setParams,
    isLoading,
    isFetching,
    contextHolder,
  };
};
