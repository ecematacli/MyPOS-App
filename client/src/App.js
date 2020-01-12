import React from 'react';
import { ThemeProvider } from '@material-ui/styles';
import { SnackbarProvider } from 'notistack';

import theme from './theme/theme';
import AppRouter from './routers/AppRouter';

const App = () => (
  <ThemeProvider theme={theme}>
    <SnackbarProvider>
      <AppRouter />
    </SnackbarProvider>
  </ThemeProvider>
);

export default App;
