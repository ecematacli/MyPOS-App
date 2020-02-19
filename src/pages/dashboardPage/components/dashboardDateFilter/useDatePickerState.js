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

    const formatType = 'd MMM yyyy';
    const formattedStartDate = startDate && formatDate(startDate, formatType);
    const formattedEndDate = endDate && formatDate(endDate, formatType);
    const today = formatDate(new Date(), formatType);

    let inputValue = '';

    if (startDate && endDate) {
      inputValue = `${formattedStartDate} - ${formattedEndDate}`;
    }
    if (startDate && !endDate) {
      inputValue = `${formattedStartDate} - ${today}`;
    }
    if (endDate && !startDate) {
      inputValue = `\u221E - ${formattedEndDate}`;
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
