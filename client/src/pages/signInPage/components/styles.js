import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ spacing, palette }) => ({
  signInForm: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  signInFields: {
    width: 300,
    marginBottom: 20,
    '& > fieldset': {
      borderColor: 'red'
    }
  },
  helperText: {
    fontSize: 16,
    color: 'red',
    marginTop: -20,
    marginBottom: 15,
    width: 300
  },
  btnText: {
    fontSize: spacing(2),
    fontWeight: 'bold',
    textTransform: 'capitalize'
  }
}));
