import {
  Box,
  FormControl,
  InputLabel,
  OutlinedInput,
  Typography,
  Select,
} from '@mui/material'
import { styled } from '@mui/material/styles'
import InsertInvitationIcon from '@mui/icons-material/InsertInvitation'

export const AddCountContainer = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  flex: 1,
  boxShadow: 'none',
})

export const FiltersContainer = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(5.5),
  display: 'flex',
  width: '100%',
}))

export const CalendarIcon = styled(InsertInvitationIcon)(({ theme }) => ({
  color: theme.palette.secondary.main,
  marginRight: `-${theme.spacing(1.5)}px`,
}))

export const FiltersInfoBox = styled(Box)(({ theme }) => ({
  width: theme.spacing(21.25),
  height: theme.spacing(8.37),
  marginRight: theme.spacing(7),
}))

export const StyledInputLabel = styled(InputLabel)(({ theme }) => ({
  '&.MuiInputLabel-root': {
    color: theme.palette.secondary.main,
    fontSize: theme.spacing(1.87),
    fontWeight: 'bold',
  },
}))

export const StyledOutlinedInput = styled(OutlinedInput)(({ theme }) => ({
  marginLeft: theme.spacing(2.5),

  '&.MuiInputBase-root': {
    height: theme.spacing(5.75),
    width: theme.spacing(37.5),
    borderColor: theme.palette.secondary.dark,
    '&.Mui-focused': {
      backgroundColor: 'transparent !important',
    },
  },
  '& .MuiInputBase-input': {
    [theme.breakpoints.down('sm')]: {
      fontSize: theme.spacing(1.6),
    },
  },
}))

export const InfoText = styled(Typography)(({ theme }) => ({
  color: theme.palette.secondary.main,
}))

export const DropdownInputContainer = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(4),
  display: 'flex',
}))

export const StyledFormControl = styled(FormControl)(({ theme }) => ({
  '&.MuiFormControl-root': {
    width: theme.spacing(37.5),
  },
}))

export const StyledSelect = styled(Select)(({ theme }) => ({
  '&.MuiSelect-root': {
    '& .Mui-focused': {
      backgroundColor: 'transparent',
    },
  },
}))
