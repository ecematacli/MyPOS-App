import React from 'react';
import { TableRow, TableCell } from '@material-ui/core';

import styles from './styles';
import { Batch } from '../types';

interface Props {
  row: Batch;
}

const BatchRow: React.FC<Props> = ({ row }) => {
  const classes = styles();

  const { name, started, finished, category, brand } = row;

  return (
    <TableRow className={classes.tableBodyRow}>
      <TableCell className={classes.batchNameCell}>{name}</TableCell>
      <TableCell>{started}</TableCell>
      <TableCell>{finished}</TableCell>
      <TableCell>{category}</TableCell>
      <TableCell align="right">{brand}</TableCell>
    </TableRow>
  );
};

export default BatchRow;
