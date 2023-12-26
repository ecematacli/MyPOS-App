import React, { useContext } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { createBrowserHistory } from 'history'

import PrivateRoute from './PrivateRoute'
import { MenuWrapper } from '../common/components/menu-wrapper/menu-wrapper'
import ErrorBoundary from '../common/components/errorBoundary'
import { SignInPage } from '../pages/signIn'
import DashboardPage from '../pages/dashboard'
import { Sales } from '../pages/sales/sales'
import SalesHistoryPage from '../pages/salesHistory'
import ProductsPage from '../pages/products'
import InventoryCountBatches from '../pages/inventoryCountBatches'
import InventoryCountCreate from '../pages/inventoryCountCreate'
import InventoryCountDetail from '../pages/InventoryCountDetail'
import StockOrders from '../pages/stockOrders'
import StockOrderPage from '../pages/stockOrder'
import StockOrderUpload from '../pages/stockOrderUpload'
import { NewTransfer } from '../pages/stockTransfers/newTransfer'
import { StockTransfers } from '../pages/stockTransfers'
import { AuthContext } from '../contexts/AuthContext'
import PriceUpdatePage from '../pages/priceUpdate'

export const AppRouter = () => {
  const history = createBrowserHistory()
  const { isAdmin } = useContext(AuthContext)

  return (
    <Router>
      <MenuWrapper>
        <ErrorBoundary history={history}>
          <Switch>
            <Route path='/signin' exact component={SignInPage} />
            <PrivateRoute path='/sales/pos' exact component={Sales} />
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
              path='/inventory/price-updates'
              exact
              component={PriceUpdatePage}
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
              path='/inventory/stock-order/:id'
              exact
              component={StockOrderPage}
            />
            <PrivateRoute
              path='/inventory/stock-transfers'
              exact
              component={StockTransfers}
            />
            <PrivateRoute
              path='/inventory/stock-transfers/new'
              exact
              component={NewTransfer}
            />
            <PrivateRoute
              path='/inventory/stock-transfers/:id'
              exact
              component={StockTransfers}
            />
            <PrivateRoute
              path='/'
              exact
              component={isAdmin ? DashboardPage : Sales}
            />
          </Switch>
        </ErrorBoundary>
      </MenuWrapper>
    </Router>
  )
}
