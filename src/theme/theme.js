import { createMuiTheme } from '@material-ui/core/styles';
import pink from '@material-ui/core/colors/pink';

export default createMuiTheme({
  palette: {
    primary: { main: '#47C279' },
    secondary: { main: '#696969' },
    error: { main: pink['A400'] }
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

// secondary: { main: '#A0B2A6' },
