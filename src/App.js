import React from 'react';
import { ThemeProvider } from '@material-ui/styles';

import theme from './theme/theme';
import AppRouter from './routers/AppRouter';

const App = () => (
  <ThemeProvider theme={theme}>
    <AppRouter />
  </ThemeProvider>
);


export default App;

