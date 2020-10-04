import { Brand } from '../../redux/brands/types';
import { Category } from '../../redux/categories/types';

export interface Filters {
  searchQuery: string;
  category: string;
  brand: string;
}

export interface AppliedFilters {
  searchQuery?: string;
  category?: string;
  brand?: string;
}

export interface FilterInput {
  label: string;
  fieldId: string;
  value: string;
  placeholder?: string;
  dropdown?: boolean;
  dropdownItems?: Brand[] | Category[];
}
