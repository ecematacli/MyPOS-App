import React, { useState, createContext, useEffect } from 'react'

import history from '../history'
// import api from '../api'

export type UserRole = 'admin' | 'employee'

interface User {
  email: string
  id: string
  name: string
  role: UserRole
  outlet: {
    id: number
    name: string
  }
}

type AuthContext = {
  isAuthenticated: boolean
  user: User | null
  isUserDataLoaded: boolean
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
    try {
      // TODO: Fetch user role from the API
      // const response = await api.get<string>('/user')
      // response && setUser(response.data)
      const { data } = {
        data: {
          email: '',
          id: '',
          name: '',
          role: 'employee' as UserRole,
          outlet: {
            id: 0,
            name: 'Koza',
          },
        },
      }
      setUser(data)
      setIsUserDataLoaded(true)
    } catch (e) {
      console.log(e)
    }
  }, [isAuthenticated])

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, isUserDataLoaded }}>
      <AuthTokenSettingContext.Provider
        value={{ saveAuthToken, clearAuthToken }}>
        {children}
      </AuthTokenSettingContext.Provider>
    </AuthContext.Provider>
  )
}
