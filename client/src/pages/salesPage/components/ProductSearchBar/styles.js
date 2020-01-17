import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ palette, spacing }) => ({
  suggestedCommon: {
    color: palette.grayColors[3]
  },
  suggestionContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: spacing(8),
    width: '100%',
    color: palette.grayColors[3]
  },
  suggestedItems: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  suggestionGroup: {
    display: 'flex'
  }
}));
