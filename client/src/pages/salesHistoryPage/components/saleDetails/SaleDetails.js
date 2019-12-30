import React from 'react';
import clsx from 'clsx';
import {
  Paper,
  TableContainer,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from '@material-ui/core';

import styles from './styles';

const SaleDetails = ({ rowIndex, sales }) => {
  console.log(rowIndex);
  const classes = styles();

  return (
    <Paper
      className={clsx(
        classes.salesDetailsContainer,
        classes[rowIndex % 2 ? 'whiteRow' : 'greenRow']
      )}
    >
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Sku</TableCell>
              <TableCell align="right">Product Name</TableCell>
              <TableCell align="right">Variation</TableCell>
              <TableCell align="right">Quantity</TableCell>
              <TableCell align="right">Tax</TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell align="right">Total</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sales.map(sale => (
              <TableRow key={sale.name}>
                <TableCell component="th" scope="row">
                  ABC123
                </TableCell>
                <TableCell align="center">P</TableCell>
                <TableCell align="right">1324</TableCell>
                <TableCell align="right">22</TableCell>
                <TableCell align="right">10000</TableCell>
                <TableCell align="right">10000</TableCell>
                <TableCell align="right">10000</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default SaleDetails;
