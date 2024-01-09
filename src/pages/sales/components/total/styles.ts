import { styled } from '@mui/material/styles'
import { Typography, Box, Select, Divider, FormControl } from '@mui/material'
import Edit from '@mui/icons-material/Edit'

export const StyledFormControl = styled(FormControl)(({ theme }) => ({
  '&.MuiFormControl-root': {
    width: 65,
    marginRight: theme.spacing(0.7),
  },
}))

export const StyledSelect = styled(Select)({
  '&.MuiSelect-root': {
    '&:focus': {
      backgroundColor: 'transparent',
    },
  },
})

export const StyledEditIcon = styled(Edit)(({ theme }) => ({
  fontSize: 14,
  marginLeft: theme.spacing(0.5),
  cursor: 'pointer',
}))

export const DiscountText = styled(Typography)(({ theme }) => ({
  color: theme.palette.grayColors[3],
  textDecoration: 'underline',
  fontWeight: 'bold',
  cursor: 'pointer',
}))

export const TotalDivider = styled(Divider)(({ theme }) => ({
  backgroundColor: theme.palette.secondary.light,
}))

export const TotalSectionContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(0, 2),
  margin: theme.spacing(1),
  [theme.breakpoints.down('sm')]: {
    ' & > * ': {
      fontSize: 14,
    },
  },
}))
