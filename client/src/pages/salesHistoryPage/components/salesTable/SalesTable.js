import React, { useState } from 'react';
import { format } from 'date-fns';
import clsx from 'clsx';
import {
  TableContainer,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TablePagination,
  Typography,
  Collapse,
  CircularProgress,
  TableSortLabel
} from '@material-ui/core';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

import styles from './styles';
import SaleDetails from '../saleDetails/SaleDetails';

const SalesTable = ({ tableHead, tableData, salesCount, fetchSales }) => {
  const classes = styles();
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [expandedRows, setExpandedRows] = useState({});
  const [direction, setDirection] = useState('asc');

  const handleChangePage = (e, newPage) => {
    if (newPage < 0) return;
    setPage(newPage);
    fetchSales(newPage, rowsPerPage);
  };

  const handleChangeRowsPerPage = e => {
    setRowsPerPage(e.target.value);
    fetchSales(1, e.target.value);
  };

  const handleDirectionChange = () => {
    const isDesc = direction === 'desc';
    setDirection(isDesc ? 'asc' : 'desc');
  };

  const toggleExpanded = id => {
    setExpandedRows({ ...expandedRows, [id]: !expandedRows[id] });
  };

  const displayedLabel = ({ from, count }) => {
    return `${from} of ${count}`;
  };

  const tableBody = () => {
    return tableData.map((sale, i) => {
      const formattedDate = format(new Date(sale.createdAt), ' d MMMM y - p');
      return (
        <React.Fragment key={sale.id}>
          <TableRow
            className={clsx(
              classes.tableBodyRow,
              classes[i % 2 ? 'whiteRow' : 'greenRow']
            )}
            onClick={() => toggleExpanded(sale.id)}
          >
            <TableCell className={classes.tableCell}>
              <div className={classes.dateCell}>
                <div className={classes.expandIconContainer}>
                  {expandedRows[sale.id] ? (
                    <ExpandLess className={classes.expandIcon} />
                  ) : (
                    <ExpandMore className={classes.expandIcon} />
                  )}
                </div>
                <div className={classes.dateContainer}>{formattedDate}</div>
              </div>
            </TableCell>
            <TableCell className={classes.tableCell}>Cash</TableCell>
            <TableCell className={classes.tableCell}>10</TableCell>
            <TableCell className={classes.tableCell}>&#x20BA;1000</TableCell>
          </TableRow>
          {expandedRows[sale.id] ? (
            <TableRow key={sale.id}>
              <TableCell padding={'none'} colSpan={12}>
                <Collapse
                  hidden={!expandedRows[sale.id]}
                  in={expandedRows[sale.id]}
                  timeout="auto"
                  unmountOnExit
                >
                  <SaleDetails
                    sale={sale}
                    rowIndex={i}
                    saleDate={formattedDate}
                  />
                </Collapse>
              </TableCell>
            </TableRow>
          ) : null}
        </React.Fragment>
      );
    });
  };

  if (!tableData) {
    return (
      <div>
        <div className={classes.progress}>
          <CircularProgress color="primary" />
        </div>
      </div>
    );
  }

  if (tableData.length === 0) {
    return (
      <div className={classes.noDisplay}>
        <Typography className={classes.displayMsg}>
          There is no sale to display
        </Typography>
      </div>
    );
  }
  return (
    <TableContainer>
      <div className={classes.tableContainer}>
        <Table stickyHeader className={classes.table}>
          {tableHead !== undefined ? (
            <TableHead>
              <TableRow className={classes.tableHeadRow}>
                {tableHead.map((head, i) => (
                  <TableCell key={i}>
                    {i === 0 ? (
                      <TableSortLabel
                        active={head.id}
                        direction={direction}
                        onClick={handleDirectionChange}
                      >
                        {head}
                      </TableSortLabel>
                    ) : (
                      <div>{head}</div>
                    )}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
          ) : null}
          <TableBody>{tableBody()}</TableBody>
        </Table>
      </div>
      <div className={classes.paginationContainer}>
        <TablePagination
          rowsPerPageOptions={[10, 25, 50]}
          component="div"
          count={salesCount}
          labelDisplayedRows={displayedLabel}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </div>
    </TableContainer>
  );
};

export default SalesTable;
