import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { fetchSales } from '../../../../redux/sales/salesActions';

export default (page, rowsPerPage) => {
  const dispatch = useDispatch();
  const [startDate, handleStartDateChange] = useState(new Date());
  const [endDate, handleEndDateChange] = useState(new Date());
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = e => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  const onDateSelect = () => {
    dispatch(fetchSales(page, rowsPerPage, startDate, endDate));
  };

  return {
    startDate,
    handleStartDateChange,
    endDate,
    handleEndDateChange,
    open,
    anchorEl,
    handleClick,
    handleClose,
    onDateSelect
  };
};
