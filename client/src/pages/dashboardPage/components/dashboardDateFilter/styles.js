import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ spacing }) => ({
  inputContainer: {
    marginRight: spacing(2)
  },
  input: {
    width: 300
  },
  datePickerContainer: {
    display: 'flex'
  }
}));
