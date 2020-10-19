import React from 'react';
import { Link } from 'react-router-dom'
import { TableRow, TableCell } from '@material-ui/core';

import styles from './styles';
import { StockOrders } from '../types';
import { currencyFormatter } from '../../../utils'
import history from '../../../../history'

interface Props {
  row: StockOrders;
}

const StockOrdersRow: React.FC<Props> = ({ row }) => {
  const classes = styles();

  const { id, createdAt, products, totalQty, totalPrice } = row;

  return (
    <TableRow
      hover
      onClick={() => history.push({ pathname: `/inventory/stock-order/${id}`, state: products })}
      className={classes.tableBodyRow}>
      <TableCell>
        {createdAt}
      </TableCell>
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
