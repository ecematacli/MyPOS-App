import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ spacing, palette }) => ({
  paperRoot: {
    width: '95%',
    boxShadow: '0 2px 7px 0 rgba(0, 0, 0, 0.15) ',
    marginBottom: spacing(2),
    fontWeight: 'bolder'
  },
  table: {},
  tableContent: {
    fontSize: spacing(2)
  },
  tableWrapper: {
    paddingTop: spacing(6),
    paddingLeft: spacing(1),
    height: '50vh',
    overflowY: 'auto'
  },
  toolbar: {
    paddingLeft: spacing(2),
    paddingRight: spacing(3)
  },
  headerCell: {
    width: '20%'
  },
  qtHeaderCell: {
    width: '20%',
    paddingLeft: 0
  },
  priceHeaderCell: {
    width: '18%'
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
    margin: '0 10px',
    fontWeight: 400,
    fontSize: 14
  },
  arrow: {
    color: palette.secondary.main,
    fontWeight: 400,
    fontSize: 14
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
  discountForm: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  notchedOutline: {
    borderColor: palette.secondary.light
  },
  discountInput: {
    width: spacing(12),
    height: spacing(5),
    marginRight: '-7px',
    fontWeight: 400,
    fontSize: spacing(2),
    color: palette.textColor,
    borderColor: palette.secondary.dark,
    borderRadius: spacing(2)
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
  paymentButton: {
    color: 'white',
    backgroundColor: palette.primary.main,
    height: '60px',
    paddingLeft: spacing(4),
    paddingRight: spacing(4),
    marginBottom: spacing(1),
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
    fontWeight: 'bold'
  }
}));
