import { useState } from 'react';

import { UseTableStateProps } from './types';

export default ({
  tableType,
  fetchSales,
  fetchProducts,
  rowsPerPage,
  setRowsPerPage,
  setPage
}: UseTableStateProps) => {
  const [expandedRows, setExpandedRows] = useState<{
    [id: string]: boolean | undefined;
  }>({});

  const toggleExpanded = (id: number): void => {
    setExpandedRows({ ...expandedRows, [id]: !expandedRows[id] });
  };

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    newPage: number
  ) => {
    //To adapt 0-based page of MUI pagination component 1 is added whilst 1 is subtracted for page prop
    if (newPage + 1 < 0) return;
    setPage(newPage + 1);
    tableType === 'sales'
      ? fetchSales(newPage + 1, rowsPerPage)
      : fetchProducts(newPage + 1, rowsPerPage);
  };

  const handleChangeRowsPerPage = ({
    target: { value }
  }: React.ChangeEvent<HTMLInputElement>) => {
    const numValue = parseInt(value);
    setRowsPerPage(numValue);
    tableType === 'sales'
      ? fetchSales(1, numValue)
      : fetchProducts(1, numValue);
  };

  return {
    handleChangePage,
    handleChangeRowsPerPage,
    toggleExpanded,
    expandedRows
  };
};
