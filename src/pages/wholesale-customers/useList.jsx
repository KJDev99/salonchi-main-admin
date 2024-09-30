import IconAcsipt from "@/assets/acsept";
import IconRejeact from "@/assets/rejeact";
import IconTrash from "@/assets/trash";
import { request } from "@/shared/api/request";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Button, Space, notification } from "antd";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation } from "react-router-dom";

export const useList = () => {
  const form = useForm({
    defaultValues: {
      status: "ACCEPT",
    },
  });

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
    data: wholesaleCustomers = {
      data: [],
      count: 0,
    },
    refetch,
  } = useQuery({
    queryKey: ["wholesale-list", form.watch("status")],
    queryFn: () =>
      request(`/admin/wholesale/list`, {
        params: {
          status: form.watch("status"),
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

  const { mutate } = useMutation(
    (data) =>
      request.put(`admin/wholesale/${data.wholesaler_id}/update/status`, {
        ...data?.payload2,
      }),
    {
      onSuccess: () => {
        refetch();
        api["success"]({
          message: "Success",
          description: "Status muvaffaqiyatli yangilandi",
        });
      },
      onError: (err) => {
        api["error"]({
          message: "Error",
          description:
            err?.response?.data?.password[0] || "Nimadur xatolik yuz berdi!",
        });
      },
    }
  );

  const handleUpdate = (row, type) => {
    const wholesaler_id = row.id;
    const payload = {
      status: type === "accept" ? "ACCEPT" : "REJECT",
    };
    mutate({ payload2: payload, wholesaler_id });
  };

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
      title: "Viloyat",
      dataIndex: "region",
      key: "region",
    },
    {
      title: "Status",
      key: "row",
      render: (row) => {
        console.log(row, "row");
        return (
          <Space align="center">
            <div
              style={{
                border:
                  row.status !== "WAITING"
                    ? "1px solid #14C21B"
                    : "1px solid #FFD338",
                borderRadius: "5px",
                padding: "2px 16px",
                color: row.status !== "WAITING" ? "#14C21B" : "#FFD338",
              }}
            >
              {row.status === "WAITING" ? "Kutilayotgan" : "Aktiv"}
            </div>
            {row.status === "WAITING" ? (
              <>
                <Button
                  onClick={() => handleUpdate(row, "accept")}
                  style={{
                    padding: 0,
                    border: 0,
                    display: "flex",
                    alignItems: "center",
                    boxShadow: "none",
                  }}
                >
                  <IconAcsipt />
                </Button>
                <Button
                  onClick={() => handleUpdate(row, "reject")}
                  style={{
                    padding: 0,
                    border: 0,
                    display: "flex",
                    alignItems: "center",
                    boxShadow: "none",
                  }}
                >
                  <IconRejeact />
                </Button>
              </>
            ) : (
              <Button
                onClick={() => handleUpdate(row, "reject")}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "5px",
                  color: "#C21414",
                  border: "1px solid #C21414",
                  padding: "2px 15px",
                  height: "auto",
                }}
              >
                <IconTrash /> O’chirish
              </Button>
            )}
          </Space>
        );
      },
    },
  ];

  return {
    rows: wholesaleCustomers.data,
    form,
    params,
    columns,
    setParams,
    contextHolder,
  };
};
