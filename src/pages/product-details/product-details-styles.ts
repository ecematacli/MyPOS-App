import {
  Box,
  Card,
  Grid,
  IconButton,
  OutlinedInput,
  Paper,
  Typography,
} from '@mui/material'
import { styled, Theme } from '@mui/material/styles'

export const ProductDetailsContainer = styled(Box)(({ theme }) => ({
  // marginTop: theme.spacing(5),
  // boxShadow: '0 2px 7px 0 rgba(0, 0, 0, 0.08)',
  // minHeight: '90%',
  // overflow: 'auto',
  paddingTop: theme.spacing(3),
  paddingBottom: theme.spacing(4),
  fontSize: 14,
  color: theme.palette.secondary.main,
  display: 'flex',
  flexDirection: 'column',
  position: 'relative',
  alignItems: 'center',
  background: 'transparent',
}))

export const PaperHead = styled(Box)(({ theme }) => ({
  borderRadius: 3,
  width: '75%',
  height: 65,
  padding: theme.spacing(2),
  display: 'flex',
  justifyContent: 'space-between',
  zIndex: 5,
  background: `${theme.palette.greenColors[6]}`,
}))

export const DetailContentTypography = styled(Typography)(({ theme }) => ({
  textIndent: 0,
  // paddingLeft: theme.spacing(3),
  // whiteSpace: 'nowrap',
  // overflow: 'hidden',
  // textOverflow: 'ellipsis',
  [theme.breakpoints.down('sm')]: {
    fontSize: 13,
  },
}))

export const StyledLabel = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  color: theme.palette.grayColors[3],
  textDecoration: 'underline',
  paddingTop: '11px',
  paddingBottom: '11px',
}))

export const EditIconContainer = styled(Box)(({ theme }) => ({
  marginLeft: theme.spacing(2),
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  color: theme.palette.secondary.dark,
  cursor: 'pointer',
}))

export const ProductDetailsInfo = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'flex-start',

  // alignItems: 'center',
  padding: theme.spacing(0, 0, 4),
  [theme.breakpoints.down('sm')]: {
    ' & > p ': {
      fontSize: 14,
    },
  },
}))

export const ProductNameInfo = styled(Box)(({ theme }) => ({
  padding: theme.spacing(0, 0, 2),

  [theme.breakpoints.down('sm')]: {
    ' & > p ': {
      fontSize: 14,
    },
  },
}))

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

export const GridContainer = styled(Grid)(({ theme }) => ({
  padding: theme.spacing(2, 0),
  display: 'flex',
  alignItems: 'center',
}))

export const DetailsCard = styled(Card)(({ theme }) => ({
  backgroundColor: 'white',
  width: '100%',
  padding: theme.spacing(3, 6),
  boxShadow: 'none',
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

export const StyledInput = styled(OutlinedInput)<{ width?: number | string }>(
  ({ width }) => ({
    width: width || '60%',
    height: 45,
  })
)

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
