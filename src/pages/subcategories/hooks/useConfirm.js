import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { formSchema } from "../crud/form.schema";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createCategory,
  getCategorySelect,
  updateCategory,
} from "@/shared/modules/category";
import { useNavigate, useParams } from "react-router-dom";
import { REACT_QUERY_KEYS } from "@/constants/react-query-keys";

export const useConfirm = () => {
  const queryClient = useQueryClient();
  const { subId } = useParams();
  const navigate = useNavigate();
  const form = useForm({
    resolver: yupResolver(formSchema),
  });
  const [fileList, setFileList] = useState([]);

  const { data: categoryList = [] } = useQuery({
    queryKey: ["parent"],
    queryFn: getCategorySelect,
    select: (res) =>
      res?.data?.map((v) => {
        return {
          value: v?.id,
          label: v?.name_uz,
        };
      }),
  });

  const { isLoading } = useMutation(
    (data) => (subId ? updateCategory(subId, data) : createCategory(data)),
    {
      onSuccess: () => {
        navigate("/admin/categories");
        queryClient.invalidateQueries({
          queryKey: [REACT_QUERY_KEYS.GET_CATEGORY_LIST],
        });
      },
    }
  );

  // const confirm = (data) => {
  //   const formData = new FormData();
  //   formData.append("name_uz", data.name_uz);
  //   formData.append("name_ru", data.name_ru);
  //   if (fileList && fileList[0]?.originFileObj !== undefined)
  //     formData.append("photo", fileList[0]?.originFileObj);
  //   formData.append("is_active", true);
  //   if (data.parent !== undefined && data?.parent !== null) {
  //     formData.append("parent", data.parent);
  //   } else {
  //     formData.append("parent", null);
  //   }
  //   mutate(formData);
  // };

  return {
    // confirm,
    form,
    fileList,
    setFileList,
    isLoading,
    categoryList,
  };
};
