import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ spacing, palette }) => ({
  inputRoot: {
    width: 380,
    fontSize: spacing(2),
    color: palette.textColor,
    borderColor: palette.secondary.dark,
    marginBottom: 15
  },
  formControlRoot: {
    width: 380,
    marginBottom: 15
  }
}));
