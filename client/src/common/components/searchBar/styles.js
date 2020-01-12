import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ palette, spacing }) => ({
  input: {
    width: ({ width }) => width,
    color: palette.secondary.main
  },
  inputRoot: {
    '& .MuiOutlinedInput-root': {
      paddingRight: spacing(2)
    }
  },
  searchIconHolder: {
    marginLeft: spacing(2)
  }
}));
