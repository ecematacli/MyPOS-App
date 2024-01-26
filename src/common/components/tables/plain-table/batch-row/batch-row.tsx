import React from 'react'
import { Link } from 'react-router-dom'
import { TableCell } from '@mui/material'

import { StyledTableRow } from './styles'
import { Batch } from '../types'
import { capitalizeFirstLetters } from '../../../../utils'

interface Props {
  row: Batch
}

export const BatchRow: React.FC<Props> = ({ row }) => {
  const { id, name, started, finished, category, brand } = row

  return (
    <StyledTableRow>
      <TableCell sx={{ textDecoration: 'underline', cursor: 'pointer' }}>
        <Link to={`/inventory/inventory-count/${id}`}>
          {name ? capitalizeFirstLetters(name) : `Count on ${started}`}
        </Link>
      </TableCell>
      <TableCell>{started}</TableCell>
      <TableCell>{finished}</TableCell>
      <TableCell>{category}</TableCell>
      <TableCell align='right'>{brand}</TableCell>
    </StyledTableRow>
  )
}
