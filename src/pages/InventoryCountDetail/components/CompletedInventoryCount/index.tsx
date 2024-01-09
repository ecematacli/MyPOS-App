import React, { Fragment } from 'react'
import { useHistory } from 'react-router-dom'
import { useTheme } from '@mui/material/styles'

import { useCompletedInventoryCountState } from './useCompletedInventoryCountState'
import {
  BackArrowIcon,
  IconContainer,
  TableContainer,
  TableSectionWrapper,
  TitleText,
  getTabsStyles,
} from './styles'
import CustomTabs from '../../../../common/components/customTabs'
import PlainTable from '../../../../common/components/tables/plainTable'
import InventoryCountTopBar from '../../../../common/components/inventoryCountTopBar'
import { capitalizeFirstLetters, formatDate } from '../../../../common/utils'
import { Align } from '../../../../common/components/Align'
import { Loading } from '../../../../common/components/loading/loading'
import { BatchStats } from '../BatchStats'

export const CompletedInventoryCountDetail: React.FC<{ batchId: string }> = ({
  batchId,
}) => {
  const history = useHistory()
  const theme = useTheme()

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
              <IconContainer
                onClick={() => history.push('/inventory/inventory-count')}>
                <BackArrowIcon />
              </IconContainer>
              <TitleText>
                {batch &&
                  (batch.name
                    ? capitalizeFirstLetters(batch.name)
                    : `Count on ${formatDate(batch.started, 'd MMMM y - p')}`)}
              </TitleText>
            </Align>
          </Align>
        }
        inventoryCountActionsPaper={<Align padding={[1]} />}
      />
      <TableContainer>
        <TableSectionWrapper>
          <BatchStats batch={batch} />
          <CustomTabs
            tabsValue={currentTab}
            handleChange={handleTabsChange}
            styles={getTabsStyles(theme)}
            stylesWithClasses={{
              root: { textTransform: 'none', fontSize: theme.spacing(2) },
            }}
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
            hasDataToShow={products.length >= 1}
            noDataMessage='No products to show'
            count={getCountForTabs()}
            rows={products}
            tableFor='CompletedInventoryCountProducts'
            page={page}
            rowsPerPage={rowsPerPage}
            handleChangeRowsPerPage={handleChangeRowsPerPage}
            handleChangePage={handleChangePage}
          />
        </TableSectionWrapper>
      </TableContainer>
    </Fragment>
  )
}
