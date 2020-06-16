import React, { FC, Fragment, useState } from 'react'
import { useCompletedInventoryCountState } from './useCompletedInventoryCountState'
import styles from './styles'
import CustomTabs from '../../../../common/components/customTabs'
import PlainTable from '../../../../common/components/plainTable'
import InventoryCountTopBar from '../../../../common/components/inventoryCountTopBar'
import { ArrowBack } from '@material-ui/icons'
import history from '../../../../history'
import { Typography } from '@material-ui/core'
import { capitalizeFirstLetters, formatDate } from '../../../../common/utils'
import { Align } from '../../../../common/components/Align'
import Loading from '../../../../common/components/loading'
import { BatchStats } from '../BatchStats'

interface Props {
  batchId: string
}

export const CompletedInventoryCountDetail: FC<Props> = ({ batchId }) => {
  const classes = styles()
  const {
    currentTab,
    batch,
    batchProducts,
    handleTabsChange,
    page,
    rowsPerPage,
    handleChangePage,
    handleChangeRowsPerPage,
  } = useCompletedInventoryCountState(batchId)
  const { synced, notSynced, products } = batchProducts

  const getCountForTabs = () => {
    if (currentTab === 'all') {
      return synced + notSynced
    } else if (currentTab === 'synced') {
      return synced
    } else {
      return notSynced
    }
  }

  if (!batch) {
    return <Loading />
  }

  return (
    <Fragment>
      <InventoryCountTopBar
        title={
          <Align vertical>
            <Align>
              <span
                className={classes.iconDiv}
                onClick={() => history.push('/inventory/inventory-count')}>
                <ArrowBack className={classes.backArrow} />
              </span>
              <Typography className={classes.titleText}>
                {batch &&
                  (batch.name
                    ? capitalizeFirstLetters(batch.name)
                    : `Count on ${formatDate(batch.started, 'd MMMM y - p')}`)}
              </Typography>
            </Align>
          </Align>
        }
        inventoryCountActionsPaper={<Align padding={[1]} />}
      />
      <div className={classes.tableContainer}>
        <div className={classes.tableSectionWrapper}>
          <BatchStats batch={batch} />
          <CustomTabs
            tabsValue={currentTab}
            handleChange={handleTabsChange}
            className={classes.tabs}
            classes={{ root: classes.tabRoot }}
            tabs={[
              {
                tab: `All (${synced + notSynced})`,
                value: 'all',
              },
              {
                tab: `Synced (${synced})`,
                value: 'synced',
              },
              {
                tab: `Not Synced (${notSynced})`,
                value: 'notSynced',
              },
            ]}
          />
          <PlainTable
            tableHeads={[
              { name: 'Barcode' },
              { name: 'Sku' },
              { name: 'Product' },
              { name: 'Expected', rightAlign: true },
              { name: 'Counted', rightAlign: true },
              { name: 'Synced', rightAlign: true },
            ]}
            hasDataToShow={products.length > 1}
            noDataMessage='No products to show'
            count={getCountForTabs()}
            rows={{ type: 'batchProducts', batchProducts: products }}
            page={page}
            rowsPerPage={rowsPerPage}
            handleChangeRowsPerPage={handleChangeRowsPerPage}
            handleChangePage={handleChangePage}
            completedBatch
          />
        </div>
      </div>
    </Fragment>
  )
}
