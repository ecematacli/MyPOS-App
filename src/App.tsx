import React from 'react'
import { ThemeProvider } from '@mui/material/styles'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'

import { theme } from './theme/theme'
import { AppRouter } from './routes/app-router'
import { Provider } from 'react-redux'
import { configureStore } from './redux/store'
import { AuthContextProvider } from './contexts/AuthContext'
import { NotificationsProvider } from './contexts/NotificationsContext'
import { GlobalStyles } from './GlobalStyles'
import { CatalogInfoProvider } from './contexts/CatalogInfoContext'

export const App = () => (
  <Provider store={configureStore()}>
    <AuthContextProvider>
      <CatalogInfoProvider>
        <NotificationsProvider>
          <GlobalStyles />
          <ThemeProvider theme={theme}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <AppRouter />
            </LocalizationProvider>
          </ThemeProvider>
        </NotificationsProvider>
      </CatalogInfoProvider>
    </AuthContextProvider>
  </Provider>
)
