import { createMuiTheme } from '@material-ui/core/styles';
import pink from '@material-ui/core/colors/pink';

export default createMuiTheme({
  palette: {
    primary: {
      main: '#47C279',
      light: '#77CB60',
      dark: '#3AA687'
    },
    secondary: {
      main: '#696969',
      light: '#A0B2A6',
      lightest: '#f4f4f4',
      darkest: '#3f3f3f',
      dark: '#7e7e7e'
    },
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
