import { makeStyles } from '@material-ui/core/styles'

export default makeStyles(({ spacing, palette, breakpoints }) => ({
  totalDivider: {
    backgroundColor: palette.secondary.light,
  },
  totalContentDiv: { overflow: 'auto' },
  totalSection: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: spacing(6),
    padding: spacing(2, 3),
    margin: spacing(1),
    [breakpoints.down('sm')]: {
      ' & > * ': {
        fontSize: 14,
      },
    },
  },
  discountContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  discount: {
    color: palette.grayColors[3],
    textDecoration: 'underline',
    fontWeight: 'bold',
    cursor: 'pointer',
  },
  discountType: {
    [breakpoints.down('sm')]: {
      fontSize: 14,
    },
  },
  percentageSign: {
    fontWeight: 'bold',
    paddingRight: 1.2,
  },
  formControl: {
    width: 65,
    marginRight: spacing(0.7),
  },
  innerOptionsInput: {
    height: 35,
  },
  optionsInput: {
    [breakpoints.down('sm')]: {
      fontSize: 14,
    },
  },
  selectRoot: {
    '&:focus': {
      backgroundColor: 'transparent',
    },
  },
  notchedOutline: {
    borderColor: palette.secondary.light,
  },
  discountInput: {
    width: spacing(14),
    height: spacing(5),
    marginRight: '-7px',
    fontWeight: spacing(50),
    fontSize: spacing(2),
    color: 'rgba(0, 0, 0, 0.87)',
    borderColor: palette.secondary.dark,
    borderRadius: spacing(2),
  },
  totalAmount: {
    paddingTop: spacing(2),
    paddingBottom: spacing(1),
  },
  paymentBtnContainer: {
    padding: spacing(2),
    [breakpoints.down('sm')]: {
      padding: 10,
    },
  },
  paymentBtnTextHolder: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
  },
  paymentBtnTxt: {
    fontWeight: 'bold',
    fontSize: spacing(2.5),
    [breakpoints.down('sm')]: {
      fontSize: 16,
    },
    '@media (max-width:405px)': {
      margin: 'auto',
    },
  },
}))
