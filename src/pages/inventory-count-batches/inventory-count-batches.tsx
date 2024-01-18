import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { Typography, Box, TableContainer } from '@mui/material'
import { useTheme } from '@mui/material/styles'

import {
  AddButton,
  AddCountContainer,
  ImageContainer,
  InfoText,
  TableSectionWrapper,
} from './styles'
import { useInventoryBatchState } from './hooks/use-inventory-batch-state'
import { BatchTable } from './components/batch-table'
import { Loading } from '../../common/components/loading/loading'
import { CustomTabs } from '../../common/components/custom-tabs/custom-tabs'
import { InventoryCountTopBar } from '../../common/components/inventory-count-topbar/inventory-count-topbar'
import inventoryImage from '../../assets/img/stocktake-emptylist-v1.png'
import { PageContainer } from 'common/components/page-container/page-container'

export const InventoryCountBatchesPages = () => {
  const theme = useTheme()
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

  return (
    <PageContainer>
      <Box>
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
              styles={{ boxShadow: 'none', backgroundColor: 'inherit' }}
              stylesWithClasses={{
                root: {
                  textTransform: 'none',
                  fontSize: theme.spacing(2),
                },
              }}
            />
          }
          inventoryCountActionsPaper={
            <AddCountContainer>
              <InfoText>
                Create, schedule and complete counts to keep track of your
                inventory.
              </InfoText>
              <AddButton
                onClick={() =>
                  history.push('/inventory/inventory-count/create')
                }>
                <Typography
                  sx={{ textTransform: 'capitalize', color: 'white' }}>
                  Add Inventory Count
                </Typography>
              </AddButton>
            </AddCountContainer>
          }
        />
        {loading ? (
          <Loading />
        ) : !batches.count ? (
          <ImageContainer>
            <Box component='img' src={inventoryImage} alt='inventory' />
          </ImageContainer>
        ) : (
          <TableContainer>
            <TableSectionWrapper>
              <BatchTable
                batchesData={batches}
                page={page}
                rowsPerPage={rowsPerPage}
                handleChangeRowsPerPage={handleChangeRowsPerPage}
                handleChangePage={handleChangePage}
              />
            </TableSectionWrapper>
          </TableContainer>
        )}
      </Box>
    </PageContainer>
  )
}
