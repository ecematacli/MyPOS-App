import { Paper, Typography, Divider, Box } from '@mui/material'
import { styled } from '@mui/material/styles'

export const StyledPaper = styled(Paper)({
  minHeight: 570,
})

export const StyledTitle = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3, 2.5),
  color: theme.palette.grayColors[3],
  boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.1)',
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
