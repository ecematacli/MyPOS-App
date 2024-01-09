import { pink } from '@mui/material/colors'
import { createTheme } from '@mui/material/styles'

declare module '@mui/material/styles' {
  interface PaletteOptions {
    grayColors?: string[]
    greenColors?: string[]
    yellowColors?: string[]
    blueColors?: string[]
    navyBlueColors?: string[]
    whiteColors?: string[]
  }
  interface Palette {
    grayColors: string[]
    greenColors: string[]
    yellowColors: string[]
    blueColors: string[]
    navyBlueColors: string[]
    whiteColors: string[]
  }
}

export const theme = createTheme({
  palette: {
    primary: {
      main: '#47C279',
      light: '#77CB60',
      dark: '#3AA687',
    },
    secondary: { main: '#696969', light: '#eee', dark: '#7e7e7e' },
    error: { main: pink['A400'], light: '#e6643c' },
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
      '#ebedee',
      '#d8d8d8',
      '#bdbdbd',
      '#efefef',
      '#353535',
      '#3a4953',
      '#f1f3f5',
      '#e9e9e9',
    ],
    greenColors: [
      '#66bb6a',
      '#43a047',
      '#f8fdf8',
      '#ecf1f1',
      '#f0f3f4',
      '#f0f4f4',
      '#e3ece3',
      '#efffef',
    ],
    yellowColors: ['#ffa726', '#fb8c00'],
    blueColors: ['#26c6da', '#00acc1'],
    navyBlueColors: ['#035670', '#02394a'],
    whiteColors: ['#fff'],
  },
  typography: {
    h1: {
      fontSize: '2em',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        select: {
          '&:focus': {
            borderRadius: 0,
            backgroundColor: 'transparent',
          },
        },
      },
    },
    MuiFormLabel: {
      styleOverrides: {
        root: {
          '&.Mui-focused': {
            color: 'inherit',
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: '#999',
          },
        },
      },
    },
    MuiGrid: {
      styleOverrides: {
        'spacing-xs-3': {
          '& > $item': {
            paddingBottom: 5,
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          boxShadow: '0 1px 4px 0 rgba(0, 0, 0, 0.14)',
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          color: 'white',
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          fontSize: 16,
          fontWeight: 500,
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        body1: {
          fontWeight: 500,
        },
        body2: {
          fontSize: 16,
        },
        h6: {
          fontSize: 24,
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          '&.Mui-focused': {
            color: '#7e7e7e',
          },
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        input: {
          fontSize: 16,
        },
      },
    },
    MuiPopover: {
      styleOverrides: {
        paper: {
          boxShadow: '0 1px 4px 0 rgba(0, 0, 0, 0.14)',
        },
      },
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1500,
      xl: 1920,
    },
  },
})
