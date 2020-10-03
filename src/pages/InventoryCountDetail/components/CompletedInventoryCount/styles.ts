import { makeStyles } from '@material-ui/core';

export default makeStyles(({ palette, spacing }) => ({
  tabs: {
    boxShadow: 'none',
    marginTop: spacing(4),
    color: palette.grayColors[3],
    backgroundColor: 'inherit',
  },
  tabRoot: {
    textTransform: 'none',
    fontSize: spacing(2),
  },
  tableContainer: {
    position: 'relative',
    padding: spacing(0, 6),
  },
  tableSectionWrapper: {
    margin: '0 auto',
    maxWidth: spacing(137.5),
    display: 'flex',
    flexDirection: 'column',
  },
  backArrow: {
    color: palette.grayColors[13],
    cursor: 'pointer',
  },
  iconDiv: {
    display: 'flex',
    alignItems: 'center',
    marginRight: spacing(1),
  },
  titleText: {
    fontSize: spacing(3.2),
    fontWeight: 'bold',
    color: palette.grayColors[17],
  },
}));
