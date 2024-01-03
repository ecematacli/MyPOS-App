import { makeStyles } from '@mui/styles'

export default makeStyles(({ spacing, palette, breakpoints }) => ({
  totalDivider: {
    backgroundColor: palette.secondary.light,
  },
  totalContentDiv: { overflow: 'auto' },
  totalSection: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: spacing(0, 3),
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
  totalContainer: {},
  totalEditIcon: {
    fontSize: 14,
    marginLeft: spacing(0.5),
    cursor: 'pointer',
  },
  totalInput: {
    height: spacing(0.5),
    width: spacing(7),
  },
}))
