import * as yup from 'yup';

export const formSchema = yup.object().shape({
  name_uz: yup
    .string()
    .nullable()
    .required('Ushbu maydon to`ldirilishi shart!'),
  name_ru: yup
    .string()
    .nullable()
    .required('Ushbu maydon to`ldirilishi shart!'),
  parent: yup.string().nullable().notRequired(),
});
