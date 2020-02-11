import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ palette, spacing }) => ({
  datePickerInput: {
    display: 'inline-block',
    marginTop: spacing(3.5)
  },
  calendarIcon: {
    color: palette.secondary.main
  },
  filterPaper: {
    minWidth: 400,
    height: 220,
    padding: spacing(4)
  },
  filterCaption: {
    marginTop: spacing(3),
    paddingLeft: spacing(2),
    paddingBottom: spacing(2),
    borderBottom: '1px solid #eee',
    fontSize: 16,
    color: 'rgba(0, 0, 0, 0.54)'
  },
  filterBtnDiv: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: spacing(6)
  },
  filterBtn: {
    textTransform: 'capitalize',
    fontSize: 16
  }
}));
