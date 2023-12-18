import React, { useState, createContext, useEffect } from 'react'

import history from '../history'
import { fetchUser } from '../api/user/user'
import { User, UserRoles } from '../api/user/types'

type AuthContext = {
  isAuthenticated: boolean
  user: User | null
  isUserDataLoaded: boolean
  isAdmin: boolean
}

type SaveAuthToken = (data: string | null) => void
type ClearAuthToken = () => void

interface AuthTokenSettingContext {
  saveAuthToken?: SaveAuthToken
  clearAuthToken?: ClearAuthToken
}

export const AuthContext = createContext<AuthContext>(null)
export const AuthTokenSettingContext = createContext<AuthTokenSettingContext>(
  {}
)

const initialToken = JSON.parse(localStorage.getItem('token'))

export const AuthContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(initialToken)
  const [user, setUser] = useState<User | null>(null)
  const [isUserDataLoaded, setIsUserDataLoaded] = useState<boolean>(false)
  const [isAdmin, setIsAdmin] = useState<boolean>(false)

  const saveAuthToken: SaveAuthToken = async (data = null) => {
    localStorage.setItem('token', JSON.stringify(data))
    setIsAuthenticated(true)
  }

  const clearAuthToken: ClearAuthToken = () => {
    localStorage.removeItem('token')

    setIsAuthenticated(false)
    setUser(null)

    history.push('/signin')
  }

  useEffect(() => {
    const fetchUserOnAppLoad = async () => {
      const user = await fetchUser()
      user && setUser(user)
      setIsAdmin(user.role.name === UserRoles.Admin)

      setIsUserDataLoaded(true)
    }

    fetchUserOnAppLoad()
  }, [isAuthenticated])

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, user, isUserDataLoaded, isAdmin }}>
      <AuthTokenSettingContext.Provider
        value={{ saveAuthToken, clearAuthToken }}>
        {children}
      </AuthTokenSettingContext.Provider>
    </AuthContext.Provider>
  )
}
