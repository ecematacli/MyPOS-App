import { Box, Button, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'

export const AddCountContainer = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  flex: 1,
  boxShadow: 'none',
})

export const InfoText = styled(Typography)(({ theme }) => ({
  color: theme.palette.secondary.main,
  paddingRight: theme.spacing(2.3),
}))

export const ImageContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: theme.spacing(5),
}))

export const TableContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  padding: theme.spacing(3.5, 6),
}))

export const TableSectionWrapper = styled(Box)(({ theme }) => ({
  margin: '0 auto',
  maxWidth: theme.spacing(137.5),
  display: 'flex',
}))

export const AddButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  '&:hover': {
    backgroundColor: theme.palette.primary.light,
  },
}))
