import React from 'react'
import { renderHook, act } from '@testing-library/react-hooks'
import { Provider } from 'react-redux'
import { createBrowserHistory } from 'history'
import { Router } from 'react-router-dom'

import { mockStore } from '../../../../__mocks__/store'
import { axios } from '../../../../__mocks__/axios'
import { useLoginState } from '../use-login-state'
import { NotificationsContext } from '../../../../contexts/notifications-context'
import {
  AuthTokenSettingContext,
  AuthContext,
} from '../../../../contexts/auth-context'
import { UserRoles } from 'types/user'

let wrapper: React.FC
const addNotification = jest.fn()
let saveAuthToken: (data: string) => void
let authToken: string

beforeEach(() => {
  saveAuthToken = jest.fn()

  const initialState = {}
  const store = mockStore(initialState)

  wrapper = ({ children }: { children: React.ReactNode }) => (
    <Provider store={store}>
      <Router history={createBrowserHistory()}>
        <AuthContext.Provider
          value={{
            isAuthenticated: true,
            user: {
              id: '1',
              email: 'Ecem',
              name: 'Ecem',
              role: { id: 1, name: UserRoles.Admin, outletId: 1 },
            },
            isUserDataLoading: false,
            isAdmin: true,
          }}>
          <AuthTokenSettingContext.Provider
            value={{ saveAuthToken, clearAuthToken: jest.fn() }}>
            <NotificationsContext.Provider
              value={{
                notifications: [],
                removeNotification: jest.fn(),
                addNotification,
              }}>
              {children}
            </NotificationsContext.Provider>
          </AuthTokenSettingContext.Provider>
        </AuthContext.Provider>
      </Router>
    </Provider>
  )
})

describe('[useLoginState Hook]', () => {
  test('calls postSignInForm function with correct user credentials', async () => {
    const { result } = renderHook(() => useLoginState(), {
      wrapper,
    })

    const formValues = {
      email: 'ea@gmail.com',
      password: 'somegibberish',
    }

    axios.post = jest.fn(() => Promise.resolve({ data: formValues }))

    await act(async () => result.current.postSignInForm(formValues))

    expect(saveAuthToken).toBeCalledTimes(1)
    expect(saveAuthToken).toBeCalledWith(formValues)
    expect(authToken).not.toBeNull()
  })

  test('calls postSignInForm function with incorrect user credentials', async () => {
    const { result } = renderHook(() => useLoginState(), {
      wrapper,
    })

    const incorrectFormValues = {
      email: 'ea12@gmail.com',
      password: 'wrong!!',
    }

    axios.post = jest.fn(() =>
      Promise.reject({
        data: incorrectFormValues,
        response: { status: 400 },
      })
    )
    await act(async () => result.current.postSignInForm(incorrectFormValues))

    expect(saveAuthToken).toBeCalledTimes(0)
    expect(authToken).toBeUndefined()
  })
})
