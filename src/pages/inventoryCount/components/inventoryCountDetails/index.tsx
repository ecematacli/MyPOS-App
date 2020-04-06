import React from 'react';
import { Grid } from '@material-ui/core';

import LastCountedItems from '../lastCountedItems/LastCountedItems';
import CountingActions from '../countingActions/CountingActions';

const InventoryCountDetails = () => {
  return (
    <Grid container style={{ paddingTop: 24 }}>
      <Grid item xs={9}>
        <CountingActions />
      </Grid>
      <Grid item xs={3}>
        <LastCountedItems />
      </Grid>
    </Grid>
  );
};

export default InventoryCountDetails;
