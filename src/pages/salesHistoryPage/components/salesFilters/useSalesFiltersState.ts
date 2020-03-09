import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { fetchSales } from '../../../../redux/sales/salesActions';

export default (page: number, rowsPerPage: number) => {
  const dispatch = useDispatch();
  const [startDate, handleStartDateChange] = useState<Date | null>(null);
  const [endDate, handleEndDateChange] = useState<Date | null>(null);
  const [anchorEl, setAnchorEl] = useState<
    null | Element | ((element: Element) => Element)
  >(null);

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
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

  const open: boolean = Boolean(anchorEl);

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
