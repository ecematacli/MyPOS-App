import { Brand } from '../../../../redux/brands/types';
import { Category } from '../../../../redux/categories/types';

interface DropdownItem {
  name: string;
  id: string;
}
interface ProductField {
  label: string;
  fieldId: string;
  type?: string;
  currency?: boolean;
  dropdown?: boolean;
  dropdownItems?: DropdownItem[];
}

export const getProductFields = (
  brands: Brand[],
  categories: Category[]
): ProductField[] => [
  { label: 'Barcode', fieldId: 'barcode' },
  { label: 'Product Name', fieldId: 'name' },
  { label: 'Quantity', fieldId: 'qty', type: 'number' },
  { label: 'Price', fieldId: 'price', currency: true },
  {
    label: 'Discounted Price',
    fieldId: 'discountPrice',
    currency: true,
  },
  { label: 'Variation', fieldId: 'variation' },
  {
    label: 'Tax Rate',
    fieldId: 'taxRate',
    dropdown: true,
    dropdownItems: [
      { id: "1", name: '8' },
      { id: "2", name: '18' },
    ],
  },
  { label: 'Sku', fieldId: 'sku' },
  {
    label: 'Brand Name',
    fieldId: 'brand',
    dropdown: true,
    dropdownItems: brands,
  },
  {
    label: 'Category Name',
    fieldId: 'category',
    dropdown: true,
    dropdownItems: categories,
  },
];
