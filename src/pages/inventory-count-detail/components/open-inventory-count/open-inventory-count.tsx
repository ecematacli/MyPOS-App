import React, { useState, useEffect } from 'react'
import { Grid } from '@mui/material'

import { CountTableContainer, GridItem } from './styles'
import { LastCountedItems } from './components/last-counted-items/last-counted-items'
import { CountingActionsBar } from './components/counting-actions-bar./counting-actions-bar'
import CountBatchesProductsTable from './components/count-batches-products-table/count-batches-products-table'
import useCountDetails from './hooks/useCountDetails'
import { Loading } from '../../../../common/components/loading/loading'
import { BatchStats } from '../batch-stats/batch-stats'
import { ConfirmCompleteModal } from './components/confirm-complete-modal'

interface Props {
  batchId: string
}

export const OpenInventoryCount: React.FC<Props> = ({ batchId }) => {
  const [completeModalOpen, setCompleteModalOpen] = useState(false)

  const {
    tabsValue,
    handleTabsChange,
    loading,
    itemCount,
    setItemCount,
    countProduct,
    lastCountedItems,
    batch,
    fetchBatchesProducts,
    batchProducts,
    page,
    handleChangePage,
    rowsPerPage,
    handleChangeRowsPerPage,
    selectedProduct,
    onProductSelect,
    isQuickScanMode,
    setIsQuickScanMode,
    complete,
    completeInvCountError,
    searchProducts,
    countInputRef,
  } = useCountDetails(batchId)

  useEffect(() => {
    fetchBatchesProducts(parseInt(batchId))
  }, [])

  return (
    <Grid container>
      <ConfirmCompleteModal
        open={completeModalOpen}
        onClose={() => setCompleteModalOpen(false)}
        batchProducts={batchProducts}
        complete={complete}
        error={completeInvCountError}
      />
      <GridItem item xs={9}>
        <CountingActionsBar
          batch={batch}
          onProductSelect={onProductSelect}
          countInputRef={countInputRef}
          itemCount={itemCount}
          selectedProduct={selectedProduct}
          setItemCount={setItemCount}
          countProduct={countProduct}
          isQuickScanMode={isQuickScanMode}
          setIsQuickScanMode={setIsQuickScanMode}
          openConfirmationModal={() => setCompleteModalOpen(true)}
          searchProducts={searchProducts}
        />
        {loading || !batch ? (
          <Loading />
        ) : (
          <CountTableContainer>
            <BatchStats batch={batch} />
            <CountBatchesProductsTable
              tabsValue={tabsValue}
              handleTabsChange={handleTabsChange}
              batchProducts={batchProducts}
              page={page}
              rowsPerPage={rowsPerPage}
              handleChangePage={handleChangePage}
              handleChangeRowsPerPage={handleChangeRowsPerPage}
              selectedProductRow={selectedProduct}
            />
          </CountTableContainer>
        )}
      </GridItem>
      <Grid item xs={3}>
        <LastCountedItems lastCountedItems={lastCountedItems} />
      </Grid>
    </Grid>
  )
}
