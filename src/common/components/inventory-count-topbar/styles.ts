import { styled } from '@mui/material/styles'
import { Box } from '@mui/material'

export const TitleContainer = styled(Box)<{ type?: string }>(
  ({ theme, type }) => ({
    display: 'block',
    position: 'relative',
    padding:
      type === 'countBatches'
        ? theme.spacing(0.8, 6, 0)
        : theme.spacing(0.8, 6, 2),
    marginTop: theme.spacing(5),
    [theme.breakpoints.down('md')]: {
      marginTop: theme.spacing(8.5),
    },
  })
)

export const TitleWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  margin: '0 auto',
  maxWidth: theme.spacing(137.5),
}))

export const ActionSectionWrapper = styled(Box)(({ theme }) => ({
  display: 'block',
  margin: '0 auto',
  maxWidth: theme.spacing(137.5),
}))

export const InventoryCountActionsContainer = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.grayColors[18],
  display: 'block',
  padding: theme.spacing(3.5, 6),
  position: 'sticky',
  top: 0,
  zIndex: 99,
}))
