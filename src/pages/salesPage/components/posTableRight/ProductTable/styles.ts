import { makeStyles } from '@material-ui/core'

export default makeStyles(({ spacing, breakpoints, palette }) => ({
  tableWrapper: {
    paddingTop: spacing(1.5),
    minHeight: '45vh',
    overflow: 'auto',
    [breakpoints.up('xl')]: {
      minHeight: '49vh',
    },
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
  noteContainer: {
    '& > .MuiPaper': {
      boxShadow: 'none',
    },
  },
  noteInput: {
    width: spacing(70),
    height: spacing(3),
    padding: spacing(1),
  },
}))
