import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';

import history from '../history';
import PrivateRoute from './PrivateRoute';
import MenuWrapper from '../common/components/menuWrapper/MenuWrapper';
import ErrorBoundary from '../common/components/errorBoundary/ErrorBoundary';
import SignInPage from '../pages/signInPage';
import DashboardPage from '../pages/dashboardPage';
import SalesPage from '../pages/salesPage';
import SalesHistoryPage from '../pages/salesHistoryPage';
import ProductsPage from '../pages/productsPage';
import InventoryCount from '../pages/inventoryCount/InventoryCount';
import CreateInventoryCount from '../pages/inventoryCount/components/CreateInventoryCount';

const AppRouter: React.FC = () => (
  <Router history={history}>
    <MenuWrapper>
      <ErrorBoundary>
        <Switch>
          <Route path="/signin" exact component={SignInPage} />
          <PrivateRoute path="/sales/pos" exact component={SalesPage} />
          <PrivateRoute
            path="/sales/history"
            exact
            component={SalesHistoryPage}
          />
          <PrivateRoute
            path="/inventory/products"
            exact
            component={ProductsPage}
          />
          <PrivateRoute
            path="/inventory/count"
            exact
            component={InventoryCount}
          />
          <PrivateRoute
            path="/inventory/count_create"
            exact
            component={CreateInventoryCount}
          />
          <PrivateRoute path="/" exact component={DashboardPage} />
        </Switch>
      </ErrorBoundary>
    </MenuWrapper>
  </Router>
);

export default AppRouter;
