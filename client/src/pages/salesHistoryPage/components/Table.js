import React, { useState, useEffect } from 'react';
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
  ExpansionPanel,
  ExpansionPanelSummary,
  Typography,
  ExpansionPanelDetails
} from '@material-ui/core';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import styles from './styles';

const CustomTable = ({ tableHead, tableData, fetchSales }) => {
  const classes = styles();
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(25);

  const handleChangePage = (e, newPage) => {
    setPage(newPage);
    fetchSales(page, rowsPerPage);
  };

  const handleChangeRowsPerPage = e => {
    setRowsPerPage(e.target.value);
    setPage(1);
    fetchSales(page, rowsPerPage);
  };

  return (
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
                <TableRow
                  key={sale.id}
                  className={clsx(
                    classes.tableBodyRow,
                    classes[i % 2 ? 'whiteRow' : 'greenRow']
                  )}
                >
                  <TableCell className={classes.tableCell}>
                    <div className={classes.dateCellContainer}>
                      <div className={classes.arrowContainer}>
                        <ArrowForwardIosIcon className={classes.arrowIcon} />
                      </div>

                      <div>{formattedDate}</div>
                    </div>
                  </TableCell>
                  <TableCell className={classes.tableCell}>Cash</TableCell>
                  <TableCell className={classes.tableCell}>10</TableCell>
                  <TableCell className={classes.tableCell}>
                    &#x20BA;1000
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
      <div className={classes.paginationContainer}>
        <TablePagination
          rowsPerPageOptions={[10, 25, 50]}
          component="div"
          count={tableData.length}
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
