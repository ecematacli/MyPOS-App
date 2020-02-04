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
    if (newPage < 0) return;
    setPage(newPage);
    tableType === 'sales'
      ? fetchSales(newPage, rowsPerPage)
      : fetchProducts(newPage, rowsPerPage);
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
