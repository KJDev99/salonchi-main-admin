import { Input } from "@/components/input";
import { request } from "@/shared/api/request";
import { useMutation, useQuery } from "@tanstack/react-query";
import { notification } from "antd";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation } from "react-router-dom";

export const useList = () => {
  const form = useForm();
  const [api, contextHolder] = notification.useNotification();
  const { search } = useLocation();
  const initial_params = new URLSearchParams(search);
  const [productId, setProductId] = useState(null);
  const [params, setParams] = useState({
    page: initial_params.has("page") ? Number(initial_params.get("page")) : 1,
    limit: initial_params.has("limit")
      ? Number(initial_params.get("limit"))
      : 20,
  });

  const {
    data = {
      count: 0,
      data: [],
    },
    isLoading,
    isFetching,
    refetch,
  } = useQuery({
    queryKey: ["get-ikpu", params],
    queryFn: () =>
      request("/admin/ikpu/list", {
        params: params,
      }),
    select: (res) => {
      return {
        count: res?.data?.count,
        data: res?.data?.results,
      };
    },
    onSuccess: (res) => {
      res?.data?.forEach((item) => {
        form.setValue(`mxik_${item?.id}`, item?.mxik);
        form.setValue(`package_code_${item?.id}`, item?.package_code);
        form.setValue(`vat_percent_${item?.id}`, item?.vat_percent);
      });
    },
    onError: (err) => {
      console.log(err?.response, "res");
    },
    keepPreviousData: true,
  });

  const { mutate } = useMutation(
    (data) => request.put(`admin/ikpu/${productId}/update`, data),
    {
      onSuccess: () => {
        refetch();
        api["success"]({
          message: "Success",
          description: "Ma'lumot muvaffaqiyatli saqlandi!",
        });
      },
      onError: () => {
        api["error"]({
          message: "Xatolik",
          description: "Nimadur xatolik yuz berdi!",
        });
      },
    }
  );

  const handleMutation = (id) => {
    setProductId(id);
    if (
      form.watch(`mxik_${id}`) &&
      form.watch(`package_code_${id}`) !== null &&
      form.watch(`vat_percent_${id}`) !== null
    ) {
      const payloadMxik = {
        mxik: form.watch(`mxik_${id}`),
        package_code: form.watch(`package_code_${id}`),
        vat_percent: Number(form.watch(`vat_percent_${id}`)),
      };
      mutate(payloadMxik);
    }
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
      title: "Maxsulot nomi",
      key: "name_uz",
      render: (row) => {
        return <p style={{ maxWidth: 250 }}>{row?.name_uz}</p>;
      },
    },
    {
      title: "IKPU",
      key: "mxik",
      render: (row) => (
        <Input
          control={form.control}
          name={`mxik_${row?.id}`}
          type="number"
          placeholder="IKPU"
          label="IKPU"
          onBlur={() => handleMutation(row?.id)}
        />
      ),
    },
    {
      title: "Qadoqlash kodi",
      key: "package_code",
      render: (row) => (
        <Input
          control={form.control}
          name={`package_code_${row?.id}`}
          type="number"
          placeholder="Qadoqlash kodi"
          label="Qadoqlash kodi"
          onBlur={() => handleMutation(row?.id)}
        />
      ),
    },
    {
      title: "QQS",
      key: "vat_percent",
      render: (row) => (
        <Input
          control={form.control}
          name={`vat_percent_${row?.id}`}
          type="number"
          placeholder="Birlik kodi"
          label="Birlik kodi"
          onBlur={() => handleMutation(row?.id)}
        />
      ),
    },
  ];

  return {
    data: data.data,
    count: data.count,
    params,
    columns,
    setParams,
    isLoading,
    isFetching,
    contextHolder,
  };
};
