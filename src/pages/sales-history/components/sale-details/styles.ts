import { Box, TableRow, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'

export const StyledTableRow = styled(TableRow)(({ theme }) => ({
  height: theme.spacing(3),
  '&:last-child': {
    '& > td': {
      borderBottom: 'none',
    },
  },
  '& > td': {
    fontWeight: 545,
    fontSize: 14,
    padding: theme.spacing(2),
    borderBottom: `0.5px solid ${theme.palette.secondary.light}`,
    color: 'inherit',
    [theme.breakpoints.down('sm')]: {
      fontSize: 14,
    },
  },
}))

export const StyledTableHeadRow = styled(TableRow)(({ theme }) => ({
  '& > th': {
    borderBottom: `1px solid ${theme.palette.whiteColors[0]}`,
    paddingBottom: 6,
    fontSize: 14,
    fontWeight: 700,
    color: theme.palette.grayColors[7],
    [theme.breakpoints.down('sm')]: {
      fontSize: 14,
    },
  },
}))

export const DetailTotalContainer = styled(Box)<{ rowIndex: number }>(
  ({ theme, rowIndex }) => ({
    width: '95%',
    height: theme.spacing(6),
    // background:
    //   rowIndex % 2 ? theme.palette.grey[800] : theme.palette.success[700],
    margin: 'auto',
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(2),
  })
)

export const TotalText = styled(Typography)(({ theme }) => ({
  width: '100%',
  paddingRight: theme.spacing(5),
  color: 'inherit',
  fontWeight: 'bold',
  fontSize: 16,
}))

export const TableContainer = styled(Box)({
  marginBottom: 0,
  width: '95%',
  borderSpacing: 0,
  borderCollapse: 'collapse',
})

export const SalesDetailsPaper = styled(TableRow)<{ rowIndex: number }>(
  ({ theme, rowIndex }) => ({
    boxShadow: '0 2px 7px 0 rgba(0, 0, 0, 0.08)',
    overflow: 'auto',
    marginTop: '-14.8px',
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(4),
    fontSize: 14,
    borderTop: 'transparent',
    color: theme.palette.secondary.main,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    background:
      rowIndex % 2
        ? theme.palette.greenColors[2]
        : theme.palette.whiteColors[0],
  })
)
