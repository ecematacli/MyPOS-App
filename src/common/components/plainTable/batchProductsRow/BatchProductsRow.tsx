import React from 'react';
import { TableRow, TableCell } from '@material-ui/core';
import AdjustIcon from '@material-ui/icons/Adjust';

import styles from './styles';
import { BatchProduct } from '../types';

interface Props {
  row: BatchProduct;
  selectedRow: BatchProduct;
  handleSelectedRow: (product: BatchProduct) => void;
  countInputRef: React.MutableRefObject<HTMLInputElement>;
}

const BatchProductsRow: React.FC<Props> = ({
  row,
  selectedRow,
  handleSelectedRow,
  countInputRef,
}) => {
  const classes = styles();

  const onRowClick = () => {
    countInputRef.current.focus();
    handleSelectedRow(row);
  };

  const { id, name, barcode, sku, expected } = row;
  let { counted } = row;

  return (
    <TableRow onClick={onRowClick} hover className={classes.tableBodyRow}>
      <TableCell>
        <div className={classes.batchFirstCellDiv}>
          <span className={classes.adjustIconSpan}>
            {selectedRow && selectedRow.id === id && (
              <AdjustIcon className={classes.adjustIcon} />
            )}
          </span>
          <span>{barcode}</span>
        </div>
      </TableCell>
      <TableCell>{sku}</TableCell>
      <TableCell>{name}</TableCell>
      <TableCell align="right">{expected}</TableCell>
      <TableCell align="right">{counted ? counted : '-'}</TableCell>
    </TableRow>
  );
};

export default BatchProductsRow;
