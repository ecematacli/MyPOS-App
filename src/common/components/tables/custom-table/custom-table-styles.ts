import {
  Box,
  Table,
  TablePagination,
  TableRow,
  Typography,
} from '@mui/material'
import { styled } from '@mui/material/styles'

export const StyledContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  marginTop: theme.spacing(3),
  color: theme.palette.secondary.main,
  // backgroundColor: 'coral',
}))

export const IconContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  marginRight: theme.spacing(2),
}))

export const StyledIcon = styled(Box)(({ theme }) => ({
  fontSize: theme.spacing(3),
  color: theme.palette.primary.dark,
}))

export const StyledTablePagination = styled(TablePagination)(({ theme }) => ({
  // marginBottom: 50,
  borderBottom: 'none',
  fontSize: 13,

  '& .MuiTablePagination-toolbar': {
    [theme.breakpoints.down('sm')]: {
      fontSize: 13,
    },
  },
  '& .MuiTablePagination-select': {
    [theme.breakpoints.down('sm')]: {
      fontSize: 13,
    },
  },
  '& .MuiTablePagination-caption': {
    [theme.breakpoints.down('sm')]: {
      fontSize: 13,
    },
  },
}))

export const NoDisplayMessage = styled(Typography)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  color: theme.palette.grayColors[3],
  fontSize: theme.spacing(2.25),
}))

export const PaginationContainer = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(2),
  fontSize: theme.spacing(2),
  width: '93%',
  margin: 'auto',
  display: 'flex',
  justifyContent: 'flex-end',
}))

export const StyledTable = styled(Table)<{ noPagination?: boolean }>(
  ({ noPagination }) => ({
    width: '90%',
    maxWidth: '90%',
    margin: 'auto',
    borderCollapse: 'separate',
    borderSpacing: '0 15px',
    marginBottom: noPagination ? '35px' : '0',
  })
)

export const StyledTableHeadRow = styled(TableRow)(({ theme }) => ({
  '& > th': {
    borderBottom: 'none',
    paddingBottom: 6,
    color: theme.palette.grayColors[7],
    fontSize: 14,
    fontWeight: 600,
    [theme.breakpoints.down('sm')]: {
      fontSize: 13,
    },
  },
}))
