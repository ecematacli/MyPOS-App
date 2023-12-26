import React from 'react'
import { render as rtlRender } from '@testing-library/react'
import { Provider } from 'react-redux'
import { ThemeProvider } from '@material-ui/styles'

import { mockStore } from '../__mocks__/store'
import { AuthContext } from '../contexts/AuthContext'
import { NotificationsContext } from '../contexts/NotificationsContext'
import theme from '../theme'
import { UserRoles } from 'api/user/types'

export const render = (
  ui: any,
  authorized = true,
  initialState = {},
  options = {}
) => {
  const store = mockStore(initialState)

  const isAuthenticated = Boolean(authorized ? 'ab7807x' : null)

  const Providers = ({ children }: any) => (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        isUserDataLoaded: true,
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
          notifications: null,
          removeNotification: null,
          addNotification: jest.fn(),
        }}>
        <ThemeProvider theme={theme}>
          <Provider store={store}>{children}</Provider>
        </ThemeProvider>
      </NotificationsContext.Provider>
    </AuthContext.Provider>
  )

  return rtlRender(ui, { wrapper: Providers, ...options })
}
