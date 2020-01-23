import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ spacing, palette }) => ({
  filterIconContainer: {
    height: 32,
    width: '95%',
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: spacing(3),
    marginBottom: -spacing(1)
  },
  filterIcon: {
    fontSize: spacing(5),
    color: palette.secondary.main
  },
  filterDiv: {
    cursor: 'pointer'
  }
}));
