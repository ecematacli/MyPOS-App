import React, { useState } from 'react'
import {
  TableContainer,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material'
import ExpandLess from '@mui/icons-material/ExpandLess'
import ExpandMore from '@mui/icons-material/ExpandMore'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'

import {
  IconContainer,
  NoDisplayMessage,
  PaginationContainer,
  StyledContainer,
  StyledIcon,
  StyledTable,
  StyledTableHeadRow,
  StyledTablePagination,
} from './custom-table-styles'
import { Sale } from '../../../../redux/sales/types'
import { Product } from '../../../../redux/products/types'
import { TableProps, PaginationLabel } from './types'
import { SaleRow } from './sale-row/sale-row'
import { ProductRow } from './product-row/product-row'

export const CustomTable: React.FC<TableProps> = ({
  tableHeads,
  rows,
  tableType,
  noPagination,
  rowsPerPage,
  page,
  count,
  handleChangePage,
  handleChangeRowsPerPage,
  component: Component,
}) => {
  const [expandedRows, setExpandedRows] = useState<{
    [id: string]: boolean
  }>({})

  const toggleExpanded = (id: number): void => {
    setExpandedRows({ ...expandedRows, [id]: !expandedRows[id] })
  }

  const renderExpandIconContainer = (id: number) => (
    <IconContainer>
      {expandedRows[id] ? (
        <StyledIcon as={ExpandLess} />
      ) : (
        <StyledIcon as={ExpandMore} />
      )}
    </IconContainer>
  )

  const renderTableHead = () => {
    return tableHeads.map(({ label, numeric }, i) => (
      <TableCell align={numeric ? 'right' : 'left'} key={i}>
        <Typography>{label}</Typography>
      </TableCell>
    ))
  }

  const renderNoDisplay = () => (
    <TableRow>
      <TableCell sx={{ borderBottom: 'none', paddingTop: 50 }} colSpan={10}>
        <NoDisplayMessage>
          {`No ${tableType === 'sales' ? 'sales' : 'products'} to display`}
        </NoDisplayMessage>
      </TableCell>
    </TableRow>
  )

  const renderTableBody = () => {
    if ('sales' in rows) {
      return rows.sales.map((sale: Sale, i: number) => (
        <SaleRow
          key={sale.id}
          index={i}
          sale={sale}
          toggleExpanded={toggleExpanded}
          renderExpandIconContainer={renderExpandIconContainer}
          expandedRows={expandedRows}
          component={Component}
        />
      ))
    }

    if ('products' in rows) {
      if (rows.type === 'products') {
        return rows.products.map((product: Product, i: number) => (
          <ProductRow
            key={product.id}
            index={i}
            product={product}
            toggleExpanded={toggleExpanded}
            renderIconContainer={renderExpandIconContainer}
            expandedRows={expandedRows}
            component={Component}
          />
        ))
      }

      if (rows.type === 'stockOrderProducts') {
        return rows.products.map((product: Product, i: number) => (
          <ProductRow
            stockOrderProducts
            key={product.id}
            index={i}
            product={product}
            renderIconContainer={() => (
              <IconContainer>
                <StyledIcon as={ChevronRightIcon} />
              </IconContainer>
            )}
          />
        ))
      }
    }
  }

  const renderLabelDisplayRows = ({ from, to, count }: PaginationLabel) => {
    return `Page ${page} of ${Math.ceil(
      count / rowsPerPage
    )}  -  ${count} items`
  }

  return (
    <StyledContainer
      display='flex'
      flexDirection='column'
      justifyContent='space-between'
      height='100%'>
      <TableContainer>
        <StyledTable>
          {tableHeads && (
            <TableHead>
              <StyledTableHeadRow>{renderTableHead()}</StyledTableHeadRow>
            </TableHead>
          )}
          <TableBody>
            {!count ? renderNoDisplay() : renderTableBody()}
          </TableBody>
        </StyledTable>
      </TableContainer>
      {!noPagination && count > 0 && (
        <PaginationContainer display='flex'>
          <StyledTablePagination
            rowsPerPageOptions={[10, 25, 50]}
            count={count}
            rowsPerPage={rowsPerPage}
            page={page - 1}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            labelDisplayedRows={renderLabelDisplayRows}
          />
        </PaginationContainer>
      )}
    </StyledContainer>
  )
}
