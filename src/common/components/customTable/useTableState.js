import { useState } from 'react';

export default ({
  tableType,
  fetchSales,
  rowsPerPage,
  setRowsPerPage,
  fetchProducts,
  setPage
}) => {
  const [expandedRows, setExpandedRows] = useState({});

  const toggleExpanded = id => {
    setExpandedRows({ ...expandedRows, [id]: !expandedRows[id] });
  };

  const handleChangePage = (e, newPage) => {
    //To adapt 0-based page of MUI pagination component 1 is added whilst 1 is subtracted for page prop
    if (newPage + 1 < 0) return;
    setPage(newPage + 1);
    tableType === 'sales'
      ? fetchSales(newPage + 1, rowsPerPage)
      : fetchProducts(newPage + 1, rowsPerPage);
  };

  const handleChangeRowsPerPage = ({ target: { value } }) => {
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
