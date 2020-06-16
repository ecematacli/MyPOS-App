import React, { useEffect, useRef, Fragment, useState } from 'react'
import { connect } from 'react-redux'
import { Grid } from '@material-ui/core'

import styles from './styles'
import { BatchProduct } from './types'
import LastCountedItems from './components/lastCountedItems/LastCountedItems'
import CountingActionsBar from './components/countingActionsBar/CountingActionsBar'
import CountBatchesProductsTable from './components/countBatchesProductsTable/CountBatchesProductsTable'
import useCountDetails from './hooks/useCountDetails'
import { useBatchProductsSearchBarState } from './hooks/useBatchProductsSearchBarState'
import Loading from '../../../../common/components/loading'
import { BatchStats } from '../BatchStats'
import { Align } from '../../../../common/components/Align'
import { ConfirmCompleteModal } from './components/ConfirmCompleteModal'

interface Props {
  batchId: string
}

const OpenInventoryCountDetail: React.FC<Props> = ({ batchId }) => {
  const classes = styles()
  const [completeModalOpen, setCompleteModalOpen] = useState(false)

  const {
    query,
    setQuery,
    handleQueryChange,
    searchResults,
    setSearchResults,
    open,
    setOpen,
    productSearchLoading,
    productNotFound,
  } = useBatchProductsSearchBarState(batchId)

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
    handleSelectedProduct,
    isQuickScanMode,
    setIsQuickScanMode,
    complete,
    completeInvCountError,
  } = useCountDetails(setQuery, batchId)

  const onProductSelect = (product: BatchProduct) => {
    if (!isQuickScanMode) {
      countInputRef.current.focus()
      setQuery(product.name)
      handleSelectedProduct(product)
    } else {
      countProduct(product)
    }
    setOpen(false)
    setSearchResults([])
  }

  const countInputRef = useRef<HTMLInputElement>()

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
      <Grid className={classes.gridItem} item xs={9}>
        <CountingActionsBar
          batch={batch}
          open={open}
          setOpen={setOpen}
          loading={productSearchLoading}
          onProductSelect={onProductSelect}
          query={query}
          handleQueryChange={handleQueryChange}
          searchResults={searchResults}
          setSearchResults={setSearchResults}
          productNotFound={productNotFound}
          countInputRef={countInputRef}
          itemCount={itemCount}
          selectedProduct={selectedProduct}
          setItemCount={setItemCount}
          countProduct={countProduct}
          isQuickScanMode={isQuickScanMode}
          setIsQuickScanMode={setIsQuickScanMode}
          setQuery={setQuery}
          openConfirmationModal={() => setCompleteModalOpen(true)}
        />
        {loading || !batch ? (
          <Loading />
        ) : (
          <Fragment>
            <Align padding={[0, 0, 0, 6]}>
              <BatchStats batch={batch} />
            </Align>
            <CountBatchesProductsTable
              tabsValue={tabsValue}
              handleTabsChange={handleTabsChange}
              batchProducts={batchProducts}
              page={page}
              rowsPerPage={rowsPerPage}
              handleChangePage={handleChangePage}
              handleChangeRowsPerPage={handleChangeRowsPerPage}
              selectedProductRow={selectedProduct}
              handleSelectedRow={onProductSelect}
              countInputRef={countInputRef}
              isQuickScanMode={isQuickScanMode}
            />
          </Fragment>
        )}
      </Grid>
      <Grid item xs={3}>
        <LastCountedItems lastCountedItems={lastCountedItems} />
      </Grid>
    </Grid>
  )
}

export default OpenInventoryCountDetail
