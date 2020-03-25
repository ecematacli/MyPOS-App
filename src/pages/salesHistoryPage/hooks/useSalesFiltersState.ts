import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { fetchSales } from '../../../redux/sales/salesActions';

export default (rowsPerPage: number, setPage: (page: number) => void) => {
  const dispatch = useDispatch();
  const [startDate, handleStartDateChange] = useState<Date | null>(null);
  const [endDate, handleEndDateChange] = useState<Date | null>(null);

  const onDateSelection = () => {
    setPage(1);
    dispatch(fetchSales(1, rowsPerPage, startDate, endDate));
  };

  const onDateFilterClearing = () => {
    setPage(1);
    handleStartDateChange(null);
    handleEndDateChange(null);
    dispatch(fetchSales(1, rowsPerPage, null, null));
  };

  return {
    startDate,
    handleStartDateChange,
    endDate,
    handleEndDateChange,
    onDateSelection,
    onDateFilterClearing
  };
};
