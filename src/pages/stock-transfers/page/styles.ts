import { Box, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'

export const TitleContainer = styled(Box)(({ theme }) => ({
  maxWidth: theme.spacing(137.5),
  margin: '0 auto',
  marginBottom: theme.spacing(2),
}))

export const ActionsBar = styled(Box)(({ theme }) => ({
  backgroundColor: '#f1f3f5',
  padding: '28px 48px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
}))

export const ActionSectionWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  margin: '0 auto',
  width: '100%',
  maxWidth: theme.spacing(137.5),
}))

export const StyledContent = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  maxWidth: theme.spacing(137.5),
  margin: '0 auto',
  paddingTop: theme.spacing(4),
  minHeight: '70vh',
}))

export const StyledTitle = styled(Typography)(({ theme }) => ({
  fontSize: theme.spacing(3.2),
  fontWeight: 'bold',
  color: theme.palette.grayColors[17],
}))

export const InfoText = styled(Typography)(({ theme }) => ({
  color: theme.palette.secondary.main,
  paddingRight: theme.spacing(2.5),
  width: '80%',
}))
