import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ spacing, palette }) => ({
  input: {
    width: 380,
    height: 57,
    color: palette.secondary.main,
    marginBottom: spacing(2),
    '& input:valid:focus + fieldset': {
      borderColor: ({ form: { touched, errors }, fieldId }) =>
        errors[fieldId] && touched[fieldId] ? `${palette.error.main}` : 'unset'
    }
  },
  helperText: {
    fontSize: 16,
    color: palette.error.main,
    marginTop: -15,
    marginBottom: spacing(2),
    width: 300
  },
  notchedOutline: {
    borderColor: palette.error.main
  },
  invalidatedLabel: {
    color: palette.error.main
  }
}));
