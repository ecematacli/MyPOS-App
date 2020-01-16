import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ spacing, breakpoints, palette }) => ({
  gridContainer: {
    margin: 0,
    '& .MuiGrid-spacing-xs-3': {
      width: '100%'
    }
  },
  salesContent: {
    display: 'flex'
  },
  contentRoot: {
    flexGrow: 1
  },
  paper: {
    height: 140,
    width: 100
  },
  control: {
    padding: spacing(2)
  },
  discardSaleGridItem: {
    flexBasis: '80%',
    order: 1,
    [breakpoints.down('md')]: {
      flexBasis: '90%',
      order: 2
    }
  },
  searchBarGridItem: {
    order: 2,
    [breakpoints.down('md')]: {
      order: 1,
      marginTop: spacing(4)
    }
  },
  tableGridItem: {
    order: 3,
    [breakpoints.down('md')]: {
      order: 3
    }
  },
  discardSaleBtnHolder: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  discardIconBtn: {
    borderRadius: 0,
    '&:hover': {
      backgroundColor: palette.secondary.solid,
      borderRadius: '9%'
    }
  },
  discardSaleBtn: {
    fontSize: spacing(4)
  }
}));
