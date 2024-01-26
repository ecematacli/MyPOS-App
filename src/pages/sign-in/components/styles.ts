import { TextField, Typography } from '@mui/material'
import { styled, Theme } from '@mui/material/styles'

export const StyledTextField = styled(TextField)(({ theme }) => ({
  width: theme.spacing(37.5),
  marginBottom: theme.spacing(2.5),
  '@media (max-width:375px)': {
    width: theme.spacing(20),
  },
}))

export const HelperText = styled(Typography)(({ theme }) => ({
  fontSize: theme.spacing(2),
  color: theme.palette.error.main,
  marginBottom: theme.spacing(3),
  marginTop: `-${theme.spacing(2.5)}`,
  width: theme.spacing(37.5),
}))
