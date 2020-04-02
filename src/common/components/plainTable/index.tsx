import React from 'react';
import {
  TableRow,
  TableCell,
  Table,
  TableBody,
  TableHead,
  TableContainer,
  TablePagination
} from '@material-ui/core';

import styles from './styles';
import { BatchesRow, Batch } from './types';

interface Props {
  tableHeads: string[];
  count: number;
  rows: BatchesRow;
  noDataMessage?: string;
  page: number;
  rowsPerPage: number;
}

export interface PaginationLabel {
  from: number;
  to: number;
  count: number;
}

const BatchTable: React.FC<Props> = ({
  tableHeads,
  count,
  rows,
  noDataMessage,
  page,
  rowsPerPage
}) => {
  const classes = styles();

  const renderTableHead = () => (
    <TableRow className={classes.tableHeadRow}>
      {tableHeads.map((head: string, i) => (
        <TableCell
          className={classes[i === 0 && 'firstCell']}
          align="left"
          key={head}
        >
          {head}
        </TableCell>
      ))}
    </TableRow>
  );
  const renderTableBody = () => {
    if ('batches' in rows) {
      return rows.batches.map((row: Batch, i) => (
        <TableRow className={classes.tableBodyRow} key={i}>
          <TableCell className={classes.firstCell}>{name}</TableCell>
          <TableCell>{row.started}</TableCell>
          <TableCell>{row.finished}</TableCell>
          <TableCell>{row.category}</TableCell>
          <TableCell>{row.brand}</TableCell>
        </TableRow>
      ));
    }
  };

  const renderLabelDisplayRows = ({ from, to, count }: PaginationLabel) => {
    return `Page ${page} of ${Math.ceil(
      count / rowsPerPage
    )}  -  ${count} items`;
  };

  const renderPagination = () => (
    <div className={classes.paginationDiv}>
      <TablePagination
        rowsPerPageOptions={[10, 25, 50]}
        component="div"
        count={count}
        rowsPerPage={rowsPerPage}
        page={page - 1}
        onChangePage={() => 'handleChangePage'}
        onChangeRowsPerPage={() => 'handleChangeRowsPerPage'}
        labelDisplayedRows={renderLabelDisplayRows}
      />
    </div>
  );

  return (
    <TableContainer className={classes.tableContainer}>
      <Table className={classes.table}>
        {tableHeads !== undefined ? (
          <TableHead>{renderTableHead()}</TableHead>
        ) : null}
        <TableBody>
          {!count ? (
            <TableRow>
              <TableCell colSpan={10}>{noDataMessage}</TableCell>
            </TableRow>
          ) : (
            renderTableBody()
          )}
        </TableBody>
      </Table>
      {count > 1 && renderPagination()}
    </TableContainer>
  );
};

export default BatchTable;
