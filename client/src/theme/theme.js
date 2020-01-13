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
      light: '#eee',
      lightest: '#f4f4f4',
      dark: '#7e7e7e',
      darkest: '#3f3f3f',
      greenish: '#A0B2A6',
      background: '#f9f9f9',
      tableRow: '#727272',
      tableHead: '#888888',
      soft: '#F1F1F1'
    },
    error: { main: pink['A400'] },
    textColor: 'rgba(0, 0, 0, 0.87)'
  },
  typography: {
    h1: {
      fontSize: '2em'
    }
  },
  overrides: {
    MuiGrid: {
      'spacing-xs-3': {
        '& > $item': {
          paddingBottom: 5
        }
      }
    },
    MuiPaper: {
      root: {
        boxShadow: '0 1px 4px 0 rgba(0, 0, 0, 0.14)'
      }
    },
    MuiDrawer: {
      paper: {
        color: 'white'
      }
    },
    MuiTableCell: {
      root: {
        fontSize: 16,
        fontWeight: 500
      }
    },
    MuiTypography: {
      body1: {
        fontWeight: 500
      },
      body2: {
        fontSize: 16
      }
    },
    MuiInputBase: {
      input: {
        fontSize: 16
      }
    },
    MuiPickersToolbar: {
      toolbar: {
        backgroundColor: '#47C279'
      }
    }
  }
});
