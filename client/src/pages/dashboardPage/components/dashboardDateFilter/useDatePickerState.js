import { useState } from 'react';

import { formatDate } from '../../../../common/utils';

export default appliedFilters => {
  const [anchorEl, setAnchorEl] = useState(null);

  //Popover handlers
  const handleClick = e => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  //Date Picker filter handlers
  const getDatePickerInputValue = () => {
    const { startDate, endDate } = appliedFilters;
    const formattedStartDate = startDate && formatDate(startDate, 'd MMM yyyy');
    const formattedEndDate = endDate && formatDate(endDate, 'd MMM yyyy');

    let inputValue = '';

    if (startDate && endDate) {
      inputValue = `${formattedStartDate} - ${formattedEndDate}`;
    }
    if (startDate && !endDate) {
      inputValue = `${formattedStartDate} - ${formattedStartDate}`;
    }
    if (endDate && !startDate) {
      inputValue = `${formattedEndDate} - ${formattedEndDate}`;
    }

    return inputValue;
  };

  return {
    getDatePickerInputValue,
    open,
    anchorEl,
    handleClick,
    handleClose
  };
};
