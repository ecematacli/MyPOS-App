import { lighten, makeStyles } from '@material-ui/core/styles';

export default makeStyles(theme => ({
  selectedItemRoot: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(3)
  },
  highlight:
    theme.palette.type === 'light'
      ? {
          color: theme.palette.error.main,
          backgroundColor: lighten(theme.palette.error.light, 0.85)
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark
        },
  numSelectedTitle: {
    flex: '1 1 100%'
  }
}));
