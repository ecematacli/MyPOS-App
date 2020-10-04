import { useState } from 'react';

export interface Args {
  rowsPerPage: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  fetchSales: (
    page: number,
    rowsPerPage: number,
    startDate?: Date,
    endDate?: Date
  ) => void;
}

export default ({ rowsPerPage, setPage, fetchSales }: Args) => {
  const [startDate, handleStartDateChange] = useState<Date | null>(null);
  const [endDate, handleEndDateChange] = useState<Date | null>(null);

  const onDateSelection = () => {
    setPage(1);
    fetchSales(1, rowsPerPage, startDate, endDate);
  };

  const onDateFilterClearing = () => {
    setPage(1);
    handleStartDateChange(null);
    handleEndDateChange(null);
    fetchSales(1, rowsPerPage, null, null);
  };

  return {
    startDate,
    handleStartDateChange,
    endDate,
    handleEndDateChange,
    onDateSelection,
    onDateFilterClearing,
  };
};
