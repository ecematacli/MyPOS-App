import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ palette, spacing }) => ({
  productSearchInput: {
    width: '100%',
    color: palette.secondary.main
  },
  searchIconHolder: {
    marginLeft: spacing(2)
  },
  inputRoot: {
    '& .MuiOutlinedInput-root': {
      paddingRight: spacing(2)
    }
  }
}));
