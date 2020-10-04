import { makeStyles } from '@material-ui/core/styles'

export default makeStyles(({ spacing, breakpoints }) => ({
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
    flexBasis: '81%',
    '@media (max-width:1919px) and (min-width:1280px)': {
      flexBasis: '98%',
    },
    '@media (max-width:1499px) and (min-width:1390px)': {
      marginRight: spacing(13),
    },
    [breakpoints.down('md')]: {
      flexBasis: '96%',
      order: 2,
    },
  },
  searchBarGridItem: {
    [breakpoints.down('md')]: {
      order: 1,
      marginTop: spacing(10),
    },
  },
  posTableGridItem: {
    [breakpoints.down('md')]: {
      order: 3,
    },
  },
  discardSaleBtnHolder: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  discardIconBtn: {
    borderRadius: 0,
    '&:hover': {
      borderRadius: spacing(0.75),
    },
  },
  discardSaleBtn: {
    fontSize: spacing(4),
  },
}))