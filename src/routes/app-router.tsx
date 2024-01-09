import React, { useContext } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { createBrowserHistory } from 'history'

import { PrivateRouter } from './private-router'
import { MenuWrapper } from '../common/components/menu-wrapper/menu-wrapper'
import ErrorBoundary from '../common/components/errorBoundary'
import { SignInPage } from '../pages/sign-in/sign-in'
import { DashboardPage } from '../pages/dashboard/dashboard'
import { SalesPage } from '../pages/sales/sales'
import { SalesHistoryPage } from '../pages/sales-history/sales-history'
import { ProductsPage } from '../pages/products/products'
import { InventoryCountBatchesPages } from '../pages/inventory-count-batches/inventory-count-batches'
import { InventoryCountCreatePage } from '../pages/inventory-count-create/inventory-count-create'
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
            <PrivateRouter path='/sales/pos' exact component={SalesPage} />
            <PrivateRouter
              path='/sales/history'
              exact
              component={SalesHistoryPage}
            />
            <PrivateRouter
              path='/inventory/products'
              exact
              component={ProductsPage}
            />
            <PrivateRouter
              path='/inventory/price-updates'
              exact
              component={PriceUpdatePage}
            />
            <PrivateRouter
              path='/inventory/inventory-count'
              exact
              component={InventoryCountBatchesPages}
            />
            <PrivateRouter
              path='/inventory/inventory-count/create'
              exact
              component={InventoryCountCreatePage}
            />
            <PrivateRouter
              path='/inventory/inventory-count/:id'
              exact
              component={InventoryCountDetail}
            />
            <PrivateRouter
              path='/inventory/stock-orders'
              exact
              component={StockOrders}
            />
            <PrivateRouter
              path='/inventory/stock-orders/upload'
              exact
              component={StockOrderUpload}
            />
            <PrivateRouter
              path='/inventory/stock-order/:id'
              exact
              component={StockOrderPage}
            />
            <PrivateRouter
              path='/inventory/stock-transfers'
              exact
              component={StockTransfers}
            />
            <PrivateRouter
              path='/inventory/stock-transfers/new'
              exact
              component={NewTransfer}
            />
            <PrivateRouter
              path='/inventory/stock-transfers/:id'
              exact
              component={StockTransfers}
            />
            <PrivateRouter
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
