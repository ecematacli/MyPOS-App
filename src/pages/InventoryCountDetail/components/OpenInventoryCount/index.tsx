import React, { useState, useEffect } from 'react'
import { Grid } from '@material-ui/core'

import styles from './styles'
import LastCountedItems from './components/lastCountedItems/LastCountedItems'
import CountingActionsBar from './components/countingActionsBar/CountingActionsBar'
import CountBatchesProductsTable from './components/countBatchesProductsTable/CountBatchesProductsTable'
import useCountDetails from './hooks/useCountDetails'
import Loading from '../../../../common/components/loading'
import { BatchStats } from '../BatchStats'
import { ConfirmCompleteModal } from './components/ConfirmCompleteModal'

interface Props {
  batchId: string
}

const OpenInventoryCountDetail: React.FC<Props> = ({ batchId }) => {
  const classes = styles()
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
    fetchBatchesProducts(batchId)
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
      <Grid className={classes.gridItem} item xs={9}>
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
          <div className={classes.countTableDiv}>
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
          </div>
        )}
      </Grid>
      <Grid item xs={3}>
        <LastCountedItems lastCountedItems={lastCountedItems} />
      </Grid>
    </Grid>
  )
}

export default OpenInventoryCountDetail
