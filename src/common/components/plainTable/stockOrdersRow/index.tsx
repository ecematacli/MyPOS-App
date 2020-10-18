import React from 'react';
import { TableRow, TableCell } from '@material-ui/core';

import styles from './styles';
import { StockOrders } from '../types';
import { currencyFormatter } from '../../../utils'

interface Props {
  row: StockOrders;
}

const StockOrdersRow: React.FC<Props> = ({ row }) => {
  const classes = styles();

  const { createdAt, products, totalQty, totalPrice } = row;

  return (
    <TableRow hover className={classes.tableBodyRow}>
      <TableCell>{createdAt}</TableCell>
      <TableCell>
        {products.length}
      </TableCell>
      <TableCell>
        {totalQty}
      </TableCell>
      <TableCell align="right">
        {currencyFormatter(totalPrice)}
      </TableCell>
    </TableRow>
  );
};

export default StockOrdersRow;
