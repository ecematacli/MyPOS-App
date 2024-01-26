import React, { useContext } from 'react'
import {
  Route,
  Redirect,
  RouteProps,
  RouteComponentProps,
} from 'react-router-dom'

import { AuthContext } from '../contexts/auth-context'
import { Loading } from '../common/components/loading/loading'

export const PrivateRoute: React.FC<RouteProps> = ({
  component: Component,
  ...rest
}) => {
  const { isAuthenticated, isUserDataLoaded } = useContext(AuthContext)

  return (
    <Route
      {...rest}
      render={(props: RouteComponentProps) =>
        isAuthenticated ? (
          isUserDataLoaded ? (
            <Component {...props} />
          ) : (
            <Loading />
          )
        ) : (
          <Redirect to={{ pathname: '/signin' }} />
        )
      }
    />
  )
}
