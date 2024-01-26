import React, { Fragment } from 'react'
import { TableCell, TableRow, Collapse, Tooltip } from '@mui/material'

import { StyledChip, StyledTableRow } from './styles'
import { Sale } from '../../../../../redux/sales/types'
import {
  currencyFormatter,
  totalQty,
  getPaymentMethodLabel,
} from '../../../../utils'

interface Props {
  sale: Sale
  expandedRows: {
    [id: string]: boolean
  }
  toggleExpanded: (id: number) => void
  index: number
  renderExpandIconContainer: (id: number) => JSX.Element
  component: React.JSXElementConstructor<any>
}

export const SaleRow: React.FC<Props> = ({
  sale,
  expandedRows,
  toggleExpanded,
  index,
  renderExpandIconContainer,
  component: Component,
}) => {
  const {
    id,
    createdAt,
    discount,
    total,
    paymentMethod,
    outlet,
    orderNo,
    products,
  } = sale

  return (
    <Fragment key={id}>
      <StyledTableRow
        isEvenRow={index % 2 === 0}
        onClick={() => toggleExpanded(id)}>
        <TableCell>{renderExpandIconContainer(id)}</TableCell>
        <TableCell>{createdAt}</TableCell>
        <TableCell>
          <Tooltip title={orderNo || ''} placement='top'>
            <StyledChip
              variant='outlined'
              label={outlet.name}
              outletName={outlet.name}
            />
          </Tooltip>
        </TableCell>
        <TableCell>{getPaymentMethodLabel(paymentMethod)}</TableCell>
        <TableCell align='right'>{totalQty(products)}</TableCell>
        <TableCell align='right'>
          {discount ? currencyFormatter(discount) : '-'}
        </TableCell>
        <TableCell align='right'>
          {total ? currencyFormatter(total) : '-'}
        </TableCell>
      </StyledTableRow>
      {expandedRows[id] && (
        <TableRow key={id}>
          <TableCell padding='none' colSpan={12}>
            <Collapse in={expandedRows[id]} timeout='auto' unmountOnExit>
              <Component sale={sale} rowIndex={index} />
            </Collapse>
          </TableCell>
        </TableRow>
      )}
    </Fragment>
  )
}
