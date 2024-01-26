import { styled } from '@mui/material/styles'
import { TableRow, Box } from '@mui/material'

export const StyledTableRow = styled(TableRow)<{
  counted: number
  expected: number
}>(({ theme, counted, expected }) => ({
  height: theme.spacing(10),
  maxHeight: theme.spacing(10),
  '& > td': {
    borderBottom: `1px solid ${theme.palette.grayColors[19]}`,
    height: 'auto',
    color: counted === expected ? `${theme.palette.primary.main}` : 'unset',
    maxHeight: theme.spacing(10),
  },
  cursor: 'auto',
}))

export const AdjustIconContainer = styled(Box)({
  marginLeft: -14,
  width: 27,
  display: 'flex',
  alignItems: 'center',
})
