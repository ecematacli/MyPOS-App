import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(theme => ({
  gridContainer: {
    margin: 0
  },
  salesContent: {
    width: '100%',
    display: 'flex'
  },
  contentRoot: {
    flexGrow: 1
  },
  paper: {
    height: 140,
    width: 100
  },
  productSearchInput: {
    width: '100%',
    color: '#404854'
  },
  control: {
    padding: theme.spacing(2)
  }
}));
