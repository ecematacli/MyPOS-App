import { ProductField, AdditionalInputField, AdditionalInputs } from './types'
import { Category } from '../../../../redux/categories/types'
import { Brand } from '../../../../redux/brands/types'

export const NEW_PRODUCT_FIELDS: ProductField[] = [
  {
    label: 'Barkod (zorunlu)*',
    fieldId: 'barcode',
    required: true,
  },
  { label: 'Ürün adı', fieldId: 'name' },
  {
    label: 'Miktar',
    fieldId: 'qty',
    type: 'number',
  },
  {
    label: 'Fiyat (zorunlu)*',
    fieldId: 'price',
    currency: true,
    required: true,
  },
  {
    label: 'İndirimli Fiyat',
    fieldId: 'discountPrice',
  },
  { label: 'Çeşit', fieldId: 'variation' },

  { label: 'Sku', fieldId: 'sku' },
]

export const getAdditionalProductFields = (
  additionalInputs: AdditionalInputs,
  brands: Brand[],
  categories: Category[]
): AdditionalInputField[] => [
  {
    label: 'Tax Rate',
    fieldId: 'taxRate',
    dropdown: true,
    dropdownItems: [
      { id: 1, name: '18' },
      { id: 2, name: '8' },
    ],
    value: additionalInputs.taxRate,
    additionalField: true,
    type: 'number',
  },
  {
    label: 'Brand Name',
    fieldId: 'brand',
    dropdown: true,
    dropdownItems: brands,
    value: additionalInputs.brand,
    additionalField: true,
  },
  {
    label: 'Category Name',
    fieldId: 'category',
    dropdown: true,
    dropdownItems: categories,
    value: additionalInputs.category,
    additionalField: true,
  },
]
