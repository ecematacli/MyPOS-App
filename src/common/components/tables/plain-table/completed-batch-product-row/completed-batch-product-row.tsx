import React from 'react'
import { TableCell } from '@mui/material'

import { StyledTableRow } from './styles'
import { BatchProduct } from '../types'
import { productNameWithVariation } from '../../../../utils'
import { SyncedIcon } from '../../../synced-icon/synced-icon'

export const CompletedBatchProductRow: React.FC<{ row: BatchProduct }> = ({
  row,
}) => {
  const { name, barcode, sku, variation, expected, counted, synced } = row

  return (
    <StyledTableRow hover>
      <TableCell style={{ width: '15%' }}>{barcode}</TableCell>
      <TableCell style={{ width: '15%' }}>{sku}</TableCell>
      <TableCell style={{ width: '60%' }}>
        {productNameWithVariation(name, variation)}
      </TableCell>
      <TableCell align='right'>{expected}</TableCell>
      <TableCell align='right'>
        {counted || counted === 0 ? counted : '-'}
      </TableCell>
      <TableCell align='right'>
        <SyncedIcon synced={synced} />
      </TableCell>
    </StyledTableRow>
  )
}
