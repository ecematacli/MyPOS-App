import React from 'react'
import { Typography, Button } from '@material-ui/core'

import styles from './styles'
import history from '../../history'
import InventoryCountTopBar from '../../common/components/inventoryCountTopBar'

const StockOrdersPage = () => {
  const classes = styles()

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

  const renderStockOrdersContent = () => (
    <div className={classes.tableContainer}>
      <div className={classes.tableSectionWrapper}>
        Stock orders table..
      </div>
    </div>
  )

  return (
    <div className={classes.stockOrdersContainer}>
      {renderStockOrdersTopBar()}
      {renderStockOrdersContent()}
    </div>
  )
}

export default StockOrdersPage
