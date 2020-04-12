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
import { PlainTableProps, Batch, BatchProduct, PaginationLabel } from './types';
import BatchRow from './batchRow/BatchRow';
import BatchProductsRow from './batchProductsRow/BatchProductsRow';

const PlainTable: React.FC<PlainTableProps> = ({
  tableHeads,
  count,
  rows,
  noDataMessage,
  page,
  rowsPerPage,
  handleChangeRowsPerPage,
  handleChangePage
}) => {
  const classes = styles();

  const renderTableHead = () => (
    <TableRow className={classes.tableHeadRow}>
      {tableHeads.map((head: string, i) => (
        <TableCell
          className={classes[i === 0 && 'firstHeadCell']}
          align={i === 4 ? 'right' : 'left'}
          key={head}
        >
          {head}
        </TableCell>
      ))}
    </TableRow>
  );
  const renderTableBody = () => {
    if ('batches' in rows) {
      return rows.batches.map((row: Batch) => (
        <BatchRow row={row} key={row.id} />
      ));
    }

    if ('batchProducts' in rows) {
      return rows.batchProducts.map((row: BatchProduct) => (
        <BatchProductsRow key={row.id} row={row} />
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
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
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

export default PlainTable;
