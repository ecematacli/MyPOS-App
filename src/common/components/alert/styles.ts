import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ spacing }) => ({
  root: {
    marginTop: spacing(3),
    width: '100%',
    '&:first-child': {
      marginTop: 0,
    },
  },
}));
