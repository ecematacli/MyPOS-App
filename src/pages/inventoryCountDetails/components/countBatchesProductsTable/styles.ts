import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ spacing, palette }) => ({
  tabsDiv: {
    width: '80%',
    maxWidth: '80%',
    margin: 'auto',
  },
  tabs: {
    boxShadow: 'none',
    marginTop: spacing(7),
    color: palette.grayColors[3],
    backgroundColor: 'inherit',
  },
  tabRoot: {
    textTransform: 'none',
    fontSize: spacing(2),
  },
  tableDiv: {
    width: '80%',
    maxWidth: '80%',
    margin: 'auto',
  },
}));
