import { Box, Typography, OutlinedInput, Button } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { styled } from '@mui/material/styles'

export const StatsSectionContainer = styled(Box)(({ theme }) => ({
  margin: '0 auto',
  maxWidth: theme.spacing(137.5),
}))

export const CountInputActionContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  marginLeft: theme.spacing(3),
}))

export const ModeText = styled(Typography)(({ theme }) => ({
  fontSize: theme.spacing(1.6),
  color: theme.palette.secondary.main,
  marginLeft: `${-theme.spacing(0.6)}px`,
}))

export const StyledOutlinedInput = styled(OutlinedInput)(({ theme }) => ({
  '& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button': {
    '-webkit-appearance': 'none',
    margin: 0,
  },

  '.MuiOutlinedInput-root': {
    width: theme.spacing(8),
    height: 55,
    borderRadius: 0,
    '& input:valid:focus + fieldset': {
      borderColor: '#008ae8',
      boxShadow: '0 0 3px #008ae8',
    },
  },
  '.MuiOutlinedInput-input': {
    textAlign: 'center',
  },
}))

export const FieldBox = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(0.5),
  '& > span': {
    fontWeight: 600,
  },
}))

export const TitleText = styled(Typography)(({ theme }) => ({
  fontSize: theme.spacing(2.6),
  fontWeight: 'bold',
  color: theme.palette.grayColors[17],
}))

export const IconContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  marginLeft: `${-theme.spacing(0.8)}px`,
}))

export const BackArrowIcon = styled(ArrowBackIcon)(({ theme }) => ({
  color: theme.palette.grayColors[13],
  cursor: 'pointer',
}))

export const StyledButton = styled(Button)(({ theme }) => ({
  marginRight: theme.spacing(1),
  '&.Mui-disabled': {
    backgroundColor: theme.palette.grayColors[13],
  },
  backgroundColor: theme.palette.primary.main,
  '&:hover': {
    backgroundColor: theme.palette.primary.light,
  },
}))
