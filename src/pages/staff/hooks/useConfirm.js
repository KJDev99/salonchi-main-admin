import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { formSchema } from "../crud/form.schema";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createEmployee,
  updateEmployee,
  updateForEmployee,
} from "@/shared/modules/roles";
import { useNavigate, useParams } from "react-router-dom";
import { notification } from "antd";

export const useConfirm = () => {
  const [api, contextHolder] = notification.useNotification();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { id } = useParams();
  const form = useForm({
    resolver: yupResolver(formSchema),
  });
  const [value, setValue] = useState("Ishchi");

  const { mutate, isLoading } = useMutation(
    (data) => (id ? updateEmployee(id, data) : createEmployee(data)),
    {
      onSuccess: () => {
        api["success"]({
          message: "Success",
          description: "Hodim muvaffaqiyatli yaratildi",
        });
        queryClient.invalidateQueries({ queryKey: ["get-role-list"] });
        navigate("/admin/staff");
      },
      onError: (err) => {
        console.log(err, "errr");
        api["error"]({
          message: "Error",
          description:
            err?.response?.data?.phone && err?.response?.data?.phone[0],
        });
      },
    }
  );
  useQuery({
    queryKey: ["get-upsete-staff-detail"],
    queryFn: () => updateForEmployee(id),
    select: (res) => res?.data,
    onSuccess: (res) => {
      if (res?.is_worker) {
        setValue("Ishchi");
      } else setValue("Omborchi");
      return form.reset(res);
    },
    enabled: id ? true : false,
  });
  const confirm = (data) => {
    let payload = {
      firstname: data.firstname,
      phone: data?.phone.replaceAll(" ", ""),
      password: data.password,
      password2: data.password2,
      pbx_code: data?.pbx_code,
      is_worker: value === "Ishchi" ? true : false,
      is_stock: value === "Omborchi" ? true : false,
    };
    if (value === "Ishchi") {
      payload["salary"] = data.salary;
    }
    mutate(payload);
  };

  return {
    form,
    confirm,
    value,
    setValue,
    isLoading,
    contextHolder,
  };
};
