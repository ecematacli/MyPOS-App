import React from 'react';
import { Link } from 'react-router-dom';
import { TableRow, TableCell } from '@material-ui/core';

import styles from './styles';
import { Batch } from '../types';
import { capitalizeFirstLetters } from '../../../utils';

interface Props {
  row: Batch;
}

const BatchRow: React.FC<Props> = ({ row }) => {
  const classes = styles();

  const { id, name, started, finished, category, brand } = row;

  return (
    <TableRow className={classes.tableBodyRow}>
      <TableCell className={classes.batchNameCell}>
        <Link to={`/inventory/count/${id}`}>
          {capitalizeFirstLetters(name)}
        </Link>
      </TableCell>
      <TableCell>{started}</TableCell>
      <TableCell>{finished}</TableCell>
      <TableCell>{category}</TableCell>
      <TableCell align="right">{brand}</TableCell>
    </TableRow>
  );
};

export default BatchRow;
