import { Chip, TableRow } from '@mui/material'
import { styled } from '@mui/material/styles'

export const StyledTableRow = styled(TableRow)<{ isEvenRow: boolean }>(
  ({ theme, isEvenRow }) => ({
    cursor: 'pointer',
    boxShadow: '0 2px 7px 0 rgba(0, 0, 0, 0.08)',
    background: isEvenRow
      ? theme.palette.whiteColors[0]
      : theme.palette.greenColors[2],
    '& > td': {
      paddingTop: theme.spacing(4),
      paddingBottom: theme.spacing(4),
      height: theme.spacing(12.5),
      maxHeight: theme.spacing(12.5),
      [theme.breakpoints.down('sm')]: {
        fontSize: 13,
      },
      color: 'inherit',
      fontWeight: theme.spacing(62.5),
      borderBottom: `1px solid ${theme.palette.secondary.light}`,
      '&:last-child': {
        paddingRight: theme.spacing(3),
      },
    },
  })
)

export const StyledChip = styled(Chip, {
  shouldForwardProp: prop => prop !== 'outletName',
})<{ outletName: string }>(({ outletName }) => {
  switch (outletName) {
    case 'Web':
      return {
        color: '#4c92d3',
        borderColor: '#4c92d3',
      }
    case 'POS':
      return {
        color: '#d84545',
        borderColor: '#d84545',
      }
    default:
      return {
        color: '#4caf50',
        borderColor: '#4caf50',
      }
  }
})
