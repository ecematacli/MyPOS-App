import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ spacing, palette }) => ({
  chartPaper: {
    height: 360,
    width: '100%',
    boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.14)',
    borderRadius: 6,
    position: 'relative'
  },
  iconContainer: {
    paddingTop: 3,
    height: 50,
    pointer: 'cursor',
    marginTop: -10,
    marginBottom: -15
  },
  iconButton: {
    position: 'absolute',
    right: 0
  },
  displayOptionsTitle: {
    color: palette.grayColors[9],
    padding: spacing(2, 2, 2, 1)
  },
  displayOptions: {
    padding: spacing(2, 2, 2, 1)
  },
  popoverPaper: {
    minWidth: 250,
    minHeight: 200,
    color: palette.secondary.main
  }
}));
