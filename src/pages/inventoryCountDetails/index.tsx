import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Grid } from '@material-ui/core';
import { RouteComponentProps } from 'react-router-dom';

import { StoreState } from '../../redux/types';
import LastCountedItems from './components/lastCountedItems/LastCountedItems';
import CountingActionsBar from './components/countingActionsBar/CountingActionsBar';
import CountBatchesProductsTable from './components/countBatchesProductsTable/CountBatchesProductsTable';
import useCountDetails from './hooks/useCountDetails';
import Loading from '../../common/components/loading';

interface RouterMatchProps {
  id: string;
}

interface Props extends RouteComponentProps<RouterMatchProps> {}

const InventoryCountDetails: React.FC<Props> = ({ match }) => {
  const {
    loading,
    fetchBatchesProducts,
    batchProducts,
    page,
    handleChangePage,
    rowsPerPage,
    handleChangeRowsPerPage,
  } = useCountDetails();

  const batchId = match.params.id;

  useEffect(() => {
    fetchBatchesProducts(Number(batchId));
  }, []);

  return (
    <Grid container style={{ paddingTop: 24 }}>
      <Grid item xs={9}>
        <CountingActionsBar batchId={batchId} />
        {loading ? (
          <Loading />
        ) : (
          <CountBatchesProductsTable
            batchProducts={batchProducts}
            page={page}
            rowsPerPage={rowsPerPage}
            handleChangePage={handleChangePage}
            handleChangeRowsPerPage={handleChangeRowsPerPage}
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
