import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';

import history from '../history/history';
import PrivateRoute from './PrivateRoute';
import MenuWrapper from '../common/components/menuWrapper/MenuWrapper';
import SignInPage from '../pages/signInPage';
import DashboardPage from '../pages/dashboardPage';
import SalesPage from '../pages/salesPage';
import SalesHistoryPage from '../pages/salesHistoryPage';
import ProductsPage from '../pages/productsPage';

const AppRouter = () => (
  <Router history={history}>
    <MenuWrapper>
      <Switch>
        <Route path="/signin" exact component={SignInPage} />
        <PrivateRoute path="/sales/pos" exact component={SalesPage} />
        <PrivateRoute
          path="/sales/history"
          exact
          component={SalesHistoryPage}
        />
        <PrivateRoute path="/products" exact component={ProductsPage} />
        <PrivateRoute path="/" exact component={DashboardPage} />
      </Switch>
    </MenuWrapper>
  </Router>
);

export default AppRouter;
