import React from 'react';
import { TableRow, TableCell } from '@material-ui/core';

import styles from './styles';
import { BatchProduct } from '../types';

// import AdjustIcon from '@material-ui/icons/Adjust';

interface Props {
  row: BatchProduct;
  selectedRow: {
    [id: string]: boolean;
  };
  handleSelectedRow: (id: number) => void;
}

const BatchProductsRow: React.FC<Props> = ({
  row,
  selectedRow,
  handleSelectedRow,
}) => {
  const classes = styles();

  const { id, name, expected, counted } = row;

  return (
    <TableRow
      onClick={() => handleSelectedRow(id)}
      hover
      className={classes.tableBodyRow}>
      <TableCell className={classes.batchNameCell}>{name}</TableCell>
      <TableCell align="right">{expected}</TableCell>
      <TableCell align="right">{counted ? counted : '-'}</TableCell>
    </TableRow>
  );
};

export default BatchProductsRow;
