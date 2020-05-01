import React, { useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { Grid } from '@material-ui/core';

import { StoreState } from '../../redux/types';
import { InventoryCountDetailsProps } from './types';
import LastCountedItems from './components/lastCountedItems/LastCountedItems';
import CountingActionsBar from './components/countingActionsBar/CountingActionsBar';
import CountBatchesProductsTable from './components/countBatchesProductsTable/CountBatchesProductsTable';
import useCountDetails from './hooks/useCountDetails';
import Loading from '../../common/components/loading';
import { useBatchProductsSearchBarState } from './hooks/useBatchProductsSearchBarState';

const InventoryCountDetails: React.FC<InventoryCountDetailsProps> = ({
  match,
}) => {
  const { query, setQuery } = useBatchProductsSearchBarState();

  const {
    loading,
    itemCount,
    setItemCount,
    handleCountClick,
    lastCountedItems,
    handleLastCountedItemDeleteClick,
    countBatch,
    fetchCountBatch,
    fetchBatchesProducts,
    batchProducts,
    page,
    handleChangePage,
    rowsPerPage,
    handleChangeRowsPerPage,
    selectedProduct,
    handleSelectedProduct,
  } = useCountDetails(setQuery);

  const countInputRef = useRef<HTMLInputElement>();

  const batchId = match.params.id;

  useEffect(() => {
    fetchBatchesProducts(parseInt(batchId));
    fetchCountBatch(parseInt(batchId));
  }, []);

  return (
    <Grid container>
      <Grid style={{ paddingTop: 24 }} item xs={9}>
        <CountingActionsBar
          batchProducts={batchProducts}
          countBatch={countBatch}
          batchId={batchId}
          query={query}
          setQuery={setQuery}
          countInputRef={countInputRef}
          itemCount={itemCount}
          setItemCount={setItemCount}
          handleCountClick={handleCountClick}
        />
        {loading ? (
          <Loading />
        ) : (
          <CountBatchesProductsTable
            batchProducts={batchProducts}
            page={page}
            rowsPerPage={rowsPerPage}
            handleChangePage={handleChangePage}
            handleChangeRowsPerPage={handleChangeRowsPerPage}
            selectedProductRow={selectedProduct}
            handleSelectedRow={handleSelectedProduct}
            countInputRef={countInputRef}
          />
        )}
      </Grid>
      <Grid item xs={3}>
        <LastCountedItems
          lastCountedItems={lastCountedItems}
          handleLastCountedItemDeleteClick={handleLastCountedItemDeleteClick}
        />
      </Grid>
    </Grid>
  );
};

const mapStateToProps = ({ brands, categories }: StoreState) => ({
  brands,
  categories,
});

export default connect(mapStateToProps)(InventoryCountDetails);
