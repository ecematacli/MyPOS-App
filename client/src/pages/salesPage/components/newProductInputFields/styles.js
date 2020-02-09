import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ spacing, palette }) => ({
  input: {
    width: 380,
    height: 57,
    color: palette.secondary.main,
    borderColor: palette.secondary.dark,
    marginBottom: spacing(2)
  },
  helperText: {
    fontSize: 16,
    color: palette.error.main,
    marginTop: -15,
    marginBottom: spacing(2),
    width: 300
  },
  notchedOutline: {
    borderColor: palette.error.main
  }
}));
