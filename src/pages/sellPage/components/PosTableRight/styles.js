import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ spacing, palette }) => ({
  paperRoot: {
    boxShadow: '0 2px 7px 0 rgba(0, 0, 0, 0.15) ',
    marginBottom: spacing(2),
    fontWeight: 'bolder'
  },
  tableContent: {
    fontSize: spacing(2)
  },
  tableWrapper: {
    height: '50vh'
  },
  toolbar: {
    paddingLeft: spacing(2),
    paddingRight: spacing(3)
  },
  headerCell: {
    width: '23%'
  },
  qtHeaderCell: {
    width: '23%',
    paddingLeft: 0
  },
  priceHeaderCell: {
    width: '20%'
  },
  discountHeaderCell: {
    width: 150
  },
  quantity: {
    display: 'flex',
    cursor: 'pointer',
    textAlign: 'center'
  },
  quantityVal: {
    margin: '0 10px'
  },
  arrow: {
    color: palette.secondary.main
  },
  deleteIcon: {
    color: palette.secondary.dark
  },
  totalDividerBg: {
    backgroundColor: palette.secondary.lightest
  },
  totalSection: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: spacing(6),
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
  totalDividerEnd: {
    marginTop: spacing(1)
  },
  totalAmount: {
    paddingTop: spacing(2),
    paddingBottom: spacing(1)
  },
  paymentBtnContainer: {
    padding: spacing(2)
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
