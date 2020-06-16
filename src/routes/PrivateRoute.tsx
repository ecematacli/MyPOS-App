import React, { useContext } from 'react';
import {
  Route,
  Redirect,
  RouteProps,
  RouteComponentProps
} from 'react-router-dom';

import { AuthContext } from '../contexts/AuthContext';

const PrivateRoute: React.FC<RouteProps> = ({
  component: Component,
  ...rest
}) => {
  const authToken = useContext(AuthContext);

  return (
    <Route
      {...rest}
      render={(props: RouteComponentProps) =>
        authToken ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: '/signin' }} />
        )
      }
    />
  );
};

export default PrivateRoute;
