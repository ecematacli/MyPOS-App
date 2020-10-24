import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ spacing, palette, breakpoints }) => ({
  root: {
    boxShadow: '0 2px 7px 0 rgba(0, 0, 0, 0.15) ',
    [breakpoints.down('md')]: {
      marginBottom: spacing(2),
    },
  },
  paperRoot: {
    '@media (max-width:1499px) and (min-width:1390px)': {
      width: '85%',
    },
    fontWeight: 'bolder',
    height: '78vh',
    overflow: 'auto',
  },
  tableRow: {
    '& > th, td': {
      fontSize: 14,
      [breakpoints.down('sm')]: {
        fontSize: 13,
      },
    },
    '& > th': {
      color: palette.grey[700],
      fontWeight: 600,
    },
  },
  firstCell: { paddingLeft: spacing(2.8) },
  editableAmount: {
    color: palette.grayColors[3],
    textDecoration: 'underline',
    cursor: 'pointer',
    fontWeight: 'bold',
  },
  popoverTitle: {
    fontSize: spacing(2),
    color: palette.secondary.main,
    [breakpoints.down('sm')]: {
      fontSize: spacing(1.7),
    },
  },
  discounted: {
    width: 40,
  },
  quantity: {
    display: 'flex',
    paddingLeft: spacing(3),
    cursor: 'pointer',
    textAlign: 'center',
  },
  quantityVal: {
    margin: '0 10px',
    fontWeight: spacing(50),
    fontSize: spacing(1.75),
  },
  arrow: {
    color: palette.secondary.main,
    fontWeight: spacing(50),
    fontSize: spacing(1.75),
  },
  deleteIcon: {
    color: palette.secondary.dark,
    fontSize: 18,
  },
  totalDivider: {
    backgroundColor: palette.secondary.light,
  },
  expansionPanelRoot: {
    '& > .MuiPaper': {
      boxShadow: 'none',
    },
    padding: spacing(0, 1),
  },
  noteInput: {
    height: spacing(3),
    padding: spacing(1),
  },
  paymentMethodBtn: {
    marginRight: spacing(2),
    background: palette.greenColors[2],
    color: palette.primary.main,
    '&:hover': {
      color: '#fff',
    },
  },
  selectedPayment: {
    background: palette.primary.main,
    color: '#fff',
  },
  paymentBtnContainer: {
    padding: spacing(2),
    margin: spacing(0, 2),
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
}));
