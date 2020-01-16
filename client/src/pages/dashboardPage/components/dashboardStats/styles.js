import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ spacing, palette }) => ({
  dashboardStatDiv: {
    display: 'flex',
    minHeight: '135px',
    marginTop: spacing(5)
  },
  dashboardStatPaper: {
    width: '100%',
    boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.14)',
    borderRadius: 6,
    position: 'relative'
  },
  iconDiv: {
    color: '#fff',
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
    paddingTop: 20
  },
  statLabel: { color: '#999', fontSize: 14, paddingBottom: spacing(0.3) },
  statInfo: { color: palette.secondary.dark, fontSize: 24 },
  revenueIconContainer: {
    background: 'linear-gradient(60deg, #66bb6a, #43a047)',
    boxShadow:
      '0 4px 20px 0 rgba(0, 0, 0,.14), 0 7px 10px -5px rgba(76, 175, 80,.4)'
  },
  profitIconContainer: {
    background: 'linear-gradient(60deg, #ffa726, #fb8c00)',
    boxShadow:
      '0 4px 20px 0 rgba(0, 0, 0,.14), 0 7px 10px -5px rgba(255, 152, 0,.4)'
  },
  saleCountIconContainer: {
    background: 'linear-gradient(60deg, #035670, #02394a)',
    boxShadow:
      '0 4px 20px 0 rgba(0, 0, 0,.14), 0 7px 10px -5px rgba(2,55,70,.2)'
  },
  itemsSoldIconContainer: {
    background: 'linear-gradient(60deg, #26c6da, #00acc1)',
    boxShadow:
      '0 4px 20px 0 rgba(0, 0, 0,.14), 0 7px 10px -5px rgba(0, 172, 193,.4)'
  }
}));
