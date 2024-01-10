import { Box } from '@mui/material'
import { styled } from '@mui/material/styles'

export const StatsSectionContainer = styled(Box)(({ theme }) => ({
  margin: '0 auto',
  maxWidth: theme.spacing(137.5),
}))

export const FieldBox = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(0.5),
  '& > span': {
    fontWeight: 600,
  },
}))
