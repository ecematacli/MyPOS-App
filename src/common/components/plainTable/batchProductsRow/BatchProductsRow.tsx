import React from 'react';
import { TableRow, TableCell } from '@material-ui/core';
import AdjustIcon from '@material-ui/icons/Adjust';

import styles from './styles';
import { BatchProduct } from '../types';

interface Props {
  row: BatchProduct;
  selectedRow: {
    [id: string]: boolean;
  };
  handleSelectedRow: (id: number) => void;
  handleQueryChange?: (query: string) => void;
  countInputRef: React.MutableRefObject<HTMLInputElement>;
}

const BatchProductsRow: React.FC<Props> = ({
  row,
  selectedRow,
  handleSelectedRow,
  handleQueryChange,
  countInputRef,
}) => {
  const classes = styles();

  const { id, name, expected, counted } = row;

  const onRowClick = (id: number, name: string) => {
    countInputRef.current.focus();
    handleSelectedRow(id);
    handleQueryChange(name);
  };

  return (
    <TableRow
      onClick={() => onRowClick(id, name)}
      hover
      className={classes.tableBodyRow}>
      <TableCell className={classes.batchNameCell}>
        <div className={classes.batchNameCellDiv}>
          <span className={classes.adjustIconSpan}>
            {selectedRow[id] && <AdjustIcon className={classes.adjustIcon} />}
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
