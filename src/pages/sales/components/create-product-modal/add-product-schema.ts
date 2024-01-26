import * as Yup from 'yup'

export const ProductAddSchema = Yup.object().shape({
  barcode: Yup.string()
    .matches(/^[0-9]*$/, 'Barkod sadece sayılardan oluşabilir')
    .min(8, 'Çok kısa!')
    .max(16, 'Çok uzun!')
    .required('Bu alan zorunludur'),
  price: Yup.string()
    .required('Bu alan zorunludur.')
    .matches(/^\d+(.\d{1,2})?$/, 'Lütfen geçerli bir fiyat girin'),
  discountPrice: Yup.string().matches(
    /^\d+(.\d{1,2})?$/,
    'Lütfen geçerli bir indirimli fiyat girin'
  ),
})
