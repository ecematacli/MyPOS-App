import { useState, useReducer, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { dropdownItemsFormatter } from '../../../../common/utils';
import { fetchProducts } from '../../../../redux/products/productsActions';

export default (brands, categories) => {
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);
  const [chipInputs, setChipInputs] = useState([]);
  const [filterInputs, setFilterInputs] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      searchQuery: '',
      category: '',
      brand: ''
    }
  );

  useEffect(() => {
    if (filterInputs.category) {
      handleChipInput('category', 'Category');
    }

    if (filterInputs.brand) {
      handleChipInput('brand', 'Brand');
    }
  }, [filterInputs.category, filterInputs.brand]);

  const handleDelete = id => {
    setChipInputs(chipInputs.filter(n => n.id !== id));
    setFilterInputs({ ...filterInputs, category: '', brand: '' });
  };

  const handleChipInput = (inputName, label) =>
    setChipInputs([
      ...chipInputs,
      { id: Math.random(), label: `${label}: ${filterInputs[inputName]}` }
    ]);

  const handleClick = e => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = (e, reason) => {
    if (reason !== 'backdropClick') {
      setAnchorEl(null);
    }
  };
  const handleInputChange = ({ target: { value, name } }) => {
    const fieldName = name;
    const newValue = value;
    setFilterInputs({ [fieldName]: newValue });
  };

  const handleApplyFilterClick = (page, rowsPerPage) => {
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

  const open = Boolean(anchorEl);

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
      dropdownItems: dropdownItemsFormatter(categories),
      value: filterInputs.category
    },
    {
      label: 'Brand',
      fieldId: 'brand',
      dropdown: true,
      dropdownItems: dropdownItemsFormatter(brands),
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
    handleInputChange,
    filterInputFields,
    chipInputs,
    handleDelete,
    handleApplyFilterClick
  };
};
