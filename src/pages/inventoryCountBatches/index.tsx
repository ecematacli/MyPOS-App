import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { Typography, Button } from '@material-ui/core'

import styles from './styles'
import useInventoryBatchState from './hooks/useInventoryBatchState'
import BatchTable from './components/BatchTable'
import Loading from '../../common/components/loading'
import CustomTabs from '../../common/components/customTabs'
import InventoryCountTopBar from '../../common/components/inventoryCountTopBar'
import inventoryImage from '../../assets/img/stocktake-emptylist-v1.png'

const InventoryCountBatches: React.FC<{}> = () => {
  const classes = styles()
  const history = useHistory()

  const {
    batches,
    fetchCountBatches,
    loading,
    page,
    handleChangePage,
    rowsPerPage,
    handleChangeRowsPerPage,
    tabsValue,
    handleTabsChange,
  } = useInventoryBatchState()

  useEffect(() => {
    fetchCountBatches(page, rowsPerPage)
  }, [])

  const renderInventoryCountTopBar = () => (
    <InventoryCountTopBar
      type='countBatches'
      title={
        <CustomTabs
          textColor='secondary'
          tabsValue={tabsValue}
          handleChange={handleTabsChange}
          tabs={[
            { tab: 'Open', value: 'opened' },
            { tab: 'Completed', value: 'completed' },
            { tab: 'Canceled', value: 'cancelled' },
          ]}
          className={classes.tabs}
          classes={{ root: classes.tabRoot }}
        />
      }
      inventoryCountActionsPaper={
        <div className={classes.addCountDiv}>
          <Typography className={classes.infoText}>
            Create, schedule and complete counts to keep track of your
            inventory.
          </Typography>
          <Button
            onClick={() => history.push('/inventory/inventory-count/create')}
            className={classes.addBtn}>
            <Typography className={classes.btnText}>
              Add Inventory Count
            </Typography>
          </Button>
        </div>
      }
    />
  )

  const renderBatchData = () =>
    !batches.count ? (
      <div className={classes.imageDiv}>
        <img src={inventoryImage} />
      </div>
    ) : (
      <div className={classes.tableContainer}>
        <div className={classes.tableSectionWrapper}>
          <BatchTable
            batchesData={batches}
            page={page}
            rowsPerPage={rowsPerPage}
            handleChangeRowsPerPage={handleChangeRowsPerPage}
            handleChangePage={handleChangePage}
          />
        </div>
      </div>
    )

  return (
    <div className={classes.inventoryContainer}>
      {renderInventoryCountTopBar()}
      {loading ? <Loading /> : renderBatchData()}
    </div>
  )
}

export default InventoryCountBatches
