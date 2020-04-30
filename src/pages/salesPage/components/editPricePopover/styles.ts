import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ spacing, palette, breakpoints }) => ({
  popoverContentDiv: {
    width: 250,
    height: 190,
    color: palette.secondary.main,
  },
  addPriceCaption: {
    color: palette.grayColors[9],
    padding: spacing(2, 2),
    [breakpoints.down('sm')]: {
      fontSize: spacing(1.7),
    },
  },
  addPriceDiv: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: spacing(4),
  },
  title: { fontSize: spacing(2), color: palette.secondary.main },
  smallScreenFont: {
    [breakpoints.down('sm')]: {
      fontSize: spacing(1.7),
    },
  },
  priceInputRoot: {
    width: 150,
    height: 35,
    borderColor: palette.secondary.dark,
    '&:focus': {
      backgroundColor: 'transparent !important',
    },
    '@media (max-width:465px)': {
      width: 210,
    },
  },
  numberSpinner: {
    '& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button': {
      '-webkit-appearance': 'none',
      margin: 0,
    },
  },
  btnDiv: {
    display: 'flex',
    justifyContent: 'flex-end',
    margin: spacing(2, 1.2, 1.5),
  },
  actionBtn: {
    fontSize: 14,
    textTransform: 'capitalize',
  },
}));
