import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { formSchema, formSchemaAdd } from "../crud/form.schema";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createProducts, updateProducts } from "@/shared/modules/products";
import { useNavigate, useParams } from "react-router-dom";
import { getCategorySelect, getCategorySelectProduct, getColorsSelect } from "@/shared/modules/category";
// import dayjs from "dayjs";
import { REACT_QUERY_KEYS } from "@/constants/react-query-keys";
import { notification } from "antd";
import { boxList } from "@/shared/modules/box";
import { getUser } from "@/utils/user";

export const useConfirm = () => {
  const user = getUser();
  const is_stock = user?.is_stock;
  const [api, contextHolder] = notification.useNotification();
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const form = useForm({
    resolver: yupResolver(is_stock ? formSchemaAdd : formSchema),
    defaultValues: {
      old_price: null,
      is_recommend: false,
      is_new: false,
      is_cheap: false,
      is_flow: "yes",
      attributes: [{ key: "", value: [] }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "attributes",
  });

  const [fileList, setFileList] = useState([]);
  const [videoFile, setVideoFile] = useState(null);
  const [boxes, setBoxes] = useState([]);
  const [box, setBox] = useState([]);

  console.log("file",fileList,videoFile)
  const { data: categoryList = [] } = useQuery({
    queryKey: ["get-categories-list"],
    queryFn: () => getCategorySelectProduct(),
    select: (res) =>
      res?.data?.map((v) => {
        return {
          value: v?.id,
          label: v?.name_uz,
        };
      }),
  });
  const { data: colorList = [] } = useQuery({
    queryKey: ["get-colors-list"],
    queryFn: () => getColorsSelect(),
    select: (res) =>
      res?.data?.map((v) => {
        return {
          value: v?.id,
          label: v?.name,
        };
      }),
  });

  useQuery({
    queryKey: ["get-box-list"],
    queryFn: () => boxList({ page: 1, limit: 10 }),
    select: (res) => {
      return res?.data?.results?.map((v) => {
        return {
          value: v?.id,
          label: String(v?.price),
          emoji: v?.photo,
          selected: false,
        };
      });
    },
    onSuccess: (data) => setBoxes(data),
  });

  const handleValue = (id) => {
    if (boxes.filter((t) => t.value != id)) {
      setBox((prev) => [...new Set([...prev, id])]);
    } else {
      setBox((prev) => [...new Set([...prev])]);
    }
  };

  const { mutate, isLoading } = useMutation(
    (data) => (id ? updateProducts(id, data) : createProducts(data)),
    {
      onSuccess: () => {
        navigate("/admin/products");
        queryClient.invalidateQueries({
          queryKey: [REACT_QUERY_KEYS.GET_PRODUCT_LIST],
        });
        api.success({
          message: "Success",
          description: `Maxsulot muvaffaqiyatli ${
            id ? "yangilandi" : "yaratildi"
          }`,
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
  const confirm = (data) => {
    const formData = new FormData();

    formData.append("name_uz", data.name_uz);
    formData.append("name_ru", data.name_ru);
    formData.append("desc_uz", data.desc_uz);
    formData.append("desc_ru", data.desc_ru);
    formData.append("price", data.price);
    if (data.old_price !== null) formData.append("old_price", data.old_price);
    formData.append("is_active", true);
    formData.append("is_sale", true);
    formData.append("category", data.category);
    formData.append("attributes", JSON.stringify(data?.attributes));
    box.forEach((item) => formData.append("boxes", item));
    if (fileList && fileList[0]?.originFileObj !== undefined)
      fileList.forEach((v) => formData.append("media", v.originFileObj));
    if (data?.product_color) {
      data?.product_color?.forEach((item) => formData.append("colors", item));
    }
   if(videoFile?.lastModified !== undefined) formData.append("media", videoFile)
    if (is_stock) {
      formData.append("is_recommend", data.is_recommend);
      formData.append("is_new", data.is_new);
      formData.append("is_cheap", data.is_cheap);

      formData.append("is_flow", data.is_flow == "yes" ? true : false);
      formData.append("wholesale_price", data.wholesale_price);
      if (data.is_flow === "yes") {
        formData.append("flow_price", data.flow_price);
      }
    }
    mutate(formData);
    // console.log(data);
  };



  return {
    box,
    form,
    boxes,
    fields,
    append,
    remove,
    confirm,
    fileList,
    setFileList,
    isLoading,
    categoryList,
    colorList,
    handleValue,
    contextHolder,
    setVideoFile,
    videoFile
  };
};
