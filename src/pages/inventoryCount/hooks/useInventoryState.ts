import { useState, useReducer } from 'react';
import { Brand } from '../../../redux/brands/types';
import { Category } from '../../../redux/categories/types';

import api from '../../../api';
import { BatchData } from '../types';
import { findMatchedFields } from '../../../common/utils';
import useAsyncError from '../../../common/hooks/useAsyncError';
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
  const [loading, setLoading] = useState(false);
  const [startDate, handleStartDateChange] = useState<Date | null>(null);
  const [countName, setCountName] = useState('');
  const [dropdownInputs, setDropdownInputs] = useReducer(
    (state: Filters, newState: Filters) => ({
      ...state,
      ...newState
    }),
    initialState
  );
  const [batches, setBatches] = useState<BatchData>({ count: 0, batches: [] });
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [status, setStatus] = useState('opened');

  const throwError = useAsyncError();

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

  // API Call helpers being used by all functions
  const makeApiCall = async (url: string, method: string = 'get') => {
    try {
      setLoading(true);
      const response = await api[method](url);
      return response.data;
      setLoading(false);
    } catch (e) {
      setLoading(false);
      throwError(e);
    }
  };

  //API Requests
  const fetchCountBatches = async () => {
    const url = `/inventory-count?page=${page}&rowsPerPage=${rowsPerPage}&status=${status}`;

    const data: BatchData = await makeApiCall(url);
    setBatches(data);
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
    page,
    setPage,
    rowsPerPage,
    setRowsPerPage,
    DROPDOWN_INPUT_FIELDS
  };
};
