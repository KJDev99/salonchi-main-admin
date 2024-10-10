import { REACT_QUERY_KEYS } from "@/constants/react-query-keys";
import { ROUTER } from "@/constants/router";
import { ActionWrapper } from "@/pages/products/style";
import { deleteCategory, getSubCategory } from "@/shared/modules/category";
import {
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Button, Image, Modal, notification } from "antd";
import dayjs from "dayjs";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const { confirm } = Modal;

export const useList = () => {
  const { search } = useLocation();
  // console.log(window.location.pathname.split("/")[3]);
  const initial_params = new URLSearchParams(search);
  const [params, setParams] = useState({
    page: initial_params.has("page") ? Number(initial_params.get("page")) : 1,
    limit: initial_params.has("limit")
      ? Number(initial_params.get("limit"))
      : 20,
    categoryId: window.location.pathname.split("/")[3],
  });
  const navigate = useNavigate();
  const [api, contextHolder] = notification.useNotification();
  const {
    data: categories = {
      count: 0,
      data: [],
    },
    isLoading,
    refetch,
  } = useQuery({
    queryKey: [REACT_QUERY_KEYS.GET_CATEGORY_LIST, params],
    queryFn: () => getSubCategory(params),
    select: (res) => {
      console.log(res);
      return {
        count: res?.data?.count,
        data: res?.data?.results,
      };
    },
  });

  const { mutate } = useMutation((data) => deleteCategory(data), {
    onSuccess: () => {
      refetch();
      api["success"]({
        message: "Success",
        description: "Kategoriya muvaffaqiyatli o`chirildi",
      });
    },
  });

  const handleDelete = (id) => {
    confirm({
      title: "Rostdan ham kategoriyani o`chirmoqchimisiz?",
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

  const handleEdit = (id) => {
    navigate(`${ROUTER.EDIT}/${id}`);
  };

  const columns = [
    {
      title: "T/r",
      dataIndex: "key",
      render: (id, record, index) => (
        <p key={id} style={{ paddingLeft: "10px" }}>
          {(params.page - 1) * params.limit + index + 1}
        </p>
        // <p>{(params.page - 1) * params.limit + index + 1}</p>
      ),
    },
    {
      title: "Name uz",
      dataIndex: "name_uz",
      key: "name_uz",
    },
    {
      title: "Name ru",
      dataIndex: "name_ru",
      key: "name_ru",
    },
    {
      title: "Photo",
      dataIndex: "photo",
      key: "photo",
      render: (photo) => (
        <Image
          key={photo}
          src={photo}
          alt="photo"
          width={70}
          height={70}
          style={{ objectFit: "cover" }}
        />
      ),
    },
    {
      title: "Created date",
      dataIndex: "created_at",
      key: "created_at",
      render: (created_at) => dayjs(created_at).format("DD.MM.YYYY, HH:mm"),
    },
    {
      title: "Action",
      key: "action",
      render: (record) => (
        <ActionWrapper size="middle">
          <Button className="edit-btn" onClick={() => handleEdit(record.id)}>
            <EditOutlined />
          </Button>
          <Button
            className="delete-btn"
            onClick={() => handleDelete(record.id)}
          >
            <DeleteOutlined />
          </Button>
        </ActionWrapper>
      ),
    },
  ];
  return {
    data: categories.data,
    columns: columns,
    isLoading,
    contextHolder,
    count: categories.count,
    params,
    setParams,
  };
};
