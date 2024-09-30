import { phoneRegex } from "@/utils/pattern";
import * as yup from "yup";

export const schema = yup.object().shape({
  firstname: yup
    .string()
    .nullable()
    .required("Ushbu maydon to`ldirilishi shart!"),
  phone: yup
    .string()
    .nullable()
    .matches(phoneRegex, "Phone number is not valid")
    .notRequired(),
});

export const schema2 = yup.object().shape({
  old_password: yup
    .string()
    .nullable()
    .required("Ushbu maydon to`ldirilishi shart!"),
  new_password: yup
    .string()
    .nullable()
    .required("Ushbu maydon to`ldirilishi shart!"),
  confirm_password: yup
    .string()
    .oneOf([yup.ref("new_password")], "Parollar mos emas!")
    .min(8)
    .required("Ushbu maydon to`ldirilishi shart!"),
});
