import * as yup from "yup";

const phoneRegex =
  /^\+998([- ])?(88|90|91|93|94|95|98|99|33|97|71|78|65)([- ])?(\d{3})([- ])?(\d{2})([- ])?(\d{2})$/;

export const formSchema = yup.object().shape({
  firstname: yup
    .string()
    .nullable()
    .required("Ushbu maydon to`ldirilishi shart!"),
  phone: yup
    .string()
    .nullable()
    .matches(phoneRegex, "Phone number is not valid")
    .required("Ushbu maydon to`ldirilishi shart!"),
  password: yup
    .string()
    .nullable()
    .min(8)
    .required("Ushbu maydon to`ldirilishi shart!"),
  password2: yup
    .string()
    .oneOf([yup.ref("password")], "Parollar mos emas!")
    .min(8)
    .required("Ushbu maydon to`ldirilshi shart!"),
  // salary: yup.string().when("salary", {
  //   is: true,
  //   then: yup
  //     .string()
  //     .trim()
  //     .required("Bu maydon yopiq iken, uni to`ldirilishi shart!"),
  //   otherwise: yup.string().trim().notRequired(),
  // }),
  salary: yup.string().trim("").nullable().notRequired(),
  // notrequiredsalary: yup.string().trim().nullable().notRequired(),
});
