import { Box, Typography } from '@mui/material'
import { styled, Theme } from '@mui/material/styles'
import { ArrowBack } from '@mui/icons-material'

export const AddCountContainer = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  flex: 1,
  boxShadow: 'none',
})

export const IconContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  marginRight: theme.spacing(1),
}))

export const TableSectionWrapper = styled(Box)(({ theme }) => ({
  margin: '0 auto',
  maxWidth: theme.spacing(137.5),
  display: 'flex',
  flexDirection: 'column',
}))

export const TableContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  padding: theme.spacing(0, 6),
}))

export const TitleText = styled(Typography)(({ theme }) => ({
  fontSize: theme.spacing(3.2),
  fontWeight: 'bold',
  color: theme.palette.grayColors[17],
}))

export const BackArrowIcon = styled(ArrowBack)(({ theme }) => ({
  color: theme.palette.grayColors[13],
  cursor: 'pointer',
}))

export const getTabsStyles = (theme: Theme) => ({
  boxShadow: 'none',
  marginTop: theme.spacing(4),
  color: theme.palette.grayColors[3],
  backgroundColor: 'inherit',
})
