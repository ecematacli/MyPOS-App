import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ spacing, palette, breakpoints }) => ({
  dashboardStatDiv: {
    display: 'flex',
    minHeight: 135,
    [breakpoints.down('sm')]: {
      marginTop: spacing(3)
    }
  },
  dashboardStatPaper: {
    width: '100%',
    boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.14)',
    borderRadius: 6,
    position: 'relative'
  },
  iconDiv: {
    color: palette.whiteColors[0],
    width: 86,
    height: 87,
    marginTop: -20,
    position: 'absolute',
    left: 20,
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
      margin: '10px 10px 4px'
    }
  },
  dashboardStatContent: {
    paddingRight: spacing(2),
    paddingTop: 35
  },
  statLabel: {
    color: palette.grayColors[9],
    fontSize: 14,
    paddingBottom: spacing(0.3)
  },
  statInfo: { color: palette.secondary.dark, fontSize: 24 },
  revenueIconContainer: {
    background: `linear-gradient(60deg, ${palette.greenColors[0]}, ${palette.greenColors[1]})`,
    boxShadow:
      '0 4px 20px 0 rgba(0, 0, 0,.14), 0 7px 10px -5px rgba(76, 175, 80,.4)'
  },
  profitIconContainer: {
    background: `linear-gradient(60deg, ${palette.yellowColors[0]}, ${palette.yellowColors[1]})`,
    boxShadow:
      '0 4px 20px 0 rgba(0, 0, 0,.14), 0 7px 10px -5px rgba(255, 152, 0,.4)'
  },
  saleCountIconContainer: {
    background: `linear-gradient(60deg, ${palette.navyBlueColors[0]}, ${palette.navyBlueColors[1]})`,
    boxShadow:
      '0 4px 20px 0 rgba(0, 0, 0,.14), 0 7px 10px -5px rgba(2,55,70,.2)'
  },
  itemsSoldIconContainer: {
    background: `linear-gradient(60deg, ${palette.blueColors[0]}, ${palette.blueColors[1]})`,
    boxShadow:
      '0 4px 20px 0 rgba(0, 0, 0,.14), 0 7px 10px -5px rgba(0, 172, 193,.4)'
  }
}));
