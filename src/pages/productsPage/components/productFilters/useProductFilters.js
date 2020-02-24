import { useState, useReducer } from 'react';
import { useDispatch } from 'react-redux';

import { fetchProducts } from '../../../../redux/products/productsActions';

const initialState = {
  searchQuery: '',
  category: '',
  brand: ''
};

export default (brands, categories) => {
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);
  const [filterInputs, setFilterInputs] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    initialState
  );
  const [appliedFilters, setAppliedFilters] = useState({});

  // Popup state handlers
  const handleClick = e => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  // Input change handler function
  const handleInputChange = ({ target: { value, name } }) => {
    const fieldName = name;
    const newValue = value;
    setFilterInputs({ [fieldName]: newValue });
  };

  // Filter functionality handlers
  const handleApplyFilterClick = (page, rowsPerPage) => {
    setAppliedFilters(filterInputs);

    dispatch(
      fetchProducts(
        page,
        rowsPerPage,
        filterInputs.category,
        filterInputs.brand,
        filterInputs.searchQuery
      )
    );

    handleClose();
  };

  const handleDelete = key => {
    const { [key]: toBeRemoved, ...otherKeys } = appliedFilters;
    setAppliedFilters(otherKeys);
    setFilterInputs({ ...filterInputs, [key]: '' });
  };

  const clearAllFilters = (page, rowsPerPage) => {
    setAppliedFilters({});
    setFilterInputs(initialState);
    dispatch(fetchProducts(page, rowsPerPage));
    localStorage.removeItem('productFilters');
  };

  const cancelClick = () => {
    handleClose();
    setTimeout(() => {
      setAppliedFilters({});
      setFilterInputs(initialState);
    }, 1000);
  };

  // Mappable filter input fields
  const filterInputFields = [
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
