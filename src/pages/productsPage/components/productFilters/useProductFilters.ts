import { useState, useReducer } from 'react';
import { useDispatch } from 'react-redux';

import { fetchProducts } from '../../../../redux/products/productsActions';
import { Brand } from '../../../../redux/brands/types';
import { Category } from '../../../../redux/categories/types';

interface FilterState {
  searchQuery: string;
  category: string;
  brand: string;
}

export interface AppliedFilters {
  searchQuery?: string;
  category?: string;
  brand?: string;
}

interface FilterInput {
  label: string;
  fieldId: string;
  value: string;
  placeholder?: string;
  dropdown?: boolean;
  dropdownItems?: Brand[] | Category[];
}

const initialState = {
  searchQuery: '',
  category: '',
  brand: ''
};

export default (
  brands: Brand[],
  categories: Category[],
  setPage: (page: number) => void
) => {
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState<
    null | Element | ((element: Element) => Element)
  >(null);
  const [filterInputs, setFilterInputs] = useReducer(
    (state: FilterState, newState: FilterState) => ({ ...state, ...newState }),
    initialState
  );
  const [appliedFilters, setAppliedFilters] = useState<AppliedFilters>({});

  // Popup state handlers
  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  // Input change handler function
  const handleInputChange = ({
    target: { value, name }
  }: React.ChangeEvent<HTMLInputElement>) => {
    const fieldName = name;
    const newValue = value;
    setFilterInputs({ ...filterInputs, [fieldName]: newValue });
  };

  // Filter functionality handlers
  const handleApplyFilterClick = (page: number, rowsPerPage: number) => {
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

    handleClose();
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

  const clearAllFilters = (page: number, rowsPerPage: number) => {
    setAppliedFilters({});
    setPage(1);
    setFilterInputs(initialState);
    dispatch(fetchProducts(page, rowsPerPage));
  };

  const cancelClick = () => {
    handleClose();
    setTimeout(() => {
      setAppliedFilters({});
      setFilterInputs(initialState);
    }, 1000);
  };

  // Mappable filter input fields
  const filterInputFields: FilterInput[] = [
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
    anchorEl,
    filterInputs,
    setFilterInputs,
    handleClick,
    handleClose,
    open,
    appliedFilters,
    cancelClick,
    clearAllFilters,
    handleInputChange,
    filterInputFields,
    handleApplyFilterClick,
    handleDelete
  };
};
