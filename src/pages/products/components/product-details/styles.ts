import { Box, Card, IconButton, Paper, Typography } from '@mui/material'
import { styled, Theme } from '@mui/material/styles'

export const ProductDetailsContainer = styled(Paper)<{ rowIndex?: number }>(
  ({ theme, rowIndex }) => ({
    boxShadow: '0 2px 7px 0 rgba(0, 0, 0, 0.08)',
    overflow: 'auto',
    marginTop: '-14.8px',
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(4),
    fontSize: 14,
    borderTop: 'transparent',
    color: theme.palette.secondary.main,
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    alignItems: 'center',
    background:
      rowIndex % 2
        ? `${theme.palette.greenColors[2]}`
        : `${theme.palette.whiteColors[0]}`,
  })
)
export const PaperHead = styled(Box)<{ rowIndex?: number }>(
  ({ theme, rowIndex }) => ({
    borderRadius: 3,
    width: '65%',
    height: 65,
    marginBottom: `${-theme.spacing(4)}px`,
    padding: theme.spacing(2),
    display: 'flex',
    justifyContent: 'space-between',
    zIndex: 5,
    background:
      rowIndex % 2
        ? `${theme.palette.grayColors[10]}`
        : `${theme.palette.greenColors[6]}`,
  })
)
export const DetailContent = styled(Typography)(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    fontSize: 13,
  },
}))

export const EditIconContainer = styled(Box)(({ theme }) => ({
  marginLeft: theme.spacing(2),
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  color: theme.palette.secondary.dark,
  cursor: 'pointer',
}))

export const ProductDetailsInfo = styled(Box)<{ rowIndex?: number }>(
  ({ theme }) => ({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    '&:first-child': {
      marginTop: 40,
    },
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    margin: theme.spacing(1),
    color: theme.palette.secondary.main,
    [theme.breakpoints.down('sm')]: {
      ' & > p ': {
        fontSize: 14,
      },
    },
  })
)
export const PaperTitle = styled(Typography)(({ theme }) => ({
  fontSize: 20,
  fontWeight: 'bold',
  color: theme.palette.secondary.dark,
}))

export const EditFormContainer = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  cursor: 'pointer',
})

export const DetailsCard = styled(Card)(({ theme }) => ({
  width: '75%',
  height: '80%',
  boxShadow: 'none',
  backgroundColor: 'inherit',
  paddingLeft: theme.spacing(2.5),
  paddingRight: theme.spacing(2),
  border: `1px solid ${theme.palette.secondary.light}`,
  marginBottom: 15,
}))

export const StyledIconButton = styled(IconButton)({
  width: 35,
  height: 35,
  padding: 0,
  '& > span': {
    display: 'flex',
    alignItems: 'center',
  },
})
export const DetailActionButton = styled(IconButton)(({ theme }) => ({
  width: 25,
  height: 25,
  fontSize: theme.spacing(3.5),
  backgroundColor: 'transparent',
  boxShadow: 'none',
}))

export const getRootInputStyles = () => ({
  width: '246px',
  height: '35px',
})

export const getInputStyles = (theme: Theme) => ({
  [theme.breakpoints.down('sm')]: {
    fontSize: 13,
  },
})

export const getDropdownInputRootStyles = () => ({
  width: '246px',
})

export const getInnerInputStyles = () => ({
  height: '35px',
  backgroundColor: 'none',
})
