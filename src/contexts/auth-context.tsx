import React, { useState, createContext, useEffect } from 'react'
import { useHistory } from 'react-router-dom'

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

const initialAuthData = {
  isAuthenticated: false,
  user: null,
  isUserDataLoaded: false,
  isAdmin: false,
}

export const AuthContext = createContext<AuthContext>(initialAuthData)
export const AuthTokenSettingContext = createContext<AuthTokenSettingContext>(
  {}
)

const initialToken = localStorage.getItem('token')

export const AuthContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const history = useHistory()

  const [isAuthenticated, setIsAuthenticated] = useState(Boolean(initialToken))
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

      if (isAuthenticated && user) {
        setUser(user)
        setIsAdmin(user.role.name === UserRoles.Admin)
        setIsUserDataLoaded(true)
      }
    }

    if (!isAuthenticated) {
      return setIsUserDataLoaded(true)
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

export const useAuthContext = () => {
  return React.useContext(AuthContext)
}
