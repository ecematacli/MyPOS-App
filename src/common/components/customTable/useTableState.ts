import { useState, MouseEvent } from 'react';

import { StateProps } from './types';

export default ({
  tableType,
  fetchSales,
  rowsPerPage,
  setRowsPerPage,
  fetchProducts,
  setPage
}: StateProps) => {
  const [expandedRows, setExpandedRows] = useState<{
    [id: number]: boolean | undefined;
  }>({});

  const toggleExpanded = (id: number): void => {
    setExpandedRows({ ...expandedRows, [id]: !expandedRows[id] });
  };

  const handleChangePage = (
    event: MouseEvent<HTMLButtonElement, MouseEvent<Element, MouseEvent>>,
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
    console.log('VAGUE VALUE', value);
    setRowsPerPage(value);
    tableType === 'sales' ? fetchSales(1, value) : fetchProducts(1, value);
  };

  return {
    handleChangePage,
    handleChangeRowsPerPage,
    toggleExpanded,
    expandedRows
  };
};
