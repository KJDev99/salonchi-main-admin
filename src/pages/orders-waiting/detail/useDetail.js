import { REACT_QUERY_KEYS } from '@/constants/react-query-keys';
import {
  orderAccepted,
  orderDetails,
  updateWorker,
} from '@/shared/modules/orders';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { notification } from 'antd';
import { getUser } from '@/utils/user';

export const useDetail = () => {
  const { id } = useParams();
  const form = useForm();
  const [open, setOpen] = useState(false);
  const [api, contextHolder] = notification.useNotification();
  const user = getUser();

  const { data, isLoading, refetch } = useQuery({
    queryKey: [REACT_QUERY_KEYS.GET_ORDER_DETAILS],
    queryFn: () => orderDetails(id),
    select: (res) => res?.data,
  });

  const updateMutate = useMutation(
    (data) =>
      user?.is_worker ? updateWorker({ id, ...data }) : orderAccepted(data),
    {
      onSuccess: () => {
        setOpen(false);
        refetch();
      },
      onError: (error) => {
        api['error']({
          message: 'Error',
          description: error?.response?.data?.detail || 'Something went wrong!',
        });
      },
    }
  );

  const rejectOrder = () => {
    let payload = {
      comment: form.watch('comment'),
      status: 'CANCELLED',
    };
    updateMutate.mutate(payload);
  };

  const acceptOrder = () => {
    let payload = {
      status: 'ACCEPTED',
    };
    updateMutate.mutate(payload);
  };

  return {
    data,
    isLoading,
    form,
    open,
    setOpen,
    contextHolder,
    rejectOrder,
    acceptOrder,
  };
};
