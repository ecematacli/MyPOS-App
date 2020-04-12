import React from 'react';
import { TableRow, TableCell } from '@material-ui/core';

import styles from './styles';
import { BatchProduct } from '../types';

interface Props {
  row: BatchProduct;
}

const BatchProductsRow: React.FC<Props> = ({ row }) => {
  const classes = styles();

  const { name, expected, counted } = row;

  return (
    <TableRow className={classes.tableBodyRow}>
      <TableCell className={classes.batchNameCell}>{name}</TableCell>
      <TableCell>{expected}</TableCell>
      <TableCell>{counted}</TableCell>
    </TableRow>
  );
};

export default BatchProductsRow;
