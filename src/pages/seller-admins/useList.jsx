import { SiginInIcon } from "@/assets/trash";
import { request } from "@/shared/api/request";
import { useQuery } from "@tanstack/react-query";
import { Button, notification } from "antd";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";

export const useList = () => {
  const form = useForm({
    defaultValues: {
      status: "ACCEPT",
    },
  });

  const [api, contextHolder] = notification.useNotification();

  const { search } = useLocation();
  const initial_params = new URLSearchParams(search);
  const navigate = useNavigate();
  const [params, setParams] = useState({
    page: initial_params.has("page") ? Number(initial_params.get("page")) : 1,
    limit: initial_params.has("limit")
      ? Number(initial_params.get("limit"))
      : 20,
    has_amount: true,
  });

  const {
    data: wholesaleCustomers = {
      data: [],
      count: 0,
    },
  } = useQuery({
    queryKey: ["seller-list", params],
    queryFn: () =>
      request(`/admin/seller/list`, {
        params: {
          has_amount: params.has_amount ? undefined : params.has_amount,
          limit: params?.limit,
          page: params?.page,
        },
      }),

    select: (res) => {
      return {
        count: res?.data?.count,
        data: res?.data?.results,
      };
    },
    keepPreviousData: true,
  });

  const columns = [
    {
      title: "Ism familiya",
      key: "firstname",
      dataIndex: "firstname",
    },
    {
      title: "Telefon raqam",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Yetkazib berilganlar",
      dataIndex: "extra.orders",
      key: "extra.orders",
      render: (e, orders) => orders?.extra?.orders,
    },
    {
      title: "Ish haqi",
      dataIndex: "extra.amount",
      key: "extra.amount",
      render: (e, orders) => orders?.extra?.amount,
    },
    {
      title: "Profil",
      dataIndex: "",
      key: "",
      render: (e, orders) => (
        <Button
          onClick={() => navigate(`/admin/seller-view/${orders.id}`)}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "5px",
            color: "#6417B0",
            border: "1px solid #6417B0",
            padding: "2px 15px",
            height: "auto",
          }}
        >
          Ochish <SiginInIcon />
        </Button>
      ),
    },
  ];

  return {
    rows: wholesaleCustomers.data,
    count: wholesaleCustomers?.count,
    form,
    params,
    columns,
    setParams,
    contextHolder,
  };
};
