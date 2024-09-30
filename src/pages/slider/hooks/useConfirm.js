import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { formSchema } from "../crud/form.schema";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { REACT_QUERY_KEYS } from "@/constants/react-query-keys";
import { createBanner, updateBanner } from "@/shared/modules/banner";
import { notification } from "antd";

export const useConfirm = () => {
  const queryClient = useQueryClient();
  const { id } = useParams();
  const navigate = useNavigate();
  const [api, contextHolder] = notification.useNotification();
  const form = useForm({
    resolver: yupResolver(formSchema),
  });
  const [fileListuz, setFileListuz] = useState([]);
  const [fileListru, setFileListru] = useState([]);
  const [mfileListuz, setMFileListuz] = useState([]);
  const [mfileListru, setMFileListru] = useState([]);
  const [value, setValue] = useState(0);

  const onChange = (e) => {
    setValue(e.target.value);
  };

  const { mutate, isLoading } = useMutation(
    (data) => (id ? updateBanner(id, data) : createBanner(data)),
    {
      onSuccess: () => {
        navigate("/admin/slider");
        api["success"]({
          message: "Banner",
          description: `Banner muvaffaqiyatli ${
            id ? "yangilandi" : "yaratildi"
          }`,
        });
        queryClient.invalidateQueries({
          queryKey: [REACT_QUERY_KEYS.CREATE_BANNER_LIST],
        });
      },
    }
  );

  const confirm = (data) => {
    const formData = new FormData();
    formData.append("url", data.url);
    // formData.append('title_uz', data.title_uz);
    if (fileListuz[0]?.originFileObj !== undefined) {
      formData.append("media_uz", fileListuz[0]?.originFileObj);
    }
    if (fileListru[0]?.originFileObj !== undefined) {
      formData.append("media_ru", fileListru[0]?.originFileObj);
    }
    if (mfileListuz[0]?.originFileObj !== undefined) {
      formData.append("mobile_media_uz", mfileListuz[0]?.originFileObj);
    }
    if (mfileListru[0]?.originFileObj !== undefined) {
      formData.append("mobile_media_ru", mfileListru[0]?.originFileObj);
    }
    // formData.append('have_button', value ? true : false);
    // if (value === 1) {
    //   formData.append('button_url', data.button_url);
    //   formData.append('button_name_ru', data.button_name_ru);
    //   formData.append('button_name_uz', data.button_name_uz);
    // }
    mutate(formData);
  };

  return {
    confirm,
    form,
    fileListuz,
    setFileListuz,
    fileListru,
    setFileListru,
    mfileListuz,
    setMFileListuz,
    mfileListru,
    setMFileListru,
    isLoading,
    onChange,
    value,
    setValue,
    contextHolder,
  };
};
