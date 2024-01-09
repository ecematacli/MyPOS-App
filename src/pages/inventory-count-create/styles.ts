import { Box, Button, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'
import { ArrowBack as ArrowBackIcon } from '@mui/icons-material'

export const AddCountContainer = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  flex: 1,
  boxShadow: 'none',
})

export const IconContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  marginLeft: `${-theme.spacing(0.8)}px`,
}))

export const FiltersContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  padding: theme.spacing(3.5, 6),
  margin: '0 auto',
  maxWidth: theme.spacing(137.5),
}))

export const DividerContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(4),
  marginTop: theme.spacing(9),
  '& *': {
    backgroundColor: theme.palette.secondary.light,
  },
}))

export const CreateInventoryContainer = styled(Box)(({ theme }) => ({
  paddingTop: theme.spacing(3),
}))

export const StartButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  '&:hover': {
    backgroundColor: theme.palette.primary.light,
  },
}))

export const ImageContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  marginTop: theme.spacing(6.25),
  margin: '0 auto',
  maxWidth: theme.spacing(137.5),
}))

export const BackArrowIcon = styled(ArrowBackIcon)(({ theme }) => ({
  color: theme.palette.grayColors[13],
  cursor: 'pointer',
}))

export const TitleText = styled(Typography)(({ theme }) => ({
  fontSize: theme.spacing(3.2),
  fontWeight: 'bold',
}))

export const InfoText = styled(Typography)(({ theme }) => ({
  color: theme.palette.secondary.main,
  paddingRight: theme.spacing(2.5),
}))

export const StartCountContainer = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  flex: 1,
})
