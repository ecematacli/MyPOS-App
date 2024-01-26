import { Box, Typography, Divider } from '@mui/material'
import { styled } from '@mui/material/styles'

export const LastCountedContainer = styled(Box)(({ theme }) => ({
  borderLeft: `0.1em solid ${theme.palette.grayColors[10]}`,
  overflow: 'auto',
}))

export const Title = styled(Typography)(({ theme }) => ({
  color: theme.palette.secondary.main,
  fontSize: theme.spacing(2.25),
}))

export const StyledDivider = styled(Divider)(({ theme }) => ({
  backgroundColor: `0.1em solid ${theme.palette.grayColors[10]}`,
}))

export const ImageContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: theme.spacing(5),
}))

export const CountInputActionContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  marginLeft: theme.spacing(3),
}))

export const AccordionDetailText = styled(Box)(({ theme }) => ({
  fontWeight: 600,
  marginRight: theme.spacing(1),
}))

export const CountNumber = styled(Box)(({ theme }) => ({
  paddingRight: theme.spacing(2),
  fontSize: 20,
}))
