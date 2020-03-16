import { useState } from 'react';
import { Brand } from '../../../../redux/brands/types';
import { Category } from '../../../../redux/categories/types';

export default (brands: Brand[], categories: Category[]) => {
  const [startDate, handleStartDateChange] = useState<Date | null>(null);

  const FILTER_INPUT_FIELDS = [
    {
      label: 'Count Name',
      fieldId: 'searchQuery',
      placeholder: 'Search by name, sku or barcode',
      value: 'x'
    },
    {
      label: 'Category',
      fieldId: 'category',
      dropdown: true,
      dropdownItems: categories,
      value: 'y'
    },
    {
      label: 'Brand',
      fieldId: 'brand',
      dropdown: true,
      dropdownItems: brands,
      value: 'z'
    }
  ];

  return {
    startDate,
    handleStartDateChange
  };
};
