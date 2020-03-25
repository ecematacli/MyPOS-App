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
    height: '48vh',
    [breakpoints.down('md')]: {
      height: '44vh'
    },
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
  noPrice: {
    color: palette.secondary.main,
    textDecoration: 'underline',
    cursor: 'pointer',
    fontWeight: 'bold'
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
  }
}));
