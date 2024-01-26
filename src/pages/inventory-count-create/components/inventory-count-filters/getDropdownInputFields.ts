import { Brand } from '../../../../redux/brands/types';
import { Category } from '../../../../redux/categories/types';

interface DropdownInputs {
  category: string;
  brand: string;
}

export const getDropdownInputFields = (
  brands: Brand[],
  categories: Category[],
  dropdownInputs: DropdownInputs
) => [
  {
    label: 'Category',
    fieldId: 'category',
    value: dropdownInputs.category,
    dropdownItems: categories
  },
  {
    label: 'Brand',
    fieldId: 'brand',
    value: dropdownInputs.brand,
    dropdownItems: brands
  }
];
