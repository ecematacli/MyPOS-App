import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { fetchSales } from '../../../../redux/sales/salesActions';

export default (page, rowsPerPage) => {
  const dispatch = useDispatch();
  const [startDate, handleStartDateChange] = useState(null);
  const [endDate, handleEndDateChange] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = e => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const onDateSelection = () => {
    dispatch(fetchSales(page, rowsPerPage, startDate, endDate));
    handleClose();
  };

  const onDateFilterClearing = () => {
    handleStartDateChange(null);
    handleEndDateChange(null);
    dispatch(fetchSales(page, rowsPerPage, null, null));
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
    onDateSelection,
    onDateFilterClearing
  };
};
