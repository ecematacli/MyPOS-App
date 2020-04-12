import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';

import history from '../history';
import PrivateRoute from './PrivateRoute';
import MenuWrapper from '../common/components/menuWrapper';
import ErrorBoundary from '../common/components/errorBoundary';
import SignInPage from '../pages/signInPage';
import DashboardPage from '../pages/dashboardPage';
import SalesPage from '../pages/salesPage';
import SalesHistoryPage from '../pages/salesHistoryPage';
import ProductsPage from '../pages/productsPage';
import InventoryCountBatches from '../pages/inventoryCountBatches';
import CreateInventoryCount from '../pages/inventoryCountCreate';
import InventoryCountDetails from '../pages/inventoryCountDetails';

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
            component={InventoryCountBatches}
          />
          <PrivateRoute
            path="/inventory/count/:id"
            exact
            component={InventoryCountDetails}
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
