import React from 'react'
import { ThemeProvider } from '@mui/material/styles'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import { theme } from './theme/theme'
import { AppRouter } from './routes/app-router'
import { Provider } from 'react-redux'
import { configureStore } from './redux/store'
import { AuthContextProvider } from './contexts/auth-context'
import { NotificationsProvider } from './contexts/notifications-context'
import { GlobalStyles } from './global-styles'
import { CatalogInfoProvider } from './contexts/catalog-info-context'

const queryClient = new QueryClient()

export const App = () => (
  <Provider store={configureStore()}>
    <QueryClientProvider client={queryClient}>
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
    </QueryClientProvider>
  </Provider>
)
