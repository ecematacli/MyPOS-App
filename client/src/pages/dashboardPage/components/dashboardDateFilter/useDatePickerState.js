import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { formatDate } from '../../../../common/utils';

export default (
  startDate,
  handleStartDateChange,
  endDate,
  handleEndDateChange
) => {
  const dispatch = useDispatch();

  const [anchorEl, setAnchorEl] = useState(null);
  const [inputText, setInputText] = useState('');

  //Popover handlers
  const handleClick = e => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  //Date Picker filter handlers
  const onDateSelectClick = () => {
    const formattedStartDate = formatDate(startDate, 'd/M/y');
    const formattedEndDate = formatDate(endDate, 'd/M/y');

    if (startDate && endDate) {
      setInputText(`${formattedStartDate} - ${formattedEndDate}`);
    }
    if (startDate && !endDate) {
      setInputText(`${formattedStartDate} - ${formattedStartDate}`);
    }
    if (endDate && !startDate) {
      setInputText(`${formattedEndDate} - ${formattedEndDate}`);
    }

    // dispatch(fetchSales(page, rowsPerPage, startDate, endDate));
    handleClose();
  };

  const onClearFiltersClick = () => {
    handleStartDateChange(null);
    handleEndDateChange(null);
    setInputText('');
    // dispatch(fetchSales(page, rowsPerPage, null, null));
  };

  const open = Boolean(anchorEl);

  return {
    startDate,
    handleStartDateChange,
    endDate,
    handleEndDateChange,
    open,
    anchorEl,
    handleClick,
    handleClose,
    inputText,
    setInputText,
    onDateSelectClick,
    onClearFiltersClick
  };
};
