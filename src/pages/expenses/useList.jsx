/* eslint-disable react-hooks/exhaustive-deps */
import { REACT_QUERY_KEYS } from "@/constants/react-query-keys";
import { useSearchParams } from "@/hooks/useSearchParams";
import {
  createExpenses,
  deleteExpenses,
  getExpenses,
} from "@/shared/modules/expenses";
import { DeleteOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Button, Modal, notification } from "antd";
import { useForm } from "react-hook-form";
import { formSchema } from "./form.schema";
import { useMemo } from "react";
import { Text } from "@/styles/global";
import dayjs from "dayjs";
import { DATE_FORMAT } from "@/constants/format";

const { confirm } = Modal;
export const useList = () => {
  const [api, contextHolder] = notification.useNotification();
  const form = useForm({
    resolver: yupResolver(formSchema),
    defaultValues: {
      reason: "",
      amount: null,
    },
  });

  const dates = {
    from_date:
      form.watch("filter") == undefined
        ? null
        : dayjs(form.watch("filter")?.[0]).format("YYYY-MM-DD"),
    to_date:
      form.watch("filter") === undefined
        ? null
        : dayjs(form.watch("filter")?.[1]).format("YYYY-MM-DD"),
  };

  const { params, setParams } = useSearchParams();
  const {
    data: expenses = {
      count: 0,
      data: [],
    },
    isLoading,
    refetch,
  } = useQuery({
    queryKey: [REACT_QUERY_KEYS.EXPENSES, params, dates],
    queryFn: () => getExpenses(params, dates),
    select: (res) => {
      return {
        count: res?.data?.count,
        data: res?.data?.results,
      };
    },
  });

  const columns = useMemo(
    () => [
      {
        title: "T/r",
        key: "row",
        render: (id, record, index) => (
          <p>{(params.page - 1) * params.limit + index + 1}</p>
        ),
      },
      {
        title: "Harajat matni",
        key: "reason",
        render: (row) => <Text>{row?.reason}</Text>,
      },
      {
        title: "Harajat summasi",
        key: "amount",
        render: (row) => <Text>{row?.amount} so`m</Text>,
      },
      {
        title: "Sanasi",
        key: "created_at",
        render: (row) => (
          <Text>{dayjs(row?.created_at).format(DATE_FORMAT)}</Text>
        ),
      },
      {
        title: "Harakatlar",
        key: "action",
        render: (row) => (
          <Button className="delete-btn" onClick={() => handleDelete(row?.id)}>
            <DeleteOutlined />
          </Button>
        ),
      },
    ],
    []
  );

  const { mutate, isLoading: createIsLoading } = useMutation(
    (data) => createExpenses(data),
    {
      onSuccess: () => {
        refetch();
        form.reset({
          reason: "",
          amount: null,
        });
      },
    }
  );

  const onCreate = (data) => {
    const payload = {
      amount: Number(data.amount),
      reason: data.reason,
    };
    mutate(payload);
  };

  const { mutate: deleteMutate, isLoading: deleteLoading } = useMutation(
    (data) => deleteExpenses(data),
    {
      onSuccess: () => {
        refetch();
        api["success"]({
          message: "Success",
          description: "Harajat muvaffaqiyatli o`chirildi",
        });
      },
    }
  );

  const handleDelete = (id) => {
    confirm({
      title: "Rostdan ham ushbu harajatni o'chirmoqchimisiz!",
      icon: <ExclamationCircleOutlined />,
      onOk() {
        deleteMutate(id);
      },
      onCancel() {
        console.log("Cancel");
      },
      okButtonProps: {
        style: {
          background: "var(--main-red)",
        },
      },
    });
  };

  return {
    form,
    data: expenses.data,
    count: expenses.count,
    params,
    columns,
    onCreate,
    isLoading,
    setParams,
    contextHolder,
    deleteLoading,
    createIsLoading,
  };
};
