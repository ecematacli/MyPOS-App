import { useState, useReducer } from 'react';
import { Brand } from '../../../redux/brands/types';
import { Category } from '../../../redux/categories/types';

import api from '../../../api';
import { findMatchedFields } from '../../../common/utils';

export interface Filters {
  category: string;
  brand: string;
}

const initialState = {
  category: '',
  brand: ''
};

export default (brands: Brand[], categories: Category[]) => {
  const [startDate, handleStartDateChange] = useState<Date | null>(null);
  const [countName, setCountName] = useState('');
  const [dropdownInputs, setDropdownInputs] = useReducer(
    (state: Filters, newState: Filters) => ({
      ...state,
      ...newState
    }),
    initialState
  );

  // Start Date and Count Name input handlers
  const handleDropdownInputChange = ({
    target: { value, name }
  }: React.ChangeEvent<HTMLInputElement>) => {
    const fieldName = name;
    const newValue = value;

    setDropdownInputs({ ...dropdownInputs, [fieldName]: newValue });
  };

  const handleCountNameChange = ({
    target: { value }
  }: React.ChangeEvent<HTMLInputElement>) => {
    setCountName(value);
  };

  const createCountBatches = async () => {};

  //Dropdown Input fields for MU Select component
  const DROPDOWN_INPUT_FIELDS = [
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

  return {
    startDate,
    handleStartDateChange,
    countName,
    dropdownInputs,
    handleCountNameChange,
    handleDropdownInputChange,
    createCountBatches,
    DROPDOWN_INPUT_FIELDS
  };
};
