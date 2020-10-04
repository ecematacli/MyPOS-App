import React from 'react'
import { Router, Route, Switch } from 'react-router-dom'

import history from '../history'
import PrivateRoute from './PrivateRoute'
import MenuWrapper from '../common/components/menuWrapper'
import ErrorBoundary from '../common/components/errorBoundary'
import SignInPage from '../pages/signIn'
import DashboardPage from '../pages/dashboard'
import SalesPage from '../pages/sales'
import SalesHistoryPage from '../pages/salesHistory'
import ProductsPage from '../pages/products'
import InventoryCountBatches from '../pages/inventoryCountBatches'
import InventoryCountCreate from '../pages/inventoryCountCreate'
import InventoryCountDetail from '../pages/InventoryCountDetail'
import StockOrders from '../pages/stockOrders'
import StockOrderUpload from '../pages/stockOrderUpload'

const AppRouter: React.FC = () => (
  <Router history={history}>
    <MenuWrapper>
      <ErrorBoundary>
        <Switch>
          <Route
            path='/signin'
            exact
            component={SignInPage}
          />
          <PrivateRoute
            path='/sales/pos'
            exact
            component={SalesPage}
          />
          <PrivateRoute
            path='/sales/history'
            exact
            component={SalesHistoryPage}
          />
          <PrivateRoute
            path='/inventory/products'
            exact
            component={ProductsPage}
          />
          <PrivateRoute
            path='/inventory/inventory-count'
            exact
            component={InventoryCountBatches}
          />
          <PrivateRoute
            path='/inventory/inventory-count/create'
            exact
            component={InventoryCountCreate}
          />
          <PrivateRoute
            path='/inventory/inventory-count/:id'
            exact
            component={InventoryCountDetail}
          />
          <PrivateRoute
            path='/inventory/stock-orders'
            exact
            component={StockOrders}
          />
          <PrivateRoute
            path='/inventory/stock-orders/upload'
            exact
            component={StockOrderUpload}
          />
          <PrivateRoute
            path='/'
            exact
            component={DashboardPage}
          />
        </Switch>
      </ErrorBoundary>
    </MenuWrapper>
  </Router>
)

export default AppRouter
