import { TableRow, styled } from '@mui/material'
import { Box } from '@mui/system'
import MuiDeleteIcon from '@mui/icons-material/Delete'

export const PopOverTitle = styled(Box)(({ theme }) => ({
  fontSize: theme.spacing(2),
  color: theme.palette.secondary.main,
  [theme.breakpoints.down('sm')]: {
    fontSize: theme.spacing(1.7),
  },
}))

export const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '& > th, td': {
    fontSize: 14,
    [theme.breakpoints.down('sm')]: {
      fontSize: 13,
    },
  },
  '& > th': {
    color: theme.palette.grey[700],
    fontWeight: 600,
  },
}))

export const QuantityBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  paddingLeft: theme.spacing(3),
  cursor: 'pointer',
  textAlign: 'center',
}))

export const QuantityValueBox = styled(Box)(({ theme }) => ({
  margin: '0 10px',
  fontWeight: theme.spacing(50),
  fontSize: theme.spacing(1.75),
}))

export const EditableAmountBox = styled(Box)(({ theme }) => ({
  color: theme.palette.grayColors[3],
  textDecoration: 'underline',
  cursor: 'pointer',
  fontWeight: 'bold',
}))

export const TableWrapperBox = styled(Box)(({ theme }) => ({
  paddingTop: theme.spacing(1.5),
  minHeight: '45vh',
  overflow: 'auto',
  [theme.breakpoints.up('xl')]: {
    minHeight: '49vh',
  },
}))

export const DeleteIcon = styled(MuiDeleteIcon)(({ theme }) => ({
  color: theme.palette.secondary.dark,
  fontSize: 18,
}))

export const ArrowBox = styled(Box)(({ theme }) => ({
  color: theme.palette.secondary.main,
  fontWeight: theme.spacing(50),
  fontSize: theme.spacing(1.75),
}))
