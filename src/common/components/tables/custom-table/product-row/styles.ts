import { TableCell, TableRow } from '@mui/material'
import { styled } from '@mui/material/styles'

export const StyledTableRow = styled(TableRow)<{
  isStockOrderProductsTable: boolean
  isEvenRow: boolean
}>(({ theme, isStockOrderProductsTable, isEvenRow }) => ({
  cursor: !isStockOrderProductsTable ? 'pointer' : 'unset',
  boxShadow: '0 2px 7px 0 rgba(0, 0, 0, 0.08)',
  background: isEvenRow
    ? theme.palette.whiteColors[0]
    : theme.palette.greenColors[2],
}))

export const StyledTableCell = styled(TableCell)(({ theme }) => ({
  padding: theme.spacing(4, 1),
  minHeight: theme.spacing(14.37),
  fontSize: 14,
  [theme.breakpoints.down('sm')]: {
    fontSize: 13,
  },
  color: 'inherit',
  fontWeight: theme.spacing(62.5),
  borderBottom: `1px solid ${theme.palette.secondary.light}`,
  '&:last-child': {
    paddingRight: theme.spacing(3),
  },
}))
