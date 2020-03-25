import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ palette }) => ({
  searchBarInput: {
    width: '95%',
    '@media (max-width:1499px) and (min-width:1390px)': {
      width: '85%'
    }
  }
}));
