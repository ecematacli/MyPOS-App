import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ spacing, palette }) => ({
  signInField: {
    width: spacing(37.5),
    marginBottom: spacing(2.5),
    '@media (max-width:375px)': {
      width: spacing(20)
    }
  },
  helperText: {
    fontSize: spacing(2),
    color: palette.error.main,
    marginTop: -spacing(2.5),
    marginBottom: spacing(2),
    width: spacing(37.5)
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
