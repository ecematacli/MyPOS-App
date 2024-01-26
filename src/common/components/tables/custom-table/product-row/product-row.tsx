import React, { Fragment } from 'react'
import { TableCell, TableRow, Collapse, Box } from '@mui/material'

import { StyledTableCell, StyledTableRow } from './styles'
import { Product } from '../../../../../redux/products/types'
import { currencyFormatter } from '../../../../utils'

interface IProps {
  product: Product
  renderIconContainer: (id?: number) => JSX.Element
  index: number
  stockOrderProducts?: boolean
  expandedRows?: {
    [id: string]: boolean
  }
  toggleExpanded?: (id: number) => void
  component?: React.JSXElementConstructor<any>
}

export const ProductRow: React.FC<IProps> = ({
  product,
  expandedRows,
  toggleExpanded,
  index,
  renderIconContainer,
  stockOrderProducts,
  component: Component,
}) => {
  const {
    id,
    sku,
    name,
    category,
    brand,
    price,
    discountPrice,
    variation,
  } = product

  return (
    <Fragment key={id}>
      <StyledTableRow
        isStockOrderProductsTable={stockOrderProducts}
        isEvenRow={index % 2 === 0}
        onClick={() => toggleExpanded(id)}>
        <StyledTableCell>{renderIconContainer(id)}</StyledTableCell>
        <StyledTableCell>
          <Box display='flex' alignItems='center'>
            <Box sx={{ marginLeft: -5 }}>{sku || '-'}</Box>
          </Box>
        </StyledTableCell>
        <StyledTableCell>{name || '-'}</StyledTableCell>
        <StyledTableCell>{variation || '-'}</StyledTableCell>
        <StyledTableCell>{category ? category.name : '-'}</StyledTableCell>
        <StyledTableCell>{brand ? brand.name : '-'}</StyledTableCell>
        <StyledTableCell align='right'>
          {price && currencyFormatter(price)}
        </StyledTableCell>
        <StyledTableCell align='right'>
          {discountPrice ? currencyFormatter(discountPrice) : '-'}
        </StyledTableCell>
      </StyledTableRow>
      {expandedRows && expandedRows[id] && (
        <TableRow key={id}>
          <TableCell padding={'none'} colSpan={12}>
            <Collapse in={expandedRows[id]} timeout='auto' unmountOnExit>
              <Component product={product} rowIndex={index} />
            </Collapse>
          </TableCell>
        </TableRow>
      )}
    </Fragment>
  )
}
