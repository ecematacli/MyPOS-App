import { Box, Typography, Button } from '@mui/material'
import { styled } from '@mui/material/styles'

export const TitleText = styled(Box)(({ theme }) => ({
  fontSize: theme.spacing(3.2),
  fontWeight: 'bold',
  color: theme.palette.grayColors[17],
}))

export const InfoText = styled(Typography)(({ theme }) => ({
  color: theme.palette.secondary.main,
  paddingRight: theme.spacing(2.5),
}))

export const UploadButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  '&:hover': {
    backgroundColor: theme.palette.primary.light,
  },
}))

export const TableContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  padding: theme.spacing(3.5, 6),
  marginTop: theme.spacing(2.5),
}))

export const TableSectionWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  maxWidth: theme.spacing(137.5),
  margin: '0 auto',
}))

export const ButtonText = styled(Typography)({
  textTransform: 'capitalize',
  color: 'white',
})
