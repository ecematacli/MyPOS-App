import {
  Box,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
} from '@mui/material'
import { styled } from '@mui/material/styles'

export const StyledTableCell = styled(TableCell)<{ cellType?: string }>(
  ({ cellType, theme }) => ({
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    maxWidth: '150px',
    backgroundColor:
      cellType === 'header' ? theme.palette.grayColors[0] : 'unset',
  })
)

export const StyledTableBodyRow = styled(TableRow)(({ theme }) => ({
  '&:last-child td, &:last-child th': { border: 0 },
  cursor: 'pointer',
}))

export const StyledTablePagination = styled(TablePagination)(({ theme }) => ({
  borderBottom: 'none',
  fontSize: '16px',

  '.MuiTablePagination-displayedRows': {
    fontSize: '16px',

    [theme.breakpoints.down('sm')]: {
      fontSize: 13,
    },
  },
  // fontSize: 13,

  // '& .MuiTablePagination-toolbar': {
  //   [theme.breakpoints.down('sm')]: {
  //     fontSize: 13,
  //   },
  // },
  // '& .MuiTablePagination-select': {
  //   [theme.breakpoints.down('sm')]: {
  //     fontSize: 13,
  //   },
  // },
  // '& .MuiTablePagination-caption': {
  //   [theme.breakpoints.down('sm')]: {
  //     fontSize: 13,
  //   },
  // },
}))

export const PaginationContainer = styled(Box)(({ theme }) => ({
  // margin: theme.spacing(3, 0),
  // fontSize: theme.spacing(2),
  // width: '93%',
  // margin: 'auto',
  display: 'flex',
  justifyContent: 'flex-end',
}))
