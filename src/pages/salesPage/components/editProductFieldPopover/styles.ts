import { makeStyles } from '@material-ui/core/styles';

import { Props } from './EditProductFieldPopover';

export default makeStyles(({ spacing, palette, breakpoints }) => ({
  popoverContentDiv: {
    width: ({ field }: Props) => (field === 'discountPrice' ? 290 : 250),
    height: ({ field }: Props) => (field === 'discountPrice' ? 200 : 190),
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
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: spacing(4),
    paddingLeft: spacing(2),
    paddingRight: spacing(2),
  },
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
    marginRight: -8,
  },
}));
