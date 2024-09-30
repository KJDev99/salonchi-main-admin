import * as yup from "yup";

export const formSchemaAdd = yup.object().shape({
  name_uz: yup
    .string()
    .nullable()
    .required("Ushbu maydon to`ldirilishi shart!"),
  name_ru: yup
    .string()
    .nullable()
    .required("Ushbu maydon to`ldirilishi shart!"),
  desc_uz: yup
    .string()
    .nullable()
    .notRequired("Ushbu maydon to`ldirilishi shart!"),
  desc_ru: yup
    .string()
    .nullable()
    .notRequired("Ushbu maydon to`ldirilishi shart!"),

  sale_time: yup
    .string()
    .nullable()
    .notRequired("Ushbu maydon to`ldirilishi shart!"),
  color: yup
    .array()
    .nullable()
    .notRequired("Ushbu maydon to`ldirilishi shart!"),
  count: yup
    .string()
    .nullable()
    .notRequired("Ushbu maydon to`ldirilishi shart!"),
  category: yup
    .string()
    .nullable()
    .required("Ushbu maydon to`ldirilishi shart!"),

  is_flow: yup
    .string()
    .nullable()
    .required("Ushbu maydon to`ldirilishi shart!"),
  wholesale_price: yup
    .string()
    .nullable()
    .required("Ushbu maydon to`ldirilishi shart!"),
  // size: yup.string().nullable().required("Ushbu maydon to`ldirilishi shart!"),
});

export const formSchema = yup.object().shape({
  name_uz: yup
    .string()
    .nullable()
    .required("Ushbu maydon to`ldirilishi shart!"),
  name_ru: yup
    .string()
    .nullable()
    .required("Ushbu maydon to`ldirilishi shart!"),
  desc_uz: yup
    .string()
    .nullable()
    .notRequired("Ushbu maydon to`ldirilishi shart!"),
  desc_ru: yup
    .string()
    .nullable()
    .notRequired("Ushbu maydon to`ldirilishi shart!"),
  // price: yup.string().nullable().required('Ushbu maydon to`ldirilishi shart!'),
  // sale_price: yup
  //   .string()
  //   .nullable()
  //   .notRequired("Ushbu maydon to`ldirilishi shart!"),
  sale_time: yup
    .string()
    .nullable()
    .notRequired("Ushbu maydon to`ldirilishi shart!"),
  product_color: yup
    .array()
    .nullable()
    .notRequired("Ushbu maydon to`ldirilishi shart!"),
  count: yup
    .string()
    .nullable()
    .notRequired("Ushbu maydon to`ldirilishi shart!"),
  category: yup
    .string()
    .nullable()
    .required("Ushbu maydon to`ldirilishi shart!"),
});
