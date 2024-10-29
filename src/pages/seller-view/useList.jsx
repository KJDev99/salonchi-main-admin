
import { request } from "@/shared/api/request";
import { useMutation, useQuery } from "@tanstack/react-query";
import {  Image,  notification } from "antd";
import dayjs from "dayjs";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useParams } from "react-router-dom";

export const useList = () => {
  const form = useForm({
    defaultValues: {
      status: "ACCEPT",
    },
  });

  const [api, contextHolder] = notification.useNotification();

  const { search } = useLocation();
  const initial_params = new URLSearchParams(search);

  const params2 = useParams()
  const [open, setOpen] = useState(false);
  const [files,setFile] = useState(false)

  console.log("params2",params2.id)

  const [params, setParams] = useState({
    page: initial_params.has("page") ? Number(initial_params.get("page")) : 1,
    limit: initial_params.has("limit")
      ? Number(initial_params.get("limit"))
      : 20,
  });

  const {
    data: wholesaleCustomers = {
      data: [],
      count: 0,
    },
  } = useQuery({
    queryKey: ["seller-list", form.watch("status")],
    queryFn: () =>
      request(`/admin/seller/${params2.id}/detail`),

    select: (res) => {
      return {
        data: res?.data,
      };
    },
    keepPreviousData: true,
  });


  const {
    data: wholesaleCustomers2 = {
      data: [],
      count: 0,
    },
  } = useQuery({
    queryKey: ["seller-list-history", form.watch("status")],
    queryFn: () =>
      request(`/admin/seller/${params2.id}/payment/history`),

    select: (res) => {
      return {
        count: res?.data?.count,
        data: res?.data?.results,
      };
    },
    enabled:true,
    keepPreviousData: true,
  });

  const { mutate, } = useMutation(
    (data) => request.post('/admin/seller/transfer/money',data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }),
    {
      onSuccess: () => {
    
        form.reset({
          reason: "",
          amount: null,
        });
      },
    }
  );


const handleSubmit = () => {
  const formData = new FormData();
  if (files[0]?.originFileObj !== undefined) {
    formData.append('chek', files[0]?.originFileObj);
  }
  formData.append('user', params2.id)


  mutate(formData)
  setOpen(false)
}
 

  const columns = [
    {
      title: "Summa",
      key: "amount",
      dataIndex: "amount",
    },
    {
      title: "Yetkazib berilganlar",
      dataIndex: "orders_count",
      key: "orders_count",
    },
    {
      title: "Chekni ko’rish",
      dataIndex: "chek",
      key: "chek",
      render: (e) => <Image src={e} alt="media" width={80} />
    },
    {
      title: "To‘langan sana",
      dataIndex: "created_at",
      key: "created_at",
      render: (created_at) => dayjs(created_at).format("DD.MM.YYYY, HH:mm"),
    },
    
   
  ];

  return {
    rows: wholesaleCustomers2.data,
    sillerData:wholesaleCustomers?.data,
    form,
    open,setOpen,
    setFile,files,
    params,
    columns,
    setParams,
    contextHolder,
    handleSubmit
  };
};
