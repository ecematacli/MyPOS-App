import { Box } from '@mui/material'
import { styled } from '@mui/material/styles'

export const TableContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  padding: theme.spacing(3.5, 6),
  marginTop: theme.spacing(2.5),
}))
