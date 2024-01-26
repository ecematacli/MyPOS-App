import { Box, Button } from '@mui/material'
import { styled } from '@mui/material/styles'

export const TitleContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2, 4),
}))

export const ContentContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2, 4),
  background: theme.palette.secondary.light,
}))

export const StyledButton = styled(Button)(({ theme }) => ({
  marginLeft: theme.spacing(2),
  color: 'white',
}))

export const FieldBox = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(0.5),
  '& > span': {
    fontWeight: 600,
  },
}))
