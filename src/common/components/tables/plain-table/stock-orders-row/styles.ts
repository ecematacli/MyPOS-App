import { styled } from '@mui/material/styles'
import { TableRow, TableCell } from '@mui/material'

export const TableBodyRow = styled(TableRow)(({ theme }) => ({
  height: theme.spacing(10),
  maxHeight: theme.spacing(10),
  '& > td': {
    cursor: 'pointer',
    borderBottom: `1px solid ${theme.palette.grayColors[19]}`,
    height: 'auto',
    maxHeight: theme.spacing(10),
  },
}))

export const NoDisplayCell = styled(TableCell)({
  borderBottom: 'none',
  paddingTop: 50,
})
