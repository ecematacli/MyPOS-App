import {
  Box,
  Paper,
  Divider,
  TableCell as MuiTableCell,
  TableRow,
} from '@mui/material'
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight'
import { styled } from '@mui/material/styles'

const centered = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}

export const PaperContainer = styled(Paper)({
  height: 570,
  boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.14)',
  position: 'relative',
})

export const TitleBox = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3, 2.5, 3, 1.7),
  color: theme.palette.grayColors[3],
}))

export const PaginationContainer = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  position: 'absolute',
  bottom: 15,
})

export const IconContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  marginRight: theme.spacing(0.8),
  marginLeft: theme.spacing(0.8),
  cursor: 'pointer',
}))

export const StyledDivider = styled(Divider)(({ theme }) => ({
  backgroundColor: theme.palette.secondary.light,
}))

export const ContentContainer = styled(Box)({
  overflow: 'auto',
  height: 480,
  display: 'flex',
  flexDirection: 'column',
  maxHeight: 420,
  maxWidth: '100%',
})

export const TableCell = styled(MuiTableCell)(({ theme }) => ({
  borderBottom: 'none',
  paddingTop: theme.spacing(6.25),
}))

export const TableHeadRow = styled(TableRow)(({ theme }) => ({
  '& > th': {
    borderBottom: `1px solid ${theme.palette.secondary.light}`,
    width: '98px',
    [theme.breakpoints.down('md')]: {
      fontSize: 14,
    },
    '&:nth-child(2)': {
      width: '110px',
    },
  },
}))

export const TableBodyRow = styled(TableRow)(({ theme }) => ({
  height: theme.spacing(15),
  maxHeight: theme.spacing(15),
  '& > td': {
    borderBottom: `1px solid ${theme.palette.secondary.light}`,
    height: 'auto !important',
    maxHeight: theme.spacing(15),
    [theme.breakpoints.down('md')]: {
      fontSize: 14,
    },
  },
  '&:last-child': {
    '& > td': {
      borderBottom: 'none',
    },
  },
}))

export const NoDisplayMessage = styled(Box)(({ theme }) => ({
  color: theme.palette.secondary.main,
  display: 'flex',
  justifyContent: 'center',
  fontSize: 18,
}))

export const QuantityData = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: theme.spacing(3),
  fontSize: 14,
  width: theme.spacing(3),
  borderRadius: '50%',
  backgroundColor: theme.palette.grayColors[1],
  color: theme.palette.secondary.main,
}))

export const ArrowLeftIcon = styled(KeyboardArrowLeftIcon)(({ theme }) => ({
  fontSize: theme.spacing(3.8),
  color: theme.palette.secondary.main,
}))

export const ArrowRightIcon = styled(KeyboardArrowRightIcon)(({ theme }) => ({
  fontSize: theme.spacing(3.8),
  color: theme.palette.secondary.main,
}))
