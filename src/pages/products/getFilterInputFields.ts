import { Brand } from '../../redux/brands/types';
import { Category } from '../../redux/categories/types';

export interface FilterInputField {
  label: string;
  fieldId: string;
  value: string;
  placeholder?: string;
  dropdown?: boolean;
  dropdownItems?: Brand[] | Category[];
}

interface FilterInputs {
  searchQuery: string;
  category: string;
  brand: string;
}

export const getFilterInputFields = (
  brands: Brand[],
  categories: Category[],
  filterInputs: FilterInputs
): FilterInputField[] => [
  {
    label: 'Search Query',
    fieldId: 'searchQuery',
    placeholder: 'Search by name, sku or barcode',
    value: filterInputs.searchQuery
  },
  {
    label: 'Category',
    fieldId: 'category',
    dropdown: true,
    dropdownItems: categories,
    value: filterInputs.category
  },
  {
    label: 'Brand',
    fieldId: 'brand',
    dropdown: true,
    dropdownItems: brands,
    value: filterInputs.brand
  }
];
