import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { formSchema } from '../create/form.schema';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { createBox, updateBox } from '@/shared/modules/box';
import { REACT_QUERY_KEYS } from '@/constants/react-query-keys';
import { notification } from 'antd';

export const useCreate = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const form = useForm({
    resolver: yupResolver(formSchema),
    mode: 'onChange',
  });
  const queryClient = useQueryClient();
  const [fileList, setFileList] = useState([]);
  const [api, contextHolder] = notification.useNotification();

  const { mutate, isLoading } = useMutation(
    (data) => (id ? updateBox(id, data) : createBox(data)),
    {
      onSuccess: () => {
        api['success']({
          message: 'Success',
          description: 'Hodim muvaffaqiyatli yaratildi',
        });
        navigate('/admin/box');
        queryClient.invalidateQueries({
          queryKey: [REACT_QUERY_KEYS.ADMIN_BOX_LIST],
        });
      },
      onError: () => {
        api['error']({
          message: 'Error',
          description: 'Nimadur xatolik yuz berdi',
        });
      },
    }
  );

  const confirm = (data) => {
    const formData = new FormData();
    if (fileList[0]?.originFileObj !== undefined) {
      formData.append('photo', fileList[0]?.originFileObj);
    }
    formData.append('price', Number(data.price));
    mutate(formData);
  };

  return {
    form,
    confirm,
    fileList,
    isLoading,
    setFileList,
    contextHolder,
  };
};
