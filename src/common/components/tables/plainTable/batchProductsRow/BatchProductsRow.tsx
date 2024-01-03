import React from 'react'
import { TableRow, TableCell } from '@mui/material'
import AdjustIcon from '@material-ui/icons/Adjust'

import styles from './styles'
import { BatchProduct } from '../types'
import { productNameWithVariation } from '../../../../utils'

interface Props {
  row: BatchProduct
  selectedRow: BatchProduct
}

const BatchProductsRow: React.FC<Props> = ({ row, selectedRow }) => {
  const classes = styles({ counted: row.counted, expected: row.expected })
  const { id, name, barcode, sku, variation, expected, counted } = row

  return (
    <TableRow hover className={classes.tableBodyRow}>
      <TableCell style={{ width: '15%' }}>
        <div className={classes.batchFirstCellDiv}>
          <span className={classes.adjustIconSpan}>
            {selectedRow && selectedRow.id === id && (
              <AdjustIcon className={classes.adjustIcon} />
            )}
          </span>
          {barcode}
        </div>
      </TableCell>
      <TableCell style={{ width: '15%' }}>{sku}</TableCell>
      <TableCell style={{ width: '60%' }}>
        {productNameWithVariation(name, variation)}
      </TableCell>
      <TableCell align='right'>{expected}</TableCell>
      <TableCell align='right'>
        {counted || counted === 0 ? counted : '-'}
      </TableCell>
    </TableRow>
  )
}

export default BatchProductsRow
