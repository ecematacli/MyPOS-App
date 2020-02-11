import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ palette, spacing }) => ({
  filterIconContainer: {
    width: '95%',
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: spacing(3),
    marginBottom: -spacing(1)
  },
  filterIconDiv: {
    cursor: 'pointer'
  },
  filterIcon: {
    fontSize: spacing(4),
    color: palette.secondary.main
  }
}));
