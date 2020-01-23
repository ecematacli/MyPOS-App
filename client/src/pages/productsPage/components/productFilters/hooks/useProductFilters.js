import { useState } from 'react';

export default () => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = e => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  const filterInputFields = [
    {
      label: 'Product Name',
      fieldId: 'name'
    },
    {
      label: 'Category',
      fieldId: 'category',
      dropdown: true,
      dropdownItems: ['Tennis shoe', 'Tennis racket']
    },
    {
      label: 'Brand',
      fieldId: 'brand',
      dropdown: true,
      dropdownItems: ['Nike', 'Adidas', 'Wilson']
    }
  ];

  return {
    anchorEl,
    handleClick,
    handleClose,
    open,
    filterInputFields
  };
};
