import * as yup from 'yup';

export const formSchema = yup.object().shape({

  url: yup
    .string()
    .nullable()
    .required('Ushbu maydon to`ldirilishi shart!'),
  // title_uz: yup
  //   .string()
  //   .nullable()
  //   .required('Ushbu maydon to`ldirilishi shart!'),
  // title_ru: yup
  //   .string()
  //   .nullable()
  //   .required('Ushbu maydon to`ldirilishi shart!'),
});
