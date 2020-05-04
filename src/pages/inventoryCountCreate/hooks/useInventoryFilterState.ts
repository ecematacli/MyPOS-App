import { useState, useReducer } from 'react';

import api from '../../../api';
import history from '../../../history';
import { findMatchedFields } from '../../../common/utils';
import { Brand } from '../../../redux/brands/types';
import { Category } from '../../../redux/categories/types';

export interface Filters {
  category: string;
  brand: string;
}

interface Batch {
  id: number;
  status: string;
  started: string;
  finished: string | null;
  name: string;
  category: string;
  brand: string;
}

export default (brands: Brand[], categories: Category[]) => {
  const initialState = {
    category: '',
    brand: '',
  };

  const [startDate, handleStartDateChange] = useState<Date | null>(new Date());
  const [countName, setCountName] = useState('');
  const [dropdownInputs, setDropdownInputs] = useReducer(
    (state: Filters, newState: Filters) => ({
      ...state,
      ...newState,
    }),
    initialState
  );

  const handleDropdownInputChange = ({
    target: { value, name },
  }: React.ChangeEvent<HTMLInputElement>) => {
    const fieldName = name;
    const newValue = value;

    setDropdownInputs({ ...dropdownInputs, [fieldName]: newValue });
  };

  const handleCountNameChange = ({
    target: { value },
  }: React.ChangeEvent<HTMLInputElement>) => {
    setCountName(value);
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
      brandId,
    });

    const data: Batch = response.data;

    history.push(`/inventory/count/${data.id}`);
  };

  return {
    startDate,
    handleStartDateChange,
    countName,
    handleCountNameChange,
    handleDropdownInputChange,
    dropdownInputs,
    createCountBatches,
  };
};
