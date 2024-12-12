import { NumberFormat } from "@/components/number-format";
import { ActionWrapper } from "@/pages/products/style";
import { deleteEmployee, getRoles } from "@/shared/modules/roles";
import { Text } from "@/styles/global";
import {
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Button, Modal, Tag, notification } from "antd";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const { confirm } = Modal;

export const useList = () => {
  const navigate = useNavigate();
  const { search } = useLocation();
  const initial_params = new URLSearchParams(search);
  const [params, setParams] = useState({
    page: initial_params.has("page") ? Number(initial_params.get("page")) : 1,
    limit: initial_params.has("limit")
      ? Number(initial_params.get("limit"))
      : 10,
  });
  const [api, contextHolder] = notification.useNotification();
  const {
    data: staff = {
      data: [],
      count: 0,
    },
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["get-role-list", params],
    queryFn: () => getRoles(params),
    select: (res) => {
      return { data: res?.data?.results, count: res?.data?.count };
    },
  });

  const { mutate } = useMutation((data) => deleteEmployee(data), {
    onSuccess: () => {
      refetch();
      api["success"]({
        message: "Success",
        description: "Hodim muvaffaqiyatli o`chirildi",
      });
    },
  });

  const handleEdit = (id) => {
    navigate(`edit/${id}`);
  };

  const handleDelete = (id) => {
    confirm({
      title: "Rostdan ham hodimni o`chirmoqchimisiz?",
      icon: <ExclamationCircleOutlined />,
      onOk() {
        mutate(id);
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

  const columns = [
    {
      title: "T/r",
      key: "row",
      render: (id, record, index) => (
        <p>{(params.page - 1) * params.limit + index + 1}</p>
      ),
    },
    {
      title: "Ismi va familiyasi",
      dataIndex: "firstname",
      key: "firstname",
    },
    {
      title: "Lavozimi",
      key: "row",
      render: (row) => <Tag>{row.is_worker ? "ISHCHI" : "OMBORCHI"}</Tag>,
    },
    {
      title: "Telefon raqami",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Ish haqqi (donasiga)",
      key: "row",
      render: (row) => (
        <>
          <NumberFormat
            value={row?.detail?.salary === null ? 0 : row?.detail?.salary}
          />{" "}
          so&apos;m
        </>
      ),
    },
    {
      title: "Gaplashgan",
      key: "row",
      render: (row) => (
        <Text className="accept-text">{row?.detail?.detail?.count} ta</Text>
      ),
    },
    {
      title: "Bonus",
      key: "row",
      render: (row) => (
        <Text>{row?.detail?.detail?.total_salary} so&apos;m</Text>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (record) => (
        <ActionWrapper size="middle">
          <Button
            className="delete-btn"
            onClick={() => handleDelete(record.id)}
          >
            <DeleteOutlined />
          </Button>
          <Button className="edit-btn" onClick={() => handleEdit(record?.id)}>
            <EditOutlined />
          </Button>
        </ActionWrapper>
      ),
    },
  ];

  return {
    staff,
    columns,
    isLoading,
    contextHolder,
    count: staff.count,
    params,
    setParams,
  };
};
