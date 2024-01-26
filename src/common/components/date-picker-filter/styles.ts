import { styled } from '@mui/material/styles'
import { Box, Typography } from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'

export const FilterCaption = styled(Typography)(({ theme }) => ({
  marginTop: theme.spacing(3),
  paddingLeft: theme.spacing(2),
  paddingBottom: theme.spacing(2),
  borderBottom: `1px solid ${theme.palette.secondary.light}`,
  fontSize: theme.spacing(2),
  color: 'rgba(0, 0, 0, 0.54)',
}))

export const DatePickerContainer = styled(Box)(({ theme }) => ({
  display: 'inline-block',
  marginTop: theme.spacing(3.5),
  '@media (max-width:420px)': {
    paddingRight: theme.spacing(5),
  },
}))

export const StyledDatePicker = styled(DatePicker)({
  '@media (max-width:420px)': {
    width: '230px !important',
  },
  '@media (max-width:600px) and (min-width: 421px)': {
    width: '280px !important',
  },
})
