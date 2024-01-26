import React from 'react'
import {
  TableRow,
  TableCell,
  TableBody,
  TableHead,
  TableContainer,
  TablePagination,
} from '@mui/material'

import {
  CellName,
  NoDisplayCell,
  NoDisplayMessage,
  PaginationContainer,
  StyledTable,
  StyledTableHeadRow,
} from './styles'
import { PlainTableProps, Batch, BatchProduct, PaginationLabel } from './types'
import { BatchRow } from './batch-row/batch-row'
import { BatchProductsRow } from './batch-products-row/batch-products-row'
import { CompletedBatchProductRow } from './completed-batch-product-row/completed-batch-product-row'
import { StockOrdersRow } from './stock-orders-row/stock-orders-row'
import { OrderedProductRow } from './ordered-product-row/ordered-product-row'

export const PlainTable: React.FC<PlainTableProps> = ({
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
  const renderTableBody = () => {
    switch (tableFor) {
      case 'CompletedInventoryCountProducts':
        return rows.map(row => (
          <CompletedBatchProductRow key={row.id} row={row} />
        ))
      case 'InventoryCountBatches':
        return rows.map((row: Batch) => <BatchRow row={row} key={row.id} />)
      case 'InventoryCountProducts':
        return rows.map((row: BatchProduct) => (
          <BatchProductsRow key={row.id} row={row} selectedRow={selectedRow} />
        ))
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

  const renderLabelDisplayRows = ({ count }: PaginationLabel) => {
    return `Page ${page} of ${Math.ceil(
      count / rowsPerPage
    )}  -  ${count} items`
  }

  const renderPagination = () => (
    <PaginationContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 50]}
        count={count}
        rowsPerPage={rowsPerPage}
        page={page - 1}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        labelDisplayedRows={renderLabelDisplayRows}
      />
    </PaginationContainer>
  )

  return (
    <TableContainer>
      <StyledTable noPagination={noPagination}>
        {tableHeads !== undefined && (
          <TableHead>
            <StyledTableHeadRow type={tableFor}>
              {tableHeads.map(({ name, rightAlign }, i) => (
                <TableCell align={rightAlign ? 'right' : 'left'} key={name}>
                  <CellName isFirstRow={i === 0} type={tableFor}>
                    {name}
                  </CellName>
                </TableCell>
              ))}
            </StyledTableHeadRow>
          </TableHead>
        )}
        <TableBody>
          {!hasDataToShow ? (
            <TableRow>
              <NoDisplayCell colSpan={10}>
                <NoDisplayMessage>{noDataMessage}</NoDisplayMessage>
              </NoDisplayCell>
            </TableRow>
          ) : (
            renderTableBody()
          )}
        </TableBody>
      </StyledTable>
      {!noPagination && count > 0 && renderPagination()}
    </TableContainer>
  )
}
