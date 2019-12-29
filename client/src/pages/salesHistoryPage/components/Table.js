import React from 'react';
import clsx from 'clsx';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from '@material-ui/core';

import styles from './styles';

const CustomTable = ({ tableHead, tableData }) => {
  const classes = styles();

  return (
    <div className={classes.tableResponsive}>
      <Table className={classes.table}>
        {tableHead !== undefined ? (
          <TableHead>
            <TableRow className={classes.tableHeadRow}>
              {tableHead.map((head, i) => {
                return (
                  <TableCell
                    className={classes.tableCell + ' ' + classes.tableHeadCell}
                    key={i}
                  >
                    {head}
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>
        ) : null}
        <TableBody>
          {tableData.map((sale, i) => {
            return (
              <TableRow
                key={sale.id}
                className={clsx(
                  classes.tableBodyRow,
                  classes[i % 2 ? 'whiteRow' : 'greenRow']
                )}
              >
                <TableCell className={classes.tableCell}>
                  {sale.createdAt}
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
  );
};

export default CustomTable;
