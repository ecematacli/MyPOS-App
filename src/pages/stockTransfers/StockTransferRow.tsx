import React from 'react'
import { TableRow, TableCell } from '@material-ui/core'

import { formatDate } from '../../common/utils'
import { StockTransfer } from './types'
import history from '../../history'

interface Props {
  transfer: StockTransfer
  handleClick: () => void
}

const StockTransferRow: React.FC<Props> = ({
  transfer: { id, createdAt, destination, origin, products },
  handleClick,
}) => (
  <TableRow hover onClick={handleClick} style={{ cursor: 'pointer' }}>
    <TableCell style={{ width: '15%' }}>{origin.name}</TableCell>
    <TableCell style={{ width: '15%' }}>{destination.name}</TableCell>
    <TableCell style={{ width: '60%' }}>{formatDate(createdAt, 'd MMM yyyy')}</TableCell>
    <TableCell align='right'>{products.length}</TableCell>
    <TableCell align='right'>{products.reduce((s, p) => s + p.transferredQty, 0)}</TableCell>
  </TableRow>
)

export default StockTransferRow
