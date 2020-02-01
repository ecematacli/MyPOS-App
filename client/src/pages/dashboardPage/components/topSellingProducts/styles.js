import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ spacing }) => ({
  topSellingPaper: {
    height: 580,
    boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.14)',
    position: 'relative'
  },
  title: {
    padding: spacing(3, 2)
  },
  pagination: {
    position: 'absolute',
    bottom: 5,
    width: '98%'
  }
}));