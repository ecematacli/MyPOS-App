import React from 'react'
import { TableRow, TableCell } from '@mui/material'

import { productNameWithVariation } from '../../../common/utils'
import { ProductToTransfer } from '../types'
import { Add, Remove } from '@material-ui/icons'
import { Align } from '../../../common/components/Align'

interface Props {
  row: ProductToTransfer
  changeQty: (change: number) => void
}

const NewTransferProductRow: React.FC<Props> = ({ row, changeQty }) => {
  const { id, name, barcode, sku, variation, qty, qtyToTransfer } = row

  return (
    <TableRow hover>
      <TableCell style={{ width: '12.5%' }}>{barcode}</TableCell>
      <TableCell style={{ width: '12.5%' }}>{sku}</TableCell>
      <TableCell style={{ width: '50%' }}>
        {productNameWithVariation(name, variation)}
      </TableCell>
      <TableCell align='right'>{qty}</TableCell>
      <TableCell align='right' style={{ width: '25%' }}>
        <Align justify='space-between'>
          <Remove onClick={() => changeQty(-1)} style={{ cursor: 'pointer' }} />
          {qtyToTransfer}
          <Add onClick={() => changeQty(1)} style={{ cursor: 'pointer' }} />
        </Align>
      </TableCell>
    </TableRow>
  )
}

export default NewTransferProductRow
