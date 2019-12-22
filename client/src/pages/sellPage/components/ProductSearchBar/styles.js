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
  },
  suggestedCommon: {
    color: palette.secondary.darkest
  },
  suggestionContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: spacing(8),
    width: '100%',
    color: palette.secondary.darkest
  },
  suggestedItems: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  suggestionContent: {
    display: 'flex'
  }
}));
