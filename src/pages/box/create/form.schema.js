import * as yup from 'yup';

export const formSchema = yup.object().shape({
  price: yup.string().nullable().required('Ushbu maydon to`ldirilishi shart!'),
});
