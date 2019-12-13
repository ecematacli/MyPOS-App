import { createMuiTheme } from '@material-ui/core/styles';
import pink from '@material-ui/core/colors/red';

export default createMuiTheme({
  palette: {
    primary: { main: '#404854' },

    error: { main: '#f50057' }
  },
  typography: {
    h1: {
      fontSize: '2em'
    }
  },
  overrides: {
    MuiDrawer: {
      paper: {
        color: 'white'
      }
    }
  }
});
