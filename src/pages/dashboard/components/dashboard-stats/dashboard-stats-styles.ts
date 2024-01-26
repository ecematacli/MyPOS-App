import { Box, Paper, Typography } from '@mui/material'
import { styled, Theme } from '@mui/material/styles'

export const getCommonStyles = (palette: Theme['palette']) => ({
  color: palette.whiteColors[0],
  width: 86,
  height: 87,
  marginTop: -2,
  position: 'absolute',
  left: -5,
  borderRadius: 3,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  '& > svg': {
    fontSize: '36px',
    lineHeight: '56px',
    textAlign: 'center',
    width: '36px',
    height: '36px',
    margin: '10px 10px 4px',
  },
})

export const getIconContainerStyles = (palette: Theme['palette']) => ({
  revenue: {
    background: `linear-gradient(60deg, ${palette.greenColors[0]}, ${palette.greenColors[1]})`,
    boxShadow:
      '0 4px 20px 0 rgba(0, 0, 0,.14), 0 7px 10px -5px rgba(76, 175, 80,.4)',
  },
  profit: {
    background: `linear-gradient(60deg, ${palette.yellowColors[0]}, ${palette.yellowColors[1]})`,
    boxShadow:
      '0 4px 20px 0 rgba(0, 0, 0,.14), 0 7px 10px -5px rgba(255, 152, 0,.4)',
  },
  saleCount: {
    background: `linear-gradient(60deg, ${palette.navyBlueColors[0]}, ${palette.navyBlueColors[1]})`,
    boxShadow:
      '0 4px 20px 0 rgba(0, 0, 0,.14), 0 7px 10px -5px rgba(2,55,70,.2)',
  },
  itemsSold: {
    background: `linear-gradient(60deg, ${palette.blueColors[0]}, ${palette.blueColors[1]})`,
    boxShadow:
      '0 4px 20px 0 rgba(0, 0, 0,.14), 0 7px 10px -5px rgba(0, 172, 193,.4)',
  },
})

export const StatsContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  minHeight: 135,
  [theme.breakpoints.down('sm')]: {
    marginTop: theme.spacing(3),
  },
}))

export const StatsPaper = styled(Paper)({
  width: '100%',
  boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.14)',
  borderRadius: 6,
  position: 'relative',
})

export const StatsContent = styled(Box)(({ theme }) => ({
  paddingRight: theme.spacing(2),
  paddingTop: 48,
  '@media (max-width:1050px) and (min-width:959px)': {
    paddingRight: 5,
  },
}))

export const StatsLabelTypography = styled(Typography)(({ theme }) => ({
  color: theme.palette.grayColors[9],
  fontSize: 14,
  paddingBottom: theme.spacing(0.3),
}))

export const StatsCurrencyValue = styled(Typography)(({ theme }) => ({
  color: theme.palette.secondary.dark,
  fontSize: 24,
}))
