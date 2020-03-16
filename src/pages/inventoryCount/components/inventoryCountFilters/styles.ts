import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ spacing, palette, breakpoints }) => ({
  filtersDiv: {
    marginTop: spacing(15)
  },
  calendarIcon: {
    color: palette.secondary.main,
    marginRight: -spacing(1.5)
  },
  datePicker: { height: 200, borderColor: 'red' },
  root: {
    // height: 10,
    // width: 500
  }
}));
