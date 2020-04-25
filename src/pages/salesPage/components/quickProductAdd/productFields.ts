import { ProductField, AdditionalInputField, AdditionalInputs } from './types';
import { Category } from '../../../../redux/categories/types';
import { Brand } from '../../../../redux/brands/types';

export const NEW_PRODUCT_FIELDS: ProductField[] = [
  {
    label: 'Barcode (required)*',
    fieldId: 'barcode',
    required: true,
  },
  { label: 'Product Name', fieldId: 'name' },
  {
    label: 'Quantity',
    fieldId: 'qty',
    type: 'number',
  },
  {
    label: 'Price (required*)',
    fieldId: 'price',
    currency: true,
    required: true,
  },
  {
    label: 'Discounted Price',
    fieldId: 'discountPrice',
  },
  { label: 'Variation', fieldId: 'variation' },

  { label: 'Sku', fieldId: 'sku' },
];

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
];
