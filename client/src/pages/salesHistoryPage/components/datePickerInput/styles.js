import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ palette, spacing }) => ({
  datePickerInput: {
    display: 'inline-block',
    marginLeft: spacing(4),
    marginTop: spacing(3.5)
  },
  calendarIcon: {
    color: palette.secondary.main
  }
}));
