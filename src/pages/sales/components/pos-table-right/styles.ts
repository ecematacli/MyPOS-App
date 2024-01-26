import {
  Accordion,
  Button,
  Divider,
  Paper,
  Typography,
  styled,
} from '@mui/material'
import { Box } from '@mui/system'

export const RootPaper = styled(Paper)(({ theme }) => ({
  boxShadow: '0 2px 7px 0 rgba(0, 0, 0, 0.15)',
  [theme.breakpoints.down('md')]: {
    marginBottom: theme.spacing(2),
  },
}))

export const StyledBox = styled(Box)(({ theme }) => ({
  // '@media (max-width:1499px) and (min-width:1390px)': {
  //   width: '85%',
  // },
  // fontWeight: 'bolder',
  // height: '78vh',
  // overflow: 'auto',
}))

export const StyledAccordion = styled(Accordion)(({ theme }) => ({
  '& > .MuiPaper': {
    boxShadow: 'none',
  },
  padding: theme.spacing(0, 1),
}))

export const ExpansionPanelRoot = styled(Accordion)(({ theme }) => ({
  '& > .MuiPaper': {
    boxShadow: 'none',
  },
  padding: theme.spacing(0, 1),
}))

export const TotalDivider = styled(Divider)(({ theme }) => ({
  backgroundColor: theme.palette.secondary.light,
}))

export const StyledButton = styled(Button)(({ theme }) => ({
  marginRight: theme.spacing(2),
  background: theme.palette.greenColors[2],
  color: theme.palette.primary.main,
  '&:hover': {
    color: '#fff',
  },
}))

export const PaymentBtnTextHolder = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  width: '100%',
}))

export const PaymentButtonText = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  fontSize: theme.spacing(2.5),
  [theme.breakpoints.down('sm')]: {
    fontSize: 16,
  },
  '@media (max-width:405px)': {
    margin: 'auto',
  },
}))
