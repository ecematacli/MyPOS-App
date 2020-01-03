import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ spacing, palette }) => ({
  customBtn: {
    color: 'white',
    backgroundColor: palette.primary.main,
    height: ({ fullWidth }) => (fullWidth ? 60 : 40),
    paddingLeft: spacing(4),
    paddingRight: spacing(4),
    marginBottom: spacing(1),
    '&:hover': {
      backgroundColor: palette.primary.light
    }
  }
}));
