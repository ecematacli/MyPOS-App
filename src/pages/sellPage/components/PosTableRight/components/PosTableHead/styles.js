import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ palette: { error } }) => ({
  checked: {
    '&$checked': {
      color: error.main
    }
  }
}));
