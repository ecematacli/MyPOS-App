import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ spacing, palette }) => ({
  totalSection: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: spacing(1, 3)
  },
  totalDivider: {
    backgroundColor: palette.secondary.lightest
  },
  paymentBtnContainer: {
    padding: spacing(2)
  },
  paymentButton: {
    color: 'white',
    backgroundColor: palette.primary.main,
    height: '60px',
    paddingLeft: spacing(5),
    paddingRight: spacing(5),

    '&:hover': {
      backgroundColor: palette.primary.light
    }
  },
  paymentBtnTextHolder: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%'
  },
  paymentBtnTxt: {
    fontSize: spacing(2.5),
    fontWeight: 'bolder'
  }
}));
