import { useState, useReducer } from 'react';
import { useDispatch } from 'react-redux';

import { Category } from '../../../redux/categories/types';
import { Brand } from '../../../redux/brands/types';
import { Filters, AppliedFilters, FilterInput } from '../types';
import { fetchProducts } from '../../../redux/products/productsActions';

const initialState = {
  searchQuery: '',
  category: '',
  brand: ''
};

export default (
  brands: Brand[],
  categories: Category[],
  setPage: (page: number) => void,
  page: number,
  rowsPerPage: number
) => {
  const dispatch = useDispatch();

  const [filterInputs, setFilterInputs] = useReducer(
    (state: Filters, newState: Filters) => ({
      ...state,
      ...newState
    }),
    initialState
  );
  const [appliedFilters, setAppliedFilters] = useState<AppliedFilters>({});

  // Input change handler function
  const handleInputChange = ({
    target: { value, name }
  }: React.ChangeEvent<HTMLInputElement>) => {
    const fieldName = name;
    const newValue = value;

    setFilterInputs({ ...filterInputs, [fieldName]: newValue });
  };

  // Filter functionality handlers
  const handleApplyFilterClick = () => {
    setTimeout(() => {
      setAppliedFilters(filterInputs);
    }, 1000);
    setPage(1);
    dispatch(
      fetchProducts(
        1,
        rowsPerPage,
        filterInputs.category,
        filterInputs.brand,
        filterInputs.searchQuery
      )
    );
  };

  const handleDelete = (key: string) => {
    const {
      [key as keyof AppliedFilters]: toBeRemoved,
      ...otherKeys
    } = appliedFilters;
    setAppliedFilters(otherKeys);
    setPage(1);
    setFilterInputs({ ...filterInputs, [key]: '' });
  };

  const clearAllFilters = () => {
    setAppliedFilters({});
    setPage(1);
    setFilterInputs(initialState);
    dispatch(fetchProducts(1, rowsPerPage));
  };

  const cancelClick = () => {
    setTimeout(() => {
      setAppliedFilters({});
      setFilterInputs(initialState);
    }, 1000);
  };

  // Mappable filter input fields
  const FILTER_INPUT_FIELDS: FilterInput[] = [
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

  return {
    filterInputs,
    appliedFilters,
    cancelClick,
    clearAllFilters,
    handleInputChange,
    FILTER_INPUT_FIELDS,
    handleApplyFilterClick,
    handleDelete
  };
};
