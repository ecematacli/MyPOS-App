import React from 'react'
import { TableRow, TableCell } from '@mui/material'

import { productNameWithVariation } from '../../../common/utils'
import { StockTransferProduct } from '../types'
import { SyncedIcon } from '../../../common/components/synced-icon/synced-icon'

interface Props {
  product: StockTransferProduct
}

const StockTransferProductRow: React.FC<Props> = ({
  product: {
    id,
    name,
    barcode,
    sku,
    variation,
    transferredQty,
    brand,
    category,
    synced,
  },
}) => (
  <TableRow hover>
    <TableCell style={{ width: '15%' }}>{barcode}</TableCell>
    <TableCell style={{ width: '15%' }}>{sku}</TableCell>
    <TableCell style={{ width: '60%' }}>
      {productNameWithVariation(name, variation)}
    </TableCell>
    <TableCell align='right'>{transferredQty}</TableCell>
    <TableCell align='right'>{brand}</TableCell>
    <TableCell align='right'>{category}</TableCell>
    <TableCell align='right'>
      <SyncedIcon synced={synced} />
    </TableCell>
  </TableRow>
)

export default StockTransferProductRow
