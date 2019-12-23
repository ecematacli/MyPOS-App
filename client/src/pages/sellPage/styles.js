import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ spacing }) => ({
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
  discardSaleBtnHolder: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 5,
    paddingRight: 10
  },
  discardSaleBtn: {
    fontSize: spacing(4)
  }
}));
