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
  suggestedItemList: {
    padding: spacing(2),
    height: spacing(8),
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  suggestedCommon: {
    color: palette.secondary.darkest
  },
  suggestionsContainer: {
    maxHeight: 100,
    overFlow: 'scroll'
  },
  container: {
    position: 'relative',
    maxHeight: '30vh'
  },
  suggestionsContainerOpen: {
    position: 'absolute',
    zIndex: 1,
    marginTop: spacing(2),
    left: 0,
    right: 0
  },
  suggestion: {
    display: 'block'
  },
  disabledSuggestion: {
    pointerEvents: 'none'
  },
  suggestionsList: {
    margin: 0,
    padding: 0,
    listStyleType: 'none'
  }
}));
