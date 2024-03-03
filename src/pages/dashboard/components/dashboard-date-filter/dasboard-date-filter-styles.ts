import { styled } from '@mui/material/styles'
import { Box, Button } from '@mui/material'

export const IconContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3, 2.5),
  color: theme.palette.grayColors[3],
  boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.1)',
}))

export const InputContainer = styled(Box)(({ theme }) => ({
  marginRight: theme.spacing(2),
}))

export const FilterButtonContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'flex-end',
  padding: theme.spacing(3.4, 4),
}))

export const FilterButton = styled(Button)(({ theme }) => ({
  textTransform: 'capitalize',
  fontSize: theme.spacing(2),
}))

export const FilterContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3.4, 4),
}))
