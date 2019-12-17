import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ spacing, palette }) => ({
  totalSection: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: spacing(1, 3)
  },
  discountInput: {
    width: spacing(12),
    height: spacing(5),
    textAlign: 'right',
    marginRight: '-14px',
    paddingRight: spacing(2),
    fontSize: spacing(2),
    color: palette.textColor,
    borderWidth: 1,
    borderColor: palette.secondary.dark,
    borderStyle: 'solid',
    borderRadius: spacing(2),
    '&:focus': {
      outline: 'none'
    }
  },
  totalDivider: {
    marginTop: spacing(1)
  },
  totalAmount: {
    paddingTop: spacing(2),
    paddingBottom: spacing(1)
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
