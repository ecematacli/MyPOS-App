import React from 'react'
import { TableRow, TableCell } from '@material-ui/core'

import styles from './styles'
import { StockOrders } from '../types'
import { currencyFormatter } from '../../../../utils'
import history from '../../../../../history'

interface Props {
  row: StockOrders
}

const StockOrdersRow: React.FC<Props> = ({ row }) => {
  const classes = styles()

  const { id, createdAt, products, totalQty, totalPrice } = row

  return (
    <TableRow
      hover
      onClick={() => history.push({ pathname: `/inventory/stock-order/${id}`, state: products })}
      className={classes.tableBodyRow}>
      <TableCell className={classes.firstCell}>{createdAt}</TableCell>
      <TableCell>{products.length}</TableCell>
      <TableCell>{totalQty}</TableCell>
      <TableCell align='right'>{currencyFormatter(totalPrice)}</TableCell>
      <TableCell align='right'>{}</TableCell>
    </TableRow>
  )
}

export default StockOrdersRow
