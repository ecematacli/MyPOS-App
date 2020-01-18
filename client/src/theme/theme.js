import { createMuiTheme } from '@material-ui/core/styles';
import pink from '@material-ui/core/colors/pink';

export default createMuiTheme({
  palette: {
    primary: {
      main: '#47C279',
      light: '#77CB60',
      dark: '#3AA687'
    },
    secondary: { main: '#696969', light: '#eee', dark: '#7e7e7e' },
    error: { main: pink['A400'] },
    grayColors: [
      '#e7e7e7',
      '#f4f4f4',
      '#7e7e7e',
      '#3f3f3f',
      '#A0B2A6',
      '#f9f9f9',
      '#727272',
      '#888888',
      '#F1F1F1',
      '#999',
      '#e2e2e2',
      '#fdfbfb',
      '#ebedee'
    ],
    greenColors: [
      '#66bb6a',
      '#43a047',
      '#f8fdf8',
      '#ecf1f1',
      '#f0f3f4',
      '#f0f4f4',
      '#e3ece3'
    ],
    yellowColors: ['#ffa726', '#fb8c00'],
    blueColors: ['#26c6da', '#00acc1'],
    navyBlueColors: ['#035670', '#02394a'],
    whiteColors: ['#fff'],
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
