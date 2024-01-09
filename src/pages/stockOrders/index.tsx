import React from 'react'
import { useHistory } from 'react-router-dom'
import { Typography, Button } from '@mui/material'

import styles from './styles'
import { formatDate } from '../../common/utils'
import { Loading } from '../../common/components/loading/loading'
import PlainTable from '../../common/components/tables/plainTable'
import useStockOrders from './hooks/useStockOrders'
import InventoryCountTopBar from '../../common/components/inventoryCountTopBar'

const StockOrdersPage = () => {
  const classes = styles()
  const history = useHistory()

  const { stockOrders, loading } = useStockOrders()

  const transformedOrdersData = () =>
    stockOrders.map(order => {
      const total = order.products.reduce(
        (acc, pr) => {
          return {
            totalQty: acc.totalQty + pr.qty,
            totalPrice: acc.totalPrice + (pr.price - pr.discountPrice) * pr.qty,
          }
        },
        { totalQty: 0, totalPrice: 0 }
      )
      return {
        ...order,
        createdAt: formatDate(order.createdAt, 'd MMMM y - p'),
        ...total,
      }
    })

  const renderStockOrdersTopBar = () => (
    <InventoryCountTopBar
      title={<span className={classes.titleText}>Stock Orders</span>}
      inventoryCountActionsPaper={
        <div className={classes.uploadFileDiv}>
          <Typography className={classes.infoText}>
            Upload and validate files to keep track of your stock orders.
          </Typography>
          <Button
            onClick={() => history.push('stock-orders/upload')}
            className={classes.uploadBtn}>
            <Typography className={classes.btnText}>Upload File</Typography>
          </Button>
        </div>
      }
    />
  )

  const renderStockOrdersTable = () => (
    <div className={classes.tableContainer}>
      <div className={classes.tableSectionWrapper}>
        <PlainTable
          tableHeads={[
            { name: 'Creation Date' },
            { name: 'Total Products' },
            { name: 'Total Quantity' },
            { name: 'Total Price', rightAlign: true },
          ]}
          noPagination
          hasDataToShow={!!stockOrders.length}
          noDataMessage='No stock orders to show'
          rows={transformedOrdersData()}
          tableFor='StockOrders'
        />
      </div>
    </div>
  )

  return (
    <div className={classes.stockOrdersContainer}>
      {renderStockOrdersTopBar()}
      {loading ? <Loading /> : renderStockOrdersTable()}
    </div>
  )
}

export default StockOrdersPage
