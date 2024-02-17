import { Box, Grid } from '@mui/material'
import { styled } from '@mui/material/styles'

export const ProductsTableContainer = styled(Box)<{
  isProductSelected: boolean
}>(({ theme, isProductSelected }) => ({
  paddingTop: theme.spacing(9),
  flexBasis: isProductSelected ? '40%' : '100%',
}))

export const ProductDetailsContainer = styled(Box)<{
  isProductSelected: boolean
}>(({ isProductSelected }) => ({
  flexBasis: isProductSelected ? '60%' : 0,
}))

export const GridItem = styled(Grid)(({ theme }) => ({
  borderLeft: `1px solid ${theme.palette.grayColors[4]}`,
  height: '100%',
  overflowY: 'auto',
  [theme.breakpoints.down('md')]: {
    display: 'none',
  },
}))
