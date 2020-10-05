import React from 'react';
import { TableRow, TableCell } from '@material-ui/core';

import styles from './styles';
import { StockOrders } from '../types';

interface Props {
  row: StockOrders;
}

const CompletedBatchProductRow: React.FC<Props> = ({ row }) => {
  const classes = styles();

  const { createdAt, products } = row;

  return (
    <TableRow hover className={classes.tableBodyRow}>
      <TableCell>{createdAt}</TableCell>
      <TableCell>
        {products.length}
      </TableCell>
    </TableRow>
  );
};

export default CompletedBatchProductRow;
