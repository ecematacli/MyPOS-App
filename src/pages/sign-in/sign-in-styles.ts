import { Box, Card, CardContent, CardMedia, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'

export const CardContainer = styled(Box)(({ theme }) => ({
  // width: '100vw',
  // height: '100vh',
  height: '100%',
  overflow: 'hidden',
  display: 'flex',
  justifyContent: 'center',
}))

export const StyledCardMedia = styled(CardMedia)(({ theme }) => ({
  height: theme.spacing(31.25),
  width: theme.spacing(35),
  '@media (max-width:760px) and (min-width: 568px)': {
    width: theme.spacing(37),
  },
  '@media (max-width:375px)': {
    width: theme.spacing(20),
    height: theme.spacing(15),
  },
}))

export const StyledCardContent = styled(CardContent)(({ theme }) => ({
  marginLeft: theme.spacing(2.8),
  '@media (max-width:760px)': {
    marginLeft: theme.spacing(1),
  },
}))
export const SignInText = styled(Typography)(({ theme }) => ({
  color: theme.palette.secondary.main,
  fontSize: theme.spacing(2.5),
  marginBottom: theme.spacing(2),
}))

export const ButtonText = styled(Typography)(({ theme }) => ({
  fontSize: theme.spacing(2),
  fontWeight: 'bold',
  textTransform: 'capitalize',
  '@media (max-width:567px)': {
    fontSize: theme.spacing(2.2),
    paddingLeft: theme.spacing(2.5),
  },
}))

export const CardContentContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: 'auto',
  height: '100%',
  '@media (max-width:760px) and (min-width: 568px)': {
    flexDirection: 'column',
    paddingTop: theme.spacing(5),
  },
  '@media (max-width:567px)': {
    flexDirection: 'column',
    paddingTop: theme.spacing(6),
  },
}))

export const SignInCard = styled(Card)(({ theme }) => ({
  boxShadow: '0 1px 4px 0 rgba(0, 0, 0, 0.30)',
  overflow: 'hidden',
  marginTop: theme.spacing(25),
  color: theme.palette.whiteColors[0],
  width: theme.spacing(87.5),
  height: theme.spacing(56.25),
  borderRadius: '3%',
  '@media (max-width:760px) and (min-width: 568px)': {
    width: '70%',
    height: '50%',
  },
  '@media (max-width:567px) and (min-width: 421px)': {
    width: '80%',
    height: '55%',
  },
  '@media (max-width:420px) and (min-width: 409px)': {
    marginTop: theme.spacing(12.5),
    width: '90%',
    height: '75%',
  },
  '@media (max-width:408px)': {
    marginTop: theme.spacing(8),
    width: '73%',
    height: '68%',
  },
}))
