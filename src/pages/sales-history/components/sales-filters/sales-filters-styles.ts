import { Box, Button } from '@mui/material'
import { styled, Theme } from '@mui/material/styles'
import FilterListIcon from '@mui/icons-material/FilterList'

export const StyledContainer = styled(Box)(({ theme }) => ({
  width: '90%',
  margin: 'auto',
  marginTop: theme.spacing(3),
  marginBottom: `${-theme.spacing(1)}px`,
}))

export const SalesFilterContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3.4, 4),
}))

export const FilterButtonContainer = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(6),
  '@media (max-width:420px)': {
    paddingRight: theme.spacing(7),
    marginBottom: `${-theme.spacing(3)}px`,
  },
}))

export const FilterButton = styled(Button)(({ theme }) => ({
  textTransform: 'capitalize',
  fontSize: theme.spacing(2),
}))

export const StyledFilterListIcon = styled(FilterListIcon)(({ theme }) => ({
  fontSize: theme.spacing(4),
  color: theme.palette.secondary.main,
}))

export const getDropdownInputStyles = (theme: Theme) => ({
  width: 200,
  height: 50,
  marginBottom: 15,
  color: theme.palette.secondary.main,
  marginTop: theme.spacing(3),
})
