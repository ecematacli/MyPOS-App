import React from 'react'
import {
  TableRow,
  TableCell,
  Table,
  TableBody,
  TableHead,
  TableContainer,
  TablePagination,
} from '@material-ui/core'

import styles from './styles'
import { PlainTableProps, Batch, BatchProduct, PaginationLabel } from './types'
import BatchRow from './batchRow/BatchRow'
import BatchProductsRow from './batchProductsRow/BatchProductsRow'
import CompletedBatchProductRow from './completedBatchProductRow'
import StockOrdersRow from './stockOrdersRow'

const PlainTable: React.FC<PlainTableProps> = ({
  tableHeads,
  count,
  rows,
  hasDataToShow,
  noDataMessage,
  page,
  rowsPerPage,
  handleChangeRowsPerPage,
  handleChangePage,
  selectedRow,
  completedBatch,
}) => {
  const classes = styles(rows)

  const renderTableHead = () => (
    <TableRow className={classes.tableHeadRow}>
      {tableHeads.map(({ name, rightAlign }, i) => (
        <TableCell align={rightAlign ? 'right' : 'left'} key={name}>
          <div className={classes[i === 0 && 'firstHeadCell']}>{name}</div>
        </TableCell>
      ))}
    </TableRow>
  )
  const renderTableBody = () => {
    if ('batches' in rows) {
      return rows.batches.map((row: Batch) => <BatchRow row={row} key={row.id} />)
    }

    if ('batchProducts' in rows && completedBatch) {
      return rows.batchProducts.map(row => <CompletedBatchProductRow key={row.id} row={row} />)
    }

    if ('batchProducts' in rows) {
      return rows.batchProducts.map((row: BatchProduct) => (
        <BatchProductsRow key={row.id} row={row} selectedRow={selectedRow} />
      ))
    }

    if ('stockOrders' in rows) {
      return rows.stockOrders.map(row => (
        <StockOrdersRow key={row.id} row={row} />
      ))
    }
  }

  const renderLabelDisplayRows = ({ from, to, count }: PaginationLabel) => {
    return `Page ${page} of ${Math.ceil(count / rowsPerPage)}  -  ${count} items`
  }

  const renderPagination = () => (
    <div className={classes.paginationDiv}>
      <TablePagination
        rowsPerPageOptions={[10, 25, 50]}
        component='div'
        count={count}
        rowsPerPage={rowsPerPage}
        page={page - 1}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
        labelDisplayedRows={renderLabelDisplayRows}
      />
    </div>
  )

  return (
    <TableContainer>
      <Table>
        {tableHeads !== undefined ? <TableHead>{renderTableHead()}</TableHead> : null}
        <TableBody>
          {!hasDataToShow ? (
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
      {count > 0 && renderPagination()}
    </TableContainer>
  )
}

export default PlainTable
