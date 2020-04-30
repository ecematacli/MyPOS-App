import React, { useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { Grid } from '@material-ui/core';
import { RouteComponentProps } from 'react-router-dom';

import { StoreState } from '../../redux/types';
import LastCountedItems from './components/lastCountedItems/LastCountedItems';
import CountingActionsBar from './components/countingActionsBar/CountingActionsBar';
import CountBatchesProductsTable from './components/countBatchesProductsTable/CountBatchesProductsTable';
import useCountDetails from './hooks/useCountDetails';
import Loading from '../../common/components/loading';
import { useBatchProductsSearchBarState } from './hooks/useBatchProductsSearchBarState';

interface RouterMatchProps {
  id: string;
}

interface Props extends RouteComponentProps<RouterMatchProps> {}

const InventoryCountDetails: React.FC<Props> = ({ match }) => {
  const {
    loading,
    countBatch,
    fetchCountBatch,
    fetchBatchesProducts,
    batchProducts,
    page,
    handleChangePage,
    rowsPerPage,
    handleChangeRowsPerPage,
    selectedRow,
    handleSelectedRow,
  } = useCountDetails();

  const countInputRef = useRef<HTMLInputElement>();

  const {
    handleQueryChange,
    query,
    setQuery,
  } = useBatchProductsSearchBarState();

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
          selectedRow={selectedRow}
          query={query}
          setQuery={setQuery}
          countInputRef={countInputRef}
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
            selectedRow={selectedRow}
            handleSelectedRow={handleSelectedRow}
            handleQueryChange={handleQueryChange}
            countInputRef={countInputRef}
          />
        )}
      </Grid>
      <Grid item xs={3}>
        <LastCountedItems />
      </Grid>
    </Grid>
  );
};

const mapStateToProps = ({ brands, categories }: StoreState) => ({
  brands,
  categories,
});

export default connect(mapStateToProps)(InventoryCountDetails);
