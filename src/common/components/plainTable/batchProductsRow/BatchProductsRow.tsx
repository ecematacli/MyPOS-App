import React from 'react';
import { TableRow, TableCell } from '@material-ui/core';
import AdjustIcon from '@material-ui/icons/Adjust';

import styles from './styles';
import { BatchProduct } from '../types';

interface Props {
  row: BatchProduct;
  selectedProductRow: BatchProduct;
  handleSelectedRow: (product: BatchProduct) => void;
  countInputRef: React.MutableRefObject<HTMLInputElement>;
}

const BatchProductsRow: React.FC<Props> = ({
  row,
  selectedProductRow,
  handleSelectedRow,
  countInputRef,
}) => {
  const classes = styles();

  const onRowClick = () => {
    countInputRef.current.focus();
    handleSelectedRow(row);
  };

  const { id, name, expected } = row;
  let { counted } = row;

  if (selectedProductRow && selectedProductRow.id === id) {
    counted = selectedProductRow.counted;
  }

  return (
    <TableRow onClick={onRowClick} hover className={classes.tableBodyRow}>
      <TableCell className={classes.batchNameCell}>
        <div className={classes.batchNameCellDiv}>
          <span className={classes.adjustIconSpan}>
            {selectedProductRow && selectedProductRow.id === id && (
              <AdjustIcon className={classes.adjustIcon} />
            )}
          </span>
          <span>{name}</span>
        </div>
      </TableCell>
      <TableCell align="right">{expected}</TableCell>
      <TableCell align="right">{counted ? counted : '-'}</TableCell>
    </TableRow>
  );
};

export default BatchProductsRow;
