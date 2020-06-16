import React from 'react'
import { TableRow, TableCell, Typography } from '@material-ui/core'

import styles from './styles'
import { BatchProduct } from '../types'
import { productNameWithVariation } from '../../../utils'
import { SyncedIcon } from '../../SyncedIcon'

interface Props {
  row: BatchProduct
}

const CompletedBatchProductRow: React.FC<Props> = ({ row }) => {
  const classes = styles()

  const { id, name, barcode, sku, variation, expected, counted, synced } = row

  return (
    <TableRow hover className={classes.tableBodyRow}>
      <TableCell style={{ width: '15%' }}>{barcode}</TableCell>
      <TableCell style={{ width: '15%' }}>{sku}</TableCell>
      <TableCell style={{ width: '60%' }}>
        {productNameWithVariation(name, variation)}
      </TableCell>
      <TableCell align='right'>{expected}</TableCell>
      <TableCell align='right'>{counted || counted === 0 ? counted : '-'}</TableCell>
      <TableCell align='right'>
        <SyncedIcon synced={synced} />
      </TableCell>
    </TableRow>
  )
}

export default CompletedBatchProductRow
