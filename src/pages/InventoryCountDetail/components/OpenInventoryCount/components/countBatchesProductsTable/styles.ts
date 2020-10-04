import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ spacing, palette }) => ({
  tabs: {
    boxShadow: 'none',
    marginTop: spacing(2),
    color: palette.grayColors[3],
    backgroundColor: 'inherit',
  },
  tabRoot: {
    textTransform: 'none',
    fontSize: spacing(2),
  },
  tableSectionWrapper: {
    margin: '0 auto',
    maxWidth: spacing(137.5),
  },
}));
