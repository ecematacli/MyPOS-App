import { makeStyles } from '@material-ui/core/styles'

export default makeStyles(({ spacing, palette, breakpoints }) => ({
  paperRoot: {
    width: '95%',
    '@media (max-width:1499px) and (min-width:1390px)': {
      width: '85%',
    },
    boxShadow: '0 2px 7px 0 rgba(0, 0, 0, 0.15) ',
    marginBottom: spacing(2),
    fontWeight: 'bolder',
  },
  tableWrapper: {
    paddingTop: spacing(2.5),
    height: '45vh',
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
}))
