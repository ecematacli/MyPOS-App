import React from 'react';
import { ThemeProvider } from '@material-ui/styles';
import { SnackbarProvider } from 'notistack';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

import theme from './theme/theme';
import AppRouter from './routers/AppRouter';

const App = () => (
  <ThemeProvider theme={theme}>
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <SnackbarProvider>
        <AppRouter />
      </SnackbarProvider>
    </MuiPickersUtilsProvider>
  </ThemeProvider>
);

export default App;
