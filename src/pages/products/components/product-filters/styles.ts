import { Box, Button, Chip, TableRow, Typography } from '@mui/material'
import { styled, Theme } from '@mui/material/styles'
import FilterListIcon from '@mui/icons-material/FilterList'

export const StyledTableRow = styled(TableRow)(({ theme }) => ({
  height: theme.spacing(3),
  '&:last-child': {
    '& > td': {
      borderBottom: 'none',
    },
  },
  '& > td': {
    fontWeight: 545,
    fontSize: 14,
    padding: theme.spacing(2),
    borderBottom: `0.5px solid ${theme.palette.secondary.light}`,
    color: 'inherit',
    [theme.breakpoints.down('sm')]: {
      fontSize: 14,
    },
  },
}))

export const FilterIconContainer = styled(Box)(({ theme }) => ({
  width: '90%',
  display: 'flex',
  justifyContent: 'flex-end',
  margin: 'auto',
  marginTop: theme.spacing(3),
  marginBottom: -theme.spacing(1),
  cursor: 'pointer',
}))

export const StyledFilterListIcon = styled(FilterListIcon)(({ theme }) => ({
  fontSize: theme.spacing(4),
  color: theme.palette.secondary.main,
}))

export const FilterCaption = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(3),
  paddingLeft: theme.spacing(2),
  paddingBottom: theme.spacing(2),
  borderBottom: '1px solid #eee',
  fontSize: theme.spacing(2),
  color: 'rgba(0, 0, 0, 0.54)',
}))

export const FilterInputContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(4, 3, 4),
}))

export const FilterInputs = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(4),
  '&:last-child': {
    marginBottom: 0,
  },
}))

export const FilterLabel = styled(Typography)(({ theme }) => ({
  marginRight: theme.spacing(5),
  color: theme.palette.grayColors[3],
  '@media (max-width:465px)': {
    marginRight: 0,
  },
}))

export const FilterButtonContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'flex-end',
  marginBottom: theme.spacing(1.5),
}))

export const StyledFilterButton = styled(Button)(({ theme }) => ({
  textTransform: 'capitalize',
  fontSize: theme.spacing(2),
  [theme.breakpoints.down('sm')]: {
    fontSize: 13,
  },
}))

export const StyledChipInput = styled(Chip)(({ theme }) => ({
  backgroundColor: theme.palette.primary.dark,
  marginLeft: theme.spacing(1),
  marginTop: 10,
}))

export const StyledPopoverContent = styled(Box)({
  maxWidth: 435,
  '@media (max-width:465px)': {
    width: 340,
  },
})

export const getInputRootStyles = (theme: Theme) => ({
  width: 258,
  height: 35,
  borderColor: theme.palette.secondary.dark,
  '&:focus': {
    backgroundColor: 'transparent !important',
  },
  '@media (max-width:465px)': {
    width: 210,
  },
})

export const getInputStyles = (theme: Theme) => ({
  [theme.breakpoints.down('sm')]: {
    fontSize: theme.spacing(1.6),
  },
})
export const getDropdownInputStyles = () => ({
  width: 258,
  '@media (max-width:465px)': {
    width: 210,
  },
})
