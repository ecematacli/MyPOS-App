import { styled } from '@mui/material/styles'

import { TableRow } from '@mui/material'

export const StyledTableRow = styled(TableRow)(({ theme }) => ({
  height: theme.spacing(10),
  maxHeight: theme.spacing(10),
  '& > td': {
    cursor: 'pointer',
    borderBottom: '1px solid #e9e9e9',
    height: 'auto',
    maxHeight: theme.spacing(10),
  },
}))
