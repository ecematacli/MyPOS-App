import * as Yup from 'yup';

export const ProductAddSchema = Yup.object().shape({
  barcode: Yup.string()
    .matches(/^[0-9]*$/, 'Barcode can only consist of numbers')
    .min(8, 'Too Short!')
    .max(16, 'Too Long!')
    .required('This field is required'),
  price: Yup.string()
    .required('This field is required')
    .matches(/^\d+(.\d{1,2})?$/, 'Please enter a valid price'),
  discountPrice: Yup.string().matches(
    /^\d+(.\d{1,2})?$/,
    'Please enter a valid discount'
  )
});
