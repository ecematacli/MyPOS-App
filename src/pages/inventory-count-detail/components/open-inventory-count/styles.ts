import { Box, Grid } from '@mui/material'
import { styled } from '@mui/material/styles'

export const StatsSectionContainer = styled(Box)(({ theme }) => ({
  margin: '0 auto',
  maxWidth: theme.spacing(137.5),
}))

export const GridItem = styled(Grid)({
  paddingTop: 0,
  // height: '100vh',
  overflow: 'auto',
})

export const CountTableContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  padding: theme.spacing(3.5, 6),
}))
