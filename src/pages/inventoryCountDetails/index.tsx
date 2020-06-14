import React, { useEffect, useRef } from 'react'
import { connect } from 'react-redux'
import { Grid } from '@material-ui/core'

import styles from './styles'
import { StoreState } from '../../redux/types'
import { InventoryCountDetailsProps } from './types'
import { BatchProduct } from './types'
import LastCountedItems from './components/lastCountedItems/LastCountedItems'
import CountingActionsBar from './components/countingActionsBar/CountingActionsBar'
import CountBatchesProductsTable from './components/countBatchesProductsTable/CountBatchesProductsTable'
import useCountDetails from './hooks/useCountDetails'
import Loading from '../../common/components/loading'
import { useBatchProductsSearchBarState } from './hooks/useBatchProductsSearchBarState'

const InventoryCountDetails: React.FC<InventoryCountDetailsProps> = ({ match }) => {
  const classes = styles()
  const batchId = match.params.id

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
        />
        {loading ? (
          <Loading />
        ) : (
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
          />
        )}
      </Grid>
      <Grid item xs={3}>
        <LastCountedItems lastCountedItems={lastCountedItems} />
      </Grid>
    </Grid>
  )
}

const mapStateToProps = ({ brands, categories }: StoreState) => ({
  brands,
  categories,
})

export default connect(mapStateToProps)(InventoryCountDetails)
