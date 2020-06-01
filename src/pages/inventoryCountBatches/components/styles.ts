import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ spacing }) => ({
  tableDiv: {
    marginTop: spacing(4),
    width: '100%',
  },
  imageDiv: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: spacing(5),
  },
}));
