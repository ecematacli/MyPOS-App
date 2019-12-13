import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(theme => ({
  gridContainer: {
    margin: 0
  },
  salesContent: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-around'
  },
  contentRoot: {
    flexGrow: 1
  },
  paper: {
    height: 140,
    width: 100
  },
  control: {
    padding: theme.spacing(2)
  }
}));
