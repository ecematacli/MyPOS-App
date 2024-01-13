import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { Box, Button, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'

export const IconContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  marginLeft: `${-theme.spacing(0.8)}px`,
}))

export const BackArrowIcon = styled(ArrowBackIcon)(({ theme }) => ({
  color: theme.palette.grayColors[13],
  cursor: 'pointer',
}))

export const TitleText = styled(Typography)(({ theme }) => ({
  fontSize: theme.spacing(3.2),
  fontWeight: 'bold',
  color: theme.palette.grayColors[17],
}))

export const InfoText = styled(Typography)(({ theme }) => ({
  color: theme.palette.secondary.main,
  paddingRight: theme.spacing(2.5),
}))

export const ValidateButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  '&:hover': {
    backgroundColor: theme.palette.primary.light,
  },
}))

export const ValidateText = styled(Typography)({
  textTransform: 'capitalize',
  color: 'white',
})

export const UploadFileContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  padding: theme.spacing(3.5, 6),
  marginTop: theme.spacing(2.5),
}))

export const UploadFileWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  maxWidth: theme.spacing(137.5),
  margin: '0 auto',
}))

export const UploadFeedback = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  width: '85%',
  paddingRight: theme.spacing(3.75),
}))
