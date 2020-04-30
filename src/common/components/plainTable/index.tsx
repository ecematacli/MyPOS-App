import React from 'react';
import {
  TableRow,
  TableCell,
  Table,
  TableBody,
  TableHead,
  TableContainer,
  TablePagination,
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
  handleChangePage,
  selectedRow,
  handleSelectedRow,
  handleQueryChange,
  countInputRef,
}) => {
  const classes = styles(rows);

  const renderTableHead = () => (
    <TableRow className={classes.tableHeadRow}>
      {tableHeads.map(({ name, rightAlign }, i) => (
        <TableCell align={rightAlign ? 'right' : 'left'} key={name}>
          <div className={classes[i === 0 && 'firstHeadCell']}>{name}</div>
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
        <BatchProductsRow
          key={row.id}
          row={row}
          selectedRow={selectedRow}
          handleSelectedRow={handleSelectedRow}
          handleQueryChange={handleQueryChange}
          countInputRef={countInputRef}
        />
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
    <TableContainer>
      <Table>
        {tableHeads !== undefined ? (
          <TableHead>{renderTableHead()}</TableHead>
        ) : null}
        <TableBody>
          {!count ? (
            <TableRow>
              <TableCell className={classes.noDisplayCell} colSpan={10}>
                <div className={classes.noDisplayMsg}>{noDataMessage}</div>
              </TableCell>
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
