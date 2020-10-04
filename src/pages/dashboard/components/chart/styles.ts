import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ spacing, palette, breakpoints }) => ({
  chartPaper: {
    height: 315,
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
    marginBottom: -spacing(1)
  },
  iconButton: {
    position: 'absolute',
    right: 0
  },
  displayOptionsTitle: {
    color: palette.grayColors[9],
    padding: spacing(3, 2.5)
  },
  displayOptionsItem: {
    fontSize: spacing(2),
    [breakpoints.down('sm')]: {
      fontSize: 14
    },
    padding: spacing(2, 2),
    cursor: 'pointer'
  },
  option: { paddingLeft: spacing(1) },
  popoverPaper: {
    minWidth: 250,
    minHeight: 200,
    color: palette.secondary.main
  }
}));
