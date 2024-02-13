import React, { useContext } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { createBrowserHistory } from 'history'

import { PrivateRoute } from './private-route'
import { MenuWrapper } from '../common/components/menu-wrapper/menu-wrapper'
import { ErrorBoundary } from '../common/components/error-boundary/error-boundary'
import { SignInPage } from '../pages/sign-in/sign-in'
import { DashboardPage } from '../pages/dashboard/dashboard'
import { SalesPage } from '../pages/sales/sales'
import { SalesHistoryPage } from '../pages/sales-history/sales-history'
import { ProductsPage } from '../pages/products/products'
import { ProductDetailsPage } from 'pages/product-details/product-details'
import { InventoryCountBatchesPages } from '../pages/inventory-count-batches/inventory-count-batches'
import { InventoryCountCreatePage } from '../pages/inventory-count-create/inventory-count-create'
import { InventoryCountDetailPage } from '../pages/inventory-count-detail'
import { StockOrdersPage } from '../pages/stock-orders/stock-orders'
import { StockOrderPage } from '../pages/stock-order/stock-order'
import { StockOrderUploadPage } from '../pages/stock-order-upload/stock-order-upload'
import { NewTransfer } from '../pages/stock-transfers/new-transfer/new-transfer'
import { StockTransfers } from '../pages/stock-transfers'
import { AuthContext } from '../contexts/auth-context'
import { PriceUpdatePage } from '../pages/price-update/price-update'

export const AppRouter = () => {
  const history = createBrowserHistory()
  const { isAdmin } = useContext(AuthContext)

  return (
    <Router>
      <MenuWrapper>
        <ErrorBoundary history={history}>
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
              path='/inventory/product/:id'
              exact
              component={ProductDetailsPage}
            />
            <PrivateRoute
              path='/inventory/price-updates'
              exact
              component={PriceUpdatePage}
            />
            <PrivateRoute
              path='/inventory/inventory-count'
              exact
              component={InventoryCountBatchesPages}
            />
            <PrivateRoute
              path='/inventory/inventory-count/create'
              exact
              component={InventoryCountCreatePage}
            />
            <PrivateRoute
              path='/inventory/inventory-count/:id'
              exact
              component={InventoryCountDetailPage}
            />
            <PrivateRoute
              path='/inventory/stock-orders'
              exact
              component={StockOrdersPage}
            />
            <PrivateRoute
              path='/inventory/stock-orders/upload'
              exact
              component={StockOrderUploadPage}
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
