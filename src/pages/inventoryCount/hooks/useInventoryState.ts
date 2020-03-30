import { useState, useReducer } from 'react';
import { Brand } from '../../../redux/brands/types';
import { Category } from '../../../redux/categories/types';

import api from '../../../api';
import { BatchData } from '../types';
import { findMatchedFields } from '../../../common/utils';
import history from '../../../history';

export interface Filters {
  category: string;
  brand: string;
}

const initialState = {
  category: '',
  brand: ''
};
//name, brandId, categoryId,
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
  const [batches, setBatches] = useState<BatchData | {}>({});

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

  //API Requests
  const fetchCountBatches = async () => {
    const response = await api.get('/inventory-count');
  };

  const createCountBatches = async () => {
    const { category, brand } = dropdownInputs;
    let categoryId: number;
    let brandId: number;

    if (brand) {
      categoryId = findMatchedFields(brands, dropdownInputs.brand).id;
    }
    if (category) {
      brandId = findMatchedFields(categories, dropdownInputs.category).id;
    }
    const response = await api.post('/inventory-count', {
      name: countName,
      categoryId,
      brandId
    });

    history.push('/inventory/count/1');
  };

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
    fetchCountBatches,
    batches,
    DROPDOWN_INPUT_FIELDS
  };
};
