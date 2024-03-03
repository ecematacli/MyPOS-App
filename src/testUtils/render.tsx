import React from 'react'
import { render as rtlRender } from '@testing-library/react'
import { Provider } from 'react-redux'
import { MemoryRouter } from 'react-router-dom'
import { ThemeProvider } from '@mui/material/styles'

import { mockStore } from '../__mocks__/store'
import { AuthContext } from '../contexts/auth-context'
import { NotificationsContext } from '../contexts/notifications-context'
import { theme } from '../theme/theme'
import { UserRoles } from 'types/user'

export const render = (
  ui: any,
  authorized = true,
  initialState = {},
  options = {}
) => {
  const store = mockStore(initialState)

  const isAuthenticated = Boolean(authorized ? 'ab7807x' : null)

  const Providers = ({ children }: { children: React.ReactNode }) => (
    <MemoryRouter initialEntries={['/']}>
      <AuthContext.Provider
        value={{
          isAuthenticated,
          isUserDataLoading: false,
          isAdmin: true,
          user: {
            email: 'Ecem',
            id: '7',
            name: 'Ecem',
            role: { id: 27, name: UserRoles.Admin, outletId: 1 },
          },
        }}>
        <NotificationsContext.Provider
          value={{
            notifications: [],
            removeNotification: jest.fn(),
            addNotification: jest.fn(),
          }}>
          <ThemeProvider theme={theme}>
            <Provider store={store}>{children}</Provider>
          </ThemeProvider>
        </NotificationsContext.Provider>
      </AuthContext.Provider>
    </MemoryRouter>
  )

  return rtlRender(ui, { wrapper: Providers, ...options })
}
