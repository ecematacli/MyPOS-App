import React from 'react'
import { ThemeProvider } from '@material-ui/styles'
import { MuiPickersUtilsProvider } from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns'

import theme from './theme'
import { AppRouter } from './routes/AppRouter'
import { Provider } from 'react-redux'
import configureStore from './redux/store'
import { AuthContextProvider } from './contexts/AuthContext'
import { NotificationsProvider } from './contexts/NotificationsContext'
import { GlobalStyles } from './GlobalStyles'
import { CatalogInfoProvider } from './contexts/CatalogInfoContext'

const store = configureStore()

export const App = () => (
  <Provider store={store}>
    <AuthContextProvider>
      <CatalogInfoProvider>
        <NotificationsProvider>
          <GlobalStyles />
          <ThemeProvider theme={theme}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <AppRouter />
            </MuiPickersUtilsProvider>
          </ThemeProvider>
        </NotificationsProvider>
      </CatalogInfoProvider>
    </AuthContextProvider>
  </Provider>
)
