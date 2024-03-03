import { Card, CardMedia, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'

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
})) as typeof CardMedia

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

export const SignInCard = styled(Card)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: theme.spacing(12, 10),
  borderRadius: '3%',

  [theme.breakpoints.down('md')]: {
    padding: theme.spacing(7, 5, 6),
  },
}))
