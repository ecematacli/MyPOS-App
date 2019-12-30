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
  Collapse
} from '@material-ui/core';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

import styles from './styles';
import SaleDetails from '../saleDetails/SaleDetails';

const CustomTable = ({ tableHead, tableData, salesCount, fetchSales }) => {
  const classes = styles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [expandedRows, setExpandedRows] = useState({});

  const handleChangePage = (e, newPage) => {
    setPage(newPage);
    fetchSales(newPage, rowsPerPage);
  };

  const handleChangeRowsPerPage = e => {
    setRowsPerPage(e.target.value);
    setPage(1);
    fetchSales(page, e.target.value);
  };

  const isExpanded = id => {
    return expandedRows[id];
  };

  const toggleExpanded = id => {
    setExpandedRows({ ...expandedRows, [id]: !expandedRows[id] });
  };

  const displayedLabel = ({ from, count }) => {
    return `${from} of ${count}`;
  };

  return !tableData || tableData.length === 0 ? (
    <div className={classes.noDisplay}>
      <Typography className={classes.displayMsg}>
        There are no sales to display
      </Typography>
    </div>
  ) : (
    <TableContainer>
      <div className={classes.tableResponsive}>
        <Table className={classes.table}>
          {tableHead !== undefined ? (
            <TableHead>
              <TableRow className={classes.tableHeadRow}>
                {tableHead.map((head, i) => {
                  return <TableCell key={i}>{head}</TableCell>;
                })}
              </TableRow>
            </TableHead>
          ) : null}

          <TableBody>
            {tableData.map((sale, i) => {
              const formattedDate = format(
                new Date(sale.createdAt),
                ' d MMMM y - p'
              );
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
                          {isExpanded(sale.id) ? (
                            <ExpandLess className={classes.expandIcon} />
                          ) : (
                            <ExpandMore className={classes.expandIcon} />
                          )}
                        </div>
                        <div className={classes.dateContainer}>
                          {formattedDate}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className={classes.tableCell}>Cash</TableCell>
                    <TableCell className={classes.tableCell}>10</TableCell>
                    <TableCell className={classes.tableCell}>
                      &#x20BA;1000
                    </TableCell>
                  </TableRow>
                  {isExpanded(sale.id) ? (
                    <TableRow key={sale.id}>
                      <TableCell padding={'none'} colSpan={12}>
                        <Collapse
                          hidden={!isExpanded(sale.id)}
                          in={isExpanded(sale.id)}
                          timeout="auto"
                          unmountOnExit
                        >
                          <SaleDetails sales={tableData} rowIndex={i} />
                        </Collapse>
                      </TableCell>
                    </TableRow>
                  ) : null}
                </React.Fragment>
              );
            })}
          </TableBody>
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

export default CustomTable;
