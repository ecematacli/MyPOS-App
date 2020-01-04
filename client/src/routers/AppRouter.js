import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';

import history from '../history/history';
import PrivateRoute from './PrivateRoute';
import MenuWrapper from '../common/components/menuWrapper/MenuWrapper';
import SignInPage from '../pages/signInPage';
import SellPage from '../pages/sellPage';
import SalesHistoryPage from '../pages/salesHistoryPage';

const AppRouter = () => (
  <Router history={history}>
    <MenuWrapper>
      <Switch>
        <Route path="/signin" exact component={SignInPage} />
        <PrivateRoute path="/" exact component={SellPage} />
        <PrivateRoute
          path="/sales/history"
          exact
          component={SalesHistoryPage}
        />
      </Switch>
    </MenuWrapper>
  </Router>
);

export default AppRouter;
