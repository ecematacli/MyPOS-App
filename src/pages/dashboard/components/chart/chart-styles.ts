import { styled } from '@mui/material/styles'

import { Paper, Typography, Divider, ListItemButton, Box } from '@mui/material'

export const ChartPaper = styled(Paper)({
  height: 315,
  width: '100%',
  boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.14)',
  borderRadius: 6,
  position: 'relative',
})

export const IconContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3, 2.5),
  color: theme.palette.grayColors[3],
  boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.1)',
}))

export const DisplayOptionsTitle = styled(Typography)(({ theme }) => ({
  color: theme.palette.grayColors[9],
  padding: theme.spacing(3, 2.5),
}))

export const DisplayOptionsItem = styled(ListItemButton)(({ theme }) => ({
  fontSize: theme.spacing(2),
  [theme.breakpoints.down('sm')]: {
    fontSize: 14,
  },
  padding: theme.spacing(2, 2),
  cursor: 'pointer',
}))

export const StyledDivider = styled(Divider)(({ theme }) => ({
  padding: theme.spacing(3, 2.5),
  color: theme.palette.grayColors[3],
}))

export const NoDisplayText = styled(Typography)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  paddingTop: theme.spacing(3),
  color: theme.palette.secondary.main,
}))

export const ActivitiesContentContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  paddingTop: theme.spacing(3),
  color: theme.palette.secondary.main,
}))

export const CreatedContentContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(1, 1),

  '& .createdText': {
    fontSize: 15,
    color: theme.palette.secondary.main,
  },
}))
