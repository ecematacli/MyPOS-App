import React from 'react'
import { Typography, Button } from '@material-ui/core'

import styles from './styles'
import history from '../../history'
import Loading from '../../common/components/loading'
import PlainTable from '../../common/components/plainTable'
import useStockOrders from './hooks/useStockOrders'
import InventoryCountTopBar from '../../common/components/inventoryCountTopBar'

const StockOrdersPage = () => {
  const classes = styles()

  const { stockOrders, loading, page, handleChangePage, rowsPerPage, handleChangeRowsPerPage } = useStockOrders()

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
            { name: 'Total products' },
          ]}
          count={10}
          hasDataToShow={!!stockOrders}
          rows={{ type: 'stockOrders', stockOrders }}
          page={page}
          rowsPerPage={rowsPerPage}
          handleChangeRowsPerPage={handleChangeRowsPerPage}
          handleChangePage={handleChangePage}
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
