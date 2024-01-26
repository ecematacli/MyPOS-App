import React from 'react'
import { TableCell, Box } from '@mui/material'
import AdjustIcon from '@mui/icons-material/Adjust'

import { AdjustIconContainer, StyledTableRow } from './styles'
import { BatchProduct } from '../types'
import { productNameWithVariation } from '../../../../utils'

interface Props {
  row: BatchProduct
  selectedRow: BatchProduct
}

export const BatchProductsRow: React.FC<Props> = ({ row, selectedRow }) => {
  const { id, name, barcode, sku, variation, expected, counted } = row

  return (
    <StyledTableRow hover counted={row.counted} expected={row.expected}>
      <TableCell style={{ width: '15%' }}>
        <Box display='flex' alignItems='center'>
          <AdjustIconContainer component='span'>
            {selectedRow && selectedRow.id === id && (
              <AdjustIcon
                sx={theme => ({
                  color: theme.palette.primary.main,
                })}
              />
            )}
          </AdjustIconContainer>
          {barcode}
        </Box>
      </TableCell>
      <TableCell style={{ width: '15%' }}>{sku}</TableCell>
      <TableCell style={{ width: '60%' }}>
        {productNameWithVariation(name, variation)}
      </TableCell>
      <TableCell align='right'>{expected}</TableCell>
      <TableCell align='right'>
        {counted || counted === 0 ? counted : '-'}
      </TableCell>
    </StyledTableRow>
  )
}
