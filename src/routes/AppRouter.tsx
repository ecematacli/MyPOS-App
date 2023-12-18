import React, { useContext } from 'react'
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
import StockOrderPage from '../pages/stockOrder'
import StockOrderUpload from '../pages/stockOrderUpload'
import { NewTransfer } from '../pages/stockTransfers/newTransfer'
import { StockTransfers } from '../pages/stockTransfers'
import { AuthContext } from '../contexts/AuthContext'
import PriceUpdatePage from '../pages/priceUpdate'

export const AppRouter = () => {
  const { isAdmin } = useContext(AuthContext)

  return (
    <Router history={history}>
      <MenuWrapper>
        <ErrorBoundary>
          <Switch>
            <Route path='/signin' exact component={SignInPage} />
            <PrivateRoute path='/sales/pos' exact component={SalesPage} />
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
              component={isAdmin ? DashboardPage : SalesPage}
            />
          </Switch>
        </ErrorBoundary>
      </MenuWrapper>
    </Router>
  )
}
