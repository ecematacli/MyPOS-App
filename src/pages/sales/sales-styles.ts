import { Box, Grid } from '@mui/material'
import { styled } from '@mui/material/styles'

export const SalesPageContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3, 5, 2),
}))

export const SalesContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(1, 3, 0, 3),
  height: '100vh',
}))

export const ActionGridItem = styled(Grid)(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    flexBasis: '100%',
    order: 2,
  },
}))

export const PosTableGridItem = styled(Grid)(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    order: 3,
  },
}))

export const SearchBarGridItem = styled(Grid)(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    order: 2,
  },
}))
