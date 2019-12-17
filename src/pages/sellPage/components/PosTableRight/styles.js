import { lighten, makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ spacing, palette }) => ({
  paperRoot: {
    boxShadow: '0 2px 7px 0 rgba(0, 0, 0, 0.15) ',
    marginBottom: spacing(2),
    fontWeight: 'bolder'
  },

  tableWrapper: {
    // overflowX: 'hidden'
    height: '50vh'
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1
  },
  totalSection: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: spacing(1, 3)
  },
  totalPrice: {
    fontWeight: 'bold'
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
    paddingRight: spacing(5)
  },
  paymentBtnTextHolder: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%'
  },
  paymentBtnTxt: {
    fontSize: spacing(2.5),
    fontWeight: 'bolder'
  },
  selectedItemRoot: {
    paddingRight: spacing(3)
  },
  highlight: {
    color: palette.error.main,
    backgroundColor: lighten(palette.error.light, 0.85)
  },
  numSelectedTitle: {
    flex: '1 1 100%'
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
  checked: {
    '&$checked': {
      color: palette.error.main
    }
  }
}));
