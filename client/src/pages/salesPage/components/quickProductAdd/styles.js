import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ spacing, palette }) => ({
  paper: {
    backgroundColor: palette.background.paper,
    border: '2px solid #000',
    padding: spacing(2, 4, 3)
  },
  quickAddIcon: {
    fontSize: spacing(4.5),
    color: palette.primary.main,
    cursor: 'pointer'
  },
  dialogTitle: {
    fontSize: 20,
    color: palette.grayColors[3],
    display: 'flex',
    justifyContent: 'center'
  },
  dialogPaper: {
    maxHeight: 'unset',
    marginTop: 10,
    padding: spacing(7),
    paddingTop: spacing(3),
    paddingBottom: spacing(2),
    borderRadius: 6
  }
}));
