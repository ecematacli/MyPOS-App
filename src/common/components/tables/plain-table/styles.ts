import { styled } from '@mui/material/styles'

import { Box, Table, TableRow, TableCell } from '@mui/material'

export const StyledTable = styled(Table)<{ noPagination: boolean }>(
  ({ noPagination }) => ({
    marginBottom: noPagination ? 35 : 0,
  })
)

export const NoDisplayCell = styled(TableCell)({
  borderBottom: 'none',
  paddingTop: 50,
})

export const CellName = styled(Box)<{ isFirstRow: boolean; type: string }>(
  ({ isFirstRow, type }) => ({
    paddingLeft: isFirstRow && type === 'batchProducts' ? 13 : 'unset',
  })
)

export const NoDisplayMessage = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  color: theme.palette.secondary.main,
  fontSize: theme.spacing(2.25),
}))

export const PaginationContainer = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(2),
  marginBottom: theme.spacing(5),
  fontSize: theme.spacing(2),
  display: 'flex',
  justifyContent: 'flex-end',
}))

export const StyledTableHeadRow = styled(TableRow)<{ type: string }>(
  ({ type, theme }) => ({
    borderTop: type === 'batchProducts' ? '1.9px solid #e9e9e9' : 'unset',
    width: '15.3%',
    '& > th': {
      color: theme.palette.grayColors[3],
      '&:nth-child(2)': {
        width: '27%',
      },
      '&:nth-child(3)': {
        width: '27%',
      },
    },
  })
)
