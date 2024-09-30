import { detailProduct } from "@/shared/modules/products";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import dayjs from "dayjs";
import { DATE_FORMAT } from "@/constants/format";
import advancedFormat from "dayjs/plugin/advancedFormat";
import customParseFormat from "dayjs/plugin/customParseFormat";
import localeData from "dayjs/plugin/localeData";
import weekday from "dayjs/plugin/weekday";
import weekOfYear from "dayjs/plugin/weekOfYear";
import weekYear from "dayjs/plugin/weekYear";
import { REACT_QUERY_KEYS } from "@/constants/react-query-keys";

dayjs.extend(customParseFormat);
dayjs.extend(advancedFormat);
dayjs.extend(weekday);
dayjs.extend(localeData);
dayjs.extend(weekOfYear);
dayjs.extend(weekYear);

export const useReset = ({ form, setFileList, setVideoFile }) => {
  const { id } = useParams();

  const { isLoading: detailLoading } = useQuery({
    queryKey: [REACT_QUERY_KEYS.GET_PRODUCT_DETAIL],
    queryFn: () => detailProduct(id),
    select: (res) => res?.data,
    onSuccess: (response) => {
      const saleTime = response?.sale_time
        ? dayjs(response?.sale_time).format(DATE_FORMAT)
        : dayjs(new Date()).format(DATE_FORMAT);

      // Update the file lists based on the media type
      response.media.forEach((v, i) => {
        if (v.file_type === 'image') {
          setFileList((prev) => [
            ...prev,
            { uid: String(i + 1), 
            url: v?.file, name: `image-${i + 1}`, status: 'done',
          }             
          ]);
        } else {
          setVideoFile({ uid: String(i + 1), url: v?.file, name: `video-${i + 1}`, status: 'done' });
        }
      });

      // Reset the form with the fetched data
      form.reset({
        ...response,
        sale_time: dayjs(saleTime, DATE_FORMAT),
        category: response?.category?.id,
        is_flow: response?.is_flow ? 'yes' : 'no',
        size: response?.attributes?.filter((v) => v?.key === 'size')?.map((item) => item?.value),
        color: response?.attributes?.filter((v) => v?.key === 'color')?.map((item) => item?.value),
        product_color: response?.colors?.map((v) => v?.id),
      });
    },
    enabled: !!id,
  });

  return {
    id,
    detailLoading,
  };
};
