import { useState, useReducer } from 'react';
import { dropdownItemsFormatter } from '../../../../common/utils';

export default (brands, categories) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [filterInputs, setFilterInputs] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      searchQuery: '',
      category: '',
      brand: ''
    }
  );

  const handleClick = e => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
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

  const handleInputChange = ({ target: { value, name } }) => {
    const fieldName = name;
    const newValue = value;
    setFilterInputs({ [fieldName]: newValue });
  };

  return {
    anchorEl,
    filterInputs,
    setFilterInputs,
    handleClick,
    handleClose,
    open,
    handleInputChange,
    filterInputFields
  };
};
