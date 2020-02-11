import { useState } from 'react';
import { useDispatch } from 'react-redux';

export default () => {
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

  const onDateSelectClick = () => {
    // dispatch(fetchSales(page, rowsPerPage, startDate, endDate));
    handleClose();
  };

  const onClearFiltersClick = () => {
    handleStartDateChange(null);
    handleEndDateChange(null);
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
    onDateSelectClick,
    onClearFiltersClick
  };
};
