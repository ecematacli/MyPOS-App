import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ spacing, palette }) => ({
  lastCountedContainer: {
    borderLeft: `0.1em solid ${palette.grayColors[10]}`,
    height: '100vh'
  },
  titleDiv: {
    padding: spacing(2, 2),
    color: palette.grayColors[3]
  },
  title: {
    color: palette.secondary.main,
    fontSize: 18
  },
  divider: {
    backgroundColor: palette.grayColors[14]
  },
  imageDiv: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: spacing(5)
  }
}));
