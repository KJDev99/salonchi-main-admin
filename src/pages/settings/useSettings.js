import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { schema, schema2 } from "./form.schema";
import { useMutation, useQuery } from "@tanstack/react-query";
import { notification } from "antd";
import {
  getUserName,
  updateUserName,
  updatePassword,
} from "@/shared/modules/settings";

export const useSettings = () => {
  const [api, contextHolder] = notification.useNotification();

  const form1 = useForm({
    resolver: yupResolver(schema),
  });
  const form2 = useForm({
    resolver: yupResolver(schema2),
  });
  const [changeChacked, setChangeChacked] = useState(false);

  const [fileList, setFileList] = useState([]);

  useQuery({
    queryKey: ["get-settings-info"],
    queryFn: () => getUserName(),
    select: (res) => res?.data,
    onSuccess: (response) => {
      form1.reset(response);
      setFileList([{ url: response?.photo }]);
    },
  });

  console.log(fileList, "file-list");

  const { mutate: userNameMutate, isLoading } = useMutation(
    (data) => updateUserName(data),
    {
      onSuccess: () => {
        api.success({
          message: "Success",
          description: "Muvaffaqiyatli yangilandi",
        });
        window.location.reload();
      },
      onError: () => {
        api["error"]({
          message: "Error",
          description: "Nimadur xatolik yuz berdi!",
        });
      },
    }
  );
  const { mutate: userPasswordMutate } = useMutation(
    (data) => updatePassword(data),
    {
      onSuccess: () => {
        api.success({
          message: "Success",
          description: "Muvaffaqiyatli yangilandi",
        });
      },
      onError: () => {
        api["error"]({
          message: "Error",
          description: "Nimadur xatolik yuz berdi!",
        });
      },
    }
  );
  const onSubmitInfo = (data) => {
    const formData = new FormData();
    formData.append("firstname", data.firstname);
    if (fileList && fileList[0]?.originFileObj !== undefined) {
      fileList.forEach((v) => formData.append("photo", v.originFileObj));
    }
    userNameMutate(formData);
  };
  const onSubmitPassword = (data) => {
    userPasswordMutate(data);
  };
  return {
    form1,
    form2,
    fileList,
    isLoading,
    setFileList,
    onSubmitInfo,
    changeChacked,
    setChangeChacked,
    onSubmitPassword,
    contextHolder,
  };
};
