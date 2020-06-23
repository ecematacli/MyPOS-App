import React from 'react'
import { ThemeProvider } from '@material-ui/styles'
import { MuiPickersUtilsProvider } from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns'

import theme from './theme'
import AppRouter from './routes/AppRouter'
import { Provider } from 'react-redux'
import configureStore from './redux/store'
import { AuthContextProvider } from './contexts/AuthContext'
import { NotificationsProvider } from './contexts/NotificationsContext'
import { GlobalStyles } from './GlobalStyles'
const store = configureStore()

const App = () => (
  <Provider store={store}>
    <AuthContextProvider>
      <NotificationsProvider>
        <GlobalStyles />
        <ThemeProvider theme={theme}>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <AppRouter />
          </MuiPickersUtilsProvider>
        </ThemeProvider>
      </NotificationsProvider>
    </AuthContextProvider>
  </Provider>
)

export default App
