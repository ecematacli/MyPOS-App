import React from 'react';
import { connect } from 'react-redux';
import { Grid } from '@material-ui/core';

import { StoreState } from '../../../../redux/types';
import LastCountedItems from '../lastCountedItems/LastCountedItems';
import CountingActions from '../countingActions/CountingActions';
import useInventoryState from '../../hooks/useInventoryState';

const InventoryCountDetails = ({ brands, categories }) => {
  const { batches } = useInventoryState(brands, categories);
  return (
    <Grid container style={{ paddingTop: 24 }}>
      <Grid item xs={9}>
        <CountingActions batchesData={batches} />
      </Grid>
      <Grid item xs={3}>
        <LastCountedItems />
      </Grid>
    </Grid>
  );
};

const mapStateToProps = (state: StoreState) => ({
  brands: state.brands,
  categories: state.categories,
});

export default connect(mapStateToProps)(InventoryCountDetails);
