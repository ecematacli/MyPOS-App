import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ spacing, palette }) => ({
  signInField: {
    width: 300,
    marginBottom: 20,
    '@media (max-width:567px)': {
      width: 200
    }
  },
  helperText: {
    fontSize: spacing(2),
    color: palette.error.main,
    marginTop: -20,
    marginBottom: spacing(2),
    width: 300
  },
  cssOutlinedInput: {
    '&$cssFocused $notchedOutline': {
      borderColor: `${palette.error.main} !important`
    }
  },
  cssFocused: {},
  notchedOutline: {
    borderColor: palette.error.main
  }
}));
