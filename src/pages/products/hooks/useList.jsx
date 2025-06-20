import { Input } from "@/components/input";
import Switcher from "@/components/switcher/index";
import { REACT_QUERY_KEYS } from "@/constants/react-query-keys";
import { ROUTER } from "@/constants/router";
import { request } from "@/shared/api/request";
import {
  bodyPrice,
  deleteProducts,
  getProducts,
} from "@/shared/modules/products";
import { getUser } from "@/utils/user";
import {
  CopyFilled,
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Button, Image, Modal, notification } from "antd";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { ActionWrapper } from "../style";

const { confirm } = Modal;

export const useList = () => {
  const user = getUser();
  const form = useForm();
  const { search } = useLocation();
  const initial_params = new URLSearchParams(search);
  const isSuperUser = user?.is_superuser ? true : false;
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [params, setParams] = useState({
    page: initial_params.has("page") ? Number(initial_params.get("page")) : 1,
    limit: initial_params.has("limit")
      ? Number(initial_params.get("limit"))
      : 20,
  });
  const navigate = useNavigate();
  const [api, contextHolder] = notification.useNotification();
  const {
    data: products = {
      count: 0,
      data: [],
    },
    isLoading,
    isFetching,
    refetch,
  } = useQuery({
    queryKey: [REACT_QUERY_KEYS.GET_PRODUCT_LIST, params],
    queryFn: () => getProducts(params),
    select: (res) => {
      return {
        count: res?.data?.count,
        data: res?.data?.results?.map(({ ...rest }, i) => ({
          key: String(i + 1),
          ...rest,
        })),
      };
    },
    onSuccess: (res) => {
      res?.data?.forEach((item) => {
        form.setValue(`body_price_${item?.id}`, item?.body_price);
      });
    },
    onError: (err) => {
      console.log(err?.response, "res");
    },
    keepPreviousData: true,
  });

  const { mutate } = useMutation((data) => deleteProducts(data), {
    onSuccess: () => {
      refetch();
      api["success"]({
        message: "Success",
        description: "Maxsulot muvaffaqiyatli o`chirildi",
      });
    },
  });
  const handleDelete = (id) => {
    confirm({
      title: "Rostdan ham ushbu maxsulotni o`chirmoqchimisiz?",
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

  const { mutate: bodyPriceMutation } = useMutation(
    (data) => bodyPrice({ id: data?.id, body_price: data?.body_price }),
    {
      onSuccess: () => {
        refetch();
        api["success"]({
          message: "Success",
          description: "Ushbu maxsulotga tannarx berildi!",
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
    bodyPriceMutation({
      id: Number(id),
      body_price: Number(form.watch(`body_price_${id}`)),
    });
  };

  const handleStatus = async (id, status) => {
    try {
      await request.patch(`admin/product/${id}/update`, { is_active: !status });
      refetch();
    } catch (err) {
      console.log(err);
    }
  };

  const defaultColumns = [
    {
      title: "T/r",
      key: "row",
      render: (id, record, index) => (
        <p>{(params.page - 1) * params.limit + index + 1}</p>
      ),
    },
    {
      title: "Photo",
      dataIndex: "media",
      key: "media",
      render: (media) => (
        <Image
          src={media}
          alt="media"
          width={80}
          height={80}
          style={{ objectFit: "cover" }}
        />
      ),
    },
    {
      title: "Mahsulot nomi",
      dataIndex: "name_uz",
      key: "name_uz",
      render: (name_uz) => <p style={{ maxWidth: "200px" }}>{name_uz}</p>,
    },
    {
      title: "Billz",
      dataIndex: "have_billz",
      key: "have_billz",
      render: (have_billz) => (
        <p style={{ color: have_billz ? "green" : "red" }}>
          {have_billz ? "Billz mavjud" : "Billz mavjud emas"}
        </p>
      ),
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (price) => <p>{price} so`m</p>,
    },
    // {
    //   title: "Discount",
    //   dataIndex: "sale_price",
    //   key: "sale_price",
    //   render: (sale_price) => (
    //     <p>{sale_price === null ? 0 : sale_price} so`m</p>
    //   ),
    // },
    // {
    //   title: "Action",
    //   key: "action",
    //   render: (row) => (
    //     <ActionWrapper size="middle">
    //       <Button
    //         className="edit-btn"
    //         onClick={() => navigate(`${ROUTER.EDIT}/${row.id}`)}
    //       >
    //         <EditOutlined />
    //       </Button>
    //       <Button className="delete-btn" onClick={() => handleDelete(row.id)}>
    //         <DeleteOutlined />
    //       </Button>
    //     </ActionWrapper>
    //   ),
    // },
    {
      title: "Referal link",
      dataIndex: "url",
      key: "url",
      render: (link) => (
        <p>
          {
            <Button
              // className="edit-btn"
              onClick={() => {
                navigator.clipboard.writeText(link);
                api["success"]({
                  message: "Success",
                  description: "Link copied",
                });
              }}
            >
              <CopyFilled />
            </Button>
          }
        </p>
      ),
    },
    {
      title: "Status",
      dataIndex: "is_active",
      key: "is_active",
      render: (is_active, row) => (
        <Switcher
          isActive={row.is_active}
          onChange={(value) => handleStatus(row.id, is_active)}
          text="&nbsp;"
        />
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (row) => (
        <ActionWrapper size="middle">
          <Button
            className="edit-btn"
            onClick={() => navigate(`${ROUTER.EDIT}/${row.id}`)}
          >
            <EditOutlined />
          </Button>
          <Button className="delete-btn" onClick={() => handleDelete(row.id)}>
            <DeleteOutlined />
          </Button>
        </ActionWrapper>
      ),
    },
  ];

  const superUserColumns = [
    {
      title: "T/r",
      key: "row",
      render: (id, record, index) => (
        <p>{(params.page - 1) * params.limit + index + 1}</p>
      ),
    },
    {
      title: "Photo",
      dataIndex: "media",
      key: "media",
      render: (media) => <Image src={media} alt="media" width={80} />,
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      render: (category) => <p>{category?.name_uz}</p>,
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (price) => <p>{price} so`m</p>,
    },
    {
      title: "Discount",
      dataIndex: "sale_price",
      key: "sale_price",
      render: (sale_price) => (
        <p>{sale_price === null ? 0 : sale_price} so`m</p>
      ),
    },
    {
      title: "Tan narx",
      key: "row",
      render: (row) => (
        <Input
          control={form.control}
          name={`body_price_${row?.id}`}
          type="number"
          disabled={!selectedRowKeys.includes(row?.key)}
          placeholder="Tan narx"
          label="Tan narx"
          onBlur={() => handleMutation(row?.id)}
        />
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (row) => (
        <ActionWrapper size="middle">
          <Button
            className="edit-btn"
            onClick={() => navigate(`${ROUTER.EDIT}/${row.id}`)}
          >
            <EditOutlined />
          </Button>
          <Button className="delete-btn" onClick={() => handleDelete(row.id)}>
            <DeleteOutlined />
          </Button>
        </ActionWrapper>
      ),
    },
  ];
  return {
    data: products.data,
    count: products.count,
    params,
    columns: isSuperUser ? superUserColumns : defaultColumns,
    setParams,
    isLoading,
    isFetching,
    isSuperUser,
    contextHolder,
    selectedRowKeys,
    setSelectedRowKeys,
  };
};
