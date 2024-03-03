import { styled } from '@mui/material/styles'
import { Box, Typography, Grid } from '@mui/material'

export const FilterCaption = styled(Typography)(({ theme }) => ({
  marginTop: theme.spacing(3),
  padding: theme.spacing(3.4, 4),
  paddingBottom: theme.spacing(2),
  borderBottom: `1px solid ${theme.palette.secondary.light}`,
  fontSize: theme.spacing(2),
  color: 'rgba(0, 0, 0, 0.54)',
}))

export const DatePickerContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  marginTop: theme.spacing(3.5),
}))

export const GridContainer = styled(Grid)(({ theme }) => ({
  padding: theme.spacing(3.4, 4),
}))
