import React from 'react'
import { TableRow, TableCell, Table, TableBody, TableHead, TableContainer, TablePagination } from '@material-ui/core'

import styles from './styles'
import { PlainTableProps, Batch, BatchProduct, PaginationLabel } from './types'
import BatchRow from './batchRow/BatchRow'
import BatchProductsRow from './batchProductsRow/BatchProductsRow'
import CompletedBatchProductRow from './completedBatchProductRow'
import StockOrdersRow from './stockOrdersRow'
import OrderedProductRow from './OrderedProductRow'

const PlainTable: React.FC<PlainTableProps> = ({
  tableFor,
  tableHeads,
  count,
  rows,
  hasDataToShow,
  noDataMessage,
  page,
  rowsPerPage,
  noPagination,
  handleChangeRowsPerPage,
  handleChangePage,
  selectedRow,
}) => {
  const classes = styles({ type: tableFor, noPagination })

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
    switch (tableFor) {
      case 'CompletedInventoryCountProducts':
        return rows.map(row => <CompletedBatchProductRow key={row.id} row={row} />)
      case 'InventoryCountBatches':
        return rows.map((row: Batch) => <BatchRow row={row} key={row.id} />)
      case 'InventoryCountProducts':
        return rows.map((row: BatchProduct) => <BatchProductsRow key={row.id} row={row} selectedRow={selectedRow} />)
      case 'StockOrders':
        return rows.map(row => <StockOrdersRow key={row.id} row={row} />)
      case 'OrderedProducts':
        return rows.map(row => <OrderedProductRow key={row.id} row={row} />)
      case 'NewStockTransferProducts':
      case 'StockTransfers':
      case 'StockTransferProducts':
        return rows
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
      <Table className={classes.table}>
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
      {!noPagination && count > 0 && renderPagination()}
    </TableContainer>
  )
}

export default PlainTable
