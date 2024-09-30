import * as yup from "yup";

export const formSchema = yup.object().shape({
  reason: yup.string().required("Ushbu maydon to`ldirilishi shart!"),
  amount: yup.string().nullable().required("Ushbu maydon to`ldirilishi shart!"),
});
