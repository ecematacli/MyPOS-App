import React from 'react'
import {
  Route,
  Redirect,
  RouteProps,
  RouteComponentProps,
} from 'react-router-dom'

import { useAuthContext } from '../contexts/auth-context'

export const PrivateRoute: React.FC<RouteProps & {
  component: React.FunctionComponent
}> = ({ component: Component, ...rest }) => {
  const { isAuthenticated, user } = useAuthContext()
  console.log('PRIVATE ROUTE!!!!', isAuthenticated, user)
  return (
    <Route
      {...rest}
      render={(props: RouteComponentProps) =>
        isAuthenticated && user ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: '/signin' }} />
        )
      }
    />
  )
}
