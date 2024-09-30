import { REACT_QUERY_KEYS } from '@/constants/react-query-keys';
import { detailBox } from '@/shared/modules/box';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

export const useReset = ({ form, setFileList }) => {
  const { id } = useParams();

  return useQuery({
    queryKey: [REACT_QUERY_KEYS.ADMIN_BOX_DETAIL],
    queryFn: () => detailBox(id),
    select: (res) => res?.data,
    onSuccess: (res) => {
      if (res?.photo) {
        setFileList([{ url: res?.photo }]);
      }
      return form.reset({
        price: res?.price,
      });
    },
    enabled: id ? true : false,
  });
};
