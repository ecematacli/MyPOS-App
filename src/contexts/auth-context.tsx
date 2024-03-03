import React, { useState, createContext } from 'react'
import { useHistory } from 'react-router-dom'

import { USER_QUERY_KEY, useUserQuery } from 'api/user/use-user-query'
import { User, UserRoles } from 'types/user'
import { useQueryClient } from '@tanstack/react-query'

interface IAuthContext {
  isAuthenticated: boolean
  user: User | undefined
  isUserDataLoading: boolean
  isAdmin: boolean
}

interface IAuthTokenSettingContext {
  saveAuthToken: (data: string | null) => void
  clearAuthToken: () => void
}

const initialAuthData = {
  isAuthenticated: false,
  user: undefined,
  isUserDataLoading: false,
  isAdmin: false,
}

export const AuthContext = createContext<IAuthContext>(initialAuthData)
export const AuthTokenSettingContext = createContext<IAuthTokenSettingContext>(
  {} as IAuthTokenSettingContext
)

export const AuthContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const history = useHistory()
  const queryClient = useQueryClient()

  const [isAuthenticated, setIsAuthenticated] = useState(
    Boolean(localStorage.getItem('token'))
  )

  const { data: userData, isLoading, fetchStatus } = useUserQuery({
    shouldFetchData: isAuthenticated,
  })

  const saveAuthToken = async (data: string | null) => {
    localStorage.setItem('token', JSON.stringify(data))
    setIsAuthenticated(true)
  }

  const clearAuthToken = () => {
    localStorage.removeItem('token')
    setIsAuthenticated(false)
    queryClient.removeQueries({ queryKey: [USER_QUERY_KEY] })
    history.push('/signin')
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user: userData,
        isAdmin: userData?.role.name === UserRoles.Admin,
        /** https://github.com/TanStack/query/issues/3975 */
        isUserDataLoading: isLoading && fetchStatus !== 'idle',
      }}>
      <AuthTokenSettingContext.Provider
        value={{ saveAuthToken, clearAuthToken }}>
        {children}
      </AuthTokenSettingContext.Provider>
    </AuthContext.Provider>
  )
}

export const useAuthContext = () => React.useContext(AuthContext)
export const useAuthTokenContext = () =>
  React.useContext(AuthTokenSettingContext)
