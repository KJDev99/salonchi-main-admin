import { REACT_QUERY_KEYS } from "@/constants/react-query-keys";
import { ROUTER } from "@/constants/router";
import { ActionWrapper } from "@/pages/products/style";
import { deleteBanner, getBannerList } from "@/shared/modules/banner";
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
  const initial_params = new URLSearchParams(search);
  const [params, setParams] = useState({
    page: initial_params.has("page") ? Number(initial_params.get("page")) : 1,
    limit: initial_params.has("limit")
      ? Number(initial_params.get("limit"))
      : 10,
  });
  const navigate = useNavigate();
  const [api, contextHolder] = notification.useNotification();
  const {
    data: bannerList = {
      count: 0,
      data: [],
    },
    isLoading,
    refetch,
  } = useQuery({
    queryKey: [REACT_QUERY_KEYS.GET_BANNER_LIST, params],
    queryFn: () => getBannerList(params),
    select: (res) => {
      return {
        count: res?.data?.count,
        data: res?.data?.results,
      };
    },
  });

  const { mutate } = useMutation((data) => deleteBanner(data), {
    onSuccess: () => {
      refetch();
      api["success"]({
        message: "Success",
        description: "Banner muvaffaqiyatli o`chirildi!",
      });
    },
  });

  const handleDelete = (id) => {
    confirm({
      title: "Rostdan ham bannerni o`chirmoqchimisiz?",
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
        <p>{(params.page - 1) * params.limit + index + 1}</p>
      ),
    },
    // {
    //   title: 'Title uz',
    //   dataIndex: 'title_uz',
    //   key: 'title_uz',
    // },
    // {
    //   title: 'Title ru',
    //   dataIndex: 'title_ru',
    //   key: 'title_ru',
    // },
    {
      title: "Photo uz",
      dataIndex: "media_uz",
      key: "media_uz",
      render: (media) => <Image src={media} alt="photo" width={80} />,
    },
    {
      title: "Photo ru",
      dataIndex: "media_ru",
      key: "media_ru",
      render: (media) => <Image src={media} alt="photo" width={80} />,
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
    data: bannerList.data,
    columns: columns,
    isLoading,
    contextHolder,
    count: bannerList.count,
    params,
    setParams,
  };
};
