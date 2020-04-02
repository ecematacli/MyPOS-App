import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ spacing, palette }) => ({
  tableDiv: {
    marginTop: spacing(4)
  },
  imageDiv: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: spacing(5)
  }
}));
