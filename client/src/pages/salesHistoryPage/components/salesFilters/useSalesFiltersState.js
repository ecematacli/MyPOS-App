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

  const handleClose = (e, reason) => {
    if (reason !== 'backdropClick') {
      setAnchorEl(null);
    }
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
