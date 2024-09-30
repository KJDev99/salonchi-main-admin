import { NumberFormat } from '@/components/number-format';
import { REACT_QUERY_KEYS } from '@/constants/react-query-keys';
import { ROUTER } from '@/constants/router';
import { useSearchParams } from '@/hooks/useSearchParams';
import { ActionWrapper } from '@/pages/products/style';
import { boxList, deleteBox } from '@/shared/modules/box';
import {
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Button, Image, Modal, notification } from 'antd';
import dayjs from 'dayjs';
import { Fragment } from 'react';
import { useNavigate } from 'react-router-dom';

const { confirm } = Modal;
export const useList = () => {
  const navigate = useNavigate();
  const { params, setParams } = useSearchParams();
  const [api, contextHolder] = notification.useNotification();

  const {
    data: boxes = {
      count: 0,
      data: [],
    },
    isLoading,
    refetch,
  } = useQuery({
    queryKey: [REACT_QUERY_KEYS.ADMIN_BOX_LIST, params],
    queryFn: () => boxList(params),
    select: (res) => {
      return {
        count: res?.data?.count,
        data: res?.data?.results,
      };
    },
  });

  const { mutate } = useMutation((data) => deleteBox(data), {
    onSuccess: () => {
      refetch();
      api['success']({
        message: 'Success',
        description: 'Box muvaffaqiyatli o`chirildi',
      });
    },
  });

  const handleEdit = (id) => {
    navigate(`${ROUTER.EDIT}/${id}`);
  };

  const handleDelete = (id) => {
    confirm({
      title: 'Rostdan ham boxni o`chirmoqchimisiz?',
      icon: <ExclamationCircleOutlined />,
      onOk() {
        mutate(id);
      },
      onCancel() {
        console.log('Cancel');
      },
      okButtonProps: {
        style: {
          background: 'var(--main-red)',
        },
      },
    });
  };

  const columns = [
    {
      title: 'T/r',
      dataIndex: 'key',
      render: (id, record, index) => (
        <p>{(params.page - 1) * params.limit + index + 1}</p>
      ),
    },
    {
      title: 'Photo',
      dataIndex: 'photo',
      key: 'photo',
      render: (photo) => <Image src={photo} alt="photo" width={60} />,
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      render: (price) => (
        <Fragment>
          <NumberFormat value={price} /> so`m
        </Fragment>
      ),
    },
    {
      title: 'Created date',
      dataIndex: 'created_at',
      key: 'created_at',
      render: (created_at) => dayjs(created_at).format('DD.MM.YYYY, HH:mm'),
    },
    {
      title: 'Action',
      key: 'action',
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
    count: boxes.count,
    data: boxes.data,
    params,
    columns,
    setParams,
    isLoading,
    contextHolder,
  };
};
