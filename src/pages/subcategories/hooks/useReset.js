import { detailCategory } from "@/shared/modules/category";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

export const useReset = ({ form, setFileList }) => {
  const { subid } = useParams();

  return useQuery({
    queryKey: ["get-category-detail"],
    queryFn: () => detailCategory(subid),
    select: (res) => res?.data,
    onSuccess: (res) => {
      if (res?.photo) {
        setFileList([{ url: res?.photo }]);
      }
      return form.reset({
        name_uz: res?.name_uz,
        name_ru: res?.name_ru,
        parent: res?.parent
          ? {
              value: res?.id,
              label: res?.parent?.name_uz,
            }
          : null,
      });
    },
    enabled: subid ? true : false,
  });
};
