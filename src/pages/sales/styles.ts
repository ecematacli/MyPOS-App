import { makeStyles } from '@material-ui/core/styles'

export default makeStyles(({ spacing, breakpoints }) => ({
  salesPage: {
    padding: spacing(4, 4, 0),
    [breakpoints.down('md')]: {
      paddingTop: 0,
    },
  },
  salesContainer: {
    padding: spacing(1, 3, 0, 3),
    height: '100vh',
  },
  salesContent: {
    display: 'flex',
  },
  contentRoot: {
    flexGrow: 1,
  },
  control: {
    padding: spacing(2),
  },
  discardSaleGridItem: {
    flexBasis: '92%',
    '@media (max-width:1919px) and (min-width:1280px)': {
      flexBasis: '98%',
    },
    [breakpoints.down('md')]: {
      flexBasis: '100%',
      order: 2,
    },
  },
  searchBarGridItem: {
    display: 'flex',
    justifyContent: 'flex-start',
    [breakpoints.down('md')]: {
      order: 1,
      marginTop: spacing(14),
    },
  },
  posTableGridItem: {
    [breakpoints.down('md')]: {
      order: 3,
      marginBottom: spacing(4),
    },
  },
  discardSaleBtnHolder: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  iconBtn: {
    borderRadius: 0,
  },
  discardSaleBtn: {
    fontSize: spacing(4),
  },
}))
