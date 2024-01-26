import React from 'react'
import { TableCell } from '@mui/material'
import { useHistory } from 'react-router-dom'

import { TableBodyRow } from './styles'
import { StockOrders } from '../types'
import { currencyFormatter } from '../../../../utils'

export const StockOrdersRow: React.FC<{ row: StockOrders }> = ({ row }) => {
  const history = useHistory()

  const { id, createdAt, products, totalQty, totalPrice } = row

  return (
    <TableBodyRow
      hover
      onClick={() =>
        history.push({
          pathname: `/inventory/stock-order/${id}`,
          state: products,
        })
      }>
      <TableCell sx={{ textDecoration: 'underline' }}>{createdAt}</TableCell>
      <TableCell>{products.length}</TableCell>
      <TableCell>{totalQty}</TableCell>
      <TableCell align='right'>{currencyFormatter(totalPrice)}</TableCell>
      <TableCell align='right'>{}</TableCell>
    </TableBodyRow>
  )
}
