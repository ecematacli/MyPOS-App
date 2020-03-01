import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ spacing, palette, breakpoints }) => ({
  paperRoot: {
    width: '95%',
    '@media (max-width:1499px) and (min-width:1390px)': {
      width: '85%'
    },
    boxShadow: '0 2px 7px 0 rgba(0, 0, 0, 0.15) ',
    marginBottom: spacing(2),
    fontWeight: 'bolder'
  },
  tableWrapper: {
    paddingTop: spacing(6),
    height: '50vh',
    overflow: 'auto'
  },
  tableRow: {
    '& > th, td': {
      [breakpoints.down('sm')]: {
        fontSize: 14
      }
    }
  },
  firstCell: { paddingLeft: spacing(2.8) },
  toolbar: {
    paddingLeft: spacing(2),
    paddingRight: spacing(3)
  },
  noPrice: {
    color: palette.secondary.main,
    textDecoration: 'underline',
    cursor: 'pointer',
    fontWeight: 'bold'
  },
  popoverContentDiv: {
    width: 250,
    height: 190,
    color: palette.secondary.main
  },
  addPriceCaption: {
    color: palette.grayColors[9],
    padding: spacing(2, 2),
    [breakpoints.down('sm')]: {
      fontSize: spacing(1.7)
    }
  },
  addPriceDiv: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: spacing(4)
  },
  title: { fontSize: spacing(2), color: palette.secondary.main },
  smallScreenFont: {
    [breakpoints.down('sm')]: {
      fontSize: spacing(1.7)
    }
  },
  priceInputRoot: {
    width: 150,
    height: 35,
    borderColor: palette.secondary.dark,
    '&:focus': {
      backgroundColor: 'transparent !important'
    },
    '@media (max-width:465px)': {
      width: 210
    }
  },
  btnDiv: {
    display: 'flex',
    justifyContent: 'flex-end',
    margin: spacing(2, 1.2, 1.5)
  },
  actionBtn: {
    fontSize: 13
  },
  quantity: {
    display: 'flex',
    paddingLeft: spacing(3),
    cursor: 'pointer',
    textAlign: 'center'
  },
  quantityVal: {
    margin: '0 10px',
    fontWeight: spacing(50),
    fontSize: spacing(1.75)
  },
  arrow: {
    color: palette.secondary.main,
    fontWeight: spacing(50),
    fontSize: spacing(1.75)
  },
  deleteIcon: {
    color: palette.secondary.dark
  },
  totalDivider: {
    backgroundColor: palette.secondary.light
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
        fontSize: 14
      }
    }
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
    width: spacing(14),
    height: spacing(5),
    marginRight: '-7px',
    fontWeight: spacing(50),
    fontSize: spacing(2),
    color: palette.textColor,
    borderColor: palette.secondary.dark,
    borderRadius: spacing(2)
  },
  totalAmount: {
    paddingTop: spacing(2),
    paddingBottom: spacing(1)
  },
  paymentBtnContainer: {
    padding: spacing(2),
    [breakpoints.down('sm')]: {
      padding: 10
    }
  },
  paymentBtnTextHolder: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%'
  },
  paymentBtnTxt: {
    fontWeight: 'bold',
    fontSize: spacing(2.5),
    [breakpoints.down('sm')]: {
      fontSize: 16
    },
    '@media (max-width:405px)': {
      margin: 'auto'
    }
  }
}));
